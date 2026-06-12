import { X, ChevronLeft, Shield, AlertTriangle, TrendingUp, TrendingDown, FileText, CheckCircle2, ExternalLink, Calendar, Target, Award, BarChart3, Fingerprint, RefreshCw, DollarSign, Briefcase, Zap, Flame } from "lucide-react";
import { useState, useMemo } from "react";
import type { TileData } from "./executiveTypes";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface DrillDownLevel {
  level: number;
  title: string;
  data: any;
}

interface PEOperatorDrillDownDrawerProps {
  tile: TileData;
  isOpen: boolean;
  onClose: () => void;
}

export function PEOperatorDrillDownDrawer({ tile, isOpen, onClose }: PEOperatorDrillDownDrawerProps) {
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
      case 2: nextTitle = `${item.name || item.category} - PortCo Breakdown`; break;
      case 3: nextTitle = `${item.name} - Underwriting Audits & Cost-Leaks`; break;
      case 4: nextTitle = `${item.name} - EBITDA Multiplier Valuation Run`; break;
      case 5: nextTitle = `${item.name} - Strategic Realignment Measures`; break;
      case 6: nextTitle = `${item.name} - Exit Readiness Underwriting Trajectory`; break;
      case 7: nextTitle = `Deal Room Cryptographic Audit Certificate`; break;
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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative h-full w-full max-w-2xl overflow-hidden border-l border-emerald-500/20 bg-zinc-950 shadow-2xl">
        {/* Decorative emerald/teal neon glow */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 via-teal-500 to-emerald-700 opacity-60" />
        
        <div className="flex h-full flex-col pl-1">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-6 py-4">
            <div className="flex items-center gap-3">
              {canGoBack && (
                <button
                  onClick={handleBack}
                  className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-300 transition-colors hover:bg-emerald-500/20 hover:text-emerald-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent uppercase tracking-wider">SiriusB iQ</span>
                  <span className="text-zinc-600">•</span>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono text-emerald-400">PE Underwriting Level {currentLevel.level} of 7</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
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
                <div className="mt-1 text-lg font-serif font-semibold text-zinc-100">{currentLevel.title}</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-850">
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
  const factors = useMemo(() => {
    if (tile.key === "ebitdaLift") {
      return [
        { category: "PortCo Alpha Optimization", description: "Standardizing transparent cost-plus models", value: "$1.2M", impact: "Fiduciary swap", severity: "high" },
        { category: "PortCo Bravo Transition", description: "Implementation of specialty carve-out programs", value: "$2.1M", impact: "Fully realized", severity: "low" },
        { category: "PortCo Charlie Underwriting", description: "Pre-acquisition healthcare due diligence", value: "$847K", impact: "Under analysis", severity: "medium" },
        { category: "Aggregate Group Synergies", description: "Consolidated volume procurement discount", value: "$653K", impact: "Deal flow setup", severity: "low" },
      ];
    } else if (tile.key === "valueCreation") {
      return [
        { category: "Multiple Expansion Run", description: "Enterprise multiple improvement projections", value: "1.8x", impact: "EBITDA-driven", severity: "high" },
        { category: "Healthcare Overspend Arbitrage", description: "Eradicating hidden broker and PBM margins", value: "31%", impact: "98% recovered", severity: "low" },
        { category: "Contractual Leakage Defense", description: "Active enforcement of pricing corridors", value: "96%", impact: "Automated alert", severity: "medium" },
        { category: "Clinical Optimization Programs", description: "Formulary hygiene & metabolic oversight", value: "14%", impact: "Active engagement", severity: "low" },
      ];
    } else if (tile.key === "exitReadiness") {
      return [
        { category: "Clean Fiduciary Audit trail", description: "DOL/ERISA compliance verification score", value: "98/100", impact: "Zero litigation", severity: "low" },
        { category: "Benefit Overhang Mitigation", description: "Risk premium exposure stabilization", value: "Medium", impact: "Contained", severity: "medium" },
        { category: "Contract Portability Verification", description: "Assignability status on change-of-control", value: "100%", impact: "Exit-vetted", severity: "low" },
        { category: "Legacy PBM Carve-Out Risk", description: "Termination penalties & notification lead", value: "Critical", impact: "Active swap", severity: "critical" },
      ];
    } else {
      return [
        { category: "Rollup Rx Contracting Pool", description: "Consolidated portfolio-wide PBM RFP", value: "Active", impact: "$1.2M lift", severity: "high" },
        { category: "Cross-PortCo Specialty Union", description: "Shared specialty hub contract", value: "Planning", impact: "$640K lift", severity: "medium" },
        { category: "TPA & Third-Party Audit Union", description: "Unified clinical audit platform", value: "Complete", impact: "$280K lift", severity: "low" },
        { category: "Consolidated Broker Fee Cap", description: "Standardizing transparent commission terms", value: "92%", impact: "Implemented", severity: "low" },
      ];
    }
  }, [tile.key]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-mono text-emerald-400 mb-1">PORTFOLIO VALUATION MATRIX</div>
            <div className="text-4xl font-bold font-serif text-white">{tile.value}</div>
            {tile.delta && (
              <div className="mt-2 flex items-center gap-2 text-sm text-emerald-500 font-mono">
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
                    <linearGradient id="colorValuePE" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#10b981" fill="url(#colorValuePE)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <Target className="h-4 w-4 text-emerald-400" />
          Primary Operational Factors (Click to drill down)
        </h3>
        <div className="space-y-3">
          {factors.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown({ ...cat, name: cat.category })}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-emerald-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-zinc-100">{cat.category}</div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                      cat.severity === "critical" ? "bg-rose-500/20 text-rose-400 animate-pulse" :
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
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-emerald-400 group-hover:translate-x-1" />
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
      level === 2 ? ['EBITDA Contribution', 'Plan design health', 'Specialty containment', 'Co-payment optimization', 'Fiduciary assurance'] :
      level === 3 ? ['Spread elimination', 'Prior Authorization audit', 'Formulary realignment', 'Co-pay card capture'] :
      level === 4 ? ['Unmitigated cost leak', 'Fiduciary penalty risk', 'Formulary friction', 'Broker over-commission'] :
      ['Group health pooling', 'Specialty carve-out', 'PBM auditing suite', 'Clinical navigation'];

    return categories.map(c => ({
      name: c,
      value: Math.floor(Math.random() * 45) + 50,
      trend: Math.random() > 0.4 ? 'up' : 'down',
      change: `${Math.floor(Math.random() * 9) + 2}%`,
      subtext: level === 2 ? 'EBITDA Margin Impact' : level === 3 ? 'Audit Validation Index' : level === 4 ? 'Projected Liability ($M)' : 'Synergy Realization'
    })).sort((a, b) => b.value - a.value);
  }, [level]);

  const Icon = level === 2 ? Target : level === 3 ? Shield : level === 4 ? Flame : FileText;

  return (
    <div className="space-y-6">
      {/* Header Summary Card */}
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700">
            <Icon className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-xs text-zinc-400 font-mono uppercase tracking-wider">{data.name}</div>
            <div className="text-xl font-serif font-bold text-zinc-100">Granular Evaluation</div>
          </div>
        </div>
        
        {/* The Bar Chart */}
        <div className="mt-6 h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#27272a', opacity: 0.4 }}
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #10b98130", borderRadius: "8px" }}
                itemStyle={{ color: "#10b981", fontWeight: "bold" }}
                labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
              />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Drill Down List */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <BarChart3 className="h-4 w-4 text-emerald-400" />
          Underwriting Sub-components (Click to drill deeper)
        </h3>
        <div className="space-y-3">
          {chartData.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown(item)}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-emerald-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-zinc-100">{item.name}</div>
                  <div className="mt-1 text-xs text-zinc-400">Analysis metrics for {item.name.toLowerCase()} valuation</div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-base font-bold text-zinc-100">{item.value}%</div>
                  <div className={`mt-1 flex items-center justify-end gap-1 text-xs ${item.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{item.change}</span>
                  </div>
                </div>
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-emerald-400 group-hover:translate-x-1" />
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
      const baseValue = data.value || 85;
      return {
        month: `M${i+1}`,
        value: isHistorical ? baseValue + (Math.random() * 8 - 4) : null,
        forecast: !isHistorical ? baseValue + (i - 7) * 2 + (Math.random() * 3) : null,
      };
    });
  }, [data.value]);

  const drivers = [
    { id: "PE-011", name: "Fiduciary Underwriting Verification", type: "Prudence", impact: "High", confidence: "98%" },
    { id: "PE-012", name: "EBITDA Margin Leak Elimination", type: "Valuation", impact: "Critical", confidence: "96%" },
    { id: "PE-013", name: "RFP Contract Alignment Checks", type: "Due Diligence", impact: "Medium", confidence: "99%" }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <h3 className="text-xs font-mono text-zinc-400">12-Month Exit Readiness Underwriting</h3>
        <div className="mt-2 text-2xl font-serif font-bold text-zinc-100">{data.name} Curve</div>
        
        <div className="mt-6 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #10b98130", borderRadius: "8px" }}
                labelStyle={{ color: "#a1a1aa" }}
              />
              <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} name="Historical" />
              <Area type="monotone" dataKey="forecast" stroke="#34d399" fill="#34d399" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" name="Underwriting Forecast" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-600"></span> Current Performance</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span> Target Underwriting Model</div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <Target className="h-4 w-4 text-emerald-400" />
          Value Creation Realignment (Verify Deal Room Record)
        </h3>
        <div className="space-y-3">
          {drivers.map((drv, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown(drv)}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-emerald-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-xs font-medium text-emerald-400">{drv.id}</div>
                    <div className="text-sm font-medium text-zinc-100">{drv.name}</div>
                  </div>
                  <div className="mt-2 flex gap-3 text-xs text-zinc-500">
                    <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5">{drv.type}</span>
                    <span className="flex items-center gap-1">EBITDA Rating: <span className="text-zinc-300">{drv.impact}</span></span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-[10px] text-zinc-500 font-mono mb-1">Confidence Rating</div>
                  <div className="text-sm font-bold text-emerald-400">{drv.confidence}</div>
                </div>
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-emerald-400 group-hover:translate-x-1" />
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
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(true);

  const handleReverify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-zinc-900/40 p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-zinc-400 font-mono">Deal Room Ledger ID</div>
            <div className="mt-1 font-mono text-xl font-bold text-zinc-100">{data.id || "PE-EBITDA-092"}</div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-mono font-medium text-emerald-400">Cryptographically Confirmed</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-zinc-200">
          This record certifies that the pharmacy cost alignment and EBITDA lift audits for <span className="font-semibold text-emerald-300">{data.name || "Portfolio Standard Procurement"}</span> are fully locked into the exit due diligence vault.
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <FileText className="h-4 w-4 text-emerald-400" />
            EBITDA Underwriting Audit Trail
          </h3>
          <button 
            onClick={handleReverify}
            disabled={verifying}
            className="flex items-center gap-1.5 text-xs text-emerald-400/80 hover:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2.5 py-1 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${verifying ? 'animate-spin' : ''}`} />
            {verifying ? 'Auditing deal room...' : 'Re-verify'}
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-xs text-zinc-400">Asset Exit Readiness Index</span>
            <span className="font-bold text-xs text-emerald-400">100% EXCELLENCE REPORTED</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-xs text-zinc-400">Deal Ledger Block Number</span>
            <span className="font-mono text-xs text-zinc-100">#4,992,104</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-xs text-zinc-400">Timestamp Authority</span>
            <span className="font-bold text-xs text-zinc-100">{new Date().toISOString()}</span>
          </div>
          <div className="rounded-lg bg-zinc-900/60 p-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
              <span>SHA-256 Deal Room Hash</span>
              <Fingerprint className="h-3 w-3 text-emerald-500/80" />
            </div>
            <div className="font-mono text-[10px] text-emerald-400/90 break-all bg-black/40 p-2 rounded">
              a910bf4cbaedde552ba89f55e09f82631cf54291882bcfd9921f92c55e921f91
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <AlertTriangle className="h-4 w-4 text-emerald-500" />
          PE Underwriting Committee Guidance
        </h3>
        <p className="text-xs leading-relaxed text-zinc-300">
          The PE Operations Board strongly recommends full roll-out of the transparent cost-plus model to all pipeline assets during pre-acquisition due diligence. Standardizing these savings directly impacts exit multiples, offering a highly predictable yield expansion path.
        </p>
        <div className="mt-4 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-500">
            Export Deal Room Dossier <FileText className="h-3.5 w-3.5" />
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white">
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}