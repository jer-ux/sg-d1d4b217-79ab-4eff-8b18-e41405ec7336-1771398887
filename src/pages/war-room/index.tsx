import { SEO } from "@/components/SEO";
import { SplitPane } from "@/components/SplitPane";
import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { mockWarRoom } from "@/lib/warroom/mock";
import { Drawer } from "@/components/warroom/WarRoomDrawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type WarRoomView = "CFO_DASHBOARD" | "FOUR_LANE_LEDGER" | "EXECUTIVE_KPIS";

type TileAccent = "neutral" | "good" | "warn" | "bad" | "purple" | "blue" | "amber";
type TileView = "VARIANCE" | "VALIDATED" | "IN_FLIGHT" | "TRUST";

type DetailModalView = "STATUS" | "CONFIDENCE" | "TIME_SENSITIVITY" | "FRICTION" | "RECEIPT" | "TYPE" | "CATEGORY" | "PRIORITY";

type ThemeKey = "rose" | "blue" | "amber" | "emerald" | "cyan" | "violet";

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
  }
> = {
  rose: {
    bar: "bg-gradient-to-b from-rose-400 via-pink-500 to-fuchsia-500",
    g1: "rgba(244,63,94,0.35)",
    g2: "rgba(236,72,153,0.25)",
    g3: "rgba(217,70,239,0.20)",
    title: "text-rose-200",
    bg: "bg-rose-500/10",
    border: "border-rose-400/30",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
  },
  blue: {
    bar: "bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-500",
    g1: "rgba(59,130,246,0.35)",
    g2: "rgba(14,165,233,0.25)",
    g3: "rgba(99,102,241,0.20)",
    title: "text-sky-200",
    bg: "bg-blue-500/10",
    border: "border-blue-400/30",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
  },
  amber: {
    bar: "bg-gradient-to-b from-amber-300 via-orange-500 to-rose-500",
    g1: "rgba(245,158,11,0.35)",
    g2: "rgba(249,115,22,0.25)",
    g3: "rgba(244,63,94,0.15)",
    title: "text-amber-200",
    bg: "bg-amber-500/10",
    border: "border-amber-400/30",
    glow: "shadow-[0_0_20px_rgba(249,115,22,0.15)]",
  },
  emerald: {
    bar: "bg-gradient-to-b from-emerald-300 via-emerald-500 to-teal-500",
    g1: "rgba(16,185,129,0.35)",
    g2: "rgba(20,184,166,0.25)",
    g3: "rgba(34,197,94,0.20)",
    title: "text-emerald-200",
    bg: "bg-emerald-500/10",
    border: "border-emerald-400/30",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
  },
  cyan: {
    bar: "bg-gradient-to-b from-cyan-300 via-cyan-500 to-blue-500",
    g1: "rgba(6,182,212,0.35)",
    g2: "rgba(34,211,238,0.25)",
    g3: "rgba(59,130,246,0.20)",
    title: "text-cyan-200",
    bg: "bg-cyan-500/10",
    border: "border-cyan-400/30",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]",
  },
  violet: {
    bar: "bg-gradient-to-b from-violet-400 via-purple-500 to-fuchsia-500",
    g1: "rgba(139,92,246,0.35)",
    g2: "rgba(168,85,247,0.25)",
    g3: "rgba(217,70,239,0.20)",
    title: "text-violet-200",
    bg: "bg-violet-500/10",
    border: "border-violet-400/30",
    glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]",
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
  accent = "neutral",
  onClick,
}: {
  label: string;
  value: string;
  subLeft?: string;
  subRight?: string;
  accent?: TileAccent;
  onClick?: () => void;
}) {
  const accentCls =
    accent === "good"
      ? "border-emerald-400/40 bg-gradient-to-br from-emerald-400/15 to-emerald-600/10 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
      : accent === "warn"
      ? "border-amber-400/40 bg-gradient-to-br from-amber-400/15 to-amber-600/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
      : accent === "bad"
      ? "border-rose-400/40 bg-gradient-to-br from-rose-400/15 to-rose-600/10 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
      : accent === "purple"
      ? "border-purple-400/40 bg-gradient-to-br from-purple-400/15 to-purple-600/10 shadow-[0_0_20px_rgba(168,85,247,0.15)]"
      : accent === "blue"
      ? "border-blue-400/40 bg-gradient-to-br from-blue-400/15 to-blue-600/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
      : accent === "amber"
      ? "border-amber-400/40 bg-gradient-to-br from-amber-400/15 to-orange-600/10 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
      : "border-gray-600/40 bg-gray-800/40";

  return (
    <div
      onClick={onClick}
      role={onClick ? "button" : undefined}
      className={[
        "relative rounded-2xl border p-5 backdrop-blur-xl",
        "shadow-[0_20px_60px_rgba(0,0,0,0.5)]",
        "transition-all duration-300 transform-gpu",
        "hover:-translate-y-1 hover:scale-[1.02] cursor-pointer",
        accentCls,
      ].join(" ")}
    >
      <div className="text-[11px] font-medium uppercase tracking-wider text-white/60">{label}</div>
      <div className="mt-3 text-4xl font-bold tracking-tight tabular-nums text-white drop-shadow-lg">{value}</div>
      <div className="mt-3 flex items-center justify-between text-[13px] text-white/70">
        <span className="tabular-nums font-medium">{subLeft ?? ""}</span>
        <span className="tabular-nums font-medium">{subRight ?? ""}</span>
      </div>
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

function AnimatedGradientOverlay({ theme }: { theme: (typeof THEME)[ThemeKey] }) {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none"
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

function DetailModal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-2xl bg-gray-900 border-white/10 text-white sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CFODashboardContent() {
  const [data, setData] = useState(() => mockWarRoom());
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState<TileView>("VARIANCE");
  const [mounted, setMounted] = useState(false);
  const [activeEvent, setActiveEvent] = useState<MockEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [detailModalView, setDetailModalView] = useState<DetailModalView>("STATUS");
  const [detailModalData, setDetailModalData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setData(mockWarRoom());
  }, []);

  const trustAccent: TileAccent =
    data.data_health.verified_receipts_rate >= 0.85 &&
    data.data_health.dq_pass_rate >= 0.95 &&
    data.data_health.freshness_hours <= 24
      ? "amber"
      : "amber";

  const varianceAccent: TileAccent = "purple";

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

  const openDetailModal = (view: DetailModalView, data: any) => {
    setDetailModalView(view);
    setDetailModalData(data);
    setDetailModalOpen(true);
  };

  const getStatusExplanation = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return {
          title: "Evidence Receipt: VERIFIED",
          description: "This event has been cryptographically verified with full chain-of-custody documentation.",
          kpis: [
            { label: "DQ Pass Rate", value: "97.8%", trend: "+2.3%", trendDirection: "up" as const, receipt: { id: "RCP-9832", verified: true, freshness: "< 1h", dqPassRate: 0.978, confidence: 0.95 } },
            { label: "Freshness", value: "< 1h", receipt: { id: "RCP-9832", verified: true, freshness: "< 1h", dqPassRate: 0.978, confidence: 0.95 } },
            { label: "Hash Verified", value: "Yes", receipt: { id: "RCP-9832", verified: true, freshness: "< 1h", dqPassRate: 0.978, confidence: 0.95 } },
          ],
          receipt: {
            id: "RCP-9832",
            hash: "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385",
            sourceSystem: "Snowflake + Carrier EDI",
            lastVerified: new Date().toISOString(),
            verificationMethod: "Cryptographic hash + DQ checks",
            freshness: "< 1 hour",
            dqPassRate: 0.978,
          },
          details: [
            "Evidence has passed all data quality checks with 97.8% pass rate",
            "Chain-of-custody is complete and auditable",
            "Source data is fresh (< 1 hour old)",
            "Cryptographic hash matches expected value",
            "All control gates passed",
          ],
        };
      case "DEGRADED":
        return {
          title: "Evidence Receipt: DEGRADED",
          description: "Evidence exists but has quality or freshness issues that require attention.",
          kpis: [
            { label: "DQ Pass Rate", value: "84.2%", trend: "-5.1%", trendDirection: "down" as const, receipt: { id: "RCP-7721", verified: false, freshness: "4h", dqPassRate: 0.842, confidence: 0.72 } },
            { label: "Freshness", value: "4h", receipt: { id: "RCP-7721", verified: false, freshness: "4h", dqPassRate: 0.842, confidence: 0.72 } },
            { label: "Issues Found", value: "3", receipt: { id: "RCP-7721", verified: false, freshness: "4h", dqPassRate: 0.842, confidence: 0.72 } },
          ],
          receipt: {
            id: "RCP-7721",
            hash: "0x3c2f8b4e9a1d6c7e8f5a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
            sourceSystem: "Manual Entry + Carrier Portal",
            lastVerified: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            verificationMethod: "Partial verification",
            freshness: "4 hours",
            dqPassRate: 0.842,
          },
          details: [
            "⚠️ Data quality below threshold (84.2% vs 95% target)",
            "⚠️ Source data staleness exceeds 1 hour threshold",
            "⚠️ Missing fields: dependent eligibility dates",
            "✓ Hash verification passed",
            "Action required: Refresh data source",
          ],
        };
      case "UNVERIFIED":
        return {
          title: "Evidence Receipt: UNVERIFIED",
          description: "Evidence has not been verified yet. Status changes are blocked until verification completes.",
          kpis: [
            { label: "Verification Status", value: "Pending", receipt: { id: "RCP-4556", verified: false, freshness: "N/A", dqPassRate: 0, confidence: 0 } },
            { label: "Queue Position", value: "#7", receipt: { id: "RCP-4556", verified: false, freshness: "N/A", dqPassRate: 0, confidence: 0 } },
            { label: "Estimated Time", value: "12m", receipt: { id: "RCP-4556", verified: false, freshness: "N/A", dqPassRate: 0, confidence: 0 } },
          ],
          receipt: {
            id: "RCP-4556",
            hash: "Pending...",
            sourceSystem: "Awaiting source connection",
            lastVerified: null,
            verificationMethod: "Not yet verified",
            freshness: "N/A",
            dqPassRate: 0,
          },
          details: [
            "⏳ Evidence receipt created but not yet verified",
            "⏳ Waiting for source system connection",
            "⏳ DQ checks not yet run",
            "❌ No status transitions allowed until verified",
            "Action required: Complete verification workflow",
          ],
        };
      case "VALIDATED":
        return {
          title: "Event Status: VALIDATED",
          description: "This event has been validated and value has been reconciled to the general ledger.",
          kpis: [
            { label: "GL Reconciled", value: "Yes", receipt: { id: "RCP-GL-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.98 } },
            { label: "Audit Trail", value: "Complete", receipt: { id: "RCP-GL-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.98 } },
            { label: "Journal Entry", value: "Posted", receipt: { id: "RCP-GL-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.98 } },
          ],
          receipt: null,
          details: [
            "✓ Value has been realized and posted to GL",
            "✓ All supporting documentation verified",
            "✓ Audit trail complete and immutable",
            "✓ Reconciliation method documented",
            "✓ Event closed and archived",
          ],
        };
      case "IMPLEMENTED":
        return {
          title: "Event Status: IMPLEMENTED",
          description: "Action has been implemented and is awaiting final validation.",
          kpis: [
            { label: "Implementation Date", value: new Date().toLocaleDateString(), receipt: { id: "RCP-IMP-001", verified: true, freshness: "< 1h", dqPassRate: 0.96, confidence: 0.91 } },
            { label: "Validation Progress", value: "85%", trend: "+15%", trendDirection: "up" as const, receipt: { id: "RCP-IMP-001", verified: true, freshness: "< 1h", dqPassRate: 0.96, confidence: 0.91 } },
            { label: "Days to Close", value: "3", receipt: { id: "RCP-IMP-001", verified: true, freshness: "< 1h", dqPassRate: 0.96, confidence: 0.91 } },
          ],
          receipt: null,
          details: [
            "✓ Implementation completed successfully",
            "✓ Evidence receipts verified",
            "⏳ Awaiting final reconciliation",
            "⏳ Monitoring for impact validation",
            "Next: Close and realize to GL",
          ],
        };
      case "ACCEPTED":
        return {
          title: "Event Status: ACCEPTED",
          description: "Event has been reviewed and accepted for implementation.",
          kpis: [
            { label: "Approval Date", value: new Date().toLocaleDateString(), receipt: { id: "RCP-ACC-001", verified: true, freshness: "< 1h", dqPassRate: 0.94, confidence: 0.88 } },
            { label: "Owner Assigned", value: "Yes", receipt: { id: "RCP-ACC-001", verified: true, freshness: "< 1h", dqPassRate: 0.94, confidence: 0.88 } },
            { label: "Priority", value: "High", receipt: { id: "RCP-ACC-001", verified: true, freshness: "< 1h", dqPassRate: 0.94, confidence: 0.88 } },
          ],
          receipt: null,
          details: [
            "✓ Event approved by stakeholders",
            "✓ Owner assigned and notified",
            "✓ Implementation plan documented",
            "⏳ Awaiting implementation",
            "Next: Execute action and track progress",
          ],
        };
      case "RECOMMENDED":
        return {
          title: "Event Status: RECOMMENDED",
          description: "System has identified and recommended this event for review.",
          kpis: [
            { label: "Confidence Score", value: "78%", receipt: { id: "RCP-REC-001", verified: false, freshness: "2h", dqPassRate: 0.87, confidence: 0.78 } },
            { label: "Identified Value", value: "$280K", receipt: { id: "RCP-REC-001", verified: false, freshness: "2h", dqPassRate: 0.87, confidence: 0.78 } },
            { label: "Time Sensitivity", value: "Medium", receipt: { id: "RCP-REC-001", verified: false, freshness: "2h", dqPassRate: 0.87, confidence: 0.78 } },
          ],
          receipt: null,
          details: [
            "⏳ Event identified by detection algorithms",
            "⏳ Awaiting stakeholder review",
            "⚠️ Evidence receipt may be degraded",
            "Action required: Review and accept/reject",
            "Next: Assign owner and approve",
          ],
        };
      default:
        return {
          title: "Status Information",
          description: "Status details not available.",
          kpis: [],
          receipt: null,
          details: [],
        };
    }
  };

  const getConfidenceExplanation = (confidence: number) => {
    const pct = Math.round(confidence * 100);
    const level = confidence >= 0.9 ? "Very High" : confidence >= 0.8 ? "High" : confidence >= 0.7 ? "Medium" : "Low";
    
    return {
      title: `Confidence Score: ${pct}%`,
      description: `This event has ${level.toLowerCase()} confidence based on data quality, evidence strength, and historical patterns.`,
      kpis: [
        { label: "DQ Score", value: `${Math.round(confidence * 100)}%`, trend: "+3%", trendDirection: "up" as const, receipt: { id: "RCP-DQ-001", verified: true, freshness: "< 1h", dqPassRate: confidence, confidence } },
        { label: "Evidence Strength", value: level, receipt: { id: "RCP-DQ-001", verified: true, freshness: "< 1h", dqPassRate: confidence, confidence } },
        { label: "Historical Accuracy", value: `${Math.round(confidence * 98)}%`, receipt: { id: "RCP-DQ-001", verified: true, freshness: "< 1h", dqPassRate: confidence, confidence } },
      ],
      receipt: {
        id: "RCP-CONF-001",
        hash: "0x8a9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a914",
        sourceSystem: "ML Confidence Engine",
        lastVerified: new Date().toISOString(),
        verificationMethod: "Multi-factor confidence scoring",
        confidenceLevel: level,
      },
      details: [
        `Confidence Level: ${level} (${pct}%)`,
        `Data Quality Pass Rate: ${Math.round(confidence * 100)}%`,
        `Evidence receipts: ${confidence >= 0.85 ? "VERIFIED" : "DEGRADED"}`,
        `Historical prediction accuracy: ${Math.round(confidence * 98)}%`,
        `Recommendation: ${confidence >= 0.85 ? "Safe to proceed" : "Review required"}`,
      ],
    };
  };

  const getTimeSensitivityExplanation = (timeSensitivity: number) => {
    const pct = Math.round(timeSensitivity * 100);
    const urgency = timeSensitivity >= 0.9 ? "Critical" : timeSensitivity >= 0.75 ? "High" : timeSensitivity >= 0.5 ? "Medium" : "Low";
    
    return {
      title: `Time Sensitivity: ${pct}%`,
      description: `This event has ${urgency.toLowerCase()} time sensitivity. Delay may impact value realization.`,
      kpis: [
        { label: "Urgency Level", value: urgency, receipt: { id: "RCP-TIME-001", verified: true, freshness: "< 1h", dqPassRate: 0.98, confidence: 0.93 } },
        { label: "Days Until Deadline", value: Math.round((1 - timeSensitivity) * 30).toString(), receipt: { id: "RCP-TIME-001", verified: true, freshness: "< 1h", dqPassRate: 0.98, confidence: 0.93 } },
        { label: "Value Decay Rate", value: `${Math.round(timeSensitivity * 5)}%/mo`, trend: "+1.2%", trendDirection: "up" as const, receipt: { id: "RCP-TIME-001", verified: true, freshness: "< 1h", dqPassRate: 0.98, confidence: 0.93 } },
      ],
      receipt: null,
      details: [
        `Time Sensitivity: ${urgency} (${pct}%)`,
        `Estimated days until deadline: ${Math.round((1 - timeSensitivity) * 30)}`,
        `Value decay rate: ${Math.round(timeSensitivity * 5)}% per month`,
        `${timeSensitivity >= 0.9 ? "⚠️ Immediate action required" : timeSensitivity >= 0.75 ? "Action required within 7 days" : "Monitor and plan"}`,
        `Impact of delay: ${timeSensitivity >= 0.8 ? "Significant value loss" : "Moderate impact"}`,
      ],
    };
  };

  const getFrictionExplanation = (friction: number) => {
    const pct = Math.round(friction * 100);
    const complexity = friction >= 0.7 ? "High" : friction >= 0.4 ? "Medium" : "Low";
    
    return {
      title: `Execution Friction: ${pct}%`,
      description: `This event has ${complexity.toLowerCase()} execution complexity and implementation friction.`,
      kpis: [
        { label: "Complexity", value: complexity, receipt: { id: "RCP-FRIC-001", verified: true, freshness: "< 1h", dqPassRate: 0.95, confidence: 0.89 } },
        { label: "Stakeholders", value: Math.ceil(friction * 5).toString(), receipt: { id: "RCP-FRIC-001", verified: true, freshness: "< 1h", dqPassRate: 0.95, confidence: 0.89 } },
        { label: "Est. Duration", value: `${Math.ceil(friction * 4)} weeks`, receipt: { id: "RCP-FRIC-001", verified: true, freshness: "< 1h", dqPassRate: 0.95, confidence: 0.89 } },
      ],
      receipt: null,
      details: [
        `Execution Friction: ${complexity} (${pct}%)`,
        `Stakeholders involved: ${Math.ceil(friction * 5)}`,
        `Estimated implementation time: ${Math.ceil(friction * 4)} weeks`,
        `${friction >= 0.7 ? "⚠️ Complex cross-functional effort" : friction >= 0.4 ? "Moderate coordination required" : "Low friction, quick win"}`,
        `Recommendation: ${friction >= 0.7 ? "Assign dedicated PM" : "Standard workflow"}`,
      ],
    };
  };

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 py-6">
        <div className="mb-5">
          <div className="text-[11px] text-gray-500">SiriusB iQ • CFO War Room</div>
          <div className="text-lg font-semibold tracking-tight text-gray-100">/war-room</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <Tile
            label="Trend vs Baseline"
            value={`${data.actual.toFixed(1)}%`}
            subLeft={`Baseline ${data.baseline.toFixed(1)}%`}
            subRight={`Conf ${pct(data.ebitda.confidence)}`}
            accent={varianceAccent}
            onClick={() => open("VARIANCE")}
          />
          <Tile
            label="Validated EBITDA (YTD)"
            value={money(data.ebitda.ytd_validated)}
            subLeft={`MTD +${money(data.ebitda.mtd_validated)}`}
            subRight={`Conf ${pct(data.ebitda.confidence)}`}
            accent="good"
            onClick={() => open("VALIDATED")}
          />
          <Tile
            label="In-Flight (Approved)"
            value={money(data.ledger.approved)}
            subLeft={`Identified ${money(data.ledger.identified)}`}
            subRight={`At-risk ${money(data.ledger.at_risk)}`}
            accent="blue"
            onClick={() => open("IN_FLIGHT")}
          />
          <Tile
            label="Trust & Controls"
            value={`${Math.round(data.data_health.verified_receipts_rate * 100)}%`}
            subLeft={`DQ ${(data.data_health.dq_pass_rate * 100).toFixed(1)}%`}
            subRight={`Fresh ${data.data_health.freshness_hours}h`}
            accent={trustAccent}
            onClick={() => open("TRUST")}
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
                      {/* Left accent bar */}
                      {e.theme && (
                        <div className={`absolute left-0 top-0 h-full w-1 ${theme.bar}`} />
                      )}
                      
                      {/* Animated gradient overlay */}
                      {e.theme && <AnimatedGradientOverlay theme={theme} />}
                      
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
                        <div className="mt-2 flex gap-2">
                          <Badge 
                            status={e.receipt_status}
                            onClick={(evt) => {
                              evt.stopPropagation();
                              openDetailModal("RECEIPT", getStatusExplanation(e.receipt_status));
                            }}
                          />
                          <span 
                            onClick={(evt) => {
                              evt.stopPropagation();
                              openDetailModal("STATUS", getStatusExplanation(e.status));
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
            <div className="h-[600px] overflow-y-auto p-4 space-y-3">
              <div>
                <div className="text-[11px] text-white/50">Proof Rail</div>
                <div className="text-sm font-semibold">Evidence • Action Packet • Activity</div>
              </div>

              {activeEvent ? (
                <>
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <div className="text-xs text-white/50 mb-2">Selected Event</div>
                    <div className="text-lg font-semibold">{activeEvent.id}</div>
                    <div className="text-sm text-white/70 mt-1">{activeEvent.title}</div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div 
                        className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                        onClick={() => openDetailModal("CONFIDENCE", getConfidenceExplanation(activeEvent.confidence))}
                      >
                        <div className="text-[11px] text-white/50">Value</div>
                        <div className="font-semibold tabular-nums">{money(activeEvent.identified_value)}</div>
                      </div>
                      <div 
                        className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                        onClick={() => openDetailModal("CONFIDENCE", getConfidenceExplanation(activeEvent.confidence))}
                      >
                        <div className="text-[11px] text-white/50">Confidence</div>
                        <div className="font-semibold tabular-nums">{pct(activeEvent.confidence)}</div>
                      </div>
                      <div 
                        className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                        onClick={() => openDetailModal("TIME_SENSITIVITY", getTimeSensitivityExplanation(activeEvent.time_sensitivity))}
                      >
                        <div className="text-[11px] text-white/50">Time Sensitivity</div>
                        <div className="font-semibold tabular-nums">{pct(activeEvent.time_sensitivity)}</div>
                      </div>
                      <div 
                        className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                        onClick={() => openDetailModal("FRICTION", getFrictionExplanation(activeEvent.execution_friction))}
                      >
                        <div className="text-[11px] text-white/50">Friction</div>
                        <div className="font-semibold tabular-nums">{pct(activeEvent.execution_friction)}</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-[11px] text-white/50">Evidence Receipt</div>
                      <div 
                        className="text-sm font-mono cursor-pointer hover:text-white/90 transition-colors"
                        onClick={() => openDetailModal("RECEIPT", getStatusExplanation(activeEvent.receipt_status))}
                      >
                        {activeEvent.evidence_receipt_id}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge 
                        status={activeEvent.receipt_status}
                        onClick={() => openDetailModal("RECEIPT", getStatusExplanation(activeEvent.receipt_status))}
                      />
                      <span 
                        onClick={() => openDetailModal("TYPE", { 
                          title: `Event Type: ${activeEvent.type}`,
                          description: `This event is categorized as ${activeEvent.type} type.`,
                          kpis: [],
                          receipt: null,
                          details: [`Type: ${activeEvent.type}`, "Category determines routing and approval workflow"]
                        })}
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold cursor-pointer hover:opacity-80 transition-opacity ${
                        activeEvent.type === "PBM" ? "border-blue-400/30 bg-blue-400/10 text-blue-300" :
                        activeEvent.type === "MEDICAL" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" :
                        "border-purple-400/30 bg-purple-400/10 text-purple-300"
                      }`}>{activeEvent.type}</span>
                      <span 
                        onClick={() => openDetailModal("STATUS", getStatusExplanation(activeEvent.status))}
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold cursor-pointer hover:opacity-80 transition-opacity ${
                        activeEvent.status === "VALIDATED" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" :
                        activeEvent.status === "IMPLEMENTED" ? "border-blue-400/30 bg-blue-400/10 text-blue-300" :
                        activeEvent.status === "ACCEPTED" ? "border-purple-400/30 bg-purple-400/10 text-purple-300" :
                        "border-amber-400/30 bg-amber-400/10 text-amber-300"
                      }`}>{activeEvent.status}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[11px] text-white/50 mb-3">KPI Metrics</div>
                    <div className="space-y-2">
                      <KPIBadge 
                        metric={{
                          label: "Action Score",
                          value: activeEvent.score.toLocaleString(),
                          receipt: { id: "RCP-SCORE-001", verified: true, freshness: "< 1h", dqPassRate: 0.96, confidence: activeEvent.confidence }
                        }}
                        onClick={() => openDetailModal("CONFIDENCE", getConfidenceExplanation(activeEvent.confidence))}
                      />
                      <KPIBadge 
                        metric={{
                          label: "Confidence",
                          value: pct(activeEvent.confidence),
                          trend: "+5%",
                          trendDirection: "up",
                          receipt: { id: "RCP-CONF-002", verified: true, freshness: "< 1h", dqPassRate: 0.97, confidence: activeEvent.confidence }
                        }}
                        onClick={() => openDetailModal("CONFIDENCE", getConfidenceExplanation(activeEvent.confidence))}
                      />
                      <KPIBadge 
                        metric={{
                          label: "Time Sensitivity",
                          value: pct(activeEvent.time_sensitivity),
                          receipt: { id: "RCP-TIME-002", verified: true, freshness: "< 1h", dqPassRate: 0.98, confidence: 0.91 }
                        }}
                        onClick={() => openDetailModal("TIME_SENSITIVITY", getTimeSensitivityExplanation(activeEvent.time_sensitivity))}
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[11px] text-white/50 mb-3">Quick Actions</div>
                    <div className="space-y-2">
                      <button className="w-full text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-left">
                        Open Evidence Receipt
                      </button>
                      <button className="w-full text-sm px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 shadow-lg">
                        Action Packet
                      </button>
                      <button className="w-full text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-left">
                        Download Proof Pack (PDF)
                      </button>
                    </div>
                    <div className="mt-3 text-[11px] text-white/50">
                      Gate: no status changes if receipt is UNVERIFIED.
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                  Select an event to view Evidence Receipt, Why Ranked, and download Proof Pack.
                </div>
              )}
            </div>
          }
        />

        <div className="xl:hidden mt-4 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[11px] text-white/50">Exceptions Queue</div>
            <div className="text-sm font-semibold mt-1">Ranked Arbitrage Events</div>
            
            <div className="mt-3 flex gap-2">
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

            <div className="mt-3 space-y-2">
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
                    {/* Left accent bar */}
                    {e.theme && (
                      <div className={`absolute left-0 top-0 h-full w-1 ${theme.bar}`} />
                    )}
                    
                    {/* Animated gradient overlay */}
                    {e.theme && <AnimatedGradientOverlay theme={theme} />}
                    
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
                        Owner: {e.owner_role} • Receipt: {e.receipt_status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {activeEvent && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-[11px] text-white/50">Proof Rail</div>
              <div className="text-sm font-semibold mt-1">Event Details</div>
              
              <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-lg font-semibold">{activeEvent.id}</div>
                <div className="text-sm text-white/70 mt-1">{activeEvent.title}</div>
                
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/50">Value</span>
                    <span className="font-semibold tabular-nums">{money(activeEvent.identified_value)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Confidence</span>
                    <span className="font-semibold tabular-nums">{pct(activeEvent.confidence)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-[12px] text-gray-500">
          {mounted && `As of ${new Date(data.asOf).toLocaleString()}`} • Identified {money(data.ledger.identified)} • Approved {money(data.ledger.approved)} • Realized {money(data.ledger.realized)}
        </div>
      </div>

      <Drawer open={drawerOpen} title={title} onClose={() => setDrawerOpen(false)}>
        <div className="space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-[11px] text-white/50">Trend Summary</div>
            <div className="mt-2 text-sm tabular-nums text-white">
              Baseline {data.baseline.toFixed(1)}% → Actual {data.actual.toFixed(1)}%{" "}
              <span className={`ml-2 font-semibold ${data.delta > 0 ? "text-red-300" : "text-emerald-300"}`}>
                {data.delta > 0 ? "+" : ""}
                {data.delta.toFixed(1)}%
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-[11px] text-white/50">Attribution (Drivers)</div>
            <div className="mt-3 space-y-2">
              {data.drivers.map((d) => (
                <div key={d.label} className="flex items-center justify-between">
                  <div className="text-sm font-medium text-white">{d.label}</div>
                  <div
                    className={`text-sm font-semibold tabular-nums ${
                      d.delta_pct > 0 ? "text-red-300" : "text-emerald-300"
                    }`}
                  >
                    {d.delta_pct > 0 ? "+" : ""}
                    {d.delta_pct.toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Drawer>

      <DetailModal 
        open={detailModalOpen} 
        title={detailModalData?.title || "Details"} 
        onClose={() => setDetailModalOpen(false)}
      >
        {detailModalData && (
          <div className="space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-white/80 text-sm leading-relaxed">{detailModalData.description}</p>
            </div>

            {detailModalData.kpis && detailModalData.kpis.length > 0 && (
              <div>
                <div className="text-xs text-white/50 uppercase tracking-wider mb-3">Key Performance Indicators</div>
                <div className="space-y-2">
                  {detailModalData.kpis.map((kpi: KPIMetric, idx: number) => (
                    <KPIBadge key={idx} metric={kpi} />
                  ))}
                </div>
              </div>
            )}

            {detailModalData.receipt && (
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="text-xs text-white/50 uppercase tracking-wider mb-3">Evidence Receipt Details</div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Receipt ID</span>
                    <span className="font-mono text-white/90">{detailModalData.receipt.id}</span>
                  </div>
                  {detailModalData.receipt.hash && (
                    <div className="flex flex-col gap-1">
                      <span className="text-white/60 text-xs">Cryptographic Hash</span>
                      <span className="font-mono text-[11px] text-white/90 break-all bg-black/40 p-2 rounded border border-white/10">{detailModalData.receipt.hash}</span>
                    </div>
                  )}
                  {detailModalData.receipt.sourceSystem && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Source System</span>
                      <span className="text-white/90">{detailModalData.receipt.sourceSystem}</span>
                    </div>
                  )}
                  {detailModalData.receipt.lastVerified && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Last Verified</span>
                      <span className="text-white/90">{new Date(detailModalData.receipt.lastVerified).toLocaleString()}</span>
                    </div>
                  )}
                  {detailModalData.receipt.freshness && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Data Freshness</span>
                      <span className="text-white/90">{detailModalData.receipt.freshness}</span>
                    </div>
                  )}
                  {detailModalData.receipt.dqPassRate !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-white/60">DQ Pass Rate</span>
                      <span className="text-white/90">{(detailModalData.receipt.dqPassRate * 100).toFixed(1)}%</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {detailModalData.details && detailModalData.details.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4">
                <div className="text-xs text-white/50 uppercase tracking-wider mb-3">Detailed Analysis</div>
                <ul className="space-y-2 text-sm">
                  {detailModalData.details.map((detail: string, idx: number) => (
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
                onClick={() => setDetailModalOpen(false)}
              >
                Close
              </button>
              <button 
                className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 shadow-lg text-sm"
                onClick={() => {
                  alert("Opening full documentation...");
                }}
              >
                View Full Documentation
              </button>
            </div>
          </div>
        )}
      </DetailModal>
    </>
  );
}

// Dynamically import the other War Room components
const FourLaneLedger = dynamic(() => import("@/components/warroom/WarRoomV2"), { ssr: false });
const ExecutiveKPIs = dynamic(() => import("@/components/warroom/WarRoom").then(mod => ({ default: mod.WarRoom })), { ssr: false });

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

export default function WarRoomPage() {
  const [currentView, setCurrentView] = useState<WarRoomView>("CFO_DASHBOARD");

  const viewMeta: Record<WarRoomView, { label: string; description: string }> = {
    CFO_DASHBOARD: { label: "CFO Dashboard", description: "4-Tile Executive View with Ranked Events" },
    FOUR_LANE_LEDGER: { label: "4-Lane Ledger", description: "Advanced Filtering with Redis Streaming" },
    EXECUTIVE_KPIS: { label: "Executive KPIs", description: "Live SSE Stream with Org Filters" },
  };

  return (
    <>
      <SEO
        title="War Room - SiriusB iQ AI Data Sciences Lab"
        description="CFO War Room - Real-time financial operations intelligence"
      />
      <div className="warroom-console min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 via-gray-900/50 to-black/50" />
          <div className="absolute -top-32 left-12 h-[500px] w-[800px] rounded-full bg-emerald-400/6 blur-[100px]" />
          <div className="absolute -top-24 right-12 h-[420px] w-[700px] rounded-full bg-sky-400/6 blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(70% 55% at 50% 20%, black 40%, transparent 75%)",
            }}
          />
        </div>

        {/* View Selector Dropdown */}
        <div className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 backdrop-blur-xl">
          <div className="mx-auto max-w-[1400px] px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">SiriusB iQ War Room</div>
                <div className="text-sm font-medium text-white/90">{viewMeta[currentView].description}</div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all text-white font-medium">
                    <span className="text-sm">{viewMeta[currentView].label}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-gray-900 border-white/20">
                  <DropdownMenuItem
                    onClick={() => setCurrentView("CFO_DASHBOARD")}
                    className="cursor-pointer focus:bg-white/10"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-white">CFO Dashboard</div>
                      <div className="text-xs text-gray-400">4-Tile Executive View with Ranked Events</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCurrentView("FOUR_LANE_LEDGER")}
                    className="cursor-pointer focus:bg-white/10"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-white">4-Lane Ledger</div>
                      <div className="text-xs text-gray-400">Advanced Filtering with Redis Streaming</div>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setCurrentView("EXECUTIVE_KPIS")}
                    className="cursor-pointer focus:bg-white/10"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="font-medium text-white">Executive KPIs</div>
                      <div className="text-xs text-gray-400">Live SSE Stream with Org Filters</div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Render Selected View */}
        {currentView === "CFO_DASHBOARD" && <CFODashboard />}
        {currentView === "FOUR_LANE_LEDGER" && <FourLaneLedger />}
        {currentView === "EXECUTIVE_KPIS" && <ExecutiveKPIs />}
      </div>
    </>
  );
}