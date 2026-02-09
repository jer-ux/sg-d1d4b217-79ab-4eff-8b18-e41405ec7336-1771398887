import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, DollarSign, BarChart3, Brain, Zap, Target, CheckCircle2, ArrowRight, Sparkles, Award, Activity } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PremiumCalculation() {
  const features = [
    {
      icon: Brain,
      title: "Intelligent Pricing Algorithms",
      description: "AI-powered pricing engine analyzes 300+ variables to optimize premium rates while maintaining competitive positioning and regulatory compliance.",
      metrics: ["300+ Variables", "98.7% Accuracy", "Real-time Adjustments"],
    },
    {
      icon: BarChart3,
      title: "Competitive Rate Analysis",
      description: "Continuous market benchmarking ensures your rates remain competitive while maximizing profitability across all product lines.",
      metrics: ["Market Intelligence", "Rate Optimization", "Margin Protection"],
    },
    {
      icon: Activity,
      title: "Risk-Based Pricing",
      description: "Sophisticated underwriting models segment populations into 15 risk bands, enabling precise premium calculation and loss ratio management.",
      metrics: ["15 Risk Bands", "Loss Ratio Control", "Actuarial Precision"],
    },
    {
      icon: Target,
      title: "Dynamic Rate Adjustments",
      description: "Automated rate updates respond to claims trends, utilization patterns, and market conditions in real-time.",
      metrics: ["Automated Updates", "Trend Response", "Market Adaptation"],
    },
    {
      icon: DollarSign,
      title: "Revenue Optimization",
      description: "Advanced analytics identify underpriced segments and optimize rate structures to maximize revenue without sacrificing competitiveness.",
      metrics: ["$6.2M Revenue Gain", "Margin Improvement", "Growth Acceleration"],
    },
    {
      icon: Zap,
      title: "Regulatory Compliance",
      description: "Built-in compliance checks ensure all rate filings meet state and federal requirements with automated documentation.",
      metrics: ["50-State Compliance", "Automated Filings", "Regulatory Updates"],
    },
  ];

  return (
    <>
      <SEO
        title="Premium Calculation Solutions | Kincaid IQ"
        description="Intelligent pricing algorithms that optimize revenue with 98.7% accuracy and $6.2M annual gains."
        image="/og-image.png"
      />
      <div className="min-h-screen bg-black text-white">
        <Nav />

        <main className="pt-32 pb-20">
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-purple-500/20 border border-purple-500/30 mb-6">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Premium Calculation</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Precision Pricing
                  <br />
                  That Maximizes Revenue
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  AI-powered pricing algorithms analyze 300+ variables to optimize premiums,
                  delivering 98.7% accuracy and $6.2M in revenue optimization
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
                  >
                    <Sparkles className="w-5 h-5" />
                    Request Demo
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>

          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-purple-500/50 transition-all group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-blue-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-blue-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>

                      <p className="text-gray-400 mb-6">{feature.description}</p>

                      <div className="space-y-2">
                        {feature.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span className="text-gray-300">{metric}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 mb-20">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-3xl bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 border border-blue-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Return on Investment</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-400 mb-2">524%</div>
                    <div className="text-gray-400">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400 mb-2">$6.2M</div>
                    <div className="text-gray-400">Revenue Gain</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-cyan-400 mb-2">98.7%</div>
                    <div className="text-gray-400">Pricing Accuracy</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Premium Calculation achieve significant revenue optimization
                  while maintaining competitive market positioning
                </p>
              </motion.div>
            </div>
          </section>

          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Optimize Your Pricing Strategy?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading insurers leveraging Kincaid IQ for precision premium calculation
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
                  >
                    <Sparkles className="w-6 h-6" />
                    Schedule Consultation
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}