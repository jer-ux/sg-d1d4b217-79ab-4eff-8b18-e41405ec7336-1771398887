import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingDown, BarChart3, Target, AlertTriangle, DollarSign, LineChart, CheckCircle2, ArrowRight, Sparkles, Award, Shield, Zap } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function LossRatioAnalysis() {
  const features = [
    {
      icon: BarChart3,
      title: "Real-Time Loss Ratio Monitoring",
      description: "Continuous tracking of medical and administrative loss ratios with automated alerts when thresholds are breached, enabling proactive intervention before margins erode.",
      metrics: ["Real-time Dashboards", "Automated Alerts", "Threshold Management"],
    },
    {
      icon: Target,
      title: "Predictive Loss Modeling",
      description: "Advanced machine learning algorithms forecasting loss ratio trends 12-18 months ahead based on claims patterns, demographics, and market conditions.",
      metrics: ["18-Month Forecast", "Scenario Analysis", "Confidence Intervals"],
    },
    {
      icon: TrendingDown,
      title: "Adverse Selection Detection",
      description: "Sophisticated algorithms identifying adverse selection patterns across products, demographics, and distribution channels with root cause analysis.",
      metrics: ["Pattern Recognition", "Root Cause Analysis", "Risk Segmentation"],
    },
    {
      icon: AlertTriangle,
      title: "Early Warning System",
      description: "Multi-layered alerting system detecting emerging trends, unusual claim patterns, and loss ratio deterioration before financial impact materializes.",
      metrics: ["Multi-Level Alerts", "Trend Detection", "Impact Forecasting"],
    },
    {
      icon: LineChart,
      title: "Cohort Analysis",
      description: "Granular loss ratio analysis across policy cohorts, underwriting vintages, and product lines revealing profitability drivers and risk factors.",
      metrics: ["Cohort Tracking", "Vintage Analysis", "Driver Identification"],
    },
    {
      icon: DollarSign,
      title: "Pricing Impact Analysis",
      description: "Quantitative assessment linking loss ratio performance to pricing adequacy, identifying underpriced segments and profitable niches.",
      metrics: ["Pricing Adequacy", "Segment Analysis", "Rate Optimization"],
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "94.3% Accuracy",
      description: "Loss ratio prediction accuracy within 2% variance",
    },
    {
      icon: Shield,
      title: "45-Day Lead Time",
      description: "Average advance warning before loss ratio deterioration",
    },
    {
      icon: DollarSign,
      title: "$12.8M Savings",
      description: "Average annual losses prevented through early intervention",
    },
    {
      icon: Award,
      title: "723% Average ROI",
      description: "Return on investment from loss ratio optimization",
    },
  ];

  return (
    <>
      <SEO
        title="Loss Ratio Analysis | Kincaid IQ"
        description="Real-time loss ratio monitoring with 94.3% predictive accuracy, 45-day lead time, and $12.8M average savings through early intervention."
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
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-semibold">Loss Ratio Analysis</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  Master Loss Ratios
                  <br />
                  With Predictive Intelligence
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Real-time loss ratio monitoring achieving 94.3% predictive accuracy
                  with 45-day advance warning preventing $12.8M in average annual losses
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
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
                      className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-red-500/50 transition-all group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-orange-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-orange-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
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
                      className="text-center p-8 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30"
                    >
                      <Icon className="w-12 h-12 text-red-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-3 text-red-400">{benefit.title}</h3>
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
                className="p-12 rounded-3xl bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 border border-orange-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Loss Ratio Performance</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-red-400 mb-2">94.3%</div>
                    <div className="text-gray-400">Prediction Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-orange-400 mb-2">45-Day</div>
                    <div className="text-gray-400">Lead Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-yellow-400 mb-2">$12.8M</div>
                    <div className="text-gray-400">Losses Prevented</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Loss Ratio Analysis achieve superior predictive accuracy
                  enabling proactive intervention before margins erode significantly
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
                  Ready to Optimize Your Loss Ratios?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading organizations leveraging Kincaid IQ for predictive loss ratio management
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
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