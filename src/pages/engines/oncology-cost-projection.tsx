import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Activity, DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function OncologyCostProjectionEngine() {
  return (
    <>
      <Head>
        <title>Oncology Cost Projection Engine | Kincaid IQ</title>
        <meta name="description" content="Multi-year cancer care cost forecasting with treatment pathway modeling and specialty drug impact analysis." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-rose-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-rose-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Oncology Cost Projection</h1>
              </div>
            </div>
            <p className="text-xl text-rose-100 max-w-3xl">
              Project multi-year cancer care costs by cancer type, stage, and treatment pathway with immunotherapy and specialty drug impact
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
                  <h3 className="font-bold text-red-900 mb-2">Cancer Care Costs Are Unpredictable and Exploding</h3>
                  <p className="text-red-800">
                    Stage 4 cancer patient enters plan → immunotherapy + targeted therapy + supportive care = $250K-$600K per year. Multiply by 2-5 year survival improvement from new treatments. CFOs need accurate 3-5 year oncology cost projections for budgeting, stop-loss optimization, and board risk communication—not retrospective shock when costs spiral.
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
                    <span>No visibility into oncology patient pipeline and stage distribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Can't quantify immunotherapy adoption impact on multi-year costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Budget assumes historical trend—misses new treatment paradigm shift</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Stop-loss attachment doesn't account for extended survival costs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Treatment pathway modeling by cancer type and stage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>5-year cost projection with immunotherapy adoption curves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Specialty drug pipeline impact on future costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Reserve recommendations by cancer prevalence in your population</span>
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
                  <div className="p-2 bg-rose-100 rounded-lg">
                    <Activity className="w-6 h-6 text-rose-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Cancer Prevalence & Stage Distribution</h3>
                    <p className="text-gray-700 mb-3">
                      Analyze historical claims to identify active cancer patients by type (breast, lung, colorectal, prostate, etc.) and stage (I-IV). Calculate prevalence rates and new diagnosis incidence. Project forward: how many new cases will enter plan annually based on population age/demographics? Output: 5-year oncology patient census forecast.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Treatment Pathway Cost Modeling</h3>
                    <p className="text-gray-700 mb-3">
                      Map standard-of-care treatment pathways by cancer type/stage: surgery → chemo → radiation → immunotherapy → supportive care. Cost each component using claims data + specialty drug pricing. Model treatment duration, response rates, and progression probabilities. Output: expected lifetime cost per cancer patient by type and stage.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Specialty Drug & Pipeline Impact</h3>
                    <p className="text-gray-700 mb-3">
                      Model immunotherapy adoption: Keytruda, Opdivo, Tecentriq uptake curves by cancer type. Add emerging therapies in FDA pipeline: CAR-T (blood cancers), TIL therapy (solid tumors), antibody-drug conjugates. Incorporate approval probability, launch timing, and market penetration rates. Output: year-by-year specialty oncology drug cost forecast.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Multi-Year Budget & Reserve Recommendations</h3>
                    <p className="text-gray-700 mb-3">
                      Aggregate across all cancer types: total projected oncology spend Years 1-5. Compare to baseline historical trend to quantify specialty drug acceleration. Recommend reserve amounts: Stage 4 diagnoses are probabilistic, set reserves for 90% confidence scenario. Output: board-ready 5-year oncology budget with variance analysis.
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
                    <div className="w-2 h-2 rounded-full bg-rose-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">36 Months Medical & Pharmacy Claims</div>
                      <div className="text-sm text-gray-600">With oncology diagnosis codes and specialty drug NDCs</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-rose-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Employee Census</div>
                      <div className="text-sm text-gray-600">Age/gender distribution for incidence projections</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-rose-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Plan Design & Coverage Rules</div>
                      <div className="text-sm text-gray-600">Specialty tier coinsurance and prior auth policies</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Engine Outputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">5-Year Oncology Cost Forecast</div>
                      <div className="text-sm text-gray-600">By cancer type with confidence intervals</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Treatment Pathway Cost Analysis</div>
                      <div className="text-sm text-gray-600">Expected lifetime cost per patient by stage</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Specialty Drug Impact Report</div>
                      <div className="text-sm text-gray-600">Immunotherapy adoption curves and pipeline drugs</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-rose-50 border border-rose-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Reserve Recommendations</div>
                      <div className="text-sm text-gray-600">By cancer type probability and severity</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">$1.8M Budget Accuracy</h3>
                <p className="text-gray-700 text-sm">
                  CFO budgeted $2.4M oncology spend for Year 1 using engine's forecast. Actual came in at $2.6M (8% variance vs. 40% typical). Years 2-3: immunotherapy adoption matched engine's projection. Board cited "best-in-class forecasting" in earnings call.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Stage 4 Lung Cancer Reserve</h3>
                <p className="text-gray-700 text-sm">
                  Engine identified 2 Stage 3 lung cancer patients likely to progress to Stage 4 requiring immunotherapy combo ($400K+/year). CFO set $600K reserve. Actual: both progressed, total cost $780K. Reserve absorbed 77% of impact—no EBITDA surprise.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">CAR-T Coverage Decision</h3>
                <p className="text-gray-700 text-sm">
                  Board debated covering CAR-T ($475K). Engine showed 12,000-life plan had only 8% annual probability of eligible patient. NPV analysis: cover it, net financial risk $38K/year. Board approved—avoided $200K premium surcharge to exclude coverage.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Project Oncology Costs with Confidence</h2>
            <p className="text-xl text-rose-100 mb-6 max-w-2xl mx-auto">
              Stop budgeting oncology costs with last year's trend. Model treatment pathways, specialty drug pipelines, and multi-year impact.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-white text-rose-600 px-8 py-4 rounded-xl font-bold hover:bg-rose-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
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