import { useState, useMemo, useActionState, useTransition } from "react";
import { X, Download, CheckCircle2, AlertTriangle, XCircle, ExternalLink } from "lucide-react";

type ExternalArtifact = {
  id: string;
  authority: "SEC.gov" | "CMS.gov" | "Other";
  label: string;
  url: string;
  artifactType: "EXTERNAL_AUTHORITATIVE_POINTER";
};

type ReceiptJson = {
  receipt_id: string;
  subject: {
    type: "KPI" | "TILE" | "EVENT";
    id: string;
    period_start: string;
    period_end: string;
    grain: string;
  };
  verification: {
    status: "VERIFIED" | "PARTIAL" | "BLOCKED";
    confidence_score: number;
    freshness_ts: string;
    owner: string;
    approver: string;
  };
  evidence: {
    external_artifacts: ExternalArtifact[];
    internal_artifacts: Array<{
      artifact_id: string;
      source_system: string;
      source_type: string;
      storage_uri: string;
      checksum_sha256?: string;
      loaded_at: string;
      row_count?: number;
    }>;
    transforms: Array<{
      transform_id: string;
      name: string;
      version: string;
      code_hash_sha256: string;
      query_id: string;
      ran_at: string;
    }>;
    dq: {
      suite: string;
      version: string;
      status: "PASS" | "WARN" | "FAIL";
      tests: Array<{ name: string; status: "PASS" | "WARN" | "FAIL"; details?: string }>;
    };
    reconciliation: Array<{
      name: string;
      status: "PASS" | "WARN" | "FAIL";
      expected: number;
      actual: number;
      delta: number;
      unit: string;
    }>;
  };
  policy: {
    no_receipt_no_metric: true;
    derived_metrics_require_internal_gate: true;
    notes: string;
  };
};

type ApplyReceiptState = {
  success: boolean;
  error?: string;
  receipt?: ReceiptJson;
};

function uuidLike(prefix = "RCP") {
  const s = Math.random().toString(16).slice(2);
  const t = Date.now().toString(16);
  return `${prefix}-${t}-${s.slice(0, 8)}`.toUpperCase();
}

function downloadJson(filename: string, obj: any) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// Server action for applying receipt
async function applyReceiptAction(
  prevState: ApplyReceiptState | null,
  formData: FormData
): Promise<ApplyReceiptState> {
  const receipt = JSON.parse(formData.get("receipt") as string) as ReceiptJson;
  
  // Simulate async processing
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: true,
    receipt,
  };
}

export function CreateReceiptModal({
  open,
  onClose,
  subjectType,
  subjectId,
  periodStart,
  periodEnd,
  grain,
  onApplyReceipt,
}: {
  open: boolean;
  onClose: () => void;
  subjectType: "KPI" | "TILE" | "EVENT";
  subjectId: string;
  periodStart: string;
  periodEnd: string;
  grain: string;
  onApplyReceipt?: (receipt: ReceiptJson) => void;
}) {
  const [status, setStatus] = useState<"VERIFIED" | "PARTIAL" | "BLOCKED">("VERIFIED");
  const [confidence, setConfidence] = useState<number>(0.92);
  const [owner, setOwner] = useState<string>("Benefits Finance Lead");
  const [approver, setApprover] = useState<string>("CFO");
  const [isPending, startTransition] = useTransition();

  // React 19: useActionState for server action handling
  const [applyState, applyAction, isApplyPending] = useActionState(applyReceiptAction, null);

  const receipt: ReceiptJson = useMemo(() => {
    const now = new Date().toISOString();

    const lillyCik = "0000059478";
    const external: ExternalArtifact[] = [
      {
        id: `EXT_SEC_EDGAR_LLY_${lillyCik}`,
        authority: "SEC.gov",
        label: "Eli Lilly — EDGAR entity page",
        url: `https://www.sec.gov/edgar/browse/?CIK=${lillyCik}`,
        artifactType: "EXTERNAL_AUTHORITATIVE_POINTER",
      },
      {
        id: `EXT_SEC_EDGAR_LLY_10K_EXAMPLE`,
        authority: "SEC.gov",
        label: "10-K (example filing HTML)",
        url: "https://www.sec.gov/Archives/edgar/data/59478/000005947825000067/lly-20241231.htm",
        artifactType: "EXTERNAL_AUTHORITATIVE_POINTER",
      },
      {
        id: `EXT_SEC_EDGAR_LLY_10Q_EXAMPLE`,
        authority: "SEC.gov",
        label: "10-Q (example filing HTML)",
        url: "https://www.sec.gov/Archives/edgar/data/59478/000005947825000254/lly-20250930.htm",
        artifactType: "EXTERNAL_AUTHORITATIVE_POINTER",
      },
    ];

    const internalArtifacts = [
      {
        artifact_id: "ART-837-DEMO-0001",
        source_system: "TPA",
        source_type: "837",
        storage_uri: "@raw_stage/claims/demo/837_demo.parquet",
        checksum_sha256: "sha256:DEMO_CLAIMS_HASH",
        loaded_at: now,
        row_count: 771230,
      },
      {
        artifact_id: "ART-834-DEMO-0002",
        source_system: "Carrier",
        source_type: "834",
        storage_uri: "@raw_stage/elig/demo/834_demo.csv.gz",
        checksum_sha256: "sha256:DEMO_ELIG_HASH",
        loaded_at: now,
        row_count: 18244,
      },
    ];

    const transforms = [
      {
        transform_id: "TRN-DEMO-CLM-NORM-0001",
        name: "CORE3_CLAIMS_NORMALIZE",
        version: "v1.3.8+demo",
        code_hash_sha256: "sha256:DEMO_SQL_HASH_1",
        query_id: "DEMO_QUERY_ID_1",
        ran_at: now,
      },
      {
        transform_id: "TRN-DEMO-KPI-0002",
        name: `${subjectId}_BUILD`,
        version: "v2.0.1+demo",
        code_hash_sha256: "sha256:DEMO_SQL_HASH_2",
        query_id: "DEMO_QUERY_ID_2",
        ran_at: now,
      },
    ];

    const dq = {
      suite: "CORE3_MIN_QUALITY_GATE",
      version: "v1",
      status: (status === "BLOCKED" ? "FAIL" : "PASS") as "PASS" | "WARN" | "FAIL",
      tests: [
        { name: "Row count non-zero", status: "PASS" as const },
        { name: "Null member_id rate < 0.1%", status: "PASS" as const },
        {
          name: "Duplicate claim_line keys = 0",
          status: status === "BLOCKED" ? ("FAIL" as const) : ("PASS" as const),
          details: status === "BLOCKED" ? "Duplicates detected in demo toggle" : undefined,
        },
        { name: "Eligibility termination sanity", status: "PASS" as const },
      ],
    };

    const reconciliation = [
      {
        name: "Paid claims total vs funding wire (month)",
        status: "PASS" as const,
        expected: 2419921.55,
        actual: 2419800.12,
        delta: -121.43,
        unit: "USD",
      },
      {
        name: "PBM net vs invoice subtotal",
        status: status === "VERIFIED" ? ("WARN" as const) : ("PASS" as const),
        expected: 412331.22,
        actual: 413028.17,
        delta: 696.95,
        unit: "USD",
      },
    ];

    return {
      receipt_id: uuidLike("RCP"),
      subject: {
        type: subjectType,
        id: subjectId,
        period_start: periodStart,
        period_end: periodEnd,
        grain,
      },
      verification: {
        status,
        confidence_score: confidence,
        freshness_ts: now,
        owner,
        approver,
      },
      evidence: {
        external_artifacts: external,
        internal_artifacts: internalArtifacts,
        transforms,
        dq,
        reconciliation,
      },
      policy: {
        no_receipt_no_metric: true,
        derived_metrics_require_internal_gate: true,
        notes:
          "External authoritative pointers (SEC EDGAR) support narrative claims. Any derived KPI remains gated by internal artifacts + transform hashes + DQ + reconciliation.",
      },
    };
  }, [status, confidence, owner, approver, subjectType, subjectId, periodStart, periodEnd, grain]);

  const handleDownload = () => {
    startTransition(() => {
      downloadJson(`evidence-receipt-${receipt.receipt_id}.json`, receipt);
    });
  };

  const handleApply = (formData: FormData) => {
    formData.set("receipt", JSON.stringify(receipt));
    startTransition(() => {
      applyAction(formData);
      if (onApplyReceipt) {
        onApplyReceipt(receipt);
      }
      onClose();
    });
  };

  if (!open) return null;

  const statusIcon = {
    VERIFIED: <CheckCircle2 className="w-4 h-4 text-green-400" />,
    PARTIAL: <AlertTriangle className="w-4 h-4 text-yellow-400" />,
    BLOCKED: <XCircle className="w-4 h-4 text-red-400" />,
  };

  const statusColor = {
    VERIFIED: "text-green-400 border-green-400/20 bg-green-400/10",
    PARTIAL: "text-yellow-400 border-yellow-400/20 bg-yellow-400/10",
    BLOCKED: "text-red-400 border-red-400/20 bg-red-400/10",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-6xl rounded-2xl border border-white/10 bg-[#0A1020] overflow-hidden my-8">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <div className="text-sm font-semibold text-white">Create Evidence Receipt (Demo)</div>
            <div className="text-xs text-white/60">Generate an exportable receipt with external + internal evidence</div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
              <div className="text-sm font-semibold text-white">Verification Controls</div>

              <div>
                <label className="text-xs text-white/60 block mb-2">Status</label>
                <div className="flex gap-2">
                  {(["VERIFIED", "PARTIAL", "BLOCKED"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`flex-1 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                        status === s ? statusColor[s] : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-2">Confidence Score: {confidence.toFixed(2)}</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={confidence}
                  onChange={(e) => setConfidence(parseFloat(e.target.value))}
                  className="w-full h-2 rounded-full bg-white/10 appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-2">Owner</label>
                <input
                  type="text"
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                />
              </div>

              <div>
                <label className="text-xs text-white/60 block mb-2">Approver</label>
                <input
                  type="text"
                  value={approver}
                  onChange={(e) => setApprover(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="text-sm font-semibold text-white">Subject Metadata</div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs text-white/60">Type</div>
                  <div className="text-sm font-semibold text-white">{subjectType}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs text-white/60">ID</div>
                  <div className="text-sm font-semibold text-white truncate">{subjectId}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs text-white/60">Period Start</div>
                  <div className="text-sm font-semibold text-white">{periodStart}</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <div className="text-xs text-white/60">Period End</div>
                  <div className="text-sm font-semibold text-white">{periodEnd}</div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                <div className="text-xs text-white/60">Grain</div>
                <div className="text-sm font-semibold text-white">{grain}</div>
              </div>

              <div className={`rounded-xl border px-3 py-2 flex items-center gap-2 ${statusColor[status]}`}>
                {statusIcon[status]}
                <div className="text-xs font-semibold">Current Status: {status}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
            <div className="text-sm font-semibold text-white">External Artifacts (Authoritative Pointers)</div>
            <div className="space-y-2">
              {receipt.evidence.external_artifacts.map((art) => (
                <div key={art.id} className="rounded-xl border border-white/10 bg-black/20 p-3 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-white/60">{art.authority}</div>
                    <div className="text-sm font-semibold text-white">{art.label}</div>
                  </div>
                  <a
                    href={art.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    Open <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="text-sm font-semibold text-white">Internal Artifacts</div>
              <div className="space-y-2">
                {receipt.evidence.internal_artifacts.map((art) => (
                  <div key={art.artifact_id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs text-white/60">{art.source_system}</div>
                    <div className="text-sm font-semibold text-white">{art.source_type}</div>
                    <div className="text-xs text-white/50 mt-1 truncate">{art.storage_uri}</div>
                    {art.row_count && <div className="text-xs text-white/50 mt-1">{art.row_count.toLocaleString()} rows</div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="text-sm font-semibold text-white">Transforms</div>
              <div className="space-y-2">
                {receipt.evidence.transforms.map((t) => (
                  <div key={t.transform_id} className="rounded-xl border border-white/10 bg-black/20 p-3">
                    <div className="text-xs text-white/60">{t.name}</div>
                    <div className="text-sm font-semibold text-white">{t.version}</div>
                    <div className="text-xs text-white/50 mt-1 truncate">Hash: {t.code_hash_sha256}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="text-sm font-semibold text-white">Data Quality Tests</div>
              <div className="space-y-2">
                {receipt.evidence.dq.tests.map((test, idx) => {
                  const testStatusColor = {
                    PASS: "text-green-400 border-green-400/20 bg-green-400/10",
                    WARN: "text-yellow-400 border-yellow-400/20 bg-yellow-400/10",
                    FAIL: "text-red-400 border-red-400/20 bg-red-400/10",
                  };
                  return (
                    <div key={idx} className={`rounded-xl border px-3 py-2 ${testStatusColor[test.status]}`}>
                      <div className="text-xs font-semibold">{test.name}</div>
                      {test.details && <div className="text-xs mt-1 opacity-80">{test.details}</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="text-sm font-semibold text-white">Reconciliation Checks</div>
              <div className="space-y-2">
                {receipt.evidence.reconciliation.map((rec, idx) => {
                  const recStatusColor = {
                    PASS: "text-green-400 border-green-400/20 bg-green-400/10",
                    WARN: "text-yellow-400 border-yellow-400/20 bg-yellow-400/10",
                    FAIL: "text-red-400 border-red-400/20 bg-red-400/10",
                  };
                  return (
                    <div key={idx} className={`rounded-xl border px-3 py-2 ${recStatusColor[rec.status]}`}>
                      <div className="text-xs font-semibold">{rec.name}</div>
                      <div className="text-xs mt-1 opacity-80">
                        Expected: {rec.expected.toLocaleString()} {rec.unit} | Actual: {rec.actual.toLocaleString()} {rec.unit} | Δ: {rec.delta.toFixed(2)} {rec.unit}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <div className="text-xs font-semibold text-white/60 mb-2">Policy Enforcement</div>
            <div className="text-sm text-white/75">{receipt.policy.notes}</div>
          </div>

          <form action={handleApply} className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isPending}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 flex items-center gap-2 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {isPending ? "Processing..." : "Download JSON"}
            </button>
            {onApplyReceipt && (
              <button
                type="submit"
                disabled={isApplyPending || isPending}
                className="rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm font-semibold text-green-400 hover:bg-green-400/20 flex items-center gap-2 disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                {isApplyPending ? "Applying..." : "Apply Receipt"}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}