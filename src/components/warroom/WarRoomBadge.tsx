import React from "react";

export function Badge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    VERIFIED: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    UNVERIFIED: "border-red-400/30 bg-red-400/10 text-red-200",
    PENDING: "border-yellow-400/30 bg-yellow-400/10 text-yellow-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md border text-[11px] font-medium ${colors[status] || "border-white/20 bg-white/5 text-white/70"}`}>
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