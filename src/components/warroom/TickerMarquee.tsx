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
        <div className="flex items-center gap-3 text-xs text-white/70">
          <span className="px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-white/80 font-medium">
            LIVE LEDGER
          </span>
          <span className="text-white/40 italic">Waiting for stream...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="k-panel px-4 py-2 overflow-hidden">
      <div className="flex items-center gap-3 text-xs text-white/70">
        <span className="px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-white/80 font-medium">
          LIVE LEDGER
        </span>
        <div className="relative flex-1 overflow-hidden h-6">
          <div className="absolute top-0 left-0 whitespace-nowrap will-change-transform animate-marquee text-sm text-white/80 flex items-center">
            {items.concat(items).map((t, i) => {
               const amt = formatMoney(t.amount);
               const tag = t.state ? ` • ${t.state.replace("_", " ")}` : "";
               const label = `${amt}${tag} — ${t.text}`;
               return (
                <span key={i} className="inline-flex items-center">
                  <span className="mx-3 text-white/30">•</span>
                  {label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}