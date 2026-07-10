import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Calendar, TrendingUp, BarChart3, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function SeasonalityAdjustmentEngine() {
  return (
    <>
      <Head>
        <title>Seasonality Adjustment Engine | Kincaid IQ</title>
        <meta name="description" content="Remove predictable seasonal patterns from trend analysis to isolate real cost changes from calendar effects." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-purple-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-purple-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Seasonality Adjustment Engine</h1>
              </div>
            </div>
            <p className="text-xl text-purple-100 max-w-3xl">
              Separate predictable calendar patterns from true underlying cost trends
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
                  <h3 className="font-bold text-red-900 mb-2">Q1 Always Spikes. That's Not Trend.</h3>
                  <p className="text-red-800">
                    January claims jump 18%. Is this a structural cost increase or just deductible resets driving elective procedures? Q4 claims drop 12% — members delaying care for holidays, or genuine utilization decline? Every year, flu season hits Q1. Every year, elective surgeries cluster Q2-Q3 (pre-deductible exhaustion, pre-vacation windows). Raw month-over-month comparisons mistake calendar patterns for trends. Without seasonality adjustment, you're reacting to the calendar, not actual cost drivers.
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
                    <span>Can't distinguish calendar effects from real trend</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>January spike triggers panic interventions (unnecessary)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Month-over-month comparisons misleading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Forecasts wrong: extrapolate Q1 spike = budget disaster</span>
                  </li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>Clean trend: remove predictable seasonal patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>True signal: isolate underlying cost drivers from calendar noise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>Fair comparisons: compare any month to any month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
                    <span>Accurate forecasts: project adjusted baseline, then apply seasonality</span>
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
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Calculate Historical Seasonal Factors</h3>
                    <p className="text-gray-700 mb-3">
                      Use 3-5 years of data. Calculate each month's average deviation from annual mean. January: +12% above mean. April: -3%. December: -8%. These are seasonal indices. Normalize so they average to 1.0 over 12 months. Output: monthly seasonal factors (January = 1.12, December = 0.92).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: De-Seasonalize Current Data</h3>
                    <p className="text-gray-700 mb-3">
                      Divide each month's actual by its seasonal factor. January PMPM: $840. Seasonal factor: 1.12. De-seasonalized: $840 / 1.12 = $750. This is what January would cost without seasonal effects. Repeat for all months. Output: seasonally-adjusted PMPM series that isolates underlying trend.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Calculate Clean Trend</h3>
                    <p className="text-gray-700 mb-3">
                      Compare seasonally-adjusted months. Q1 2024 adjusted: $750. Q1 2023 adjusted: $715. True trend: 4.9% (not the raw 18% spike that panicked everyone). This is real cost growth, stripped of calendar effects. Output: clean year-over-year and quarter-over-quarter trend on adjusted baseline.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Forecast with Re-Seasonalization</h3>
                    <p className="text-gray-700 mb-3">
                      Project baseline trend (5% annually). Apply seasonal factors to monthly forecast. Example: January 2025 forecast = $750 baseline × 1.05 trend × 1.12 seasonal = $882. This gives accurate month-by-month budget with both trend and seasonality. Output: monthly forecast that matches real-world patterns.
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
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">36+ Months Historical Claims</div>
                      <div className="text-sm text-gray-600">Minimum 3 years for stable seasonal patterns</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Member-Months by Month</div>
                      <div className="text-sm text-gray-600">For PMPM calculation</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Plan Design Changes</div>
                      <div className="text-sm text-gray-600">To flag non-seasonal structural shifts</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Engine Outputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Seasonal Factors by Month</div>
                      <div className="text-sm text-gray-600">Expected deviation from annual average</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Seasonally-Adjusted PMPM Series</div>
                      <div className="text-sm text-gray-600">Clean trend with calendar effects removed</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Underlying Trend Rate</div>
                      <div className="text-sm text-gray-600">Real cost growth stripped of seasonality</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Re-Seasonalized Forecast</div>
                      <div className="text-sm text-gray-600">Monthly projections with seasonal patterns applied</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Panic Averted</h3>
                <p className="text-gray-700 text-sm">
                  January claims: $3.8M vs. December $3.1M (+23%). CFO demanded emergency vendor audit. Engine showed: seasonal factor = 1.14. Adjusted: $3.8M / 1.14 = $3.33M. December adjusted: $3.1M / 0.96 = $3.23M. True trend: 3.1% (not 23%). Perfectly normal seasonal pattern. Audit cancelled, saved $180K consultant fees.
                </p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Forecast Accuracy</h3>
                <p className="text-gray-700 text-sm">
                  Rolling 12-month adjusted trend: 6.2%. Applied seasonality: Q1 forecast $4.2M, Q2 $3.9M, Q3 $3.7M, Q4 $3.5M. Actual: Q1 $4.3M, Q2 $3.8M, Q3 $3.7M, Q4 $3.6M. Average monthly variance: 2.1%. Previous year (no adjustment): 14.8% average variance. Seasonality model cut budget error by 85%.
                </p>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-red-50 border border-rose-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Intervention Timing</h3>
                <p className="text-gray-700 text-sm">
                  Engine detected: August adjusted costs 8% above trend (seasonal pattern showed August should be -2%). Real problem surfaced. Investigation: New specialty drug mid-year. Intervention launched immediately. Without seasonality adjustment, problem buried in "normal summer pattern" noise until Q4 budget crisis. Early detection saved $1.2M.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Don't React to the Calendar</h2>
            <p className="text-xl text-purple-100 mb-6 max-w-2xl mx-auto">
              January always spikes. December always drops. Remove the noise, find the signal.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
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