import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Dices, TrendingUp } from "lucide-react";
import Footer from "@/components/Footer";
import { EngineStatusIndicator } from "@/components/EngineStatusIndicator";

export default function MonteCarloForecastingEngine() {
  return (
    <>
      <Head>
        <title>Monte Carlo Forecasting Engine | Kincaid IQ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/engines" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Engines</span>
              </Link>
              <EngineStatusIndicator />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
                <Dices className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Monte Carlo Forecasting Engine</h1>
                <p className="text-gray-400 mt-1">Probabilistic cost projection with confidence intervals</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Methodology</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Runs 10,000+ simulations to generate probability distributions for future costs, 
                    capturing uncertainty and tail risk.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Parameterize cost distributions (claims, utilization, unit costs)</li>
                    <li>• Model correlation between variables</li>
                    <li>• Simulate thousands of scenarios</li>
                    <li>• Generate confidence intervals (50th, 90th, 95th percentiles)</li>
                    <li>• Calculate Value at Risk (VaR) and Expected Shortfall</li>
                    <li>• Identify scenarios driving extreme outcomes</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Key Outputs</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span className="text-gray-300">Cost probability distribution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span className="text-gray-300">Confidence intervals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span className="text-gray-300">Tail risk metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span className="text-gray-300">Scenario analysis</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/engines" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Return to All Engines
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}