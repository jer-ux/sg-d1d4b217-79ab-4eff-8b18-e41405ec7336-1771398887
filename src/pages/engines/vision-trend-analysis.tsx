import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Eye, TrendingUp } from "lucide-react";
import Footer from "@/components/Footer";
import { EngineStatusIndicator } from "@/components/EngineStatusIndicator";

export default function VisionTrendAnalysisEngine() {
  return (
    <>
      <Head>
        <title>Vision Trend Analysis Engine | Kincaid IQ</title>
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
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Vision Trend Analysis Engine</h1>
                <p className="text-gray-400 mt-1">Forecast vision benefit costs and utilization patterns</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Methodology</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Projects vision costs by analyzing exam frequency, eyewear trends, and contact lens utilization.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Segment by service (exams, lenses, frames, contacts)</li>
                    <li>• Track frame/lens premium selections</li>
                    <li>• Model contact lens vs. eyewear mix shift</li>
                    <li>• Forecast benefit exhaustion rates</li>
                    <li>• Adjust for network provider mix</li>
                    <li>• Project population aging and screen-time impact</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-bold text-white">Key Outputs</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span className="text-gray-300">Service-level trend rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span className="text-gray-300">Utilization forecasts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span className="text-gray-300">Product mix trends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-1">→</span>
                    <span className="text-gray-300">Network efficiency metrics</span>
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