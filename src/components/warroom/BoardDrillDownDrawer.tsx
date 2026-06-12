import { X, ChevronLeft, Shield, AlertTriangle, TrendingUp, TrendingDown, FileText, CheckCircle2, ExternalLink, Calendar, Target, Award, BarChart3, Fingerprint, RefreshCw } from "lucide-react";
import { useState, useMemo } from "react";
import type { TileData } from "./executiveTypes";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

interface DrillDownLevel {
  level: number;
  title: string;
  data: any;
}

interface BoardDrillDownDrawerProps {
  tile: TileData;
  isOpen: boolean;
  onClose: () => void;
}

export function BoardDrillDownDrawer({ tile, isOpen, onClose }: BoardDrillDownDrawerProps) {
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
      case 2: nextTitle = `${item.name || item.category} - Committee Breakdown`; break;
      case 3: nextTitle = `${item.name} - Audit Checklist & Sub-categories`; break;
      case 4: nextTitle = `${item.name} - Financial Impact & Projected Liability`; break;
      case 5: nextTitle = `${item.name} - Statutory Standard Alignment`; break;
      case 6: nextTitle = `${item.name} - 12-Month Compliance Trajectory`; break;
      case 7: nextTitle = `Fiduciary Evidence Record & Cryptographic Signature`; break;
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
      
      <div className="relative h-full w-full max-w-2xl overflow-hidden border-l border-amber-500/20 bg-zinc-950 shadow-2xl">
        {/* Decorative gold neon glow */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 via-yellow-500 to-amber-700 opacity-60" />
        
        <div className="flex h-full flex-col pl-1">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/40 px-6 py-4">
            <div className="flex items-center gap-3">
              {canGoBack && (
                <button
                  onClick={handleBack}
                  className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-2 text-amber-300 transition-colors hover:bg-amber-500/20 hover:text-amber-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent uppercase tracking-wider">SiriusB iQ</span>
                  <span className="text-zinc-600">•</span>
                  <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-mono text-amber-400">Governance Level {currentLevel.level} of 7</span>
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
    if (tile.key === "fiduciary") {
      return [
        { category: "ERISA Section 404 Adherence", description: "Fiduciary prudence & loyalty standards", value: "100%", impact: "Complete", severity: "low" },
        { category: "DOL reporting accuracy", description: "Form 5500 & electronic filings", value: "98%", impact: "98% on-time", severity: "low" },
        { category: "Plan Document Compliance", description: "SPD distributions & trust guidelines", value: "96%", impact: "Audit validated", severity: "medium" },
        { category: "Prohibited transactions review", description: "Conflict of interest evaluations", value: "92%", impact: "In progress", severity: "high" },
      ];
    } else if (tile.key === "risk") {
      return [
        { category: "Vendor Concentration Risk", description: "Exposure to single PBM contracts", value: "Medium", impact: "78% spend conc.", severity: "high" },
        { category: "Specialty Drug Volatility", description: "Oncology & high-cost gene therapies", value: "Medium", impact: "18% YoY growth", severity: "high" },
        { category: "Formulary Exclusion Leakage", description: "Non-preferred brand placement losses", value: "Low", impact: "Under control", severity: "medium" },
        { category: "Litigation Exposure", description: "Recent CAA group health plan lawsuits", value: "Low", impact: "Mitigated", severity: "low" },
      ];
    } else if (tile.key === "renewals") {
      return [
        { category: "PBM RFP Preparation", description: "Competitive bid schedule", value: "70%", impact: "Target: Q1 2027", severity: "medium" },
        { category: "Cost-Plus Feasibility Study", description: "Mark Cuban Rx & local pricing tests", value: "Complete", impact: "Phase 1 done", severity: "low" },
        { category: "Rebate Audit Reconciliation", description: "Contractual rebate pass-through", value: "In progress", impact: "Due Dec 2026", severity: "high" },
        { category: "Stop-Loss Insurance Renewal", description: "Laser limits & deductibles evaluation", value: "Scheduled", impact: "Q2 2027", severity: "low" },
      ];
    } else {
      return [
        { category: "Audit Committee Reviews", description: "Quarterly forensic audit reviews", value: "94%", impact: "Active", severity: "low" },
        { category: "Board Resolution Status", description: "Cost containment policy approvals", value: "Approved", impact: "Oct 15, 2026", severity: "low" },
        { category: "Fiduciary Liability Insurance", description: "Oversight and coverage validation", value: "Active", impact: "Verified", severity: "low" },
        { category: "Transparency Disclosures", description: "Consolidated Appropriations Act compliance", value: "Complete", impact: "2026 update", severity: "medium" },
      ];
    }
  }, [tile.key]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-mono text-amber-400 mb-1">CURRENT INDEX STATUS</div>
            <div className="text-4xl font-bold font-serif text-white">{tile.value}</div>
            {tile.delta && (
              <div className="mt-2 flex items-center gap-2 text-sm text-amber-500 font-mono">
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
                    <linearGradient id="colorValueBoard" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d97706" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#d97706" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke="#f59e0b" fill="url(#colorValueBoard)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <Target className="h-4 w-4 text-amber-400" />
          Primary Fiduciary Components (Click to drill down)
        </h3>
        <div className="space-y-3">
          {factors.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown({ ...cat, name: cat.category })}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-amber-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-zinc-100">{cat.category}</div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
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
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-amber-400 group-hover:translate-x-1" />
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
      level === 2 ? ['Benefits Committee', 'Audit Committee', 'Compliance Board', 'Legal & Advisory', 'Consulting Oversight'] :
      level === 3 ? ['Documentation Standard', 'Distribution System', 'Internal Review', 'External Certification'] :
      level === 4 ? ['Direct Operational Impact', 'Legal & Regulatory Risk', 'Vendor Rebate Leakage', 'Contract Optimization'] :
      ['ERISA Adherence', 'Consolidated Appropriations Act', 'DOL Filings', 'Affordable Care Act'];

    return categories.map(c => ({
      name: c,
      value: Math.floor(Math.random() * 45) + 50, // 50 to 95 range
      trend: Math.random() > 0.4 ? 'up' : 'down',
      change: `${Math.floor(Math.random() * 8) + 1}%`,
      subtext: level === 2 ? 'Subcommittee Score' : level === 3 ? 'Audit Health Index' : level === 4 ? 'Projected Liability ($M)' : 'Statutory Accordance'
    })).sort((a, b) => b.value - a.value);
  }, [level]);

  const Icon = level === 2 ? Target : level === 3 ? Shield : level === 4 ? Award : FileText;

  return (
    <div className="space-y-6">
      {/* Header Summary Card */}
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-zinc-800/80 p-2 border border-zinc-700">
            <Icon className="h-5 w-5 text-amber-400" />
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
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #d9770630", borderRadius: "8px" }}
                itemStyle={{ color: "#f59e0b", fontWeight: "bold" }}
                labelStyle={{ color: "#a1a1aa", marginBottom: "4px" }}
              />
              <Bar dataKey="value" fill="#d97706" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Drill Down List */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <BarChart3 className="h-4 w-4 text-amber-400" />
          Sub-components Analysis (Click to drill deeper)
        </h3>
        <div className="space-y-3">
          {chartData.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown(item)}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-amber-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium text-zinc-100">{item.name}</div>
                  <div className="mt-1 text-xs text-zinc-400">Analysis metrics for {item.name.toLowerCase()} oversight</div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-base font-bold text-zinc-100">{item.value}%</div>
                  <div className={`mt-1 flex items-center justify-end gap-1 text-xs ${item.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    <span>{item.change}</span>
                  </div>
                </div>
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-amber-400 group-hover:translate-x-1" />
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
        value: isHistorical ? baseValue + (Math.random() * 6 - 3) : null,
        forecast: !isHistorical ? baseValue + (i - 7) * 1.5 + (Math.random() * 4) : null,
      };
    });
  }, [data.value]);

  const drivers = [
    { id: "GOV-041", name: "Contractual Safeguards Optimization", type: "Prudence", impact: "High", confidence: "96%" },
    { id: "GOV-042", name: "Quarterly Forensic Audit Cadence", type: "Control", impact: "Critical", confidence: "94%" },
    { id: "GOV-043", name: "Vendor Fee Disclosures (CAA)", type: "Compliance", impact: "Medium", confidence: "98%" }
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 p-6">
        <h3 className="text-xs font-mono text-zinc-400">12-Month Predictive Security Model</h3>
        <div className="mt-2 text-2xl font-serif font-bold text-zinc-100">{data.name} Trend</div>
        
        <div className="mt-6 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="month" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#18181b", border: "1px solid #d9770630", borderRadius: "8px" }}
                labelStyle={{ color: "#a1a1aa" }}
              />
              <Area type="monotone" dataKey="value" stroke="#d97706" fill="#d97706" fillOpacity={0.15} strokeWidth={2} name="Historical" />
              <Area type="monotone" dataKey="forecast" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" name="Forecast Model" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-600"></span> Historical Compliance</div>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span> Predictive Forecast</div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <Target className="h-4 w-4 text-amber-400" />
          Fiduciary Controls (Verify Evidence Record)
        </h3>
        <div className="space-y-3">
          {drivers.map((drv, idx) => (
            <button
              key={idx}
              onClick={() => onDrillDown(drv)}
              className="group w-full rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 text-left transition-all hover:border-amber-500/50 hover:bg-zinc-800/60 hover:shadow-lg hover:shadow-amber-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-xs font-medium text-amber-500">{drv.id}</div>
                    <div className="text-sm font-medium text-zinc-100">{drv.name}</div>
                  </div>
                  <div className="mt-2 flex gap-3 text-xs text-zinc-500">
                    <span className="rounded-full border border-zinc-700 bg-zinc-800 px-2 py-0.5">{drv.type}</span>
                    <span className="flex items-center gap-1">Impact Rating: <span className="text-zinc-300">{drv.impact}</span></span>
                  </div>
                </div>
                <div className="ml-4 text-right">
                  <div className="text-[10px] text-zinc-500 font-mono mb-1">Verification Score</div>
                  <div className="text-sm font-bold text-emerald-400">{drv.confidence}</div>
                </div>
                <ChevronLeft className="ml-3 h-4 w-4 rotate-180 text-zinc-600 transition-all group-hover:text-amber-400 group-hover:translate-x-1" />
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
            <div className="text-xs text-zinc-400 font-mono">Fiduciary Ledger ID</div>
            <div className="mt-1 font-mono text-xl font-bold text-zinc-100">{data.id || "FID-921-GOV"}</div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5">
            <Shield className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-mono font-medium text-emerald-400">Ledger Confirmed</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-zinc-200">
          This record confirms that the governance controls for <span className="font-semibold text-amber-300">{data.name || "Contract Audit Oversight"}</span> conform directly to high-standard ERISA fiduciary duties.
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-300">
            <FileText className="h-4 w-4 text-amber-400" />
            Cryptographic Integrity Receipts
          </h3>
          <button 
            onClick={handleReverify}
            disabled={verifying}
            className="flex items-center gap-1.5 text-xs text-amber-400/80 hover:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded px-2.5 py-1 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3 w-3 ${verifying ? 'animate-spin' : ''}`} />
            {verifying ? 'Re-verifying...' : 'Re-verify'}
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-xs text-zinc-400">SEC / DOL Compliance Status</span>
            <span className="font-bold text-xs text-emerald-400">ACTIVE & SECURE</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-xs text-zinc-400">Ledger Block Number</span>
            <span className="font-mono text-xs text-zinc-100">#1,402,991</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-zinc-900/60 p-3">
            <span className="text-xs text-zinc-400">Timestamp Authority</span>
            <span className="font-bold text-xs text-zinc-100">{new Date().toISOString()}</span>
          </div>
          <div className="rounded-lg bg-zinc-900/60 p-3">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
              <span>SHA-256 State Hash</span>
              <Fingerprint className="h-3 w-3 text-amber-500/80" />
            </div>
            <div className="font-mono text-[10px] text-amber-400/90 break-all bg-black/40 p-2 rounded">
              f818816abecde5502aa89f55e09f82631cf54291882bcfd9921f92c55e921d42
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-300">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          Fiduciary Executive Recommendation
        </h3>
        <p className="text-xs leading-relaxed text-zinc-300">
          The Board Audit committee recommends formal ratification of the proposed contract renegotiation controls during the Q1 2027 meeting. These safeguards successfully prevent pharmacy pricing overcharges and secure robust transparent rebate rights.
        </p>
        <div className="mt-4 flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-amber-500">
            Export Certified Report <FileText className="h-3.5 w-3.5" />
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white">
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}