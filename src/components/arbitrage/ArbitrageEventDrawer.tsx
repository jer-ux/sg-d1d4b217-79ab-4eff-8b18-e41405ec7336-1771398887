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
                    {verified === "VERIFIED" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    ) : (
                      <Lock className="h-4 w-4 text-white/70" />
                    )}
                    Verification
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-white/70">
                    <div className="flex justify-between">
                      <span>Status</span>
                      <span className={verified === "VERIFIED" ? "text-emerald-400" : "text-white/85"}>
                        {verified ?? "—"}
                      </span>
                    </div>
                    {ev?.evidence_hash && (
                      <div className="flex justify-between">
                        <span>Evidence hash</span>
                        <span className="font-mono text-white/85">{ev.evidence_hash.slice(0, 8)}…</span>
                      </div>
                    )}
                    {ev?.receipt_id && (
                      <div className="flex justify-between">
                        <span>Receipt ID</span>
                        <span className="font-mono text-white/85">{ev.receipt_id.slice(0, 8)}…</span>
                      </div>
                    )}
                    {ev?.created_at && (
                      <div className="flex justify-between">
                        <span>Created</span>
                        <span className="text-white/85">{new Date(ev.created_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Event payload */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Hash className="h-4 w-4 text-white/70" />
                  Event payload (JSON)
                </div>
                {ev && <JsonPretty value={ev} />}
              </div>

              {/* Actions */}
              {verified === "VERIFIED" && (
                <div className="mt-4 flex flex-wrap gap-3">
                  <button className="rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-400/15">
                    Generate Action Packet
                  </button>
                  <button className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/85 hover:bg-white/[0.05]">
                    Assign Owner
                  </button>
                  <button className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/85 hover:bg-white/[0.05]">
                    Export to Snowflake
                  </button>
                </div>
              )}

              {verified === "NOT_VERIFIED" && (
                <div className="mt-4 rounded-xl border border-amber-300/25 bg-amber-300/10 p-4 text-sm text-amber-100">
                  <div className="flex items-center gap-2 font-medium">
                    <Lock className="h-4 w-4" />
                    Actions disabled
                  </div>
                  <div className="mt-2 text-xs text-amber-100/80">
                    This event is NOT VERIFIED. Complete upstream receipts and DQ gates to unlock action packets.
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}