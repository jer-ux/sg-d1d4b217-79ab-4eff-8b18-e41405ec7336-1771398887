import { Shield, AlertTriangle, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function RxDefenseHero() {
  return (
    <section className="relative py-24 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-slate-950 to-blue-900/20" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 mb-6 text-sm px-4 py-2">
          FORENSIC CONTRACT INTELLIGENCE
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          PBM Contract Clarity
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed">
          Forensic PBM contract analysis toolkit detecting spread pricing, rebate retention, and contractual leakage with clause-by-clause validation
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">23%</div>
              <div className="text-sm text-slate-400">Avg Leakage Rate</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">$47</div>
              <div className="text-sm text-slate-400">Avg Spread per Rx</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-white">340%</div>
              <div className="text-sm text-slate-400">MAC Above NADAC</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}