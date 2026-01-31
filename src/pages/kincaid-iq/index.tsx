import Head from "next/head";
import Link from "next/link";
import { Building2, LineChart, Shield, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FAQ } from "@/components/kincaid-iq/FAQ";
import { WarRoomPreview } from "@/components/kincaid-iq/WarRoomPreview";

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
                    className="h-11 rounded-2xl border-white/15 bg-transparent px-6"
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
                    <Link href="/war-room">Enter the Kincaid IQ War Room →</Link>
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
                  <Link href="/war-room">Enter the Kincaid IQ War Room →</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* WHAT IT DOES */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">What Kincaid IQ Does</h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <BulletCard text="Converts PBM + GLP-1 spend into a measurable model" />
                <BulletCard text="Flags leakage and outliers at the drug/category level" />
                <BulletCard text="Benchmarks vendor economics against defensible references" />
                <BulletCard text="Quantifies decision levers (controls, plan design, funding strategy)" />
                <BulletCard text="Produces board-ready reporting with traceable inputs" />
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">How It Works</h2>

              <div className="mt-10 grid gap-4 md:grid-cols-4">
                <StepCard
                  n="01"
                  title="Ingest"
                  body="Pharmacy + eligibility (minimum), then medical/contract/renewal inputs as available"
                />
                <StepCard n="02" title="Normalize" body="Clean, map, reconcile categories" />
                <StepCard n="03" title="Score" body="Compute hero KPIs with evidence trails" />
                <StepCard n="04" title="Act" body="Deliver a prioritized action path + reporting cadence" />
              </div>

              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="text-lg font-semibold">Dashboards show numbers.</div>
                <div className="mt-1 text-lg font-semibold">Kincaid IQ shows receipts.</div>
                <p className="mt-4 max-w-4xl text-white/70">
                  Every KPI is tied back to the underlying inputs—claims, contracts, and defined methodologies—so
                  leadership can defend decisions and challenge vendor narratives with confidence.
                </p>
              </div>
            </div>
          </section>

          {/* WHO IT'S FOR */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">Who It's For</h2>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <LineChart className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">CFOs & Finance Leaders</h3>
                    <p className="mt-3 text-white/70">
                      Replace opacity with precision. Defend budgets, expose vendor economics, and quantify the impact
                      of every benefits decision with traceable inputs that survive audit and board scrutiny.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-white/10 bg-white/5">
                  <CardContent className="p-8">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-xl font-semibold">HR & Benefits Leaders</h3>
                    <p className="mt-3 text-white/70">
                      Move from reactive reporting to strategic control. Get real-time visibility into plan performance,
                      outlier members, and vendor accountability with insights that drive decisions—not just dashboards.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-b border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <h2 className="text-2xl font-semibold md:text-3xl">Frequently Asked Questions</h2>
              <div className="mt-8 max-w-3xl">
                <FAQ />
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section>
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <Card className="rounded-3xl border-white/10 bg-white/5">
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-2xl font-semibold md:text-3xl">Ready to Get Started?</h3>
                  <p className="mt-3 max-w-3xl text-white/70">
                    Get in touch to see how Kincaid IQ can transform your benefits intelligence.
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
                      <a href="mailto:jer@kincaidrmc.com">jer@kincaidrmc.com</a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="h-11 rounded-2xl border-white/15 bg-transparent px-6"
                    >
                      <a href="tel:12192563331">219.256.3331</a>
                    </Button>
                  </div>

                  <p className="mt-6 text-sm text-white/60">
                    Learn more about healthcare governance in our{" "}
                    <Link href="/blog" className="text-white hover:underline">
                      Healthcare Intelligence
                    </Link>{" "}
                    series, or explore{" "}
                    <Link href="/capital-library" className="text-white hover:underline">
                      EBITDA defense systems
                    </Link>{" "}
                    across the enterprise.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>

        <SiteFooter />
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
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-white/80">
      {text}
    </div>
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