import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Activity, DollarSign, TrendingDown, ArrowLeft, Users, Target, BarChart3, CheckCircle2 } from "lucide-react";

export default function CostElasticityEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Cost Elasticity Engine | Kincaid IQ</title>
        <meta name="description" content="Model how healthcare utilization responds to cost-sharing changes to optimize plan design and predict member behavior." />
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
                <Activity className="w-8 h-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Cost Elasticity Engine</h1>
                <p className="text-neutral-400 mt-2">Predict utilization response to plan design changes</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <TrendingDown className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Behavioral Modeling</h3>
                <p className="text-neutral-400 text-sm">Predict how members change utilization when you change cost-sharing</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <DollarSign className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Savings Accuracy</h3>
                <p className="text-neutral-400 text-sm">Avoid overstating deductible increase savings by modeling induced demand</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Health Impact</h3>
                <p className="text-neutral-400 text-sm">Quantify delayed care risk and long-term cost rebounds from high cost-sharing</p>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-800 mb-8">
            <div className="flex gap-8">
              {["overview", "methodology", "use-cases"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-medium transition-colors relative ${
                    activeTab === tab
                      ? "text-emerald-400"
                      : "text-neutral-400 hover:text-neutral-300"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                <h2 className="text-2xl font-display font-bold mb-4">The Elasticity Principle</h2>
                <p className="text-neutral-300 mb-4">
                  When you raise deductibles $1,000, members don't just pay $1,000 more—they delay care, skip preventive visits, 
                  and stretch prescriptions. Some of this is good (reducing low-value utilization), some is dangerous (diabetics 
                  rationing insulin). Our engine models these behavioral responses by service category, income tier, and chronic 
                  condition status—revealing the true net financial and health impact.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    Key Elasticity Insights
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-emerald-400 font-semibold mb-2">High-Elasticity Services</div>
                      <ul className="space-y-1 text-neutral-400">
                        <li>• Discretionary specialist visits (-40% at +$50 copay)</li>
                        <li>• Physical therapy (-35% at +$25 copay)</li>
                        <li>• Brand Rx when generic available (-60% at tier shift)</li>
                        <li>• Non-urgent ER visits (-25% at +$100 copay)</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-blue-400 font-semibold mb-2">Low-Elasticity Services</div>
                      <ul className="space-y-1 text-neutral-400">
                        <li>• Chronic disease Rx (-8% even at significant increase)</li>
                        <li>• Cancer treatment (near-zero elasticity)</li>
                        <li>• Emergency surgery (zero elasticity)</li>
                        <li>• Insulin for diabetics (-12% = dangerous rationing)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Real-World Impact</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Retail Chain (15,000 employees)</h3>
                      <span className="text-emerald-400 font-mono text-sm">$2.8M Reality Check</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Broker projected $4.1M savings from $500 deductible increase. Elasticity modeling showed only $2.8M net 
                      savings after utilization reductions—plus predicted 14% increase in ER visits for delayed primary care. 
                      CFO rejected proposal, avoiding health deterioration cascade.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center bg-neutral-800/50 rounded p-3">
                      <div>
                        <div className="text-xs text-neutral-500">Broker Projection</div>
                        <div className="text-sm text-neutral-300 font-mono">$4.1M Savings</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">Actual (Modeled)</div>
                        <div className="text-sm text-amber-400 font-mono">$2.8M Savings</div>
                      </div>
                      <div>
                        <div className="text-xs text-neutral-500">ER Cost Increase</div>
                        <div className="text-sm text-red-400 font-mono">+$900K/year</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6 py-2">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-lg">Technology Company (4,500 employees)</h3>
                      <span className="text-blue-400 font-mono text-sm">Optimized Design</span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-3">
                      Used elasticity modeling to target copay increases on high-elasticity, low-value services only. Raised 
                      specialist copays $20 (high elasticity, often unnecessary) while keeping chronic disease Rx at $0 
                      (low elasticity, high value). Saved $1.9M with zero health deterioration.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Smart Targeting:</strong> Specialist visit utilization dropped 28% 
                      (mostly low-value), chronic Rx adherence maintained at 94%—ideal outcome
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "methodology" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Elasticity Modeling Framework</h2>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Service Category Segmentation</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-emerald-400 font-semibold mb-2">Primary Care</div>
                        <div className="text-neutral-500 text-xs mb-2">Elasticity: -0.20</div>
                        <p className="text-neutral-400 text-xs">20% utilization drop per 10% price increase</p>
                      </div>
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-blue-400 font-semibold mb-2">Specialist Visits</div>
                        <div className="text-neutral-500 text-xs mb-2">Elasticity: -0.45</div>
                        <p className="text-neutral-400 text-xs">45% utilization drop per 10% price increase</p>
                      </div>
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-purple-400 font-semibold mb-2">Brand Rx</div>
                        <div className="text-neutral-500 text-xs mb-2">Elasticity: -0.65</div>
                        <p className="text-neutral-400 text-xs">65% substitution to generics per tier shift</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Income-Adjusted Modeling</h3>
                    <p className="text-neutral-400 text-sm mb-4">
                      Elasticity varies dramatically by income. A $50 copay increase has 3x higher utilization impact on 
                      workers earning less than $40K vs. those earning more than $100K. Our engine stratifies by income quartile.
                    </p>
                    <div className="grid grid-cols-4 gap-3 text-xs text-center">
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-neutral-500 mb-1">Bottom Quartile</div>
                        <div className="text-red-400 font-mono text-lg">-0.60</div>
                        <div className="text-neutral-500 mt-1">High sensitivity</div>
                      </div>
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-neutral-500 mb-1">2nd Quartile</div>
                        <div className="text-amber-400 font-mono text-lg">-0.35</div>
                        <div className="text-neutral-500 mt-1">Moderate</div>
                      </div>
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-neutral-500 mb-1">3rd Quartile</div>
                        <div className="text-blue-400 font-mono text-lg">-0.18</div>
                        <div className="text-neutral-500 mt-1">Low sensitivity</div>
                      </div>
                      <div className="bg-neutral-900/50 rounded p-3">
                        <div className="text-neutral-500 mb-1">Top Quartile</div>
                        <div className="text-emerald-400 font-mono text-lg">-0.08</div>
                        <div className="text-neutral-500 mt-1">Near-inelastic</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Chronic Condition Overlay</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Diabetics, asthmatics, and chronic pain patients exhibit different elasticity than healthy populations. 
                      We model by condition to predict dangerous care rationing.
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between bg-neutral-900/50 rounded p-2">
                        <span className="text-neutral-400">Diabetes medication adherence</span>
                        <span className="text-red-400 font-mono">-0.12 (risky non-adherence)</span>
                      </div>
                      <div className="flex items-center justify-between bg-neutral-900/50 rounded p-2">
                        <span className="text-neutral-400">Asthma controller Rx</span>
                        <span className="text-amber-400 font-mono">-0.15 (moderate risk)</span>
                      </div>
                      <div className="flex items-center justify-between bg-neutral-900/50 rounded p-2">
                        <span className="text-neutral-400">Statin adherence</span>
                        <span className="text-emerald-400 font-mono">-0.08 (relatively safe)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "use-cases" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Strategic Applications</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Broker Savings Validation</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Brokers routinely overstate plan design change savings by ignoring behavioral responses. Model the proposal 
                      yourself to reveal actual net impact before committing.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Fiduciary Protection:</strong> Caught broker overstating HSA plan 
                      migration savings by $3.2M—elasticity model showed only $1.1M net after utilization shifts
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Value-Based Design</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Use elasticity intelligence to design cost-sharing that steers utilization toward high-value care. Lower 
                      copays on preventive/chronic care (low elasticity), raise them on low-value discretionary services (high elasticity).
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Design Win:</strong> $0 copays on 12 chronic disease drugs drove 
                      adherence from 76% to 91%, reducing ER visits $2.4M annually vs. $800K copay revenue loss
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Multi-Year Trend Forecasting</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Model how today's cost-sharing changes ripple through future years. High copays delay care now but 
                      often create expensive episodes later (e.g., skipped diabetic visits → amputations in year 3).
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Long-Term View:</strong> Aggressive deductible increase saved 
                      $1.8M year 1 but cost $4.2M in years 2-3 via delayed care complications—rejected after modeling
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