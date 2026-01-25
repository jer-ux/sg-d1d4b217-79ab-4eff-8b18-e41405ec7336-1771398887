import React from "react";

export function Badge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    VERIFIED: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    UNVERIFIED: "border-purple-400/30 bg-purple-400/10 text-purple-200",
    PENDING: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    DEGRADED: "border-amber-400/30 bg-amber-400/10 text-amber-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md border text-[11px] font-medium ${colors[status] || "border-blue-400/30 bg-blue-400/10 text-blue-200"}`}>
      {status}
    </span>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-md border border-white/10 bg-white/5 text-[11px] text-white/70">
      {children}
    </span>
  );
}