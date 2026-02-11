import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  CheckCircle, 
  LineChart, 
  Users,
  Database,
  FileCheck,
  Target,
  DollarSign,
  BarChart3,
  Lock,
  ArrowRight,
  ChevronRight
} from "lucide-react";
import { FAQ } from "@/components/kincaid-iq/FAQ";
import { WarRoomHero3D } from "@/components/kincaid-iq/WarRoomHero3D";
import { PremiumTileView } from "@/components/kincaid-iq/PremiumTileView";
import { TransparencyCard } from "@/components/kincaid-iq/TransparencyCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function KincaidIQHome() {
  const [selectedScenario, setSelectedScenario] = useState<"low" | "base" | "stress">("base");

  const projectionData = {
    low: [
      { year: 2026, totalSpend: 8.2, glp1Percent: 2.8, spreadLeakage: 0.18, rebateVariance: 0.12, ebitdaImpact: -0.30, cumulative: -0.30 },
      { year: 2027, totalSpend: 8.7, glp1Percent: 3.4, spreadLeakage: 0.19, rebateVariance: 0.14, ebitdaImpact: -0.33, cumulative: -0.63 },
      { year: 2028, totalSpend: 9.2, glp1Percent: 4.2, spreadLeakage: 0.21, rebateVariance: 0.16, ebitdaImpact: -0.37, cumulative: -1.00 },
      { year: 2029, totalSpend: 9.8, glp1Percent: 5.1, spreadLeakage: 0.23, rebateVariance: 0.18, ebitdaImpact: -0.41, cumulative: -1.41 },
      { year: 2030, totalSpend: 10.4, glp1Percent: 6.2, spreadLeakage: 0.25, rebateVariance: 0.20, ebitdaImpact: -0.45, cumulative: -1.86 }
    ],
    base: [
      { year: 2026, totalSpend: 8.5, glp1Percent: 3.2, spreadLeakage: 0.24, rebateVariance: 0.18, ebitdaImpact: -0.42, cumulative: -0.42 },
      { year: 2027, totalSpend: 9.4, glp1Percent: 4.8, spreadLeakage: 0.28, rebateVariance: 0.22, ebitdaImpact: -0.50, cumulative: -0.92 },
      { year: 2028, totalSpend: 10.6, glp1Percent: 7.1, spreadLeakage: 0.34, rebateVariance: 0.28, ebitdaImpact: -0.62, cumulative: -1.54 },
      { year: 2029, totalSpend: 12.1, glp1Percent: 10.2, spreadLeakage: 0.42, rebateVariance: 0.36, ebitdaImpact: -0.78, cumulative: -2.32 },
      { year: 2030, totalSpend: 13.9, glp1Percent: 14.1, spreadLeakage: 0.52, rebateVariance: 0.45, ebitdaImpact: -0.97, cumulative: -3.29 }
    ],
    stress: [
      { year: 2026, totalSpend: 8.8, glp1Percent: 3.8, spreadLeakage: 0.32, rebateVariance: 0.24, ebitdaImpact: -0.56, cumulative: -0.56 },
      { year: 2027, totalSpend: 10.2, glp1Percent: 6.4, spreadLeakage: 0.41, rebateVariance: 0.32, ebitdaImpact: -0.73, cumulative: -1.29 },
      { year: 2028, totalSpend: 12.1, glp1Percent: 10.8, spreadLeakage: 0.54, rebateVariance: 0.44, ebitdaImpact: -0.98, cumulative: -2.27 },
      { year: 2029, totalSpend: 14.6, glp1Percent: 16.8, spreadLeakage: 0.72, rebateVariance: 0.58, ebitdaImpact: -1.30, cumulative: -3.57 },
      { year: 2030, totalSpend: 17.8, glp1Percent: 24.2, spreadLeakage: 0.96, rebateVariance: 0.76, ebitdaImpact: -1.72, cumulative: -5.29 }
    ]
  };

  const currentProjection = projectionData[selectedScenario];
  const finalYear = currentProjection[currentProjection.length - 1];

  return (
    <>
      <Head>
        <title>Kincaid IQ | Enterprise Transparency Engine</title>
        <meta
          name="description"
          content="Fiduciary-grade accountability system that transforms cost optimization claims into cryptographically verified, audit-ready evidence with real-time board-grade clarity."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* INSTITUTIONAL HEADER */}
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold tracking-wider text-cyan-400">KINCAID IQ</div>
                <div className="mt-0.5 text-xs text-white/40">Enterprise Transparency Engine</div>
              </div>
              <div className="flex items-center gap-6">
                <div className="hidden md:flex gap-8 text-xs text-white/60">
                  <div>
                    <div className="text-white/40">Certification</div>
                    <div className="mt-0.5 font-medium text-white">SOC 2 Type II</div>
                  </div>
                  <div>
                    <div className="text-white/40">Deployment</div>
                    <div className="mt-0.5 font-medium text-white">Private Cloud</div>
                  </div>
                </div>
                <Button asChild size="sm" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
                  <a href="#briefing">Executive Briefing</a>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* HERO - WAR ROOM 3D VISUALIZATION */}
          <section className="relative">
            <WarRoomHero3D />
            
            {/* Hero Content Below Visualization */}
            <div className="bg-gradient-to-b from-slate-950/50 to-slate-950">
              <div className="mx-auto max-w-7xl px-6 py-16">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 mb-6">
                    <Shield className="h-4 w-4" />
                    Fiduciary-Grade Accountability System
                  </div>

                  <div className="space-y-6 text-lg leading-relaxed text-white/70">
                    <p className="text-2xl font-semibold text-white">
                      Every Cost Optimization Claim.<br />
                      Every Efficiency Gain. Every Business Decision.<br />
                      Cryptographically Verified. Audit-Ready.
                    </p>

                    <p className="text-xl text-white/80">
                      Kincaid iQ is an enterprise transparency engine that transforms how organizations understand and prove their financial performance. It's not just another analytics platform—it's a fiduciary-grade accountability system that turns every dollar into documented, traceable evidence.
                    </p>

                    <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-left">
                      <p className="text-base leading-relaxed text-white/90">
                        <strong className="text-white">Real-time, board-grade clarity on cash liquidity</strong>—even as health and pharmacy claims are still posting—backed by auditable evidence lineage. You don't walk into the boardroom with "what we think happened." You walk in with <strong className="text-cyan-400">"what happened,"</strong> traceable from source data to financial outcome.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                      <MetricHighlight label="Evidence Verification" value="Cryptographic" sublabel="Immutable audit trail" />
                      <MetricHighlight label="Financial Reconciliation" value="Real-Time" sublabel="Claims to EBITDA tie-out" />
                      <MetricHighlight label="Reporting Standard" value="Board-Grade" sublabel="Audit-ready documentation" />
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold text-base px-8">
                      <a href="#war-room">Enter the War Room</a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/5 text-base px-8">
                      <a href="#transparency">View Evidence Framework</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PREMIUM 3D TILE VIEW */}
          <PremiumTileView />

          {/* THE TRANSPARENCY CHALLENGE */}
          <section className="border-t border-white/10 bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="text-sm font-medium tracking-wide text-cyan-400 mb-3">THE ACCOUNTABILITY GAP</div>
                  <h2 className="text-4xl font-bold mb-6">From Claims to Control</h2>

                  <div className="space-y-4 text-base leading-relaxed text-white/70">
                    <p className="text-lg text-white/80">
                      This isn't another dashboard sitting on top of your stack.
                    </p>

                    <p>
                      Kincaid iQ ties <strong className="text-white">claims, contracts, vendor invoices, and cost initiatives directly to financial results</strong>—and documents the math behind every dollar.
                    </p>

                    <div className="p-6 rounded-xl bg-slate-800/50 border border-white/10">
                      <p className="text-base text-white/90">
                        If a program claims <strong className="text-cyan-400">$4M in savings</strong>, you can inspect the chain:
                      </p>
                      <ul className="mt-4 space-y-2 pl-5">
                        {[
                          "Source records & data lineage",
                          "Assumptions & calculation logic",
                          "EBITDA tie-out & reconciliation",
                          "Persistence validation (does it last?)"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span className="text-white/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-6 space-y-4">
                      <p className="text-xl font-semibold text-white">
                        Not just visibility—control. ⚡️
                      </p>
                      <p className="text-lg text-cyan-400 font-medium">
                        Audit-ready reporting, stronger renewal leverage, and defensible decisions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <ImpactMetricCard 
                    label="Evidence Completeness" 
                    value="100%" 
                    sublabel="Source-to-outcome traceability"
                    trend="Cryptographically verified"
                  />
                  <ImpactMetricCard 
                    label="Financial Reconciliation" 
                    value="Real-Time" 
                    sublabel="Claims to cash liquidity"
                    trend="Even as claims post"
                  />
                  <ImpactMetricCard 
                    label="Audit Readiness" 
                    value="Board-Grade" 
                    sublabel="Executive-ready documentation"
                    trend="No manual preparation"
                  />
                  <ImpactMetricCard 
                    label="Savings Verification" 
                    value="Multi-Year" 
                    sublabel="Persistence tracking"
                    trend="Does it last next year?"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="modeling" className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div className="text-sm font-medium tracking-wide text-cyan-400 mb-3">ACTUARIAL FRAMEWORK</div>
              <h2 className="text-4xl font-bold mb-6">Multi-Year Economic Projection Model</h2>

              <p className="text-lg text-white/70 max-w-3xl mb-10">
                Every projection includes Low/Base/Stress scenarios with disclosed assumptions, GLP-1 diffusion modeling, and reconciliation to EBITDA impact.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                <ScenarioButton 
                  active={selectedScenario === "low"} 
                  onClick={() => setSelectedScenario("low")}
                  label="Low Case"
                  description="Conservative GLP-1 adoption"
                />
                <ScenarioButton 
                  active={selectedScenario === "base"} 
                  onClick={() => setSelectedScenario("base")}
                  label="Base Case"
                  description="Current trend trajectory"
                />
                <ScenarioButton 
                  active={selectedScenario === "stress"} 
                  onClick={() => setSelectedScenario("stress")}
                  label="Stress Case"
                  description="Accelerated utilization"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-slate-800/50 border-white/10">
                  <CardContent className="p-6">
                    <div className="text-sm text-white/50 mb-2">5-Year Total Spend</div>
                    <div className="text-3xl font-bold text-white">${finalYear.totalSpend}M</div>
                    <div className="text-xs text-white/40 mt-1">Projected 2030</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-white/10">
                  <CardContent className="p-6">
                    <div className="text-sm text-white/50 mb-2">GLP-1 Penetration</div>
                    <div className="text-3xl font-bold text-cyan-400">{finalYear.glp1Percent}%</div>
                    <div className="text-xs text-white/40 mt-1">Of total pharmacy spend</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-white/10">
                  <CardContent className="p-6">
                    <div className="text-sm text-white/50 mb-2">Cumulative Leakage</div>
                    <div className="text-3xl font-bold text-red-400">${Math.abs(finalYear.cumulative).toFixed(2)}M</div>
                    <div className="text-xs text-white/40 mt-1">5-year EBITDA impact</div>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800/50 border-white/10">
                  <CardContent className="p-6">
                    <div className="text-sm text-white/50 mb-2">Annual Impact (2030)</div>
                    <div className="text-3xl font-bold text-red-400">${Math.abs(finalYear.ebitdaImpact).toFixed(2)}M</div>
                    <div className="text-xs text-white/40 mt-1">Margin compression</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-800/50 border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-900/50 border-b border-white/10">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-white">Year</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-white">Total Spend ($M)</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-white">GLP-1 %</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-white">Spread Leakage ($M)</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-white">Rebate Variance ($M)</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-white">EBITDA Impact ($M)</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-white">Cumulative ($M)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {currentProjection.map((row, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-white">{row.year}</td>
                          <td className="px-6 py-4 text-sm text-right text-white/80">{row.totalSpend.toFixed(1)}</td>
                          <td className="px-6 py-4 text-sm text-right text-cyan-400 font-medium">{row.glp1Percent.toFixed(1)}%</td>
                          <td className="px-6 py-4 text-sm text-right text-orange-400">{row.spreadLeakage.toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm text-right text-orange-400">{row.rebateVariance.toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm text-right text-red-400 font-semibold">{row.ebitdaImpact.toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm text-right text-red-500 font-bold">{row.cumulative.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <p className="text-sm text-cyan-200">
                  <strong>Modeling Assumptions ({selectedScenario === "low" ? "Low Case" : selectedScenario === "base" ? "Base Case" : "Stress Case"}):</strong>{" "}
                  {selectedScenario === "low" 
                    ? "6.2% baseline pharmacy trend, 2.8% initial GLP-1 penetration with 18% annual adoption growth, 2.2% spread differential, 85% rebate pass-through."
                    : selectedScenario === "base"
                    ? "7.8% baseline pharmacy trend, 3.2% initial GLP-1 penetration with 35% annual adoption growth, 2.8% spread differential, 75% rebate pass-through."
                    : "9.4% baseline pharmacy trend, 3.8% initial GLP-1 penetration with 52% annual adoption growth, 3.6% spread differential, 65% rebate pass-through."}
                </p>
              </div>
            </div>
          </section>

          <section id="war-room" className="border-t border-white/10 bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div className="text-sm font-medium tracking-wide text-cyan-400 mb-3">EVIDENCE-BASED ACCOUNTABILITY</div>
              <h2 className="text-4xl font-bold mb-6">The War Room: Four-Tile Executive Dashboard</h2>

              <p className="text-lg text-white/70 max-w-3xl mb-10">
                Every claim backed by cryptographic verification. Every number traceable to source. Every decision audit-ready.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WarRoomTile
                  number="01"
                  title="Verified Savings Ledger"
                  body="Every cost optimization claim validated with source-to-outcome evidence lineage. Complete traceability from vendor invoice to EBITDA impact."
                  metric="$3.2M"
                  metricLabel="Cryptographically verified savings"
                  href="/war-room"
                />
                <WarRoomTile
                  number="02"
                  title="Evidence Receipts"
                  body="Immutable proof packs for every financial transaction. Complete documentation of assumptions, calculations, and reconciliation—board-ready."
                  metric="127"
                  metricLabel="Active evidence chains"
                  href="/war-room"
                />
                <WarRoomTile
                  number="03"
                  title="Real-Time Reconciliation"
                  body="Live cash liquidity visibility even as claims post. Automated tie-out from source data through financial outcomes with zero manual prep."
                  metric="100%"
                  metricLabel="Source-to-EBITDA traceability"
                  href="/war-room"
                />
                <WarRoomTile
                  number="04"
                  title="Persistence Tracking"
                  body="Multi-year validation that savings actually persist. Automated monitoring ensures claimed benefits deliver in subsequent periods."
                  metric="$2.1M"
                  metricLabel="Sustained annual impact"
                  href="/verified-savings-ledger"
                />
              </div>

              <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-center">
                <p className="text-xl font-semibold text-white">
                  This is financial performance translated into defensible truth.
                </p>
              </div>

              <div className="mt-8 text-center">
                <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8">
                  <Link href="/war-room">Enter Full War Room Interface</Link>
                </Button>
              </div>
            </div>
          </section>

          <section id="transparency" className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div className="text-sm font-medium tracking-wide text-cyan-400 mb-3">EVIDENCE FRAMEWORK</div>
              <h2 className="text-4xl font-bold mb-6">How Transparency Actually Works</h2>

              <p className="text-lg text-white/70 max-w-3xl mb-10">
                Every financial claim in Kincaid iQ includes a complete evidence chain—from source transaction to EBITDA reconciliation—backed by cryptographic verification.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <TransparencyCard
                  icon={Database}
                  title="Source Integration"
                  description="Direct connection to claims data, vendor contracts, invoices, and benefit systems with immutable timestamps."
                />
                <TransparencyCard
                  icon={FileCheck}
                  title="Evidence Receipts"
                  description="Every calculation documented: assumptions stated, logic exposed, variance explained, alternative approaches documented."
                />
                <TransparencyCard
                  icon={LineChart}
                  title="Financial Tie-Out"
                  description="Automated reconciliation from transaction-level detail through P&L impact with real-time EBITDA validation."
                />
                <TransparencyCard
                  icon={Lock}
                  title="Cryptographic Proof"
                  description="Tamper-evident audit trail ensuring evidence integrity from capture through board presentation."
                />
              </div>

              <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10">
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <p className="text-xl font-semibold text-white">
                    The Result: Audit-Ready Financial Reporting
                  </p>
                  <p className="text-base text-white/70">
                    Walk into any audit, board meeting, or renewal negotiation with complete documentation—already prepared, already verified, already defensible.
                  </p>
                  <p className="text-lg text-cyan-400 font-medium">
                    No scrambling. No manual reconciliation. No gaps.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div className="text-sm font-medium tracking-wide text-cyan-400 mb-3">PBM ARBITRAGE ANALYSIS</div>
              <h2 className="text-4xl font-bold mb-6">Six-Category Economic Classification</h2>

              <p className="text-lg text-white/70 max-w-3xl mb-10">
                Every dollar of exposure is decomposed into specific arbitrage categories with verified impact calculation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ArbitrageCategory
                  icon={TrendingDown}
                  title="Spread-Based Variance"
                  description="Differential between plan-paid and PBM-paid pricing at point of adjudication"
                  impact="$0.42M annual"
                />
                <ArbitrageCategory
                  icon={DollarSign}
                  title="Rebate Retention Variance"
                  description="Manufacturer rebates retained by intermediary vs. contractual pass-through"
                  impact="$0.28M annual"
                />
                <ArbitrageCategory
                  icon={Target}
                  title="Formulary Steering Exposure"
                  description="Economic incentives driving non-optimal therapeutic selection"
                  impact="$0.18M annual"
                />
                <ArbitrageCategory
                  icon={AlertTriangle}
                  title="Specialty Drug Markups"
                  description="Margin layering on high-cost therapeutics through specialty pharmacy channels"
                  impact="$0.34M annual"
                />
                <ArbitrageCategory
                  icon={TrendingUp}
                  title="GLP-1 Diffusion Impact"
                  description="Utilization acceleration in weight loss / diabetes categories"
                  impact="$0.62M annual (growing)"
                />
                <ArbitrageCategory
                  icon={Lock}
                  title="Contract Opacity Zones"
                  description="Unverifiable pricing mechanisms and performance guarantee structures"
                  impact="$0.24M annual"
                />
              </div>

              <div className="mt-10 p-6 rounded-xl bg-slate-800/50 border border-white/10">
                <p className="text-base text-white/70">
                  <strong className="text-white">Total Quantified Arbitrage:</strong> $2.08M annually across six verified categories.
                  <span className="block mt-2 text-cyan-400">Each category includes evidence lineage, baseline comparison, and EBITDA reconciliation.</span>
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div className="text-sm font-medium tracking-wide text-cyan-400 mb-3">INSTITUTIONAL POSITIONING</div>
              <h2 className="text-4xl font-bold mb-6">What We Deliver</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <PositionCard text="We don't give you dashboards." />
                <PositionCard text="We don't promise insights." />
                <PositionCard text="We don't sell visibility." />
              </div>

              <div className="p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-center space-y-6">
                <p className="text-3xl font-bold text-white">
                  We give you control.
                </p>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Kincaid iQ converts every cost optimization claim into cryptographically verified, audit-ready evidence—with real-time financial reconciliation and board-grade documentation.
                </p>
                <p className="text-xl font-semibold text-cyan-400">
                  Not just transparency. Accountability. ⚡️
                </p>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div className="text-sm font-medium tracking-wide text-cyan-400 mb-3">TARGET AUDIENCE</div>
              <h2 className="text-4xl font-bold mb-6">Who This Is For</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AudienceCard
                  icon={Shield}
                  title="Board Directors"
                  body="Requiring fiduciary clarity on one of the largest opaque expense categories in enterprise P&L."
                />
                <AudienceCard
                  icon={Target}
                  title="Founders & CEOs"
                  body="Protecting margin durability against structural cost acceleration in high-growth environments."
                />
                <AudienceCard
                  icon={BarChart3}
                  title="Private Equity Firms"
                  body="Optimizing portfolio EBITDA through systematic healthcare cost governance across platform companies."
                />
                <AudienceCard
                  icon={DollarSign}
                  title="CFOs"
                  body="Demanding contract transparency and verifiable cost attribution for board-level financial reporting."
                />
                <AudienceCard
                  icon={Lock}
                  title="Institutional Investors"
                  body="Analyzing enterprise cost risk exposure as material factor in investment thesis and valuation models."
                />
                <AudienceCard
                  icon={Users}
                  title="HR & Benefits Leaders"
                  body="Moving from reactive reporting to strategic control with evidence-backed plan performance visibility."
                />
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <FAQ />
            </div>
          </section>

          <section id="briefing" className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <Card className="overflow-hidden rounded-3xl border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
                <CardContent className="p-12 text-center">
                  <h2 className="text-4xl font-bold mb-6">Request a War Room Briefing</h2>

                  <div className="mx-auto max-w-3xl space-y-4 text-lg text-white/70 mb-10">
                    <p>
                      If you are a Board member, Founder, CFO, or Investor —<br />
                      and pharmacy benefit expense is material to your enterprise —<br />
                      you need visibility before your next renewal cycle.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                    <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-10">
                      <Link href="/contact">Schedule Briefing</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/5 px-10">
                      <a href="mailto:jer@kincaidrmc.com">jer@kincaidrmc.com</a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/5 px-10">
                      <a href="tel:12192563331">219.256.3331</a>
                    </Button>
                  </div>

                  <div className="flex justify-center gap-12 text-sm text-white/60">
                    <div>
                      <div className="text-white/40">Response Time</div>
                      <div className="mt-1 font-medium text-white">24 hours</div>
                    </div>
                    <div>
                      <div className="text-white/40">Briefing Format</div>
                      <div className="mt-1 font-medium text-white">Executive-only</div>
                    </div>
                    <div>
                      <div className="text-white/40">Duration</div>
                      <div className="mt-1 font-medium text-white">45 minutes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <footer className="border-t border-white/10 py-8 text-center text-sm text-white/60">
            <p>© 2026 Kincaid Risk Management Company. All Rights Reserved.</p>
          </footer>
        </main>
      </div>
    </>
  );
}

function MetricHighlight({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
      <div className="text-xs text-cyan-400 mb-1">{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-white/50 mt-1">{sublabel}</div>
    </div>
  );
}

function ImpactMetricCard({ label, value, sublabel, trend }: { label: string; value: string; sublabel: string; trend: string }) {
  return (
    <Card className="bg-slate-800/50 border-white/10">
      <CardContent className="p-6">
        <div className="text-xs text-white/50 mb-2">{label}</div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-white/40 mb-3">{sublabel}</div>
        <div className="text-sm text-red-400 font-medium">{trend}</div>
      </CardContent>
    </Card>
  );
}

function ScenarioButton({ active, onClick, label, description }: { active: boolean; onClick: () => void; label: string; description: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg border transition-all ${
        active 
          ? "border-cyan-500 bg-cyan-500/20 text-white" 
          : "border-white/10 bg-slate-800/50 text-white/60 hover:bg-slate-800"
      }`}
    >
      <div className="font-semibold">{label}</div>
      <div className="text-xs mt-1 opacity-80">{description}</div>
    </button>
  );
}

function WarRoomTile({ number, title, body, metric, metricLabel, href }: { number: string; title: string; body: string; metric: string; metricLabel: string; href: string }) {
  return (
    <Link href={href}>
      <Card className="group h-full cursor-pointer rounded-2xl border-white/10 bg-slate-800/50 transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800">
        <CardContent className="p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="text-xs font-medium text-white/40">{number}</div>
            <ArrowRight className="h-4 w-4 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
          </div>
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-sm leading-relaxed text-white/70 mb-6">{body}</p>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-2xl font-semibold text-cyan-400">{metric}</div>
            <div className="mt-1 text-xs text-white/50">{metricLabel}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ArbitrageCategory({ icon: Icon, title, description, impact }: { icon: React.ComponentType<{ className?: string }>; title: string; description: string; impact: string }) {
  return (
    <Card className="bg-slate-800/50 border-white/10">
      <CardContent className="p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 mb-4">
          <Icon className="h-6 w-6 text-cyan-400" />
        </div>
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-white/70 mb-4">{description}</p>
        <div className="text-sm font-medium text-red-400">{impact}</div>
      </CardContent>
    </Card>
  );
}

function PositionCard({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-6 text-center">
      <p className="text-sm text-white/60">{text}</p>
    </div>
  );
}

function AudienceCard({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <Card className="bg-slate-800/50 border-white/10">
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 mb-4">
          <Icon className="h-5 w-5 text-cyan-400" />
        </div>
        <h3 className="text-base font-semibold mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-white/70">{body}</p>
      </CardContent>
    </Card>
  );
}