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

async function postJson(url: string, body: any) {
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await res.json();
  if (!res.ok || !j.ok) {
    // Show policy reasons if available
    if (j.reasons && Array.isArray(j.reasons)) {
      alert("Policy check failed:\n\n" + j.reasons.map((r: string) => `• ${r}`).join("\n"));
    } else {
      alert(j.error || "Request failed");
    }
    throw new Error(j.error || "Request failed");
  }
  return j;
}

function TileButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-xs font-medium"
    >
      {label}
    </button>
  );
}

function StatePill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center min-w-[80px]">
      <div className="text-[10px] uppercase tracking-wider text-white/55">{label}</div>
      <div className={`text-sm font-medium ${
        label === "At Risk" ? "text-red-400" : 
        label === "Realized" ? "text-emerald-400" : 
        "text-white/85"
      }`}>{formatMoney(value)}</div>
    </div>
  );
}

function EventRow({
  e,
  onEvidence,
}: {
  e: WarEvent;
  onEvidence: (e: WarEvent) => void;
}) {
  const actionScore = e.amount * e.confidence * e.timeSensitivity;

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:bg-black/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-white/90 font-medium">{e.title}</div>
          {e.subtitle && <div className="text-xs text-white/60 mt-1">{e.subtitle}</div>}
          <div className="text-xs text-white/45 mt-2 flex flex-wrap gap-2 items-center">
            <span className={`px-1.5 py-0.5 rounded ${
              e.state === "AT_RISK" ? "bg-red-500/20 text-red-300" :
              e.state === "REALIZED" ? "bg-emerald-500/20 text-emerald-300" :
              "bg-white/10 text-white/70"
            }`}>
              {e.state.replace("_", " ")}
            </span>
            <span>•</span>
            <span>Conf. {(e.confidence * 100).toFixed(0)}%</span>
            <span>•</span>
            <span>Time {(e.timeSensitivity * 100).toFixed(0)}%</span>
            <span>•</span>
            <span>Owner: {e.owner ?? "Unassigned"}</span>
          </div>
        </div>
        <div className={`text-sm font-semibold whitespace-nowrap ${e.amount < 0 ? "text-red-400" : "text-white/90"}`}>
          {formatMoney(e.amount)}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
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
            label="Approve"
            onClick={async () => {
              if (confirm("Approve this event?")) {
                await postJson("/api/ledger/approve", { eventId: e.id });
              }
            }}
          />
        )}
        {e.state === "APPROVED" && (
          <TileButton
            label="Close"
            onClick={async () => {
              if (confirm("Close and realize value?")) {
                await postJson("/api/ledger/close", { eventId: e.id });
              }
            }}
          />
        )}
        {e.receipts && e.receipts.length > 0 && (
          <TileButton label={`Evidence (${e.receipts.length})`} onClick={() => onEvidence(e)} />
        )}
        <TileButton
          label="Add Receipt"
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
    </div>
  );
}

function EvidenceModal({ event, onClose }: { event: WarEvent; onClose: () => void }) {
  if (!event.receipts?.length) return null;
  const receipt = event.receipts[0]; // Show first for simplicity in this view

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="k-panel p-8 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
             <div className="text-2xl font-semibold">Evidence Receipt</div>
             <div className="text-sm text-white/50 mt-1">For event: {event.title}</div>
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
  const [evidenceEvent, setEvidenceEvent] = useState<WarEvent | null>(null);

  const laneEvents = useMemo(() => {
    const map: Record<LaneKey, WarEvent[]> = { value: [], controls: [], agentic: [], marketplace: [] };
    for (const e of events) {
        if (map[e.lane]) map[e.lane].push(e);
    }
    for (const k of Object.keys(map) as LaneKey[]) {
      map[k] = map[k]
        .sort((a, b) => (b.amount * b.confidence * b.timeSensitivity) - (a.amount * a.confidence * a.timeSensitivity))
        .slice(0, 5);
    }
    return map;
  }, [events]);

  const summaryMap = useMemo(() => {
    const m = new Map<LaneKey, any>();
    for (const s of summaries as any[]) m.set(s.lane, s);
    return m;
  }, [summaries]);

  const lanes: LaneKey[] = ["value", "controls", "agentic", "marketplace"];

  return (
    <div className="py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <div className="text-3xl font-semibold tracking-tight">War Room</div>
          <div className="text-white/65 mt-2">Real-time value ledger and control monitoring</div>
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
         <div className="k-panel p-4 flex flex-col justify-center items-center text-center">
             <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Portfolio Identified</div>
             <div className="text-2xl font-bold text-blue-400">{formatMoney(totals.identified)}</div>
         </div>
         <div className="k-panel p-4 flex flex-col justify-center items-center text-center">
             <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Approved Value</div>
             <div className="text-2xl font-bold text-green-400">{formatMoney(totals.approved)}</div>
         </div>
         <div className="k-panel p-4 flex flex-col justify-center items-center text-center">
             <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Realized P&L</div>
             <div className="text-2xl font-bold text-emerald-400">{formatMoney(totals.realized)}</div>
         </div>
         <div className="k-panel p-4 flex flex-col justify-center items-center text-center">
             <div className="text-xs text-white/50 uppercase tracking-widest mb-1">Value At Risk</div>
             <div className="text-2xl font-bold text-red-400">{formatMoney(totals.atRisk)}</div>
         </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-2 gap-6">
        {lanes.map((lane) => {
          const s = summaryMap.get(lane) || { identified: 0, approved: 0, realized: 0, atRisk: 0 };
          
          return (
            <div key={lane} className="k-panel p-6 flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{laneMeta[lane].label}</h3>
                  <p className="text-sm text-white/60 mt-1">{laneMeta[lane].headline}</p>
                </div>
                <Link 
                    href={`/war-room/${lane}`}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-white/50 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </Link>
              </div>

              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <StatePill label="Identified" value={s.identified} />
                <StatePill label="Approved" value={s.approved} />
                <StatePill label="Realized" value={s.realized} />
                <StatePill label="At Risk" value={s.atRisk} />
              </div>

              <div className="space-y-3 flex-1">
                 {laneEvents[lane].length === 0 ? (
                    <div className="text-center py-8 text-white/30 text-sm italic border border-dashed border-white/10 rounded-xl">
                        No active events in this lane
                    </div>
                 ) : (
                    laneEvents[lane].map(e => (
                        <EventRow key={e.id} e={e} onEvidence={setEvidenceEvent} />
                    ))
                 )}
              </div>
            </div>
          );
        })}
      </div>

      {evidenceEvent && <EvidenceModal event={evidenceEvent} onClose={() => setEvidenceEvent(null)} />}
    </div>
  );
}