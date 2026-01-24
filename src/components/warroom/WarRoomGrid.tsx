import Link from "next/link";
import { useEffect, useState } from "react";
import { TickerMarquee } from "@/components/warroom/TickerMarquee";
import { LaneKey, laneMeta, seedEvents, seedSummaries, WarEvent, LaneSummary, formatMoney } from "@/lib/warroom/mock";

function TileButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
    >
      {label}
    </button>
  );
}

function StatePill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-white/55">{label}</div>
      <div className="text-sm text-white/85 font-medium">{formatMoney(value)}</div>
    </div>
  );
}

function EventRow({ e, onEvidence }: { e: WarEvent; onEvidence: (e: WarEvent) => void }) {
  const stateColor = e.state === "REALIZED" ? "text-emerald-400" : e.state === "AT_RISK" ? "text-rose-400" : e.state === "APPROVED" ? "text-cyan-400" : "text-amber-400";
  
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3 hover-lift">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="text-sm text-white/90 font-medium">{e.title}</div>
          {e.subtitle ? <div className="text-xs text-white/60 mt-1">{e.subtitle}</div> : null}
          <div className="text-xs text-white/55 mt-2 flex flex-wrap gap-2">
            <span className={`${stateColor} font-medium`}>{e.state ? e.state.replace("_", " ") : "—"}</span>
            <span>•</span>
            <span>Confidence {(e.confidence * 100).toFixed(0)}%</span>
            <span>•</span>
            <span>Owner {e.owner ?? "Unassigned"}</span>
          </div>
        </div>
        <div className={`text-sm font-semibold ${e.amount < 0 ? "text-rose-400" : "text-emerald-400"}`}>
          {formatMoney(e.amount)}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <TileButton label="Assign" onClick={() => alert(`Assign: ${e.id}`)} />
        <TileButton label="Approve" onClick={() => alert(`Approve: ${e.id}`)} />
        <TileButton label="Close" onClick={() => alert(`Close: ${e.id}`)} />
        <TileButton label="Evidence" onClick={() => onEvidence(e)} />
      </div>
    </div>
  );
}

function EvidenceModal({ event, onClose }: { event: WarEvent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="k-panel p-6 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-lg font-semibold text-white">{event.title}</div>
            <div className="text-sm text-white/60 mt-1">{formatMoney(event.amount)} • {event.state}</div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            Close
          </button>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-white/70">
            <div className="font-medium text-white/85 mb-2">Evidence Receipts:</div>
            {event.receipts && event.receipts.length > 0 ? (
              event.receipts.map((r) => (
                <div key={r.id} className="k-panel p-3 mb-2">
                  <div className="text-white/90">{r.title}</div>
                  <div className="text-xs text-white/55 mt-1 flex gap-3">
                    <span>Hash: {r.hash}</span>
                    {r.freshness && <span>• {r.freshness}</span>}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-white/50 italic">No receipts attached</div>
            )}
          </div>

          <div className="text-xs text-white/55">
            <div>Owner: {event.owner ?? "Unassigned"}</div>
            <div>Confidence: {(event.confidence * 100).toFixed(0)}%</div>
            <div>Time Sensitivity: {(event.timeSensitivity * 100).toFixed(0)}%</div>
            <div>Last Updated: {new Date(event.updatedAt).toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WarRoomGrid() {
  const [summaries, setSummaries] = useState<LaneSummary[]>(seedSummaries());
  const [events, setEvents] = useState<WarEvent[]>(seedEvents());
  const [evidenceOpen, setEvidenceOpen] = useState<WarEvent | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setEvents((prev) => {
        const next = [...prev];
        const i = Math.floor(Math.random() * next.length);
        const e = next[i];
        const bump = (Math.random() - 0.45) * 60_000;
        next[i] = {
          ...e,
          amount: Math.round(e.amount + bump),
          updatedAt: new Date().toISOString(),
        };
        return next;
      });
    }, 6000);

    return () => clearInterval(id);
  }, []);

  const totals = {
    identified: summaries.reduce((acc, s) => acc + s.identified, 0),
    approved: summaries.reduce((acc, s) => acc + s.approved, 0),
    realized: summaries.reduce((acc, s) => acc + s.realized, 0),
    atRisk: summaries.reduce((acc, s) => acc + s.atRisk, 0),
  };

  return (
    <div className="py-8">
      <div className="mb-6">
        <div className="text-3xl font-semibold tracking-tight text-white">War Room</div>
        <div className="text-white/65 mt-2">Live EBITDA ledger. Evidence-backed value tracking across all lanes.</div>
      </div>

      <div className="mb-6">
        <TickerMarquee events={events} totals={totals} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {summaries.map((s) => (
          <Link key={s.lane} href={`/war-room/${s.lane}`} className="k-panel p-5 hover-lift">
            <div className="text-lg font-semibold text-white mb-1">{s.label}</div>
            <div className="text-xs text-white/60 mb-4">{s.headline}</div>

            <div className="grid grid-cols-2 gap-2">
              <StatePill label="IDENTIFIED" value={s.identified} />
              <StatePill label="APPROVED" value={s.approved} />
              <StatePill label="REALIZED" value={s.realized} />
              <StatePill label="AT-RISK" value={s.atRisk} />
            </div>
          </Link>
        ))}
      </div>

      <div className="k-panel p-5">
        <div className="text-lg font-semibold text-white mb-4">All Events</div>
        <div className="space-y-3">
          {events.map((e) => (
            <EventRow key={e.id} e={e} onEvidence={setEvidenceOpen} />
          ))}
        </div>
      </div>

      {evidenceOpen && <EvidenceModal event={evidenceOpen} onClose={() => setEvidenceOpen(null)} />}
    </div>
  );
}