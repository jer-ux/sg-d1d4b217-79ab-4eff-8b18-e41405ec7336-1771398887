import { useState } from "react";
import { 
  Shield, DollarSign, Award, Zap, Briefcase, RefreshCw, Activity, CheckCircle2, TrendingUp, Target
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

  // Mock Sparkline Data
  const sparklineData1 = [
    { period: "M1", value: 3.8 }, { period: "M2", value: 4.1 }, { period: "M3", value: 4.3 },
    { period: "M4", value: 4.0 }, { period: "M5", value: 4.5 }, { period: "M6", value: 4.8 }
  ];
  const sparklineData2 = [
    { period: "M1", value: 1.2 }, { period: "M2", value: 1.4 }, { period: "M3", value: 1.5 },
    { period: "M4", value: 1.6 }, { period: "M5", value: 1.7 }, { period: "M6", value: 1.8 }
  ];
  const sparklineData3 = [
    { period: "M1", value: 72 }, { period: "M2", value: 75 }, { period: "M3", value: 80 },
    { period: "M4", value: 83 }, { period: "M5", value: 85 }, { period: "M6", value: 87 }
  ];
  const sparklineData4 = [
    { period: "M1", value: 1.4 }, { period: "M2", value: 1.6 }, { period: "M3", value: 1.8 },
    { period: "M4", value: 1.9 }, { period: "M5", value: 2.0 }, { period: "M6", value: 2.1 }
  ];

  const portfolioTiles: TileData[] = [
    {
      key: "ebitdaLift" as TileKey,
      title: "Portfolio EBITDA Lift",
      value: "+$4.8M",
      delta: "+12.4% vs underwritten",
      subtitle: "Across 3 fully optimized portcos",
      trend: "up",
      chartData: sparklineData1,
      framework: "Bain"
    },
    {
      key: "valueCreation" as TileKey,
      title: "Value Creation Multiple",
      value: "1.8x",
      delta: "EBITDA margin expansion",
      subtitle: "Pharmacy benefit optimization multiplier",
      trend: "up",
      chartData: sparklineData2,
      framework: "McKinsey"
    },
    {
      key: "exitReadiness" as TileKey,
      title: "Exit Readiness Score",
      value: "87/100",
      delta: "+14 pts from acquisition",
      subtitle: "Fiduciary & compliance audit verified",
      trend: "up",
      chartData: sparklineData3,
      framework: "Bain"
    },
    {
      key: "rollupSynergies" as TileKey,
      title: "Rollup Synergies Realized",
      value: "$2.1M",
      delta: "96% of maximum target",
      subtitle: "Consolidated volume procurement discount",
      trend: "up",
      chartData: sparklineData4,
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
      statusColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
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
      statusColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
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
      statusColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
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
      <div className="rounded-xl border border-purple-500/30 bg-zinc-950/40 p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-pulse" />
              <span className="text-xs font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent uppercase tracking-wider">REALTIME UNDERWRITING INTELLIGENCE</span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-zinc-100 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-purple-400" />
              PE Operator Command Center
            </h3>
            <p className="text-xs text-zinc-400 mt-1">Portfolio value creation, EBITDA margin multipliers & exit-readiness compliance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              className="rounded-lg border border-zinc-850 bg-zinc-900 p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </button>
            <Badge className="bg-purple-950/40 text-purple-400 border border-purple-500/30 font-mono text-xs px-2.5 py-1">
              Active Underwriting
            </Badge>
          </div>
        </div>

        {/* Live Ticker Marquee */}
        <div className="relative flex items-center h-9 overflow-hidden rounded-lg bg-zinc-900/60 border border-zinc-800/80 px-4">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest border-r border-zinc-800 pr-3 mr-3 shrink-0">
            <Activity className="h-3 w-3 animate-pulse" /> LIVE DEALS
          </div>
          <div className="relative flex-1 overflow-hidden">
            <div className="flex gap-12 whitespace-nowrap animate-marquee">
              {tickerItems.concat(tickerItems).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300 font-mono">
                  <span className="text-purple-500">•</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio-Level KPIs Tiles Grid aligned to CHRO purple/indigo theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioTiles.map((tile) => (
          <button
            key={tile.key}
            onClick={() => handleTileClick(tile)}
            className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/20 p-5 text-left transition-all hover:border-purple-500/40 hover:bg-zinc-900/40 hover:shadow-lg hover:shadow-purple-500/5"
          >
            {/* Hover top highlight */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-mono font-semibold text-zinc-500 group-hover:text-purple-400 transition-colors uppercase tracking-wider">
                {tile.title}
              </span>
              <span className="rounded-full bg-zinc-800 px-1.5 py-0.5 text-[9px] font-mono text-zinc-400 border border-zinc-700">
                {tile.framework}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-zinc-100 font-serif tracking-tight">{tile.value}</span>
              {tile.trend === "up" && (
                <span className="flex items-center text-purple-400 text-xs font-mono">
                  <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                </span>
              )}
            </div>

            <div className="mt-2 text-[10px] text-purple-400 font-mono flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-purple-500 animate-pulse" />
              {tile.delta}
            </div>
            
            <div className="mt-1 text-[11px] text-zinc-500 line-clamp-1">{tile.subtitle}</div>

            {/* Sparkline Canvas rendering simulation with Purple tint */}
            <div className="mt-4 flex items-end gap-1 h-6 w-full opacity-60 group-hover:opacity-100 transition-opacity">
              {tile.chartData?.map((pt, index) => (
                <div 
                  key={index} 
                  className="flex-1 bg-gradient-to-t from-purple-500/30 to-purple-500 rounded-t-sm"
                  style={{ height: `${(pt.value / 6) * 100}%` }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* PortCo Portfolio Selector Tab Layout */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-500" />
            PORTFOLIO COMPANY PERFORMANCE
          </h4>
          <span className="text-[10px] font-mono text-zinc-500">Click asset to activate drill-down workspace</span>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {(Object.keys(portCoData) as Array<keyof typeof portCoData>).map((key) => {
            const isSelected = selectedPortCo === key;
            const item = portCoData[key];
            return (
              <button
                key={key}
                onClick={() => setSelectedPortCo(key)}
                className={`group relative overflow-hidden rounded-xl border p-5 text-left transition-all ${
                  isSelected 
                    ? "border-purple-500 bg-zinc-900/60 ring-2 ring-purple-500/15" 
                    : "border-zinc-800 bg-zinc-950/20 hover:border-zinc-700 hover:bg-zinc-900/30"
                }`}
              >
                {/* Visual Accent */}
                <div className={`absolute left-0 top-0 h-full w-1 ${
                  key === "alpha" ? "bg-purple-500" :
                  key === "bravo" ? "bg-emerald-500" :
                  "bg-blue-500"
                }`} />

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-zinc-200">{item.name}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-mono border ${item.statusColor}`}>
                    {key === "alpha" ? "Negotiation" : key === "bravo" ? "Complete" : "Diligence"}
                  </span>
                </div>

                <div className="space-y-2 mt-4 text-xs">
                  <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                    <span className="text-zinc-500">Asset Headcount</span>
                    <span className="font-semibold text-zinc-300 font-mono">{item.employees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-900 pb-1.5">
                    <span className="text-zinc-500">Pharmacy Spend (Underwritten)</span>
                    <span className="font-semibold text-zinc-300 font-mono">${(item.rxSpend / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">EBITDA Lift Identified</span>
                    <span className="font-bold text-purple-400 font-mono">${(item.savings / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500 border-t border-zinc-900 pt-2.5">
                  <span>Progress to Target</span>
                  <span className="font-bold text-zinc-300">{item.implementationProgress}%</span>
                </div>
                <div className="mt-1.5 h-1.5 bg-zinc-900 rounded overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      key === "alpha" ? "bg-purple-500" :
                      key === "bravo" ? "bg-emerald-500" :
                      "bg-blue-500"
                    }`}
                    style={{ width: `${item.implementationProgress}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected PortCo Workspace / Deep Dive Panel */}
      {selectedPortCo && (
        <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-zinc-950 to-zinc-900/80 p-6 md:p-8 shadow-2xl relative overflow-hidden">
          {/* Neon background lighting glow effect */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-805">
            <div>
              <div className="text-[10px] text-purple-400 font-mono mb-1 tracking-wider uppercase">PORTFOLIO DEEP DIVE</div>
              <h4 className="text-xl font-serif font-bold text-zinc-100 flex items-center gap-2">
                {portCoData[selectedPortCo].name} Analysis Suite
              </h4>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-mono">Status:</span>
              <span className={`rounded-full border px-3 py-1 text-xs font-mono ${portCoData[selectedPortCo].statusColor}`}>
                {portCoData[selectedPortCo].status}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Left box: Underwriting and Contracts */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-5">
              <div className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-purple-400" />
                Underwriting & Benefit Boundaries
              </div>
              <div className="space-y-3 text-xs text-zinc-300 font-mono">
                <div className="flex justify-between pb-2 border-b border-zinc-900">
                  <span className="text-zinc-500">Underwritten TPA/PBM</span>
                  <span className="text-zinc-200">{portCoData[selectedPortCo].details.currentPBM}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-900">
                  <span className="text-zinc-500">Agreement Terminus</span>
                  <span className="text-zinc-200">{portCoData[selectedPortCo].details.contractEnd}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-zinc-900">
                  <span className="text-zinc-500">Median Cohort Age</span>
                  <span className="text-zinc-200">{portCoData[selectedPortCo].details.avgMemberAge} yrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Chronic Care Footprint</span>
                  <span className="text-zinc-200">{portCoData[selectedPortCo].details.chronicConditions}%</span>
                </div>
              </div>
            </div>

            {/* Right box: Realized EBITDA Yield */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-5">
              <div className="text-sm font-semibold text-zinc-300 mb-4 flex items-center gap-1.5">
                <DollarSign className="h-4 w-4 text-purple-400" />
                Realized EBITDA Overhang
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-400">Locked Valuation Improvement</span>
                    <span className="text-purple-400 font-bold font-mono">
                      +${(portCoData[selectedPortCo].savings / 1000000).toFixed(1)}M Run Rate
                    </span>
                  </div>
                  <div className="h-1.5 bg-zinc-900 rounded overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: `${(portCoData[selectedPortCo].savings / portCoData[selectedPortCo].rxSpend) * 100 * 3}%` }} />
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-2 font-mono">
                    Equivalent to {((portCoData[selectedPortCo].savings / portCoData[selectedPortCo].rxSpend) * 100).toFixed(0)}% reduction in baseline corporate cost centers.
                  </p>
                </div>
                
                <div className="pt-2 border-t border-zinc-900">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Aggregate Multiple Drag</span>
                    <span className="text-rose-400 font-mono font-semibold">
                      {portCoData[selectedPortCo].trend}% down to 3.5% Target
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Underwriting Milestones Timeline */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-5 mb-6">
            <h5 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">
              Underwriting Integration Milestones
            </h5>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="relative rounded-lg bg-zinc-950 p-4 border border-zinc-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-400 font-mono">Phase 1: Deep Forensic Audit</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-[11px] text-zinc-500">Uncovered contract spread leakage of 31% vs NADAC benchmarks. Complete.</div>
              </div>
              
              <div className="relative rounded-lg bg-zinc-950 p-4 border border-zinc-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-400 font-mono">Phase 2: RFP Carve-Out swap</span>
                  {selectedPortCo === "bravo" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <span className="flex h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-pulse" />
                  )}
                </div>
                <div className="text-[11px] text-zinc-500">Executing strategic PBM renegotiation. {selectedPortCo === "bravo" ? "Complete." : "In final negotiation phase."}</div>
              </div>
              
              <div className="relative rounded-lg bg-zinc-950 p-4 border border-zinc-900">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-zinc-400 font-mono">Phase 3: Margin Optimization</span>
                  {selectedPortCo === "bravo" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-zinc-700" />
                  )}
                </div>
                <div className="text-[11px] text-zinc-500">Deploying real-time governance, metabolic clinical programs & contract lockouts.</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/20 p-5">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Vetted Portco Therapeutic Overhangs</div>
            <div className="flex flex-wrap gap-2">
              {portCoData[selectedPortCo].details.topDrugClasses.map((drugClass, index) => (
                <Badge key={index} className="bg-purple-950/20 text-purple-400 border border-purple-500/20 font-mono text-xs px-2.5 py-1">
                  {drugClass}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Value Creation Playbook Section */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6">
        <h4 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-400" />
          Value Creation Playbook Execution
        </h4>
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>Operational Excellence Audits</span>
                <span className="font-semibold text-zinc-200">82%</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: "82%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>TPA Cost Overhang Containment</span>
                <span className="font-semibold text-zinc-200">91%</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: "91%" }} />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>Fiduciary Fee Benchmarking</span>
                <span className="font-semibold text-zinc-200">67%</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: "67%" }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>Exit Readiness Valuation Compliance</span>
                <span className="font-semibold text-zinc-200">88%</span>
              </div>
              <div className="h-1.5 bg-zinc-900 rounded overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: "88%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cross Portfolio Synergy Potential */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6">
        <h4 className="text-sm font-semibold text-zinc-200 mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-purple-400 animate-pulse" />
          Cross-Portfolio Synergy Opportunities
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/10 p-5 hover:border-purple-500/20 hover:bg-zinc-900/20 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-zinc-300">Consolidated Rx RFP</span>
              <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-[10px] font-mono text-purple-400">
                $1.2M potential
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Consolidating PBM agreements into a single risk-pool leverage mechanism.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/10 p-5 hover:border-purple-500/20 hover:bg-zinc-900/20 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-zinc-300">Platform Clinical Union</span>
              <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-[10px] font-mono text-purple-400">
                $640K potential
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Shared specialty pharmacy exclusion networks & formulary containment suites.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/10 p-5 hover:border-purple-500/20 hover:bg-zinc-900/20 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-zinc-300">Benefits Broker Fee Cap</span>
              <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-[10px] font-mono text-purple-400">
                $280K potential
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">
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