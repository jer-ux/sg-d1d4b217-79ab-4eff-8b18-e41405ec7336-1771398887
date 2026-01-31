"use client";

import * as React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Layers, Radar, Box, Database, Gavel, Cpu, Lock, LineChart } from "lucide-react";

import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Hero3D } from "@/components/Hero3D";
import {
  DataFlowVisualization,
  KPIDashboardPreview,
  EvidenceReceipt3D,
  ArbitrageDetectionViz,
  NetworkGraphAnimation,
  GradientMeshBackground
} from "@/components/platform/PremiumGraphics";

type Why = {
  buyer: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  outcome: string;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

function GlassPanel(props: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03]",
        "shadow-[0_20px_80px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.06)_inset]",
        "backdrop-blur-xl",
        props.className ?? "",
      ].join(" ")}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1000px_500px_at_20%_10%,rgba(56,189,248,0.15),transparent_60%),radial-gradient(800px_400px_at_80%_40%,rgba(168,85,247,0.12),transparent_55%)]" />
      <div className="relative">{props.children}</div>
    </div>
  );
}

function KPIChip({ label, tone }: { label: string; tone: "verified" | "pending" | "risk" }) {
  const styles =
    tone === "verified"
      ? "border-emerald-400/30 bg-emerald-400/15 text-emerald-50 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
      : tone === "risk"
      ? "border-rose-400/30 bg-rose-400/15 text-rose-50 shadow-[0_0_20px_rgba(244,63,94,0.3)]"
      : "border-amber-300/30 bg-amber-300/15 text-amber-50 shadow-[0_0_20px_rgba(251,191,36,0.3)]";

  return (
    <span className={["inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium backdrop-blur-sm", styles].join(" ")}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-90 shadow-[0_0_8px_currentColor]" />
      {label}
    </span>
  );
}

const whys: Why[] = [
  // CFO / Finance
  {
    buyer: "CFO / Finance",
    title: "Board-defensible numbers",
    body: "Replace dashboard optimism with audited truth—every KPI carries provenance and proof.",
    icon: <ShieldCheck className="h-4 w-4" />,
    outcome: "Fewer re-works, faster approvals",
  },
  {
    buyer: "CFO / Finance",
    title: "Faster close, fewer surprises",
    body: "Identify breakpoints early: cash leakage, cost drift, and margin illusions before month-end.",
    icon: <LineChart className="h-4 w-4" />,
    outcome: "Close velocity + predictability",
  },
  {
    buyer: "CFO / Finance",
    title: "Variance attribution without politics",
    body: "Move from blame to mechanics—pin variance to timing, scope, classification, DQ, or leakage.",
    icon: <Radar className="h-4 w-4" />,
    outcome: "Driver-based decisions",
  },
  {
    buyer: "CFO / Finance",
    title: "EBITDA that holds up",
    body: "Quantify impact with receipts so savings claims survive audit, procurement, and the board.",
    icon: <Sparkles className="h-4 w-4" />,
    outcome: "Credible value creation",
  },

  // Audit / Risk / Compliance
  {
    buyer: "Audit / Risk",
    title: "Receipts as control fabric",
    body: "Source hash, transform hash, freshness, tests, owner, confidence—attached to every claim.",
    icon: <Gavel className="h-4 w-4" />,
    outcome: "Controls you can prove",
  },
  {
    buyer: "Audit / Risk",
    title: "Reduced audit labor",
    body: "Shift from sampling to traceability—pull citations and receipts in minutes, not weeks.",
    icon: <Database className="h-4 w-4" />,
    outcome: "Lower audit cost",
  },
  {
    buyer: "Audit / Risk",
    title: "Explainable governance",
    body: "Every decision has a rationale chain—no black boxes in the control environment.",
    icon: <Layers className="h-4 w-4" />,
    outcome: "Lower model risk",
  },
  {
    buyer: "Audit / Risk",
    title: "Regulatory readiness",
    body: "Operationalize defensibility so audits become routine, not trauma.",
    icon: <Lock className="h-4 w-4" />,
    outcome: "Always-ready posture",
  },

  // Benefits / HR / Fiduciary
  {
    buyer: "Benefits / Fiduciary",
    title: "Fee transparency at scale",
    body: "Expose provider economics and indirect comp patterns across plan years—without fire drills.",
    icon: <Database className="h-4 w-4" />,
    outcome: "Clear fee narratives",
  },
  {
    buyer: "Benefits / Fiduciary",
    title: "Fiduciary risk detection",
    body: "Surface conflicts and related-party exposure before they become reputational events.",
    icon: <ShieldCheck className="h-4 w-4" />,
    outcome: "Lower fiduciary risk",
  },
  {
    buyer: "Benefits / Fiduciary",
    title: "Vendor accountability",
    body: "Stop \"trust me\" reporting—force consistent, reconciled truths across sources.",
    icon: <Gavel className="h-4 w-4" />,
    outcome: "Hard vendor leverage",
  },
  {
    buyer: "Benefits / Fiduciary",
    title: "Better plan outcomes",
    body: "Find leakage, rationalize vendors, translate complexity into actions that improve economics.",
    icon: <Sparkles className="h-4 w-4" />,
    outcome: "Better participant outcomes",
  },

  // COO / Operations
  {
    buyer: "COO / Ops",
    title: "Execution alignment",
    body: "Tie operational actions to financial impact with a single chain of evidence.",
    icon: <Layers className="h-4 w-4" />,
    outcome: "Less drift, more delivery",
  },
  {
    buyer: "COO / Ops",
    title: "Fewer meetings, faster escalation",
    body: "The War Room replaces status theater with prioritized, quantified action packets.",
    icon: <Radar className="h-4 w-4" />,
    outcome: "Shorter decision cycles",
  },
  {
    buyer: "COO / Ops",
    title: "Systemic bottleneck visibility",
    body: "Stop local optimization—see where data/workflows/policies create enterprise drag.",
    icon: <Cpu className="h-4 w-4" />,
    outcome: "Structural fixes",
  },
  {
    buyer: "COO / Ops",
    title: "Operational resilience",
    body: "Detect regressions early, route to the right owner, and measure resolution.",
    icon: <ShieldCheck className="h-4 w-4" />,
    outcome: "Less chaos, more control",
  },

  // CIO / Data / Engineering
  {
    buyer: "CIO / Data",
    title: "Snowflake-native and deterministic",
    body: "Repeatable ingestion patterns + governed transforms—built for scale, not heroics.",
    icon: <Database className="h-4 w-4" />,
    outcome: "Lower platform toil",
  },
  {
    buyer: "CIO / Data",
    title: "Less data swamp, more product",
    body: "Standardized ingestion contracts reduce one-off pipelines and brittle glue code.",
    icon: <Box className="h-4 w-4" />,
    outcome: "Faster onboarding",
  },
  {
    buyer: "CIO / Data",
    title: "Test gating by default",
    body: "If upstream fails, downstream is blocked—teams stop shipping unreliable insight.",
    icon: <Lock className="h-4 w-4" />,
    outcome: "Trust at runtime",
  },
  {
    buyer: "CIO / Data",
    title: "Enterprise multi-tenant readiness",
    body: "Isolation, keys, governance—built to support enterprise contracts cleanly.",
    icon: <ShieldCheck className="h-4 w-4" />,
    outcome: "Enterprise-grade scale",
  },

  // CEO / Strategy / PE
  {
    buyer: "CEO / Strategy",
    title: "Value creation narrative",
    body: "Translate operations into valuation—turn performance into a board-level story with proof.",
    icon: <LineChart className="h-4 w-4" />,
    outcome: "Higher confidence multiples",
  },
  {
    buyer: "CEO / Strategy",
    title: "Faster diligence",
    body: "Compress diligence cycles by making truth queryable: drivers, receipts, reconciliations.",
    icon: <Radar className="h-4 w-4" />,
    outcome: "Faster deals, fewer surprises",
  },
  {
    buyer: "CEO / Strategy",
    title: "Operating system, not analytics",
    body: "Governance infrastructure that continuously produces verified decisions.",
    icon: <Cpu className="h-4 w-4" />,
    outcome: "Repeatable execution edge",
  },
  {
    buyer: "CEO / Strategy",
    title: "Competitive advantage through trust",
    body: "The market rewards teams that can prove reality faster than peers.",
    icon: <Sparkles className="h-4 w-4" />,
    outcome: "Trust becomes a moat",
  },
];

const modules = [
  {
    title: "War Room",
    desc: "Four-tile command center that routes issues into quantified action packets.",
    icon: <Radar className="h-5 w-5" />,
  },
  {
    title: "Evidence Receipts",
    desc: "Hash + lineage + tests + owner attached to every KPI and claim.",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    title: "Verified Arbitrage Engine",
    desc: "Detect leakage → prove it → quantify EBITDA impact → track realization.",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: "SEC × Form 5500 Reconciliation",
    desc: "Quarterly to plan-year alignment with variance attribution and gating.",
    icon: <Database className="h-5 w-5" />,
  },
  {
    title: "Deterministic Benchmarking",
    desc: "Trend resets + variance decomposition executives can defend.",
    icon: <LineChart className="h-5 w-5" />,
  },
  {
    title: "Enterprise Multi-Tenant Governance",
    desc: "Isolation, controls, and audit-ready operations at scale.",
    icon: <Lock className="h-5 w-5" />,
  },
];

function WhyCard({ w }: { w: Why }) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
      <Card className="h-full border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl hover:border-white/25 hover:shadow-[0_12px_48px_rgba(139,92,246,0.25)] transition-all duration-300">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <Badge className="rounded-2xl border-white/20 bg-white/[0.08] px-3 py-1 text-white/85 shadow-lg">{w.buyer}</Badge>
            <div className="rounded-xl bg-white/10 p-2 text-white/80 shadow-lg">{w.icon}</div>
          </div>
          <CardTitle className="mt-3 text-white">{w.title}</CardTitle>
          <CardDescription className="text-white/75">{w.body}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="mt-2 text-xs text-white/65">
            <span className="font-medium text-emerald-300">Outcome:</span> {w.outcome}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function PlatformPage() {
  return (
    <>
      <SEO
        title="Platform — Kincaid IQ"
        description="A controls-first operating system for converting enterprise opacity into verified value—built on evidence receipts, a CFO-grade ledger, and action workflows."
      />
      
      <GradientMeshBackground />
      
      <div className="min-h-screen bg-[#070A12] text-white">
        {/* Enhanced Background */}
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_15%_10%,rgba(56,189,248,0.14),transparent_55%),radial-gradient(900px_500px_at_75%_30%,rgba(168,85,247,0.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:80px_80px] opacity-[0.12]" />
          <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-purple-500/10 blur-[150px]" />
          <div className="absolute right-1/4 bottom-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[140px]" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-6 py-16">
          {/* HERO */}
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <KPIChip label="VERIFIED-by-design" tone="verified" />
                <KPIChip label="Evidence Receipts on every KPI" tone="pending" />
                <KPIChip label="Board-ready narratives" tone="pending" />
                <KPIChip label="Snowflake-native scale" tone="verified" />
              </div>

              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl bg-gradient-to-br from-white via-white to-white/80 bg-clip-text text-transparent">
                Audit-grade intelligence that converts financial complexity into verified decisions.
              </h1>

              <p className="max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
                Kincaid IQ fuses <span className="font-semibold text-white">Business</span>, <span className="font-semibold text-white">Technology</span>, and{" "}
                <span className="font-semibold text-white">Leadership</span> into one operational system: evidence-backed KPIs, deterministic pipelines,
                and action packets that survive scrutiny.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Button asChild className="h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all">
                  <Link href="/contact">
                    Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button asChild variant="secondary" className="h-12 rounded-2xl border-white/20 bg-white/10 px-6 text-white backdrop-blur-xl hover:bg-white/15 hover:border-white/30 shadow-lg transition-all">
                  <Link href="/war-room">
                    View the War Room <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <div className="ml-auto hidden items-center gap-4 text-xs text-white/60 md:flex">
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" /> Verified gating
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Database className="h-4 w-4 text-sky-400" /> Deterministic lineage
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Gavel className="h-4 w-4 text-amber-400" /> Audit-grade outputs
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <GlassPanel className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">The Operator Console</h2>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                        Your executive command center: KPIs, receipts, and arbitrage events tied together with a single chain of evidence.
                      </p>
                    </div>
                    <Badge className="rounded-2xl border-white/20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 px-3 py-1 text-white shadow-lg backdrop-blur-sm">Premium UI</Badge>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4 shadow-lg backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Evidence Receipt</div>
                        <Badge className="rounded-xl border-emerald-400/30 bg-emerald-400/15 px-2.5 py-0.5 text-xs text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]">VERIFIED</Badge>
                      </div>
                      <div className="mt-3 space-y-2 text-xs text-white/70">
                        <div className="flex justify-between">
                          <span>Source hash</span>
                          <span className="font-mono text-white/90">sha256:•••a91f</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transform hash</span>
                          <span className="font-mono text-white/90">sha256:•••d0c2</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Freshness</span>
                          <span className="text-white/90">3h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tests</span>
                          <span className="text-emerald-300">42/42 PASS</span>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4 shadow-lg backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">Arbitrage Event</div>
                        <Badge className="rounded-xl border-rose-400/30 bg-rose-400/15 px-2.5 py-0.5 text-xs text-rose-100 shadow-[0_0_15px_rgba(244,63,94,0.3)]">HIGH</Badge>
                      </div>
                      <div className="mt-3 space-y-2 text-xs text-white/70">
                        <div className="flex justify-between">
                          <span>Type</span>
                          <span className="text-white/90">SEC × 5500 Variance</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Metric</span>
                          <span className="text-white/90">Employer Contributions</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Variance</span>
                          <span className="text-rose-300">+11.8%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fix next</span>
                          <span className="text-white/90">Validate tag drift</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-5 bg-white/15" />

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4 shadow-lg backdrop-blur-sm hover:border-white/25 transition-all">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Layers className="h-4 w-4 text-purple-300" /> Business Lens
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-white/75">
                        Economic truth at decision speed. KPI claims must reconcile, or they don&apos;t ship.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4 shadow-lg backdrop-blur-sm hover:border-white/25 transition-all">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Cpu className="h-4 w-4 text-sky-300" /> Technology Lens
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-white/75">
                        Deterministic pipelines, test gates, and receipts. No brittle &quot;trust me&quot; transforms.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-4 shadow-lg backdrop-blur-sm hover:border-white/25 transition-all">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Gavel className="h-4 w-4 text-amber-300" /> Leadership Lens
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-white/75">
                        Ownership, review, escalation. Decisions get made, measured, and institutionalized.
                      </p>
                    </div>
                  </div>
                </GlassPanel>
              </div>

              <div className="lg:col-span-5">
                <EvidenceReceipt3D />
                <div className="mt-4 rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-400/10 via-rose-400/5 to-transparent p-5 shadow-[0_20px_70px_rgba(251,191,36,0.2)] backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Operating Principle</div>
                    <Badge className="rounded-xl border-white/20 bg-white/[0.08] px-3 py-1 text-white/85 shadow-lg">Codified</Badge>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    If a financial claim cannot be tied to a filing, a plan, a period, and a receipt, it does not exist in Kincaid IQ.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Premium Graphics Section - Data Flow */}
            <motion.div variants={fadeUp} className="mt-10">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Deterministic Data Pipeline</h3>
                <p className="mt-2 text-sm text-white/75">
                  Every transformation is repeatable, testable, and traceable—from source to insight.
                </p>
              </div>
              <DataFlowVisualization />
            </motion.div>

            {/* Premium Graphics Section - KPI Dashboard */}
            <motion.div variants={fadeUp} className="mt-10">
              <KPIDashboardPreview />
            </motion.div>

            {/* Hero3D Component */}
            <motion.div variants={fadeUp} className="mt-10">
              <Hero3D />
            </motion.div>

            {/* Premium Graphics Section - Network Graph */}
            <motion.div variants={fadeUp} className="mt-10">
              <NetworkGraphAnimation />
            </motion.div>

            {/* MODULES */}
            <motion.div variants={fadeUp} className="mt-14">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold">Platform Modules</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75">
                    Built to integrate executive decisioning, governance, and data systems into one coherent operating environment.
                  </p>
                </div>
                <Button asChild variant="secondary" className="rounded-2xl border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-white/15 hover:border-white/30 shadow-lg transition-all">
                  <Link href="/platform">
                    Explore modules <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <motion.div variants={stagger} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {modules.map((m) => (
                  <motion.div key={m.title} variants={fadeUp} whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 280, damping: 20 }}>
                    <Card className="h-full border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-xl hover:border-white/25 hover:shadow-[0_12px_48px_rgba(139,92,246,0.25)] transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="rounded-xl bg-white/10 p-2.5 text-white/90 shadow-lg">{m.icon}</div>
                          <Badge className="rounded-xl border-white/20 bg-white/[0.08] px-3 py-1 text-white/85 shadow-lg">Core</Badge>
                        </div>
                        <CardTitle className="mt-3 text-white">{m.title}</CardTitle>
                        <CardDescription className="text-white/75">{m.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Premium Graphics Section - Arbitrage Detection */}
            <motion.div variants={fadeUp} className="mt-14">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">Real-Time Arbitrage Detection</h3>
                <p className="mt-2 text-sm text-white/75">
                  Continuous monitoring across SEC filings, Form 5500, and internal ledgers—surface variances instantly.
                </p>
              </div>
              <ArbitrageDetectionViz />
            </motion.div>

            {/* 24 WHYS */}
            <motion.div variants={fadeUp} className="mt-16">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-semibold">Why buyers choose Kincaid IQ</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/75">
                    Different stakeholders buy for different reasons. This page makes every reason feel inevitable.
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  Harvard MBA copy. CFO-grade tone.
                </div>
              </div>

              <motion.div variants={stagger} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {whys.map((w) => (
                  <WhyCard key={`${w.buyer}-${w.title}`} w={w} />
                ))}
              </motion.div>
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeUp} className="mt-16">
              <GlassPanel className="p-7">
                <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-8">
                    <h3 className="text-xl font-semibold">Want the demo that feels like a real operating system?</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75">
                      We&apos;ll walk through the War Room, click into a fully expanded Arbitrage Event, and show the receipts that make the
                      claims audit-grade.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <KPIChip label="Executive Narrative" tone="verified" />
                      <KPIChip label="Receipts + Lineage" tone="verified" />
                      <KPIChip label="Variance Attribution" tone="pending" />
                      <KPIChip label="Action Packets" tone="pending" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                    <Button asChild className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.4)] hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all lg:w-auto">
                      <Link href="/contact">
                        Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="secondary" className="w-full rounded-2xl border-white/20 bg-white/10 text-white backdrop-blur-xl hover:bg-white/15 hover:border-white/30 shadow-lg transition-all lg:w-auto">
                      <Link href="/contact">
                        Talk to us <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <div className="text-xs text-white/60">
                      Tip: Drop your 3D assets into <span className="text-white/80">/public/platform/</span> and replace placeholders.
                    </div>
                  </div>
                </div>
              </GlassPanel>
            </motion.div>

            {/* Footer note */}
            <motion.div variants={fadeUp} className="mt-10 text-center text-xs text-white/50">
              &quot;VERIFIED or it didn&apos;t happen.&quot; — Kincaid IQ
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}