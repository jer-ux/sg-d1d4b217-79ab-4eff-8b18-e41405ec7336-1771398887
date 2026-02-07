import Head from "next/head";
import Link from "next/link";
import { Building2, LineChart, Shield, Users, Receipt, TrendingDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FAQ } from "@/components/kincaid-iq/FAQ";
import { WarRoomPreview } from "@/components/kincaid-iq/WarRoomPreview";

export default function KincaidIQHome() {
  return (
    <>
      <Head>
        <title>Kincaid IQ — Fiduciary Grade Transparency Engine</title>
        <meta
          name="description"
          content="Shows EBITDA drag with receipts. Transform employer health plans with audit-grade analytics, defensible metrics, and cryptographic evidence trails."
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <main>
          {/* HERO */}
          <section className="relative overflow-hidden border-b border-white/10">
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-[90px]" />
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 backdrop-blur-xl">
                  <Receipt className="h-3.5 w-3.5 text-violet-300" />
                  <span className="text-xs text-violet-200">Fiduciary Grade Transparency Engine</span>
                </div>

                <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                  Kincaid IQ
                </h1>
                <div className="mt-2 text-lg font-medium text-white/70">Shows EBITDA Drag With Receipts</div>

                <p className="mt-6 text-lg text-white/70 md:text-xl">
                  Transform employer health plans with audit-grade analytics, defensible metrics, and cryptographic evidence
                  trails that expose leakage and quantify decision levers.
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
                    icon={Receipt}
                    title="Evidence-Backed"
                    body="Every metric backed by verifiable claims data, contract terms, and cryptographic signatures. No black boxes."
                  />
                  <ValueCard
                    icon={TrendingDown}
                    title="EBITDA Attribution"
                    body="Direct financial impact measurement with traceable inputs showing cost drag, leakage, and verified savings."
                  />
                  <ValueCard
                    icon={Shield}
                    title="Fiduciary Grade"
                    body="Board-ready reporting with audit trails, regulatory compliance, and defensible methodologies."
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
                    spots—backed by cryptographic evidence receipts.
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
                Headline tiles only. Full app adds drill-downs, evidence trails, and exportable proof packs with receipts.
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
                <BulletCard text="Converts PBM + GLP-1 spend into measurable EBITDA impact with receipts" />
                <BulletCard text="Flags leakage and outliers at drug/category level with cryptographic evidence" />
                <BulletCard text="Benchmarks vendor economics against defensible references with audit trails" />
                <BulletCard text="Quantifies decision levers with verifiable cost attribution and traceable inputs" />
                <BulletCard text="Produces fiduciary-grade reporting with blockchain-backed proof of outcomes" />
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
                <StepCard n="02" title="Normalize" body="Clean, map, reconcile categories with evidence trails" />
                <StepCard n="03" title="Score" body="Compute hero KPIs with cryptographic receipts and audit trails" />
                <StepCard n="04" title="Act" body="Deliver prioritized action path with EBITDA attribution + reporting" />
              </div>

              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
                <div className="text-lg font-semibold">Dashboards show numbers.</div>
                <div className="mt-1 text-lg font-semibold">Kincaid IQ shows receipts.</div>
                <p className="mt-4 max-w-4xl text-white/70">
                  Every KPI is tied back to the underlying inputs—claims, contracts, and defined methodologies—with
                  cryptographic signatures and immutable audit trails so leadership can defend decisions and challenge
                  vendor narratives with confidence.
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
                      Replace opacity with fiduciary-grade precision. Show EBITDA drag with receipts, defend budgets with
                      cryptographic evidence, and quantify the impact of every benefits decision with traceable inputs that
                      survive audit and board scrutiny.
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
                      Move from reactive reporting to strategic control with evidence receipts. Get real-time visibility into
                      plan performance, outlier members, and vendor accountability with insights backed by cryptographic
                      proof—not just dashboards.
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
                  <h3 className="text-2xl font-semibold md:text-3xl">Ready to Show EBITDA Impact With Receipts?</h3>
                  <p className="mt-3 max-w-3xl text-white/70">
                    Get in touch to see how Kincaid IQ's fiduciary-grade transparency engine can transform your benefits
                    intelligence.
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
      </div>
    </>
  );
}

function ValueCard({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <Card className="rounded-3xl border-white/10 bg-white/5">
      <CardContent className="p-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 mb-3">
          <Icon className="h-4 w-4" />
        </div>
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