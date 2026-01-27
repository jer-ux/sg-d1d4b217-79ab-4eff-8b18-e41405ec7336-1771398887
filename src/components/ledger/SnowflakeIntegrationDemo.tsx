import { useState } from "react";
import { Database, Play, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Step {
  id: number;
  title: string;
  sql: string;
  description: string;
  output?: string;
  status: "pending" | "running" | "complete" | "error";
}

export function SnowflakeIntegrationDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "Ingest Source Artifacts",
      sql: `INSERT INTO KINCAID_IQ.LINEAGE.ARTIFACTS (
  artifact_id, source_system, artifact_type,
  content_hash, uploaded_at, metadata
)
VALUES (
  'artifact-uuid-1', 'PBM_PORTAL', 'REBATE_INVOICE',
  'sha256:abc123...', CURRENT_TIMESTAMP(),
  OBJECT_CONSTRUCT('vendor', 'OptumRx', 'amount', 2450000)
);`,
      description: "Store raw data artifacts with cryptographic hashes",
      status: "pending"
    },
    {
      id: 2,
      title: "Register Transform Logic",
      sql: `CALL KINCAID_IQ.LINEAGE.REGISTER_TRANSFORM(
  'transform-uuid-1',
  'CALCULATE_NET_REBATE',
  'v1.0.0',
  $$ SELECT invoice_amount * 0.85 AS net_rebate $$,
  ARRAY_CONSTRUCT('artifact-uuid-1')
);`,
      description: "Define and version transformation logic",
      status: "pending"
    },
    {
      id: 3,
      title: "Run DQ Tests",
      sql: `SET dq_run_id = (
  CALL KINCAID_IQ.LINEAGE.RUN_CORE3_DQ()
);`,
      description: "Execute completeness, freshness, and reconciliation checks",
      output: "dq_run_id: dq-run-abc123",
      status: "pending"
    },
    {
      id: 4,
      title: "Create Evidence Receipt",
      sql: `INSERT INTO KINCAID_IQ.LINEAGE.EVIDENCE_RECEIPTS (
  subject_type, subject_id,
  subject_period_start, subject_period_end,
  grain, artifact_ids, transform_ids, dq_run_id,
  freshness_ts, confidence_score,
  verification_status, owner, approver
)
VALUES (
  'SAVINGS', 'SAV_PBM_REBATE_2026Q1',
  '2026-01-01'::DATE, '2026-03-31'::DATE,
  'employer_quarter',
  ARRAY_CONSTRUCT('artifact-uuid-1'),
  ARRAY_CONSTRUCT('transform-uuid-1'),
  $dq_run_id, CURRENT_TIMESTAMP(), 0.98,
  'VERIFIED', 'pharmacy_lead', 'cfo'
);`,
      description: "Generate cryptographic receipt with full lineage",
      output: "Receipt created: receipt-xyz789",
      status: "pending"
    }
  ]);

  const runStep = (stepId: number) => {
    setSteps(prev => prev.map(s => 
      s.id === stepId ? { ...s, status: "running" as const } : s
    ));

    setTimeout(() => {
      setSteps(prev => prev.map(s => 
        s.id === stepId ? { ...s, status: "complete" as const } : s
      ));
      if (stepId < steps.length) {
        setCurrentStep(stepId);
      }
    }, 1500);
  };

  const runAll = () => {
    steps.forEach((step, idx) => {
      setTimeout(() => runStep(step.id), idx * 2000);
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-6">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-500/10 p-3 border border-blue-500/20">
            <Database className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">
              Snowflake → Value Ledger Integration
            </div>
            <div className="text-sm text-white/65">
              Watch evidence receipts flow from Snowflake to the Value Ledger UI
            </div>
          </div>
        </div>
        <Button 
          onClick={runAll}
          disabled={steps.some(s => s.status === "running")}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Play className="w-4 h-4 mr-2" />
          Run Demo
        </Button>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className={`rounded-xl border transition-all ${
              step.status === "complete"
                ? "border-emerald-500/30 bg-emerald-500/5"
                : step.status === "running"
                ? "border-blue-500/30 bg-blue-500/5"
                : "border-white/10 bg-black/20"
            } p-4`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/20 bg-white/5 text-sm font-semibold">
                  {step.status === "complete" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : step.status === "running" ? (
                    <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />
                  ) : (
                    step.id
                  )}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{step.title}</div>
                  <div className="text-xs text-white/60">{step.description}</div>
                </div>
              </div>
              <Badge 
                variant="outline"
                className={
                  step.status === "complete"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                    : step.status === "running"
                    ? "border-blue-500/30 bg-blue-500/10 text-blue-200"
                    : "border-white/20 bg-white/5 text-white/60"
                }
              >
                {step.status === "complete" ? "COMPLETE" : step.status === "running" ? "RUNNING" : "PENDING"}
              </Badge>
            </div>

            <div className="rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-white/80 overflow-x-auto">
              <pre>{step.sql}</pre>
            </div>

            {step.output && step.status === "complete" && (
              <div className="mt-2 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs text-emerald-200 font-mono">
                ✓ {step.output}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-purple-300 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-white/80">
            <div className="font-semibold text-white mb-1">Backend Integration Required</div>
            <div className="text-white/65">
              This demo shows the SQL flow. In production, your backend API queries{" "}
              <code className="px-1.5 py-0.5 rounded bg-black/40 text-purple-200 font-mono text-xs">
                KINCAID_IQ.LINEAGE.EVIDENCE_RECEIPTS
              </code>{" "}
              and transforms results into Ledger Entries for the UI.
            </div>
            <div className="mt-2 text-xs text-purple-200">
              See <code className="px-1 py-0.5 rounded bg-black/40">docs/value-ledger-snowflake-integration.md</code> for full implementation details.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}