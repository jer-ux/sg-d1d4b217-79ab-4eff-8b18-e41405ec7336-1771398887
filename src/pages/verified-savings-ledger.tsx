import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CheckCircle2, FileText, TrendingUp, Shield, ArrowRight, Sparkles, Database, GitBranch, Lock, Zap, BarChart3, Users, Clock, AlertCircle, Server, Cloud, Code, CheckSquare, XCircle, Building2, DollarSign, Target, Award } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getTerm, LEDGER_STATE_LABELS, COMPLIANCE_SECTIONS } from "@/lib/compliance/terminology";

export default function VerifiedSavingsLedger() {
  // Default to compliance view for this page (CFO/Board audience)
  const userRole = "cfo";
  const useComplianceTerms = true;

  return (
    <>
      <SEO
        title={`${getTerm("valueLedger", userRole)} — Kincaid IQ`}
        description="Auditable value ledger with cryptographic receipts, control owners, and CFO-ready reporting for enterprise compliance."
      />
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
        <SiteHeader />
        
        {/* Premium 3D Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-500/20 rounded-full blur-[90px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <main className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            {/* Hero Section with Premium Design */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-xl px-4 py-2 mb-6">
                <Sparkles className="h-4 w-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300">
                  {useComplianceTerms ? "ERISA-Compliant Value Tracking" : "Audit-Grade Value Tracking"}
                </span>
              </div>
              <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                {getTerm("valueLedger", userRole)}
              </h1>
              <p className="text-xl text-purple-200/70 max-w-3xl mx-auto leading-relaxed">
                {useComplianceTerms 
                  ? "Auditable register of financial controls with cryptographic evidence, control owners, and real-time reconciliation for fiduciary compliance."
                  : "Stop arguing about 'opportunities.' Start reconciling an auditable value ledger with receipts, owners, and board-ready reporting."}
              </p>
            </motion.div>

            {/* Premium Stats Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-20"
            >
              {[
                { 
                  label: "Ledger States", 
                  value: "4", 
                  desc: useComplianceTerms 
                    ? "Under Review → Action Authorized → Value Confirmed → Exception Queue"
                    : "Identified → Approved → Realized → At-risk"
                },
                { 
                  label: getTerm("evidence", userRole), 
                  value: "100%", 
                  desc: "Full lineage, tests, and confidence scores with cryptographic signing"
                },
                { 
                  label: "Audit Ready", 
                  value: "Real-time", 
                  desc: useComplianceTerms 
                    ? "Continuous reconciliation for CFO attestation"
                    : "Journal-entry thinking for finance teams"
                }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 to-blue-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-purple-500/50 group-hover:to-blue-500/50 transition-all duration-500" />
                  <div className="relative">
                    <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent mb-3">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-white mb-2">{stat.label}</div>
                    <div className="text-sm text-purple-200/60">{stat.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Ledger States Flow */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Ledger State Flow
              </h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { 
                    state: "IDENTIFIED" as const, 
                    color: "blue", 
                    icon: FileText, 
                    desc: useComplianceTerms 
                      ? "Discovery and documentation phase with initial evidence"
                      : "Discovery phase with initial evidence"
                  },
                  { 
                    state: "APPROVED" as const, 
                    color: "purple", 
                    icon: CheckCircle2, 
                    desc: useComplianceTerms
                      ? "Control owner authorization with attestation"
                      : "Validated and ready for execution"
                  },
                  { 
                    state: "REALIZED" as const, 
                    color: "emerald", 
                    icon: TrendingUp, 
                    desc: useComplianceTerms
                      ? "Financial impact verified and reconciled to GL"
                      : "Value captured and verified"
                  },
                  { 
                    state: "AT_RISK" as const, 
                    color: "amber", 
                    icon: Shield, 
                    desc: useComplianceTerms
                      ? "Control gap requiring immediate remediation"
                      : "Flagged for intervention"
                  }
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      className={`rounded-2xl border border-${item.color}-500/30 bg-${item.color}-500/10 backdrop-blur-xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-lg hover:shadow-${item.color}-500/20`}
                    >
                      <item.icon className={`h-8 w-8 text-${item.color}-400 mb-3`} />
                      <div className={`text-lg font-semibold text-${item.color}-300 mb-2`}>
                        {useComplianceTerms 
                          ? LEDGER_STATE_LABELS.compliance[item.state]
                          : LEDGER_STATE_LABELS.operational[item.state]}
                      </div>
                      <div className="text-xs text-white/60">
                        {item.desc}
                      </div>
                    </motion.div>
                    {i < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                        <ArrowRight className="h-5 w-5 text-purple-400/50" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technical Architecture Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {useComplianceTerms ? "Compliance Architecture" : "Technical Architecture"}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Database,
                    title: "Event-Sourced Ledger",
                    desc: useComplianceTerms
                      ? "Append-only audit log ensures complete chain of custody with cryptographic verification for ERISA compliance"
                      : "Append-only event log ensures complete audit trail with cryptographic verification",
                    features: ["Immutable history", "Time-travel queries", "Cryptographic signatures"]
                  },
                  {
                    icon: GitBranch,
                    title: useComplianceTerms ? "Control State Machine" : "State Machine Logic",
                    desc: useComplianceTerms
                      ? "Deterministic state transitions with policy enforcement and separation of duties"
                      : "Deterministic state transitions with validation rules and business logic enforcement",
                    features: ["Guard conditions", "State validators", "Transition policies"]
                  },
                  {
                    icon: Lock,
                    title: "Access Control",
                    desc: useComplianceTerms
                      ? "Role-based permissions with segregation of duties and multi-party attestation workflows per SOX requirements"
                      : "Role-based permissions with separation of duties and multi-party approval workflows",
                    features: ["RBAC policies", "Approval chains", "Audit logging"]
                  },
                  {
                    icon: Zap,
                    title: "Real-time Sync",
                    desc: useComplianceTerms
                      ? "WebSocket streams for instant dashboard updates and automated exception alerts"
                      : "WebSocket streams for instant updates across all connected stakeholders and systems",
                    features: ["Live dashboards", "Push notifications", "Event broadcasting"]
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                    className="group rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20"
                  >
                    <item.icon className="h-10 w-10 text-purple-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-purple-200/70 mb-4">{item.desc}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-purple-200/60">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Receipt Evidence System */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {getTerm("evidence", userRole)} System
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Data Lineage",
                    icon: Code,
                    items: [
                      "Source system tracking",
                      "Transformation pipeline",
                      "Query reproducibility",
                      useComplianceTerms ? "Audit trail versioning" : "Version control"
                    ]
                  },
                  {
                    title: useComplianceTerms ? "Validation Coverage" : "Test Coverage",
                    icon: CheckSquare,
                    items: [
                      "Data quality tests",
                      "Business rule validation",
                      "Statistical checks",
                      "Anomaly detection"
                    ]
                  },
                  {
                    title: getTerm("confidence", userRole),
                    icon: BarChart3,
                    items: [
                      useComplianceTerms ? "Evidence strength metrics" : "Evidence strength scoring",
                      "Uncertainty quantification",
                      "Risk assessment",
                      "Reliability scoring"
                    ]
                  }
                ].map((section, i) => (
                  <div key={i} className="rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-xl p-6">
                    <section.icon className="h-8 w-8 text-purple-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-purple-200/70">
                          <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Integration Ecosystem */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Enterprise Integration
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    category: "Data Sources",
                    icon: Server,
                    systems: ["ERP Systems", "Data Warehouses", "Cloud Storage", "Databases", "APIs", "File Systems"]
                  },
                  {
                    category: "Analytics Platforms",
                    icon: Cloud,
                    systems: ["Snowflake", "Databricks", "AWS", "Azure", "GCP", "Tableau"]
                  },
                  {
                    category: "Workflow Tools",
                    icon: Users,
                    systems: ["ServiceNow", "Jira", "Slack", "Teams", "Email", "Custom Apps"]
                  }
                ].map((section, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
                    className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-white/[0.03] to-transparent backdrop-blur-xl p-8"
                  >
                    <section.icon className="h-10 w-10 text-blue-400 mb-4" />
                    <h3 className="text-xl font-bold text-white mb-4">{section.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {section.systems.map((system, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300"
                        >
                          {system}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Use Cases by Industry */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Use Cases by Industry
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    industry: "Private Equity / M&A",
                    icon: Building2,
                    useCases: [
                      "Diligence value validation with proof packs",
                      "Post-close value tracking and realization",
                      "Portfolio company performance monitoring",
                      "Exit readiness and value documentation"
                    ]
                  },
                  {
                    industry: "Healthcare / Insurance",
                    icon: Shield,
                    useCases: [
                      "Claims savings verification and tracking",
                      "Provider contract compliance monitoring",
                      "Medical cost trend analysis",
                      "Risk adjustment accuracy validation"
                    ]
                  },
                  {
                    industry: "Enterprise Procurement",
                    icon: DollarSign,
                    useCases: [
                      "Vendor savings verification and attribution",
                      "Contract compliance monitoring",
                      "Spend optimization tracking",
                      "Supplier performance measurement"
                    ]
                  },
                  {
                    industry: "Financial Services",
                    icon: Target,
                    useCases: [
                      "Operational efficiency improvements",
                      "Technology cost optimization",
                      "Process automation ROI tracking",
                      "Regulatory compliance cost management"
                    ]
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 + i * 0.1 }}
                    className="group rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.01] transition-all duration-500"
                  >
                    <item.icon className="h-10 w-10 text-emerald-400 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-4">{item.industry}</h3>
                    <ul className="space-y-3">
                      {item.useCases.map((useCase, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="text-purple-200/70">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Value Realization Metrics */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mb-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Value Realization Metrics
              </h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: "Cycle Time", metric: "Days to realize", icon: Clock },
                  { label: "Capture Rate", metric: "% of identified value", icon: Target },
                  { label: "Decay Rate", metric: "Value erosion over time", icon: TrendingUp },
                  { label: "Attribution", metric: "Owner accountability", icon: Award }
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-xl p-6 text-center">
                    <item.icon className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                    <div className="text-sm font-semibold text-white mb-1">{item.label}</div>
                    <div className="text-xs text-purple-200/60">{item.metric}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    Leading Indicators
                  </h4>
                  <ul className="space-y-2 text-sm text-purple-200/70">
                    <li>• Pipeline velocity (idea to approval)</li>
                    <li>• Evidence completeness scores</li>
                    <li>• Stakeholder engagement rates</li>
                    <li>• Exception resolution time</li>
                  </ul>
                </div>
                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl p-6">
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-400" />
                    Lagging Indicators
                  </h4>
                  <ul className="space-y-2 text-sm text-purple-200/70">
                    <li>• Total realized value (actualized savings)</li>
                    <li>• Realization rate vs. target</li>
                    <li>• Value decay and leakage</li>
                    <li>• Audit findings and adjustments</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Comparison: Traditional vs Kincaid IQ */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="mb-20"
            >
              <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Traditional vs. Kincaid IQ Approach
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <XCircle className="h-8 w-8 text-red-400" />
                    <h3 className="text-2xl font-bold text-white">Traditional Approach</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Spreadsheet tracking with version conflicts",
                      "No audit trail or evidence lineage",
                      "Manual reconciliation and disputes",
                      "Unclear ownership and accountability",
                      "No real-time visibility or alerts",
                      "Difficult to prove value in diligence"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span className="text-red-200/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                    <h3 className="text-2xl font-bold text-white">Kincaid IQ Platform</h3>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Event-sourced ledger with full history",
                      "Cryptographic evidence receipts",
                      "Automated reconciliation and alerts",
                      "Clear ownership and state tracking",
                      "Real-time dashboards and notifications",
                      "Diligence-ready proof packs on demand"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-emerald-200/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Stakeholder Views */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="grid md:grid-cols-2 gap-8 mb-20"
            >
              <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/0 to-blue-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-purple-500/50 group-hover:to-blue-500/50 transition-all duration-500" />
                <div className="relative">
                  <div className="text-2xl font-bold mb-4 text-white">What a CFO sees</div>
                  <div className="text-purple-200/70 mb-6 leading-relaxed">
                    {useComplianceTerms
                      ? "A fiduciary-compliant register of financial controls: designated control owners, resolution timelines, supporting documentation, aging analysis, and verified outcomes tied to management action."
                      : "A controlled register of economic claims: owners, due dates, receipts, aging/decay, and realized outcomes tied to action."}
                  </div>
                  <ul className="space-y-3">
                    {[
                      useComplianceTerms ? "Reconciliation report by control domain and vendor" : "Reconciliation report by category and counterparty",
                      useComplianceTerms ? "Exception queue (pending authorizations, missing documentation)" : "Exceptions queue (blocked approvals, missing receipts)",
                      useComplianceTerms ? "Complete audit trail of every transaction (append-only events)" : "Audit trail of every change (append-only events)",
                      "Real-time dashboards with drill-down capability",
                      useComplianceTerms ? "Automated alerts for control gaps and aging items" : "Automated alerts for at-risk value items"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-purple-100/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="group rounded-3xl border border-white/10 bg-gradient-to-br from-blue-500/10 via-white/[0.03] to-transparent backdrop-blur-xl p-8 hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/0 to-purple-500/0 rounded-3xl blur opacity-0 group-hover:opacity-30 group-hover:from-blue-500/50 group-hover:to-purple-500/50 transition-all duration-500" />
                <div className="relative">
                  <div className="text-2xl font-bold mb-4 text-white">What capital sees</div>
                  <div className="text-blue-200/70 mb-6 leading-relaxed">
                    {useComplianceTerms
                      ? "Reduced due diligence risk: comprehensive evidence packages with full audit trails, underwriteable value projections, and repeatable governance processes that survive regulatory scrutiny."
                      : "Reduced uncertainty: evidence packs for diligence, underwriteable value, and repeatable realization discipline post-close."}
                  </div>
                  <ul className="space-y-3">
                    {[
                      useComplianceTerms ? "Diligence-ready audit packages with complete documentation" : "Diligence-ready 'Proof Packs' with full evidence",
                      useComplianceTerms ? "Proven post-acquisition value capture methodology" : "Repeatable post-close value realization process",
                      useComplianceTerms ? "Controls framework that meets institutional standards" : "Governance posture that survives scrutiny",
                      "Historical track record and success metrics",
                      useComplianceTerms ? "Risk-adjusted value forecasts with confidence intervals" : "Risk-adjusted value projections with confidence intervals"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-blue-100/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mb-20 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.03] to-transparent backdrop-blur-xl p-8 shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "How does the ledger handle value that gets 'blocked' or never realizes?",
                    a: "Items transition to 'At-risk' state automatically based on aging rules and missing milestones. This triggers alerts and creates an audit trail of why value didn't materialize, preserving accountability."
                  },
                  {
                    q: "Can we integrate with our existing ERP and financial systems?",
                    a: "Yes. The platform provides REST APIs, webhooks, and pre-built connectors for major ERP systems (SAP, Oracle, NetSuite). You can also sync via scheduled exports or real-time streaming."
                  },
                  {
                    q: "What happens if someone disputes a ledger entry?",
                    a: "All changes are logged in an append-only event stream. Disputes trigger a review workflow where stakeholders can add notes, attach evidence, and request adjustments. The full history remains visible for audit."
                  },
                  {
                    q: "How granular should we track savings opportunities?",
                    a: "We recommend tracking at the initiative or project level (not individual line items). Each entry should have clear ownership, measurable metrics, and a realistic timeline for realization."
                  },
                  {
                    q: "What's the difference between a 'receipt' and a 'proof pack'?",
                    a: "A receipt is a single piece of evidence (data lineage, test results, approval). A proof pack is a curated collection of receipts that tells the complete story for diligence or audit purposes."
                  }
                ].map((faq, i) => (
                  <div key={i} className="rounded-2xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-xl p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <AlertCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-1" />
                      <h3 className="text-lg font-semibold text-white">{faq.q}</h3>
                    </div>
                    <p className="text-purple-200/70 pl-8">{faq.a}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-transparent backdrop-blur-xl p-12 text-center shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {useComplianceTerms 
                  ? "Ready to implement your compliance ledger?"
                  : "Ready to build your value ledger?"}
              </h2>
              <p className="text-purple-200/70 mb-8 max-w-2xl mx-auto">
                {useComplianceTerms
                  ? "See how leading enterprises track, verify, and reconcile business value with audit-grade precision and fiduciary compliance."
                  : "See how leading enterprises track, verify, and realize business value with audit-grade precision."}
              </p>
              <Link
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-8 py-4 text-lg font-semibold text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                Request Demo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}