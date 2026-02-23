import Head from "next/head";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";
import { 
  Shield, 
  FileCheck, 
  XCircle, 
  Download, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Search,
  Filter
} from "lucide-react";
import { CreateReceiptModal } from "@/components/ledger/CreateReceiptModal";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const PremiumBackground = dynamic(() => import("@/components/premium/PremiumBackground").then(mod => ({ default: mod.PremiumBackground })), { ssr: false });

type VerificationStatus = "VERIFIED" | "PARTIAL" | "BLOCKED";

type Artifact = {
  id: string;
  sourceSystem: string;
  sourceType: string;
  uri: string;
  fileName: string;
  checksum: string;
  loadedAt: string;
  rowCount?: number;
};

type Transform = {
  id: string;
  name: string;
  version: string;
  codeHash: string;
  queryId: string;
  ranAt: string;
  ranBy: string;
  warehouse: string;
};

type DqTest = {
  name: string;
  status: "PASS" | "WARN" | "FAIL";
  details?: string;
};

type Reconciliation = {
  name: string;
  status: "PASS" | "WARN" | "FAIL";
  expected: number;
  actual: number;
  delta: number;
  unit: string;
};

type EvidenceReceipt = {
  receiptId: string;
  subjectType: "KPI" | "TILE" | "EVENT";
  subjectId: string;
  periodStart: string;
  periodEnd: string;
  grain: string;
  freshnessTs: string;
  confidence: number;
  verificationStatus: VerificationStatus;
  owner: string;
  approver: string;
  artifacts: Artifact[];
  transforms: Transform[];
  dq: {
    suite: string;
    version: string;
    ranAt: string;
    status: "PASS" | "WARN" | "FAIL";
    tests: DqTest[];
  };
  reconciliation: Reconciliation[];
  auditLog: { at: string; actor: string; action: string; note?: string }[];
};

const INITIAL_MOCK: EvidenceReceipt[] = [
  {
    receiptId: "RCP-2026-01-KPI_TOTAL_COST_PMPM-0007",
    subjectType: "KPI",
    subjectId: "KPI_TOTAL_COST_PMPM",
    periodStart: "2026-01-01",
    periodEnd: "2026-01-31",
    grain: "employer_month",
    freshnessTs: "2026-01-26T08:14:22Z",
    confidence: 0.92,
    verificationStatus: "VERIFIED",
    owner: "Benefits Finance Lead",
    approver: "CFO",
    artifacts: [
      {
        id: "ART-834-0012",
        sourceSystem: "Carrier",
        sourceType: "834",
        uri: "@raw_stage/elig/2026/01/834_20260115.csv.gz",
        fileName: "834_20260115.csv.gz",
        checksum: "sha256:9f3a…c2d1",
        loadedAt: "2026-01-15T03:02:11Z",
        rowCount: 18244,
      },
      {
        id: "ART-837-0041",
        sourceSystem: "TPA",
        sourceType: "837",
        uri: "@raw_stage/claims/2026/01/837_20260120.parquet",
        fileName: "837_20260120.parquet",
        checksum: "sha256:2aa1…91bd",
        loadedAt: "2026-01-20T03:44:10Z",
        rowCount: 771230,
      },
      {
        id: "ART-PBM-0009",
        sourceSystem: "PBM",
        sourceType: "PBM_DETAIL",
        uri: "@raw_stage/pbm/2026/01/pbm_detail_20260118.csv",
        fileName: "pbm_detail_20260118.csv",
        checksum: "sha256:8baf…d021",
        loadedAt: "2026-01-18T02:12:10Z",
        rowCount: 44211,
      },
    ],
    transforms: [
      {
        id: "TRN-CLM-NORM-001",
        name: "CORE3_CLAIMS_NORMALIZE",
        version: "v1.3.8+git.1f2a9c",
        codeHash: "sha256:73c8…0d9e",
        queryId: "01a1b2c3-0405-0607-0809-0a0b0c0d0e0f",
        ranAt: "2026-01-26T07:41:02Z",
        ranBy: "svc_kincaid_iq",
        warehouse: "WH_CORE3_XS",
      },
      {
        id: "TRN-KPI-PMPM-009",
        name: "KPI_TOTAL_COST_PMPM_BUILD",
        version: "v2.0.1+git.8aa112",
        codeHash: "sha256:11a2…f44b",
        queryId: "0f0e0d0c-0b0a-0908-0706-0504030201aa",
        ranAt: "2026-01-26T07:56:19Z",
        ranBy: "svc_kincaid_iq",
        warehouse: "WH_CORE3_XS",
      },
    ],
    dq: {
      suite: "CORE3_MIN_QUALITY_GATE",
      version: "v1",
      ranAt: "2026-01-26T08:00:01Z",
      status: "PASS",
      tests: [
        { name: "Row count non-zero", status: "PASS" },
        { name: "Null member_id rate < 0.1%", status: "PASS" },
        { name: "Duplicate claim_line keys = 0", status: "PASS" },
        { name: "Eligibility termination sanity", status: "PASS" },
      ],
    },
    reconciliation: [
      {
        name: "Paid claims total vs funding wire (month)",
        status: "PASS",
        expected: 2419921.55,
        actual: 2419800.12,
        delta: -121.43,
        unit: "USD",
      },
      {
        name: "PBM net vs invoice subtotal",
        status: "WARN",
        expected: 412331.22,
        actual: 413028.17,
        delta: 696.95,
        unit: "USD",
      },
    ],
    auditLog: [
      { at: "2026-01-26T08:01:00Z", actor: "svc_kincaid_iq", action: "DQ_SUITE_RUN", note: "CORE3_MIN_QUALITY_GATE v1" },
      { at: "2026-01-26T08:02:10Z", actor: "svc_kincaid_iq", action: "RECEIPT_EMITTED", note: "VERIFIED (confidence 0.92)" },
      { at: "2026-01-26T08:04:10Z", actor: "Benefits Finance Lead", action: "OWNER_ATTESTATION", note: "Reviewed reconciliation + variance note" },
      { at: "2026-01-26T08:06:22Z", actor: "CFO", action: "APPROVAL_SIGNOFF", note: "Approved for exec reporting" },
    ],
  },
];

function classNames(...xs: Array<string | undefined | false>) {
  return xs.filter(Boolean).join(" ");
}

export default function EvidenceReceiptsPage() {
  const [receipts, setReceipts] = useState<EvidenceReceipt[]>(INITIAL_MOCK);
  const [selectedId, setSelectedId] = useState<string>(INITIAL_MOCK[0].receiptId);
  const [createOpen, setCreateOpen] = useState(false);
  const [tab, setTab] = useState<
    "overview" | "lineage" | "artifacts" | "transforms" | "dq" | "recon" | "audit"
  >("overview");
  const [showExplanation, setShowExplanation] = useState(true);

  const selected = useMemo(() => receipts.find((r) => r.receiptId === selectedId) || receipts[0], [receipts, selectedId]);
  const confidencePct = useMemo(() => Math.round(selected.confidence * 100), [selected.confidence]);

  const statusConfig: Record<VerificationStatus, { label: string; icon: React.ReactNode; bg: string; text: string }> = {
    VERIFIED: {
      label: "Verified",
      icon: <CheckCircle2 className="h-4 w-4" />,
      bg: "bg-emerald-500/20",
      text: "text-emerald-300",
    },
    PARTIAL: {
      label: "Partial",
      icon: <AlertTriangle className="h-4 w-4" />,
      bg: "bg-amber-500/20",
      text: "text-amber-300",
    },
    BLOCKED: {
      label: "Blocked",
      icon: <XCircle className="h-4 w-4" />,
      bg: "bg-red-500/20",
      text: "text-red-300",
    },
  };

  const cfg = statusConfig[selected.verificationStatus];

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "lineage", label: "Lineage Graph" },
    { key: "artifacts", label: "Artifacts" },
    { key: "transforms", label: "Transforms" },
    { key: "dq", label: "Data Quality" },
    { key: "recon", label: "Reconciliation" },
    { key: "audit", label: "Audit Log" },
  ] as const;

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(selected, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selected.receiptId}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO
        title="Evidence Receipts | Kincaid IQ"
        description="Blockchain-backed evidence receipts for verifiable business outcomes"
      />
      <div className="relative min-h-screen bg-gradient-to-b from-purple-950 via-purple-900 to-black text-white overflow-hidden">
        <PremiumBackground />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header with Vegas Luxury Styling */}
          <div className="mb-8 flex flex-col md:flex-row items-start justify-between backdrop-blur-xl bg-gradient-to-br from-purple-900/40 via-black/40 to-black/40 rounded-3xl border border-purple-500/20 p-8 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="relative z-10 mb-6 md:mb-0">
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                Evidence Receipts
              </h1>
              <p className="mt-3 text-lg text-purple-200/70 max-w-2xl">
                Audit-grade evidence with full data lineage, DQ gates, and reconciliation proofs.
              </p>
            </div>
            <button
              onClick={() => setCreateOpen(true)}
              className="relative flex items-center gap-2 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-xl px-6 py-3 text-sm font-semibold hover:from-purple-500/30 hover:to-purple-600/30 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 group/btn overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
              <Download className="h-4 w-4 relative z-10 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span className="relative z-10">Create Receipt (Demo) 🧾</span>
            </button>
          </div>

          {/* Board-Level Value Proposition Section */}
          {showExplanation && (
            <div className="mb-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 via-black/40 to-black/40 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden hover:shadow-purple-500/20 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8">
                <button
                  onClick={() => setShowExplanation(false)}
                  className="absolute top-6 right-6 text-purple-300/40 hover:text-purple-300/80 transition-colors"
                >
                  ✕
                </button>
                
                {/* Header */}
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30">
                    <Shield className="h-4 w-4 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                    <span className="text-sm font-semibold text-purple-200">Board & Investment Grade Evidence</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                    Why Evidence Lineage is Mission-Critical
                  </h2>
                  <p className="text-lg text-purple-200/70 leading-relaxed max-w-4xl">
                    In an era of AI-driven decision making and billion-dollar health benefits portfolios, <span className="font-semibold text-purple-100">verifiable data lineage</span> is the difference between defensible business intelligence and regulatory liability.
                  </p>
                </div>

                {/* Three-Column Value Props */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Fiduciary Protection */}
                  <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-6 backdrop-blur-sm hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-emerald-500/20 group/card">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
                        <Shield className="h-5 w-5 text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                      </div>
                      <h3 className="text-lg font-bold text-emerald-200">Fiduciary Protection</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Board members and plan fiduciaries face <span className="font-semibold text-white">personal liability</span> under ERISA. Evidence receipts provide a complete audit trail proving due diligence in vendor selection and benefit decisions.
                    </p>
                  </div>

                  {/* Investment Due Diligence */}
                  <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent p-6 backdrop-blur-sm hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20 group/card">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
                        <FileCheck className="h-5 w-5 text-blue-300 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                      </div>
                      <h3 className="text-lg font-bold text-blue-200">Investment DD Excellence</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Private equity and venture capital groups demand <span className="font-semibold text-white">forensic-grade data quality</span> during acquisitions. Receipts provide blockchain-backed proof of savings calculations.
                    </p>
                  </div>

                  {/* Regulatory Compliance */}
                  <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent p-6 backdrop-blur-sm hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/20 group/card">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
                        <CheckCircle2 className="h-5 w-5 text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                      </div>
                      <h3 className="text-lg font-bold text-purple-200">Multi-Framework Compliance</h3>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      Simultaneous compliance with <span className="font-semibold text-white">SOX 404, HIPAA Security Rule, SOC 2 Type II, GDPR, and NIST 800-53</span> through automated evidence collection and immutable audit trails.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Receipt Selector with Vegas Luxury Styling */}
          <div className="mb-6">
            <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              <div className="relative z-10">
                <div className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple-300/70 flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Available Receipts ({receipts.length})
                </div>
                <div className="flex flex-wrap gap-4">
                  {receipts.map((r) => {
                    const isSelected = r.receiptId === selectedId;
                    const rCfg = statusConfig[r.verificationStatus];
                    return (
                      <button
                        key={r.receiptId}
                        onClick={() => setSelectedId(r.receiptId)}
                        className={classNames(
                          "group/receipt relative flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all duration-500 hover:scale-105 overflow-hidden",
                          isSelected
                            ? "border-purple-500/50 bg-gradient-to-br from-purple-500/20 to-purple-600/10 shadow-lg shadow-purple-500/30 backdrop-blur-xl"
                            : "border-white/10 bg-white/5 backdrop-blur-xl hover:border-purple-500/30 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20"
                        )}
                      >
                        {isSelected && (
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-purple-600/50 rounded-2xl blur opacity-30 group-hover/receipt:opacity-50 transition-opacity duration-500" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 translate-x-[-100%] group-hover/receipt:translate-x-[100%] transition-transform duration-1000" />
                        <div className="relative z-10 w-full">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-mono text-purple-300">{r.receiptId.split('-').pop()}</span>
                            <span className={classNames("flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold backdrop-blur-xl", rCfg.bg, rCfg.text)}>
                              {rCfg.icon}
                              {rCfg.label}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-white truncate max-w-[200px]">{r.subjectId}</div>
                          <div className="text-xs text-white/50 mt-1">
                            {r.periodStart} → {r.periodEnd}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Header with Vegas Luxury Design */}
          <div className="mb-6 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="relative z-10">
              <div className="mb-6 flex flex-col md:flex-row items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{selected.receiptId}</h2>
                    <span className={classNames("flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold backdrop-blur-xl", cfg.bg, cfg.text)}>
                      {cfg.icon}
                      {cfg.label}
                    </span>
                  </div>
                  <div className="text-sm text-purple-200/60">
                    {selected.subjectType} → {selected.subjectId}
                  </div>
                </div>
                <button
                  onClick={downloadJSON}
                  className="relative flex items-center gap-2 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-transparent backdrop-blur-xl px-5 py-2.5 text-sm font-semibold hover:from-purple-500/20 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 group/btn overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
                  <Download className="h-4 w-4 relative z-10 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                  <span className="relative z-10">Export JSON</span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6 text-sm md:grid-cols-4">
                <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl p-4 border border-purple-500/20 hover:border-purple-500/30 hover:scale-105 transition-all duration-500 group/card">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                  <div className="mb-2 text-xs uppercase tracking-wide text-purple-300/50 relative z-10">Period</div>
                  <div className="font-mono text-purple-100 font-semibold relative z-10">
                    {selected.periodStart} <br/> {selected.periodEnd}
                  </div>
                </div>
                <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl p-4 border border-purple-500/20 hover:border-purple-500/30 hover:scale-105 transition-all duration-500 group/card">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                  <div className="mb-2 text-xs uppercase tracking-wide text-purple-300/50 relative z-10">Grain</div>
                  <div className="font-mono text-purple-100 font-semibold relative z-10">{selected.grain}</div>
                </div>
                <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl p-4 border border-purple-500/20 hover:border-purple-500/30 hover:scale-105 transition-all duration-500 group/card">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                  <div className="mb-2 text-xs uppercase tracking-wide text-purple-300/50 relative z-10">Confidence</div>
                  <div className="font-mono text-purple-100 font-semibold text-2xl relative z-10">{confidencePct}%</div>
                </div>
                <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl p-4 border border-purple-500/20 hover:border-purple-500/30 hover:scale-105 transition-all duration-500 group/card">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                  <div className="mb-2 text-xs uppercase tracking-wide text-purple-300/50 relative z-10">Freshness</div>
                  <div className="font-mono text-purple-100 text-xs relative z-10">{new Date(selected.freshnessTs).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-purple-500/20 pt-6 text-sm">
                <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl p-4 border border-purple-500/20 hover:scale-105 transition-all duration-500">
                  <div className="mb-2 text-xs uppercase tracking-wide text-purple-300/50">Owner</div>
                  <div className="text-purple-100 font-semibold">{selected.owner}</div>
                </div>
                <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl p-4 border border-purple-500/20 hover:scale-105 transition-all duration-500">
                  <div className="mb-2 text-xs uppercase tracking-wide text-purple-300/50">Approver</div>
                  <div className="text-purple-100 font-semibold">{selected.approver}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs with Vegas Luxury Styling */}
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 backdrop-blur-xl">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={classNames(
                  "relative whitespace-nowrap rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-500 overflow-hidden group/tab",
                  tab === t.key
                    ? "bg-gradient-to-r from-purple-600/50 to-fuchsia-600/50 text-white shadow-lg scale-105 border border-purple-500/50"
                    : "text-purple-200/60 hover:bg-purple-500/10 hover:text-purple-200 border border-transparent hover:border-purple-500/20"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/20 to-purple-400/0 translate-x-[-100%] group-hover/tab:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content with Vegas Luxury Styling */}
          <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/30 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="relative z-10">
              {tab === "overview" && (
                <div className="space-y-8">
                  <div>
                    <h3 className="mb-6 text-2xl font-semibold text-white">Evidence Summary</h3>
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/20 group/card">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                        <div className="mb-3 text-sm text-purple-300/70 relative z-10">Artifacts</div>
                        <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-purple-200 to-fuchsia-400 bg-clip-text text-transparent relative z-10 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">{selected.artifacts.length}</div>
                      </div>
                      <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-blue-500/20 group/card">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                        <div className="mb-3 text-sm text-blue-300/70 relative z-10">Transforms</div>
                        <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-blue-200 to-cyan-400 bg-clip-text text-transparent relative z-10 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">{selected.transforms.length}</div>
                      </div>
                      <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent backdrop-blur-xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-emerald-500/20 group/card">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/10 to-emerald-400/0 translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
                        <div className="mb-3 text-sm text-emerald-300/70 relative z-10">DQ Tests</div>
                        <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-200 to-green-400 bg-clip-text text-transparent relative z-10 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">{selected.dq.tests.length}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-6 text-2xl font-semibold text-white">Receipt Viewer</h3>
                    <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 via-black/40 to-black/40 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/10">
                      {/* Receipt Header */}
                      <div className="mb-6 flex items-start justify-between border-b border-purple-500/20 pb-4">
                        <div>
                          <div className="mb-2 flex items-center gap-3">
                            <span className="text-2xl font-bold text-white">{selected.receiptId}</span>
                            <span className={classNames("flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", cfg.bg, cfg.text)}>
                              {cfg.icon}
                              {cfg.label}
                            </span>
                          </div>
                          <div className="text-sm text-purple-300/70">
                            {selected.subjectType} → {selected.subjectId}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-purple-300/50">Confidence</div>
                          <div className="text-3xl font-bold text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]">{confidencePct}%</div>
                        </div>
                      </div>

                      {/* Mini Lineage Flow */}
                      <div className="mb-6">
                        <div className="mb-3 text-sm font-semibold text-purple-300">Data Lineage Flow</div>
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                          {selected.artifacts.map((art, i) => (
                            <React.Fragment key={art.id}>
                              <div className="flex-shrink-0 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 hover:scale-105 transition-all duration-300">
                                <div className="text-xs font-semibold text-purple-200">{art.sourceType}</div>
                                <div className="text-[10px] text-purple-300/60">{art.rowCount?.toLocaleString()} rows</div>
                              </div>
                              {i < selected.artifacts.length - 1 && (
                                <div className="text-purple-400">→</div>
                              )}
                            </React.Fragment>
                          ))}
                          <div className="text-purple-400">→</div>
                          {selected.transforms.map((trn, i) => (
                            <React.Fragment key={trn.id}>
                              <div className="flex-shrink-0 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 hover:scale-105 transition-all duration-300">
                                <div className="text-xs font-semibold text-blue-200">{trn.name.slice(0, 20)}</div>
                                <div className="text-[10px] text-blue-300/60">{trn.version}</div>
                              </div>
                              {i < selected.transforms.length - 1 && (
                                <div className="text-blue-400">→</div>
                              )}
                            </React.Fragment>
                          ))}
                          <div className="text-emerald-400">→</div>
                          <div className="flex-shrink-0 rounded-lg border border-emerald-500/50 bg-emerald-500/20 px-4 py-2 hover:scale-105 transition-all duration-300">
                            <div className="text-xs font-bold text-emerald-200">RECEIPT</div>
                            <div className="text-[10px] text-emerald-300/70">{selected.verificationStatus}</div>
                          </div>
                        </div>
                      </div>

                      {/* Key Metrics Grid */}
                      <div className="mb-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 hover:border-purple-500/30 hover:scale-105 transition-all duration-300">
                          <div className="mb-2 text-xs uppercase tracking-wide text-purple-300/60">Source Artifacts</div>
                          <div className="text-2xl font-bold text-white">{selected.artifacts.length}</div>
                          <div className="mt-2 space-y-1">
                            {selected.artifacts.map((art) => (
                              <div key={art.id} className="flex items-center gap-2 text-xs text-purple-200/70">
                                <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                                {art.sourceType}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 hover:border-blue-500/30 hover:scale-105 transition-all duration-300">
                          <div className="mb-2 text-xs uppercase tracking-wide text-blue-300/60">Transform Pipeline</div>
                          <div className="text-2xl font-bold text-white">{selected.transforms.length}</div>
                          <div className="mt-2 space-y-1">
                            {selected.transforms.map((trn, i) => (
                              <div key={trn.id} className="flex items-center gap-2 text-xs text-blue-200/70">
                                <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20 text-[9px] font-bold text-blue-300">
                                  {i + 1}
                                </div>
                                {trn.name.slice(0, 18)}...
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-4 hover:border-emerald-500/30 hover:scale-105 transition-all duration-300">
                          <div className="mb-2 text-xs uppercase tracking-wide text-emerald-300/60">Quality Gates</div>
                          <div className="text-2xl font-bold text-white">
                            {selected.dq.tests.filter((t) => t.status === "PASS").length}/{selected.dq.tests.length}
                          </div>
                          <div className="mt-2 space-y-1">
                            {selected.dq.tests.map((test, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                {test.status === "PASS" ? (
                                  <CheckCircle2 className="h-3 w-3" />
                                ) : test.status === "WARN" ? (
                                  <AlertTriangle className="h-3 w-3" />
                                ) : (
                                  <XCircle className="h-3 w-3" />
                                )}
                                <span className="text-white/70">{test.name.slice(0, 20)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Reconciliation Summary */}
                      <div className="mb-6">
                        <div className="mb-3 text-sm font-semibold text-purple-300">Reconciliation Status</div>
                        <div className="space-y-3">
                          {selected.reconciliation.map((rec, i) => (
                            <div key={i} className="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4 hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-300">
                              <div className="mb-2 flex items-center justify-between">
                                <div className="text-sm font-semibold text-white">{rec.name}</div>
                                <span
                                  className={classNames(
                                    "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
                                    rec.status === "PASS"
                                      ? "bg-emerald-500/20 text-emerald-300"
                                      : rec.status === "WARN"
                                      ? "bg-amber-500/20 text-amber-300"
                                      : "bg-red-500/20 text-red-300"
                                  )}
                                >
                                  {rec.status === "PASS" ? (
                                    <CheckCircle2 className="h-3 w-3" />
                                  ) : rec.status === "WARN" ? (
                                    <AlertTriangle className="h-3 w-3" />
                                  ) : (
                                    <XCircle className="h-3 w-3" />
                                  )}
                                  {rec.status}
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <div className="text-xs text-purple-300/50">Expected</div>
                                  <div className="font-mono text-purple-100">
                                    {rec.expected.toLocaleString()} {rec.unit}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-purple-300/50">Actual</div>
                                  <div className="font-mono text-purple-100">
                                    {rec.actual.toLocaleString()} {rec.unit}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs text-purple-300/50">Delta</div>
                                  <div
                                    className={classNames(
                                      "font-mono font-semibold",
                                      rec.delta > 0 ? "text-red-300" : rec.delta < 0 ? "text-emerald-300" : "text-purple-100"
                                    )}
                                  >
                                    {rec.delta > 0 ? "+" : ""}
                                    {rec.delta.toLocaleString()} {rec.unit}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer Metadata */}
                      <div className="border-t border-purple-500/20 pt-6">
                        <div className="grid gap-4 text-xs md:grid-cols-4">
                          <div>
                            <div className="mb-1 text-purple-300/50">Period</div>
                            <div className="font-mono text-purple-100">
                              {selected.periodStart} → {selected.periodEnd}
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 text-purple-300/50">Grain</div>
                            <div className="font-mono text-purple-100">{selected.grain}</div>
                          </div>
                          <div>
                            <div className="mb-1 text-purple-300/50">Owner</div>
                            <div className="text-purple-100">{selected.owner}</div>
                          </div>
                          <div>
                            <div className="mb-1 text-purple-300/50">Freshness</div>
                            <div className="font-mono text-purple-100">{new Date(selected.freshnessTs).toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === "lineage" && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Data Lineage Graph</h3>
                  <svg viewBox="0 0 800 500" className="w-full rounded-xl border border-purple-500/20 bg-black/20 p-4">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#a855f7" />
                      </marker>
                    </defs>
                    {selected.artifacts.map((art, i) => {
                      const y = 50 + i * 80;
                      return (
                        <g key={art.id}>
                          <rect x="20" y={y} width="180" height="60" rx="8" fill="#9333ea" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
                          <text x="110" y={y + 25} textAnchor="middle" fill="#f3e8ff" fontSize="12" fontWeight="600">
                            {art.sourceType}
                          </text>
                          <text x="110" y={y + 42} textAnchor="middle" fill="#e9d5ff" fontSize="10">
                            {art.fileName.slice(0, 20)}
                          </text>
                          <line x1="200" y1={y + 30} x2="250" y2="250" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        </g>
                      );
                    })}
                    {selected.transforms.map((trn, i) => {
                      const y = 150 + i * 100;
                      return (
                        <g key={trn.id}>
                          <rect x="270" y={y} width="200" height="70" rx="8" fill="#9333ea" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2" />
                          <text x="370" y={y + 30} textAnchor="middle" fill="#f3e8ff" fontSize="12" fontWeight="600">
                            {trn.name.slice(0, 24)}
                          </text>
                          <text x="370" y={y + 48} textAnchor="middle" fill="#e9d5ff" fontSize="10">
                            {trn.version}
                          </text>
                          <line x1="470" y1={y + 35} x2="520" y2="250" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        </g>
                      );
                    })}
                    <rect x="540" y="220" width="220" height="80" rx="12" fill="#10b981" fillOpacity="0.2" stroke="#34d399" strokeWidth="3" />
                    <text x="650" y="250" textAnchor="middle" fill="#d1fae5" fontSize="14" fontWeight="700">
                      Receipt
                    </text>
                    <text x="650" y="270" textAnchor="middle" fill="#a7f3d0" fontSize="11">
                      {selected.receiptId.slice(0, 30)}
                    </text>
                    <text x="650" y="288" textAnchor="middle" fill="#6ee7b7" fontSize="10">
                      {selected.verificationStatus} • {confidencePct}%
                    </text>
                  </svg>
                </div>
              )}

              {tab === "artifacts" && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Source Artifacts</h3>
                  <div className="space-y-4">
                    {selected.artifacts.map((art) => (
                      <div key={art.id} className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-500">
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <div className="mb-1 font-mono text-sm text-purple-300">{art.id}</div>
                            <div className="font-semibold">{art.fileName}</div>
                          </div>
                          <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-semibold text-purple-200">
                            {art.sourceType}
                          </span>
                        </div>
                        <div className="grid gap-3 text-sm md:grid-cols-2">
                          <div>
                            <span className="text-purple-300/70">System: </span>
                            <span className="font-mono text-purple-100">{art.sourceSystem}</span>
                          </div>
                          <div>
                            <span className="text-purple-300/70">Rows: </span>
                            <span className="font-mono text-purple-100">{art.rowCount?.toLocaleString() || "N/A"}</span>
                          </div>
                          <div>
                            <span className="text-purple-300/70">Loaded: </span>
                            <span className="font-mono text-purple-100">{new Date(art.loadedAt).toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-purple-300/70">Checksum: </span>
                            <span className="font-mono text-xs text-purple-100">{art.checksum}</span>
                          </div>
                        </div>
                        <div className="mt-3 border-t border-purple-500/20 pt-3">
                          <div className="text-xs text-purple-300/70">URI</div>
                          <div className="font-mono text-xs text-purple-100">{art.uri}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "transforms" && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Transform Pipeline</h3>
                  <div className="space-y-4">
                    {selected.transforms.map((trn, i) => (
                      <div key={trn.id} className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-500">
                        <div className="mb-3 flex items-start justify-between">
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-200">
                                {i + 1}
                              </span>
                              <span className="font-mono text-sm text-purple-300">{trn.id}</span>
                            </div>
                            <div className="font-semibold">{trn.name}</div>
                          </div>
                          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200">
                            {trn.version}
                          </span>
                        </div>
                        <div className="grid gap-3 text-sm md:grid-cols-2">
                          <div>
                            <span className="text-purple-300/70">Warehouse: </span>
                            <span className="font-mono text-purple-100">{trn.warehouse}</span>
                          </div>
                          <div>
                            <span className="text-purple-300/70">Ran By: </span>
                            <span className="font-mono text-purple-100">{trn.ranBy}</span>
                          </div>
                          <div>
                            <span className="text-purple-300/70">Ran At: </span>
                            <span className="font-mono text-purple-100">{new Date(trn.ranAt).toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-purple-300/70">Query ID: </span>
                            <span className="font-mono text-xs text-purple-100">{trn.queryId}</span>
                          </div>
                        </div>
                        <div className="mt-3 border-t border-purple-500/20 pt-3">
                          <div className="text-xs text-purple-300/70">Code Hash</div>
                          <div className="font-mono text-xs text-purple-100">{trn.codeHash}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "dq" && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Data Quality Suite</h3>
                  <div className="mb-6 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 hover:border-purple-500/30 transition-all duration-500">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="mb-1 font-semibold">{selected.dq.suite}</div>
                        <div className="text-sm text-purple-200/60">Version {selected.dq.version}</div>
                      </div>
                      <span
                        className={classNames(
                          "rounded-full px-3 py-1 text-sm font-semibold",
                          selected.dq.status === "PASS"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : selected.dq.status === "WARN"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-red-500/20 text-red-300"
                        )}
                      >
                        {selected.dq.status}
                      </span>
                    </div>
                    <div className="text-sm text-purple-200/70">
                      Ran At: {new Date(selected.dq.ranAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {selected.dq.tests.map((test, i) => (
                      <div key={i} className="flex items-center justify-between rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-500">
                        <div>
                          <div className="font-semibold">{test.name}</div>
                          {test.details && <div className="mt-1 text-sm text-purple-200/60">{test.details}</div>}
                        </div>
                        <span
                          className={classNames(
                            "flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold",
                            test.status === "PASS"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : test.status === "WARN"
                              ? "bg-amber-500/20 text-amber-300"
                              : "bg-red-500/20 text-red-300"
                          )}
                        >
                          {test.status === "PASS" ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : test.status === "WARN" ? (
                            <AlertTriangle className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          {test.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "recon" && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Reconciliation Checks</h3>
                  <div className="space-y-4">
                    {selected.reconciliation.map((rec, i) => (
                      <div key={i} className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-500">
                        <div className="mb-3 flex items-start justify-between">
                          <div className="font-semibold">{rec.name}</div>
                          <span
                            className={classNames(
                              "flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold",
                              rec.status === "PASS"
                                ? "bg-emerald-500/20 text-emerald-300"
                                : rec.status === "WARN"
                                ? "bg-amber-500/20 text-amber-300"
                                : "bg-red-500/20 text-red-300"
                            )}
                          >
                            {rec.status === "PASS" ? (
                              <CheckCircle2 className="h-4 w-4" />
                            ) : rec.status === "WARN" ? (
                              <AlertTriangle className="h-4 w-4" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                            {rec.status}
                          </span>
                        </div>
                        <div className="grid gap-4 text-sm md:grid-cols-3">
                          <div>
                            <div className="mb-1 text-xs uppercase tracking-wide text-purple-300/50">Expected</div>
                            <div className="font-mono text-lg font-bold text-purple-100">
                              {rec.expected.toLocaleString()} {rec.unit}
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 text-xs uppercase tracking-wide text-purple-300/50">Actual</div>
                            <div className="font-mono text-lg font-bold text-purple-100">
                              {rec.actual.toLocaleString()} {rec.unit}
                            </div>
                          </div>
                          <div>
                            <div className="mb-1 text-xs uppercase tracking-wide text-purple-300/50">Delta</div>
                            <div
                              className={classNames(
                                "font-mono text-lg font-bold",
                                rec.delta > 0 ? "text-red-300" : rec.delta < 0 ? "text-emerald-300" : "text-purple-100"
                              )}
                            >
                              {rec.delta > 0 ? "+" : ""}
                              {rec.delta.toLocaleString()} {rec.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === "audit" && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Audit Log</h3>
                  <div className="space-y-3">
                    {selected.auditLog.map((log, i) => (
                      <div key={i} className="flex gap-4 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 hover:border-purple-500/30 hover:scale-[1.02] transition-all duration-500">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-200">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-3">
                            <span className="font-semibold">{log.action}</span>
                            <span className="text-sm text-purple-200/60">{log.actor}</span>
                          </div>
                          {log.note && <div className="mb-2 text-sm text-purple-200/70">{log.note}</div>}
                          <div className="text-xs font-mono text-purple-300/50">
                            {new Date(log.at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />

        <CreateReceiptModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          subjectType={selected.subjectType}
          subjectId={selected.subjectId}
          periodStart={selected.periodStart}
          periodEnd={selected.periodEnd}
          grain={selected.grain}
          onApplyReceipt={(r: any) => {
            const newReceipt: EvidenceReceipt = {
              receiptId: r.receipt_id,
              subjectType: r.subject.type,
              subjectId: r.subject.id,
              periodStart: r.subject.period_start,
              periodEnd: r.subject.period_end,
              grain: r.subject.grain,
              freshnessTs: r.verification.freshness_ts,
              confidence: r.verification.confidence_score,
              verificationStatus: r.verification.status,
              owner: r.verification.owner,
              approver: r.verification.approver,
              artifacts: r.evidence.internal_artifacts.map((a: any) => ({
                id: a.artifact_id || `ART-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                sourceSystem: a.source_system,
                sourceType: a.source_type,
                uri: a.storage_uri,
                fileName: a.storage_uri.split("/").pop() || "unknown",
                checksum: a.checksum_sha256 || "sha256:unknown",
                loadedAt: a.loaded_at,
                rowCount: a.row_count,
              })),
              transforms: r.evidence.transforms.map((t: any) => ({
                id: t.transform_id || `TRN-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                name: t.name,
                version: t.version,
                codeHash: t.code_hash_sha256 || t.code_hash,
                queryId: t.query_id,
                ranAt: t.ran_at,
                ranBy: t.ran_by || "svc_kincaid_iq",
                warehouse: t.warehouse || "WH_CORE3_XS",
              })),
              dq: {
                suite: r.evidence.dq.suite,
                version: r.evidence.dq.version,
                ranAt: r.verification.freshness_ts,
                status: r.evidence.dq.status,
                tests: r.evidence.dq.tests.map((test: any) => ({
                  name: test.name,
                  status: test.status,
                  details: test.details,
                })),
              },
              reconciliation: r.evidence.reconciliation.map((rec: any) => ({
                name: rec.name,
                status: rec.status,
                expected: rec.expected,
                actual: rec.actual,
                delta: rec.delta,
                unit: rec.unit,
              })),
              auditLog: [
                {
                  at: new Date().toISOString(),
                  actor: "system",
                  action: "RECEIPT_CREATED",
                  note: "Created via demo modal",
                },
              ],
            };
            setReceipts((prev) => [newReceipt, ...prev]);
            setSelectedId(newReceipt.receiptId);
            setCreateOpen(false);
          }}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </>
  );
}