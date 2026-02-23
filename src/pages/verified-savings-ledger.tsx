"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  Download,
  FileText,
  Clock,
  User,
  Shield,
  Calendar,
  FileCheck,
  Link as LinkIcon,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { getTerm, getLedgerStateLabel, getTermDefinition, formatComplianceAmount, getRetentionPeriod } from "@/lib/compliance/terminology";

const PremiumBackground = dynamic(
  () => import("@/components/premium/PremiumBackground").then(mod => ({ default: mod.PremiumBackground })),
  { ssr: false }
);

type LedgerState = "IDENTIFIED" | "APPROVED" | "REALIZED" | "AT_RISK";
type Priority = "HIGH" | "MEDIUM" | "LOW";
type Confidence = "HIGH" | "MEDIUM" | "LOW";

type LedgerEntry = {
  id: string;
  description: string;
  amount: number;
  state: LedgerState;
  owner: string;
  ownerRole: string;
  department: string;
  identifiedDate: string;
  approvedDate?: string;
  realizedDate?: string;
  confidence: Confidence;
  timeSensitivity: Priority;
  category: string;
  evidenceCount: number;
  attestations: number;
  auditTrail: AuditEntry[];
  evidence: EvidenceItem[];
  approvals: ApprovalItem[];
  contractReference?: string;
  vendorName?: string;
  glAccount?: string;
  fiscalImpact?: string;
};

type AuditEntry = {
  timestamp: string;
  action: string;
  actor: string;
  actorRole: string;
  details: string;
  ipAddress?: string;
};

type EvidenceItem = {
  id: string;
  type: string;
  filename: string;
  uploadedBy: string;
  uploadedDate: string;
  verified: boolean;
  retentionPeriod: string;
  cryptoHash: string;
};

type ApprovalItem = {
  approver: string;
  approverRole: string;
  approvalDate: string;
  comments: string;
  attestation: boolean;
};

type DetailModalType = "state" | "owner" | "confidence" | "priority" | null;

type DetailModalState = {
  type: DetailModalType;
  entry: LedgerEntry | null;
};

export default function VerifiedSavingsLedger() {
  const [filterState, setFilterState] = useState<LedgerState | "ALL">("ALL");
  const [detailModal, setDetailModal] = useState<DetailModalState>({ type: null, entry: null });
  const userRole = "cfo";

  // Mock data with comprehensive details
  const mockLedgerData: LedgerEntry[] = [
    {
      id: "VSL-2026-001",
      description: "PBM Spread Pricing Variance - Q1 2026",
      amount: 847500,
      state: "REALIZED",
      owner: "Sarah Chen",
      ownerRole: "VP Benefits",
      department: "Human Resources",
      identifiedDate: "2026-01-15",
      approvedDate: "2026-01-22",
      realizedDate: "2026-02-15",
      confidence: "HIGH",
      timeSensitivity: "MEDIUM",
      category: "Pharmacy Benefits",
      evidenceCount: 12,
      attestations: 3,
      contractReference: "PBM-2024-Master-Agreement",
      vendorName: "OptumRx",
      glAccount: "5200-1450",
      fiscalImpact: "Q1 2026 Operating Expenses Reduction",
      auditTrail: [
        {
          timestamp: "2026-02-15T14:30:00Z",
          action: "Value Confirmed",
          actor: "Michael Rodriguez",
          actorRole: "CFO",
          details: "Final reconciliation completed against GL account 5200-1450. Variance resolved and documented.",
          ipAddress: "192.168.1.45"
        },
        {
          timestamp: "2026-01-22T09:15:00Z",
          action: "Action Authorized",
          actor: "Sarah Chen",
          actorRole: "VP Benefits",
          details: "Approved recovery of spread pricing variance. Vendor credit memo negotiated.",
          ipAddress: "192.168.1.23"
        },
        {
          timestamp: "2026-01-15T16:45:00Z",
          action: "Finding Identified",
          actor: "SiriusB iQ Analytics Engine",
          actorRole: "System",
          details: "Automated analysis detected 12.3% variance between contracted AWP discount and actual pricing.",
          ipAddress: "10.0.0.1"
        }
      ],
      evidence: [
        {
          id: "EVD-001",
          type: "Contract Document",
          filename: "PBM_Master_Agreement_2024.pdf",
          uploadedBy: "Sarah Chen",
          uploadedDate: "2026-01-15",
          verified: true,
          retentionPeriod: "7 years post-termination",
          cryptoHash: "sha256:a3b2c1d4e5f6..."
        },
        {
          id: "EVD-002",
          type: "Claims Data Extract",
          filename: "Q1_2026_Pharmacy_Claims.csv",
          uploadedBy: "System Import",
          uploadedDate: "2026-01-15",
          verified: true,
          retentionPeriod: "6 years (HIPAA requirement)",
          cryptoHash: "sha256:b4c3d2e1f0g7..."
        },
        {
          id: "EVD-003",
          type: "Invoice",
          filename: "OptumRx_Jan2026_Invoice.pdf",
          uploadedBy: "AP System",
          uploadedDate: "2026-01-31",
          verified: true,
          retentionPeriod: "7 years (ERISA requirement)",
          cryptoHash: "sha256:c5d4e3f2g1h8..."
        },
        {
          id: "EVD-004",
          type: "Credit Memo",
          filename: "OptumRx_Credit_847500.pdf",
          uploadedBy: "Sarah Chen",
          uploadedDate: "2026-02-10",
          verified: true,
          retentionPeriod: "7 years (ERISA requirement)",
          cryptoHash: "sha256:d6e5f4g3h2i9..."
        }
      ],
      approvals: [
        {
          approver: "Sarah Chen",
          approverRole: "VP Benefits (Control Owner)",
          approvalDate: "2026-01-22T09:15:00Z",
          comments: "Variance confirmed through contract review. Vendor acknowledges pricing error. Recovery plan approved.",
          attestation: true
        },
        {
          approver: "Jennifer Liu",
          approverRole: "Chief Compliance Officer",
          approvalDate: "2026-01-22T11:30:00Z",
          comments: "Evidence package reviewed. Documentation meets ERISA fiduciary standards. Approved for execution.",
          attestation: true
        },
        {
          approver: "Michael Rodriguez",
          approverRole: "CFO",
          approvalDate: "2026-02-15T14:30:00Z",
          comments: "Final reconciliation verified. Impact confirmed in GL. Value officially realized.",
          attestation: true
        }
      ]
    },
    {
      id: "VSL-2026-002",
      description: "Duplicate Medical Claims - January 2026",
      amount: 234800,
      state: "APPROVED",
      owner: "Marcus Thompson",
      ownerRole: "Benefits Operations Manager",
      department: "Human Resources",
      identifiedDate: "2026-02-01",
      approvedDate: "2026-02-10",
      confidence: "HIGH",
      timeSensitivity: "HIGH",
      category: "Medical Claims",
      evidenceCount: 8,
      attestations: 2,
      contractReference: "TPA-2025-Service-Agreement",
      vendorName: "Aetna",
      glAccount: "5200-1200",
      fiscalImpact: "Q1 2026 Claims Expense Adjustment",
      auditTrail: [
        {
          timestamp: "2026-02-10T13:20:00Z",
          action: "Action Authorized",
          actor: "Marcus Thompson",
          actorRole: "Benefits Operations Manager",
          details: "Approved claim recovery process. TPA to reprocess duplicate payments.",
          ipAddress: "192.168.1.67"
        },
        {
          timestamp: "2026-02-01T08:30:00Z",
          action: "Finding Identified",
          actor: "SiriusB iQ Claims Analytics",
          actorRole: "System",
          details: "Pattern matching detected 47 duplicate claim payments totaling $234,800.",
          ipAddress: "10.0.0.1"
        }
      ],
      evidence: [
        {
          id: "EVD-005",
          type: "Claims Analysis Report",
          filename: "Duplicate_Claims_Analysis_Jan2026.xlsx",
          uploadedBy: "System Analytics",
          uploadedDate: "2026-02-01",
          verified: true,
          retentionPeriod: "6 years (HIPAA requirement)",
          cryptoHash: "sha256:e7f6g5h4i3j0..."
        },
        {
          id: "EVD-006",
          type: "TPA Response",
          filename: "Aetna_Duplicate_Acknowledgement.pdf",
          uploadedBy: "Marcus Thompson",
          uploadedDate: "2026-02-05",
          verified: true,
          retentionPeriod: "7 years post-termination",
          cryptoHash: "sha256:f8g7h6i5j4k1..."
        }
      ],
      approvals: [
        {
          approver: "Marcus Thompson",
          approverRole: "Benefits Operations Manager",
          approvalDate: "2026-02-10T13:20:00Z",
          comments: "Duplicate claims validated. TPA has confirmed recovery timeline of 45 days.",
          attestation: true
        },
        {
          approver: "Jennifer Liu",
          approverRole: "Chief Compliance Officer",
          approvalDate: "2026-02-10T15:45:00Z",
          comments: "Recovery process approved. Documentation adequate for audit purposes.",
          attestation: true
        }
      ]
    },
    {
      id: "VSL-2026-003",
      description: "Stop-Loss Premium Overcharge - 2025 Policy Year",
      amount: 156200,
      state: "IDENTIFIED",
      owner: "Sarah Chen",
      ownerRole: "VP Benefits",
      department: "Human Resources",
      identifiedDate: "2026-02-18",
      confidence: "MEDIUM",
      timeSensitivity: "HIGH",
      category: "Insurance Premiums",
      evidenceCount: 5,
      attestations: 0,
      contractReference: "StopLoss-2025-Policy",
      vendorName: "Sun Life",
      glAccount: "5200-1100",
      fiscalImpact: "2025 Reconciliation Adjustment",
      auditTrail: [
        {
          timestamp: "2026-02-18T10:15:00Z",
          action: "Finding Identified",
          actor: "SiriusB iQ Premium Audit",
          actorRole: "System",
          details: "Variance detected between policy aggregate attachment point and premium billed. Requires manual review.",
          ipAddress: "10.0.0.1"
        }
      ],
      evidence: [
        {
          id: "EVD-007",
          type: "Policy Document",
          filename: "SunLife_StopLoss_2025_Policy.pdf",
          uploadedBy: "Sarah Chen",
          uploadedDate: "2026-02-18",
          verified: true,
          retentionPeriod: "7 years post-termination",
          cryptoHash: "sha256:g9h8i7j6k5l2..."
        },
        {
          id: "EVD-008",
          type: "Premium Invoice",
          filename: "SunLife_2025_Annual_Premium.pdf",
          uploadedBy: "AP System",
          uploadedDate: "2026-02-18",
          verified: true,
          retentionPeriod: "7 years (ERISA requirement)",
          cryptoHash: "sha256:h0i9j8k7l6m3..."
        },
        {
          id: "EVD-009",
          type: "Claims Summary",
          filename: "2025_Claims_Aggregate.xlsx",
          uploadedBy: "System Analytics",
          uploadedDate: "2026-02-18",
          verified: true,
          retentionPeriod: "6 years (HIPAA requirement)",
          cryptoHash: "sha256:i1j0k9l8m7n4..."
        }
      ],
      approvals: []
    },
    {
      id: "VSL-2026-004",
      description: "Unused Wellness Program Credits",
      amount: 89300,
      state: "AT_RISK",
      owner: "David Kim",
      ownerRole: "Wellness Program Manager",
      department: "Human Resources",
      identifiedDate: "2026-01-10",
      confidence: "HIGH",
      timeSensitivity: "HIGH",
      category: "Wellness Programs",
      evidenceCount: 3,
      attestations: 0,
      contractReference: "Wellness-2024-Agreement",
      vendorName: "Virgin Pulse",
      glAccount: "5200-1800",
      fiscalImpact: "Q4 2025 Accrual Adjustment",
      auditTrail: [
        {
          timestamp: "2026-01-10T14:00:00Z",
          action: "Exception Flagged",
          actor: "SiriusB iQ Contract Monitor",
          actorRole: "System",
          details: "Contract end date approaching (2026-01-31). Unused credits require immediate action or will be forfeited.",
          ipAddress: "10.0.0.1"
        }
      ],
      evidence: [
        {
          id: "EVD-010",
          type: "Contract",
          filename: "VirginPulse_Contract_2024.pdf",
          uploadedBy: "David Kim",
          uploadedDate: "2026-01-10",
          verified: true,
          retentionPeriod: "7 years post-termination",
          cryptoHash: "sha256:j2k1l0m9n8o5..."
        },
        {
          id: "EVD-011",
          type: "Usage Report",
          filename: "VirginPulse_2024_Usage.csv",
          uploadedBy: "System Import",
          uploadedDate: "2026-01-10",
          verified: true,
          retentionPeriod: "7 years (best practice)",
          cryptoHash: "sha256:k3l2m1n0o9p6..."
        }
      ],
      approvals: []
    }
  ];

  const filteredData = useMemo(() => {
    if (filterState === "ALL") return mockLedgerData;
    return mockLedgerData.filter(entry => entry.state === filterState);
  }, [filterState]);

  const stats = useMemo(() => {
    const total = mockLedgerData.reduce((sum, entry) => sum + entry.amount, 0);
    const realized = mockLedgerData
      .filter(e => e.state === "REALIZED")
      .reduce((sum, entry) => sum + entry.amount, 0);
    const approved = mockLedgerData
      .filter(e => e.state === "APPROVED")
      .reduce((sum, entry) => sum + entry.amount, 0);
    const atRisk = mockLedgerData
      .filter(e => e.state === "AT_RISK")
      .reduce((sum, entry) => sum + entry.amount, 0);

    return { total, realized, approved, atRisk };
  }, []);

  const getStateColor = (state: LedgerState) => {
    switch (state) {
      case "REALIZED": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30";
      case "APPROVED": return "bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30";
      case "IDENTIFIED": return "bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30";
      case "AT_RISK": return "bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30";
    }
  };

  const getConfidenceColor = (confidence: Confidence) => {
    switch (confidence) {
      case "HIGH": return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30";
      case "MEDIUM": return "bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30";
      case "LOW": return "bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30";
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "HIGH": return "bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30";
      case "MEDIUM": return "bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30";
      case "LOW": return "bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30";
    }
  };

  const openDetailModal = (type: DetailModalType, entry: LedgerEntry) => {
    setDetailModal({ type, entry });
  };

  const closeDetailModal = () => {
    setDetailModal({ type: null, entry: null });
  };

  const renderDetailModal = () => {
    if (!detailModal.entry) return null;

    const entry = detailModal.entry;
    const modalTitle = {
      state: `${getLedgerStateLabel(entry.state, userRole)} - Detail View`,
      owner: `Control Owner - ${entry.owner}`,
      confidence: `Evidence Strength - ${entry.confidence}`,
      priority: `Remediation Priority - ${entry.timeSensitivity}`
    }[detailModal.type || "state"] || "Detail View";

    return (
      <Dialog open={!!detailModal.type} onOpenChange={closeDetailModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-950/95 via-black/95 to-purple-950/95 border border-purple-500/20 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 bg-clip-text text-transparent flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-400" />
              {modalTitle}
            </DialogTitle>
            <DialogDescription className="text-purple-300/70">
              {entry.description} • {entry.id}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-purple-950/50 border border-purple-500/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600/30">Overview</TabsTrigger>
              <TabsTrigger value="audit" className="data-[state=active]:bg-purple-600/30">Audit Trail</TabsTrigger>
              <TabsTrigger value="evidence" className="data-[state=active]:bg-purple-600/30">Evidence</TabsTrigger>
              <TabsTrigger value="approvals" className="data-[state=active]:bg-purple-600/30">Approvals</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card className="bg-purple-950/30 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center gap-2">
                    <FileCheck className="h-5 w-5" />
                    Control Finding Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-purple-400/70 mb-1">Finding ID</p>
                      <p className="text-white font-mono">{entry.id}</p>
                    </div>
                    <div>
                      <p className="text-purple-400/70 mb-1">Category</p>
                      <p className="text-white">{entry.category}</p>
                    </div>
                    <div>
                      <p className="text-purple-400/70 mb-1">Financial Impact</p>
                      <p className="text-emerald-300 font-bold text-xl">
                        {formatComplianceAmount(entry.amount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-purple-400/70 mb-1">GL Account</p>
                      <p className="text-white font-mono">{entry.glAccount || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-purple-400/70 mb-1">Fiscal Impact Period</p>
                      <p className="text-white">{entry.fiscalImpact || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-purple-400/70 mb-1">Control Status</p>
                      <Badge className={getStateColor(entry.state)}>
                        {getLedgerStateLabel(entry.state, userRole)}
                      </Badge>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-purple-500/20">
                    <p className="text-purple-400/70 mb-1">Description</p>
                    <p className="text-white">{entry.description}</p>
                  </div>

                  {entry.contractReference && (
                    <div className="pt-4 border-t border-purple-500/20">
                      <p className="text-purple-400/70 mb-2">Contract Reference</p>
                      <div className="flex items-center gap-2 text-blue-300">
                        <LinkIcon className="h-4 w-4" />
                        <span className="font-mono text-sm">{entry.contractReference}</span>
                      </div>
                      {entry.vendorName && (
                        <p className="text-purple-300/70 text-sm mt-1">Vendor: {entry.vendorName}</p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-purple-950/30 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Control Owner & Assignment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-purple-400/70 mb-1">Control Owner</p>
                      <p className="text-white font-semibold">{entry.owner}</p>
                      <p className="text-purple-300/70 text-xs">{entry.ownerRole}</p>
                    </div>
                    <div>
                      <p className="text-purple-400/70 mb-1">Department</p>
                      <p className="text-white">{entry.department}</p>
                    </div>
                    <div>
                      <p className="text-purple-400/70 mb-1">Evidence Strength</p>
                      <Badge className={getConfidenceColor(entry.confidence)}>
                        {entry.confidence} ({entry.evidenceCount} artifacts)
                      </Badge>
                    </div>
                    <div>
                      <p className="text-purple-400/70 mb-1">Remediation Priority</p>
                      <Badge className={getPriorityColor(entry.timeSensitivity)}>
                        {entry.timeSensitivity}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-purple-950/30 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Timeline & Milestones
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-400/70">Identified</span>
                      <span className="text-white">{new Date(entry.identifiedDate).toLocaleDateString()}</span>
                    </div>
                    {entry.approvedDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400/70">Action Authorized</span>
                        <span className="text-white">{new Date(entry.approvedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {entry.realizedDate && (
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400/70">Value Confirmed</span>
                        <span className="text-white">{new Date(entry.realizedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between">
                      <span className="text-purple-400/70">Attestations Received</span>
                      <span className="text-emerald-300 font-semibold">{entry.attestations}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audit" className="space-y-3 mt-4">
              <Card className="bg-purple-950/30 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Complete Audit Trail
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {entry.auditTrail.map((audit, idx) => (
                    <div key={idx} className="border-l-2 border-purple-500/30 pl-4 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white font-semibold">{audit.action}</p>
                          <p className="text-purple-300/70 text-xs">
                            {new Date(audit.timestamp).toLocaleString()} • {audit.actor} ({audit.actorRole})
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs border-purple-500/30">
                          {audit.ipAddress}
                        </Badge>
                      </div>
                      <p className="text-purple-100 text-sm">{audit.details}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evidence" className="space-y-3 mt-4">
              <Card className="bg-purple-950/30 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Supporting Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {entry.evidence.map((evidence) => (
                    <div 
                      key={evidence.id}
                      className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all hover:shadow-lg hover:shadow-purple-500/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="h-4 w-4 text-purple-400" />
                            <p className="text-white font-semibold text-sm">{evidence.filename}</p>
                            {evidence.verified && (
                              <Badge className="text-xs bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                                Verified
                              </Badge>
                            )}
                          </div>
                          <p className="text-purple-300/70 text-xs">{evidence.type}</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs border-purple-500/30 hover:bg-purple-500/10">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                        <div>
                          <p className="text-purple-400/70">Uploaded By</p>
                          <p className="text-white">{evidence.uploadedBy}</p>
                        </div>
                        <div>
                          <p className="text-purple-400/70">Upload Date</p>
                          <p className="text-white">{new Date(evidence.uploadedDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-purple-400/70">Retention Period</p>
                          <p className="text-white">{evidence.retentionPeriod}</p>
                        </div>
                        <div>
                          <p className="text-purple-400/70">Crypto Hash</p>
                          <p className="text-white font-mono truncate">{evidence.cryptoHash}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-purple-500/20">
                    <p className="text-purple-300/70 text-xs">
                      All evidence artifacts are cryptographically verified and retained per ERISA/HIPAA requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approvals" className="space-y-3 mt-4">
              <Card className="bg-purple-950/30 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-300 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Management Attestations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {entry.approvals.length > 0 ? (
                    entry.approvals.map((approval, idx) => (
                      <div 
                        key={idx}
                        className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="text-white font-semibold">{approval.approver}</p>
                            <p className="text-purple-300/70 text-xs">{approval.approverRole}</p>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-1">
                              {approval.attestation ? "Attested" : "Approved"}
                            </Badge>
                            <p className="text-purple-400/70 text-xs">
                              {new Date(approval.approvalDate).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-purple-500/20">
                          <p className="text-purple-400/70 text-xs mb-1">Comments</p>
                          <p className="text-purple-100 text-sm">{approval.comments}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-purple-400/70">
                      <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No approvals recorded yet</p>
                      <p className="text-xs mt-1">Pending control owner review</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4 border-t border-purple-500/20">
            <Button variant="outline" onClick={closeDetailModal} className="border-purple-500/30 hover:bg-purple-500/10">
              Close
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white">
              <Download className="h-4 w-4 mr-2" />
              Export Package
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <>
      <SEO 
        title="Value Reconciliation Ledger - SiriusB iQ"
        description="ERISA-compliant audit trail and reconciliation ledger for verified savings and financial controls"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-black to-purple-950">
        <PremiumBackground />
        <SiteHeader />
        
        <main className="relative pt-24 pb-16">
          {/* Hero Section */}
          <div className="max-w-7xl mx-auto px-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <DollarSign className="h-8 w-8 text-purple-400" />
                </motion.div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-fuchsia-300 to-purple-300 bg-clip-text text-transparent">
                  {getTerm("valueLedger", userRole)}
                </h1>
              </div>
              <p className="text-xl text-purple-200/70 max-w-3xl">
                ERISA-compliant audit trail and reconciliation ledger with cryptographically verified evidence, 
                management attestations, and 7-year retention. Full chain of custody for all financial impacts.
              </p>
            </motion.div>
          </div>

          {/* Stats Cards */}
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-purple-950/80 to-purple-900/50 border-purple-500/30 backdrop-blur-xl hover:shadow-xl hover:shadow-purple-500/20 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-purple-300/70">Total Identified Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-white">{formatComplianceAmount(stats.total)}</p>
                    <p className="text-xs text-purple-400/70 mt-1">Across all control domains</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-emerald-900/40 to-purple-950/80 border-emerald-500/30 backdrop-blur-xl hover:shadow-xl hover:shadow-emerald-500/20 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-emerald-300">Value Confirmed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-emerald-300">{formatComplianceAmount(stats.realized)}</p>
                    <p className="text-xs text-purple-400/70 mt-1">Reconciled to general ledger</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-blue-900/40 to-purple-950/80 border-blue-500/30 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-500/20 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-blue-300">Action Authorized</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-blue-300">{formatComplianceAmount(stats.approved)}</p>
                    <p className="text-xs text-purple-400/70 mt-1">Pending execution & confirmation</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-red-900/40 to-purple-950/80 border-red-500/30 backdrop-blur-xl hover:shadow-xl hover:shadow-red-500/20 transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-red-300">Exception Queue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-red-300">{formatComplianceAmount(stats.atRisk)}</p>
                    <p className="text-xs text-purple-400/70 mt-1">Requires immediate attention</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Filters */}
          <div className="max-w-7xl mx-auto px-6 mb-6">
            <motion.div 
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Filter className="h-5 w-5 text-purple-400" />
              <div className="flex gap-2">
                {["ALL", "IDENTIFIED", "APPROVED", "REALIZED", "AT_RISK"].map((state) => (
                  <Button
                    key={state}
                    variant={filterState === state ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilterState(state as LedgerState | "ALL")}
                    className={filterState === state 
                      ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 border-0" 
                      : "border-purple-500/30 hover:bg-purple-500/10"
                    }
                  >
                    {state === "ALL" ? "All" : getLedgerStateLabel(state as LedgerState, userRole)}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Ledger Table */}
          <motion.div 
            className="max-w-7xl mx-auto px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-purple-950/30 border-purple-500/20 backdrop-blur-xl">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-purple-900/30 border-b border-purple-500/20">
                      <tr>
                        <th className="text-left p-4 text-sm font-semibold text-purple-300">ID</th>
                        <th className="text-left p-4 text-sm font-semibold text-purple-300">Description</th>
                        <th className="text-right p-4 text-sm font-semibold text-purple-300">Amount</th>
                        <th className="text-left p-4 text-sm font-semibold text-purple-300">Status</th>
                        <th className="text-left p-4 text-sm font-semibold text-purple-300">Control Owner</th>
                        <th className="text-left p-4 text-sm font-semibold text-purple-300">Evidence</th>
                        <th className="text-left p-4 text-sm font-semibold text-purple-300">Priority</th>
                        <th className="text-left p-4 text-sm font-semibold text-purple-300">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((entry, idx) => (
                        <motion.tr 
                          key={entry.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + (idx * 0.1) }}
                          className="border-b border-purple-500/10 hover:bg-purple-900/20 transition-colors"
                        >
                          <td className="p-4">
                            <span className="text-purple-300 font-mono text-sm">{entry.id}</span>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-white font-medium">{entry.description}</p>
                              <p className="text-purple-400/70 text-xs mt-1">{entry.category}</p>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-emerald-300 font-bold text-lg">
                              {formatComplianceAmount(entry.amount)}
                            </span>
                          </td>
                          <td className="p-4">
                            <Badge 
                              className={`${getStateColor(entry.state)} cursor-pointer transition-all`}
                              onClick={() => openDetailModal("state", entry)}
                            >
                              {getLedgerStateLabel(entry.state, userRole)}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge 
                              variant="outline" 
                              className="cursor-pointer hover:bg-purple-500/10 transition-all border-purple-500/30"
                              onClick={() => openDetailModal("owner", entry)}
                            >
                              <User className="h-3 w-3 mr-1" />
                              {entry.owner}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge 
                              className={`${getConfidenceColor(entry.confidence)} cursor-pointer transition-all`}
                              onClick={() => openDetailModal("confidence", entry)}
                            >
                              <Shield className="h-3 w-3 mr-1" />
                              {entry.confidence} ({entry.evidenceCount})
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge 
                              className={`${getPriorityColor(entry.timeSensitivity)} cursor-pointer transition-all`}
                              onClick={() => openDetailModal("priority", entry)}
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {entry.timeSensitivity}
                            </Badge>
                          </td>
                          <td className="p-4 text-purple-300/70 text-sm">
                            {new Date(entry.identifiedDate).toLocaleDateString()}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </main>

        <SiteFooter />
      </div>

      {renderDetailModal()}
    </>
  );
}