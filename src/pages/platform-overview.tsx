"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Zap, Database, Brain, Lock, TrendingUp, Users, CheckCircle, FileText, BarChart3, Globe, Award, DollarSign } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";

export default function PlatformOverviewPage() {
  return (
    <>
      <SEO 
        title="Platform Overview - SiriusB iQ Algorithmic Fiduciary Intelligence"
        description="Discover the SiriusB iQ platform: real-time data orchestration, AI-powered analytics, automated compliance, and enterprise-grade governance in one integrated system."
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">Enterprise Intelligence Platform</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
                The World's First
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
                  Algorithmic Fiduciary Platform
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                Real-time data orchestration, AI-powered analytics, automated compliance monitoring, 
                and enterprise governance—all unified in a single, continuously learning platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                >
                  Schedule Platform Demo
                </Link>
                <Link
                  href="/war-room"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  Explore War Room
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Platform Architecture */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Three-Layer Architecture
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Data ingestion, intelligent processing, and actionable insights—working together 24/7
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Database,
                  layer: "Layer 1",
                  title: "Data Orchestration",
                  description: "Universal connectors ingest data from any source: EHR, TPA, PBM, payroll, HRIS, claims systems, and more.",
                  features: [
                    "Real-time API integrations",
                    "Automated data validation",
                    "Schema mapping & normalization",
                    "Secure data lake storage"
                  ]
                },
                {
                  icon: Brain,
                  layer: "Layer 2",
                  title: "AI Intelligence Engine",
                  description: "Proprietary algorithms analyze every transaction, detect anomalies, score risks, and identify optimization opportunities.",
                  features: [
                    "Pattern recognition AI",
                    "Anomaly detection algorithms",
                    "Predictive risk scoring",
                    "Continuous learning models"
                  ]
                },
                {
                  icon: Shield,
                  layer: "Layer 3",
                  title: "Action & Governance",
                  description: "Executive War Room surfaces actionable insights, automated workflows execute corrections, and immutable audit trails document everything.",
                  features: [
                    "Real-time dashboards",
                    "Automated remediation",
                    "Compliance monitoring",
                    "Audit trail generation"
                  ]
                }
              ].map((layer, index) => {
                const Icon = layer.icon;
                return (
                  <motion.div
                    key={layer.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-2xl border border-gray-700/50 p-8 hover:border-amber-500/50 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
                        <Icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <span className="text-sm font-medium text-amber-400">{layer.layer}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{layer.title}</h3>
                    <p className="text-gray-400 mb-6">{layer.description}</p>
                    <ul className="space-y-2">
                      {layer.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
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

        {/* Core Modules */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Integrated Platform Modules
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Every module works together to deliver comprehensive enterprise intelligence
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: BarChart3,
                  title: "Executive War Room",
                  description: "Real-time operational intelligence dashboard with ranked events, risk scoring, and action workflows",
                  link: "/war-room"
                },
                {
                  icon: FileText,
                  title: "Verified Savings Ledger",
                  description: "Immutable audit trail of all cost savings, recoveries, and optimizations with verifiable evidence",
                  link: "/verified-savings-ledger"
                },
                {
                  icon: CheckCircle,
                  title: "Evidence Receipts",
                  description: "Blockchain-grade proof packets for every transaction, decision, and compliance action",
                  link: "/evidence-receipts"
                },
                {
                  icon: Shield,
                  title: "Compliance Automation",
                  description: "ERISA, HIPAA, SOC 2, and fiduciary duty monitoring with automated reporting",
                  link: "/compliance"
                },
                {
                  icon: TrendingUp,
                  title: "Actuarial Benefits",
                  description: "Predictive modeling, trend analysis, and cost forecasting for employee benefits programs",
                  link: "/actuarial-benefits"
                },
                {
                  icon: Brain,
                  title: "Agentic Workflows",
                  description: "AI agents that autonomously execute tasks, remediate issues, and optimize operations",
                  link: "/agentic-workflow"
                },
                {
                  icon: Lock,
                  title: "Contract Intelligence",
                  description: "Automated contract analysis, clause extraction, and compliance verification",
                  link: "/contract-intelligence"
                },
                {
                  icon: DollarSign,
                  title: "EBITDA Governance",
                  description: "Financial performance monitoring with impact attribution and ROI tracking",
                  link: "/ebitda-governance"
                },
                {
                  icon: Globe,
                  title: "Data Connectors",
                  description: "Universal integrations with Snowflake, Databricks, ServiceNow, and 100+ enterprise systems",
                  link: "/marketplace"
                }
              ].map((module, index) => {
                const Icon = module.icon;
                return (
                  <motion.div
                    key={module.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={module.link}>
                      <div className="h-full p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 hover:border-amber-500/50 transition-all group cursor-pointer">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4 border border-amber-500/30 group-hover:scale-110 transition-transform">
                          <Icon className="w-6 h-6 text-amber-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">{module.title}</h3>
                        <p className="text-sm text-gray-400">{module.description}</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Key Differentiators */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                What Makes SiriusB iQ Different
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Zap,
                  title: "Real-Time Processing",
                  traditional: "Monthly/quarterly batch processing with delayed insights",
                  siriusb: "24/7 continuous analysis with immediate alerting and automated responses"
                },
                {
                  icon: Brain,
                  title: "AI-Native Intelligence",
                  traditional: "Manual analysis by consultants with human bias and delays",
                  siriusb: "Proprietary algorithms that learn, adapt, and improve accuracy over time"
                },
                {
                  icon: Shield,
                  title: "Immutable Audit Trail",
                  traditional: "Scattered documentation across emails, spreadsheets, and systems",
                  siriusb: "Blockchain-grade evidence receipts with cryptographic proof of every action"
                },
                {
                  icon: Users,
                  title: "Unified Platform",
                  traditional: "Siloed tools requiring manual data reconciliation and duplicate entry",
                  siriusb: "Single source of truth with all data, insights, and workflows in one system"
                },
                {
                  icon: TrendingUp,
                  title: "Predictive Analytics",
                  traditional: "Reactive problem-solving after issues have already cost money",
                  siriusb: "Proactive risk identification with recommendations before losses occur"
                },
                {
                  icon: Award,
                  title: "Verifiable ROI",
                  traditional: "Estimated savings with unclear attribution and no verification",
                  siriusb: "Every dollar of savings tracked, verified, and documented with evidence"
                }
              ].map((diff, index) => {
                const Icon = diff.icon;
                return (
                  <motion.div
                    key={diff.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl border border-gray-700/50 p-8"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center border border-amber-500/30">
                        <Icon className="w-6 h-6 text-amber-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{diff.title}</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-red-400 mb-1">❌ Traditional Approach:</div>
                        <p className="text-sm text-gray-400">{diff.traditional}</p>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-green-400 mb-1">✅ SiriusB iQ:</div>
                        <p className="text-sm text-gray-300">{diff.siriusb}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Platform Performance
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: "99.9%", label: "Platform Uptime" },
                { value: "<100ms", label: "Average Response Time" },
                { value: "1B+", label: "Transactions Analyzed Daily" },
                { value: "24/7", label: "Continuous Monitoring" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-8 bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-amber-900/20 rounded-xl border border-amber-500/30"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent mb-2">
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
              className="bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-amber-900/20 rounded-2xl border border-amber-500/30 p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Experience the Platform
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                See how SiriusB iQ transforms enterprise data into actionable intelligence in real-time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                >
                  Schedule Live Demo
                </Link>
                <Link
                  href="/war-room"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  Explore War Room
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