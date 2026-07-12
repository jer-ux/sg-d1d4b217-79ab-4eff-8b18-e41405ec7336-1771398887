import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Activity, TrendingUp, AlertTriangle, ArrowLeft, Target, Brain } from "lucide-react";

export default function HospitalAdmissionPredictionEngine() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Head>
        <title>Hospital Admission Prediction Engine | Kincaid IQ</title>
        <meta name="description" content="Predict hospital admissions 30-90 days in advance using AI-powered risk scoring and intervention triggers." />
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
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Activity className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-4xl font-display font-bold">Hospital Admission Prediction Engine</h1>
                <p className="text-neutral-400 mt-2">Intervene before high-cost episodes occur</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Brain className="w-10 h-10 text-red-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Predictive Models</h3>
                <p className="text-neutral-400 text-sm">90-day forward-looking risk scores updated daily</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <Target className="w-10 h-10 text-emerald-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Intervention Triggers</h3>
                <p className="text-neutral-400 text-sm">Automated alerts to care managers when risk crosses thresholds</p>
              </div>
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6">
                <TrendingUp className="w-10 h-10 text-blue-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">ROI Validation</h3>
                <p className="text-neutral-400 text-sm">Track prevented admissions vs. control groups</p>
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
              <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-4">Prevent Admissions Before They Happen</h2>
                <p className="text-neutral-300 mb-4">
                  The average inpatient admission costs $15,000-$30,000. Most are preventable with timely intervention—
                  medication adherence support, care coordination, home health, or ambulatory urgent care. But reactive 
                  utilization management only sees members AFTER admission when it's too late. Our engine predicts who will 
                  be hospitalized in the next 30-90 days so care teams can intervene proactively.
                </p>
                <div className="bg-neutral-900/50 rounded-lg p-6 mt-6">
                  <h3 className="font-semibold mb-4">The $4.8M Savings Model</h3>
                  <div className="grid md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <div className="text-red-400 font-semibold mb-2">Without Prediction</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• 240 admissions per year (2,000 employees)</li>
                        <li>• Avg cost: $20,000 per admission</li>
                        <li>• Annual cost: $4.8M in inpatient claims</li>
                        <li>• Care managers react to discharges</li>
                        <li>• 28% readmission rate within 30 days</li>
                      </ul>
                    </div>
                    <div>
                      <div className="text-emerald-400 font-semibold mb-2">With Prediction + Intervention</div>
                      <ul className="space-y-2 text-neutral-400 text-xs">
                        <li>• 180 admissions prevented (75% success rate on high-risk)</li>
                        <li>• 60 admissions occur despite intervention</li>
                        <li>• Intervention cost: $800/member (high-risk cohort)</li>
                        <li>• Net savings: $2.4M (prevented admits - intervention cost)</li>
                        <li>• Readmission rate drops to 14%</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">How Prediction Creates Intervention Windows</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">30-Day High Risk</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Member has 60%+ probability of admission in next 30 days based on recent ER visits, missed medications, 
                      chronic condition progression signals. Trigger immediate care manager outreach, medication reconciliation, 
                      telehealth check-in, or urgent care redirection protocol.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Intervention ROI:</strong> $800 care management cost prevents 
                      $20,000 admission 75% of the time = 18.8:1 ROI on high-risk cohort
                    </div>
                  </div>

                  <div className="border-l-4 border-amber-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">60-Day Moderate Risk</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Member trending toward high risk—recent lab abnormalities, increasing Rx utilization, psychosocial 
                      stressors documented. Schedule preventive PCP visit, adjust medications, coordinate specialist follow-up, 
                      or enroll in disease management program before condition escalates.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-amber-400">Prevention Window:</strong> 60 days allows scheduling PCP appointments, 
                      medication titration, home modifications—interventions that need lead time
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">90-Day Emerging Risk</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Member shows early warning signs—new chronic diagnosis, suboptimal adherence, lifestyle risk factors. 
                      Enroll in wellness coaching, benefits navigation, or digital health programs. Build relationship with 
                      care team before acute episode develops.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">Upstream Engagement:</strong> 90-day horizon allows relationship-building 
                      interventions that require member trust and buy-in
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "model" && (
            <div className="space-y-6">
              <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-8">
                <h2 className="text-2xl font-display font-bold mb-6">Predictive Features & Weights</h2>
                <p className="text-neutral-400 text-sm mb-6">
                  Model trained on 5 years of claims, clinical, and engagement data across 2M+ members. Updated daily as new 
                  claims/encounters post. Outputs risk score 0-100 for each member with feature importance breakdown.
                </p>
                <div className="space-y-6">
                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-red-400">Top Admission Predictors (Feature Importance)</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Recent ER visit (last 7 days)</span>
                        <span className="text-red-400 font-mono">32% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Medication non-adherence (PDC under 60%)</span>
                        <span className="text-red-400 font-mono">18% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Recent hospitalization (last 30 days)</span>
                        <span className="text-red-400 font-mono">15% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">CHF/COPD exacerbation pattern</span>
                        <span className="text-red-400 font-mono">12% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Missed PCP appointments (3+ in 6 months)</span>
                        <span className="text-red-400 font-mono">8% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Polypharmacy (10+ active Rx)</span>
                        <span className="text-red-400 font-mono">7% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Social determinants (housing/food insecurity)</span>
                        <span className="text-red-400 font-mono">5% weight</span>
                      </div>
                      <div className="flex items-start justify-between">
                        <span className="text-neutral-400">Age 65+ with 3+ chronic conditions</span>
                        <span className="text-red-400 font-mono">3% weight</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-neutral-800/50 rounded-lg p-6">
                    <h3 className="font-semibold mb-4 text-emerald-400">Model Performance Metrics</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">AUC-ROC:</span>
                          <span className="text-emerald-400 font-mono">0.84</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Precision (high-risk):</span>
                          <span className="text-emerald-400 font-mono">68%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Recall (high-risk):</span>
                          <span className="text-emerald-400 font-mono">72%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">False positive rate:</span>
                          <span className="text-amber-400 font-mono">12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Lead time:</span>
                          <span className="text-blue-400 font-mono">45 days avg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Daily updates:</span>
                          <span className="text-purple-400 font-mono">Real-time</span>
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
                <h2 className="text-2xl font-display font-bold mb-6">Real-World Applications</h2>
                <div className="space-y-6">
                  <div className="border-l-4 border-emerald-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Care Management Prioritization</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Care managers have limited capacity (150-200 members each). Prediction identifies the 15-20 members most 
                      likely to admit next month so managers focus time where it matters most.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-emerald-400">Deployment:</strong> Health system with 3,000 self-insured lives 
                      prevented 42 admissions in first 6 months by prioritizing top-decile risk members
                    </div>
                  </div>

                  <div className="border-l-4 border-blue-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">ER Diversion Programs</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      High-risk members flagged for 24/7 nurse hotline access and virtual urgent care. When they call, system 
                      knows they're high-risk and escalates to experienced RN who can de-escalate ER visits.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-blue-400">ROI Case:</strong> Manufacturer redirected 78 ER visits to virtual 
                      urgent care in Q1 (predicted high-risk cohort)—saved $156K vs. ER cost
                    </div>
                  </div>

                  <div className="border-l-4 border-purple-400 pl-6">
                    <h3 className="font-semibold text-lg mb-2">Stop-Loss Premium Negotiation</h3>
                    <p className="text-neutral-400 text-sm mb-3">
                      Show stop-loss carrier your admission prevention program is working. Lower admission rates = lower 
                      expected claims = better stop-loss pricing at renewal.
                    </p>
                    <div className="bg-neutral-800/50 rounded p-3 text-xs text-neutral-400">
                      <strong className="text-purple-400">Premium Impact:</strong> PE portfolio company reduced admission 
                      rate 22% with prediction program—stop-loss carrier lowered renewal premium 18%
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