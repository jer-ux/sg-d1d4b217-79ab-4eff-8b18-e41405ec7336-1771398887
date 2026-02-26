"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, CheckCircle, Target, TrendingUp, Clock, Users, FileText, Award } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";

export default function AgenticPolicy() {
  return (
    <>
      <SEO 
        title="12-Month Agentic Adoption Policy - SiriusB iQ"
        description="A governed program to deploy AI agents safely and measurably across operating and sales systems—designed for CFO and board scrutiny, not demo theater."
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6"
              >
                <Shield className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-300">Governed AI Deployment</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-200 via-purple-100 to-white bg-clip-text text-transparent">
                12-Month Agentic
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-purple-200 bg-clip-text text-transparent">
                  Adoption Policy
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                A governed program to deploy AI agents safely and measurably across operating and sales systems—
                designed for CFO and board scrutiny, not demo theater.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                >
                  Start Your Program
                </Link>
                <Link
                  href="/agentic-transformation"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  View Transformation Overview
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Three-Phase Deployment */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                Three-Phase Deployment Strategy
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Systematic, measured approach to AI agent adoption with continuous governance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  phase: "Phase 1",
                  timeline: "Months 0–2",
                  title: "Diagnose + Baseline",
                  description: "Map operating and sales workflows, define value hypotheses, set KPIs, and establish controls, access boundaries, and evidence standards.",
                  deliverables: [
                    "Complete workflow documentation",
                    "Baseline KPI measurements",
                    "Control framework definition",
                    "Risk assessment matrix",
                    "ROI opportunity quantification"
                  ]
                },
                {
                  icon: TrendingUp,
                  phase: "Phase 2",
                  timeline: "Months 3–6",
                  title: "Deploy High-ROI Agents",
                  description: "Launch agent workflows with human-in-the-loop approvals, telemetry, and exception handling. Measure cycle-time and cost impacts.",
                  deliverables: [
                    "Production agent deployment",
                    "Real-time monitoring dashboards",
                    "Exception handling protocols",
                    "Cycle-time reduction metrics",
                    "Cost impact analysis"
                  ]
                },
                {
                  icon: Shield,
                  phase: "Phase 3",
                  timeline: "Months 7–12",
                  title: "Scale + Control",
                  description: "Harden governance: policy enforcement, model drift controls, audit trails, and a continuous-improvement cadence tied to realized outcomes.",
                  deliverables: [
                    "Enterprise-wide scaling",
                    "Automated policy enforcement",
                    "Model drift monitoring",
                    "Complete audit trail system",
                    "ROI verification and reporting"
                  ]
                }
              ].map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={phase.phase}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-2xl border border-gray-700/50 p-8 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
                        <Icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-purple-400">{phase.phase}</div>
                        <div className="text-xs text-gray-400">{phase.timeline}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{phase.title}</h3>
                    <p className="text-gray-400 mb-6">{phase.description}</p>
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-purple-300 mb-2">Key Deliverables:</div>
                      {phase.deliverables.map((item) => (
                        <div key={item} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Governance Framework */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                Built-In Governance Framework
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Every agent deployment includes these mandatory governance controls
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: "Human-in-the-Loop",
                  description: "Critical decisions require human approval with complete context and audit trail"
                },
                {
                  icon: FileText,
                  title: "Complete Telemetry",
                  description: "Real-time monitoring of agent actions, decisions, and performance metrics"
                },
                {
                  icon: Shield,
                  title: "Policy Enforcement",
                  description: "Automated compliance checks and policy adherence before any action"
                },
                {
                  icon: Award,
                  title: "Evidence Standards",
                  description: "Every outcome documented with verifiable evidence and attribution"
                },
                {
                  icon: Clock,
                  title: "Exception Handling",
                  description: "Predefined protocols for edge cases, failures, and unexpected scenarios"
                },
                {
                  icon: TrendingUp,
                  title: "Model Drift Detection",
                  description: "Continuous monitoring for performance degradation and accuracy shifts"
                },
                {
                  icon: Target,
                  title: "Access Boundaries",
                  description: "Strict controls on data access, system permissions, and action scope"
                },
                {
                  icon: CheckCircle,
                  title: "Continuous Improvement",
                  description: "Regular review cycles to optimize, refine, and enhance agent performance"
                }
              ].map((control, index) => {
                const Icon = control.icon;
                return (
                  <motion.div
                    key={control.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center mb-4 border border-purple-500/30">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{control.title}</h3>
                    <p className="text-sm text-gray-400">{control.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                Program Success Metrics
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl border border-gray-700/50 p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-purple-400" />
                  Measured by Month 6
                </h3>
                <ul className="space-y-3">
                  {[
                    "25-40% reduction in process cycle time",
                    "60-75% decrease in manual task volume",
                    "90%+ accuracy on automated decisions",
                    "Complete audit trail for all actions",
                    "Zero uncontrolled agent behaviors",
                    "Documented ROI with evidence"
                  ].map((metric) => (
                    <li key={metric} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl border border-gray-700/50 p-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-purple-400" />
                  Achieved by Month 12
                </h3>
                <ul className="space-y-3">
                  {[
                    "Enterprise-wide agent deployment",
                    "Mature governance framework",
                    "$2M+ in verified annual savings",
                    "Board-ready reporting dashboard",
                    "Continuous improvement process",
                    "Scalable agent infrastructure"
                  ].map((achievement) => (
                    <li key={achievement} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
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
              className="bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-purple-900/20 rounded-2xl border border-purple-500/30 p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">
                Ready to Deploy Governed AI Agents?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Start your 12-month agentic adoption program with a framework designed for enterprise governance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
                >
                  Schedule Assessment
                </Link>
                <Link
                  href="/agentic-transformation"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  Learn More
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