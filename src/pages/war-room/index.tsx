import { SEO } from "@/components/SEO";
import { SplitPane } from "@/components/SplitPane";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

type WarRoomView = "CFO_DASHBOARD" | "FOUR_LANE_LEDGER" | "EXECUTIVE_KPIS";

type TileAccent = "neutral" | "good" | "warn" | "bad" | "purple" | "blue" | "amber";
type TileView = "VARIANCE" | "VALIDATED" | "IN_FLIGHT" | "TRUST";

type ThemeKey = "rose" | "blue" | "amber" | "emerald" | "cyan" | "violet";

const THEME: Record<
  ThemeKey,
  {
    bar: string;
    g1: string;
    g2: string;
    g3: string;
    title: string;
    bg: string;
    border: string;
    glow: string;
  }
> = {
  rose: {
    bar: "bg-gradient-to-b from-rose-400 via-pink-500 to-fuchsia-500",
    g1: "rgba(244,63,94,0.35)",
    g2: "rgba(236,72,153,0.25)",
    g3: "rgba(217,70,239,0.20)",
    title: "text-rose-200",
    bg: "bg-rose-500/10",
    border: "border-rose-400/30",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
  },
  blue: {
    bar: "bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-500",
    g1: "rgba(59,130,246,0.35)",
    g2: "rgba(14,165,233,0.25)",
    g3: "rgba(99,102,241,0.20)",
    title: "text-sky-200",
    bg: "bg-blue-500/10",
    border: "border-blue-400/30",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
  amber: {
    bar: "bg-gradient-to-b from-amber-300 via-orange-500 to-rose-500",
    g1: "rgba(245,158,11,0.35)",
    g2: "rgba(249,115,22,0.25)",
    g3: "rgba(244,63,94,0.15)",
    title: "text-amber-200",
    bg: "bg-amber-500/10",
    border: "border-amber-400/30",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
  },
  emerald: {
    bar: "bg-gradient-to-b from-emerald-300 via-emerald-500 to-teal-500",
    g1: "rgba(16,185,129,0.35)",
    g2: "rgba(20,184,166,0.25)",
    g3: "rgba(34,197,94,0.20)",
    title: "text-emerald-200",
    bg: "bg-emerald-500/10",
    border: "border-emerald-400/30",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  cyan: {
    bar: "bg-gradient-to-b from-cyan-300 via-cyan-500 to-blue-500",
    g1: "rgba(6,182,212,0.35)",
    g2: "rgba(34,211,238,0.25)",
    g3: "rgba(59,130,246,0.20)",
    title: "text-cyan-200",
    bg: "bg-cyan-500/10",
    border: "border-cyan-400/30",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  },
  violet: {
    bar: "bg-gradient-to-b from-violet-400 via-purple-500 to-fuchsia-500",
    g1: "rgba(139,92,246,0.35)",
    g2: "rgba(168,85,247,0.25)",
    g3: "rgba(217,70,239,0.20)",
    title: "text-violet-200",
    bg: "bg-violet-500/10",
    border: "border-violet-400/30",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
  },
};

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
  theme?: ThemeKey;
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
      ? "border-emerald-400/40 bg-gradient-to-br from-emerald-400/15 to-emerald-600/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
      : accent === "warn"
      ? "border-amber-400/40 bg-gradient-to-br from-amber-400/15 to-amber-600/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
      : accent === "bad"
      ? "border-rose-400/40 bg-gradient-to-br from-rose-400/15 to-rose-600/10 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
      : accent === "purple"
      ? "border-purple-400/40 bg-gradient-to-br from-purple-400/15 to-purple-600/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
      : accent === "blue"
      ? "border-blue-400/40 bg-gradient-to-br from-blue-400/15 to-blue-600/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
      : accent === "amber"
      ? "border-amber-400/40 bg-gradient-to-br from-amber-400/15 to-orange-600/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
      : "border-gray-600/40 bg-gray-800/40";

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={[
        "relative rounded-2xl border p-5 backdrop-blur-xl",
        "shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
        "transition-all duration-300 transform-gpu",
        "hover:-translate-y-1 hover:scale-[1.02] cursor-pointer",
        accentCls,
      ].join(" ")}
    >
      <div className="text-[11px] font-medium uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-3 text-4xl font-bold tracking-tight tabular-nums text-white drop-shadow-lg">{value}</div>
      <div className="mt-3 flex items-center justify-between text-[13px] text-white/70">
        <span className="tabular-nums font-medium">{subLeft ?? ""}</span>
        <span className="tabular-nums font-medium">{subRight ?? ""}</span>
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-[540px] border-l border-white/15 bg-gradient-to-br from-gray-900/98 to-gray-950/98 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/15 bg-gradient-to-r from-white/5 to-transparent">
          <div className="text-sm font-semibold text-white">{title}</div>
          <button
            onClick={onClose}
            className="text-xs px-4 py-2 rounded-xl border border-white/15 hover:bg-white/10 text-white transition-all font-medium"
          >
            Close
          </button>
        </div>
        <div className="p-5 overflow-auto h-[calc(100%-64px)]">{children}</div>
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
    ...inFlight.map((e, i) => ({
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
      theme: (["rose", "blue", "amber"] as ThemeKey[])[i % 3],
    })),
    ...validated.map((e, i) => ({
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
      theme: (["emerald", "cyan", "violet"] as ThemeKey[])[i % 3],
    })),
    ...unverified.map((e, i) => ({
      ...e,
      identified_value: Math.round(Math.random() * 300000 + 100000),
      confidence: 0.65,
      time_sensitivity: 0.7,
      execution_friction: 0.5,
      score: 0,
      owner_role: "Benefits Ops",
      evidence_receipt_id: `RCP-${Math.floor(Math.random() * 90000) + 10000}`,
      receipt_status: e.receipt || "UNVERIFIED",
      theme: (["rose", "amber", "violet"] as ThemeKey[])[i % 3],
    })),
  ];

  return { asOf, baseline, actual, delta, ledger, ebitda, data_health, drivers, inFlight, validated, unverified, events };
}

function Badge({ status }: { status: string }) {
  const cls =
    status === "VERIFIED"
      ? "bg-emerald-400/25 text-emerald-200 border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
      : status === "DEGRADED"
      ? "bg-amber-400/25 text-amber-200 border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
      : status === "UNVERIFIED"
      ? "bg-purple-400/25 text-purple-200 border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
      : "bg-blue-400/25 text-blue-200 border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.2)]";

  return (
    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      {status}
    </span>
  );
}

function AnimatedGradientOverlay({ theme }: { theme: (typeof THEME)[ThemeKey] }) {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(135deg, ${theme.g1}, ${theme.g2}, ${theme.g3})`,
        backgroundSize: "200% 200%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function CFODashboardContent() {
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
      ? "amber"
      : "amber";

  const varianceAccent: TileAccent = "purple";

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
            accent="blue"
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
                {eventsFiltered.map((e) => {
                  const theme = e.theme ? THEME[e.theme] : THEME.blue;
                  
                  return (
                    <div
                      key={e.id}
                      onClick={() => setActiveEvent(e)}
                      className={`group relative overflow-hidden rounded-xl border p-3 hover:bg-white/5 cursor-pointer transition-all ${
                        activeEvent?.id === e.id 
                          ? `${theme.border} ${theme.bg} ${theme.glow}` 
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      {/* Left accent bar */}
                      {e.theme && (
                        <div className={`absolute left-0 top-0 h-full w-1 ${theme.bar}`} />
                      )}
                      
                      {/* Animated gradient overlay */}
                      {e.theme && <AnimatedGradientOverlay theme={theme} />}
                      
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <div className={`text-sm font-medium ${e.theme ? theme.title : "text-white"}`}>
                            {e.id} • {e.title}
                          </div>
                          <div className="text-[11px] text-white/50 tabular-nums">
                            Score {e.score.toLocaleString()}
                          </div>
                        </div>
                        <div className="mt-1 text-[11px] text-white/50">
                          Owner: {e.owner_role} • Receipt: {e.receipt_status} • Value: {money(e.identified_value)}
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Badge status={e.receipt_status} />
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
                            e.status === "VALIDATED" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" :
                            e.status === "IMPLEMENTED" ? "border-blue-400/30 bg-blue-400/10 text-blue-300" :
                            e.status === "ACCEPTED" ? "border-purple-400/30 bg-purple-400/10 text-purple-300" :
                            "border-amber-400/30 bg-amber-400/10 text-amber-300"
                          }`}>{e.status}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
                        activeEvent.type === "PBM" ? "border-blue-400/30 bg-blue-400/10 text-blue-300" :
                        activeEvent.type === "MEDICAL" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" :
                        "border-purple-400/30 bg-purple-400/10 text-purple-300"
                      }`}>{activeEvent.type}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
                        activeEvent.status === "VALIDATED" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" :
                        activeEvent.status === "IMPLEMENTED" ? "border-blue-400/30 bg-blue-400/10 text-blue-300" :
                        activeEvent.status === "ACCEPTED" ? "border-purple-400/30 bg-purple-400/10 text-purple-300" :
                        "border-amber-400/30 bg-amber-400/10 text-amber-300"
                      }`}>{activeEvent.status}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[11px] text-white/50 mb-3">Quick Actions</div>
                    <div className="space-y-2">
                      <button className="w-full text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-left">
                        Open Evidence Receipt
                      </button>
                      <button className="w-full text-sm px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 shadow-lg">
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
              {eventsFiltered.map((e) => {
                const theme = e.theme ? THEME[e.theme] : THEME.blue;
                
                return (
                  <div
                    key={e.id}
                    onClick={() => setActiveEvent(e)}
                    className={`group relative overflow-hidden rounded-xl border p-3 hover:bg-white/5 cursor-pointer transition-all ${
                      activeEvent?.id === e.id 
                        ? `${theme.border} ${theme.bg} ${theme.glow}` 
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    {/* Left accent bar */}
                    {e.theme && (
                      <div className={`absolute left-0 top-0 h-full w-1 ${theme.bar}`} />
                    )}
                    
                    {/* Animated gradient overlay */}
                    {e.theme && <AnimatedGradientOverlay theme={theme} />}
                    
                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <div className={`text-sm font-medium ${e.theme ? theme.title : "text-white"}`}>
                          {e.id} • {e.title}
                        </div>
                        <div className="text-[11px] text-white/50 tabular-nums">
                          Score {e.score.toLocaleString()}
                        </div>
                      </div>
                      <div className="mt-1 text-[11px] text-white/50">
                        Owner: {e.owner_role} • Receipt: {e.receipt_status}
                      </div>
                    </div>
                  </div>
                );
              })}
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
    </>
  );
}

// Dynamically import the other War Room components
const FourLaneLedger = dynamic(() => import("@/components/warroom/WarRoomV2"), { ssr: false });
const ExecutiveKPIs = dynamic(() => import("@/components/warroom/WarRoom").then(mod => ({ default: mod.WarRoom })), { ssr: false });

const CFODashboard = dynamic(() => Promise.resolve(CFODashboardContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
      <div className="mx-auto max-w-[1400px] px-4 py-10">
        <div className="text-sm text-zinc-400">Loading War Room…</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl border border-zinc-800/60 bg-zinc-950/60" />
          ))}
        </div>
      </div>
    </div>
  ),
});

export default function WarRoomPage() {
  const [currentView, setCurrentView] = useState<WarRoomView>("CFO_DASHBOARD");

  const viewMeta: Record<WarRoomView, { label: string; description: string }> = {
    CFO_DASHBOARD: { label: "CFO Dashboard", description: "4-Tile Executive View with Ranked Events" },
    FOUR_LANE_LEDGER: { label: "4-Lane Ledger", description: "Advanced Filtering with Redis Streaming" },
    EXECUTIVE_KPIS: { label: "Executive KPIs", description: "Live SSE Stream with Org Filters" },
  };

  return (
    <>
      <SEO
        title="War Room - SiriusB iQ AI Data Sciences Lab"
        description="CFO War Room - Real-time financial operations intelligence"
      />
      <div className="warroom-console min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-gray-900/50 to-black/50" />
          <div className="absolute -top-32 left-12 h-[500px] w-[800px] rounded-full bg-emerald-400/6 blur-[100px]" />
          <div className="absolute -top-24 right-12 h-[420px] w-[700px] rounded-full bg-sky-400/6 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(70% 55% at 50% 20%, black 40%, transparent 75%)",
            }}
          />
        </div>

        {/* View Selector Dropdown */}
        <div className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 backdrop-blur-xl">
          <div className="mx-auto max-w-[1400px] px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">SiriusB iQ War Room</div>
                <div className="text-sm font-medium text-white/90">{viewMeta[currentView].description}</div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all text-white font-medium">
                    <span className="text-sm">{viewMeta[currentView].label}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-gray-900 border-white/20">
                  <DropdownMenuItem
                    onClick={() => setCurrentView("CFO_DASHBOARD")}
                    className="cursor-pointer focus:bg-white/10"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-white">CFO Dashboard</div>
                      <div className="text-xs text-gray-400">4-Tile Executive View with Ranked Events</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCurrentView("FOUR_LANE_LEDGER")}
                    className="cursor-pointer focus:bg-white/10"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-white">4-Lane Ledger</div>
                      <div className="text-xs text-gray-400">Advanced Filtering with Redis Streaming</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCurrentView("EXECUTIVE_KPIS")}
                    className="cursor-pointer focus:bg-white/10"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-white">Executive KPIs</div>
                      <div className="text-xs text-gray-400">Live SSE Stream with Org Filters</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Render Selected View */}
        {currentView === "CFO_DASHBOARD" && <CFODashboard />}
        {currentView === "FOUR_LANE_LEDGER" && <FourLaneLedger />}
        {currentView === "EXECUTIVE_KPIS" && <ExecutiveKPIs />}
      </div>
    </>
  );
}