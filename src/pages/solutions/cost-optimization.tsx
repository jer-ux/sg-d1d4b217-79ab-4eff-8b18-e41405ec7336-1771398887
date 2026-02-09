import { motion } from "framer-motion";
import Link from "next/link";
import { DollarSign, TrendingDown, Target, Zap, LineChart, FileText, CheckCircle2, ArrowRight, Sparkles, Award, Users, Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function CostOptimization() {
  const features = [
    {
      icon: TrendingDown,
      title: "Waste Identification",
      description: "AI-powered analysis identifying medical cost waste, administrative inefficiencies, and utilization anomalies with precision targeting of savings opportunities.",
      metrics: ["23% Average Savings", "Real-time Detection", "Zero False Positives"],
    },
    {
      icon: Target,
      title: "Targeted Interventions",
      description: "Data-driven intervention strategies addressing high-cost claimants, preventable admissions, and inappropriate utilization with measurable outcomes.",
      metrics: ["87% Success Rate", "Proactive Outreach", "Care Coordination"],
    },
    {
      icon: LineChart,
      title: "Trend Analysis",
      description: "Predictive modeling forecasting cost trends, identifying emerging risks, and enabling proactive plan adjustments before costs escalate.",
      metrics: ["18-Month Forecast", "Risk Scoring", "Early Warnings"],
    },
    {
      icon: Shield,
      title: "Vendor Performance",
      description: "Comprehensive vendor evaluation tracking performance against SLAs, identifying underperforming relationships, and optimizing vendor mix.",
      metrics: ["Real-time Tracking", "SLA Monitoring", "Cost-Benefit Analysis"],
    },
    {
      icon: Zap,
      title: "Automation Opportunities",
      description: "Process mining identifying manual workflows, repetitive tasks, and automation candidates reducing administrative overhead significantly.",
      metrics: ["65% Admin Reduction", "Process Mining", "ROI Modeling"],
    },
    {
      icon: FileText,
      title: "Contract Optimization",
      description: "Intelligent contract analysis identifying favorable terms, negotiation opportunities, and ensuring vendors deliver contracted value.",
      metrics: ["Contract Intelligence", "Negotiation Support", "Value Tracking"],
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "$18.4M Average Savings",
      description: "Typical mid-size employer annual cost reduction",
    },
    {
      icon: TrendingDown,
      title: "23% Cost Reduction",
      description: "Average percentage decrease in healthcare spend",
    },
    {
      icon: Users,
      title: "Zero Member Impact",
      description: "Savings achieved without reducing benefits or access",
    },
    {
      icon: Award,
      title: "847% Average ROI",
      description: "Return on investment from platform implementation",
    },
  ];

  return (
    <>
      <SEO
        title="Cost Optimization Solutions | Kincaid IQ"
        description="AI-powered cost optimization achieving 23% average reduction ($18.4M savings) with zero member impact through waste identification and targeted interventions."
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
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/30 mb-6">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Cost Optimization</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 bg-clip-text text-transparent">
                  Optimize Healthcare Costs
                  <br />
                  Without Compromising Care
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  AI-powered cost optimization achieving 23% average reduction ($18.4M savings)
                  with zero member impact through intelligent waste identification and targeted interventions
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
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
                      className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-emerald-500/50 transition-all group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-green-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-green-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-green-400 transition-colors">
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
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/30"
                    >
                      <Icon className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-3 text-emerald-400">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.description}</p>
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
                className="p-12 rounded-3xl bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-teal-500/20 border border-green-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Cost Optimization Performance</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-emerald-400 mb-2">$18.4M</div>
                    <div className="text-gray-400">Average Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-400 mb-2">23%</div>
                    <div className="text-gray-400">Cost Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-teal-400 mb-2">847%</div>
                    <div className="text-gray-400">Average ROI</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Cost Optimization achieve substantial savings
                  while maintaining or improving member satisfaction and quality of care
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
                  Ready to Optimize Your Healthcare Costs?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading organizations leveraging Kincaid IQ for intelligent cost optimization
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
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