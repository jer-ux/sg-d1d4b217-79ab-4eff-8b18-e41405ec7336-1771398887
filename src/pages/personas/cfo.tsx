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

        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-emerald-950/50 to-green-950/50 border-emerald-500/40 p-10">
              <h2 className="text-4xl font-black text-center mb-4 bg-gradient-to-r from-emerald-200 to-green-200 bg-clip-text text-transparent">
                Calculate Your Hidden Cost Recovery
              </h2>
              <p className="text-center text-emerald-300 mb-8">
                Get a personalized EBITDA impact analysis and free contract health check. See exactly what you're losing to PBM fees.
              </p>
              
              <form className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-200 mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-emerald-200 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-emerald-200 mb-2">Company</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-white placeholder-emerald-400/50 focus:outline-none focus:border-emerald-400 transition-colors"
                      placeholder="Acme Corporation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-emerald-200 mb-2">Annual Drug Spend</label>
                    <select
                      required
                      className="w-full px-4 py-3 bg-black/30 border border-emerald-500/30 rounded-lg text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="">Select range...</option>
                      <option value="<1m">Under $1M</option>
                      <option value="1-3m">$1M - $3M</option>
                      <option value="3-5m">$3M - $5M</option>
                      <option value="5-10m">$5M - $10M</option>
                      <option value="10m+">Over $10M</option>
                    </select>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-lg py-6 shadow-xl shadow-emerald-500/30"
                >
                  Calculate My Savings
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                
                <p className="text-xs text-center text-emerald-400">
                  By submitting, you agree to receive communications about SiriusB iQ cost optimization solutions. Unsubscribe anytime.
                </p>
              </form>
            </Card>
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