import { useMemo } from "react";
import { formatMoney, WarEvent } from "@/lib/warroom/mock";

export function TickerMarquee({
  events,
  totals,
}: {
  events: WarEvent[];
  totals: { identified: number; approved: number; realized: number; atRisk: number };
}) {
  const items = useMemo(() => {
    const top = [...events]
      .sort((a, b) => (b.amount * b.confidence * b.timeSensitivity) - (a.amount * a.confidence * a.timeSensitivity))
      .slice(0, 8);

    return top.map((e) => {
      const amt = formatMoney(e.amount);
      const tag = e.state ? ` • ${e.state.replace("_", " ")}` : "";
      return `${amt}${tag} — ${e.title}`;
    });
  }, [events]);

  const header = `IDENTIFIED ${formatMoney(totals.identified)} • APPROVED ${formatMoney(totals.approved)} • REALIZED ${formatMoney(totals.realized)} • AT-RISK ${formatMoney(totals.atRisk)}`;

  return (
    <div className="k-panel px-4 py-2 overflow-hidden">
      <div className="flex items-center gap-3 text-xs text-white/70">
        <span className="px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-white/80 font-medium">
          EBITDA LEDGER
        </span>
        <span className="text-white/60">{header}</span>
      </div>

      <div className="relative mt-2 overflow-hidden">
        <div className="whitespace-nowrap will-change-transform animate-marquee text-sm text-white/80">
          {items.concat(items).map((t, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="mx-3 text-white/30">•</span>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}