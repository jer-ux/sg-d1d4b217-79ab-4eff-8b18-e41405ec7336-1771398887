import { motion } from "framer-motion";
import Link from "next/link";
import { Award, CheckCircle2, Shield, Target, BarChart3, FileCheck, AlertTriangle, ArrowRight, Sparkles, DollarSign, Users, TrendingUp } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function QualityAssurance() {
  const features = [
    {
      icon: FileCheck,
      title: "Automated Quality Audits",
      description: "Continuous automated auditing of claims processing, eligibility determinations, and customer service interactions with real-time quality scoring.",
      metrics: ["100% Claims Reviewed", "Real-time Scoring", "Zero Sampling Error"],
    },
    {
      icon: Shield,
      title: "Compliance Validation",
      description: "Systematic validation of regulatory compliance across ERISA, ACA, HIPAA, and state requirements with automated corrective action workflows.",
      metrics: ["Multi-Regulation", "Auto-Correction", "Audit Ready"],
    },
    {
      icon: Target,
      title: "Error Prevention System",
      description: "Proactive error detection and prevention through pre-processing validation, rule enforcement, and intelligent workflow guardrails.",
      metrics: ["Pre-Processing Checks", "Rule Enforcement", "Error Reduction"],
    },
    {
      icon: BarChart3,
      title: "Quality Metrics Dashboard",
      description: "Comprehensive quality metrics tracking accuracy rates, turnaround times, member satisfaction, and compliance scores with trend analysis.",
      metrics: ["Real-time Metrics", "Trend Analysis", "Benchmarking"],
    },
    {
      icon: AlertTriangle,
      title: "Risk-Based Monitoring",
      description: "Intelligent risk scoring prioritizing high-risk transactions for enhanced review while streamlining low-risk processing for efficiency.",
      metrics: ["Risk Scoring", "Priority Queuing", "Efficiency Gains"],
    },
    {
      icon: Award,
      title: "Continuous Improvement",
      description: "Root cause analysis and corrective action tracking driving systematic quality improvements with measurable impact on performance.",
      metrics: ["Root Cause Analysis", "Action Tracking", "Impact Measurement"],
    },
  ];

  const benefits = [
    {
      icon: Award,
      title: "99.8% Accuracy",
      description: "Industry-leading quality across all processes",
    },
    {
      icon: Shield,
      title: "Zero Audit Findings",
      description: "Perfect compliance record in regulatory audits",
    },
    {
      icon: DollarSign,
      title: "$8.4M Savings",
      description: "Average annual error cost prevention",
    },
    {
      icon: Users,
      title: "96% Satisfaction",
      description: "Member satisfaction with service quality",
    },
  ];

  return (
    <>
      <SEO
        title="Quality Assurance Solutions | Kincaid IQ"
        description="Automated quality audits achieving 99.8% accuracy, zero audit findings, and $8.4M average error prevention through comprehensive QA."
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
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/20 border border-green-500/30 mb-6">
                  <Award className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-semibold">Quality Assurance</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Achieve Excellence
                  <br />
                  Through Automated Quality
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
                  Automated quality audits achieving 99.8% accuracy with zero audit findings
                  preventing $8.4M in average annual error costs through comprehensive QA
                </p>

                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
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
                      className="p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 hover:border-green-500/50 transition-all group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-emerald-500/30 inline-block mb-6">
                        <Icon className="w-8 h-8 text-emerald-400" />
                      </div>

                      <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">
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
                      className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30"
                    >
                      <Icon className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-3xl font-bold mb-3 text-green-400">{benefit.title}</h3>
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
                className="p-12 rounded-3xl bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
              >
                <h2 className="text-4xl font-bold mb-8 text-center">Quality Performance</h2>
                
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-400 mb-2">99.8%</div>
                    <div className="text-gray-400">Accuracy Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-emerald-400 mb-2">Zero</div>
                    <div className="text-gray-400">Audit Findings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-5xl font-bold text-teal-400 mb-2">$8.4M</div>
                    <div className="text-gray-400">Error Prevention</div>
                  </div>
                </div>

                <p className="text-center text-gray-300 text-lg">
                  Organizations using Kincaid IQ Quality Assurance achieve exceptional accuracy
                  and compliance while significantly reducing error-related costs
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
                  Ready to Achieve Quality Excellence?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Join leading organizations leveraging Kincaid IQ for automated quality assurance
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-full text-white font-bold text-xl flex items-center gap-3 mx-auto"
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