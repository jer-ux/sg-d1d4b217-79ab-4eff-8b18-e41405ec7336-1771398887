import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, Activity, Cpu, Server, Terminal, AlertTriangle, 
  DollarSign, Percent, TrendingUp, RefreshCw, Layers, CheckCircle2 
} from "lucide-react";

interface TelemetryEvent {
  id: string;
  timestamp: string;
  category: "PBM Spread" | "GPO Rebate" | "Specialty Markup" | "Copay Maximizer";
  metric: string;
  value: string;
  status: "flagged" | "mitigated";
}

const initialEvents: TelemetryEvent[] = [
  { id: "1", timestamp: "19:26:01", category: "PBM Spread", metric: "Imatinib Margin Spread", value: "+$8,060/script", status: "flagged" },
  { id: "2", timestamp: "19:26:05", category: "GPO Rebate", metric: "Hopebridge Retained Rebate", value: "32% Retained", status: "flagged" },
  { id: "3", timestamp: "19:26:12", category: "Specialty Markup", metric: "Oncology Compound Surcharge", value: "+$4,200/unit", status: "flagged" },
  { id: "4", timestamp: "19:26:18", category: "Copay Maximizer", metric: "Manufacturer Coupon Exclusion", value: "$12,400 diverted", status: "flagged" }
];

export function InteractiveHeroDashboard() {
  const [events, setEvents] = useState<TelemetryEvent[]>(initialEvents);
  const [totalRecovered, setTotalRecovered] = useState(1485600);
  const [activeSystemTab, setActiveSystemTab] = useState<"telemetry" | "rules" | "fiduciary">("telemetry");
  const [cpuLoad, setCpuLoad] = useState(42);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time streaming overcharge detections
      const categories: TelemetryEvent["category"][] = ["PBM Spread", "GPO Rebate", "Specialty Markup", "Copay Maximizer"];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      
      let metric = "";
      let value = "";
      if (randomCategory === "PBM Spread") {
        metric = "Generic Acquisition Arbitrage";
        value = `+$${(Math.random() * 150 + 20).toFixed(2)}/item`;
      } else if (randomCategory === "GPO Rebate") {
        metric = "Undisclosed GPO Retainer Flow";
        value = `${(Math.random() * 25 + 10).toFixed(0)}% retained`;
      } else if (randomCategory === "Specialty Markup") {
        metric = "Therapeutic Brand Surcharge";
        value = `+$${(Math.random() * 1500 + 500).toFixed(0)}/script`;
      } else {
        metric = "Excluded Patient Coupon Shift";
        value = `$${(Math.random() * 4000 + 1000).toFixed(0)} flagged`;
      }

      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];

      const newEvent: TelemetryEvent = {
        id: Math.random().toString(),
        timestamp: timeStr,
        category: randomCategory,
        metric,
        value,
        status: "flagged"
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 5)]);
      setTotalRecovered(prev => prev + Math.floor(Math.random() * 450 + 50));
      setCpuLoad(Math.floor(Math.random() * 15 + 35));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleMitigate = (id: string) => {
    setEvents(prev => prev.map(evt => {
      if (newEvent => evt.id === id) {
        return { ...evt, status: "mitigated" };
      }
      return evt;
    }));
  };

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-[#0C1117]/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden w-full max-w-xl mx-auto">
      {/* Top Header / Window Bar */}
      <div className="bg-[#151B23]/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-semibold tracking-wider uppercase text-[10px] text-slate-300">kincaid-telemetry-feed</span>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-950/20 border border-emerald-900/40 rounded px-2 py-0.5 text-[9px] text-emerald-400 font-bold tracking-wider uppercase">
          <Activity className="h-3 w-3 animate-pulse" />
          Live Audit Guard Active
        </div>
      </div>

      {/* Main Container */}
      <div className="p-6 space-y-6">
        {/* Core System Live Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#11161D]/50 border border-slate-800/60 rounded-xl p-3.5 flex flex-col justify-between">
            <span className="text-[9px] font-mono font-semibold tracking-widest text-slate-400 uppercase">Audit Recovery</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-bold font-mono text-emerald-400">
                ${totalRecovered.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="bg-[#11161D]/50 border border-slate-800/60 rounded-xl p-3.5 flex flex-col justify-between">
            <span className="text-[9px] font-mono font-semibold tracking-widest text-slate-400 uppercase">Active Audits</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-xl font-bold font-mono text-white">10,482</span>
              <span className="text-[9px] text-slate-400 font-mono">claims</span>
            </div>
          </div>

          <div className="bg-[#11161D]/50 border border-slate-800/60 rounded-xl p-3.5 flex flex-col justify-between">
            <span className="text-[9px] font-mono font-semibold tracking-widest text-slate-400 uppercase">Telemetry Engine</span>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-semibold font-mono text-slate-200">{cpuLoad}% load</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
          </div>
        </div>

        {/* Tab Switcher inside Simulated Terminal */}
        <div className="border border-slate-800/60 rounded-xl bg-[#090D14]/90 overflow-hidden">
          <div className="flex border-b border-slate-800/60 bg-[#11161D]/50 px-2">
            {[
              { id: "telemetry", label: "Live Telemetry", icon: Terminal },
              { id: "rules", label: "ERISA Guard Rules", icon: Shield },
              { id: "fiduciary", label: "Sovereign Proofs", icon: Layers }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSystemTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2.5 text-[10px] font-mono font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                    activeSystemTab === tab.id 
                      ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="h-3 w-3" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Window */}
          <div className="p-4 min-h-[220px]">
            <AnimatePresence mode="wait">
              {activeSystemTab === "telemetry" && (
                <motion.div
                  key="telemetry"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {events.map((evt, idx) => (
                    <motion.div
                      key={evt.id}
                      initial={idx === 0 ? { opacity: 0, x: -10 } : false}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between text-[11px] font-mono border-b border-slate-900 pb-2 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">{evt.timestamp}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          evt.category === "PBM Spread" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" :
                          evt.category === "GPO Rebate" ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" :
                          evt.category === "Specialty Markup" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                          "bg-[#B8860B]/10 text-[#B8860B] border border-[#B8860B]/20"
                        }`}>
                          {evt.category}
                        </span>
                        <span className="text-slate-200 font-medium truncate max-w-[150px]">{evt.metric}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-red-400 font-bold">{evt.value}</span>
                        {evt.status === "flagged" ? (
                          <button 
                            onClick={() => handleMitigate(evt.id)}
                            className="bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-900/50 text-[9px] uppercase tracking-wider transition-colors"
                          >
                            Correct
                          </button>
                        ) : (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Saved
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeSystemTab === "rules" && (
                <motion.div
                  key="rules"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="border border-slate-800 bg-[#11161D]/30 rounded p-3 flex gap-3">
                    <Shield className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white font-mono">ERISA Section 404(a) Integrity Checker</div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Ensures plan asset expenditures are allocated solely for the benefit of plan participants. Exposes hidden brokerage commissions, sponsor overrides, and third-party fee kickbacks.
                      </p>
                    </div>
                  </div>

                  <div className="border border-slate-800 bg-[#11161D]/30 rounded p-3 flex gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-white font-mono">Consolidated Appropriations Act (CAA) Rule engine</div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Automated attestation checker flag gag clauses in service provider contracts that prevent employers from reviewing direct medical and pharmacy invoice line items.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSystemTab === "fiduciary" && (
                <motion.div
                  key="fiduciary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 font-mono text-[11px] text-slate-400"
                >
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span>Rebate Pass-Through Attestation</span>
                    <span className="text-emerald-400 font-bold">100% AUDITED</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span>Spread Arbitrage Elimination Rate</span>
                    <span className="text-emerald-400 font-bold">98.2% VERIFIED</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 pb-2">
                    <span>Consolidated Broker Fees Disclosed</span>
                    <span className="text-emerald-400 font-bold">COMPLIANT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Audit Data Chain of Custody</span>
                    <span className="text-emerald-400 font-bold">SSAE-18 SECURED</span>
                  </div>

                  <div className="mt-4 p-3 bg-emerald-950/10 border border-emerald-900/25 rounded text-[11px] text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Fiduciary contract guarantees verified via ledger validation.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Live Recommendation Ticker */}
        <div className="bg-[#1A3A52]/10 border border-[#1A3A52]/30 rounded-xl p-4 flex gap-3 items-start">
          <Shield className="h-5 w-5 text-[#B8860B] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-[10px] font-mono tracking-wider font-bold text-[#B8860B] uppercase">Fiduciary Intervention Advice</div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Formulary audit recommends carving out Specialty Oncology coverage instantly to prevent undisclosed $12,400 coupon harvesting overcharges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}