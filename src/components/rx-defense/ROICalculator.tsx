import { useState } from "react";
import { Calculator } from "lucide-react";

export function ROICalculator() {
  const [calcLives, setCalcLives] = useState<number>(1000);
  const [calcSpend, setCalcSpend] = useState<number>(12000000);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  
  const estimatedSavingsMin = calcSpend * 0.12;
  const estimatedSavingsMax = calcSpend * 0.18;
  const auditFee = calcLives < 700 ? 15000 : calcLives < 2000 ? 50000 : 200000;
  const roiMultiple = Math.floor(estimatedSavingsMin / auditFee);

  return (
    <section className="mb-24 border-t border-white/10 pt-16">
      <div className="text-xs font-bold tracking-[0.25em] text-cyan-500 mb-6 uppercase text-center">
        Financial Impact
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12 tracking-tight">
        Interactive Leakage Calculator
      </h2>
      <div className="bg-gradient-to-br from-[#0a1520] to-[#050a10] border border-cyan-900/50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Calculator className="text-cyan-400" size={24} />
              Plan Inputs
            </h3>
            
            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex justify-between">
                <span>Covered Lives</span>
                <span className="text-white">{calcLives.toLocaleString()}</span>
              </label>
              <input 
                type="range" 
                min="100" 
                max="10000" 
                step="100"
                value={calcLives} 
                onChange={(e) => setCalcLives(Number(e.target.value))}
                className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex justify-between">
                <span>Annual Rx Spend</span>
                <span className="text-white">{formatCurrency(calcSpend)}</span>
              </label>
              <input 
                type="range" 
                min="1000000" 
                max="100000000" 
                step="500000"
                value={calcSpend} 
                onChange={(e) => setCalcSpend(Number(e.target.value))}
                className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
          
          <div className="bg-[#050505]/80 rounded-2xl p-6 border border-cyan-500/20 flex flex-col justify-center">
            <div className="mb-6 text-center">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                Estimated Annual Leakage
              </p>
              <div className="text-4xl md:text-5xl font-black text-cyan-400 tracking-tight">
                {formatCurrency(estimatedSavingsMin)} <span className="text-2xl text-slate-500">-</span> {formatCurrency(estimatedSavingsMax)}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
              <div className="text-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Audit Fee</p>
                <p className="text-xl font-bold text-white">{formatCurrency(auditFee)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Est. ROI</p>
                <p className="text-xl font-bold text-emerald-400">{roiMultiple}x</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}