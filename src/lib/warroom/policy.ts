import type { LaneKey, WarEvent, LedgerState } from "@/lib/warroom/types";

export type PolicyDecision = {
  ok: boolean;
  reasons?: string[];
};

export type PolicyConfig = {
  requireOwner: boolean;
  minReceiptsToApprove: number;
  minConfidenceToApprove: number;
  minReceiptsToClose: number;
  minConfidenceToClose: number;
  requireControlsReceiptForAtRisk: boolean;
};

const DEFAULT_POLICY: PolicyConfig = {
  requireOwner: true,
  minReceiptsToApprove: 1,
  minConfidenceToApprove: 0.7,
  minReceiptsToClose: 2,
  minConfidenceToClose: 0.75,
  requireControlsReceiptForAtRisk: true,
};

const LANE_POLICY: Partial<Record<LaneKey, Partial<PolicyConfig>>> = {
  value: {
    minReceiptsToApprove: 2,
    minReceiptsToClose: 3,
    minConfidenceToApprove: 0.75,
    minConfidenceToClose: 0.8,
  },
  controls: {
    minReceiptsToApprove: 1,
    minReceiptsToClose: 1,
    minConfidenceToApprove: 0.65,
    minConfidenceToClose: 0.7,
  },
  agentic: {
    minReceiptsToApprove: 1,
    minReceiptsToClose: 2,
    minConfidenceToApprove: 0.65,
    minConfidenceToClose: 0.7,
  },
  marketplace: {
    minReceiptsToApprove: 1,
    minReceiptsToClose: 2,
    minConfidenceToApprove: 0.6,
    minConfidenceToClose: 0.7,
  },
};

export function policyForLane(lane: LaneKey): PolicyConfig {
  return { ...DEFAULT_POLICY, ...(LANE_POLICY[lane] ?? {}) };
}

function receiptCount(e: WarEvent) {
  return (e.receipts ?? []).length;
}

function hasOwner(e: WarEvent) {
  return Boolean(e.owner && e.owner.trim().length > 0);
}

function hasControlsReceipt(e: WarEvent) {
  const r = (e.receipts ?? []).map((x) => (x.title ?? "").toLowerCase());
  return r.some((t) => t.includes("control") || t.includes("freshness") || t.includes("dq") || t.includes("quality"));
}

export function canTransition(e: WarEvent, target: LedgerState): PolicyDecision {
  const cfg = policyForLane(e.lane);
  const reasons: string[] = [];

  if (cfg.requireOwner && !hasOwner(e)) {
    reasons.push("Missing decision owner assignment.");
  }

  if (target === "APPROVED") {
    if (receiptCount(e) < cfg.minReceiptsToApprove) {
      reasons.push(`Requires at least ${cfg.minReceiptsToApprove} evidence receipt(s) to approve.`);
    }
    if (e.confidence < cfg.minConfidenceToApprove) {
      reasons.push(`Confidence ${(e.confidence * 100).toFixed(0)}% is below approval threshold ${(cfg.minConfidenceToApprove * 100).toFixed(0)}%.`);
    }
  }

  if (target === "REALIZED") {
    if (receiptCount(e) < cfg.minReceiptsToClose) {
      reasons.push(`Requires at least ${cfg.minReceiptsToClose} evidence receipt(s) to close.`);
    }
    if (e.confidence < cfg.minConfidenceToClose) {
      reasons.push(`Confidence ${(e.confidence * 100).toFixed(0)}% is below close threshold ${(cfg.minConfidenceToClose * 100).toFixed(0)}%.`);
    }
  }

  if (cfg.requireControlsReceiptForAtRisk && e.state === "AT_RISK") {
    if (!hasControlsReceipt(e)) {
      reasons.push("AT-RISK events require at least one controls-related receipt (control/freshness/DQ).");
    }
  }

  return reasons.length ? { ok: false, reasons } : { ok: true };
}