import type { LaneKey, LaneSummary, LedgerState, StreamMessage, WarEvent, PacketStatus, PacketSignature } from "@/lib/warroom/types";
import { getRedis } from "@/lib/warroom/redis";
import { seedEvents, seedSummaries } from "@/lib/warroom/seed";
import { canTransition } from "@/lib/warroom/policy";
import { auditFromEvent } from "@/lib/warroom/audit";
import { canTransitionPacket, packetStatus } from "@/lib/warroom/packetPolicy";

const STREAM_KEY = "kiq:warroom:stream";
const EVENT_IDS_KEY = "kiq:warroom:event_ids";
const EVENT_KEY = (id: string) => `kiq:warroom:event:${id}`;
const SUMMARY_KEY = (lane: LaneKey) => `kiq:warroom:summary:${lane}`;

const LANES: LaneKey[] = ["value", "controls", "agentic", "marketplace"];

function isoNow() {
  return new Date().toISOString();
}

function getField(st: LedgerState): keyof Omit<LaneSummary, "lane"> {
  if (st === "IDENTIFIED") return "identified";
  if (st === "APPROVED") return "approved";
  if (st === "REALIZED") return "realized";
  return "atRisk";
}

export async function publish(msg: StreamMessage) {
  try {
    const redis = getRedis();
    await redis.xadd(STREAM_KEY, "*", "msg", JSON.stringify(msg));
  } catch (err) {
    console.error("[redisStore] publish error:", err);
  }
}

export async function ensureSeeded() {
  try {
    const redis = getRedis();
    const count = await redis.scard(EVENT_IDS_KEY);
    if (count > 0) return;

    const events = seedEvents();
    const summaries = seedSummaries();

    const multi = redis.multi();
    for (const e of events) {
      multi.sadd(EVENT_IDS_KEY, e.id);
      multi.set(EVENT_KEY(e.id), JSON.stringify(e));
    }
    for (const s of summaries) {
      multi.set(SUMMARY_KEY(s.lane), JSON.stringify(s));
    }
    await multi.exec();

    await publish({ type: "snapshot", events, summaries });
  } catch (err) {
    console.error("[redisStore] ensureSeeded error:", err);
  }
}

export async function snapshot() {
  await ensureSeeded();
  const redis = getRedis();

  const ids = await redis.smembers(EVENT_IDS_KEY);
  const evRaw = ids.length ? await redis.mget(ids.map((id) => EVENT_KEY(id))) : [];
  const events = (evRaw || []).filter(Boolean).map((x) => JSON.parse(x as string)) as WarEvent[];

  const sumRaw = await Promise.all(LANES.map((l) => redis.get(SUMMARY_KEY(l))));
  const summaries = sumRaw.filter(Boolean).map((x) => JSON.parse(x as string)) as LaneSummary[];

  return { events, summaries };
}

export async function upsertEvent(e: WarEvent) {
  const redis = getRedis();
  await redis.set(EVENT_KEY(e.id), JSON.stringify(e));
  await redis.sadd(EVENT_IDS_KEY, e.id);
}

function setPacketStatus(e: WarEvent, status: PacketStatus): WarEvent {
  return { ...e, packetStatus: status, updatedAt: new Date().toISOString() };
}

function addSignature(e: WarEvent, sig: Omit<PacketSignature, "id" | "at">): WarEvent {
  const newSig: PacketSignature = {
    id: `sig-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    at: new Date().toISOString(),
    ...sig,
  };
  return {
    ...e,
    packetSignatures: [...(e.packetSignatures ?? []), newSig],
    updatedAt: new Date().toISOString(),
  };
}

export async function submitPacket(eventId: string, actor: string, role: string) {
  await ensureSeeded();
  const redis = getRedis();
  const raw = await redis.get(EVENT_KEY(eventId));
  if (!raw) throw new Error("Event not found");

  const e = JSON.parse(raw) as WarEvent;

  const decision = canTransitionPacket(e, "SUBMITTED");
  const reasons = "reasons" in decision ? decision.reasons : [];

  await auditFromEvent({
    action: "PACKET_SUBMIT_ATTEMPT",
    actor: `${actor} (${role})`,
    event: e,
    priorState: e.state,
    nextState: e.state,
    policyOk: decision.ok,
    policyReasons: reasons,
    meta: { packetFrom: packetStatus(e), packetTo: "SUBMITTED" },
  });

  if (!decision.ok) {
    const err: any = new Error("Packet submission blocked by policy");
    err.policyReasons = reasons;
    throw err;
  }

  let next = setPacketStatus(e, "SUBMITTED");
  next = addSignature(next, { signer: actor, role, action: "SUBMIT" });

  await upsertEvent(next);

  await auditFromEvent({
    action: "PACKET_SUBMIT",
    actor: `${actor} (${role})`,
    event: next,
    policyOk: true,
    meta: { packetFrom: packetStatus(e), packetTo: "SUBMITTED" },
  });

  return next;
}

export async function approvePacket(eventId: string, actor: string, role: string) {
  await ensureSeeded();
  const redis = getRedis();
  const raw = await redis.get(EVENT_KEY(eventId));
  if (!raw) throw new Error("Event not found");

  const e = JSON.parse(raw) as WarEvent;

  const signed = addSignature(e, { signer: actor, role, action: "APPROVE" });

  const decision = canTransitionPacket(signed, "APPROVED");
  const reasons = "reasons" in decision ? decision.reasons : [];

  await auditFromEvent({
    action: "PACKET_APPROVE_ATTEMPT",
    actor: `${actor} (${role})`,
    event: signed,
    policyOk: decision.ok,
    policyReasons: reasons,
    meta: { packetFrom: packetStatus(e), packetTo: "APPROVED" },
  });

  if (!decision.ok) {
    await upsertEvent(signed);
    const err: any = new Error("Packet approval blocked by policy");
    err.policyReasons = reasons;
    throw err;
  }

  const next = setPacketStatus(signed, "APPROVED");
  await upsertEvent(next);

  await auditFromEvent({
    action: "PACKET_APPROVE",
    actor: `${actor} (${role})`,
    event: next,
    policyOk: true,
    meta: { packetFrom: packetStatus(e), packetTo: "APPROVED" },
  });

  return next;
}

export async function closePacket(eventId: string, actor: string, role: string) {
  await ensureSeeded();
  const redis = getRedis();
  const raw = await redis.get(EVENT_KEY(eventId));
  if (!raw) throw new Error("Event not found");

  const e = JSON.parse(raw) as WarEvent;

  const decision = canTransitionPacket(e, "CLOSED");
  const reasons = "reasons" in decision ? decision.reasons : [];

  if (!decision.ok) {
    const err: any = new Error("Packet close blocked by policy");
    err.policyReasons = reasons;
    throw err;
  }

  const next = setPacketStatus(e, "CLOSED");
  await upsertEvent(next);

  await auditFromEvent({
    action: "PACKET_CLOSE",
    actor: `${actor} (${role})`,
    event: next,
    policyOk: true,
    meta: { packetFrom: packetStatus(e), packetTo: "CLOSED" },
  });

  return next;
}

async function upsertSummary(s: LaneSummary) {
  const redis = getRedis();
  await redis.set(SUMMARY_KEY(s.lane), JSON.stringify(s));
  await publish({ type: "summary_upsert", summary: s });
}

async function moveLedgerAmount(lane: LaneKey, from: LedgerState, to: LedgerState, amount: number) {
  const redis = getRedis();
  const raw = await redis.get(SUMMARY_KEY(lane));
  if (!raw) return;

  const s = JSON.parse(raw) as LaneSummary;
  const take = Math.abs(amount);

  const a = getField(from);
  const b = getField(to);

  const next: LaneSummary = {
    ...s,
    [a]: Math.max(0, (s as any)[a] - take),
    [b]: (s as any)[b] + take,
  };

  await upsertSummary(next);
}

export async function assign(eventId: string, owner: string, actor?: string) {
  await ensureSeeded();
  const redis = getRedis();
  const raw = await redis.get(EVENT_KEY(eventId));
  if (!raw) throw new Error("Event not found");

  const e = JSON.parse(raw) as WarEvent;
  const prior = e.state;
  const next: WarEvent = { ...e, owner, updatedAt: isoNow() };

  await upsertEvent(next);

  await auditFromEvent({
    action: "LEDGER_ASSIGN",
    actor,
    event: next,
    priorState: prior,
    nextState: next.state,
    owner,
    meta: { field: "owner", priorOwner: e.owner },
  });

  return next;
}

export async function approve(eventId: string, actor?: string) {
  await ensureSeeded();
  const redis = getRedis();
  const raw = await redis.get(EVENT_KEY(eventId));
  if (!raw) throw new Error("Event not found");

  const e = JSON.parse(raw) as WarEvent;
  const prior = e.state;

  // Policy check
  const decision = canTransition(e, "APPROVED");
  
  // Audit the attempt
  await auditFromEvent({
    action: "LEDGER_APPROVE_ATTEMPT",
    actor,
    event: e,
    priorState: prior,
    nextState: "APPROVED",
    policyOk: decision.ok,
    policyReasons: decision.reasons,
  });

  // If policy fails, throw with reasons
  if (!decision.ok) {
    const err = new Error("Policy check failed");
    (err as any).policyReasons = decision.reasons;
    throw err;
  }

  // Move ledger amount if transitioning from IDENTIFIED
  if (e.state === "IDENTIFIED") {
    await moveLedgerAmount(e.lane, "IDENTIFIED", "APPROVED", e.amount);
  }

  const next: WarEvent = { ...e, state: "APPROVED", updatedAt: isoNow() };
  await upsertEvent(next);

  // Audit success
  await auditFromEvent({
    action: "LEDGER_APPROVE",
    actor,
    event: next,
    priorState: prior,
    nextState: "APPROVED",
    policyOk: true,
  });

  return next;
}

export async function close(eventId: string, actor?: string) {
  await ensureSeeded();
  const redis = getRedis();
  const raw = await redis.get(EVENT_KEY(eventId));
  if (!raw) throw new Error("Event not found");

  const e = JSON.parse(raw) as WarEvent;
  const prior = e.state;

  // Policy check
  const decision = canTransition(e, "REALIZED");
  
  // Audit the attempt
  await auditFromEvent({
    action: "LEDGER_CLOSE_ATTEMPT",
    actor,
    event: e,
    priorState: prior,
    nextState: "REALIZED",
    policyOk: decision.ok,
    policyReasons: decision.reasons,
  });

  // If policy fails, throw with reasons
  if (!decision.ok) {
    const err = new Error("Policy check failed");
    (err as any).policyReasons = decision.reasons;
    throw err;
  }

  // Move ledger amount if transitioning from APPROVED
  if (e.state === "APPROVED") {
    await moveLedgerAmount(e.lane, "APPROVED", "REALIZED", e.amount);
  }

  const next: WarEvent = { ...e, state: "REALIZED", updatedAt: isoNow() };
  await upsertEvent(next);

  // Audit success
  await auditFromEvent({
    action: "LEDGER_CLOSE",
    actor,
    event: next,
    priorState: prior,
    nextState: "REALIZED",
    policyOk: true,
  });

  return next;
}

export async function attachReceipt(eventId: string, receipt: { id: string; title: string; hash?: string }, actor?: string) {
  await ensureSeeded();
  const redis = getRedis();
  const raw = await redis.get(EVENT_KEY(eventId));
  if (!raw) throw new Error("Event not found");

  const e = JSON.parse(raw) as WarEvent;
  const priorCount = (e.receipts ?? []).length;
  const receipts = [...(e.receipts ?? []), { ...receipt }];

  const next: WarEvent = { ...e, receipts, updatedAt: isoNow() };
  await upsertEvent(next);

  await auditFromEvent({
    action: "RECEIPT_ATTACH",
    actor,
    event: next,
    priorState: e.state,
    nextState: e.state,
    meta: { receiptId: receipt.id, receiptTitle: receipt.title, priorCount, newCount: receipts.length },
  });

  return next;
}

export async function updateNotes(eventId: string, notes: any, actor: string) {
  await ensureSeeded();
  const redis = getRedis();
  const raw = await redis.get(EVENT_KEY(eventId));
  if (!raw) throw new Error("Event not found");

  const e = JSON.parse(raw) as WarEvent;
  
  // Merge notes
  const nextNotes = { ...(e.notes || {}), ...notes };
  const next: WarEvent = { ...e, notes: nextNotes, updatedAt: isoNow() };

  await upsertEvent(next);

  await auditFromEvent({
    action: "NOTES_UPDATE",
    actor,
    event: next,
    meta: { notesUpdated: true }
  });

  return next;
}

export async function attachFile(eventId: string, attachment: any, actor: string) {
  await ensureSeeded();
  const redis = getRedis();
  const raw = await redis.get(EVENT_KEY(eventId));
  if (!raw) throw new Error("Event not found");

  const e = JSON.parse(raw) as WarEvent;
  
  const currentAtts = e.notes?.attachments || [];
  const newAtt = {
    ...attachment,
    id: `att-${Date.now()}`,
    addedAt: isoNow(),
    addedBy: actor
  };

  const nextNotes = { 
    ...(e.notes || {}), 
    attachments: [newAtt, ...currentAtts] 
  };
  
  const next: WarEvent = { ...e, notes: nextNotes, updatedAt: isoNow() };

  await upsertEvent(next);

  await auditFromEvent({
    action: "ATTACHMENT_ADD",
    actor,
    event: next,
    meta: { attachmentId: newAtt.id, title: newAtt.title }
  });
  
  return { event: next, attachment: newAtt };
}

export const streamKey = STREAM_KEY;