import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Zap, TrendingUp, AlertCircle, ArrowLeft, Target, Shield } from "lucide-react";

export default function StopLossLaserEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Stop-Loss Laser Prediction Engine | Kincaid IQ</title>
        <meta name="description" content="Predict which members will breach specific deductible thresholds for proactive stop-loss management." />
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
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Zap className="w-8 h-8 text-orange-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Stop-Loss Laser Prediction Engine</h1>
                <p className="text-neutral-400 mt-2">Know who will breach before the claim hits</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-orange-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Early Warning</h3>
                <p className="text-neutral-400 text-sm">Identify laser candidates 90-180 days before breach</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Shield className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Renewal Planning</h3>
                <p className="text-neutral-400 text-sm">Model next year's laser list for accurate budgeting</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <TrendingUp className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Premium Negotiation</h3>
                <p className="text-neutral-400 text-sm">Data-driven laser pricing conversations with carriers</p>
              </div>
            </div>
          </div>

          <div className="border-b border-neutral-800 mb-8">
            <div className="flex gap-8">
              {["overview", "model", "use-cases"].map((tab) => (
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
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">Lasers Cost You Twice</h2>
                <p className="text-neutral-300 mb-4">
                  A "laser" is a member who breaches your specific deductible and triggers individual stop-loss coverage. 
                  But the damage happens twice: (1) You pay claims up to the specific (e.g., $250K), THEN (2) carrier 
                  lasers that member at renewal—adding $50K-$150K to next year's premium regardless of whether they claim. 
                  Most employers discover lasers AFTER breach. Our engine predicts 90-180 days in advance so you can 
                  manage aggressively and negotiate laser pricing with evidence.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-4">The $680K Laser Surprise</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="text-orange-400 font-semibold mb-2">Without Prediction</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• Employee diagnosed with late-stage cancer in June</li>
                        <li>• Claims accumulate: $420K by December (breached $250K specific)</li>
                        <li>• Stop-loss reimburses $170K (claims above specific)</li>
                        <li>• Renewal: carrier lasers member at $120K annual premium</li>
                        <li>• <strong>Total 2-year cost: $250K + $120K laser = $370K</strong></li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-semibold mb-2">With Prediction + Management</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• Engine flags member in April (cancer diagnosis + chemo codes)</li>
                        <li>• Enrolled in case management, redirected to COE for surgery</li>
                        <li>• Negotiated provider discounts, avoided 3 unnecessary ER visits</li>
                        <li>• Claims total: $310K (still breached but $110K lower)</li>
                        <li>• Carrier proposes $85K laser; negotiated to $68K with COE proof</li>
                        <li>• <strong>Total 2-year cost: $250K + $68K laser = $318K</strong></li>
                        <li>• <strong className="text-emerald-400">Savings: $52K over 2 years</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Why Predicting Lasers Matters</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Case Management Deployment</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Once you know a member will likely laser, assign dedicated case manager immediately. Coordinate care, 
                      negotiate provider rates, redirect to COE, avoid complications. Every dollar saved below the specific = 
                      dollar you keep (not reimbursed, but also not spent).
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Cost Mitigation:</strong> Aggressive case management on predicted 
                      lasers reduces average total claims 18-25% vs. reactive management
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Renewal Negotiation Leverage</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      When carrier proposes laser pricing, you have evidence: "We enrolled this member in COE, avoided 
                      complications, managed to $310K instead of $550K industry average for this diagnosis. Laser should 
                      reflect our management, not carrier's book average."
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Laser Negotiations:</strong> Employers with documented case 
                      management programs negotiate 15-30% lower laser premiums vs. passive plans
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Budget Accuracy</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      CFO hates mid-year surprises. Predicting lasers 90-180 days out allows accurate reserve accruals 
                      and renewal budget forecasts. Finance can model total cost of risk including lasers.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Financial Planning:</strong> Predicted laser list allows setting 
                      aside specific reserves and modeling 3-year total cost scenarios for board presentations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "model" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Laser Prediction Model</h2>
                <p className="text-neutral-400 text-sm mb-6">
                  Trained on 8 years of claims data including 2,400+ members who breached specific deductibles. Model 
                  outputs probability 0-100% that member will breach in next 12 months, with expected total annual claims.
                </p>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-orange-400">Top Laser Predictors</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">New cancer diagnosis (any stage)</span>
                        <span className="text-orange-400 font-mono">42% breach rate</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Organ transplant codes (pre-tx eval or listed)</span>
                        <span className="text-orange-400 font-mono">68% breach rate</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">NICU admission over 14 days</span>
                        <span className="text-orange-400 font-mono">52% breach rate</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Hemophilia diagnosis + factor claims</span>
                        <span className="text-orange-400 font-mono">78% breach rate</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Gene therapy codes (CAR-T, Luxturna, Zolgensma)</span>
                        <span className="text-orange-400 font-mono">95% breach rate</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Trauma with ICU stay over 10 days</span>
                        <span className="text-orange-400 font-mono">38% breach rate</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Multiple sclerosis + high-cost DMT (Ocrevus, Tysabri)</span>
                        <span className="text-orange-400 font-mono">32% breach rate</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-emerald-400">Model Performance</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Precision (predicted lasers):</span>
                          <span className="text-emerald-400 font-mono">81%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Recall (catches actual lasers):</span>
                          <span className="text-emerald-400 font-mono">89%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Lead time (avg days before breach):</span>
                          <span className="text-blue-400 font-mono">127 days</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Forecast accuracy (total claims ±):</span>
                          <span className="text-purple-400 font-mono">18%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Updates:</span>
                          <span className="text-amber-400 font-mono">Weekly</span>
                        </div>
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
                    <h3 className="font-semibold text-lg mb-2">Proactive Case Management</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Predicted lasers automatically enrolled in high-touch case management. Dedicated nurse case manager 
                      coordinates all care, negotiates rates, redirects to COE, prevents avoidable utilization.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Manufacturer:</strong> Managed 18 predicted lasers—average 
                      claims $340K vs. $485K industry benchmark = $145K saved per laser
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Stop-Loss Procurement</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Show carriers your predicted laser list during RFP. Demonstrates you manage high-cost claimants 
                      proactively, reducing carrier risk = better aggregate rates and lower laser premiums.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">PE Portfolio Co:</strong> Included 3-year laser prediction + case 
                      management outcomes in stop-loss RFP—won 12% lower premium vs. incumbent
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Financial Forecasting</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      CFO needs accurate renewal budget 6-9 months before renewal. Laser prediction allows modeling total 
                      stop-loss premium including lasers, specific reimbursements, and net employer cost.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Healthcare System:</strong> Predicted 11 lasers for next renewal; 
                      modeled $1.2M laser premium impact vs. $780K if no lasers—CFO accrued reserves accurately
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