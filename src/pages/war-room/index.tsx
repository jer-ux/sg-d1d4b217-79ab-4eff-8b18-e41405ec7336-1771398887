import { SEO } from "@/components/SEO";
import { SplitPane } from "@/components/SplitPane";
import React, { useEffect, useMemo, useState } from "react";

type TileAccent = "neutral" | "good" | "warn" | "bad";
type TileView = "VARIANCE" | "VALIDATED" | "IN_FLIGHT" | "TRUST";

interface MockEvent {
  id: string;
  title: string;
  type: string;
  status: string;
  identified_value: number;
  confidence: number;
  time_sensitivity: number;
  execution_friction: number;
  score: number;
  owner_role: string;
  evidence_receipt_id: string;
  receipt_status: string;
  stage?: string;
  amount?: number;
  owner?: string;
  receipt?: string;
  method?: string;
}

function money(n: number) {
  const sign = n < 0 ? "-" : "";
  const v = Math.abs(n);
  return `${sign}$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function Tile({
  label,
  value,
  subLeft,
  subRight,
  accent = "neutral",
  onClick,
}: {
  label: string;
  value: string;
  subLeft?: string;
  subRight?: string;
  accent?: TileAccent;
  onClick?: () => void;
}) {
  const accentCls =
    accent === "good"
      ? "border-emerald-400/30 bg-emerald-400/10"
      : accent === "warn"
      ? "border-yellow-400/30 bg-yellow-400/10"
      : accent === "bad"
      ? "border-red-400/30 bg-red-400/10"
      : "border-gray-600/40 bg-gray-800/40";

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={[
        "relative rounded-2xl border p-4 backdrop-blur-xl",
        "shadow-[0_18px_60px_rgba(0,0,0,0.55)]",
        "transition transform-gpu",
        "hover:-translate-y-0.5 hover:scale-[1.01] cursor-pointer",
        accentCls,
      ].join(" ")}
    >
      <div className="text-[11px] text-gray-400">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight tabular-nums text-gray-100">{value}</div>
      <div className="mt-2 flex items-center justify-between text-[12px] text-gray-400">
        <span className="tabular-nums">{subLeft ?? ""}</span>
        <span className="tabular-nums">{subRight ?? ""}</span>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl">
        <div className="absolute -top-24 left-10 h-48 w-96 rounded-full bg-gray-700/20 blur-3xl opacity-60" />
        <div className="absolute -top-10 right-6 h-24 w-56 rounded-full bg-emerald-300/10 blur-2xl opacity-60" />
      </div>
    </div>
  );
}

function Drawer({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-[520px] border-l border-gray-700 bg-gray-900/95 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
          <div className="text-sm font-semibold text-gray-100">{title}</div>
          <button
            onClick={onClose}
            className="text-xs px-3 py-2 rounded-xl border border-gray-600 hover:bg-gray-800 text-gray-200"
          >
            Close
          </button>
        </div>
        <div className="p-4 overflow-auto h-[calc(100%-56px)]">{children}</div>
      </div>
    </div>
  );
}

function mockWarRoom() {
  const asOf = new Date().toISOString();

  const baseline = 5.6;
  const actual = 6.4;
  const delta = +(actual - baseline).toFixed(1);

  const ledger = {
    identified: 4_820_000,
    approved: 2_130_000,
    realized: 1_620_000,
    at_risk: 410_000,
  };

  const ebitda = {
    ytd_validated: ledger.realized,
    mtd_validated: 210_000,
    confidence: 0.86,
  };

  const data_health = {
    freshness_hours: 22,
    dq_pass_rate: 0.973,
    verified_receipts_rate: 0.84,
    open_incidents: 3,
  };

  const drivers = [
    { label: "Utilization", delta_pct: +0.9, note: "OP/ED mix shift" },
    { label: "Unit cost", delta_pct: +0.6, note: "allowed amount inflation" },
    { label: "Rx effective rate", delta_pct: -0.4, note: "rebate timing / NDC mix" },
    { label: "Eligibility leakage", delta_pct: +0.3, note: "TERM lag / dependents" },
  ];

  const inFlight = [
    { id: "EVT-014", title: "PBM rebate true-up variance", stage: "IMPLEMENTED", amount: 420_000, owner: "Finance", receipt: "VERIFIED" },
    { id: "EVT-006", title: "Eligibility dependent leakage", stage: "ACCEPTED", amount: 190_000, owner: "Benefits Ops", receipt: "DEGRADED" },
    { id: "EVT-009", title: "Stop-loss reimbursement lag", stage: "ACCEPTED", amount: 260_000, owner: "Vendor Manager", receipt: "VERIFIED" },
  ];

  const validated = [
    { id: "EVT-003", title: "Duplicate claim line pattern", amount: 540_000, method: "reconciliation + reversal file" },
    { id: "EVT-001", title: "Rx effective rate above guarantee", amount: 680_000, method: "guarantee true-up" },
    { id: "EVT-011", title: "Carrier funding mismatch", amount: 400_000, method: "funding rec + credit memo" },
  ];

  const unverified = [
    { id: "EVT-018", title: "Network disruption risk signal", type: "MEDICAL", status: "RECOMMENDED", receipt: "UNVERIFIED" },
    { id: "EVT-022", title: "High-cost claimant emerging risk", type: "STOPLOSS", status: "ACCEPTED", receipt: "DEGRADED" },
  ];

  const events: MockEvent[] = [
    ...inFlight.map(e => ({
      ...e,
      identified_value: e.amount || 0,
      confidence: 0.85,
      time_sensitivity: 0.9,
      execution_friction: 0.3,
      score: Math.round((e.amount || 0) * 0.85 * 0.9 / 0.3),
      owner_role: e.owner || "Finance",
      evidence_receipt_id: `RCP-${Math.floor(Math.random() * 90000) + 10000}`,
      receipt_status: e.receipt || "VERIFIED",
      type: "PBM",
      status: e.stage || "ACCEPTED",
    })),
    ...validated.map(e => ({
      ...e,
      identified_value: e.amount || 0,
      confidence: 0.92,
      time_sensitivity: 0.85,
      execution_friction: 0.2,
      score: Math.round((e.amount || 0) * 0.92 * 0.85 / 0.2),
      owner_role: "Finance",
      evidence_receipt_id: `RCP-${Math.floor(Math.random() * 90000) + 10000}`,
      receipt_status: "VERIFIED",
      type: "MEDICAL",
      status: "VALIDATED",
    })),
    ...unverified.map(e => ({
      ...e,
      identified_value: Math.round(Math.random() * 300000 + 100000),
      confidence: 0.65,
      time_sensitivity: 0.7,
      execution_friction: 0.5,
      score: 0,
      owner_role: "Benefits Ops",
      evidence_receipt_id: `RCP-${Math.floor(Math.random() * 90000) + 10000}`,
      receipt_status: e.receipt || "UNVERIFIED",
    })),
  ];

  return { asOf, baseline, actual, delta, ledger, ebitda, data_health, drivers, inFlight, validated, unverified, events };
}

function Badge({ status }: { status: string }) {
  const cls =
    status === "VERIFIED"
      ? "bg-emerald-400/20 text-emerald-300 border-emerald-400/30"
      : status === "DEGRADED"
      ? "bg-yellow-400/20 text-yellow-300 border-yellow-400/30"
      : "bg-red-400/20 text-red-300 border-red-400/30";

  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${cls}`}>
      {status}
    </span>
  );
}

export default function WarRoom4Tile() {
  const [data, setData] = useState(() => mockWarRoom());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState<TileView>("VARIANCE");
  const [mounted, setMounted] = useState(false);
  const [activeEvent, setActiveEvent] = useState<MockEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setData(mockWarRoom());
  }, []);

  const trustAccent: TileAccent =
    data.data_health.verified_receipts_rate >= 0.85 &&
    data.data_health.dq_pass_rate >= 0.95 &&
    data.data_health.freshness_hours <= 24
      ? "good"
      : "warn";

  const varianceAccent: TileAccent = data.delta > 0 ? "bad" : "good";

  const open = (v: TileView) => {
    setView(v);
    setDrawerOpen(true);
  };

  const title = useMemo(() => {
    if (view === "VARIANCE") return "Variance Drivers (Actual vs Baseline)";
    if (view === "VALIDATED") return "Validated Savings Ledger";
    if (view === "IN_FLIGHT") return "In-Flight Actions (Approved)";
    return "Trust & Controls (DQ + Freshness + Receipts)";
  }, [view]);

  const eventsFiltered = useMemo(() => {
    let filtered = data.events;
    
    if (searchQuery) {
      filtered = filtered.filter(e => 
        e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== "All") {
      filtered = filtered.filter(e => e.status === statusFilter);
    }
    
    return filtered.sort((a, b) => b.score - a.score);
  }, [data.events, searchQuery, statusFilter]);

  return (
    <>
      <SEO
        title="War Room - SiriusB iQ AI Data Sciences Lab"
        description="CFO War Room - Real-time financial operations intelligence"
      />
      <div className="warroom-console min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-gray-900/50 to-black/50" />
          <div className="absolute -top-24 left-10 h-[520px] w-[920px] rounded-full bg-emerald-300/5 blur-3xl" />
          <div className="absolute -top-20 right-10 h-[420px] w-[760px] rounded-full bg-sky-300/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(70% 55% at 50% 20%, black 40%, transparent 75%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-[1400px] px-4 py-6">
          <div className="mb-5">
            <div className="text-[11px] text-gray-500">SiriusB iQ • CFO War Room</div>
            <div className="text-lg font-semibold tracking-tight text-gray-100">/war-room</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            <Tile
              label="Trend vs Baseline"
              value={`${data.actual.toFixed(1)}%`}
              subLeft={`Baseline ${data.baseline.toFixed(1)}%`}
              subRight={`${data.delta > 0 ? "+" : ""}${data.delta.toFixed(1)}%`}
              accent={varianceAccent}
              onClick={() => open("VARIANCE")}
            />
            <Tile
              label="Validated EBITDA (YTD)"
              value={money(data.ebitda.ytd_validated)}
              subLeft={`MTD +${money(data.ebitda.mtd_validated)}`}
              subRight={`Conf ${pct(data.ebitda.confidence)}`}
              accent="good"
              onClick={() => open("VALIDATED")}
            />
            <Tile
              label="In-Flight (Approved)"
              value={money(data.ledger.approved)}
              subLeft={`Identified ${money(data.ledger.identified)}`}
              subRight={`At-risk ${money(data.ledger.at_risk)}`}
              accent="warn"
              onClick={() => open("IN_FLIGHT")}
            />
            <Tile
              label="Trust & Controls"
              value={`${Math.round(data.data_health.verified_receipts_rate * 100)}%`}
              subLeft={`DQ ${(data.data_health.dq_pass_rate * 100).toFixed(1)}%`}
              subRight={`Fresh ${data.data_health.freshness_hours}h`}
              accent={trustAccent}
              onClick={() => open("TRUST")}
            />
          </div>

          <SplitPane
            storageKey="kincaid.warroom.split.v1"
            defaultLeftPct={60}
            minLeftPct={45}
            maxLeftPct={70}
            left={
              <div className="h-[600px] overflow-y-auto p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-white/50">Exceptions Queue</div>
                    <div className="text-sm font-semibold">Ranked Arbitrage Events</div>
                  </div>
                  <button className="text-[11px] px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5">
                    Refresh
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                    placeholder="Search events…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select 
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option>All</option>
                    <option>RECOMMENDED</option>
                    <option>ACCEPTED</option>
                    <option>IMPLEMENTED</option>
                    <option>VALIDATED</option>
                  </select>
                </div>

                <div className="space-y-2">
                  {eventsFiltered.map((e) => (
                    <div
                      key={e.id}
                      onClick={() => setActiveEvent(e)}
                      className={`rounded-xl border p-3 hover:bg-white/5 cursor-pointer transition ${
                        activeEvent?.id === e.id ? "border-emerald-400/50 bg-emerald-400/5" : "border-white/10 bg-black/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{e.id} • {e.title}</div>
                        <div className="text-[11px] text-white/50 tabular-nums">Score {e.score.toLocaleString()}</div>
                      </div>
                      <div className="mt-1 text-[11px] text-white/50">
                        Owner: {e.owner_role} • Receipt: {e.receipt_status} • Value: {money(e.identified_value)}
                      </div>
                      <div className="mt-2 flex gap-2">
                        <Badge status={e.receipt_status} />
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/20 text-white/60">{e.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
            right={
              <div className="h-[600px] overflow-y-auto p-4 space-y-3">
                <div>
                  <div className="text-[11px] text-white/50">Proof Rail</div>
                  <div className="text-sm font-semibold">Evidence • Action Packet • Activity</div>
                </div>

                {activeEvent ? (
                  <>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <div className="text-xs text-white/50 mb-2">Selected Event</div>
                      <div className="text-lg font-semibold">{activeEvent.id}</div>
                      <div className="text-sm text-white/70 mt-1">{activeEvent.title}</div>
                      
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-[11px] text-white/50">Value</div>
                          <div className="font-semibold tabular-nums">{money(activeEvent.identified_value)}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/50">Confidence</div>
                          <div className="font-semibold tabular-nums">{pct(activeEvent.confidence)}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/50">Time Sensitivity</div>
                          <div className="font-semibold tabular-nums">{pct(activeEvent.time_sensitivity)}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-white/50">Friction</div>
                          <div className="font-semibold tabular-nums">{pct(activeEvent.execution_friction)}</div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-[11px] text-white/50">Evidence Receipt</div>
                        <div className="text-sm font-mono">{activeEvent.evidence_receipt_id}</div>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <Badge status={activeEvent.receipt_status} />
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/20 text-white/60">{activeEvent.type}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/20 text-white/60">{activeEvent.status}</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-[11px] text-white/50 mb-3">Quick Actions</div>
                      <div className="space-y-2">
                        <button className="w-full text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-left">
                          Open Evidence Receipt
                        </button>
                        <button className="w-full text-sm px-3 py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600">
                          Action Packet
                        </button>
                        <button className="w-full text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-left">
                          Download Proof Pack (PDF)
                        </button>
                      </div>
                      <div className="mt-3 text-[11px] text-white/50">
                        Gate: no status changes if receipt is UNVERIFIED.
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                    Select an event to view Evidence Receipt, Why Ranked, and download Proof Pack.
                  </div>
                )}
              </div>
            }
          />

          <div className="xl:hidden mt-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[11px] text-white/50">Exceptions Queue</div>
              <div className="text-sm font-semibold mt-1">Ranked Arbitrage Events</div>
              
              <div className="mt-3 flex gap-2">
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                  placeholder="Search events…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select 
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>RECOMMENDED</option>
                  <option>ACCEPTED</option>
                  <option>IMPLEMENTED</option>
                  <option>VALIDATED</option>
                </select>
              </div>

              <div className="mt-3 space-y-2">
                {eventsFiltered.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => setActiveEvent(e)}
                    className={`rounded-xl border p-3 hover:bg-white/5 cursor-pointer transition ${
                      activeEvent?.id === e.id ? "border-emerald-400/50 bg-emerald-400/5" : "border-white/10 bg-black/20"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{e.id} • {e.title}</div>
                      <div className="text-[11px] text-white/50 tabular-nums">Score {e.score.toLocaleString()}</div>
                    </div>
                    <div className="mt-1 text-[11px] text-white/50">
                      Owner: {e.owner_role} • Receipt: {e.receipt_status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {activeEvent && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-[11px] text-white/50">Proof Rail</div>
                <div className="text-sm font-semibold mt-1">Event Details</div>
                
                <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-lg font-semibold">{activeEvent.id}</div>
                  <div className="text-sm text-white/70 mt-1">{activeEvent.title}</div>
                  
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/50">Value</span>
                      <span className="font-semibold tabular-nums">{money(activeEvent.identified_value)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Confidence</span>
                      <span className="font-semibold tabular-nums">{pct(activeEvent.confidence)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-[12px] text-gray-500">
            {mounted && `As of ${new Date(data.asOf).toLocaleString()}`} • Identified {money(data.ledger.identified)} • Approved {money(data.ledger.approved)} • Realized {money(data.ledger.realized)}
          </div>
        </div>

        <Drawer open={drawerOpen} title={title} onClose={() => setDrawerOpen(false)}>
          {view === "VARIANCE" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-3">
                <div className="text-[11px] text-gray-500">Trend Summary</div>
                <div className="mt-2 text-sm tabular-nums text-gray-200">
                  Baseline {data.baseline.toFixed(1)}% → Actual {data.actual.toFixed(1)}%{" "}
                  <span className={`ml-2 font-semibold ${data.delta > 0 ? "text-red-300" : "text-emerald-300"}`}>
                    {data.delta > 0 ? "+" : ""}
                    {data.delta.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-gray-700 bg-gray-800/50 overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-700 text-[11px] text-gray-500">
                  Attribution (Drivers)
                </div>
                <div className="divide-y divide-gray-700/50">
                  {data.drivers.map((d) => (
                    <div key={d.label} className="px-3 py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-200">{d.label}</div>
                        <div className="text-[11px] text-gray-500">{d.note}</div>
                      </div>
                      <div
                        className={`text-sm font-semibold tabular-nums ${
                          d.delta_pct > 0 ? "text-red-300" : "text-emerald-300"
                        }`}
                      >
                        {d.delta_pct > 0 ? "+" : ""}
                        {d.delta_pct.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "VALIDATED" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-3">
                <div className="text-[11px] text-gray-500">Validated Total</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums text-gray-100">{money(data.ledger.realized)}</div>
              </div>

              <div className="rounded-xl border border-gray-700 bg-gray-800/50 overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-700 text-[11px] text-gray-500">
                  Journal Entries (Validated)
                </div>
                <div className="divide-y divide-gray-700/50">
                  {data.validated.map((v) => (
                    <div key={v.id} className="px-3 py-3">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-200">{v.id}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">{v.title}</div>
                        </div>
                        <div className="text-sm font-semibold tabular-nums text-gray-200">{money(v.amount)}</div>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-2">Method: {v.method}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "IN_FLIGHT" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-3">
                <div className="text-[11px] text-gray-500">Approved Total</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums text-gray-100">{money(data.ledger.approved)}</div>
              </div>

              <div className="rounded-xl border border-gray-700 bg-gray-800/50 overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-700 text-[11px] text-gray-500">In-Flight Queue</div>
                <div className="divide-y divide-gray-700/50">
                  {data.inFlight.map((f) => (
                    <div key={f.id} className="px-3 py-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-200">{f.id}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">{f.title}</div>
                        </div>
                        <div className="text-sm font-semibold tabular-nums text-gray-200">{money(f.amount)}</div>
                      </div>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="text-gray-400">Stage: {f.stage}</span>
                        <Badge status={f.receipt} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "TRUST" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-3">
                <div className="text-[11px] text-gray-500">Controls Summary</div>
                <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-3">
                    <div className="text-[11px] text-gray-500">Receipts VERIFIED</div>
                    <div className="mt-1 text-xl font-semibold tabular-nums text-gray-100">
                      {Math.round(data.data_health.verified_receipts_rate * 100)}%
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-3">
                    <div className="text-[11px] text-gray-500">DQ pass rate</div>
                    <div className="mt-1 text-xl font-semibold tabular-nums text-gray-100">
                      {(data.data_health.dq_pass_rate * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </>
  );
}