import Head from "next/head";
import Link from "next/link";
import { Shield, AlertTriangle, TrendingUp, Users, FileCheck, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import Nav from "@/components/Nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BoardMembersPage() {
  return (
    <>
      <Head>
        <title>For Board Members: Fiduciary Governance & Risk Oversight | SiriusB iQ</title>
        <meta
          name="description"
          content="Board-level oversight tools for healthcare benefit governance, fiduciary risk monitoring, and DOL audit defense."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-purple-950 via-slate-950 to-black text-white">
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[url('/particle-ring-reference.png')] opacity-5 bg-cover bg-center" />
          
          <div className="relative max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-400/30 rounded-full mb-8 backdrop-blur-sm">
              <Shield className="w-5 h-5 text-purple-300" />
              <span className="text-sm font-semibold text-purple-200">Board of Directors</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-purple-200 via-violet-300 to-fuchsia-200 bg-clip-text text-transparent leading-tight">
              Governance<br />Built for Scrutiny
            </h1>
            
            <p className="text-2xl text-purple-100 mb-6 max-w-3xl leading-relaxed">
              The DOL is watching healthcare benefits closer than ever. Your fiduciary responsibility demands <span className="text-purple-300 font-bold">documented oversight</span> — not consultant promises.
            </p>
            
            <p className="text-lg text-purple-300/80 mb-10 max-w-2xl">
              SiriusB iQ provides board-ready governance infrastructure: real-time monitoring, evidence receipts, and audit-defensible documentation for every healthcare decision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-lg px-8 py-6 shadow-2xl shadow-purple-500/50">
                Request Board Briefing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-purple-400/50 text-purple-200 hover:bg-purple-500/20 text-lg px-8 py-6">
                View Governance Framework
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <Card className="bg-purple-900/30 border-purple-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-purple-300 mb-2">100%</div>
                <div className="text-sm text-purple-200">DOL Audit Ready</div>
                <div className="text-xs text-purple-400 mt-2">Evidence receipts for every action</div>
              </Card>
              <Card className="bg-violet-900/30 border-violet-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-violet-300 mb-2">$2.4M</div>
                <div className="text-sm text-violet-200">Average Board Savings</div>
                <div className="text-xs text-violet-400 mt-2">Through documented oversight</div>
              </Card>
              <Card className="bg-fuchsia-900/30 border-fuchsia-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                <div className="text-5xl font-black text-fuchsia-300 mb-2">15min</div>
                <div className="text-sm text-fuchsia-200">Quarterly Review Time</div>
                <div className="text-xs text-fuchsia-400 mt-2">Executive dashboard summary</div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-black to-purple-950/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-16 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
              What Boards Need to Know
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-red-950/40 to-orange-950/40 border-red-500/30 p-8 group hover:scale-105 transition-all">
                <AlertTriangle className="w-12 h-12 text-red-400 mb-6 group-hover:animate-pulse" />
                <h3 className="text-2xl font-bold text-white mb-4">The Fiduciary Risk</h3>
                <p className="text-red-100 mb-4">
                  ERISA §404 makes plan fiduciaries <span className="font-bold text-red-300">personally liable</span> for failing to monitor service providers. The DOL has recovered over $3.1B in fiduciary breach settlements since 2020.
                </p>
                <div className="bg-red-950/50 rounded-lg p-4 border border-red-500/30">
                  <div className="text-sm text-red-200 font-mono">
                    &quot;The plan fiduciary has a continuing responsibility to monitor the designated investment provider...&quot;
                  </div>
                  <div className="text-xs text-red-400 mt-2">— DOL Field Assistance Bulletin 2021-01</div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-950/40 to-violet-950/40 border-purple-500/30 p-8 group hover:scale-105 transition-all">
                <Shield className="w-12 h-12 text-purple-400 mb-6 group-hover:rotate-12 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">The Documentation Gap</h3>
                <p className="text-purple-100 mb-4">
                  Most boards receive <span className="font-bold text-purple-300">consultant slide decks</span>, not evidence. When the DOL audits, they ask for meeting minutes, benchmarking data, and monitoring cadence — not PowerPoints.
                </p>
                <div className="bg-purple-950/50 rounded-lg p-4 border border-purple-500/30">
                  <div className="text-sm text-purple-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>Quarterly monitoring reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>Evidence receipts for decisions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      <span>Benchmarking validation data</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-black text-center mb-8 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
              Board-Ready Infrastructure
            </h2>
            <p className="text-center text-purple-300 text-lg mb-16">Three layers of documented oversight</p>

            <div className="space-y-8">
              <Card className="bg-gradient-to-r from-purple-950/50 to-violet-950/50 border-purple-500/40 p-8 hover:border-purple-400/60 transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-4 shadow-xl shadow-purple-500/50">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">Executive Dashboard</h3>
                    <p className="text-purple-200 text-lg mb-4">
                      15-minute quarterly review. McKinsey + Bain KPIs for cost trends, vendor performance, and fiduciary compliance — all backed by evidence receipts.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                        <div className="text-3xl font-bold text-purple-300 mb-1">-18%</div>
                        <div className="text-xs text-purple-400">Pharmacy Trend</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                        <div className="text-3xl font-bold text-emerald-400 mb-1">94%</div>
                        <div className="text-xs text-purple-400">Contract Compliance</div>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-purple-500/20">
                        <div className="text-3xl font-bold text-blue-400 mb-1">$1.2M</div>
                        <div className="text-xs text-purple-400">Documented Savings</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-violet-950/50 to-fuchsia-950/50 border-violet-500/40 p-8 hover:border-violet-400/60 transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-violet-500 to-fuchsia-600 rounded-2xl p-4 shadow-xl shadow-violet-500/50">
                    <FileCheck className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">Evidence Receipts</h3>
                    <p className="text-violet-200 text-lg mb-4">
                      Every decision — from formulary changes to PBM contracts — generates an immutable evidence receipt with source data, analysis methodology, and approval chain.
                    </p>
                    <div className="bg-black/30 rounded-lg p-4 border border-violet-500/20 font-mono text-sm text-violet-200">
                      Receipt #2024-Q3-PBM-001<br/>
                      Action: PBM Contract Amendment<br/>
                      Basis: Claims analysis (18,234 Rx)<br/>
                      Projected Savings: $627K/year<br/>
                      Approved: Board 2024-09-15
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-r from-fuchsia-950/50 to-purple-950/50 border-fuchsia-500/40 p-8 hover:border-fuchsia-400/60 transition-all">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl p-4 shadow-xl shadow-fuchsia-500/50">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-white mb-3">DOL Audit Package</h3>
                    <p className="text-fuchsia-200 text-lg mb-4">
                      Pre-assembled documentation proving continuous monitoring, benchmarking, and prudent decision-making. When the DOL requests your fiduciary file, you hand them a 200-page package.
                    </p>
                    <div className="grid md:grid-cols-4 gap-3 mt-4">
                      {["Meeting Minutes", "Benchmark Reports", "Evidence Receipts", "Approval Records"].map((item, i) => (
                        <div key={i} className="bg-fuchsia-950/30 rounded-lg p-3 border border-fuchsia-500/20 text-center">
                          <CheckCircle2 className="w-5 h-5 text-fuchsia-400 mx-auto mb-1" />
                          <div className="text-xs text-fuchsia-200">{item}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-gradient-to-b from-purple-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
              Sleep Well. We&apos;ve Got The Documentation.
            </h2>
            <p className="text-2xl text-purple-200 mb-12">
              Schedule a 30-minute board briefing to see how SiriusB iQ turns fiduciary responsibility into documented reality.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-xl px-12 py-8 shadow-2xl shadow-purple-500/50">
              Request Board Briefing
              <Shield className="w-6 h-6 ml-3" />
            </Button>
            <p className="text-sm text-purple-400 mt-6">
              No sales pitch • Executive-level only • 100% governance focused
            </p>
          </div>
        </section>
      </div>
    </>
  );
}