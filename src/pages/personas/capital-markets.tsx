import Head from "next/head";
import Link from "next/link";
import { TrendingUp, PieChart, BarChart3, DollarSign, Target, Zap, ArrowRight, LineChart } from "lucide-react";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CapitalMarketsPage() {
  return (
    <>
      <Head>
        <title>For Capital Markets: Healthcare Investment Intelligence | SiriusB iQ</title>
        <meta
          name="description"
          content="Real-time healthcare benefit analytics for PE, VC, and M&A professionals. Due diligence tools for portfolio company healthcare cost modeling."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-950 to-black text-white">
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-400/30 rounded-full mb-8 backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-indigo-300" />
              <span className="text-sm font-semibold text-indigo-200">Capital Markets & Investors</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-indigo-200 via-blue-300 to-cyan-200 bg-clip-text text-transparent leading-tight">
              The Hidden<br />EBITDA Story
            </h1>
            
            <p className="text-2xl text-indigo-100 mb-6 max-w-3xl leading-relaxed">
              Healthcare benefits are <span className="text-indigo-300 font-bold">18-25% of operating expenses</span> for mid-market companies — and most are bleeding $500K-$2M annually to PBM contract gaps.
            </p>
            
            <p className="text-lg text-indigo-300/80 mb-10 max-w-2xl">
              SiriusB iQ delivers forensic healthcare analytics for due diligence, portfolio monitoring, and value creation planning. See the cost structure competitors can't.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg px-8 py-6 shadow-2xl shadow-indigo-500/50">
                Schedule DD Briefing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-indigo-400/50 text-indigo-200 hover:bg-indigo-500/20 text-lg px-8 py-6">
                View Portfolio Dashboard
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <Card className="bg-indigo-900/30 border-indigo-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-indigo-300 mb-2">23%</div>
                <div className="text-sm text-indigo-200">Hidden Cost Savings</div>
                <div className="text-xs text-indigo-400 mt-2">Average in PBM contracts</div>
              </Card>
              <Card className="bg-blue-900/30 border-blue-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-blue-300 mb-2">$1.8M</div>
                <div className="text-sm text-blue-200">Annual Recovery</div>
                <div className="text-xs text-blue-400 mt-2">Typical portfolio company</div>
              </Card>
              <Card className="bg-cyan-900/30 border-cyan-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-cyan-300 mb-2">3-5x</div>
                <div className="text-sm text-cyan-200">EBITDA Multiple Impact</div>
                <div className="text-xs text-cyan-400 mt-2">On recovered savings</div>
              </Card>
              <Card className="bg-purple-900/30 border-purple-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-purple-300 mb-2">48hrs</div>
                <div className="text-sm text-purple-200">DD Turnaround</div>
                <div className="text-xs text-purple-400 mt-2">From data to report</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-black to-indigo-950/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
              Healthcare = Value Creation Lever
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-emerald-950/40 to-green-950/40 border-emerald-500/30 p-8 group hover:scale-105 transition-all">
                <Target className="w-12 h-12 text-emerald-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Due Diligence</h3>
                <p className="text-emerald-100 mb-4">
                  48-hour healthcare cost forensics. Upload 12 months of claims data and PBM contract — we deliver a 40-page report quantifying hidden costs, contract gaps, and recovery potential.
                </p>
                <div className="bg-emerald-950/50 rounded-lg p-4 border border-emerald-500/30">
                  <div className="text-sm text-emerald-200 font-semibold mb-2">Deliverables:</div>
                  <ul className="text-sm text-emerald-300 space-y-1">
                    <li>• PBM contract X-Ray (15 provisions)</li>
                    <li>• Claims trend decomposition</li>
                    <li>• Cost recovery roadmap ($0-$2M)</li>
                    <li>• Post-close value creation plan</li>
                  </ul>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-950/40 to-blue-950/40 border-indigo-500/30 p-8 group hover:scale-105 transition-all">
                <BarChart3 className="w-12 h-12 text-indigo-400 mb-6 group-hover:rotate-12 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Portfolio Monitoring</h3>
                <p className="text-indigo-100 mb-4">
                  Real-time dashboards for all portfolio companies. Spot cost anomalies, contract non-compliance, and savings opportunities across your entire healthcare book — $50M-$500M in annual spend.
                </p>
                <div className="bg-indigo-950/50 rounded-lg p-4 border border-indigo-500/30">
                  <div className="text-sm text-indigo-200 font-semibold mb-2">Metrics Tracked:</div>
                  <ul className="text-sm text-indigo-300 space-y-1">
                    <li>• Trend vs. benchmark (NADAC)</li>
                    <li>• Vendor performance scores</li>
                    <li>• Contract compliance rates</li>
                    <li>• Evidence receipt coverage</li>
                  </ul>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border-blue-500/30 p-8 group hover:scale-105 transition-all">
                <Zap className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Exit Positioning</h3>
                <p className="text-blue-100 mb-4">
                  Document value creation for buyers. Show $3M-$10M in realized healthcare savings with evidence receipts, benchmark validation, and ongoing optimization infrastructure.
                </p>
                <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-500/30">
                  <div className="text-sm text-blue-200 font-semibold mb-2">Exit Materials:</div>
                  <ul className="text-sm text-blue-300 space-y-1">
                    <li>• Healthcare cost reduction case study</li>
                    <li>• Verified savings ledger</li>
                    <li>• Continuous improvement engine</li>
                    <li>• Transferable governance docs</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
              Real Portfolio Impact
            </h2>
            <p className="text-center text-indigo-300 text-lg mb-16">Lower Middle Market PE Fund • 8 Portfolio Companies</p>

            <Card className="bg-gradient-to-r from-indigo-950/50 to-blue-950/50 border-indigo-500/40 p-10">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-sm text-indigo-400 mb-3 uppercase tracking-wide font-semibold">Before SiriusB iQ</div>
                  <div className="bg-gradient-to-br from-red-950/50 to-orange-950/50 border border-red-500/30 rounded-xl p-6">
                    <div className="text-4xl font-black text-red-400 mb-2">$47M</div>
                    <div className="text-sm text-red-200 mb-4">Total Healthcare Spend</div>
                    <div className="space-y-2 text-sm text-red-300">
                      <div>❌ No visibility into PBM contracts</div>
                      <div>❌ Consultant benchmarks only</div>
                      <div>❌ Reactive cost management</div>
                      <div>❌ No evidence documentation</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-indigo-400 mb-3 uppercase tracking-wide font-semibold">After 18 Months</div>
                  <div className="bg-gradient-to-br from-emerald-950/50 to-green-950/50 border border-emerald-500/30 rounded-xl p-6">
                    <div className="text-4xl font-black text-emerald-400 mb-2">$38.2M</div>
                    <div className="text-sm text-emerald-200 mb-4">Total Healthcare Spend</div>
                    <div className="space-y-2 text-sm text-emerald-300">
                      <div>✓ $8.8M annual savings (18.7%)</div>
                      <div>✓ Real-time portfolio dashboard</div>
                      <div>✓ Contract X-Ray for all portcos</div>
                      <div>✓ Evidence receipts = audit ready</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/30 rounded-xl p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-emerald-400 mb-1">$8.8M</div>
                    <div className="text-xs text-indigo-300">Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-400 mb-1">4.2x</div>
                    <div className="text-xs text-indigo-300">EBITDA Multiple Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-cyan-400 mb-1">$37M</div>
                    <div className="text-xs text-indigo-300">Enterprise Value Add</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-indigo-200 italic">
                    "Healthcare cost reduction became our #1 value creation story. Buyers loved the documented savings and ongoing monitoring infrastructure."
                  </div>
                  <div className="text-xs text-indigo-500 mt-2">— Managing Partner, Anonymous PE Fund</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-indigo-950/30 to-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
              Built for Capital Markets Speed
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-indigo-950/40 to-blue-950/40 border-indigo-500/30 p-8">
                <PieChart className="w-12 h-12 text-indigo-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">48-Hour DD Reports</h3>
                <p className="text-indigo-200 mb-4">Upload target company claims data and PBM contract. We deliver a comprehensive healthcare forensics report within 2 business days.</p>
                <div className="space-y-2 text-sm text-indigo-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>Contract X-Ray (15 provisions analyzed)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>Claims trend decomposition</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span>Cost recovery roadmap ($0-$2M range)</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-950/40 to-cyan-950/40 border-blue-500/30 p-8">
                <LineChart className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Portfolio Command Center</h3>
                <p className="text-blue-200 mb-4">Single dashboard for all portfolio companies. Track healthcare spend, vendor performance, and savings opportunities in real-time across your entire book.</p>
                <div className="space-y-2 text-sm text-blue-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>Real-time trend alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>Benchmark comparisons (NADAC)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>Evidence receipt verification</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-indigo-950/50 to-blue-950/50 border-indigo-500/40 p-10">
              <h2 className="text-4xl font-black text-center mb-4 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
                Request DD Analysis Sample
              </h2>
              <p className="text-center text-indigo-300 mb-8">
                See a real healthcare forensics report from a recent deal (anonymized). Includes contract X-Ray, claims analysis, and value creation roadmap.
              </p>
              
              <form className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-indigo-200 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-indigo-500/30 rounded-lg text-white placeholder-indigo-400/50 focus:outline-none focus:border-indigo-400 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-indigo-200 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-indigo-500/30 rounded-lg text-white placeholder-indigo-400/50 focus:outline-none focus:border-indigo-400 transition-colors"
                      placeholder="john@firm.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-indigo-200 mb-2">Firm / Fund</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-indigo-500/30 rounded-lg text-white placeholder-indigo-400/50 focus:outline-none focus:border-indigo-400 transition-colors"
                      placeholder="Capital Partners"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-indigo-200 mb-2">Role</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-indigo-500/30 rounded-lg text-white focus:outline-none focus:border-indigo-400 transition-colors"
                    >
                      <option value="">Select role...</option>
                      <option value="partner">Partner / Managing Director</option>
                      <option value="principal">Principal</option>
                      <option value="vp">VP / Associate</option>
                      <option value="analyst">Analyst</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg py-6 shadow-xl shadow-indigo-500/30"
                >
                  Download Sample Report
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <p className="text-xs text-center text-indigo-400">
                  By submitting, you agree to receive communications about SiriusB iQ investment intelligence. Unsubscribe anytime.
                </p>
              </form>
            </Card>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
              Turn Healthcare Into Alpha
            </h2>
            <p className="text-2xl text-indigo-200 mb-12">
              Schedule a 30-minute capital markets briefing to see how SiriusB iQ unlocks 15-25% in portfolio company healthcare spend.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xl px-12 py-8 shadow-2xl shadow-indigo-500/50">
              Schedule DD Briefing
              <TrendingUp className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-sm text-indigo-400 mt-6">
              PE/VC-specific demo • 48-hour DD turnaround • Portfolio monitoring included
            </p>
          </div>
        </section>
      </div>
    </>
  );
}