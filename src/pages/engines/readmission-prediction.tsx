import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { RefreshCw, TrendingDown, Clock, ArrowLeft, Target, AlertTriangle } from "lucide-react";

export default function ReadmissionPredictionEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Readmission Prediction Engine | Kincaid IQ</title>
        <meta name="description" content="Predict 30-day readmissions at discharge and trigger post-acute care interventions to prevent avoidable returns." />
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
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <RefreshCw className="w-8 h-8 text-amber-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">30-Day Readmission Prediction Engine</h1>
                <p className="text-neutral-400 mt-2">Stop the revolving door before patients bounce back</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Clock className="w-10 h-10 text-amber-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">At-Discharge Scoring</h3>
                <p className="text-neutral-400 text-sm">Risk score generated within hours of discharge notification</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Intervention Protocols</h3>
                <p className="text-neutral-400 text-sm">Automated care transitions for high-risk discharges</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <TrendingDown className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Penalty Avoidance</h3>
                <p className="text-neutral-400 text-sm">Reduce Medicare readmission penalties and commercial trends</p>
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
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">The Readmission Tax</h2>
                <p className="text-neutral-300 mb-4">
                  28% of inpatient discharges return within 30 days—75% are preventable with proper post-acute care. Each 
                  readmission costs another $15K-$25K plus Medicare penalties if your rate exceeds national benchmarks. 
                  Traditional discharge planning is one-size-fits-all ("everyone gets a follow-up call"). Our engine identifies 
                  which discharges will actually bounce back so you can deploy intensive care transitions where they matter.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-4">The $1.8M Readmission Burden</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="text-amber-400 font-semibold mb-2">Baseline Readmissions (No Intervention)</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• 200 annual discharges across plan population</li>
                        <li>• 28% readmit within 30 days = 56 readmissions</li>
                        <li>• Avg readmission cost: $18,000</li>
                        <li>• Annual readmission cost: $1.008M</li>
                        <li>• Plus Medicare penalties if applicable</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-semibold mb-2">With Prediction + Care Transitions</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• 80 discharges flagged high-risk (40% of total)</li>
                        <li>• Intensive transitions: home health, 7-day PCP follow-up, med reconciliation</li>
                        <li>• 70% reduction in high-risk readmissions</li>
                        <li>• 25 readmissions prevented = $450K savings</li>
                        <li>• Intervention cost: $1,200/high-risk discharge = $96K</li>
                        <li>• <strong className="text-emerald-400">Net savings: $354K</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Why Readmissions Happen (And How to Stop Them)</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-red-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Medication Errors Post-Discharge</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      40% of readmissions trace to medication issues—wrong dose, drug interactions, patient didn't fill Rx, 
                      confused about new regimen. Hospital discharge instructions are overwhelming; patients forget or misunderstand.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-red-400">Prevention Protocol:</strong> Pharmacist visit within 48 hours of 
                      discharge for medication reconciliation + teach-back on new Rx regimen
                    </div>
                  </div>

                  <div className="border-l-4 border-amber-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">No PCP Follow-Up</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Patients discharged without scheduled PCP appointment within 7-10 days are 3x more likely to readmit. 
                      Primary care catches complications early before they escalate back to ER/inpatient.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-amber-400">Prevention Protocol:</strong> Care manager books PCP appointment 
                      before discharge, calls day before to confirm patient will attend
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Social Determinants</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Patient can't afford Rx copays, has no transportation to follow-up appointments, lives alone and can't 
                      manage ADLs post-discharge. Clinical issues compounded by social barriers.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Prevention Protocol:</strong> Social worker assesses barriers, arranges 
                      copay assistance, medical transport, or short-term home health aide
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "model" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Readmission Risk Factors & Model</h2>
                <p className="text-neutral-400 text-sm mb-6">
                  Model trained on 3 years of discharge/readmission pairs. Scores generated real-time when discharge ADT 
                  message received. Outputs risk score 0-100 plus intervention recommendations.
                </p>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-amber-400">Top Readmission Predictors</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Prior readmission (any time in past year)</span>
                        <span className="text-amber-400 font-mono">28% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Polypharmacy (10+ medications at discharge)</span>
                        <span className="text-amber-400 font-mono">22% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Length of stay over 7 days</span>
                        <span className="text-amber-400 font-mono">14% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Discharge diagnosis: CHF, COPD, sepsis, pneumonia</span>
                        <span className="text-amber-400 font-mono">12% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">No PCP visit in past 12 months</span>
                        <span className="text-amber-400 font-mono">10% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Living alone (social isolation)</span>
                        <span className="text-amber-400 font-mono">8% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Medicaid dual-eligible or low SES score</span>
                        <span className="text-amber-400 font-mono">6% weight</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-emerald-400">Model Performance (Validation Cohort)</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">AUC-ROC:</span>
                          <span className="text-emerald-400 font-mono">0.78</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Precision (top decile):</span>
                          <span className="text-emerald-400 font-mono">52%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Recall (top decile):</span>
                          <span className="text-emerald-400 font-mono">64%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">NPV (negative pred value):</span>
                          <span className="text-blue-400 font-mono">88%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Intervention window:</span>
                          <span className="text-purple-400 font-mono">30 days</span>
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
                <h2 className="text-2xl font-display font-bold mb-6">Deployment Models</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Care Transitions Program</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      High-risk discharges automatically enrolled in 30-day intensive support: home health visit within 48 hours, 
                      pharmacist med reconciliation, booked PCP follow-up, daily check-in calls first week. Care manager 
                      coordinates all touchpoints.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Health System:</strong> Reduced 30-day readmission rate from 
                      28% to 16% with prediction-driven transitions program—saved $1.2M over 12 months
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Medicare Advantage Quality Scores</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      30-day readmission rate is a HEDIS/Star measure. Improve your rate = higher Star rating = better member 
                      acquisition and CMS bonuses. Prediction identifies exactly which discharges to focus interventions on.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">MA Plan:</strong> Moved from 3-star to 4-star on readmission measure 
                      using predictive transitions—unlocked $4.8M in CMS quality bonuses
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">ACO Shared Savings</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Readmissions are a major cost driver in ACO total cost of care. Reducing readmissions = lower TCOC = 
                      higher shared savings payout. Prediction model maximizes ROI by targeting interventions to highest-risk patients.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">ACO Partnership:</strong> Physician group reduced readmissions 18% 
                      with prediction program—contributed to earning $2.1M shared savings distribution
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