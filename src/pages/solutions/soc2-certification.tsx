"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, CheckCircle, Lock, Server, Eye, FileCheck, AlertCircle, Award } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";

export default function SOC2CertificationPage() {
  return (
    <>
      <SEO 
        title="SOC 2 Type II Certification - Kincaid IQ"
        description="SOC 2 Type II security controls, continuous monitoring, audit readiness, and compliance automation for service organizations."
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
                <Award className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-300">Financial & Fiduciary Compliance</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
                SOC 2 Type II
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
                  Certification & Monitoring
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Comprehensive SOC 2 Type II security controls, continuous compliance monitoring, 
                audit readiness, and automated evidence collection for service organizations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                >
                  Schedule SOC 2 Assessment
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

        {/* Trust Service Criteria */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Trust Service Criteria Coverage
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Automated monitoring and evidence collection for all five Trust Service Criteria
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Security",
                  description: "Access controls, encryption, network security, and vulnerability management",
                  criteria: "CC6.1 - CC7.2"
                },
                {
                  icon: Server,
                  title: "Availability",
                  description: "System uptime, capacity planning, disaster recovery, and incident response",
                  criteria: "A1.1 - A1.3"
                },
                {
                  icon: Eye,
                  title: "Processing Integrity",
                  description: "Data accuracy, completeness, validity, and authorized processing",
                  criteria: "PI1.1 - PI1.5"
                },
                {
                  icon: Lock,
                  title: "Confidentiality",
                  description: "Data classification, encryption, secure disposal, and access restrictions",
                  criteria: "C1.1 - C1.2"
                },
                {
                  icon: FileCheck,
                  title: "Privacy",
                  description: "Data collection, use, retention, disclosure, and user rights management",
                  criteria: "P1.1 - P8.1"
                }
              ].map((criterion, index) => {
                const Icon = criterion.icon;
                return (
                  <motion.div
                    key={criterion.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-6 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-700/50 hover:border-amber-500/50 transition-all"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-4 border border-amber-500/30">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{criterion.title}</h3>
                    <p className="text-sm text-gray-400 mb-3">{criterion.description}</p>
                    <span className="text-xs text-amber-400 font-mono">{criterion.criteria}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-24 bg-gradient-to-b from-gray-900/50 to-black">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                SOC 2 Compliance Features
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: AlertCircle,
                  title: "Continuous Monitoring",
                  description: "Real-time control effectiveness monitoring with automated alerting"
                },
                {
                  icon: FileCheck,
                  title: "Evidence Collection",
                  description: "Automated evidence gathering and audit trail documentation"
                },
                {
                  icon: CheckCircle,
                  title: "Control Testing",
                  description: "Periodic control testing workflows and remediation tracking"
                },
                {
                  icon: Award,
                  title: "Audit Readiness",
                  description: "Pre-audit assessments and auditor collaboration portal"
                },
                {
                  icon: Eye,
                  title: "Gap Analysis",
                  description: "Control gap identification and remediation planning"
                },
                {
                  icon: Server,
                  title: "System Inventory",
                  description: "Automated asset discovery and system boundary mapping"
                },
                {
                  icon: Lock,
                  title: "Vendor Assessment",
                  description: "Third-party risk evaluation and SOC 2 report collection"
                },
                {
                  icon: Shield,
                  title: "Policy Management",
                  description: "Information security policy lifecycle and attestation tracking"
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
                Achieve SOC 2 Certification Faster
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule a SOC 2 assessment and discover how Kincaid IQ accelerates your certification journey.
              </p>
              <Link
                href="/request-demo"
                className="inline-block px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
              >
                Schedule SOC 2 Assessment
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}