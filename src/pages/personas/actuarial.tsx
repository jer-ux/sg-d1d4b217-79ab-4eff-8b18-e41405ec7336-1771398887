import Head from "next/head";
import Link from "next/link";
import { BarChart3, Calculator, TrendingUp, Target, Database, ArrowRight, CheckCircle2, Activity } from "lucide-react";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ActuariesPage() {
  return (
    <>
      <Head>
        <title>For Actuaries: Predictive Healthcare Analytics | SiriusB iQ</title>
        <meta
          name="description"
          content="Actuarial-grade pharmacy benefit modeling, trend decomposition, and risk assessment tools for healthcare cost projections."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-cyan-950 via-slate-950 to-black text-white">
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/30 rounded-full mb-8 backdrop-blur-sm">
              <Calculator className="w-5 h-5 text-cyan-300" />
              <span className="text-sm font-semibold text-cyan-200">Actuaries & Risk Analysts</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-cyan-200 via-teal-300 to-blue-200 bg-clip-text text-transparent leading-tight">
              Modeling<br />That Holds Up
            </h1>
            
            <p className="text-2xl text-cyan-100 mb-6 max-w-3xl leading-relaxed">
              PBM trend reports are <span className="text-cyan-300 font-bold">marketing documents, not actuarial work</span>. They smooth over claim-level volatility, mix utilization with unit cost, and hide contract-driven inflation.
            </p>
            
            <p className="text-lg text-cyan-300/80 mb-10 max-w-2xl">
              SiriusB iQ delivers actuarial-grade pharmacy benefit analytics: raw claims data, trend decomposition, Monte Carlo simulations, and NADAC benchmarking — built for risk assessment, not sales pitches.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-lg px-8 py-6 shadow-2xl shadow-cyan-500/50">
                See Actuarial Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/20 text-lg px-8 py-6">
                View Methodology Paper
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <Card className="bg-cyan-900/30 border-cyan-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-cyan-300 mb-2">15M+</div>
                <div className="text-sm text-cyan-200">Claims Analyzed</div>
                <div className="text-xs text-cyan-400 mt-2">Rx + medical data</div>
              </Card>
              <Card className="bg-teal-900/30 border-teal-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-teal-300 mb-2">95%</div>
                <div className="text-sm text-teal-200">Confidence Intervals</div>
                <div className="text-xs text-teal-400 mt-2">Monte Carlo validated</div>
              </Card>
              <Card className="bg-blue-900/30 border-blue-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-blue-300 mb-2">NADAC</div>
                <div className="text-sm text-blue-200">Benchmark Standard</div>
                <div className="text-xs text-blue-400 mt-2">Weekly updated</div>
              </Card>
              <Card className="bg-indigo-900/30 border-indigo-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-indigo-300 mb-2">API</div>
                <div className="text-sm text-indigo-200">Data Access</div>
                <div className="text-xs text-indigo-400 mt-2">For your models</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-black to-cyan-950/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
              What Actuaries Actually Need
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-cyan-950/40 to-teal-950/40 border-cyan-500/30 p-8 group hover:scale-105 transition-all">
                <Database className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Raw Claims Data</h3>
                <p className="text-cyan-100 mb-4">
                  Not aggregated reports — claim-level data with NDC codes, fill dates, pharmacy IDs, days supply, and actual ingredient cost. Build your own trend models.
                </p>
                <div className="bg-cyan-950/50 rounded-lg p-4 border border-cyan-500/30">
                  <div className="text-sm text-cyan-200 font-semibold mb-2">Data Fields:</div>
                  <div className="text-xs text-cyan-300 space-y-1">
                    <div>• NDC-11 codes with class mapping</div>
                    <div>• AWP, NADAC, ingredient cost, spread</div>
                    <div>• Utilization: days supply, quantity</div>
                    <div>• Channel: retail, mail, specialty</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-teal-950/40 to-blue-950/40 border-teal-500/30 p-8 group hover:scale-105 transition-all">
                <Activity className="w-12 h-12 text-teal-400 mb-6 group-hover:rotate-12 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Trend Decomposition</h3>
                <p className="text-teal-100 mb-4">
                  Separate utilization, unit cost, and mix effects. Quantify impact of formulary changes, contract amendments, and population shifts on total cost trend.
                </p>
                <div className="bg-teal-950/50 rounded-lg p-4 border border-teal-500/30">
                  <div className="text-sm text-teal-200 font-semibold mb-2">Decomposition Model:</div>
                  <div className="text-xs text-teal-300 space-y-1">
                    <div>• Utilization effect (Rx per member)</div>
                    <div>• Unit cost effect ($ per Rx)</div>
                    <div>• Mix effect (generic vs. brand)</div>
                    <div>• Interaction terms + confidence bands</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-950/40 to-indigo-950/40 border-blue-500/30 p-8 group hover:scale-105 transition-all">
                <BarChart3 className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Risk Quantification</h3>
                <p className="text-blue-100 mb-4">
                  Monte Carlo simulations for pharmacy spend projections. Model specialty drug pipeline risk, generic conversion timing, and rebate pass-through sensitivity.
                </p>
                <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-500/30">
                  <div className="text-sm text-blue-200 font-semibold mb-2">Simulation Features:</div>
                  <div className="text-xs text-blue-300 space-y-1">
                    <div>• 10,000 trial runs per scenario</div>
                    <div>• Specialty drug pipeline incorporation</div>
                    <div>• Generic conversion probability curves</div>
                    <div>• 95% confidence intervals + VaR</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
              Actuarial Toolkit
            </h2>
            <p className="text-center text-cyan-300 text-lg mb-16">Production-grade analytics for healthcare cost modeling</p>

            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-cyan-950/50 to-teal-950/50 border-cyan-500/40 p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl p-4 shadow-xl shadow-cyan-500/50 flex-shrink-0">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">NADAC Benchmarking</h3>
                    <p className="text-cyan-200 text-lg mb-4">
                      Compare plan costs to CMS NADAC pricing (updated weekly). Quantify spread, identify overpriced drugs, and model savings from transparent pricing models.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                        <div className="text-2xl font-bold text-cyan-300 mb-1">23%</div>
                        <div className="text-xs text-cyan-400">Avg spread vs NADAC</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                        <div className="text-2xl font-bold text-cyan-300 mb-1">$627K</div>
                        <div className="text-xs text-cyan-400">Annual excess cost</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-cyan-500/20">
                        <div className="text-2xl font-bold text-emerald-400 mb-1">$1.1M</div>
                        <div className="text-xs text-cyan-400">Transparent pricing savings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-teal-950/50 to-blue-950/50 border-teal-500/40 p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-4 shadow-xl shadow-teal-500/50 flex-shrink-0">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">Specialty Drug Pipeline Modeling</h3>
                    <p className="text-teal-200 text-lg mb-4">
                      Incorporate FDA approval calendar, patent expiry dates, and biosimilar launch timing into multi-year cost projections. Model risk exposure to high-cost specialty drugs.
                    </p>
                    <div className="bg-black/30 rounded-lg p-4 border border-teal-500/20">
                      <div className="text-sm text-teal-200 font-mono">
                        P(Drug Launch) × E[Members Eligible] × E[Utilization Rate] × E[Cost PMPM]<br/>
                        = Expected Pipeline Impact ± 95% CI
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-blue-950/50 to-indigo-950/50 border-blue-500/40 p-8">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-xl shadow-blue-500/50 flex-shrink-0">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">API + Data Export</h3>
                    <p className="text-blue-200 text-lg mb-4">
                      Pull raw claims data, trend calculations, and benchmark results into your own models. RESTful API with R and Python clients. CSV/Excel export for ad-hoc analysis.
                    </p>
                    <div className="bg-black/30 rounded-lg p-4 border border-blue-500/20 font-mono text-sm text-blue-200">
                      GET /api/v1/claims?start=2024-01-01&end=2024-12-31<br/>
                      GET /api/v1/trend/decomposition?period=quarterly<br/>
                      GET /api/v1/nadac/benchmark?ndc=12345678901
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-cyan-950/50 to-teal-950/50 border-cyan-500/40 p-10">
              <h2 className="text-4xl font-black text-center mb-4 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
                Access the Actuarial Sandbox
              </h2>
              <p className="text-center text-cyan-300 mb-8">
                Get demo access to live claims data modeling, Monte Carlo simulation tools, and risk adjustment frameworks.
              </p>
              
              <form className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-200 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-200 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-cyan-200 mb-2">Organization</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-cyan-400/50 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="Analytics Firm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-cyan-200 mb-2">Role</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="">Select role...</option>
                      <option value="fsa">FSA / Actuary</option>
                      <option value="asa">ASA / Associate Actuary</option>
                      <option value="analyst">Healthcare Analyst</option>
                      <option value="data-scientist">Data Scientist</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-lg py-6 shadow-xl shadow-cyan-500/30"
                >
                  Request Sandbox Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <p className="text-xs text-center text-cyan-400">
                  By submitting, you agree to receive communications about SiriusB iQ actuarial tools. Unsubscribe anytime.
                </p>
              </form>
            </Card>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-cyan-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-cyan-200 to-teal-200 bg-clip-text text-transparent">
              Build Models That Hold Up
            </h2>
            <p className="text-2xl text-cyan-200 mb-12">
              Schedule a 30-minute actuarial briefing to see the data pipeline, trend decomposition tools, and API documentation.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white text-xl px-12 py-8 shadow-2xl shadow-cyan-500/50">
              Schedule Actuarial Briefing
              <Calculator className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-sm text-cyan-400 mt-6">
              Actuarial-specific demo • Methodology documentation • API sandbox access
            </p>
          </div>
        </section>
      </div>
    </>
  );
}