"use client";

import { formatMoney } from "@/lib/warroom/mock";

export type TickerItem = {
  text: string;
  amount: number;
  state: string;
  lane: string;
  at: string;
};

export function TickerMarquee({ items }: { items: TickerItem[] }) {
  if (!items.length) {
    return (
      <div className="k-panel px-4 py-2 overflow-hidden">
        <div className="flex items-center gap-3 text-xs">
          <span className="px-2 py-1 rounded-lg border border-blue-500/30 bg-blue-500/20 text-blue-300 font-medium shadow-[0_0_10px_rgba(59,130,246,0.5)]">
            LIVE LEDGER
          </span>
          <span className="text-blue-400/60 italic">Waiting for stream...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="k-panel px-4 py-2 overflow-hidden">
      <div className="flex items-center gap-3 text-xs">
        <span className="px-2 py-1 rounded-lg border border-blue-500/30 bg-blue-500/20 text-blue-300 font-medium shadow-[0_0_10px_rgba(59,130,246,0.5)]">
          LIVE LEDGER
        </span>
        <div className="relative flex-1 overflow-hidden h-6">
          <div className="absolute top-0 left-0 whitespace-nowrap will-change-transform animate-marquee-slower text-sm text-blue-400 flex items-center">
            {items.concat(items).map((t, i) => {
               const amt = formatMoney(t.amount);
               const tag = t.state ? ` • ${t.state.replace("_", " ")}` : "";
               const label = `${amt}${tag} — ${t.text}`;
               return (
                <span key={i} className="inline-flex items-center">
                  <span className="mx-3 text-blue-500/50">•</span>
                  <span className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">{label}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}