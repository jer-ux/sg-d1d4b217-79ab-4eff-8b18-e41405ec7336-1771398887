import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, CheckCircle2, ArrowRight, FileSearch, AlertCircle, BarChart3 } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function ThirdPartyOversightEngine() {
  return (
    <>
      <SEO
        title="Third-Party Oversight Engine | Kincaid IQ"
        description="Vendor performance monitoring, SLA compliance tracking, service quality scoring, and contract term adherence across all benefit plan service providers."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-4 py-2 mb-6">
                <Users className="w-4 h-4 text-teal-400" />
                <span className="text-teal-300 text-sm font-medium">Fiduciary & Governance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 text-transparent bg-clip-text">
                Third-Party Oversight Engine
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Continuous monitoring and performance scoring of all benefit plan vendors including TPAs, PBMs, brokers, and consultants with automated SLA compliance tracking and contract term enforcement.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Vendor Management</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Performance Monitoring</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Vendor Scorecards</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Oversight Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: BarChart3, title: "SLA Compliance Tracking", desc: "Real-time monitoring of service level agreements with breach alerts and penalty calculations" },
                { icon: FileSearch, title: "Contract Term Enforcement", desc: "Automated verification of pricing, guarantees, and deliverables against executed agreements" },
                { icon: AlertCircle, title: "Quality Score Cards", desc: "Quantified vendor performance ratings across service quality, responsiveness, and accuracy" },
                { icon: Users, title: "Relationship Management", desc: "Escalation protocols, QBR preparation, and vendor communication audit trails" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-teal-400 mb-4" />
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
                { title: "Fiduciary Prudence", desc: "Documented evidence of ongoing vendor monitoring satisfying ERISA prudent expert selection requirements" },
                { title: "RFP Decision Support", desc: "Historical performance data informing vendor retention vs replacement decisions" },
                { title: "Fee Validation", desc: "Automated reconciliation of vendor invoices against contracted rates and service volumes" },
                { title: "Risk Mitigation", desc: "Early detection of vendor performance degradation enabling proactive remediation" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-teal-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Monitor Vendor Performance</h2>
            <p className="text-gray-300 mb-8">Track SLA compliance and service quality</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-teal-500/50 transform hover:scale-105 transition-all duration-300">
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