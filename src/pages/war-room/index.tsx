import { SEO } from "@/components/SEO";
import React, { useEffect, useMemo, useState, useRef } from "react";

type TileAccent = "neutral" | "good" | "warn" | "bad";
type TileView = "VARIANCE" | "VALIDATED" | "IN_FLIGHT" | "TRUST";

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

  return { asOf, baseline, actual, delta, ledger, ebitda, data_health, drivers, inFlight, validated, unverified };
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

  const [leftWidth, setLeftWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("war-room-left-width");
    if (saved) {
      const w = parseInt(saved, 10);
      if (w >= 220 && w <= 500) setLeftWidth(w);
    }
  }, []);

  useEffect(() => {
    setData(mockWarRoom());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("war-room-left-width", leftWidth.toString());
    }
  }, [leftWidth]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - rect.left;
      if (newWidth >= 220 && newWidth <= 500) {
        setLeftWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing]);

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

  return (
    <>
      <SEO
        title="War Room - SiriusB iQ AI Data Sciences Lab"
        description="CFO War Room - Real-time financial operations intelligence"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
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

        <div ref={containerRef} className="flex h-screen">
          <div
            style={{ width: `${leftWidth}px` }}
            className="hidden xl:flex flex-col border-r border-gray-700 bg-gray-900/40 backdrop-blur-sm overflow-y-auto"
          >
            <div className="p-4 space-y-4">
              <div>
                <div className="text-[11px] text-gray-500 mb-1">WAR ROOM</div>
                <div className="text-lg font-semibold tracking-tight text-gray-100">/war-room</div>
              </div>

              <div className="h-px bg-gradient-to-r from-gray-600/40 via-gray-700/20 to-transparent" />

              <div className="space-y-2">
                <div className="text-[11px] text-gray-500 uppercase tracking-wider">Tenant</div>
                <div className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-sm text-gray-200">
                  tenant_demo
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] text-gray-500 uppercase tracking-wider">Range</div>
                <div className="px-3 py-2 rounded-lg border border-gray-700 bg-gray-800/50 text-sm text-gray-200">
                  Last 30 days
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-gray-600/40 via-gray-700/20 to-transparent" />

              <div className="space-y-2">
                <div className="text-[11px] text-gray-500 uppercase tracking-wider">Quick Stats</div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-gray-800/50">
                    <span className="text-gray-400">Identified</span>
                    <span className="font-semibold tabular-nums text-gray-200">{money(data.ledger.identified)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-gray-800/50">
                    <span className="text-gray-400">Approved</span>
                    <span className="font-semibold tabular-nums text-gray-200">{money(data.ledger.approved)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-gray-800/50">
                    <span className="text-gray-400">Realized</span>
                    <span className="font-semibold text-emerald-300 tabular-nums">{money(data.ledger.realized)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-gray-800/50">
                    <span className="text-gray-400">At-risk</span>
                    <span className="font-semibold text-red-300 tabular-nums">{money(data.ledger.at_risk)}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-gray-600/40 via-gray-700/20 to-transparent" />

              <div className="space-y-2">
                <div className="text-[11px] text-gray-500 uppercase tracking-wider">Data Health</div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-gray-800/50">
                    <span className="text-gray-400">Verified</span>
                    <span className="font-semibold tabular-nums text-gray-200">{pct(data.data_health.verified_receipts_rate)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-gray-800/50">
                    <span className="text-gray-400">DQ Pass</span>
                    <span className="font-semibold tabular-nums text-gray-200">{pct(data.data_health.dq_pass_rate)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-gray-800/50">
                    <span className="text-gray-400">Freshness</span>
                    <span className="font-semibold tabular-nums text-gray-200">{data.data_health.freshness_hours}h</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-gray-800/50">
                    <span className="text-gray-400">Incidents</span>
                    <span className="font-semibold text-yellow-300 tabular-nums">{data.data_health.open_incidents}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-gray-600/40 via-gray-700/20 to-transparent" />

              <div className="flex flex-wrap gap-2 text-[11px] text-gray-500">
                <span className="px-2 py-1 rounded-full border border-gray-700 bg-gray-800/50">Tenant: tenant_demo</span>
                <span className="px-2 py-1 rounded-full border border-gray-700 bg-gray-800/50">Range: 30d</span>
                {mounted && (
                  <span className="px-2 py-1 rounded-full border border-gray-700 bg-gray-800/50">
                    As of {new Date(data.asOf).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-auto p-4 border-t border-gray-700 text-[11px] text-gray-500">
              {mounted ? `As of ${new Date(data.asOf).toLocaleString()}` : "Loading..."}
            </div>
          </div>

          <div
            className="hidden xl:block w-2 cursor-col-resize hover:bg-gray-700/30 transition relative group"
            onMouseDown={handleMouseDown}
          >
            <div className="h-full w-px mx-auto bg-gradient-to-b from-gray-600/30 via-gray-700/15 to-gray-600/30" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-emerald-400/40 opacity-0 group-hover:opacity-100 transition" />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1400px] px-4 py-6">
              <div className="xl:hidden mb-5">
                <div className="text-[11px] text-gray-500">Kincaid IQ • CFO War Room</div>
                <div className="text-lg font-semibold tracking-tight text-gray-100">/war-room</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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

              <div className="mt-4 text-[12px] text-gray-500">
                Identified {money(data.ledger.identified)} • Approved {money(data.ledger.approved)} • Realized{" "}
                {money(data.ledger.realized)} • At-risk {money(data.ledger.at_risk)} • Incidents{" "}
                {data.data_health.open_incidents}
              </div>
            </div>
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
                <div className="mt-2 text-[11px] text-gray-500">
                  CFO note: This is attribution-style mock data. In prod, ties to claims trend decomposition.
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
                <div className="text-[11px] text-gray-500">Validated Total (ties to ledger.realized)</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums text-gray-100">{money(data.ledger.realized)}</div>
                <div className="mt-1 text-[11px] text-gray-500">
                  Rule: Only VALIDATED events with VERIFIED receipts belong here.
                </div>
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
                <div className="text-[11px] text-gray-500">Approved Total (ties to ledger.approved)</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums text-gray-100">{money(data.ledger.approved)}</div>
                <div className="mt-1 text-[11px] text-gray-500">
                  Scope: ACCEPTED + IMPLEMENTED. These are "in flight" with owners and due dates.
                </div>
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
                        <span className="text-gray-400">Owner: {f.owner}</span>
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
                  <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-3">
                    <div className="text-[11px] text-gray-500">Freshness</div>
                    <div className="mt-1 text-xl font-semibold tabular-nums text-gray-100">{data.data_health.freshness_hours}h</div>
                  </div>
                  <div className="rounded-xl border border-gray-700 bg-gray-900/60 p-3">
                    <div className="text-[11px] text-gray-500">Open incidents</div>
                    <div className="mt-1 text-xl font-semibold tabular-nums text-gray-100">{data.data_health.open_incidents}</div>
                  </div>
                </div>
                <div className="mt-3 text-[11px] text-gray-500">
                  Gate policy: No REALIZED without VERIFIED receipt + validation artifacts + packet locked.
                </div>
              </div>

              <div className="rounded-xl border border-gray-700 bg-gray-800/50 overflow-hidden">
                <div className="px-3 py-2 border-b border-gray-700 text-[11px] text-gray-500">
                  Unverified / Degraded Items
                </div>
                <div className="divide-y divide-gray-700/50">
                  {data.unverified.map((u) => (
                    <div key={u.id} className="px-3 py-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-gray-200">{u.id}</div>
                          <div className="text-[11px] text-gray-500 mt-0.5">{u.title}</div>
                        </div>
                        <Badge status={u.receipt} />
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-gray-400">
                        <span>{u.type}</span>
                        <span>{u.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </>
  );
}