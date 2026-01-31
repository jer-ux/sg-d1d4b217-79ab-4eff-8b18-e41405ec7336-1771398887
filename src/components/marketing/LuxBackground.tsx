import * as React from "react";

export function LuxBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Enhanced base vignettes with richer colors */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_50%_-10%,rgba(245,212,142,0.20),rgba(0,0,0,0)_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_85%_20%,rgba(140,165,255,0.18),rgba(0,0,0,0)_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_700px_at_12%_45%,rgba(96,255,196,0.12),rgba(0,0,0,0)_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(800px_600px_at_70%_80%,rgba(168,85,247,0.14),rgba(0,0,0,0)_55%)]" />

      {/* Enhanced grid with better visibility */}
      <div className="absolute inset-0 opacity-[0.24] [mask-image:radial-gradient(70%_55%_at_50%_35%,#000_55%,transparent_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[size:54px_54px]" />
      </div>

      {/* Enhanced glass panels with glow */}
      <div className="absolute left-1/2 top-[16%] h-[520px] w-[860px] -translate-x-1/2 rounded-[56px] border border-white/15 bg-white/[0.06] backdrop-blur-xl shadow-[0_0_80px_rgba(96,165,250,0.15),0_0_0_1px_rgba(255,255,255,0.05)]" />
      <div className="absolute left-[8%] top-[52%] h-[420px] w-[520px] rounded-[48px] border border-white/15 bg-white/[0.05] backdrop-blur-xl shadow-[0_0_60px_rgba(168,85,247,0.12),0_0_0_1px_rgba(255,255,255,0.05)]" />
      <div className="absolute right-[6%] top-[58%] h-[360px] w-[480px] rounded-[48px] border border-white/15 bg-white/[0.05] backdrop-blur-xl shadow-[0_0_60px_rgba(52,211,153,0.12),0_0_0_1px_rgba(255,255,255,0.05)]" />

      {/* Enhanced scanning line with color transitions */}
      <div className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2 opacity-80">
        <div className="h-full w-full animate-[scan_6s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(245,212,142,0.6),rgba(140,165,255,0.5),rgba(96,255,196,0.4),transparent)] blur-[0.4px]" />
      </div>

      {/* Floating orbs for depth */}
      <div className="absolute left-[15%] top-[25%] h-32 w-32 rounded-full bg-amber-400/5 blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
      <div className="absolute right-[20%] top-[40%] h-40 w-40 rounded-full bg-blue-400/5 blur-3xl animate-pulse" style={{ animationDuration: "5s", animationDelay: "1s" }} />
      <div className="absolute left-[60%] bottom-[30%] h-36 w-36 rounded-full bg-emerald-400/5 blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "2s" }} />

      {/* Enhanced film grain */}
      <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
    </div>
  );
}