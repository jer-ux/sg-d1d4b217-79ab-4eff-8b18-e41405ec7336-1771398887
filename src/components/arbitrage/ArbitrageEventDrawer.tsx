"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, AlertTriangle, FileText, Hash, CheckCircle2, Lock, Activity } from "lucide-react";
import { EvidenceReceipt3D, DataFlowVisualization } from "@/components/platform/PremiumGraphics";
import type { ArbitrageEvent } from "@/pages/arbitrage-events";

function Chip({ label, className }: { label: string; className: string }) {
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${className}`}>{label}</span>;
}

export function ArbitrageEventDrawer({
  open,
  onClose,
  event,
}: {
  open: boolean;
  onClose: () => void;
  event: ArbitrageEvent | null;
}) {
  if (!event) return null;

  const detail = event.detailedExplanation;

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
                  <div className="mt-1 text-lg font-semibold">{event.title}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <Chip label={event.severity} className="border-rose-400/25 bg-rose-400/10 text-rose-100" />
                    <Chip label={event.status} className="border-white/15 bg-white/[0.05] text-white/80" />
                    <Chip label={event.carrier} className="border-white/15 bg-white/[0.05] text-white/80" />
                    <Chip label={event.id} className="border-white/15 bg-white/[0.05] text-white/80" />
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
              {detail && (
                <>
                  {/* Narrative */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-white/70" />
                      Executive Explanation
                    </div>
                    <div className="mt-3 text-base font-semibold">{detail.headline}</div>
                    <ul className="mt-3 space-y-2 text-sm text-white/70">
                      {detail.executiveSummary.map((x, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-sm text-white/70">
                      <span className="text-white/85">Why it matters:</span> {detail.whyItMatters}
                    </div>
                    <div className="mt-3 text-sm text-white/70">
                      <span className="text-white/85">What to do next:</span> {detail.whatToDoNext}
                    </div>
                    <div className="mt-3 text-xs text-white/55">{detail.gatingNote}</div>
                  </div>

                  {/* Premium 3D Evidence Receipt Visualization */}
                  <div className="mt-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/90">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      Evidence Receipt (Interactive)
                    </div>
                    <EvidenceReceipt3D />
                  </div>

                  {/* Data Flow Visualization */}
                  <div className="mt-4">
                    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/90">
                      <Activity className="h-4 w-4 text-blue-400" />
                      Data Lineage Pipeline
                    </div>
                    <DataFlowVisualization />
                  </div>
                </>
              )}

              {/* Key Metrics */}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <AlertTriangle className="h-4 w-4 text-white/70" />
                    Impact Analysis
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-white/70">
                    <div className="flex justify-between">
                      <span>Estimated Impact</span>
                      <span className="text-white/85">{event.estImpact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Severity</span>
                      <span className="text-white/85">{event.severity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status</span>
                      <span className="text-white/85">{event.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Updated</span>
                      <span className="text-white/85">{event.updated}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Hash className="h-4 w-4 text-white/70" />
                    Event Details
                  </div>
                  <div className="mt-3 space-y-2 text-xs text-white/70">
                    <div className="flex justify-between">
                      <span>Event ID</span>
                      <span className="text-white/85">{event.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Carrier</span>
                      <span className="text-white/85">{event.carrier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category</span>
                      <span className="text-white/85">Financial Arbitrage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Verification</span>
                      <span className="inline-flex items-center gap-2 text-white/85">
                        <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                        Demo Mode
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm font-medium">Technical Description</div>
                <div className="mt-2 text-sm text-white/70">
                  {event.description}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-sm font-medium">Available Actions</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button className="rounded-xl px-4 py-2 text-sm border border-white/15 bg-white/[0.07] hover:bg-white/[0.10]">
                    Generate Action Packet
                  </button>
                  <button className="rounded-xl px-4 py-2 text-sm border border-white/15 bg-white/[0.07] hover:bg-white/[0.10]">
                    Export Audit Report
                  </button>
                  <button className="rounded-xl px-4 py-2 text-sm border border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/[0.06]">
                    Assign Owner
                  </button>
                </div>
                <div className="mt-3 text-xs text-white/55">
                  This is a demo environment. Full actions require backend integration.
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}