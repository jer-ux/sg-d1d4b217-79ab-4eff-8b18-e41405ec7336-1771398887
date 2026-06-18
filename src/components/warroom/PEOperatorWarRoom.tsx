import { useState } from "react";
import { 
  Shield, DollarSign, Award, Zap, Briefcase, RefreshCw, Activity, CheckCircle2, TrendingUp, Target, Landmark, FileSpreadsheet
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PEOperatorDrillDownDrawer } from "./PEOperatorDrillDownDrawer";
import type { TileData, TileKey } from "./executiveTypes";

export function PEOperatorWarRoom() {
  const [selectedPortCo, setSelectedPortCo] = useState<"alpha" | "bravo" | "charlie" | null>("alpha");
  const [activeTile, setActiveTile] = useState<TileData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleTileClick = (tile: TileData) => {
    setActiveTile(tile);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setActiveTile(null);
  };

  const portfolioTiles: TileData[] = [
    {
      key: "ebitdaLift" as TileKey,
      title: "Portfolio EBITDA Lift",
      value: "+$4.8M",
      delta: "+12.4% vs underwritten",
      subtitle: "Across 3 fully optimized portcos",
      trend: "up",
      framework: "Bain"
    },
    {
      key: "valueCreation" as TileKey,
      title: "Value Creation Multiple",
      value: "1.8x",
      delta: "EBITDA margin expansion",
      subtitle: "Pharmacy benefit optimization multiplier",
      trend: "up",
      framework: "McKinsey"
    },
    {
      key: "exitReadiness" as TileKey,
      title: "Exit Readiness Score",
      value: "87/100",
      delta: "+14 pts from acquisition",
      subtitle: "Fiduciary & compliance audit verified",
      trend: "up",
      framework: "Bain"
    },
    {
      key: "rollupSynergies" as TileKey,
      title: "Rollup Synergies Realized",
      value: "$2.1M",
      delta: "96% of maximum target",
      subtitle: "Consolidated volume procurement discount",
      trend: "up",
      framework: "McKinsey"
    }
  ];

  const portCoData = {
    alpha: {
      name: "PortCo Alpha",
      employees: 847,
      rxSpend: 4200000,
      savings: 1200000,
      status: "Contract negotiation phase",
      statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      trend: 14,
      implementationProgress: 65,
      details: {
        currentPBM: "Big Three legacy TPA",
        contractEnd: "Q2 2027",
        avgMemberAge: 42,
        chronicConditions: 28,
        topDrugClasses: ["Diabetes", "Cardiovascular", "Mental Health"]
      }
    },
    bravo: {
      name: "PortCo Bravo",
      employees: 1243,
      rxSpend: 6800000,
      savings: 2100000,
      status: "Implementation complete",
      statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      trend: 3.2,
      implementationProgress: 100,
      details: {
        currentPBM: "Transparent Cost-Plus model",
        contractEnd: "Q4 2028",
        avgMemberAge: 38,
        chronicConditions: 22,
        topDrugClasses: ["Oncology", "Autoimmune", "Respiratory"]
      }
    },
    charlie: {
      name: "PortCo Charlie",
      employees: 562,
      rxSpend: 2900000,
      savings: 847000,
      status: "Due diligence phase",
      statusColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
      trend: 12,
      implementationProgress: 25,
      details: {
        currentPBM: "Regional legacy PBM",
        contractEnd: "Q1 2027",
        avgMemberAge: 45,
        chronicConditions: 31,
        topDrugClasses: ["Specialty", "Pain Management", "Diabetes"]
      }
    }
  };

  const tickerItems = [
    "EBITDA SWAP: PortCo Bravo transparent transition adds $2.1M realized run-rate value",
    "DEAL ROOM UPDATE: PortCo Charlie due diligence uncovers 31% legacy contract overspend leakage",
    "VALUATION TRACKER: Aggregate rollup synergy exceeds initial Bain underwriting metrics by 12.4%",
    "AUDIT ALERTER: DOL compliance trail verified 100% risk-clean for PortCo Alpha portfolio transfer"
  ];

  return (
    <div className="space-y-6">
      {/* Header section with live feed ticker */}
      <div className="rounded-xl border border-emerald-500/15 bg-slate-950/40 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">REALTIME UNDERWRITING INTELLIGENCE</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-100 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-emerald-400" />
              PE Operator Command Center
            </h3>
            <p className="text-xs text-slate-400 mt-1">Portfolio value creation, EBITDA margin multipliers & exit-readiness compliance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              className="rounded-lg border border-emerald-500/10 bg-slate-900/40 p-2 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-100 backdrop-blur-md"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
            <span className="rounded-full bg-emerald-500/5 text-emerald-400 border border-emerald-500/15 font-mono text-xs px-3 py-1 uppercase tracking-wider backdrop-blur-md">
              Active Underwriting
            </span>
          </div>
        </div>

        {/* Live Ticker Marquee */}
        <div className="relative flex items-center h-9 overflow-hidden rounded-lg bg-slate-950/50 border border-emerald-500/10 px-4 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest border-r border-emerald-500/10 pr-3 mr-3 shrink-0">
            <Activity className="h-3 w-3 animate-pulse" /> LIVE DEALS
          </div>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex gap-12 whitespace-nowrap animate-marquee">
              {tickerItems.concat(tickerItems).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-mono">
                  <span className="text-emerald-500">•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio-Level KPIs Tiles Grid with clean flat design (NO graphs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioTiles.map((tile) => (
          <button
            key={tile.key}
            onClick={() => handleTileClick(tile)}
            className="group relative overflow-hidden rounded-xl border border-emerald-500/10 bg-slate-950/40 p-5 text-left transition-all hover:border-emerald-500/30 hover:bg-slate-900/30 hover:shadow-lg hover:shadow-emerald-500/5 backdrop-blur-xl"
          >
            {/* Hover top highlight */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-mono font-semibold text-slate-500 group-hover:text-emerald-400 transition-colors uppercase tracking-wider">
                {tile.title}
              </span>
              <span className="rounded-full bg-emerald-500/5 px-2 py-0.5 text-[9px] font-mono text-emerald-400 border border-emerald-500/15">
                {tile.framework}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-100 font-serif tracking-tight">{tile.value}</span>
            </div>

            <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
              {tile.delta}
            </div>
            
            <div className="mt-1.5 text-[11px] text-slate-400 line-clamp-1">{tile.subtitle}</div>
          </button>
        ))}
      </div>

      {/* PortCo Portfolio Selector Tab Layout */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-emerald-500/10 pb-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Target className="h-4 w-4 text-emerald-400" />
            PORTFOLIO COMPANY PERFORMANCE
          </h4>
          <span className="text-[10px] font-mono text-slate-500">Click asset to activate drill-down workspace</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {(Object.keys(portCoData) as Array<keyof typeof portCoData>).map((key) => {
            const isSelected = selectedPortCo === key;
            const item = portCoData[key];
            return (
              <button
                key={key}
                onClick={() => setSelectedPortCo(key)}
                className={`group relative overflow-hidden rounded-xl border p-5 text-left transition-all backdrop-blur-xl ${
                  isSelected 
                    ? "border-emerald-500 bg-slate-900/60 ring-2 ring-emerald-500/10" 
                    : "border-emerald-500/10 bg-slate-950/20 hover:border-emerald-500/20 hover:bg-slate-900/20"
                }`}
              >
                {/* Visual Accent */}
                <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500/80" />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-slate-200">{item.name}</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[9px] font-mono border border-emerald-500/15 bg-emerald-500/5 text-emerald-400 uppercase tracking-wider">
                    {key === "alpha" ? "Negotiation" : key === "bravo" ? "Complete" : "Diligence"}
                  </span>
                </div>

                <div className="space-y-2 mt-4 text-xs">
                  <div className="flex justify-between border-b border-slate-900/60 pb-1.5">
                    <span className="text-slate-500 font-mono">Headcount</span>
                    <span className="font-semibold text-slate-300 font-mono">{item.employees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900/60 pb-1.5">
                    <span className="text-slate-500 font-mono">Rx Underwritten</span>
                    <span className="font-semibold text-slate-300 font-mono">${(item.rxSpend / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-mono font-bold">EBITDA Lift Target</span>
                    <span className="font-bold text-emerald-400 font-mono">${(item.savings / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected PortCo Workspace / Deep Dive Panel */}
      {selectedPortCo && (
        <div className="rounded-xl border border-emerald-500/15 bg-slate-950/40 p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Neon background lighting glow effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-emerald-500/10">
            <div>
              <div className="text-[10px] text-emerald-400 font-mono mb-1 tracking-wider uppercase">PORTFOLIO DEEP DIVE</div>
              <h4 className="text-xl font-serif font-bold text-slate-100 flex items-center gap-2">
                {portCoData[selectedPortCo].name} Analysis Suite
              </h4>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Status:</span>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                {portCoData[selectedPortCo].status}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Left box: Underwriting and Contracts */}
            <div className="rounded-xl border border-emerald-500/10 bg-slate-900/20 p-5">
              <div className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-400" />
                Underwriting & Benefit Boundaries
              </div>
              <div className="space-y-3 text-xs text-slate-300 font-mono">
                <div className="flex justify-between pb-2 border-b border-slate-900/60">
                  <span className="text-slate-500">Underwritten TPA/PBM</span>
                  <span className="text-slate-200">{portCoData[selectedPortCo].details.currentPBM}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-900/60">
                  <span className="text-slate-500">Agreement Terminus</span>
                  <span className="text-slate-200">{portCoData[selectedPortCo].details.contractEnd}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-900/60">
                  <span className="text-slate-500">Median Cohort Age</span>
                  <span className="text-slate-200">{portCoData[selectedPortCo].details.avgMemberAge} yrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Chronic Care Footprint</span>
                  <span className="text-slate-200">{portCoData[selectedPortCo].details.chronicConditions}%</span>
                </div>
              </div>
            </div>

            {/* Right box: Realized EBITDA Yield */}
            <div className="rounded-xl border border-emerald-500/10 bg-slate-900/20 p-5">
              <div className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-emerald-400" />
                Realized EBITDA Overhang
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Locked Valuation Improvement</span>
                    <span className="text-emerald-400 font-bold font-mono">
                      +${(portCoData[selectedPortCo].savings / 1000000).toFixed(1)}M Run Rate
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                    Equivalent to {((portCoData[selectedPortCo].savings / portCoData[selectedPortCo].rxSpend) * 100).toFixed(0)}% reduction in baseline corporate cost centers.
                  </p>
                </div>
                
                <div className="pt-2 border-t border-slate-900/60">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono">Target Multiple Optimization</span>
                    <span className="text-emerald-400 font-mono font-semibold">
                      {portCoData[selectedPortCo].trend}% target threshold
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Underwriting Milestones Timeline (NO Graphs, flat text list) */}
          <div className="rounded-xl border border-emerald-500/10 bg-slate-900/20 p-5 mb-6">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <FileSpreadsheet className="h-4 w-4 text-emerald-400" /> Underwriting Integration Milestones
            </h5>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative rounded-lg bg-slate-950/60 p-4 border border-emerald-500/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-300 font-mono font-semibold">Phase 1: Deep Forensic Audit</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-[11px] text-slate-500">Uncovered contract spread leakage of 31% vs NADAC benchmarks. Complete.</div>
              </div>
              
              <div className="relative rounded-lg bg-slate-950/60 p-4 border border-emerald-500/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-300 font-mono font-semibold">Phase 2: RFP Carve-Out swap</span>
                  {selectedPortCo === "bravo" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                  )}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">Executing strategic PBM renegotiation. {selectedPortCo === "bravo" ? "Complete." : "In final negotiation phase."}</div>
              </div>
              
              <div className="relative rounded-lg bg-slate-950/60 p-4 border border-emerald-500/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-300 font-mono font-semibold">Phase 3: Margin Optimization</span>
                  {selectedPortCo === "bravo" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-800" />
                  )}
                </div>
                <div className="text-[11px] text-slate-500">Deploying real-time governance, metabolic clinical programs & contract lockouts.</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/10 bg-slate-900/20 p-5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Vetted Portco Therapeutic Overhangs</div>
            <div className="flex flex-wrap gap-2">
              {portCoData[selectedPortCo].details.topDrugClasses.map((drugClass, index) => (
                <span key={index} className="rounded-full bg-emerald-500/5 text-emerald-400 border border-emerald-500/15 font-mono text-xs px-2.5 py-1">
                  {drugClass}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* EBITDA Diligence Ledger Table replacing high-maintenance graphs */}
      <div className="rounded-xl border border-emerald-500/15 bg-slate-950/40 p-6 backdrop-blur-xl">
        <h4 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Landmark className="w-5 h-5 text-emerald-400" />
          EBITDA Diligence Ledger
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-emerald-500/10 text-slate-500">
                <th className="pb-3 font-semibold">OPTIMIZATION VECTOR</th>
                <th className="pb-3 font-semibold text-right">BASELINE SPEND</th>
                <th className="pb-3 font-semibold text-right">REALIZED SYNERGY</th>
                <th className="pb-3 font-semibold text-right">EBITDA MULTIPLIER YIELD</th>
                <th className="pb-3 font-semibold text-right">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 text-slate-300">
              <tr className="hover:bg-slate-900/20 transition-colors">
                <td className="py-3 font-semibold text-slate-200">Pharmacy Spread Arbitrage Lockout</td>
                <td className="py-3 text-right text-slate-400">$4,200,000</td>
                <td className="py-3 text-right text-emerald-400 font-bold">+$1,200,000</td>
                <td className="py-3 text-right text-emerald-300">12.4x Exit Multiple</td>
                <td className="py-3 text-right">
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-[9px] text-emerald-400 uppercase">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-900/20 transition-colors">
                <td className="py-3 font-semibold text-slate-200">Formulary Exclusion Rebate Retention</td>
                <td className="py-3 text-right text-slate-400">$2,900,000</td>
                <td className="py-3 text-right text-emerald-400 font-bold">+$847,000</td>
                <td className="py-3 text-right text-emerald-300">11.8x Exit Multiple</td>
                <td className="py-3 text-right">
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-[9px] text-emerald-400 uppercase">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-900/20 transition-colors">
                <td className="py-3 font-semibold text-slate-200">Consolidated Platform Volume Procurement</td>
                <td className="py-3 text-right text-slate-400">$6,800,000</td>
                <td className="py-3 text-right text-emerald-400 font-bold">+$2,100,000</td>
                <td className="py-3 text-right text-emerald-300">14.1x Exit Multiple</td>
                <td className="py-3 text-right">
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-2 py-0.5 text-[9px] text-emerald-400 uppercase">
                    Locked
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cross Portfolio Synergy Potential */}
      <div className="rounded-xl border border-emerald-500/10 bg-slate-950/40 p-6 backdrop-blur-xl">
        <h4 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-400 animate-pulse" />
          Cross-Portfolio Synergy Opportunities
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-emerald-500/10 bg-slate-900/10 p-5 hover:border-emerald-500/20 hover:bg-slate-900/20 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-300 font-mono">Consolidated Rx RFP</span>
              <span className="rounded-full bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                $1.2M potential
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-mono">
              Consolidating PBM agreements into a single risk-pool leverage mechanism.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/10 bg-slate-900/10 p-5 hover:border-emerald-500/20 hover:bg-slate-900/20 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-300 font-mono">Platform Clinical Union</span>
              <span className="rounded-full bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                $640K potential
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-mono">
              Shared specialty pharmacy exclusion networks & formulary containment suites.
            </p>
          </div>

          <div className="rounded-xl border border-emerald-500/10 bg-slate-900/10 p-5 hover:border-emerald-500/20 hover:bg-slate-900/20 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-slate-300 font-mono">Benefits Broker Fee Cap</span>
              <span className="rounded-full bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400">
                $280K potential
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-mono">
              Underwriting single brokerage platform standards with transparent fee-caps.
            </p>
          </div>
        </div>
      </div>

      {/* Drill-down drawer */}
      {activeTile && (
        <PEOperatorDrillDownDrawer
          tile={activeTile}
          isOpen={drawerOpen}
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
}