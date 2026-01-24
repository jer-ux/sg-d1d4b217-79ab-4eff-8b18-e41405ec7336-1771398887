import type { PacketStatus, WarEvent } from "@/lib/warroom/types";

export type PacketDecision = { ok: true } | { ok: false; reasons: string[] };

function threshold() {
  const raw = process.env.KIQ_DUAL_APPROVAL_THRESHOLD;
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) ? n : 0;
}

function absAmount(e: WarEvent) {
  return Math.abs(e.amount ?? 0);
}

function sigCount(e: WarEvent, action: "APPROVE") {
  const sigs = e.packetSignatures ?? [];
  const approvers = sigs.filter((s) => s.action === action).map((s) => s.signer);
  return new Set(approvers).size;
}

export function packetStatus(e: WarEvent): PacketStatus {
  return (e.packetStatus ?? "DRAFT") as PacketStatus;
}

export function canTransitionPacket(e: WarEvent, target: PacketStatus): PacketDecision {
  const reasons: string[] = [];
  const cur = packetStatus(e);

  const allowed: Record<PacketStatus, PacketStatus[]> = {
    DRAFT: ["SUBMITTED"],
    SUBMITTED: ["APPROVED"],
    APPROVED: ["CLOSED"],
    CLOSED: [],
  };

  if (!allowed[cur].includes(target)) {
    reasons.push(`Packet transition ${cur} → ${target} is not allowed`);
  }

  if (target === "SUBMITTED") {
    if (!e.owner) reasons.push("Assign a decision owner before submitting");
    const rc = (e.receipts ?? []).length;
    if (rc < 1) reasons.push("Attach at least 1 evidence receipt before submitting");
  }

  if (target === "APPROVED") {
    const rc = (e.receipts ?? []).length;
    if (rc < 2) reasons.push("Approval requires at least 2 evidence receipts");
  }

  if (target === "APPROVED") {
    const th = threshold();
    if (th > 0 && absAmount(e) >= th) {
      const need = 2;
      const have = sigCount(e, "APPROVE");
      if (have < need) {
        reasons.push(`Dual approval required for ≥ $${th.toLocaleString()}. Need ${need} distinct approvers, have ${have}`);
      }
    }
  }

  return reasons.length ? { ok: false, reasons } : { ok: true };
}