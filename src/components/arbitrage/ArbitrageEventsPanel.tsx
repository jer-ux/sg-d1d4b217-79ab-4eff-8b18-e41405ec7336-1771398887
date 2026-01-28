import * as React from "react";
import { useMemo, useState } from "react";

type Severity = "LOW" | "MED" | "HIGH" | "CRITICAL";
type Status = "NEW" | "INVESTIGATING" | "ACTIONED" | "REALIZED" | "DISMISSED";

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

type TabKey = "SUMMARY" | "EVIDENCE" | "MODEL" | "LINEAGE" | "ACTIONS" | "AUDIT" | "SQL";

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
      {/* Left: Event list */}
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

      {/* Right: Detail drawer */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
        {!selected ? (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            Click an event to view CFO-grade detail →
          </div>
        ) : (
          <div className="flex h-full flex-col">
            {/* Header */}
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

              {/* Tabs */}
              <div className="mt-4 flex flex-wrap gap-2">
                {(
                  ["SUMMARY", "EVIDENCE", "MODEL", "LINEAGE", "ACTIONS", "AUDIT", "SQL"] as TabKey[]
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

            {/* Body */}
            <div className="flex-1 overflow-auto p-4">
              {tab === "SUMMARY" && <SummaryTab e={selected} />}
              {tab === "EVIDENCE" && <EvidenceTab e={selected} />}
              {tab === "MODEL" && <ModelTab e={selected} />}
              {tab === "LINEAGE" && <LineageTab e={selected} />}
              {tab === "ACTIONS" && <ActionsTab e={selected} />}
              {tab === "AUDIT" && <AuditTab e={selected} />}
              {tab === "SQL" && <SqlTab e={selected} />}
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
  const ev = e.evidence;
  return (
    <>
      <Section title="Evidence Receipt">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-zinc-400">Receipt ID:</span>
            <span className="font-mono text-zinc-100">{ev.receipt_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Verified:</span>
            <span className={pill(ev.verified)}>{ev.verified ? "YES" : "NO"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Confidence:</span>
            <span className="text-zinc-100">{pct(ev.confidence)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Freshness:</span>
            <span className="text-zinc-100">{ev.freshness_minutes} min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Owner:</span>
            <span className="text-zinc-100">{ev.owner}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Source System:</span>
            <span className="text-zinc-100">{ev.source_system}</span>
          </div>
        </div>
      </Section>

      <Section title="Data Quality Tests">
        <div className="space-y-2">
          {ev.dq_tests.map((t, i) => (
            <div key={i} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-zinc-100">{t.name}</div>
                {t.details ? <div className="text-xs text-zinc-400">{t.details}</div> : null}
              </div>
              <span className={pill(t.pass)}>{t.pass ? "PASS" : "FAIL"}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Hashes">
        <div className="space-y-2 text-xs">
          <div>
            <div className="text-zinc-400">Source Artifact Hash:</div>
            <div className="mt-1 break-all font-mono text-[11px] text-zinc-100">
              {ev.source_artifact_hash}
            </div>
          </div>
          <div>
            <div className="text-zinc-400">Transform Hash:</div>
            <div className="mt-1 break-all font-mono text-[11px] text-zinc-100">
              {ev.transform_hash}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function ModelTab({ e }: { e: ArbitrageEvent }) {
  const m = e.model;
  return (
    <>
      <Section title="Financial Model">
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-zinc-400">Baseline Cost:</span>
            <span className="font-semibold text-zinc-100">{formatMoney(m.baseline_cost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Expected Cost:</span>
            <span className="font-semibold text-zinc-100">{formatMoney(m.expected_cost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Delta Value:</span>
            <span className="font-semibold text-emerald-200">
              {formatMoney(m.delta_value)} {m.units}
            </span>
          </div>
        </div>
      </Section>

      <Section title="Assumptions">
        <div className="space-y-2">
          {m.assumptions.map((a, i) => (
            <div key={i} className="flex justify-between gap-3 text-xs">
              <span className="text-zinc-400">{a.key}:</span>
              <span className="text-zinc-100">{a.value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sensitivity Analysis">
        <div className="space-y-2">
          {m.sensitivity.map((s, i) => (
            <div key={i} className="text-xs">
              <div className="mb-1 text-zinc-400">{s.variable}</div>
              <div className="flex gap-2">
                <span className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-zinc-100">
                  Low: {formatMoney(s.low)}
                </span>
                <span className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-zinc-100">
                  Base: {formatMoney(s.base)}
                </span>
                <span className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-zinc-100">
                  High: {formatMoney(s.high)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function LineageTab({ e }: { e: ArbitrageEvent }) {
  const lineage = e.evidence.lineage;
  return (
    <Section title="Data Lineage">
      <div className="space-y-2">
        {lineage.map((node, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="mt-1 rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-300">
              {node.kind}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-zinc-100">{node.node}</div>
              {node.ref ? <div className="text-xs text-zinc-400">{node.ref}</div> : null}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ActionsTab({ e }: { e: ArbitrageEvent }) {
  const p = e.packet;
  return (
    <>
      <Section title="Recommended Owner">
        <div className="text-xs text-zinc-100">{p.recommended_owner}</div>
      </Section>

      <Section title="Action Steps">
        <div className="space-y-3">
          {p.actions.map((a, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-zinc-100">{a.step}</div>
                  <div className="mt-1 text-xs text-zinc-400">{a.rationale}</div>
                </div>
                <div className="text-right">
                  <div className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-300">
                    {a.system}
                  </div>
                  <div className="mt-1 text-[11px] text-zinc-400">Due: {a.due_in_days}d</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Artifacts">
        <div className="space-y-2">
          {p.artifacts.map((art, i) => (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-zinc-100">{art.name}</div>
                <div className="truncate text-xs text-zinc-400">{art.value}</div>
              </div>
              <span className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-[11px] text-zinc-300">
                {art.type}
              </span>
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
        {e.audit_log.map((log, i) => (
          <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-zinc-100">{log.action}</div>
                <div className="mt-1 text-xs text-zinc-400">{log.actor}</div>
                {log.notes ? <div className="mt-1 text-xs text-zinc-300">{log.notes}</div> : null}
              </div>
              <div className="text-xs text-zinc-400">{new Date(log.ts).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function SqlTab({ e }: { e: ArbitrageEvent }) {
  if (!e.sql) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-zinc-400">
        No SQL queries available for this event.
      </div>
    );
  }

  return (
    <>
      <Section title="Detection Query">
        <pre className="overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-[11px] text-zinc-100">
          {e.sql.detection_query}
        </pre>
      </Section>

      <Section title="Validation Query">
        <pre className="overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-[11px] text-zinc-100">
          {e.sql.validation_query}
        </pre>
      </Section>
    </>
  );
}