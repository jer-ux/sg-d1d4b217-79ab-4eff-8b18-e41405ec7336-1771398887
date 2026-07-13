import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, ArrowRight, AlertTriangle, Eye, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function FraudPredictionEngine() {
  return (
    <>
      <SEO
        title="Fraud Prediction | Kincaid IQ"
        description="AI-powered anomaly detection identifying suspicious claims patterns, billing irregularities, and potential fraud schemes before payment."
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
                <Shield className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm font-medium">Predictive AI</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 text-transparent bg-clip-text">
                Fraud Prediction
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Machine learning models detecting anomalous claims patterns, identifying suspicious provider behavior, and flagging potential fraud before payment execution.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Predictive AI</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Fraud Detection</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Risk Alerts</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Detection Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Eye, title: "Pattern Recognition", desc: "Anomaly detection algorithms identifying deviations from normal billing patterns, service frequency, and diagnostic-procedural relationships" },
                { icon: AlertTriangle, title: "Risk Scoring", desc: "Provider and member fraud risk scores incorporating historical behavior, peer comparisons, and known scheme indicators" },
                { icon: Target, title: "Scheme Detection", desc: "Pre-built detection rules for common fraud types — unbundling, upcoding, phantom billing, kickback arrangements" },
                { icon: Shield, title: "Investigative Prioritization", desc: "Ranked alerts with estimated financial exposure guiding Special Investigations Unit focus and resource allocation" }
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
                { title: "Pre-Payment Screening", desc: "Real-time fraud scoring blocking suspicious claims before payment with investigative workflow triggers" },
                { title: "Provider Profiling", desc: "Continuous monitoring of billing patterns flagging outlier providers for enhanced scrutiny and audits" },
                { title: "Recovery Prioritization", desc: "Estimation of recoverable amounts guiding legal action decisions and settlement negotiations" },
                { title: "Scheme Intelligence", desc: "Identification of coordinated fraud networks involving multiple providers, members, and facilities" }
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
            <h2 className="text-3xl font-bold text-white mb-6">Detect Fraud Before Payment</h2>
            <p className="text-gray-300 mb-8">Stop suspicious claims with AI-powered detection</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-red-500/50 transform hover:scale-105 transition-all duration-300">
              Request Detection
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}