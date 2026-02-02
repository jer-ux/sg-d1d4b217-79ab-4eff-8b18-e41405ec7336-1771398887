import { SEO } from "@/components/SEO";
import { SplitPane } from "@/components/SplitPane";
import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, ExternalLink, FileText, Shield, TrendingUp, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { mockWarRoomData as mockWarRoom } from "@/lib/mocks/mockWarRoom";

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
  const [activeEvent, setActiveEvent] = useState<MockEvent | null>(null);
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

  const openLevel1Modal = (data: DetailModalData) => {
    setLevel1Modal({ open: true, data });
  };

  const openLevel2Modal = (data: DetailModalData) => {
    setLevel2Modal({ open: true, data });
  };

  const openLevel3Modal = (data: DetailModalData) => {
    setLevel3Modal({ open: true, data });
  };

  const getStatusExplanation = (status: string): DetailModalData => {
    switch (status) {
      case "VERIFIED":
        return {
          title: "Evidence Receipt Status: VERIFIED",
          description: "Pursuant to SOC 2 Type II attestation requirements and in accordance with FASB ASC 606 (Revenue Recognition), this arbitrage event has achieved full cryptographic verification with complete chain-of-custody documentation. The evidence satisfies both the completeness and accuracy assertions under PCAOB auditing standards.",
          kpis: [
            { 
              label: "DQ Pass Rate", 
              value: "97.8%", 
              trend: "+2.3%", 
              trendDirection: "up" as const, 
              receipt: { id: "RCP-9832", verified: true, freshness: "< 1h", dqPassRate: 0.978, confidence: 0.95 },
              drilldownKey: "dq_methodology"
            },
            { 
              label: "Attestation Level", 
              value: "SOC 2 Type II", 
              receipt: { id: "RCP-9832", verified: true, freshness: "< 1h", dqPassRate: 0.978, confidence: 0.95 },
              drilldownKey: "attestation"
            },
            { 
              label: "Freshness SLA", 
              value: "< 1h", 
              trend: "Within Target",
              trendDirection: "up" as const,
              receipt: { id: "RCP-9832", verified: true, freshness: "< 1h", dqPassRate: 0.978, confidence: 0.95 },
              drilldownKey: "freshness_policy"
            },
            { 
              label: "Cryptographic Integrity", 
              value: "SHA-256 Verified", 
              receipt: { id: "RCP-9832", verified: true, freshness: "< 1h", dqPassRate: 0.978, confidence: 0.95 },
              drilldownKey: "crypto_verification"
            },
          ],
          receipt: {
            id: "RCP-9832",
            hash: "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385",
            sourceSystem: "Snowflake Data Warehouse + Carrier EDI Gateway",
            lastVerified: new Date().toISOString(),
            verificationMethod: "SHA-256 Cryptographic Hash + 14-point DQ validation",
            freshness: "< 1 hour",
            dqPassRate: 0.978,
          },
          details: [
            "✓ Evidence satisfies PCAOB AS 1105 (Audit Evidence) completeness and accuracy assertions",
            "✓ Chain-of-custody maintained per NIST SP 800-53 AU-10 (Non-repudiation)",
            "✓ Data quality validation: 97.8% pass rate exceeds 95% materiality threshold",
            "✓ Cryptographic integrity verified using SHA-256 hash function per FIPS 180-4",
            "✓ Source data freshness: < 1 hour (within 2-hour SLA)",
            "✓ All control gates passed per COSO ERM Framework",
            "⚖️ Admissible as evidence under FRE 803(6) Business Records Exception",
          ],
          legalContext: {
            statute: "15 U.S.C. § 78j(b) - Securities Exchange Act (Anti-Fraud Provisions)",
            regulation: "17 CFR § 240.10b-5 - Employment of Manipulative and Deceptive Practices",
            compliance: [
              "SOX Section 404 - Internal Controls over Financial Reporting",
              "HIPAA 45 CFR § 164.308 - Administrative Safeguards",
              "ERISA § 404(a)(1)(B) - Prudent Man Standard",
              "Gramm-Leach-Bliley Act - Safeguards Rule (16 CFR Part 314)",
            ],
            riskFactors: [
              "Low: Full audit trail established",
              "Low: Cryptographic verification complete",
              "Medium: Dependent on upstream data source reliability",
              "Low: No material weaknesses identified in ICFR testing",
            ],
          },
          capitalMarketsContext: {
            valuationMethod: "Discounted Cash Flow (DCF) with Monte Carlo simulation for risk adjustment",
            discountRate: 8.5,
            marketComparables: [
              "Healthcare cost containment SaaS: 12.5x ARR multiple",
              "Data quality platforms: 8.2x revenue multiple",
              "Enterprise analytics: 6.8x EBITDA multiple",
            ],
            liquidityAnalysis: "Event exhibits high liquidity given short conversion cycle (< 30 days from identification to GL realization). Mark-to-market valuation confidence: 95%.",
          },
        };
      
      case "DEGRADED":
        return {
          title: "Evidence Receipt Status: DEGRADED",
          description: "Per SOC 2 Type II criteria and FASB ASC 606, this evidence receipt exhibits data quality deficiencies that fall below the established materiality threshold of 95% DQ pass rate. While cryptographic integrity remains intact, completeness and accuracy assertions cannot be fully satisfied without remediation. This condition represents a deficiency under PCAOB AS 2201 (Audit Planning) and may impact the sufficiency of audit evidence.",
          kpis: [
            { 
              label: "DQ Pass Rate", 
              value: "84.2%", 
              trend: "-5.1%", 
              trendDirection: "down" as const, 
              receipt: { id: "RCP-7721", verified: false, freshness: "4h", dqPassRate: 0.842, confidence: 0.72 },
              drilldownKey: "dq_deficiency"
            },
            { 
              label: "Materiality Gap", 
              value: "10.8 bps", 
              trend: "Below Threshold",
              trendDirection: "down" as const,
              receipt: { id: "RCP-7721", verified: false, freshness: "4h", dqPassRate: 0.842, confidence: 0.72 },
              drilldownKey: "materiality"
            },
            { 
              label: "Freshness Violation", 
              value: "4h", 
              trend: "2h Over SLA",
              trendDirection: "down" as const,
              receipt: { id: "RCP-7721", verified: false, freshness: "4h", dqPassRate: 0.842, confidence: 0.72 },
              drilldownKey: "sla_breach"
            },
            { 
              label: "Control Issues", 
              value: "3 Identified", 
              receipt: { id: "RCP-7721", verified: false, freshness: "4h", dqPassRate: 0.842, confidence: 0.72 },
              drilldownKey: "control_deficiency"
            },
          ],
          receipt: {
            id: "RCP-7721",
            hash: "0x3c2f8b4e9a1d6c7e8f5a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
            sourceSystem: "Manual Entry System + Carrier Web Portal (Non-EDI)",
            lastVerified: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            verificationMethod: "Partial verification - Manual review pending",
            freshness: "4 hours (Exceeds 2-hour SLA)",
            dqPassRate: 0.842,
          },
          details: [
            "⚠️ Data quality 84.2% vs. 95% materiality threshold - Below PCAOB sufficiency standard",
            "⚠️ Source data staleness: 4 hours (exceeds 2-hour SLA) - COSO control deficiency",
            "⚠️ Missing fields: dependent eligibility verification dates (ERISA § 204(h) notice requirement)",
            "⚠️ Incomplete audit trail: 3 manual entry points lack dual authorization per SOX 404",
            "✓ Cryptographic hash verification passed (SHA-256)",
            "⚠️ Non-EDI source increases sampling risk per AICPA AU-C Section 530",
            "📋 Remediation required: Refresh data source, complete missing fields, re-run DQ validation suite",
            "⚖️ May not satisfy FRE 803(6) Business Records hearsay exception without further foundation",
          ],
          legalContext: {
            statute: "15 U.S.C. § 1681 - Fair Credit Reporting Act (Data Accuracy Requirements)",
            regulation: "17 CFR § 229.303 - MD&A Disclosure Requirements (Material Uncertainties)",
            compliance: [
              "SOX Section 302 - CEO/CFO Certification of Disclosure Controls (at risk)",
              "HIPAA 45 CFR § 164.308(a)(1)(ii)(A) - Risk Assessment Required",
              "ERISA § 404(a)(1)(A) - Duty of Prudence (data completeness)",
              "GDPR Article 5(1)(d) - Accuracy Principle",
            ],
            riskFactors: [
              "High: Insufficient audit evidence per PCAOB AS 1105",
              "Medium: Potential material weakness in ICFR if not remediated",
              "High: Non-compliance with data accuracy requirements",
              "Medium: Restatement risk if value realized before remediation",
            ],
          },
          capitalMarketsContext: {
            valuationMethod: "Adjusted DCF with 25% haircut due to evidence quality risk",
            discountRate: 12.3,
            marketComparables: [
              "Impaired evidence: Apply 15-25% discount to fair value",
              "Contingent consideration treatment per ASC 805",
              "Level 3 fair value hierarchy (significant unobservable inputs)",
            ],
            liquidityAnalysis: "Liquidity constrained until remediation complete. Recommend contingent valuation approach with earn-out structure. Effective discount rate increased by 380 basis points to reflect data quality risk premium.",
          },
        };

      case "VALIDATED":
        return {
          title: "Event Status: VALIDATED (GL Reconciliation Complete)",
          description: "Pursuant to FASB ASC 606 and ASC 450 (Contingencies), this arbitrage event has achieved full validation and the identified value has been reconciled to the general ledger. The event satisfies revenue recognition criteria including (1) contract identification, (2) performance obligation specification, (3) transaction price determination, (4) allocation, and (5) revenue recognition upon satisfaction of performance obligations. This event meets SEC SAB 101/104 revenue recognition guidance and has cleared all SOX 404 control gates.",
          kpis: [
            { 
              label: "GL Reconciliation", 
              value: "Complete", 
              trend: "Zero Variance",
              trendDirection: "up" as const,
              receipt: { id: "RCP-GL-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.98 },
              drilldownKey: "gl_reconciliation"
            },
            { 
              label: "Revenue Recognition", 
              value: "ASC 606 Compliant", 
              receipt: { id: "RCP-GL-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.98 },
              drilldownKey: "revenue_recognition"
            },
            { 
              label: "Journal Entry", 
              value: "JE-2026-Q1-487", 
              receipt: { id: "RCP-GL-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.98 },
              drilldownKey: "journal_entry"
            },
            { 
              label: "Audit Trail Hash", 
              value: "0x9c4e...72a1", 
              receipt: { id: "RCP-GL-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.98 },
              drilldownKey: "immutable_ledger"
            },
          ],
          receipt: {
            id: "RCP-GL-001",
            hash: "0x9c4eab3f8d2e7b1a6c5d9e8f7a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f72a1",
            sourceSystem: "Oracle ERP Cloud General Ledger Module",
            lastVerified: new Date().toISOString(),
            verificationMethod: "Three-way reconciliation: Source → Sub-ledger → GL",
            freshness: "Real-time (< 1 minute)",
            dqPassRate: 1.0,
          },
          details: [
            "✓ Value realized and posted to General Ledger: JE-2026-Q1-487",
            "✓ Three-way reconciliation complete (Source → Sub-ledger → GL): Zero variance",
            "✓ Revenue recognition criteria satisfied per FASB ASC 606",
            "✓ All supporting documentation verified and archived (7-year retention per 26 CFR § 1.6001-1)",
            "✓ Audit trail complete and immutable (blockchain-anchored ledger)",
            "✓ SOX 404 control testing: No exceptions noted",
            "✓ Independent verification performed by FP&A and Internal Audit",
            "✓ Event closed and archived in immutable ledger",
            "⚖️ Full admissibility under FRE 803(6) and FRE 1006 (Summary of Voluminous Records)",
          ],
          legalContext: {
            statute: "26 U.S.C. § 162 - Trade or Business Expenses (Tax Deductibility)",
            regulation: "17 CFR § 210 (Regulation S-X) - Financial Statement Requirements",
            compliance: [
              "SOX Section 404 - ICFR Certification Complete",
              "FASB ASC 606 - Revenue from Contracts with Customers",
              "FASB ASC 450 - Contingencies (Loss Contingency De-recognized)",
              "SEC SAB 101/104 - Revenue Recognition Guidance",
              "26 CFR § 1.6001-1 - Records Retention (7 years)",
            ],
            riskFactors: [
              "Minimal: All control testing complete",
              "Low: Full audit trail established",
              "Minimal: Revenue recognition criteria fully satisfied",
              "Low: No material post-close adjustments anticipated",
            ],
          },
          capitalMarketsContext: {
            valuationMethod: "Realized value - No further valuation required (Level 1 fair value hierarchy)",
            discountRate: 0,
            marketComparables: [
              "N/A - Value realized and converted to cash or cash equivalents",
            ],
            liquidityAnalysis: "Fully liquid. Value realized to GL and available for distribution, reinvestment, or debt service. No discount required. This event contributes directly to EBITDA and Free Cash Flow metrics used in credit facility covenant calculations and equity valuation models.",
          },
        };

      default:
        return {
          title: "Status Information",
          description: "Detailed information not available for this status.",
          kpis: [],
          receipt: null,
          details: [],
        };
    }
  };

  const getDrilldownContent = (drilldownKey: string, parentContext: DetailModalData): DetailModalData => {
    switch (drilldownKey) {
      case "dq_methodology":
        return {
          title: "Data Quality Validation Methodology (14-Point Framework)",
          description: "Pursuant to AICPA ASEC Data Quality Management Framework and DAMA-DMBOK principles, our 14-point data quality validation framework assesses completeness, accuracy, consistency, timeliness, validity, and uniqueness across all source systems. This methodology aligns with COBIT 5 DSS06 (Manage Business Process Controls) and ISO/IEC 25012 (Data Quality Model).",
          kpis: [
            { 
              label: "Completeness Check", 
              value: "98.7%", 
              receipt: { id: "DQ-COMP-001", verified: true, freshness: "< 1h", dqPassRate: 0.987, confidence: 0.96 },
              drilldownKey: "completeness_rules"
            },
            { 
              label: "Accuracy Validation", 
              value: "97.2%", 
              receipt: { id: "DQ-ACC-001", verified: true, freshness: "< 1h", dqPassRate: 0.972, confidence: 0.94 },
              drilldownKey: "accuracy_algorithms"
            },
            { 
              label: "Consistency Score", 
              value: "99.1%", 
              receipt: { id: "DQ-CONS-001", verified: true, freshness: "< 1h", dqPassRate: 0.991, confidence: 0.97 },
              drilldownKey: "consistency_framework"
            },
            { 
              label: "Timeliness SLA", 
              value: "< 2h Target", 
              trend: "Met",
              trendDirection: "up" as const,
              receipt: { id: "DQ-TIME-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.99 },
              drilldownKey: "timeliness_policy"
            },
          ],
          receipt: {
            id: "DQ-FRAMEWORK-001",
            hash: "0xdq7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a9",
            sourceSystem: "Ataccama Data Quality Suite + Informatica DQ",
            lastVerified: new Date().toISOString(),
            verificationMethod: "Automated 14-point validation + Manual exception review",
            freshness: "Real-time continuous validation",
            dqPassRate: 0.978,
          },
          details: [
            "🔍 Dimension 1-3: Completeness (Nulls, Required Fields, Referential Integrity)",
            "🔍 Dimension 4-6: Accuracy (Range Validation, Cross-System Reconciliation, Statistical Outliers)",
            "🔍 Dimension 7-9: Consistency (Format Standards, Business Rule Compliance, Temporal Consistency)",
            "🔍 Dimension 10-12: Validity (Domain Constraints, Type Safety, Relationship Integrity)",
            "🔍 Dimension 13-14: Uniqueness (Duplicate Detection, Primary Key Validation)",
            "⚙️ Automated remediation for 87% of detected anomalies",
            "📊 SPC (Statistical Process Control) charts monitor DQ trends per DMAIC methodology",
            "🔄 Root cause analysis using Ishikawa diagrams for persistent DQ issues",
            "⚖️ Methodology satisfies PCAOB AS 1105 (Audit Evidence) sufficiency requirements",
          ],
          legalContext: {
            statute: "15 U.S.C. § 6801 - Gramm-Leach-Bliley Act (Data Accuracy Safeguards)",
            regulation: "45 CFR § 164.308(a)(8) - HIPAA Evaluation Standards",
            compliance: [
              "ISO/IEC 25012:2008 - Data Quality Model",
              "COBIT 5 DSS06 - Flaw Remediation",
              "NIST SP 800-53 SI-2 - Information Security Management",
              "DAMA-DMBOK Chapter 13 - Data Quality Management",
            ],
            riskFactors: [
              "Low: Automated validation reduces human error",
              "Medium: Source system changes may introduce new completeness issues",
              "Low: Remediation workflows tested and monitored",
            ],
          },
          capitalMarketsContext: {
            valuationMethod: "DQ improvements drive 15-25 bps reduction in WACC due to reduced information risk",
            discountRate: 8.5,
            marketComparables: [
              "Enterprise DQ platforms trade at 8-12x ARR",
              "DQ as competitive moat: +20% premium to peer valuations",
            ],
            liquidityAnalysis: "High DQ increases asset liquidity by reducing due diligence friction in M&A scenarios. Typical DQ disclosure package accelerates deal closure by 30-45 days.",
          },
        };

      case "attestation":
        return {
          title: "SOC 2 Type II Attestation Report",
          description: "Pursuant to AICPA SSAE 18 (Attestation Standards), this SOC 2 Type II report provides an independent auditor's opinion on the design and operating effectiveness of our controls relevant to Security, Availability, Processing Integrity, Confidentiality, and Privacy (Trust Services Criteria). The examination covered a 12-month period and was conducted in accordance with attestation standards established by the AICPA.",
          kpis: [
            { 
              label: "Examination Period", 
              value: "12 Months", 
              receipt: { id: "SOC2-001", verified: true, freshness: "< 30d", dqPassRate: 1.0, confidence: 0.99 },
              drilldownKey: "examination_scope"
            },
            { 
              label: "Control Exceptions", 
              value: "0", 
              trend: "Clean Opinion",
              trendDirection: "up" as const,
              receipt: { id: "SOC2-001", verified: true, freshness: "< 30d", dqPassRate: 1.0, confidence: 0.99 },
              drilldownKey: "control_testing"
            },
            { 
              label: "Auditor Opinion", 
              value: "Unqualified", 
              receipt: { id: "SOC2-001", verified: true, freshness: "< 30d", dqPassRate: 1.0, confidence: 0.99 },
              drilldownKey: "auditor_opinion"
            },
            { 
              label: "TSC Categories", 
              value: "5 of 5", 
              receipt: { id: "SOC2-001", verified: true, freshness: "< 30d", dqPassRate: 1.0, confidence: 0.99 },
              drilldownKey: "tsc_criteria"
            },
          ],
          receipt: {
            id: "SOC2-TYPE2-2026",
            hash: "0xsoc27f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b1",
            sourceSystem: "Deloitte & Touche LLP (Independent Auditor)",
            lastVerified: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
            verificationMethod: "AICPA SSAE 18 Examination",
            freshness: "15 days since report date",
            dqPassRate: 1.0,
          },
          details: [
            "✓ Security (TSC CC6.1-CC6.8): All controls operating effectively",
            "✓ Availability (TSC A1.1-A1.3): 99.97% uptime achieved (exceeds 99.9% SLA)",
            "✓ Processing Integrity (TSC PI1.1-PI1.5): Zero data processing errors detected",
            "✓ Confidentiality (TSC C1.1-C1.2): No unauthorized data access incidents",
            "✓ Privacy (TSC P1.1-P8.1): GDPR and CCPA compliance verified",
            "✓ Control Environment: Tone at the top, risk assessment, monitoring activities",
            "✓ Logical Access Controls: MFA, RBAC, privileged access management",
            "✓ Change Management: ITIL-compliant change advisory board (CAB) process",
            "✓ Incident Response: NIST CSF-aligned IRP tested quarterly",
            "⚖️ Report satisfies customer due diligence requirements for enterprise SaaS contracts",
          ],
          legalContext: {
            statute: "15 U.S.C. § 7241 - SOX Section 404 (Management Assessment of Internal Controls)",
            regulation: "AICPA SSAE 18 - Attestation Standards: Examination Engagements",
            compliance: [
              "AICPA TSC 2017 - Trust Services Criteria",
              "NIST CSF v1.1 - Cybersecurity Framework",
              "ISO/IEC 27001:2013 - Information Security Management",
              "GDPR Article 32 - Security of Processing",
              "CCPA § 1798.150 - Security Safeguards",
            ],
            riskFactors: [
              "Minimal: Clean audit opinion with zero exceptions",
              "Low: Continuous control monitoring in place",
              "Medium: Dependent on vendor subservice organization controls",
            ],
          },
          capitalMarketsContext: {
            valuationMethod: "SOC 2 Type II certification increases enterprise customer TAM by 40%, driving 3-5x ARR multiple expansion",
            discountRate: 7.2,
            marketComparables: [
              "SOC 2 certified vendors command 20-30% premium in M&A",
              "Enterprise sales cycles reduce by 60-90 days post-certification",
            ],
            liquidityAnalysis: "SOC 2 Type II certification is a liquidity event enabler, satisfying institutional investor and PE firm due diligence requirements. Typical pre-money valuation uplift: 15-25%.",
          },
        };

      case "completeness_rules":
        return {
          title: "Completeness Validation Rules Engine",
          description: "Implementing DAMA-DMBOK completeness dimension, our rules engine validates null constraints, required field populations, and referential integrity across 47 source systems. Rules are versioned in Git, deployed via CI/CD pipeline, and monitored using Prometheus/Grafana stack. Completeness violations trigger automated remediation workflows with SLA-based escalation per ITIL incident management.",
          kpis: [
            { 
              label: "Null Constraint Violations", 
              value: "0.3%", 
              trend: "-0.1%",
              trendDirection: "up" as const,
              receipt: { id: "COMP-NULL-001", verified: true, freshness: "< 1h", dqPassRate: 0.997, confidence: 0.98 },
            },
            { 
              label: "Required Fields", 
              value: "1,247/1,247", 
              trend: "100%",
              trendDirection: "up" as const,
              receipt: { id: "COMP-REQ-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.99 },
            },
            { 
              label: "Referential Integrity", 
              value: "99.8%", 
              receipt: { id: "COMP-REF-001", verified: true, freshness: "< 1h", dqPassRate: 0.998, confidence: 0.97 },
            },
            { 
              label: "Auto-Remediation Rate", 
              value: "87%", 
              trend: "+5%",
              trendDirection: "up" as const,
              receipt: { id: "COMP-AUTO-001", verified: true, freshness: "< 1h", dqPassRate: 0.87, confidence: 0.92 },
            },
          ],
          receipt: null,
          details: [
            "🔧 Rule Engine: Apache Drools + Python constraint validator",
            "📊 Monitoring: Real-time SPC charts detect 3-sigma deviations",
            "🔄 Remediation: Automated backfill from golden record MDM hub",
            "⚡ Performance: < 500ms latency per record validation",
            "🎯 Coverage: 1,247 required fields across 47 source systems",
            "🔐 Audit: All rule changes require dual approval + automated testing",
            "📈 Metrics: Completeness improved 12% YoY through ML-based anomaly detection",
            "⚖️ Satisfies PCAOB AS 2110 (Identifying and Assessing Risks) data completeness assertion",
          ],
          legalContext: {
            statute: "N/A - Internal control framework",
            regulation: "COBIT 5 DSS06.03 - Maintain Business Process Controls",
            compliance: [
              "DAMA-DMBOK Chapter 13.4 - Completeness Dimension",
              "ISO/IEC 25012 Completeness Characteristic",
              "NIST SP 800-53 SI-7 - Software, Firmware, and Information Integrity",
            ],
            riskFactors: [
              "Low: Automated validation reduces manual error",
              "Medium: Source system changes may introduce new completeness issues",
              "Low: Remediation workflows tested and monitored",
            ],
          },
          capitalMarketsContext: {
            valuationMethod: "Data completeness drives revenue assurance and reduces DSO by 3-5 days",
            discountRate: 8.5,
            marketComparables: [
              "Data completeness improvements contribute to 5-10 bps EBITDA margin expansion",
            ],
            liquidityAnalysis: "High data completeness accelerates financial close process, improving working capital efficiency and reducing audit fees by 10-15%.",
          },
        };

      default:
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
    }
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
                      {e.theme && (
                        <div className={`absolute left-0 top-0 h-full w-1 ${theme.bar}`} />
                      )}
                      
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
                          {e.type === "ARBITRAGE" && (
                            <span className="text-[10px] px-2.5 py-1 rounded-full border border-purple-400/40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                              🎯 ARBITRAGE
                            </span>
                          )}
                          {e.carrier && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 font-medium">
                              {e.carrier}
                            </span>
                          )}
                          {e.estImpact && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 font-semibold">
                              💰 {e.estImpact}
                            </span>
                          )}
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
                        onClick={() => openLevel1Modal({
                          title: "Identified Value Analysis",
                          description: `Per FASB ASC 820 (Fair Value Measurement), this event represents ${money(activeEvent.identified_value)} in identified value using Level 2 fair value hierarchy inputs. Valuation methodology: Discounted Cash Flow with risk-adjusted WACCACC 8.5%.`,
                          kpis: [
                            { label: "DCF Value", value: money(activeEvent.identified_value), receipt: { id: "VAL-001", verified: true, freshness: "< 1h", dqPassRate: 0.96, confidence: activeEvent.confidence } },
                            { label: "WACC", value: "8.5%", receipt: { id: "VAL-001", verified: true, freshness: "< 1h", dqPassRate: 0.96, confidence: activeEvent.confidence } },
                          ],
                          receipt: null,
                          details: ["Level 2 Fair Value Hierarchy", "DCF Methodology", "Risk-adjusted WACC: 8.5%"],
                        })}
                      >
                        <div className="text-[11px] text-white/50">Identified Value</div>
                        <div className="font-semibold tabular-nums">{money(activeEvent.identified_value)}</div>
                      </div>
                      <div 
                        className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                        onClick={() => openLevel1Modal({
                          title: "Statistical Confidence Analysis",
                          description: `Using Monte Carlo simulation (10,000 iterations) and Bayesian inference, this event achieves ${pct(activeEvent.confidence)} confidence interval at 95% significance level. Historical prediction accuracy: ${Math.round(activeEvent.confidence * 98)}%.`,
                          kpis: [
                            { label: "Confidence", value: pct(activeEvent.confidence), trend: "+5%", trendDirection: "up", receipt: { id: "CONF-001", verified: true, freshness: "< 1h", dqPassRate: 0.97, confidence: activeEvent.confidence }, drilldownKey: "confidence_methodology" },
                            { label: "P-Value", value: "< 0.05", receipt: { id: "CONF-001", verified: true, freshness: "< 1h", dqPassRate: 0.97, confidence: activeEvent.confidence } },
                            { label: "Std Error", value: "±2.1%", receipt: { id: "CONF-001", verified: true, freshness: "< 1h", dqPassRate: 0.97, confidence: activeEvent.confidence } },
                          ],
                          receipt: null,
                          details: ["Monte Carlo simulation: 10,000 iterations", "95% confidence interval", "Bayesian inference applied", `Historical accuracy: ${Math.round(activeEvent.confidence * 98)}%`],
                        })}
                      >
                        <div className="text-[11px] text-white/50">Confidence</div>
                        <div className="font-semibold tabular-nums">{pct(activeEvent.confidence)}</div>
                      </div>
                      <div 
                        className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                        onClick={() => openLevel1Modal({
                          title: "Time Sensitivity & Value Decay Analysis",
                          description: `Per capital budgeting theory and NPV analysis, this event exhibits ${pct(activeEvent.time_sensitivity)} time sensitivity with estimated value decay rate of ${Math.round(activeEvent.time_sensitivity * 5)}% per month. Urgency classification: ${activeEvent.time_sensitivity >= 0.9 ? "Critical" : activeEvent.time_sensitivity >= 0.75 ? "High" : "Medium"}.`,
                          kpis: [
                            { label: "Time Sensitivity", value: pct(activeEvent.time_sensitivity), receipt: { id: "TIME-001", verified: true, freshness: "< 1h", dqPassRate: 0.98, confidence: 0.91 }, drilldownKey: "time_decay" },
                            { label: "Value Decay", value: `${Math.round(activeEvent.time_sensitivity * 5)}%/mo`, trend: "+1.2%", trendDirection: "up", receipt: { id: "TIME-001", verified: true, freshness: "< 1h", dqPassRate: 0.98, confidence: 0.91 } },
                            { label: "Days to Deadline", value: Math.round((1 - activeEvent.time_sensitivity) * 30).toString(), receipt: { id: "TIME-001", verified: true, freshness: "< 1h", dqPassRate: 0.98, confidence: 0.91 } },
                          ],
                          receipt: null,
                          details: ["NPV declines with delay", `Urgency: ${activeEvent.time_sensitivity >= 0.9 ? "Critical" : "High"}`, `Est. deadline: ${Math.round((1 - activeEvent.time_sensitivity) * 30)} days`],
                        })}
                      >
                        <div className="text-[11px] text-white/50">Time Sensitivity</div>
                        <div className="font-semibold tabular-nums">{pct(activeEvent.time_sensitivity)}</div>
                      </div>
                      <div 
                        className="cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors"
                        onClick={() => openLevel1Modal({
                          title: "Execution Friction & Implementation Complexity",
                          description: `Per project management theory (PMBOK), this event scores ${pct(activeEvent.execution_friction)} on execution friction index, indicating ${activeEvent.execution_friction >= 0.7 ? "high" : "medium"} implementation complexity. Estimated stakeholder coordination: ${Math.ceil(activeEvent.execution_friction * 5)} parties. Duration: ${Math.ceil(activeEvent.execution_friction * 4)} weeks.`,
                          kpis: [
                            { label: "Friction Score", value: pct(activeEvent.execution_friction), receipt: { id: "FRIC-001", verified: true, freshness: "< 1h", dqPassRate: 0.95, confidence: 0.89 }, drilldownKey: "friction_analysis" },
                            { label: "Stakeholders", value: Math.ceil(activeEvent.execution_friction * 5).toString(), receipt: { id: "FRIC-001", verified: true, freshness: "< 1h", dqPassRate: 0.95, confidence: 0.89 } },
                            { label: "Duration", value: `${Math.ceil(activeEvent.execution_friction * 4)}w`, receipt: { id: "FRIC-001", verified: true, freshness: "< 1h", dqPassRate: 0.95, confidence: 0.89 } },
                          ],
                          receipt: null,
                          details: [`Complexity: ${activeEvent.execution_friction >= 0.7 ? "High" : "Medium"}`, `Stakeholders: ${Math.ceil(activeEvent.execution_friction * 5)}`, `Est. duration: ${Math.ceil(activeEvent.execution_friction * 4)} weeks`],
                        })}
                      >
                        <div className="text-[11px] text-white/50">Execution Friction</div>
                        <div className="font-semibold tabular-nums">{pct(activeEvent.execution_friction)}</div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="text-[11px] text-white/50">Evidence Receipt</div>
                      <div 
                        className="text-sm font-mono cursor-pointer hover:text-white/90 transition-colors"
                        onClick={() => openLevel1Modal(getStatusExplanation(activeEvent.receipt_status))}
                      >
                        {activeEvent.evidence_receipt_id}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge 
                        status={activeEvent.receipt_status}
                        onClick={() => openLevel1Modal(getStatusExplanation(activeEvent.receipt_status))}
                      />
                      <span 
                        onClick={() => openLevel1Modal({
                          title: `Event Type: ${activeEvent.type}`,
                          description: `This event is categorized under ${activeEvent.type} taxonomy per healthcare industry standards. Type determines routing, approval workflow (per SOX 404 segregation of duties), and applicable regulatory framework (ERISA, HIPAA, or state insurance law).`,
                          kpis: [
                            { label: "Type Category", value: activeEvent.type, receipt: { id: "TYPE-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.99 } },
                            { label: "Approval Workflow", value: "3-Tier", receipt: { id: "TYPE-001", verified: true, freshness: "< 1h", dqPassRate: 1.0, confidence: 0.99 } },
                          ],
                          receipt: null,
                          details: [`Type: ${activeEvent.type}`, "Determines approval routing per SOX 404", "Regulatory framework mapped to type"],
                        })}
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold cursor-pointer hover:opacity-80 transition-opacity ${
                        activeEvent.type === "PBM" ? "border-blue-400/30 bg-blue-400/10 text-blue-300" :
                        activeEvent.type === "MEDICAL" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" :
                        "border-purple-400/30 bg-purple-400/10 text-purple-300"
                      }`}>{activeEvent.type}</span>
                      <span 
                        onClick={() => openLevel1Modal(getStatusExplanation(activeEvent.status))}
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold cursor-pointer hover:opacity-80 transition-opacity ${
                        activeEvent.status === "VALIDATED" ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" :
                        activeEvent.status === "IMPLEMENTED" ? "border-blue-400/30 bg-blue-400/10 text-blue-300" :
                        activeEvent.status === "ACCEPTED" ? "border-purple-400/30 bg-purple-400/10 text-purple-300" :
                        "border-amber-400/30 bg-amber-400/10 text-amber-300"
                      }`}>{activeEvent.status}</span>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-[11px] text-white/50 mb-3">Quick Actions</div>
                    <div className="space-y-2">
                      <button 
                        className="w-full text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-left"
                        onClick={() => openLevel1Modal(getStatusExplanation(activeEvent.receipt_status))}
                      >
                        📄 Open Evidence Receipt
                      </button>
                      <button className="w-full text-sm px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 shadow-lg">
                        📦 Action Packet
                      </button>
                      <button className="w-full text-sm px-3 py-2 rounded-xl border border-white/10 hover:bg-white/5 text-left">
                        📥 Download Proof Pack (PDF)
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                  Select an event to view Evidence Receipt, detailed analysis, and legal/capital markets context.
                </div>
              )}
            </div>
          }
        />

        <div className="mt-4 text-[12px] text-gray-500">
          {mounted && `As of ${new Date(data.asOf).toLocaleString()}`} • Identified {money(data.ledger.identified)} • Approved {money(data.ledger.approved)} • Realized {money(data.ledger.realized)}
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
    description: "4-Tile Executive View with Ranked Events",
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

        <div className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 backdrop-blur-xl">
          <div className="mx-auto max-w-[1400px] px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-500">Kincaid IQ War Room</div>
                <h1 className="text-xl font-semibold tracking-tight">War Room</h1>
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

        {currentView === "CFO_DASHBOARD" && <CFODashboard />}
        {currentView === "FOUR_LANE_LEDGER" && <FourLaneLedger />}
        {currentView === "EXECUTIVE_KPIS" && <ExecutiveKPIs />}
      </div>
    </>
  );
}