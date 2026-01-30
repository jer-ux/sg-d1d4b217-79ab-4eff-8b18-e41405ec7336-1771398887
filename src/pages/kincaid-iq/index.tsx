import Head from "next/head";
import Link from "next/link";
import { Building2, LineChart, FileCheck, TrendingDown, Shield, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FAQ } from "@/components/kincaid-iq/FAQ";
import { WarRoomPreview } from "@/components/kincaid-iq/WarRoomPreview";

function ValueCard({ title, body }: { title: string; body: string }) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardContent className="p-5">
        <h3 className="font-medium text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/60">{body}</p>
      </CardContent>
    </Card>
  );
}

function CapabilityCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
          {icon}
        </div>
        <h3 className="mt-4 font-medium text-white">{title}</h3>
        <p className="mt-2 text-sm text-white/60">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function KincaidIQHome() {
  return (
    <>
      <Head>
        <title>Kincaid IQ — Benefits Intelligence Built for Finance</title>
        <meta
          name="description"
          content="Transform employer health plans with audit-grade analytics, defensible metrics, and CFO-ready insights that expose leakage and quantify decision levers."
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <SiteHeader active="kincaid-iq" />

        <main>
          {/* HERO */}
          <section className="relative overflow-hidden border-b border-white/10">
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[90px]" />
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="max-w-3xl">
                <div className="text-xs text-white/60">Kincaid IQ Platform</div>

                <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                  Benefits Intelligence
                </h1>
                <div className="mt-2 text-lg font-medium text-white/70">Built for Finance</div>

                <p className="mt-6 text-lg text-white/70 md:text-xl">
                  Transform employer health plans with audit-grade analytics, defensible metrics, and CFO-ready insights
                  that expose leakage and quantify decision levers.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button asChild className="h-11 rounded-2xl px-6">
                    <Link href="/contact">Request Demo</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-2xl border-white/15 bg-transparent px-6 hover:bg-white/5"
                  >
                    <Link href="#war-room">Live Platform Preview</Link>
                  </Button>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  <ValueCard
                    title="Audit-Grade Evidence"
                    body="Every metric backed by verifiable claims data, contract terms, and defined methodologies. No black boxes."
                  />
                  <ValueCard
                    title="Real-Time Analytics"
                    body="Live dashboards showing actual plan performance, spend patterns, and outlier detection across pharmacy and medical."
                  />
                  <ValueCard
                    title="CFO-Ready Reports"
                    body="Executive summaries with actionable insights, ranked decision levers, and exportable evidence packs for governance."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* WAR ROOM */}
          <section id="war-room" className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="text-xs text-white/60">Live Platform Preview</div>
                  <h2 className="mt-3 text-2xl font-semibold md:text-3xl">The Benefits War Room</h2>
                  <p className="mt-3 max-w-3xl text-white/70">
                    A transparency engine that exposes financial leakage, incentive misalignment, and structural blind
                    spots in employer health plans.
                  </p>
                </div>

                <div className="hidden md:block">
                  <Button asChild className="rounded-2xl">
                    <Link href="/war-room">Enter the War Room →</Link>
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <WarRoomPreview />
              </div>

              <p className="mt-4 text-sm text-white/60">
                Headline tiles only. Full app adds drill-downs, scenario controls, and exportable evidence packs.
              </p>

              <div className="mt-6 md:hidden">
                <Button asChild className="w-full rounded-2xl">
                  <Link href="/war-room">Enter the War Room →</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* WHAT IT DOES */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">What Kincaid IQ Does</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <CapabilityCard
                  icon={<TrendingDown className="h-5 w-5" />}
                  title="Expose Financial Leakage"
                  description="Identify overpayments, pricing anomalies, and contract deviation across pharmacy and medical claims in real time."
                />
                <CapabilityCard
                  icon={<Shield className="h-5 w-5" />}
                  title="Audit-Grade Evidence"
                  description="Every metric is backed by verifiable claims data, contract terms, and documented methodologies that survive diligence."
                />
                <CapabilityCard
                  icon={<LineChart className="h-5 w-5" />}
                  title="Rank Decision Levers"
                  description="Quantify the financial impact of every intervention—plan design changes, vendor negotiations, utilization management."
                />
                <CapabilityCard
                  icon={<Building2 className="h-5 w-5" />}
                  title="Vendor Accountability"
                  description="Track PBM pass-through guarantees, TPA performance metrics, and consultant alignment with contractual commitments."
                />
                <CapabilityCard
                  icon={<FileCheck className="h-5 w-5" />}
                  title="CFO-Ready Reporting"
                  description="Executive dashboards with actionable insights, exportable evidence packs, and governance-ready documentation."
                />
                <CapabilityCard
                  icon={<Zap className="h-5 w-5" />}
                  title="Real-Time Monitoring"
                  description="Live alerts on spend anomalies, utilization shifts, and high-cost claimants with immediate drill-down capabilities."
                />
              </div>
            </div>
          </section>

          {/* WHO IT'S FOR */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">Built for Decision Makers</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-white">CFOs & Finance Teams</h3>
                    <p className="mt-3 text-sm text-white/60">
                      Stop accepting benefits as an unknowable cost center. Get the same rigor you apply to COGS,
                      headcount, and capital allocation.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      <li>• Budget vs. actual tracking with variance attribution</li>
                      <li>• Multi-year trend analysis and forecasting</li>
                      <li>• ROI modeling for plan design changes</li>
                      <li>• Board-ready reporting and audit trails</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-white/5">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium text-white">HR & Benefits Leaders</h3>
                    <p className="mt-3 text-sm text-white/60">
                      Move from vendor-provided summaries to defensible analytics. Negotiate from a position of
                      data-backed strength.
                    </p>
                    <ul className="mt-4 space-y-2 text-sm text-white/70">
                      <li>• Vendor performance scorecards with contractual benchmarks</li>
                      <li>• Member experience insights tied to financial outcomes</li>
                      <li>• Consultant alignment verification</li>
                      <li>• Strategy recommendations with quantified impact</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">Frequently Asked Questions</h2>
              <div className="mt-8">
                <FAQ />
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-8 text-center md:p-12">
                <h2 className="text-2xl font-semibold md:text-4xl">
                  Ready to See Your Benefits Data Differently?
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
                  Schedule a demo and we'll show you exactly where your plan is leaking money—backed by your own
                  claims data.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Button asChild className="h-11 rounded-2xl px-6">
                    <Link href="/contact">Request Demo</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-2xl border-white/15 bg-transparent px-6 hover:bg-white/5"
                  >
                    <Link href="/war-room">Explore the War Room</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}