import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Users, DollarSign, BarChart3, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function PMPMNormalizationEngine() {
  return (
    <>
      <Head>
        <title>PMPM Normalization Engine | Kincaid IQ</title>
        <meta name="description" content="Standardize cost metrics to per-member-per-month for consistent comparison across populations and time periods." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-cyan-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-cyan-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">PMPM Normalization Engine</h1>
              </div>
            </div>
            <p className="text-xl text-cyan-100 max-w-3xl">
              Convert all cost metrics to consistent per-member-per-month basis for accurate comparisons
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
                  <h3 className="font-bold text-red-900 mb-2">You Can't Compare Apples to Oranges Without Normalization</h3>
                  <p className="text-red-800">
                    Q1 claims: 2.8M paid. Q2 claims: 3.2M paid. Did costs go up 14%? Maybe Q2 just had more members. Your population fluctuates monthly (hires, terminations, COBRA). Runout reports show total paid without member-months. Raw dollar totals are meaningless without enrollment denominator. PMPM is the universal currency of healthcare cost analysis — without it, you're flying blind.
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
                    <span>Can't compare periods with different enrollment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Raw total cost misleading (growth vs. headcount change?)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Can't benchmark against industry (they report PMPM, you report total)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Partial-month enrollment errors distort quarterly trends</span>
                  </li>
                </ul>
              </div>

              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span>Consistent metric: all costs expressed as PMPM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span>True trend: isolate cost per member from headcount changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span>Fair benchmarks: compare your PMPM to national/regional PMPM</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                    <span>Enrollment mix adjustment: handle partial months, COBRA, dependents</span>
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
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <Users className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Calculate Member-Months</h3>
                    <p className="text-gray-700 mb-3">
                      Count enrollment days, divide by days in month. Member active 15 days in 30-day month = 0.5 member-months. Sum across all members. Example: 1,200 employees, 2,800 dependents, 18 COBRA members, partial-month adjustments = 4,036.3 member-months. This is your denominator. Output: accurate enrollment base accounting for fluctuation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Normalize All Costs to PMPM</h3>
                    <p className="text-gray-700 mb-3">
                      Divide every cost metric by member-months: Total paid claims / member-months = PMPM. Medical PMPM, Rx PMPM, admin PMPM, stop-loss premium PMPM. Convert annual figures: divide by 12 before PMPM calculation. Output: consistent metrics across all cost categories and time periods.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Calculate Clean Period-Over-Period Trend</h3>
                    <p className="text-gray-700 mb-3">
                      Compare Q1 PMPM to Q2 PMPM. Enrollment doesn't matter — only cost per member. Q1: 3.2M claims / 4,200 member-months = $762 PMPM. Q2: 3.8M claims / 4,650 member-months = $817 PMPM. Trend = (817 / 762) - 1 = 7.2% increase in cost per member, independent of enrollment growth. Output: true cost trend isolated from headcount changes.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Project Annual Budget from PMPM</h3>
                    <p className="text-gray-700 mb-3">
                      Current PMPM × projected member-months × 12 = annual budget. Account for enrollment forecast: hiring plan says 200 new employees next year. Add dependent ratio, COBRA churn. Example: $780 PMPM × 4,500 projected member-months × 12 = $42.1M annual budget. Output: enrollment-sensitive budget with clean cost per member baseline.
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
                    <div className="w-2 h-2 rounded-full bg-cyan-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Daily Enrollment File</div>
                      <div className="text-sm text-gray-600">Member-level coverage start/end dates</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Claims Data</div>
                      <div className="text-sm text-gray-600">Paid amounts by service date</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-cyan-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Non-Claims Costs</div>
                      <div className="text-sm text-gray-600">Admin fees, stop-loss premium, TPA fees</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Engine Outputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Total PMPM (All Costs)</div>
                      <div className="text-sm text-gray-600">Medical + Rx + admin + stop-loss per member-month</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Category PMPM Breakdown</div>
                      <div className="text-sm text-gray-600">By service type, provider type, condition</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Enrollment-Adjusted Trend</div>
                      <div className="text-sm text-gray-600">Period-over-period cost per member change</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Annual Budget Projection</div>
                      <div className="text-sm text-gray-600">PMPM × projected enrollment × 12</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Trend Accuracy Restored</h3>
                <p className="text-gray-700 text-sm">
                  CFO panicked: Q4 claims 22% above Q3. Engine showed: enrollment grew 18% (acquisition), PMPM trend only 3.4%. Actual cost per member stable. Without normalization, CFO would have launched panic initiatives. PMPM isolated real issue: minor seasonal uptick, not structural problem.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Budget Precision</h3>
                <p className="text-gray-700 text-sm">
                  Rolling 12-month PMPM = $764. Hiring plan: 300 new employees, 1.8 dependent ratio. Projected member-months: 4,800 current + 540 new = 5,340 × 12 = 64,080 member-months. Budget: $764 × 64,080 / 12 = $4.08M monthly, $48.9M annual. Actual: $49.2M (0.6% variance).
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Benchmark Validation</h3>
                <p className="text-gray-700 text-sm">
                  National benchmark: $742 PMPM. Your raw cost: 2.8M / 3,680 member-months = $761 PMPM. 2.6% above benchmark. Geography adjustment: -1.2%. Age/gender adjustment: +1.8%. Case mix adjustment: +2.1%. Final verdict: 5.3% above benchmark after all normalizations — actionable performance gap.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">PMPM: The Universal Healthcare Cost Metric</h2>
            <p className="text-xl text-cyan-100 mb-6 max-w-2xl mx-auto">
              Raw dollar totals are meaningless. Normalize to per-member-per-month for every comparison.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-white text-cyan-600 px-8 py-4 rounded-xl font-bold hover:bg-cyan-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
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