import * as React from "react";

export function PremiumPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] " +
        "relative overflow-hidden " +
        className
      }
    >
      {/* inner glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(120,140,255,0.14),transparent_45%)]" />
      {/* subtle edge highlight */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-white/5" />
      <div className="relative">{children}</div>
    </div>
  );
}