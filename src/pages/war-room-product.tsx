import Head from "next/head";
import Link from "next/link";
import { Activity, AlertTriangle, LineChart, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WarRoomPreview } from "@/components/kincaid-iq/WarRoomPreview";

export default function WarRoomProduct() {
  return (
    <>
      <Head>
        <title>War Room — Real-Time Benefits Intelligence Platform</title>
        <meta
          name="description"
          content="Live analytics dashboard exposing benefits spend anomalies, vendor accountability gaps, and financial leakage in real-time with audit-grade evidence trails."
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden border-b border-white/10">
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[90px]" />
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="max-w-3xl">
                <div className="text-xs text-white/60">Command Center</div>

                <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                  The Benefits War Room
                </h1>
                <div className="mt-2 text-lg font-medium text-white/70">Real-Time Intelligence Platform</div>

                <p className="mt-6 text-lg text-white/70 md:text-xl">
                  A live analytics dashboard that exposes benefits spend anomalies, vendor accountability gaps, and
                  financial leakage in real-time—with audit-grade evidence trails that survive board scrutiny.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-11 rounded-2xl px-6">
                    <Link href="/contact">Request Demo</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-2xl border-white/15 bg-transparent px-6"
                  >
                    <Link href="/war-room">Launch Live Demo</Link>
                  </Button>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  <ValueCard
                    title="Live Visibility"
                    body="Real-time dashboards showing actual plan performance, spend patterns, and outlier detection across pharmacy and medical."
                  />
                  <ValueCard
                    title="Evidence-Backed"
                    body="Every alert tied to verifiable claims data, contract terms, and defined methodologies. No black boxes."
                  />
                  <ValueCard
                    title="Action-Ready"
                    body="Ranked decision levers with quantified impact, exportable evidence packs, and audit trails for governance."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* LIVE PREVIEW */}
          <section id="preview" className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="text-xs text-white/60">Live Platform</div>
                  <h2 className="mt-3 text-2xl font-semibold md:text-3xl">See It In Action</h2>
                  <p className="mt-3 max-w-3xl text-white/70">
                    Real-time KPIs that expose financial leakage, incentive misalignment, and structural blind spots
                    across your benefits program.
                  </p>
                </div>

                <div className="hidden md:block">
                  <Button asChild className="rounded-2xl">
                    <Link href="/war-room">Launch Full War Room →</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <WarRoomPreview />
              </div>

              <p className="mt-4 text-sm text-white/60">
                Sample metrics shown. Full platform includes drill-downs, scenario modeling, and exportable evidence
                packs.
              </p>

              <div className="mt-6 md:hidden">
                <Button asChild className="w-full rounded-2xl">
                  <Link href="/war-room">Launch Full War Room →</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* KEY CAPABILITIES */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">What the War Room Delivers</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <Activity className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">Real-Time Anomaly Detection</h3>
                    <p className="mt-3 text-white/70">
                      Automated monitoring of spend patterns, utilization trends, and vendor performance against
                      contract terms. Get alerted to issues before they compound.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-white/60">
                      <li>• PBM pass-through variance tracking</li>
                      <li>• High-cost claimant identification</li>
                      <li>• Specialty drug utilization monitoring</li>
                      <li>• Generic dispensing rate analysis</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <Shield className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">Vendor Accountability Framework</h3>
                    <p className="mt-3 text-white/70">
                      Compare what vendors promise in contracts versus what they actually deliver. Quantify gaps and
                      build evidence packs for negotiations.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-white/60">
                      <li>• Contract compliance scoring</li>
                      <li>• Guarantee validation & reconciliation</li>
                      <li>• Network performance benchmarking</li>
                      <li>• Pricing transparency audits</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">Financial Leakage Exposure</h3>
                    <p className="mt-3 text-white/70">
                      Identify and quantify where benefits dollars are leaking through structural gaps, misaligned
                      incentives, or vendor fee opacity.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-white/60">
                      <li>• Hidden spread identification</li>
                      <li>• Plan design inefficiency analysis</li>
                      <li>• Administrative fee reconciliation</li>
                      <li>• Rebate pass-through validation</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <LineChart className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">Executive Reporting & Governance</h3>
                    <p className="mt-3 text-white/70">
                      Board-ready summaries with actionable insights, ranked decision levers, and complete audit trails
                      that finance and legal can defend.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-white/60">
                      <li>• CFO-ready KPI dashboards</li>
                      <li>• Exportable evidence packs</li>
                      <li>• Scenario modeling & forecasting</li>
                      <li>• Audit trail documentation</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">How the War Room Works</h2>

              <div className="mt-10 grid gap-4 md:grid-cols-4">
                <StepCard
                  n="01"
                  title="Connect"
                  body="Integrate claims feeds, plan documents, and vendor contracts through secure data pipelines"
                />
                <StepCard
                  n="02"
                  title="Monitor"
                  body="Continuous analysis of spend patterns, utilization trends, and contract compliance in real-time"
                />
                <StepCard
                  n="03"
                  title="Alert"
                  body="Automated detection of anomalies, variances, and opportunities with evidence trails"
                />
                <StepCard
                  n="04"
                  title="Act"
                  body="Prioritized action paths with quantified impact and exportable reporting for governance"
                />
              </div>

              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="text-lg font-semibold">Most dashboards show you what happened.</div>
                <div className="mt-1 text-lg font-semibold">The War Room shows you why—and what to do about it.</div>
                <p className="mt-4 max-w-4xl text-white/70">
                  Every metric is connected to the underlying data—claims, contracts, and methodologies—so you can trace
                  from headline KPI to individual transaction. That's the difference between a dashboard and a decision
                  engine.
                </p>
              </div>
            </div>
          </section>

          {/* WHO IT'S FOR */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">Built For</h2>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <BulletCard text="CFOs demanding defensible metrics and vendor accountability" />
                <BulletCard text="Benefits leaders tired of opaque PBM reporting and hidden costs" />
                <BulletCard text="Risk managers protecting EBITDA from benefits cost volatility" />
                <BulletCard text="Finance teams preparing for vendor negotiations and renewals" />
                <BulletCard text="Board members requiring audit-grade governance documentation" />
                <BulletCard text="Private equity sponsors tracking portfolio company benefits performance" />
              </div>
            </div>
          </section>

          {/* USE CASES */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">Common Use Cases</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold">Vendor Negotiations</h3>
                    <p className="mt-3 text-white/70">
                      Armed with contract-specific variance analysis and quantified leakage, benefits leaders use the
                      War Room to challenge PBM guarantees, validate TPA performance, and negotiate from strength.
                    </p>
                    <p className="mt-3 text-sm text-white/60">
                      Typical outcome: 3-7% spend reduction through improved contract terms and accountability
                      mechanisms.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold">Plan Design Optimization</h3>
                    <p className="mt-3 text-white/70">
                      Finance teams model the impact of formulary changes, network restrictions, and utilization
                      management programs before implementation—then track results in real-time post-launch.
                    </p>
                    <p className="mt-3 text-sm text-white/60">
                      Typical outcome: 8-12% reduction in avoidable specialty drug spend through targeted interventions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold">Board Reporting & Governance</h3>
                    <p className="mt-3 text-white/70">
                      CFOs present benefits performance with the same rigor as other financial metrics—defensible KPIs,
                      variance analysis, and audit trails that satisfy fiduciary obligations.
                    </p>
                    <p className="mt-3 text-sm text-white/60">
                      Typical outcome: Elevated board confidence in benefits governance and decision-making process.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold">M&A Due Diligence</h3>
                    <p className="mt-3 text-white/70">
                      Private equity sponsors and corporate acquirers use the War Room to assess target company benefits
                      liabilities, identify integration risks, and quantify post-close optimization opportunities.
                    </p>
                    <p className="mt-3 text-sm text-white/60">
                      Typical outcome: 2-5% of deal value captured through benefits program optimization post-close.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* INTEGRATION */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">Data Integration</h2>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                <p className="text-white/70">
                  The War Room connects to your existing data infrastructure through secure, encrypted pipelines. We
                  integrate with major PBMs, TPAs, carriers, and data warehouses—pulling claims, eligibility, contracts,
                  and financial data into a unified analytics layer.
                </p>

                <div className="mt-6 grid gap-3 text-sm text-white/60 md:grid-cols-2">
                  <div>
                    <div className="font-semibold text-white">Core Data Sources:</div>
                    <ul className="mt-2 space-y-1">
                      <li>• Pharmacy claims (837, 835, flat files)</li>
                      <li>• Medical claims (837I/P, 835)</li>
                      <li>• Eligibility & demographics (834)</li>
                      <li>• Plan documents & contracts</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-semibold text-white">Optional Enhancements:</div>
                    <ul className="mt-2 space-y-1">
                      <li>• Actuarial models & forecasts</li>
                      <li>• Vendor performance reports</li>
                      <li>• Financial system exports (AP, GL)</li>
                      <li>• Third-party benchmarks</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-6 text-sm text-white/60">
                  Setup typically takes 2-4 weeks. You'll see preliminary insights within days, with full historical
                  analysis available at go-live.
                </p>
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section>
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <Card className="rounded-3xl border-white/10 bg-white/5">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-2xl font-semibold md:text-3xl">Ready to See Your Data?</h3>
                  <p className="mt-3 max-w-3xl text-white/70">
                    Request a demo to see the War Room in action with your actual claims data and vendor contracts.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="h-11 rounded-2xl px-6">
                      <Link href="/contact">Request Demo</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-11 rounded-2xl border-white/15 bg-transparent px-6"
                    >
                      <Link href="/war-room">Launch Live Demo</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-11 rounded-2xl border-white/15 bg-transparent px-6"
                    >
                      <a href="mailto:jer@kincaidrmc.com">jer@kincaidrmc.com</a>
                    </Button>
                  </div>

                  <p className="mt-6 text-sm text-white/60">
                    Explore the full{" "}
                    <Link href="/kincaid-iq" className="text-white hover:underline">
                      Kincaid IQ platform
                    </Link>
                    , or learn about our{" "}
                    <Link href="/verified-savings-ledger" className="text-white hover:underline">
                      Verified Savings Ledger
                    </Link>{" "}
                    for tracking realized benefits program improvements.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="rounded-3xl border-white/10 bg-white/5">
      <CardContent className="p-6">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-white/70">{body}</p>
      </CardContent>
    </Card>
  );
}

function BulletCard({ text }: { text: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">{text}</div>
  );
}

function StepCard({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <Card className="rounded-3xl border-white/10 bg-white/5">
      <CardContent className="p-6">
        <div className="text-xs text-white/50">{n}</div>
        <div className="mt-2 text-base font-semibold">{title}</div>
        <p className="mt-2 text-sm text-white/70">{body}</p>
      </CardContent>
    </Card>
  );
}