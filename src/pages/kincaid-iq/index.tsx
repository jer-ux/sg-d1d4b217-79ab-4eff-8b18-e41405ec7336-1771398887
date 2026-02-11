import Head from "next/head";
import Link from "next/link";
import { Building2, LineChart, Shield, Users, Receipt, TrendingDown, ArrowRight, TrendingUp, AlertTriangle, DollarSign, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FAQ } from "@/components/kincaid-iq/FAQ";
import { WarRoomPreview } from "@/components/kincaid-iq/WarRoomPreview";

export default function KincaidIQHome() {
  return (
    <>
      <Head>
        <title>Kincaid IQ | War Room - Recover Hidden EBITDA from Pharmacy Benefit Structures</title>
        <meta
          name="description"
          content="Kincaid IQ instruments PBM economics and healthcare cost exposure — transforming opaque claims flows into measurable capital governance."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <main>
          {/* INSTITUTIONAL HERO */}
          <section className="relative overflow-hidden border-b border-slate-800/50">
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[120px]" />
            <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 backdrop-blur-xl mb-6">
                  <Shield className="h-4 w-4 text-violet-300" />
                  <span className="text-sm text-violet-200">Executive War Room Interface</span>
                </div>

                <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
                  Recover Hidden EBITDA from Pharmacy Benefit Structures
                </h1>

                <p className="mt-8 text-xl text-slate-300 md:text-2xl">
                  Kincaid IQ instruments PBM economics and healthcare cost exposure — transforming opaque claims flows into measurable capital governance.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row justify-center">
                  <Button asChild size="lg" className="h-14 rounded-2xl px-8 text-base apple-hover-lift">
                    <Link href="#war-room">Enter the War Room</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="h-14 rounded-2xl border-slate-700 bg-slate-800/50 px-8 text-base hover:bg-slate-700/50 apple-hover-lift"
                  >
                    <Link href="#how">How It Works</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* INSTITUTIONAL PROOF POINTS */}
          <section className="border-b border-slate-800/50 bg-slate-900/30">
            <div className="mx-auto max-w-7xl px-6 py-16">
              <div className="grid gap-8 md:grid-cols-3">
                <Card className="rounded-3xl border-slate-800/50 bg-slate-900/50 backdrop-blur">
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl font-bold text-violet-400">3–8%</div>
                    <p className="mt-4 text-slate-300">
                      Average EBITDA exposure identified in pharmacy benefit structures
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-slate-800/50 bg-slate-900/50 backdrop-blur">
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl font-bold text-violet-400">48 Hours</div>
                    <p className="mt-4 text-slate-300">
                      GLP-1 exposure modeling turnaround
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-slate-800/50 bg-slate-900/50 backdrop-blur">
                  <CardContent className="p-8 text-center">
                    <div className="text-5xl font-bold text-violet-400">Board-Level</div>
                    <p className="mt-4 text-slate-300">
                      Decision interface built for CFOs and institutional investors
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* WAR ROOM INTERFACE */}
          <section id="war-room" className="border-b border-slate-800/50">
            <div className="mx-auto max-w-7xl px-6 py-24">
              <div className="mb-12 text-center">
                <h2 className="text-4xl font-bold md:text-5xl">The Executive War Room Interface</h2>
                <p className="mt-4 text-lg text-slate-300 max-w-3xl mx-auto">
                  Real-time visibility into pharmacy benefit economics with institutional-grade analytics
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="group rounded-3xl border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur transition-all hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10">
                  <CardContent className="p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 mb-6">
                      <TrendingDown className="h-7 w-7 text-red-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Verified Margin Leakage</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Quantified financial impact from spread pricing and rebate retention with cryptographic evidence trails.
                    </p>
                  </CardContent>
                </Card>

                <Card className="group rounded-3xl border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur transition-all hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10">
                  <CardContent className="p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 border border-orange-500/20 mb-6">
                      <AlertTriangle className="h-7 w-7 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Arbitrage Exposure</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Identification of economic differentials across drugs and formularies with audit-grade documentation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="group rounded-3xl border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur transition-all hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10">
                  <CardContent className="p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10 border border-yellow-500/20 mb-6">
                      <Shield className="h-7 w-7 text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">Incentive Misalignment</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Visualization of contractual divergence from employer cost minimization with evidence receipts.
                    </p>
                  </CardContent>
                </Card>

                <Card className="group rounded-3xl border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur transition-all hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10">
                  <CardContent className="p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 border border-green-500/20 mb-6">
                      <TrendingUp className="h-7 w-7 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">EBITDA Recovery Pathways</h3>
                    <p className="text-slate-300 leading-relaxed">
                      Strategic governance actions tied directly to renewal leverage with measurable financial impact.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-12">
                <WarRoomPreview />
              </div>

              <p className="mt-6 text-center text-sm text-slate-400">
                Executive dashboard preview.{" "}
                <Link href="/war-room" className="text-violet-400 underline decoration-violet-400/30 underline-offset-2 transition-colors hover:text-violet-300 hover:decoration-violet-400/60">
                  Full War Room platform
                </Link>
                {" "}includes drill-down analytics, evidence trails, and exportable proof packs.
              </p>
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section id="how" className="border-b border-slate-800/50">
            <div className="mx-auto max-w-5xl px-6 py-24">
              <h2 className="text-center text-4xl font-bold md:text-5xl mb-16">How It Works</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-6 p-8 rounded-3xl border border-slate-800/50 bg-slate-900/30 backdrop-blur transition-all hover:border-violet-500/30 hover:bg-slate-900/50">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-xl font-bold text-violet-400">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Secure Claims & Contract Ingestion</h3>
                    <p className="text-slate-300">
                      Encrypted data ingestion with cryptographic receipts and immutable audit trails for complete transparency.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-8 rounded-3xl border border-slate-800/50 bg-slate-900/30 backdrop-blur transition-all hover:border-violet-500/30 hover:bg-slate-900/50">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-xl font-bold text-violet-400">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Arbitrage Reconstruction & Economic Modeling</h3>
                    <p className="text-slate-300">
                      Advanced algorithms identify pricing differentials and structural inefficiencies with evidence-backed analysis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-8 rounded-3xl border border-slate-800/50 bg-slate-900/30 backdrop-blur transition-all hover:border-violet-500/30 hover:bg-slate-900/50">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-xl font-bold text-violet-400">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Margin Quantification & Risk Mapping</h3>
                    <p className="text-slate-300">
                      Precise EBITDA impact calculation with risk-adjusted scenarios and defensible methodologies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-8 rounded-3xl border border-slate-800/50 bg-slate-900/30 backdrop-blur transition-all hover:border-violet-500/30 hover:bg-slate-900/50">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-xl font-bold text-violet-400">
                    04
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Executive Briefing & Renewal Strategy</h3>
                    <p className="text-slate-300">
                      Board-ready presentations with actionable recommendations and quantified leverage points for negotiations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* DIFFERENTIATION */}
          <section className="border-b border-slate-800/50 bg-slate-900/30">
            <div className="mx-auto max-w-4xl px-6 py-24 text-center">
              <h2 className="text-4xl font-bold md:text-5xl mb-8">Beyond Traditional Advisory</h2>
              
              <div className="space-y-6 text-lg text-slate-300">
                <p className="leading-relaxed">
                  Traditional firms review contracts annually.<br />
                  <span className="text-white font-semibold">Kincaid IQ instruments PBM economics continuously.</span>
                </p>
                
                <p className="leading-relaxed">
                  We do not negotiate in the dark.<br />
                  <span className="text-white font-semibold">We restore price signals before renewal cycles begin.</span>
                </p>
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-3 text-left">
                <div className="flex items-start gap-3 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Continuous Monitoring</div>
                    <div className="text-sm text-slate-400">Real-time analytics, not annual reviews</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Evidence-Based</div>
                    <div className="text-sm text-slate-400">Cryptographic receipts for every metric</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Board-Ready</div>
                    <div className="text-sm text-slate-400">Institutional-grade reporting</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WHO IT'S FOR */}
          <section className="border-b border-slate-800/50">
            <div className="mx-auto max-w-7xl px-6 py-24">
              <h2 className="text-center text-4xl font-bold md:text-5xl mb-16">Who It's For</h2>

              <div className="grid gap-8 md:grid-cols-2">
                <Link href="/capital-markets">
                  <Card className="h-full rounded-3xl border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 cursor-pointer group">
                    <CardContent className="p-10">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 mb-6 transition-all group-hover:bg-violet-500/20">
                            <LineChart className="h-6 w-6 text-violet-400" />
                          </div>
                          <h3 className="text-2xl font-bold mb-4">CFOs & Finance Leaders</h3>
                          <p className="text-slate-300 leading-relaxed">
                            Replace opacity with fiduciary-grade precision. Show EBITDA drag with receipts, defend budgets with
                            cryptographic evidence, and quantify the impact of every benefits decision with traceable inputs that
                            survive audit and board scrutiny.
                          </p>
                        </div>
                        <ArrowRight className="h-6 w-6 flex-shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-violet-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/actuarial-benefits">
                  <Card className="h-full rounded-3xl border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/10 cursor-pointer group">
                    <CardContent className="p-10">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 mb-6 transition-all group-hover:bg-violet-500/20">
                            <Users className="h-6 w-6 text-violet-400" />
                          </div>
                          <h3 className="text-2xl font-bold mb-4">HR & Benefits Leaders</h3>
                          <p className="text-slate-300 leading-relaxed">
                            Move from reactive reporting to strategic control with evidence receipts. Get real-time visibility into
                            plan performance, outlier members, and vendor accountability with insights backed by cryptographic
                            proof—not just dashboards.
                          </p>
                        </div>
                        <ArrowRight className="h-6 w-6 flex-shrink-0 text-slate-400 transition-all group-hover:translate-x-1 group-hover:text-violet-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="border-b border-slate-800/50">
            <div className="mx-auto max-w-4xl px-6 py-24">
              <h2 className="text-center text-4xl font-bold md:text-5xl mb-12">Frequently Asked Questions</h2>
              <FAQ />
            </div>
          </section>

          {/* EXECUTIVE CTA */}
          <section className="py-24 px-6">
            <div className="mx-auto max-w-5xl">
              <Card className="rounded-3xl border-slate-800/50 bg-gradient-to-br from-violet-900/20 to-slate-900/40 backdrop-blur">
                <CardContent className="p-12 md:p-16 text-center">
                  <h2 className="text-4xl font-bold md:text-5xl mb-6">
                    Healthcare Expense Above Seven Figures?
                  </h2>
                  <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
                    Request a confidential War Room briefing before your next renewal cycle. See how Kincaid IQ's fiduciary-grade transparency engine transforms PBM economics into measurable capital governance.
                  </p>

                  <div className="flex flex-col gap-4 sm:flex-row justify-center">
                    <Button asChild size="lg" className="h-14 rounded-2xl px-8 text-base apple-hover-lift">
                      <Link href="/contact">Schedule Executive Session</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-14 rounded-2xl border-slate-700 bg-slate-800/50 px-8 text-base hover:bg-slate-700/50 apple-hover-lift"
                    >
                      <a href="mailto:jer@kincaidrmc.com">jer@kincaidrmc.com</a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-14 rounded-2xl border-slate-700 bg-slate-800/50 px-8 text-base hover:bg-slate-700/50 apple-hover-lift"
                    >
                      <a href="tel:12192563331">219.256.3331</a>
                    </Button>
                  </div>

                  <p className="mt-10 text-sm text-slate-400">
                    Learn more about healthcare governance in our{" "}
                    <Link href="/company" className="text-violet-400 underline decoration-violet-400/30 underline-offset-2 transition-colors hover:text-violet-300 hover:decoration-violet-400/60">
                      Healthcare Intelligence
                    </Link>{" "}
                    series, or explore{" "}
                    <Link href="/capital-library" className="text-violet-400 underline decoration-violet-400/30 underline-offset-2 transition-colors hover:text-violet-300 hover:decoration-violet-400/60">
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