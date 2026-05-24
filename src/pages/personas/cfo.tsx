import Head from "next/head";
import Link from "next/link";
import { TrendingDown, DollarSign, Target, BarChart3, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CFOPage() {
  return (
    <>
      <Head>
        <title>For CFOs: EBITDA Defense & Cost Optimization | SiriusB iQ</title>
        <meta
          name="description"
          content="Protect EBITDA from hidden PBM costs. Identify 15-25% in recoverable pharmacy spend and eliminate DOL audit exposure."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-slate-950 to-black text-white">
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 rounded-full mb-8 backdrop-blur-sm">
              <DollarSign className="w-5 h-5 text-emerald-300" />
              <span className="text-sm font-semibold text-emerald-200">Chief Financial Officers</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-emerald-200 via-green-300 to-teal-200 bg-clip-text text-transparent leading-tight">
              Your PBM Contract<br />Is Bleeding EBITDA
            </h1>
            
            <p className="text-2xl text-emerald-100 mb-6 max-w-3xl leading-relaxed">
              <span className="text-emerald-300 font-bold">15-25% of pharmacy spend</span> is lost to hidden PBM fees, rebate retention, and contract loopholes. That's $450K-$750K per year on a $3M drug spend.
            </p>
            
            <p className="text-lg text-emerald-300/80 mb-10 max-w-2xl">
              SiriusB iQ's Contract X-Ray identifies every dollar and creates the documentation you need to defend your fiduciary decisions to the board and DOL.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-lg px-8 py-6 shadow-2xl shadow-emerald-500/50">
                Calculate My EBITDA Impact
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-emerald-400/50 text-emerald-200 hover:bg-emerald-500/20 text-lg px-8 py-6">
                Free Contract Health Check
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <Card className="bg-emerald-900/30 border-emerald-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-emerald-300 mb-2">23%</div>
                <div className="text-sm text-emerald-200">Hidden Cost Waste</div>
                <div className="text-xs text-emerald-400 mt-2">Average in PBM contracts</div>
              </Card>
              <Card className="bg-green-900/30 border-green-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-green-300 mb-2">$1.1M</div>
                <div className="text-sm text-green-200">Annual Recovery</div>
                <div className="text-xs text-green-400 mt-2">Typical mid-market company</div>
              </Card>
              <Card className="bg-teal-900/30 border-teal-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-teal-300 mb-2">10:1</div>
                <div className="text-sm text-teal-200">ROI Guarantee</div>
                <div className="text-xs text-teal-400 mt-2">Or you don't pay</div>
              </Card>
              <Card className="bg-cyan-900/30 border-cyan-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-cyan-300 mb-2">48hrs</div>
                <div className="text-sm text-cyan-200">Analysis Turnaround</div>
                <div className="text-xs text-cyan-400 mt-2">From data to report</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-black to-emerald-950/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
              The Numbers That Keep You Up
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-red-950/40 to-orange-950/40 border-red-500/30 p-8 group hover:scale-105 transition-all">
                <AlertTriangle className="w-12 h-12 text-red-400 mb-6 group-hover:animate-pulse" />
                <h3 className="text-2xl font-bold text-white mb-4">Rebate Retention</h3>
                <p className="text-red-100 mb-4">
                  <span className="text-4xl font-black text-red-400 block mb-2">$627K</span>
                  Average annual rebate revenue retained by PBM — hidden in "administrative fees" and undisclosed manufacturer payments.
                </p>
                <div className="bg-red-950/50 rounded-lg p-4 border border-red-500/30">
                  <div className="text-sm text-red-300">
                    Without audit rights, you'll never see these payments. They're contractually yours — the PBM just keeps them.
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-orange-950/40 to-yellow-950/40 border-orange-500/30 p-8 group hover:scale-105 transition-all">
                <TrendingDown className="w-12 h-12 text-orange-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Hidden Inflation</h3>
                <p className="text-orange-100 mb-4">
                  <span className="text-4xl font-black text-orange-400 block mb-2">23%</span>
                  Average total cost inflation vs. transparent pricing — spread, DIR fees, specialty pharmacy margins, formulary bias.
                </p>
                <div className="bg-orange-950/50 rounded-lg p-4 border border-orange-500/30">
                  <div className="text-sm text-orange-300">
                    Your CFO dashboard shows "pharmacy trend +8%". The real number is +31%. Contract loopholes hide the rest.
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-950/40 to-amber-950/40 border-yellow-500/30 p-8 group hover:scale-105 transition-all">
                <Target className="w-12 h-12 text-yellow-400 mb-6 group-hover:rotate-12 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Personal Liability</h3>
                <p className="text-yellow-100 mb-4">
                  <span className="text-4xl font-black text-yellow-400 block mb-2">100%</span>
                  CFOs are personally liable under ERISA §404. DOL increasing scrutiny of PBM contracts — no oversight documentation = personal exposure.
                </p>
                <div className="bg-yellow-950/50 rounded-lg p-4 border border-yellow-500/30">
                  <div className="text-sm text-yellow-300">
                    "Did you monitor the PBM?" If the answer is consultant slide decks, not evidence receipts, you're exposed.
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
              How We Protect Your Bottom Line
            </h2>
            <p className="text-center text-emerald-300 text-lg mb-16">3-step forensic process: hidden costs → documented savings</p>

            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-emerald-950/50 to-green-950/50 border-emerald-500/40 p-8 hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-4 shadow-xl shadow-emerald-500/50 flex-shrink-0">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">Contract X-Ray Analysis</h3>
                    <p className="text-emerald-200 text-lg mb-4">
                      We audit all 15 critical provisions in your PBM contract against industry best practices. Every loophole, every retention clause, every hidden fee — documented with page references and fix language.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                        <div className="text-2xl font-bold text-emerald-300 mb-1">$627K</div>
                        <div className="text-xs text-emerald-400">Rebate Revenue</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                        <div className="text-2xl font-bold text-emerald-300 mb-1">$410K</div>
                        <div className="text-xs text-emerald-400">DIR Fees</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/20">
                        <div className="text-2xl font-bold text-emerald-300 mb-1">$380K</div>
                        <div className="text-xs text-emerald-400">Spread Pricing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-green-950/50 to-teal-950/50 border-green-500/40 p-8 hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-4 shadow-xl shadow-green-500/50 flex-shrink-0">
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">Claims Data Forensics</h3>
                    <p className="text-green-200 text-lg mb-4">
                      We connect your claims data to the contract gaps. Show exactly how much each loophole cost you — by provision, by drug class, by pharmacy. Turn "potential issues" into "here are the invoices."
                    </p>
                    <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4">
                      <div className="text-sm text-emerald-200 font-semibold mb-2">Real CFO Result:</div>
                      <div className="text-sm text-emerald-300">
                        "The X-Ray identified $1.1M in annual overpayments. We presented it to the PBM with claims evidence. They fought for 6 months, but we had the data. Contract amended. Full pass-through now."
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-teal-950/50 to-cyan-950/50 border-teal-500/40 p-8 hover:scale-[1.02] transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-4 shadow-xl shadow-teal-500/50 flex-shrink-0">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">Board-Ready Documentation</h3>
                    <p className="text-teal-200 text-lg mb-4">
                      Executive summary for the Board, detailed technical report for internal review, and specific fix language for your next RFP or amendment negotiation.
                    </p>
                    <div className="bg-black/30 rounded-lg p-4 border border-teal-500/20">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-teal-300 font-semibold mb-2">Deliverables:</div>
                          <div className="space-y-1 text-sm text-teal-200">
                            <div>• Executive summary (5 pages)</div>
                            <div>• Technical report (40 pages)</div>
                            <div>• Fix language for contract</div>
                            <div>• Evidence receipts for DOL</div>
                          </div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-emerald-400 mb-2">$15K</div>
                          <div className="text-sm text-teal-300">X-Ray engagement cost</div>
                          <div className="text-3xl font-bold text-emerald-400 mt-4 mb-2">$150K</div>
                          <div className="text-sm text-teal-300">Minimum identified savings</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-emerald-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
              Stop Guessing. Start Recovering.
            </h2>
            <p className="text-2xl text-emerald-200 mb-12">
              Schedule a 30-minute CFO briefing to see the forensic analysis and 10:1 ROI guarantee.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xl px-12 py-8 shadow-2xl shadow-emerald-500/50">
              Schedule CFO Briefing
              <DollarSign className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-sm text-emerald-400 mt-6">
              30-minute executive briefing • No technical jargon • ROI-focused • 10:1 guarantee
            </p>
          </div>
        </section>
      </div>
    </>
  );
}