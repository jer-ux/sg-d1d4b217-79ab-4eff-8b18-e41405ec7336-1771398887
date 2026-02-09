import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Bot, Brain, Sparkles, TrendingUp, Target, CheckCircle2, ArrowRight, Award, DollarSign, Users, Shield } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function AIAutomation() {
  const features = [
    {
      icon: Bot,
      title: "Intelligent Process Automation",
      description: "AI-powered automation of claims processing, eligibility determinations, benefit explanations, and customer inquiries reducing manual effort by 78%.",
      metrics: ["78% Automation Rate", "24/7 Processing", "Zero Queue Time"],
    },
    {
      icon: Brain,
      title: "Machine Learning Models",
      description: "Advanced ML algorithms for fraud detection, risk assessment, cost prediction, and personalized member engagement with continuous learning.",
      metrics: ["Fraud Detection", "Risk Scoring", "Cost Prediction"],
    },
    {
      icon: Target,
      title: "Smart Decision Support",
      description: "AI-assisted decision-making for complex cases, coverage determinations, and exception handling with explainable recommendations.",
      metrics: ["Decision Support", "Explainable AI", "Audit Trail"],
    },
    {
      icon: Zap,
      title: "Workflow Optimization",
      description: "Process mining and optimization algorithms identifying bottlenecks, inefficiencies, and automation opportunities across operations.",
      metrics: ["Process Mining", "Bottleneck Detection", "Auto-Optimization"],
    },
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "Forward-looking analytics predicting member behaviors, cost trends, and operational needs enabling proactive management.",
      metrics: ["Behavior Prediction", "Trend Forecasting", "Proactive Alerts"],
    },
    {
      icon: Users,
      title: "Conversational AI",
      description: "Natural language processing for member self-service, benefit education, and issue resolution through chat and voice interfaces.",
      metrics: ["NLP", "Multi-Channel", "Self-Service"],
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "$24.7M Savings",
      description: "Average annual operational cost reduction",
    },
    {
      icon: Zap,
      title: "78% Automation",
      description: "Manual processes automated through AI",
    },
    {
      icon: Users,
      title: "93% Accuracy",
      description: "AI decision accuracy validated by experts",
    },
    {
      icon: Award,
      title: "987% Average ROI",
      description: "Return on AI automation investment",
    },
  ];

  return (
    <>
      <SEO
        title="AI Automation Solutions | Kincaid IQ"
        description="Intelligent process automation achieving 78% automation rate and $24.7M average savings through AI-powered operations."
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
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-violet-500/20 border border-violet-500/30 mb-6">
                  <Zap className="w-5 h-5 text-violet-400" />
                  <span className="text-violet-400 font-semibold">AI Automation</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                  Transform Operations
                  <br />
                  With Intelligent Automation
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  AI-powered process automation achieving 78% automation rate
                  with $24.7M average savings and 93% decision accuracy through intelligent systems
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
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
                      className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-violet-500/50 transition-all group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-purple-500/30 inline-block mb-6">
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
                      className="text-center p-8 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/30"
                    >
                      <Icon className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-3 text-violet-400">{benefit.title}</h3>
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
                className="p-12 rounded-3xl bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 border border-purple-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">AI Automation Performance</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-violet-400 mb-2">$24.7M</div>
                    <div className="text-gray-400">Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-purple-400 mb-2">78%</div>
                    <div className="text-gray-400">Automation Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-fuchsia-400 mb-2">93%</div>
                    <div className="text-gray-400">AI Accuracy</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ AI Automation achieve dramatic operational efficiency
                  while maintaining high accuracy and improving member experience
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
                  Ready to Transform with AI Automation?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading organizations leveraging Kincaid IQ for intelligent process automation
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
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