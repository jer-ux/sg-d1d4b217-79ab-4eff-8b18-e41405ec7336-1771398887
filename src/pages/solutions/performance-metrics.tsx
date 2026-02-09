import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, Target, TrendingUp, Zap, LineChart, Award, CheckCircle2, ArrowRight, Sparkles, DollarSign, Users, Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function PerformanceMetrics() {
  const features = [
    {
      icon: BarChart3,
      title: "Comprehensive KPI Framework",
      description: "Industry-standard metrics spanning utilization, cost, quality, satisfaction, and operational efficiency with benchmarking against peer organizations.",
      metrics: ["150+ Standard KPIs", "Peer Benchmarking", "Custom Metrics"],
    },
    {
      icon: Target,
      title: "Goal Setting & Tracking",
      description: "Intelligent goal-setting framework with historical baseline analysis, stretch targets, and automated tracking against objectives with variance analysis.",
      metrics: ["Smart Goals", "Progress Tracking", "Variance Analysis"],
    },
    {
      icon: TrendingUp,
      title: "Trend Analysis Engine",
      description: "Sophisticated time-series analysis identifying positive and negative trends, seasonality patterns, and inflection points requiring attention.",
      metrics: ["Trend Detection", "Seasonality Analysis", "Anomaly Detection"],
    },
    {
      icon: Zap,
      title: "Real-Time Dashboards",
      description: "Executive dashboards with drill-down capabilities providing real-time visibility into all performance metrics with customizable views by role.",
      metrics: ["Real-time Updates", "Drill-Down Analysis", "Role-Based Views"],
    },
    {
      icon: LineChart,
      title: "Predictive Analytics",
      description: "Machine learning models forecasting future performance across key metrics enabling proactive management and resource allocation.",
      metrics: ["ML Forecasting", "Resource Planning", "Risk Identification"],
    },
    {
      icon: Award,
      title: "Benchmarking Intelligence",
      description: "Comprehensive benchmarking against industry standards, peer organizations, and best-in-class performers revealing improvement opportunities.",
      metrics: ["Industry Standards", "Peer Comparison", "Best Practices"],
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "98% Goal Achievement",
      description: "Organizations meeting or exceeding performance targets",
    },
    {
      icon: Zap,
      title: "Real-Time Visibility",
      description: "Instant access to all key performance indicators",
    },
    {
      icon: TrendingUp,
      title: "34% Faster Decisions",
      description: "Accelerated decision-making through data visibility",
    },
    {
      icon: Award,
      title: "Top Quartile",
      description: "Performance positioning in industry benchmarks",
    },
  ];

  return (
    <>
      <SEO
        title="Performance Metrics & KPIs | Kincaid IQ"
        description="Comprehensive KPI framework with 150+ standard metrics achieving 98% goal achievement and top quartile industry performance."
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
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
                  <BarChart3 className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-semibold">Performance Metrics</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                  Measure What Matters
                  <br />
                  Drive Performance Excellence
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Comprehensive KPI framework with 150+ standard metrics achieving
                  98% goal achievement and top quartile industry performance positioning
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
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
                      className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-blue-500/50 transition-all group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-indigo-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-indigo-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
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
                      className="text-center p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30"
                    >
                      <Icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-3 text-blue-400">{benefit.title}</h3>
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
                className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 border border-indigo-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Performance Outcomes</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400 mb-2">98%</div>
                    <div className="text-gray-400">Goal Achievement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-indigo-400 mb-2">34%</div>
                    <div className="text-gray-400">Faster Decisions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-400 mb-2">Top 25%</div>
                    <div className="text-gray-400">Industry Ranking</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Performance Metrics achieve exceptional results
                  through comprehensive measurement, intelligent goal-setting, and continuous improvement
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
                  Ready to Drive Performance Excellence?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading organizations leveraging Kincaid IQ for comprehensive performance management
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
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