import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserX, CheckCircle2, ArrowRight, TrendingDown, AlertCircle, Target } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function MemberChurnPredictionEngine() {
  return (
    <>
      <SEO
        title="Member Churn Prediction | Kincaid IQ"
        description="Predictive analytics identifying members likely to disenroll, quantifying churn drivers, and targeting retention interventions."
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
                <UserX className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm font-medium">Predictive AI</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-400 to-orange-400 text-transparent bg-clip-text">
                Member Churn Prediction
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Advanced analytics identifying members at risk of disenrollment with causal driver analysis and targeted retention strategy recommendations.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Predictive AI</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Retention</div>
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
            <h2 className="text-3xl font-bold text-white mb-12">Prediction Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: TrendingDown, title: "Engagement Monitoring", desc: "Utilization patterns, customer service contacts, portal logins, and satisfaction survey responses as churn indicators" },
                { icon: AlertCircle, title: "Risk Scoring", desc: "Individual member churn probability incorporating tenure, claims experience, competitive plan options, and life events" },
                { icon: Target, title: "Driver Analysis", desc: "Statistical identification of controllable churn factors — network gaps, benefit design issues, service failures" },
                { icon: UserX, title: "Intervention Targeting", desc: "Prioritized retention outreach with personalized messaging based on predicted churn drivers" }
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
                { title: "Proactive Retention", desc: "Early warning system flagging at-risk members for engagement campaigns before they disenroll" },
                { title: "Root Cause Analysis", desc: "Identification of systemic issues driving voluntary churn — network adequacy gaps, benefit design weaknesses" },
                { title: "Value Preservation", desc: "Lifetime value calculation for retention investment decisions showing break-even intervention costs" },
                { title: "Competitive Intelligence", desc: "Comparison of retention drivers versus peer plans informing strategic positioning and benefit enhancements" }
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
            <h2 className="text-3xl font-bold text-white mb-6">Predict Member Churn</h2>
            <p className="text-gray-300 mb-8">Retain members before they leave</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-red-500/50 transform hover:scale-105 transition-all duration-300">
              Request Prediction
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}