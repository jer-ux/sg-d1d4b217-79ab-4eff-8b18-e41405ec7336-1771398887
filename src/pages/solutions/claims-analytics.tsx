import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, Brain, Clock, Shield, Zap, TrendingDown, CheckCircle2, ArrowRight, Sparkles, Award, DollarSign, AlertTriangle } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function ClaimsAnalytics() {
  const features = [
    {
      icon: Zap,
      title: "Real-Time Claims Processing",
      description: "Automated adjudication engine processes claims in milliseconds with intelligent routing, auto-adjudication rules, and exception management.",
      metrics: ["24hr Processing", "94% Auto-Adjudication", "Real-time Status"],
    },
    {
      icon: Brain,
      title: "AI-Powered Fraud Detection",
      description: "Machine learning models analyze patterns across 200+ fraud indicators, flagging suspicious claims with 97.4% accuracy before payment.",
      metrics: ["$4.2M Fraud Prevention", "97.4% Detection Rate", "Pattern Recognition"],
    },
    {
      icon: TrendingDown,
      title: "Cost Containment Analytics",
      description: "Advanced analytics identify billing errors, duplicate claims, upcoding, and unbundling opportunities reducing overpayments by 23%.",
      metrics: ["23% Overpayment Reduction", "Error Detection", "Cost Recovery"],
    },
    {
      icon: Shield,
      title: "Claims Audit & Compliance",
      description: "Comprehensive audit trails with regulatory compliance checks ensuring adherence to HIPAA, state mandates, and payer agreements.",
      metrics: ["100% Audit Trail", "Regulatory Compliance", "Documentation"],
    },
    {
      icon: Clock,
      title: "Provider Network Analytics",
      description: "Performance tracking across provider networks identifying high-performers, cost outliers, and quality metrics driving network optimization.",
      metrics: ["Network Optimization", "Quality Scoring", "Cost Analysis"],
    },
    {
      icon: AlertTriangle,
      title: "Utilization Management",
      description: "Proactive utilization review identifying over-utilization patterns, inappropriate care, and opportunities for care coordination.",
      metrics: ["18% Utilization Reduction", "Care Coordination", "Clinical Review"],
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "$4.2M Fraud Prevention",
      description: "AI-powered detection stops fraudulent claims before payment",
    },
    {
      icon: Clock,
      title: "24 Hour Processing",
      description: "Industry-leading turnaround time from submission to payment",
    },
    {
      icon: Brain,
      title: "97.4% Accuracy",
      description: "Precise adjudication with minimal manual intervention required",
    },
    {
      icon: Award,
      title: "94% Auto-Adjudication",
      description: "Vast majority of claims processed without human touch",
    },
  ];

  return (
    <>
      <SEO
        title="Claims Analytics & Processing Solutions | Kincaid IQ"
        description="Real-time claims processing with AI-powered fraud detection achieving 97.4% accuracy and $4.2M fraud prevention."
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
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-6">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                  <span className="text-cyan-400 font-semibold">Claims Analytics</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
                  Lightning-Fast Claims
                  <br />
                  With AI Protection
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Real-time claims processing with AI-powered fraud detection delivers 97.4% accuracy,
                  24-hour turnaround, and $4.2M in fraud prevention annually
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
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
                      className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-cyan-500/50 transition-all group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-teal-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-teal-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-teal-400 transition-colors">
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
                      className="text-center p-8 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/30"
                    >
                      <Icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-3 text-cyan-400">{benefit.title}</h3>
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
                className="p-12 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-emerald-500/20 border border-teal-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Return on Investment</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-cyan-400 mb-2">548%</div>
                    <div className="text-gray-400">Average ROI</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-teal-400 mb-2">$4.2M</div>
                    <div className="text-gray-400">Fraud Prevention</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-emerald-400 mb-2">24hrs</div>
                    <div className="text-gray-400">Processing Time</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Claims Analytics achieve industry-leading processing speed,
                  accuracy, and fraud prevention while reducing operational costs
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
                  Ready to Modernize Claims Processing?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading payers leveraging Kincaid IQ for intelligent claims analytics
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
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