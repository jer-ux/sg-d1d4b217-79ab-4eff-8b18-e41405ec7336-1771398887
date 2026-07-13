import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, ArrowRight, TrendingDown, Users, BarChart3 } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function PresenteeismImpactEngine() {
  return (
    <>
      <SEO
        title="Presenteeism Impact Analysis | Kincaid IQ"
        description="Quantification of productivity loss from employees working while sick, linking health conditions to performance degradation and economic impact."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
                <Activity className="w-4 h-4 text-orange-400" />
                <span className="text-orange-300 text-sm font-medium">Workforce & Human Capital</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-amber-400 text-transparent bg-clip-text">
                Presenteeism Impact Analysis
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Quantification of productivity loss from employees working while sick, linking specific health conditions to measurable performance degradation and calculating total economic impact on organizational output.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Workforce Analytics</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Productivity Modeling</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Economic Impact Reports</div>
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
                { icon: TrendingDown, title: "Condition-Specific Impact", desc: "Productivity loss quantification by diagnosis including chronic pain, mental health, allergies, and infectious disease" },
                { icon: BarChart3, title: "Performance Metrics", desc: "Correlation of health status with quality metrics, error rates, customer satisfaction, and output volume" },
                { icon: Users, title: "Population Modeling", desc: "Segmentation by role, department, and compensation to calculate total economic burden" },
                { icon: Activity, title: "Intervention ROI", desc: "Predicted productivity gains from condition management programs and preventive care investments" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-orange-400 mb-4" />
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
                { title: "Benefit Design Optimization", desc: "Data-driven selection of condition management programs based on productivity impact, not just medical cost" },
                { title: "Workplace Accommodation", desc: "Quantified business case for flexible work arrangements, ergonomic improvements, and mental health support" },
                { title: "Wellness Program Targeting", desc: "Prioritization of interventions addressing conditions with highest presenteeism burden" },
                { title: "EBITDA Impact Reporting", desc: "Executive-level articulation of workforce health's effect on operational performance and profitability" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Quantify Presenteeism Impact</h2>
            <p className="text-gray-300 mb-8">Measure productivity loss from health conditions</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-orange-500/50 transform hover:scale-105 transition-all duration-300">
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