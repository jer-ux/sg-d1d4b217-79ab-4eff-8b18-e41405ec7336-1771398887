import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, FileCheck, AlertTriangle, CheckCircle2, ArrowRight, Target, Clock, BarChart3, FileText, Users, Bell, Lock, Scale, BookOpen, Settings } from "lucide-react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function PolicyCompliance() {
  const [activeTab, setActiveTab] = useState("federal");

  const complianceFramework = {
    federal: [
      {
        regulation: "Affordable Care Act (ACA)",
        description: "Employer shared responsibility provisions, reporting requirements, and benefit design standards",
        requirements: [
          "Minimum Essential Coverage (MEC)",
          "Minimum Value (MV) determination",
          "Affordability safe harbors",
          "1094-C/1095-C reporting",
          "Waiting period restrictions (90 days)",
          "Preventive care coverage",
        ],
        penalties: "Up to $4,460 per full-time employee (2024)",
        monitoring: "Real-time tracking with automated alerts",
        status: "100% compliant",
      },
      {
        regulation: "ERISA (Employee Retirement Income Security Act)",
        description: "Fiduciary responsibilities, plan administration, and participant protections",
        requirements: [
          "Summary Plan Descriptions (SPDs)",
          "Form 5500 annual reporting",
          "Claims and appeals procedures",
          "Fiduciary duty of care",
          "Prohibited transactions avoidance",
          "Plan document updates",
        ],
        penalties: "Up to $2,586 per day for SPD violations",
        monitoring: "Quarterly fiduciary reviews",
        status: "DOL audit-ready",
      },
      {
        regulation: "HIPAA Privacy & Security",
        description: "Protected Health Information (PHI) safeguards and breach notification",
        requirements: [
          "PHI access controls and encryption",
          "Business Associate Agreements (BAAs)",
          "Breach notification procedures",
          "Security risk assessments",
          "Minimum necessary standard",
          "Individual rights to PHI",
        ],
        penalties: "Up to $1.5M per violation category",
        monitoring: "Continuous security monitoring",
        status: "Annual third-party audits",
      },
      {
        regulation: "COBRA & State Continuation",
        description: "Continuation coverage rights and notice requirements",
        requirements: [
          "Initial notice at enrollment",
          "Qualifying event notices (44 days)",
          "Election notice (14 days to send)",
          "Premium payment grace periods",
          "Subsidy administration (ARP)",
          "State continuation compliance",
        ],
        penalties: "$110 per day per participant",
        monitoring: "Automated notice tracking",
        status: "Zero compliance violations",
      },
      {
        regulation: "FMLA, ADA, USERRA",
        description: "Leave protections and benefits continuation requirements",
        requirements: [
          "FMLA leave tracking and benefits",
          "ADA reasonable accommodations",
          "USERRA military leave rights",
          "Benefits continuation during leave",
          "Return-to-work procedures",
          "Interaction with other leaves",
        ],
        penalties: "Back pay plus liquidated damages",
        monitoring: "Integration with HRIS systems",
        status: "Fully integrated",
      },
    ],
    state: [
      {
        jurisdiction: "California",
        uniqueRequirements: [
          "Cal-COBRA (up to 36 months)",
          "Mental health parity",
          "Infertility treatment coverage",
          "Autism spectrum disorder",
          "Contraceptive coverage",
          "CFRA leave coordination",
        ],
        filingRequirements: "Annual DMHC/CDI filings",
        complexity: "High - frequent legislative changes",
      },
      {
        jurisdiction: "New York",
        uniqueRequirements: [
          "NY-COBRA continuation",
          "Paid Family Leave (PFL)",
          "Mental health parity",
          "Infertility mandates",
          "Reproductive health coverage",
          "Gender-affirming care",
        ],
        filingRequirements: "DFS quarterly reporting",
        complexity: "High - strict enforcement",
      },
      {
        jurisdiction: "Massachusetts",
        uniqueRequirements: [
          "Individual mandate (CommCare)",
          "MCC reporting requirements",
          "Minimum Creditable Coverage",
          "Paid Family and Medical Leave",
          "Mental health requirements",
          "Telemedicine parity",
        ],
        filingRequirements: "DOR annual reporting",
        complexity: "Medium-High - complex mandate",
      },
      {
        jurisdiction: "Multi-State Employers",
        uniqueRequirements: [
          "State-specific mandate tracking",
          "Premium tax compliance",
          "Network adequacy requirements",
          "Telehealth parity laws",
          "Leave law coordination",
          "COB with state programs",
        ],
        filingRequirements: "Varies by state",
        complexity: "Very High - 50-state monitoring",
      },
    ],
    industry: [
      {
        framework: "SOC 2 Type II",
        description: "Service Organization Control for security, availability, and confidentiality",
        scope: "Data security, access controls, change management, incident response",
        certification: "Annual audit by independent CPA firm",
        benefits: "Customer trust, reduced vendor questionnaires, competitive advantage",
      },
      {
        framework: "ISO 27001",
        description: "International standard for information security management systems (ISMS)",
        scope: "Risk assessment, security policies, asset management, access control",
        certification: "Third-party certification body audit",
        benefits: "Global recognition, systematic risk management, continuous improvement",
      },
      {
        framework: "HITRUST CSF",
        description: "Health Information Trust Alliance Common Security Framework",
        scope: "Comprehensive security controls tailored to healthcare industry",
        certification: "Validated assessment with annual monitoring",
        benefits: "HIPAA compliance mapping, reduced audit burden, industry credibility",
      },
      {
        framework: "PCI DSS",
        description: "Payment Card Industry Data Security Standard for premium payments",
        scope: "Cardholder data protection, secure payment processing, vulnerability management",
        certification: "Annual SAQ or audit based on transaction volume",
        benefits: "Secure payment processing, reduced fraud risk, brand protection",
      },
    ],
  };

  const complianceTools = [
    {
      tool: "Regulatory Intelligence Engine",
      description: "AI-powered monitoring of federal, state, and local regulatory changes",
      features: [
        "Real-time legislative tracking across all 50 states",
        "Impact assessment for plan design and administration",
        "Automated alerts for upcoming deadlines",
        "Regulatory change calendar with implementation timelines",
        "Expert analysis and guidance notes",
      ],
      coverage: "100% of applicable regulations tracked",
      icon: Bell,
    },
    {
      tool: "Compliance Dashboard",
      description: "Executive visibility into compliance posture across all requirements",
      features: [
        "Risk heat maps by regulation and jurisdiction",
        "Compliance score trending over time",
        "Audit trail documentation",
        "Remediation tracking and status",
        "Board-ready compliance reports",
      ],
      coverage: "360° compliance view",
      icon: BarChart3,
    },
    {
      tool: "Document Management System",
      description: "Centralized repository for all compliance documents and attestations",
      features: [
        "SPDs, SMMs, and plan documents",
        "Form 5500 and supporting schedules",
        "1094/1095 forms and filings",
        "BAAs and vendor contracts",
        "Audit responses and certifications",
      ],
      coverage: "7-year retention with e-signature",
      icon: FileText,
    },
    {
      tool: "Policy Administration Platform",
      description: "Automated policy enforcement and exception management",
      features: [
        "Rules engine for plan eligibility and coverage",
        "Automated policy updates across systems",
        "Exception approval workflows",
        "Version control and change tracking",
        "Testing and validation tools",
      ],
      coverage: "99.7% policy accuracy",
      icon: Settings,
    },
  ];

  const auditReadiness = [
    {
      auditType: "DOL Plan Investigation",
      frequency: "3-5% of plans annually",
      commonIssues: [
        "Missing or late Form 5500 filings",
        "Outdated Summary Plan Descriptions",
        "Claims procedure violations",
        "Fiduciary breach allegations",
        "Prohibited transactions",
      ],
      preparation: [
        "Annual plan document review and updates",
        "Form 5500 accuracy verification",
        "SPD distribution documentation",
        "Claims file audit and appeals tracking",
        "Fiduciary training and certification",
      ],
      documentation: "Complete audit trail maintained",
      responseTime: "< 30 days with organized response",
    },
    {
      auditType: "IRS ACA Compliance Review",
      frequency: "Letter 226-J sent to ~20K employers annually",
      commonIssues: [
        "Form 1095-C errors or omissions",
        "Incorrect affordability calculations",
        "Missing measurement periods",
        "Waiting period violations",
        "Part-time tracking errors",
      ],
      preparation: [
        "Monthly ACA compliance monitoring",
        "1095-C accuracy reviews before filing",
        "Affordability documentation",
        "Measurement period audit trails",
        "Part-time hour tracking validation",
      ],
      documentation: "Complete 1094/1095 supporting records",
      responseTime: "90-day response with evidence",
    },
    {
      auditType: "OCR HIPAA Investigation",
      frequency: "Complaint-driven or breach-triggered",
      commonIssues: [
        "Lack of security risk assessment",
        "Missing or inadequate BAAs",
        "PHI breach notification delays",
        "Insufficient access controls",
        "Lack of employee training",
      ],
      preparation: [
        "Annual security risk assessments",
        "BAA inventory and renewals",
        "Breach response plan and drills",
        "Access control audits",
        "Quarterly HIPAA training",
      ],
      documentation: "Comprehensive security documentation",
      responseTime: "30-day initial response",
    },
  ];

  const caseStudy = {
    client: "Healthcare Organization - 25,000 Employees Across 18 States",
    challenge: "Complex multi-state compliance requirements, manual tracking processes, previous ACA penalties ($847K), and lack of centralized compliance visibility",
    solution: "Enterprise compliance platform with automated monitoring, centralized documentation, and proactive risk management",
    timeline: "12-month implementation with phased state rollout",
    results: [
      { metric: "Compliance Score", value: "98.7%", change: "From 73.2% baseline" },
      { metric: "ACA Penalties Avoided", value: "$0", change: "From $847K annually" },
      { metric: "Audit Response Time", value: "< 30 days", change: "-65% reduction" },
      { metric: "Regulatory Updates", value: "100%", change: "Zero missed deadlines" },
      { metric: "Administrative Burden", value: "-72%", change: "FTE hours reduced" },
      { metric: "Compliance Costs", value: "$1.2M", change: "$2.4M total savings" },
    ],
  };

  const metrics = [
    { label: "Regulations Tracked", value: "500+", icon: FileCheck },
    { label: "Compliance Score", value: "98.7%", icon: Shield },
    { label: "Zero Penalties", value: "5 years", icon: CheckCircle2 },
    { label: "Audit Response", value: "< 30 days", icon: Clock },
  ];

  return (
    <>
      <SEO
        title="Policy Compliance & Regulatory Management | SiriusB iQ"
        description="Enterprise compliance platform with 98.7% compliance score, zero penalties for 5 years, and automated monitoring of 500+ federal and state regulations."
      />
      <div className="min-h-screen bg-black text-white">
        <Nav />

        <main className="pt-24 pb-20">
          {/* Hero Section */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <Link href="/actuarial-benefits" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors">
                <ArrowRight className="w-4 h-4 rotate-180" />
                Back to Solutions
              </Link>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl" />
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-indigo-500/30">
                      <Shield className="w-12 h-12 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-indigo-400 font-semibold mb-1">Risk Management</p>
                      <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                        Policy Compliance & Regulatory
                      </h1>
                    </div>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-300 max-w-4xl">
                    Comprehensive compliance management platform ensuring adherence to federal, state, and industry regulations—protecting your organization from penalties while maintaining audit readiness.
                  </p>
                </div>
              </motion.div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-4 gap-6 mt-12">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-indigo-500/50 transition-colors"
                    >
                      <Icon className="w-8 h-8 text-indigo-400 mb-3" />
                      <div className="text-3xl font-bold mb-1">{metric.value}</div>
                      <div className="text-sm text-gray-400">{metric.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Compliance Framework */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Compliance Framework</h2>
              
              <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
                {["federal", "state", "industry"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                        : "bg-gray-800 text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "federal" ? "Federal Regulations" : tab === "state" ? "State Compliance" : "Industry Standards"}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {activeTab === "federal" && complianceFramework.federal.map((reg, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-indigo-500/50 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{reg.regulation}</h3>
                        <p className="text-gray-400 mb-4">{reg.description}</p>
                      </div>
                      <span className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-semibold text-sm whitespace-nowrap ml-4">
                        {reg.status}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-3">
                        <p className="text-sm font-semibold text-gray-500">Key Requirements</p>
                        {reg.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-300 p-3 rounded-lg bg-black/30">
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            {req}
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-black/50 border border-red-900/50">
                          <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            Potential Penalties
                          </p>
                          <p className="text-lg font-semibold text-red-400">{reg.penalties}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                          <p className="text-sm text-gray-500 mb-2">Monitoring Approach</p>
                          <p className="text-sm text-indigo-400 font-semibold">{reg.monitoring}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "state" && complianceFramework.state.map((jurisdiction, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-indigo-500/50 transition-all">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{jurisdiction.jurisdiction}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">Complexity Level:</span>
                          <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-semibold">
                            {jurisdiction.complexity}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-3">Unique State Requirements</p>
                        <div className="space-y-2">
                          {jurisdiction.uniqueRequirements.map((req, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                              {req}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-2">Filing Requirements</p>
                        <p className="text-indigo-400 font-semibold">{jurisdiction.filingRequirements}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {activeTab === "industry" && complianceFramework.industry.map((standard, index) => (
                  <div key={index} className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-indigo-500/50 transition-all">
                    <h3 className="text-2xl font-bold mb-2">{standard.framework}</h3>
                    <p className="text-gray-400 mb-6">{standard.description}</p>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-2">Scope</p>
                        <p className="text-sm text-gray-300">{standard.scope}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-2">Certification</p>
                        <p className="text-sm text-gray-300">{standard.certification}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800">
                        <p className="text-sm text-gray-500 mb-2">Key Benefits</p>
                        <p className="text-sm text-gray-300">{standard.benefits}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Compliance Tools */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Compliance Management Tools</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {complianceTools.map((tool, index) => {
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-indigo-500/50 transition-all"
                    >
                      <Icon className="w-10 h-10 text-indigo-400 mb-4" />
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold">{tool.tool}</h3>
                        <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-sm font-semibold whitespace-nowrap ml-3">
                          {tool.coverage}
                        </span>
                      </div>
                      <p className="text-gray-400 mb-6">{tool.description}</p>
                      <div className="space-y-2">
                        {tool.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Audit Readiness */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Audit Readiness Program</h2>
              <div className="space-y-6">
                {auditReadiness.map((audit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-indigo-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">{audit.auditType}</h3>
                        <p className="text-gray-400">Frequency: {audit.frequency}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Response Time</p>
                        <p className="text-xl font-bold text-green-400">{audit.responseTime}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-3">Common Audit Issues</p>
                        <div className="space-y-2">
                          {audit.commonIssues.map((issue, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-300 p-3 rounded-lg bg-red-900/10 border border-red-900/30">
                              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                              {issue}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-500 mb-3">Preparation Measures</p>
                        <div className="space-y-2">
                          {audit.preparation.map((prep, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-gray-300 p-3 rounded-lg bg-green-900/10 border border-green-900/30">
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              {prep}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 rounded-xl bg-black/50 border border-indigo-900/50">
                      <div className="flex items-center gap-2 mb-2">
                        <Lock className="w-5 h-5 text-indigo-400" />
                        <p className="text-sm font-semibold text-gray-400">Documentation Status</p>
                      </div>
                      <p className="text-indigo-400 font-semibold">{audit.documentation}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Case Study */}
          <section className="px-4 mb-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12">Success Story</h2>
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-indigo-500/20">
                    <Target className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-bold">{caseStudy.client}</h3>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Challenge</p>
                    <p className="text-gray-300">{caseStudy.challenge}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Solution</p>
                    <p className="text-gray-300">{caseStudy.solution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Timeline</p>
                    <p className="text-gray-300">{caseStudy.timeline}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-4">Measurable Results</p>
                  <div className="grid md:grid-cols-3 gap-6">
                    {caseStudy.results.map((result, index) => (
                      <div key={index} className="text-center p-6 rounded-xl bg-black/50 border border-gray-800">
                        <div className="text-3xl font-bold text-green-400 mb-1">{result.value}</div>
                        <div className="text-sm text-gray-400 mb-2">{result.metric}</div>
                        <div className="text-xs text-green-400">{result.change}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-indigo-500/30"
              >
                <Shield className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Protect Your Organization from Compliance Risk
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Automate compliance monitoring and maintain audit readiness across all regulations
                </p>
                <Link href="/request-demo">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full text-white font-semibold text-lg flex items-center gap-2 mx-auto"
                  >
                    Schedule Compliance Assessment
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}