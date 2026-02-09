import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, AlertTriangle, TrendingUp, BarChart3, Brain, Database, Lock, Zap, CheckCircle2, ArrowRight, Sparkles, Target, Award, DollarSign } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function RiskAssessment() {
  const features = [
    {
      icon: Brain,
      title: "Predictive Risk Modeling",
      description: "Advanced ML algorithms analyze 500+ risk factors in real-time, predicting potential losses with 99.2% accuracy across all benefit plans.",
      metrics: ["500+ Risk Factors", "99.2% Prediction Accuracy", "Real-time Analysis"],
    },
    {
      icon: AlertTriangle,
      title: "Early Warning System",
      description: "Proactive alerts identify emerging risks 45-90 days before they materialize, enabling preventive action and loss mitigation.",
      metrics: ["45-90 Day Lead Time", "95% Alert Accuracy", "Automated Escalation"],
    },
    {
      icon: Database,
      title: "Historical Claims Analysis",
      description: "Deep analysis of 10+ years of claims data reveals patterns, trends, and anomalies that traditional methods miss.",
      metrics: ["10+ Years Data", "98.7% Pattern Detection", "Trend Forecasting"],
    },
    {
      icon: Target,
      title: "Risk Stratification",
      description: "Sophisticated segmentation categorizes members into 12 risk tiers, enabling targeted interventions and personalized care management.",
      metrics: ["12 Risk Tiers", "Personalized Interventions", "Care Coordination"],
    },
    {
      icon: TrendingUp,
      title: "Loss Prevention Programs",
      description: "Data-driven prevention strategies reduce high-risk events by 34%, leveraging predictive analytics and member engagement.",
      metrics: ["34% Risk Reduction", "$8.4M Loss Prevention", "Member Engagement"],
    },
    {
      icon: Lock,
      title: "Compliance Risk Monitoring",
      description: "Continuous monitoring ensures adherence to ERISA, ACA, HIPAA, and state regulations with automated compliance reporting.",
      metrics: ["100% Compliance Rate", "Automated Reporting", "Regulatory Updates"],
    },
  ];

  const problems = [
    "Reactive risk management that only identifies issues after they occur",
    "Limited visibility into emerging risk factors and trends",
    "Manual data analysis that misses complex patterns and correlations",
    "Inability to predict high-cost claims before they materialize",
    "Fragmented data across multiple systems preventing holistic analysis",
    "Compliance risks from incomplete or delayed regulatory reporting",
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "$8.4M Annual Loss Prevention",
      description: "Proactive risk identification prevents high-cost claims before they occur",
    },
    {
      icon: Target,
      title: "99.2% Prediction Accuracy",
      description: "ML models deliver industry-leading accuracy in risk forecasting",
    },
    {
      icon: Zap,
      title: "45-90 Day Early Warning",
      description: "Identify and address risks months before they impact your bottom line",
    },
    {
      icon: Award,
      title: "100% Compliance",
      description: "Automated monitoring ensures continuous regulatory adherence",
    },
  ];

  return (
    <>
      <SEO
        title="Advanced Risk Assessment Solutions | Kincaid IQ"
        description="Predictive risk modeling and loss prevention for employee benefits with 99.2% accuracy and $8.4M annual savings."
        image="/og-image.png"
      />
      <div className="min-h-screen bg-black text-white">
        <Nav />

        <main className="pt-32 pb-20">
          {/* Hero Section */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-pink-500/20 border border-pink-500/30 mb-6">
                  <Shield className="w-5 h-5 text-pink-400" />
                  <span className="text-pink-400 font-semibold">Advanced Risk Assessment</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Predict & Prevent Risk
                  <br />
                  Before It Costs You Millions
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Advanced predictive modeling powered by AI analyzes 500+ risk factors in real-time,
                  preventing losses before they occur with 99.2% accuracy
                </p>

                <div className="flex flex-wrap gap-6 justify-center">
                  <Link href="/request-demo">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white font-semibold text-lg flex items-center gap-2"
                    >
                      <Sparkles className="w-5 h-5" />
                      Request Demo
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Problem Section */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">The Risk Management Challenge</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Traditional risk assessment is reactive, fragmented, and fails to predict emerging threats
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {problems.map((problem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-xl bg-red-500/10 border border-red-500/30"
                  >
                    <AlertTriangle className="w-6 h-6 text-red-400 mb-3" />
                    <p className="text-gray-300">{problem}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Kincaid IQ Solution</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Comprehensive risk assessment platform that predicts, prevents, and mitigates losses
                </p>
              </motion.div>

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
                      <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-purple-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-purple-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
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

          {/* Business Impact */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Measurable Business Impact</h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Proven results that drive bottom-line value and operational excellence
                </p>
              </motion.div>

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

          {/* ROI Section */}
          <section className="px-4 mb-20">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-3xl bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 border border-purple-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Return on Investment</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-pink-400 mb-2">487%</div>
                    <div className="text-gray-400">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-400 mb-2">$8.4M</div>
                    <div className="text-gray-400">Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-blue-400 mb-2">6 Months</div>
                    <div className="text-gray-400">Payback Period</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Risk Assessment achieve measurable results within months,
                  with continued value accumulation year over year
                </p>
              </motion.div>
            </div>
          </section>

          {/* CTA */}
          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Transform Your Risk Management?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join 500+ organizations leveraging Kincaid IQ for predictive risk assessment
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
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