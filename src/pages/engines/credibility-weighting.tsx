import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Target, Database, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function CredibilityWeightingEngine() {
  return (
    <>
      <Head>
        <title>Credibility Weighting Engine | Kincaid IQ</title>
        <meta name="description" content="Blend your experience with industry benchmarks using actuarial credibility theory for optimal forecasts." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-emerald-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-emerald-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Credibility Weighting Engine</h1>
              </div>
            </div>
            <p className="text-xl text-emerald-100 max-w-3xl">
              Balance your data with industry benchmarks based on statistical reliability
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
                  <h3 className="font-bold text-red-900 mb-2">Small Populations: Your Data Isn't Reliable Enough</h3>
                  <p className="text-red-800">
                    500 members. Last year: $4.2M claims ($700 PMPM). This year: $5.8M ($967 PMPM). Did costs explode 38%? Or did you have 2 premature twins? Small groups have massive random variance — you can't build a trend model on 2 data points. Fully credible experience needs 1,000+ members × 3+ years. Below that, your data is unreliable. Ignoring this = wild budget swings. Relying only on industry benchmarks = ignoring your unique population. You need both, weighted by statistical reliability.
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
                    <span>Small group: one large claim = 40% "trend" (false signal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Ignore your data = miss population-specific risks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Use only your data = massive forecast volatility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>No statistical justification for blend = gut feel pricing</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Credibility factor: mathematically optimal data vs. benchmark blend</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Small groups: rely more on benchmarks (80% benchmark, 20% your data)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Large groups: trust your experience (90% your data, 10% benchmark)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Stable forecasts: dampen random noise, preserve real signals</span>
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
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Target className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Calculate Credibility Factor (Z)</h3>
                    <p className="text-gray-700 mb-3">
                      Use Bühlmann credibility formula: Z = n / (n + k), where n = number of exposures (member-months), k = variance parameter (typically 1,000-1,500 for medical). Example: 500 members × 12 months = 6,000 exposures. Z = 6,000 / (6,000 + 1,200) = 0.833. Your data is 83% credible, benchmarks provide 17% stability. Output: credibility weight from 0 (no data) to 1 (fully credible).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Database className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Apply Credibility-Weighted Estimate</h3>
                    <p className="text-gray-700 mb-3">
                      Final estimate = (Z × Your Experience) + ((1-Z) × Benchmark). Example: Your PMPM trend: 12%. Benchmark: 7%. Credibility: 0.833. Blended trend = (0.833 × 12%) + (0.167 × 7%) = 10% + 1.2% = 11.2%. This dampens the 12% spike (likely noise) while preserving signal above benchmark. Output: statistically optimal blend of your data and industry norms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Adjust Credibility for Known Factors</h3>
                    <p className="text-gray-700 mb-3">
                      Reduce credibility if: high volatility year (large claims), plan changes mid-year, acquisition/divestiture. Increase if: stable population, consistent utilization patterns, strong data quality. Example: Base Z = 0.75, but last year had $800K transplant (outlier). Adjust Z = 0.60 to pull more from benchmark. Output: context-aware credibility weight.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Monitor Credibility Evolution</h3>
                    <p className="text-gray-700 mb-3">
                      As group grows, credibility increases. Track Z over time: Year 1 (300 members, Z=0.50). Year 3 (800 members, Z=0.78). Year 5 (1,200 members, Z=0.88). Reduce benchmark reliance as your data becomes more reliable. Output: evolving confidence in your experience data as statistical power improves.
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
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Your Claims Experience</div>
                      <div className="text-sm text-gray-600">PMPM, trend, loss ratios from your data</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Industry Benchmarks</div>
                      <div className="text-sm text-gray-600">Age/gender/geography-adjusted norms</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Population Size & Stability</div>
                      <div className="text-sm text-gray-600">Member-months, enrollment variance</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Engine Outputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Credibility Factor (Z)</div>
                      <div className="text-sm text-gray-600">Statistical weight assigned to your data</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Credibility-Weighted Estimate</div>
                      <div className="text-sm text-gray-600">Optimal blend of experience + benchmark</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Confidence Intervals</div>
                      <div className="text-sm text-gray-600">Expected range given credibility level</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Credibility-Based Budget Range</div>
                      <div className="text-sm text-gray-600">Point estimate + statistical bounds</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Budget Stability</h3>
                <p className="text-gray-700 text-sm">
                  Small employer (400 members). Raw experience: Year 1 $680 PMPM, Year 2 $920 PMPM (+35%). Credibility Z=0.45. Benchmark: 8% trend. Blended: (0.45 × 35%) + (0.55 × 8%) = 15.8% + 4.4% = 20.2%. Budget set at 20% increase. Actual Year 3: 18.6%. Credibility dampened noise, prevented panic over-budget.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Stop-Loss Pricing</h3>
                <p className="text-gray-700 text-sm">
                  Carrier quoted $380 PMPM. CFO: "Our claims were only $640 PMPM, why so high?" Engine showed: Z=0.55, your $640 blended with $720 industry = $682 credibility-weighted. Stop-loss priced at $682 + risk load. Carrier accepted credibility-weighted manual rate, reduced premium to $340 PMPM. Saved $240K annually.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Credibility-Based Confidence</h3>
                <p className="text-gray-700 text-sm">
                  CFO to board: "Budget: $780 PMPM. Credibility analysis: 70% confidence interval $720-$840. Low credibility (Z=0.52) due to small size. Recommend $100K reserve for variance." Board approved. Actual: $798 PMPM. Within predicted range, reserve covered overage. Statistical honesty = no budget surprise.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Trust Your Data (When Statistically Appropriate)</h2>
            <p className="text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
              Small groups need benchmarks. Large groups can rely on experience. Credibility tells you the optimal blend.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
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