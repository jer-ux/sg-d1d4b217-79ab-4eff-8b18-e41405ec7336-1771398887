import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Shield, AlertTriangle, CheckCircle2, ArrowRight, FileText, Activity, BarChart3 } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function ComplianceMonitoringEngine() {
  return (
    <>
      <SEO
        title="Compliance Monitoring Engine | Kincaid IQ"
        description="Real-time compliance monitoring across HIPAA, ERISA, ACA, and state regulations with automated alerts and audit trails."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
                <Eye className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">Fiduciary & Governance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                Compliance Monitoring
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Continuous compliance surveillance across HIPAA, ERISA, ACA, and state insurance regulations with real-time alerting and automated audit trail generation.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Compliance & Risk</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Regulatory Monitoring</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Compliance Dashboard</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Monitoring Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Shield, title: "ERISA Compliance", desc: "404(a)(5) participant disclosures, 408(b)(2) fee transparency, Form 5500 filing requirements" },
                { icon: FileText, title: "HIPAA/Privacy", desc: "PHI access controls, breach notification timelines, business associate agreements" },
                { icon: Activity, title: "ACA Requirements", desc: "MEC/MV standards, employer mandate compliance, 1095-C reporting accuracy" },
                { icon: AlertTriangle, title: "State Regulations", desc: "Insurance code compliance, state-specific mandates, licensure requirements" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-purple-400 mb-4" />
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
                { title: "Real-Time Alerts", desc: "Automated notifications when compliance thresholds are breached or deadlines approach" },
                { title: "Audit Trail Generation", desc: "Comprehensive documentation of all compliance monitoring activities for regulators" },
                { title: "Policy Change Tracking", desc: "Monitor impact of regulatory changes on plan operations and participant communications" },
                { title: "Board Reporting", desc: "Executive summaries of compliance posture with risk scoring and remediation recommendations" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Activate Compliance Monitoring</h2>
            <p className="text-gray-300 mb-8">Get continuous regulatory surveillance with automated alerting</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-all duration-300">
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