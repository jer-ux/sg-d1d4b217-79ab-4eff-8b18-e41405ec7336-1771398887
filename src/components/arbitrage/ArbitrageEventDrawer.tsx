"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, AlertTriangle, FileText, Hash, CheckCircle2, Lock } from "lucide-react";

type Verification = "VERIFIED" | "NOT_VERIFIED";

type EventDetail = {
  event: any;
  narrative: {
    headline: string;
    executive_summary: string[];
    why_it_matters: string;
    what_to_do_next: string;
    gating_note: string;
  };
};

function tone(severity?: string) {
  if (severity === "CRITICAL") return "border-rose-400/25 bg-rose-400/10 text-rose-100";
  if (severity === "HIGH") return "border-amber-300/25 bg-amber-300/10 text-amber-100";
  return "border-white/15 bg-white/[0.05] text-white/80";
}

function Chip({ label, className }: { label: string; className: string }) {
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${className}`}>{label}</span>;
}

function JsonPretty({ value }: { value: any }) {
  const txt = React.useMemo(() => {
    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  }, [value]);

  return (
    <pre className="mt-2 max-h-72 overflow-auto rounded-xl border border-white/10 bg-black/30 p-4 text-xs text-white/75">
      {txt}
    </pre>
  );
}

function ReceiptPanel({ receiptId }: { receiptId?: string | null }) {
  const [data, setData] = React.useState<any | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!receiptId) return;
    let alive = true;
    setLoading(true);
    setData(null);

    fetch(`/api/receipts/${encodeURIComponent(receiptId)}`)
      .then((r) => r.json())
      .then((j) => alive && setData(j.receipt))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [receiptId]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Evidence Receipt Explorer</div>
        <span className="text-xs text-white/55">{receiptId ?? "—"}</span>
      </div>

      {loading && <div className="mt-3 text-sm text-white/60">Loading receipt…</div>}

      {!loading && !data && (
        <div className="mt-3 text-sm text-white/60">
          No receipt loaded. (Event may be missing `ingest_receipt_id`.)
        </div>
      )}

      {!loading && data && (
        <div className="mt-3 space-y-2 text-xs text-white/70">
          <div className="flex justify-between">
            <span>Type</span>
            <span className="text-white/85">{data.receipt_type ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span>Verified</span>
            <span className="text-white/85">{String(data.verified)}</span>
          </div>
          <div className="flex justify-between">
            <span>Confidence</span>
            <span className="text-white/85">{data.confidence ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span>Source</span>
            <span className="text-white/85">{data.source_system ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span>Artifact</span>
            <span className="text-white/85 truncate max-w-[260px]">{data.source_artifact_name ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span>Artifact hash</span>
            <span className="text-white/85 truncate max-w-[260px]">{data.source_artifact_hash ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span>Transform</span>
            <span className="text-white/85 truncate max-w-[260px]">{data.transform_name ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span>Transform hash</span>
            <span className="text-white/85 truncate max-w-[260px]">{data.transform_hash ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span>Period key</span>
            <span className="text-white/85">{data.period_key ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span>DQ Run</span>
            <span className="text-white/85">{data.dq_run_id ?? "—"}</span>
          </div>

          <div className="mt-3 text-xs text-white/55">Lineage payload</div>
          <JsonPretty value={data.lineage_json ?? {}} />
        </div>
      )}
    </div>
  );
}

function DQPanel({ dqRunId }: { dqRunId?: string | null }) {
  const [rows, setRows] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [onlyFail, setOnlyFail] = React.useState(true);

  React.useEffect(() => {
    if (!dqRunId) return;
    let alive = true;
    setLoading(true);
    setRows([]);

    fetch(`/api/dq?dq_run_id=${encodeURIComponent(dqRunId)}&only_fail=${onlyFail ? "1" : "0"}`)
      .then((r) => r.json())
      .then((j) => alive && setRows(j.rows ?? []))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [dqRunId, onlyFail]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-medium">DQ Failures & Gates</div>
          <div className="text-xs text-white/55 mt-1">dq_run_id: {dqRunId ?? "—"}</div>
        </div>
        <button
          onClick={() => setOnlyFail((v) => !v)}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-white/75 hover:bg-white/[0.08]"
        >
          {onlyFail ? "Showing FAIL only" : "Showing ALL"}
        </button>
      </div>

      {loading && <div className="mt-3 text-sm text-white/60">Loading DQ results…</div>}

      {!loading && dqRunId && rows.length === 0 && (
        <div className="mt-3 text-sm text-white/60">
          No rows returned. If this is unexpected, check `GOV.DQ_RESULTS` and dq_run_id mapping.
        </div>
      )}

      {!loading && rows.length > 0 && (
        <div className="mt-4 space-y-3">
          {rows.slice(0, 25).map((r) => (
            <div key={`${r.test_id}-${r.executed_ts}`} className="rounded-xl border border-white/10 bg-black/25 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-white/55">{r.test_id} • {r.severity} • {r.status}</div>
                  <div className="mt-1 text-sm font-medium">{r.test_name}</div>
                  <div className="mt-1 text-xs text-white/60">{r.object_name}</div>
                </div>
                <div className="text-right text-xs text-white/60">
                  <div>metric: <span className="text-white/80">{r.metric_value ?? "—"}</span></div>
                  <div>threshold: <span className="text-white/80">{r.threshold_value ?? "—"}</span></div>
                  <div>fails: <span className="text-white/80">{r.fail_count ?? "—"}</span></div>
                </div>
              </div>

              {r.notes && <div className="mt-2 text-xs text-white/60">{r.notes}</div>}

              {r.sample_json && (
                <>
                  <div className="mt-3 text-xs text-white/55">sample_json</div>
                  <JsonPretty value={r.sample_json} />
                </>
              )}
            </div>
          ))}

          {rows.length > 25 && <div className="text-xs text-white/55">Showing first 25 rows.</div>}
        </div>
      )}
    </div>
  );
}

export function ArbitrageEventDrawer({
  open,
  onClose,
  eventId,
}: {
  open: boolean;
  onClose: () => void;
  eventId: string | null;
}) {
  const [data, setData] = React.useState<EventDetail | null>(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!open || !eventId) return;
    let alive = true;
    setLoading(true);
    setData(null);

    fetch(`/api/arbitrage-events/${encodeURIComponent(eventId)}`)
      .then((r) => r.json())
      .then((j) => alive && setData(j))
      .finally(() => alive && setLoading(false));

    return () => {
      alive = false;
    };
  }, [open, eventId]);

  const ev = data?.event;
  const verified: Verification | undefined = ev?.verification_status;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-[#060812] text-white shadow-[0_0_120px_rgba(0,0,0,0.6)]"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="sticky top-0 z-10 border-b border-white/10 bg-[#060812]/90 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <div className="text-xs text-white/55">Arbitrage Event</div>
                  <div className="mt-1 text-lg font-semibold">
                    {ev?.event_type ?? (loading ? "Loading…" : "—")}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {ev?.severity && <Chip label={ev.severity} className={tone(ev.severity)} />}
                    {verified && (
                      <Chip
                        label={verified}
                        className={
                          verified === "VERIFIED"
                            ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                            : "border-white/15 bg-white/[0.05] text-white/80"
                        }
                      />
                    )}
                    {ev?.quarter && <Chip label={ev.quarter} className="border-white/15 bg-white/[0.05] text-white/80" />}
                    {ev?.company_name && <Chip label={ev.company_name} className="border-white/15 bg-white/[0.05] text-white/80" />}
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="rounded-xl border border-white/10 bg-white/[0.04] p-2 text-white/75 hover:bg-white/[0.08]"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-5">
              {/* Narrative */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="h-4 w-4 text-white/70" />
                  Explain this event
                </div>
                <div className="mt-3 text-base font-semibold">{data?.narrative?.headline ?? "—"}</div>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  {(data?.narrative?.executive_summary ?? []).map((x, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 text-sm text-white/70">
                  <span className="text-white/85">Why it matters:</span> {data?.narrative?.why_it_matters ?? "—"}
                </div>
                <div className="mt-3 text-sm text-white/70">
                  <span className="text-white/85">Fix next:</span> {data?.narrative?.what_to_do_next ?? "—"}
                </div>
                <div className="mt-3 text-xs text-white/55">{data?.narrative?.gating_note ?? ""}</div>
              </div>

              {/* Signals */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <AlertTriangle className="h-4 w-4 text-white/70" />
                    Key signals
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-white/70">
                    {typeof ev?.drop_rate === "number" && (
                      <div className="flex justify-between">
                        <span>Drop rate</span>
                        <span className="text-white/85">{(ev.drop_rate * 100).toFixed(1)}%</span>
                      </div>
                    )}
                    {typeof ev?.coverage_rate === "number" && (
                      <div className="flex justify-between">
                        <span>Coverage</span>
                        <span className="text-white/85">{(ev.coverage_rate * 100).toFixed(1)}%</span>
                      </div>
                    )}
                    {typeof ev?.prev_coverage === "number" && (
                      <div className="flex justify-between">
                        <span>Prev coverage</span>
                        <span className="text-white/85">{(ev.prev_coverage * 100).toFixed(1)}%</span>
                      </div>
                    )}
                    {typeof ev?.variance_pct === "number" && (
                      <div className="flex justify-between">
                        <span>Variance %</span>
                        <span className="text-white/85">{(ev.variance_pct * 100).toFixed(1)}%</span>
                      </div>
                    )}
                    {typeof ev?.variance_value === "number" && (
                      <div className="flex justify-between">
                        <span>Variance $</span>
                        <span className="text-white/85">{ev.variance_value.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Owner</span>
                      <span className="text-white/85">{ev?.owner ?? "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status</span>
                      <span className="text-white/85">{ev?.status ?? "—"}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Hash className="h-4 w-4 text-white/70" />
                    Evidence + gates
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-white/70">
                    <div className="flex items-center justify-between">
                      <span>Verification</span>
                      <span className="inline-flex items-center gap-2 text-white/85">
                        {verified === "VERIFIED" ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                        ) : (
                          <Lock className="h-4 w-4 text-white/60" />
                        )}
                        {verified ?? "—"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ingest receipt</span>
                      <span className="text-white/85">{ev?.ingest_receipt_id ?? ev?.receipt_id ?? "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>DQ run</span>
                      <span className="text-white/85">{ev?.ingest_dq_run_id ?? "—"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Event ID</span>
                      <span className="text-white/85">{ev?.event_id ?? "—"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Raw payload */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-white/70" />
                  Details payload (governed)
                </div>
                <div className="text-xs text-white/55 mt-2">
                  This is the machine payload that powers action packets, audit packets, and downstream KPIs.
                </div>
                <JsonPretty value={ev?.details_json ?? ev} />
              </div>

              {/* Actions */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm font-medium">Actions</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    disabled={verified !== "VERIFIED"}
                    className={`rounded-xl px-4 py-2 text-sm border ${
                      verified === "VERIFIED"
                        ? "border-white/15 bg-white/[0.07] hover:bg-white/[0.10]"
                        : "border-white/10 bg-white/[0.03] text-white/35 cursor-not-allowed"
                    }`}
                  >
                    Generate Action Packet
                  </button>
                  <button
                    disabled={verified !== "VERIFIED"}
                    className={`rounded-xl px-4 py-2 text-sm border ${
                      verified === "VERIFIED"
                        ? "border-white/15 bg-white/[0.07] hover:bg-white/[0.10]"
                        : "border-white/10 bg-white/[0.03] text-white/35 cursor-not-allowed"
                    }`}
                  >
                    Export Audit Packet
                  </button>
                  <button className="rounded-xl px-4 py-2 text-sm border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]">
                    Assign Owner
                  </button>
                </div>
                {verified !== "VERIFIED" && (
                  <div className="mt-3 text-xs text-white/55">
                    Actions are disabled until upstream receipts are VERIFIED. (This is the moat.)
                  </div>
                )}
              </div>

              {/* Receipts + DQ (the "audit OS" panels) */}
              <div className="mt-4 grid gap-3">
                <ReceiptPanel receiptId={ev?.ingest_receipt_id ?? ev?.receipt_id ?? null} />
                <DQPanel dqRunId={ev?.ingest_dq_run_id ?? ev?.dq_run_id ?? null} />
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}