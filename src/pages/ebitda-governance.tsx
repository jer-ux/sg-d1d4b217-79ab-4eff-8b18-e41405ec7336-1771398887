import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SEO } from "@/components/SEO";
import {
  TrendingUp,
  Shield,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Activity,
  Target,
  BarChart3,
  Scale,
  Lock,
  Eye,
  GitBranch,
  Clock,
  Users,
  DollarSign,
  PieChart,
  Layers,
  Zap,
  FileCheck,
  AlertCircle,
  TrendingDown,
  BookOpen,
  Briefcase,
  Calculator,
  Crown
} from "lucide-react";

const Badge = ({ children, icon: Icon, variant = "default" }: { children: React.ReactNode; icon?: React.ComponentType<{ className?: string }>; variant?: "default" | "success" | "warning" | "danger" }) => {
  const colors = {
    default: "border-amber-500/30 bg-gradient-to-r from-amber-950/80 to-amber-900/60 text-amber-200",
    success: "border-emerald-500/30 bg-gradient-to-r from-emerald-950/80 to-emerald-900/60 text-emerald-200",
    warning: "border-orange-500/30 bg-gradient-to-r from-orange-950/80 to-orange-900/60 text-orange-200",
    danger: "border-red-500/30 bg-gradient-to-r from-red-950/80 to-red-900/60 text-red-200"
  };

  return (
    <motion.span
      className={`inline-flex items-center rounded-full border ${colors[variant]} px-3 py-1 text-xs shadow-lg backdrop-blur-sm`}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {Icon && <Icon className="mr-1.5 h-3 w-3" />}
      {children}
    </motion.span>
  );
};

const MetricCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  delay = 0
}: {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}) => {
  const changeColors = {
    positive: "text-emerald-400",
    negative: "text-red-400",
    neutral: "text-amber-400"
  };

  return (
    <motion.div
      className="group relative rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-6 shadow-2xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-amber-600/0 via-amber-500/30 to-purple-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <Icon className="h-8 w-8 text-amber-400" />
          <span className={`text-sm font-semibold ${changeColors[changeType]}`}>{change}</span>
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="mt-2 text-sm text-zinc-400">{title}</div>
      </div>
    </motion.div>
  );
};

const GovernanceFrameworkCard = ({
  title,
  description,
  controls,
  icon: Icon,
  delay = 0
}: {
  title: string;
  description: string;
  controls: string[];
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}) => (
  <motion.div
    className="group relative rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-6 shadow-2xl backdrop-blur-sm"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.02 }}
  >
    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-blue-600/0 via-blue-500/30 to-purple-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
    
    <div className="relative">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 text-amber-400 shadow-lg">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 mb-4">{description}</p>
      <div className="space-y-2">
        {controls.map((control, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-zinc-300">{control}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProcessStep = ({
  number,
  title,
  description,
  details,
  delay = 0
}: {
  number: number;
  title: string;
  description: string;
  details: string[];
  delay?: number;
}) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 text-amber-400 font-bold text-lg shadow-lg">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-zinc-400 mb-3">{description}</p>
        <div className="space-y-1.5">
          {details.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-amber-400/70 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-zinc-500">{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const RiskIndicator = ({
  category,
  level,
  mitigation,
  delay = 0
}: {
  category: string;
  level: "low" | "medium" | "high";
  mitigation: string;
  delay?: number;
}) => {
  const levelConfig = {
    low: { color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500/30", icon: CheckCircle2 },
    medium: { color: "text-amber-400", bg: "bg-amber-500/20", border: "border-amber-500/30", icon: AlertTriangle },
    high: { color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30", icon: AlertCircle }
  };

  const config = levelConfig[level];
  const Icon = config.icon;

  return (
    <motion.div
      className={`rounded-xl border ${config.border} ${config.bg} p-4 backdrop-blur-sm`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, x: 5 }}
    >
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${config.color} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-white text-sm">{category}</h4>
            <span className={`text-xs font-bold ${config.color} uppercase`}>{level}</span>
          </div>
          <p className="text-xs text-zinc-400">{mitigation}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function EBITDAGovernancePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "framework" | "process" | "monitoring">("overview");

  return (
    <>
      <SEO
        title="EBITDA Governance Framework - Kincaid IQ"
        description="Comprehensive EBITDA governance framework with receipts-first verification, evidence-backed controls, and financial discipline for benefits administration"
        image="/og-image.png"
      />

      <main className="relative min-h-screen bg-black text-zinc-100">
        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf2412_1px,transparent_1px),linear-gradient(to_bottom,#fbbf2412_1px,transparent_1px)] bg-[size:64px_64px]" />
        </div>

        {/* Hero */}
        <section className="relative mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors mb-8">
            <ArrowRight className="h-4 w-4 rotate-180" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge icon={Crown}>Enterprise Governance</Badge>
              <Badge icon={Shield} variant="success">Evidence-Backed</Badge>
              <Badge icon={TrendingUp}>EBITDA Focus</Badge>
            </div>

            <h1 className="bg-gradient-to-br from-white via-amber-100 to-zinc-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-6xl mb-6">
              EBITDA Governance Framework
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
              Run benefits administration with the same financial discipline as your core operations. Every dollar tracked, every decision documented, every outcome provable.
            </p>
          </motion.div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4 mb-12">
            <MetricCard
              title="Avg Cost Reduction"
              value="18.3%"
              change="↓ $2.4M annually"
              changeType="positive"
              icon={TrendingDown}
              delay={0.1}
            />
            <MetricCard
              title="Variance Control"
              value="94.7%"
              change="↑ 12% YoY"
              changeType="positive"
              icon={Target}
              delay={0.2}
            />
            <MetricCard
              title="Audit Pass Rate"
              value="99.2%"
              change="First-time pass"
              changeType="positive"
              icon={CheckCircle2}
              delay={0.3}
            />
            <MetricCard
              title="Evidence Coverage"
              value="100%"
              change="All claims backed"
              changeType="positive"
              icon={FileCheck}
              delay={0.4}
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 border-b border-amber-500/20 mb-8">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "framework", label: "Framework", icon: Layers },
              { id: "process", label: "Process", icon: GitBranch },
              { id: "monitoring", label: "Monitoring", icon: Eye }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all ${
                  activeTab === id
                    ? "border-b-2 border-amber-500 text-amber-400"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <section className="relative mx-auto w-full max-w-6xl px-6 pb-16">
          {activeTab === "overview" && (
            <div className="space-y-12">
              {/* Principles */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Core Governance Principles
                </motion.h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <GovernanceFrameworkCard
                    title="Evidence-First Approach"
                    description="Every metric, decision, and recommendation must cite source documents"
                    controls={[
                      "Receipts linked to every transaction",
                      "Vendor invoices verified and versioned",
                      "Contract terms extracted and monitored",
                      "Audit trail for all modifications"
                    ]}
                    icon={FileCheck}
                    delay={0.1}
                  />
                  <GovernanceFrameworkCard
                    title="Financial Discipline"
                    description="Treat benefits spend with same rigor as capital expenditure"
                    controls={[
                      "Unit economics (PEPM) tracked monthly",
                      "Variance analysis with root cause",
                      "Budget vs actual reconciliation",
                      "ROI measurement for all initiatives"
                    ]}
                    icon={Calculator}
                    delay={0.2}
                  />
                  <GovernanceFrameworkCard
                    title="Proactive Risk Management"
                    description="Identify and mitigate financial exposure before it materializes"
                    controls={[
                      "Contract term monitoring and alerts",
                      "Utilization pattern anomaly detection",
                      "Vendor performance scoring",
                      "Regulatory compliance tracking"
                    ]}
                    icon={Shield}
                    delay={0.3}
                  />
                  <GovernanceFrameworkCard
                    title="Stakeholder Alignment"
                    description="Cross-functional visibility and accountability"
                    controls={[
                      "Executive dashboards with drill-down",
                      "Role-based access and approvals",
                      "Automated reporting and alerts",
                      "Collaborative decision workflows"
                    ]}
                    icon={Users}
                    delay={0.4}
                  />
                </div>
              </div>

              {/* Value Levers */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  EBITDA Impact Levers
                </motion.h2>
                <motion.div
                  className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        title: "Cost Avoidance",
                        items: [
                          "Contract term enforcement (auto-renewal prevention)",
                          "Utilization management (high-cost claim intervention)",
                          "Vendor consolidation (volume discount capture)",
                          "Plan design optimization (benefit vs cost trade-offs)"
                        ]
                      },
                      {
                        title: "Revenue Optimization",
                        items: [
                          "Rebate and incentive maximization",
                          "Stop-loss recovery tracking",
                          "Subrogation claim pursuit",
                          "Medicare coordination of benefits"
                        ]
                      },
                      {
                        title: "Operational Efficiency",
                        items: [
                          "Claims processing automation",
                          "Vendor invoice reconciliation",
                          "Eligibility verification streamlining",
                          "Reporting and compliance automation"
                        ]
                      },
                      {
                        title: "Risk Mitigation",
                        items: [
                          "Financial exposure quantification",
                          "Catastrophic claim modeling",
                          "Regulatory penalty avoidance",
                          "Vendor performance guarantees"
                        ]
                      }
                    ].map((lever, idx) => (
                      <motion.div
                        key={lever.title}
                        className="space-y-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      >
                        <h3 className="text-lg font-bold text-amber-400">{lever.title}</h3>
                        <div className="space-y-2">
                          {lever.items.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <Zap className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-zinc-300">{item}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === "framework" && (
            <div className="space-y-12">
              {/* Three Lines of Defense */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Three Lines of Defense Model
                </motion.h2>
                <div className="grid gap-6">
                  {[
                    {
                      line: "First Line: Operations",
                      description: "Day-to-day management owns and manages risks",
                      responsibilities: [
                        "Benefits administration team executes policies",
                        "Vendor relationship managers monitor performance",
                        "Claims processors verify and adjudicate",
                        "Enrollment coordinators maintain eligibility"
                      ],
                      controls: [
                        "Standard operating procedures (SOPs)",
                        "Transaction approval workflows",
                        "Daily reconciliation checks",
                        "Exception handling protocols"
                      ]
                    },
                    {
                      line: "Second Line: Oversight",
                      description: "Independent review and compliance monitoring",
                      responsibilities: [
                        "Finance validates spend vs budget",
                        "Compliance reviews regulatory adherence",
                        "Risk management assesses exposure",
                        "Quality assurance audits processes"
                      ],
                      controls: [
                        "Periodic audit sampling",
                        "Policy compliance testing",
                        "Vendor contract reviews",
                        "Financial variance analysis"
                      ]
                    },
                    {
                      line: "Third Line: Assurance",
                      description: "Independent audit and governance validation",
                      responsibilities: [
                        "Internal audit validates control effectiveness",
                        "External auditors certify financial accuracy",
                        "Board/committee receives governance reports",
                        "Executive leadership approves major decisions"
                      ],
                      controls: [
                        "Annual comprehensive audits",
                        "Board-level reporting packages",
                        "Executive decision documentation",
                        "Strategic initiative reviews"
                      ]
                    }
                  ].map((defense, idx) => (
                    <motion.div
                      key={defense.line}
                      className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.2 }}
                    >
                      <div className="flex items-start gap-4 mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 text-amber-400 font-bold text-xl shadow-lg flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{defense.line}</h3>
                          <p className="text-sm text-zinc-400 mt-1">{defense.description}</p>
                        </div>
                      </div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-bold text-amber-400 mb-3">Responsibilities</h4>
                          <div className="space-y-2">
                            {defense.responsibilities.map((resp, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <Users className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-zinc-300">{resp}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-amber-400 mb-3">Key Controls</h4>
                          <div className="space-y-2">
                            {defense.controls.map((control, i) => (
                              <div key={i} className="flex items-start gap-2">
                                <Lock className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-zinc-300">{control}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Control Environment */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Control Environment
                </motion.h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      category: "Preventive Controls",
                      description: "Stop errors before they occur",
                      examples: [
                        "Authorization workflows",
                        "Contract term limits",
                        "Budget approval gates",
                        "Vendor pre-qualification"
                      ]
                    },
                    {
                      category: "Detective Controls",
                      description: "Identify issues after occurrence",
                      examples: [
                        "Variance alerts",
                        "Anomaly detection",
                        "Reconciliation reports",
                        "Audit sampling"
                      ]
                    },
                    {
                      category: "Corrective Controls",
                      description: "Remediate identified issues",
                      examples: [
                        "Incident response procedures",
                        "Claim reprocessing workflows",
                        "Contract renegotiation",
                        "Process improvement cycles"
                      ]
                    }
                  ].map((control, idx) => (
                    <motion.div
                      key={control.category}
                      className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-6 shadow-2xl backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <h3 className="text-lg font-bold text-amber-400 mb-2">{control.category}</h3>
                      <p className="text-sm text-zinc-400 mb-4">{control.description}</p>
                      <div className="space-y-2">
                        {control.examples.map((example, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Shield className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-zinc-300">{example}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "process" && (
            <div className="space-y-12">
              {/* Governance Workflow */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  End-to-End Governance Workflow
                </motion.h2>
                <div className="space-y-6">
                  <ProcessStep
                    number={1}
                    title="Document Ingestion"
                    description="Receipts and evidence enter the system"
                    details={[
                      "Upload vendor invoices, contracts, 5500s, census files",
                      "Automated parsing and data extraction",
                      "Document classification and tagging",
                      "Cryptographic hashing for tamper-evidence"
                    ]}
                    delay={0.1}
                  />
                  <ProcessStep
                    number={2}
                    title="Verification & Validation"
                    description="Cross-check data against known sources"
                    details={[
                      "Invoice amounts vs contract terms",
                      "Eligibility vs census records",
                      "Claims vs plan coverage",
                      "Vendor performance vs SLA commitments"
                    ]}
                    delay={0.2}
                  />
                  <ProcessStep
                    number={3}
                    title="Exception Flagging"
                    description="Automated anomaly detection"
                    details={[
                      "Out-of-policy spend identified",
                      "Contract term violations highlighted",
                      "Variance from budget flagged",
                      "Missing documentation noted"
                    ]}
                    delay={0.3}
                  />
                  <ProcessStep
                    number={4}
                    title="Human Review & Approval"
                    description="Stakeholder decision workflow"
                    details={[
                      "Benefits manager reviews exceptions",
                      "Finance approves budget variances",
                      "Legal signs off on contract changes",
                      "Decisions logged with notes and rationale"
                    ]}
                    delay={0.4}
                  />
                  <ProcessStep
                    number={5}
                    title="Execution & Monitoring"
                    description="Implement decisions and track outcomes"
                    details={[
                      "Approved changes executed in systems",
                      "Vendor communications documented",
                      "Member notifications sent",
                      "KPI dashboards updated in real-time"
                    ]}
                    delay={0.5}
                  />
                  <ProcessStep
                    number={6}
                    title="Reporting & Audit"
                    description="Governance artifacts for leadership and auditors"
                    details={[
                      "Executive dashboards: spend, variance, risk",
                      "Board packets: outcomes, initiatives, trends",
                      "Audit trail exports: decisions, approvals, evidence",
                      "Compliance certifications: 5500, HIPAA, ERISA"
                    ]}
                    delay={0.6}
                  />
                </div>
              </div>

              {/* Decision Framework */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Decision Framework
                </motion.h2>
                <motion.div
                  className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="space-y-6">
                    {[
                      {
                        threshold: "< $10K",
                        authority: "Benefits Manager",
                        requirements: ["Evidence in ledger", "Documented rationale"],
                        examples: ["Routine vendor invoice approval", "Member eligibility corrections"]
                      },
                      {
                        threshold: "$10K - $100K",
                        authority: "Finance Director + Benefits VP",
                        requirements: ["Budget variance explanation", "Cost-benefit analysis", "Alternatives considered"],
                        examples: ["Plan design adjustments", "Vendor contract amendments"]
                      },
                      {
                        threshold: "$100K+",
                        authority: "CFO + Board Committee",
                        requirements: ["Full business case", "Risk assessment", "Actuarial opinion", "Legal review"],
                        examples: ["Carrier changes", "Stop-loss strategy shifts", "Major plan redesigns"]
                      }
                    ].map((level, idx) => (
                      <motion.div
                        key={level.threshold}
                        className="border-l-4 border-amber-500/50 pl-6 py-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-amber-400">{level.threshold}</span>
                          <span className="text-sm text-zinc-500">Financial Threshold</span>
                        </div>
                        <div className="mb-3">
                          <span className="text-sm text-zinc-400">Decision Authority: </span>
                          <span className="text-sm font-semibold text-white">{level.authority}</span>
                        </div>
                        <div className="mb-3">
                          <div className="text-sm text-zinc-400 mb-2">Requirements:</div>
                          <div className="space-y-1">
                            {level.requirements.map((req, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                <span className="text-sm text-zinc-300">{req}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-zinc-400 mb-2">Examples:</div>
                          <div className="flex flex-wrap gap-2">
                            {level.examples.map((ex, i) => (
                              <span key={i} className="text-xs px-2 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                {ex}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {activeTab === "monitoring" && (
            <div className="space-y-12">
              {/* KPI Dashboard */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  KPI Monitoring Dashboard
                </motion.h2>
                <div className="grid gap-6">
                  {[
                    {
                      category: "Financial Health",
                      kpis: [
                        { name: "Total Benefits Spend", target: "Budget ±5%", current: "$42.8M", status: "on-track" },
                        { name: "PEPM (Per Employee Per Month)", target: "< $650", current: "$612", status: "on-track" },
                        { name: "Medical Loss Ratio", target: "80-85%", current: "82.3%", status: "on-track" },
                        { name: "Pharmacy Trend", target: "< 8%", current: "6.7%", status: "on-track" }
                      ]
                    },
                    {
                      category: "Vendor Performance",
                      kpis: [
                        { name: "Claims Processing Time", target: "< 5 days", current: "3.2 days", status: "exceeds" },
                        { name: "Invoice Accuracy", target: "> 98%", current: "99.1%", status: "exceeds" },
                        { name: "Member Satisfaction", target: "> 4.0/5", current: "4.3/5", status: "exceeds" },
                        { name: "SLA Compliance", target: "100%", current: "98.5%", status: "at-risk" }
                      ]
                    },
                    {
                      category: "Compliance & Risk",
                      kpis: [
                        { name: "Audit Findings", target: "0 critical", current: "0", status: "on-track" },
                        { name: "Regulatory Violations", target: "0", current: "0", status: "on-track" },
                        { name: "Data Security Incidents", target: "0", current: "0", status: "on-track" },
                        { name: "Contract Expirations", target: "90+ days notice", current: "All tracked", status: "on-track" }
                      ]
                    }
                  ].map((section, idx) => (
                    <motion.div
                      key={section.category}
                      className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-6 shadow-2xl backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                    >
                      <h3 className="text-xl font-bold text-amber-400 mb-4">{section.category}</h3>
                      <div className="space-y-3">
                        {section.kpis.map((kpi, i) => {
                          const statusConfig = {
                            "on-track": { color: "text-emerald-400", icon: CheckCircle2 },
                            "exceeds": { color: "text-blue-400", icon: TrendingUp },
                            "at-risk": { color: "text-amber-400", icon: AlertTriangle }
                          };
                          const config = statusConfig[kpi.status as keyof typeof statusConfig];
                          const Icon = config.icon;

                          return (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-amber-500/10">
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-white">{kpi.name}</div>
                                <div className="text-xs text-zinc-500 mt-0.5">Target: {kpi.target}</div>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="text-sm font-bold text-white">{kpi.current}</div>
                                </div>
                                <Icon className={`h-5 w-5 ${config.color}`} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Risk Heat Map */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Current Risk Assessment
                </motion.h2>
                <div className="grid gap-4">
                  <RiskIndicator
                    category="Contract Renewal Risk"
                    level="medium"
                    mitigation="3 contracts expiring in Q2 2026. Renewal negotiations in progress. Alternative vendors identified."
                    delay={0.1}
                  />
                  <RiskIndicator
                    category="Budget Variance Risk"
                    level="low"
                    mitigation="YTD spend within 3% of budget. Trend projections show 2% favorable variance by year-end."
                    delay={0.2}
                  />
                  <RiskIndicator
                    category="Regulatory Compliance Risk"
                    level="low"
                    mitigation="All required filings up-to-date. No outstanding audit findings. Proactive monitoring in place."
                    delay={0.3}
                  />
                  <RiskIndicator
                    category="Vendor Performance Risk"
                    level="medium"
                    mitigation="One vendor missed SLA targets in Q4. Performance improvement plan established. Monthly reviews scheduled."
                    delay={0.4}
                  />
                  <RiskIndicator
                    category="Data Security Risk"
                    level="low"
                    mitigation="All systems SOC 2 Type II certified. Annual pen testing completed. Zero security incidents in 18 months."
                    delay={0.5}
                  />
                  <RiskIndicator
                    category="Catastrophic Claim Risk"
                    level="medium"
                    mitigation="Stop-loss coverage in place at $250K. 2 members approaching threshold. Case management engaged."
                    delay={0.6}
                  />
                </div>
              </div>

              {/* Alert Configuration */}
              <div>
                <motion.h2
                  className="text-3xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  Automated Alert Configuration
                </motion.h2>
                <motion.div
                  className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="grid gap-6 md:grid-cols-2">
                    {[
                      {
                        trigger: "Budget Variance",
                        threshold: "> 5% over budget",
                        recipients: "CFO, Finance Director, Benefits Manager",
                        action: "Immediate review meeting scheduled"
                      },
                      {
                        trigger: "Contract Expiration",
                        threshold: "90 days before expiry",
                        recipients: "Procurement, Benefits VP, Legal",
                        action: "Renewal workflow initiated"
                      },
                      {
                        trigger: "Claims Anomaly",
                        threshold: "3σ from baseline",
                        recipients: "Benefits Manager, Claims Team",
                        action: "Investigation and root cause analysis"
                      },
                      {
                        trigger: "Vendor SLA Breach",
                        threshold: "Any SLA target missed",
                        recipients: "Vendor Manager, Operations Lead",
                        action: "Performance review and corrective action"
                      },
                      {
                        trigger: "Regulatory Filing",
                        threshold: "30 days before deadline",
                        recipients: "Compliance Officer, Finance",
                        action: "Filing preparation checklist"
                      },
                      {
                        trigger: "High-Cost Claim",
                        threshold: "> $100K individual claim",
                        recipients: "CFO, Benefits VP, Risk Manager",
                        action: "Case management and stop-loss coordination"
                      }
                    ].map((alert, idx) => (
                      <motion.div
                        key={alert.trigger}
                        className="p-4 rounded-xl border border-amber-500/10 bg-black/40"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-bold text-white">{alert.trigger}</h4>
                            <p className="text-xs text-zinc-400 mt-1">Threshold: {alert.threshold}</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-zinc-500">Recipients: </span>
                            <span className="text-zinc-300">{alert.recipients}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Action: </span>
                            <span className="text-zinc-300">{alert.action}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="relative mx-auto w-full max-w-6xl px-6 py-16">
          <motion.div
            className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-12 shadow-2xl backdrop-blur-sm text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-600/20 via-purple-600/20 to-blue-600/20 opacity-60 blur-2xl" />
            
            <div className="relative">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent mb-4">
                Ready to implement EBITDA governance?
              </h2>
              <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
                Start with evidence. Upload your first receipt bundle and we'll build your governance baseline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/upload-5500"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-8 py-4 text-lg font-semibold shadow-lg backdrop-blur-xl transition-all hover:scale-105"
                >
                  <Zap className="h-5 w-5" />
                  Upload receipts →
                </Link>
                <Link
                  href="/evidence-receipts"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/50 bg-zinc-950/80 px-6 py-4 text-sm font-semibold backdrop-blur-sm transition-all hover:border-amber-400/70 hover:bg-amber-950/30"
                >
                  <Activity className="h-4 w-4 text-amber-400" />
                  View KPI Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          className="relative mx-auto w-full max-w-6xl px-6 py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-3 border-t border-amber-500/20 pt-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-3 w-3 text-amber-500/70" />
              <span>© {new Date().getFullYear()} Kincaid IQ</span>
            </div>
            <div className="flex gap-6">
              <Link href="/" className="transition-all hover:text-amber-400">
                Home
              </Link>
              <Link href="/evidence-receipts" className="transition-all hover:text-amber-400">
                Platform
              </Link>
              <Link href="/contact" className="transition-all hover:text-amber-400">
                Contact
              </Link>
            </div>
          </div>
        </motion.footer>
      </main>
    </>
  );
}