import * as React from "react";

export function LuxBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_50%_-10%,rgba(245,212,142,0.14),rgba(0,0,0,0)_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_85%_20%,rgba(140,165,255,0.12),rgba(0,0,0,0)_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_12%_45%,rgba(96,255,196,0.08),rgba(0,0,0,0)_55%)]" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(70%_55%_at_50%_35%,#000_55%,transparent_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] bg-[size:54px_54px]" />
      </div>

      {/* Glass panels */}
      <div className="absolute left-1/2 top-[16%] h-[520px] w-[860px] -translate-x-1/2 rounded-[56px] border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03)]" />
      <div className="absolute left-[8%] top-[52%] h-[420px] w-[520px] rounded-[48px] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03)]" />
      <div className="absolute right-[6%] top-[58%] h-[360px] w-[480px] rounded-[48px] border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.03)]" />

      {/* Scanning line */}
      <div className="absolute left-1/2 top-0 h-[2px] w-[1100px] -translate-x-1/2 opacity-70">
        <div className="h-full w-full animate-[scan_6.5s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(245,212,142,0.45),rgba(140,165,255,0.35),transparent)] blur-[0.3px]" />
      </div>

      {/* Film grain */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
    </div>
  );
}