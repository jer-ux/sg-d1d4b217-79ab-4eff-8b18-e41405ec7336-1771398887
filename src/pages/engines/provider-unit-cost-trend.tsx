import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, DollarSign, TrendingUp, Database, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function ProviderUnitCostTrendEngine() {
  return (
    <>
      <Head>
        <title>Provider Unit Cost Trend Engine | Kincaid IQ</title>
        <meta name="description" content="Track provider rate inflation by service type to identify excessive pricing and negotiate better contracts." />
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
                <DollarSign className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-emerald-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Provider Unit Cost Trend</h1>
              </div>
            </div>
            <p className="text-xl text-emerald-100 max-w-3xl">
              Isolate provider rate inflation by service category to quantify pricing power and benchmark against market
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
                  <h3 className="font-bold text-red-900 mb-2">Provider Rates Increase Silently—Are You Paying Above Market?</h3>
                  <p className="text-red-800">
                    Your provider contract says "CMS+20%" or "billed charges discounted 50%." But actual paid amounts creep up year after year. Hospital reprices DRGs. Physicians upcode. Facilities add new "facility fees." Without tracking unit cost trend by service type, you can't quantify rate inflation or compare to regional benchmarks. You just accept the invoice.
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
                    <span>No visibility into provider rate increases year-over-year</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Can't separate price from volume when costs rise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>No benchmark: are you paying above market?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Renew provider contracts blind—no rate negotiation leverage</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Unit cost trend by service type: surgeries, imaging, E&M visits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Provider-specific rate inflation: which facilities raising prices fastest?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Benchmark against regional market: CMS, FAIR Health, regional averages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Contract negotiation leverage: "Your MRIs cost 2.4x market"</span>
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
                    <Database className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Define Comparable Service Units</h3>
                    <p className="text-gray-700 mb-3">
                      Group procedures into standardized units: office visits (E&M codes), imaging studies (MRI, CT, X-ray), surgeries (by DRG or CPT), lab tests. Calculate unit cost = total paid / service count. Normalize across time periods and providers. Output: apples-to-apples unit cost comparison.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Calculate Year-Over-Year Unit Cost Inflation</h3>
                    <p className="text-gray-700 mb-3">
                      Compare Year 2 unit costs to Year 1 for same service. Example: office visit cost $120 in Year 1, $135 in Year 2 = 12.5% unit cost inflation. Do this for every service category. Aggregate to total provider rate inflation (holding utilization constant). Output: unit cost trend report by service line.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-cyan-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Provider-Specific Rate Analysis</h3>
                    <p className="text-gray-700 mb-3">
                      Break down unit costs by provider: Hospital A vs. Hospital B vs. Ambulatory Surgery Center. Identify outliers: which facilities charge 2-3x market for same service? Quantify opportunity: shifting 100 MRIs from Hospital A ($850 each) to Imaging Center ($320 each) = $53K savings. Output: provider rate card with savings potential.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Benchmark Against Market</h3>
                    <p className="text-gray-700 mb-3">
                      Compare your unit costs to: Medicare rates (CMS fee schedule), FAIR Health commercial benchmarks, regional market averages. Express as "% of Medicare": Hospital charges 280% of Medicare for inpatient stays. Identify negotiation opportunities: you're paying 320% of Medicare when market average is 210%. Output: benchmark report with contract renegotiation targets.
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
                      <div className="font-semibold text-gray-900">24 Months Medical Claims</div>
                      <div className="text-sm text-gray-600">With provider IDs, procedure codes, paid amounts</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Provider Contracts</div>
                      <div className="text-sm text-gray-600">Contracted rates or reimbursement formulas</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Regional Benchmarks</div>
                      <div className="text-sm text-gray-600">FAIR Health, CMS rates, or similar data</div>
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
                      <div className="font-semibold text-gray-900">Unit Cost Trend Report</div>
                      <div className="text-sm text-gray-600">By service category with YoY inflation rates</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Provider Rate Card</div>
                      <div className="text-sm text-gray-600">Facility-specific pricing vs. market benchmarks</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">High-Cost Provider Outliers</div>
                      <div className="text-sm text-gray-600">Facilities charging 2-3x market rates</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Contract Negotiation Brief</div>
                      <div className="text-sm text-gray-600">Target savings and leverage points for renewal</div>
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
                <h3 className="font-bold text-gray-900 mb-3">$940K Contract Renegotiation</h3>
                <p className="text-gray-700 text-sm">
                  Engine revealed Hospital A charged 320% of Medicare vs. 210% market average. CFO armed with data, renegotiated to 240% of Medicare. Annual savings: $940K. Hospital conceded because data was irrefutable.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Imaging Steerage Program</h3>
                <p className="text-gray-700 text-sm">
                  Unit cost analysis: hospital outpatient MRI = $850, freestanding center = $320 (same quality). Launched steerage: pre-auth nudges members to lower-cost sites. Year 1: shifted 420 scans, saved $222K. ROI = 11:1 on program cost.
                </p>
              </div>

              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Board Rate Inflation Reporting</h3>
                <p className="text-gray-700 text-sm">
                  CFO presented annual report: "Provider rate inflation = 8.2%, driven by hospital facility fees (+12%) and specialist visits (+9%). We're addressing via contract renegotiation and network optimization." Board approved 3-year cost containment plan with specific rate targets.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Track Provider Rate Inflation Relentlessly</h2>
            <p className="text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
              Stop accepting provider invoices blindly. Quantify unit cost trends, benchmark against market, negotiate from strength.
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