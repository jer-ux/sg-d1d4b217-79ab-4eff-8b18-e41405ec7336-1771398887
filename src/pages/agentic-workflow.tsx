import { useState } from "react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import {
  ArrowRight,
  CheckCircle2,
  Database,
  GitBranch,
  Shield,
  Users,
  Zap,
  FileCheck,
  AlertTriangle,
  TrendingUp,
  Lock,
  Clock,
  Brain,
  Target,
  BarChart3,
  FileText,
  Server,
  Eye,
  RefreshCw,
  Workflow,
  Network,
  Binary,
  Cpu,
  Settings,
  ChevronRight,
  CheckSquare,
  AlertCircle,
  Info,
} from "lucide-react";

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
  const [selectedStage, setSelectedStage] = useState(0);

  return (
    <>
      <SEO
        title="Kincaid iQ Agentic Workflow | Enterprise Financial Automation"
        description="Big 4-grade financial workflow automation with AI-powered controls, real-time compliance, and blockchain-verified audit trails."
      />
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
        <Nav />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                <Workflow className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400 font-medium">
                  Enterprise-Grade Financial Automation
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-gray-400 bg-clip-text text-transparent">
                Kincaid iQ Agentic Workflow
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Autonomous financial operations with AI-powered controls, real-time compliance verification,
                and blockchain-verified audit trails. Trusted by Fortune 500 CFOs and Big 4 auditors.
              </p>
            </motion.div>

            {/* Key Metrics Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            >
              {[
                { label: "Transactions/Month", value: "150M+" },
                { label: "Compliance Rate", value: "100%" },
                { label: "Avg. Time Savings", value: "85%" },
                { label: "ROI (12 months)", value: "420%" },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 text-center"
                >
                  <div className="text-3xl font-bold text-blue-400 mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Workflow Stages - Interactive */}
        <section className="py-20 px-6 bg-gradient-to-b from-gray-900/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Six-Stage Autonomous Workflow</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              End-to-end financial process automation with built-in controls, real-time validation, and
              comprehensive audit trails at every step.
            </p>

            {/* Stage Selection */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {workflowStages.map((stage, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedStage(index)}
                  className={`p-4 rounded-xl border transition-all duration-300 ${
                    selectedStage === index
                      ? "bg-blue-500/20 border-blue-500/50 scale-105"
                      : "bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/50"
                  }`}
                >
                  <div className="text-2xl font-bold text-blue-400 mb-2">{stage.phase}</div>
                  <stage.icon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <div className="text-xs text-gray-300 font-medium">{stage.title}</div>
                </button>
              ))}
            </div>

            {/* Selected Stage Detail */}
            <motion.div
              key={selectedStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8"
            >
              <div className="flex items-start gap-6 mb-8">
                <div className="bg-blue-500/20 p-4 rounded-xl">
                  {(() => {
                    const Icon = workflowStages[selectedStage].icon;
                    return <Icon className="w-8 h-8 text-blue-400" />;
                  })()}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-blue-400 font-semibold mb-2">
                    PHASE {workflowStages[selectedStage].phase}
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{workflowStages[selectedStage].title}</h3>
                  <p className="text-gray-400 text-lg">{workflowStages[selectedStage].description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Processes */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <CheckSquare className="w-5 h-5 text-blue-400" />
                    Core Processes
                  </h4>
                  <ul className="space-y-3">
                    {workflowStages[selectedStage].processes.map((process, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{process}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    Performance Metrics
                  </h4>
                  <div className="space-y-4">
                    {workflowStages[selectedStage].metrics.map((metric, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/30">
                        <div className="text-2xl font-bold text-blue-400 mb-1">{metric.value}</div>
                        <div className="text-sm text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Compliance Frameworks */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Regulatory Compliance Coverage</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Built-in controls and automated testing for major financial reporting frameworks. Audit-ready
              documentation generated automatically.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complianceFrameworks.map((framework, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{framework.name}</h3>
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Coverage</span>
                      <span className="text-lg font-bold text-green-400">{framework.coverage}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Automated Controls</span>
                      <span className="text-lg font-bold text-blue-400">{framework.controls}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 w-full" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Partners */}
        <section className="py-20 px-6 bg-gradient-to-b from-gray-900/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Enterprise Integration Ecosystem</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Pre-built connectors for leading enterprise systems. API-first architecture enables custom
              integrations in days, not months.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {integrationPartners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 border border-gray-700/50 rounded-xl p-6 text-center hover:border-blue-500/50 transition-all duration-300"
                >
                  <Network className="w-10 h-10 mx-auto mb-3 text-blue-400" />
                  <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
                  <div className="text-xs text-gray-400 mb-2">{partner.category}</div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-xs text-green-400">
                    <CheckCircle2 className="w-3 h-3" />
                    {partner.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Governance */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Enterprise Security & Governance</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Bank-grade security with comprehensive audit trails. SOC 2 Type II certified with ongoing
              third-party penetration testing.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6"
                >
                  <feature.icon className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-6 bg-gradient-to-b from-gray-900/50 to-transparent">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center">Enterprise Deployments</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Real results from Fortune 500 companies and private equity firms who trust Kincaid iQ for
              mission-critical financial operations.
            </p>

            <div className="space-y-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-8"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400 mb-3">
                        {study.industry}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{study.company}</h3>
                    </div>
                    <Target className="w-8 h-8 text-blue-400" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Challenge
                      </h4>
                      <p className="text-gray-300 mb-6">{study.challenge}</p>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Solution
                      </h4>
                      <p className="text-gray-300">{study.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Results
                      </h4>
                      <ul className="space-y-3">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-12"
            >
              <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Financial Operations?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Schedule a technical deep-dive with our solutions architects. See the platform in action
                with your own data.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/request-demo"
                  className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  Request Enterprise Demo
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/company"
                  className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300"
                >
                  Contact Sales
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}