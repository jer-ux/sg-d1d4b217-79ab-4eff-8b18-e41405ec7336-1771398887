import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, CheckCircle2, ArrowRight, TrendingUp, Heart, Users } from "lucide-react";
import { SEO } from "@/components/SEO";
import Footer from "@/components/Footer";

export default function BehavioralHealthUtilizationEngine() {
  return (
    <>
      <SEO
        title="Behavioral Health Utilization | Kincaid IQ"
        description="Mental health and substance use disorder utilization pattern analysis for program design and capacity planning."
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <Link href="/engines" className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-8 group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Engines
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-2 mb-6">
                <Brain className="w-4 h-4 text-violet-400" />
                <span className="text-violet-300 text-sm font-medium">Workforce & Human Capital</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text">
                Behavioral Health Utilization
              </h1>

              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Mental health and substance use disorder utilization pattern analysis revealing access barriers, treatment gaps, and unmet demand for evidence-based program design.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Category</div>
                  <div className="text-white font-semibold">Clinical Analytics</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Use Case</div>
                  <div className="text-white font-semibold">Program Development</div>
                </div>
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2">
                  <div className="text-sm text-gray-400">Output</div>
                  <div className="text-white font-semibold">Access Reports</div>
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
                { icon: Brain, title: "Condition Prevalence", desc: "Population-level diagnosis rates for depression, anxiety, PTSD, bipolar disorder, and substance use disorders" },
                { icon: TrendingUp, title: "Treatment Patterns", desc: "Medication adherence, therapy session frequency, and modality mix (in-person, teletherapy, digital therapeutics)" },
                { icon: Heart, title: "Comorbidity Impact", desc: "Medical cost differential for members with behavioral health conditions versus matched controls" },
                { icon: Users, title: "Access Metrics", desc: "Wait times, provider availability, network adequacy assessment, and stigma-barrier quantification" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
                >
                  <item.icon className="w-8 h-8 text-violet-400 mb-4" />
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
                { title: "EAP Optimization", desc: "Evidence-based program design showing which services drive engagement and clinical outcomes" },
                { title: "Network Strategy", desc: "Provider contracting priorities based on workforce needs, specialty gaps, and modality preferences" },
                { title: "Benefit Structure", desc: "Cost-sharing optimization balancing affordability with appropriate utilization incentives" },
                { title: "Integrated Care", desc: "Coordination improvement between medical and behavioral providers to address total health costs" }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-violet-500/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-violet-400 flex-shrink-0 mt-1" />
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
            <h2 className="text-3xl font-bold text-white mb-6">Analyze Behavioral Health</h2>
            <p className="text-gray-300 mb-8">Understand mental health utilization patterns</p>
            <Link href="/request-demo" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white px-8 py-4 rounded-xl font-bold shadow-2xl shadow-violet-500/50 transform hover:scale-105 transition-all duration-300">
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