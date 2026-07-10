import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Target, Database, Brain, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function HighCostClaimantPrediction() {
  return (
    <>
      <Head>
        <title>High-Cost Claimant Prediction Engine | Kincaid IQ</title>
        <meta name="description" content="Machine learning prediction of members likely to become high-cost claimants (>$50K) in the next 12 months." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-indigo-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">High-Cost Claimant Prediction</h1>
              </div>
            </div>
            <p className="text-xl text-indigo-100 max-w-3xl">
              Identify members at risk of becoming high-cost claimants before they spiral into catastrophic cases
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem This Engine Solves</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-2">5% of Members Drive 50% of Costs — But Which 5%?</h3>
                  <p className="text-red-800">
                    Healthcare costs follow the "80/20 rule" on steroids: a tiny fraction of members account for the vast majority of claims. By the time someone has a $500K cancer diagnosis, it's too late for cost management. The opportunity is early identification — the diabetic who will progress to dialysis, the chest pain that will become heart surgery, the joint pain that will become total replacement.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Without This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Reactive care management — wait for catastrophe, then intervene</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Waste care management budget on "worried well" (low-risk members who self-enroll)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Miss the diabetic who will hit $80K in dialysis costs next year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>No ROI measurement on care management programs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Identify top 200 members by predicted 12-month cost with 82% accuracy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Target care management outreach to highest-ROI opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Prevent progression: intercept the pre-diabetic before dialysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Measure care management ROI with treated vs. control cohorts</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Database className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Feature Engineering</h3>
                    <p className="text-gray-700 mb-3">
                      Extract 200+ predictive features from claims, pharmacy, and biometric data: chronic condition combinations (diabetes + hypertension = 4x risk), medication adherence gaps, lab values (HbA1c >9.0), ER utilization patterns, specialist referrals, social determinants (zip code poverty rate). The algorithm learns: "diabetic with poor control + hypertension + kidney disease labs = 78% probability of becoming high-cost."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Brain className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Gradient Boosting Model Training</h3>
                    <p className="text-gray-700 mb-3">
                      Train XGBoost model on 24 months of historical data: predict which members exceeded $50K in claims in Year N based on Year N-1 features. Model outputs probability score 0-100 for each active member. Validate on holdout set: top decile captures 47% of actual high-cost claimants (10x random selection).
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-mono text-purple-900">
                        Top 10% Predicted = 47% of Actual High-Cost Claims<br/>
                        ROI = 4.7x random outreach
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Risk Stratification & Actionability</h3>
                    <p className="text-gray-700 mb-3">
                      Segment members into tiers: Critical (>80% probability, needs intensive case management), High (60-80%, care management outreach), Moderate (40-60%, preventive engagement), Low (<40%, wellness programs). For each high-risk member, generate actionability score: is this someone care management can actually help? (Motivated patient with controllable condition = high actionability. Late-stage cancer = low actionability, refer to palliative care.)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Intervention Targeting & ROI Measurement</h3>
                    <p className="text-gray-700 mb-3">
                      Care management team receives monthly list: "These 50 members have highest predicted cost + actionability score." Track outcomes: compare actual costs for engaged members vs. propensity-matched control group who declined outreach. Typical ROI: $4.20 saved per $1.00 spent on care management when targeting is prediction-driven vs. $1.80 with self-enrollment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Inputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">24 Months Medical & Pharmacy Claims</div>
                      <div className="text-sm text-gray-600">With diagnosis codes, procedures, NDC codes</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Member Demographics</div>
                      <div className="text-sm text-gray-600">Age, gender, zip code, tenure</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Biometric Data (if available)</div>
                      <div className="text-sm text-gray-600">Lab results, HRA responses, health screenings</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Engine Outputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Risk-Ranked Member List</div>
                      <div className="text-sm text-gray-600">Top 200 members by predicted 12-month cost</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Actionability Scores</div>
                      <div className="text-sm text-gray-600">Likelihood care management can prevent escalation</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Condition-Specific Cohorts</div>
                      <div className="text-sm text-gray-600">Diabetics at risk, cardio progression candidates</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">ROI Tracking Dashboard</div>
                      <div className="text-sm text-gray-600">Engaged vs. control cost comparison</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">$1.2M Dialysis Prevention</h3>
                <p className="text-gray-700 text-sm">
                  Engine identified 12 pre-diabetics with HbA1c >8.5 + hypertension. Care management enrolled 9 in intensive program. After 18 months: 8/9 improved control, avoided projected dialysis. Prevented cost: $1.2M over 5 years at $80K/year per dialysis patient.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Care Management ROI Proof</h3>
                <p className="text-gray-700 text-sm">
                  Health system targeted care management to top 150 predicted members. Year 1: engaged cohort cost $18,240 PMPY vs. $24,680 for propensity-matched controls who declined. ROI = 4.8:1 on $180K program spend. Board approved 3-year expansion.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Stop-Loss Laser Avoidance</h3>
                <p className="text-gray-700 text-sm">
                  Manufacturing company's stop-loss carrier threatened "laser" (member-specific exclusion) on 3 high-cost members. Engine showed 2 of 3 had declining risk scores due to successful care management. Carrier dropped laser threat after seeing predictive evidence of improvement.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Target the Right 5%</h2>
            <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
              Stop wasting care management budget on the worried well. Predict who will spiral before they do.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Request Engine Demo
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </section>
        </div>
      </div>

      <Footer />
    </>
  );
}