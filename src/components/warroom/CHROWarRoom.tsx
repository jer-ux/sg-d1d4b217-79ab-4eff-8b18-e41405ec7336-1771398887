import { useMemo, useState } from "react";
import type { Filters, TileData } from "./executiveTypes";
import { ExecutiveTicker } from "./widgets/ExecutiveTicker";
import { ExecutiveFiltersBar } from "./widgets/ExecutiveFiltersBar";
import { KPITile } from "./tiles/KPITile";
import { ExecutiveEventStream } from "./ExecutiveEventStream";
import { CHRODrillDownDrawer } from "./CHRODrillDownDrawer";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, DollarSign, CheckCircle2, Activity } from "lucide-react";

const DEFAULT_FILTERS: Filters = {
  org: "Portfolio",
  period: "MTD",
  currency: "USD",
  businessUnit: "All",
};

// CHRO-specific mock data
function getCHROTiles(): TileData[] {
  return [
    {
      key: "benefitsUtilization",
      title: "Benefits Utilization Rate",
      value: "78%",
      delta: "+5pp QoQ",
      trend: "up",
      subtitle: "Employee Benefits Engagement",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 73 },
        { period: "Q2", value: 75 },
        { period: "Q3", value: 76 },
        { period: "Q4", value: 78 },
      ]
    },
    {
      key: "employeeRetention",
      title: "Benefits-Related Retention",
      value: "92.4%",
      delta: "+2.1pp",
      trend: "up",
      subtitle: "12-Month Rolling Average",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 90.3 },
        { period: "Q2", value: 91.2 },
        { period: "Q3", value: 91.8 },
        { period: "Q4", value: 92.4 },
      ]
    },
    {
      key: "healthcareROI",
      title: "Healthcare Benefits ROI",
      value: "2.8x",
      delta: "+0.3x",
      trend: "up",
      subtitle: "Value per Dollar Spent",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 2.5 },
        { period: "Q2", value: 2.6 },
        { period: "Q3", value: 2.7 },
        { period: "Q4", value: 2.8 },
      ]
    },
    {
      key: "wellnessEngagement",
      title: "Wellness Program Engagement",
      value: "64%",
      delta: "+8pp",
      trend: "up",
      subtitle: "Active Participation Rate",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 56 },
        { period: "Q2", value: 59 },
        { period: "Q3", value: 62 },
        { period: "Q4", value: 64 },
      ]
    },
    {
      key: "dependentCoverage",
      title: "Dependent Coverage Rate",
      value: "68%",
      delta: "+3pp",
      trend: "up",
      subtitle: "Family Coverage Adoption",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 65 },
        { period: "Q2", value: 66 },
        { period: "Q3", value: 67 },
        { period: "Q4", value: 68 },
      ]
    },
    {
      key: "benefitsAdoption",
      title: "New Benefits Adoption",
      value: "56%",
      delta: "+12pp",
      trend: "up",
      subtitle: "First-Year Enrollment Rate",
      framework: "McKinsey",
      chartData: [
        { period: "Q1", value: 44 },
        { period: "Q2", value: 48 },
        { period: "Q3", value: 52 },
        { period: "Q4", value: 56 },
      ]
    },
    {
      key: "employeeSatisfaction",
      title: "Benefits Satisfaction Score",
      value: "+45",
      delta: "+8pts",
      trend: "up",
      subtitle: "Quarterly Benefits Survey",
      framework: "Bain",
      chartData: [
        { period: "Q1", value: 37 },
        { period: "Q2", value: 40 },
        { period: "Q3", value: 42 },
        { period: "Q4", value: 45 },
      ]
    },
    {
      key: "totalRewards",
      title: "Total Rewards Competitiveness",
      value: "87",
      delta: "+5pts",
      trend: "up",
      subtitle: "Market Benchmark Index",
      framework: "Bain",
      chartData: [
        { period: "Q1", value: 82 },
        { period: "Q2", value: 84 },
        { period: "Q3", value: 85 },
        { period: "Q4", value: 87 },
      ]
    },
  ];
}

function getCHROTickerItems(): string[] {
  return [
    "Portfolio MTD: Benefits Utilization 78% | Retention 92.4% | Employee Satisfaction +45",
    "Wellness Alert: Q4 engagement exceeded target by 14pp | Program ROI positive",
    "Benefits Adoption: New plan features achieve 56% first-year enrollment vs 40% target",
  ];
}

export function CHROWarRoom() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [selectedTile, setSelectedTile] = useState<TileData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tiles = useMemo(() => getCHROTiles(), []);
  const tickerItems = useMemo(() => getCHROTickerItems(), []);

  const tileMap = useMemo(() => {
    const m = new Map();
    tiles.forEach((t) => m.set(t.key, t));
    return m;
  }, [tiles]);

  const handleTileClick = (tile: TileData) => {
    console.log("CHRO Tile clicked:", tile.title);
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
      <header className="border-b border-purple-500/30 bg-zinc-950/60 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-[1600px] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl font-black bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">Kincaid Health</div>
                <div className="text-xs tracking-wide text-purple-400/70 font-medium uppercase border-l border-purple-500/30 pl-3">CHRO Edition</div>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">Human Capital & Benefits Analytics</h1>
              <div className="mt-1 text-sm text-zinc-400">
                People metrics with evidence receipts. <span className="text-purple-300 font-medium">Data-driven</span> talent strategy.
              </div>
              <div className="mt-2 text-xs text-zinc-500 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)] animate-pulse" />
                Status: <span className="text-purple-400 font-semibold">LIVE</span>
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

      <ExecutiveTicker items={tickerItems} />

      <main className="mx-auto max-w-[1600px] px-6 py-6">
        <section className="mb-8">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              Employee Benefits & Engagement
            </h2>
            <div className="text-xs text-purple-400/80 font-medium px-2 py-0.5 rounded-full bg-purple-900/30 border border-purple-500/20">McKinsey Framework</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wide">Workforce Health</span>
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">Medium Risk</div>
              <div className="text-xs text-neutral-400">Population health score: 72/100</div>
              <div className="mt-3 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  initial={{ width: 0 }}
                  animate={{ width: "72%" }}
                  transition={{ duration: 1, delay: 0.5 }} />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wide">Productivity Loss</span>
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">$847K</div>
              <div className="text-xs text-neutral-400">Annual absenteeism cost</div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-red-400">↑ 12% YoY</span>
                <span className="text-neutral-500">Needs intervention</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wide">Benefits ROI</span>
                <DollarSign className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">3.2x</div>
              <div className="text-xs text-neutral-400">Return on wellness investment</div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-emerald-400">↑ 0.4x vs target</span>
                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wide">Wellness Programs</span>
                <Activity className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">64%</div>
              <div className="text-xs text-neutral-400">Employee engagement rate</div>
              <div className="mt-3 flex items-center gap-2 text-xs">
                <span className="text-emerald-400">↑ 8% vs last quarter</span>
                <TrendingUp className="h-3 w-3 text-emerald-400" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
              Coverage & Adoption Metrics
            </h2>
            <div className="text-xs text-blue-400/80 font-medium px-2 py-0.5 rounded-full bg-blue-900/30 border border-blue-500/20">McKinsey Framework</div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <KPITile data={tileMap.get("dependentCoverage")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("benefitsAdoption")} onClick={handleTileClick} />
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
              Employee Experience & Satisfaction
            </h2>
            <div className="text-xs text-rose-400/80 font-medium px-2 py-0.5 rounded-full bg-rose-900/30 border border-rose-500/20">Bain Net Promoter System</div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <KPITile data={tileMap.get("employeeSatisfaction")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("totalRewards")} onClick={handleTileClick} />
          </div>
        </section>
      </main>

      {selectedTile && (
        <CHRODrillDownDrawer
          tile={selectedTile}
          isOpen={drawerOpen}
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
}