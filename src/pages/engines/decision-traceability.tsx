import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { GitBranch, CheckCircle2, ArrowRight, Clock, Users, FileText } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function DecisionTraceabilityEngine() {
  return (
    <>
      <SEO
        title="Decision Traceability Engine | Kincaid IQ"
        description="Immutable audit trail of all fiduciary decisions with complete lineage from data through analysis to committee vote."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
                <GitBranch className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 text-sm font-medium">Fiduciary & Governance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                Decision Traceability
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Blockchain-inspired immutable audit trail capturing complete lineage from source data through AI analysis to committee decision, timestamped and cryptographically signed.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Audit Trail</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Decision Lineage</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Immutable Ledger</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Traceability Layers</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: FileText, title: "Data Provenance", desc: "Complete chain of custody from raw data sources through transformations to final inputs" },
                { icon: GitBranch, title: "Model Lineage", desc: "AI model versions, training data, assumptions, parameters, and validation results" },
                { icon: Users, title: "Human Oversight", desc: "Committee members, meeting attendance, discussion notes, dissenting opinions, final votes" },
                { icon: Clock, title: "Temporal Records", desc: "Precise timestamps for each decision step with immutable cryptographic signatures" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-emerald-400 mb-4" />
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
                { title: "Litigation Defense", desc: "Complete decision lineage demonstrating prudent process and reasonable reliance on data" },
                { title: "Regulatory Audits", desc: "Instant production of decision documentation for DOL or SEC examination" },
                { title: "AI Explainability", desc: "Transparent AI governance showing human oversight of algorithmic recommendations" },
                { title: "Board Reporting", desc: "Executive dashboards visualizing decision flows and governance quality metrics" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Implement Decision Traceability</h2>
            <p className="text-gray-300 mb-8">Build immutable governance infrastructure</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300">
              Request Demo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}