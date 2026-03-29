import { X, ChevronLeft, Shield, AlertTriangle, TrendingUp, TrendingDown, FileText, CheckCircle2, ExternalLink, Users, BarChart3, MapPin, Briefcase, Calendar, Target } from "lucide-react";
import { useState, useMemo } from "react";
import type { TileData } from "./executiveTypes";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface DrillDownLevel {
  level: number;
  title: string;
  data: any;
}

interface CHRODrillDownDrawerProps {
  tile: TileData;
  isOpen: boolean;
  onClose: () => void;
}

export function CHRODrillDownDrawer({ tile, isOpen, onClose }: CHRODrillDownDrawerProps) {
  const [drillStack, setDrillStack] = useState<DrillDownLevel[]>([
    { level: 1, title: tile.title, data: tile }
  ]);

  if (!isOpen) return null;

  const currentLevel = drillStack[drillStack.length - 1];
  const canGoBack = drillStack.length > 1;

  const handleDrillDown = (item: any) => {
    if (currentLevel.level >= 7) return;

    const nextLevel = currentLevel.level + 1;
    let nextTitle = "";
    
    switch(nextLevel) {
      case 2: nextTitle = `${item.name || item.category} - Department Breakdown`; break;
      case 3: nextTitle = `${item.name} - Demographic Stratification`; break;
      case 4: nextTitle = `${item.name} - Regional Performance`; break;
      case 5: nextTitle = `${item.name} - Tenure & Risk Distribution`; break;
      case 6: nextTitle = `${item.name} - 12-Month Trajectory`; break;
      case 7: nextTitle = `Root Cause Evidence Record`; break;
    }

    setDrillStack([...drillStack, { 
      level: nextLevel, 
      title: nextTitle, 
      data: { ...item, tileKey: tile.key } 
    }]);
  };

  const handleBack = () => {
    if (drillStack.length > 1) {
      setDrillStack(drillStack.slice(0, -1));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative h-full w-full max-w-2xl overflow-hidden border-l border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/60 px-6 py-4">
            <div className="flex items-center gap-3">
              {canGoBack && (
                <button
                  onClick={handleBack}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="rounded-full bg-purple-500/20 px-2 py-1 text-purple-400">Level {currentLevel.level} of 7</span>
                  <span className="text-zinc-600">→</span>
                  {drillStack.slice(0, 3).map((level, idx) => (
                    <span key={idx} className="flex items-center gap-1">
                      {idx > 0 && <span className="text-zinc-600">→</span>}
                      <span className={level.level === currentLevel.level ? "text-zinc-100 font-medium" : "text-zinc-500"}>
                        {level.title.substring(0, 20)}{level.title.length > 20 ? "..." : ""}
                      </span>
                    </span>
                  ))}
                  {drillStack.length > 3 && <span className="text-zinc-600">...</span>}
                </div>
                <div className="mt-1 text-lg font-semibold text-zinc-100">{currentLevel.title}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border border-zinc-700 bg-zinc-800 p-2 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-zinc-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-800">
            {currentLevel.level === 1 && <Level1Content tile={tile} onDrillDown={handleDrillDown} />}
            {[2, 3, 4, 5].includes(currentLevel.level) && (
              <GenericBarLevel data={currentLevel.data} level={currentLevel.level} onDrillDown={handleDrillDown} />
            )}
            {currentLevel.level === 6 && <Level6Content data={currentLevel.data} onDrillDown={handleDrillDown} />}
            {currentLevel.level === 7 && <Level7Content data={currentLevel.data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- LEVEL 1: High Level Factors ---
function Level1Content({ tile, onDrillDown }: { tile: TileData; onDrillDown: (item: any) => void }) {
  const factors = useMemo(() => [
    { category: "Core Operations", description: "Primary workforce division metrics", value: "42%", impact: "High Impact", severity: "high" },
    { category: "Sales & Marketing", description: "Revenue-generating teams", value: "28%", impact: "Medium Impact", severity: "medium" },
    { category: "Engineering & Tech", description: "Product and development", value: "19%", impact: "Rising Trend", severity: "critical" },
    { category: "G&A / Support", description: "Administrative and support functions", value: "11%", impact: "Stable", severity: "low" },
  ], []);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-4xl font-bold text-zinc-100">{tile.value}</div>
            {tile.delta && (
              <div className="mt-2 flex items-center gap-2 text-sm text-purple-400">
                <TrendingUp className="h-4 w-4" />
                <span>{tile.delta}</span>
              </div>
            )}
            {tile.subtitle && <div className="mt-2 text-sm text-zinc-400">{tile.subtitle}</div>}
          </div>
          {tile.chartData && (
            <div className="h-16 w-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tile.chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#a855f7" fill="url(#colorValue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <Target className="h-4 w-4 text-purple-400" />
          Primary Contributing Factors (Click to drill down)
        </h3>
        <div className="space-y-3">
          {factors.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown({ ...cat, name: cat.category })}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-purple-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-zinc-100">{cat.category}</div>
                    <span className={`rounded-full px-2 py-0.5 text-xs ${
                      cat.severity === "critical" ? "bg-rose-500/20 text-rose-400" :
                      cat.severity === "high" ? "bg-amber-500/20 text-amber-400" :
                      cat.severity === "medium" ? "bg-blue-500/20 text-blue-400" :
                      "bg-emerald-500/20 text-emerald-400"
                    }`}>
                      {cat.severity}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">{cat.description}</div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-lg font-bold text-zinc-100">{cat.value}</div>
                  <div className="mt-1 text-xs text-zinc-500">{cat.impact}</div>
                </div>
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-purple-400 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- LEVELS 2, 3, 4, 5: Generic Bar Chart & List ---
function GenericBarLevel({ data, level, onDrillDown }: { data: any, level: number, onDrillDown: (item: any) => void }) {
  const chartData = useMemo(() => {
    const categories = 
      level === 2 ? ['Engineering', 'Sales', 'Operations', 'HR', 'Finance'] :
      level === 3 ? ['Gen Z (<26)', 'Millennials (27-42)', 'Gen X (43-58)', 'Boomers (59+)'] :
      level === 4 ? ['North America', 'EMEA', 'APAC', 'LATAM'] :
      ['<1 Year', '1-3 Years', '3-5 Years', '5-10 Years', '10+ Years'];

    return categories.map(c => ({
      name: c,
      value: Math.floor(Math.random() * 60) + 20,
      trend: Math.random() > 0.5 ? 'up' : 'down',
      change: `${Math.floor(Math.random() * 15) + 1}%`,
      subtext: level === 2 ? 'Employees' : level === 3 ? 'Cohort Size' : level === 4 ? 'Regional HC' : 'Retention Risk'
    })).sort((a, b) => b.value - a.value);
  }, [level]);

  const Icon = level === 2 ? Briefcase : level === 3 ? Users : level === 4 ? MapPin : Calendar;

  return (
    <div className="space-y-6">
      {/* Header Summary Card */}
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-zinc-800/80 p-2">
            <Icon className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <div className="text-sm text-zinc-400">{data.name} Segment</div>
            <div className="text-xl font-bold text-zinc-100">Dimensional Breakdown</div>
          </div>
        </div>
        
        {/* The Bar Chart */}
        <div className="mt-6 h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#27272a', opacity: 0.4 }}
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }}
                itemStyle={{ color: "#a855f7", fontWeight: "bold" }}
                labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
              />
              <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Drill Down List */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <BarChart3 className="h-4 w-4 text-purple-400" />
          Detailed Segments (Click to drill deeper)
        </h3>
        <div className="space-y-3">
          {chartData.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown(item)}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-purple-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-zinc-100">{item.name}</div>
                  <div className="mt-1 text-xs text-zinc-400">Analysis subset covering {item.value} {item.subtext.toLowerCase()}</div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-base font-bold text-zinc-100">{item.value} Index</div>
                  <div className={`mt-1 flex items-center justify-end gap-1 text-xs ${item.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{item.change}</span>
                  </div>
                </div>
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-purple-400 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- LEVEL 6: Predictive Trajectory ---
function Level6Content({ data, onDrillDown }: { data: any, onDrillDown: (item: any) => void }) {
  const trendData = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const isHistorical = i < 8;
      const baseValue = data.value || 50;
      return {
        month: `M${i+1}`,
        value: isHistorical ? baseValue + (Math.random() * 10 - 5) : null,
        forecast: !isHistorical ? baseValue + (i - 7) * 2 + (Math.random() * 8) : null,
      };
    });
  }, [data.value]);

  const drivers = [
    { id: "DRV-882", name: "Benefits Utilization Shift", type: "Behavioral", impact: "High", confidence: "92%" },
    { id: "DRV-883", name: "Market Salary Benchmarks", type: "Economic", impact: "Critical", confidence: "88%" },
    { id: "DRV-884", name: "Remote Work Preference", type: "Policy", impact: "Medium", confidence: "95%" }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <h3 className="text-sm font-medium text-zinc-400">12-Month Predictive Forecast</h3>
        <div className="mt-2 text-2xl font-bold text-zinc-100">{data.name} Trajectory</div>
        
        <div className="mt-6 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }}
                labelStyle={{ color: "#a1a1aa" }}
              />
              <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} name="Historical" />
              <Area type="monotone" dataKey="forecast" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} strokeWidth={2} strokeDasharray="5 5" name="Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-purple-500"></span> Historical Data</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-500"></span> AI Forecast</div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <Target className="h-4 w-4 text-rose-400" />
          Primary Drivers (Click to view Root Cause Evidence)
        </h3>
        <div className="space-y-3">
          {drivers.map((drv, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown(drv)}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-rose-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-rose-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-xs font-medium text-rose-400">{drv.id}</div>
                    <div className="text-sm font-medium text-zinc-100">{drv.name}</div>
                  </div>
                  <div className="mt-2 flex gap-3 text-xs text-zinc-500">
                    <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5">{drv.type}</span>
                    <span className="flex items-center gap-1">Impact: <span className="text-zinc-300">{drv.impact}</span></span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-xs text-zinc-500 mb-1">Model Confidence</div>
                  <div className="text-sm font-bold text-emerald-400">{drv.confidence}</div>
                </div>
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-rose-400 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- LEVEL 7: Root Cause Evidence Receipt ---
function Level7Content({ data }: { data: any }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-zinc-900/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-zinc-400">Evidence Record ID</div>
            <div className="mt-1 font-mono text-xl font-bold text-zinc-100">{data.id || "EV-9921-A"}</div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-500/20 px-3 py-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Verified Root Cause</span>
          </div>
        </div>
        <div className="mt-4 text-base text-zinc-200">
          Model isolated <span className="font-semibold text-purple-300">{data.name}</span> as the primary catalyst altering the trajectory of the parent metric.
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <FileText className="h-4 w-4 text-amber-400" />
          Data Quality & Provenance
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-sm text-zinc-400">Confidence Score</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-24 rounded-full bg-zinc-800">
                <div className="h-full w-[92%] rounded-full bg-emerald-500" />
              </div>
              <span className="font-bold text-sm text-emerald-400">92%</span>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-sm text-zinc-400">Data Freshness</span>
            <span className="font-bold text-sm text-zinc-100">Live (Synced 14 mins ago)</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-sm text-zinc-400">Primary Source</span>
            <span className="font-bold text-sm text-zinc-100">Workday HRIS + Claim Feed</span>
          </div>
          <div className="rounded-lg bg-zinc-900/60 p-3">
            <div className="text-sm text-zinc-400 mb-2">Cryptographic Hash</div>
            <div className="font-mono text-xs text-amber-400 break-all">
              e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <AlertTriangle className="h-4 w-4 text-rose-400" />
          AI Prescriptive Action
        </h3>
        <div className="text-sm leading-relaxed text-zinc-300">
          Based on the dimensional breakdown and 12-month trajectory, we recommend an immediate review of the current plan design specifically tailored for the highly impacted demographic cohort and region highlighted in Levels 3 & 4. Failure to intervene is projected to accelerate the EBITDA drag by an additional 14% over the next 3 quarters.
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-500">
          Generate Intervention Packet <ExternalLink className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}