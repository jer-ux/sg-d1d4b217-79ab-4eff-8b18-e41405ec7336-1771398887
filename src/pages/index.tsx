import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ShieldCheck,
  Receipt,
  Activity,
  Layers,
  ChevronRight,
  Sparkles,
  Lock,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendlyPopupButton } from "@/components/calendly/CalendlyPopupButton";
import { LuxBackground } from "@/components/LuxBackground";
import { HowItWorksFlow } from "@/components/HowItWorksFlow";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function LuxTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
      <Sparkles className="h-3.5 w-3.5 text-amber-200/80" />
      {children}
    </span>
  );
}

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <div className="text-[11px] tracking-wide text-white/45">{label}</div>
      <div className="mt-1 text-sm font-semibold text-white/85">{value}</div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  bullets,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  bullets: string[];
}) {
  return (
    <Card className="rounded-3xl border-white/10 bg-white/[0.04] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
      <CardContent className="p-6">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-2xl border border-white/10 bg-black/30 p-3">
            {icon}
          </div>
          <div>
            <div className="text-lg font-semibold text-white">{title}</div>
            <div className="mt-1 text-sm text-white/60">{desc}</div>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {bullets.map((b) => (
            <div key={b} className="flex items-start gap-2 text-sm text-white/70">
              <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-300/80" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function LaneTile({
  title,
  subtitle,
  kpi,
  href,
}: {
  title: string;
  subtitle: string;
  kpi: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] transition hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-lg font-semibold text-white">{title}</div>
          <div className="mt-1 text-sm text-white/60">{subtitle}</div>
        </div>
        <Badge className="rounded-2xl border border-white/10 bg-black/30 px-3 py-1 text-white/80">
          {kpi}
        </Badge>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-white/60">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
          VERIFIED PIPELINE
        </span>
        <span className="inline-flex items-center gap-1 text-white/75 group-hover:text-white">
          Open <ChevronRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Kincaid IQ — Integrity Engineering for CFO-Grade Enterprise Intelligence</title>
        <meta
          name="description"
          content="Kincaid IQ is an integrity-first enterprise intelligence platform that turns operational and financial data into CFO/Board-grade decisions with Evidence Receipts and Verified Value tracking."
        />
      </Head>

      <div className="relative min-h-screen bg-[#070A12] text-white">
        <LuxBackground />

        {/* Top Nav */}
        <div className="sticky top-0 z-30 border-b border-white/10 bg-[#070A12]/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-2xl border border-white/10 bg-white/5" />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-white/90">Kincaid IQ</div>
                <div className="text-[11px] text-white/50">Integrity Engineering</div>
              </div>
            </Link>

            <div className="hidden items-center gap-6 text-sm text-white/70 md:flex">
              <Link className="hover:text-white" href="/platform">
                Platform
              </Link>
              <Link className="hover:text-white" href="/war-room">
                War Room
              </Link>
              <Link className="hover:text-white" href="/evidence-receipts">
                Evidence Receipts
              </Link>
              <Link className="hover:text-white" href="/verified-savings-ledger">
                Verified Value
              </Link>
              <Link className="hover:text-white" href="/security-governance">
                Security
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" className="hidden rounded-2xl md:inline-flex">
                <Link href="/contact">Contact</Link>
              </Button>
              <CalendlyPopupButton
                url="https://calendly.com/jer-kincaidrmc/30min"
                className="rounded-2xl bg-white text-black hover:bg-white/90"
              >
                Book 30 min
              </CalendlyPopupButton>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="mx-auto max-w-6xl px-6 pt-12">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2">
              <LuxTag>Audit-grade truth, not dashboard vibes</LuxTag>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <Lock className="h-3.5 w-3.5 text-white/60" />
                Fail-closed integrity gates
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <Receipt className="h-3.5 w-3.5 text-white/60" />
                Evidence Receipts on every KPI
              </span>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6">
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Kincaid IQ turns operational + financial reality into{" "}
                <span className="text-amber-200/90">CFO/Board-grade decisions</span>.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
                Not a BI layer. Not a chatbot. Kincaid IQ is an integrity-first enterprise intelligence platform:
                every KPI, savings claim, and recommendation is provable, reconciled, and auditable — with an Evidence
                Receipt attached.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CalendlyPopupButton
                url="https://calendly.com/jer-kincaidrmc/30min"
                className="h-11 rounded-2xl bg-white text-black hover:bg-white/90"
              >
                See the War Room demo <ArrowRight className="ml-2 h-4 w-4" />
              </CalendlyPopupButton>

              <Button asChild variant="outline" className="h-11 rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10">
                <Link href="/war-room">Explore War Room</Link>
              </Button>

              <div className="text-xs text-white/45">
                Typical buyer reaction: &quot;Finally… numbers we can defend.&quot; 😄
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-4">
              <StatPill label="Integrity Mode" value="Fail-closed (UNVERIFIED if broken)" />
              <StatPill label="Proof Object" value="Evidence Receipt (source → transform → tests)" />
              <StatPill label="Value Trail" value="Modeled → Verified → Realized" />
              <StatPill label="Audience" value="CFO / CHRO / COO / Board" />
            </motion.div>
          </motion.div>
        </div>

        <Separator className="mx-auto mt-12 max-w-6xl bg-white/10" />

        {/* The Way */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.div variants={fadeUp} className="max-w-3xl">
              <div className="text-xs uppercase tracking-[0.22em] text-white/45">The Way behind Kincaid IQ</div>
              <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                If it can&apos;t be proven, it&apos;s not real.
              </h2>
              <p className="mt-4 text-white/65">
                Organizations don&apos;t fail because they lack dashboards. They fail because they can&apos;t trust the numbers,
                can&apos;t reconcile the story, and can&apos;t prove impact. Kincaid IQ treats truth like an engineered system:
                every metric ships with provenance, quality tests, freshness, and ownership.
              </p>
              <p className="mt-4 text-white/65">
                The UI is the surface. The asset is Integrity Engineering — the discipline that prevents &quot;pretty lies&quot;
                and forces operational reality to be auditable.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
              <FeatureCard
                icon={<ShieldCheck className="h-5 w-5 text-emerald-200/90" />}
                title="Integrity Gates"
                desc="KPIs render only when receipts verify. Otherwise: UNVERIFIED."
                bullets={[
                  "Freshness + DQ tests enforced",
                  "Definition versioning (no silent drift)",
                  "Explicit reasons when blocked",
                ]}
              />
              <FeatureCard
                icon={<Receipt className="h-5 w-5 text-amber-200/90" />}
                title="Evidence Receipts"
                desc="Audit-grade proof object attached to every number."
                bullets={[
                  "Source + transform hash lineage",
                  "Owner + confidence scoring",
                  "Reconciliation metadata",
                ]}
              />
              <FeatureCard
                icon={<Activity className="h-5 w-5 text-sky-200/90" />}
                title="Verified Value"
                desc="Modeled → Verified → Realized impact, tracked like finance."
                bullets={[
                  "Variance attribution narratives",
                  "Action packets with owners + SLA",
                  "Realization tracking (closed loop)",
                ]}
              />
            </motion.div>
          </motion.div>
        </div>

        <Separator className="mx-auto max-w-6xl bg-white/10" />

        {/* What it is + Who it is for */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.div variants={fadeUp} className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/45">What it is</div>
                <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  A CFO-grade intelligence platform, engineered for trust.
                </h2>
                <p className="mt-4 text-white/65">
                  Kincaid IQ is an enterprise intelligence system that converts operational + financial data into
                  decisions you can defend. It combines a War Room (real-time executive lanes), Evidence Receipts (audit
                  trail), and a Verified Value Ledger (impact tracking).
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Layers className="h-4 w-4 text-white/70" />
                      War Room
                    </div>
                    <div className="mt-2 text-sm text-white/60">
                      Executive lanes for EBITDA, AR, claims integrity, and workforce efficiency.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Receipt className="h-4 w-4 text-white/70" />
                      Evidence
                    </div>
                    <div className="mt-2 text-sm text-white/60">
                      Provenance + quality + freshness + owner, per metric, per claim.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <ShieldCheck className="h-4 w-4 text-white/70" />
                      Governance
                    </div>
                    <div className="mt-2 text-sm text-white/60">
                      Fail-closed controls that prevent silent errors and uncontrolled narratives.
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                      <Activity className="h-4 w-4 text-white/70" />
                      Verified Value
                    </div>
                    <div className="mt-2 text-sm text-white/60">
                      Modeled → Verified → Realized value, tracked like finance.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/45">Who it&apos;s for</div>
                <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  Leaders who get punished for unprovable numbers.
                </h2>
                <p className="mt-4 text-white/65">
                  If your job requires explaining performance, reconciling financial truth, or defending decisions to a
                  board… this is built for you.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    "CFO",
                    "CHRO",
                    "COO",
                    "VP Finance / RevCycle",
                    "Benefits Leaders",
                    "Controllers",
                    "Risk & Compliance",
                    "Board / Audit Committee",
                    "PE / M&A Operators",
                    "Family Office Governance",
                  ].map((x) => (
                    <Badge
                      key={x}
                      className="rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-white/75"
                    >
                      {x}
                    </Badge>
                  ))}
                </div>

                <div className="mt-7 rounded-3xl border border-amber-400/15 bg-[linear-gradient(180deg,rgba(245,212,142,0.10),rgba(255,255,255,0.03))] p-6">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                      <Lock className="h-5 w-5 text-amber-200/90" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Procurement-safe positioning</div>
                      <div className="mt-1 text-sm text-white/65">
                        Kincaid IQ is designed to reduce buyer risk: auditability, governance, and integrity controls
                        aren&apos;re the core product.
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button asChild variant="outline" className="rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10">
                          <Link href="/security-governance">Security & Governance</Link>
                        </Button>
                        <Button asChild variant="ghost" className="rounded-2xl text-white/80 hover:text-white">
                          <Link href="/evidence-receipts">
                            See Evidence Receipts <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <Separator className="mx-auto max-w-6xl bg-white/10" />

        {/* How It Works Flow */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <HowItWorksFlow />
            </motion.div>
          </motion.div>
        </div>

        <Separator className="mx-auto max-w-6xl bg-white/10" />

        {/* War Room Lanes */}
        <div className="mx-auto max-w-6xl px-6 py-12">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-end justify-between gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-white/45">War Room Lanes</div>
                <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  Executive lanes that drill into ledger-level truth.
                </h2>
                <p className="mt-3 max-w-2xl text-white/65">
                  The tiles are buttons. Every click reveals the underlying dataset, KPI badges, and the Evidence Receipt
                  behind the number.
                </p>
              </div>

              <Button asChild className="hidden rounded-2xl bg-white text-black hover:bg-white/90 md:inline-flex">
                <Link href="/war-room">
                  Open War Room <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
              <LaneTile
                title="EBITDA Recovery"
                subtitle="Verified arbitrage events + realization tracking"
                kpi="Recoverable EBITDA"
                href="/war-room/ebitda"
              />
              <LaneTile
                title="AR & Cash Velocity"
                subtitle="Aging, denials, collections, payer mix drag"
                kpi="DSO • AR>90"
                href="/war-room/ar"
              />
              <LaneTile
                title="Claims Integrity"
                subtitle="Eligibility, COB, pricing variance, contract compliance"
                kpi="Leakage • Variance"
                href="/war-room/claims"
              />
              <LaneTile
                title="Workforce Efficiency"
                subtitle="Throughput, cycle time, utilization, staffing constraints"
                kpi="FTE/1k • Cycle"
                href="/war-room/workforce"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="mx-auto max-w-6xl px-6 pb-14">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <div className="text-xs uppercase tracking-[0.22em] text-white/45">Next step</div>
                <div className="mt-2 text-2xl font-semibold text-white">
                  Want the &quot;real as hell&quot; demo? Let&apos;s run it live.
                </div>
                <div className="mt-2 text-white/65">
                  We&apos;ll walk the War Room, drill into lane datasets, and show Evidence Receipts proving every KPI.
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <CalendlyPopupButton
                  url="https://calendly.com/jer-kincaidrmc/30min"
                  className="h-11 rounded-2xl bg-white text-black hover:bg-white/90"
                >
                  Book 30 min <ArrowRight className="ml-2 h-4 w-4" />
                </CalendlyPopupButton>

                <Button asChild variant="outline" className="h-11 rounded-2xl border-white/15 bg-white/5 text-white hover:bg-white/10">
                  <Link href="/evidence-receipts">Open Evidence Receipts</Link>
                </Button>
              </div>
            </div>

            <div className="mt-6 text-xs text-white/45">
              Kincaid IQ is built for internal governance and enterprise decision support. It&apos;s not personal investing advice.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}