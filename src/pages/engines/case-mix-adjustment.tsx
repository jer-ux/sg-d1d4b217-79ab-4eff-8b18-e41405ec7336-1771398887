import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Activity, Database, BarChart3, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function CaseMixAdjustmentEngine() {
  return (
    <>
      <Head>
        <title>Case Mix Adjustment Engine | Kincaid IQ</title>
        <meta name="description" content="Adjust healthcare costs for disease burden and complexity to enable fair performance comparisons." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-indigo-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Case Mix Adjustment Engine</h1>
              </div>
            </div>
            <p className="text-xl text-indigo-100 max-w-3xl">
              Normalize costs for disease burden differences to measure true efficiency
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
                  <h3 className="font-bold text-red-900 mb-2">Sicker Population ≠ Worse Management</h3>
                  <p className="text-red-800">
                    Your plan costs $9,200 PMPY. National benchmark: $7,400 PMPY. Are you overspending? Maybe you just have sicker members. 15% of your population has diabetes vs. 8% nationally. That's a $1,800 PMPY cost differential from disease burden alone. Without case mix adjustment, you're penalized for having a higher-risk population. Raw benchmarks measure your member health, not your plan performance.
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
                    <span>Can't separate disease burden from inefficiency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Unfair peer comparisons (high-risk vs. low-risk populations)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Disease management ROI impossible to measure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Trend forecasts fail when disease prevalence shifts</span>
                  </li>
                </ul>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>Fair benchmarking: normalize to standard disease burden</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>True efficiency: cost per diabetic vs. expected cost per diabetic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>Disease management impact: measure cost reduction net of prevalence changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                    <span>Risk corridor calculations: predict high-cost cohorts for stop-loss</span>
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
                    <Activity className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Assign Risk Scores by Member</h3>
                    <p className="text-gray-700 mb-3">
                      Use HCC (Hierarchical Condition Categories) or commercial risk scores based on diagnosis codes. Each member gets a score: 1.0 = average risk, 2.5 = 2.5x expected cost, 0.4 = 40% of average. Sum all scores to get total expected cost for your population's disease burden. Output: risk-adjusted expected PMPY.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Calculate Risk-Adjusted Performance</h3>
                    <p className="text-gray-700 mb-3">
                      Divide actual cost by risk-adjusted expected cost. Example: $9,200 actual PMPY, $9,800 expected based on HCC scores = 0.939 efficiency ratio. You're 6.1% more efficient than expected given your sicker population. Compare to national benchmark (1.0 = perfectly on target). Output: case mix-adjusted performance vs. peers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Database className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Decompose Trend by Case Mix Change</h3>
                    <p className="text-gray-700 mb-3">
                      Compare Year 1 vs. Year 2 average risk score. If average score increased from 1.2 to 1.35, expected cost rises 12.5% from disease burden shift alone. Total trend: 18%. Case mix-driven: 12.5%. Efficiency trend: 5.5%. Output: separates unavoidable disease progression from controllable cost drivers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Target High-Risk Members for Interventions</h3>
                    <p className="text-gray-700 mb-3">
                      Identify members with risk scores above 3.0 (top 5% of population, 35% of total cost). Segment by actionability: CHF + diabetes + CKD = high-touch care management. Late-stage cancer = palliative support. Quantify potential savings: moving top decile from 3.2x to 2.8x expected = $1.8M annually. Output: prioritized intervention targets with ROI estimates.
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
                      <div className="font-semibold text-gray-900">24 Months Medical Claims with Diagnosis Codes</div>
                      <div className="text-sm text-gray-600">ICD-10 codes for HCC assignment</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Member Census</div>
                      <div className="text-sm text-gray-600">Age, gender for risk adjustment baseline</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Risk Scoring Model</div>
                      <div className="text-sm text-gray-600">HCC, RxGroups, or commercial model</div>
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
                      <div className="font-semibold text-gray-900">Risk-Adjusted Efficiency Ratio</div>
                      <div className="text-sm text-gray-600">Performance vs. expected given disease burden</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Case Mix Trend Component</div>
                      <div className="text-sm text-gray-600">Cost increase from disease prevalence changes</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">High-Risk Member Segments</div>
                      <div className="text-sm text-gray-600">Actionable cohorts with ROI potential</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Fair Peer Benchmark</div>
                      <div className="text-sm text-gray-600">Apples-to-apples comparison after risk adjustment</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">$2.4M Disease Management ROI</h3>
                <p className="text-gray-700 text-sm">
                  Employer's average HCC score rose from 1.3 to 1.45 (disease progression). Expected cost increase: 11.5%. Actual: 7.2%. Case mix-adjusted efficiency improved 4.3%. Care management program for high-risk cohort delivered $2.4M savings net of disease progression.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Benchmark Vindication</h3>
                <p className="text-gray-700 text-sm">
                  Raw cost: 24% above national benchmark. After case mix adjustment (average risk score 1.6 vs. 1.0 nationally): 3% below benchmark. CFO to board: "We're managing a sicker population more efficiently than peers manage healthy populations." Prevented panic broker RFP.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Stop-Loss Accuracy</h3>
                <p className="text-gray-700 text-sm">
                  Engine identified 18 members with HCC scores above 5.0 (expected $400K+ annual cost each). Flagged for stop-loss laser analysis. Actual: 12 exceeded $250K attachment, 4 exceeded $500K. Carrier accepted case mix-adjusted projections, reduced laser list by 6 members, saved $140K in premium.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Measure Efficiency, Not Disease Burden</h2>
            <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
              Sicker populations cost more. Adjust for disease burden first, then measure performance.
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