import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Activity, TrendingUp, Database, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function UtilizationTrendEngine() {
  return (
    <>
      <Head>
        <title>Utilization Trend Engine | Kincaid IQ</title>
        <meta name="description" content="Track service utilization patterns to identify volume-driven cost increases and over/under-utilization." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-blue-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Utilization Trend Engine</h1>
              </div>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Isolate volume-driven cost changes from price inflation to manage overutilization and optimize care delivery
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
                  <h3 className="font-bold text-red-900 mb-2">Are People Using More Services or Just Paying More Per Service?</h3>
                  <p className="text-red-800">
                    Healthcare costs increased 14% year-over-year. Is that because members are visiting doctors more often? Getting more imaging? More prescriptions? Or are prices just higher? Without isolating utilization from unit cost, you can't target the right interventions. Overutilization needs clinical management. Price inflation needs contract negotiation. Mixing them means fixing nothing.
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
                    <span>Can't separate volume increases from price increases</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>No visibility into which services are over/under-utilized</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Can't benchmark: is this normal utilization for our population?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Clinical interventions targeting wrong problems</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Pure utilization trend: services per member, holding prices constant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Service-line utilization patterns: ER visits, imaging, surgeries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Benchmark against peer groups: age/gender-adjusted norms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Clinical intervention targets: prior auth, utilization management</span>
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
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Calculate Service Volumes Per Member</h3>
                    <p className="text-gray-700 mb-3">
                      Count services by type: office visits per 1,000 members, ER visits per 1,000, imaging studies per 1,000, inpatient days per 1,000. Normalize by membership (PMPM or per-1000-member metrics). Compare Year 1 vs. Year 2 at constant prices. Output: pure volume change, independent of pricing.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Isolate Utilization-Driven Cost Trend</h3>
                    <p className="text-gray-700 mb-3">
                      Hold unit costs constant at Year 1 levels. Apply Year 2 volumes. Difference = utilization-driven trend. Example: office visits increased from 3,200 per 1,000 to 3,680 per 1,000 (15% increase) while prices held flat = 15% utilization trend. Aggregate across all services for total utilization impact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Activity className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Benchmark Against Risk-Adjusted Norms</h3>
                    <p className="text-gray-700 mb-3">
                      Compare your utilization rates to age/gender/risk-adjusted benchmarks: HealthPartners, Milliman MedInsight, regional book-of-business norms. Identify outliers: ER visits 2.8x expected, imaging 1.6x expected. Quantify excess utilization opportunity. Output: service-line utilization vs. expected with savings potential.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Generate Clinical Intervention Targets</h3>
                    <p className="text-gray-700 mb-3">
                      For overutilized services, recommend interventions: prior authorization (high-cost imaging), utilization review (inpatient admits), care management (frequent ER users), step therapy (specialty Rx). Quantify savings potential: reducing ER visits from 120 to 80 per 1,000 at $1,200 per visit = $48K savings per 1,000 members. Output: utilization management roadmap.
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
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">24 Months Medical & Pharmacy Claims</div>
                      <div className="text-sm text-gray-600">With service codes and dates</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Membership Census</div>
                      <div className="text-sm text-gray-600">Monthly enrollment for normalization</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Risk Adjustment Factors</div>
                      <div className="text-sm text-gray-600">HCC scores or age/gender distribution</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Engine Outputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Utilization Trend Report</div>
                      <div className="text-sm text-gray-600">YoY volume changes by service category</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Benchmark Comparison</div>
                      <div className="text-sm text-gray-600">Your utilization vs. risk-adjusted norms</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">High-Utilization Outliers</div>
                      <div className="text-sm text-gray-600">Services used significantly above expected</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Clinical Intervention Plan</div>
                      <div className="text-sm text-gray-600">Targeted utilization management strategies</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">$620K ER Overutilization</h3>
                <p className="text-gray-700 text-sm">
                  Engine revealed ER visits 2.4x benchmark for younger members (non-emergent). Launched 24/7 nurse line + telemedicine. Year 1: ER visits dropped 35%, saved $620K. Pure utilization play — prices unchanged.
                </p>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Imaging Prior Auth ROI</h3>
                <p className="text-gray-700 text-sm">
                  Utilization engine: advanced imaging 1.8x expected. Implemented prior auth for MRI/CT. Year 1: utilization normalized to 1.1x benchmark. Savings: $840K. Program cost: $65K. ROI = 12.9:1.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Board Utilization Reporting</h3>
                <p className="text-gray-700 text-sm">
                  CFO presented: "14% cost increase = 8% utilization + 6% unit cost. Utilization driven by aging workforce (+3%) and chronic disease progression (+5%). We're launching care management to address the 5%." Board approved 3-year clinical program investment.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Manage Volume, Not Just Price</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Half your trend is utilization. Track it. Benchmark it. Manage it with targeted clinical interventions.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
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