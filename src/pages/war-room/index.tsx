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
      ? "border-emerald-400/20 bg-emerald-400/5"
      : accent === "warn"
      ? "border-yellow-400/20 bg-yellow-400/5"
      : accent === "bad"
      ? "border-red-400/20 bg-red-400/5"
      : "border-white/10 bg-white/5";

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
      <div className="text-[11px] text-white/55">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{value}</div>
      <div className="mt-2 flex items-center justify-between text-[12px] text-white/55">
        <span className="tabular-nums">{subLeft ?? ""}</span>
        <span className="tabular-nums">{subRight ?? ""}</span>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl">
        <div className="absolute -top-24 left-10 h-48 w-96 rounded-full bg-white/10 blur-3xl opacity-60" />
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
      <div className="absolute right-0 top-0 h-full w-full max-w-[520px] border-l border-white/10 bg-[#05070c]/90 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="text-sm font-semibold">{title}</div>
          <button
            onClick={onClose}
            className="text-xs px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5"
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
      ? "bg-emerald-400/10 text-emerald-200 border-emerald-400/20"
      : status === "DEGRADED"
      ? "bg-yellow-400/10 text-yellow-200 border-yellow-400/20"
      : "bg-red-400/10 text-red-200 border-red-400/20";

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
      <div className="min-h-screen text-white bg-[#050608]">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#070a10] via-[#050608] to-[#040507]" />
          <div className="absolute -top-24 left-10 h-[520px] w-[920px] rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="absolute -top-20 right-10 h-[420px] w-[760px] rounded-full bg-sky-300/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.22]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
              maskImage: "radial-gradient(70% 55% at 50% 20%, black 40%, transparent 75%)",
            }}
          />
        </div>

        <div ref={containerRef} className="flex h-screen">
          <div
            style={{ width: `${leftWidth}px` }}
            className="hidden xl:flex flex-col border-r border-white/10 bg-black/20 backdrop-blur-sm overflow-y-auto"
          >
            <div className="p-4 space-y-4">
              <div>
                <div className="text-[11px] text-white/50 mb-1">WAR ROOM</div>
                <div className="text-lg font-semibold tracking-tight">/war-room</div>
              </div>

              <div className="h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />

              <div className="space-y-2">
                <div className="text-[11px] text-white/50 uppercase tracking-wider">Tenant</div>
                <div className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm">
                  tenant_demo
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[11px] text-white/50 uppercase tracking-wider">Range</div>
                <div className="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-sm">
                  Last 30 days
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />

              <div className="space-y-2">
                <div className="text-[11px] text-white/50 uppercase tracking-wider">Quick Stats</div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-white/5">
                    <span className="text-white/70">Identified</span>
                    <span className="font-semibold tabular-nums">{money(data.ledger.identified)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-white/5">
                    <span className="text-white/70">Approved</span>
                    <span className="font-semibold tabular-nums">{money(data.ledger.approved)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-white/5">
                    <span className="text-white/70">Realized</span>
                    <span className="font-semibold text-emerald-200 tabular-nums">{money(data.ledger.realized)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-white/5">
                    <span className="text-white/70">At-risk</span>
                    <span className="font-semibold text-red-200 tabular-nums">{money(data.ledger.at_risk)}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />

              <div className="space-y-2">
                <div className="text-[11px] text-white/50 uppercase tracking-wider">Data Health</div>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-white/5">
                    <span className="text-white/70">Verified</span>
                    <span className="font-semibold tabular-nums">{pct(data.data_health.verified_receipts_rate)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-white/5">
                    <span className="text-white/70">DQ Pass</span>
                    <span className="font-semibold tabular-nums">{pct(data.data_health.dq_pass_rate)}</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-white/5">
                    <span className="text-white/70">Freshness</span>
                    <span className="font-semibold tabular-nums">{data.data_health.freshness_hours}h</span>
                  </div>
                  <div className="flex justify-between px-2 py-1.5 rounded-lg hover:bg-white/5">
                    <span className="text-white/70">Incidents</span>
                    <span className="font-semibold text-yellow-200 tabular-nums">{data.data_health.open_incidents}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />

              <div className="flex flex-wrap gap-2 text-[11px] text-white/55">
                <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Tenant: tenant_demo</span>
                <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">Range: 30d</span>
                {mounted && (
                  <span className="px-2 py-1 rounded-full border border-white/10 bg-white/5">
                    As of {new Date(data.asOf).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
            <div className="mt-auto p-4 border-t border-white/10 text-[11px] text-white/40">
              {mounted ? `As of ${new Date(data.asOf).toLocaleString()}` : "Loading..."}
            </div>
          </div>

          <div
            className="hidden xl:block w-2 cursor-col-resize hover:bg-white/5 transition relative group"
            onMouseDown={handleMouseDown}
          >
            <div className="h-full w-px mx-auto bg-gradient-to-b from-white/15 via-white/5 to-white/15" />
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-emerald-400/40 opacity-0 group-hover:opacity-100 transition" />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-[1400px] px-4 py-6">
              <div className="xl:hidden mb-5">
                <div className="text-[11px] text-white/50">Kincaid IQ • CFO War Room</div>
                <div className="text-lg font-semibold tracking-tight">/war-room</div>
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

              <div className="mt-4 text-[12px] text-white/55">
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
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-white/55">Trend Summary</div>
                <div className="mt-2 text-sm tabular-nums">
                  Baseline {data.baseline.toFixed(1)}% → Actual {data.actual.toFixed(1)}%{" "}
                  <span className={`ml-2 font-semibold ${data.delta > 0 ? "text-red-200" : "text-emerald-200"}`}>
                    {data.delta > 0 ? "+" : ""}
                    {data.delta.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-white/50">
                  CFO note: This is attribution-style mock data. In prod, ties to claims trend decomposition.
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="px-3 py-2 border-b border-white/10 text-[11px] text-white/55">
                  Attribution (Drivers)
                </div>
                <div className="divide-y divide-white/5">
                  {data.drivers.map((d) => (
                    <div key={d.label} className="px-3 py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{d.label}</div>
                        <div className="text-[11px] text-white/50">{d.note}</div>
                      </div>
                      <div
                        className={`text-sm font-semibold tabular-nums ${
                          d.delta_pct > 0 ? "text-red-200" : "text-emerald-200"
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
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-white/55">Validated Total (ties to ledger.realized)</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums">{money(data.ledger.realized)}</div>
                <div className="mt-1 text-[11px] text-white/50">
                  Rule: Only VALIDATED events with VERIFIED receipts belong here.
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="px-3 py-2 border-b border-white/10 text-[11px] text-white/55">
                  Journal Entries (Validated)
                </div>
                <div className="divide-y divide-white/5">
                  {data.validated.map((v) => (
                    <div key={v.id} className="px-3 py-3">
                      <div className="flex items-start justify-between">
                        <div className="min-w-0">
                          <div className="text-sm font-medium">{v.id}</div>
                          <div className="text-[11px] text-white/50 mt-0.5">{v.title}</div>
                        </div>
                        <div className="text-sm font-semibold tabular-nums">{money(v.amount)}</div>
                      </div>
                      <div className="text-[11px] text-white/50 mt-2">Method: {v.method}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {view === "IN_FLIGHT" && (
            <div className="space-y-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-white/55">Approved Total (ties to ledger.approved)</div>
                <div className="mt-1 text-2xl font-semibold tabular-nums">{money(data.ledger.approved)}</div>
                <div className="mt-1 text-[11px] text-white/50">
                  Scope: ACCEPTED + IMPLEMENTED. These are "in flight" with owners and due dates.
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="px-3 py-2 border-b border-white/10 text-[11px] text-white/55">In-Flight Queue</div>
                <div className="divide-y divide-white/5">
                  {data.inFlight.map((f) => (
                    <div key={f.id} className="px-3 py-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <div className="text-sm font-medium">{f.id}</div>
                          <div className="text-[11px] text-white/50 mt-0.5">{f.title}</div>
                        </div>
                        <div className="text-sm font-semibold tabular-nums">{money(f.amount)}</div>
                      </div>
                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="text-white/70">Stage: {f.stage}</span>
                        <span className="text-white/70">Owner: {f.owner}</span>
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
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-white/55">Controls Summary</div>
                <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-[11px] text-white/55">Receipts VERIFIED</div>
                    <div className="mt-1 text-xl font-semibold tabular-nums">
                      {Math.round(data.data_health.verified_receipts_rate * 100)}%
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-[11px] text-white/55">DQ pass rate</div>
                    <div className="mt-1 text-xl font-semibold tabular-nums">
                      {(data.data_health.dq_pass_rate * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-[11px] text-white/55">Freshness</div>
                    <div className="mt-1 text-xl font-semibold tabular-nums">{data.data_health.freshness_hours}h</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-[11px] text-white/55">Open incidents</div>
                    <div className="mt-1 text-xl font-semibold tabular-nums">{data.data_health.open_incidents}</div>
                  </div>
                </div>
                <div className="mt-3 text-[11px] text-white/50">
                  Gate policy: No REALIZED without VERIFIED receipt + validation artifacts + packet locked.
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <div className="px-3 py-2 border-b border-white/10 text-[11px] text-white/55">
                  Unverified / Degraded Items
                </div>
                <div className="divide-y divide-white/5">
                  {data.unverified.map((u) => (
                    <div key={u.id} className="px-3 py-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0">
                          <div className="text-sm font-medium">{u.id}</div>
                          <div className="text-[11px] text-white/50 mt-0.5">{u.title}</div>
                        </div>
                        <Badge status={u.receipt} />
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-white/70">
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