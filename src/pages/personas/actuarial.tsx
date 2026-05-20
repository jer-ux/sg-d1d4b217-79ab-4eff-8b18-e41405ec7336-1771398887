import Head from "next/head";
import Link from "next/link";
import { BarChart3, Calculator, TrendingUp, Database, FileText, Shield, Activity, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ActuarialPage() {
  return (
    <>
      <Head>
        <title>For Actuaries - SiriusB iQ AI Data Sciences Lab</title>
        <meta
          name="description"
          content="Statistical validation of PBM pricing. Monte Carlo simulations, trend decomposition, and volatility analysis for actuarial-grade contract forensics."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-black" />
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 rounded-full mb-6">
              <Calculator className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-semibold text-cyan-300">For Actuaries & Data Scientists</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              PBM Contract Forensics Meet Actuarial Science
            </h1>
            
            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
              You model drug spend trends, but PBM contracts introduce systematic bias you can't measure. Kincaid IQ provides the statistical tools to quantify it.
            </p>
            
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Monte Carlo simulations, trend decomposition, volatility analysis, and claims-level validation — all backed by actuarial methodology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kincaid-iq">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 w-full sm:w-auto">
                  Explore Kincaid IQ Platform
                </Button>
              </Link>
              <Link href="/tools/savings-calculator">
                <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 w-full sm:w-auto">
                  Interactive Savings Model
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* The Actuarial Challenge */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What PBM Contracts Hide from Your Models</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gray-900/50 border-cyan-500/30 p-6">
                <TrendingUp className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Non-Stationary Pricing</h3>
                <p className="text-gray-400 text-sm">
                  PBM pricing includes retroactive adjustments (DIR fees), post-adjudication clawbacks, and mid-year formulary changes that introduce systematic trend bias your models can't capture.
                </p>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/30 p-6">
                <Database className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Data Censoring</h3>
                <p className="text-gray-400 text-sm">
                  Claims data from PBMs arrives 60-90 days late and excludes rebate allocations, specialty pharmacy margins, and manufacturer revenue — creating incomplete loss distributions.
                </p>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/30 p-6">
                <FileText className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Contract Uncertainty</h3>
                <p className="text-gray-400 text-sm">
                  "True up" clauses, audit extrapolation rights, and undefined "administrative fees" introduce unquantifiable variance into cost projections.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistical Methodology */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Actuarial-Grade Contract Analysis</h2>
            <p className="text-center text-gray-400 mb-12">Every claim validated. Every provision quantified. Every assumption documented.</p>

            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-cyan-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500/20 rounded-full p-3 flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Monte Carlo Drug Spend Simulation</h3>
                    <p className="text-gray-400 mb-4">
                      We run 10,000 iterations across your actual claims distribution, varying contract terms to isolate the financial impact of each provision.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                      <div className="text-cyan-300">Methodology:</div>
                      <div className="text-gray-400 mt-2">
                        • Bootstrap resampling with block structure preservation<br/>
                        • Parametric uncertainty in rebate pass-through (0-100%)<br/>
                        • Non-parametric spread estimation via NADAC benchmark<br/>
                        • Confidence intervals at 90%, 95%, 99% levels
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 rounded-full p-3 flex-shrink-0">
                    <Calculator className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Trend Decomposition Analysis</h3>
                    <p className="text-gray-400 mb-4">
                      Separate legitimate utilization trends from contract-induced cost inflation. Isolate seasonal effects, policy changes, and PBM-driven variance.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-3 flex-1">
                        <div className="text-lg font-bold text-blue-400">STL Decomposition</div>
                        <div className="text-xs text-gray-400">Trend + Seasonal + Residual</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3 flex-1">
                        <div className="text-lg font-bold text-blue-400">ARIMA Forecasting</div>
                        <div className="text-xs text-gray-400">12-36 month projections</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 rounded-full p-3 flex-shrink-0">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Volatility & Risk Quantification</h3>
                    <p className="text-gray-400 mb-4">
                      Calculate Value-at-Risk (VaR) and Expected Shortfall across contract provisions. Identify which clauses introduce the most uncertainty into your cost projections.
                    </p>
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                      <div className="text-sm text-purple-300 mb-2 font-semibold">Example Output:</div>
                      <div className="text-xs text-gray-400 font-mono">
                        Rebate retention: $627K median impact, σ = $142K<br/>
                        DIR fees: $425K median, highly right-skewed (98th %ile: $680K)<br/>
                        Audit extrapolation: $384K median, binary distribution (trigger rate: 23%)
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Technical Credibility */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Built for Actuaries, By Data Scientists</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-900/50 border-cyan-500/30 p-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  Open Methodology
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  Every assumption documented. Full disclosure of bootstrap parameters, confidence intervals, and distributional choices.
                </p>
                <div className="text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded p-2">
                  Request our white paper: "Statistical Methods for PBM Contract Forensic Analysis" (42 pages, peer-reviewed)
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/30 p-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Reproducible Results
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  Seed values, sample sizes, and convergence criteria all specified. Your actuarial team can validate our work independently.
                </p>
                <div className="text-xs text-blue-300 bg-blue-500/10 border border-blue-500/30 rounded p-2">
                  Python notebooks available for enterprise clients (requires NDA)
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/30 p-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-400" />
                  Claims-Level Validation
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  We don't stop at contract analysis. We validate every finding against your actual claims data to confirm theoretical gaps match empirical losses.
                </p>
                <div className="text-xs text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded p-2">
                  Claims data ingestion via HL7 FHIR, CSV, or direct EDI 837 parsing
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-cyan-500/30 p-6">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-emerald-400" />
                  NADAC Benchmark Integration
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  Real-time integration with CMS NADAC pricing database. Calculate exact spread on every claim vs. acquisition cost benchmark.
                </p>
                <div className="text-xs text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 rounded p-2">
                  Updated weekly, 30-day rolling average with seasonal adjustment
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Request Technical Documentation</h2>
            <p className="text-xl text-gray-400 mb-8">
              Get our actuarial methodology white paper, sample Monte Carlo outputs, and API documentation for claims data integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 w-full sm:w-auto">
                  Request Technical Brief
                </Button>
              </Link>
              <Link href="/kincaid-iq">
                <Button size="lg" variant="outline" className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 w-full sm:w-auto">
                  Explore Platform
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Technical deep-dive with our data science team • Jupyter notebooks available for enterprise clients
            </p>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}