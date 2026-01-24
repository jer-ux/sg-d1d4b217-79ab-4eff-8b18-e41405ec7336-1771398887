import Link from "next/link";
import { useState, useEffect } from "react";
import { LaneKey, laneMeta, seedEvents, formatMoney, WarEvent } from "@/lib/warroom/mock";
import { TickerMarquee } from "@/components/warroom/TickerMarquee";

export function LaneDetail({ lane }: { lane: string }) {
  const laneKey = lane as LaneKey;
  const meta = laneMeta[laneKey];
  
  const [events, setEvents] = useState<WarEvent[]>([]);

  useEffect(() => {
    const all = seedEvents();
    setEvents(all.filter((e) => e.lane === laneKey));
  }, [laneKey]);

  if (!meta) {
    return (
      <div className="py-20 text-center">
        <div className="text-2xl text-white/70">Lane not found</div>
        <Link href="/war-room" className="text-cyan-400 hover:text-cyan-300 mt-4 inline-block">
          ← Back to War Room
        </Link>
      </div>
    );
  }

  const totals = {
    identified: events.filter(e => e.state === "IDENTIFIED").reduce((acc, e) => acc + e.amount, 0),
    approved: events.filter(e => e.state === "APPROVED").reduce((acc, e) => acc + e.amount, 0),
    realized: events.filter(e => e.state === "REALIZED").reduce((acc, e) => acc + e.amount, 0),
    atRisk: events.filter(e => e.state === "AT_RISK").reduce((acc, e) => acc + Math.abs(e.amount), 0),
  };

  return (
    <div className="py-8">
      <div className="mb-6">
        <Link href="/war-room" className="text-cyan-400 hover:text-cyan-300 text-sm">
          ← Back to War Room
        </Link>
      </div>

      <div className="mb-6">
        <div className="text-3xl font-semibold tracking-tight text-white">{meta.label}</div>
        <div className="text-white/65 mt-2">{meta.headline}</div>
      </div>

      <div className="mb-6">
        <TickerMarquee events={events} totals={totals} />
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="k-panel p-4">
          <div className="text-xs uppercase tracking-wider text-white/55 mb-1">Identified</div>
          <div className="text-2xl font-semibold text-amber-400">{formatMoney(totals.identified)}</div>
        </div>
        <div className="k-panel p-4">
          <div className="text-xs uppercase tracking-wider text-white/55 mb-1">Approved</div>
          <div className="text-2xl font-semibold text-cyan-400">{formatMoney(totals.approved)}</div>
        </div>
        <div className="k-panel p-4">
          <div className="text-xs uppercase tracking-wider text-white/55 mb-1">Realized</div>
          <div className="text-2xl font-semibold text-emerald-400">{formatMoney(totals.realized)}</div>
        </div>
        <div className="k-panel p-4">
          <div className="text-xs uppercase tracking-wider text-white/55 mb-1">At Risk</div>
          <div className="text-2xl font-semibold text-rose-400">{formatMoney(totals.atRisk)}</div>
        </div>
      </div>

      <div className="k-panel p-5">
        <div className="text-lg font-semibold text-white mb-4">Events in this Lane</div>
        {events.length > 0 ? (
          <div className="space-y-3">
            {events.map((e) => (
              <div key={e.id} className="rounded-xl border border-white/10 bg-black/20 p-4 hover-lift">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="text-sm text-white/90 font-medium">{e.title}</div>
                    {e.subtitle && <div className="text-xs text-white/60 mt-1">{e.subtitle}</div>}
                    <div className="text-xs text-white/55 mt-2">
                      {e.state} • Confidence {(e.confidence * 100).toFixed(0)}% • Owner {e.owner ?? "Unassigned"}
                    </div>
                    {e.receipts && e.receipts.length > 0 && (
                      <div className="mt-2 text-xs text-white/50">
                        {e.receipts.length} receipt{e.receipts.length !== 1 ? "s" : ""} attached
                      </div>
                    )}
                  </div>
                  <div className={`text-sm font-semibold ${e.amount < 0 ? "text-rose-400" : "text-emerald-400"}`}>
                    {formatMoney(e.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white/50 py-8">No events in this lane yet.</div>
        )}
      </div>
    </div>
  );
}