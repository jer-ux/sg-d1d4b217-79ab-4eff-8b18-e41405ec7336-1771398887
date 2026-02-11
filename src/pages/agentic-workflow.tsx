import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { InteractiveStageCard } from "@/components/agentic/InteractiveStageCard";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  Shield,
  Users,
  FileCheck,
  AlertTriangle,
  TrendingUp,
  Lock,
  Brain,
  Target,
  BarChart3,
  Eye,
  RefreshCw,
  Settings,
  Network,
  Sparkles,
  Zap,
} from "lucide-react";

// Dynamically import 3D components (client-side only)
const Hero3DScene = dynamic(
  () => import("@/components/agentic/Hero3D").then((mod) => mod.Hero3DScene),
  { ssr: false }
);

const WorkflowPipeline3D = dynamic(
  () => import("@/components/agentic/WorkflowPipeline3D").then((mod) => mod.WorkflowPipeline3D),
  { ssr: false }
);

const workflowStages = [
  {
    phase: "01",
    title: "Data Ingestion & Validation",
    description: "Multi-source data aggregation with automated quality controls",
    icon: Database,
    processes: [
      "Real-time ERP integration (SAP, Oracle, NetSuite)",
      "Financial system synchronization",
      "Third-party data validation",
      "Blockchain-verified timestamps",
      "Automated reconciliation checks",
    ],
    metrics: [
      { label: "Data Sources", value: "150+" },
      { label: "Validation Rules", value: "2,500+" },
      { label: "Processing Speed", value: "<30s" },
    ],
  },
  {
    phase: "02",
    title: "Intelligent Classification",
    description: "AI-powered transaction categorization and risk assessment",
    icon: Brain,
    processes: [
      "ML-based pattern recognition",
      "Natural language processing for unstructured data",
      "Anomaly detection algorithms",
      "Contextual relationship mapping",
      "Predictive risk scoring (0-100 scale)",
    ],
    metrics: [
      { label: "Accuracy Rate", value: "99.7%" },
      { label: "False Positives", value: "<0.1%" },
      { label: "Auto-Classification", value: "94%" },
    ],
  },
  {
    phase: "03",
    title: "Policy Engine Execution",
    description: "Rules-based governance with dynamic policy adaptation",
    icon: Settings,
    processes: [
      "Multi-tier approval routing",
      "Regulatory compliance mapping (SOX, GAAP, IFRS)",
      "Custom business rule enforcement",
      "Threshold-based escalation protocols",
      "Audit trail generation per action",
    ],
    metrics: [
      { label: "Active Policies", value: "500+" },
      { label: "Compliance Rate", value: "100%" },
      { label: "Response Time", value: "<5s" },
    ],
  },
  {
    phase: "04",
    title: "Evidence Collection & Verification",
    description: "Automated documentation with cryptographic proof",
    icon: FileCheck,
    processes: [
      "Multi-party digital signature capture",
      "Document OCR and metadata extraction",
      "Cross-reference validation",
      "Immutable evidence storage (blockchain-anchored)",
      "Real-time audit log maintenance",
    ],
    metrics: [
      { label: "Documents Processed", value: "1M+/mo" },
      { label: "Verification Time", value: "<10s" },
      { label: "Tamper Detection", value: "100%" },
    ],
  },
  {
    phase: "05",
    title: "Continuous Monitoring & Alerts",
    description: "24/7 surveillance with intelligent exception management",
    icon: Eye,
    processes: [
      "Real-time KPI tracking across 200+ metrics",
      "Behavioral analytics for fraud detection",
      "Automated stakeholder notifications",
      "Escalation matrix execution",
      "Predictive issue forecasting",
    ],
    metrics: [
      { label: "Monitored Transactions", value: "5M+/day" },
      { label: "Alert Accuracy", value: "98.5%" },
      { label: "Mean Time to Alert", value: "45s" },
    ],
  },
  {
    phase: "06",
    title: "Reporting & Analytics",
    description: "Executive-grade insights with drill-down capability",
    icon: BarChart3,
    processes: [
      "Automated variance analysis",
      "Trend identification and forecasting",
      "Benchmark comparisons (industry/peer)",
      "Custom dashboard generation",
      "Regulatory filing preparation",
    ],
    metrics: [
      { label: "Report Types", value: "75+" },
      { label: "Refresh Frequency", value: "Real-time" },
      { label: "Export Formats", value: "12" },
    ],
  },
];

const complianceFrameworks = [
  { name: "SOX 404", coverage: "100%", controls: 250 },
  { name: "GAAP", coverage: "100%", controls: 180 },
  { name: "IFRS", coverage: "100%", controls: 165 },
  { name: "COSO", coverage: "100%", controls: 95 },
  { name: "COBIT", coverage: "100%", controls: 120 },
  { name: "ISO 27001", coverage: "100%", controls: 114 },
];

const integrationPartners = [
  { name: "SAP", category: "ERP", status: "Certified" },
  { name: "Oracle Financials", category: "ERP", status: "Certified" },
  { name: "NetSuite", category: "ERP", status: "Certified" },
  { name: "Workday", category: "HCM", status: "Certified" },
  { name: "Snowflake", category: "Data Warehouse", status: "Certified" },
  { name: "Databricks", category: "Analytics", status: "Certified" },
  { name: "ServiceNow", category: "ITSM", status: "Certified" },
  { name: "Salesforce", category: "CRM", status: "Certified" },
];

const securityFeatures = [
  {
    title: "End-to-End Encryption",
    description: "AES-256 encryption for data at rest and in transit",
    icon: Lock,
  },
  {
    title: "Role-Based Access Control",
    description: "Granular permissions with separation of duties enforcement",
    icon: Users,
  },
  {
    title: "Audit Trail Immutability",
    description: "Blockchain-anchored logs with tamper detection",
    icon: Shield,
  },
  {
    title: "Multi-Factor Authentication",
    description: "Biometric and token-based authentication options",
    icon: CheckCircle2,
  },
  {
    title: "Real-Time Threat Detection",
    description: "AI-powered anomaly detection and automated response",
    icon: AlertTriangle,
  },
  {
    title: "Disaster Recovery",
    description: "99.99% uptime SLA with automated failover",
    icon: RefreshCw,
  },
];

const caseStudies = [
  {
    company: "Fortune 500 Healthcare Provider",
    challenge: "Manual reconciliation of 500K+ monthly transactions across 12 subsidiaries",
    solution: "Deployed Kincaid iQ Agentic Workflow with real-time ERP integration",
    results: [
      "98% reduction in manual reconciliation time",
      "$12M annual cost savings",
      "100% SOX compliance with automated controls",
      "Real-time financial close (down from 15 days to 3 days)",
    ],
    industry: "Healthcare",
  },
  {
    company: "Global Manufacturing Conglomerate",
    challenge: "Contract leakage and vendor non-compliance across 2,000+ suppliers",
    solution: "Implemented AI-powered contract monitoring and automated evidence collection",
    results: [
      "$45M recovered in contract penalties and rebates",
      "87% reduction in vendor disputes",
      "Real-time visibility into 15,000+ active contracts",
      "Automated compliance verification across 50+ countries",
    ],
    industry: "Manufacturing",
  },
  {
    company: "Private Equity Portfolio (18 Companies)",
    challenge: "Inconsistent financial reporting and lack of standardized controls",
    solution: "Deployed enterprise-wide agentic workflow platform with custom policy engine",
    results: [
      "Unified financial reporting across all portfolio companies",
      "60% faster due diligence for new acquisitions",
      "$23M identified in operational arbitrage opportunities",
      "Automated EBITDA adjustments with full audit trail",
    ],
    industry: "Financial Services",
  },
];

export default function AgenticWorkflowPage() {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <SEO
        title="Kincaid iQ Agentic Workflow | Enterprise Financial Automation"
        description="Big 4-grade financial workflow automation with AI-powered controls, real-time compliance, and blockchain-verified audit trails."
      />
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <Nav />

        {/* Hero Section with 3D Background */}
        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
          {/* 3D Animated Background */}
          {mounted && (
            <motion.div style={{ opacity, scale }} className="absolute inset-0">
              <Hero3DScene />
            </motion.div>
          )}

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-pink-900/20 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-center mb-12"
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 border border-blue-500/30 rounded-full mb-6 backdrop-blur-xl"
              >
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-blue-300 font-semibold tracking-wide">
                  ENTERPRISE-GRADE FINANCIAL AUTOMATION
                </span>
                <Zap className="w-5 h-5 text-purple-400" />
              </motion.div>

              {/* Main Title with Gradient Animation */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent animate-gradient">
                  Kincaid iQ
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Agentic Workflow
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
              >
                Autonomous financial operations with{" "}
                <span className="text-blue-400 font-semibold">AI-powered controls</span>,{" "}
                <span className="text-purple-400 font-semibold">real-time compliance verification</span>, and{" "}
                <span className="text-pink-400 font-semibold">blockchain-verified audit trails</span>.
                <br />
                Trusted by Fortune 500 CFOs and Big 4 auditors.
              </motion.p>

              {/* CTA Buttons with Premium Effects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/request-demo"
                    className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                  >
                    <span className="relative z-10">Request Enterprise Demo</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/company"
                    className="px-8 py-4 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    Contact Sales
                  </Link>
                </motion.div>
              </motion.div>

              {/* Key Metrics Bar with Glassmorphism */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { label: "Transactions/Month", value: "150M+", icon: Database },
                  { label: "Compliance Rate", value: "100%", icon: Shield },
                  { label: "Avg. Time Savings", value: "85%", icon: TrendingUp },
                  { label: "ROI (12 months)", value: "420%", icon: Target },
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
                      <metric.icon className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                      <div className="text-3xl font-black bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent mb-1">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-400 font-medium">{metric.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Animated Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-3 bg-white/50 rounded-full"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* 3D Workflow Pipeline Visualization */}
        <section className="py-16 px-6 relative -mt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                Six-Stage Autonomous Workflow
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                End-to-end financial process automation with built-in controls, real-time validation, and
                comprehensive audit trails at every step.
              </p>
            </motion.div>

            {/* 3D Pipeline Visualization */}
            {mounted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-12"
              >
                <WorkflowPipeline3D />
              </motion.div>
            )}
          </div>
        </section>

        {/* Interactive Workflow Stages */}
        <section className="py-12 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflowStages.map((stage, index) => (
                <InteractiveStageCard key={index} stage={stage} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Frameworks with Enhanced Animations */}
        <section className="py-16 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-green-950/10 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-green-200 to-blue-300 bg-clip-text text-transparent">
                Regulatory Compliance Coverage
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Built-in controls and automated testing for major financial reporting frameworks. Audit-ready
                documentation generated automatically.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceFrameworks.map((framework, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{framework.name}</h3>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Shield className="w-7 h-7 text-green-400" />
                      </motion.div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Coverage</span>
                        <span className="text-xl font-bold text-green-400">{framework.coverage}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Automated Controls</span>
                        <span className="text-xl font-bold text-blue-400">{framework.controls}</span>
                      </div>
                      <motion.div
                        className="h-2 bg-gray-800 rounded-full overflow-hidden"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 w-full" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Partners with Enhanced Cards */}
        <section className="py-16 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                Enterprise Integration Ecosystem
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Pre-built connectors for leading enterprise systems. API-first architecture enables custom
                integrations in days, not months.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {integrationPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-center">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Network className="w-10 h-10 mx-auto mb-3 text-blue-400" />
                    </motion.div>
                    <h3 className="text-base font-bold mb-1 text-white">{partner.name}</h3>
                    <div className="text-xs text-gray-400 mb-2">{partner.category}</div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      {partner.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features with Premium Cards */}
        <section className="py-16 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-300 bg-clip-text text-transparent">
                Enterprise Security & Governance
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Bank-grade security with comprehensive audit trails. SOC 2 Type II certified with ongoing
                third-party penetration testing.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-10 h-10 text-purple-400 mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies with Premium Layout */}
        <section className="py-16 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                Enterprise Deployments
              </h2>
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                Real results from Fortune 500 companies and private equity firms who trust Kincaid iQ for
                mission-critical financial operations.
              </p>
            </motion.div>

            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-400 font-semibold mb-3">
                          {study.industry}
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2">{study.company}</h3>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Target className="w-8 h-8 text-blue-400" />
                      </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                          Challenge
                        </h4>
                        <p className="text-gray-300 mb-6">{study.challenge}</p>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                          Solution
                        </h4>
                        <p className="text-gray-300">{study.solution}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                          Results
                        </h4>
                        <ul className="space-y-3">
                          {study.results.map((result, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: idx * 0.1 }}
                              className="flex items-start gap-3"
                            >
                              <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{result}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="py-20 px-6 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-12">
                <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
                  Ready to Transform Your Financial Operations?
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Schedule a technical deep-dive with our solutions architects. <br />
                  See the platform in action with your own data.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/request-demo"
                      className="group px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden"
                    >
                      <span className="relative z-10">Request Enterprise Demo</span>
                      <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/company"
                      className="px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white text-lg font-bold rounded-full hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      Contact Sales
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </>
  );
}