import { motion } from "framer-motion";
import Link from "next/link";
import { Layout, Users, TrendingUp, Target, BarChart3, Lightbulb, CheckCircle2, ArrowRight, Sparkles, Award, DollarSign, Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PlanDesign() {
  const features = [
    {
      icon: Layout,
      title: "Benefit Structure Optimization",
      description: "Data-driven plan design recommendations balancing member value, cost efficiency, and competitive positioning using advanced analytics and benchmarking.",
      metrics: ["Market Intelligence", "Cost Modeling", "Member Preferences"],
    },
    {
      icon: Target,
      title: "Network Configuration",
      description: "Strategic network design optimizing provider mix, access requirements, and cost containment while maintaining quality standards and member satisfaction.",
      metrics: ["Network Adequacy", "Quality Metrics", "Cost Analysis"],
    },
    {
      icon: TrendingUp,
      title: "Scenario Modeling",
      description: "Interactive modeling tools simulating plan changes, cost impacts, and member behaviors enabling informed decision-making with predictive accuracy.",
      metrics: ["What-If Analysis", "Impact Forecasting", "Risk Assessment"],
    },
    {
      icon: Users,
      title: "Member Segmentation",
      description: "Sophisticated segmentation analysis identifying diverse population needs enabling targeted plan designs serving different demographic cohorts effectively.",
      metrics: ["Demographic Analysis", "Utilization Patterns", "Preference Mapping"],
    },
    {
      icon: Lightbulb,
      title: "Innovation Integration",
      description: "Evaluation and integration of emerging benefits trends including telehealth, mental health, fertility, and wellness programs with ROI projections.",
      metrics: ["Trend Analysis", "Innovation Pipeline", "Adoption Modeling"],
    },
    {
      icon: BarChart3,
      title: "Competitive Intelligence",
      description: "Real-time market intelligence tracking competitor offerings, industry trends, and regulatory changes informing strategic plan positioning.",
      metrics: ["Market Benchmarks", "Trend Tracking", "Regulatory Monitoring"],
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "18% Cost Savings",
      description: "Average reduction through optimized plan design",
    },
    {
      icon: Users,
      title: "92% Satisfaction",
      description: "Member satisfaction with redesigned benefits",
    },
    {
      icon: Target,
      title: "Top Quartile",
      description: "Competitive positioning in talent markets",
    },
    {
      icon: Award,
      title: "623% Average ROI",
      description: "Return from strategic plan optimization",
    },
  ];

  return (
    <>
      <SEO
        title="Plan Design Optimization | Kincaid IQ"
        description="Data-driven benefit structure optimization achieving 18% cost savings while improving member satisfaction to 92%."
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
                  <Layout className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-semibold">Plan Design</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent">
                  Design Benefits That
                  <br />
                  Drive Value & Satisfaction
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Data-driven plan design optimization achieving 18% cost savings
                  while improving member satisfaction to 92% through intelligent structure and positioning
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
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
                      <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-pink-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-pink-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-pink-400 transition-colors">
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
                      className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30"
                    >
                      <Icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-3 text-purple-400">{benefit.title}</h3>
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
                className="p-12 rounded-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 border border-pink-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Plan Design Performance</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-400 mb-2">18%</div>
                    <div className="text-gray-400">Cost Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-pink-400 mb-2">92%</div>
                    <div className="text-gray-400">Member Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-rose-400 mb-2">623%</div>
                    <div className="text-gray-400">Average ROI</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Plan Design achieve optimal balance between
                  cost efficiency, member value, and competitive positioning in talent markets
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
                  Ready to Optimize Your Plan Design?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading organizations leveraging Kincaid IQ for strategic benefit design
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
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