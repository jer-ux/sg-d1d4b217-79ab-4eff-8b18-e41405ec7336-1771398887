import { SEO } from "@/components/SEO";
import { useState, useEffect } from "react";
import { getWarRoomAdapter } from "@/lib/warroom/adapter";
import type { WarRoomSummary, LaneData, ReceiptData } from "@/lib/warroom/types";
import { AlertCircle, CheckCircle2, Clock, Database, TrendingDown, TrendingUp } from "lucide-react";

function ReceiptBadge({ receipt }: { receipt: ReceiptData }) {
  if (receipt.verified) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
        <CheckCircle2 className="h-3 w-3" />
        VERIFIED
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-300">
      <AlertCircle className="h-3 w-3" />
      UNVERIFIED
    </div>
  );
}

function LaneCard({ lane }: { lane: LaneData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/90 to-gray-950/90 p-6 backdrop-blur-xl transition hover:border-white/20">
      <div className="mb-4">
        <div className="text-sm font-semibold text-gray-100">{lane.title}</div>
        <div className="text-xs text-gray-500">{lane.subtitle}</div>
      </div>

      <div className="mb-4 rounded-xl border border-white/10 bg-black/30 p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs text-gray-500">{lane.primaryKpi.label}</div>
            <div className="mt-1 text-2xl font-bold tabular-nums text-gray-100">{lane.primaryKpi.value}</div>
            {lane.primaryKpi.trend && (
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                {lane.primaryKpi.trend}
              </div>
            )}
          </div>
          <ReceiptBadge receipt={lane.primaryKpi.receipt} />
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-xs text-blue-400 hover:text-blue-300"
        >
          {expanded ? "Hide" : "View"} Receipt Details
        </button>

        {expanded && (
          <div className="mt-3 space-y-2 rounded-lg border border-white/10 bg-black/40 p-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Receipt ID</span>
              <span className="font-mono text-gray-300">{lane.primaryKpi.receipt.receiptId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Freshness</span>
              <span className="text-gray-300">{lane.primaryKpi.receipt.freshnessMinutes}m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">DQ Pass Rate</span>
              <span className="text-gray-300">{(lane.primaryKpi.receipt.dqPassRate * 100).toFixed(1)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Confidence</span>
              <span className="text-gray-300">{(lane.primaryKpi.receipt.confidence * 100).toFixed(1)}%</span>
            </div>
            {lane.primaryKpi.receipt.reasons.length > 0 && (
              <div className="mt-2 rounded border border-amber-500/30 bg-amber-500/10 p-2">
                <div className="text-amber-300">Issues:</div>
                <ul className="mt-1 list-inside list-disc text-amber-200">
                  {lane.primaryKpi.receipt.reasons.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-2">
        {lane.secondaryKpis.map((kpi, i) => (
          <div key={i} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 p-3">
            <div>
              <div className="text-xs text-gray-500">{kpi.label}</div>
              <div className="mt-0.5 text-sm font-semibold tabular-nums text-gray-200">{kpi.value}</div>
            </div>
            <ReceiptBadge receipt={kpi.receipt} />
          </div>
        ))}
      </div>
    </div>
  );
}

function TickerBar({ summary }: { summary: WarRoomSummary }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-gray-900/90 to-gray-950/90 backdrop-blur-xl">
      <div className="flex animate-marquee items-center gap-8 px-4 py-3 whitespace-nowrap">
        {summary.ticker.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            {item.tone === "good" && <TrendingUp className="h-4 w-4 text-emerald-400" />}
            {item.tone === "warn" && <AlertCircle className="h-4 w-4 text-amber-400" />}
            {item.tone === "neutral" && <Database className="h-4 w-4 text-gray-400" />}
            <span
              className={
                item.tone === "good"
                  ? "text-sm text-emerald-300"
                  : item.tone === "warn"
                  ? "text-sm text-amber-300"
                  : "text-sm text-gray-300"
              }
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function WarRoomV2Page() {
  const [summary, setSummary] = useState<WarRoomSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const adapter = getWarRoomAdapter();
    adapter
      .getSummary()
      .then((data) => {
        setSummary(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load War Room data:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="text-sm text-gray-400">Loading War Room…</div>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl border border-gray-800/60 bg-gray-950/60" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !summary) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            Error loading War Room: {error || "Unknown error"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="War Room V2 - Kincaid IQ AI Data Sciences Lab"
        description="Next-generation incident management with real-time streaming, evidence tracking, and governance automation"
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-gray-900/50 to-black/50" />
          <div className="absolute -top-24 left-10 h-[520px] w-[920px] rounded-full bg-emerald-300/5 blur-3xl" />
          <div className="absolute -top-20 right-10 h-[420px] w-[760px] rounded-full bg-sky-300/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>As of {new Date(summary.asOfIso).toLocaleString()}</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-100">CFO War Room</h1>
            <p className="mt-1 text-sm text-gray-400">
              Real-time operations intelligence with Evidence Receipt verification
            </p>
          </div>

          <div className="mb-6">
            <TickerBar summary={summary} />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {summary.lanes.map((lane) => (
              <LaneCard key={lane.lane} lane={lane} />
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-gray-900/50 p-4 text-xs text-gray-400">
            <div className="font-semibold text-gray-300">🔒 Integrity Gates Active</div>
            <div className="mt-1">
              All metrics verified through Evidence Receipts. Unverified data is flagged and excluded from executive
              reporting.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}