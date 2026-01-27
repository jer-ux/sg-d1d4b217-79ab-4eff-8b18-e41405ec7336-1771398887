"use client";

import React, { useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CreateReceiptModal } from "@/components/ledger/CreateReceiptModal";

type VerificationStatus = "VERIFIED" | "PARTIAL" | "BLOCKED";

type Artifact = {
  id: string;
  sourceSystem: string;
  sourceType: string; // 834/835/837/PBM/etc
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
  confidence: number; // 0-1
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

const MOCK: EvidenceReceipt[] = [
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

function StatusPill({ status }: { status: VerificationStatus }) {
  const styles =
    status === "VERIFIED"
      ? "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/30"
      : status === "PARTIAL"
      ? "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/30"
      : "bg-rose-500/15 text-rose-200 ring-1 ring-rose-500/30";

  return (
    <span className={classNames("px-2 py-1 rounded-full text-xs font-semibold tracking-wide", styles)}>
      {status}
    </span>
  );
}

function MetricBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-xs text-white/60">{label}</div>
      <div className="text-sm font-semibold text-white">{value}</div>
    </div>
  );
}

function LineageGraph({ receipt }: { receipt: EvidenceReceipt }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-white">Lineage Graph</div>
        <div className="text-xs text-white/60">Artifacts → Transforms → Evidence Receipt</div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <svg width={920} height={220} className="min-w-[920px]">
          {receipt.artifacts.slice(0, 6).map((a, i) => (
            <g key={a.id} transform={`translate(20, ${20 + i * 32})`}>
              <rect rx="8" width="260" height="26" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
              <text x="10" y="17" fontSize="11" fill="rgba(255,255,255,0.85)">
                {a.sourceType} • {a.fileName.length > 24 ? a.fileName.slice(0, 24) + "…" : a.fileName}
              </text>
            </g>
          ))}

          {receipt.transforms.slice(0, 6).map((t, i) => (
            <g key={t.id} transform={`translate(340, ${40 + i * 32})`}>
              <rect rx="8" width="300" height="26" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" />
              <text x="10" y="17" fontSize="11" fill="rgba(255,255,255,0.85)">
                {t.name} ({t.version})
              </text>
            </g>
          ))}

          <g transform="translate(700, 92)">
            <rect rx="10" width="200" height="44" fill="rgba(16,185,129,0.10)" stroke="rgba(16,185,129,0.35)" />
            <text x="12" y="18" fontSize="11" fill="rgba(255,255,255,0.92)">
              Evidence Receipt
            </text>
            <text x="12" y="34" fontSize="10" fill="rgba(255,255,255,0.70)">
              {receipt.receiptId.length > 18 ? receipt.receiptId.slice(0, 18) + "…" : receipt.receiptId}
            </text>
          </g>

          {receipt.artifacts.slice(0, 6).map((a, i) => (
            <line
              key={"edgeA" + a.id}
              x1={280}
              y1={33 + i * 32}
              x2={340}
              y2={53 + (i % receipt.transforms.length) * 32}
              stroke="rgba(255,255,255,0.14)"
            />
          ))}
          {receipt.transforms.slice(0, 6).map((t, i) => (
            <line
              key={"edgeT" + t.id}
              x1={640}
              y1={53 + i * 32}
              x2={700}
              y2={114}
              stroke="rgba(255,255,255,0.14)"
            />
          ))}
        </svg>
      </div>

      <div className="mt-3 text-xs text-white/55">
        Real prod would render full DAG + query IDs; this demo shows the receipt inheritance model.
      </div>
    </div>
  );
}

function IframeOrFallback({
  src,
  fallbackImg,
  title,
}: {
  src: string;
  fallbackImg: string;
  title: string;
}) {
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/10">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="flex items-center gap-2">
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
          >
            Open live ↗
          </a>
        </div>
      </div>

      {!blocked ? (
        <iframe
          src={src}
          className="w-full h-[520px] bg-black"
          title={title}
          onLoad={() => {
            // If the site blocks framing, browser won't always fire a clean error.
            // So we provide a manual fallback control below.
          }}
        />
      ) : (
        <div className="p-4">
          <div className="text-xs text-white/60 mb-3">
            Framing is blocked by site headers (X-Frame-Options / CSP). Showing snapshot instead.
          </div>
          <img
            src={fallbackImg}
            alt="Kincaid IQ snapshot"
            className="w-full rounded-xl border border-white/10"
          />
        </div>
      )}

      <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between gap-3">
        <div className="text-xs text-white/60">
          If the embed is blank, click "Use snapshot" (framing is likely blocked).
        </div>
        <button
          onClick={() => setBlocked(true)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
        >
          Use snapshot
        </button>
      </div>
    </div>
  );
}

export default function EvidenceReceiptsPage() {
  const [selected, setSelected] = useState<EvidenceReceipt>(MOCK[0]);
  const [tab, setTab] = useState<
    "overview" | "lineage" | "artifacts" | "transforms" | "dq" | "recon" | "audit"
  >("overview");
  const [createOpen, setCreateOpen] = useState(false);

  const confidencePct = useMemo(() => Math.round(selected.confidence * 100), [selected.confidence]);

  return (
    <>
      <SEO
        title="Evidence Receipts • SiriusB iQ"
        description="Audit-grade lineage you can defend in the boardroom. Every KPI backed by cryptographically verifiable evidence receipts."
      />
      <Nav />
      <div className="min-h-screen bg-[#070B12] text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold tracking-wider text-white/60">
              KINCAID IQ • EVIDENCE RECEIPTS
            </div>
            <div className="text-2xl font-semibold">
              Audit-grade lineage you can defend in the boardroom 🧾
            </div>
            <div className="text-sm text-white/65 max-w-3xl">
              Every KPI, tile, and arbitrage event is backed by an Evidence Receipt: source artifacts,
              transform hashes, data-quality gates, reconciliation checks, and signoff.
              No receipt → no metric. Period.
            </div>

            <button
              onClick={() => setCreateOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
            >
              Create Receipt (Demo) 🧾
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Current Receipt</div>
                <StatusPill status={selected.verificationStatus} />
              </div>
              <div className="mt-3 text-xs text-white/60">Receipt ID</div>
              <div className="mt-1 font-mono text-sm text-white/90 break-all">{selected.receiptId}</div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <MetricBadge label="Subject" value={`${selected.subjectType}: ${selected.subjectId}`} />
                <MetricBadge label="Grain" value={selected.grain} />
                <MetricBadge label="Period" value={`${selected.periodStart} → ${selected.periodEnd}`} />
                <MetricBadge label="Confidence" value={`${confidencePct}%`} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold">What makes this "CFO-grade"</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• Immutable artifact signatures + ingestion timestamps</li>
                <li>• Transform hash + query ID ties output to exact logic</li>
                <li>• DQ suite gates VERIFIED / PARTIAL / BLOCKED</li>
                <li>• Reconciliation proves dollars tie to finance reality</li>
                <li>• Owner + approver signoff = accountable truth</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.02] p-5">
              <div className="text-sm font-semibold">Receipt Selector (demo)</div>
              <div className="mt-3 text-xs text-white/60">
                In prod: filter by KPI, client, plan, period, status, confidence.
              </div>
              <button
                className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold hover:bg-white/10"
                onClick={() => setSelected(MOCK[0])}
              >
                KPI_TOTAL_COST_PMPM • Jan 2026
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {[
              ["overview", "Overview"],
              ["lineage", "Lineage Graph"],
              ["artifacts", "Artifacts"],
              ["transforms", "Transforms"],
              ["dq", "Data Quality"],
              ["recon", "Reconciliation"],
              ["audit", "Audit Log"],
            ].map(([k, label]) => (
              <button
                key={k}
                onClick={() => setTab(k as any)}
                className={classNames(
                  "rounded-xl px-4 py-2 text-sm font-semibold border",
                  tab === k
                    ? "bg-white/10 border-white/20"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            {tab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold">Receipt Summary</div>
                  <div className="mt-3 text-sm text-white/70 space-y-2">
                    <div>
                      Freshness: <span className="font-mono text-white/90">{selected.freshnessTs}</span>
                    </div>
                    <div>
                      Artifacts: <span className="text-white/90">{selected.artifacts.length}</span> sources
                    </div>
                    <div>
                      Transforms: <span className="text-white/90">{selected.transforms.length}</span> steps
                    </div>
                    <div>
                      DQ Suite: <span className="text-white/90">{selected.dq.suite}</span> ({selected.dq.status})
                    </div>
                    <div>
                      Owner/Approver: <span className="text-white/90">{selected.owner}</span> →{" "}
                      <span className="text-white/90">{selected.approver}</span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-4">
                    <div className="text-xs font-semibold text-white/60 mb-2">Hard Gate</div>
                    <div className="text-sm text-white/80">
                      VERIFIED requires: DQ PASS/WARN policy + confidence ≥ threshold + freshness within SLA + reconciliation within tolerance.
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold">Executive Interpretation</div>
                  <div className="mt-3 text-sm text-white/70">
                    This receipt supports the KPI output and makes it defensible:
                    the numbers can be reproduced from the exact artifacts listed, using the exact transforms listed,
                    and are gated by explicit tests. If anything fails, status downgrades automatically.
                  </div>

                  <div className="mt-5 grid grid-cols-1 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs text-white/60">Risk posture</div>
                      <div className="text-sm font-semibold">
                        {selected.reconciliation.some(r => r.status === "FAIL")
                          ? "Elevated (reconciliation failure)"
                          : selected.reconciliation.some(r => r.status === "WARN")
                          ? "Moderate (reconciliation variance)"
                          : "Low (reconciled)"}
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs text-white/60">Actionability</div>
                      <div className="text-sm font-semibold">Immediate drill-through to claim lines, invoices, eligibility rows</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {tab === "lineage" && <LineageGraph receipt={selected} />}

            {tab === "artifacts" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold">Artifacts</div>
                <div className="mt-3 grid grid-cols-1 gap-3">
                  {selected.artifacts.map((a) => (
                    <div key={a.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold text-sm">{a.sourceType} • {a.sourceSystem}</div>
                        <div className="text-xs text-white/60">{a.loadedAt}</div>
                      </div>
                      <div className="mt-2 text-sm text-white/70">
                        <div className="font-mono break-all text-xs text-white/70">{a.uri}</div>
                        <div className="mt-2 text-xs text-white/60">Checksum</div>
                        <div className="font-mono text-xs break-all">{a.checksum}</div>
                        {typeof a.rowCount === "number" && (
                          <div className="mt-2 text-xs text-white/60">Rows: <span className="text-white/85">{a.rowCount.toLocaleString()}</span></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "transforms" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold">Transforms</div>
                <div className="mt-3 grid grid-cols-1 gap-3">
                  {selected.transforms.map((t) => (
                    <div key={t.id} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-semibold text-sm">{t.name}</div>
                        <div className="text-xs text-white/60">{t.ranAt}</div>
                      </div>
                      <div className="mt-2 text-sm text-white/70 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <div className="text-xs text-white/60">Version</div>
                          <div className="font-mono text-xs">{t.version}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60">Query ID</div>
                          <div className="font-mono text-xs break-all">{t.queryId}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60">Code Hash</div>
                          <div className="font-mono text-xs break-all">{t.codeHash}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60">Warehouse / Actor</div>
                          <div className="text-xs">{t.warehouse} • <span className="font-mono">{t.ranBy}</span></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "dq" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">Data Quality Gate</div>
                  <span className="text-xs text-white/60">{selected.dq.suite} • {selected.dq.version}</span>
                </div>

                <div className="mt-3 rounded-xl border border-white/10 bg-black/20 p-4">
                  <div className="text-sm">
                    Status: <span className="font-semibold">{selected.dq.status}</span>
                  </div>
                  <div className="text-xs text-white/60 mt-1">Ran at {selected.dq.ranAt}</div>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2">
                  {selected.dq.tests.map((t) => (
                    <div key={t.name} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 flex items-center justify-between">
                      <div className="text-sm text-white/80">{t.name}</div>
                      <div className={classNames(
                        "text-xs font-semibold px-2 py-1 rounded-full border",
                        t.status === "PASS" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                        : t.status === "WARN" ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                        : "border-rose-500/30 bg-rose-500/10 text-rose-200"
                      )}>
                        {t.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "recon" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold">Reconciliation</div>
                <div className="mt-3 grid grid-cols-1 gap-3">
                  {selected.reconciliation.map((r) => (
                    <div key={r.name} className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold">{r.name}</div>
                        <div className={classNames(
                          "text-xs font-semibold px-2 py-1 rounded-full border",
                          r.status === "PASS" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                          : r.status === "WARN" ? "border-amber-500/30 bg-amber-500/10 text-amber-200"
                          : "border-rose-500/30 bg-rose-500/10 text-rose-200"
                        )}>
                          {r.status}
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm text-white/75">
                        <div>
                          <div className="text-xs text-white/60">Expected</div>
                          <div className="font-mono">{r.expected.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60">Actual</div>
                          <div className="font-mono">{r.actual.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60">Delta</div>
                          <div className="font-mono">{r.delta.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60">Unit</div>
                          <div>{r.unit}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "audit" && (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm font-semibold">Audit Log</div>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {selected.auditLog.map((e, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold">{e.action}</div>
                        <div className="text-xs text-white/60 font-mono">{e.at}</div>
                      </div>
                      <div className="mt-1 text-sm text-white/75">
                        <span className="text-white/60">Actor:</span> {e.actor}
                        {e.note ? <span className="text-white/60"> • Note:</span> : null} {e.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-10">
            <div className="text-xs font-semibold tracking-wider text-white/60">LIVE PRODUCT PROOF</div>
            <div className="mt-2 text-xl font-semibold">Snapshot of Kincaid IQ (kincaidrmc.com)</div>
            <div className="mt-2 text-sm text-white/65 max-w-3xl">
              This is a demo embed of the public site so viewers connect the governance engine (receipts) to the real
              Kincaid IQ interface. If framing is blocked, we fall back to a crisp snapshot image.
            </div>

            <div className="mt-4">
              <IframeOrFallback
                src={"https://kincaidrmc.com"}
                fallbackImg={"/kincaid-iq-snapshot.png"}
                title={"Kincaid IQ • Public Site Snapshot"}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <CreateReceiptModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        subjectType="KPI"
        subjectId="KPI_TOTAL_COST_PMPM"
        periodStart="2026-01-01"
        periodEnd="2026-01-31"
        grain="employer_month"
      />
    </>
  );
}