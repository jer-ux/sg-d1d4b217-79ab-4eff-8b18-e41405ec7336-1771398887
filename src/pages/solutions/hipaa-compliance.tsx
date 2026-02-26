"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, CheckCircle, Lock, FileText, Users, Eye, Database, AlertTriangle } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";

export default function HIPAACompliancePage() {
  return (
    <>
      <SEO 
        title="HIPAA Compliance Solutions - Kincaid IQ"
        description="Protected Health Information (PHI) security, privacy controls, breach notification, and audit-ready HIPAA compliance for healthcare organizations."
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
                <Lock className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">Healthcare & Benefits Compliance</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent">
                HIPAA Compliance
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                  PHI Protection & Privacy
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Comprehensive Protected Health Information (PHI) security, privacy controls, breach notification, 
                and continuous HIPAA compliance monitoring for healthcare organizations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
                >
                  Schedule HIPAA Assessment
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
                HIPAA Compliance Features
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Automated PHI protection, access controls, and continuous compliance monitoring
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Lock,
                  title: "PHI Security Controls",
                  description: "Encryption, access controls, and technical safeguards for all PHI data"
                },
                {
                  icon: Eye,
                  title: "Access Monitoring",
                  description: "Real-time tracking of PHI access with automated anomaly detection"
                },
                {
                  icon: FileText,
                  title: "Privacy Rule Compliance",
                  description: "Minimum necessary use, authorization tracking, and patient rights management"
                },
                {
                  icon: Database,
                  title: "Data Encryption",
                  description: "End-to-end encryption for PHI at rest and in transit"
                },
                {
                  icon: Users,
                  title: "Business Associate Management",
                  description: "BAA lifecycle management and vendor risk assessment"
                },
                {
                  icon: AlertTriangle,
                  title: "Breach Notification",
                  description: "Automated breach detection and 60-day HHS notification workflow"
                },
                {
                  icon: Shield,
                  title: "Security Risk Analysis",
                  description: "Annual risk assessments and vulnerability remediation tracking"
                },
                {
                  icon: CheckCircle,
                  title: "Audit Trail",
                  description: "Comprehensive logging and 6-year audit trail retention"
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
                Comprehensive HIPAA Coverage
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
                  Security Safeguards
                </h3>
                <ul className="space-y-3">
                  {[
                    "Administrative Safeguards - Policies and procedures",
                    "Physical Safeguards - Facility access and workstation security",
                    "Technical Safeguards - Access controls and encryption",
                    "Transmission Security - Network communications protection",
                    "Audit Controls - Activity logging and monitoring",
                    "Authentication - User identity verification",
                    "Integrity Controls - Data tampering prevention"
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
                  Privacy Requirements
                </h3>
                <ul className="space-y-3">
                  {[
                    "Notice of Privacy Practices (NPP)",
                    "Patient Rights - Access, amendment, accounting",
                    "Minimum Necessary Standard",
                    "Uses and Disclosures - Authorization tracking",
                    "Marketing and Fundraising Restrictions",
                    "Research Use Compliance",
                    "Psychotherapy Notes Protection",
                    "Deceased Individual Privacy (50-year rule)"
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
                Secure Your PHI Today
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule a HIPAA assessment and discover how Kincaid IQ protects your Protected Health Information.
              </p>
              <Link
                href="/request-demo"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
              >
                Schedule HIPAA Assessment
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}