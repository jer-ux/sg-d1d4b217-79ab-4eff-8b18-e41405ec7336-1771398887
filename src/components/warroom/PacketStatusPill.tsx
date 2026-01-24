"use client";

import clsx from "clsx";
import type { WarEvent } from "@/lib/warroom/types";
import { approvalProgressLabel, getPacketStatus, needsDualApproval } from "@/components/warroom/packetUi";

export default function PacketStatusPill({ e }: { e: WarEvent }) {
  const st = getPacketStatus(e);
  const dual = needsDualApproval(e);
  const sub = approvalProgressLabel(e);

  const style =
    st === "DRAFT"
      ? "border-white/15 bg-white/5 text-white/70"
      : st === "SUBMITTED"
      ? "border-white/25 bg-white/10 text-white/85"
      : st === "APPROVED"
      ? "border-white/30 bg-white/15 text-white"
      : "border-white/20 bg-black/30 text-white/70";

  return (
    <div className={clsx("inline-flex items-center gap-2 rounded-lg border px-2 py-1 text-xs font-medium", style)}>
      <span className={clsx("h-1.5 w-1.5 rounded-full", st === "APPROVED" ? "bg-emerald-400" : "bg-white/40")} />
      <span>{st.replace("_", " ")}</span>
      {sub && <span className="ml-1 border-l border-white/10 pl-2 text-white/50">{sub}</span>}
      {dual && !sub && st !== "CLOSED" && <span className="ml-1 border-l border-white/10 pl-2 text-white/50">Dual Approval</span>}
    </div>
  );
}