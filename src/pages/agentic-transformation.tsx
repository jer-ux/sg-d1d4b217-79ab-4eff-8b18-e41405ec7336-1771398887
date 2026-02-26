"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Bot, Zap, Shield, TrendingUp, CheckCircle, Brain, Workflow, Target, BarChart3, Settings, Users, Award } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";

export default function AgenticTransformation() {
  return (
    <>
      <SEO 
        title="Agentic Transformation - AI-Powered Enterprise Evolution"
        description="Transform your enterprise with AI agentic workflows that automate complex processes, optimize operations, and deliver measurable business outcomes through intelligent automation."
      />
      <Nav />
      
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6"
              >
                <Bot className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">AI-Powered Transformation</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-200 via-purple-100 to-white bg-clip-text text-transparent">
                Agentic Transformation
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent">
                  AI That Works For You
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                Deploy AI agents that survive governance scrutiny. We analyze your operating and sales systems, 
                deploy controlled agent workflows, and measure realized outcomes with verifiable evidence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                >
                  Start Your Transformation
                </Link>
                <Link
                  href="/agentic-policy"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  View 12-Month Policy
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Transformation Pillars */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                Three Pillars of Agentic Transformation
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                A systematic approach to deploying AI that delivers measurable business value
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "System Analysis",
                  description: "Map workflows, identify bottlenecks, discover controls, and pinpoint handoffs where AI agents produce measurable leverage.",
                  features: [
                    "Operating system workflow mapping",
                    "Sales process optimization analysis",
                    "Bottleneck identification",
                    "Control point discovery",
                    "ROI opportunity quantification"
                  ]
                },
                {
                  icon: Shield,
                  title: "Governed Workflows",
                  description: "Deploy AI agents with human oversight, complete telemetry, exception handling, and policy enforcement—no black-box chaos.",
                  features: [
                    "Human-in-the-loop approvals",
                    "Real-time telemetry monitoring",
                    "Exception handling protocols",
                    "Policy enforcement automation",
                    "Audit trail generation"
                  ]
                },
                {
                  icon: BarChart3,
                  title: "Value Measurement",
                  description: "Tie outcomes to ledger discipline: what's identified, approved, realized, and decaying—owned and reconciled with evidence.",
                  features: [
                    "Verified savings ledger integration",
                    "Real-time impact measurement",
                    "Evidence-based attribution",
                    "ROI tracking and reporting",
                    "Decay monitoring and alerts"
                  ]
                }
              ].map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-2xl border border-gray-700/50 p-8 hover:border-purple-500/50 transition-all"
                  >
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-6 border border-purple-500/30">
                      <Icon className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
                    <p className="text-gray-400 mb-6">{pillar.description}</p>
                    <ul className="space-y-2">
                      {pillar.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                Enterprise Use Cases
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Real-world applications delivering measurable business outcomes
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: "Customer Service Automation",
                  impact: "67% reduction in response time",
                  description: "AI agents handle tier 1-2 support, escalate complex issues, and maintain complete interaction history."
                },
                {
                  icon: Workflow,
                  title: "Claims Processing",
                  impact: "$2.4M annual savings",
                  description: "Automated adjudication, fraud detection, and payment processing with 98.7% accuracy."
                },
                {
                  icon: Brain,
                  title: "Contract Analysis",
                  impact: "85% faster review cycles",
                  description: "Clause extraction, risk scoring, and compliance verification across vendor agreements."
                },
                {
                  icon: TrendingUp,
                  title: "Revenue Optimization",
                  impact: "12% revenue increase",
                  description: "Pricing optimization, upsell identification, and churn prediction with automated interventions."
                },
                {
                  icon: Settings,
                  title: "Vendor Management",
                  impact: "43% cost reduction",
                  description: "Automated RFP analysis, performance monitoring, and contract renegotiation workflows."
                },
                {
                  icon: Award,
                  title: "Compliance Monitoring",
                  impact: "100% audit trail coverage",
                  description: "Continuous policy adherence checking, violation detection, and remediation automation."
                }
              ].map((useCase, index) => {
                const Icon = useCase.icon;
                return (
                  <motion.div
                    key={useCase.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-4 border border-purple-500/30">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="text-2xl font-bold text-purple-400 mb-2">{useCase.impact}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                    <p className="text-sm text-gray-400">{useCase.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Implementation Approach */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                Our Implementation Approach
              </h2>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  phase: "Phase 1: Discovery & Baseline",
                  duration: "Weeks 1-4",
                  activities: [
                    "Operating and sales system workflow mapping",
                    "Bottleneck identification and quantification",
                    "Value hypothesis development",
                    "KPI baseline establishment",
                    "Control framework definition"
                  ]
                },
                {
                  phase: "Phase 2: Pilot Deployment",
                  duration: "Weeks 5-12",
                  activities: [
                    "High-ROI agent workflow design",
                    "Human-in-the-loop integration",
                    "Telemetry and monitoring setup",
                    "Exception handling protocols",
                    "Initial performance measurement"
                  ]
                },
                {
                  phase: "Phase 3: Scale & Optimize",
                  duration: "Weeks 13-24",
                  activities: [
                    "Expanded agent deployment",
                    "Policy enforcement automation",
                    "Model drift monitoring",
                    "Continuous improvement cycles",
                    "ROI documentation and reporting"
                  ]
                },
                {
                  phase: "Phase 4: Enterprise Integration",
                  duration: "Weeks 25-52",
                  activities: [
                    "Cross-functional workflow orchestration",
                    "Advanced analytics and prediction",
                    "Governance framework maturation",
                    "Change management support",
                    "Executive dashboard deployment"
                  ]
                }
              ].map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl border border-gray-700/50 p-8"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
                      <span className="text-xl font-bold text-purple-400">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{phase.phase}</h3>
                      <p className="text-sm text-purple-400">{phase.duration}</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {phase.activities.map((activity) => (
                      <li key={activity} className="flex items-start gap-2 text-gray-300">
                        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: "87%", label: "Process Automation Rate" },
                { value: "94%", label: "Error Reduction" },
                { value: "15K", label: "Hours Saved Annually" },
                { value: "98.7%", label: "Agent Accuracy" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-8 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-purple-900/20 rounded-xl border border-purple-500/30"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-purple-900/20 rounded-2xl border border-purple-500/30 p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                Ready to Transform Your Enterprise?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Discover how AI agents can automate complex workflows while maintaining governance and delivering measurable ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                >
                  Start Your Transformation
                </Link>
                <Link
                  href="/agentic-policy"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  View Implementation Policy
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