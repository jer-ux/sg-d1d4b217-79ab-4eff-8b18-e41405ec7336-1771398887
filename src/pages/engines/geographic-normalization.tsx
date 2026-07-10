import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, MapPin, DollarSign, Database, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function GeographicNormalizationEngine() {
  return (
    <>
      <Head>
        <title>Geographic Normalization Engine | Kincaid IQ</title>
        <meta name="description" content="Adjust claims data for regional cost variations to enable fair benchmarking and accurate trend forecasting." />
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
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-emerald-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Geographic Normalization Engine</h1>
              </div>
            </div>
            <p className="text-xl text-emerald-100 max-w-3xl">
              Compare apples to apples by adjusting for regional cost differences
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
                  <h3 className="font-bold text-red-900 mb-2">Manhattan ≠ Memphis: Regional Cost Distorts Every Benchmark</h3>
                  <p className="text-red-800">
                    Your plan costs $8,200 PMPY. National average is $7,400. Are you overspending or just in an expensive market? Same surgery: $22K in rural Iowa, $64K in San Francisco. Without geographic normalization, you're comparing Manhattan rents to Memphis rents and calling it a performance problem. Raw benchmarks are useless. Geography-adjusted benchmarks tell you if you're actually overpaying.
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
                    <span>Can't separate regional cost from inefficiency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Multi-site employers: can't compare facilities fairly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>National benchmarks meaningless for regional plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Trend forecasts fail when workforce relocates</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Fair benchmarking: normalize to national or regional baseline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Multi-site analysis: compare Chicago vs. Dallas on level ground</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Accurate trend: isolate true cost drivers from migration effects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Provider network evaluation: expected cost vs. actual by region</span>
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
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Map Members to Geographic Areas</h3>
                    <p className="text-gray-700 mb-3">
                      Geocode member ZIP codes to county/MSA/CBSA. Match to CMS Geographic Adjustment Factor (GAF) zones or commercial regional cost indices (RCI). Each area gets a cost index: 1.0 = national average, 1.3 = 30% above average, 0.85 = 15% below. Output: member-level geographic cost multiplier.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Normalize Claims to Baseline Geography</h3>
                    <p className="text-gray-700 mb-3">
                      Divide each claim's paid amount by the member's geographic multiplier. Example: $10,000 claim in San Francisco (1.4x index) → normalized claim = $10,000 / 1.4 = $7,143. This removes regional cost inflation. Aggregate normalized claims across all members. Output: geography-adjusted total cost.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Compare to Geography-Adjusted Benchmarks</h3>
                    <p className="text-gray-700 mb-3">
                      Your normalized PMPY vs. national normalized benchmark. Example: actual $8,200 PMPY, normalized $7,100 PMPY, national benchmark $7,400 PMPY normalized. Verdict: you're 4% under benchmark once geography is removed. Raw comparison showed 11% over — geography explained the entire difference. Output: true performance vs. peers.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Forecast with Geographic Mix Changes</h3>
                    <p className="text-gray-700 mb-3">
                      When workforce shifts (new facility, remote work, acquisitions), re-weight geographic indices by new member distribution. Example: opened Dallas facility (0.92x index), reduced SF headcount (1.4x index). Expected cost trend: -2.3% from geographic mix shift alone, before utilization/pricing effects. Output: trend forecast adjusted for location changes.
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
                      <div className="font-semibold text-gray-900">Member Census with ZIP Codes</div>
                      <div className="text-sm text-gray-600">For geocoding to cost areas</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Geographic Cost Index</div>
                      <div className="text-sm text-gray-600">CMS GAF, Milliman RCI, or custom index</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Medical & Pharmacy Claims</div>
                      <div className="text-sm text-gray-600">With paid amounts by member</div>
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
                      <div className="font-semibold text-gray-900">Geography-Normalized PMPY</div>
                      <div className="text-sm text-gray-600">Cost adjusted to national baseline</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Regional Cost Comparison</div>
                      <div className="text-sm text-gray-600">Cost by facility/region vs. expected</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">True Performance vs. Benchmark</div>
                      <div className="text-sm text-gray-600">Over/under after removing geography</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Geographic Mix Impact</div>
                      <div className="text-sm text-gray-600">Trend effect from workforce relocation</div>
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
                <h3 className="font-bold text-gray-900 mb-3">Multi-Site Fair Comparison</h3>
                <p className="text-gray-700 text-sm">
                  Employer with facilities in NYC, Atlanta, Phoenix. Raw costs: NYC $9,800 PMPY, Atlanta $6,200, Phoenix $5,900. Normalized: NYC $7,000, Atlanta $6,100, Phoenix $6,200. Verdict: Phoenix actually most expensive once geography removed. Launched network optimization there first.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Remote Work Windfall</h3>
                <p className="text-gray-700 text-sm">
                  Tech company: 40% workforce relocated from Bay Area (1.4x index) to lower-cost cities (avg 0.95x index) post-COVID. Geographic normalization forecasted -8.4% trend from mix shift alone. Actual: -7.9%. CFO quantified $3.2M savings from workforce relocation for board.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Benchmark Vindication</h3>
                <p className="text-gray-700 text-sm">
                  Plan costs 18% above national benchmark. After geographic normalization: 2% below benchmark. Presented to board: "We appear expensive because we're in expensive markets. Once geography is removed, we're efficient." Prevented unnecessary broker RFP, saved $180K in transition costs.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Compare Apples to Apples</h2>
            <p className="text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
              Regional cost differences can mask real performance. Normalize first, benchmark second.
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