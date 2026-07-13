import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users2, CheckCircle2, ArrowRight, TrendingUp, BarChart3, Globe } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function WorkforceDemographicsEngine() {
  return (
    <>
      <SEO
        title="Workforce Demographics Analysis | Kincaid IQ"
        description="Age, gender, and generational cohort analysis linking demographics to utilization patterns, cost trends, and benefit program effectiveness."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-6">
                <Users2 className="w-4 h-4 text-cyan-400" />
                <span className="text-cyan-300 text-sm font-medium">Workforce & Human Capital</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">
                Workforce Demographics Analysis
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Comprehensive age, gender, and generational cohort analysis revealing demographic drivers of utilization patterns, cost trends, and benefit program engagement rates.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Population Analytics</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Strategic Planning</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Cohort Insights</div>
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
                { icon: Users2, title: "Cohort Segmentation", desc: "Gen Z, Millennial, Gen X, and Boomer utilization profiles showing distinct healthcare consumption patterns" },
                { icon: TrendingUp, title: "Lifecycle Modeling", desc: "Predictive cost trajectory as workforce ages, incorporating retirement timing and succession planning" },
                { icon: BarChart3, title: "Gender Analysis", desc: "Utilization and cost differences by gender including reproductive health, preventive care, and chronic disease prevalence" },
                { icon: Globe, title: "Generational Preferences", desc: "Benefit program engagement analysis showing digital health, telemedicine, and wellness adoption by cohort" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-cyan-400 mb-4" />
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
                { title: "Multi-Year Budget Planning", desc: "Forward-looking cost projections incorporating known demographic shifts and retirement schedules" },
                { title: "Benefit Portfolio Optimization", desc: "Program mix tailored to workforce composition, balancing family coverage needs with individual preferences" },
                { title: "Communication Strategy", desc: "Channel selection and messaging customization by generational preferences and digital literacy" },
                { title: "Recruitment Competitiveness", desc: "Market positioning insights showing benefit expectations by cohort and competitive advantage assessment" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Analyze Workforce Demographics</h2>
            <p className="text-gray-300 mb-8">Understand demographic drivers of benefit costs</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300">
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