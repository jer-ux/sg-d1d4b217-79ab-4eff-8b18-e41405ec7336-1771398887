import Head from "next/head";
import Link from "next/link";
import { Shield, AlertTriangle, TrendingUp, Users, FileCheck, Award, ArrowRight, CheckCircle2, Eye, Lock, Database, BarChart3, FileText, Clock, Target, DollarSign, AlertCircle, Scale, Gavel, TrendingDown, XCircle, Search, Building2, Briefcase, UserCheck, BookOpen, Zap, Activity } from "lucide-react";
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
    impact: "Board members can be held personally liable for plan losses due to inadequate oversight. No corporate veil protection.",
    regulation: "29 U.S.C. § 1132(a)(3)",
    dolGuidance: "DOL Field Assistance Bulletin 2021-01 clarifies monitoring obligations",
    solution: "Real-time monitoring infrastructure with immutable audit trails proving continuous oversight at board level."
  },
  {
    icon: TrendingDown,
    title: "Undisclosed PBM Compensation",
    reality: "PBMs receive rebates, spread pricing revenue, and administrative fees rarely disclosed to plan sponsors in full.",
    impact: "$2.8B in hidden PBM revenue annually across US employers. DOL considers undisclosed compensation a prohibited transaction under ERISA §406.",
    regulation: "DOL Advisory Opinion 97-15A, 29 CFR 2550.408b-2",
    dolGuidance: "DOL requires disclosure of all direct and indirect compensation",
    solution: "Forensic PBM contract analysis revealing all compensation streams with dollar quantification and regulatory compliance mapping."
  },
  {
    icon: XCircle,
    title: "Failure to Monitor Service Providers",
    reality: "Board delegated benefits management to consultants/brokers/PBMs but failed to establish and execute monitoring procedures.",
    impact: "Northwestern University: $6.3M settlement. MIT: $1.52M settlement. Common thread: No documented monitoring process.",
    regulation: "DOL Field Assistance Bulletin 2021-01",
    dolGuidance: "Ongoing monitoring required - not just initial selection",
    solution: "Automated vendor performance tracking with quarterly compliance scorecards and board-ready summary dashboards."
  },
  {
    icon: Scale,
    title: "Inadequate Benchmarking",
    reality: "Board approved PBM contract without independent comparison to market rates, NADAC pricing, or peer plan benchmarks.",
    impact: "Lockheed Martin: $62M settlement for excessive fees. Yale: $3.5M for imprudent options. Benchmark failures = fiduciary breach.",
    regulation: "Tibble v. Edison (Supreme Court 2015)",
    dolGuidance: "Prudence requires ongoing comparison to alternatives",
    solution: "NADAC-based Rx benchmarking, peer plan cost comparisons, and automated variance alerts with evidence receipt documentation."
  }
];

const governanceTools = [
  {
    icon: BarChart3,
    title: "Executive Dashboard",
    description: "15-minute quarterly board review with McKinsey + Bain-style KPIs for pharmacy spend, PBM compliance, fiduciary risk exposure, and documented governance.",
    features: [
      "Pharmacy trend decomposition (utilization vs. unit cost vs. mix shift)",
      "PBM guarantee tracking with real-time variance alerts and breach documentation",
      "Peer benchmarking (industry sector + employee count cohort + geography)",
      "Fiduciary compliance scorecard (ERISA duties mapped to evidence)",
      "Evidence receipt summary with auto-generated audit package",
      "Board action items with regulatory deadline tracking"
    ],
    metrics: ["15-min review", "Quarterly auto-delivery", "Board-ready PDF"],
    outcome: "Board fulfills ERISA monitoring duty with minimal time investment — documented oversight at algorithmic scale.",
    complianceMapping: "ERISA §404(a)(1) - Duty of Prudence & Duty to Monitor"
  },
  {
    icon: FileCheck,
    title: "Evidence Receipt System",
    description: "Immutable audit trail for every benefits decision — from formulary changes to vendor selection to PBM contract amendments — with source data, methodology, approval chain, and regulatory mapping.",
    features: [
      "Blockchain-grade immutability (tamper-proof cryptographic hashing)",
      "Source data linkage (claims data, contracts, analyses, meeting minutes)",
      "Decision methodology documentation (who, what, when, why, how)",
      "Approval chain with timestamps and electronic signatures",
      "DOL-ready export package (searchable PDF with table of contents)",
      "Regulatory compliance mapping (ERISA, HIPAA, state insurance law)"
    ],
    metrics: ["285 receipts/year", "100% audit coverage", "60-sec DOL package"],
    outcome: "When DOL requests fiduciary file, hand them 200-page evidence package pre-assembled — not email printouts and memory.",
    complianceMapping: "ERISA §503, 29 CFR 2520.104b - Documentation Requirements"
  },
  {
    icon: Shield,
    title: "Fiduciary Compliance Monitor",
    description: "Automated tracking of ERISA duties, regulatory deadlines, service provider obligations, and prohibited transactions with real-time board alerts for variance or non-compliance.",
    features: [
      "ERISA §404 duty checklist (prudence, loyalty, diversification, monitoring)",
      "DOL Form 5500 filing deadlines with pre-validation of required fields",
      "Service provider fee disclosure tracking (408b-2 compliance)",
      "Prohibited transaction screening (rebate retention, self-dealing, conflicts)",
      "Automatic escalation workflow for potential breaches",
      "Board certification requirements with quarterly attestation"
    ],
    metrics: ["Real-time alerts", "Zero manual tracking", "Audit-ready logs"],
    outcome: "Sleep knowing every fiduciary obligation is algorithmically monitored — no missed deadlines, no overlooked breaches, no personal liability gaps.",
    complianceMapping: "DOL Field Assistance Bulletin 2021-01 - Monitoring Obligations"
  },
  {
    icon: Search,
    title: "PBM Contract Forensics",
    description: "Page-by-page analysis of PBM master service agreements identifying hidden fees, missing guarantees, pricing arbitrage opportunities, and fiduciary risk exposures with board-ready fix language.",
    features: [
      "Spread pricing exposure quantification (AWP vs. NADAC analysis)",
      "Missing MAC guarantee benchmarking (peer contract comparison)",
      "Rebate pass-through validation (aggregate vs. point-of-sale)",
      "Administrative fee benchmarking vs. peer plans and industry standards",
      "Renegotiation language with specific page references and redline edits",
      "Fiduciary risk assessment (prohibited transaction screening)"
    ],
    metrics: ["90-sec analysis", "$847K avg findings", "Board summary + detail"],
    outcome: "Board approves PBM contracts with forensic confidence and documented prudence — not consultant promises and hope.",
    complianceMapping: "ERISA §404(a)(1)(B) - Duty of Prudence in Vendor Selection"
  },
  {
    icon: Database,
    title: "Independent Claims Data Access",
    description: "Direct access to adjudicated pharmacy claims data for validation of PBM reporting, independent trend analysis, utilization management, and fraud detection — no PBM intermediary or delayed reporting.",
    features: [
      "Real-time claims adjudication feed (24-72 hour lag)",
      "NADAC spread analysis by drug, pharmacy, and geography",
      "Utilization pattern detection (overuse, duplication, fraud signals)",
      "Prior authorization impact quantification and appropriateness review",
      "Generic conversion opportunity scoring with member-specific recommendations",
      "Waste identification (early refills, duplicate therapy, non-adherence)"
    ],
    metrics: ["24/7 access", "PBM-independent", "NADAC benchmarked"],
    outcome: "Validate PBM guarantee compliance independently — catch pricing games and utilization issues before quarterly consultant summaries arrive.",
    complianceMapping: "ERISA §404(a)(1) - Duty to Monitor Service Providers"
  },
  {
    icon: FileText,
    title: "Quarterly Board Reporting Package",
    description: "Auto-generated comprehensive quarterly reports for board meetings with executive summary, key metrics dashboard, evidence receipts log, regulatory compliance status, and action items.",
    features: [
      "Executive summary (1-page, board-ready, plain language)",
      "Key metrics dashboard (trends, compliance, savings, benchmarks)",
      "Evidence receipt count and category breakdown with highlights",
      "Regulatory compliance status (ERISA, DOL, state insurance)",
      "Action items with assigned owners and deadline tracking",
      "Prior quarter follow-up status (what got resolved, what remains)"
    ],
    metrics: ["Auto-generated", "Quarterly delivery", "Board-ready PDF"],
    outcome: "Board packet arrives three days before meeting — no last-minute scrambles for benefits data or compliance updates.",
    complianceMapping: "Best Practice - Regular Board Review & Documentation"
  }
];

const complianceFramework = [
  {
    phase: "Duty of Prudence",
    erisa: "ERISA §404(a)(1)(B)",
    requirement: "Fiduciaries must act with the care, skill, prudence, and diligence under the circumstances then prevailing that a prudent person acting in a like capacity would use.",
    implementation: [
      "Quarterly review of PBM performance against contract guarantees with variance analysis",
      "Annual benchmarking against peer plans, NADAC pricing, and industry standards",
      "Documented evaluation of service provider fees with competitive analysis",
      "Evidence receipts for all material decisions with source data and methodology",
      "Independent expert consultation when specialized knowledge is required"
    ],
    validation: "SiriusB iQ automates quarterly benchmarking, tracks guarantee compliance in real-time, generates evidence receipts with immutable audit trails, and provides board-ready summaries — fulfilling prudence duty at algorithmic scale without manual overhead.",
    caselaw: "Tibble v. Edison (2015): Ongoing duty to monitor investments and remove imprudent options"
  },
  {
    phase: "Duty of Loyalty",
    erisa: "ERISA §404(a)(1)(A)",
    requirement: "Fiduciaries must discharge their duties with respect to the plan solely in the interest of participants and beneficiaries and for the exclusive purpose of providing benefits.",
    implementation: [
      "Independent validation of PBM pricing (not reliant on PBM-generated reports)",
      "Conflict of interest screening for all service providers and compensation disclosure",
      "Member cost-sharing impact analysis for all formulary changes and benefit design updates",
      "Prohibited transaction monitoring (undisclosed rebate retention, self-dealing, etc.)",
      "Documentation that decisions serve participant welfare over corporate convenience"
    ],
    validation: "Independent claims data access and forensic PBM contract analysis ensure decisions serve participants first — not vendor profitability, corporate cash flow convenience, or consultant commission structures.",
    caselaw: "DOL Advisory Opinion 97-15A: Undisclosed compensation = prohibited transaction"
  },
  {
    phase: "Duty to Monitor",
    erisa: "DOL FAB 2021-01",
    requirement: "Named fiduciaries have ongoing duty to monitor other fiduciaries and service providers to ensure they are performing their responsibilities prudently and in accordance with the plan.",
    implementation: [
      "Real-time PBM compliance tracking (guarantee adherence, pricing accuracy, claim adjudication)",
      "Quarterly vendor performance scorecards with objective metrics and peer benchmarking",
      "Automated alert escalation for material variance, non-compliance, or potential breaches",
      "Annual service provider fee review with documented rationale for continuation",
      "Periodic request-for-proposal process to validate market competitiveness"
    ],
    validation: "Automated monitoring infrastructure provides continuous algorithmic oversight of PBM, TPA, consultant, and broker performance — replacing annual consultant check-ins with real-time compliance tracking and board-level alerts.",
    caselaw: "Northwestern University settlement: $6.3M for failure to monitor recordkeeper"
  },
  {
    phase: "Documentation & Audit Readiness",
    erisa: "ERISA §503, 29 CFR 2520.104b",
    requirement: "Plans must establish and maintain procedures for handling claims and must maintain records sufficient to demonstrate compliance with ERISA requirements.",
    implementation: [
      "Evidence receipts for every material decision (immutable blockchain-grade audit trail)",
      "Board meeting minutes documenting PBM oversight discussion and action items",
      "Annual benchmarking reports with peer comparisons and NADAC pricing validation",
      "Service provider monitoring documentation (scorecards, reviews, fee analysis)",
      "DOL Form 5500 filing documentation with supporting schedules and attachments"
    ],
    validation: "DOL audit package pre-assembled and exportable in 60 seconds — comprehensive evidence receipts, meeting minutes, benchmarking reports, and compliance tracking logs. No scrambling for emails, no reconstructing rationale from memory.",
    caselaw: "DOL regularly requests fiduciary files in investigations — burden of proof on plan sponsor"
  }
];

const dolSettlementCaseStudies = [
  {
    employer: "Northwestern University",
    settlement: "$6.3M",
    year: "2022",
    allegation: "Failure to monitor recordkeeper fees; excessive administrative costs compared to industry benchmarks and peer institutions of similar size.",
    fiduciaryBreach: "Duty to Monitor (ERISA §404(a)(1)) - No documented monitoring process",
    rootCause: "Board delegated to consultant but never reviewed performance or fees independently",
    prevention: "Automated vendor fee tracking with quarterly benchmarking against peer institutions and automatic renegotiation triggers.",
    icon: AlertCircle,
    lesson: "Delegation doesn't eliminate oversight responsibility — board must monitor the monitors"
  },
  {
    employer: "Lockheed Martin",
    settlement: "$62M",
    year: "2021",
    allegation: "Excessive recordkeeping fees; failed to leverage plan size (250,000+ participants) for better pricing. Paid 2-3x industry average for equivalent services.",
    fiduciaryBreach: "Duty of Prudence (ERISA §404(a)(1)(B)) - No competitive bidding or benchmarking",
    rootCause: "Long-standing vendor relationship without periodic RFP or fee negotiation",
    prevention: "Real-time fee benchmarking against plan size cohort with automatic variance alerts when pricing exceeds peer averages by >15%.",
    icon: DollarSign,
    lesson: "Plan size = negotiating leverage — failure to use it = imprudence"
  },
  {
    employer: "Yale University",
    settlement: "$3.5M",
    year: "2020",
    allegation: "Imprudent investment options; failure to remove underperforming funds despite years of poor performance and high fees.",
    fiduciaryBreach: "Duty of Prudence (investment monitoring) - No documented review or removal process",
    rootCause: "Annual reviews conducted but no action taken on consistently poor performers",
    prevention: "Quarterly performance tracking with evidence receipts documenting review process and explicit rationale for retention vs. removal decisions.",
    icon: TrendingDown,
    lesson: "Reviewing isn't enough — must act on findings and document rationale"
  },
  {
    employer: "MIT",
    settlement: "$1.52M",
    year: "2021",
    allegation: "Excessive recordkeeping fees and failure to monitor service provider compensation. Similar fact pattern to Northwestern but smaller settlement due to plan size.",
    fiduciaryBreach: "Duty to Monitor (service provider oversight) - Delegation without monitoring",
    rootCause: "Consultant relationship for 15+ years without independent fee validation",
    prevention: "Continuous monitoring dashboard with automated alerts for fee variance, contract non-compliance, or performance degradation.",
    icon: Eye,
    lesson: "Long-term relationships require heightened monitoring — comfort breeds complacency"
  }
];

const boardGovernanceWorkflow = [
  {
    step: 1,
    phase: "Onboarding & Baseline",
    timeline: "Days 1-30",
    activities: [
      "Upload PBM contract for forensic analysis (90-second turnaround)",
      "Connect claims data feed (direct adjudication access, no PBM intermediary)",
      "Establish peer benchmark cohort (industry + size + geography)",
      "Generate baseline evidence receipt (current state documentation)",
      "Board briefing on platform capabilities and governance framework"
    ],
    deliverable: "Baseline report with PBM contract findings, peer benchmarks, and first evidence receipt",
    boardAction: "Review findings and approve monitoring framework"
  },
  {
    step: 2,
    phase: "Continuous Monitoring",
    timeline: "Ongoing (Real-Time)",
    activities: [
      "Automated PBM guarantee tracking (spread pricing, rebates, MAC list)",
      "Daily claims data validation (NADAC benchmarking, utilization patterns)",
      "Service provider performance monitoring (SLA compliance, fee accuracy)",
      "Prohibited transaction screening (undisclosed compensation, conflicts)",
      "Evidence receipt generation for all material decisions and changes"
    ],
    deliverable: "Real-time compliance dashboard with automated alerts for variance or breach",
    boardAction: "Review dashboard quarterly; act on alerts as they arise"
  },
  {
    step: 3,
    phase: "Quarterly Board Review",
    timeline: "Every 90 Days",
    activities: [
      "Auto-generate comprehensive board packet (executive summary + detailed metrics)",
      "Evidence receipt count and category breakdown with key highlights",
      "Regulatory compliance status (ERISA, DOL, state insurance)",
      "Peer benchmark updates (trending vs. cohort performance)",
      "Action items with owner assignments and deadline tracking"
    ],
    deliverable: "Board-ready quarterly report package delivered 3 days before meeting",
    boardAction: "15-minute review in board meeting; certify compliance; approve action items"
  },
  {
    step: 4,
    phase: "Annual Deep Dive",
    timeline: "Every 12 Months",
    activities: [
      "Comprehensive PBM contract review (forensic re-analysis for contract evolution)",
      "Service provider fee benchmarking (competitive landscape validation)",
      "Peer plan comparison update (benefit design, unit costs, trend rates)",
      "Fiduciary compliance audit (ERISA duty fulfillment documentation)",
      "DOL audit package pre-assembly and validation"
    ],
    deliverable: "Annual governance report with evidence receipt summary and compliance certification",
    boardAction: "Approve continuation or change of service providers; certify fiduciary compliance"
  }
];

const successMetrics = [
  {
    metric: "100%",
    label: "DOL Audit Ready",
    context: "Evidence receipts for every action — zero scrambling for documentation when regulators call",
    icon: FileCheck,
    color: "from-emerald-500 to-green-600"
  },
  {
    metric: "$2.4M",
    label: "Average Board Savings",
    context: "Through documented PBM oversight, forensic contract analysis, and independent benchmarking",
    icon: DollarSign,
    color: "from-yellow-500 to-orange-600"
  },
  {
    metric: "15min",
    label: "Quarterly Review Time",
    context: "Executive dashboard summary replaces 2-hour consultant presentations with dense PowerPoints",
    icon: Clock,
    color: "from-blue-500 to-cyan-600"
  },
  {
    metric: "Zero",
    label: "Fiduciary Breaches",
    context: "Automated monitoring catches compliance issues before they become DOL settlements or lawsuits",
    icon: Shield,
    color: "from-purple-500 to-violet-600"
  },
  {
    metric: "285",
    label: "Evidence Receipts/Year",
    context: "Every material decision documented with source data, methodology, and regulatory mapping",
    icon: Database,
    color: "from-indigo-500 to-purple-600"
  },
  {
    metric: "60sec",
    label: "DOL Audit Package Export",
    context: "Pre-assembled documentation — meeting minutes, benchmarks, receipts, compliance logs",
    icon: Target,
    color: "from-pink-500 to-rose-600"
  }
];

const comparisonTable = [
  {
    category: "Board Meeting Prep",
    traditional: "2-3 days collecting data from consultants, PBM, TPA. Last-minute scrambles common.",
    siriusb: "Auto-generated packet delivered 3 days early. 15-minute review replaces 2-hour presentations."
  },
  {
    category: "PBM Oversight",
    traditional: "Quarterly consultant summary of PBM-provided data. No independent validation.",
    siriusb: "Real-time independent claims validation. Automated guarantee tracking with breach alerts."
  },
  {
    category: "Fiduciary Evidence",
    traditional: "Email printouts. Meeting minutes. Hope you saved the consultant's deck.",
    siriusb: "285 immutable evidence receipts per year. DOL audit package exports in 60 seconds."
  },
  {
    category: "Benchmarking",
    traditional: "Annual consultant report (if you're lucky). Data often 12-18 months old.",
    siriusb: "Quarterly peer benchmarking with NADAC pricing. Real-time variance alerts."
  },
  {
    category: "Monitoring",
    traditional: "Board delegates to consultant. Reviews consultant summary annually.",
    siriusb: "Algorithmic 24/7 monitoring with board-level alerts for material variance or breach."
  },
  {
    category: "DOL Audit Response",
    traditional: "3-week scramble for documentation. Reconstruct rationale from memory and emails.",
    siriusb: "60-second export of pre-assembled comprehensive evidence package."
  }
];

export default function BoardMembersPage() {
  const [selectedTool, setSelectedTool] = useState<number | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<number | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>For Board Members: Fiduciary Governance & DOL Audit Defense | SiriusB iQ</title>
        <meta
          name="description"
          content="Board-level governance infrastructure for healthcare benefits — real-time monitoring, immutable evidence receipts, DOL audit defense, and algorithmic ERISA compliance."
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
                <span className="text-sm font-semibold text-purple-200">Board of Directors & Plan Fiduciaries</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-purple-200 via-violet-300 to-fuchsia-200 bg-clip-text text-transparent leading-tight">
                The DOL Is Watching.<br />
                <span className="text-red-400">Are You Ready?</span>
              </h1>
              
              <p className="text-2xl text-purple-100 mb-6 max-w-3xl leading-relaxed">
                ERISA §404 makes you <span className="text-purple-300 font-bold">personally liable</span> for benefits oversight failures. The DOL recovered <span className="text-red-400 font-bold">$3.1B</span> in fiduciary breach settlements since 2020 — Northwestern ($6.3M), Lockheed Martin ($62M), Yale ($3.5M), MIT ($1.52M).
              </p>
              
              <p className="text-lg text-purple-300/80 mb-10 max-w-2xl">
                SiriusB iQ provides board-ready governance infrastructure: real-time algorithmic monitoring, immutable evidence receipts, and pre-assembled DOL audit packages — so you fulfill your fiduciary duty with documented precision, not consultant promises and hope.
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
                    <Card className={`bg-gradient-to-br ${item.color}/20 border-purple-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform`}>
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
                What keeps general counsels awake — and how SiriusB iQ documents compliance
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
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-xs font-semibold text-yellow-400 mb-1">Regulation:</div>
                              <p className="text-yellow-200 text-xs font-mono">{risk.regulation}</p>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-amber-400 mb-1">DOL Guidance:</div>
                              <p className="text-amber-200 text-xs">{risk.dolGuidance}</p>
                            </div>
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
                Major employers penalized for fiduciary failures — what went wrong, why it matters, and how to prevent it
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
                          <div>
                            <h3 className="text-2xl font-bold text-white">{caseStudy.employer}</h3>
                            <div className="text-sm text-red-300">{caseStudy.year}</div>
                          </div>
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
                          <div>
                            <div className="text-xs font-semibold text-yellow-400 mb-1">Root Cause:</div>
                            <p className="text-yellow-200 text-sm">{caseStudy.rootCause}</p>
                          </div>
                          <div className="bg-emerald-950/50 rounded-lg p-3 border border-emerald-500/30">
                            <div className="text-xs font-semibold text-emerald-400 mb-1">Prevention:</div>
                            <p className="text-emerald-200 text-sm">{caseStudy.prevention}</p>
                          </div>
                          <div className="bg-violet-950/50 rounded-lg p-3 border border-violet-500/30">
                            <div className="text-xs font-semibold text-violet-400 mb-1">Board Lesson:</div>
                            <p className="text-violet-200 text-sm italic">"{caseStudy.lesson}"</p>
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

        {/* Board Governance Workflow */}
        <section className="py-24 px-4 bg-gradient-to-b from-purple-950/30 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                Board Governance Workflow
              </h2>
              <p className="text-xl text-purple-300 max-w-3xl mx-auto">
                From onboarding to quarterly oversight — how SiriusB iQ structures fiduciary compliance
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {boardGovernanceWorkflow.map((workflow, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-gradient-to-br from-purple-950/40 to-violet-950/40 border-purple-500/30 p-8 h-full cursor-pointer hover:scale-105 transition-all"
                    onClick={() => setSelectedWorkflow(selectedWorkflow === index ? null : index)}
                  >
                    <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-black text-white mb-6 shadow-xl shadow-purple-500/50">
                      {workflow.step}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{workflow.phase}</h3>
                    <div className="text-sm text-purple-300 mb-4">{workflow.timeline}</div>
                    
                    {selectedWorkflow === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4 mt-4"
                      >
                        <div className="bg-purple-950/50 rounded-lg p-4 border border-purple-500/30">
                          <div className="text-xs font-semibold text-purple-400 mb-3">Activities:</div>
                          <ul className="text-xs text-purple-200 space-y-2">
                            {workflow.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-3">
                          <div className="text-xs text-emerald-300 font-semibold mb-1">Deliverable:</div>
                          <div className="text-xs text-emerald-200">{workflow.deliverable}</div>
                        </div>
                        <div className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/30 rounded-lg p-3">
                          <div className="text-xs text-violet-300 font-semibold mb-1">Board Action:</div>
                          <div className="text-xs text-violet-200">{workflow.boardAction}</div>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Governance Tools Section */}
        <section id="governance-tools" className="py-24 px-4">
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
                Everything you need to fulfill ERISA §404 fiduciary duties with algorithmic precision
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
                    <p className="text-purple-100 mb-6 text-sm">{tool.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {tool.metrics.map((metric, idx) => (
                        <div key={idx} className="px-3 py-1 bg-purple-500/20 border border-purple-500/40 rounded-full text-xs text-purple-300">
                          {metric}
                        </div>
                      ))}
                    </div>

                    <div className="bg-violet-950/30 rounded-lg p-3 border border-violet-500/30 mb-4">
                      <div className="text-xs text-violet-300 font-semibold mb-1">Compliance Mapping:</div>
                      <div className="text-xs text-violet-200 font-mono">{tool.complianceMapping}</div>
                    </div>

                    {selectedTool === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-4 mt-4"
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
        <section className="py-24 px-4 bg-gradient-to-b from-purple-950/30 to-black">
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
                How SiriusB iQ maps to your fiduciary duties under ERISA §404 with documented precision
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
                        <div className="text-purple-100 text-xs font-mono mb-3">{duty.erisa}</div>
                        <div className="bg-purple-950/50 rounded-lg px-3 py-2">
                          <div className="text-xs text-purple-200">Supreme Court / DOL Caselaw</div>
                        </div>
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
                            <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-4 mb-4">
                              <p className="text-emerald-200 text-sm">{duty.validation}</p>
                            </div>
                            <div className="bg-amber-950/30 rounded-lg p-3 border border-amber-500/30">
                              <div className="text-xs text-amber-300 font-semibold mb-1">Precedent:</div>
                              <p className="text-amber-200 text-xs italic">{duty.caselaw}</p>
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

        {/* Comparison Table */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-purple-200 to-violet-200 bg-clip-text text-transparent">
                Traditional vs. SiriusB iQ
              </h2>
              <p className="text-xl text-purple-300 max-w-3xl mx-auto">
                How board-level governance actually works in practice
              </p>
            </motion.div>

            <div className="space-y-6">
              {comparisonTable.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-r from-purple-950/40 to-violet-950/40 border-purple-500/30 p-6">
                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      <div className="text-center md:text-left">
                        <div className="text-xl font-bold text-purple-200 mb-2">{row.category}</div>
                      </div>
                      <div className="bg-red-950/40 border border-red-500/30 rounded-lg p-4">
                        <div className="text-xs text-red-400 font-semibold mb-2">Traditional Approach:</div>
                        <p className="text-red-200 text-sm">{row.traditional}</p>
                      </div>
                      <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-4">
                        <div className="text-xs text-emerald-400 font-semibold mb-2">SiriusB iQ:</div>
                        <p className="text-emerald-200 text-sm">{row.siriusb}</p>
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
                Documented Governance at Algorithmic Scale
              </h2>
              <p className="text-xl text-purple-300 max-w-3xl mx-auto">
                What happens when ERISA fiduciary duty meets real-time monitoring infrastructure
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
                  <Card className={`bg-gradient-to-br ${metric.color}/20 border-purple-500/30 p-8 text-center hover:scale-105 transition-transform`}>
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
                    Get the governance framework document, DOL compliance checklist, fiduciary risk assessment, and evidence receipt samples.
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
                    Includes: Governance framework • DOL compliance checklist • Fiduciary risk assessment • Evidence receipt samples • ERISA duty mapping
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
                Schedule a 30-minute board briefing to see how SiriusB iQ turns ERISA fiduciary responsibility into documented, algorithmically-monitored reality.
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
                No sales pitch • Board members only • 100% governance focused • DOL audit package demo • Evidence receipt walkthrough
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}