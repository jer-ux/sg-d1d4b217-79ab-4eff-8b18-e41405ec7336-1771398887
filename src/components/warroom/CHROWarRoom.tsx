import { useMemo, useState } from "react";
import type { Filters, TileData } from "./executiveTypes";
import { ExecutiveTicker } from "./widgets/ExecutiveTicker";
import { ExecutiveFiltersBar } from "./widgets/ExecutiveFiltersBar";
import { KPITile } from "./tiles/KPITile";
import { ExecutiveEventStream } from "./ExecutiveEventStream";
import { ExecutiveKPIDrawer } from "./ExecutiveKPIDrawer";
import { ChevronRight, ArrowLeft, Users, TrendingUp, Heart, Award, FileText, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
}

// Drill-down levels
type DrillLevel = "overview" | "category" | "subcategory" | "detail" | "employee";

interface DrillState {
  level: DrillLevel;
  category?: string;
  subcategory?: string;
  employeeId?: string;
  breadcrumbs: Array<{ label: string; level: DrillLevel; category?: string; subcategory?: string }>;
}

// Employee detail interface
interface EmployeeDetail {
  id: string;
  name: string;
  department: string;
  role: string;
  tenure: string;
  benefitsUtilization: number;
  healthcareSpend: number;
  wellnessScore: number;
  satisfaction: number;
  dependents: number;
  status: "active" | "pending" | "review";
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

// Mock employee data generator
function generateEmployeeData(): EmployeeDetail[] {
  const names = [
    "Sarah Johnson", "Michael Chen", "Emily Rodriguez", "David Park",
    "Jessica Williams", "Robert Taylor", "Maria Garcia", "James Anderson",
    "Lisa Martinez", "John Thompson", "Amanda White", "Christopher Lee",
    "Jennifer Davis", "Daniel Kim", "Michelle Brown", "Kevin Wilson"
  ];
  
  const departments = ["Engineering", "Sales", "Marketing", "Operations", "Finance", "HR"];
  const roles = ["Senior Manager", "Manager", "Lead", "Senior Specialist", "Specialist"];
  
  return names.map((name, idx) => ({
    id: `EMP${1000 + idx}`,
    name,
    department: departments[idx % departments.length],
    role: roles[idx % roles.length],
    tenure: `${Math.floor(Math.random() * 10) + 1}y ${Math.floor(Math.random() * 12)}m`,
    benefitsUtilization: Math.floor(Math.random() * 40) + 60,
    healthcareSpend: Math.floor(Math.random() * 8000) + 4000,
    wellnessScore: Math.floor(Math.random() * 30) + 70,
    satisfaction: Math.floor(Math.random() * 40) + 60,
    dependents: Math.floor(Math.random() * 4),
    status: idx % 8 === 0 ? "review" : idx % 5 === 0 ? "pending" : "active"
  }));
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
  
  const [drillState, setDrillState] = useState<DrillState>({
    level: "overview",
    breadcrumbs: [{ label: "CHRO Dashboard", level: "overview" }]
  });

  const tiles = useMemo(() => getCHROTiles(), []);
  const tickerItems = useMemo(() => getCHROTickerItems(), []);
  const employees = useMemo(() => generateEmployeeData(), []);

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

  const handleDrillDown = (category: string, subcategory?: string) => {
    const newLevel: DrillLevel = subcategory ? "subcategory" : "category";
    const label = subcategory || category;
    
    setDrillState(prev => ({
      ...prev,
      level: newLevel,
      category,
      subcategory,
      breadcrumbs: [...prev.breadcrumbs, { label, level: newLevel, category, subcategory }]
    }));
  };

  const handleEmployeeDrill = (employeeId: string, employeeName: string) => {
    setDrillState(prev => ({
      ...prev,
      level: "employee",
      employeeId,
      breadcrumbs: [...prev.breadcrumbs, { label: employeeName, level: "employee" }]
    }));
  };

  const handleBreadcrumbClick = (index: number) => {
    const crumb = drillState.breadcrumbs[index];
    setDrillState({
      level: crumb.level,
      category: crumb.category,
      subcategory: crumb.subcategory,
      breadcrumbs: drillState.breadcrumbs.slice(0, index + 1)
    });
  };

  const renderBreadcrumbs = () => (
    <div className="flex items-center gap-2 text-sm mb-6">
      {drillState.breadcrumbs.map((crumb, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {idx > 0 && <ChevronRight className="h-4 w-4 text-zinc-600" />}
          <button
            onClick={() => handleBreadcrumbClick(idx)}
            className={`${
              idx === drillState.breadcrumbs.length - 1
                ? "text-emerald-400 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            } transition-colors`}
          >
            {crumb.label}
          </button>
        </div>
      ))}
    </div>
  );

  const renderOverview = () => (
    <>
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

      <section className="mb-8">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            Drill-Down Categories
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            icon={<Users className="h-6 w-6" />}
            title="Employee Details"
            description="Individual employee benefits and engagement"
            metric="1,247 employees"
            color="emerald"
            onClick={() => handleDrillDown("Employee Details")}
          />
          <CategoryCard
            icon={<Heart className="h-6 w-6" />}
            title="Healthcare Claims"
            description="Medical, dental, and vision claims analysis"
            metric="$8.2M YTD spend"
            color="rose"
            onClick={() => handleDrillDown("Healthcare Claims")}
          />
          <CategoryCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Wellness Programs"
            description="Program participation and outcomes"
            metric="64% engagement"
            color="cyan"
            onClick={() => handleDrillDown("Wellness Programs")}
          />
          <CategoryCard
            icon={<Award className="h-6 w-6" />}
            title="Benefits Enrollment"
            description="Plan selection and coverage details"
            metric="98% enrolled"
            color="amber"
            onClick={() => handleDrillDown("Benefits Enrollment")}
          />
          <CategoryCard
            icon={<FileText className="h-6 w-6" />}
            title="Vendor Performance"
            description="Insurance carrier and TPA metrics"
            metric="8 vendors"
            color="purple"
            onClick={() => handleDrillDown("Vendor Performance")}
          />
          <CategoryCard
            icon={<DollarSign className="h-6 w-6" />}
            title="Cost Analysis"
            description="Benefits cost trends and forecasts"
            metric="$12.4M budget"
            color="teal"
            onClick={() => handleDrillDown("Cost Analysis")}
          />
        </div>
      </section>
    </>
  );

  const renderEmployeeDetails = () => {
    const selectedEmployee = employees.find(e => e.id === drillState.employeeId);
    
    if (drillState.level === "employee" && selectedEmployee) {
      return (
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-zinc-100">{selectedEmployee.name}</h2>
              <div className="mt-2 flex items-center gap-4 text-sm text-zinc-400">
                <span>{selectedEmployee.role}</span>
                <span>•</span>
                <span>{selectedEmployee.department}</span>
                <span>•</span>
                <span>{selectedEmployee.tenure} tenure</span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              selectedEmployee.status === "active" ? "bg-emerald-500/20 text-emerald-400" :
              selectedEmployee.status === "pending" ? "bg-amber-500/20 text-amber-400" :
              "bg-rose-500/20 text-rose-400"
            }`}>
              {selectedEmployee.status.toUpperCase()}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Benefits Utilization"
              value={`${selectedEmployee.benefitsUtilization}%`}
              trend={selectedEmployee.benefitsUtilization > 75 ? "up" : "down"}
              color="emerald"
            />
            <MetricCard
              label="Healthcare Spend (YTD)"
              value={`$${selectedEmployee.healthcareSpend.toLocaleString()}`}
              trend={selectedEmployee.healthcareSpend < 6000 ? "up" : "down"}
              color="rose"
            />
            <MetricCard
              label="Wellness Score"
              value={`${selectedEmployee.wellnessScore}/100`}
              trend={selectedEmployee.wellnessScore > 80 ? "up" : "down"}
              color="cyan"
            />
            <MetricCard
              label="Satisfaction Rating"
              value={`${selectedEmployee.satisfaction}%`}
              trend={selectedEmployee.satisfaction > 70 ? "up" : "down"}
              color="purple"
            />
          </div>

          <Card className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6">
            <h3 className="text-lg font-semibold text-zinc-100 mb-4">Recent Benefits Activity</h3>
            <div className="space-y-3">
              <ActivityItem
                date="2026-03-15"
                action="Wellness Program Enrollment"
                details="Enrolled in Fitness Reimbursement Program"
                status="completed"
              />
              <ActivityItem
                date="2026-03-10"
                action="Healthcare Claim"
                details="Preventive care visit - $0 copay"
                status="processed"
              />
              <ActivityItem
                date="2026-02-28"
                action="Benefits Survey Response"
                details="Completed Q1 benefits satisfaction survey"
                status="completed"
              />
              <ActivityItem
                date="2026-02-15"
                action="Dependent Added"
                details="Added spouse to medical coverage"
                status="active"
              />
            </div>
          </Card>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-100">Employee Directory</h2>
          <div className="text-sm text-zinc-400">{employees.length} employees</div>
        </div>

        <div className="grid gap-3">
          {employees.map(employee => (
            <Card
              key={employee.id}
              className="border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-4 hover:border-emerald-500/50 transition-colors cursor-pointer"
              onClick={() => handleEmployeeDrill(employee.id, employee.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold">
                    {employee.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-100">{employee.name}</div>
                    <div className="text-sm text-zinc-400">{employee.role} • {employee.department}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-zinc-400">Utilization</div>
                    <div className={`font-semibold ${
                      employee.benefitsUtilization > 75 ? "text-emerald-400" :
                      employee.benefitsUtilization > 60 ? "text-cyan-400" :
                      "text-amber-400"
                    }`}>
                      {employee.benefitsUtilization}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-zinc-400">Spend</div>
                    <div className="font-semibold text-zinc-100">${(employee.healthcareSpend / 1000).toFixed(1)}K</div>
                  </div>
                  <div className="text-center">
                    <div className="text-zinc-400">Wellness</div>
                    <div className="font-semibold text-cyan-400">{employee.wellnessScore}</div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-zinc-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderCategoryView = () => {
    // Render different views based on selected category
    if (drillState.category === "Employee Details") {
      return renderEmployeeDetails();
    }

    // Placeholder for other categories
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-zinc-100 mb-2">{drillState.category}</h2>
        <p className="text-zinc-400">Detailed view coming soon...</p>
      </div>
    );
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
              <h1 className="mt-3 text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
                Human Capital & Benefits Analytics
              </h1>
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
        {drillState.level !== "overview" && renderBreadcrumbs()}
        
        {drillState.level === "overview" && renderOverview()}
        {drillState.level !== "overview" && renderCategoryView()}
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

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
  color: string;
  onClick: () => void;
}

function CategoryCard({ icon, title, description, metric, color, onClick }: CategoryCardProps) {
  const colorClasses = {
    emerald: "from-emerald-500 to-teal-500 hover:shadow-emerald-500/20",
    rose: "from-rose-500 to-pink-500 hover:shadow-rose-500/20",
    cyan: "from-cyan-500 to-blue-500 hover:shadow-cyan-500/20",
    amber: "from-amber-500 to-orange-500 hover:shadow-amber-500/20",
    purple: "from-purple-500 to-violet-500 hover:shadow-purple-500/20",
    teal: "from-teal-500 to-cyan-500 hover:shadow-teal-500/20",
  };

  return (
    <Card
      className={`border-zinc-800 bg-zinc-900/50 backdrop-blur-sm p-6 hover:shadow-xl transition-all cursor-pointer group ${colorClasses[color as keyof typeof colorClasses]}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <ChevronRight className="h-5 w-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
      </div>
      <h3 className="text-lg font-semibold text-zinc-100 mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 mb-4">{description}</p>
      <div className="text-2xl font-bold text-emerald-400">{metric}</div>
    </Card>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  trend: "up" | "down";
  color: string;
}

function MetricCard({ label, value, trend, color }: MetricCardProps) {
  const colorClasses = {
    emerald: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30",
    rose: "from-rose-500/10 to-pink-500/10 border-rose-500/30",
    cyan: "from-cyan-500/10 to-blue-500/10 border-cyan-500/30",
    purple: "from-purple-500/10 to-violet-500/10 border-purple-500/30",
  };

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border p-4`}>
      <div className="text-sm text-zinc-400 mb-2">{label}</div>
      <div className="text-2xl font-bold text-zinc-100">{value}</div>
    </Card>
  );
}

interface ActivityItemProps {
  date: string;
  action: string;
  details: string;
  status: string;
}

function ActivityItem({ date, action, details, status }: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4 pb-3 border-b border-zinc-800 last:border-0">
      <div className="text-xs text-zinc-500 w-24">{date}</div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-zinc-100">{action}</div>
        <div className="text-xs text-zinc-400">{details}</div>
      </div>
      <div className={`px-2 py-1 rounded text-xs font-semibold ${
        status === "completed" || status === "processed" ? "bg-emerald-500/20 text-emerald-400" :
        status === "active" ? "bg-cyan-500/20 text-cyan-400" :
        "bg-amber-500/20 text-amber-400"
      }`}>
        {status}
      </div>
    </div>
  );
}