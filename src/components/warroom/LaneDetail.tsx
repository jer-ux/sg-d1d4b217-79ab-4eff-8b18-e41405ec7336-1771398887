import Link from "next/link";
import { useMemo } from "react";
import { LaneKey } from "@/lib/warroom/types";
import { TickerMarquee } from "@/components/warroom/TickerMarquee";
import { useWarRoomStream } from "@/components/warroom/useWarRoomStream";
import { ArrowLeft, TrendingUp, AlertTriangle, CheckCircle2, Activity, Clock } from "lucide-react";
import { motion } from "framer-motion";

const laneMeta: Record<LaneKey, { label: string; headline: string; color: string }> = {
  value: { 
    label: "Verified Savings Ledger", 
    headline: "Reconcile value with receipts and owners.",
    color: "emerald"
  },
  controls: { 
    label: "Controls & Compliance", 
    headline: "Continuous controls. Evidence-first posture.",
    color: "blue"
  },
  agentic: { 
    label: "Agentic Ops & Sales", 
    headline: "Governed automation with telemetry and gates.",
    color: "purple"
  },
  marketplace: { 
    label: "Marketplace Execution", 
    headline: "Ship once. Distribute with low delivery drag.",
    color: "amber"
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

export function LaneDetail({ lane }: { lane: string }) {
  const laneKey = lane as LaneKey;
  const meta = laneMeta[laneKey];
  const { events, summaries, ticker } = useWarRoomStream();
  
  const laneEvents = useMemo(() => {
    return events
      .filter((e) => e.lane === laneKey)
      .sort((a, b) => (b.amount * b.confidence * b.timeSensitivity) - (a.amount * a.confidence * a.timeSensitivity));
  }, [events, laneKey]);

  const summary = useMemo(() => {
    return summaries.find(s => s.lane === laneKey) || { identified: 0, approved: 0, realized: 0, atRisk: 0 };
  }, [summaries, laneKey]);

  if (!meta) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-8">
        <div className="text-2xl text-white/70 mb-4">Lane not found</div>
        <Link 
          href="/war-room" 
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to War Room
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <Link 
          href="/war-room" 
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to War Room
        </Link>

        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">{meta.label}</h1>
            <p className="text-xl text-white/65">{meta.headline}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg bg-${meta.color}-500/10 border border-${meta.color}-500/20 text-${meta.color}-400 text-sm font-semibold uppercase tracking-wider`}>
            Live Stream
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-white/10 bg-black/40 backdrop-blur overflow-hidden">
        <div className="bg-white/5 px-4 py-2 border-b border-white/5 text-xs font-medium text-white/50 uppercase tracking-wider">
          Real-time Audit Log
        </div>
        <div className="py-2">
          <TickerMarquee items={ticker} />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="k-panel p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-16 h-16 text-amber-400" />
          </div>
          <div className="text-xs uppercase tracking-wider text-white/55 mb-2 font-medium">Identified Opportunity</div>
          <div className="text-3xl font-bold text-amber-400 mb-1">{formatMoney(summary.identified)}</div>
          <div className="text-xs text-white/40">Pending validation</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="k-panel p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <CheckCircle2 className="w-16 h-16 text-cyan-400" />
          </div>
          <div className="text-xs uppercase tracking-wider text-white/55 mb-2 font-medium">Approved Value</div>
          <div className="text-3xl font-bold text-cyan-400 mb-1">{formatMoney(summary.approved)}</div>
          <div className="text-xs text-white/40">In execution pipeline</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="k-panel p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <TrendingUp className="w-16 h-16 text-emerald-400" />
          </div>
          <div className="text-xs uppercase tracking-wider text-white/55 mb-2 font-medium">Realized Savings</div>
          <div className="text-3xl font-bold text-emerald-400 mb-1">{formatMoney(summary.realized)}</div>
          <div className="text-xs text-white/40">Validated in ledger</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="k-panel p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <AlertTriangle className="w-16 h-16 text-rose-400" />
          </div>
          <div className="text-xs uppercase tracking-wider text-white/55 mb-2 font-medium">Value at Risk</div>
          <div className="text-3xl font-bold text-rose-400 mb-1">{formatMoney(summary.atRisk)}</div>
          <div className="text-xs text-white/40">Requires immediate action</div>
        </motion.div>
      </div>

      <div className="k-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl font-bold text-white">Active Event Stream</div>
          <div className="text-sm text-white/50">{laneEvents.length} events processing</div>
        </div>

        {laneEvents.length > 0 ? (
          <div className="space-y-3">
            {laneEvents.map((e, idx) => (
              <motion.div 
                key={e.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group relative rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all p-5 hover:border-cyan-500/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        e.state === 'REALIZED' ? 'bg-emerald-500/20 text-emerald-400' :
                        e.state === 'AT_RISK' ? 'bg-rose-500/20 text-rose-400' :
                        'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {e.state.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-white/40 font-mono">{e.id}</span>
                      {e.timeSensitivity > 0.8 && (
                        <span className="flex items-center gap-1 text-[10px] text-amber-400 font-medium">
                          <Clock className="w-3 h-3" /> CRITICAL
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold text-white/90 truncate pr-4 group-hover:text-cyan-400 transition-colors">
                      {e.title}
                    </h3>
                    
                    {e.subtitle && (
                      <p className="text-sm text-white/60 mt-1 line-clamp-1">{e.subtitle}</p>
                    )}
                    
                    <div className="flex items-center gap-4 mt-4 text-xs text-white/50">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        Confidence {(e.confidence * 100).toFixed(0)}%
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                        Owner: {e.owner ?? "Unassigned"}
                      </div>
                      {e.receipts && e.receipts.length > 0 && (
                        <div className="flex items-center gap-1.5 text-emerald-400/80">
                          <CheckCircle2 className="w-3 h-3" />
                          {e.receipts.length} verified receipt{e.receipts.length !== 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className={`text-2xl font-bold ${e.amount < 0 ? "text-rose-400" : "text-emerald-400"}`}>
                      {formatMoney(e.amount)}
                    </div>
                    <div className="text-xs text-white/40 mt-1">Impact</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center text-white/50 py-12 border border-dashed border-white/10 rounded-xl">
            <Activity className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p>No active events in this lane.</p>
          </div>
        )}
      </div>
    </div>
  );
}