"use client";

import React, { useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CheckCircle2, AlertTriangle, XCircle, Download, ExternalLink } from "lucide-react";
import { CreateReceiptModal } from "@/components/ledger/CreateReceiptModal";

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
        title="Evidence Receipts | SiriusB iQ"
        description="Audit-grade evidence receipts with full data lineage, DQ gates, and reconciliation proofs"
      />
      <div className="relative min-h-screen bg-[#0A0118] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <Nav />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Evidence Receipts</h1>
              <p className="mt-2 text-lg text-purple-200/60">
                Audit-grade evidence with full data lineage, DQ gates, and reconciliation proofs.
              </p>
            </div>
            <button
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Create Receipt (Demo) 🧾
            </button>
          </div>

          {/* Receipt Selector */}
          <div className="mb-6">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6">
              <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-purple-300/70">
                Available Receipts ({receipts.length})
              </div>
              <div className="flex flex-wrap gap-3">
                {receipts.map((r) => {
                  const isSelected = r.receiptId === selectedId;
                  const rCfg = statusConfig[r.verificationStatus];
                  return (
                    <button
                      key={r.receiptId}
                      onClick={() => setSelectedId(r.receiptId)}
                      className={classNames(
                        "group relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all",
                        isSelected
                          ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                          : "border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-purple-300">{r.receiptId}</span>
                        <span className={classNames("flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", rCfg.bg, rCfg.text)}>
                          {rCfg.icon}
                          {rCfg.label}
                        </span>
                      </div>
                      <div className="text-sm font-semibold">{r.subjectId}</div>
                      <div className="text-xs text-white/50">
                        {r.periodStart} → {r.periodEnd}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Receipt Header */}
          <div className="mb-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <h2 className="text-2xl font-bold">{selected.receiptId}</h2>
                  <span className={classNames("flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold", cfg.bg, cfg.text)}>
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
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Export JSON
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-purple-300/50">Period</div>
                <div className="font-mono text-purple-100">
                  {selected.periodStart} → {selected.periodEnd}
                </div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-purple-300/50">Grain</div>
                <div className="font-mono text-purple-100">{selected.grain}</div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-purple-300/50">Confidence</div>
                <div className="font-mono text-purple-100">{confidencePct}%</div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-purple-300/50">Freshness</div>
                <div className="font-mono text-purple-100">{new Date(selected.freshnessTs).toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-sm">
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-purple-300/50">Owner</div>
                <div className="text-purple-100">{selected.owner}</div>
              </div>
              <div>
                <div className="mb-1 text-xs uppercase tracking-wide text-purple-300/50">Approver</div>
                <div className="text-purple-100">{selected.approver}</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-2 overflow-x-auto border-b border-white/10 pb-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={classNames(
                  "whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                  tab === t.key
                    ? "bg-purple-500/20 text-purple-200"
                    : "text-purple-200/60 hover:bg-white/5 hover:text-purple-200"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-6">
            {tab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Evidence Summary</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="mb-2 text-sm text-purple-300/70">Artifacts</div>
                      <div className="text-3xl font-bold">{selected.artifacts.length}</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="mb-2 text-sm text-purple-300/70">Transforms</div>
                      <div className="text-3xl font-bold">{selected.transforms.length}</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="mb-2 text-sm text-purple-300/70">DQ Tests</div>
                      <div className="text-3xl font-bold">{selected.dq.tests.length}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-semibold">Kincaid IQ Embed</h3>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
                    <iframe
                      src="https://app.kincaid.io/embed/receipt-demo"
                      className="h-[600px] w-full"
                      title="Kincaid iQ Receipt Demo"
                      sandbox="allow-scripts allow-same-origin"
                    />
                    <div className="border-t border-white/10 bg-white/5 p-4 text-center text-sm text-purple-200/60">
                      If you see a blank frame, the embed may be blocked. See static snapshot above.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "lineage" && (
              <div>
                <h3 className="mb-4 text-xl font-semibold">Data Lineage Graph</h3>
                <svg viewBox="0 0 800 500" className="w-full rounded-xl border border-white/10 bg-black/20 p-4">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill="#a78bfa" />
                    </marker>
                  </defs>
                  {selected.artifacts.map((art, i) => {
                    const y = 50 + i * 80;
                    return (
                      <g key={art.id}>
                        <rect x="20" y={y} width="180" height="60" rx="8" fill="#7c3aed" fillOpacity="0.2" stroke="#a78bfa" strokeWidth="2" />
                        <text x="110" y={y + 25} textAnchor="middle" fill="#e9d5ff" fontSize="12" fontWeight="600">
                          {art.sourceType}
                        </text>
                        <text x="110" y={y + 42} textAnchor="middle" fill="#c4b5fd" fontSize="10">
                          {art.fileName.slice(0, 20)}
                        </text>
                        <line x1="200" y1={y + 30} x2="250" y2="250" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#arrowhead)" />
                      </g>
                    );
                  })}
                  {selected.transforms.map((trn, i) => {
                    const y = 150 + i * 100;
                    return (
                      <g key={trn.id}>
                        <rect x="270" y={y} width="200" height="70" rx="8" fill="#6366f1" fillOpacity="0.2" stroke="#818cf8" strokeWidth="2" />
                        <text x="370" y={y + 30} textAnchor="middle" fill="#e0e7ff" fontSize="12" fontWeight="600">
                          {trn.name.slice(0, 24)}
                        </text>
                        <text x="370" y={y + 48} textAnchor="middle" fill="#c7d2fe" fontSize="10">
                          {trn.version}
                        </text>
                        <line x1="470" y1={y + 35} x2="520" y2="250" stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrowhead)" />
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
                    <div key={art.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
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
                      <div className="mt-3 border-t border-white/10 pt-3">
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
                    <div key={trn.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
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
                      <div className="mt-3 border-t border-white/10 pt-3">
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
                <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
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
                  <div className="text-sm text-purple-200/60">
                    Ran At: {new Date(selected.dq.ranAt).toLocaleString()}
                  </div>
                </div>
                <div className="space-y-3">
                  {selected.dq.tests.map((test, i) => (
                    <div key={i} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
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
                    <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4">
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
                    <div key={i} className="flex gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
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
                ranAt: r.verification.freshness_ts, // Fallback as dq.ran_at might be missing
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
    </>
  );
}