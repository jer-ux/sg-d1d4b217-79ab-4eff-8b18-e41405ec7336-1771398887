"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, CheckCircle, Scale, FileText, TrendingUp, Award, DollarSign, AlertTriangle } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";

export default function FiduciaryGovernancePage() {
  return (
    <>
      <SEO 
        title="Fiduciary Duty Monitoring - Kincaid IQ"
        description="Automated fiduciary duty monitoring, 408(b)(2) and 404(a)(5) compliance tracking, fee disclosure management, and investment oversight."
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6"
              >
                <Scale className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">Financial & Fiduciary Compliance</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
                Fiduciary Duty Monitoring
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
                  408(b)(2) & 404(a)(5) Compliance
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Comprehensive fiduciary duty monitoring, fee disclosure compliance, investment policy adherence, 
                and prohibited transaction detection for ERISA plan fiduciaries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                >
                  Schedule Fiduciary Assessment
                </Link>
                <Link
                  href="/compliance"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  View All Compliance
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Fiduciary Governance Features
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Automated monitoring and documentation of all fiduciary responsibilities
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: FileText,
                  title: "408(b)(2) Disclosure Tracking",
                  description: "Service provider fee disclosure collection and reasonableness assessment"
                },
                {
                  icon: DollarSign,
                  title: "404(a)(5) Participant Disclosure",
                  description: "Automated quarterly participant fee disclosure generation and delivery"
                },
                {
                  icon: Shield,
                  title: "Investment Policy Monitoring",
                  description: "IPS adherence tracking and quarterly investment review documentation"
                },
                {
                  icon: AlertTriangle,
                  title: "Prohibited Transaction Detection",
                  description: "Real-time monitoring for party-in-interest transactions and ERISA violations"
                },
                {
                  icon: TrendingUp,
                  title: "Fee Benchmarking",
                  description: "Comparative fee analysis against industry standards and peer plans"
                },
                {
                  icon: Award,
                  title: "Fiduciary Certification",
                  description: "Annual fiduciary training attestation and certification workflows"
                },
                {
                  icon: CheckCircle,
                  title: "Prudent Process Documentation",
                  description: "Meeting minutes, decision rationale, and audit trail maintenance"
                },
                {
                  icon: Scale,
                  title: "DOL Audit Support",
                  description: "Complete fiduciary file preparation and DOL investigation response"
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 hover:border-amber-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4 border border-amber-500/30">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Fiduciary Responsibilities */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                ERISA Fiduciary Duties Coverage
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
                  <Shield className="w-6 h-6 text-amber-400" />
                  Core Fiduciary Duties
                </h3>
                <ul className="space-y-3">
                  {[
                    "Duty of Loyalty - Act solely in participants' interest",
                    "Duty of Prudence - Exercise care, skill, and diligence",
                    "Diversification - Minimize risk of large losses",
                    "Follow Plan Documents - Comply with plan terms",
                    "Pay Only Reasonable Fees - Fee benchmarking and monitoring",
                    "Monitor Service Providers - Ongoing due diligence",
                    "Avoid Prohibited Transactions - Party-in-interest rules"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
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
                  <FileText className="w-6 h-6 text-amber-400" />
                  Disclosure Requirements
                </h3>
                <ul className="space-y-3">
                  {[
                    "408(b)(2) - Service provider fee disclosures",
                    "404(a)(5) - Participant fee and investment disclosures",
                    "Summary Annual Reports (SAR)",
                    "QDIA Notices - Qualified Default Investment Alternative",
                    "Safe Harbor Notices - Auto-enrollment provisions",
                    "Blackout Period Notices - 30-day advance notice",
                    "Benefit Statements - Quarterly for DC plans",
                    "Investment Performance Data - Standardized returns"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
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
              className="bg-gradient-to-br from-amber-900/20 via-amber-800/10 to-amber-900/20 rounded-2xl border border-amber-500/30 p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Strengthen Your Fiduciary Governance
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule a fiduciary assessment and discover how Kincaid IQ automates your compliance requirements.
              </p>
              <Link
                href="/request-demo"
                className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
              >
                Schedule Fiduciary Assessment
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}