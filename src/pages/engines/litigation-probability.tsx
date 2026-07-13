import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, AlertTriangle, TrendingUp, CheckCircle2, ArrowRight, BarChart3, Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function LitigationProbabilityEngine() {
  return (
    <>
      <SEO
        title="Litigation Probability Engine | Kincaid IQ"
        description="Predict fiduciary litigation risk using plan characteristics, industry benchmarks, and historical class action patterns."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
                <Scale className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 text-sm font-medium">Fiduciary & Governance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-red-400 text-transparent bg-clip-text">
                Litigation Probability Model
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Machine learning model predicting fiduciary breach litigation probability based on plan size, fee structures, industry benchmarks, and historical ERISA class action patterns.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Risk Prediction</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Litigation Risk</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Risk Score</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Predictive Factors</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: BarChart3, title: "Plan Characteristics", desc: "Assets, participant count, industry sector, recordkeeper, investment menu structure" },
                { icon: TrendingUp, title: "Fee Benchmarking", desc: "Deviation from peer group fee levels, revenue sharing arrangements, undisclosed compensation" },
                { icon: Shield, title: "Governance Quality", desc: "Committee meeting frequency, IPS compliance, vendor RFP history, documentation practices" },
                { icon: AlertTriangle, title: "Historical Patterns", desc: "Similarity to plans sued previously, plaintiff attorney target industries, settlement precedents" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-orange-400 mb-4" />
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
                { title: "D&O Insurance Pricing", desc: "Quantified risk profiles for fiduciary liability insurance underwriting and premium negotiation" },
                { title: "Board Risk Dashboards", desc: "Executive-level litigation risk monitoring with early warning indicators" },
                { title: "Vendor Selection Defense", desc: "Document prudent process and benchmark alignment to strengthen fiduciary defense" },
                { title: "Settlement Reserve Planning", desc: "Probabilistic modeling of litigation exposure for financial planning" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Assess Your Litigation Risk</h2>
            <p className="text-gray-300 mb-8">Get a quantified litigation probability score with mitigation strategies</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-orange-500/50 transform hover:scale-105 transition-all duration-300">
              Request Assessment
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}