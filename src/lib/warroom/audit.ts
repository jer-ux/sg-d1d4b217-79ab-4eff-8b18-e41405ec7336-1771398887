import type { LaneKey, LedgerState, WarEvent } from "@/lib/warroom/types";
import { getRedis } from "@/lib/warroom/redis";
import { signAuditPayload } from "@/lib/warroom/auditSign";

export type AuditAction =
  | "LEDGER_ASSIGN"
  | "LEDGER_APPROVE_ATTEMPT"
  | "LEDGER_APPROVE"
  | "LEDGER_CLOSE_ATTEMPT"
  | "LEDGER_CLOSE"
  | "RECEIPT_ATTACH";

export type AuditEntry = {
  id: string;
  at: string;
  actor?: string;
  action: AuditAction;
  lane: LaneKey;
  eventId: string;
  priorState?: LedgerState;
  nextState?: LedgerState;
  amount?: number;
  owner?: string;
  policyOk?: boolean;
  policyReasons?: string[];
  meta?: Record<string, any>;
  sig?: string;
};

export const AUDIT_STREAM_KEY = "kiq:audit:stream";
const EVENT_AUDIT_LIST = (eventId: string) => `kiq:audit:event:${eventId}`;
const EVENT_AUDIT_CAP = 200;

function isoNow() {
  return new Date().toISOString();
}

export async function appendAudit(entry: Omit<AuditEntry, "id" | "at" | "sig"> & { at?: string }) {
  const redis = getRedis();
  const payload: AuditEntry = {
    id: "pending",
    at: entry.at ?? isoNow(),
    ...entry,
  };

  const sig = await signAuditPayload(payload);

  const streamId = await redis.xadd(
    AUDIT_STREAM_KEY,
    "*",
    "entry",
    JSON.stringify(payload),
    "sig",
    sig
  );

  const full: AuditEntry = { ...payload, id: streamId, sig };

  await redis
    .multi()
    .lpush(EVENT_AUDIT_LIST(payload.eventId), JSON.stringify(full))
    .ltrim(EVENT_AUDIT_LIST(payload.eventId), 0, EVENT_AUDIT_CAP - 1)
    .exec();

  return full;
}

export async function auditFromEvent(params: {
  action: AuditAction;
  actor?: string;
  event: WarEvent;
  priorState?: LedgerState;
  nextState?: LedgerState;
  policyOk?: boolean;
  policyReasons?: string[];
  owner?: string;
  meta?: Record<string, any>;
}) {
  return appendAudit({
    action: params.action,
    actor: params.actor,
    lane: params.event.lane,
    eventId: params.event.id,
    amount: params.event.amount,
    priorState: params.priorState,
    nextState: params.nextState,
    owner: params.owner ?? params.event.owner,
    policyOk: params.policyOk,
    policyReasons: params.policyReasons,
    meta: params.meta,
  });
}

export async function getRecentAuditLog(count = 100): Promise<AuditEntry[]> {
  const redis = getRedis();
  const res = (await redis.xrevrange(AUDIT_STREAM_KEY, "+", "-", "COUNT", count)) as any[];
  
  if (!res || res.length === 0) return [];
  
  return res.map(([id, kv]) => {
    const idx = kv.indexOf("entry");
    if (idx === -1 || !kv[idx + 1]) return null;
    const entry = JSON.parse(kv[idx + 1]) as AuditEntry;
    const sigIdx = kv.indexOf("sig");
    const sig = sigIdx !== -1 ? kv[sigIdx + 1] : undefined;
    return { ...entry, id, sig };
  }).filter(Boolean) as AuditEntry[];
}

export async function getEventAuditLog(eventId: string): Promise<AuditEntry[]> {
  const redis = getRedis();
  const list = await redis.lrange(EVENT_AUDIT_LIST(eventId), 0, -1);
  return list.map((s) => JSON.parse(s) as AuditEntry);
}