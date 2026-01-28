import * as React from "react";
import { useMemo, useState } from "react";

type Severity = "LOW" | "MED" | "HIGH" | "CRITICAL";
type Status = "NEW" | "INVESTIGATING" | "ACTIONED" | "REALIZED" | "DISMISSED";

type RealizationStage = "IDENTIFIED" | "VALIDATED" | "SUBMITTED" | "APPROVED" | "RECOVERED" | "BOOKED" | "CLOSED";

type RealizationTracker = {
  owner: string;
  forecast_value: number;
  realized_value: number;
  currency: string;
  stage: RealizationStage;
  milestones: Array<{
    stage: RealizationStage;
    ts: string;
    actor: string;
    notes?: string;
  }>;
  risks: Array<{ label: string; severity: "LOW" | "MED" | "HIGH"; mitigation: string }>;
};

type LedgerDetails = {
  header: Array<{ label: string; value: string }>;
  financial: Array<{ label: string; value: string }>;
  mapping: Array<{ label: string; value: string }>;
  controls: Array<{ label: string; value: string }>;
  notes?: string;
};

type EvidenceReceipt = {
  receipt_id: string;
  verified: boolean;
  confidence: number;
  freshness_minutes: number;
  owner: string;
  source_system: string;
  source_artifact_hash: string;
  transform_hash: string;
  dq_tests: Array<{ name: string; pass: boolean; details?: string }>;
  lineage: Array<{ node: string; kind: "TABLE" | "VIEW" | "PIPE" | "JOB"; ref?: string }>;
};

type FinancialModel = {
  baseline_cost: number;
  expected_cost: number;
  delta_value: number;
  units: string;
  assumptions: Array<{ key: string; value: string }>;
  sensitivity: Array<{ variable: string; low: number; base: number; high: number }>;
};

type ActionPacket = {
  recommended_owner: string;
  actions: Array<{ step: string; system: string; due_in_days: number; rationale: string }>;
  artifacts: Array<{ name: string; type: "PDF" | "LINK" | "SQL" | "TICKET"; value: string }>;
};

type RelatedTransaction = {
  row_id: string;
  type: "CLAIM" | "INVOICE" | "ELIGIBILITY" | "RX";
  member_id?: string;
  claim_id?: string;
  invoice_id?: string;
  service_date?: string;
  paid_amount?: number;
  allowed_amount?: number;
  units?: number;
  vendor?: string;
  payer?: string;
  status?: string;
  reason?: string;
  ledger?: LedgerDetails;
};

export type ArbitrageEvent = {
  event_id: string;
  title: string;
  category: string;
  severity: Severity;
  status: Status;
  detected_at: string;
  payer?: string;
  employer?: string;

  score: {
    rank: number;
    confidence: number;
    time_sensitivity: number;
    delta_value: number;
    formula: string;
  };

  narrative: {
    executive_summary: string;
    why_it_matters: string;
    what_changed: string;
    scope: string;
  };

  kpis: Array<{ label: string; value: string; note?: string }>;

  evidence: EvidenceReceipt;
  model: FinancialModel;
  packet: ActionPacket;

  audit_log: Array<{
    ts: string;
    actor: string;
    action: string;
    notes?: string;
  }>;

  sql?: {
    detection_query: string;
    validation_query: string;
  };

  related?: {
    summary: Array<{ label: string; value: string; note?: string }>;
    transactions: RelatedTransaction[];
  };

  realization?: RealizationTracker;
};

function formatMoney(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

function badge(sev: Severity) {
  const map: Record<Severity, string> = {
    LOW: "border border-zinc-700 text-zinc-200",
    MED: "border border-zinc-700 text-zinc-200",
    HIGH: "border border-zinc-700 text-zinc-200",
    CRITICAL: "border border-zinc-700 text-zinc-200",
  };
  return `inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${map[sev]}`;
}

function pill(ok: boolean) {
  return ok
    ? "inline-flex rounded-full border border-emerald-700 bg-emerald-950 px-2 py-0.5 text-xs text-emerald-200"
    : "inline-flex rounded-full border border-red-700 bg-red-950 px-2 py-0.5 text-xs text-red-200";
}

function pct(x: number) {
  return `${Math.round(x * 100)}%`;
}

type TabKey = "SUMMARY" | "EVIDENCE" | "MODEL" | "LINEAGE" | "ACTIONS" | "AUDIT" | "SQL" | "TRANSACTIONS" | "REALIZATION";

export function ArbitrageEventsPanel({
  events,
  onSelect,
}: {
  events: ArbitrageEvent[];
  onSelect?: (e: ArbitrageEvent) => void;
}) {
  const [selected, setSelected] = useState<ArbitrageEvent | null>(null);
  const [tab, setTab] = useState<TabKey>("SUMMARY");

  const sorted = useMemo(() => {
    return [...events].sort((a, b) => a.score.rank - b.score.rank);
  }, [events]);

  const open = (e: ArbitrageEvent) => {
    setSelected(e);
    setTab("SUMMARY");
    onSelect?.(e);
  };

  return (
    <div className="flex h-full w-full gap-3">
      <div className="w-[420px] shrink-0 overflow-auto rounded-2xl border border-zinc-800 bg-zinc-950 p-3">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-sm font-semibold text-zinc-100">Arbitrage Events</div>
          <div className="text-xs text-zinc-400">{sorted.length} events</div>
        </div>

        <div className="space-y-2">
          {sorted.map((e) => (
            <button
              key={e.event_id}
              onClick={() => open(e)}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-3 py-3 text-left hover:bg-zinc-900/60"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-zinc-100">{e.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className={badge(e.severity)}>
                      <span className="h-2 w-2 rounded-full bg-zinc-200" />
                      {e.severity}
                    </span>
                    <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {e.category}
                    </span>
                    <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {e.status}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-zinc-400">Annualized</div>
                  <div className="text-sm font-semibold text-zinc-100">
                    {formatMoney(e.score.delta_value)}/yr
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">
                    Conf {pct(e.score.confidence)} • Speed {pct(e.score.time_sensitivity)}
                  </div>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {e.kpis.slice(0, 3).map((k) => (
                  <div
                    key={k.label}
                    className="rounded-xl border border-zinc-800 bg-zinc-950 px-2 py-2"
                  >
                    <div className="text-[11px] text-zinc-400">{k.label}</div>
                    <div className="text-xs font-semibold text-zinc-100">{k.value}</div>
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        {!selected ? (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            Click an event to view CFO-grade detail →
          </div>
        ) : (
          <div className="flex h-full flex-col">
            <div className="border-b border-zinc-800 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-base font-semibold text-zinc-100">{selected.title}</div>
                    <span className={badge(selected.severity)}>
                      <span className="h-2 w-2 rounded-full bg-zinc-200" />
                      {selected.severity}
                    </span>
                    <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      {selected.status}
                    </span>
                    <span className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-300">
                      #{selected.event_id}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-zinc-400">
                    Detected {new Date(selected.detected_at).toLocaleString()} •{" "}
                    {selected.employer ?? "Employer N/A"} • {selected.payer ?? "Payer N/A"}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs text-zinc-400">Value</div>
                  <div className="text-lg font-semibold text-zinc-100">
                    {formatMoney(selected.model.delta_value)}/yr
                  </div>
                  <div className="mt-1 text-xs text-zinc-400">
                    Verified: {selected.evidence.verified ? "YES" : "NO"} • Confidence{" "}
                    {pct(selected.evidence.confidence)}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs ${
                    selected.evidence.verified
                      ? "border-zinc-700 bg-zinc-900 text-zinc-100"
                      : "border-zinc-700 bg-zinc-950 text-zinc-300"
                  }`}
                  title={
                    selected.evidence.verified
                      ? "Evidence receipt VERIFIED"
                      : "Not VERIFIED. Complete DQ + lineage validation to unlock exports."
                  }
                >
                  {selected.evidence.verified ? "VERIFIED ✅" : "NOT VERIFIED ⚠️"}
                </span>

                <ExportPacketButton event={selected} disabled={!selected.evidence.verified} />

                <button
                  className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-900/60"
                  onClick={() => alert(`Create ticket for ${selected.event_id} (wire to ServiceNow/Jira next)`)}
                >
                  Create Ticket →
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {(
                  ["SUMMARY", "EVIDENCE", "MODEL", "LINEAGE", "TRANSACTIONS", "REALIZATION", "ACTIONS", "AUDIT", "SQL"] as TabKey[]
                ).map((k) => (
                  <button
                    key={k}
                    onClick={() => setTab(k)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      tab === k
                        ? "border-zinc-600 bg-zinc-900 text-zinc-100"
                        : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:bg-zinc-900/60"
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {tab === "SUMMARY" && <SummaryTab e={selected} />}
              {tab === "EVIDENCE" && <EvidenceTab e={selected} />}
              {tab === "MODEL" && <ModelTab e={selected} />}
              {tab === "LINEAGE" && <LineageTab e={selected} />}
              {tab === "ACTIONS" && <ActionsTab e={selected} />}
              {tab === "AUDIT" && <AuditTab e={selected} />}
              {tab === "SQL" && <SqlTab e={selected} />}
              {tab === "TRANSACTIONS" && <TransactionsTab e={selected} />}
              {tab === "REALIZATION" && <RealizationTab e={selected} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-2 text-sm font-semibold text-zinc-100">{title}</div>
      <div className="text-sm text-zinc-200">{children}</div>
    </div>
  );
}

function SummaryTab({ e }: { e: ArbitrageEvent }) {
  return (
    <>
      <Section title="Executive Summary">{e.narrative.executive_summary}</Section>
      <Section title="Why It Matters">{e.narrative.why_it_matters}</Section>
      <Section title="What Changed">{e.narrative.what_changed}</Section>
      <Section title="Scope">{e.narrative.scope}</Section>

      <div className="grid grid-cols-2 gap-3">
        <Section title="Scoring Logic">
          <div className="text-xs text-zinc-300">{e.score.formula}</div>
          <div className="mt-2 text-xs text-zinc-400">
            Rank #{e.score.rank} • Confidence {pct(e.score.confidence)} • Time Sensitivity{" "}
            {pct(e.score.time_sensitivity)}
          </div>
        </Section>

        <Section title="KPI Badges">
          <div className="flex flex-wrap gap-2">
            {e.kpis.map((k) => (
              <div
                key={k.label}
                className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2"
              >
                <div className="text-[11px] text-zinc-400">{k.label}</div>
                <div className="text-xs font-semibold text-zinc-100">{k.value}</div>
                {k.note ? <div className="mt-1 text-[11px] text-zinc-400">{k.note}</div> : null}
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

function EvidenceTab({ e }: { e: ArbitrageEvent }) {
  const r = e.evidence;
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Section title="Evidence Receipt">
          <div className="text-xs text-zinc-300">
            Receipt ID: <span className="text-zinc-100">{r.receipt_id}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <span className={pill(r.verified)}>VERIFIED: {r.verified ? "YES" : "NO"}</span>
            <span className={pill(true)}>CONFIDENCE: {pct(r.confidence)}</span>
            <span className={pill(true)}>FRESHNESS: {r.freshness_minutes}m</span>
            <span className={pill(true)}>OWNER: {r.owner}</span>
            <span className={pill(true)}>SOURCE: {r.source_system}</span>
          </div>

          <div className="mt-3 text-xs text-zinc-400">
            Source Artifact Hash: <span className="text-zinc-200">{r.source_artifact_hash}</span>
          </div>
          <div className="mt-1 text-xs text-zinc-400">
            Transform Hash: <span className="text-zinc-200">{r.transform_hash}</span>
          </div>
        </Section>

        <Section title="Data Quality Tests">
          <div className="space-y-2">
            {r.dq_tests.map((t) => (
              <div key={t.name} className="flex items-start justify-between gap-3">
                <div className="text-xs text-zinc-200">{t.name}</div>
                <div className="text-xs text-zinc-300">{t.pass ? "PASS" : "FAIL"}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

function ModelTab({ e }: { e: ArbitrageEvent }) {
  const m = e.model;
  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <Section title="Baseline Cost">
          <div className="text-xl font-semibold text-zinc-100">{formatMoney(m.baseline_cost)}</div>
          <div className="text-xs text-zinc-400">{m.units}</div>
        </Section>
        <Section title="Expected Cost">
          <div className="text-xl font-semibold text-zinc-100">{formatMoney(m.expected_cost)}</div>
          <div className="text-xs text-zinc-400">{m.units}</div>
        </Section>
        <Section title="Delta Value">
          <div className="text-xl font-semibold text-zinc-100">{formatMoney(m.delta_value)}</div>
          <div className="text-xs text-zinc-400">{m.units}</div>
        </Section>
      </div>

      <Section title="Assumptions">
        <div className="grid grid-cols-2 gap-2">
          {m.assumptions.map((a) => (
            <div key={a.key} className="rounded-xl border border-zinc-800 p-3">
              <div className="text-xs text-zinc-400">{a.key}</div>
              <div className="mt-1 text-sm font-semibold text-zinc-100">{a.value}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sensitivity">
        <div className="space-y-2">
          {m.sensitivity.map((s) => (
            <div key={s.variable} className="rounded-xl border border-zinc-800 p-3">
              <div className="text-xs text-zinc-400">{s.variable}</div>
              <div className="mt-1 text-xs text-zinc-200">
                Low {formatMoney(s.low)} • Base {formatMoney(s.base)} • High {formatMoney(s.high)}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function LineageTab({ e }: { e: ArbitrageEvent }) {
  const l = e.evidence.lineage;
  return (
    <>
      <Section title="Lineage Graph (Readable)">
        <div className="space-y-2">
          {l.map((n, idx) => (
            <div key={`${n.node}-${idx}`} className="flex items-center gap-2 text-xs">
              <span className="rounded-full border border-zinc-800 px-2 py-0.5 text-zinc-300">
                {n.kind}
              </span>
              <span className="text-zinc-100">{n.node}</span>
              {n.ref ? <span className="text-zinc-400">({n.ref})</span> : null}
            </div>
          ))}
        </div>
      </Section>
      <Section title="Why this matters">
        The event is only as trustworthy as its upstream lineage. This tab proves traceability from
        raw source → transforms → KPI/event logic.
      </Section>
    </>
  );
}

function ActionsTab({ e }: { e: ArbitrageEvent }) {
  const p = e.packet;
  return (
    <>
      <Section title="Recommended Owner">{p.recommended_owner}</Section>

      <Section title="Action Steps">
        <div className="space-y-2">
          {p.actions.map((a, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 p-3">
              <div className="text-sm font-semibold text-zinc-100">{a.step}</div>
              <div className="mt-1 text-xs text-zinc-400">
                System: {a.system} • Due: {a.due_in_days} days
              </div>
              <div className="mt-2 text-xs text-zinc-200">{a.rationale}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Artifacts">
        <div className="space-y-2">
          {p.artifacts.map((x, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 p-3">
              <div className="text-xs text-zinc-400">
                {x.type} • {x.name}
              </div>
              <div className="mt-1 text-xs text-zinc-200 break-all">{x.value}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function AuditTab({ e }: { e: ArbitrageEvent }) {
  return (
    <Section title="Audit Log">
      <div className="space-y-2">
        {e.audit_log.map((x, i) => (
          <div key={i} className="rounded-xl border border-zinc-800 p-3">
            <div className="text-xs text-zinc-400">
              {new Date(x.ts).toLocaleString()} • {x.actor}
            </div>
            <div className="mt-1 text-sm font-semibold text-zinc-100">{x.action}</div>
            {x.notes ? <div className="mt-1 text-xs text-zinc-200">{x.notes}</div> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}

function SqlTab({ e }: { e: ArbitrageEvent }) {
  if (!e.sql) {
    return (
      <Section title="SQL">
        No SQL attached to this event. Add detection_query and validation_query for auditability.
      </Section>
    );
  }
  return (
    <>
      <Section title="Detection Query">
        <pre className="whitespace-pre-wrap break-words rounded-xl border border-zinc-800 bg-black/30 p-3 text-xs text-zinc-200">
          {e.sql.detection_query}
        </pre>
      </Section>
      <Section title="Validation Query">
        <pre className="whitespace-pre-wrap break-words rounded-xl border border-zinc-800 bg-black/30 p-3 text-xs text-zinc-200">
          {e.sql.validation_query}
        </pre>
      </Section>
    </>
  );
}

function TransactionsTab({ e }: { e: ArbitrageEvent }) {
  const [selectedTx, setSelectedTx] = React.useState<RelatedTransaction | null>(null);

  if (!e.related || !e.related.transactions.length) {
    return (
      <Section title="Related Transactions">
        No transactions attached. Add related transactions to prove provenance at the row level.
      </Section>
    );
  }

  const { summary, transactions } = e.related;

  return (
    <>
      {summary && summary.length > 0 && (
        <Section title="Transaction Summary">
          <div className="grid grid-cols-3 gap-3">
            {summary.map((s) => (
              <div key={s.label} className="rounded-xl border border-zinc-800 p-3">
                <div className="text-xs text-zinc-400">{s.label}</div>
                <div className="text-sm font-semibold text-zinc-100">{s.value}</div>
                {s.note ? <div className="mt-1 text-[11px] text-zinc-400">{s.note}</div> : null}
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title="Transaction Details">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-800 text-left text-zinc-400">
                <th className="pb-2 pr-3">Type</th>
                <th className="pb-2 pr-3">Member ID</th>
                <th className="pb-2 pr-3">Claim/Invoice ID</th>
                <th className="pb-2 pr-3">Service Date</th>
                <th className="pb-2 pr-3 text-right">Paid</th>
                <th className="pb-2 pr-3 text-right">Allowed</th>
                <th className="pb-2 pr-3">Vendor/Payer</th>
                <th className="pb-2 pr-3">Status</th>
                <th className="pb-2 pr-3"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.row_id} className="border-b border-zinc-800/50">
                  <td className="py-2 pr-3 text-zinc-200">{t.type}</td>
                  <td className="py-2 pr-3 text-zinc-200">{t.member_id ?? "—"}</td>
                  <td className="py-2 pr-3 text-zinc-200">{t.claim_id || t.invoice_id || "—"}</td>
                  <td className="py-2 pr-3 text-zinc-200">
                    {t.service_date ? new Date(t.service_date).toLocaleDateString() : "—"}
                  </td>
                  <td className="py-2 pr-3 text-right text-zinc-200">
                    {t.paid_amount != null ? formatMoney(t.paid_amount) : "—"}
                  </td>
                  <td className="py-2 pr-3 text-right text-zinc-200">
                    {t.allowed_amount != null ? formatMoney(t.allowed_amount) : "—"}
                  </td>
                  <td className="py-2 pr-3 text-zinc-200">{t.vendor || t.payer || "—"}</td>
                  <td className="py-2 pr-3 text-zinc-200">{t.status || "—"}</td>
                  <td className="py-2 pr-3">
                    {t.ledger && (
                      <button
                        onClick={() => setSelectedTx(t)}
                        className="rounded border border-zinc-700 bg-zinc-900 px-2 py-0.5 text-[11px] text-zinc-100 hover:bg-zinc-800"
                      >
                        View Details →
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-2 text-[11px] text-zinc-400">
          Showing {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
          {transactions.some((t) => t.ledger) && " • Click 'View Details' for full ledger context"}
        </div>
      </Section>

      {selectedTx?.ledger && (
        <LedgerDrawer
          transaction={selectedTx}
          onClose={() => setSelectedTx(null)}
        />
      )}
    </>
  );
}

function LedgerDrawer({
  transaction,
  onClose,
}: {
  transaction: RelatedTransaction;
  onClose: () => void;
}) {
  const ledger = transaction.ledger!;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <div>
            <div className="text-sm font-semibold text-zinc-100">
              Ledger Detail — {transaction.row_id}
            </div>
            <div className="text-xs text-zinc-400">
              {transaction.type} • {transaction.member_id} • {transaction.claim_id || transaction.invoice_id}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-900/60"
          >
            Close ✕
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto p-6">
          <LedgerSection title="Header">
            <div className="grid grid-cols-2 gap-3">
              {ledger.header.map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-zinc-400">{item.label}</div>
                  <div className="text-sm font-semibold text-zinc-100">{item.value}</div>
                </div>
              ))}
            </div>
          </LedgerSection>

          <LedgerSection title="Financial">
            <div className="grid grid-cols-2 gap-3">
              {ledger.financial.map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-zinc-400">{item.label}</div>
                  <div className="text-sm font-semibold text-zinc-100">{item.value}</div>
                </div>
              ))}
            </div>
          </LedgerSection>

          <LedgerSection title="Mapping">
            <div className="grid grid-cols-2 gap-3">
              {ledger.mapping.map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-zinc-400">{item.label}</div>
                  <div className="text-sm font-semibold text-zinc-100">{item.value}</div>
                </div>
              ))}
            </div>
          </LedgerSection>

          <LedgerSection title="Controls">
            <div className="grid grid-cols-2 gap-3">
              {ledger.controls.map((item) => (
                <div key={item.label}>
                  <div className="text-xs text-zinc-400">{item.label}</div>
                  <div className="text-sm font-semibold text-zinc-100">{item.value}</div>
                </div>
              ))}
            </div>
          </LedgerSection>

          {ledger.notes && (
            <LedgerSection title="Notes">
              <div className="text-sm text-zinc-200">{ledger.notes}</div>
            </LedgerSection>
          )}
        </div>
      </div>
    </div>
  );
}

function LedgerSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 rounded-xl border border-zinc-800 bg-zinc-900/30 p-4">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-300">{title}</div>
      {children}
    </div>
  );
}

function ExportPacketButton({ event, disabled }: { event: ArbitrageEvent; disabled: boolean }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        className={`rounded-full border px-3 py-1 text-xs ${
          disabled
            ? "cursor-not-allowed border-zinc-800 bg-zinc-950 text-zinc-500"
            : "border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
        }`}
        disabled={disabled}
        onClick={() => setOpen(true)}
        title={disabled ? "Requires VERIFIED evidence receipt" : "Open print-ready action packet"}
      >
        Export Packet ⤓
      </button>

      {open ? <PacketModal event={event} onClose={() => setOpen(false)} /> : null}
    </>
  );
}

function PacketModal({ event, onClose }: { event: ArbitrageEvent; onClose: () => void }) {
  const printPacket = () => window.print();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 p-4">
          <div>
            <div className="text-sm font-semibold text-zinc-100">
              Action Packet — {event.event_id}
            </div>
            <div className="text-xs text-zinc-400">
              Print-ready executive packet (summary + evidence + model + actions)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={printPacket}
              className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-100 hover:bg-zinc-800"
            >
              Print / Save PDF 🖨️
            </button>
            <button
              onClick={onClose}
              className="rounded-full border border-zinc-800 bg-zinc-950 px-3 py-1 text-xs text-zinc-300 hover:bg-zinc-900/60"
            >
              Close ✕
            </button>
          </div>
        </div>

        <div className="max-h-[75vh] overflow-auto p-6">
          <div className="mb-4">
            <div className="text-xl font-semibold text-zinc-100">{event.title}</div>
            <div className="mt-1 text-xs text-zinc-400">
              Severity: {event.severity} • Category: {event.category} • Status: {event.status}
            </div>
          </div>

          <PacketSection title="Executive Summary">
            <p className="text-sm text-zinc-200">{event.narrative.executive_summary}</p>
          </PacketSection>

          <div className="grid grid-cols-2 gap-4">
            <PacketSection title="Why It Matters">
              <p className="text-sm text-zinc-200">{event.narrative.why_it_matters}</p>
            </PacketSection>
            <PacketSection title="Scope">
              <p className="text-sm text-zinc-200">{event.narrative.scope}</p>
            </PacketSection>
          </div>

          <PacketSection title="Evidence Receipt (VERIFIED)">
            <div className="grid grid-cols-2 gap-3 text-xs text-zinc-200">
              <div>
                <div className="text-zinc-400">Receipt ID</div>
                <div className="text-zinc-100">{event.evidence.receipt_id}</div>
              </div>
              <div>
                <div className="text-zinc-400">Owner</div>
                <div className="text-zinc-100">{event.evidence.owner}</div>
              </div>
              <div>
                <div className="text-zinc-400">Source System</div>
                <div className="text-zinc-100">{event.evidence.source_system}</div>
              </div>
              <div>
                <div className="text-zinc-400">Freshness</div>
                <div className="text-zinc-100">{event.evidence.freshness_minutes} minutes</div>
              </div>
              <div className="col-span-2">
                <div className="text-zinc-400">Artifact Hash</div>
                <div className="break-all text-zinc-100">{event.evidence.source_artifact_hash}</div>
              </div>
              <div className="col-span-2">
                <div className="text-zinc-400">Transform Hash</div>
                <div className="break-all text-zinc-100">{event.evidence.transform_hash}</div>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-zinc-800 p-3">
              <div className="mb-2 text-xs font-semibold text-zinc-100">DQ Tests</div>
              <div className="space-y-1 text-xs text-zinc-200">
                {event.evidence.dq_tests.map((t) => (
                  <div key={t.name} className="flex items-start justify-between gap-3">
                    <div className="text-zinc-200">{t.name}</div>
                    <div className="text-zinc-300">{t.pass ? "PASS" : "FAIL"}</div>
                  </div>
                ))}
              </div>
            </div>
          </PacketSection>

          <PacketSection title="Financial Model">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-zinc-800 p-3">
                <div className="text-xs text-zinc-400">Baseline</div>
                <div className="text-sm font-semibold text-zinc-100">
                  {formatMoney(event.model.baseline_cost)}
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 p-3">
                <div className="text-xs text-zinc-400">Expected</div>
                <div className="text-sm font-semibold text-zinc-100">
                  {formatMoney(event.model.expected_cost)}
                </div>
              </div>
              <div className="rounded-xl border border-zinc-800 p-3">
                <div className="text-xs text-zinc-400">Delta</div>
                <div className="text-sm font-semibold text-zinc-100">
                  {formatMoney(event.model.delta_value)}
                </div>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-zinc-800 p-3">
              <div className="mb-2 text-xs font-semibold text-zinc-100">Assumptions</div>
              <div className="space-y-1 text-xs text-zinc-200">
                {event.model.assumptions.map((a) => (
                  <div key={a.key}>
                    <span className="text-zinc-400">{a.key}:</span> {a.value}
                  </div>
                ))}
              </div>
            </div>
          </PacketSection>

          <PacketSection title="Recommended Actions">
            <div className="space-y-2">
              {event.packet.actions.map((a, i) => (
                <div key={i} className="rounded-xl border border-zinc-800 p-3">
                  <div className="text-sm font-semibold text-zinc-100">{a.step}</div>
                  <div className="mt-1 text-xs text-zinc-400">
                    System: {a.system} • Due: {a.due_in_days} days
                  </div>
                  <div className="mt-2 text-xs text-zinc-200">{a.rationale}</div>
                </div>
              ))}
            </div>
          </PacketSection>
        </div>
      </div>
    </div>
  );
}

function PacketSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="mb-2 text-sm font-semibold text-zinc-100">{title}</div>
      {children}
    </div>
  );
}

function RealizationTab({ e }: { e: ArbitrageEvent }) {
  const r = e.realization;

  if (!r) {
    return (
      <Section title="Realization Tracker">
        <div className="text-xs text-zinc-400">
          No realization tracker attached. Add e.realization to show forecast vs realized EBITDA, owner, milestones, and risks.
        </div>
      </Section>
    );
  }

  const pctRealized = r.forecast_value > 0 ? Math.min(1, r.realized_value / r.forecast_value) : 0;

  const stageOrder: RealizationStage[] = [
    "IDENTIFIED",
    "VALIDATED",
    "SUBMITTED",
    "APPROVED",
    "RECOVERED",
    "BOOKED",
    "CLOSED",
  ];

  const currentStageIndex = stageOrder.indexOf(r.stage);

  return (
    <>
      <div className="grid grid-cols-3 gap-3">
        <Section title="Forecast Value">
          <div className="text-2xl font-semibold text-zinc-100">
            {r.currency}
            {formatMoney(r.forecast_value)}
          </div>
          <div className="text-xs text-zinc-400">Annualized opportunity</div>
        </Section>

        <Section title="Realized Value">
          <div className="text-2xl font-semibold text-emerald-400">
            {r.currency}
            {formatMoney(r.realized_value)}
          </div>
          <div className="text-xs text-zinc-400">Recovered / confirmed</div>
        </Section>

        <Section title="Realization %">
          <div className="text-2xl font-semibold text-zinc-100">{pct(pctRealized)}</div>
          <div className="text-xs text-zinc-400">Of forecast</div>
        </Section>
      </div>

      <Section title="Realization Stage">
        <div className="flex items-center gap-2">
          {stageOrder.map((stage, idx) => {
            const isComplete = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div key={stage} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex-1 rounded-full px-3 py-2 text-center text-xs ${
                    isComplete
                      ? "bg-emerald-950 text-emerald-200 border border-emerald-700"
                      : isCurrent
                      ? "bg-zinc-900 text-zinc-100 border border-zinc-600"
                      : "bg-zinc-950 text-zinc-500 border border-zinc-800"
                  }`}
                >
                  {stage}
                </div>
                {idx < stageOrder.length - 1 && (
                  <div
                    className={`h-0.5 w-4 ${
                      isComplete ? "bg-emerald-700" : "bg-zinc-800"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-2 text-xs text-zinc-400">
          Current stage: <span className="text-zinc-100">{r.stage}</span> • Owner:{" "}
          <span className="text-zinc-100">{r.owner}</span>
        </div>
      </Section>

      <Section title="Progress Bar">
        <div className="relative h-8 overflow-hidden rounded-full border border-zinc-800 bg-zinc-950">
          <div
            className="h-full bg-gradient-to-r from-emerald-900 to-emerald-700"
            style={{ width: `${pctRealized * 100}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-zinc-100">
            {formatMoney(r.realized_value)} / {formatMoney(r.forecast_value)} ({pct(pctRealized)})
          </div>
        </div>
      </Section>

      <Section title="Milestones">
        <div className="space-y-2">
          {r.milestones.map((m, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-zinc-100">{m.stage}</div>
                  <div className="mt-1 text-xs text-zinc-400">
                    {new Date(m.ts).toLocaleString()} • {m.actor}
                  </div>
                  {m.notes ? <div className="mt-1 text-xs text-zinc-200">{m.notes}</div> : null}
                </div>
                <div
                  className={`rounded-full border px-2 py-0.5 text-[11px] ${
                    stageOrder.indexOf(m.stage) <= currentStageIndex
                      ? "border-emerald-700 bg-emerald-950 text-emerald-200"
                      : "border-zinc-800 bg-zinc-950 text-zinc-400"
                  }`}
                >
                  {stageOrder.indexOf(m.stage) <= currentStageIndex ? "COMPLETE" : "PENDING"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {r.risks && r.risks.length > 0 && (
        <Section title="Risks & Mitigation">
          <div className="space-y-2">
            {r.risks.map((risk, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-zinc-100">{risk.label}</div>
                    <div className="mt-1 text-xs text-zinc-200">{risk.mitigation}</div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] ${
                      risk.severity === "HIGH"
                        ? "border-red-700 bg-red-950 text-red-200"
                        : risk.severity === "MED"
                        ? "border-yellow-700 bg-yellow-950 text-yellow-200"
                        : "border-zinc-700 bg-zinc-900 text-zinc-200"
                    }`}
                  >
                    {risk.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function LedgerBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-2 text-sm font-semibold text-zinc-100">{title}</div>
      {children}
    </div>
  );
}

function KVGrid({ rows }: { rows: Array<{ label: string; value: string }> }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {rows.map((r) => (
        <div key={r.label} className="rounded-xl border border-zinc-800 p-3">
          <div className="text-[11px] text-zinc-400">{r.label}</div>
          <div className="mt-0.5 break-words text-xs font-semibold text-zinc-100">{r.value}</div>
        </div>
      ))}
    </div>
  );
}