import Head from "next/head";
import Link from "next/link";
import { TrendingDown, Shield, AlertTriangle, DollarSign, FileText, BarChart3, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CFOPage() {
  return (
    <>
      <Head>
        <title>For CFOs: EBITDA Defense & Fiduciary Risk Mitigation | Kincaid IQ</title>
        <meta
          name="description"
          content="Protect EBITDA from hidden PBM costs. Contract X-Ray identifies 15-25% in recoverable pharmacy spend and eliminates DOL audit exposure."
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        {/* Hero */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black" />
          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full mb-6">
              <DollarSign className="w-5 h-5 text-purple-400" />
              <span className="text-sm font-semibold text-purple-300">For Chief Financial Officers</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Your PBM Contract Is Bleeding EBITDA
            </h1>
            
            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
              <span className="text-red-400 font-semibold">15-25% of pharmacy spend</span> is lost to hidden PBM fees, rebate retention, and contract loopholes. That's $450K-$750K per year on a $3M drug spend.
            </p>
            
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Kincaid IQ's Rx PBM Contract X-Ray identifies every dollar — and creates the documentation you need to defend your fiduciary decisions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/savings-calculator">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full sm:w-auto">
                  Calculate My EBITDA Impact
                </Button>
              </Link>
              <Link href="/tools/contract-health-check">
                <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 w-full sm:w-auto">
                  Free Contract Health Check
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* The CFO's Problem */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The Numbers That Keep You Up at Night</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-red-500/10 border-red-500/30 p-6">
                <AlertTriangle className="w-10 h-10 text-red-400 mb-4" />
                <div className="text-4xl font-bold text-white mb-2">$627K</div>
                <div className="text-sm text-gray-400">Average annual rebate revenue retained by PBM</div>
                <div className="mt-4 text-xs text-red-300">Hidden in "administrative fees" and undisclosed manufacturer payments</div>
              </Card>

              <Card className="bg-orange-500/10 border-orange-500/30 p-6">
                <TrendingDown className="w-10 h-10 text-orange-400 mb-4" />
                <div className="text-4xl font-bold text-white mb-2">23%</div>
                <div className="text-sm text-gray-400">Average total cost inflation vs. transparent pricing</div>
                <div className="mt-4 text-xs text-orange-300">Spread, DIR fees, specialty pharmacy margins, formulary bias</div>
              </Card>

              <Card className="bg-yellow-500/10 border-yellow-500/30 p-6">
                <Shield className="w-10 h-10 text-yellow-400 mb-4" />
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-sm text-gray-400">CFOs personally liable under ERISA §404</div>
                <div className="mt-4 text-xs text-yellow-300">DOL increasing scrutiny of PBM contracts — personal exposure if you cannot demonstrate diligence</div>
              </Card>
            </div>
          </div>
        </section>

        {/* How We Defend Your EBITDA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">How Contract X-Ray Protects Your Bottom Line</h2>
            <p className="text-center text-gray-400 mb-12">3-step forensic process that turns hidden costs into documented savings</p>

            <div className="space-y-6">
              <Card className="bg-gray-900/50 border-purple-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-purple-500/20 rounded-full p-3">
                    <FileText className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">1. Contract X-Ray Analysis</h3>
                    <p className="text-gray-400 mb-4">
                      We audit all 15 critical provisions in your PBM contract against industry best practices. Every loophole, every retention clause, every hidden fee structure — documented with specific page references and fix language.
                    </p>
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="text-sm text-gray-300 font-mono">
                        ✓ Fiduciary loyalty gaps<br/>
                        ✓ Rebate retention clauses<br/>
                        ✓ Audit right restrictions<br/>
                        ✓ Pharmacy ownership conflicts<br/>
                        ✓ DIR fee exposure<br/>
                        <span className="text-gray-500">+ 10 more provisions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/20 rounded-full p-3">
                    <BarChart3 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">2. Claims Data Forensics</h3>
                    <p className="text-gray-400 mb-4">
                      We connect your claims data to the contract gaps. Show exactly how much each loophole cost you — by provision, by drug class, by pharmacy. Turn "potential issues" into "here are the invoices where you overpaid."
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-3 flex-1">
                        <div className="text-2xl font-bold text-emerald-400">$627K</div>
                        <div className="text-xs text-gray-400">Rebate Revenue</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3 flex-1">
                        <div className="text-2xl font-bold text-emerald-400">$512K</div>
                        <div className="text-xs text-gray-400">Pharmacy Routing</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-3 flex-1">
                        <div className="text-2xl font-bold text-emerald-400">$425K</div>
                        <div className="text-xs text-gray-400">DIR Fees</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-900/50 border-purple-500/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-500/20 rounded-full p-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">3. Board-Ready Documentation</h3>
                    <p className="text-gray-400 mb-4">
                      We package everything into audit-defensible documentation: Executive summary for the Board, detailed technical report for internal review, and specific fix language for your next RFP or amendment negotiation.
                    </p>
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-4">
                      <div className="text-sm text-purple-300">
                        "When the DOL asks 'how did you monitor the PBM?', you hand them a 50-page X-Ray report with claims data validation. Case closed."
                      </div>
                      <div className="text-xs text-gray-500 mt-2">— ERISA defense attorney</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ROI Guarantee */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">The CFO Guarantee</h2>
            <Card className="bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 border-emerald-500/30 p-8">
              <div className="text-5xl font-bold text-emerald-400 mb-4">10:1 ROI</div>
              <p className="text-xl text-white mb-6">
                Or you don't pay. If our X-Ray analysis doesn't identify at least 10x its cost in recoverable spend, we refund 100%.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">$15K</div>
                  <div className="text-sm text-gray-400">Typical X-Ray engagement</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400 mb-2">$150K</div>
                  <div className="text-sm text-gray-400">Minimum identified savings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-400 mb-2">$2.1M</div>
                  <div className="text-sm text-gray-400">Average 3-year recovery</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Case Study Snapshot */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Real CFO Results</h2>
            
            <Card className="bg-gray-900/50 border-purple-500/30 p-8">
              <div className="flex items-start gap-6 mb-6">
                <div className="bg-purple-500/20 rounded-full p-4">
                  <DollarSign className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Mid-Market Manufacturing CFO</h3>
                  <p className="text-gray-400">1,200 employees • $5.2M annual drug spend</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Before X-Ray</div>
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-red-400 mb-1">$5.2M</div>
                    <div className="text-xs text-gray-400">Annual pharmacy spend</div>
                    <div className="text-xs text-red-300 mt-2">Hidden costs: Unknown</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-2">After X-Ray + Renegotiation</div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                    <div className="text-2xl font-bold text-emerald-400 mb-1">$4.1M</div>
                    <div className="text-xs text-gray-400">Annual pharmacy spend</div>
                    <div className="text-xs text-emerald-300 mt-2">Savings: $1.1M/year (21%)</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-lg p-4">
                <div className="text-sm text-gray-300 mb-2 font-semibold">Key Wins:</div>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Recovered $580K in rebate revenue PBM was retaining</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Eliminated $310K in DIR fees through contract amendment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Gained audit rights — discovered $210K in overcharges in first audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Board approved fiduciary documentation for DOL audit file</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <div className="text-sm text-purple-300 italic">
                  "The X-Ray report gave me exactly what I needed for the Board: documented proof of where we were losing money and a clear path to recover it. The PBM fought the changes for 6 months, but we had the data. They eventually amended."
                </div>
                <div className="text-xs text-gray-500 mt-2">— CFO, Anonymous Manufacturing Company</div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Stop Guessing. Start Recovering.</h2>
            <p className="text-xl text-gray-400 mb-8">
              Get a free contract health check and see exactly where your EBITDA is leaking.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools/savings-calculator">
                <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full sm:w-auto">
                  Calculate My Savings
                </Button>
              </Link>
              <Link href="/request-demo">
                <Button size="lg" variant="outline" className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 w-full sm:w-auto">
                  Schedule CFO Briefing
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              30-minute executive briefing • No technical jargon • ROI-focused
            </p>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}