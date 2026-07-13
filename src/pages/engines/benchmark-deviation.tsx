import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, CheckCircle2, ArrowRight, TrendingUp, AlertTriangle, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function BenchmarkDeviationEngine() {
  return (
    <>
      <SEO
        title="Benchmark Deviation Analysis | Kincaid IQ"
        description="Statistical analysis of plan performance vs peer benchmarks identifying material deviations requiring fiduciary explanation."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">Fiduciary & Governance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                Benchmark Deviation Analysis
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Rigorous statistical analysis comparing plan performance against peer benchmarks, automatically flagging material deviations that require fiduciary documentation and board explanation.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Performance Monitoring</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Peer Comparison</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Deviation Alerts</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Analysis Methodology</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Target, title: "Peer Cohort Definition", desc: "Industry, size, geography, and plan design matching for apples-to-apples comparison" },
                { icon: BarChart3, title: "Statistical Significance", desc: "Z-score and percentile ranking with confidence intervals to separate noise from signal" },
                { icon: AlertTriangle, title: "Materiality Thresholds", desc: "Automatic flagging of deviations exceeding 2 standard deviations or top/bottom decile" },
                { icon: TrendingUp, title: "Trend Analysis", desc: "Multi-year deviation patterns to identify persistent underperformance vs one-time events" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Key Applications</h2>
            
            <div className="space-y-6">
              {[
                { title: "Vendor Performance Reviews", desc: "Quantified justification for vendor retention or termination based on peer-relative outcomes" },
                { title: "Board Risk Reporting", desc: "Executive dashboards highlighting outlier metrics requiring committee attention" },
                { title: "DOL Audit Defense", desc: "Statistical evidence of prudent monitoring and reasonable plan performance" },
                { title: "RFP Trigger Criteria", desc: "Automated RFP initiation when deviation thresholds breach pre-defined materiality levels" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Run Benchmark Analysis</h2>
            <p className="text-gray-300 mb-8">Compare your plan performance against industry peers</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
              Request Analysis
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}