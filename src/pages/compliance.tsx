"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, CheckCircle, Lock, FileText, AlertTriangle, Globe, DollarSign, Users, TrendingUp, Award, Eye, Scale, FileCheck, Building, Briefcase } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";

const complianceCategories = [
  {
    title: "Healthcare & Benefits",
    icon: Shield,
    color: "from-blue-500 to-cyan-500",
    solutions: [
      { name: "ERISA Compliance", href: "/solutions/erisa-compliance", description: "Employee benefit plan monitoring and DOL compliance" },
      { name: "HIPAA Compliance", href: "/solutions/hipaa-compliance", description: "Protected health information security and privacy" },
      { name: "ACA Compliance", href: "/solutions/aca-compliance", description: "Affordable Care Act reporting and plan design" },
      { name: "Form 5500 Management", href: "/solutions/form-5500", description: "Automated annual plan filing and analysis" },
      { name: "Mental Health Parity", href: "/solutions/mental-health-parity", description: "MHPAEA compliance tracking and reporting" },
      { name: "COBRA Administration", href: "/solutions/cobra-compliance", description: "Continuation coverage compliance and notifications" },
    ]
  },
  {
    title: "Financial & Fiduciary",
    icon: DollarSign,
    color: "from-amber-500 to-orange-500",
    solutions: [
      { name: "SOC 2 Type II", href: "/solutions/soc2-certification", description: "Security and availability controls certification" },
      { name: "Fiduciary Duty Monitoring", href: "/solutions/fiduciary-governance", description: "408(b)(2) and 404(a)(5) compliance tracking" },
      { name: "SOX Controls", href: "/solutions/sox-controls", description: "Internal controls for financial reporting" },
      { name: "Prohibited Transactions", href: "/solutions/prohibited-transactions", description: "DOL/IRS violation detection and prevention" },
      { name: "Fee Disclosure", href: "/solutions/fee-disclosure", description: "Transparency and benchmarking requirements" },
      { name: "Investment Policy", href: "/solutions/investment-policy", description: "IPS adherence and monitoring" },
    ]
  },
  {
    title: "Data Privacy & Security",
    icon: Lock,
    color: "from-purple-500 to-pink-500",
    solutions: [
      { name: "GDPR Compliance", href: "/solutions/gdpr-compliance", description: "EU data protection and privacy rights" },
      { name: "CCPA/CPRA", href: "/solutions/ccpa-compliance", description: "California consumer privacy regulations" },
      { name: "ISO 27001", href: "/solutions/iso-27001", description: "Information security management standards" },
      { name: "NIST Framework", href: "/solutions/nist-framework", description: "Cybersecurity framework compliance" },
      { name: "Data Residency", href: "/solutions/data-residency", description: "Geographic data storage requirements" },
      { name: "PCI DSS", href: "/solutions/pci-dss", description: "Payment card security standards" },
    ]
  },
  {
    title: "Industry Regulations",
    icon: Building,
    color: "from-green-500 to-emerald-500",
    solutions: [
      { name: "SEC Compliance", href: "/solutions/sec-compliance", description: "Investment advisor regulatory requirements" },
      { name: "FINRA Rules", href: "/solutions/finra-compliance", description: "Financial industry regulatory authority" },
      { name: "DOL Audit Readiness", href: "/solutions/dol-audit", description: "Department of Labor investigation prep" },
      { name: "State Insurance Regulations", href: "/solutions/state-insurance", description: "Multi-state compliance tracking" },
      { name: "FFIEC Guidelines", href: "/solutions/ffiec-compliance", description: "Federal financial institution standards" },
      { name: "Regulatory Change Management", href: "/solutions/regulatory-change", description: "Automated regulation update tracking" },
    ]
  },
  {
    title: "Operational Compliance",
    icon: FileCheck,
    color: "from-indigo-500 to-violet-500",
    solutions: [
      { name: "Vendor Risk Management", href: "/solutions/vendor-risk", description: "Third-party compliance monitoring" },
      { name: "Business Associate Agreements", href: "/solutions/baa-management", description: "HIPAA vendor contract compliance" },
      { name: "SLA Monitoring", href: "/solutions/sla-monitoring", description: "Service level agreement tracking" },
      { name: "Audit Trail Management", href: "/solutions/audit-trail", description: "Immutable evidence and chain of custody" },
      { name: "Compliance Training", href: "/solutions/compliance-training", description: "Staff certification and education tracking" },
      { name: "Policy Management", href: "/solutions/policy-management", description: "Corporate policy lifecycle management" },
    ]
  },
  {
    title: "ESG & Governance",
    icon: TrendingUp,
    color: "from-teal-500 to-cyan-500",
    solutions: [
      { name: "ESG Reporting", href: "/solutions/esg-reporting", description: "Environmental, social, governance metrics" },
      { name: "Diversity & Inclusion", href: "/solutions/dei-compliance", description: "EEO-1 reporting and DE&I tracking" },
      { name: "Climate Risk Disclosure", href: "/solutions/climate-risk", description: "TCFD and SEC climate rule compliance" },
      { name: "Whistleblower Protection", href: "/solutions/whistleblower", description: "Dodd-Frank and SOX protections" },
      { name: "Board Governance", href: "/solutions/board-governance", description: "Corporate governance best practices" },
      { name: "Sustainability Reporting", href: "/solutions/sustainability", description: "Carbon footprint and sustainability metrics" },
    ]
  },
];

const certifications = [
  { name: "SOC 2 Type II", icon: Shield, status: "Certified" },
  { name: "ISO 27001", icon: Lock, status: "Certified" },
  { name: "HIPAA Compliant", icon: FileText, status: "Verified" },
  { name: "GDPR Ready", icon: Globe, status: "Compliant" },
];

export default function CompliancePage() {
  return (
    <>
      <SEO 
        title="Compliance & Governance Solutions - Kincaid IQ"
        description="Comprehensive compliance and governance solutions for healthcare, finance, data privacy, and regulatory requirements. Automated monitoring, reporting, and audit readiness."
      />
      <Nav />
      
      <main className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <Hero3D />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
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
                <span className="text-sm font-medium text-amber-300">Enterprise Compliance Platform</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-amber-100 to-white bg-clip-text text-transparent">
                Compliance & Governance
                <br />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 bg-clip-text text-transparent">
                  Made Simple
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
                Comprehensive compliance solutions covering healthcare, finance, data privacy, and regulatory requirements. 
                Automated monitoring, real-time alerts, and audit-ready documentation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                >
                  Schedule Compliance Assessment
                </Link>
                <Link
                  href="/docs"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  View Documentation
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Bar */}
        <section className="relative py-12 border-y border-amber-500/20 bg-gradient-to-r from-amber-950/20 via-amber-900/10 to-amber-950/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {certifications.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/20 flex items-center justify-center mb-3 border border-amber-500/30">
                      <Icon className="w-8 h-8 text-amber-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-1">{cert.name}</h3>
                    <span className="text-sm text-amber-400">{cert.status}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Compliance Categories */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Comprehensive Compliance Coverage
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Six major compliance categories covering 36+ regulatory frameworks and standards
              </p>
            </motion.div>

            <div className="space-y-16">
              {complianceCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-700/50 p-8 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{category.title}</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.solutions.map((solution, solutionIndex) => (
                        <motion.div
                          key={solution.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: solutionIndex * 0.05 }}
                          whileHover={{ scale: 1.02, y: -4 }}
                        >
                          <Link
                            href={solution.href}
                            className="block h-full p-6 bg-gray-800/40 rounded-xl border border-gray-700/50 hover:border-amber-500/50 transition-all group"
                          >
                            <div className="flex items-start gap-3 mb-3">
                              <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                              <h4 className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                                {solution.name}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                              {solution.description}
                            </p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent">
                Enterprise-Grade Compliance Features
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Built for scale, security, and audit readiness
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Eye,
                  title: "Real-Time Monitoring",
                  description: "24/7 automated compliance monitoring with instant alerts for policy violations"
                },
                {
                  icon: FileText,
                  title: "Audit Trail",
                  description: "Immutable evidence chain with cryptographic verification for all compliance activities"
                },
                {
                  icon: Scale,
                  title: "Regulatory Intelligence",
                  description: "AI-powered tracking of regulatory changes with automatic policy updates"
                },
                {
                  icon: Award,
                  title: "Certification Management",
                  description: "Track certifications, renewals, and maintain documentation for audits"
                },
                {
                  icon: Users,
                  title: "Role-Based Access",
                  description: "Granular permissions and segregation of duties for compliance workflows"
                },
                {
                  icon: Briefcase,
                  title: "Vendor Compliance",
                  description: "Third-party risk assessment and ongoing vendor compliance monitoring"
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
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
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
                Ready to Simplify Compliance?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule a compliance assessment and discover how Kincaid IQ can automate your regulatory requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold rounded-full hover:shadow-lg hover:shadow-amber-500/50 transition-all hover:scale-105"
                >
                  Schedule Assessment
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                  Contact Compliance Team
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