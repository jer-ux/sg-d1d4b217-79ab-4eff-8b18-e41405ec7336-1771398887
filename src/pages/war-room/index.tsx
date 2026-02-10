import { SEO } from "@/components/SEO";
import { SplitPane } from "@/components/SplitPane";
import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLink, FileText, Shield, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { mockWarRoomData as mockWarRoom } from "@/lib/mocks/mockWarRoom";
import { EventDetailDrawer } from "@/components/warroom/EventDetailDrawer";
import type { WarEvent } from "@/lib/warroom/types";

type WarRoomView = "CFO_DASHBOARD" | "FOUR_LANE_LEDGER" | "EXECUTIVE_KPIS";

type TileAccent = "neutral" | "good" | "warn" | "bad" | "purple" | "blue" | "amber";
type TileView = "VARIANCE" | "VALIDATED" | "IN_FLIGHT" | "TRUST";

type DetailModalView = "STATUS" | "CONFIDENCE" | "TIME_SENSITIVITY" | "FRICTION" | "RECEIPT" | "TYPE" | "CATEGORY" | "PRIORITY";

type ThemeKey = "rose" | "blue" | "amber" | "emerald" | "cyan" | "violet" | "orange" | "crimson";

const THEME: Record<
  ThemeKey,
  {
    bar: string;
    g1: string;
    g2: string;
    g3: string;
    title: string;
    bg: string;
    border: string;
    glow: string;
    orb1: string;
    orb2: string;
  }
> = {
  crimson: {
    bar: "bg-gradient-to-b from-red-500 via-rose-600 to-pink-600",
    g1: "rgba(239,68,68,0.4)",
    g2: "rgba(244,63,94,0.3)",
    g3: "rgba(236,72,153,0.2)",
    title: "text-red-200",
    bg: "bg-gradient-to-br from-red-500/15 to-rose-600/10",
    border: "border-red-400/40",
    glow: "shadow-[0_0_25px_rgba(239,68,68,0.2)]",
    orb1: "bg-red-500/30",
    orb2: "bg-rose-500/25",
  },
  emerald: {
    bar: "bg-gradient-to-b from-emerald-400 via-emerald-500 to-teal-500",
    g1: "rgba(16,185,129,0.4)",
    g2: "rgba(20,184,166,0.3)",
    g3: "rgba(34,197,94,0.2)",
    title: "text-emerald-200",
    bg: "bg-gradient-to-br from-emerald-400/15 to-teal-600/10",
    border: "border-emerald-400/40",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.2)]",
    orb1: "bg-emerald-500/30",
    orb2: "bg-teal-500/25",
  },
  violet: {
    bar: "bg-gradient-to-b from-violet-400 via-purple-500 to-fuchsia-500",
    g1: "rgba(139,92,246,0.4)",
    g2: "rgba(168,85,247,0.3)",
    g3: "rgba(217,70,239,0.2)",
    title: "text-violet-200",
    bg: "bg-gradient-to-br from-violet-400/15 to-fuchsia-600/10",
    border: "border-violet-400/40",
    glow: "shadow-[0_0_25px_rgba(139,92,246,0.2)]",
    orb1: "bg-violet-500/30",
    orb2: "bg-purple-500/25",
  },
  amber: {
    bar: "bg-gradient-to-b from-amber-400 via-yellow-500 to-orange-500",
    g1: "rgba(245,158,11,0.4)",
    g2: "rgba(251,191,36,0.3)",
    g3: "rgba(249,115,22,0.2)",
    title: "text-amber-200",
    bg: "bg-gradient-to-br from-amber-400/15 to-orange-600/10",
    border: "border-amber-400/40",
    glow: "shadow-[0_0_25px_rgba(245,158,11,0.2)]",
    orb1: "bg-amber-500/30",
    orb2: "bg-yellow-500/25",
  },
  orange: {
    bar: "bg-gradient-to-b from-orange-400 via-orange-500 to-red-500",
    g1: "rgba(249,115,22,0.4)",
    g2: "rgba(251,146,60,0.3)",
    g3: "rgba(239,68,68,0.2)",
    title: "text-orange-200",
    bg: "bg-gradient-to-br from-orange-400/15 to-red-600/10",
    border: "border-orange-400/40",
    glow: "shadow-[0_0_25px_rgba(249,115,22,0.2)]",
    orb1: "bg-orange-500/30",
    orb2: "bg-red-500/25",
  },
  blue: {
    bar: "bg-gradient-to-b from-blue-400 via-blue-500 to-indigo-500",
    g1: "rgba(59,130,246,0.4)",
    g2: "rgba(96,165,250,0.3)",
    g3: "rgba(99,102,241,0.2)",
    title: "text-blue-200",
    bg: "bg-gradient-to-br from-blue-400/15 to-indigo-600/10",
    border: "border-blue-400/40",
    glow: "shadow-[0_0_25px_rgba(59,130,246,0.2)]",
    orb1: "bg-blue-500/30",
    orb2: "bg-indigo-500/25",
  },
  rose: {
    bar: "bg-gradient-to-b from-rose-400 via-pink-500 to-purple-500",
    g1: "rgba(244,63,94,0.4)",
    g2: "rgba(236,72,153,0.3)",
    g3: "rgba(168,85,247,0.2)",
    title: "text-rose-200",
    bg: "bg-gradient-to-br from-rose-400/15 to-purple-600/10",
    border: "border-rose-400/40",
    glow: "shadow-[0_0_25px_rgba(244,63,94,0.2)]",
    orb1: "bg-rose-500/30",
    orb2: "bg-pink-500/25",
  },
  cyan: {
    bar: "bg-gradient-to-b from-cyan-400 via-cyan-500 to-blue-500",
    g1: "rgba(6,182,212,0.4)",
    g2: "rgba(34,211,238,0.3)",
    g3: "rgba(59,130,246,0.2)",
    title: "text-cyan-200",
    bg: "bg-gradient-to-br from-cyan-400/15 to-blue-600/10",
    border: "border-cyan-400/40",
    glow: "shadow-[0_0_25px_rgba(6,182,212,0.2)]",
    orb1: "bg-cyan-500/30",
    orb2: "bg-blue-500/25",
  },
};

interface MockEvent {
  id: string;
  title: string;
  type: string;
  status: string;
  identified_value: number;
  confidence: number;
  time_sensitivity: number;
  execution_friction: number;
  score: number;
  owner_role: string;
  evidence_receipt_id: string;
  receipt_status: string;
  stage?: string;
  amount?: number;
  owner?: string;
  receipt?: string;
  method?: string;
  theme?: ThemeKey;
  carrier?: string;
  estImpact?: string;
}

type KPIMetric = {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  receipt: {
    id: string;
    verified: boolean;
    freshness: string;
    dqPassRate: number;
    confidence: number;
  };
  drilldownKey?: string;
};

function money(n: number) {
  const sign = n < 0 ? "-" : "";
  const v = Math.abs(n);
  return `${sign}$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function Tile({
  label,
  value,
  subLeft,
  subRight,
  theme = "blue",
  onClick,
}: {
  label: string;
  value: string;
  subLeft?: string;
  subRight?: string;
  theme?: ThemeKey;
  onClick?: () => void;
}) {
  const themeConfig = THEME[theme];
  
  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={[
        "group relative overflow-hidden rounded-3xl border p-8 backdrop-blur-2xl",
        "shadow-[0_20px_60px_rgba(0,0,0,0.6)]",
        "transition-all duration-500 transform-gpu",
        "hover:-translate-y-3 hover:scale-[1.03] cursor-pointer",
        themeConfig.border,
        themeConfig.bg,
        themeConfig.glow,
      ].join(" ")}
    >
      {/* Animated gradient overlay */}
      <motion.div
        aria-hidden
        className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-50 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(135deg, ${themeConfig.g1}, ${themeConfig.g2}, ${themeConfig.g3})`,
          backgroundSize: "200% 200%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* 3D Floating Orbs with enhanced animation */}
      <motion.div
        className={`absolute -top-16 -right-16 h-40 w-40 rounded-full ${themeConfig.orb1} blur-[100px]`}
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute -bottom-12 -left-12 h-32 w-32 rounded-full ${themeConfig.orb2} blur-[80px]`}
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className={`text-[11px] font-bold uppercase tracking-widest ${themeConfig.title} opacity-90 mb-1`}>
          {label}
        </div>
        <div className="mt-5 text-6xl font-bold tracking-tight tabular-nums text-white drop-shadow-2xl">
          {value}
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-white/90 font-medium">
          <span className="tabular-nums">{subLeft ?? ""}</span>
          <span className="tabular-nums">{subRight ?? ""}</span>
        </div>
      </div>

      {/* Accent bar with gradient */}
      <div className={`absolute bottom-0 left-0 right-0 h-2 ${themeConfig.bar} transition-all duration-500 group-hover:h-3`} />
    </div>
  );
}

function Badge({ status, onClick }: { status: string; onClick?: (e: React.MouseEvent) => void }) {
  const cls =
    status === "VERIFIED"
      ? "bg-emerald-400/25 text-emerald-200 border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
      : status === "DEGRADED"
      ? "bg-amber-400/25 text-amber-200 border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
      : status === "UNVERIFIED"
      ? "bg-purple-400/25 text-purple-200 border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
      : status === "VALIDATED"
      ? "bg-emerald-400/25 text-emerald-200 border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
      : status === "IMPLEMENTED"
      ? "bg-blue-400/25 text-blue-200 border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
      : status === "ACCEPTED"
      ? "bg-purple-400/25 text-purple-200 border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
      : status === "RECOMMENDED"
      ? "bg-amber-400/25 text-amber-200 border-amber-400/40 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
      : "bg-blue-400/25 text-blue-200 border-blue-400/40 shadow-[0_0_15px_rgba(59,130,246,0.2)]";

  return (
    <span 
      onClick={onClick}
      className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${cls} ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
    >
      {status}
    </span>
  );
}

function KPIBadge({ metric, onClick }: { metric: KPIMetric; onClick?: (e: React.MouseEvent) => void }) {
  const trendColor = metric.trendDirection === "up" 
    ? "text-emerald-400" 
    : metric.trendDirection === "down" 
    ? "text-red-400" 
    : "text-white/50";

  const receiptColor = metric.receipt.verified 
    ? "border-emerald-400/30 bg-emerald-400/10" 
    : "border-amber-400/30 bg-amber-400/10";

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${receiptColor} ${onClick ? "cursor-pointer hover:opacity-80 transition-opacity" : ""}`}
    >
      <div className="flex flex-col">
        <span className="text-[9px] text-white/60 uppercase tracking-wider">{metric.label}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white">{metric.value}</span>
          {metric.trend && (
            <span className={`text-[10px] font-semibold ${trendColor}`}>
              {metric.trendDirection === "up" ? "↗" : metric.trendDirection === "down" ? "↘" : "→"} {metric.trend}
            </span>
          )}
        </div>
      </div>
      <div className={`w-2 h-2 rounded-full ${metric.receipt.verified ? "bg-emerald-400" : "bg-amber-400"}`} />
    </div>
  );
}

interface DetailModalData {
  title: string;
  description: string;
  kpis: KPIMetric[];
  receipt: any;
  details: string[];
  legalContext?: {
    statute: string;
    regulation: string;
    compliance: string[];
    riskFactors: string[];
  };
  capitalMarketsContext?: {
    valuationMethod: string;
    discountRate: number;
    marketComparables: string[];
    liquidityAnalysis: string;
  };
}

function DetailModal({ 
  open, 
  title, 
  onClose, 
  children,
  level = 1 
}: { 
  open: boolean; 
  title: string; 
  onClose: () => void; 
  children: React.ReactNode;
  level?: number;
}) {
  const maxWidth = level === 1 ? "max-w-2xl" : level === 2 ? "max-w-3xl" : "max-w-4xl";
  
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className={`${maxWidth} bg-gray-900 border-white/10 text-white sm:max-w-[90vw] max-h-[85vh] overflow-y-auto`}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {level > 1 && <span className="text-sm text-white/50">Level {level} →</span>}
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CFODashboardContent() {
  const [data, setData] = useState(() => mockWarRoom);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState<TileView>("VARIANCE");
  const [mounted, setMounted] = useState(false);
  const [activeEvent, setActiveEvent] = useState<WarEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Multi-level modal system
  const [level1Modal, setLevel1Modal] = useState<{ open: boolean; data: DetailModalData | null }>({ open: false, data: null });
  const [level2Modal, setLevel2Modal] = useState<{ open: boolean; data: DetailModalData | null }>({ open: false, data: null });
  const [level3Modal, setLevel3Modal] = useState<{ open: boolean; data: DetailModalData | null }>({ open: false, data: null });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setData(mockWarRoom);
  }, []);

  const open = (v: TileView) => {
    setView(v);
    setDrawerOpen(true);
  };

  const title = useMemo(() => {
    if (view === "VARIANCE") return "Variance Drivers (Actual vs Baseline)";
    if (view === "VALIDATED") return "Validated Savings Ledger";
    if (view === "IN_FLIGHT") return "In-Flight Actions (Approved)";
    return "Trust & Controls (DQ + Freshness + Receipts)";
  }, [view]);

  const eventsFiltered = useMemo(() => {
    let filtered = data.events;
    
    if (searchQuery) {
      filtered = filtered.filter(e => 
        e.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (statusFilter !== "All") {
      filtered = filtered.filter(e => e.status === statusFilter);
    }
    
    return filtered.sort((a, b) => b.score - a.score);
  }, [data.events, searchQuery, statusFilter]);

  const openLevel1Modal = (data: DetailModalData) => {
    setLevel1Modal({ open: true, data });
  };

  const openLevel2Modal = (data: DetailModalData) => {
    setLevel2Modal({ open: true, data });
  };

  const openLevel3Modal = (data: DetailModalData) => {
    setLevel3Modal({ open: true, data });
  };

  const getTileExplanation = (tileType: TileView): DetailModalData => {
    switch (tileType) {
      case "VARIANCE":
        return {
          title: "Trend vs Baseline Analysis (Actual vs Expected Performance)",
          description: "Per variance analysis theory and management accounting principles (CIMA framework), this tile tracks actual performance against baseline expectations. Current trend: Actual 12.8% vs Baseline 11.2%, representing 160 basis points of favorable variance. This metric is calculated using weighted moving average of trailing 12-month performance with seasonality adjustments per Box-Jenkins ARIMA methodology.",
          kpis: [
            { 
              label: "Actual Trend", 
              value: `${data.actual.toFixed(1)}%`, 
              trend: "+1.6%", 
              trendDirection: "up" as const, 
              receipt: { id: "VAR-ACT-001", verified: true, freshness: "< 1h", dqPassRate: 0.97, confidence: 0.94 },
              drilldownKey: "actual_calculation"
            },
            { 
              label: "Baseline", 
              value: `${data.baseline.toFixed(1)}%`, 
              receipt: { id: "VAR-BASE-001", verified: true, freshness: "< 1h", dqPassRate: 0.98, confidence: 0.96 },
              drilldownKey: "baseline_methodology"
            },
            { 
              label: "Variance (bps)", 
              value: `+${Math.round((data.actual - data.baseline) * 100)}`, 
              trend: "Favorable",
              trendDirection: "up" as const,
              receipt: { id: "VAR-CALC-001", verified: true, freshness: "< 1h", dqPassRate: 0.99, confidence: 0.95 },
              drilldownKey: "variance_drivers"
            },
            { 
              label: "Statistical Significance", 
              value: "p < 0.01", 
              receipt: { id: "VAR-SIG-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.99 },
              drilldownKey: "statistical_tests"
            },
          ],
          receipt: {
            id: "VARIANCE-ANALYSIS-001",
            hash: "0xvar7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11",
            sourceSystem: "Oracle Hyperion Planning + Anaplan FP&A",
            lastVerified: new Date().toISOString(),
            verificationMethod: "3-way reconciliation: Actuals → Budget → Forecast",
            freshness: "Real-time (< 5 minutes)",
            dqPassRate: 0.98,
          },
          details: [
            "✓ Variance calculation: (Actual - Baseline) / Baseline * 100",
            "✓ Time series: Trailing 12 months with seasonal adjustment",
            "✓ Statistical significance: Two-tailed t-test, p < 0.01",
            "✓ Baseline methodology: 3-year rolling average + trend extrapolation",
            "✓ Confidence interval: 95% (±0.4 percentage points)",
            "✓ Root cause attribution: 67% operational improvements, 33% market conditions",
            "⚖️ Variance analysis satisfies FASB ASC 270 (Interim Reporting) MD&A disclosure requirements",
          ],
          legalContext: {
            statute: "15 U.S.C. § 78m - SEC Periodic Reporting Requirements",
            regulation: "17 CFR § 229.303 - MD&A (Material Changes in Financial Condition)",
            compliance: [
              "FASB ASC 270 - Interim Financial Reporting",
              "SEC SAB 99 - Materiality Assessment (5% threshold)",
              "SOX Section 302 - CEO/CFO Certification of Financial Reports",
              "COSO ERM Framework - Performance Monitoring",
            ],
            riskFactors: [
              "Low: Variance is favorable and statistically significant",
              "Medium: Dependent on sustainability of operational improvements",
              "Low: Baseline methodology reviewed and approved by audit committee",
            ],
          },
          capitalMarketsContext: {
            valuationMethod: "Performance variance drives equity valuation through EBITDA multiple expansion. Sustained 160 bps outperformance supports 0.5-1.0x multiple expansion on TEV/EBITDA basis.",
            discountRate: 8.5,
            marketComparables: [
              "Best-in-class operators trade at 10-12x EBITDA vs peer median 8x",
              "Consistent variance outperformance signals operational excellence premium",
              "Analyst target price sensitivity: +10% for each 100 bps sustained outperformance",
            ],
            liquidityAnalysis: "Favorable variance improves FCF generation, supporting debt service coverage ratio (DSCR) of 2.1x vs covenant minimum 1.25x. Excess liquidity enables strategic M&A or accelerated deleveraging.",
          },
        };

      default:
        return {
          title: "Tile Information",
          description: "Detailed information not available for this tile.",
          kpis: [],
          receipt: null,
          details: [],
        };
    }
  };

  const getStatusExplanation = (status: string): DetailModalData => {
    return {
      title: "Status Information",
      description: "Detailed information not available for this status.",
      kpis: [],
      receipt: null,
      details: [],
    };
  };

  const getDrilldownContent = (drilldownKey: string, parentContext: DetailModalData): DetailModalData => {
    return {
      title: "Additional Context",
      description: "Detailed drilldown information for this metric.",
      kpis: [],
      receipt: null,
      details: [
        "This is a Level 3 drilldown view.",
        "Additional context and analysis available upon request.",
      ],
    };
  };

  const renderModalContent = (modalData: DetailModalData, level: number) => {
    const openNextLevel = level === 1 ? openLevel2Modal : openLevel3Modal;
    
    return (
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-white/80 text-sm leading-relaxed">{modalData.description}</p>
        </div>

        {modalData.kpis && modalData.kpis.length > 0 && (
          <div>
            <div className="text-xs text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp className="h-3 w-3" />
              Key Performance Indicators
            </div>
            <div className="space-y-2">
              {modalData.kpis.map((kpi: KPIMetric, idx: number) => (
                <KPIBadge 
                  key={idx} 
                  metric={kpi} 
                  onClick={level < 3 && kpi.drilldownKey ? () => {
                    const drilldownData = getDrilldownContent(kpi.drilldownKey!, modalData);
                    openNextLevel(drilldownData);
                  } : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {modalData.legalContext && (
          <div className="rounded-xl border border-purple-400/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4">
            <div className="text-xs text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Shield className="h-3 w-3" />
              Legal & Regulatory Context
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-[11px] text-purple-300 font-semibold mb-1">Primary Statute</div>
                <div className="text-white/80">{modalData.legalContext.statute}</div>
              </div>
              <div>
                <div className="text-[11px] text-purple-300 font-semibold mb-1">Applicable Regulation</div>
                <div className="text-white/80">{modalData.legalContext.regulation}</div>
              </div>
              <div>
                <div className="text-[11px] text-purple-300 font-semibold mb-1">Compliance Framework</div>
                <ul className="space-y-1">
                  {modalData.legalContext.compliance.map((item, idx) => (
                    <li key={idx} className="text-white/70 text-xs flex items-start gap-2">
                      <span className="text-purple-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[11px] text-purple-300 font-semibold mb-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Risk Factors
                </div>
                <ul className="space-y-1">
                  {modalData.legalContext.riskFactors.map((risk, idx) => (
                    <li key={idx} className="text-white/70 text-xs flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">⚠</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {modalData.capitalMarketsContext && (
          <div className="rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-4">
            <div className="text-xs text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
              <TrendingUp className="h-3 w-3" />
              Capital Markets Valuation Analysis
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <div className="text-[11px] text-blue-300 font-semibold mb-1">Valuation Methodology</div>
                <div className="text-white/80">{modalData.capitalMarketsContext.valuationMethod}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[11px] text-blue-300 font-semibold mb-1">Discount Rate (WACC)</div>
                  <div className="text-2xl font-bold text-white tabular-nums">{modalData.capitalMarketsContext.discountRate}%</div>
                </div>
                <div>
                  <div className="text-[11px] text-blue-300 font-semibold mb-1">Fair Value Hierarchy</div>
                  <div className="text-lg font-semibold text-white">Level {level}</div>
                </div>
              </div>
              <div>
                <div className="text-[11px] text-blue-300 font-semibold mb-1">Market Comparables</div>
                <ul className="space-y-1">
                  {modalData.capitalMarketsContext.marketComparables.map((comp, idx) => (
                    <li key={idx} className="text-white/70 text-xs flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      <span>{comp}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[11px] text-blue-300 font-semibold mb-1">Liquidity Analysis</div>
                <div className="text-white/80 text-xs">{modalData.capitalMarketsContext.liquidityAnalysis}</div>
              </div>
            </div>
          </div>
        )}

        {modalData.receipt && (
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="text-xs text-white/50 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="h-3 w-3" />
              Evidence Receipt Details
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Receipt ID</span>
                <span className="font-mono text-white/90">{modalData.receipt.id}</span>
              </div>
              {modalData.receipt.hash && (
                <div className="flex flex-col gap-1">
                  <span className="text-white/60 text-xs">Cryptographic Hash (SHA-256)</span>
                  <span className="font-mono text-[10px] text-white/90 break-all bg-black/40 p-2 rounded border border-white/10">{modalData.receipt.hash}</span>
                </div>
              )}
              {modalData.receipt.sourceSystem && (
                <div className="flex justify-between">
                  <span className="text-white/60">Source System</span>
                  <span className="text-white/90 text-right max-w-[60%]">{modalData.receipt.sourceSystem}</span>
                </div>
              )}
              {modalData.receipt.lastVerified && (
                <div className="flex justify-between">
                  <span className="text-white/60">Last Verified</span>
                  <span className="text-white/90">{new Date(modalData.receipt.lastVerified).toLocaleString()}</span>
                </div>
              )}
              {modalData.receipt.freshness && (
                <div className="flex justify-between">
                  <span className="text-white/60">Data Freshness</span>
                  <span className="text-white/90">{modalData.receipt.freshness}</span>
                </div>
              )}
              {modalData.receipt.dqPassRate !== undefined && (
                <div className="flex justify-between">
                  <span className="text-white/60">DQ Pass Rate</span>
                  <span className="text-white/90 tabular-nums">{(modalData.receipt.dqPassRate * 100).toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {modalData.details && modalData.details.length > 0 && (
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 p-4">
            <div className="text-xs text-white/50 uppercase tracking-wider mb-3">Detailed Analysis</div>
            <ul className="space-y-2 text-sm">
              {modalData.details.map((detail: string, idx: number) => (
                <li key={idx} className="text-white/80 flex items-start gap-2">
                  <span className="text-white/40 mt-0.5">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          <button 
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 text-white transition-all font-medium text-sm"
            onClick={() => {
              if (level === 3) setLevel3Modal({ open: false, data: null });
              else if (level === 2) setLevel2Modal({ open: false, data: null });
              else setLevel1Modal({ open: false, data: null });
            }}
          >
            Close
          </button>
          <button 
            className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 shadow-lg text-sm flex items-center justify-center gap-2"
            onClick={() => {
              alert("Opening full documentation in new window...");
            }}
          >
            <ExternalLink className="h-4 w-4" />
            Full Documentation
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="mb-5">
          <div className="text-[11px] text-gray-500">Kincaid IQ • CFO War Room</div>
          <div className="text-lg font-semibold tracking-tight text-gray-100">/war-room</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <Tile
            label="Cost Trend Stress Index"
            value="11.2%"
            subLeft="vs 9% baseline"
            subRight="+2.2pp YoY"
            theme="crimson"
            onClick={() => openLevel1Modal(getTileExplanation("VARIANCE"))}
          />
          <Tile
            label="Plan Design Adoption"
            value="47%"
            subLeft="HDHP/HSA + COE"
            subRight="+12pp QoQ"
            theme="emerald"
            onClick={() => openLevel1Modal(getTileExplanation("VARIANCE"))}
          />
          <Tile
            label="Pharmacy Exposure"
            value="34%"
            subLeft="Opaque terms"
            subRight="-8pp target"
            theme="violet"
            onClick={() => openLevel1Modal(getTileExplanation("VARIANCE"))}
          />
          <Tile
            label="Contract Leakage"
            value="6.8%"
            subLeft="$8.3M recoverable"
            subRight="-1.2pp QoQ"
            theme="amber"
            onClick={() => openLevel1Modal(getTileExplanation("VARIANCE"))}
          />
          <Tile
            label="Contract Ambiguity"
            value="3.2/10"
            subLeft="Risk score"
            subRight="-0.8 improved"
            theme="orange"
            onClick={() => openLevel1Modal(getTileExplanation("VARIANCE"))}
          />
          <Tile
            label="Contract Compliance"
            value="92.4%"
            subLeft="Compliant adjudications"
            subRight="+3.1pp QoQ"
            theme="blue"
            onClick={() => openLevel1Modal(getTileExplanation("VARIANCE"))}
          />
          <Tile
            label="Benefits NPS"
            value="+38"
            subLeft="Employee experience"
            subRight="+7 pts QoQ"
            theme="rose"
            onClick={() => openLevel1Modal(getTileExplanation("VARIANCE"))}
          />
          <Tile
            label="Employee NPS (eNPS)"
            value="+42"
            subLeft="Benefits team + vendors"
            subRight="+5 pts QoQ"
            theme="cyan"
            onClick={() => openLevel1Modal(getTileExplanation("VARIANCE"))}
          />
        </div>

        <SplitPane
          storageKey="kincaid.warroom.split.v1"
          defaultLeftPct={60}
          minLeftPct={45}
          maxLeftPct={70}
          left={
            <div className="h-[600px] overflow-y-auto p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-white/50">Exceptions Queue</div>
                  <div className="text-sm font-semibold">Ranked Arbitrage Events</div>
                </div>
                <button className="text-[11px] px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5">
                  Refresh
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                  placeholder="Search events…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select 
                  className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>RECOMMENDED</option>
                  <option>ACCEPTED</option>
                  <option>IMPLEMENTED</option>
                  <option>VALIDATED</option>
                </select>
              </div>

              <div className="space-y-2">
                {eventsFiltered.map((e) => {
                  const theme = e.theme ? THEME[e.theme as ThemeKey] : THEME.blue;
                  
                  return (
                    <div
                      key={e.id}
                      onClick={() => setActiveEvent(e as unknown as MockEvent)}
                      className={`group relative overflow-hidden rounded-xl border p-3 hover:bg-white/5 cursor-pointer transition-all ${
                        activeEvent?.id === e.id 
                          ? `${theme.border} ${theme.bg} ${theme.glow}` 
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      {e.theme && (
                        <div className={`absolute left-0 top-0 h-full w-1 ${theme.bar}`} />
                      )}
                      
                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <div className={`text-sm font-medium ${e.theme ? theme.title : "text-white"}`}>
                            {e.id} • {e.title}
                          </div>
                          <div className="text-[11px] text-white/50 tabular-nums">
                            Score {e.score.toLocaleString()}
                          </div>
                        </div>
                        <div className="mt-1 text-[11px] text-white/50">
                          Owner: {e.owner_role} • Receipt: {e.receipt_status} • Value: {money(e.identified_value)}
                        </div>
                        <div className="mt-2 flex gap-2 flex-wrap">
                          <Badge 
                            status={e.receipt_status}
                            onClick={(evt) => {
                              evt.stopPropagation();
                              openLevel1Modal(getStatusExplanation(e.receipt_status));
                            }}
                          />
                          <span 
                            onClick={(evt) => {
                              evt.stopPropagation();
                              openLevel1Modal(getStatusExplanation(e.status));
                            }}
                            className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold cursor-pointer hover:opacity-80 transition-opacity ${
                            e.status === "VALIDATED" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" :
                            e.status === "IMPLEMENTED" ? "border-blue-400/30 bg-blue-400/10 text-blue-300" :
                            e.status === "ACCEPTED" ? "border-purple-400/30 bg-purple-400/10 text-purple-300" :
                            "border-amber-400/30 bg-amber-400/10 text-amber-300"
                          }`}>{e.status}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          }
          right={
            <div className="h-full">
               <EventDetailDrawer 
                eventId={activeEvent?.id || null} 
                onClose={() => setActiveEvent(null)}
                open={!!activeEvent}
               />
               
               {/* Fallback placeholder when no event is selected but drawer is 'closed' in the split view context */}
               {!activeEvent && (
                 <div className="h-full flex items-center justify-center p-8 text-white/40">
                   <div className="text-center">
                     <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                     <p>Select an event from the list to view comprehensive details</p>
                   </div>
                 </div>
               )}
            </div>
          }
        />

        <div className="mt-4 text-[12px] text-gray-500">
          {mounted && `As of ${new Date(data.asOf).toLocaleString()}`}
        </div>
      </div>

      {/* Level 1 Modal */}
      <DetailModal 
        open={level1Modal.open} 
        title={level1Modal.data?.title || ""} 
        onClose={() => setLevel1Modal({ open: false, data: null })}
        level={1}
      >
        {level1Modal.data && renderModalContent(level1Modal.data, 1)}
      </DetailModal>

      {/* Level 2 Modal */}
      <DetailModal 
        open={level2Modal.open} 
        title={level2Modal.data?.title || ""} 
        onClose={() => setLevel2Modal({ open: false, data: null })}
        level={2}
      >
        {level2Modal.data && renderModalContent(level2Modal.data, 2)}
      </DetailModal>

      {/* Level 3 Modal */}
      <DetailModal 
        open={level3Modal.open} 
        title={level3Modal.data?.title || ""} 
        onClose={() => setLevel3Modal({ open: false, data: null })}
        level={3}
      >
        {level3Modal.data && renderModalContent(level3Modal.data, 3)}
      </DetailModal>
    </>
  );
}

// Lazy load V2 components
const WarRoomV2 = dynamic(() => import("@/components/warroom/WarRoomV2").then(mod => mod.WarRoomV2), {
  loading: () => <div className="p-12 text-center text-white/50">Loading War Room V2...</div>,
  ssr: false
});

const FourLaneLedger = dynamic(() => import("@/components/warroom/WarRoomV2").then(mod => mod.WarRoomV2), { ssr: false });
const ExecutiveKPIs = dynamic(() => import("@/components/warroom/WarRoom").then(mod => mod.WarRoom), { ssr: false });

const CFODashboard = dynamic(() => Promise.resolve(CFODashboardContent), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
      <div className="mx-auto max-w-[1400px] px-4 py-10">
        <div className="text-sm text-zinc-400">Loading War Room…</div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl border border-zinc-800/60 bg-zinc-950/60" />
          ))}
        </div>
      </div>
    </div>
  ),
});

const viewMeta = {
  CFO_DASHBOARD: {
    label: "CFO Dashboard",
    description: "8 Healthcare KPIs with Premium 3D Graphics",
  },
  FOUR_LANE_LEDGER: {
    label: "4-Lane Ledger",
    description: "Advanced Filtering with Redis Streaming",
  },
  EXECUTIVE_KPIS: {
    label: "Executive KPIs",
    description: "Live SSE Stream with Org Filters",
  },
};

export default function WarRoomPage() {
  const [currentView, setCurrentView] = useState<WarRoomView>("CFO_DASHBOARD");

  return (
    <>
      <SEO
        title="War Room - Kincaid IQ AI Data Sciences Lab"
        description="Real-time incident management, evidence tracking, and governance automation for enterprise CFO and data teams"
      />
      <div className="warroom-console min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-gray-100">
        {/* Premium 3D Background Elements */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/60 to-black" />
          
          {/* Animated Gradient Orbs */}
          <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-transparent blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-transparent blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-violet-500/20 via-pink-500/15 to-transparent blur-[90px] animate-pulse" style={{ animationDelay: '2s' }} />
          
          {/* Premium Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
            }}
          />
          
          {/* Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
        </div>

        <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl">
          <div className="mx-auto max-w-[1400px] px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-emerald-400/80 font-medium uppercase tracking-wider">Kincaid IQ War Room</div>
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent">War Room</h1>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="group flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all duration-500 text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-emerald-500/20 hover:scale-[1.02]">
                    <span className="text-sm">{viewMeta[currentView].label}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 bg-slate-900/95 backdrop-blur-xl border-white/20 rounded-2xl shadow-2xl p-2">
                  <DropdownMenuItem
                    onClick={() => setCurrentView("CFO_DASHBOARD")}
                    className="cursor-pointer focus:bg-white/10 rounded-xl p-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="font-semibold text-white text-base">CFO Dashboard</div>
                      <div className="text-xs text-gray-400 leading-relaxed">8 Healthcare KPIs with Premium 3D Graphics</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCurrentView("FOUR_LANE_LEDGER")}
                    className="cursor-pointer focus:bg-white/10 rounded-xl p-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="font-semibold text-white text-base">4-Lane Ledger</div>
                      <div className="text-xs text-gray-400 leading-relaxed">Advanced Filtering with Redis Streaming</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCurrentView("EXECUTIVE_KPIS")}
                    className="cursor-pointer focus:bg-white/10 rounded-xl p-4 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="font-semibold text-white text-base">Executive KPIs</div>
                      <div className="text-xs text-gray-400 leading-relaxed">Live SSE Stream with Org Filters</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {currentView === "CFO_DASHBOARD" && <CFODashboard />}
        {currentView === "FOUR_LANE_LEDGER" && <FourLaneLedger />}
        {currentView === "EXECUTIVE_KPIS" && <ExecutiveKPIs />}
      </div>
    </>
  );
}