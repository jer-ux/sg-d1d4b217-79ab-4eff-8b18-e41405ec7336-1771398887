import type { PacketStatus, WarEvent } from "@/lib/warroom/types";

export function getPacketStatus(e: WarEvent): PacketStatus {
  return (e.packetStatus ?? "DRAFT") as PacketStatus;
}

export function sigCount(e: WarEvent, action: "APPROVE") {
  const sigs = e.packetSignatures ?? [];
  const unique = new Set(sigs.filter((s) => s.action === action).map((s) => s.signer));
  return unique.size;
}

export function dualThreshold(): number {
  const raw = process.env.NEXT_PUBLIC_KIQ_DUAL_APPROVAL_THRESHOLD;
  // client-safe: mirror env to NEXT_PUBLIC_*
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) ? n : 0;
}

export function needsDualApproval(e: WarEvent) {
  const th = dualThreshold();
  if (!th) return false;
  return Math.abs(e.amount ?? 0) >= th;
}

export function approvalsNeeded(e: WarEvent) {
  return needsDualApproval(e) ? 2 : 1;
}

export function canSubmit(e: WarEvent) {
  return getPacketStatus(e) === "DRAFT";
}

export function canApprove(e: WarEvent) {
  return getPacketStatus(e) === "SUBMITTED";
}

export function canClose(e: WarEvent) {
  return getPacketStatus(e) === "APPROVED";
}

export function approvalProgressLabel(e: WarEvent) {
  if (!needsDualApproval(e)) return "";
  const have = sigCount(e, "APPROVE");
  const need = approvalsNeeded(e);
  if (have >= need) return "Dual approval satisfied";
  return `Awaiting approver ${have + 1} of ${need}`;
}