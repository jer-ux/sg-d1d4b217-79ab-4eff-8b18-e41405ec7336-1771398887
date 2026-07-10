import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Pill, Database, BarChart3, Activity, AlertCircle, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/Footer";

export default function RxTrendForecastingEngine() {
  return (
    <>
      <Head>
        <title>Rx Trend Forecasting Engine | Kincaid IQ</title>
        <meta name="description" content="Pharmacy claims trend forecasting with GLP-1 adoption modeling and specialty drug pipeline analysis." />
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
                <Pill className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-purple-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Rx Trend Forecasting</h1>
              </div>
            </div>
            <p className="text-xl text-purple-100 max-w-3xl">
              Project pharmacy costs 12-36 months forward accounting for GLP-1 adoption curves, specialty drug launches, and biosimilar conversions
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
                  <h3 className="font-bold text-red-900 mb-2">Pharmacy Trend Is a Moving Target</h3>
                  <p className="text-red-800">
                    GLP-1 drugs (Wegovy, Ozempic) are driving 15-25% pharmacy trend for early adopters, but will they stabilize or accelerate? Biosimilars promise 30-50% savings on biologics, but adoption is slow. Gene therapies cost $2M+ per dose. CFOs can't budget pharmacy with last year's trend — the category is in structural transformation.
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
                    <span>GLP-1 costs hit budget as surprise $400K+ overrun</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>No visibility into specialty drug pipeline (oncology, gene therapy)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Biosimilar savings assumptions not based on actual conversion rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>PBM rebate assumptions unverified (often overstated 20-30%)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>GLP-1 adoption curve modeling: 3%, 7%, 12% penetration scenarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Specialty drug pipeline impact (FDA approval calendar)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Biosimilar conversion forecasts based on actual uptake data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Rebate pass-through validation against PBM contract terms</span>
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
                    <Database className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Baseline Trend Calculation</h3>
                    <p className="text-gray-700 mb-3">
                      Calculate 12-24 month historical trend by therapeutic class (GLP-1, oncology, immunology, etc.). Separate maintenance medications (stable trend) from specialty/injectable (high volatility). Adjust for one-time events (gene therapy claims, patient aging-out).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Activity className="w-6 h-6 text-pink-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: GLP-1 Adoption Modeling</h3>
                    <p className="text-gray-700 mb-3">
                      Model three GLP-1 adoption scenarios: Conservative (3% eligible population by Year 2), Moderate (7%), Aggressive (12%). Factor in clinical eligibility (BMI 30+, diabetes), prior authorization barriers, and member cost-sharing. Long-term (3+ year) savings from obesity comorbidity reduction: -2% to -5% medical trend offset.
                    </p>
                    <div className="bg-pink-50 p-4 rounded-lg">
                      <p className="text-sm font-mono text-pink-900">
                        Year 1 GLP-1 Impact: +$380 PMPY (7% adoption)<br/>
                        Year 3 Net Impact: +$140 PMPY (after comorbidity savings)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Specialty Drug Pipeline Analysis</h3>
                    <p className="text-gray-700 mb-3">
                      Track FDA pipeline for high-cost specialty drugs likely to enter your formulary (CAR-T therapies, gene therapies, new oncology agents). Model incidence-based utilization: prevalence × eligibility × uptake rate. Gene therapy: $2M one-time vs. $150K/year ongoing treatment — 5-year NPV comparison.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Biosimilar Conversion Forecast</h3>
                    <p className="text-gray-700 mb-3">
                      Identify biologics with biosimilar competition (Humira → Amjevita, Remicade → Inflectra). Model conversion based on PBM formulary incentives, physician prescribing patterns, and state biosimilar laws. Typical conversion: 30% Year 1, 60% Year 3 at 40% cost reduction = 10-15% specialty drug trend reduction.
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
                      <div className="font-semibold text-gray-900">24 Months Pharmacy Claims</div>
                      <div className="text-sm text-gray-600">With NDC codes, therapeutic class, and member eligibility</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Employee Health Risk Data</div>
                      <div className="text-sm text-gray-600">BMI, diabetes prevalence, chronic conditions</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">PBM Contract & Rebate Terms</div>
                      <div className="text-sm text-gray-600">Rebate pass-through, formulary design</div>
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
                      <div className="font-semibold text-gray-900">12/24/36-Month Rx Trend Forecast</div>
                      <div className="text-sm text-gray-600">By therapeutic class with GLP-1 scenarios</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">GLP-1 Adoption Impact Analysis</div>
                      <div className="text-sm text-gray-600">3 scenarios with long-term comorbidity savings</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Specialty Drug Pipeline Report</div>
                      <div className="text-sm text-gray-600">High-cost drug launch calendar with budget impact</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Biosimilar Savings Forecast</div>
                      <div className="text-sm text-gray-600">Conversion timeline and dollar impact</div>
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
                <h3 className="font-bold text-gray-900 mb-3">GLP-1 Budget Shock Avoided</h3>
                <p className="text-gray-700 text-sm">
                  Manufacturing company with 8,000 lives saw engine forecast 7% GLP-1 adoption driving +$680K pharmacy cost Year 1. CFO budgeted conservatively, actual came in at $620K. Without engine, surprise overrun would have triggered mid-year benefit cuts.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Biosimilar Negotiation Win</h3>
                <p className="text-gray-700 text-sm">
                  HR director armed with biosimilar conversion forecast (60% by Year 2 = $340K savings) challenged PBM's 30% assumption. PBM agreed to performance guarantee tied to engine's 60% target — recovered $180K in Year 1 underperformance.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Gene Therapy Financial Planning</h3>
                <p className="text-gray-700 text-sm">
                  Hemophilia patient eligible for $2.8M gene therapy. Engine modeled 5-year NPV: gene therapy saves $1.1M vs. ongoing factor replacement. Stop-loss carrier agreed to cover after seeing actuarial justification — employer avoided $450K out-of-pocket exposure.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Stop Guessing on Pharmacy Trend</h2>
            <p className="text-xl text-purple-100 mb-6 max-w-2xl mx-auto">
              GLP-1s and specialty drugs are transforming pharmacy economics. Get a credible, defensible forecast.
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