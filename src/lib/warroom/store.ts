// ===============================
// War Room Store - State Management & Actions
// ===============================
import { LaneKey, LaneSummary, LedgerState, StreamMessage, WarEvent } from "@/lib/warroom/types";

const lanes: LaneKey[] = ["value", "controls", "agentic", "marketplace"];

function isoNow() {
  return new Date().toISOString();
}

function seedSummaries(): LaneSummary[] {
  return lanes.map((lane) => ({
    lane,
    identified: lane === "value" ? 7_800_000 : lane === "controls" ? 2_100_000 : lane === "agentic" ? 3_400_000 : 1_250_000,
    approved: lane === "value" ? 2_900_000 : lane === "controls" ? 850_000 : lane === "agentic" ? 1_100_000 : 420_000,
    realized: lane === "value" ? 1_650_000 : lane === "controls" ? 390_000 : lane === "agentic" ? 610_000 : 180_000,
    atRisk: lane === "value" ? 980_000 : lane === "controls" ? 260_000 : lane === "agentic" ? 540_000 : 90_000,
  }));
}

function seedEvents(): WarEvent[] {
  const now = isoNow();
  return [
    {
      id: "evt-001",
      lane: "value",
      title: "PBM guarantee variance detected (audit-grade receipts ready)",
      subtitle: "Potential reconciliation against contract guarantees",
      amount: 420_000,
      confidence: 0.86,
      timeSensitivity: 0.74,
      state: "IDENTIFIED",
      owner: "Finance Ops",
      receipts: [{ id: "r-1", title: "Contract guarantee schedule", hash: "0xA13..." }],
      updatedAt: now,
    },
    {
      id: "evt-002",
      lane: "controls",
      title: "Eligibility-feed control drift: freshness threshold breached",
      subtitle: "Control gate failed; requires owner acknowledgement",
      amount: -120_000,
      confidence: 0.78,
      timeSensitivity: 0.82,
      state: "AT_RISK",
      owner: "Data Governance",
      receipts: [{ id: "r-2", title: "Freshness check report", hash: "0xB77..." }],
      updatedAt: now,
    },
    {
      id: "evt-003",
      lane: "agentic",
      title: "Agent workflow: quote-to-cash cycle time reduced 12%",
      subtitle: "Telemetry confirms sustained improvement",
      amount: 210_000,
      confidence: 0.73,
      timeSensitivity: 0.40,
      state: "REALIZED",
      owner: "RevOps",
      receipts: [{ id: "r-3", title: "Agent telemetry snapshot", hash: "0xC09..." }],
      updatedAt: now,
    },
    {
      id: "evt-004",
      lane: "marketplace",
      title: "Marketplace onboarding: time-to-value down to 9 days",
      subtitle: "Standardized pack reduced services drag",
      amount: 95_000,
      confidence: 0.69,
      timeSensitivity: 0.35,
      state: "APPROVED",
      owner: "Delivery",
      receipts: [{ id: "r-4", title: "Onboarding checklist + receipts", hash: "0xD11..." }],
      updatedAt: now,
    },
  ];
}

type Subscriber = (msg: StreamMessage) => void;

class WarRoomStore {
  private events = new Map<string, WarEvent>();
  private summaries = new Map<LaneKey, LaneSummary>();
  private subscribers = new Set<Subscriber>();

  constructor() {
    for (const s of seedSummaries()) this.summaries.set(s.lane, s);
    for (const e of seedEvents()) this.events.set(e.id, e);
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
  }

  upsertEvent(e: WarEvent) {
    this.events.set(e.id, e);
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
}

// IMPORTANT: global singleton for dev hot-reload
declare global {
  // eslint-disable-next-line no-var
  var __WARROOM_STORE__: WarRoomStore | undefined;
}

export const warRoomStore = globalThis.__WARROOM_STORE__ ?? new WarRoomStore();
globalThis.__WARROOM_STORE__ = warRoomStore;