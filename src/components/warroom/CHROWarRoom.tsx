import { useMemo, useState } from "react";
import type { Filters, TileData } from "./executiveTypes";
import { ExecutiveTicker } from "./widgets/ExecutiveTicker";
import { ExecutiveFiltersBar } from "./widgets/ExecutiveFiltersBar";
import { KPITile } from "./tiles/KPITile";
import { ExecutiveEventStream } from "./ExecutiveEventStream";
import { ExecutiveKPIDrawer } from "./ExecutiveKPIDrawer";

const DEFAULT_FILTERS: Filters = {
  org: "Portfolio",
  period: "MTD",
  currency: "USD",
  businessUnit: "All",
};

// Performance rating types
type PerformanceRating = "excellent" | "good" | "warning" | "critical";

interface PerformanceThreshold {
  excellent: number;
  good: number;
  warning: number;
  // Below warning is critical
}

// CHRO-specific performance thresholds
const PERFORMANCE_THRESHOLDS: Record<string, PerformanceThreshold> = {
  benefitsUtilization: { excellent: 75, good: 70, warning: 60 },
  employeeRetention: { excellent: 90, good: 85, warning: 80 },
  healthcareROI: { excellent: 2.5, good: 2.0, warning: 1.5 },
  wellnessEngagement: { excellent: 60, good: 50, warning: 40 },
  dependentCoverage: { excellent: 65, good: 60, warning: 50 },
  benefitsAdoption: { excellent: 50, good: 45, warning: 35 },
  employeeSatisfaction: { excellent: 40, good: 30, warning: 20 },
  totalRewards: { excellent: 85, good: 80, warning: 75 },
};

function getPerformanceRating(key: string, value: string): PerformanceRating {
  const thresholds = PERFORMANCE_THRESHOLDS[key];
  if (!thresholds) return "good";

  // Extract numeric value (handle percentages and multipliers)
  const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ""));

  if (numericValue >= thresholds.excellent) return "excellent";
  if (numericValue >= thresholds.good) return "good";
  if (numericValue >= thresholds.warning) return "warning";
  return "critical";
}

function getPerformanceColor(rating: PerformanceRating): string {
  switch (rating) {
    case "excellent": return "emerald";
    case "good": return "cyan";
    case "warning": return "amber";
    case "critical": return "rose";
  }
}

// CHRO-specific mock data
function getCHROTiles(): TileData[] {
  const tiles: TileData[] = [
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

  // Add performance ratings to each tile
  return tiles.map(tile => ({
    ...tile,
    performanceRating: getPerformanceRating(tile.key, tile.value),
    performanceColor: getPerformanceColor(getPerformanceRating(tile.key, tile.value))
  }));
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
      <header className="border-b border-emerald-500/30 bg-zinc-950/60 backdrop-blur-md sticky top-16 z-50">
        <div className="mx-auto max-w-[1600px] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="text-xs tracking-wide text-emerald-400 font-semibold uppercase">Kincaid IQ</div>
                <div className="text-sm font-bold text-emerald-300">CHRO Dashboard</div>
              </div>
              <h1 className="mt-3 text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">Human Capital & Benefits Analytics</h1>
              <div className="mt-1 text-sm text-zinc-400">
                People metrics with evidence receipts. <span className="text-emerald-300 font-medium">Data-driven</span> talent strategy.
              </div>
              <div className="mt-2 text-xs text-zinc-500 flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                Status: <span className="text-emerald-400 font-semibold">LIVE</span>
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
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Employee Benefits & Engagement
            </h2>
            <div className="text-xs text-emerald-400/80 font-medium px-2 py-0.5 rounded-full bg-emerald-900/30 border border-emerald-500/20">McKinsey Framework</div>
            <div className="text-xs text-zinc-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />Excellent
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-500 ml-3 mr-1" />Good
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 ml-3 mr-1" />Warning
              <span className="inline-block w-2 h-2 rounded-full bg-rose-500 ml-3 mr-1" />Critical
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <KPITile data={tileMap.get("benefitsUtilization")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("employeeRetention")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("healthcareROI")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("wellnessEngagement")} onClick={handleTileClick} />
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              Coverage & Adoption Metrics
            </h2>
            <div className="text-xs text-teal-400/80 font-medium px-2 py-0.5 rounded-full bg-teal-900/30 border border-teal-500/20">McKinsey Framework</div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <KPITile data={tileMap.get("dependentCoverage")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("benefitsAdoption")} onClick={handleTileClick} />
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              Employee Experience & Satisfaction
            </h2>
            <div className="text-xs text-cyan-400/80 font-medium px-2 py-0.5 rounded-full bg-cyan-900/30 border border-cyan-500/20">Bain Net Promoter System</div>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <KPITile data={tileMap.get("employeeSatisfaction")} onClick={handleTileClick} />
            <KPITile data={tileMap.get("totalRewards")} onClick={handleTileClick} />
          </div>
        </section>
      </main>

      {selectedTile && (
        <ExecutiveKPIDrawer
          tile={selectedTile}
          isOpen={drawerOpen}
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
}