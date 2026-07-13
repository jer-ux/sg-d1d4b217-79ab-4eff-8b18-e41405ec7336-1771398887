import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, CheckCircle2, ArrowRight, AlertTriangle, TrendingDown, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function TalentRetentionRiskEngine() {
  return (
    <>
      <SEO
        title="Talent Retention Risk Analysis | Kincaid IQ"
        description="Predictive modeling of employee turnover probability linked to benefit satisfaction, health plan value perception, and competitive positioning."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-2 mb-6">
                <Users className="w-4 h-4 text-rose-400" />
                <span className="text-rose-300 text-sm font-medium">Workforce & Human Capital</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-orange-400 text-transparent bg-clip-text">
                Talent Retention Risk Analysis
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Turnover probability modeling linking benefit satisfaction scores, competitive positioning analysis, and retention risk quantification for strategic talent management.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Strategic HR</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Retention Strategy</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Risk Scores</div>
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
                { icon: AlertTriangle, title: "Risk Scoring", desc: "Individual employee flight risk calculation incorporating tenure, satisfaction surveys, benefit utilization, and market comp data" },
                { icon: TrendingDown, title: "Attrition Drivers", desc: "Statistical analysis identifying which benefit gaps correlate most strongly with voluntary turnover" },
                { icon: Target, title: "Competitive Benchmarking", desc: "Total rewards positioning versus peer employers showing attraction and retention vulnerabilities" },
                { icon: Users, title: "Segment Analysis", desc: "High-performer and critical-skill cohort retention risk assessment with targeted intervention recommendations" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-rose-400 mb-4" />
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
                { title: "Proactive Intervention", desc: "Early warning system flagging at-risk employees for retention conversations before they begin job searches" },
                { title: "Benefit Investment ROI", desc: "Cost-benefit analysis showing retention impact of benefit enhancements versus replacement costs" },
                { title: "Market Positioning", desc: "Competitive gap identification for recruiting and retention with quantified financial impact" },
                { title: "Succession Planning", desc: "Critical role retention risk assessment for leadership pipeline and knowledge transfer planning" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-rose-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-rose-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Analyze Retention Risk</h2>
            <p className="text-gray-300 mb-8">Predict and prevent employee turnover</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-rose-500/50 transform hover:scale-105 transition-all duration-300">
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