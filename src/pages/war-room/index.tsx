import { SEO } from "@/components/SEO";
import { SplitPane } from "@/components/SplitPane";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLink, FileText, Shield, TrendingUp, AlertTriangle, Activity, CheckCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { mockWarRoomData as mockWarRoom } from "@/lib/mocks/mockWarRoom";
import { EventDetailDrawer } from "@/components/warroom/EventDetailDrawer";
import type { WarEvent, LaneKey, LedgerState } from "@/lib/warroom/types";
import { useWarRoomStream } from "@/components/warroom/useWarRoomStream";
import { TickerMarquee } from "@/components/warroom/TickerMarquee";
import EvidenceDrawer from "@/components/warroom/EvidenceDrawer";
import { AuditTicker } from "@/components/warroom/AuditTicker";
import { applyFilters, defaultFilters, formatMoney, score, type SortKey, type WarRoomFilters } from "@/components/warroom/filters";
import { approveEvent, assignOwner, closeEvent, generateReceipt } from "@/components/warroom/apiClient";
import { toast } from "sonner";
import clsx from "clsx";
import CommandPalette from "@/components/CommandPalette";
import { RankedEventsPanel } from "@/components/RankedEventsPanel";

type WarRoomView = "CFO_DASHBOARD" | "FOUR_LANE_LEDGER";

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
    iconBg?: string;
    iconRing?: string;
    iconGlow?: string;
    hoverRing?: string;
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
    iconBg: "bg-emerald-500/15",
    iconRing: "ring-emerald-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(52,211,153,0.25),0_0_24px_rgba(16,185,129,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(52,211,153,0.35),0_0_48px_rgba(20,184,166,0.18)]",
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
    iconBg: "bg-violet-500/15",
    iconRing: "ring-violet-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(167,139,250,0.25),0_0_24px_rgba(168,85,247,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_0_48px_rgba(217,70,239,0.18)]",
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
    iconBg: "bg-amber-500/15",
    iconRing: "ring-amber-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(252,211,77,0.25),0_0_24px_rgba(249,115,22,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(252,211,77,0.35),0_0_48px_rgba(249,115,22,0.18)]",
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
    iconBg: "bg-sky-500/15",
    iconRing: "ring-sky-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_0_24px_rgba(59,130,246,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_48px_rgba(99,102,241,0.18)]",
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
    iconBg: "bg-rose-500/15",
    iconRing: "ring-rose-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(251,113,133,0.25),0_0_24px_rgba(244,63,94,0.25)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(251,113,133,0.35),0_0_48px_rgba(236,72,153,0.20)]",
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

function AnimatedGradientOverlay({ theme }: { theme: typeof THEME[ThemeKey] }) {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-50 pointer-events-none"
      style={{
        backgroundImage: `linear-gradient(135deg, ${theme.g1}, ${theme.g2}, ${theme.g3})`,
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
  );
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
        "group relative overflow-hidden rounded-xl border p-5 backdrop-blur-xl",
        "shadow-lg",
        "transition-all duration-300 transform-gpu",
        "hover:-translate-y-1 hover:scale-[1.01] cursor-pointer",
        themeConfig.border,
        themeConfig.bg,
      ].join(" ")}
    >
      <AnimatedGradientOverlay theme={themeConfig} />

      <motion.div
        className={`absolute -top-12 -right-12 h-28 w-28 rounded-full ${themeConfig.orb1} blur-[80px]`}
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute -bottom-8 -left-8 h-24 w-24 rounded-full ${themeConfig.orb2} blur-[60px]`}
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      <div className="relative z-10">
        <div className={`text-[10px] font-bold uppercase tracking-widest ${themeConfig.title} opacity-80 mb-1`}>
          {label}
        </div>
        <div className="mt-3 text-4xl font-bold tracking-tight tabular-nums text-white drop-shadow-lg">
          {value}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-white/80 font-medium">
          <span className="tabular-nums">{subLeft ?? ""}</span>
          <span className="tabular-nums">{subRight ?? ""}</span>
        </div>
      </div>

      <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${themeConfig.bar} transition-all duration-300 group-hover:h-2`} />
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

type StatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  themeKey: ThemeKey;
  delay?: number;
};

function StatCard({ icon: Icon, label, value, themeKey, delay = 0 }: StatCardProps) {
  const t = THEME[themeKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-6",
        "backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5",
        t.hoverRing,
      ].join(" ")}
    >
      <div className={`absolute left-0 top-0 h-full w-2 ${t.bar}`} />
      <AnimatedGradientOverlay theme={t} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_15%,rgba(255,255,255,0.10),transparent_60%)] opacity-60" />

      <div className="relative flex items-start gap-4">
        <div
          className={[
            "grid h-12 w-12 place-items-center rounded-2xl ring-1",
            t.iconBg,
            t.iconRing,
            t.iconGlow,
          ].join(" ")}
        >
          <Icon className={`h-6 w-6 ${t.title}`} />
        </div>

        <div className="flex-1">
          <div className="text-sm text-white/70">{label}</div>
          <div className={`text-2xl font-bold ${t.title}`}>{value}</div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[conic-gradient(from_180deg,rgba(255,255,255,0.0),rgba(255,255,255,0.14),rgba(255,255,255,0.0))] blur-2xl" />
      </div>
    </motion.div>
  );
}

function CFODashboardContent() {
  const [data, setData] = useState(() => mockWarRoom);
  const [view, setView] = useState<TileView>("VARIANCE");
  const [mounted, setMounted] = useState(false);
  const [activeEvent, setActiveEvent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  const [level1Modal, setLevel1Modal] = useState<{ open: boolean; data: DetailModalData | null }>({ open: false, data: null });
  const [level2Modal, setLevel2Modal] = useState<{ open: boolean; data: DetailModalData | null }>({ open: false, data: null });
  const [level3Modal, setLevel3Modal] = useState<{ open: boolean; data: DetailModalData | null }>({ open: false, data: null });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setData(mockWarRoom);
  }, []);

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

  const getTileExplanation = (): DetailModalData => ({
    title: "KPI Methodology & Evidence",
    description: "Detailed analysis with audit-grade evidence receipts",
    kpis: [],
    receipt: null,
    details: ["Full methodology available in documentation"],
  });

  const renderModalContent = (modalData: DetailModalData) => (
    <div className="space-y-4">
      <p className="text-white/80">{modalData.description}</p>
      {modalData.details.map((d, i) => (
        <div key={i} className="text-sm text-white/70">{d}</div>
      ))}
    </div>
  );

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <StatCard
              icon={Activity}
              label="Events Processed"
              value="10M+"
              themeKey="blue"
              delay={0}
            />
            <StatCard
              icon={TrendingUp}
              label="Avg Response Time"
              value="<100ms"
              themeKey="emerald"
              delay={0.1}
            />
            <StatCard
              icon={AlertTriangle}
              label="Active Incidents"
              value="24"
              themeKey="rose"
              delay={0.2}
            />
            <StatCard
              icon={CheckCircle}
              label="Resolution Rate"
              value="99.2%"
              themeKey="violet"
              delay={0.3}
            />
          </div>
        </div>

        <div className="mb-5">
          <div className="text-[11px] text-gray-500">Kincaid IQ • CFO War Room</div>
          <div className="text-lg font-semibold tracking-tight text-gray-100">/war-room</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <Tile label="Cost Trend Stress Index" value="11.2%" subLeft="vs 9% baseline" subRight="+2.2pp YoY" theme="crimson" onClick={() => setLevel1Modal({ open: true, data: getTileExplanation() })} />
          <Tile label="Plan Design Adoption" value="47%" subLeft="HDHP/HSA + COE" subRight="+12pp QoQ" theme="emerald" onClick={() => setLevel1Modal({ open: true, data: getTileExplanation() })} />
          <Tile label="Pharmacy Exposure" value="34%" subLeft="Opaque terms" subRight="-8pp target" theme="violet" onClick={() => setLevel1Modal({ open: true, data: getTileExplanation() })} />
          <Tile label="Contract Leakage" value="6.8%" subLeft="$8.3M recoverable" subRight="-1.2pp QoQ" theme="amber" onClick={() => setLevel1Modal({ open: true, data: getTileExplanation() })} />
          <Tile label="Contract Ambiguity" value="3.2/10" subLeft="Risk score" subRight="-0.8 improved" theme="orange" onClick={() => setLevel1Modal({ open: true, data: getTileExplanation() })} />
          <Tile label="Contract Compliance" value="92.4%" subLeft="Compliant adjudications" subRight="+3.1pp QoQ" theme="blue" onClick={() => setLevel1Modal({ open: true, data: getTileExplanation() })} />
          <Tile label="Benefits NPS" value="+38" subLeft="Employee experience" subRight="+7 pts QoQ" theme="rose" onClick={() => setLevel1Modal({ open: true, data: getTileExplanation() })} />
          <Tile label="Employee NPS (eNPS)" value="+42" subLeft="Benefits team + vendors" subRight="+5 pts QoQ" theme="cyan" onClick={() => setLevel1Modal({ open: true, data: getTileExplanation() })} />
        </div>

        <div className="mb-6">
          <RankedEventsPanel />
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
                          <Badge status={e.receipt_status} />
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${
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

      <DetailModal open={level1Modal.open} title={level1Modal.data?.title || ""} onClose={() => setLevel1Modal({ open: false, data: null })} level={1}>
        {level1Modal.data && renderModalContent(level1Modal.data)}
      </DetailModal>
    </>
  );
}

const laneMeta: Record<LaneKey, { label: string; headline: string }> = {
  value: { label: "Verified Savings Ledger", headline: "Identified → Approved → Realized with receipts and owners." },
  controls: { label: "Controls & Compliance", headline: "Continuous controls monitoring; evidence-first posture." },
  agentic: { label: "Agentic Ops & Sales", headline: "Governed automation with telemetry and gates." },
  marketplace: { label: "Marketplace Execution", headline: "Ship once. Distribute with low delivery drag." },
};

function Pill({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "px-3 py-2 rounded-xl border transition text-sm",
        on ? "border-white/25 bg-white/10 text-white" : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
      )}
    >
      {label}
    </button>
  );
}

function SmallStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-white/55">{label}</div>
      <div className="text-sm text-white/85 font-medium">{formatMoney(value)}</div>
    </div>
  );
}

function ActionButton({
  label,
  intent = "ghost",
  disabled,
  onClick,
}: {
  label: string;
  intent?: "ghost" | "solid";
  disabled?: boolean;
  onClick: () => void;
}) {
  const base = "px-3 py-2 rounded-xl transition text-sm";
  const solid = "bg-orange-500 text-white font-medium hover:bg-orange-600";
  const ghost = "border border-white/15 bg-white/5 hover:bg-white/10";
  const off = "opacity-50 pointer-events-none";

  return (
    <button type="button" onClick={onClick} className={clsx(base, intent === "solid" ? solid : ghost, disabled && off)}>
      {label}
    </button>
  );
}

function FiltersBar({ f, setF }: { f: WarRoomFilters; setF: (next: WarRoomFilters) => void }) {
  const toggleLane = (lane: LaneKey) => {
    const next = new Set(f.lanes);
    if (next.has(lane)) {
      next.delete(lane);
    } else {
      next.add(lane);
    }
    setF({ ...f, lanes: next });
  };

  const toggleState = (st: LedgerState) => {
    const next = new Set(f.states);
    if (next.has(st)) {
      next.delete(st);
    } else {
      next.add(st);
    }
    setF({ ...f, states: next });
  };

  const setSort = (sortBy: SortKey) => setF({ ...f, sortBy });
  const flipDir = () => setF({ ...f, descending: !f.descending });

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-5">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div className="flex flex-wrap gap-2">
          <Pill on={f.lanes.has("value")} label="Value" onClick={() => toggleLane("value")} />
          <Pill on={f.lanes.has("controls")} label="Controls" onClick={() => toggleLane("controls")} />
          <Pill on={f.lanes.has("agentic")} label="Agentic" onClick={() => toggleLane("agentic")} />
          <Pill on={f.lanes.has("marketplace")} label="Marketplace" onClick={() => toggleLane("marketplace")} />
        </div>

        <div className="flex flex-wrap gap-2">
          <Pill on={f.states.has("IDENTIFIED")} label="Identified" onClick={() => toggleState("IDENTIFIED")} />
          <Pill on={f.states.has("APPROVED")} label="Approved" onClick={() => toggleState("APPROVED")} />
          <Pill on={f.states.has("REALIZED")} label="Realized" onClick={() => toggleState("REALIZED")} />
          <Pill on={f.states.has("AT_RISK")} label="At-risk" onClick={() => toggleState("AT_RISK")} />
        </div>
      </div>

      <div className="mt-4 grid lg:grid-cols-12 gap-3 items-center">
        <div className="lg:col-span-5">
          <input
            value={f.q}
            onChange={(e) => setF({ ...f, q: e.target.value })}
            placeholder="Search events, owners, keywords…"
            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white/90 placeholder:text-white/40 outline-none focus:border-white/25"
          />
        </div>

        <div className="lg:col-span-4 flex items-center gap-3">
          <div className="text-xs text-white/55 w-28">Min confidence</div>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(f.minConfidence * 100)}
            onChange={(e) => setF({ ...f, minConfidence: Number(e.target.value) / 100 })}
            className="w-full"
          />
          <div className="text-xs text-white/65 w-12">{Math.round(f.minConfidence * 100)}%</div>
        </div>

        <div className="lg:col-span-3 flex items-center gap-2 justify-end">
          <select
            value={f.sortBy}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm text-white/90 outline-none focus:border-white/25"
          >
            <option value="score">Sort: Score</option>
            <option value="amount">Sort: Amount</option>
            <option value="confidence">Sort: Confidence</option>
            <option value="updated">Sort: Updated</option>
          </select>
          <button
            type="button"
            onClick={flipDir}
            className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            {f.descending ? "Desc" : "Asc"}
          </button>
          <button
            type="button"
            onClick={() => setF(defaultFilters())}
            className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function EventCard({ e, onEvidence }: { e: WarEvent; onEvidence: (e: WarEvent) => void }) {
  const s = score(e);

  const handleAction = async (
    action: () => Promise<{ ok: boolean; error?: string; policyReasons?: string[] }>,
    successMsg: string
  ) => {
    const r = await action();
    if (!r.ok) {
      const reasons = r.policyReasons ?? [];
      const msg = reasons.length
        ? `Policy check failed:\n${reasons.map((reason) => `• ${reason}`).join("\n")}`
        : r.error ?? "Action failed";
      toast.error(msg);
    } else {
      toast.success(successMsg);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:bg-black/15">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="text-sm text-white/90 font-medium truncate">{e.title}</div>
          {e.subtitle ? <div className="text-xs text-white/60 mt-1 line-clamp-2">{e.subtitle}</div> : null}
          <div className="text-xs text-white/55 mt-2">
            {e.state.replace("_", " ")} • Owner {e.owner ?? "Unassigned"} • Conf {(e.confidence * 100).toFixed(0)}% • Score{" "}
            {s.toFixed(0)}
          </div>
        </div>
        <div className="text-sm text-white/90 font-semibold whitespace-nowrap">{formatMoney(e.amount)}</div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <ActionButton
          label="Assign"
          onClick={() => {
            const owner = prompt("Assign to (name/role):", e.owner ?? "");
            if (owner) handleAction(() => assignOwner(e.id, owner), `Assigned to ${owner}`);
          }}
        />
        {e.state === "IDENTIFIED" && (
          <ActionButton
            label="Approve"
            intent="solid"
            onClick={() => handleAction(() => approveEvent(e.id), "Event approved")}
          />
        )}
        {e.state === "APPROVED" && (
          <ActionButton
            label="Close"
            onClick={() => handleAction(() => closeEvent(e.id), "Event closed and realized")}
          />
        )}
        <ActionButton
          label="Generate receipt"
          onClick={() => handleAction(() => generateReceipt(e.id, "Auto-generated receipt"), "Receipt generated")}
        />
        {(e.receipts?.length ?? 0) > 0 && (
          <ActionButton label={`Evidence (${e.receipts?.length})`} intent="solid" onClick={() => onEvidence(e)} />
        )}
        <Link
          href={`/war-room/${e.lane}`}
          className="px-3 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
        >
          Open lane
        </Link>
      </div>
    </div>
  );
}

function FourLaneLedgerContent() {
  const { connected, lastUpdated, events, summaries, ticker } = useWarRoomStream();
  const [filters, setFilters] = useState(defaultFilters());
  const [evidenceOpen, setEvidenceOpen] = useState<WarEvent | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => applyFilters(events, filters), [events, filters]);

  const byLane = useMemo(() => {
    const map: Record<LaneKey, WarEvent[]> = { value: [], controls: [], agentic: [], marketplace: [] };
    for (const e of filtered) map[e.lane].push(e);
    return map;
  }, [filtered]);

  const summaryMap = useMemo(() => {
    const m = new Map<LaneKey, any>();
    for (const s of summaries as any[]) m.set(s.lane, s);
    return m;
  }, [summaries]);

  const totals = useMemo(() => {
    const t = { identified: 0, approved: 0, realized: 0, atRisk: 0 };
    for (const s of summaries) {
      t.identified += s.identified;
      t.approved += s.approved;
      t.realized += s.realized;
      t.atRisk += s.atRisk;
    }
    return t;
  }, [summaries]);

  return (
    <div className="min-h-[calc(100vh-72px)] py-10">
      <div className="mx-auto max-w-6xl px-6">
        {/* Enhanced Status Bar with Live Indicators */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div>
              <div className="text-3xl font-semibold tracking-tight flex items-center gap-3">
                Four-Lane Ledger
                <motion.div
                  className={`h-3 w-3 rounded-full ${connected ? "bg-emerald-400" : "bg-red-400"}`}
                  animate={{ scale: connected ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="text-white/65 mt-2">Real-time streaming with evidence-first decisions</div>
              <div className="text-xs text-white/55 mt-2 flex flex-wrap items-center gap-3">
                <span className={`flex items-center gap-1.5 ${connected ? "text-emerald-400" : "text-red-400"}`}>
                  <Activity className="h-3 w-3" />
                  {connected ? "Live Stream Active" : "Disconnected"}
                </span>
                {lastUpdated && mounted && (
                  <span className="text-white/50">
                    Last update: {new Date(lastUpdated).toLocaleTimeString()}
                  </span>
                )}
                <span className="text-white/70 font-medium">{filtered.length} events</span>
                <span className="text-white/50">•</span>
                <span className="text-white/50">{ticker.length} recent activities</span>
              </div>
            </div>

            {/* Live Totals Display */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <motion.div 
                key={totals.identified}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-3 py-2"
              >
                <div className="text-[10px] uppercase tracking-wider text-amber-300/80">Identified</div>
                <div className="text-lg text-amber-200 font-bold tabular-nums">{formatMoney(totals.identified)}</div>
              </motion.div>
              <motion.div 
                key={totals.approved}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-xl border border-purple-400/30 bg-purple-500/10 px-3 py-2"
              >
                <div className="text-[10px] uppercase tracking-wider text-purple-300/80">Approved</div>
                <div className="text-lg text-purple-200 font-bold tabular-nums">{formatMoney(totals.approved)}</div>
              </motion.div>
              <motion.div 
                key={totals.realized}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2"
              >
                <div className="text-[10px] uppercase tracking-wider text-emerald-300/80">Realized</div>
                <div className="text-lg text-emerald-200 font-bold tabular-nums">{formatMoney(totals.realized)}</div>
              </motion.div>
              <motion.div 
                key={totals.atRisk}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2"
              >
                <div className="text-[10px] uppercase tracking-wider text-red-300/80">At Risk</div>
                <div className="text-lg text-red-200 font-bold tabular-nums">{formatMoney(totals.atRisk)}</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Live Activity Ticker */}
        <div className="mb-6">
          <TickerMarquee items={ticker} />
        </div>

        {/* Command Palette & Audit Ticker */}
        <div className="mb-6 flex gap-3">
          <div className="flex-1">
            <CommandPalette events={ticker as any} onOpenEvidence={setEvidenceOpen} />
          </div>
        </div>
        
        <div className="mb-6">
          <AuditTicker />
        </div>

        <FiltersBar f={filters} setF={setFilters} />

        {/* Enhanced Lane Grid with Activity Indicators */}
        <div className="mt-6 grid lg:grid-cols-2 gap-4">
          {(["value", "controls", "agentic", "marketplace"] as LaneKey[]).map((lane) => {
            const s = summaryMap.get(lane) ?? { identified: 0, approved: 0, realized: 0, atRisk: 0 };
            const laneEvents = byLane[lane].slice(0, 4);
            const laneTotal = laneEvents.reduce((sum, e) => sum + e.amount, 0);
            const hasActivity = laneEvents.length > 0;

            return (
              <motion.div 
                key={lane}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ["value", "controls", "agentic", "marketplace"].indexOf(lane) * 0.1 }}
                className={`rounded-2xl border bg-slate-950/60 backdrop-blur-xl p-6 transition-all ${
                  hasActivity ? "border-white/20 shadow-lg" : "border-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-semibold">{laneMeta[lane].label}</div>
                      {hasActivity && (
                        <motion.div
                          className="h-2 w-2 rounded-full bg-emerald-400"
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div className="text-sm text-white/65 mt-1">{laneMeta[lane].headline}</div>
                    {laneTotal > 0 && (
                      <div className="text-xs text-white/50 mt-2">
                        Total pipeline: <span className="text-white/80 font-semibold">{formatMoney(laneTotal)}</span>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/war-room/${lane}`}
                    className="px-4 py-2 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition text-sm whitespace-nowrap"
                  >
                    Open lane
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <SmallStat label="Identified" value={s.identified} />
                  <SmallStat label="Approved" value={s.approved} />
                  <SmallStat label="Realized" value={s.realized} />
                  <SmallStat label="At-risk" value={s.atRisk} />
                </div>

                <div className="mt-4 space-y-3">
                  {laneEvents.length === 0 ? (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/65 text-center">
                      <Activity className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      No events match current filters for this lane
                    </div>
                  ) : (
                    laneEvents.map((e, idx) => (
                      <motion.div
                        key={e.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <EventCard e={e} onEvidence={setEvidenceOpen} />
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <EvidenceDrawer openEvent={evidenceOpen} onClose={() => setEvidenceOpen(null)} />
      </div>
    </div>
  );
}

const CFODashboard = dynamic(() => Promise.resolve(CFODashboardContent), { ssr: false });
const FourLaneLedger = dynamic(() => Promise.resolve(FourLaneLedgerContent), { ssr: false });

const viewMeta = {
  CFO_DASHBOARD: {
    label: "CFO Dashboard",
    description: "8 Healthcare KPIs with Premium 3D Graphics + Real-Time Intelligence",
  },
  FOUR_LANE_LEDGER: {
    label: "4-Lane Ledger",
    description: "Advanced Filtering with Redis Streaming + Event Management",
  },
};

export default function WarRoomPage() {
  const [currentView, setCurrentView] = useState<WarRoomView>("CFO_DASHBOARD");

  return (
    <>
      <SEO
        title="Unified War Room - Kincaid IQ AI Data Sciences Lab"
        description="Real-time incident management, evidence tracking, and governance automation for enterprise CFO and data teams"
      />
      <div className="warroom-console min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-gray-100">
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-950/60 to-black" />
          
          <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-transparent blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/15 to-transparent blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 left-1/3 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-violet-500/20 via-pink-500/10 to-transparent blur-[90px] animate-pulse" style={{ animationDelay: "2s" }} />
          
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
            }}
          />
          
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
        </div>

        <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-2xl shadow-2xl">
          <div className="mx-auto max-w-[1400px] px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-emerald-400/80 font-medium uppercase tracking-wider">Kincaid IQ War Room</div>
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-emerald-200 to-cyan-300 bg-clip-text text-transparent">Unified War Room</h1>
              </div>
              
              <div className="flex items-center gap-3">
                <Link 
                  href="/request-demo"
                  className="group flex items-center gap-2 px-6 py-3 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 hover:border-emerald-400/50 transition-all duration-500 text-white font-semibold shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30 hover:scale-[1.02]"
                >
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">Free ERISA 5500 Review</span>
                </Link>
                
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
                        <div className="text-xs text-gray-400 leading-relaxed">8 Healthcare KPIs with Premium 3D Graphics + Real-Time Intelligence</div>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setCurrentView("FOUR_LANE_LEDGER")}
                      className="cursor-pointer focus:bg-white/10 rounded-xl p-4 transition-all duration-300 hover:scale-[1.01]"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="font-semibold text-white text-base">4-Lane Ledger</div>
                        <div className="text-xs text-gray-400 leading-relaxed">Advanced Filtering with Redis Streaming + Event Management</div>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {currentView === "CFO_DASHBOARD" && <CFODashboard />}
        {currentView === "FOUR_LANE_LEDGER" && <FourLaneLedger />}
      </div>
    </>
  );
}