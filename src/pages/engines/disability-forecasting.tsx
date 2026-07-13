import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, CheckCircle2, ArrowRight, TrendingUp, AlertTriangle, BarChart3 } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function DisabilityForecastingEngine() {
  return (
    <>
      <SEO
        title="Disability Forecasting | Kincaid IQ"
        description="Short-term and long-term disability prediction modeling for workforce planning and benefits budgeting."
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
                <span className="text-indigo-300 text-sm font-medium">Workforce & Human Capital</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                Disability Forecasting
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Predictive modeling of short-term and long-term disability incidence rates, duration patterns, and return-to-work probability for workforce planning and benefits reserve management.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Risk Management</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Workforce Planning</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Incidence Forecasts</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Forecasting Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: AlertTriangle, title: "Incidence Prediction", desc: "Claims rate forecasting by condition, age, gender, and occupational hazard exposure levels" },
                { icon: TrendingUp, title: "Duration Modeling", desc: "Expected disability length prediction based on diagnosis, treatment protocol, and job physical requirements" },
                { icon: BarChart3, title: "Return-to-Work Analysis", desc: "Probability scoring for successful return using clinical, vocational, and accommodation factors" },
                { icon: Shield, title: "Reserve Requirements", desc: "Actuarial calculation of liability reserves for self-insured disability programs" }
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
                { title: "Budget Planning", desc: "Multi-year disability cost projections for self-insured programs and insurance premium negotiations" },
                { title: "Staffing Contingencies", desc: "Workforce capacity planning incorporating predicted absence rates and temporary replacement needs" },
                { title: "Program Design", desc: "Benefit structure optimization balancing coverage generosity with cost control and return-to-work incentives" },
                { title: "Intervention Targeting", desc: "Early intervention program development for high-risk diagnoses showing longest average durations" }
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
            <h2 className="text-3xl font-bold text-white mb-6">Forecast Disability Costs</h2>
            <p className="text-gray-300 mb-8">Predict workforce absence and financial impact</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-indigo-500/50 transform hover:scale-105 transition-all duration-300">
              Request Forecast
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}