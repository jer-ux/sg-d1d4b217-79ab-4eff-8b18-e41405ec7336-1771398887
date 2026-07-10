import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Activity, TrendingDown, DollarSign, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function GLP1FinancialImpact() {
  return (
    <>
      <Head>
        <title>GLP-1 Financial Impact Modeling | Kincaid IQ</title>
        <meta name="description" content="Model short-term pharmacy cost increase and long-term medical savings from GLP-1 drug adoption." />
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
                <Activity className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-emerald-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">GLP-1 Financial Impact Modeling</h1>
              </div>
            </div>
            <p className="text-xl text-emerald-100 max-w-3xl">
              Model the complete financial picture: pharmacy cost surge + long-term comorbidity savings from GLP-1 adoption
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
                  <h3 className="font-bold text-red-900 mb-2">GLP-1s: Short-Term Budget Crisis or Long-Term Investment?</h3>
                  <p className="text-red-800">
                    CFOs see GLP-1 drugs (Wegovy, Ozempic, Mounjaro) driving 15-25% pharmacy trend and panic. "We can't afford $1,400/month per member!" But obesity drives diabetes, heart disease, sleep apnea, joint replacements — $8,000-$15,000/year in downstream medical costs. The question isn't "can we afford GLP-1s?" — it's "what's the 5-year NPV?"
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
                    <span>Block GLP-1 coverage due to pharmacy cost without modeling medical offsets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>No adoption curve modeling — assume 100% or 0% penetration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Miss comorbidity reduction: diabetes progression, CV events, joint surgeries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Can't quantify break-even timeline or NPV at different coverage scenarios</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>5-year NPV model: pharmacy costs vs. medical savings at 3 adoption scenarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Comorbidity reduction modeling: diabetes, CV, orthopedic, sleep apnea</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Break-even analysis: ROI turns positive in Year 2-3 for most populations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Coverage strategy optimization: open access vs. step therapy vs. block</span>
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
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Eligible Population Sizing</h3>
                    <p className="text-gray-700 mb-3">
                      Identify eligible members: BMI ≥30 (obesity) OR BMI ≥27 + diabetes. Analyze historical claims for comorbidity burden: diabetes prevalence, cardiovascular disease, orthopedic claims, sleep apnea diagnoses. High-comorbidity members = highest ROI candidates for GLP-1 coverage.
                    </p>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm font-mono text-emerald-900">
                        Eligible Population = 18-22% of adult members (typical)<br/>
                        High-Comorbidity Subset = 35% of eligible (highest ROI)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Activity className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: Adoption Curve Modeling</h3>
                    <p className="text-gray-700 mb-3">
                      Model 3 adoption scenarios: Conservative (3% of eligible Year 1, 7% Year 3), Moderate (7% → 15%), Aggressive (12% → 25%). Factor in: prior authorization requirements, copay barriers ($50-$200/month), physician prescribing patterns, and member willingness. Persistence rate: 60% at 12 months (high discontinuation is typical).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Comorbidity Reduction Modeling</h3>
                    <p className="text-gray-700 mb-3">
                      Clinical trials show 10-15% weight loss reduces: diabetes progression 40-60%, CV events 20-25%, joint replacement need 30-40%, sleep apnea 35-50%. Translate to dollar savings: avoided dialysis ($80K/year), avoided MI/stroke ($45K-$120K), avoided joint replacement ($35K-$50K). Lag time: savings begin Year 2, compound over 5 years.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm font-mono text-blue-900">
                        Year 1: Pharmacy +$1,680 PMPY, Medical -$240 = Net +$1,440<br/>
                        Year 3: Pharmacy +$1,200 PMPY, Medical -$1,850 = Net -$650 (ROI positive)
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: NPV & Coverage Strategy Optimization</h3>
                    <p className="text-gray-700 mb-3">
                      Calculate 5-year NPV at 6% discount rate for 3 coverage strategies: (1) Open access (highest adoption, fastest payback), (2) Step therapy (moderate adoption, lower initial cost), (3) Block coverage (zero pharmacy cost, miss all medical savings). Output optimal strategy based on CFO's time horizon and risk tolerance. Typical finding: open access NPV positive by Year 3 for high-comorbidity populations.
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
                      <div className="font-semibold text-gray-900">24 Months Claims + Pharmacy Data</div>
                      <div className="text-sm text-gray-600">With BMI, diabetes, CV, orthopedic diagnoses</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Employee Demographics</div>
                      <div className="text-sm text-gray-600">Age, gender, chronic condition prevalence</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Current Formulary Design</div>
                      <div className="text-sm text-gray-600">GLP-1 coverage status, copays, restrictions</div>
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
                      <div className="font-semibold text-gray-900">5-Year NPV Analysis</div>
                      <div className="text-sm text-gray-600">Pharmacy cost vs. medical savings by year</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Adoption Scenarios</div>
                      <div className="text-sm text-gray-600">Conservative, moderate, aggressive penetration curves</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Break-Even Timeline</div>
                      <div className="text-sm text-gray-600">When cumulative savings exceed cumulative costs</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Coverage Strategy Recommendation</div>
                      <div className="text-sm text-gray-600">Optimal policy based on time horizon & risk tolerance</div>
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
                <h3 className="font-bold text-gray-900 mb-3">$2.8M 5-Year NPV Positive</h3>
                <p className="text-gray-700 text-sm">
                  12,000-life employer modeled GLP-1 coverage. Year 1 cost: +$820K pharmacy. Year 5 cumulative: -$2.8M net savings from avoided diabetes progression, CV events, joint surgeries. Board approved open access after seeing engine's NPV analysis.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Step Therapy Justified</h3>
                <p className="text-gray-700 text-sm">
                  CFO wanted to block GLP-1 coverage entirely. Engine showed step therapy (lifestyle program first, then GLP-1) achieves 78% of open-access savings at 52% of pharmacy cost. Compromise approved — better than total block.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Dialysis Prevention Quantified</h3>
                <p className="text-gray-700 text-sm">
                  Engine identified 38 diabetics with obesity in pre-dialysis stage. GLP-1 coverage for this cohort: $63K/year pharmacy cost. Avoided dialysis (6 members): $480K/year savings. ROI = 7.6:1 for targeted coverage.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">See the Full GLP-1 Picture</h2>
            <p className="text-xl text-emerald-100 mb-6 max-w-2xl mx-auto">
              Stop debating GLP-1 coverage with gut feel. Model the 5-year NPV and make data-driven decisions.
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