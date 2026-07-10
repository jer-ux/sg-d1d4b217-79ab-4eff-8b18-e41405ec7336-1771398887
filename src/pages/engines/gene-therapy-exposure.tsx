import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Dna, DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import Footer from "@/components/Footer";

export default function GeneTherapyExposureEngine() {
  return (
    <>
      <Head>
        <title>Gene Therapy Exposure Modeling Engine | Kincaid IQ</title>
        <meta name="description" content="Financial exposure modeling for high-cost gene therapies with stop-loss optimization and NPV analysis." />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/engines" className="inline-flex items-center gap-2 text-indigo-100 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to All Engines
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                <Dna className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-medium text-indigo-100 mb-1">Financial & Trend Engine</div>
                <h1 className="text-4xl font-bold">Gene Therapy Exposure Modeling</h1>
              </div>
            </div>
            <p className="text-xl text-indigo-100 max-w-3xl">
              Quantify financial exposure to $1-4M gene therapies with prevalence-based modeling and stop-loss optimization strategies
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
                  <h3 className="font-bold text-red-900 mb-2">$2.8M Gene Therapy Claims Are No Longer Rare</h3>
                  <p className="text-red-800">
                    Hemophilia gene therapy ($2.8M), SMA gene therapy ($2.1M), and CAR-T therapies ($475K-$800K) are FDA-approved and entering employer plans. A 10,000-life plan has a non-zero probability of a gene therapy claim every year. CFOs need to quantify this exposure, set reserves, and optimize stop-loss coverage—not discover it when the claim hits.
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
                    <span>No visibility into gene therapy prevalence in your population</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Stop-loss attachment set without modeling gene therapy probability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>Can't defend gene therapy coverage decisions to board/PE sponsors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span>No NPV comparison: one-time gene therapy vs. lifetime disease management</span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">With This Engine</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Prevalence-based probability modeling for your population size</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Stop-loss attachment optimization with gene therapy exposure quantified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>5-year NPV analysis: gene therapy vs. ongoing treatment costs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>Reserve recommendations for board-approved financial planning</span>
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
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Dna className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 1: Prevalence-Based Exposure Modeling</h3>
                    <p className="text-gray-700 mb-3">
                      Calculate expected number of eligible members: Hemophilia A (1 in 5,000 males), SMA Type 1 (1 in 10,000 live births), CAR-T eligible cancers (prevalence × refractory rate). Multiply by therapy eligibility criteria and utilization assumptions. Output: annual probability of 1+ gene therapy claim.
                    </p>
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <p className="text-sm font-mono text-indigo-900">
                        10,000 lives × 50% male × 0.02% hemophilia = 1.0 expected case<br/>
                        Annual claim probability: 18-25% for plans above 8,000 lives
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 2: NPV Analysis vs. Ongoing Treatment</h3>
                    <p className="text-gray-700 mb-3">
                      Compare 5-year NPV: gene therapy one-time cost vs. lifetime disease management. Hemophilia example: $2.8M gene therapy vs. $280K/year factor replacement = 5-year NPV savings of $1.1M. Model clinical success rates, discount rates, and member retention probability. Output: break-even analysis and board-ready business case.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 3: Stop-Loss Optimization</h3>
                    <p className="text-gray-700 mb-3">
                      Model stop-loss attachment point impact: $250K vs. $500K vs. $1M with gene therapy exposure factored. Run Monte Carlo simulation: 10,000 scenarios varying gene therapy incidence, other large claims, and carrier pricing. Recommend attachment that balances premium cost vs. employer out-of-pocket risk.
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Step 4: Reserve Recommendations</h3>
                    <p className="text-gray-700 mb-3">
                      Output reserve amount based on gene therapy probability × expected cost × risk tolerance. For a 10,000-life plan with 20% annual gene therapy probability at $2.5M average cost, recommend $500K reserve (20% × $2.5M) for board approval. Tie reserve to specific clinical utilization management protocols.
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
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Employee Census</div>
                      <div className="text-sm text-gray-600">Age, gender, dependent count for prevalence modeling</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Medical & Pharmacy Claims</div>
                      <div className="text-sm text-gray-600">To identify existing rare disease patients</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Stop-Loss Policy Terms</div>
                      <div className="text-sm text-gray-600">Current attachment, premium, and specific/aggregate limits</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Engine Outputs</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Annual Gene Therapy Probability</div>
                      <div className="text-sm text-gray-600">By therapy type with confidence intervals</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">5-Year NPV Analysis</div>
                      <div className="text-sm text-gray-600">Gene therapy vs. ongoing treatment cost comparison</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Stop-Loss Optimization Report</div>
                      <div className="text-sm text-gray-600">Recommended attachment with gene therapy factored</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-gray-900">Reserve Recommendation</div>
                      <div className="text-sm text-gray-600">Board-ready reserve amount with risk justification</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Real-World Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">$450K Exposure Avoided</h3>
                <p className="text-gray-700 text-sm">
                  Hemophilia patient eligible for $2.8M gene therapy. Engine's NPV analysis showed $1.1M net savings vs. lifetime factor replacement. Stop-loss carrier agreed to cover after reviewing actuarial justification — employer avoided $450K out-of-pocket under $250K attachment.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Board Reserve Approval</h3>
                <p className="text-gray-700 text-sm">
                  15,000-life self-insured plan: engine calculated 32% annual probability of gene therapy claim. CFO presented $750K reserve recommendation to board with prevalence modeling. Board approved — actual claim came in at $2.1M SMA gene therapy Year 2, reserve absorbed 36% of impact.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3">Stop-Loss Negotiation</h3>
                <p className="text-gray-700 text-sm">
                  Carrier wanted to carve out gene therapy coverage. Engine showed employer's 12,000-life plan had only 15% annual probability of claim — justified keeping coverage with $150K reserve. Carrier agreed, employer saved $280K in proposed gene therapy exclusion premium surcharge.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Quantify Gene Therapy Financial Risk</h2>
            <p className="text-xl text-indigo-100 mb-6 max-w-2xl mx-auto">
              Don't let a $2.8M claim surprise your balance sheet. Model exposure, optimize stop-loss, and set defensible reserves.
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-indigo-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
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