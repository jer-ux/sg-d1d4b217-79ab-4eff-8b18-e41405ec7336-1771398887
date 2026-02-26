"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Brain, Zap, Cpu, CheckCircle, Target, TrendingUp, Activity, Bot, Shield, Award, Users, BarChart3 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";

export default function AIAutomation() {
  return (
    <>
      <SEO
        title="AI Automation & Machine Learning - SiriusB iQ"
        description="Transform benefit administration with 87% process automation, 94% error reduction, and 98.7% AI accuracy through advanced machine learning solutions."
      />
      <Nav />
      
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          <Hero3D />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-full mb-6"
              >
                <Brain className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-300">Intelligent Automation</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-200 via-violet-100 to-white bg-clip-text text-transparent">
                AI Automation &
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-violet-200 bg-clip-text text-transparent">
                  Machine Learning
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Leverage cutting-edge artificial intelligence and machine learning to automate complex processes, 
                predict outcomes, and optimize benefit program performance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-violet-500/50 transition-all hover:scale-105"
                >
                  Explore AI Solutions
                </Link>
                <Link
                  href="/agentic-workflow"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  View Agentic Workflows
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Metrics */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: "87%", label: "Process Automation", icon: Zap },
                { value: "94%", label: "Error Reduction", icon: CheckCircle },
                { value: "15K", label: "Hours Saved Annually", icon: TrendingUp },
                { value: "98.7%", label: "AI Accuracy", icon: Target }
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-8 bg-gradient-to-br from-violet-900/20 via-violet-800/10 to-violet-900/20 rounded-xl border border-violet-500/30"
                  >
                    <Icon className="w-12 h-12 text-violet-400 mx-auto mb-4" />
                    <div className="text-4xl font-bold bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent mb-2">
                      {metric.value}
                    </div>
                    <div className="text-gray-400">{metric.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AI Capabilities */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
                Advanced AI Capabilities
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Enterprise-grade machine learning applied to benefit administration
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Brain,
                  title: "Predictive Analytics",
                  description: "Forecast claims trends, utilization patterns, and cost trajectories with 95%+ accuracy"
                },
                {
                  icon: Bot,
                  title: "Intelligent Automation",
                  description: "Automate complex decision workflows with human-in-the-loop governance"
                },
                {
                  icon: Activity,
                  title: "Anomaly Detection",
                  description: "Real-time identification of unusual patterns, fraud indicators, and compliance violations"
                },
                {
                  icon: Target,
                  title: "Risk Scoring",
                  description: "Continuous risk assessment across members, providers, and vendors with dynamic updates"
                },
                {
                  icon: TrendingUp,
                  title: "Optimization Algorithms",
                  description: "Automatically identify cost-saving opportunities and efficiency improvements"
                },
                {
                  icon: Users,
                  title: "Member Segmentation",
                  description: "AI-powered cohort analysis for personalized benefit strategies and interventions"
                },
                {
                  icon: Shield,
                  title: "Compliance Monitoring",
                  description: "Continuous regulatory adherence checking with automated violation detection"
                },
                {
                  icon: BarChart3,
                  title: "Scenario Modeling",
                  description: "Monte Carlo simulations and what-if analysis for strategic planning"
                },
                {
                  icon: Award,
                  title: "Quality Scoring",
                  description: "Provider and vendor performance evaluation using multi-factor algorithms"
                }
              ].map((capability, index) => {
                const Icon = capability.icon;
                return (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 hover:border-violet-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-violet-600/20 flex items-center justify-center mb-4 border border-violet-500/30">
                      <Icon className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{capability.title}</h3>
                    <p className="text-sm text-gray-400">{capability.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
                Real-World AI Applications
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Claims Adjudication",
                  impact: "$2.4M annual savings",
                  description: "Automated claims processing with 98.7% accuracy, fraud detection, and real-time policy compliance checking."
                },
                {
                  title: "Utilization Management",
                  impact: "23% cost reduction",
                  description: "Predictive modeling identifies high-risk members for proactive intervention and care coordination."
                },
                {
                  title: "Vendor Performance",
                  impact: "15% service improvement",
                  description: "AI-powered scoring of TPA, PBM, and provider performance with automated contract compliance."
                },
                {
                  title: "Network Optimization",
                  impact: "18% efficiency gain",
                  description: "Machine learning optimizes provider networks based on quality, cost, and access metrics."
                },
                {
                  title: "Benefit Design",
                  impact: "12% engagement increase",
                  description: "AI analyzes member behavior to recommend optimal benefit structures and contribution strategies."
                },
                {
                  title: "Financial Forecasting",
                  impact: "95% accuracy",
                  description: "Predictive models forecast claims costs, trend trajectories, and IBNR reserves with high precision."
                }
              ].map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl border border-gray-700/50 p-8"
                >
                  <div className="text-2xl font-bold text-violet-400 mb-2">{useCase.impact}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                  <p className="text-gray-400">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-violet-900/20 via-violet-800/10 to-violet-900/20 rounded-2xl border border-violet-500/30 p-12"
            >
              <Brain className="w-16 h-16 text-violet-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-violet-200 to-white bg-clip-text text-transparent">
                Automate Your Benefit Operations
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Discover AI-powered solutions tailored to your workflow
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-violet-500/50 transition-all hover:scale-105"
                >
                  Explore AI Automation
                </Link>
                <Link
                  href="/actuarial-benefits"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  View All Solutions
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}