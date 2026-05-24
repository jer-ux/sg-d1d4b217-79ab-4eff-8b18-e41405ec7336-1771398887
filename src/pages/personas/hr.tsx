import Head from "next/head";
import Link from "next/link";
import { Users, Heart, Shield, TrendingUp, CheckCircle2, ArrowRight, Smile } from "lucide-react";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HRDirectorsPage() {
  return (
    <>
      <Head>
        <title>For HR Directors: Employee Benefits & Experience | SiriusB iQ</title>
        <meta
          name="description"
          content="Transform benefits administration with data-driven insights, cost optimization, and employee experience tools."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-slate-950 to-black text-white">
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-blue-500/20 to-sky-500/20 border border-blue-400/30 rounded-full mb-8 backdrop-blur-sm">
              <Users className="w-5 h-5 text-blue-300" />
              <span className="text-sm font-semibold text-blue-200">HR Directors & Benefits Leaders</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-blue-200 via-sky-300 to-cyan-200 bg-clip-text text-transparent leading-tight">
              Better Benefits.<br />Lower Costs.
            </h1>
            
            <p className="text-2xl text-blue-100 mb-6 max-w-3xl leading-relaxed">
              You're caught between <span className="text-blue-300 font-bold">rising costs and employee expectations</span>. Your PBM says trend is "industry normal" while your CFO asks why benefits are 22% of payroll.
            </p>
            
            <p className="text-lg text-blue-300/80 mb-10 max-w-2xl">
              SiriusB iQ gives you the data to prove vendor performance, optimize plan design, and show your cost-containment wins to leadership — all while improving the employee experience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-lg px-8 py-6 shadow-2xl shadow-blue-500/50">
                See HR Dashboard Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-blue-400/50 text-blue-200 hover:bg-blue-500/20 text-lg px-8 py-6">
                View Benefits Analytics
              </Button>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <Card className="bg-blue-900/30 border-blue-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-blue-300 mb-2">89%</div>
                <div className="text-sm text-blue-200">Employee Satisfaction</div>
                <div className="text-xs text-blue-400 mt-2">With transparent benefits</div>
              </Card>
              <Card className="bg-sky-900/30 border-sky-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-sky-300 mb-2">-18%</div>
                <div className="text-sm text-sky-200">Cost Reduction</div>
                <div className="text-xs text-sky-400 mt-2">Without cutting benefits</div>
              </Card>
              <Card className="bg-cyan-900/30 border-cyan-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-cyan-300 mb-2">75%</div>
                <div className="text-sm text-cyan-200">Time Saved</div>
                <div className="text-xs text-cyan-400 mt-2">On benefits administration</div>
              </Card>
              <Card className="bg-indigo-900/30 border-indigo-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-indigo-300 mb-2">Real</div>
                <div className="text-sm text-indigo-200">-Time Insights</div>
                <div className="text-xs text-indigo-400 mt-2">Not quarterly reports</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-black to-blue-950/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-blue-200 to-sky-200 bg-clip-text text-transparent">
              What HR Needs (But Rarely Gets)
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-blue-950/40 to-sky-950/40 border-blue-500/30 p-8 group hover:scale-105 transition-all">
                <Heart className="w-12 h-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Employee Transparency</h3>
                <p className="text-blue-100 mb-4">
                  Employees don't understand why their Rx costs keep rising. Show them real-time cost comparisons, formulary alternatives, and savings opportunities at the point of care.
                </p>
                <div className="bg-blue-950/50 rounded-lg p-4 border border-blue-500/30">
                  <div className="text-sm text-blue-200 font-semibold mb-2">Employee Portal Features:</div>
                  <div className="space-y-1 text-sm text-blue-300">
                    <div>• Real-time drug cost comparison</div>
                    <div>• GoodRx vs. insurance pricing</div>
                    <div>• Generic alternatives savings</div>
                    <div>• Specialty pharmacy routing</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-sky-950/40 to-cyan-950/40 border-sky-500/30 p-8 group hover:scale-105 transition-all">
                <TrendingUp className="w-12 h-12 text-sky-400 mb-6 group-hover:rotate-12 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Vendor Accountability</h3>
                <p className="text-sky-100 mb-4">
                  Your PBM sends quarterly reports showing "5% trend". SiriusB iQ shows the real number is 12% — and documents exactly where the gap came from.
                </p>
                <div className="bg-sky-950/50 rounded-lg p-4 border border-sky-500/30">
                  <div className="text-sm text-sky-200 font-semibold mb-2">Automated Monitoring:</div>
                  <div className="space-y-1 text-sm text-sky-300">
                    <div>• Contract compliance tracking</div>
                    <div>• Performance guarantee validation</div>
                    <div>• Rebate pass-through verification</div>
                    <div>• Claim adjudication accuracy</div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-950/40 to-indigo-950/40 border-cyan-500/30 p-8 group hover:scale-105 transition-all">
                <Shield className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">Leadership Credibility</h3>
                <p className="text-cyan-100 mb-4">
                  Walk into the CFO's office with documented savings, not consultant promises. Show the Board you're managing healthcare spend with the same rigor as any other major vendor.
                </p>
                <div className="bg-cyan-950/50 rounded-lg p-4 border border-cyan-500/30">
                  <div className="text-sm text-cyan-200 font-semibold mb-2">Executive Reporting:</div>
                  <div className="space-y-1 text-sm text-cyan-300">
                    <div>• Monthly savings dashboard</div>
                    <div>• Trend vs. benchmark analysis</div>
                    <div>• Cost avoidance documentation</div>
                    <div>• Evidence receipts for audits</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-blue-200 to-sky-200 bg-clip-text text-transparent">
              The HR Transformation
            </h2>
            <p className="text-center text-blue-300 text-lg mb-16">From reactive admin to strategic cost optimizer</p>

            <Card className="bg-gradient-to-r from-blue-950/50 to-sky-950/50 border-blue-500/40 p-10 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-blue-400 mb-3 uppercase tracking-wide font-semibold">Before SiriusB iQ</div>
                  <div className="bg-gradient-to-br from-red-950/50 to-orange-950/50 border border-red-500/30 rounded-xl p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="text-red-400 mt-1">❌</div>
                      <div className="text-sm text-red-200">Quarterly consultant reports, 3 months stale</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-red-400 mt-1">❌</div>
                      <div className="text-sm text-red-200">PBM says "trend is industry normal"</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-red-400 mt-1">❌</div>
                      <div className="text-sm text-red-200">Employees complain about Rx costs</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-red-400 mt-1">❌</div>
                      <div className="text-sm text-red-200">CFO asks "what are we paying for?"</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-blue-400 mb-3 uppercase tracking-wide font-semibold">With Real-Time Analytics</div>
                  <div className="bg-gradient-to-br from-emerald-950/50 to-green-950/50 border border-emerald-500/30 rounded-xl p-6 space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-emerald-200">Live dashboards updated daily</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-emerald-200">Instant alerts on cost anomalies</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-emerald-200">Employee portal shows alternatives</div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-emerald-200">Board reports with documented savings</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-900/30 to-sky-900/30 border-blue-500/40 p-6 text-center">
                <Smile className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <div className="text-4xl font-black text-blue-300 mb-2">+32%</div>
                <div className="text-sm text-blue-200">Employee Satisfaction</div>
                <div className="text-xs text-blue-400 mt-2">With benefits transparency</div>
              </Card>
              <Card className="bg-gradient-to-br from-sky-900/30 to-cyan-900/30 border-sky-500/40 p-6 text-center">
                <TrendingUp className="w-12 h-12 text-sky-400 mx-auto mb-4" />
                <div className="text-4xl font-black text-emerald-400 mb-2">-18%</div>
                <div className="text-sm text-sky-200">Healthcare Costs</div>
                <div className="text-xs text-sky-400 mt-2">Without cutting benefits</div>
              </Card>
              <Card className="bg-gradient-to-br from-cyan-900/30 to-indigo-900/30 border-cyan-500/40 p-6 text-center">
                <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <div className="text-4xl font-black text-cyan-300 mb-2">100%</div>
                <div className="text-sm text-cyan-200">Audit Ready</div>
                <div className="text-xs text-cyan-400 mt-2">Evidence receipts included</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-blue-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-blue-200 to-sky-200 bg-clip-text text-transparent">
              Be The HR Hero Your Company Needs
            </h2>
            <p className="text-2xl text-blue-200 mb-12">
              Schedule a 30-minute HR briefing to see the employee portal, vendor monitoring dashboards, and executive reporting tools.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white text-xl px-12 py-8 shadow-2xl shadow-blue-500/50">
              Schedule HR Briefing
              <Users className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-sm text-blue-400 mt-6">
              HR-specific demo • Employee experience focused • Leadership reporting included
            </p>
          </div>
        </section>
      </div>
    </>
  );
}