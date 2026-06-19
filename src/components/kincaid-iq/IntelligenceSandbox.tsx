import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Database, Info, TrendingUp, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface IntelligenceSandboxProps {
  coveredLives: number;
  setCoveredLives: (val: number) => void;
}

export function IntelligenceSandbox({ coveredLives, setCoveredLives }: IntelligenceSandboxProps) {
  const [currentPbmModel, setCurrentPbmModel] = useState<"traditional-spread" | "carve-out-pass" | "fully-bundled">("traditional-spread");
  const [specialtyRatio, setSpecialtyRatio] = useState<number>(45);
  const [ebitdaMultiple, setEbitdaMultiplier] = useState<number>(10);
  const [simulatedLoss, setSimulatedLoss] = useState({ spread: 0, rebateLeakage: 0, complianceGap: 0, total: 0 });

  useEffect(() => {
    let baseLossPerLife = 0;
    let rebateRatio = 0.35;
    let complianceRatio = 0.15;

    if (currentPbmModel === "traditional-spread") {
      baseLossPerLife = 315;
      rebateRatio = 0.40;
    } else if (currentPbmModel === "carve-out-pass") {
      baseLossPerLife = 145;
      rebateRatio = 0.20;
      complianceRatio = 0.25;
    } else {
      baseLossPerLife = 410;
      rebateRatio = 0.50;
    }

    const specialtyMultiplier = 1 + (specialtyRatio - 40) / 100;
    const totalPotentialLoss = coveredLives * baseLossPerLife * specialtyMultiplier;

    const spread = Math.round(totalPotentialLoss * (1 - rebateRatio - complianceRatio));
    const rebateLeakage = Math.round(totalPotentialLoss * rebateRatio);
    const complianceGap = Math.round(totalPotentialLoss * complianceRatio);
    const total = spread + rebateLeakage + complianceGap;

    setSimulatedLoss({ spread, rebateLeakage, complianceGap, total });
  }, [coveredLives, currentPbmModel, specialtyRatio]);

  const evExpansion = simulatedLoss.total * ebitdaMultiple;

  return (
    <div className="grid lg:grid-cols-3 gap-8 text-neutral-200">
      {/* Parameter Form */}
      <div className="lg:col-span-1 bg-slate-950/40 border border-[#2A3F54] rounded-xl p-6 space-y-6 shadow-2xl backdrop-blur-xl">
        <h3 className="text-lg font-serif font-bold text-white pb-3 border-b border-[#2A3F54]/40 flex items-center gap-2">
          <Database className="w-5 h-5 text-[#B8860B]" />
          Model Parameters
        </h3>

        {/* Covered Lives */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 flex justify-between">
            <span>Covered Lives</span>
            <span className="text-white font-bold">{coveredLives.toLocaleString()}</span>
          </label>
          <input 
            type="range" 
            min="500" 
            max="100000" 
            step="500"
            value={coveredLives}
            onChange={(e) => setCoveredLives(Number(e.target.value))}
            className="w-full accent-[#B8860B] bg-slate-900"
          />
          <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
            <span>500</span>
            <span>50k</span>
            <span>100k</span>
          </div>
        </div>

        {/* PBM Model */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
            PBM Sourcing Structure
          </label>
          <select 
            value={currentPbmModel}
            onChange={(e) => setCurrentPbmModel(e.target.value as any)}
            className="w-full bg-slate-950/60 border border-[#2A3F54] text-neutral-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#B8860B]"
          >
            <option value="traditional-spread">Traditional Spread Pricing (Bundled)</option>
            <option value="carve-out-pass">Carve-Out Pass-Through (Disclosed Fee)</option>
            <option value="fully-bundled">Fully Bundled PBM (Exclusive Formulary)</option>
          </select>
        </div>

        {/* Specialty Rx Ratio */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 flex justify-between">
            <span>Specialty Rx Share</span>
            <span className="text-white font-bold">{specialtyRatio}%</span>
          </label>
          <input 
            type="range" 
            min="20" 
            max="70" 
            step="5"
            value={specialtyRatio}
            onChange={(e) => setSpecialtyRatio(Number(e.target.value))}
            className="w-full accent-[#B8860B] bg-slate-900"
          />
          <p className="text-[10px] text-neutral-500 mt-1">
            Specialty drugs represent &lt;2% of claims but drive over 50% of financial leakage.
          </p>
        </div>

        {/* EBITDA Multiplier Selection */}
        <div>
          <label className="block text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2 flex justify-between">
            <span>EBITDA Valuation Multiple</span>
            <span className="text-[#B8860B] font-bold">{ebitdaMultiple}x</span>
          </label>
          <input 
            type="range" 
            min="6" 
            max="20" 
            step="1"
            value={ebitdaMultiple}
            onChange={(e) => setEbitdaMultiplier(Number(e.target.value))}
            className="w-full accent-[#B8860B] bg-slate-900"
          />
          <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
            <span>6x</span>
            <span>12x</span>
            <span>20x</span>
          </div>
        </div>

        <div className="bg-[#1A3A52]/20 border border-[#1A3A52]/40 rounded-lg p-4 text-xs text-neutral-300">
          <div className="flex gap-2">
            <Info className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
            <span>Based on verified retroactive audit datasets across 240+ multi-employer self-funded plan structures.</span>
          </div>
        </div>
      </div>

      {/* Simulator Output Visualization */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-950/40 border-2 border-[#B8860B]/60 rounded-xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <div className="text-xs font-mono text-[#B8860B] uppercase tracking-widest mb-1">
                  Projected Annual Leakage
                </div>
                <div className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                  ${simulatedLoss.total.toLocaleString()}
                </div>
                <p className="text-xs text-neutral-400 mt-2">
                  Avoidable financial waste hiding under traditional contract terms, misadjudicated rebates, and hidden pharmacy spreads.
                </p>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <div className="flex justify-between mb-1 text-neutral-400">
                    <span>Spread Pricing Markup</span>
                    <span className="text-white font-bold">${simulatedLoss.spread.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#B8860B] h-full rounded-full" style={{ width: `${(simulatedLoss.spread / simulatedLoss.total) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-neutral-400">
                    <span>Retained Rebates</span>
                    <span className="text-white font-bold">${simulatedLoss.rebateLeakage.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-full rounded-full" style={{ width: `${(simulatedLoss.rebateLeakage / simulatedLoss.total) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-neutral-400">
                    <span>Admin/GPO Compliance Deficit</span>
                    <span className="text-white font-bold">${simulatedLoss.complianceGap.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-orange-700 h-full rounded-full" style={{ width: `${(simulatedLoss.complianceGap / simulatedLoss.total) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* EBITDA Multiplier Exit Value Box */}
            <div className="bg-slate-950/60 border border-[#2A3F54] rounded-xl p-6 space-y-6">
              <div className="border-b border-[#2A3F54]/40 pb-3 flex justify-between items-center">
                <span className="text-xs font-mono text-[#B8860B] uppercase tracking-wider">EXIT VALUE MULTIPLIER</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  EBITDA Yield
                </span>
              </div>

              <div>
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mb-1">
                  Enterprise Value Addition (EV Expansion)
                </div>
                <div className="text-3xl font-serif font-bold text-emerald-400 tracking-tight flex items-baseline gap-1">
                  +${evExpansion.toLocaleString()}
                </div>
                <p className="text-[11px] text-neutral-400 mt-2 leading-relaxed">
                  Every dollar saved on healthcare benefits is pure cash flowing directly to your bottom line, immediately magnifying your exit valuation by your <span className="text-[#B8860B] font-semibold">{ebitdaMultiple}x multiple</span>.
                </p>
              </div>

              <div className="pt-4 border-t border-[#2A3F54]/40">
                <Button className="w-full bg-[#B8860B] hover:bg-[#9A7209] text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 py-4">
                  Request Custom EBITDA Analysis
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <div className="mt-2 text-center text-[9px] text-neutral-500 font-mono flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  ASOP Fiduciary compliant actuarial auditing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}