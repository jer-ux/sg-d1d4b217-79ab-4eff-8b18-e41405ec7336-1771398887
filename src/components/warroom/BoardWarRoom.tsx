import { useMemo, useState } from "react";
import { Shield, Award, AlertTriangle, FileText, Calendar, CheckCircle2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { TileData, Filters } from "./executiveTypes";
import { ExecutiveTicker } from "./widgets/ExecutiveTicker";
import { ExecutiveFiltersBar } from "./widgets/ExecutiveFiltersBar";
import { BoardDrillDownDrawer } from "./BoardDrillDownDrawer";
import { ExecutiveKPITile } from "./tiles/ExecutiveKPITile";

const DEFAULT_FILTERS: Filters = {
  org: "Portfolio",
  period: "MTD",
  currency: "USD",
  businessUnit: "All",
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
      ],
      gradient: "from-violet-600 to-purple-600",
      iconBg: "bg-violet-500/10",
      iconBorder: "border-violet-500/20",
      iconColor: "text-violet-400"
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
      ],
      gradient: "from-amber-600 to-orange-600",
      iconBg: "bg-amber-500/10",
      iconBorder: "border-amber-500/20",
      iconColor: "text-amber-400"
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
      ],
      gradient: "from-blue-600 to-cyan-600",
      iconBg: "bg-blue-500/10",
      iconBorder: "border-blue-500/20",
      iconColor: "text-blue-400"
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
      ],
      gradient: "from-emerald-600 to-teal-600",
      iconBg: "bg-emerald-500/10",
      iconBorder: "border-emerald-500/20",
      iconColor: "text-emerald-400"
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

  const getIconForTile = (key: string) => {
    switch(key) {
      case "fiduciary": return Shield;
      case "risk": return AlertTriangle;
      case "renewals": return Calendar;
      case "governance": return FileText;
      default: return Shield;
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-zinc-100">
      {/* Dynamic Header */}
      <header className="border-b border-[#2A3F54] bg-gradient-to-br from-[#0C1117] to-[#151B23] backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-[1600px] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl font-black bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">SiriusB iQ</div>
                <div className="text-xs tracking-wide text-[#B8860B] font-mono font-bold uppercase border-l border-[#2A3F54] pl-3">Boardroom Edition</div>
              </div>
              <h1 className="text-xl font-bold font-serif tracking-tight text-white">Board of Directors Command Center</h1>
              <div className="mt-1 text-sm text-neutral-400">
                Governance, compliance, and fiduciary oversight metrics. Powered by <span className="text-[#B8860B] font-medium">Evidence-First™ Data Science</span>.
              </div>
              <div className="mt-2 text-xs text-neutral-500 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                System Oversight: <span className="text-emerald-400 font-semibold font-mono">SECURE / ACTIVE</span>
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
            const Icon = getIconForTile(tile.key);
            return (
              <ExecutiveKPITile
                key={tile.key}
                tile={tile}
                Icon={Icon}
                onClick={() => handleTileClick(tile)}
              />
            );
          })}
        </div>

        {/* Action Items Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#0C1117] to-[#151B23] p-6 shadow-2xl">
            <div className="flex items-center gap-2.5 mb-5 border-b border-[#2A3F54] pb-4">
              <Award className="h-5 w-5 text-[#B8860B]" />
              <div>
                <h3 className="text-lg font-serif font-semibold text-zinc-100">Board Fiduciary Objectives</h3>
                <p className="text-xs text-neutral-400">Critical roadmap steps and active priorities</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-[#2A3F54] bg-[#0C1117] p-4 flex items-start gap-4 hover:border-emerald-500/30 transition-colors">
                <div className="rounded-full bg-emerald-500/10 border border-emerald-500/20 p-1 mt-0.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-200">Q4 Pharmacy Benefit Audit</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Verified</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">Forensic analysis successfully verified 100% of plan rebate credits and recovered contract leakage.</p>
                </div>
              </div>

              <div className="rounded-lg border border-[#2A3F54] bg-[#0C1117] p-4 flex items-start gap-4 hover:border-violet-500/30 transition-colors">
                <div className="rounded-full bg-violet-500/10 border border-violet-500/20 p-1 mt-0.5">
                  <RefreshCw className="h-4 w-4 text-violet-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-200">Specialty Drug Carve-Out Strategy</span>
                    <span className="text-[10px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">Active</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">Evaluating standalone specialty program designs to control clinical exposure and lower high-cost drug liability.</p>
                </div>
              </div>

              <div className="rounded-lg border border-[#2A3F54] bg-[#0C1117] p-4 flex items-start gap-4 opacity-75 hover:opacity-100 transition-opacity">
                <div className="rounded-full bg-neutral-800 border border-neutral-700 p-1 mt-0.5">
                  <div className="h-4 w-4 rounded-full border-2 border-neutral-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-zinc-300">2027 Plan Year Benefit Validation</span>
                    <span className="text-[10px] font-mono text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">Scheduled</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">Mandatory statutory validation against latest Consolidated Appropriations Act transparency models.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Committee Breakdown */}
          <div className="rounded-xl border border-[#2A3F54] bg-gradient-to-br from-[#0C1117] to-[#151B23] p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center gap-2.5 mb-5 border-b border-[#2A3F54] pb-4">
                <Shield className="h-5 w-5 text-[#B8860B]" />
                <div>
                  <h3 className="text-lg font-serif font-semibold text-zinc-100">Committee Structures</h3>
                  <p className="text-xs text-neutral-400">Governance divisions & oversight sessions</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center bg-[#0C1117] border border-[#2A3F54] p-3 rounded-lg hover:border-emerald-500/30 transition-colors">
                  <div>
                    <span className="text-xs font-mono text-neutral-400">Benefits Committee</span>
                    <p className="text-xs text-neutral-300">4 Active members</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">Jan 15, 2027</Badge>
                </div>

                <div className="flex justify-between items-center bg-[#0C1117] border border-[#2A3F54] p-3 rounded-lg hover:border-emerald-500/30 transition-colors">
                  <div>
                    <span className="text-xs font-mono text-neutral-400">Audit Committee</span>
                    <p className="text-xs text-neutral-300">3 Active members</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono">Jan 22, 2027</Badge>
                </div>

                <div className="flex justify-between items-center bg-[#0C1117] border border-[#2A3F54] p-3 rounded-lg hover:border-violet-500/30 transition-colors">
                  <div>
                    <span className="text-xs font-mono text-neutral-400">Compliance Oversight</span>
                    <p className="text-xs text-neutral-300">5 Active members</p>
                  </div>
                  <Badge className="bg-violet-500/10 text-violet-400 border border-violet-500/20 text-[10px] font-mono">Feb 05, 2027</Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#2A3F54] text-xs text-neutral-400">
              Select any of the top-level KPIs above to launch the <span className="text-[#B8860B] font-semibold font-serif">Governance Deep-Dive Analyzer</span> for advanced level-1 to level-7 trace validation.
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