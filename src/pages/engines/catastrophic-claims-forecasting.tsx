import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Database, BarChart3, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function CatastrophicClaimsForecasting() {
  return (
    <>
      <Head>
        <title>Catastrophic Claims Forecasting Engine | Kincaid IQ</title>
        <meta name="description" content="Predict large claims ($100K+) using survival analysis and Poisson distribution modeling for stop-loss optimization." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-red-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-red-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Catastrophic Claims Forecasting</h1>
              </div>
            </div>
            <p className="text-xl text-red-100 max-w-3xl">
              Predict frequency and severity of large claims ($100K+) to optimize stop-loss attachment points and reserves
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
                  <h3 className="font-bold text-red-900 mb-2">One $500K Claim Can Blow Up Your Year</h3>
                  <p className="text-red-800">
                    Self-insured employers face catastrophic claim risk: premature infant NICU ($800K), organ transplant ($1.2M), cancer treatment ($600K). Stop-loss insurance protects against these shocks, but setting the right attachment point requires predicting unpredictable events. Too low = wasted premium, too high = budget-destroying exposure.
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
                    <span>Stop-loss attachment set by gut feel or "whatever carrier recommends"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>No reserve for large claims — hit balance sheet as surprise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Can't quantify probability of $500K+ claim year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Over-insured (paying for protection you don't need) or under-insured (exposed to catastrophe)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Poisson-based frequency model: 12% probability of 2+ large claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Severity distribution modeling (lognormal, Pareto) with confidence bands</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Optimal stop-loss attachment recommendation with break-even analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Reserve adequacy testing: $X reserve has 85% confidence of covering risk</span>
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
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Database className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Historical Large Claim Analysis</h3>
                    <p className="text-gray-700 mb-3">
                      Identify all claims &gt;$100K in last 36 months. Classify by condition (NICU, transplant, cancer, trauma, chronic high-cost). Calculate incidence rate per 1,000 members. Adjust for population changes (aging, chronic disease prevalence shifts).
                    </p>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <p className="text-sm font-mono text-red-900">
                        Large Claim Rate = (# Claims &gt;$100K) / (Member Months / 1,000)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Frequency Modeling (Poisson Distribution)</h3>
                    <p className="text-gray-700 mb-3">
                      Model number of large claims as Poisson process: λ = expected claims per year based on historical rate × current membership. Output probability distribution: 0 claims (42%), 1 claim (38%), 2 claims (15%), 3+ claims (5%). CFO now knows: "15% chance we see 2+ catastrophic claims this year."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Severity Modeling (Lognormal/Pareto)</h3>
                    <p className="text-gray-700 mb-3">
                      Fit severity distribution to historical large claim amounts. Lognormal captures typical high claims ($150K-$500K), Pareto tail captures extreme outliers ($1M+). Generate 50th, 75th, 90th percentile severity forecasts. This tells CFO: "If we get a large claim, 75% chance it's under $420K."
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Stop-Loss Optimization</h3>
                    <p className="text-gray-700 mb-3">
                      Compare 5 attachment points ($150K, $200K, $250K, $300K, $350K). For each: calculate expected out-of-pocket exposure (frequency × severity above attachment) + stop-loss premium. Optimal point minimizes total cost at CFO's risk tolerance (e.g., 90% confidence of staying under budget). Typically saves $80K-$200K vs. carrier default recommendation.
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
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">36 Months Medical Claims</div>
                      <div className="text-sm text-gray-600">With paid amounts {'>'}$100K flagged</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Member Months by Year</div>
                      <div className="text-sm text-gray-600">To calculate incidence rates</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Stop-Loss Premium Quotes</div>
                      <div className="text-sm text-gray-600">At multiple attachment points</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Engine Outputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Large Claim Frequency Forecast</div>
                      <div className="text-sm text-gray-600">Probability distribution for 0, 1, 2, 3+ claims</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Severity Distribution Curve</div>
                      <div className="text-sm text-gray-600">50th, 75th, 90th percentile claim amounts</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Optimal Stop-Loss Recommendation</div>
                      <div className="text-sm text-gray-600">Attachment point with cost-benefit analysis</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Reserve Adequacy Test</div>
                      <div className="text-sm text-gray-600">Confidence level for reserve funding scenarios</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">$180K Stop-Loss Savings</h3>
                <p className="text-gray-700 text-sm">
                  Engine recommended $275K attachment vs. carrier's $200K default. Historical data showed 94% of large claims under $275K. Employer saved $180K in stop-loss premium, had zero claims breach attachment. ROI = pure savings.
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">NICU Claim Forecasted</h3>
                <p className="text-gray-700 text-sm">
                  Manufacturing company with young workforce. Engine flagged 18% annual probability of premature birth NICU claim ($400K-$800K). CFO set $300K reserve. Actual: twin NICU $620K. Reserve absorbed 48% of impact, no balance sheet surprise.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Board Risk Communication</h3>
                <p className="text-gray-700 text-sm">
                  CFO presented engine's frequency/severity charts to board: "12% chance of 2+ large claims = $1.2M exposure. Our $250K attachment + reserve handles 90% confidence scenario." Board approved self-insurance continuation — data-driven risk governance.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stop Guessing on Stop-Loss</h2>
            <p className="text-xl text-red-100 mb-6 max-w-2xl mx-auto">
              Turn catastrophic claim risk from a black box into a quantified, manageable exposure.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-xl font-bold hover:bg-red-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
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