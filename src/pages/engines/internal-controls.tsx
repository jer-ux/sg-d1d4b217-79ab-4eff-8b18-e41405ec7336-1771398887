import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, ArrowRight, Lock, FileCheck, AlertTriangle } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function InternalControlsEngine() {
  return (
    <>
      <SEO
        title="Internal Controls Assessment | Kincaid IQ"
        description="Automated evaluation of segregation of duties, approval hierarchies, reconciliation procedures, and control effectiveness across benefit plan operations."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-indigo-300 text-sm font-medium">Fiduciary & Governance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                Internal Controls Assessment
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Comprehensive evaluation of operational controls including segregation of duties, approval workflows, reconciliation procedures, and control effectiveness testing across all benefit plan processes.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Risk Management</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">SOX Compliance</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Control Scorecards</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Control Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Lock, title: "Segregation of Duties", desc: "Automated detection of incompatible function combinations and approval authority conflicts" },
                { icon: FileCheck, title: "Approval Hierarchies", desc: "Policy enforcement for multi-level approvals, dollar thresholds, and emergency override logging" },
                { icon: Shield, title: "Reconciliation Procedures", desc: "Continuous monitoring of account reconciliations, variance investigations, and closure timelines" },
                { icon: AlertTriangle, title: "Control Testing", desc: "Automated sampling and testing of key controls with exception reporting and remediation tracking" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-indigo-400 mb-4" />
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
                { title: "SOX 404 Compliance", desc: "Automated control documentation and testing for Sarbanes-Oxley internal control reporting" },
                { title: "Audit Readiness", desc: "Pre-populated control matrices and evidence packages for annual auditor walkthroughs" },
                { title: "Fraud Prevention", desc: "Real-time detection of control override attempts and segregation of duty violations" },
                { title: "Process Improvement", desc: "Identification of inefficient control procedures and recommendations for automation" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Assess Internal Controls</h2>
            <p className="text-gray-300 mb-8">Evaluate control effectiveness and compliance</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300">
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