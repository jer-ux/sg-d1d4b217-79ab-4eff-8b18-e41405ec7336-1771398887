import type { LaneKey, LedgerState, WarEvent } from "@/lib/warroom/types";
import { getRedis } from "@/lib/warroom/redis";

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
};

export const AUDIT_STREAM_KEY = "kiq:audit:stream";

function isoNow() {
  return new Date().toISOString();
}

export async function appendAudit(entry: Omit<AuditEntry, "id" | "at"> & { at?: string }) {
  const redis = getRedis();
  const payload: AuditEntry = {
    id: "pending",
    at: entry.at ?? isoNow(),
    ...entry,
  };

  const streamId = await redis.xadd(AUDIT_STREAM_KEY, "*", "entry", JSON.stringify(payload));
  return { ...payload, id: streamId };
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
    return { ...entry, id };
  }).filter(Boolean) as AuditEntry[];
}

export async function getEventAuditLog(eventId: string): Promise<AuditEntry[]> {
  const all = await getRecentAuditLog(500);
  return all.filter(e => e.eventId === eventId);
}