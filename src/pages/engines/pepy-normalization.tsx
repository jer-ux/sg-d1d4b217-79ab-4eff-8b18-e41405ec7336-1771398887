import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Users, DollarSign, TrendingUp, ArrowLeft, BarChart3, Target, Calendar, CheckCircle2, AlertTriangle } from "lucide-react";

export default function PEPYNormalizationEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>PEPY Normalization Engine | Kincaid IQ</title>
        <meta name="description" content="Normalize per-employee-per-year costs across different workforce sizes and demographics for accurate benchmarking and trend analysis." />
      </Head>

      <Nav />

      <div className="min-h-screen bg-neutral-950 text-neutral-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <Link href="/engines" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Engines
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">PEPY Normalization Engine</h1>
                <p className="text-neutral-400 mt-2">Fair per-employee comparisons across diverse workforces</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <DollarSign className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Apples-to-Apples</h3>
                <p className="text-neutral-400 text-sm">Compare healthcare costs fairly across divisions, locations, and peer companies</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <TrendingUp className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Trend Isolation</h3>
                <p className="text-neutral-400 text-sm">Separate real cost trends from headcount changes and workforce shifts</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <BarChart3 className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Benchmarking</h3>
                <p className="text-neutral-400 text-sm">Position accurately against industry standards with normalized metrics</p>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-800 mb-8">
            <div className="flex gap-8">
              {["overview", "capabilities", "use-cases"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-medium transition-colors relative ${
                    activeTab === tab
                      ? "text-emerald-400"
                      : "text-neutral-400 hover:text-neutral-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">Why PEPY Normalization Matters</h2>
                <p className="text-neutral-300 mb-4">
                  Raw per-employee-per-year (PEPY) cost comparisons are distorted by headcount volatility, seasonal hiring, and demographic differences. 
                  Our normalization engine creates fair, stable benchmarks by adjusting for these confounders—revealing true cost performance.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-neutral-900/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      Without Normalization
                    </h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li>• Misleading trends during workforce expansion</li>
                      <li>• Apples-to-oranges peer comparisons</li>
                      <li>• False alarms from seasonal headcount shifts</li>
                      <li>• Hidden cost drivers obscured by growth</li>
                    </ul>
                  </div>
                  <div className="bg-neutral-900/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      With Normalization
                    </h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li>• Stable benchmarks across volatile periods</li>
                      <li>• Fair comparisons with different-sized peers</li>
                      <li>• Isolated cost trends vs. headcount effects</li>
                      <li>• Actionable insights for strategic decisions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Real-World Impact</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Multi-Site Manufacturing</h3>
                      <span className="text-emerald-400 font-mono text-sm">$2.1M Identified</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Normalized PEPY revealed Plant B's costs were 18% higher than Plant A—masked by different headcount profiles. 
                      Root cause: higher specialty Rx utilization. Intervention delivered $2.1M annual savings.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center bg-neutral-800/50 rounded p-3">
                      <div>
                        <div className="text-xs text-neutral-500">Before Normalization</div>
                        <div className="text-sm text-neutral-300 font-mono">$12,400 PEPY</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">After Normalization</div>
                        <div className="text-sm text-emerald-400 font-mono">$14,640 PEPY</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Variance Identified</div>
                        <div className="text-sm text-amber-400 font-mono">+18%</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Retail Chain Growth Period</h3>
                      <span className="text-blue-400 font-mono text-sm">Trend Clarity</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      During 40% headcount expansion, raw PEPY showed declining costs—creating false confidence. 
                      Normalized view revealed 8% underlying medical inflation being masked by new hire demographics.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Executive Action:</strong> CFO redirected $4M reserve allocation 
                      from workforce growth to stop-loss premium increases, avoiding Q4 budget shortfall
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "capabilities" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Normalization Framework</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <Target className="w-8 h-8 text-emerald-400 mb-3" />
                    <h3 className="font-semibold mb-3">Headcount Adjustments</h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li>• Average vs. ending headcount reconciliation</li>
                      <li>• Partial-month employment weighting</li>
                      <li>• Seasonal worker normalization</li>
                      <li>• FTE vs. total employee conversions</li>
                    </ul>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <Users className="w-8 h-8 text-blue-400 mb-3" />
                    <h3 className="font-semibold mb-3">Demographic Standardization</h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li>• Age/gender risk adjustment factors</li>
                      <li>• Family status normalization</li>
                      <li>• Geographic cost index weighting</li>
                      <li>• Industry standard population models</li>
                    </ul>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <Calendar className="w-8 h-8 text-purple-400 mb-3" />
                    <h3 className="font-semibold mb-3">Temporal Consistency</h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li>• Annualization of partial-year data</li>
                      <li>• Seasonality smoothing</li>
                      <li>• Plan year vs. calendar year alignment</li>
                      <li>• Run-out period adjustments</li>
                    </ul>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <BarChart3 className="w-8 h-8 text-amber-400 mb-3" />
                    <h3 className="font-semibold mb-3">Peer Benchmarking</h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      <li>• Industry peer group selection</li>
                      <li>• Plan design richness adjustment</li>
                      <li>• Geographic market normalization</li>
                      <li>• Company size cohort matching</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">Advanced Analytics</h2>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-neutral-900/50 rounded p-4">
                    <div className="font-semibold text-emerald-400 mb-2">Variance Attribution</div>
                    <p className="text-neutral-400">Decompose PEPY changes into headcount, demographics, utilization, and unit cost components</p>
                  </div>
                  <div className="bg-neutral-900/50 rounded p-4">
                    <div className="font-semibold text-blue-400 mb-2">Rolling Baselines</div>
                    <p className="text-neutral-400">12-month normalized averages for stable trend tracking through volatility</p>
                  </div>
                  <div className="bg-neutral-900/50 rounded p-4">
                    <div className="font-semibold text-purple-400 mb-2">Synthetic Cohorts</div>
                    <p className="text-neutral-400">Create virtual comparison groups matched to your exact demographics</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "use-cases" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Executive Use Cases</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">M&A Due Diligence</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Normalize target company's healthcare costs to acquirer's demographics before valuing synergies. 
                      Avoid overpaying for artificially low PEPY driven by younger workforce that will age into your benefits.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">CFO Value:</strong> Prevented $8M overvaluation by revealing 
                      target's "low costs" were due to 28-year median age vs. 41-year acquirer median
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Multi-Year Budget Planning</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Project forward costs using normalized trends independent of planned headcount changes. 
                      Build flexible budgets that hold true whether you hire 100 or 1,000 employees.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Strategic Planning:</strong> Board approved $22M healthcare 
                      budget for 3-year growth plan with confidence in normalized 6.8% annual trend assumption
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Broker/Consultant RFP</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Demand normalized PEPY in all vendor proposals to compare apples-to-apples. 
                      Brokers often cherry-pick favorable headcount periods to inflate savings claims.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Risk Mitigation:</strong> Caught broker claiming 12% savings 
                      when normalized analysis showed 2% improvement—saved $900K in misdirected fees
                    </div>
                  </div>

                  <div className="border-l-4 border-amber-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Internal Division Benchmarking</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Compare healthcare performance across business units fairly. Identify best practices from 
                      low-cost divisions and export to high-cost locations.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-amber-400">Operational Excellence:</strong> Midwest region's PCP utilization 
                      model scaled to Southeast, reducing ER visits 22% and lowering normalized PEPY $780
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}