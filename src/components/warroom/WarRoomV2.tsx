"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LaneKey, LedgerState, WarEvent } from "@/lib/warroom/types";
import { useWarRoomStream } from "@/components/warroom/useWarRoomStream";
import { TickerMarquee } from "@/components/warroom/TickerMarquee";
import EvidenceDrawer from "@/components/warroom/EvidenceDrawer";
import { applyFilters, defaultFilters, formatMoney, score, type SortKey, type WarRoomFilters } from "@/components/warroom/filters";
import { approveEvent, assignOwner, closeEvent, generateReceipt } from "@/components/warroom/apiClient";

const laneMeta: Record<LaneKey, { label: string; headline: string; color: string }> = {
  value: { label: "Verified Savings Ledger", headline: "Reconcile value with receipts and owners.", color: "blue" },
  controls: { label: "Controls & Compliance", headline: "Continuous controls. Evidence-first posture.", color: "purple" },
  agentic: { label: "Agentic Ops & Sales", headline: "Governed automation with telemetry and gates.", color: "green" },
  marketplace: { label: "Marketplace Execution", headline: "Ship once. Distribute with low delivery drag.", color: "orange" },
};

function FilterBar({ filters, onChange }: { filters: WarRoomFilters; onChange: (f: WarRoomFilters) => void }) {
  const lanes: LaneKey[] = ["value", "controls", "agentic", "marketplace"];
  const states: LedgerState[] = ["IDENTIFIED", "APPROVED", "REALIZED", "AT_RISK"];
  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "score", label: "Action Score" },
    { key: "amount", label: "Amount" },
    { key: "confidence", label: "Confidence" },
    { key: "updated", label: "Last Updated" },
  ];

  return (
    <div className="k-panel p-4 space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs text-white/60 uppercase tracking-wider block mb-1">Search</label>
          <input
            type="text"
            value={filters.q}
            onChange={(e) => onChange({ ...filters, q: e.target.value })}
            placeholder="Search events..."
            className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-white/90 text-sm placeholder:text-white/40 focus:outline-none focus:border-white/30"
          />
        </div>

        {/* Sort */}
        <div className="min-w-[160px]">
          <label className="text-xs text-white/60 uppercase tracking-wider block mb-1">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ ...filters, sortBy: e.target.value as SortKey })}
            className="w-full px-3 py-2 rounded-lg bg-black/20 border border-white/10 text-white/90 text-sm focus:outline-none focus:border-white/30"
          >
            {sortOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Direction */}
        <button
          type="button"
          onClick={() => onChange({ ...filters, descending: !filters.descending })}
          className="px-3 py-2 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          title={filters.descending ? "Descending" : "Ascending"}
        >
          {filters.descending ? "↓" : "↑"}
        </button>

        {/* Min Confidence */}
        <div className="min-w-[140px]">
          <label className="text-xs text-white/60 uppercase tracking-wider block mb-1">
            Min Confidence: {(filters.minConfidence * 100).toFixed(0)}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.minConfidence * 100}
            onChange={(e) => onChange({ ...filters, minConfidence: parseInt(e.target.value) / 100 })}
            className="w-full"
          />
        </div>
      </div>

      {/* Lane Filters */}
      <div>
        <label className="text-xs text-white/60 uppercase tracking-wider block mb-2">Lanes</label>
        <div className="flex flex-wrap gap-2">
          {lanes.map((lane) => (
            <button
              key={lane}
              type="button"
              onClick={() => {
                const next = new Set(filters.lanes);
                if (next.has(lane)) next.delete(lane);
                else next.add(lane);
                onChange({ ...filters, lanes: next });
              }}
              className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition ${
                filters.lanes.has(lane)
                  ? "border-white/30 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {laneMeta[lane].label}
            </button>
          ))}
        </div>
      </div>

      {/* State Filters */}
      <div>
        <label className="text-xs text-white/60 uppercase tracking-wider block mb-2">States</label>
        <div className="flex flex-wrap gap-2">
          {states.map((state) => (
            <button
              key={state}
              type="button"
              onClick={() => {
                const next = new Set(filters.states);
                if (next.has(state)) next.delete(state);
                else next.add(state);
                onChange({ ...filters, states: next });
              }}
              className={`px-3 py-1.5 rounded-lg border text-sm transition ${
                filters.states.has(state)
                  ? state === "AT_RISK"
                    ? "border-red-500/50 bg-red-500/20 text-red-300"
                    : state === "REALIZED"
                    ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300"
                    : "border-white/30 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10"
              }`}
            >
              {state.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventCard({ e, onEvidence }: { e: WarEvent; onEvidence: (e: WarEvent) => void }) {
  const [loading, setLoading] = useState(false);

  async function handleAction(fn: () => Promise<any>, successMsg?: string) {
    setLoading(true);
    try {
      await fn();
      if (successMsg) alert(successMsg);
    } catch (err: any) {
      alert(err.message || "Action failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 hover:bg-black/30 transition">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-sm text-white/90 font-medium">{e.title}</div>
          {e.subtitle && <div className="text-xs text-white/60 mt-1">{e.subtitle}</div>}

          <div className="text-xs text-white/45 mt-3 flex flex-wrap gap-2 items-center">
            <span
              className={`px-2 py-0.5 rounded ${
                e.state === "AT_RISK"
                  ? "bg-red-500/20 text-red-300"
                  : e.state === "REALIZED"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : e.state === "APPROVED"
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-white/10 text-white/70"
              }`}
            >
              {e.state.replace("_", " ")}
            </span>
            <span>•</span>
            <span>Conf. {(e.confidence * 100).toFixed(0)}%</span>
            <span>•</span>
            <span>Time {(e.timeSensitivity * 100).toFixed(0)}%</span>
            <span>•</span>
            <span>Score: {score(e).toFixed(0)}</span>
            {e.owner && (
              <>
                <span>•</span>
                <span>Owner: {e.owner}</span>
              </>
            )}
            {(e.receipts?.length ?? 0) > 0 && (
              <>
                <span>•</span>
                <span>{e.receipts?.length} receipt(s)</span>
              </>
            )}
          </div>
        </div>

        <div className={`text-sm font-semibold whitespace-nowrap ${e.amount < 0 ? "text-red-400" : "text-white/90"}`}>
          {formatMoney(e.amount)}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={loading}
          onClick={() =>
            handleAction(async () => {
              const owner = prompt("Assign to (name/role):", e.owner ?? "Finance Ops");
              if (owner) await assignOwner(e.id, owner);
            })
          }
          className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition text-xs disabled:opacity-50"
        >
          Assign
        </button>

        {e.state === "IDENTIFIED" && (
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              handleAction(async () => {
                if (confirm("Approve this event?")) await approveEvent(e.id);
              })
            }
            className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition text-xs disabled:opacity-50"
          >
            Approve
          </button>
        )}

        {e.state === "APPROVED" && (
          <button
            type="button"
            disabled={loading}
            onClick={() =>
              handleAction(async () => {
                if (confirm("Close and realize value?")) await closeEvent(e.id);
              })
            }
            className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition text-xs disabled:opacity-50"
          >
            Close
          </button>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={() => handleAction(async () => await generateReceipt(e.id), "Receipt generated")}
          className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition text-xs disabled:opacity-50"
        >
          Generate Receipt
        </button>

        {(e.receipts?.length ?? 0) > 0 && (
          <button
            type="button"
            onClick={() => onEvidence(e)}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 transition text-xs"
          >
            View Evidence ({e.receipts?.length})
          </button>
        )}
      </div>
    </div>
  );
}

export function WarRoomV2() {
  const { connected, lastUpdated, events, summaries, totals } = useWarRoomStream();
  const [filters, setFilters] = useState<WarRoomFilters>(defaultFilters());
  const [evidenceOpen, setEvidenceOpen] = useState<WarEvent | null>(null);

  const filtered = useMemo(() => applyFilters(events, filters), [events, filters]);

  const summaryMap = useMemo(() => {
    const m = new Map<LaneKey, any>();
    for (const s of summaries as any[]) m.set(s.lane, s);
    return m;
  }, [summaries]);

  const lanes: LaneKey[] = ["value", "controls", "agentic", "marketplace"];

  return (
    <div className="py-10">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-3xl font-semibold tracking-tight">Kincaid IQ War Room</div>
          <div className="text-white/65 mt-2">Real-time value ledger with policy enforcement</div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2 text-xs text-white/50 mb-1">
            <div className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500"}`} />
            {connected ? "Live Stream Active" : "Disconnected"}
          </div>
          {lastUpdated && <div className="text-xs text-white/40">Last update: {new Date(lastUpdated).toLocaleTimeString()}</div>}
        </div>
      </div>

      {/* Ticker */}
      <TickerMarquee items={[]} />

      {/* Totals */}
      <div className="mt-6 grid md:grid-cols-4 gap-4">
        <div className="k-panel p-4 text-center">
          <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Portfolio Identified</div>
          <div className="text-2xl font-bold text-blue-400">{formatMoney(totals.identified)}</div>
        </div>
        <div className="k-panel p-4 text-center">
          <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Approved Value</div>
          <div className="text-2xl font-bold text-green-400">{formatMoney(totals.approved)}</div>
        </div>
        <div className="k-panel p-4 text-center">
          <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Realized P&L</div>
          <div className="text-2xl font-bold text-emerald-400">{formatMoney(totals.realized)}</div>
        </div>
        <div className="k-panel p-4 text-center">
          <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Value At Risk</div>
          <div className="text-2xl font-bold text-red-400">{formatMoney(totals.atRisk)}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6">
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      {/* Results */}
      <div className="mt-6 k-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">
            Events ({filtered.length} of {events.length})
          </div>
          <button
            type="button"
            onClick={() => setFilters(defaultFilters())}
            className="px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition text-xs"
          >
            Reset Filters
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <div className="text-sm">No events match your filters</div>
            <button
              type="button"
              onClick={() => setFilters(defaultFilters())}
              className="mt-3 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition text-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((e) => (
              <EventCard key={e.id} e={e} onEvidence={setEvidenceOpen} />
            ))}
          </div>
        )}
      </div>

      {/* Lane Quick Links */}
      <div className="mt-8 grid lg:grid-cols-4 gap-4">
        {lanes.map((lane) => {
          const s = summaryMap.get(lane) ?? { identified: 0, approved: 0, realized: 0, atRisk: 0 };
          return (
            <Link key={lane} href={`/war-room/${lane}`} className="k-panel p-5 hover:bg-white/5 transition group">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-semibold group-hover:text-white transition">{laneMeta[lane].label}</div>
                  <div className="text-xs text-white/55 mt-1">{laneMeta[lane].headline}</div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/30 group-hover:text-white/70 transition"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-white/50">Identified</div>
                  <div className="text-white/80 font-medium">{formatMoney(s.identified)}</div>
                </div>
                <div>
                  <div className="text-white/50">Approved</div>
                  <div className="text-white/80 font-medium">{formatMoney(s.approved)}</div>
                </div>
                <div>
                  <div className="text-white/50">Realized</div>
                  <div className="text-emerald-400 font-medium">{formatMoney(s.realized)}</div>
                </div>
                <div>
                  <div className="text-white/50">At Risk</div>
                  <div className="text-red-400 font-medium">{formatMoney(s.atRisk)}</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Evidence Drawer */}
      <EvidenceDrawer openEvent={evidenceOpen} onClose={() => setEvidenceOpen(null)} />
    </div>
  );
}