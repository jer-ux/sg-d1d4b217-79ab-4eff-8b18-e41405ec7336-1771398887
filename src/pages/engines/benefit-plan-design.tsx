import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, CheckCircle2, ArrowRight, Target, TrendingUp, Users2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function BenefitPlanDesignEngine() {
  return (
    <>
      <SEO
        title="Benefit Plan Design Optimization | Kincaid IQ"
        description="Actuarial modeling and simulation for plan design strategy including cost-sharing structures, deductibles, and out-of-pocket limits."
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
                <Layers className="w-4 h-4 text-teal-400" />
                <span className="text-teal-300 text-sm font-medium">Workforce & Human Capital</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-cyan-400 text-transparent bg-clip-text">
                Benefit Plan Design Optimization
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Advanced actuarial modeling for cost-sharing strategy, plan tier construction, and design element optimization balancing employer costs with employee value perception.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Strategic Design</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Plan Optimization</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Design Models</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12">Optimization Framework</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { icon: Target, title: "Cost-Sharing Strategy", desc: "Actuarial analysis of deductible, copay, and coinsurance structures showing member cost burden distribution" },
                { icon: Layers, title: "Tier Construction", desc: "Multi-tier plan design optimization balancing choice, anti-selection risk, and administrative simplicity" },
                { icon: TrendingUp, title: "Value Perception", desc: "Employee survey linkage showing which design elements drive satisfaction versus actual utilization patterns" },
                { icon: Users2, title: "Behavioral Modeling", desc: "Utilization response prediction for design changes incorporating price elasticity and care-seeking behavior" }
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
                { title: "Annual Open Enrollment", desc: "Plan refresh strategy with actuarial projections showing cost and utilization impact of design changes" },
                { title: "Cost Control", desc: "Member cost-sharing optimization balancing budget targets with access preservation and satisfaction" },
                { title: "Consumerism", desc: "HDHP and account-based plan modeling showing savings potential and population suitability analysis" },
                { title: "Regulatory Compliance", desc: "ACA compliance verification for actuarial value, out-of-pocket limits, and essential health benefit coverage" }
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
            <h2 className="text-3xl font-bold text-white mb-6">Optimize Plan Design</h2>
            <p className="text-gray-300 mb-8">Balance cost control with employee value</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-teal-500/50 transform hover:scale-105 transition-all duration-300">
              Request Optimization
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}