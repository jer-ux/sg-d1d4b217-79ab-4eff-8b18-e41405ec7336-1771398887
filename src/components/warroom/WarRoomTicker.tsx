import React from "react";

interface TickerItem {
  label: string;
  value: string;
  trend?: string;
}

export function Ticker({ items }: { items: TickerItem[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="flex overflow-x-auto">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 px-4 py-3 border-r border-white/10 last:border-r-0 min-w-[140px]"
          >
            <div className="text-[11px] text-white/50">{item.label}</div>
            <div className="mt-1 text-lg font-semibold text-white">{item.value}</div>
            {item.trend && (
              <div className="mt-1 text-[11px] text-white/60">{item.trend}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}