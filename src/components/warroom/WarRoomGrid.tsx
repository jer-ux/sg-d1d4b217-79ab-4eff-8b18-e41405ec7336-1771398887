"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { TickerMarquee } from "@/components/warroom/TickerMarquee";
import { useWarRoomStream } from "@/components/warroom/useWarRoomStream";
import type { LaneKey, WarEvent, EvidenceReceipt } from "@/lib/warroom/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BadgeDollarSign, TrendingUp, Shield, FileCheck } from "lucide-react";
import { getTerm, getLedgerStateLabel, formatComplianceAmount, type UserRole } from "@/lib/compliance/terminology";

const severityColors = {
  critical: "border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]",
  high: "border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]",
  medium: "border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]",
  low: "border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]",
};

const laneMeta: Record<LaneKey, { label: string; complianceLabel: string; headline: string; color: string; bgGradient: string }> = {
  value: { 
    label: "Verified Savings Ledger",
    complianceLabel: "Value Reconciliation Ledger",
    headline: "Auditable value tracking with evidence-backed reconciliation",
    color: "emerald",
    bgGradient: "from-emerald-500/10 to-emerald-600/5"
  },
  controls: { 
    label: "Controls & Compliance",
    complianceLabel: "Governance & Risk Controls",
    headline: "Continuous control monitoring with attestation framework",
    color: "blue",
    bgGradient: "from-blue-500/10 to-blue-600/5"
  },
  agentic: { 
    label: "Agentic Ops & Sales",
    complianceLabel: "Automated Operations",
    headline: "Governed automation with audit telemetry and approval gates",
    color: "purple",
    bgGradient: "from-purple-500/10 to-purple-600/5"
  },
  marketplace: { 
    label: "Marketplace Execution",
    complianceLabel: "Vendor Management",
    headline: "Contract compliance and vendor performance monitoring",
    color: "orange",
    bgGradient: "from-orange-500/10 to-orange-600/5"
  },
};

function formatMoney(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

async function postJson(url: string, body: any) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await res.json();
  if (!res.ok || !j.ok) {
    if (j.reasons && Array.isArray(j.reasons)) {
      alert("Policy check failed:\n\n" + j.reasons.map((r: string) => `• ${r}`).join("\n"));
    } else {
      alert(j.error || "Request failed");
    }
    throw new Error(j.error || "Request failed");
  }
  return j;
}

function TileButton({ label, onClick, variant = "default" }: { label: string; onClick: () => void; variant?: "default" | "primary" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
        variant === "primary"
          ? "border-emerald-500/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
          : "border-white/15 bg-white/5 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function StatePill({ label, value, color, complianceMode }: { label: string; value: number; color?: string; complianceMode?: boolean }) {
  const colorClasses = color === "emerald" 
    ? "border-emerald-400/30 bg-emerald-400/10"
    : color === "red"
    ? "border-red-400/30 bg-red-400/10"
    : color === "blue"
    ? "border-blue-400/30 bg-blue-400/10"
    : "border-white/15 bg-white/5";

  const textColor = color === "emerald"
    ? "text-emerald-400"
    : color === "red"
    ? "text-red-400"
    : color === "blue"
    ? "text-blue-400"
    : "text-white/85";

  // Map operational labels to compliance labels
  const complianceLabel = complianceMode ? (
    label === "Identified" ? "Under Review" :
    label === "Approved" ? "Action Authorized" :
    label === "Realized" ? "Value Confirmed" :
    label === "At Risk" ? "Exception Queue" :
    label
  ) : label;

  return (
    <div className={`rounded-xl border ${colorClasses} px-3 py-2 text-center min-w-[90px]`}>
      <div className="text-[10px] uppercase tracking-wider text-white/55 font-medium">{complianceLabel}</div>
      <div className={`text-sm font-bold tabular-nums ${textColor}`}>{formatComplianceAmount(value)}</div>
    </div>
  );
}

function MiniSparkline({ data, color = "emerald" }: { data: number[]; color?: string }) {
  if (!data || data.length === 0) return null;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  }).join(" ");

  const strokeColor = color === "emerald" 
    ? "#10b981" 
    : color === "blue"
    ? "#3b82f6"
    : color === "purple"
    ? "#a855f7"
    : "#f97316";

  return (
    <svg width="60" height="20" className="opacity-70">
      <polyline
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        points={points}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function PriorityBadge({ priority }: { priority?: string }) {
  if (!priority) return null;
  
  const cls = priority === "CRITICAL"
    ? "bg-red-500/20 text-red-300 border-red-400/40"
    : priority === "HIGH"
    ? "bg-orange-500/20 text-orange-300 border-orange-400/40"
    : priority === "MEDIUM"
    ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/40"
    : "bg-gray-500/20 text-gray-300 border-gray-400/40";

  return (
    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase ${cls}`}>
      {priority}
    </span>
  );
}

function ConfidenceBar({ confidence, complianceMode }: { confidence: number; complianceMode?: boolean }) {
  const pct = Math.round(confidence * 100);
  const color = confidence >= 0.85 
    ? "bg-emerald-500" 
    : confidence >= 0.7 
    ? "bg-blue-500" 
    : "bg-amber-500";

  const label = complianceMode ? "Evidence Strength" : "Confidence";

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-white/50 tabular-nums font-medium w-9">{pct}%</span>
    </div>
  );
}

function EventRow({
  e,
  onEvidence,
  laneColor,
  complianceMode = false,
}: {
  e: WarEvent;
  onEvidence: (e: WarEvent) => void;
  laneColor: string;
  complianceMode?: boolean;
}) {
  const actionScore = e.amount * e.confidence * e.timeSensitivity;
  const trend = e.trend || 0;

  // Map event type to compliance terminology
  const eventTypeLabel = complianceMode && e.type === "arbitrage" 
    ? "Pricing Variance" 
    : e.type === "arbitrage" 
    ? "Arbitrage" 
    : undefined;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border backdrop-blur-xl p-4",
        "cursor-pointer transition-all duration-200 hover:shadow-lg",
        e.type === "arbitrage"
          ? "border-amber-500/30 bg-amber-950/20 hover:border-amber-400/50 hover:shadow-amber-500/20"
          : "border-white/10 bg-slate-950/60 hover:border-white/20",
        severityColors[e.severity as keyof typeof severityColors]
      )}
      onClick={() => onEvidence(e)}
    >
      {/* Event Type Badge */}
      {eventTypeLabel && (
        <div className="absolute top-2 right-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-200 ring-1 ring-amber-400/40">
            <BadgeDollarSign className="h-3 w-3" />
            {eventTypeLabel}
          </span>
        </div>
      )}

      {/* Carrier Badge for Arbitrage Events */}
      {e.type === "arbitrage" && e.carrier && (
        <div className="mb-2">
          <span className="inline-flex items-center gap-1 rounded-md bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-200 ring-1 ring-sky-400/30">
            {e.carrier}
          </span>
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-sm text-white/90 font-medium">{e.title}</div>
          </div>
          {e.subtitle && <div className="text-xs text-white/60 mt-1">{e.subtitle}</div>}
          
          <div className="flex items-center gap-2 mt-2">
            <PriorityBadge priority={e.priority} />
            {e.category && (
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-white/60 font-medium uppercase">
                {e.category}
              </span>
            )}
            {typeof trend === 'number' && trend !== 0 && (
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                trend > 0 
                  ? "bg-emerald-500/20 text-emerald-300" 
                  : "bg-red-500/20 text-red-300"
              }`}>
                {trend > 0 ? "↗" : "↘"} {Math.abs(trend).toFixed(1)}%
              </span>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <div className={`text-lg font-bold whitespace-nowrap tabular-nums ${e.amount < 0 ? "text-red-400" : "text-white/90"}`}>
            {formatComplianceAmount(e.amount)}
          </div>
          {e.daysInState && (
            <div className="text-[10px] text-white/40 mt-1">
              {e.daysInState}d in state
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between text-[10px] text-white/50">
          <span>{complianceMode ? "Evidence Strength" : "Confidence"}</span>
          <span>{complianceMode ? "Remediation Priority" : "Time Sensitivity"}: {Math.round(e.timeSensitivity * 100)}%</span>
        </div>
        <ConfidenceBar confidence={e.confidence} complianceMode={complianceMode} />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <span className={`px-2 py-0.5 rounded font-medium ${
            e.state === "AT_RISK" ? "bg-red-500/20 text-red-300" :
            e.state === "REALIZED" ? "bg-emerald-500/20 text-emerald-300" :
            e.state === "APPROVED" ? "bg-blue-500/20 text-blue-300" :
            "bg-white/10 text-white/70"
          }`}>
            {complianceMode ? getLedgerStateLabel(e.state) : e.state?.replace("_", " ")}
          </span>
          <span>{complianceMode ? "Control Owner" : "Owner"}: {e.owner ?? "Unassigned"}</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <TileButton
          label="Assign"
          onClick={async () => {
            const owner = prompt("Assign to (name/role):", e.owner ?? "Finance Ops");
            if (!owner) return;
            await postJson("/api/ledger/assign", { eventId: e.id, owner });
          }}
        />
        {e.state === "IDENTIFIED" && (
          <TileButton
            label={complianceMode ? "✓ Authorize" : "✓ Approve"}
            variant="primary"
            onClick={async () => {
              if (confirm(complianceMode ? "Authorize this action?" : "Approve this event?")) {
                await postJson("/api/ledger/approve", { eventId: e.id });
              }
            }}
          />
        )}
        {e.state === "APPROVED" && (
          <TileButton
            label={complianceMode ? "Confirm Value" : "Close & Realize"}
            variant="primary"
            onClick={async () => {
              if (confirm(complianceMode ? "Confirm realized value?" : "Close and realize value?")) {
                await postJson("/api/ledger/close", { eventId: e.id });
              }
            }}
          />
        )}
        {e.receipts && e.receipts.length > 0 && (
          <TileButton 
            label={complianceMode ? `📋 Documentation (${e.receipts.length})` : `📋 Evidence (${e.receipts.length})`} 
            onClick={() => onEvidence(e)} 
          />
        )}
        <TileButton
          label={complianceMode ? "+ Documentation" : "+ Receipt"}
          onClick={async () => {
            await postJson("/api/ledger/attach-receipt", { 
              eventId: e.id, 
              receipt: { 
                id: Math.random().toString(36).slice(2), 
                title: "Manual evidence entry", 
                hash: "0xMANUAL..." 
              } 
            });
          }}
        />
      </div>
    </motion.div>
  );
}

function EvidenceModal({ event, onClose, complianceMode = false }: { event: WarEvent; onClose: () => void; complianceMode?: boolean }) {
  if (!event.receipts?.length) return null;
  const receipt = event.receipts[0];

  const modalTitle = complianceMode ? "Supporting Documentation" : "Evidence Receipt";
  const hashLabel = complianceMode ? "Verification Hash" : "Cryptographic Hash";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="k-panel p-8 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
             <div className="text-2xl font-semibold flex items-center gap-2">
               <FileCheck className="h-6 w-6 text-emerald-400" />
               {modalTitle}
             </div>
             <div className="text-sm text-white/50 mt-1">For {complianceMode ? "control finding" : "event"}: {event.title}</div>
          </div>
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
              <div className="text-xs text-white/60 uppercase tracking-wider">{hashLabel}</div>
              <div className="text-white/90 mt-1 font-mono text-sm break-all">{receipt.hash}</div>
            </div>
          )}

          {receipt.freshness && (
            <div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Data Freshness</div>
              <div className="text-white/90 mt-1">{receipt.freshness}</div>
            </div>
          )}

          {receipt.confidence && (
            <div>
              <div className="text-xs text-white/60 uppercase tracking-wider">Evidence Strength</div>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500"
                    style={{ width: `${(receipt.confidence * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-emerald-400">{Math.round(receipt.confidence * 100)}%</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-white/70">
              {complianceMode 
                ? "This documentation is cryptographically verified and maintains full chain of custody for audit and regulatory compliance requirements."
                : "This receipt is cryptographically verified and immutable. Chain-of-custody and freshness checks are enforced at the control layer."
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WarRoomGrid({ complianceMode = false }: { complianceMode?: boolean }) {
  const { connected, lastUpdated, events, summaries, totals, ticker } = useWarRoomStream();
  const [evidenceEvent, setEvidenceEvent] = useState<WarEvent | null>(null);

  const laneEvents = useMemo(() => {
    const map: Record<LaneKey, WarEvent[]> = { value: [], controls: [], agentic: [], marketplace: [] };
    for (const e of events) {
        if (map[e.lane]) map[e.lane].push(e);
    }
    for (const k of Object.keys(map) as LaneKey[]) {
      map[k] = map[k]
        .sort((a, b) => {
          const priorityWeight = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
          const aPriority = priorityWeight[a.priority as keyof typeof priorityWeight] || 0;
          const bPriority = priorityWeight[b.priority as keyof typeof priorityWeight] || 0;
          if (aPriority !== bPriority) return bPriority - aPriority;
          return (b.amount * b.confidence * b.timeSensitivity) - (a.amount * a.confidence * a.timeSensitivity);
        })
        .slice(0, 8);
    }
    return map;
  }, [events]);

  const summaryMap = useMemo(() => {
    const m = new Map<LaneKey, any>();
    for (const s of summaries as any[]) m.set(s.lane, s);
    return m;
  }, [summaries]);

  const lanes: LaneKey[] = ["value", "controls", "agentic", "marketplace"];

  const pageTitle = complianceMode ? "Controls Dashboard" : "War Room";
  const pageSubtitle = complianceMode 
    ? "Real-time governance monitoring and control effectiveness tracking"
    : "Real-time value ledger and control monitoring";

  return (
    <div className="py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-3xl font-semibold tracking-tight">{pageTitle}</div>
          <div className="text-white/65 mt-2">{pageSubtitle}</div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2 text-xs text-white/50 mb-1">
            <div className={`w-2 h-2 rounded-full ${connected ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500"}`} />
            {connected ? "Live Stream Active" : "Disconnected"}
          </div>
          {lastUpdated && (
            <div className="text-xs text-white/40">
              Last update: {new Date(lastUpdated).toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>

      <TickerMarquee items={ticker} />

      <div className="mt-6 grid md:grid-cols-4 gap-4">
         <div className="k-panel p-5 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-500/10 to-blue-600/5">
             <div className="text-xs text-white/50 uppercase tracking-widest mb-2 font-semibold">
               {complianceMode ? "Under Review" : "Portfolio Identified"}
             </div>
             <div className="text-3xl font-bold text-blue-400 tabular-nums">{formatComplianceAmount(totals.identified)}</div>
         </div>
         <div className="k-panel p-5 flex flex-col justify-center items-center text-center bg-gradient-to-br from-green-500/10 to-green-600/5">
             <div className="text-xs text-white/50 uppercase tracking-widest mb-2 font-semibold">
               {complianceMode ? "Action Authorized" : "Approved Value"}
             </div>
             <div className="text-3xl font-bold text-green-400 tabular-nums">{formatComplianceAmount(totals.approved)}</div>
         </div>
         <div className="k-panel p-5 flex flex-col justify-center items-center text-center bg-gradient-to-br from-emerald-500/10 to-emerald-600/5">
             <div className="text-xs text-white/50 uppercase tracking-widest mb-2 font-semibold">
               {complianceMode ? "Value Confirmed" : "Realized P&L"}
             </div>
             <div className="text-3xl font-bold text-emerald-400 tabular-nums">{formatComplianceAmount(totals.realized)}</div>
         </div>
         <div className="k-panel p-5 flex flex-col justify-center items-center text-center bg-gradient-to-br from-red-500/10 to-red-600/5">
             <div className="text-xs text-white/50 uppercase tracking-widest mb-2 font-semibold">
               {complianceMode ? "Exception Queue" : "Value At Risk"}
             </div>
             <div className="text-3xl font-bold text-red-400 tabular-nums">{formatComplianceAmount(totals.atRisk)}</div>
         </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        {lanes.map((lane) => {
          const s = summaryMap.get(lane) || { identified: 0, approved: 0, realized: 0, atRisk: 0, velocity: 0, avgConfidence: 0, criticalCount: 0, trendData: [] };
          const meta = laneMeta[lane];
          const displayLabel = complianceMode ? meta.complianceLabel : meta.label;
          
          return (
            <div key={lane} className={`k-panel p-6 flex flex-col h-full bg-gradient-to-br ${meta.bgGradient}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-xl font-semibold">{displayLabel}</h3>
                    {s.trendData && s.trendData.length > 0 && (
                      <MiniSparkline data={s.trendData} color={meta.color} />
                    )}
                  </div>
                  <p className="text-sm text-white/60 mt-1">{meta.headline}</p>
                  
                  <div className="flex items-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white/50">Velocity:</span>
                      <span className="font-semibold text-white/80">{formatComplianceAmount(s.velocity || 0)}/mo</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-white/50">{complianceMode ? "Evidence Strength" : "Avg Confidence"}:</span>
                      <span className="font-semibold text-white/80">{Math.round((s.avgConfidence || 0) * 100)}%</span>
                    </div>
                    {s.criticalCount > 0 && (
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="font-semibold text-red-400">{s.criticalCount} critical</span>
                      </div>
                    )}
                  </div>
                </div>
                <Link 
                    href={`/war-room/${lane}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-white/50 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </Link>
              </div>

              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <StatePill label="Identified" value={s.identified} color="blue" complianceMode={complianceMode} />
                <StatePill label="Approved" value={s.approved} complianceMode={complianceMode} />
                <StatePill label="Realized" value={s.realized} color="emerald" complianceMode={complianceMode} />
                <StatePill label="At Risk" value={s.atRisk} color="red" complianceMode={complianceMode} />
              </div>

              <div className="space-y-3 flex-1 overflow-y-auto max-h-[800px] pr-2">
                 {laneEvents[lane].length === 0 ? (
                    <div className="text-center py-8 text-white/30 text-sm italic border border-dashed border-white/10 rounded-xl">
                        {complianceMode ? "No control findings in this domain" : "No active events in this lane"}
                    </div>
                 ) : (
                    laneEvents[lane].map(e => (
                        <EventRow key={e.id} e={e} onEvidence={setEvidenceEvent} laneColor={meta.color} complianceMode={complianceMode} />
                    ))
                 )}
              </div>
            </div>
          );
        })}
      </div>

      {evidenceEvent && <EvidenceModal event={evidenceEvent} onClose={() => setEvidenceEvent(null)} complianceMode={complianceMode} />}
    </div>
  );
}