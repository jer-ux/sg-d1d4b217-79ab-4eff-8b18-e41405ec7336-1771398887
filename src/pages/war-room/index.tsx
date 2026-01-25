import { SEO } from "@/components/SEO";
import React, { useState, useEffect } from "react";
import { Badge, Pill } from "@/components/warroom/WarRoomBadge";
import { Drawer } from "@/components/warroom/WarRoomDrawer";
import { Modal } from "@/components/warroom/WarRoomModal";
import { Ticker } from "@/components/warroom/WarRoomTicker";
import { MiniSparkline } from "@/components/warroom/WarRoomSparkline";

interface WarEvent {
  event_id: string;
  title: string;
  type: string;
  status: string;
  owner_role: string;
  identified_value: number;
  confidence: number;
  time_sensitivity: number;
  execution_friction: number;
  score: number;
  receipt_status: string;
  evidence_receipt_id: string;
  due_date: string;
  created_at?: string;
  updated_at: string;
}

interface WarRoomData {
  tenant: string;
  range: string;
  asOf: string;
  events: WarEvent[];
  ebitda: {
    ytd_validated: number;
    mtd_validated: number;
    run_rate: number;
    confidence: number;
    as_of: string;
  };
  ledger: {
    realized: number;
    identified: number;
    approved: number;
    at_risk: number;
    as_of: string;
  };
  drivers: {
    baseline_trend_pct: number;
    actual_trend_pct: number;
    delta_pct: number;
    attribution: Array<{
      label: string;
      delta_pct: number;
      note: string;
    }>;
  };
  data_health: {
    freshness_hours: number;
    dq_pass_rate: number;
    verified_receipts_rate: number;
    open_incidents: number;
    last_replay: string;
  };
  ticker: Array<{
    text: string;
    ts: string;
  }>;
}

interface Receipt {
  receipt_id: string;
  verification_status: string;
  generated_at: string;
  lineage_hash: string;
  transform_hash: string;
  freshness: string;
  confidence_score: number;
  dq_severity_max: string;
  dq_pass_rate: number;
  why_not_green: string;
}

export default function WarRoomHome() {
  const [tenant, setTenant] = useState("tenant_demo");
  const [range, setRange] = useState("30d");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [query, setQuery] = useState("");
  const [data, setData] = useState<WarRoomData | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeEvent, setActiveEvent] = useState<WarEvent | null>(null);
  const [eventDrawerOpen, setEventDrawerOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [actionPacketOpen, setActionPacketOpen] = useState(false);

  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/mock/war-room?tenant=${encodeURIComponent(tenant)}&range=${encodeURIComponent(range)}`, {
        cache: "no-store" as any,
      });
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Failed to load War Room data:", error);
      setToast({ type: "err", msg: "Failed to load data" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [tenant, range]);

  const openEvent = (e: WarEvent) => {
    setActiveEvent(e);
    setEventDrawerOpen(true);
  };

  const openReceipt = async (receiptId: string) => {
    try {
      const res = await fetch(`/api/mock/receipt?id=${receiptId}`);
      const json = await res.json();
      setReceipt(json);
      setReceiptOpen(true);
    } catch (error) {
      console.error("Failed to load receipt:", error);
      setToast({ type: "err", msg: "Failed to load receipt" });
    }
  };

  const transition = async (newStatus: string) => {
    if (!activeEvent) return;

    try {
      const res = await fetch("/api/mock/events/transition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: activeEvent.event_id,
          newStatus,
          receiptStatus: activeEvent.receipt_status,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        setToast({ type: "ok", msg: json.message || "Status updated" });
        load();
      } else {
        setToast({ type: "err", msg: json.error || "Transition failed" });
      }
    } catch (error) {
      console.error("Transition error:", error);
      setToast({ type: "err", msg: "Network error" });
    }
  };

  const downloadProofPack = async () => {
    if (!activeEvent) return;

    try {
      const res = await fetch("/api/mock/proof-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: activeEvent.event_id,
          title: activeEvent.title,
          value: activeEvent.identified_value,
          confidence: activeEvent.confidence,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `proof-pack-${activeEvent.event_id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setToast({ type: "ok", msg: "Proof Pack downloaded" });
      } else {
        setToast({ type: "err", msg: "Failed to generate Proof Pack" });
      }
    } catch (error) {
      console.error("Download error:", error);
      setToast({ type: "err", msg: "Download failed" });
    }
  };

  const nextStatuses = (current: string): string[] => {
    const map: Record<string, string[]> = {
      RECOMMENDED: ["ACCEPTED", "IMPLEMENTED", "VALIDATED"],
      ACCEPTED: ["IMPLEMENTED", "VALIDATED"],
      IMPLEMENTED: ["VALIDATED"],
      VALIDATED: [],
    };
    return map[current] || [];
  };

  const money = (val: number) => `$${(val / 1000).toFixed(0)}K`;
  const pct = (val: number) => `${(val * 100).toFixed(0)}%`;

  if (loading || !data) {
    return (
      <>
        <SEO title="War Room - Kincaid IQ" description="Loading War Room..." />
        <div className="min-h-[calc(100vh-72px)] flex items-center justify-center text-white">
          <div className="text-lg">Loading War Room...</div>
        </div>
      </>
    );
  }

  const eventsFiltered = data.events.filter((e) => {
    const typeMatch = typeFilter === "ALL" || e.type === typeFilter;
    const queryMatch =
      query === "" ||
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.event_id.toLowerCase().includes(query.toLowerCase()) ||
      e.owner_role.toLowerCase().includes(query.toLowerCase());
    return typeMatch && queryMatch;
  });

  const top4 = eventsFiltered.slice(0, 4);

  const trendA = [3, 5, 4, 8, 7, 9, 11, 10, 12, 13, 12, 14];
  const trendB = [9, 8, 7, 7, 6, 6, 5, 6, 5, 4, 4, 3];

  return (
    <>
      <SEO
        title="War Room - Kincaid IQ"
        description="Live EBITDA ledger with evidence-backed value tracking across all operational lanes."
      />
      <div className="min-h-[calc(100vh-56px)] text-white">
        {/* Command Bar */}
        <div className="sticky top-14 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="mx-auto max-w-[1400px] px-4 py-3 flex flex-wrap items-center gap-2 justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xs text-white/50">Kincaid IQ</div>
              <Pill>War Room</Pill>
              <Pill>Tenant: {tenant}</Pill>
              <Pill>Range: {range}</Pill>
              <span className="text-[11px] text-white/40 ml-2">Tip: press &quot;/&quot; to search, &quot;r&quot; to refresh</span>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={tenant}
                onChange={(e) => setTenant(e.target.value)}
                className="text-xs rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white"
              >
                <option value="tenant_demo">tenant_demo</option>
                <option value="tenant_alpha">tenant_alpha</option>
                <option value="tenant_beta">tenant_beta</option>
              </select>

              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="text-xs rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white"
              >
                <option value="7d">7d</option>
                <option value="30d">30d</option>
                <option value="90d">90d</option>
                <option value="ytd">YTD</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="text-xs rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-white"
              >
                <option value="ALL">All Types</option>
                <option value="PBM">PBM</option>
                <option value="MEDICAL">Medical</option>
                <option value="ELIGIBILITY">Eligibility</option>
                <option value="STOPLOSS">Stop-loss</option>
                <option value="CONTRACT">Contract</option>
              </select>

              <input
                id="warroom-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events, owners, IDs…"
                className="w-72 text-xs rounded-xl border border-white/10 bg-black/40 px-3 py-2 outline-none focus:ring-2 focus:ring-white/10 text-white placeholder:text-white/40"
              />

              <button onClick={load} className="text-xs px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5">
                Refresh
              </button>

              <button
                onClick={() => setToast({ type: "ok", msg: "Proof Pack queued (mock)" })}
                className="text-xs px-3 py-2 rounded-xl bg-white text-black font-medium hover:opacity-90"
              >
                Generate Proof Pack
              </button>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mx-auto max-w-[1400px] px-4 pt-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-[11px] text-white/50">Executive Summary</div>
                <div className="mt-1 text-xl font-semibold tracking-tight tabular-nums">
                  EBITDA Protected (Validated): {money(data.ebitda.ytd_validated)}
                  <span className="text-sm text-white/50 font-normal"> • +{money(data.ebitda.mtd_validated)} MTD</span>
                </div>
                <div className="mt-1 text-[12px] text-white/60 tabular-nums">
                  Identified {money(data.ledger.identified)} • Approved {money(data.ledger.approved)} • Realized {money(data.ledger.realized)} • At-risk {money(data.ledger.at_risk)}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Pill>As of {new Date(data.asOf).toLocaleString()}</Pill>
                <Pill>Freshness {data.data_health.freshness_hours}h</Pill>
                <Pill>DQ {(data.data_health.dq_pass_rate * 100).toFixed(1)}%</Pill>
                <Pill>Receipts VERIFIED {Math.round(data.data_health.verified_receipts_rate * 100)}%</Pill>
                <Pill>Open incidents {data.data_health.open_incidents}</Pill>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="mx-auto max-w-[1400px] px-4 py-5 grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Left: Events Table */}
          <div className="xl:col-span-6 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
              <div>
                <div className="text-xs text-white/50">Arbitrage Events</div>
                <div className="text-sm font-semibold">Ranked queue (click for actions)</div>
              </div>
              <div className="text-[11px] text-white/50">Rank = value × confidence × time ÷ friction</div>
            </div>

            <div className="px-2">
              {eventsFiltered.slice(0, 10).map((e) => (
                <button
                  key={e.event_id}
                  onClick={() => openEvent(e)}
                  className="w-full text-left px-3 py-3 rounded-xl hover:bg-white/5 border-b border-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{e.title}</div>
                      <div className="mt-1 flex flex-wrap gap-2 items-center">
                        <Pill>{e.event_id}</Pill>
                        <Pill>{e.type}</Pill>
                        <Pill>{e.status}</Pill>
                        <Pill>Owner: {e.owner_role}</Pill>
                        <Badge status={e.receipt_status} />
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-semibold">{money(e.identified_value)}</div>
                      <div className="text-[11px] text-white/50">Score {e.score.toLocaleString()}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Center: KPI Tiles */}
          <div className="xl:col-span-4 space-y-4">
            <Ticker items={data.ticker.map((t) => ({ label: t.text, value: "", trend: "" }))} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/50">EBITDA Defense</div>
                <div className="mt-2 text-3xl font-semibold">{money(data.ebitda.ytd_validated)}</div>
                <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                  <span>Run-rate</span>
                  <span className="font-medium">{money(data.ebitda.run_rate)}/mo</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-white/70">
                  <span>Confidence</span>
                  <span className="font-medium">{pct(data.ebitda.confidence)}</span>
                </div>
                <div className="mt-3 text-white/60 text-xs flex items-center justify-between">
                  <span>Trend</span>
                  <span className="text-white/40">30d</span>
                </div>
                <div className="mt-2 text-white/70">
                  <MiniSparkline points={trendA} />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/50">Value Ledger</div>
                <div className="mt-2 text-xl font-semibold">{money(data.ledger.realized)}</div>
                <div className="mt-2 text-sm text-white/70 flex justify-between">
                  <span>Identified</span>
                  <span className="font-medium">{money(data.ledger.identified)}</span>
                </div>
                <div className="mt-2 text-sm text-white/70 flex justify-between">
                  <span>Approved</span>
                  <span className="font-medium">{money(data.ledger.approved)}</span>
                </div>
                <div className="mt-2 text-sm text-white/70 flex justify-between">
                  <span>At-risk</span>
                  <span className="font-medium">{money(data.ledger.at_risk)}</span>
                </div>
                <div className="mt-3 text-white/60 text-xs flex items-center justify-between">
                  <span>Risk trend</span>
                  <span className="text-white/40">30d</span>
                </div>
                <div className="mt-2 text-white/70">
                  <MiniSparkline points={trendB} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/50">Top 4 Events Snapshot</div>
              <div className="mt-3 space-y-2">
                {top4.map((e) => (
                  <div key={e.event_id} className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm truncate">{e.title}</div>
                      <div className="text-[11px] text-white/50 mt-1">
                        {e.event_id} • {e.type} • {e.status}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-semibold">{money(e.identified_value)}</div>
                      <div className="text-[11px] text-white/50">Score {e.score.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail: Variance Drivers + Data Health */}
          <div className="xl:col-span-2 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/50">Variance Drivers</div>
              <div className="mt-3 space-y-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-[11px] text-white/50">Baseline vs Actual</div>
                  <div className="mt-1 text-sm font-semibold">
                    {data.drivers.baseline_trend_pct.toFixed(1)}% → {data.drivers.actual_trend_pct.toFixed(1)}%
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    Delta: {data.drivers.delta_pct > 0 ? "+" : ""}{data.drivers.delta_pct.toFixed(1)}%
                  </div>
                </div>

                {data.drivers.attribution.map((d, idx) => (
                  <div key={idx} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{d.label}</div>
                      <div className={`text-sm font-semibold ${d.delta_pct > 0 ? "text-red-300" : "text-emerald-300"}`}>
                        {d.delta_pct > 0 ? "+" : ""}{d.delta_pct.toFixed(1)}%
                      </div>
                    </div>
                    <div className="mt-1 text-[11px] text-white/50">{d.note}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/50">Quick Actions</div>
              <div className="mt-3 space-y-2">
                <button className="w-full text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5">
                  Create Action Packet
                </button>
                <button className="w-full text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5">
                  Open Proof Library
                </button>
                <button className="w-full text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5">
                  View Connector Health
                </button>
              </div>
              <div className="mt-3 text-[11px] text-white/50">
                Rule: no status changes if receipt is UNVERIFIED.
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[95]">
            <div
              className={`px-4 py-2 rounded-xl border text-sm ${
                toast.type === "ok"
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                  : "border-red-400/30 bg-red-400/10 text-red-200"
              }`}
            >
              {toast.msg}
            </div>
          </div>
        )}

        {/* Evidence Drawer */}
        <Drawer
          open={receiptOpen}
          onClose={() => setReceiptOpen(false)}
          title={`Evidence Receipt • ${receipt?.receipt_id ?? ""}`}
        >
          {receipt ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge status={receipt.verification_status} />
                <div className="text-[11px] text-white/50">{new Date(receipt.generated_at).toLocaleString()}</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-white/60">Lineage</div>
                <div className="mt-1 font-mono text-[11px] break-all">{receipt.lineage_hash}</div>
                <div className="mt-2 text-[11px] text-white/60">Transform</div>
                <div className="mt-1 font-mono text-[11px] break-all">{receipt.transform_hash}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[11px] text-white/60">Freshness</div>
                  <div className="mt-1 text-sm font-medium">{receipt.freshness}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <div className="text-[11px] text-white/60">Confidence</div>
                  <div className="mt-1 text-sm font-medium">{pct(receipt.confidence_score)}</div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-white/60">DQ</div>
                <div className="mt-1 text-sm">
                  Severity max: <span className="font-medium">{receipt.dq_severity_max}</span>
                </div>
                <div className="mt-1 text-sm">
                  Pass rate: <span className="font-medium">{pct(receipt.dq_pass_rate)}</span>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-[11px] text-white/60">Why not green</div>
                <div className="mt-1 text-sm text-white/80">{receipt.why_not_green}</div>
              </div>
            </div>
          ) : (
            <div className="text-sm text-white/60">Loading…</div>
          )}
        </Drawer>

        {/* Event Drawer (with real buttons) */}
        <Drawer
          open={eventDrawerOpen}
          onClose={() => setEventDrawerOpen(false)}
          title={`Arbitrage Event • ${activeEvent?.event_id ?? ""}`}
        >
          {activeEvent ? (
            <div className="space-y-3">
              <div className="text-sm font-semibold">{activeEvent.title}</div>
              <div className="flex flex-wrap items-center gap-2">
                <Pill>{activeEvent.type}</Pill>
                <Pill>{activeEvent.status}</Pill>
                <Pill>Owner: {activeEvent.owner_role}</Pill>
                <Badge status={activeEvent.receipt_status} />
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Identified value</span>
                  <span className="font-semibold">{money(activeEvent.identified_value)}</span>
                </div>

                <div className="mt-2 grid grid-cols-3 gap-2 text-[11px]">
                  <div className="rounded-lg border border-white/10 bg-black/20 p-2">
                    <div className="text-white/50">Confidence</div>
                    <div className="mt-1 font-medium">{pct(activeEvent.confidence)}</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-2">
                    <div className="text-white/50">Time</div>
                    <div className="mt-1 font-medium">{pct(activeEvent.time_sensitivity)}</div>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/20 p-2">
                    <div className="text-white/50">Friction</div>
                    <div className="mt-1 font-medium">{pct(activeEvent.execution_friction)}</div>
                  </div>
                </div>

                <div className="mt-2 text-[11px] text-white/50">Score: {activeEvent.score.toLocaleString()}</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-white/60">Controls</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => openReceipt(activeEvent.evidence_receipt_id)}
                    className="text-xs px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5"
                  >
                    Open Evidence Receipt
                  </button>
                  <button
                    onClick={() => setActionPacketOpen(true)}
                    className="text-xs px-3 py-2 rounded-xl bg-white text-black font-medium hover:opacity-90"
                  >
                    Action Packet
                  </button>
                </div>

                <div className="mt-3 text-xs text-white/60">Status transitions</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {nextStatuses(activeEvent.status).slice(0, 3).map((s) => (
                    <button
                      key={s}
                      onClick={() => transition(s)}
                      className="text-xs px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5"
                    >
                      Move → {s}
                    </button>
                  ))}
                </div>

                {activeEvent.receipt_status === "UNVERIFIED" && (
                  <div className="mt-3 text-xs text-red-200 border border-red-400/30 bg-red-400/10 rounded-xl p-3">
                    Receipt UNVERIFIED. You can&apos;t advance this event until proof is upgraded.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-sm text-white/60">Select an event…</div>
          )}
        </Drawer>

        {/* Action Packet Modal */}
        <Modal
          open={actionPacketOpen}
          title={`Action Packet • ${activeEvent?.event_id ?? ""}`}
          onClose={() => setActionPacketOpen(false)}
        >
          {activeEvent ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-white/50">Vendor request (template)</div>
                <div className="mt-2 text-sm whitespace-pre-wrap text-white/80">
{`Subject: Request for review and correction — ${activeEvent.event_id}

Team,

We identified a variance tied to "${activeEvent.title}" with an estimated recoverable value of ${money(activeEvent.identified_value)}.

Please:
1) Confirm root cause and impacted population
2) Provide correction/credit method and timeline
3) Provide supporting file(s) for reconciliation

Attachments:
- Proof pack (evidence receipts + cohort extract)
- Contract lever citations (if applicable)

Requested response SLA: 5 business days

Respectfully,
Kincaid IQ Ops`}
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/50">Validation method</div>
                  <div className="mt-2 text-sm text-white/80">
                    We will validate via a post-adjustment reconciliation: credit memo / reversal file + claim/eligibility deltas, then post to the Value Ledger only when artifacts are attached.
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/50">Owner + timeline</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Pill>Owner role: {activeEvent.owner_role}</Pill>
                    <Pill>Due: {new Date(activeEvent.due_date).toLocaleDateString()}</Pill>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xs text-white/50">Lock packet</div>
                  <div className="mt-2 text-sm text-white/80">
                    Locking prevents edits without an Evidence Receipt. This is how we keep the story consistent through procurement and CFO review.
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setToast({ type: "ok", msg: "Action Packet locked (mock)" })}
                      className="text-xs px-3 py-2 rounded-xl bg-white text-black font-medium hover:opacity-90"
                    >
                      Lock
                    </button>
                    <button
                      onClick={downloadProofPack}
                      className="text-xs px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5"
                    >
                      Download Proof Pack (PDF)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Modal>
      </div>
    </>
  );
}