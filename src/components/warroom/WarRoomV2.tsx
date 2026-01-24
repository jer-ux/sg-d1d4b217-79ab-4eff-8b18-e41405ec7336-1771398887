"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import clsx from "clsx";
import type { LaneKey, LedgerState, WarEvent } from "@/lib/warroom/types";
import { useWarRoomStream } from "@/components/warroom/useWarRoomStream";
import TickerMarquee from "@/components/warroom/TickerMarquee";
import EvidenceDrawer from "@/components/warroom/EvidenceDrawer";
import { applyFilters, defaultFilters, formatMoney, score, type SortKey, type WarRoomFilters } from "@/components/warroom/filters";
import { approveEvent, assignOwner, closeEvent, generateReceipt } from "@/components/warroom/apiClient";

const laneMeta: Record<LaneKey, { label: string; headline: string }> = {
  value: { label: "Verified Savings Ledger", headline: "Identified → Approved → Realized with receipts and owners." },
  controls: { label: "Controls & Compliance", headline: "Continuous controls monitoring; evidence-first posture." },
  agentic: { label: "Agentic Ops & Sales", headline: "Governed automation with telemetry and gates." },
  marketplace: { label: "Marketplace Execution", headline: "Ship once. Distribute with low delivery drag." },
};

function Pill({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "px-3 py-2 rounded-xl border transition text-sm",
        on ? "border-white/25 bg-white/10 text-white" : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
      )}
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
    <button type="button" onClick={onClick} className={clsx(base, intent === "solid" ? solid : ghost, disabled && off)}>
      {label}
    </button>
  );
}

function FiltersBar({ f, setF }: { f: WarRoomFilters; setF: (next: WarRoomFilters) => void }) {
  const toggleLane = (lane: LaneKey) => {
    const next = new Set(f.lanes);
    if (next.has(lane)) {
      next.delete(lane);
    } else {
      next.add(lane);
    }
    setF({ ...f, lanes: next });
  };

  const toggleState = (st: LedgerState) => {
    const next = new Set(f.states);
    if (next.has(st)) {
      next.delete(st);
    } else {
      next.add(st);
    }
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

function EventCard({ e, onEvidence }: { e: WarEvent; onEvidence: (e: WarEvent) => void }) {
  const s = score(e);

  const handleAction = async (
    action: () => Promise<{ ok: boolean; error?: string; policyReasons?: string[] }>,
    successMsg: string
  ) => {
    const r = await action();
    if (!r.ok) {
      const reasons = r.policyReasons ?? [];
      const msg = reasons.length
        ? `Policy check failed:\n${reasons.map((reason) => `• ${reason}`).join("\n")}`
        : r.error ?? "Action failed";
      toast.error(msg);
    } else {
      toast.success(successMsg);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:bg-black/15">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-sm text-white/90 font-medium truncate">{e.title}</div>
          {e.subtitle ? <div className="text-xs text-white/60 mt-1 line-clamp-2">{e.subtitle}</div> : null}
          <div className="text-xs text-white/55 mt-2">
            {e.state.replace("_", " ")} • Owner {e.owner ?? "Unassigned"} • Conf {(e.confidence * 100).toFixed(0)}% • Score{" "}
            {s.toFixed(0)}
          </div>
        </div>
        <div className="text-sm text-white/90 font-semibold whitespace-nowrap">{formatMoney(e.amount)}</div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <ActionButton
          label="Assign"
          onClick={() => {
            const owner = prompt("Assign to (name/role):", e.owner ?? "");
            if (owner) handleAction(() => assignOwner(e.id, owner), `Assigned to ${owner}`);
          }}
        />
        {e.state === "IDENTIFIED" && (
          <ActionButton
            label="Approve"
            intent="solid"
            onClick={() => handleAction(() => approveEvent(e.id), "Event approved")}
          />
        )}
        {e.state === "APPROVED" && (
          <ActionButton
            label="Close"
            onClick={() => handleAction(() => closeEvent(e.id), "Event closed and realized")}
          />
        )}
        <ActionButton
          label="Generate receipt"
          onClick={() => handleAction(() => generateReceipt(e.id, "Auto-generated receipt"), "Receipt generated")}
        />
        {(e.receipts?.length ?? 0) > 0 && (
          <ActionButton label={`Evidence (${e.receipts?.length})`} intent="solid" onClick={() => onEvidence(e)} />
        )}
        <Link
          href={`/war-room/${e.lane}`}
          className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
        >
          Open lane
        </Link>
      </div>
    </div>
  );
}

export default function WarRoomV2() {
  const { connected, lastUpdated, events, summaries, totals, ticker } = useWarRoomStream();
  const [filters, setFilters] = useState(defaultFilters());
  const [evidenceOpen, setEvidenceOpen] = useState<WarEvent | null>(null);

  const filtered = useMemo(() => applyFilters(events, filters), [events, filters]);

  const byLane = useMemo(() => {
    const map: Record<LaneKey, WarEvent[]> = { value: [], controls: [], agentic: [], marketplace: [] };
    for (const e of filtered) map[e.lane].push(e);
    return map;
  }, [filtered]);

  const summaryMap = useMemo(() => {
    const m = new Map<LaneKey, any>();
    for (const s of summaries as any[]) m.set(s.lane, s);
    return m;
  }, [summaries]);

  return (
    <div className="min-h-[calc(100vh-72px)] py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div>
            <div className="text-3xl font-semibold tracking-tight">Kincaid IQ War Room</div>
            <div className="text-white/65 mt-2">Four tiles. One ledger. Evidence-first decisions.</div>
            <div className="text-xs text-white/55 mt-2">
              Status: <span className="text-white/80">{connected ? "Connected" : "Disconnected"}</span>
              {lastUpdated ? (
                <span className="text-white/50"> • Last update {new Date(lastUpdated).toLocaleTimeString()}</span>
              ) : null}
              <span className="text-white/50"> • Showing {filtered.length} event(s)</span>
            </div>
          </div>

          <div className="flex-1 lg:ml-6">
            <TickerMarquee items={ticker} />
          </div>
        </div>

        <div className="mt-6">
          <FiltersBar f={filters} setF={setFilters} />
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          {(["value", "controls", "agentic", "marketplace"] as LaneKey[]).map((lane) => {
            const s = summaryMap.get(lane) ?? { identified: 0, approved: 0, realized: 0, atRisk: 0 };
            const laneEvents = byLane[lane].slice(0, 4);

            return (
              <div key={lane} className="k-panel p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold">{laneMeta[lane].label}</div>
                    <div className="text-sm text-white/65 mt-1">{laneMeta[lane].headline}</div>
                  </div>
                  <Link
                    href={`/war-room/${lane}`}
                    className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition text-sm"
                  >
                    Open lane
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <SmallStat label="Identified" value={s.identified} />
                  <SmallStat label="Approved" value={s.approved} />
                  <SmallStat label="Realized" value={s.realized} />
                  <SmallStat label="At-risk" value={s.atRisk} />
                </div>

                <div className="mt-4 space-y-3">
                  {laneEvents.length === 0 ? (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/65">
                      No events match current filters for this lane.
                    </div>
                  ) : (
                    laneEvents.map((e) => <EventCard key={e.id} e={e} onEvidence={setEvidenceOpen} />)
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <EvidenceDrawer openEvent={evidenceOpen} onClose={() => setEvidenceOpen(null)} />
      </div>
    </div>
  );
}