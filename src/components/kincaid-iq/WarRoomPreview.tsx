import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Scale,
  BarChart3,
  ExternalLink,
  ChevronRight,
  DollarSign,
  Users,
  Activity,
  CheckCircle,
  ClipboardList,
  Receipt,
  Shield,
  FileCheck,
  Download,
  Eye,
  Clock,
  Building2,
  Sparkles,
} from "lucide-react";

interface RegulationDetail {
  id: string;
  code: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  compliance: "compliant" | "at-risk" | "non-compliant";
  requirements: string[];
  relatedKPIs: string[];
  receiptsCount: number;
}

interface KPIDetail {
  id: string;
  name: string;
  value: string;
  trend: string;
  target: string;
  variance: string;
  breakdown: { label: string; value: string; percent: string; receiptsCount: number }[];
  relatedRegs: string[];
  receiptsCount: number;
}

interface EvidenceItem {
  id: string;
  type: string;
  description: string;
  date: string;
  source: string;
  verified: boolean;
  receiptsCount: number;
}

interface ReceiptDocument {
  id: string;
  title: string;
  amount: string;
  date: string;
  vendor: string;
  category: string;
  status: "verified" | "pending" | "flagged";
  description: string;
  attachments: number;
}

const metricData: Record<
  string,
  {
    regulations: RegulationDetail[];
    kpis: KPIDetail[];
    evidence: EvidenceItem[];
    receiptsCount: number;
  }
> = {
  spend: {
    receiptsCount: 347,
    regulations: [
      {
        id: "reg1",
        code: "ERISA §404(a)",
        title: "Fiduciary Duty of Prudence",
        description:
          "Plan fiduciaries must act solely in the interest of participants and beneficiaries with the care, skill, prudence, and diligence under the circumstances then prevailing.",
        impact: "high",
        compliance: "at-risk",
        requirements: [
          "Quarterly benchmarking of plan costs against industry standards",
          "Annual RFP process for vendors exceeding $500K in spend",
          "Documentation of cost-benefit analysis for all plan design changes",
          "Regular monitoring of administrative fees and service quality",
        ],
        relatedKPIs: ["admin-fees", "per-capita-cost", "vendor-performance"],
        receiptsCount: 89,
      },
      {
        id: "reg2",
        code: "CAA §204",
        title: "Consolidated Appropriations Act - Transparency Requirements",
        description:
          "Requires group health plans to disclose detailed cost and quality information, including direct and indirect compensation to service providers.",
        impact: "high",
        compliance: "compliant",
        requirements: [
          "Annual disclosure of all direct and indirect compensation",
          "Quarterly reporting of prescription drug spending",
          "Transparency in PBM rebate arrangements",
          "Machine-readable files for all plan costs",
        ],
        relatedKPIs: ["pbm-passthrough", "rebate-capture", "transparency-score"],
        receiptsCount: 142,
      },
      {
        id: "reg3",
        code: "ACA §1557",
        title: "Non-Discrimination in Health Programs",
        description:
          "Prohibits discrimination in health programs on the basis of race, color, national origin, sex, age, or disability.",
        impact: "medium",
        compliance: "compliant",
        requirements: [
          "Language assistance services for limited English proficiency individuals",
          "Accessible communications for people with disabilities",
          "Non-discriminatory plan design and benefit structures",
          "Annual review of utilization patterns for disparate impact",
        ],
        relatedKPIs: ["access-equity", "member-satisfaction", "utilization-variance"],
        receiptsCount: 67,
      },
    ],
    kpis: [
      {
        id: "kpi1",
        name: "Per Employee Per Month (PEPM) Cost",
        value: "$1,033",
        trend: "+8.2%",
        target: "$980",
        variance: "+$53 over target",
        receiptsCount: 156,
        breakdown: [
          { label: "Medical", value: "$512", percent: "49.6%", receiptsCount: 78 },
          { label: "Pharmacy", value: "$298", percent: "28.8%", receiptsCount: 42 },
          { label: "Dental", value: "$87", percent: "8.4%", receiptsCount: 18 },
          { label: "Vision", value: "$24", percent: "2.3%", receiptsCount: 9 },
          { label: "Admin Fees", value: "$112", percent: "10.9%", receiptsCount: 9 },
        ],
        relatedRegs: ["ERISA §404(a)", "CAA §204"],
      },
      {
        id: "kpi2",
        name: "Administrative Fee Ratio",
        value: "10.9%",
        trend: "+1.2%",
        target: "8.5%",
        variance: "+2.4% over industry benchmark",
        receiptsCount: 94,
        breakdown: [
          { label: "TPA Fees", value: "$48", percent: "42.9%", receiptsCount: 31 },
          { label: "PBM Admin", value: "$31", percent: "27.7%", receiptsCount: 24 },
          { label: "Stop-Loss Premium", value: "$19", percent: "17.0%", receiptsCount: 18 },
          { label: "Consulting", value: "$9", percent: "8.0%", receiptsCount: 12 },
          { label: "Other", value: "$5", percent: "4.5%", receiptsCount: 9 },
        ],
        relatedRegs: ["ERISA §404(a)", "CAA §204"],
      },
      {
        id: "kpi3",
        name: "Quarterly Spend Variance",
        value: "+$487K",
        trend: "+8.2%",
        target: "$0",
        variance: "3.9% over budget",
        receiptsCount: 97,
        breakdown: [
          { label: "Specialty Drugs", value: "$218K", percent: "44.8%", receiptsCount: 37 },
          { label: "High-Cost Claims", value: "$142K", percent: "29.2%", receiptsCount: 28 },
          { label: "Trend Increase", value: "$87K", percent: "17.9%", receiptsCount: 19 },
          { label: "PBM Variance", value: "$40K", percent: "8.2%", receiptsCount: 13 },
        ],
        relatedRegs: ["ERISA §404(a)"],
      },
    ],
    evidence: [
      {
        id: "ev1",
        type: "Benchmark Report",
        description: "Q4 2025 Industry Cost Comparison - Self-Funded Plans 500-2000 Lives",
        date: "2026-01-15",
        source: "Mercer Health & Benefits",
        verified: true,
        receiptsCount: 23,
      },
      {
        id: "ev2",
        type: "Vendor Invoice",
        description: "TPA Administrative Fees - January 2026",
        date: "2026-02-01",
        source: "UMR/UnitedHealthcare",
        verified: true,
        receiptsCount: 8,
      },
      {
        id: "ev3",
        type: "Claims Data",
        description: "High-Cost Claimant Report - Q4 2025",
        date: "2026-01-10",
        source: "Internal Claims System",
        verified: true,
        receiptsCount: 142,
      },
    ],
  },
  leakage: {
    receiptsCount: 218,
    regulations: [
      {
        id: "reg4",
        code: "HIPAA §164.308",
        title: "Administrative Safeguards - Integrity Controls",
        description:
          "Implement policies and procedures to protect electronic protected health information from improper alteration or destruction.",
        impact: "high",
        compliance: "at-risk",
        requirements: [
          "Regular audits of claims processing accuracy",
          "Validation of PBM pass-through pricing",
          "Reconciliation of rebates and administrative fees",
          "Documentation of all plan amendments and changes",
        ],
        relatedKPIs: ["audit-score", "pbm-variance", "rebate-capture"],
        receiptsCount: 127,
      },
      {
        id: "reg5",
        code: "ERISA §503",
        title: "Claims Procedure Requirements",
        description:
          "Plans must establish reasonable claims procedures, including timelines and appeal rights for participants.",
        impact: "medium",
        compliance: "compliant",
        requirements: [
          "Written notice of adverse benefit determinations",
          "Full and fair review process for appeals",
          "Strict adherence to timing requirements",
          "Detailed explanation of denial reasons",
        ],
        relatedKPIs: ["claims-accuracy", "appeal-rate", "turnaround-time"],
        receiptsCount: 91,
      },
    ],
    kpis: [
      {
        id: "kpi4",
        name: "Contract Leakage Rate",
        value: "3.9%",
        trend: "+0.8%",
        target: "2.0%",
        variance: "+1.9% over target",
        receiptsCount: 134,
        breakdown: [
          { label: "PBM Pricing Variance", value: "$142K", percent: "47.9%", receiptsCount: 47 },
          { label: "Out-of-Network Claims", value: "$118K", percent: "24.2%", receiptsCount: 38 },
          { label: "Duplicate Payments", value: "$87K", percent: "17.9%", receiptsCount: 22 },
          { label: "Coding Errors", value: "$76K", percent: "15.6%", receiptsCount: 18 },
          { label: "Other", value: "$64K", percent: "13.1%", receiptsCount: 9 },
        ],
        relatedRegs: ["HIPAA §164.308", "ERISA §503"],
      },
      {
        id: "kpi5",
        name: "Claims Audit Score",
        value: "94.2%",
        trend: "-1.1%",
        target: "98.0%",
        variance: "-3.8% below target",
        receiptsCount: 84,
        breakdown: [
          { label: "Accurate Payments", value: "94.2%", percent: "94.2%", receiptsCount: 58 },
          { label: "Overpayments", value: "3.1%", percent: "3.1%", receiptsCount: 12 },
          { label: "Underpayments", value: "1.8%", percent: "1.8%", receiptsCount: 9 },
          { label: "Denied in Error", value: "0.9%", percent: "0.9%", receiptsCount: 5 },
        ],
        relatedRegs: ["HIPAA §164.308"],
      },
    ],
    evidence: [
      {
        id: "ev4",
        type: "Audit Report",
        description: "Q4 2025 Claims Payment Accuracy Audit",
        date: "2026-01-20",
        source: "Third-Party Auditor (HMS)",
        verified: true,
        receiptsCount: 67,
      },
      {
        id: "ev5",
        type: "PBM Reconciliation",
        description: "Annual PBM Rebate and Admin Fee Reconciliation",
        date: "2026-01-31",
        source: "CVS Caremark",
        verified: true,
        receiptsCount: 43,
      },
    ],
  },
  pbm: {
    receiptsCount: 189,
    regulations: [
      {
        id: "reg6",
        code: "CAA §202",
        title: "Pharmacy Benefit Manager Transparency",
        description:
          "PBMs must disclose all direct and indirect compensation, including rebates, fees, and spread pricing.",
        impact: "high",
        compliance: "at-risk",
        requirements: [
          "Quarterly reporting of all PBM compensation",
          "Disclosure of rebate arrangements and retention",
          "Transparency in spread pricing and AWP calculations",
          "Annual certification of contract compliance",
        ],
        relatedKPIs: ["pbm-passthrough", "rebate-share", "spread-pricing"],
        receiptsCount: 112,
      },
    ],
    kpis: [
      {
        id: "kpi6",
        name: "PBM Pass-Through Variance",
        value: "$142K",
        trend: "+2.1%",
        target: "$0",
        variance: "100% contract variance",
        receiptsCount: 77,
        breakdown: [
          { label: "Spread Pricing", value: "$68K", percent: "47.9%", receiptsCount: 34 },
          { label: "Rebate Retention", value: "$41K", percent: "28.9%", receiptsCount: 21 },
          { label: "Admin Fee Overages", value: "$22K", percent: "15.5%", receiptsCount: 14 },
          { label: "Other", value: "$11K", percent: "7.7%", receiptsCount: 8 },
        ],
        relatedRegs: ["CAA §202"],
      },
    ],
    evidence: [
      {
        id: "ev6",
        type: "Contract Document",
        description: "PBM Services Agreement - Pricing Schedule",
        date: "2025-01-01",
        source: "CVS Caremark",
        verified: true,
        receiptsCount: 28,
      },
      {
        id: "ev7",
        type: "Invoice Analysis",
        description: "Monthly PBM Invoice Variance Report",
        date: "2026-01-31",
        source: "Internal Finance",
        verified: true,
        receiptsCount: 49,
      },
    ],
  },
};

const mockReceipts: ReceiptDocument[] = [
  {
    id: "rcpt-001",
    title: "TPA Administrative Services - January 2026",
    amount: "$48,234.00",
    date: "2026-01-31",
    vendor: "UMR/UnitedHealthcare",
    category: "Administrative Fees",
    status: "verified",
    description: "Monthly third-party administration services including claims processing, member services, and reporting",
    attachments: 3,
  },
  {
    id: "rcpt-002",
    title: "PBM Rebate Reconciliation Q4 2025",
    amount: "$142,890.00",
    date: "2026-01-15",
    vendor: "CVS Caremark",
    category: "Pharmacy Benefits",
    status: "verified",
    description: "Quarterly pharmacy benefit manager rebate reconciliation and passthrough verification",
    attachments: 5,
  },
  {
    id: "rcpt-003",
    title: "Specialty Drug Claims - December 2025",
    amount: "$218,450.00",
    date: "2025-12-31",
    vendor: "Accredo Specialty Pharmacy",
    category: "Pharmacy Claims",
    status: "verified",
    description: "High-cost specialty medication claims for oncology and rheumatology treatments",
    attachments: 12,
  },
  {
    id: "rcpt-004",
    title: "Stop-Loss Premium Payment",
    amount: "$19,500.00",
    date: "2026-01-15",
    vendor: "Sun Life Financial",
    category: "Insurance Premium",
    status: "verified",
    description: "Monthly stop-loss insurance premium for claims exceeding $150,000 individual threshold",
    attachments: 2,
  },
  {
    id: "rcpt-005",
    title: "Benefits Consulting Services - Q4 2025",
    amount: "$9,750.00",
    date: "2026-01-10",
    vendor: "Mercer Health & Benefits",
    category: "Consulting",
    status: "verified",
    description: "Quarterly benefits strategy consulting, benchmarking analysis, and compliance review",
    attachments: 4,
  },
  {
    id: "rcpt-006",
    title: "Claims Audit Services",
    amount: "$12,500.00",
    date: "2026-01-20",
    vendor: "HMS - Healthcare Management Systems",
    category: "Audit Services",
    status: "verified",
    description: "Comprehensive claims payment accuracy audit for Q4 2025 claims",
    attachments: 8,
  },
  {
    id: "rcpt-007",
    title: "Duplicate Payment Recovery",
    amount: "-$87,250.00",
    date: "2026-01-25",
    vendor: "Internal Recovery",
    category: "Cost Recovery",
    status: "verified",
    description: "Recovery of duplicate and erroneous claim payments identified in audit",
    attachments: 15,
  },
  {
    id: "rcpt-008",
    title: "Medical Claims - High Cost Claimant",
    amount: "$142,880.00",
    date: "2025-12-28",
    vendor: "Mayo Clinic",
    category: "Medical Claims",
    status: "flagged",
    description: "Inpatient hospital stay and surgical procedures - requires additional review for coding accuracy",
    attachments: 6,
  },
];

function MetricTile({
  label,
  value,
  trend,
  status,
  receiptsCount,
  onClick,
}: {
  label: string;
  value: string;
  trend?: string;
  status?: "good" | "warning" | "alert";
  receiptsCount?: number;
  onClick: () => void;
}) {
  const statusConfig = {
    good: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: CheckCircle2, glow: "emerald" },
    warning: { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", icon: AlertTriangle, glow: "amber" },
    alert: { color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", icon: AlertTriangle, glow: "rose" },
  }[status || "good"];

  const StatusIcon = statusConfig.icon;

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.07] to-white/[0.02] backdrop-blur-3xl transition-all duration-700 ease-out hover:scale-[1.02] hover:border-white/[0.15] hover:from-white/[0.10] hover:to-white/[0.04] hover:shadow-[0_20px_70px_-15px_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
      style={{
        boxShadow: "0 20px 60px -15px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.03) inset",
      }}
    >
      {/* Premium Glass Overlay */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 p-7">
        <div className="flex items-start justify-between mb-5">
          <div className="text-[13px] font-medium tracking-wide text-white/40 transition-colors duration-500 group-hover:text-white/60">
            {label}
          </div>
          <div 
            className={`flex h-9 w-9 items-center justify-center rounded-[14px] ${statusConfig.bg} ${statusConfig.border} border backdrop-blur-xl transition-all duration-700 group-hover:scale-110 group-hover:shadow-lg`}
            style={{
              boxShadow: `0 0 20px -5px rgba(${statusConfig.glow === 'emerald' ? '16, 185, 129' : statusConfig.glow === 'amber' ? '245, 158, 11' : '244, 63, 94'}, 0.3)`,
            }}
          >
            <StatusIcon className={`h-[18px] w-[18px] ${statusConfig.color} transition-all duration-500 group-hover:scale-110`} />
          </div>
        </div>
        
        <div className="mb-2 text-[32px] font-semibold leading-none tracking-[-0.03em] text-white transition-all duration-500 group-hover:text-white/95">
          {value}
        </div>
        
        {trend && (
          <div className="flex items-center gap-2 text-[13px] font-medium tracking-wide">
            {trend.startsWith("+") ? (
              <TrendingUp className="h-3.5 w-3.5 text-rose-400" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-emerald-400" />
            )}
            <span className="text-white/50 transition-colors duration-500 group-hover:text-white/70">{trend}</span>
          </div>
        )}

        <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5 opacity-70 transition-all duration-500 group-hover:border-white/[0.12] group-hover:opacity-100">
          {receiptsCount !== undefined && (
            <div className="flex items-center gap-2 text-[13px] font-medium text-blue-400/70 transition-all duration-500 group-hover:text-blue-400">
              <Receipt className="h-4 w-4" />
              <span>{receiptsCount} receipts</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[13px] font-medium text-white/30 transition-all duration-500 group-hover:text-white/70">
            Explore <ChevronRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
      
      {/* Premium Multi-Layer Glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/[0.08] blur-[60px] transition-all duration-1000 group-hover:bg-blue-500/[0.15]" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-purple-500/[0.06] blur-[60px] transition-all duration-1000 group-hover:bg-purple-500/[0.12]" />
      
      {/* Shimmer Effect */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-shimmer" />
      </div>
    </div>
  );
}

export function WarRoomPreview() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [selectedReg, setSelectedReg] = useState<RegulationDetail | null>(null);
  const [selectedKPI, setSelectedKPI] = useState<KPIDetail | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [showReceipts, setShowReceipts] = useState(false);
  const [receiptsContext, setReceiptsContext] = useState<string>("");

  const currentData = selectedMetric ? metricData[selectedMetric] : null;

  const handleShowReceipts = (context: string) => {
    setReceiptsContext(context);
    setShowReceipts(true);
  };

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 p-1">
        <MetricTile
          label="Total Plan Spend (YTD)"
          value="$12.4M"
          trend="+8.2% vs. budget"
          status="warning"
          receiptsCount={347}
          onClick={() => setSelectedMetric("spend")}
        />
        <MetricTile
          label="Identified Leakage"
          value="$487K"
          trend="3.9% of total spend"
          status="alert"
          receiptsCount={218}
          onClick={() => setSelectedMetric("leakage")}
        />
        <MetricTile
          label="PBM Pass-Through Variance"
          value="$142K"
          trend="+2.1% vs. contract"
          status="alert"
          receiptsCount={189}
          onClick={() => setSelectedMetric("pbm")}
        />
        <MetricTile
          label="High-Cost Claimants"
          value="23"
          trend="+4 vs. prior quarter"
          status="warning"
          receiptsCount={142}
          onClick={() => setSelectedMetric("spend")}
        />
        <MetricTile
          label="Specialty Drug Spend"
          value="$2.8M"
          trend="+12.4% YoY"
          status="warning"
          receiptsCount={156}
          onClick={() => setSelectedMetric("spend")}
        />
        <MetricTile
          label="Generic Dispensing Rate"
          value="86.2%"
          trend="+1.8% vs. Q3"
          status="good"
          receiptsCount={94}
          onClick={() => setSelectedMetric("spend")}
        />
        <MetricTile
          label="Medical Trend (PMPM)"
          value="$512"
          trend="+6.1% YoY"
          status="warning"
          receiptsCount={78}
          onClick={() => setSelectedMetric("spend")}
        />
        <MetricTile
          label="Verified Savings Actions"
          value="$218K"
          trend="14 closed initiatives"
          status="good"
          receiptsCount={97}
          onClick={() => setSelectedMetric("leakage")}
        />
      </div>

      {/* Main Detail Dialog - Premium 3D */}
      <Dialog open={!!selectedMetric && !selectedReg && !selectedKPI && !selectedEvidence} onOpenChange={() => setSelectedMetric(null)}>
        <DialogContent 
          className="max-w-5xl max-h-[90vh] overflow-hidden border-white/[0.08] backdrop-blur-3xl shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/20 pointer-events-none" />
          
          <DialogHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-white">
                <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 shadow-lg">
                  <Sparkles className="h-5 w-5 text-blue-300" />
                </div>
                Compliance & Performance Deep Dive
              </DialogTitle>
              {currentData && (
                <Button 
                  variant="outline" 
                  className="gap-2 rounded-[16px] border-white/[0.12] bg-white/[0.06] backdrop-blur-2xl hover:bg-white/[0.12] hover:border-white/20 transition-all duration-500 shadow-lg"
                  onClick={() => handleShowReceipts(`Total receipts for ${selectedMetric}`)}
                >
                  <Receipt className="h-4 w-4" />
                  View All {currentData.receiptsCount} Receipts
                </Button>
              )}
            </div>
          </DialogHeader>

          <Tabs defaultValue="regulations" className="w-full relative z-10">
            <TabsList className="grid w-full grid-cols-3 rounded-[20px] p-1.5 border border-white/[0.08] shadow-lg backdrop-blur-2xl" style={{ background: "rgba(255,255,255,0.04)" }}>
              <TabsTrigger 
                value="regulations" 
                className="rounded-[14px] data-[state=active]:bg-white/[0.12] data-[state=active]:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.2)] transition-all duration-500"
              >
                <Scale className="mr-2 h-4 w-4" />
                Regulations
              </TabsTrigger>
              <TabsTrigger 
                value="kpis" 
                className="rounded-[14px] data-[state=active]:bg-white/[0.12] data-[state=active]:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.2)] transition-all duration-500"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                KPIs
              </TabsTrigger>
              <TabsTrigger 
                value="evidence" 
                className="rounded-[14px] data-[state=active]:bg-white/[0.12] data-[state=active]:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.2)] transition-all duration-500"
              >
                <FileText className="mr-2 h-4 w-4" />
                Evidence
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[600px] mt-6">
              <TabsContent value="regulations" className="space-y-4">
                {currentData?.regulations.map((reg) => (
                  <Card
                    key={reg.id}
                    className="cursor-pointer border-white/[0.08] backdrop-blur-2xl rounded-[24px] hover:border-white/[0.15] hover:scale-[1.01] transition-all duration-700 ease-out group overflow-hidden shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)]"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    }}
                    onClick={() => setSelectedReg(reg)}
                  >
                    <CardContent className="p-7 relative">
                      {/* Glass Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]" />
                      
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div>
                          <Badge variant="outline" className="text-blue-400 border-blue-400/40 bg-blue-500/10 mb-3 rounded-full px-4 py-1.5 backdrop-blur-xl shadow-lg">
                            {reg.code}
                          </Badge>
                          <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-blue-100 transition-colors duration-500">{reg.title}</h3>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant={reg.impact === "high" ? "destructive" : "secondary"}
                            className="capitalize rounded-full px-3 py-1 shadow-lg backdrop-blur-xl"
                          >
                            {reg.impact} Impact
                          </Badge>
                          <Badge
                            variant={
                              reg.compliance === "compliant"
                                ? "default"
                                : reg.compliance === "at-risk"
                                ? "secondary"
                                : "destructive"
                            }
                            className="capitalize rounded-full px-3 py-1 shadow-lg backdrop-blur-xl"
                          >
                            {reg.compliance}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-white/70 mb-5 leading-relaxed relative z-10">{reg.description}</p>
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4 text-xs text-white/50">
                          <span>{reg.requirements.length} requirements</span>
                          <span>•</span>
                          <span>{reg.relatedKPIs.length} related KPIs</span>
                          <span>•</span>
                          <div className="flex items-center gap-1.5 text-blue-400/80">
                            <Receipt className="h-3.5 w-3.5" />
                            <span>{reg.receiptsCount} receipts</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-full transition-all duration-500">
                          View Details <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                        </Button>
                      </div>
                      
                      {/* Multi-layer glow */}
                      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/[0.06] blur-[70px] transition-all duration-1000 group-hover:bg-blue-500/[0.12] pointer-events-none" />
                      <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-purple-500/[0.04] blur-[70px] transition-all duration-1000 group-hover:bg-purple-500/[0.10] pointer-events-none" />
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="kpis" className="space-y-4">
                {currentData?.kpis.map((kpi) => (
                  <Card
                    key={kpi.id}
                    className="cursor-pointer border-white/[0.08] backdrop-blur-2xl rounded-[24px] hover:border-white/[0.15] hover:scale-[1.01] transition-all duration-700 ease-out group overflow-hidden shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)]"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    }}
                    onClick={() => setSelectedKPI(kpi)}
                  >
                    <CardContent className="p-7 relative">
                      {/* Glass Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]" />
                      
                      <div className="flex items-start justify-between mb-5 relative z-10">
                        <div>
                          <h3 className="text-lg font-semibold tracking-tight text-white mb-2 group-hover:text-blue-100 transition-colors duration-500">{kpi.name}</h3>
                          <div className="flex items-center gap-3 mt-2 text-sm text-white/60">
                            <span>Current: {kpi.value}</span>
                            <span>•</span>
                            <span>Target: {kpi.target}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold tracking-tight text-white">{kpi.value}</div>
                          <div className="text-sm text-red-400 font-medium mt-1">{kpi.trend}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1.5 backdrop-blur-xl shadow-lg relative z-10">{kpi.variance}</Badge>
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-4 text-xs text-white/50">
                          <span>{kpi.breakdown.length} components</span>
                          <span>•</span>
                          <span>{kpi.relatedRegs.length} related regulations</span>
                          <span>•</span>
                          <div className="flex items-center gap-1.5 text-blue-400/80">
                            <Receipt className="h-3.5 w-3.5" />
                            <span>{kpi.receiptsCount} receipts</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-full transition-all duration-500">
                          View Breakdown <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                        </Button>
                      </div>
                      
                      {/* Multi-layer glow */}
                      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-500/[0.06] blur-[70px] transition-all duration-1000 group-hover:bg-purple-500/[0.12] pointer-events-none" />
                      <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-blue-500/[0.04] blur-[70px] transition-all duration-1000 group-hover:bg-blue-500/[0.10] pointer-events-none" />
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="evidence" className="space-y-4">
                {currentData?.evidence.map((ev) => (
                  <Card
                    key={ev.id}
                    className="cursor-pointer border-white/[0.08] backdrop-blur-2xl rounded-[24px] hover:border-white/[0.15] hover:scale-[1.01] transition-all duration-700 ease-out group overflow-hidden shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)]"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                    }}
                    onClick={() => setSelectedEvidence(ev)}
                  >
                    <CardContent className="p-7 relative">
                      {/* Glass Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]" />
                      
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="flex items-start gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 shadow-lg">
                            <FileText className="h-5 w-5 text-blue-400" />
                          </div>
                          <div>
                            <Badge variant="outline" className="text-blue-400 border-blue-400/40 bg-blue-500/10 mb-3 rounded-full px-4 py-1.5 backdrop-blur-xl shadow-lg">
                              {ev.type}
                            </Badge>
                            <h3 className="text-base font-semibold tracking-tight text-white group-hover:text-blue-100 transition-colors duration-500">{ev.description}</h3>
                            <div className="flex items-center gap-3 mt-2 text-sm text-white/60">
                              <span>{ev.date}</span>
                              <span>•</span>
                              <span>{ev.source}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1.5 text-blue-400/80">
                                <Receipt className="h-3.5 w-3.5" />
                                <span>{ev.receiptsCount} receipts</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {ev.verified && (
                          <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border-emerald-400/40 rounded-full px-4 py-1.5 backdrop-blur-xl shadow-lg">
                            <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-full transition-all duration-500 relative z-10">
                        View Document <ExternalLink className="ml-1.5 h-4 w-4" />
                      </Button>
                      
                      {/* Multi-layer glow */}
                      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-500/[0.06] blur-[70px] transition-all duration-1000 group-hover:bg-emerald-500/[0.12] pointer-events-none" />
                      <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-blue-500/[0.04] blur-[70px] transition-all duration-1000 group-hover:bg-blue-500/[0.10] pointer-events-none" />
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Regulation Detail Dialog - Premium 3D */}
      <Dialog open={!!selectedReg} onOpenChange={() => setSelectedReg(null)}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] border-white/[0.08] backdrop-blur-3xl shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/20 pointer-events-none" />
          
          <DialogHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-semibold tracking-tight text-white flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 shadow-xl">
                  <Scale className="h-6 w-6 text-blue-300" />
                </div>
                <div>
                  <div className="text-sm text-blue-400 font-medium">{selectedReg?.code}</div>
                  <div className="text-white">{selectedReg?.title}</div>
                </div>
              </DialogTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 rounded-[16px] border-white/[0.12] bg-white/[0.06] backdrop-blur-2xl hover:bg-white/[0.12] hover:border-white/20 transition-all duration-500 shadow-lg"
                onClick={() => handleShowReceipts(`Receipts for ${selectedReg?.code}`)}
              >
                <Receipt className="h-4 w-4" />
                {selectedReg?.receiptsCount} Receipts
              </Button>
            </div>
          </DialogHeader>

          <ScrollArea className="h-[600px] relative z-10">
            <div className="space-y-7">
              <div>
                <div className="flex gap-2 mb-5">
                  <Badge
                    variant={selectedReg?.impact === "high" ? "destructive" : "secondary"}
                    className="capitalize rounded-full px-4 py-1.5 backdrop-blur-xl shadow-lg"
                  >
                    {selectedReg?.impact} Impact
                  </Badge>
                  <Badge
                    variant={
                      selectedReg?.compliance === "compliant"
                        ? "default"
                        : selectedReg?.compliance === "at-risk"
                        ? "secondary"
                        : "destructive"
                    }
                    className="capitalize rounded-full px-4 py-1.5 backdrop-blur-xl shadow-lg"
                  >
                    {selectedReg?.compliance}
                  </Badge>
                </div>
                <p className="text-white/80 leading-relaxed text-[15px]">{selectedReg?.description}</p>
              </div>

              <Separator className="bg-white/[0.08]" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold tracking-tight text-white flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-blue-500/10 backdrop-blur-xl border border-blue-500/20">
                      <ClipboardList className="h-5 w-5 text-blue-400" />
                    </div>
                    Compliance Requirements
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 rounded-full border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/20 transition-all duration-500 backdrop-blur-xl"
                  >
                    <FileCheck className="h-4 w-4" />
                    View All Evidence
                  </Button>
                </div>
                <div className="space-y-3">
                  {selectedReg?.requirements.map((req, idx) => (
                    <Card 
                      key={idx} 
                      className="border-white/[0.08] backdrop-blur-2xl rounded-[20px] hover:border-white/[0.12] transition-all duration-500 group cursor-pointer overflow-hidden shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                      }}
                    >
                      <CardContent className="p-5 relative">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 flex-shrink-0">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                            </div>
                            <p className="text-[14px] text-white/80 leading-relaxed">{req}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full">
                            <Receipt className="h-4 w-4 text-blue-400" />
                          </Button>
                        </div>
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/[0.04] blur-[50px] transition-all duration-700 group-hover:bg-emerald-500/[0.08] pointer-events-none" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/[0.08]" />

              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-purple-500/10 backdrop-blur-xl border border-purple-500/20">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                  </div>
                  Related KPIs
                </h3>
                <div className="grid gap-3">
                  {selectedReg?.relatedKPIs.map((kpiId, idx) => {
                    const relatedKPI = currentData?.kpis.find(k => 
                      k.id === kpiId || k.name.toLowerCase().includes(kpiId.toLowerCase())
                    );
                    return (
                      <Card
                        key={idx}
                        className="cursor-pointer border-white/[0.08] backdrop-blur-2xl rounded-[20px] hover:border-white/[0.12] transition-all duration-500 group overflow-hidden shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                        }}
                        onClick={() => {
                          if (relatedKPI) {
                            setSelectedReg(null);
                            setSelectedKPI(relatedKPI);
                          }
                        }}
                      >
                        <CardContent className="p-5 relative">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-500/10 backdrop-blur-xl border border-blue-500/20">
                                <Activity className="h-4 w-4 text-blue-400" />
                              </div>
                              <span className="text-sm text-white font-medium tracking-tight">{kpiId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 text-blue-400 border-blue-400/30 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full backdrop-blur-xl"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShowReceipts(`Receipts for ${kpiId}`);
                                }}
                              >
                                <Receipt className="h-3.5 w-3.5 mr-1" />
                                {relatedKPI?.receiptsCount ? `${relatedKPI.receiptsCount}` : "See"}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-blue-400 hover:bg-blue-500/10 rounded-full transition-all duration-500">
                                Details <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/[0.04] blur-[50px] transition-all duration-700 group-hover:bg-blue-500/[0.08] pointer-events-none" />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* KPI Detail Dialog - Premium 3D */}
      <Dialog open={!!selectedKPI} onOpenChange={() => setSelectedKPI(null)}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] border-white/[0.08] backdrop-blur-3xl shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/20 pointer-events-none" />
          
          <DialogHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-semibold tracking-tight text-white flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10 shadow-xl">
                  <BarChart3 className="h-6 w-6 text-purple-300" />
                </div>
                {selectedKPI?.name}
              </DialogTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 rounded-[16px] border-white/[0.12] bg-white/[0.06] backdrop-blur-2xl hover:bg-white/[0.12] hover:border-white/20 transition-all duration-500 shadow-lg"
                onClick={() => handleShowReceipts(`Receipts for ${selectedKPI?.name}`)}
              >
                <Receipt className="h-4 w-4" />
                {selectedKPI?.receiptsCount} Receipts
              </Button>
            </div>
          </DialogHeader>

          <ScrollArea className="h-[600px] relative z-10">
            <div className="space-y-7">
              <div className="grid grid-cols-3 gap-4">
                <Card 
                  className="border-white/[0.08] backdrop-blur-2xl rounded-[20px] overflow-hidden shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  }}
                >
                  <CardContent className="p-5 relative">
                    <div className="text-xs text-white/50 mb-2 font-medium tracking-wide">Current Value</div>
                    <div className="text-2xl font-bold tracking-tight text-white">{selectedKPI?.value}</div>
                    <div className="text-sm text-red-400 mt-1.5 font-medium">{selectedKPI?.trend}</div>
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/[0.08] blur-[50px] pointer-events-none" />
                  </CardContent>
                </Card>
                <Card 
                  className="border-white/[0.08] backdrop-blur-2xl rounded-[20px] overflow-hidden shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  }}
                >
                  <CardContent className="p-5 relative">
                    <div className="text-xs text-white/50 mb-2 font-medium tracking-wide">Target</div>
                    <div className="text-2xl font-bold tracking-tight text-white">{selectedKPI?.target}</div>
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/[0.08] blur-[50px] pointer-events-none" />
                  </CardContent>
                </Card>
                <Card 
                  className="border-white/[0.08] backdrop-blur-2xl rounded-[20px] overflow-hidden shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  }}
                >
                  <CardContent className="p-5 relative">
                    <div className="text-xs text-white/50 mb-2 font-medium tracking-wide">Variance</div>
                    <div className="text-base font-semibold text-red-400">{selectedKPI?.variance}</div>
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-red-500/[0.08] blur-[50px] pointer-events-none" />
                  </CardContent>
                </Card>
              </div>

              <Separator className="bg-white/[0.08]" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold tracking-tight text-white flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-blue-500/10 backdrop-blur-xl border border-blue-500/20">
                      <DollarSign className="h-5 w-5 text-blue-400" />
                    </div>
                    Cost Breakdown
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 rounded-full border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/20 transition-all duration-500 backdrop-blur-xl"
                  >
                    <Shield className="h-4 w-4" />
                    View All Proof
                  </Button>
                </div>
                <div className="space-y-3">
                  {selectedKPI?.breakdown.map((item, idx) => (
                    <Card
                      key={idx}
                      className="cursor-pointer border-white/[0.08] backdrop-blur-2xl rounded-[20px] hover:border-white/[0.12] transition-all duration-500 group overflow-hidden shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                      }}
                    >
                      <CardContent className="p-5 relative">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-medium text-white">{item.label}</div>
                            <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs backdrop-blur-xl">{item.percent}</Badge>
                            <div className="flex items-center gap-1.5 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <Receipt className="h-3 w-3" />
                              <span>{item.receiptsCount}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-semibold text-white">{item.value}</div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="opacity-0 group-hover:opacity-100 transition-all duration-500 text-blue-400 hover:bg-blue-500/10 rounded-full"
                              onClick={() => handleShowReceipts(`Receipts for ${item.label}`)}
                            >
                              <Receipt className="h-4 w-4 mr-1" />
                              Receipts
                            </Button>
                            <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-500/10 rounded-full transition-all duration-500">
                              Drill Down <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/[0.04] blur-[50px] transition-all duration-700 group-hover:bg-purple-500/[0.08] pointer-events-none" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/[0.08]" />

              <div>
                <h3 className="text-lg font-semibold tracking-tight text-white mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-purple-500/10 backdrop-blur-xl border border-purple-500/20">
                    <Scale className="h-5 w-5 text-purple-400" />
                  </div>
                  Related Regulations
                </h3>
                <div className="space-y-3">
                  {selectedKPI?.relatedRegs.map((regCode, idx) => {
                    const relatedReg = currentData?.regulations.find(r => 
                      r.code === regCode || r.title === regCode
                    );
                    return (
                      <Card
                        key={idx}
                        className="cursor-pointer border-white/[0.08] backdrop-blur-2xl rounded-[20px] hover:border-white/[0.12] transition-all duration-500 group overflow-hidden shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                        }}
                        onClick={() => {
                          if (relatedReg) {
                            setSelectedKPI(null);
                            setSelectedReg(relatedReg);
                          }
                        }}
                      >
                        <CardContent className="p-5 relative">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-blue-500/10 backdrop-blur-xl border border-blue-500/20">
                                <Scale className="h-4 w-4 text-blue-400" />
                              </div>
                              <span className="text-sm text-white font-medium tracking-tight">{regCode}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 text-blue-400 border-blue-400/30 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-full backdrop-blur-xl"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShowReceipts(`Receipts for ${regCode}`);
                                }}
                              >
                                <Receipt className="h-3.5 w-3.5 mr-1" />
                                {relatedReg?.receiptsCount || "See"}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-blue-400 hover:bg-blue-500/10 rounded-full transition-all duration-500">
                                View <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-blue-500/[0.04] blur-[50px] transition-all duration-700 group-hover:bg-blue-500/[0.08] pointer-events-none" />
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Evidence Detail Dialog - Premium 3D */}
      <Dialog open={!!selectedEvidence} onOpenChange={() => setSelectedEvidence(null)}>
        <DialogContent 
          className="max-w-3xl border-white/[0.08] backdrop-blur-3xl shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/20 pointer-events-none" />
          
          <DialogHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-semibold tracking-tight text-white flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-blue-500/20 to-emerald-500/20 backdrop-blur-xl border border-white/10 shadow-xl">
                  <FileText className="h-6 w-6 text-blue-300" />
                </div>
                Evidence Document
              </DialogTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 rounded-[16px] border-white/[0.12] bg-white/[0.06] backdrop-blur-2xl hover:bg-white/[0.12] hover:border-white/20 transition-all duration-500 shadow-lg"
                onClick={() => handleShowReceipts(selectedEvidence?.description || "")}
              >
                <Receipt className="h-4 w-4" />
                {selectedEvidence?.receiptsCount} Receipts
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-7 relative z-10">
            <div>
              <Badge variant="outline" className="text-blue-400 border-blue-400/40 bg-blue-500/10 mb-4 rounded-full px-4 py-1.5 backdrop-blur-xl shadow-lg">
                {selectedEvidence?.type}
              </Badge>
              <h3 className="text-xl font-semibold tracking-tight text-white mb-5">{selectedEvidence?.description}</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card 
                  className="border-white/[0.08] backdrop-blur-2xl rounded-[20px] overflow-hidden shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  }}
                >
                  <CardContent className="p-5 relative">
                    <div className="text-xs text-white/50 mb-1.5 font-medium tracking-wide">Date</div>
                    <div className="text-sm text-white">{selectedEvidence?.date}</div>
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/[0.08] blur-[40px] pointer-events-none" />
                  </CardContent>
                </Card>
                <Card 
                  className="border-white/[0.08] backdrop-blur-2xl rounded-[20px] overflow-hidden shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  }}
                >
                  <CardContent className="p-5 relative">
                    <div className="text-xs text-white/50 mb-1.5 font-medium tracking-wide">Source</div>
                    <div className="text-sm text-white">{selectedEvidence?.source}</div>
                    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-500/[0.08] blur-[40px] pointer-events-none" />
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="bg-white/[0.08]" />

            <div>
              <h3 className="text-lg font-semibold tracking-tight text-white mb-4">Document Actions</h3>
              <div className="grid gap-3">
                <Button 
                  variant="outline" 
                  className="justify-start rounded-[16px] border-white/[0.10] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-500 backdrop-blur-xl"
                >
                  <FileText className="mr-3 h-4 w-4" />
                  View Full Document
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start rounded-[16px] border-white/[0.10] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-500 backdrop-blur-xl"
                  onClick={() => handleShowReceipts(selectedEvidence?.description || "")}
                >
                  <Receipt className="mr-3 h-4 w-4" />
                  View All {selectedEvidence?.receiptsCount} Receipts
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start rounded-[16px] border-white/[0.10] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-500 backdrop-blur-xl"
                >
                  <ExternalLink className="mr-3 h-4 w-4" />
                  Open in External System
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start rounded-[16px] border-white/[0.10] bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-500 backdrop-blur-xl"
                >
                  <Users className="mr-3 h-4 w-4" />
                  Share with Team
                </Button>
              </div>
            </div>

            {selectedEvidence?.verified && (
              <Card 
                className="border-emerald-500/30 backdrop-blur-2xl rounded-[20px] overflow-hidden shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(16, 185, 129, 0.10) 0%, rgba(16, 185, 129, 0.05) 100%)",
                }}
              >
                <CardContent className="p-5 relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-emerald-400">Verified Evidence</div>
                      <div className="text-xs text-white/70 mt-1 leading-relaxed">
                        This document has been verified and authenticated by our compliance team with {selectedEvidence.receiptsCount} supporting receipts
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/[0.15] blur-[60px] pointer-events-none" />
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipts Modal - Premium 3D */}
      <Dialog open={showReceipts} onOpenChange={setShowReceipts}>
        <DialogContent 
          className="max-w-6xl max-h-[90vh] border-white/[0.08] backdrop-blur-3xl shadow-[0_40px_100px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)_inset]"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-black/20 pointer-events-none" />
          
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-2xl font-semibold tracking-tight text-white flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/10 shadow-xl">
                <Receipt className="h-6 w-6 text-blue-300" />
              </div>
              Receipt Documents - {receiptsContext}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[700px] relative z-10">
            <div className="space-y-4">
              {mockReceipts.map((receipt) => (
                <Card
                  key={receipt.id}
                  className="border-white/[0.08] backdrop-blur-2xl rounded-[24px] hover:border-white/[0.12] transition-all duration-700 group cursor-pointer overflow-hidden shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(255,255,255,0.1)]"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                  }}
                >
                  <CardContent className="p-7 relative">
                    {/* Glass Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[24px]" />
                    
                    <div className="flex items-start justify-between mb-5 relative z-10">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-blue-100 transition-colors duration-500">{receipt.title}</h3>
                          <Badge
                            variant={
                              receipt.status === "verified"
                                ? "default"
                                : receipt.status === "flagged"
                                ? "destructive"
                                : "secondary"
                            }
                            className={`rounded-full px-3 py-1.5 backdrop-blur-xl shadow-lg ${
                              receipt.status === "verified"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-400/40"
                                : ""
                            }`}
                          >
                            {receipt.status === "verified" && <CheckCircle className="mr-1.5 h-3.5 w-3.5" />}
                            {receipt.status === "flagged" && <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />}
                            {receipt.status === "pending" && <Clock className="mr-1.5 h-3.5 w-3.5" />}
                            {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/70 mb-4 leading-relaxed">{receipt.description}</p>
                        <div className="grid grid-cols-4 gap-5">
                          <div>
                            <div className="text-xs text-white/50 mb-1.5 font-medium tracking-wide">Amount</div>
                            <div className="text-sm font-semibold text-white">{receipt.amount}</div>
                          </div>
                          <div>
                            <div className="text-xs text-white/50 mb-1.5 font-medium tracking-wide">Date</div>
                            <div className="text-sm text-white">{receipt.date}</div>
                          </div>
                          <div>
                            <div className="text-xs text-white/50 mb-1.5 font-medium tracking-wide">Vendor</div>
                            <div className="text-sm text-white flex items-center gap-1.5">
                              <Building2 className="h-3.5 w-3.5 text-blue-400" />
                              {receipt.vendor}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-white/50 mb-1.5 font-medium tracking-wide">Category</div>
                            <Badge variant="outline" className="text-blue-400 border-blue-400/40 bg-blue-500/10 rounded-full px-3 py-1 text-xs backdrop-blur-xl">
                              {receipt.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-white/[0.08] mb-5" />

                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <FileText className="h-3.5 w-3.5" />
                        <span>{receipt.attachments} attachments</span>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.10] hover:border-white/20 transition-all duration-500 backdrop-blur-xl"
                        >
                          <Eye className="h-3.5 w-3.5 mr-1.5" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.10] hover:border-white/20 transition-all duration-500 backdrop-blur-xl"
                        >
                          <Download className="h-3.5 w-3.5 mr-1.5" />
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="rounded-full border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.10] hover:border-white/20 transition-all duration-500 backdrop-blur-xl"
                        >
                          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                          Open
                        </Button>
                      </div>
                    </div>
                    
                    {/* Multi-layer glow */}
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/[0.04] blur-[70px] transition-all duration-1000 group-hover:bg-blue-500/[0.08] pointer-events-none" />
                    <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-purple-500/[0.04] blur-[70px] transition-all duration-1000 group-hover:bg-purple-500/[0.08] pointer-events-none" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}