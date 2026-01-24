"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TickerMarquee } from "@/components/warroom/TickerMarquee";
import { useWarRoomStream } from "@/components/warroom/useWarRoomStream";
import type { LaneKey, WarEvent, EvidenceReceipt } from "@/lib/warroom/types";

const laneMeta: Record<LaneKey, { label: string; headline: string }> = {
  value: { label: "Verified Savings Ledger", headline: "Reconcile value with receipts and owners." },
  controls: { label: "Controls & Compliance", headline: "Continuous controls. Evidence-first posture." },
  agentic: { label: "Agentic Ops & Sales", headline: "Governed automation with telemetry and gates." },
  marketplace: { label: "Marketplace Execution", headline: "Ship once. Distribute with low delivery drag." },
};

function formatMoney(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

function LaneCard({ lane, events, summary }: { lane: LaneKey; events: WarEvent[]; summary: { identified: number; approved: number; realized: number; atRisk: number } }) {
  const laneEvents = useMemo(() => events.filter((e) => e.lane === lane).slice(0, 3), [events, lane]);

  return (
    <div className="k-panel p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{laneMeta[lane].label}</div>
          <div className="text-xs text-white/60 mt-1">{laneMeta[lane].headline}</div>
        </div>
        <Link
          href={`/war-room/${lane}`}
          className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
        >
          View all
        </Link>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-center">
        <div>
          <div className="text-xs text-white/60">Identified</div>
          <div className="text-sm font-semibold text-blue-400">{formatMoney(summary.identified)}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Approved</div>
          <div className="text-sm font-semibold text-green-400">{formatMoney(summary.approved)}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Realized</div>
          <div className="text-sm font-semibold text-emerald-400">{formatMoney(summary.realized)}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">At Risk</div>
          <div className="text-sm font-semibold text-red-400">{formatMoney(summary.atRisk)}</div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {laneEvents.map((e) => (
          <div key={e.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="text-sm text-white/85">{e.title}</div>
              <div className="text-xs text-white/70 font-medium whitespace-nowrap">{formatMoney(e.amount)}</div>
            </div>
            {e.subtitle && <div className="text-xs text-white/55 mt-1">{e.subtitle}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function EvidenceModal({ receipt, onClose }: { receipt: EvidenceReceipt; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="k-panel p-8 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div className="text-2xl font-semibold">Evidence Receipt</div>
          <button onClick={onClose} className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition">
            Close
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <div className="text-xs text-white/60 uppercase tracking-wider">Title</div>
            <div className="text-white/90 mt-1">{receipt.title}</div>
          </div>

          {receipt.hash && (
            <div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Cryptographic Hash</div>
              <div className="text-white/90 mt-1 font-mono text-sm break-all">{receipt.hash}</div>
            </div>
          )}

          {receipt.freshness && (
            <div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Freshness</div>
              <div className="text-white/90 mt-1">{receipt.freshness}</div>
            </div>
          )}

          {receipt.url && (
            <div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Source URL</div>
              <a href={receipt.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 mt-1 block break-all">
                {receipt.url}
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="text-sm text-white/70">
            This receipt is cryptographically verified and immutable. Chain-of-custody and freshness checks are enforced at the control layer.
          </div>
        </div>
      </div>
    </div>
  );
}

export function WarRoomGrid() {
  const { connected, lastUpdated, events, summaries, totals, ticker } = useWarRoomStream();
  const [selectedReceipt, setSelectedReceipt] = useState<EvidenceReceipt | null>(null);

  const lanes: LaneKey[] = ["value", "controls", "agentic", "marketplace"];

  return (
    <div className="py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-3xl font-semibold tracking-tight">War Room</div>
          <div className="text-white/65 mt-2">Real-time value ledger and control monitoring</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-white/50">
            {connected ? "🟢 Live" : "🔴 Disconnected"}
          </div>
          {lastUpdated && (
            <div className="text-xs text-white/40 mt-1">
              Updated {new Date(lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      <TickerMarquee items={ticker} />

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <div className="k-panel p-6">
          <div className="text-lg font-semibold">Portfolio Totals</div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-white/60">Total Identified</div>
              <div className="text-2xl font-semibold text-blue-400">{formatMoney(totals.identified)}</div>
            </div>
            <div>
              <div className="text-xs text-white/60">Total Approved</div>
              <div className="text-2xl font-semibold text-green-400">{formatMoney(totals.approved)}</div>
            </div>
            <div>
              <div className="text-xs text-white/60">Total Realized</div>
              <div className="text-2xl font-semibold text-emerald-400">{formatMoney(totals.realized)}</div>
            </div>
            <div>
              <div className="text-xs text-white/60">Total At Risk</div>
              <div className="text-2xl font-semibold text-red-400">{formatMoney(totals.atRisk)}</div>
            </div>
          </div>
        </div>

        <div className="k-panel p-6">
          <div className="text-lg font-semibold">Quick Actions</div>
          <div className="mt-4 space-y-2">
            <button className="w-full px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition">
              Create action packet
            </button>
            <button className="w-full px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition">
              Export evidence pack
            </button>
            <button className="w-full px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition">
              Generate CFO report
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        {lanes.map((lane) => {
          const summary = summaries.find((s) => s.lane === lane) ?? { identified: 0, approved: 0, realized: 0, atRisk: 0 };
          return <LaneCard key={lane} lane={lane} events={events} summary={summary} />;
        })}
      </div>

      {selectedReceipt && <EvidenceModal receipt={selectedReceipt} onClose={() => setSelectedReceipt(null)} />}
    </div>
  );
}