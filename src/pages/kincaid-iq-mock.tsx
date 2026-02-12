import React, { useMemo, useState } from "react";
import { SEO } from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";

type TileKey = "ACTUARIAL_TRUTH" | "RENEWAL_LEVERAGE" | "PROOF_TRAIL" | "GOVERNANCE";

type Detail = {
  title: string;
  subtitle: string;
  bullets: string[];
  kpis: { label: string; value: string; note?: string }[];
  evidence: { doc: string; pages: string; method: string; confidence: string }[];
};

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 md:px-10">{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold tracking-[0.18em] text-neutral-400">
      {children}
    </div>
  );
}

function PremiumBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0.88)_65%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  );
}

function MetricPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-[11px] font-semibold tracking-[0.14em] text-white/55">
        {label.toUpperCase()}
      </div>
      <div className="mt-1 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function Tile({
  title,
  desc,
  tags,
  onClick,
  active,
}: {
  title: string;
  desc: string;
  tags: string[];
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={[
        "group w-full rounded-3xl border p-6 text-left shadow-sm transition-all duration-300",
        active
          ? "border-white/25 bg-white/10 shadow-lg"
          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/7",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-lg font-semibold text-white">{title}</div>
        <motion.div
          animate={{ scale: active ? 1.05 : 1 }}
          className={[
            "rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300",
            active ? "bg-white text-neutral-950 shadow-md" : "bg-white/10 text-white/80",
          ].join(" ")}
        >
          {active ? "Active" : "Open"}
        </motion.div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{desc}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Pill key={t}>{t}</Pill>
        ))}
      </div>
      <div className="mt-6 h-px w-full bg-white/10" />
      <div className="mt-4 text-xs font-semibold tracking-[0.14em] text-white/55">
        CLICK TO DRILL IN
      </div>
    </motion.button>
  );
}

function Drawer({
  open,
  onClose,
  detail,
}: {
  open: boolean;
  onClose: () => void;
  detail: Detail;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-neutral-950 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-6 p-6 md:p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <SectionLabel>KINCAID IQ — DRILLDOWN</SectionLabel>
                <div className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  {detail.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{detail.subtitle}</p>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition-all hover:bg-white/10"
              >
                Close
              </motion.button>
            </div>

            <div className="px-6 pb-8 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <SectionLabel>EXECUTIVE TAKEAWAYS</SectionLabel>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/80">
                  {detail.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                      className="flex gap-3"
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="mt-6 grid gap-3 sm:grid-cols-2"
                >
                  {detail.kpis.map((k, i) => (
                    <motion.div
                      key={k.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.05, duration: 0.3 }}
                    >
                      <MetricPill label={k.label} value={k.value} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="mt-6 rounded-3xl border border-white/10 bg-neutral-950 p-6"
              >
                <SectionLabel>PROOF TRAIL (MOCK)</SectionLabel>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  Every KPI can link to source docs, page ranges, extraction method, and confidence.
                </p>

                <div className="mt-5 space-y-3">
                  {detail.evidence.map((e, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:bg-white/7"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-white">{e.doc}</div>
                        <div className="text-xs font-semibold text-white/60">
                          Confidence: {e.confidence}
                        </div>
                      </div>
                      <div className="mt-2 text-xs text-white/70">
                        Pages: {e.pages} • Method: {e.method}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                  className="mt-6 flex flex-col gap-3 sm:flex-row"
                >
                  <a
                    href="/proof-library"
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition-all hover:scale-105 hover:shadow-md"
                  >
                    View Full Proof Trail
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition-all hover:bg-white/10"
                  >
                    Request Executive Review
                  </a>
                </motion.div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.4 }}
                className="mt-6 text-xs text-white/40"
              >
                Mock UI for positioning. Replace with live data when KPI + evidence tables are wired.
              </motion.p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function KincaidIQMockPage() {
  const [active, setActive] = useState<TileKey | null>("ACTUARIAL_TRUTH");

  const details: Record<TileKey, Detail> = useMemo(
    () => ({
      ACTUARIAL_TRUTH: {
        title: "Actuarial Truth Layer",
        subtitle:
          "Replace broker math with normalized, multi-year, decision-grade metrics that survive CFO and board scrutiny.",
        bullets: [
          "Normalize PEPM using consistent participant definitions across years.",
          "Decompose variance so leadership knows what actually moved cost.",
          "Flag inconsistencies automatically before reporting becomes a liability.",
        ],
        kpis: [
          { label: "Normalized PEPM", value: "$612" },
          { label: "YoY Trend", value: "+4.1%" },
          { label: "Participation", value: "842 → 811" },
          { label: "Volatility", value: "Moderate" },
        ],
        evidence: [
          { doc: "Carrier Renewal Packet (2025)", pages: "pp. 12–18", method: "Table Parse", confidence: "High" },
          { doc: "Plan Enrollment Export (2024)", pages: "n/a", method: "CSV Ingest", confidence: "High" },
          { doc: "Form 5500 (2023)", pages: "pp. 1–3", method: "Structured Extract", confidence: "Med" },
        ],
      },
      RENEWAL_LEVERAGE: {
        title: "Renewal Leverage Engine",
        subtitle:
          "Win negotiations by forcing the pricing conversation onto provable drivers—not carrier storytelling.",
        bullets: [
          "Expose driver misattribution: membership shifts, carve-outs, plan drift.",
          "Create a negotiation brief executives can defend in the room.",
          "Quantify which levers move cost vs which are noise.",
        ],
        kpis: [
          { label: "Avoidable Cost", value: "3–7%" },
          { label: "Negotiation Leverage", value: "High" },
          { label: "Driver Clarity", value: "Strong" },
          { label: "Cycle Time", value: "↓ 2–4 wks" },
        ],
        evidence: [
          { doc: "Carrier Claims Summary (2025)", pages: "pp. 6–9", method: "Regex + Parse", confidence: "Med" },
          { doc: "Stop-Loss Proposal (2025)", pages: "pp. 2–4", method: "Table Parse", confidence: "High" },
          { doc: "Vendor Fee Schedule", pages: "pp. 1–2", method: "Key-Value Extract", confidence: "High" },
        ],
      },
      PROOF_TRAIL: {
        title: "Proof Trail — Receipts by Default",
        subtitle:
          "Every claim is evidence-backed. Every KPI can be clicked to sources. No uncited outputs in executive reporting.",
        bullets: [
          "Claims become first-class objects with citations and confidence.",
          "Outputs are reproducible: same inputs → same results.",
          "Escalate only edge cases to humans; keep throughput high.",
        ],
        kpis: [
          { label: "Cited KPIs", value: "100%" },
          { label: "Uncited Outputs", value: "0" },
          { label: "Replayable Runs", value: "Yes" },
          { label: "Audit Readiness", value: "High" },
        ],
        evidence: [
          { doc: "KPI: PEPM (2025)", pages: "Links: 3", method: "Claim ↔ Citation Graph", confidence: "High" },
          { doc: "KPI: Participation Trend", pages: "Links: 2", method: "Cross-Doc Reconcile", confidence: "Med" },
          { doc: "KPI: Plan Design Change", pages: "Links: 4", method: "Doc Diff + Extract", confidence: "Med" },
        ],
      },
      GOVERNANCE: {
        title: "Governance & Controls",
        subtitle:
          "Approvals, audit logs, and exception handling—so benefits decisions operate like a controlled system, not inbox chaos.",
        bullets: [
          "Fiduciary Mode: only cited + approved claims export.",
          "Overrides are logged with rationale and approver—no silent edits.",
          "Role-based access so CIOs and risk teams can sign off.",
        ],
        kpis: [
          { label: "Approval SLA", value: "< 48 hrs" },
          { label: "Overrides Logged", value: "100%" },
          { label: "RBAC Coverage", value: "Yes" },
          { label: "Export Gate", value: "CITED/APPROVED" },
        ],
        evidence: [
          { doc: "Approval Log", pages: "Run #A9F2", method: "Immutable Audit Log", confidence: "High" },
          { doc: "Override Rationale", pages: "Entry #34", method: "Signed Change Record", confidence: "High" },
          { doc: "Access Policy", pages: "Policy v1", method: "RBAC Rules", confidence: "High" },
        ],
      },
    }),
    []
  );

  const tileConfig: { key: TileKey; title: string; desc: string; tags: string[] }[] = [
    {
      key: "ACTUARIAL_TRUTH",
      title: "Actuarial Truth",
      desc: "Normalized PEPM, variance decomposition, multi-year trend. If it can't be proven, it doesn't count.",
      tags: ["Normalized", "Board-grade", "Multi-year"],
    },
    {
      key: "RENEWAL_LEVERAGE",
      title: "Renewal Leverage",
      desc: "Force negotiations onto provable drivers. Stop paying for narratives, carve-outs, and pricing games.",
      tags: ["Pricing leverage", "Drivers", "Decision brief"],
    },
    {
      key: "PROOF_TRAIL",
      title: "Proof Trail",
      desc: "Receipts by default. Every KPI links to evidence, extraction method, and confidence.",
      tags: ["Citations", "Replayable", "Audit-ready"],
    },
    {
      key: "GOVERNANCE",
      title: "Governance",
      desc: "Approvals, audit logs, and override controls. Benefits as a system, not a season.",
      tags: ["Approvals", "Audit log", "RBAC"],
    },
  ];

  const open = active !== null;
  const detail = active ? details[active] : details.ACTUARIAL_TRUTH;

  return (
    <>
      <SEO
        title="Kincaid iQ Executive Console | SiriusB iQ"
        description="Decision-grade benefits intelligence: actuarial truth, negotiation leverage, proof trails, and governance controls for middle-market benefits."
        image="/og-image.png"
      />
      <main className="relative min-h-screen bg-neutral-950 text-white">
        <PremiumBackdrop />

        <Container>
          <div className="relative py-14 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel>KINCAID IQ • INTERFACE MOCK</SectionLabel>
              <h1 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight md:text-5xl">
                Executive Console — decision-grade benefits intelligence.
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/75 md:text-base">
                Four tiles. Each drills into board-grade outputs: actuarial truth, negotiation leverage, proof trails, and governance controls.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>Middle-market benefits</Pill>
                <Pill>Evidence-backed KPIs</Pill>
                <Pill>Fiduciary Mode exports</Pill>
                <Pill>Audit-ready</Pill>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10 grid gap-4 md:grid-cols-2"
            >
              {tileConfig.map((t, i) => (
                <motion.div
                  key={t.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                >
                  <Tile
                    title={t.title}
                    desc={t.desc}
                    tags={t.tags}
                    onClick={() => setActive(t.key)}
                    active={active === t.key}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <SectionLabel>HOW TO USE THIS MOCK</SectionLabel>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                Add this route to your site and link it from the homepage "See Proof Trail" CTA. It will instantly communicate
                premium product posture: governance + evidence + actuarial accuracy — not broker vibes.
              </p>
            </motion.div>
          </div>
        </Container>

        <Drawer open={open} onClose={() => setActive(null)} detail={detail} />
      </main>
    </>
  );
}