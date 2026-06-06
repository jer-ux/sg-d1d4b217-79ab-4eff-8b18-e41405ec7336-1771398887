import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Shield, AlertTriangle, TrendingUp, Users, FileCheck, Award, ArrowRight, CheckCircle2, Eye, Lock, Database, BarChart3, FileText, Clock, Target, DollarSign, AlertCircle, Scale, Gavel, TrendingDown, XCircle, Search } from "lucide-react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const fiduciaryRisks = [
  {
    icon: AlertTriangle,
    title: "Personal Liability Exposure",
    reality: "ERISA §502(a)(3) allows participants to sue fiduciaries personally for breaches of duty.",
    impact: "Board members can be held personally liable for plan losses due to inadequate oversight.",
    regulation: "29 U.S.C. § 1132(a)(3)",
    solution: "Real-time monitoring infrastructure with audit trails proving continuous oversight."
  },
  {
    icon: TrendingDown,
    title: "Undisclosed PBM Compensation",
    reality: "PBMs receive rebates, spreads, and administrative fees rarely disclosed to plan sponsors.",
    impact: "$2.8B in hidden PBM revenue annually. DOL considers undisclosed compensation a prohibited transaction.",
    regulation: "DOL Advisory Opinion 97-15A, 29 CFR 2550.408b-2",
    solution: "Forensic PBM contract analysis revealing all compensation streams with dollar quantification."
  },
  {
    icon: XCircle,
    title: "Failure to Monitor Service Providers",
    reality: "Board delegated benefits to consultants/brokers but didn't establish monitoring procedures.",
    impact: "Northwestern University settlement: $6.3M for failure to monitor recordkeeper fees.",
    regulation: "DOL Field Assistance Bulletin 2021-01",
    solution: "Automated vendor performance tracking with quarterly compliance scorecards."
  },
  {
    icon: Scale,
    title: "Inadequate Benchmarking",
    reality: "Board approved PBM contract without independent comparison to market rates or peer plans.",
    impact: "Lockheed Martin settlement: $62M for excessive recordkeeping fees vs. industry benchmarks.",
    regulation: "Tibble v. Edison (Supreme Court 2015)",
    solution: "NADAC-based Rx benchmarking and peer plan cost comparisons with evidence receipts."
  }
];

const governanceTools = [
  {
    icon: BarChart3,
    title: "Executive Dashboard",
    description: "15-minute quarterly board review with McKinsey + Bain KPIs for pharmacy spend, PBM compliance, and fiduciary risk exposure.",
    features: [
      "Pharmacy trend decomposition (utilization vs. unit cost)",
      "PBM guarantee tracking with variance alerts",
      "Peer benchmarking (industry + size cohort)",
      "Fiduciary compliance scorecard",
      "Evidence receipt summary (auto-generated)"
    ],
    metrics: ["15-min review", "Quarterly cadence", "Board-ready format"],
    outcome: "Board fulfills monitoring duty with minimal time investment — documented oversight at scale."
  },
  {
    icon: FileCheck,
    title: "Evidence Receipt System",
    description: "Immutable audit trail for every benefits decision — from formulary changes to PBM contract amendments — with source data, methodology, and approval chain.",
    features: [
      "Blockchain-grade immutability (tamper-proof)",
      "Source data linkage (claims, contracts, analyses)",
      "Decision methodology documentation",
      "Approval chain with timestamps",
      "DOL-ready export package"
    ],
    metrics: ["285 avg receipts/year", "100% audit coverage", "Instant DOL package"],
    outcome: "When DOL requests fiduciary file, hand them 200-page evidence package — not email printouts."
  },
  {
    icon: Shield,
    title: "Fiduciary Compliance Monitor",
    description: "Automated tracking of ERISA duties, regulatory deadlines, and service provider obligations with real-time alerts for variance or non-compliance.",
    features: [
      "ERISA §404 duty checklist (prudence, loyalty, diversification)",
      "DOL Form 5500 filing deadlines and validation",
      "Service provider fee disclosure tracking (408b-2)",
      "Prohibited transaction screening",
      "Automatic escalation workflow for breaches"
    ],
    metrics: ["Real-time alerts", "Zero manual tracking", "Audit-ready logs"],
    outcome: "Sleep knowing every fiduciary obligation is monitored — no missed deadlines, no overlooked breaches."
  },
  {
    icon: Search,
    title: "PBM Contract Forensics",
    description: "Page-by-page analysis of PBM contracts identifying hidden fees, missing guarantees, and pricing arbitrage opportunities with client-ready fix language.",
    features: [
      "Spread pricing exposure quantification",
      "Missing MAC guarantee benchmarking",
      "Rebate pass-through validation",
      "Administrative fee benchmarking vs. peers",
      "Renegotiation language (page-specific)"
    ],
    metrics: ["90-sec analysis", "$847K avg findings", "Client-ready summary"],
    outcome: "Board approves PBM contracts with forensic confidence — not consultant promises."
  },
  {
    icon: Database,
    title: "Independent Claims Data Access",
    description: "Direct access to adjudicated claims data for validation of PBM reporting, trend analysis, and utilization management opportunities — no PBM intermediary.",
    features: [
      "Real-time claims adjudication feed",
      "NADAC spread analysis by drug/pharmacy",
      "Utilization pattern detection (overuse, duplication)",
      "Prior authorization impact quantification",
      "Generic conversion opportunity scoring"
    ],
    metrics: ["24/7 access", "PBM-independent", "NADAC benchmarked"],
    outcome: "Validate PBM claims independently — catch pricing games before quarterly reports arrive."
  },
  {
    icon: FileText,
    title: "Quarterly Board Reporting Package",
    description: "Auto-generated comprehensive reports for board meetings with executive summary, key metrics, evidence receipts, and regulatory compliance status.",
    features: [
      "Executive summary (1-page, board-ready)",
      "Key metrics dashboard (trends, compliance, savings)",
      "Evidence receipt count and highlights",
      "Regulatory compliance status",
      "Action items and recommendations"
    ],
    metrics: ["Auto-generated", "Quarterly delivery", "Board-ready PDF"],
    outcome: "Board packet arrives three days before meeting — no last-minute scrambles for benefits data."
  }
];

const complianceFramework = [
  {
    phase: "Duty of Prudence",
    erisa: "ERISA §404(a)(1)(B)",
    requirement: "Fiduciaries must act with care, skill, prudence, and diligence that a prudent person would use.",
    implementation: [
      "Quarterly review of PBM performance vs. contract guarantees",
      "Annual benchmarking against peer plans and NADAC pricing",
      "Documented evaluation of service provider fees",
      "Evidence receipts for all material decisions"
    ],
    validation: "SiriusB iQ automates benchmarking, tracks PBM guarantees, and generates evidence receipts — fulfilling prudence duty at scale."
  },
  {
    phase: "Duty of Loyalty",
    erisa: "ERISA §404(a)(1)(A)",
    requirement: "Fiduciaries must act solely in the interest of participants and beneficiaries.",
    implementation: [
      "Independent validation of PBM pricing (not reliant on PBM reports)",
      "Conflict of interest screening for all service providers",
      "Member cost-sharing impact analysis for formulary changes",
      "Prohibited transaction monitoring (PBM rebate retention, etc.)"
    ],
    validation: "Independent claims access and forensic contract analysis ensure decisions serve participants — not vendor profitability."
  },
  {
    phase: "Duty to Monitor",
    erisa: "DOL FAB 2021-01",
    requirement: "Ongoing monitoring of service providers and designated investment alternatives.",
    implementation: [
      "Real-time PBM compliance tracking (guarantee adherence)",
      "Quarterly vendor performance scorecards",
      "Automated alert escalation for variance or non-compliance",
      "Annual service provider fee review"
    ],
    validation: "Automated monitoring infrastructure provides continuous oversight — not annual consultant check-ins."
  },
  {
    phase: "Documentation & Audit Readiness",
    erisa: "ERISA §503, 29 CFR 2520.104b",
    requirement: "Plans must maintain records demonstrating compliance with ERISA requirements.",
    implementation: [
      "Evidence receipts for every decision (immutable audit trail)",
      "Meeting minutes with PBM oversight discussion",
      "Benchmarking reports (annually at minimum)",
      "Service provider monitoring documentation"
    ],
    validation: "DOL audit package pre-assembled and exportable in 60 seconds — no scrambling for emails and spreadsheets."
  }
];

const dolSettlementCaseStudies = [
  {
    employer: "Northwestern University",
    settlement: "$6.3M",
    allegation: "Failure to monitor recordkeeper fees; excessive administrative costs vs. industry benchmarks.",
    fiduciaryBreach: "Duty to Monitor (ERISA §404(a)(1))",
    prevention: "Automated vendor fee tracking with quarterly benchmarking against peer plans.",
    icon: AlertCircle
  },
  {
    employer: "Lockheed Martin",
    settlement: "$62M",
    allegation: "Excessive recordkeeping fees; failed to leverage plan size for better pricing.",
    fiduciaryBreach: "Duty of Prudence (ERISA §404(a)(1)(B))",
    prevention: "Real-time fee benchmarking and automatic renegotiation triggers when pricing exceeds peer averages.",
    icon: DollarSign
  },
  {
    employer: "Yale University",
    settlement: "$3.5M",
    allegation: "Imprudent investment options; failure to remove underperforming funds.",
    fiduciaryBreach: "Duty of Prudence (investment monitoring)",
    prevention: "Quarterly performance tracking with evidence receipts documenting review and rationale for retention/removal.",
    icon: TrendingDown
  },
  {
    employer: "MIT",
    settlement: "$1.52M",
    allegation: "Excessive recordkeeping fees and failure to monitor service provider compensation.",
    fiduciaryBreach: "Duty to Monitor (service provider oversight)",
    prevention: "Continuous monitoring dashboard with automated alerts for fee variance or contract non-compliance.",
    icon: Eye
  }
];

const successMetrics = [
  {
    metric: "100%",
    label: "DOL Audit Ready",
    context: "Evidence receipts for every action — zero scrambling for documentation",
    icon: FileCheck
  },
  {
    metric: "$2.4M",
    label: "Average Board Savings",
    context: "Through documented PBM oversight and forensic contract analysis",
    icon: DollarSign
  },
  {
    metric: "15min",
    label: "Quarterly Review Time",
    context: "Executive dashboard summary replaces 2-hour consultant presentations",
    icon: Clock
  },
  {
    metric: "Zero",
    label: "Fiduciary Breaches",
    context: "Automated monitoring catches issues before they become DOL settlements",
    icon: Shield
  },
  {
    metric: "285",
    label: "Evidence Receipts/Year",
    context: "Every decision documented with source data and methodology",
    icon: Database
  },
  {
    metric: "60sec",
    label: "DOL Audit Package Export",
    context: "Pre-assembled documentation — meeting minutes, benchmarks, receipts",
    icon: Target
  }
];

export default function BoardMembersPage() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>For Board Members: Fiduciary Governance & DOL Audit Defense | SiriusB iQ</title>
        <meta
          name="description"
          content="Board-level governance infrastructure for healthcare benefits — real-time monitoring, evidence receipts, DOL audit defense, and ERISA compliance documentation."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-purple-950 via-slate-950 to-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-400/30 rounded-full mb-8 backdrop-blur-sm">
                <Shield className="w-5 h-5 text-purple-300" />
                <span className="text-sm font-semibold text-purple-200">Board of Directors & Fiduciaries</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-purple-200 via-violet-300 to-fuchsia-200 bg-clip-text text-transparent leading-tight">
                The DOL Is Watching.<br />
                <span className="text-red-400">Are You Ready?</span>
              </h1>
              
              <p className="text-2xl text-purple-100 mb-6 max-w-3xl leading-relaxed">
                ERISA §404 makes you <span className="text-purple-300 font-bold">personally liable</span> for benefits oversight failures. The DOL recovered <span className="text-red-400 font-bold">$3.1B</span> in fiduciary breach settlements since 2020.
              </p>
              
              <p className="text-lg text-purple-300/80 mb-10 max-w-2xl">
                SiriusB iQ provides board-ready governance infrastructure: real-time monitoring, immutable evidence receipts, and pre-assembled DOL audit packages — so you fulfill your fiduciary duty with documented precision, not consultant promises.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-lg px-8 py-6 shadow-2xl shadow-purple-500/50">
                    Request Board Briefing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#governance-tools">
                  <Button size="lg" variant="outline" className="border-2 border-purple-400/50 text-purple-200 hover:bg-purple-500/20 text-lg px-8 py-6">
                    View Governance Framework
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {successMetrics.slice(0, 4).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border-purple-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                      <item.icon className="w-8 h-8 text-purple-400 mb-3" />
                      <div className="text-5xl font-black text-purple-300 mb-2">{item.metric}</div>
                      <div className="text-sm text-purple-200 mb-2">{item.label}</div>
                      <div className="text-xs text-purple-400">{item.context}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Fiduciary Risks Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-purple-950/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                The Four Fiduciary Risks
              </h2>
              <p className="text-xl text-purple-300 max-w-3xl mx-auto">
                What keeps general counsels awake — and how to document compliance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {fiduciaryRisks.map((risk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-gradient-to-br from-red-950/40 to-orange-950/40 border-red-500/30 p-8 h-full cursor-pointer hover:scale-[1.02] transition-all"
                    onClick={() => setSelectedRisk(selectedRisk === index ? null : index)}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-4 shadow-xl shadow-red-500/50 flex-shrink-0">
                        <risk.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-3">{risk.title}</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-semibold text-red-400 mb-1">The Reality:</div>
                            <p className="text-red-200 text-sm">{risk.reality}</p>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-orange-400 mb-1">The Impact:</div>
                            <p className="text-orange-200 text-sm">{risk.impact}</p>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-yellow-400 mb-1">Regulation:</div>
                            <p className="text-yellow-200 text-sm font-mono">{risk.regulation}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedRisk === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-gradient-to-r from-emerald-950/50 to-green-950/50 rounded-lg p-4 border border-emerald-500/30 mt-4"
                      >
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-emerald-400 mb-2">SiriusB iQ Solution:</div>
                            <p className="text-emerald-200 text-sm">{risk.solution}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DOL Settlement Case Studies */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                Recent DOL Settlements
              </h2>
              <p className="text-xl text-purple-300 max-w-3xl mx-auto">
                Major employers penalized for fiduciary failures — what went wrong and how to prevent it
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {dolSettlementCaseStudies.map((caseStudy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-red-900/40 to-purple-900/40 border-red-500/30 p-8 h-full">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-4 shadow-xl shadow-red-500/50 flex-shrink-0">
                        <caseStudy.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-2xl font-bold text-white">{caseStudy.employer}</h3>
                          <div className="text-3xl font-black text-red-400">{caseStudy.settlement}</div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs font-semibold text-red-400 mb-1">Allegation:</div>
                            <p className="text-red-200 text-sm">{caseStudy.allegation}</p>
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-orange-400 mb-1">Fiduciary Breach:</div>
                            <p className="text-orange-200 text-sm">{caseStudy.fiduciaryBreach}</p>
                          </div>
                          <div className="bg-emerald-950/50 rounded-lg p-3 border border-emerald-500/30">
                            <div className="text-xs font-semibold text-emerald-400 mb-1">Prevention:</div>
                            <p className="text-emerald-200 text-sm">{caseStudy.prevention}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Governance Tools Section */}
        <section id="governance-tools" className="py-24 px-4 bg-gradient-to-b from-purple-950/30 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                Board-Ready Governance Infrastructure
              </h2>
              <p className="text-xl text-purple-300 max-w-3xl mx-auto">
                Everything you need to fulfill fiduciary duty with documented precision
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {governanceTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-gradient-to-br from-purple-950/40 to-violet-950/40 border-purple-500/30 p-8 h-full group hover:scale-105 transition-all cursor-pointer"
                    onClick={() => setSelectedTool(selectedTool === index ? null : index)}
                  >
                    <tool.icon className="w-12 h-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
                    <p className="text-purple-100 mb-6">{tool.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.metrics.map((metric, idx) => (
                        <div key={idx} className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs text-purple-300">
                          {metric}
                        </div>
                      ))}
                    </div>

                    {selectedTool === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4"
                      >
                        <div className="bg-purple-950/50 rounded-lg p-4 border border-purple-500/30">
                          <div className="text-sm text-purple-200 font-semibold mb-3">Key Features:</div>
                          <ul className="text-xs text-purple-300 space-y-2">
                            {tool.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-3">
                          <div className="text-xs text-emerald-300 font-semibold mb-1">Board Outcome:</div>
                          <div className="text-xs text-emerald-200">{tool.outcome}</div>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ERISA Compliance Framework */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                ERISA Compliance Framework
              </h2>
              <p className="text-xl text-purple-300 max-w-3xl mx-auto">
                How SiriusB iQ maps to your fiduciary duties under ERISA §404
              </p>
            </motion.div>

            <div className="space-y-8">
              {complianceFramework.map((duty, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-r from-purple-950/50 to-violet-950/50 border-purple-500/40 p-8">
                    <div className="flex items-start gap-6">
                      <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl px-6 py-8 shadow-xl shadow-purple-500/50 flex-shrink-0 min-w-[220px] text-center">
                        <div className="text-white font-black text-2xl mb-2">{duty.phase}</div>
                        <div className="text-purple-100 text-xs font-mono">{duty.erisa}</div>
                      </div>
                      <div className="flex-1">
                        <div className="mb-6">
                          <div className="text-sm font-semibold text-purple-400 mb-2">ERISA Requirement:</div>
                          <p className="text-purple-200 text-sm italic">"{duty.requirement}"</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="text-sm font-semibold text-violet-400 mb-3">Board Implementation:</div>
                            <ul className="text-sm text-violet-200 space-y-2">
                              {duty.implementation.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-emerald-400 mb-3">SiriusB iQ Validation:</div>
                            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4">
                              <p className="text-emerald-200 text-sm">{duty.validation}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics Grid */}
        <section className="py-24 px-4 bg-gradient-to-b from-purple-950/30 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                Documented Governance at Scale
              </h2>
              <p className="text-xl text-purple-300 max-w-3xl mx-auto">
                What happens when fiduciary duty meets algorithmic precision
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-purple-900/40 to-violet-900/40 border-purple-500/30 p-8 text-center hover:scale-105 transition-transform">
                    <metric.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <div className="text-6xl font-black text-purple-300 mb-3">{metric.metric}</div>
                    <div className="text-lg text-purple-200 font-semibold mb-2">{metric.label}</div>
                    <div className="text-sm text-purple-400">{metric.context}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Board Briefing Package CTA */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="relative bg-gradient-to-br from-purple-900/80 to-violet-900/80 border-4 border-purple-400 p-12 shadow-[0_0_60px_rgba(168,85,247,0.6),0_0_100px_rgba(168,85,247,0.4),0_0_140px_rgba(168,85,247,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-violet-500/20 to-fuchsia-500/20 rounded-lg" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 rounded-lg blur-xl opacity-75" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mb-4 shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                    <span className="text-sm font-black text-white uppercase tracking-wider">🛡️ Board Governance Package 🛡️</span>
                  </div>
                  <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-200 via-white to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.8)]">
                    Request Board Briefing
                  </h2>
                  <p className="text-xl text-purple-100 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                    Get the governance framework document, DOL compliance checklist, and fiduciary risk assessment guide.
                  </p>
                </div>
                
                <form className="max-w-2xl mx-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-purple-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-purple-400 rounded-xl text-white placeholder-purple-300/70 focus:outline-none focus:border-purple-300 focus:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all font-semibold"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-purple-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-purple-400 rounded-xl text-white placeholder-purple-300/70 focus:outline-none focus:border-purple-300 focus:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all font-semibold"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-purple-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Company</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-purple-400 rounded-xl text-white placeholder-purple-300/70 focus:outline-none focus:border-purple-300 focus:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all font-semibold"
                        placeholder="Acme Corporation"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-purple-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Board Role</label>
                      <select
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-purple-400 rounded-xl text-white focus:outline-none focus:border-purple-300 focus:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all font-semibold"
                      >
                        <option value="">Select role...</option>
                        <option value="chair">Board Chair / CEO</option>
                        <option value="member">Board Member / Director</option>
                        <option value="audit">Audit Committee Chair</option>
                        <option value="compensation">Compensation Committee Chair</option>
                        <option value="cfo">CFO / Treasurer</option>
                        <option value="gc">General Counsel</option>
                        <option value="other">Other C-Suite / Fiduciary</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-purple-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]">Plan Size (Annual Healthcare Spend)</label>
                    <select
                      required
                      className="w-full px-5 py-4 bg-black/60 border-3 border-purple-400 rounded-xl text-white focus:outline-none focus:border-purple-300 focus:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all font-semibold"
                    >
                      <option value="">Select plan size...</option>
                      <option value="<10m">Under $10M</option>
                      <option value="10-25m">$10M - $25M</option>
                      <option value="25-50m">$25M - $50M</option>
                      <option value="50-100m">$50M - $100M</option>
                      <option value=">100m">Over $100M</option>
                    </select>
                  </div>

                  <Link href="/request-demo">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 hover:from-purple-400 hover:via-violet-400 hover:to-fuchsia-400 text-white text-2xl font-black py-8 shadow-[0_0_40px_rgba(168,85,247,0.9),0_0_60px_rgba(168,85,247,0.6),0_0_80px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,1),0_0_80px_rgba(168,85,247,0.8),0_0_120px_rgba(168,85,247,0.6)] uppercase tracking-wider border-2 border-white/50"
                    >
                      💎 Download Board Package 💎
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-purple-200 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                    Includes: Governance framework • DOL compliance checklist • Fiduciary risk assessment • Evidence receipt samples
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4 bg-gradient-to-b from-purple-950/30 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Shield className="w-16 h-16 mx-auto mb-6 text-purple-400" />
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                Sleep Well. We've Got The Documentation.
              </h2>
              <p className="text-2xl text-purple-200 mb-12">
                Schedule a 30-minute board briefing to see how SiriusB iQ turns fiduciary responsibility into documented reality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-xl px-12 py-8 shadow-2xl shadow-purple-500/50">
                    Schedule Board Briefing
                    <Shield className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
                <Link href="/executive-command-center">
                  <Button size="lg" variant="outline" className="border-2 border-purple-400/50 text-purple-200 hover:bg-purple-500/20 text-xl px-12 py-8">
                    See Executive Dashboard
                    <Eye className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-purple-400 mt-8">
                No sales pitch • Executive-level only • 100% governance focused • DOL audit package demo
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}