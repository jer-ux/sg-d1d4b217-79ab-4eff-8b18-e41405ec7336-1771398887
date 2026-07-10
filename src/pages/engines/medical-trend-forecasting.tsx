import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Database, BarChart3, Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function MedicalTrendForecastingEngine() {
  return (
    <>
      <Head>
        <title>Medical Trend Forecasting Engine | Kincaid IQ</title>
        <meta name="description" content="Advanced actuarial engine for medical claims trend forecasting using credibility weighting and Monte Carlo simulation." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-blue-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Medical Trend Forecasting</h1>
              </div>
            </div>
            <p className="text-xl text-blue-100 max-w-3xl">
              Predict medical claims trend 12-36 months forward using credibility-weighted historical experience and population health adjustments
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Problem Statement */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem This Engine Solves</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-red-900 mb-2">CFOs Are Flying Blind on Healthcare Budgets</h3>
                  <p className="text-red-800">
                    CFOs setting annual benefits budgets face carrier renewal quotes with opaque trend assumptions (typically 8-12%), but have no independent way to validate if those projections reflect their actual population. The result: $500K-$2M in annual budget overruns or under-funding that triggers mid-year scrambles.
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
                    <span>Accept carrier trend estimates at face value (no validation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Budget based on industry averages that don't reflect your demographics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Miss population health inflection points (aging workforce, GLP-1 adoption)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>No credibility adjustment for small employers with volatile claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Can't defend budget assumptions to boards or PE sponsors</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Independent trend validation specific to your population</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Credibility-weighted forecasts blend your data with industry benchmarks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Decompose trend into utilization vs. unit cost drivers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Scenario planning for GLP-1 adoption, specialty drug launches, network changes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Board-ready forecast documentation with confidence intervals</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Methodology */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Database className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Data Ingestion & Credibility Weighting</h3>
                    <p className="text-gray-700 mb-3">
                      Analyze 24-36 months of medical claims by service category (inpatient, outpatient, professional, ancillary). Calculate credibility Z-score based on claim volume: higher volume = higher confidence in your historical trend, lower volume = blend more heavily with industry benchmarks.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-mono text-blue-900">
                        Credibility Z = √(Observed Claims / Expected Claims)<br/>
                        Final Trend = (Z × Your Trend) + ((1-Z) × Benchmark Trend)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Trend Decomposition</h3>
                    <p className="text-gray-700 mb-3">
                      Break total trend into three components: <strong>Utilization</strong> (are members using more services?), <strong>Unit Cost</strong> (are prices per service increasing?), and <strong>Mix Shift</strong> (are members moving to higher-cost services?). This reveals whether you have a utilization problem (care management opportunity) or a unit cost problem (network negotiation opportunity).
                    </p>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm font-mono text-purple-900">
                        Total Trend = (1 + Utilization%) × (1 + Unit Cost%) × (1 + Mix Shift%) - 1
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Activity className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Population Health Adjustments</h3>
                    <p className="text-gray-700 mb-3">
                      Layer in known population changes: aging workforce (adds 0.5-1.0% trend per year), GLP-1 adoption curve (subtracts 0.3-0.8% long-term), specialty drug pipeline (oncology, gene therapy), and plan design changes. This transforms a backward-looking trend into a forward-looking forecast.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Monte Carlo Simulation</h3>
                    <p className="text-gray-700 mb-3">
                      Run 10,000 simulations varying utilization, unit cost, and population health assumptions within expected ranges. Output 50th percentile (median), 75th percentile (conservative budget), and 90th percentile (worst-case) forecasts. CFOs can choose their risk tolerance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Inputs & Outputs */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Required Inputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">24-36 Months of Medical Claims</div>
                      <div className="text-sm text-gray-600">By service category, with member months</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Employee Census</div>
                      <div className="text-sm text-gray-600">Age, gender, zip code, plan tier</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Known Population Changes</div>
                      <div className="text-sm text-gray-600">Retirements, acquisitions, plan design changes</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Industry Benchmarks (Optional)</div>
                      <div className="text-sm text-gray-600">For credibility weighting if low volume</div>
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
                      <div className="font-semibold text-gray-900">12/24/36-Month Trend Forecast</div>
                      <div className="text-sm text-gray-600">With 50th, 75th, 90th percentile confidence bands</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Trend Decomposition Chart</div>
                      <div className="text-sm text-gray-600">Utilization vs. unit cost vs. mix shift attribution</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Carrier Trend Comparison</div>
                      <div className="text-sm text-gray-600">Your forecast vs. carrier renewal assumptions</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Budget Impact Analysis</div>
                      <div className="text-sm text-gray-600">Dollar impact at different trend scenarios</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Board-Ready Executive Summary</div>
                      <div className="text-sm text-gray-600">Methodology documentation + key findings</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">CFO Annual Budget</h3>
                <p className="text-gray-700 text-sm">
                  A 5,000-life self-insured employer receives a carrier renewal with 11.2% medical trend. Engine projects 8.4% based on credibility-weighted historical + aging workforce adjustment. CFO builds budget at 9.0% (75th percentile), saving $1.8M vs. carrier estimate.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">PE Due Diligence</h3>
                <p className="text-gray-700 text-sm">
                  PE firm evaluating a portfolio company sees benefits spend trending at 14% annually. Engine reveals trend is 100% unit cost (no utilization increase) — a network negotiation problem, not a population health problem. Deal proceeds with $2.3M cost-savings thesis.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Broker Value Defense</h3>
                <p className="text-gray-700 text-sm">
                  Broker under threat from RFP uses engine to demonstrate client's actual trend is 2.8% below market (due to care management programs broker implemented). Quantifies $4.2M in 3-year value delivered — contract renewed.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Validate Your Medical Trend?</h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Stop accepting carrier trend estimates at face value. Run an independent, credibility-weighted forecast specific to your population.
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