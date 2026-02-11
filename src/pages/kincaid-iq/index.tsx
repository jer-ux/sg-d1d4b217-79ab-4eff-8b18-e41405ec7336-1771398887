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
        <title>Kincaid IQ | The War Room for Pharmacy Benefit Economics</title>
        <meta
          name="description"
          content="Fiduciary-grade intelligence system for PBM arbitrage analysis. Multi-year actuarial modeling transforms pharmacy benefit structures into measurable capital governance."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <header className="border-b border-white/10 bg-black/40 backdrop-blur-sm sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold tracking-wider text-cyan-400">KINCAID IQ</div>
                <div className="mt-0.5 text-xs text-white/40">Decision Infrastructure Layer</div>
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
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5" />
            <div className="mx-auto max-w-7xl px-6 py-24 relative">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400 mb-6">
                  <Shield className="h-4 w-4" />
                  Fiduciary-Grade Intelligence System
                </div>

                <h1 className="text-6xl font-bold leading-tight tracking-tight lg:text-7xl">
                  The War Room for<br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Pharmacy Benefit Economics
                  </span>
                </h1>

                <div className="mt-8 space-y-6 text-lg leading-relaxed text-white/70">
                  <p className="text-2xl font-semibold text-white">
                    Healthcare Expense Is Not a Line Item.<br />
                    It Is a Capital Governance Failure.
                  </p>

                  <p className="text-xl text-white/80">
                    Kincaid IQ transforms opaque PBM economics into measurable EBITDA impact through multi-year actuarial modeling and continuous arbitrage analysis.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                    <MetricHighlight label="Avg. EBITDA Exposure" value="3–8%" sublabel="Hidden in pharmacy benefit structures" />
                    <MetricHighlight label="Analysis Turnaround" value="48 Hours" sublabel="GLP-1 exposure modeling" />
                    <MetricHighlight label="Projection Horizon" value="5 Years" sublabel="Multi-scenario economic modeling" />
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold text-base px-8">
                    <a href="#war-room">Enter the War Room</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/5 text-base px-8">
                    <a href="#modeling">View Actuarial Framework</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-white/10 bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-6 py-20">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
                  <div className="text-sm font-medium tracking-wide text-cyan-400 mb-3">ECONOMIC ANALYSIS</div>
                  <h2 className="text-4xl font-bold mb-6">Structural Margin Leakage</h2>

                  <div className="space-y-4 text-base leading-relaxed text-white/70">
                    <p>
                      Pharmacy Benefit Managers operate within a complex intermediary ecosystem characterized by:
                    </p>

                    <ul className="space-y-3 pl-5">
                      {[
                        "Spread pricing differentials",
                        "Rebate retention opacity",
                        "Formulary steering incentives",
                        "Contractual misalignment",
                        "Limited price discovery",
                        "GLP-1 utilization acceleration"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <ChevronRight className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 space-y-4">
                      <p className="text-xl font-semibold text-white">
                        The result is not simply rising healthcare cost.
                      </p>
                      <p className="text-xl font-semibold text-white">
                        It is embedded economic arbitrage within the employer-sponsored system.
                      </p>
                      <p className="text-lg text-cyan-400 font-medium">
                        Kincaid IQ quantifies that compression with actuarial precision.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <ImpactMetricCard 
                    label="Annual Leakage Range" 
                    value="$1.2M – $4.8M" 
                    sublabel="Per 1,000 covered lives"
                    trend="-5.2% EBITDA margin"
                  />
                  <ImpactMetricCard 
                    label="Rebate Opacity Zone" 
                    value="15–40%" 
                    sublabel="Of total pharmacy spend"
                    trend="Unverified pass-through"
                  />
                  <ImpactMetricCard 
                    label="GLP-1 Acceleration" 
                    value="340% YoY" 
                    sublabel="Utilization growth rate"
                    trend="$18K avg. annual cost"
                  />
                  <ImpactMetricCard 
                    label="Contract Complexity" 
                    value="200+ pages" 
                    sublabel="Typical PBM agreement"
                    trend="47 pricing schedules"
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
              <div className="text-sm font-medium tracking-wide text-cyan-400 mb-3">EXECUTIVE INTERFACE</div>
              <h2 className="text-4xl font-bold mb-6">The War Room: Four-Tile Executive Dashboard</h2>

              <p className="text-lg text-white/70 max-w-3xl mb-10">
                All intelligence delivered through a simplified, board-ready interface designed for capital allocators — not analysts.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <WarRoomTile
                  number="01"
                  title="Verified Margin Leakage"
                  body="Quantified and validated financial impact attributable to PBM spread, rebate retention, and pricing variance."
                  metric="$3.2M"
                  metricLabel="Identified EBITDA drag"
                  href="/war-room"
                />
                <WarRoomTile
                  number="02"
                  title="Arbitrage Exposure"
                  body="Identification of embedded economic differentials across drugs, formularies, and therapeutic classes — including GLP-1 acceleration risk."
                  metric="127"
                  metricLabel="Active exposure events"
                  href="/war-room"
                />
                <WarRoomTile
                  number="03"
                  title="Incentive Misalignment Map"
                  body="Clear visualization of contractual structures where intermediary incentives diverge from employer cost minimization."
                  metric="18"
                  metricLabel="Structural conflicts identified"
                  href="/war-room"
                />
                <WarRoomTile
                  number="04"
                  title="EBITDA Recovery Pathways"
                  body="Actionable governance strategies tied to measurable margin restoration."
                  metric="$2.1M"
                  metricLabel="Projected annual recovery"
                  href="/verified-savings-ledger"
                />
              </div>

              <div className="mt-10 p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-center">
                <p className="text-xl font-semibold text-white">
                  This is healthcare cost translated into capital discipline.
                </p>
              </div>

              <div className="mt-8 text-center">
                <Button asChild size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-8">
                  <Link href="/war-room">Enter Full War Room Interface</Link>
                </Button>
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
              <h2 className="text-4xl font-bold mb-6">Our Position</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <PositionCard text="We do not replace PBMs." />
                <PositionCard text="We do not litigate narratives." />
                <PositionCard text="We do not operate from ideology." />
              </div>

              <div className="p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-center">
                <p className="text-3xl font-bold text-white mb-6">
                  We restore price signals.
                </p>
                <p className="text-lg text-white/70 max-w-2xl mx-auto">
                  Kincaid IQ converts one of the most opaque cost centers in the American enterprise into a measurable, governable capital domain.
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