"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LaneKey, LedgerState, WarEvent } from "@/lib/warroom/types";
import { useWarRoomStream } from "@/components/warroom/useWarRoomStream";
import { TickerMarquee } from "@/components/warroom/TickerMarquee";
import { EvidenceDrawer } from "@/components/warroom/EvidenceDrawer";
import { applyFilters, defaultFilters, formatMoney, score, type SortKey, type WarRoomFilters } from "@/components/warroom/filters";
import { approveEvent, assignOwner, closeEvent, generateReceipt } from "@/components/warroom/apiClient";

const laneMeta: Record<LaneKey, { label: string; headline: string }> = {
  value: { label: "Verified Savings Ledger", headline: "Identified → Approved → Realized with receipts and owners." },
  controls: { label: "Controls & Compliance", headline: "Continuous controls monitoring; audit-first evidence posture." },
  agentic: { label: "Agentic Ops & Sales", headline: "Governed automation with telemetry and gates." },
  marketplace: { label: "Marketplace Execution", headline: "Ship once. Distribute with low delivery drag." },
};

function Pill({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 rounded-xl border transition text-sm ${
        on ? "border-white/25 bg-white/10 text-white" : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function SmallStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-white/55">{label}</div>
      <div className="text-sm text-white/85 font-medium">{formatMoney(value)}</div>
    </div>
  );
}

function ActionButton({
  label,
  intent = "ghost",
  disabled,
  onClick,
}: {
  label: string;
  intent?: "ghost" | "solid";
  disabled?: boolean;
  onClick: () => void;
}) {
  const base = "px-3 py-2 rounded-xl transition text-sm";
  const solid = "bg-white text-black font-medium hover:bg-white/90";
  const ghost = "border border-white/15 bg-white/5 hover:bg-white/10";
  const off = "opacity-50 pointer-events-none";

  return (
    <button type="button" onClick={onClick} className={`${base} ${intent === "solid" ? solid : ghost} ${disabled ? off : ""}`}>
      {label}
    </button>
  );
}

function FiltersBar({ f, setF }: { f: WarRoomFilters; setF: (next: WarRoomFilters) => void }) {
  const toggleLane = (lane: LaneKey) => {
    const next = new Set(f.lanes);
    next.has(lane) ? next.delete(lane) : next.add(lane);
    setF({ ...f, lanes: next });
  };

  const toggleState = (st: LedgerState) => {
    const next = new Set(f.states);
    next.has(st) ? next.delete(st) : next.add(st);
    setF({ ...f, states: next });
  };

  const setSort = (sortBy: SortKey) => setF({ ...f, sortBy });
  const flipDir = () => setF({ ...f, descending: !f.descending });

  return (
    <div className="k-panel p-5">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          <Pill on={f.lanes.has("value")} label="Value" onClick={() => toggleLane("value")} />
          <Pill on={f.lanes.has("controls")} label="Controls" onClick={() => toggleLane("controls")} />
          <Pill on={f.lanes.has("agentic")} label="Agentic" onClick={() => toggleLane("agentic")} />
          <Pill on={f.lanes.has("marketplace")} label="Marketplace" onClick={() => toggleLane("marketplace")} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Pill on={f.states.has("IDENTIFIED")} label="Identified" onClick={() => toggleState("IDENTIFIED")} />
          <Pill on={f.states.has("APPROVED")} label="Approved" onClick={() => toggleState("APPROVED")} />
          <Pill on={f.states.has("REALIZED")} label="Realized" onClick={() => toggleState("REALIZED")} />
          <Pill on={f.states.has("AT_RISK")} label="At-risk" onClick={() => toggleState("AT_RISK")} />
        </div>
      </div>

      <div className="mt-4 grid lg:grid-cols-12 gap-3 items-center">
        <div className="lg:col-span-5">
          <input
            value={f.q}
            onChange={(e) => setF({ ...f, q: e.target.value })}
            placeholder="Search events, owners, keywords…"
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
          />
        </div>

        <div className="lg:col-span-4 flex items-center gap-3">
          <div className="text-xs text-white/55 w-28">Min confidence</div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(f.minConfidence * 100)}
            onChange={(e) => setF({ ...f, minConfidence: Number(e.target.value) / 100 })}
            className="w-full"
          />
          <div className="text-xs text-white/65 w-12">{Math.round(f.minConfidence * 100)}%</div>
        </div>

        <div className="lg:col-span-3 flex items-center gap-2 justify-end">
          <select
            value={f.sortBy}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm text-white/90 outline-none focus:border-white/25"
          >
            <option value="score">Sort: Score</option>
            <option value="amount">Sort: Amount</option>
            <option value="confidence">Sort: Confidence</option>
            <option value="updated">Sort: Updated</option>
          </select>
          <button
            type="button"
            onClick={flipDir}
            className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            {f.descending ? "Desc" : "Asc"}
          </button>
          <button
            type="button"
            onClick={() => setF(defaultFilters())}
            className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function EventCard({
  e,
  onEvidence,
}: {
  e: WarEvent;
  onEvidence: (e: WarEvent) => void;
}) {
  const [loading, setLoading] = useState(false);
  const s = score(e);

  async function handleAction(fn: () => Promise<any>) {
    setLoading(true);
    try {
      await fn();
    } catch (err: any) {
      // Error already shown by apiClient
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:bg-black/15">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-sm text-white/90 font-medium truncate">{e.title}</div>
          {e.subtitle ? <div className="text-xs text-white/60 mt-1 line-clamp-2">{e.subtitle}</div> : null}
          <div className="text-xs text-white/55 mt-2">
            {e.state.replace("_", " ")} • Owner {e.owner ?? "Unassigned"} • Conf {(e.confidence * 100).toFixed(0)}% • Score {s.toFixed(0)}
          </div>
        </div>
        <div className={`text-sm font-semibold whitespace-nowrap ${e.amount < 0 ? "text-red-400" : "text-white/90"}`}>
          {formatMoney(e.amount)}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <ActionButton
          label="Assign"
          disabled={loading}
          onClick={() =>
            handleAction(async () => {
              const owner = prompt("Assign to (name/role):", e.owner ?? "Finance Ops");
              if (owner) await assignOwner(e.id, owner);
            })
          }
        />

        {e.state === "IDENTIFIED" && (
          <ActionButton
            label="Approve"
            disabled={loading}
            onClick={() =>
              handleAction(async () => {
                if (confirm("Approve this event?")) await approveEvent(e.id);
              })
            }
          />
        )}

        {e.state === "APPROVED" && (
          <ActionButton
            label="Close"
            disabled={loading}
            onClick={() =>
              handleAction(async () => {
                if (confirm("Close and realize value?")) await closeEvent(e.id);
              })
            }
          />
        )}

        <ActionButton
          label="Generate receipt"
          disabled={loading}
          onClick={() => handleAction(async () => await generateReceipt(e.id))}
        />

        {(e.receipts?.length ?? 0) > 0 && (
          <ActionButton label={`Evidence (${e.receipts?.length})`} intent="solid" onClick={() => onEvidence(e)} />
        )}
      </div>
    </div>
  );
}

export function WarRoomV2() {
  const { connected, lastUpdated, events, summaries, totals, ticker } = useWarRoomStream();
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
            <div
              className={`w-2 h-2 rounded-full ${
                connected ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500"
              }`}
            />
            {connected ? "Live Stream Active" : "Disconnected"}
          </div>
          {lastUpdated && <div className="text-xs text-white/40">Last update: {new Date(lastUpdated).toLocaleTimeString()}</div>}
        </div>
      </div>

      {/* Ticker */}
      <TickerMarquee items={ticker} />

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
        <FiltersBar f={filters} setF={setFilters} />
      </div>

      {/* Results */}
      <div className="mt-6 k-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-semibold">
            Events ({filtered.length} of {events.length})
          </div>
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
              <div className="mt-3 grid grid-cols-2 gap-2">
                <SmallStat label="Identified" value={s.identified} />
                <SmallStat label="Approved" value={s.approved} />
                <SmallStat label="Realized" value={s.realized} />
                <SmallStat label="At Risk" value={s.atRisk} />
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