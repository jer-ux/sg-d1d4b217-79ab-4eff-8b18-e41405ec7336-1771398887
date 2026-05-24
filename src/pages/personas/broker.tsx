import Head from "next/head";
import Link from "next/link";
import { Briefcase, Award, Target, TrendingUp, Users, ArrowRight, CheckCircle2, Star } from "lucide-react";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BrokersPage() {
  return (
    <>
      <Head>
        <title>For Brokers: Win Renewals & Grow Your Book | SiriusB iQ</title>
        <meta
          name="description"
          content="Differentiate your brokerage with forensic PBM analytics, client retention tools, and documented value delivery."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-amber-950 via-slate-950 to-black text-white">
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-full mb-8 backdrop-blur-sm">
              <Briefcase className="w-5 h-5 text-amber-300" />
              <span className="text-sm font-semibold text-amber-200">Benefits Brokers & Consultants</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent leading-tight">
              Stop Competing<br />On Commission
            </h1>
            
            <p className="text-2xl text-amber-100 mb-6 max-w-3xl leading-relaxed">
              Every broker promises "savings" and "transparency". Then renewal comes and the CFO asks: <span className="text-amber-300 font-bold">"Where's the proof?"</span>
            </p>
            
            <p className="text-lg text-amber-300/80 mb-10 max-w-2xl">
              SiriusB iQ gives you forensic PBM analytics to differentiate your brokerage, prove value delivery, and retain clients with documented ROI — not RFP theater.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-lg px-8 py-6 shadow-2xl shadow-amber-500/50">
                See Broker Portal Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-amber-400/50 text-amber-200 hover:bg-amber-500/20 text-lg px-8 py-6">
                View Value Delivery Report
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <Card className="bg-amber-900/30 border-amber-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-amber-300 mb-2">94%</div>
                <div className="text-sm text-amber-200">Client Retention</div>
                <div className="text-xs text-amber-400 mt-2">With documented value</div>
              </Card>
              <Card className="bg-orange-900/30 border-orange-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-orange-300 mb-2">$1.1M</div>
                <div className="text-sm text-orange-200">Avg Client Savings</div>
                <div className="text-xs text-orange-400 mt-2">Per year, documented</div>
              </Card>
              <Card className="bg-yellow-900/30 border-yellow-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-yellow-300 mb-2">3.2x</div>
                <div className="text-sm text-yellow-200">Referral Growth</div>
                <div className="text-xs text-yellow-400 mt-2">With proof of results</div>
              </Card>
              <Card className="bg-red-900/30 border-red-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-red-300 mb-2">Zero</div>
                <div className="text-sm text-red-200">RFPs Lost</div>
                <div className="text-xs text-red-400 mt-2">To "savings" promises</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-black to-amber-950/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
              The Broker's Dilemma
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-red-950/40 to-orange-950/40 border-red-500/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">The Old Playbook (Doesn't Work)</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-red-400 text-xl mt-1">❌</div>
                    <div>
                      <div className="font-semibold text-red-200 mb-1">Generic RFP Process</div>
                      <div className="text-sm text-red-300">All bidders promise 10-15% savings. CFO can't tell who's real.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-red-400 text-xl mt-1">❌</div>
                    <div>
                      <div className="font-semibold text-red-200 mb-1">PBM Benchmarking</div>
                      <div className="text-sm text-red-300">"Your trend is 8%, industry is 9%!" But who validates the PBM's numbers?</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-red-400 text-xl mt-1">❌</div>
                    <div>
                      <div className="font-semibold text-red-200 mb-1">Renewal Panic</div>
                      <div className="text-sm text-red-300">Client asks "What did you save us?" You have consultant slide decks, not receipts.</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-950/40 to-green-950/40 border-emerald-500/30 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">The New Standard (You Win)</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-emerald-200 mb-1">Forensic Contract Analysis</div>
                      <div className="text-sm text-emerald-300">Show clients exactly where they're losing money — with page references and fix language.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-emerald-200 mb-1">Live Client Dashboards</div>
                      <div className="text-sm text-emerald-300">Give clients real-time cost monitoring. They see your value every login.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-emerald-200 mb-1">Documented ROI</div>
                      <div className="text-sm text-emerald-300">Renewal? Hand them a report: $1.1M in verified savings, 285 evidence receipts.</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
              How Brokers Win With SiriusB iQ
            </h2>
            <p className="text-center text-amber-300 text-lg mb-16">From proposal to renewal — differentiate at every stage</p>

            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-amber-950/50 to-orange-950/50 border-amber-500/40 p-8 hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 shadow-xl shadow-amber-500/50 flex-shrink-0">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">Proposal Stage: Forensic Preview</h3>
                    <p className="text-amber-200 text-lg mb-4">
                      Upload prospect's PBM contract and 12 months of claims. Deliver a 10-page preview report showing exactly where they're losing money. Win before the RFP even starts.
                    </p>
                    <div className="bg-black/30 rounded-lg p-4 border border-amber-500/20">
                      <div className="text-sm text-amber-300 italic">
                        "I sent the preview report before our first meeting. CFO called me directly: 'Can you prove this?' We won the account without an RFP."
                      </div>
                      <div className="text-xs text-amber-500 mt-2">— Benefits broker, $120M book</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-orange-950/50 to-yellow-950/50 border-orange-500/40 p-8 hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl p-4 shadow-xl shadow-orange-500/50 flex-shrink-0">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">Service Period: Ongoing Value Proof</h3>
                    <p className="text-orange-200 text-lg mb-4">
                      Clients get live dashboards showing trend, vendor performance, and cost anomalies. Quarterly value delivery reports document your impact — with evidence receipts.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-black/30 rounded-lg p-4 border border-orange-500/20">
                        <div className="text-2xl font-bold text-orange-300 mb-1">Q1</div>
                        <div className="text-xs text-orange-400">Contract X-Ray + baseline</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-orange-500/20">
                        <div className="text-2xl font-bold text-orange-300 mb-1">Q2-Q3</div>
                        <div className="text-xs text-orange-400">Quick wins + monitoring</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-orange-500/20">
                        <div className="text-2xl font-bold text-orange-300 mb-1">Q4</div>
                        <div className="text-xs text-orange-400">Annual value report</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-yellow-950/50 to-amber-950/50 border-yellow-500/40 p-8 hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl p-4 shadow-xl shadow-yellow-500/50 flex-shrink-0">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">Renewal: Documented ROI Wins</h3>
                    <p className="text-yellow-200 text-lg mb-4">
                      No more "we think we saved you money". Hand them a comprehensive report: $1.1M verified savings, 285 evidence receipts, continuous monitoring infrastructure.
                    </p>
                    <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4">
                      <div className="grid md:grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-3xl font-black text-emerald-400 mb-1">$1.1M</div>
                          <div className="text-xs text-yellow-300">Documented Savings</div>
                        </div>
                        <div>
                          <div className="text-3xl font-black text-emerald-400 mb-1">285</div>
                          <div className="text-xs text-yellow-300">Evidence Receipts</div>
                        </div>
                        <div>
                          <div className="text-3xl font-black text-emerald-400 mb-1">100%</div>
                          <div className="text-xs text-yellow-300">Retention Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-amber-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
              Stop Competing. Start Dominating.
            </h2>
            <p className="text-2xl text-amber-200 mb-12">
              Schedule a 30-minute broker briefing to see the portal, client dashboards, and value delivery reporting.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xl px-12 py-8 shadow-2xl shadow-amber-500/50">
              Schedule Broker Briefing
              <Briefcase className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-sm text-amber-400 mt-6">
              Broker-specific demo • White-label options • Client retention tools included
            </p>
          </div>
        </section>
      </div>
    </>
  );
}