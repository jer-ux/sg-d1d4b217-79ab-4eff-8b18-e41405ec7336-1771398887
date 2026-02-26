"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, CheckCircle, AlertTriangle, FileText, Users, TrendingUp, Clock, Award } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";

export default function ERISACompliancePage() {
  return (
    <>
      <SEO 
        title="ERISA Compliance Solutions - Kincaid IQ"
        description="Automated ERISA compliance monitoring, DOL audit readiness, fiduciary duty tracking, and Form 5500 management for employee benefit plans."
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6"
              >
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Healthcare & Benefits Compliance</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent">
                ERISA Compliance
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                  Automated & Audit-Ready
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Comprehensive Employee Retirement Income Security Act monitoring, DOL audit readiness, 
                fiduciary duty tracking, and automated Form 5500 filing compliance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
                >
                  Schedule ERISA Assessment
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                ERISA Compliance Features
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Automated monitoring, reporting, and audit readiness for all ERISA requirements
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Fiduciary Duty Monitoring",
                  description: "408(b)(2) and 404(a)(5) disclosure compliance tracking with automated alerts"
                },
                {
                  icon: FileText,
                  title: "Form 5500 Automation",
                  description: "Automated annual filing preparation, validation, and DOL submission"
                },
                {
                  icon: Users,
                  title: "Plan Document Management",
                  description: "SPD, SMM, and plan amendment tracking with compliance calendars"
                },
                {
                  icon: AlertTriangle,
                  title: "Prohibited Transaction Detection",
                  description: "Real-time monitoring for DOL/IRS prohibited transaction violations"
                },
                {
                  icon: Clock,
                  title: "Timing Requirement Tracking",
                  description: "Automated reminders for disclosure deadlines and participant notices"
                },
                {
                  icon: TrendingUp,
                  title: "Fee Benchmarking",
                  description: "Comparative fee analysis and reasonableness documentation"
                },
                {
                  icon: Award,
                  title: "DOL Audit Readiness",
                  description: "Comprehensive audit trail and documentation package preparation"
                },
                {
                  icon: CheckCircle,
                  title: "Compliance Certification",
                  description: "Annual compliance attestation and fiduciary certification workflows"
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
                    className="p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center mb-4 border border-blue-500/30">
                      <Icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Compliance Coverage */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Comprehensive ERISA Coverage
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
                  <Shield className="w-6 h-6 text-blue-400" />
                  Plan Types Supported
                </h3>
                <ul className="space-y-3">
                  {[
                    "401(k) Retirement Plans",
                    "403(b) Tax-Sheltered Annuities",
                    "Health & Welfare Plans",
                    "Pension Plans (DB/DC)",
                    "ESOP Plans",
                    "Multiple Employer Plans (MEPs)",
                    "Pooled Employer Plans (PEPs)"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
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
                  <FileText className="w-6 h-6 text-blue-400" />
                  Compliance Requirements
                </h3>
                <ul className="space-y-3">
                  {[
                    "Annual Form 5500 Filing",
                    "Summary Plan Descriptions (SPD)",
                    "Summary Annual Reports (SAR)",
                    "Participant Fee Disclosures (404a5)",
                    "Service Provider Disclosures (408b2)",
                    "Blackout Period Notices",
                    "Qualified Default Investment Alternative (QDIA) Notices",
                    "Safe Harbor Notices"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
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
              className="bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-blue-900/20 rounded-2xl border border-blue-500/30 p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Simplify ERISA Compliance
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule an ERISA assessment and discover how Kincaid IQ automates your compliance requirements.
              </p>
              <Link
                href="/request-demo"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
              >
                Schedule ERISA Assessment
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}