import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Scale, CheckCircle2, ArrowRight, FileText, Users2, AlertTriangle } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function ProcurementFairnessEngine() {
  return (
    <>
      <SEO
        title="Procurement Fairness Analysis | Kincaid IQ"
        description="Competitive bidding process evaluation, bid comparison analytics, and conflict of interest detection for benefit plan vendor selection."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 text-sm font-medium">Fiduciary & Governance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-400 text-transparent bg-clip-text">
                Procurement Fairness Analysis
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Rigorous evaluation of competitive bidding processes including bid comparison analytics, conflict of interest detection, and documentation of objective selection criteria for benefit plan vendor procurement.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Procurement</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">RFP Management</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Fairness Reports</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Analysis Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: FileText, title: "Bid Comparison Analytics", desc: "Normalized scoring across vendors with weighted criteria and apples-to-apples service scope comparison" },
                { icon: AlertTriangle, title: "Conflict Detection", desc: "Automated identification of related party relationships, compensation arrangements, and disclosure gaps" },
                { icon: Scale, title: "Process Integrity", desc: "Verification of open competition, adequate bidder pool, and documented evaluation methodology" },
                { icon: Users2, title: "Selection Documentation", desc: "Audit trail of decision rationale, committee deliberations, and objective justification" }
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
                { title: "Fiduciary Protection", desc: "Documented proof of prudent, objective, and competitive vendor selection process" },
                { title: "DOL Audit Defense", desc: "Pre-assembled evidence packages demonstrating fair and open procurement procedures" },
                { title: "Conflict Management", desc: "Proactive identification and disclosure of potential conflicts before vendor engagement" },
                { title: "Board Governance", desc: "Transparent reporting of selection criteria, bid results, and final recommendation rationale" }
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
            <h2 className="text-3xl font-bold text-white mb-6">Evaluate Procurement Process</h2>
            <p className="text-gray-300 mb-8">Ensure fair and competitive vendor selection</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300">
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