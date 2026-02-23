// ===============================
// War Room Store - State Management & Actions
// ===============================
import { LaneKey, LaneSummary, LedgerState, StreamMessage, WarEvent } from "@/lib/warroom/types";
import { getRedis, setJson, getJson, publishMessage } from "@/lib/warroom/redis";
import { seedSummaries, seedEvents } from "@/lib/warroom/seed";

const lanes: LaneKey[] = ["value", "controls", "agentic", "marketplace"];

function isoNow() {
  return new Date().toISOString();
}

type Subscriber = (msg: StreamMessage) => void;

class WarRoomStore {
  private events = new Map<string, WarEvent>();
  private summaries = new Map<LaneKey, LaneSummary>();
  private subscribers = new Set<Subscriber>();
  private useRedis = false;

  constructor() {
    // Initialize with seed data
    for (const s of seedSummaries()) this.summaries.set(s.lane, s);
    for (const e of seedEvents()) this.events.set(e.id, e);

    // Check if Redis is available
    const redis = getRedis();
    this.useRedis = redis !== null;

    if (this.useRedis) {
      console.log("WarRoomStore: Redis enabled");
      this.syncFromRedis();
    } else {
      console.log("WarRoomStore: Using in-memory store (Redis not configured)");
    }
  }

  private async syncFromRedis() {
    try {
      const eventsData = await getJson<WarEvent[]>("warroom:events");
      const summariesData = await getJson<LaneSummary[]>("warroom:summaries");

      if (eventsData) {
        this.events.clear();
        for (const e of eventsData) this.events.set(e.id, e);
      }

      if (summariesData) {
        this.summaries.clear();
        for (const s of summariesData) this.summaries.set(s.lane, s);
      }
    } catch (err) {
      console.error("Failed to sync from Redis:", err);
    }
  }

  private async persistToRedis() {
    if (!this.useRedis) return;

    try {
      await setJson("warroom:events", Array.from(this.events.values()));
      await setJson("warroom:summaries", Array.from(this.summaries.values()));
    } catch (err) {
      console.error("Failed to persist to Redis:", err);
    }
  }

  snapshot() {
    return {
      events: Array.from(this.events.values()),
      summaries: lanes.map((l) => this.summaries.get(l)!).filter(Boolean),
    };
  }

  subscribe(fn: Subscriber) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  publish(msg: StreamMessage) {
    for (const fn of this.subscribers) fn(msg);
    
    // Also publish to Redis pub/sub for distributed updates
    if (this.useRedis) {
      publishMessage("warroom:stream", msg).catch((err) => {
        console.error("Failed to publish to Redis:", err);
      });
    }
  }

  upsertEvent(e: WarEvent) {
    this.events.set(e.id, e);
    this.persistToRedis();
    this.publish({ type: "event_upsert", event: e });
    this.publish({
      type: "ticker",
      text: e.title,
      amount: e.amount,
      state: e.state,
      lane: e.lane,
      at: e.updatedAt,
    });
  }

  upsertSummary(s: LaneSummary) {
    this.summaries.set(s.lane, s);
    this.persistToRedis();
    this.publish({ type: "summary_upsert", summary: s });
  }

  private moveLedgerAmount(lane: LaneKey, from: LedgerState, to: LedgerState, amount: number) {
    const s = this.summaries.get(lane);
    if (!s) return;
    const take = Math.abs(amount);

    const getField = (st: LedgerState) =>
      st === "IDENTIFIED" ? "identified" : st === "APPROVED" ? "approved" : st === "REALIZED" ? "realized" : "atRisk";

    const a = getField(from);
    const b = getField(to);

    (s as any)[a] = Math.max(0, (s as any)[a] - take);
    (s as any)[b] = (s as any)[b] + take;

    this.upsertSummary({ ...s });
  }

  // Actions
  assign(eventId: string, owner: string) {
    const e = this.events.get(eventId);
    if (!e) throw new Error("Event not found");
    const next = { ...e, owner, updatedAt: isoNow() };
    this.upsertEvent(next);
    return next;
  }

  approve(eventId: string) {
    const e = this.events.get(eventId);
    if (!e) throw new Error("Event not found");

    if (e.state === "IDENTIFIED") {
      this.moveLedgerAmount(e.lane, "IDENTIFIED", "APPROVED", e.amount);
    }
    const next = { ...e, state: "APPROVED" as LedgerState, updatedAt: isoNow() };
    this.upsertEvent(next);
    return next;
  }

  close(eventId: string) {
    const e = this.events.get(eventId);
    if (!e) throw new Error("Event not found");

    // simplistic: APPROVED -> REALIZED when "closed"
    if (e.state === "APPROVED") {
      this.moveLedgerAmount(e.lane, "APPROVED", "REALIZED", e.amount);
    }
    const next = { ...e, state: "REALIZED" as LedgerState, updatedAt: isoNow() };
    this.upsertEvent(next);
    return next;
  }

  attachReceipt(eventId: string, receipt: { id: string; title: string; hash?: string }) {
    const e = this.events.get(eventId);
    if (!e) throw new Error("Event not found");
    const receipts = [...(e.receipts ?? []), { ...receipt }];
    const next = { ...e, receipts, updatedAt: isoNow() };
    this.upsertEvent(next);
    return next;
  }

  updateEventNotes(eventId: string, notes: string) {
    const e = this.events.get(eventId);
    if (!e) throw new Error("Event not found");
    // Assuming WarEvent has a notes field, or we add it loosely
    const next = { ...e, notes, updatedAt: isoNow() };
    this.upsertEvent(next as WarEvent);
    return next;
  }

  attachFile(eventId: string, file: { url: string; name: string; uploadedAt: string }) {
    const e = this.events.get(eventId);
    if (!e) throw new Error("Event not found");
    
    // Extend type loosely if needed, or assume 'attachments' field exists
    const attachments = [...((e as any).attachments ?? []), file];
    const next = { ...e, attachments, updatedAt: isoNow() };
    this.upsertEvent(next as WarEvent);
    return file.url; // Return ID or URL
  }

  submitPacket(eventId: string, userId: string) {
    const e = this.events.get(eventId);
    if (!e) throw new Error("Event not found");
    // Transition state if needed, or just mark submitted
    const next = { ...e, status: "SUBMITTED", submittedBy: userId, updatedAt: isoNow() };
    // Map to existing state if strict
    if (e.state === "IDENTIFIED") {
       // logic for submission?
    }
    this.upsertEvent(next as any);
    return next;
  }

  approvePacket(eventId: string, userId: string) {
    // Re-use existing approve logic but add userId
    const e = this.events.get(eventId);
    if (!e) throw new Error("Event not found");

    if (e.state === "IDENTIFIED") {
      this.moveLedgerAmount(e.lane, "IDENTIFIED", "APPROVED", e.amount);
    }
    const next = { ...e, state: "APPROVED" as LedgerState, approvedBy: userId, updatedAt: isoNow() };
    this.upsertEvent(next as any);
    return next;
  }

  closePacket(eventId: string, userId: string) {
    // Re-use existing close logic but add userId
    const e = this.events.get(eventId);
    if (!e) throw new Error("Event not found");

    if (e.state === "APPROVED") {
      this.moveLedgerAmount(e.lane, "APPROVED", "REALIZED", e.amount);
    }
    const next = { ...e, state: "REALIZED" as LedgerState, closedBy: userId, updatedAt: isoNow() };
    this.upsertEvent(next as any);
    return next;
  }
}

// IMPORTANT: global singleton for dev hot-reload
declare global {
  // eslint-disable-next-line no-var
  var __WARROOM_STORE__: WarRoomStore | undefined;
}

export const warRoomStore = globalThis.__WARROOM_STORE__ ?? new WarRoomStore();
globalThis.__WARROOM_STORE__ = warRoomStore;

export function getWarRoomStore() {
  return warRoomStore;
}