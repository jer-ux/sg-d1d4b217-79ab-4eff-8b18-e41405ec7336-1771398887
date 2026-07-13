import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, TrendingUp, CheckCircle2, ArrowRight, Scale, Eye } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function RegulatoryExposureEngine() {
  return (
    <>
      <SEO
        title="Regulatory Exposure Engine | Kincaid IQ"
        description="Quantify regulatory and litigation exposure from plan operations, vendor contracts, and fiduciary decisions."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-red-400 hover:text-red-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-2 mb-6">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm font-medium">Fiduciary & Governance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 text-transparent bg-clip-text">
                Regulatory Exposure Assessment
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Quantify DOL, IRS, and state regulatory exposure from plan operations, vendor contracts, and fiduciary decisions with dollar-denominated risk scoring.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Risk Quantification</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Regulatory Risk</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Exposure Report</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Risk Assessment Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Shield, title: "ERISA Breach Exposure", desc: "Quantify potential DOL penalties from fiduciary violations, prohibited transactions, and disclosure failures" },
                { icon: Scale, title: "Litigation Risk", desc: "Assess class action exposure based on plan size, industry benchmarks, and operational red flags" },
                { icon: TrendingUp, title: "Financial Impact", desc: "Model penalty ranges, settlement costs, and defense expenses for identified compliance gaps" },
                { icon: Eye, title: "Audit Probability", desc: "Calculate likelihood of DOL or IRS audit based on plan characteristics and filing history" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-red-400 mb-4" />
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
                { title: "Board Risk Reporting", desc: "Quantified regulatory exposure summaries for board oversight and D&O insurance decisions" },
                { title: "M&A Due Diligence", desc: "Pre-transaction assessment of acquired plan liabilities and regulatory skeletons" },
                { title: "Remediation Prioritization", desc: "Risk-weighted action plans focusing resources on highest-exposure compliance gaps" },
                { title: "Insurance Underwriting", desc: "Data-driven fiduciary liability insurance applications and premium negotiations" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-red-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Assess Your Regulatory Exposure</h2>
            <p className="text-gray-300 mb-8">Get a quantified risk assessment with remediation roadmap</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-red-500/50 transform hover:scale-105 transition-all duration-300">
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