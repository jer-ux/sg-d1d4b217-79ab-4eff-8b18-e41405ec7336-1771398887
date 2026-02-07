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
  const statusColor = {
    good: "text-emerald-400",
    warning: "text-yellow-400",
    alert: "text-red-400",
  }[status || "good"];

  const StatusIcon = {
    good: CheckCircle2,
    warning: AlertTriangle,
    alert: AlertTriangle,
  }[status || "good"];

  return (
    <Card
      className="group cursor-pointer border-white/10 bg-white/5 transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/20"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors">
            {label}
          </div>
          {status && (
            <StatusIcon className={`h-4 w-4 ${statusColor} group-hover:scale-110 transition-transform`} />
          )}
        </div>
        <div className="mt-3 text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors">
          {value}
        </div>
        {trend && (
          <div className="mt-2 flex items-center gap-1 text-xs text-white/60 group-hover:text-white/80 transition-colors">
            {trend.startsWith("+") ? (
              <TrendingUp className="h-3 w-3 text-red-400" />
            ) : (
              <TrendingDown className="h-3 w-3 text-emerald-400" />
            )}
            <span>{trend}</span>
          </div>
        )}
        {receiptsCount !== undefined && (
          <div className="mt-2 flex items-center gap-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <Receipt className="h-3 w-3" />
            <span>{receiptsCount} receipts</span>
          </div>
        )}
        <div className="mt-3 flex items-center gap-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Click to explore</span>
          <ChevronRight className="h-3 w-3" />
        </div>
      </CardContent>
    </Card>
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Main Detail Dialog */}
      <Dialog open={!!selectedMetric && !selectedReg && !selectedKPI && !selectedEvidence} onOpenChange={() => setSelectedMetric(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden bg-slate-950 border-white/20">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl text-white">Compliance & Performance Deep Dive</DialogTitle>
              {currentData && (
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => handleShowReceipts(`Total receipts for ${selectedMetric}`)}
                >
                  <Receipt className="h-4 w-4" />
                  View All {currentData.receiptsCount} Receipts
                </Button>
              )}
            </div>
          </DialogHeader>

          <Tabs defaultValue="regulations" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/5">
              <TabsTrigger value="regulations">
                <Scale className="mr-2 h-4 w-4" />
                Regulations
              </TabsTrigger>
              <TabsTrigger value="kpis">
                <BarChart3 className="mr-2 h-4 w-4" />
                KPIs
              </TabsTrigger>
              <TabsTrigger value="evidence">
                <FileText className="mr-2 h-4 w-4" />
                Evidence
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[600px] mt-4">
              <TabsContent value="regulations" className="space-y-4">
                {currentData?.regulations.map((reg) => (
                  <Card
                    key={reg.id}
                    className="cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                    onClick={() => setSelectedReg(reg)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <Badge variant="outline" className="text-blue-400 border-blue-400 mb-2">
                            {reg.code}
                          </Badge>
                          <h3 className="text-lg font-semibold text-white">{reg.title}</h3>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant={reg.impact === "high" ? "destructive" : "secondary"}
                            className="capitalize"
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
                            className="capitalize"
                          >
                            {reg.compliance}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-white/70 mb-4">{reg.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-white/50">
                          <span>{reg.requirements.length} requirements</span>
                          <span>•</span>
                          <span>{reg.relatedKPIs.length} related KPIs</span>
                          <span>•</span>
                          <div className="flex items-center gap-1 text-blue-400">
                            <Receipt className="h-3 w-3" />
                            <span>{reg.receiptsCount} receipts</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          View Details <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="kpis" className="space-y-4">
                {currentData?.kpis.map((kpi) => (
                  <Card
                    key={kpi.id}
                    className="cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                    onClick={() => setSelectedKPI(kpi)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{kpi.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-white/60">
                            <span>Current: {kpi.value}</span>
                            <span>•</span>
                            <span>Target: {kpi.target}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">{kpi.value}</div>
                          <div className="text-sm text-red-400">{kpi.trend}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="mb-3">{kpi.variance}</Badge>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-white/50">
                          <span>{kpi.breakdown.length} components</span>
                          <span>•</span>
                          <span>{kpi.relatedRegs.length} related regulations</span>
                          <span>•</span>
                          <div className="flex items-center gap-1 text-blue-400">
                            <Receipt className="h-3 w-3" />
                            <span>{kpi.receiptsCount} receipts</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          View Breakdown <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="evidence" className="space-y-4">
                {currentData?.evidence.map((ev) => (
                  <Card
                    key={ev.id}
                    className="cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                    onClick={() => setSelectedEvidence(ev)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-blue-400 mt-0.5" />
                          <div>
                            <Badge variant="outline" className="text-blue-400 border-blue-400 mb-2">
                              {ev.type}
                            </Badge>
                            <h3 className="text-base font-semibold text-white">{ev.description}</h3>
                            <div className="flex items-center gap-2 mt-2 text-sm text-white/60">
                              <span>{ev.date}</span>
                              <span>•</span>
                              <span>{ev.source}</span>
                              <span>•</span>
                              <div className="flex items-center gap-1 text-blue-400">
                                <Receipt className="h-3 w-3" />
                                <span>{ev.receiptsCount} receipts</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {ev.verified && (
                          <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border-emerald-400">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                        View Document <ExternalLink className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Regulation Detail Dialog */}
      <Dialog open={!!selectedReg} onOpenChange={() => setSelectedReg(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-slate-950 border-white/20">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl text-white flex items-center gap-3">
                <Scale className="h-6 w-6 text-blue-400" />
                {selectedReg?.code}: {selectedReg?.title}
              </DialogTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Receipt className="h-4 w-4" />
                {selectedReg?.receiptsCount} Receipts
              </Button>
            </div>
          </DialogHeader>

          <ScrollArea className="h-[600px]">
            <div className="space-y-6">
              <div>
                <div className="flex gap-2 mb-4">
                  <Badge
                    variant={selectedReg?.impact === "high" ? "destructive" : "secondary"}
                    className="capitalize"
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
                    className="capitalize"
                  >
                    {selectedReg?.compliance}
                  </Badge>
                </div>
                <p className="text-white/80">{selectedReg?.description}</p>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-blue-400" />
                    Compliance Requirements
                  </h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileCheck className="h-4 w-4" />
                    View All Evidence
                  </Button>
                </div>
                <div className="space-y-3">
                  {selectedReg?.requirements.map((req, idx) => (
                    <Card key={idx} className="border-white/10 bg-white/5 hover:bg-white/10 transition-all group cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <CheckCircle2 className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-white/80">{req}</p>
                          </div>
                          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Receipt className="h-4 w-4 text-blue-400" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-400" />
                  Related KPIs
                </h3>
                <div className="grid gap-3">
                  {selectedReg?.relatedKPIs.map((kpiId, idx) => {
                    // Find the actual KPI from the current metric data
                    const relatedKPI = currentData?.kpis.find(k => 
                      k.id === kpiId || k.name.toLowerCase().includes(kpiId.toLowerCase())
                    );
                    return (
                      <Card
                        key={idx}
                        className="cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
                        onClick={() => {
                          if (relatedKPI) {
                            setSelectedReg(null);
                            setSelectedKPI(relatedKPI);
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Activity className="h-4 w-4 text-blue-400" />
                              <span className="text-sm text-white font-medium">{kpiId}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShowReceipts(`Receipts for ${reg.code} - ${reg.title}`);
                                }}
                              >
                                <Receipt className="h-4 w-4 mr-1" />
                                {relatedKPI?.receiptsCount ? `${relatedKPI.receiptsCount} Receipts` : "See Receipts"}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-blue-400">
                                View Details <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
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

      {/* KPI Detail Dialog */}
      <Dialog open={!!selectedKPI} onOpenChange={() => setSelectedKPI(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-slate-950 border-white/20">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl text-white flex items-center gap-3">
                <BarChart3 className="h-6 w-6 text-blue-400" />
                {selectedKPI?.name}
              </DialogTitle>
              <Button variant="outline" size="sm" className="gap-2">
                <Receipt className="h-4 w-4" />
                {selectedKPI?.receiptsCount} Receipts
              </Button>
            </div>
          </DialogHeader>

          <ScrollArea className="h-[600px]">
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-4">
                    <div className="text-xs text-white/60 mb-2">Current Value</div>
                    <div className="text-2xl font-bold text-white">{selectedKPI?.value}</div>
                    <div className="text-sm text-red-400 mt-1">{selectedKPI?.trend}</div>
                  </CardContent>
                </Card>
                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-4">
                    <div className="text-xs text-white/60 mb-2">Target</div>
                    <div className="text-2xl font-bold text-white">{selectedKPI?.target}</div>
                  </CardContent>
                </Card>
                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-4">
                    <div className="text-xs text-white/60 mb-2">Variance</div>
                    <div className="text-base font-semibold text-red-400">{selectedKPI?.variance}</div>
                  </CardContent>
                </Card>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-blue-400" />
                    Cost Breakdown
                  </h3>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Shield className="h-4 w-4" />
                    View All Proof
                  </Button>
                </div>
                <div className="space-y-3">
                  {selectedKPI?.breakdown.map((item, idx) => (
                    <Card
                      key={idx}
                      className="cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="text-sm font-medium text-white">{item.label}</div>
                            <Badge variant="secondary">{item.percent}</Badge>
                            <div className="flex items-center gap-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Receipt className="h-3 w-3" />
                              <span>{item.receiptsCount}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-lg font-semibold text-white">{item.value}</div>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-400">
                              <Receipt className="h-4 w-4 mr-1" />
                              Receipts
                            </Button>
                            <Button variant="ghost" size="sm" className="text-blue-400">
                              Drill Down <ChevronRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-blue-400" />
                  Related Regulations
                </h3>
                <div className="space-y-3">
                  {selectedKPI?.relatedRegs.map((regCode, idx) => {
                    // Find the actual Regulation from the current metric data
                    const relatedReg = currentData?.regulations.find(r => 
                      r.code === regCode || r.title === regCode
                    );
                    return (
                      <Card
                        key={idx}
                        className="cursor-pointer border-white/10 bg-white/5 hover:bg-white/10 transition-all group"
                        onClick={() => {
                          if (relatedReg) {
                            setSelectedKPI(null);
                            setSelectedReg(relatedReg);
                          }
                        }}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Scale className="h-4 w-4 text-blue-400" />
                              <span className="text-sm text-white font-medium">{regCode}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleShowReceipts(`Receipts for ${relatedKPI?.name || kpiId}`);
                                }}
                              >
                                <Receipt className="h-4 w-4 mr-1" />
                                {relatedKPI?.receiptsCount ? `${relatedKPI.receiptsCount} Receipts` : "See Receipts"}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-blue-400">
                                View Regulation <ChevronRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
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

      {/* Evidence Detail Dialog */}
      <Dialog open={!!selectedEvidence} onOpenChange={() => setSelectedEvidence(null)}>
        <DialogContent className="max-w-3xl bg-slate-950 border-white/20">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl text-white flex items-center gap-3">
                <FileText className="h-6 w-6 text-blue-400" />
                Evidence Document
              </DialogTitle>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => handleShowReceipts(selectedEvidence?.description || "")}
              >
                <Receipt className="h-4 w-4" />
                {selectedEvidence?.receiptsCount} Receipts
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="text-blue-400 border-blue-400 mb-3">
                {selectedEvidence?.type}
              </Badge>
              <h3 className="text-xl font-semibold text-white mb-4">{selectedEvidence?.description}</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-4">
                    <div className="text-xs text-white/60 mb-1">Date</div>
                    <div className="text-sm text-white">{selectedEvidence?.date}</div>
                  </CardContent>
                </Card>
                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-4">
                    <div className="text-xs text-white/60 mb-1">Source</div>
                    <div className="text-sm text-white">{selectedEvidence?.source}</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Document Actions</h3>
              <div className="grid gap-3">
                <Button variant="outline" className="justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  View Full Document
                </Button>
                <Button 
                  variant="outline" 
                  className="justify-start"
                  onClick={() => handleShowReceipts(selectedEvidence?.description || "")}
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  View All {selectedEvidence?.receiptsCount} Receipts
                </Button>
                <Button variant="outline" className="justify-start">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in External System
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Share with Team
                </Button>
              </div>
            </div>

            {selectedEvidence?.verified && (
              <Card className="border-emerald-500/20 bg-emerald-500/10">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <div>
                      <div className="text-sm font-semibold text-emerald-400">Verified Evidence</div>
                      <div className="text-xs text-white/70 mt-1">
                        This document has been verified and authenticated by our compliance team with {selectedEvidence.receiptsCount} supporting receipts
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Receipts Modal */}
      <Dialog open={showReceipts} onOpenChange={setShowReceipts}>
        <DialogContent className="max-w-6xl max-h-[90vh] bg-slate-950 border-white/20">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white flex items-center gap-3">
              <Receipt className="h-6 w-6 text-blue-400" />
              Receipt Documents - {receiptsContext}
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[700px]">
            <div className="space-y-4">
              {mockReceipts.map((receipt) => (
                <Card
                  key={receipt.id}
                  className="border-white/10 bg-white/5 hover:bg-white/10 transition-all group cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{receipt.title}</h3>
                          <Badge
                            variant={
                              receipt.status === "verified"
                                ? "default"
                                : receipt.status === "flagged"
                                ? "destructive"
                                : "secondary"
                            }
                            className={
                              receipt.status === "verified"
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-400"
                                : ""
                            }
                          >
                            {receipt.status === "verified" && <CheckCircle className="mr-1 h-3 w-3" />}
                            {receipt.status === "flagged" && <AlertTriangle className="mr-1 h-3 w-3" />}
                            {receipt.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                            {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/70 mb-3">{receipt.description}</p>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <div className="text-xs text-white/50 mb-1">Amount</div>
                            <div className="text-sm font-semibold text-white">{receipt.amount}</div>
                          </div>
                          <div>
                            <div className="text-xs text-white/50 mb-1">Date</div>
                            <div className="text-sm text-white">{receipt.date}</div>
                          </div>
                          <div>
                            <div className="text-xs text-white/50 mb-1">Vendor</div>
                            <div className="text-sm text-white flex items-center gap-1">
                              <Building2 className="h-3 w-3 text-blue-400" />
                              {receipt.vendor}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-white/50 mb-1">Category</div>
                            <Badge variant="outline" className="text-blue-400 border-blue-400">
                              {receipt.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-white/10 mb-4" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-white/50">
                        <FileText className="h-3 w-3" />
                        <span>{receipt.attachments} attachments</span>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open
                        </Button>
                      </div>
                    </div>
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