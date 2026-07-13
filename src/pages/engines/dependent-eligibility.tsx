import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users2, CheckCircle2, ArrowRight, Shield, AlertTriangle, FileText } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function DependentEligibilityEngine() {
  return (
    <>
      <SEO
        title="Dependent Eligibility Audit | Kincaid IQ"
        description="Automated dependent eligibility verification, fraud detection, and compliance monitoring to eliminate ineligible coverage."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 text-sm font-medium">Workforce & Human Capital</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-yellow-400 text-transparent bg-clip-text">
                Dependent Eligibility Audit
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Automated verification and continuous monitoring of dependent eligibility status, fraud pattern detection, and compliance enforcement to eliminate ineligible coverage costs.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Compliance</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Cost Control</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Audit Reports</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Audit Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: FileText, title: "Document Verification", desc: "Automated validation of marriage certificates, birth certificates, adoption papers, and student status documentation" },
                { icon: AlertTriangle, title: "Fraud Detection", desc: "Pattern analysis identifying suspicious enrollments, duplicate SSNs, age-inconsistent relationships, and timeline anomalies" },
                { icon: Shield, title: "Life Event Monitoring", desc: "Continuous surveillance for divorce filings, death records, student graduation, and age-out triggers" },
                { icon: Users2, title: "Cost Recovery", desc: "Retroactive claims analysis and recovery process for ineligible dependent usage periods" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-amber-400 mb-4" />
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
                { title: "Initial Audit", desc: "Full population sweep identifying ineligible dependents with estimated annual cost impact and recovery opportunity" },
                { title: "Ongoing Monitoring", desc: "Continuous verification preventing future ineligible additions and triggering timely terminations" },
                { title: "Open Enrollment", desc: "Re-verification campaign ensuring all enrolled dependents meet current eligibility standards" },
                { title: "Fiduciary Defense", desc: "Documented compliance program demonstrating prudent oversight of plan assets and membership integrity" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-amber-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Audit Dependent Eligibility</h2>
            <p className="text-gray-300 mb-8">Eliminate ineligible coverage costs</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-amber-500/50 transform hover:scale-105 transition-all duration-300">
              Request Audit
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}