import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Shield, Eye, AlertTriangle, CheckCircle2, ArrowRight, FileText, Users, Database, TrendingUp } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function AIGovernanceEngine() {
  return (
    <>
      <SEO
        title="AI Governance Assessment Engine | Kincaid IQ"
        description="Assess AI system governance maturity, bias detection, explainability, and regulatory compliance for healthcare AI deployments."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        {/* Hero */}
        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">Fiduciary & Governance</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                AI Governance Assessment
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Comprehensive framework for assessing AI system governance maturity, including bias detection, explainability metrics, regulatory compliance alignment, and fiduciary oversight of automated healthcare decisions.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Governance & Risk</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">AI Systems Oversight</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Governance Scorecard</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Methodology */}
        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Assessment Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <Shield className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Bias Detection</h3>
                <p className="text-gray-400">
                  Statistical analysis of AI model outputs across protected demographics, identifying disparate impact in healthcare coverage decisions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <Eye className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Explainability Metrics</h3>
                <p className="text-gray-400">
                  SHAP values, feature importance ranking, and decision pathway transparency for regulatory and fiduciary review.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <FileText className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Regulatory Alignment</h3>
                <p className="text-gray-400">
                  Compliance mapping to HIPAA, ERISA, ACA, state insurance regulations, and emerging AI governance frameworks.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <AlertTriangle className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Risk Scoring</h3>
                <p className="text-gray-400">
                  Quantified assessment of AI system risks including model drift, adversarial attacks, and fiduciary breach exposure.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Key Applications</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: "Prior Authorization AI",
                  desc: "Assess governance of AI systems making coverage decisions, ensuring explainability and bias-free operation"
                },
                {
                  title: "Claims Adjudication Models",
                  desc: "Evaluate automated claims processing for regulatory compliance and fair treatment across member populations"
                },
                {
                  title: "Utilization Management",
                  desc: "Review AI-driven utilization review systems for clinical appropriateness and fiduciary duty alignment"
                },
                {
                  title: "Board AI Oversight",
                  desc: "Provide board-ready governance scorecards demonstrating AI system oversight and risk management"
                }
              ].map((useCase, idx) => (
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
                      <h3 className="text-lg font-bold text-white mb-2">{useCase.title}</h3>
                      <p className="text-gray-400">{useCase.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Assess Your AI Governance?
            </h2>
            <p className="text-gray-300 mb-8">
              Get a comprehensive governance assessment of your healthcare AI systems
            </p>
            <Link
              href="/request-demo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-purple-500/50 transform hover:scale-105 transition-all duration-300"
            >
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