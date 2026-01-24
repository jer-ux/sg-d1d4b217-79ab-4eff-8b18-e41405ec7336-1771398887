import type { LaneKey, WarEvent, LedgerState } from "@/lib/warroom/types";

export type PolicyDecision = { ok: true } | { ok: false; reasons: string[] };

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

function getPolicy(lane: LaneKey): PolicyConfig {
  return { ...DEFAULT_POLICY, ...LANE_POLICY[lane] };
}

export function canApprove(event: WarEvent): PolicyDecision {
  const policy = getPolicy(event.lane);
  const reasons: string[] = [];

  if (policy.requireOwner && !event.owner) {
    reasons.push("Event must have an assigned owner before approval");
  }

  const receiptCount = event.receipts?.length ?? 0;
  if (receiptCount < policy.minReceiptsToApprove) {
    reasons.push(
      `Minimum ${policy.minReceiptsToApprove} receipt(s) required (current: ${receiptCount})`
    );
  }

  if (event.confidence < policy.minConfidenceToApprove) {
    reasons.push(
      `Confidence ${(event.confidence * 100).toFixed(0)}% is below minimum ${(policy.minConfidenceToApprove * 100).toFixed(0)}%`
    );
  }

  if (event.state === "AT_RISK" && policy.requireControlsReceiptForAtRisk) {
    const hasControlsReceipt = event.receipts?.some(
      (r) => r.title.toLowerCase().includes("control") || r.title.toLowerCase().includes("check")
    );
    if (!hasControlsReceipt) {
      reasons.push("AT_RISK events require a controls/compliance receipt");
    }
  }

  return reasons.length === 0 ? { ok: true } : { ok: false, reasons };
}

export function canClose(event: WarEvent): PolicyDecision {
  const policy = getPolicy(event.lane);
  const reasons: string[] = [];

  if (policy.requireOwner && !event.owner) {
    reasons.push("Event must have an assigned owner before closing");
  }

  const receiptCount = event.receipts?.length ?? 0;
  if (receiptCount < policy.minReceiptsToClose) {
    reasons.push(
      `Minimum ${policy.minReceiptsToClose} receipt(s) required to close (current: ${receiptCount})`
    );
  }

  if (event.confidence < policy.minConfidenceToClose) {
    reasons.push(
      `Confidence ${(event.confidence * 100).toFixed(0)}% is below minimum ${(policy.minConfidenceToClose * 100).toFixed(0)}% for closure`
    );
  }

  return reasons.length === 0 ? { ok: true } : { ok: false, reasons };
}

export function checkPolicy(event: WarEvent, targetState: LedgerState): PolicyDecision {
  if (targetState === "APPROVED") return canApprove(event);
  if (targetState === "REALIZED") return canClose(event);
  return { ok: true };
}