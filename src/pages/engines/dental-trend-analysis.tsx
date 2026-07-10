import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Activity, TrendingUp } from "lucide-react";
import Footer from "@/components/Footer";
import { EngineStatusIndicator } from "@/components/EngineStatusIndicator";

export default function DentalTrendAnalysisEngine() {
  return (
    <>
      <Head>
        <title>Dental Trend Analysis Engine | Kincaid IQ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/engines" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back to Engines</span>
              </Link>
              <EngineStatusIndicator status="operational" />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/50">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Dental Trend Analysis Engine</h1>
                <p className="text-gray-400 mt-1">Forecast dental benefit costs and utilization patterns</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Methodology</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Projects dental costs by analyzing utilization trends across preventive, basic, and major services.
                  </p>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Segment by service type (preventive, basic restorative, major, orthodontics)</li>
                    <li>• Track provider fee schedules and network discounts</li>
                    <li>• Model annual maximum exhaustion rates</li>
                    <li>• Forecast deferred care catch-up</li>
                    <li>• Adjust for benefit design changes</li>
                    <li>• Project population aging impact</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 backdrop-blur-sm border border-teal-500/30 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-teal-400" />
                  <h3 className="text-lg font-bold text-white">Key Outputs</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1">→</span>
                    <span className="text-gray-300">Service-level trend rates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1">→</span>
                    <span className="text-gray-300">Utilization forecasts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1">→</span>
                    <span className="text-gray-300">Max exhaustion analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 mt-1">→</span>
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