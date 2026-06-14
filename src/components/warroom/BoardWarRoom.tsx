import { useMemo, useState } from "react";
import { Shield, Award, AlertTriangle, FileText, Calendar, CheckCircle2, TrendingUp, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TileData, Filters } from "./executiveTypes";
import { ExecutiveTicker } from "./widgets/ExecutiveTicker";
import { ExecutiveFiltersBar } from "./widgets/ExecutiveFiltersBar";
import { BoardDrillDownDrawer } from "./BoardDrillDownDrawer";
import { ResponsiveContainer, AreaChart, Area } from "recharts";

const DEFAULT_FILTERS: Filters = {
  org: "Portfolio",
  period: "MTD",
  currency: "USD",
  businessUnit: "All",
};

const ANIMATION_DELAYS: Record<string, string> = {
  fiduciary: "0s",
  risk: "1.5s",
  renewals: "3s",
  governance: "4.5s",
};

function getBoardTiles(): TileData[] {
  return [
    {
      key: "fiduciary",
      title: "Fiduciary Compliance",
      value: "98%",
      delta: "+2.1pp YoY",
      trend: "up",
      subtitle: "ERISA Section 404 Standards",
      framework: "Bain",
      chartData: [
        { period: "Q1", value: 95 },
        { period: "Q2", value: 96 },
        { period: "Q3", value: 97 },
        { period: "Q4", value: 98 },
      ]
    },
    {
      key: "risk",
      title: "Enterprise Risk Index",
      value: "Low",
      delta: "-4% Exposure",
      trend: "down",
      subtitle: "Vendor Concentration & Specialty Volatility",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 24 },
        { period: "Q2", value: 18 },
        { period: "Q3", value: 15 },
        { period: "Q4", value: 12 },
      ]
    },
    {
      key: "renewals",
      title: "PBM Contract Renewals",
      value: "Q2 2027",
      delta: "70% RFP Complete",
      trend: "up",
      subtitle: "Renegotiation Strategy Roadmap",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 40 },
        { period: "Q2", value: 55 },
        { period: "Q3", value: 62 },
        { period: "Q4", value: 70 },
      ]
    },
    {
      key: "governance",
      title: "Audit Committee Cadence",
      value: "Approved",
      delta: "100% Verified",
      trend: "up",
      subtitle: "Last audit: Oct 15, 2026",
      framework: "Bain",
      chartData: [
        { period: "Q1", value: 85 },
        { period: "Q2", value: 90 },
        { period: "Q3", value: 94 },
        { period: "Q4", value: 100 },
      ]
    }
  ];
}

function getBoardTickerItems(): string[] {
  return [
    "Board Alert: ERISA Fiduciary Compliance validated at 98% for plan year 2026",
    "Contract Watch: PBM RFP preparation reaches 70% milestone | Draft review set for Q1 2027 meeting",
    "Risk Mitigation: Specialty drug volatility exposure reduced by 14% via new carve-out policies",
    "Governance Audit: Cryptographic signature validated for all active healthcare contracts"
  ];
}

export function BoardWarRoom() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selectedTile, setSelectedTile] = useState<TileData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tiles = useMemo(() => getBoardTiles(), []);
  const tickerItems = useMemo(() => getBoardTickerItems(), []);

  const handleTileClick = (tile: TileData) => {
    setSelectedTile(tile);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      setSelectedTile(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-transparent text-zinc-100">
      {/* Dynamic Keyframes matching CHRO violet/indigo/emerald aesthetic */}
      <style jsx global>{`
        @keyframes boardColorShift {
          0% {
            border-color: rgba(168, 85, 247, 0.2);
            box-shadow: 0 0 15px rgba(168, 85, 247, 0.02);
            background-color: rgba(24, 24, 27, 0.4);
          }
          25% {
            border-color: rgba(99, 102, 241, 0.35);
            box-shadow: 0 0 25px rgba(99, 102, 241, 0.05);
            background-color: rgba(30, 27, 35, 0.3);
          }
          50% {
            border-color: rgba(139, 92, 246, 0.25);
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.02);
            background-color: rgba(24, 24, 27, 0.4);
          }
          75% {
            border-color: rgba(129, 140, 248, 0.4);
            box-shadow: 0 0 30px rgba(129, 140, 248, 0.06);
            background-color: rgba(20, 24, 35, 0.3);
          }
          100% {
            border-color: rgba(168, 85, 247, 0.2);
            box-shadow: 0 0 15px rgba(168, 85, 247, 0.02);
            background-color: rgba(24, 24, 27, 0.4);
          }
        }
        .board-tile-animated {
          animation: boardColorShift 8s infinite ease-in-out;
        }
      `}</style>

      {/* Dynamic Header with CHRO visual tokens */}
      <header className="border-b border-purple-500/30 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-[1600px] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl font-black bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">SiriusB iQ</div>
                <div className="text-xs tracking-wide text-purple-400/80 font-mono font-bold uppercase border-l border-purple-500/30 pl-3">Boardroom Edition</div>
              </div>
              <h1 className="text-xl font-bold font-serif tracking-tight text-white">Board of Directors Command Center</h1>
              <div className="mt-1 text-sm text-zinc-400">
                Governance, compliance, and fiduciary oversight metrics. Powered by <span className="text-purple-400 font-medium">Evidence-First™ Data Science</span>.
              </div>
              <div className="mt-2 text-xs text-zinc-500 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-pulse" />
                System Oversight: <span className="text-purple-400 font-semibold font-mono">SECURE / ACTIVE</span>
              </div>
            </div>

            <div className="hidden md:block">
              <ExecutiveFiltersBar value={filters} onChange={setFilters} />
            </div>
          </div>

          <div className="mt-4 md:hidden">
            <ExecutiveFiltersBar value={filters} onChange={setFilters} />
          </div>
        </div>
      </header>

      {/* Marquee Ticker */}
      <ExecutiveTicker items={tickerItems} />

      {/* Main Panel Content */}
      <main className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {tiles.map((tile) => {
            const Icon = tile.key === "fiduciary" ? Shield :
                         tile.key === "risk" ? AlertTriangle :
                         tile.key === "renewals" ? Calendar : FileText;

            return (
              <button
                key={tile.key}
                onClick={() => handleTileClick(tile)}
                className="group board-tile-animated relative rounded-xl border p-5 text-left transition-all duration-300 hover:scale-[1.01] hover:border-purple-400/80 hover:shadow-2xl hover:shadow-purple-500/10 active:scale-[0.99]"
                style={{
                  animationDelay: ANIMATION_DELAYS[tile.key] || "0s",
                }}
              >
                {/* Visual Accent Layer */}
                <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-300 group-hover:w-full" />
                
                <div className="flex items-start justify-between mb-4">
                  <div className="rounded-lg bg-zinc-850 p-2.5 border border-zinc-850 transition-colors group-hover:border-purple-500/20 group-hover:bg-purple-500/5">
                    <Icon className="h-5 w-5 text-purple-400" />
                  </div>
                  {tile.delta && (
                    <span className="text-xs font-mono font-medium text-purple-400 bg-purple-500/5 px-2.5 py-0.5 rounded-full border border-purple-500/10">
                      {tile.delta}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{tile.title}</div>
                  <div className="text-3xl font-bold font-serif text-white tracking-tight">{tile.value}</div>
                  <p className="text-xs text-zinc-400 line-clamp-1 group-hover:text-zinc-300 transition-colors">{tile.subtitle}</p>
                </div>

                {/* Micro Sparkline Chart with Purple Tint */}
                {tile.chartData && (
                  <div className="mt-5 h-10 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={tile.chartData}>
                        <defs>
                          <linearGradient id={`gradient-${tile.key}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#a855f7" 
                          fill={`url(#gradient-${tile.key})`} 
                          strokeWidth={1.5} 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Action Items Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6">
            <div className="flex items-center gap-2.5 mb-5 border-b border-zinc-800 pb-4">
              <Award className="h-5 w-5 text-purple-400" />
              <div>
                <h3 className="text-lg font-serif font-semibold text-zinc-100">Board Fiduciary Objectives</h3>
                <p className="text-xs text-zinc-400">Critical roadmap steps and active priorities</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4 flex items-start gap-4">
                <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 p-1 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-200">Q4 Pharmacy Benefit Audit</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Verified</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">Forensic analysis successfully verified 100% of plan rebate credits and recovered contract leakage.</p>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4 flex items-start gap-4">
                <div className="rounded-full bg-purple-500/10 border border-purple-500/20 p-1 mt-0.5">
                  <RefreshCw className="h-4 w-4 text-purple-400 animate-spin-slow" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-200">Specialty Drug Carve-Out Strategy</span>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">Active</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">Evaluating standalone specialty program designs to control clinical exposure and lower high-cost drug liability.</p>
                </div>
              </div>

              <div className="rounded-lg border border-zinc-800 bg-zinc-950/40 p-4 flex items-start gap-4 opacity-75">
                <div className="rounded-full bg-zinc-800 border border-zinc-700 p-1 mt-0.5">
                  <div className="h-4 w-4 rounded-full border-2 border-zinc-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-300">2027 Plan Year Benefit Validation</span>
                    <span className="text-[10px] font-mono text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded">Scheduled</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">Mandatory statutory validation against latest Consolidated Appropriations Act transparency models.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Committee Breakdown */}
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-5 border-b border-zinc-800 pb-4">
                <Shield className="h-5 w-5 text-purple-400" />
                <div>
                  <h3 className="text-lg font-serif font-semibold text-zinc-100">Committee Structures</h3>
                  <p className="text-xs text-zinc-400">Governance divisions & oversight sessions</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-zinc-950/40 border border-zinc-800 p-3 rounded-lg">
                  <div>
                    <span className="text-xs font-mono text-zinc-400">Benefits Committee</span>
                    <p className="text-xs text-zinc-300">4 Active members</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">Jan 15, 2027</Badge>
                </div>

                <div className="flex justify-between items-center bg-zinc-950/40 border border-zinc-800 p-3 rounded-lg">
                  <div>
                    <span className="text-xs font-mono text-zinc-400">Audit Committee</span>
                    <p className="text-xs text-zinc-300">3 Active members</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">Jan 22, 2027</Badge>
                </div>

                <div className="flex justify-between items-center bg-zinc-950/40 border border-zinc-800 p-3 rounded-lg">
                  <div>
                    <span className="text-xs font-mono text-zinc-400">Compliance Oversight</span>
                    <p className="text-xs text-zinc-300">5 Active members</p>
                  </div>
                  <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono">Feb 05, 2027</Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 text-xs text-zinc-400">
              Select any of the top-level KPIs above to launch the <span className="text-purple-400 font-semibold font-serif">Governance Deep-Dive Analyzer</span> for advanced level-1 to level-7 trace validation.
            </div>
          </div>
        </div>
      </main>

      {/* Drill-down Drawer Integration */}
      {selectedTile && (
        <BoardDrillDownDrawer
          tile={selectedTile}
          isOpen={drawerOpen}
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
}