import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Zap, Cpu, ArrowRight, CheckCircle2, Target, TrendingUp, Activity, Sparkles, Bot, LineChart, Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function AIAutomation() {
  const aiMetrics = [
    { label: "Process Automation", value: "87%", icon: Zap },
    { label: "Error Reduction", value: "94%", icon: CheckCircle2 },
    { label: "Time Saved", value: "15K hrs/yr", icon: TrendingUp },
    { label: "AI Accuracy", value: "98.7%", icon: Target },
  ];

  return (
    <>
      <SEO
        title="AI Automation & Machine Learning | SiriusB iQ"
        description="Transform benefit administration with 87% process automation, 94% error reduction, and 98.7% AI accuracy through advanced machine learning solutions."
      />
      <div className="min-h-screen bg-black text-white">
        <Nav />

        <main className="pt-24 pb-20">
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <Link href="/actuarial-benefits" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Solutions
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-purple-500/30">
                      <Brain className="w-12 h-12 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-purple-400 font-semibold mb-1">Intelligent Automation</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
                        AI & Machine Learning
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    Leverage cutting-edge artificial intelligence and machine learning to automate complex processes, predict outcomes, and optimize benefit program performance.
                  </p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {aiMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-purple-400 mb-3" />
                      <div className="text-3xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="p-12 rounded-3xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-purple-500/30">
                <Brain className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Automate Your Benefit Operations
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Discover AI-powered solutions tailored to your workflow
                </p>
                <Link href="/request-demo">
                  <button className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto hover:scale-105 transition-transform">
                    Explore AI Automation
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}