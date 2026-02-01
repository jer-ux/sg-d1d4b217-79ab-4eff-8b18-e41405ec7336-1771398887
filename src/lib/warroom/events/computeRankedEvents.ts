import crypto from "crypto";
import { listReceipts } from "@/lib/evidence/receiptStore";
import type { EvidenceReceipt } from "@/lib/storage/adapters/types";
import type { WarRoomEvent, EventStatus } from "../types";
import { categoryFromReason, severityFromReasons, velocityFromCounts, rankScore } from "../scoring";

function sha1(x: string) {
  return crypto.createHash("sha1").update(x).digest("hex");
}

function iso(ts: number) {
  return new Date(ts).toISOString();
}

function pickStatus(score: number): EventStatus {
  if (score >= 78) return "OPEN";
  if (score >= 55) return "WATCH";
  return "RESOLVED";
}

type Bucket = {
  key: string;                 // category|reason
  category: string;
  reason: string;

  receipts: EvidenceReceipt[];
  recentCount: number;
  priorCount: number;

  firstSeen: number;
  lastSeen: number;

  confidenceAvg: number;
  gate: "VERIFIED" | "UNVERIFIED";
};

export async function computeRankedEvents(args?: {
  limit?: number;
  recentWindowMinutes?: number; // default 180 (3h)
  priorWindowMinutes?: number;  // default 1440 (24h)
}): Promise<WarRoomEvent[]> {
  const limit = Math.max(1, Math.min(50, args?.limit ?? 15));
  const recentMins = Math.max(15, Math.min(24 * 60, args?.recentWindowMinutes ?? 180));
  const priorMins = Math.max(recentMins, Math.min(7 * 24 * 60, args?.priorWindowMinutes ?? 1440));

  const now = Date.now();
  const recentStart = now - recentMins * 60_000;
  const priorStart = now - priorMins * 60_000;

  // Pull a decent window of receipts (latest first)
  const receipts = await listReceipts({ limit: 1200 });

  // Bucket receipts by dominant reason code (first reason wins)
  const buckets = new Map<string, Bucket>();

  for (const r of receipts) {
    const reasons = r.reason_codes ?? [];
    const reason = reasons[0] ?? "UNSPECIFIED";
    const category = categoryFromReason(reason);

    const ts = new Date(r.captured_at).getTime();
    if (!isFinite(ts)) continue;

    // Only consider receipts in the prior window (so we can compute velocity)
    if (ts < priorStart) continue;

    const key = `${category}|${reason}`;
    const b =
      buckets.get(key) ??
      ({
        key,
        category,
        reason,
        receipts: [],
        recentCount: 0,
        priorCount: 0,
        firstSeen: ts,
        lastSeen: ts,
        confidenceAvg: 0,
        gate: "VERIFIED",
      } as Bucket);

    b.receipts.push(r);
    b.firstSeen = Math.min(b.firstSeen, ts);
    b.lastSeen = Math.max(b.lastSeen, ts);

    // Count in windows
    if (ts >= recentStart) b.recentCount += 1;
    else b.priorCount += 1;

    // Confidence + gate rollup:
    // - if ANY receipt is UNVERIFIED, the event is UNVERIFIED (conservative)
    if (r.gate === "UNVERIFIED") b.gate = "UNVERIFIED";

    const c = typeof r.confidence === "number" ? r.confidence : 0.5;
    b.confidenceAvg += c;

    buckets.set(key, b);
  }

  // Create events
  const events: WarRoomEvent[] = [];
  for (const b of buckets.values()) {
    const n = b.receipts.length;
    const confidence = n ? b.confidenceAvg / n : 0.5;

    // Use top N reason codes from the bucket (dedup)
    const reasonSet = new Set<string>();
    for (const r of b.receipts) {
      for (const rc of r.reason_codes ?? []) reasonSet.add(rc);
      if (reasonSet.size >= 6) break;
    }
    const top_reason_codes = Array.from(reasonSet);

    const sev = severityFromReasons([b.reason, ...top_reason_codes.filter((x) => x !== b.reason)]);
    const vel = velocityFromCounts({ recentCount: b.recentCount, priorCount: b.priorCount });
    const rank = rankScore({ severity: sev.severity, velocity: vel.velocity, gate: b.gate, confidence });

    const title = `${b.category}: ${b.reason.replaceAll("_", " ")}`;

    const event_id = sha1(`${b.key}|${iso(b.firstSeen)}|${iso(b.lastSeen)}`);

    const why = [
      ...sev.why,
      ...vel.why,
      ...rank.why,
      `Receipts linked: ${b.receipts.length}`,
    ];

    const status = pickStatus(rank.score);

    events.push({
      event_id,
      title,
      category: b.category as any,
      status,
      receipt_ids: b.receipts.slice(0, 25).map((x) => x.receipt_id),
      top_reason_codes,
      first_seen_at: iso(b.firstSeen),
      last_seen_at: iso(b.lastSeen),
      severity: sev.severity,
      velocity: vel.velocity,
      confidence_score: Math.max(0, Math.min(1, confidence)),
      confidence_gate: b.gate,
      rank_score: rank.score,
      why,
    });
  }

  // Rank: score desc, then most recent
  events.sort((a, b) => {
    if (b.rank_score !== a.rank_score) return b.rank_score - a.rank_score;
    return new Date(b.last_seen_at).getTime() - new Date(a.last_seen_at).getTime();
  });

  return events.slice(0, limit);
}