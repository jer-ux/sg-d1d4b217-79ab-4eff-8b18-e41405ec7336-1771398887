import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, TrendingUp, PieChart, Database, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function InflationDecompositionEngine() {
  return (
    <>
      <Head>
        <title>Inflation Decomposition Engine | Kincaid IQ</title>
        <meta name="description" content="Break down healthcare trend into unit cost inflation vs. utilization changes to identify root causes." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-amber-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <PieChart className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-amber-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Inflation Decomposition</h1>
              </div>
            </div>
            <p className="text-xl text-amber-100 max-w-3xl">
              Decompose healthcare trend into price inflation vs. utilization to pinpoint exactly what's driving cost increases
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
                  <h3 className="font-bold text-red-900 mb-2">You Know Costs Are Up 12%—But WHY?</h3>
                  <p className="text-red-800">
                    Total healthcare spend increased 12% year-over-year. But is that provider rate inflation? More visits? Shift to higher-cost sites? Drug price increases? Without decomposing trend into unit cost vs. utilization vs. mix shift, you can't address root causes. You just know "it went up" and can't defend to board why or what actions to take.
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
                    <span>"Costs are up"—no decomposition of why</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Can't separate price increases from volume changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>No visibility into site-of-care migration impact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Board asks "What's driving this?"—you can't answer</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Unit cost inflation isolated: provider rates, drug AWP increases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Utilization changes quantified: more visits, higher intensity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Mix shift impact: hospital outpatient vs. office, brand vs. generic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Actionable attribution: negotiate rates, manage utilization, shift sites</span>
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
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Database className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Normalize Claims to Comparable Units</h3>
                    <p className="text-gray-700 mb-3">
                      Group claims by service type (E&M visits, imaging, surgery, etc.) and calculate unit cost (paid amount per service). Do same for Rx: AWP per 30-day supply by drug. Align across two time periods (Year 1 vs. Year 2). Output: apples-to-apples unit cost comparison.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Calculate Pure Unit Cost Inflation</h3>
                    <p className="text-gray-700 mb-3">
                      Hold utilization constant at Year 1 volumes. Apply Year 2 unit costs. Difference = pure price inflation. Example: same 10,000 office visits, but price per visit rose from $120 to $135 = 12.5% unit cost inflation on that service line. Aggregate across all services for total unit cost trend.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <PieChart className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Calculate Pure Utilization Change</h3>
                    <p className="text-gray-700 mb-3">
                      Hold unit costs constant at Year 1 prices. Apply Year 2 volumes. Difference = pure utilization change. Example: office visits increased from 10,000 to 11,200 at Year 1 prices = 12% utilization increase. Aggregate to quantify utilization-driven trend.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Isolate Mix Shift & Interaction Effects</h3>
                    <p className="text-gray-700 mb-3">
                      Residual = mix shift (office to hospital outpatient, generic to brand) + interaction (utilization and price both moved). Quantify site-of-care migration: imaging shifted from freestanding ($250/MRI) to hospital outpatient ($850/MRI) = mix shift inflation. Output: trend waterfall showing unit cost + utilization + mix shift contributions.
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
                    <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">24 Months Medical & Pharmacy Claims</div>
                      <div className="text-sm text-gray-600">Year 1 vs. Year 2 comparison periods</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Membership Counts</div>
                      <div className="text-sm text-gray-600">PMPM normalization across periods</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Service Category Taxonomy</div>
                      <div className="text-sm text-gray-600">Group procedures into comparable units</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Engine Outputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Trend Waterfall Chart</div>
                      <div className="text-sm text-gray-600">Unit cost + utilization + mix shift = total trend</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Service-Level Attribution</div>
                      <div className="text-sm text-gray-600">Which service categories drove inflation vs. volume</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Site-of-Care Migration Report</div>
                      <div className="text-sm text-gray-600">Cost impact of setting shifts (office to hospital)</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Actionable Strategy Recommendations</div>
                      <div className="text-sm text-gray-600">Negotiate rates, manage utilization, shift sites</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">$2.1M Site-of-Care Shift</h3>
                <p className="text-gray-700 text-sm">
                  Engine revealed 45% of 12% trend was site-of-care migration: imaging moved from office ($280/MRI) to hospital outpatient ($820/MRI). CFO launched steerage program. Year 2: saved $2.1M by reversing migration.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Board Trend Explanation</h3>
                <p className="text-gray-700 text-sm">
                  CFO presented waterfall: "12% trend = 7% unit cost (provider inflation), 3% utilization (aging workforce), 2% mix shift (specialty Rx). We're negotiating rates (addresses 7%) and launching prior auth (addresses 3%)." Board approved strategy—data-backed confidence.
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Stop Over-Paying for Trend</h3>
                <p className="text-gray-700 text-sm">
                  Carrier renewal assumed 10% medical trend. Engine showed only 6.5% after removing one-time spike in utilization (COVID catch-up). CFO negotiated 7.5% rate vs. 10%—saved $1.8M annually on stop-loss premium.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Know Exactly What's Driving Your Trend</h2>
            <p className="text-xl text-amber-100 mb-6 max-w-2xl mx-auto">
              Stop saying "costs are up." Decompose trend into unit cost, utilization, and mix shift. Act on root causes.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-xl font-bold hover:bg-amber-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
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