import Head from "next/head";
import Link from "next/link";
import { TrendingUp, PieChart, BarChart3, DollarSign, Target, Zap, ArrowRight, LineChart, Shield, AlertTriangle, CheckCircle2, Eye, Clock, Users, FileText, Award, Briefcase, Search, Database, Lock, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const investmentRisks = [
  {
    icon: AlertTriangle,
    title: "The Hidden EBITDA Leak",
    reality: "Healthcare is 18-25% of operating expenses, but most deals treat it as fixed cost.",
    impact: "$500K-$2M annual bleeding to PBM contract gaps that auditors miss in DD.",
    solution: "48-hour healthcare forensics revealing exact dollar leakage with recovery roadmap.",
    metric: "$1.8M avg recovery"
  },
  {
    icon: TrendingUp,
    title: "The Valuation Blind Spot",
    reality: "Healthcare cost trends distort normalized EBITDA — buyer sees cost inflation, seller blames COVID.",
    impact: "Neither party understands true run-rate; deal pricing reflects noise, not signal.",
    solution: "Trend decomposition separating utilization, unit cost, and contract compliance.",
    metric: "±15% EBITDA clarity"
  },
  {
    icon: Shield,
    title: "The Post-Close Surprise",
    reality: "PBM contract auto-renews 90 days after close. Hidden fees kick in, destroying Year 1 projections.",
    impact: "Operator inherits locked-in cost structure with no exit clause for 36 months.",
    solution: "Contract X-Ray flagging auto-renewal clauses, fee escalators, and renegotiation windows.",
    metric: "Zero surprises"
  },
  {
    icon: Eye,
    title: "The Exit Story Gap",
    reality: "You reduced healthcare costs 20%, but have no evidence receipts for buyers to verify.",
    impact: "Buyer discounts your value creation claims; you leave $10M-$30M on the table.",
    solution: "Evidence-backed savings ledger with NADAC benchmarks and audit trail.",
    metric: "3-5x multiple on savings"
  }
];

const ddWorkflow = [
  {
    icon: Search,
    title: "Upload Target Data",
    description: "12 months of claims data (EDI 837) plus PBM contract PDF — uploaded via secure portal.",
    timeline: "Day 0",
    deliverables: ["Data ingestion confirmation", "Contract text extraction", "Initial anomaly scan"]
  },
  {
    icon: Database,
    title: "Forensic Analysis",
    description: "AI-powered contract clause extraction, claims trend decomposition, NADAC benchmarking, and cost recovery modeling.",
    timeline: "Days 1-2",
    deliverables: ["Contract X-Ray (15 provisions)", "Trend analysis by category", "Spread calculation vs. NADAC", "Hidden fee quantification"]
  },
  {
    icon: FileText,
    title: "DD Report Delivery",
    description: "40-page executive report with findings summary, cost recovery roadmap, and post-close action plan.",
    timeline: "Day 2",
    deliverables: ["Executive summary (3 pages)", "Detailed findings (25 pages)", "Recovery roadmap ($0-$2M)", "100-day post-close plan"]
  },
  {
    icon: Activity,
    title: "Management Presentation",
    description: "Optional: 60-minute session with target company CFO/CHRO to validate findings and discuss implementation.",
    timeline: "Day 3-5",
    deliverables: ["Validation call readout", "Confirmed recovery timeline", "Implementation risk assessment"]
  }
];

const portfolioTools = [
  {
    icon: BarChart3,
    title: "Portfolio Command Center",
    description: "Single dashboard tracking healthcare performance across all portfolio companies in real-time.",
    features: [
      "Real-time spend tracking by company/category",
      "Trend alerts when costs exceed benchmarks",
      "PBM vendor performance scorecards",
      "Evidence receipt coverage monitoring",
      "Quarterly board-ready roll-up reports"
    ],
    metrics: ["24/7 monitoring", "Cross-portfolio views", "Automated alerts"],
    use: "Monitor $50M-$500M in annual healthcare spend from one screen."
  },
  {
    icon: Target,
    title: "Value Creation Tracker",
    description: "Document realized savings with evidence receipts for every dollar claimed in value creation memos.",
    features: [
      "Savings quantification with source data",
      "Evidence receipt attachment (invoices, audits)",
      "Benchmark validation (NADAC, peer group)",
      "Monthly savings accumulation dashboards",
      "Exit-ready value creation package"
    ],
    metrics: ["Evidence-backed", "Buyer-ready", "Audit-trail complete"],
    use: "Hand buyers a comprehensive value story with receipts — not just consultant decks."
  },
  {
    icon: Shield,
    title: "Contract Compliance Monitor",
    description: "Automated tracking of PBM guarantee performance across all portfolio companies.",
    features: [
      "Guarantee tracking (discount, rebate, spread)",
      "Monthly variance alerts when PBM misses targets",
      "Auto-generated compliance scorecards",
      "Recovery opportunity quantification",
      "Escalation workflow to operator/consultant"
    ],
    metrics: ["Real-time tracking", "Proactive alerts", "Zero manual work"],
    use: "Know immediately when a PBM breaches contract — not 12 months later at renewal."
  },
  {
    icon: Database,
    title: "Benchmarking Engine",
    description: "Independent cost validation using NADAC wholesale pricing and peer group comparisons.",
    features: [
      "NADAC spread analysis (wholesale + markup)",
      "Peer group benchmarking (anonymized portcos)",
      "Category-level cost comparisons",
      "Trend decomposition (utilization vs. unit cost)",
      "Outlier detection and investigation prompts"
    ],
    metrics: ["Independent validation", "Peer comparisons", "Trend clarity"],
    use: "Validate PBM claims with independent data — don't rely on vendor reporting."
  },
  {
    icon: Zap,
    title: "Quick Win Identifier",
    description: "AI-powered detection of immediate cost reduction opportunities across the portfolio.",
    features: [
      "Generic conversion timing analysis",
      "Specialty drug utilization management",
      "Member cost-sharing optimization",
      "Formulary compliance opportunities",
      "Implementation complexity scoring"
    ],
    metrics: ["<30 days to implement", "$250K+ avg impact", "Zero benefit cuts"],
    use: "Surface fast wins for operators without major plan redesigns."
  },
  {
    icon: FileText,
    title: "Exit Package Generator",
    description: "Auto-generate comprehensive value creation documentation for buyer diligence.",
    features: [
      "Healthcare cost reduction case study",
      "Evidence-backed savings ledger",
      "Ongoing optimization infrastructure",
      "Transferable vendor relationships",
      "Post-close continuity plan"
    ],
    metrics: ["Buyer-ready", "Evidence-rich", "Differentiated story"],
    use: "Turn healthcare savings into a premium exit valuation multiple."
  }
];

const caseStudy = {
  fund: "Lower Middle Market PE Fund",
  portfolio: "8 Portfolio Companies",
  totalSpend: "$47M annual healthcare spend",
  timeline: "18 months",
  beforeState: {
    challenges: [
      "No visibility into PBM contract terms",
      "Consultant benchmarks only (no independent data)",
      "Reactive cost management (annual renewal cycle)",
      "No evidence documentation for value creation"
    ]
  },
  afterState: {
    results: [
      "$8.8M annual savings realized (18.7% reduction)",
      "Real-time portfolio dashboard across 8 companies",
      "Contract X-Ray completed for all portcos",
      "Evidence receipts = audit-ready value documentation"
    ]
  },
  financialImpact: {
    annualSavings: "$8.8M",
    ebitdaMultiple: "4.2x",
    enterpriseValueAdd: "$37M",
    quote: "Healthcare cost reduction became our #1 value creation story. Buyers loved the documented savings and ongoing monitoring infrastructure.",
    attribution: "Managing Partner, Anonymous PE Fund"
  }
};

const exitPositioning = [
  {
    metric: "$8.8M",
    label: "Documented Savings",
    description: "Verified with 285+ evidence receipts",
    impact: "Buyer sees proof, not promises"
  },
  {
    metric: "4.2x",
    label: "EBITDA Multiple",
    description: "Applied to recurring cost savings",
    impact: "$37M enterprise value creation"
  },
  {
    metric: "100%",
    label: "Evidence Coverage",
    description: "Every dollar backed by receipts",
    impact: "No buyer discount on value story"
  },
  {
    metric: "Zero",
    label: "Diligence Surprises",
    description: "Contract risks flagged pre-close",
    impact: "Clean transition, no re-trade"
  }
];

const successMetrics = [
  {
    metric: "23%",
    label: "Hidden Cost Savings",
    context: "Average in PBM contracts across portfolio companies",
    icon: TrendingUp
  },
  {
    metric: "$1.8M",
    label: "Annual Recovery",
    context: "Typical mid-market portfolio company ($150M revenue)",
    icon: DollarSign
  },
  {
    metric: "3-5x",
    label: "EBITDA Multiple Impact",
    context: "On documented healthcare cost savings",
    icon: BarChart3
  },
  {
    metric: "48hrs",
    label: "DD Turnaround",
    context: "From data upload to comprehensive forensics report",
    icon: Clock
  },
  {
    metric: "100%",
    label: "Evidence Coverage",
    context: "Every dollar of savings backed by receipts",
    icon: Shield
  },
  {
    metric: "Zero",
    label: "Manual Work",
    context: "Automated portfolio monitoring and alerts",
    icon: Zap
  }
];

export default function CapitalMarketsPage() {
  const [selectedRisk, setSelectedRisk] = useState<number | null>(null);
  const [selectedTool, setSelectedTool] = useState<number | null>(null);

  return (
    <>
      <Head>
        <title>For Capital Markets: Healthcare Investment Intelligence | SiriusB iQ</title>
        <meta
          name="description"
          content="PE/VC/M&A healthcare diligence tools. 48-hour forensics, portfolio monitoring, exit positioning. Turn healthcare into measurable alpha with evidence-backed value creation."
        />
      </Head>

      <Nav />

      <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-slate-950 to-black text-white">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 border border-indigo-400/30 rounded-full mb-8 backdrop-blur-sm">
                <TrendingUp className="w-5 h-5 text-indigo-300" />
                <span className="text-sm font-semibold text-indigo-200">Private Equity · Venture Capital · M&A</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl font-black mb-8 bg-gradient-to-r from-indigo-200 via-blue-300 to-cyan-200 bg-clip-text text-transparent leading-tight">
                The Hidden<br />
                <span className="text-emerald-400">EBITDA Story</span>
              </h1>
              
              <p className="text-2xl text-indigo-100 mb-6 max-w-3xl leading-relaxed">
                Healthcare benefits are <span className="text-indigo-300 font-bold">18-25% of operating expenses</span> for mid-market companies — and most are bleeding <span className="text-red-400 font-bold">$500K-$2M annually</span> to PBM contract gaps.
              </p>
              
              <p className="text-lg text-indigo-300/80 mb-10 max-w-3xl">
                SiriusB iQ delivers forensic healthcare analytics for deal diligence, portfolio monitoring, and exit positioning. See the cost structure your competitors can't — and turn healthcare into measurable alpha.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-lg px-8 py-6 shadow-2xl shadow-indigo-500/50">
                    Schedule DD Briefing
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#portfolio-tools">
                  <Button size="lg" variant="outline" className="border-2 border-indigo-400/50 text-indigo-200 hover:bg-indigo-500/20 text-lg px-8 py-6">
                    View Portfolio Dashboard
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
                    <Card className="bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border-indigo-500/40 backdrop-blur-xl p-6 hover:scale-105 transition-transform">
                      <item.icon className="w-8 h-8 text-indigo-400 mb-3" />
                      <div className="text-5xl font-black text-indigo-300 mb-2">{item.metric}</div>
                      <div className="text-sm text-indigo-200 mb-2">{item.label}</div>
                      <div className="text-xs text-indigo-400">{item.context}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Investment Risks Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-black to-indigo-950/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
                Four Healthcare Risks Hiding in Your Deals
              </h2>
              <p className="text-xl text-indigo-300 max-w-3xl mx-auto">
                What traditional DD misses — and how to find it in 48 hours
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {investmentRisks.map((risk, index) => (
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
                        </div>
                      </div>
                    </div>

                    {selectedRisk === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="bg-gradient-to-r from-emerald-950/50 to-green-950/50 rounded-lg p-4 border border-emerald-500/30 mt-4"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-emerald-400 mb-2">SiriusB iQ Solution:</div>
                            <p className="text-emerald-200 text-sm">{risk.solution}</p>
                          </div>
                        </div>
                        <div className="bg-emerald-500/10 rounded px-3 py-2 border border-emerald-500/30">
                          <div className="text-xs text-emerald-300 font-semibold">Outcome: <span className="text-emerald-200">{risk.metric}</span></div>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DD Workflow Section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
                48-Hour Healthcare DD Workflow
              </h2>
              <p className="text-xl text-indigo-300 max-w-3xl mx-auto">
                From data upload to comprehensive forensics report in 2 business days
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ddWorkflow.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-indigo-950/40 to-blue-950/40 border-indigo-500/30 p-8 h-full">
                    <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-4 shadow-xl shadow-indigo-500/50 mb-6 inline-block">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm text-indigo-400 font-semibold mb-2">{step.timeline}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-indigo-200 mb-6 text-sm">{step.description}</p>
                    <div className="space-y-2">
                      {step.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-indigo-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Tools Section */}
        <section id="portfolio-tools" className="py-24 px-4 bg-gradient-to-b from-indigo-950/30 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
                Portfolio Management Arsenal
              </h2>
              <p className="text-xl text-indigo-300 max-w-3xl mx-auto">
                Real-time healthcare intelligence across your entire portfolio
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioTools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-gradient-to-br from-indigo-950/40 to-blue-950/40 border-indigo-500/30 p-8 h-full group hover:scale-105 transition-all cursor-pointer"
                    onClick={() => setSelectedTool(selectedTool === index ? null : index)}
                  >
                    <tool.icon className="w-12 h-12 text-indigo-400 mb-6 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold text-white mb-4">{tool.title}</h3>
                    <p className="text-indigo-100 mb-6">{tool.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.metrics.map((metric, idx) => (
                        <div key={idx} className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded-full text-xs text-indigo-300">
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
                        <div className="bg-indigo-950/50 rounded-lg p-4 border border-indigo-500/30">
                          <div className="text-sm text-indigo-200 font-semibold mb-3">Key Features:</div>
                          <ul className="text-xs text-indigo-300 space-y-2">
                            {tool.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-3">
                          <div className="text-xs text-emerald-300 font-semibold mb-1">Use Case:</div>
                          <div className="text-xs text-emerald-200">{tool.use}</div>
                        </div>
                      </motion.div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Study Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
                Real Portfolio Impact
              </h2>
              <p className="text-xl text-indigo-300">{caseStudy.fund} • {caseStudy.portfolio}</p>
            </motion.div>

            <Card className="bg-gradient-to-r from-indigo-950/50 to-blue-950/50 border-indigo-500/40 p-10">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-sm text-indigo-400 mb-3 uppercase tracking-wide font-semibold">Before SiriusB iQ</div>
                  <div className="bg-gradient-to-br from-red-950/50 to-orange-950/50 border border-red-500/30 rounded-xl p-6">
                    <div className="text-4xl font-black text-red-400 mb-2">{caseStudy.totalSpend}</div>
                    <div className="text-sm text-red-200 mb-4">Total Healthcare Spend</div>
                    <div className="space-y-2 text-sm text-red-300">
                      {caseStudy.beforeState.challenges.map((challenge, idx) => (
                        <div key={idx}>❌ {challenge}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-indigo-400 mb-3 uppercase tracking-wide font-semibold">After {caseStudy.timeline}</div>
                  <div className="bg-gradient-to-br from-emerald-950/50 to-green-950/50 border border-emerald-500/30 rounded-xl p-6">
                    <div className="text-4xl font-black text-emerald-400 mb-2">$38.2M</div>
                    <div className="text-sm text-emerald-200 mb-4">Total Healthcare Spend</div>
                    <div className="space-y-2 text-sm text-emerald-300">
                      {caseStudy.afterState.results.map((result, idx) => (
                        <div key={idx}>✓ {result}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 border border-indigo-500/30 rounded-xl p-6">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-black text-emerald-400 mb-1">{caseStudy.financialImpact.annualSavings}</div>
                    <div className="text-xs text-indigo-300">Annual Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-blue-400 mb-1">{caseStudy.financialImpact.ebitdaMultiple}</div>
                    <div className="text-xs text-indigo-300">EBITDA Multiple Impact</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-cyan-400 mb-1">{caseStudy.financialImpact.enterpriseValueAdd}</div>
                    <div className="text-xs text-indigo-300">Enterprise Value Add</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-indigo-200 italic">"{caseStudy.financialImpact.quote}"</div>
                  <div className="text-xs text-indigo-500 mt-2">— {caseStudy.financialImpact.attribution}</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Exit Positioning Section */}
        <section className="py-24 px-4 bg-gradient-to-b from-indigo-950/30 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
                Turn Healthcare Into Premium Exit Valuation
              </h2>
              <p className="text-xl text-indigo-300 max-w-3xl mx-auto">
                Document value creation with evidence buyers can verify and underwrite
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {exitPositioning.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border-indigo-500/30 p-8 text-center hover:scale-105 transition-transform">
                    <div className="text-6xl font-black text-indigo-300 mb-3">{item.metric}</div>
                    <div className="text-lg text-indigo-200 font-semibold mb-2">{item.label}</div>
                    <div className="text-sm text-indigo-400 mb-4">{item.description}</div>
                    <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-lg p-3">
                      <div className="text-xs text-emerald-300">{item.impact}</div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Metrics Grid */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-black mb-6 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
                The Numbers Tell the Story
              </h2>
              <p className="text-xl text-indigo-300 max-w-3xl mx-auto">
                What happens when you treat healthcare as a value creation lever, not a fixed cost
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
                  <Card className="bg-gradient-to-br from-indigo-900/40 to-blue-900/40 border-indigo-500/30 p-8 text-center hover:scale-105 transition-transform">
                    <metric.icon className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
                    <div className="text-6xl font-black text-indigo-300 mb-3">{metric.metric}</div>
                    <div className="text-lg text-indigo-200 font-semibold mb-2">{metric.label}</div>
                    <div className="text-sm text-indigo-400">{metric.context}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DD Package CTA */}
        <section className="py-24 px-4 bg-gradient-to-b from-indigo-950/30 to-black">
          <div className="max-w-4xl mx-auto">
            <Card className="relative bg-gradient-to-br from-indigo-900/80 to-blue-900/80 border-4 border-indigo-400 p-12 shadow-[0_0_60px_rgba(99,102,241,0.6),0_0_100px_rgba(99,102,241,0.4),0_0_140px_rgba(99,102,241,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-blue-500/20 to-cyan-500/20 rounded-lg" />
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-lg blur-xl opacity-75" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <div className="inline-block px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mb-4 shadow-[0_0_30px_rgba(99,102,241,0.8)]">
                    <span className="text-sm font-black text-white uppercase tracking-wider">💰 Exclusive DD Analysis 💰</span>
                  </div>
                  <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-indigo-200 via-white to-blue-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(99,102,241,0.8)]">
                    Request DD Analysis Sample
                  </h2>
                  <p className="text-xl text-indigo-100 drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]">
                    See a real healthcare forensics report from a recent deal (anonymized). Includes contract X-Ray, claims analysis, and value creation roadmap.
                  </p>
                </div>
                
                <form className="max-w-2xl mx-auto space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-indigo-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">Full Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-indigo-400 rounded-xl text-white placeholder-indigo-300/70 focus:outline-none focus:border-indigo-300 focus:shadow-[0_0_30px_rgba(99,102,241,0.8)] transition-all font-semibold"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-indigo-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-indigo-400 rounded-xl text-white placeholder-indigo-300/70 focus:outline-none focus:border-indigo-300 focus:shadow-[0_0_30px_rgba(99,102,241,0.8)] transition-all font-semibold"
                        placeholder="john@firm.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-black text-indigo-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">Firm / Fund</label>
                      <input
                        type="text"
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-indigo-400 rounded-xl text-white placeholder-indigo-300/70 focus:outline-none focus:border-indigo-300 focus:shadow-[0_0_30px_rgba(99,102,241,0.8)] transition-all font-semibold"
                        placeholder="Capital Partners"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-black text-indigo-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">Role</label>
                      <select
                        required
                        className="w-full px-5 py-4 bg-black/60 border-3 border-indigo-400 rounded-xl text-white focus:outline-none focus:border-indigo-300 focus:shadow-[0_0_30px_rgba(99,102,241,0.8)] transition-all font-semibold"
                      >
                        <option value="">Select role...</option>
                        <option value="partner">Partner / Managing Director</option>
                        <option value="principal">Principal</option>
                        <option value="vp">VP / Associate</option>
                        <option value="analyst">Analyst</option>
                        <option value="advisor">Operating Partner / Advisor</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-black text-indigo-100 mb-2 uppercase tracking-wide drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]">Portfolio Size (AUM)</label>
                    <select
                      required
                      className="w-full px-5 py-4 bg-black/60 border-3 border-indigo-400 rounded-xl text-white focus:outline-none focus:border-indigo-300 focus:shadow-[0_0_30px_rgba(99,102,241,0.8)] transition-all font-semibold"
                    >
                      <option value="">Select AUM range...</option>
                      <option value="<100m">Under $100M</option>
                      <option value="100-500m">$100M - $500M</option>
                      <option value="500m-1b">$500M - $1B</option>
                      <option value="1-5b">$1B - $5B</option>
                      <option value=">5b">Over $5B</option>
                    </select>
                  </div>

                  <Link href="/request-demo">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 hover:from-indigo-400 hover:via-blue-400 hover:to-cyan-400 text-white text-2xl font-black py-8 shadow-[0_0_40px_rgba(99,102,241,0.9),0_0_60px_rgba(99,102,241,0.6),0_0_80px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,1),0_0_80px_rgba(99,102,241,0.8),0_0_120px_rgba(99,102,241,0.6)] uppercase tracking-wider border-2 border-white/50"
                    >
                      📊 Download Sample Report 📊
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Button>
                  </Link>
                  
                  <p className="text-xs text-center text-indigo-200 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]">
                    Includes: Anonymized deal case study • Contract X-Ray sample • Claims analysis methodology • Value creation roadmap template
                  </p>
                </form>
              </div>
            </Card>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Award className="w-16 h-16 mx-auto mb-6 text-indigo-400" />
              <h2 className="text-5xl font-black mb-8 bg-gradient-to-r from-indigo-200 to-blue-200 bg-clip-text text-transparent">
                Turn Healthcare Into Alpha
              </h2>
              <p className="text-2xl text-indigo-200 mb-12">
                Schedule a 30-minute capital markets briefing to see how SiriusB iQ unlocks 15-25% in portfolio company healthcare spend.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xl px-12 py-8 shadow-2xl shadow-indigo-500/50">
                    Schedule DD Briefing
                    <Briefcase className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
                <Link href="/investor">
                  <Button size="lg" variant="outline" className="border-2 border-indigo-400/50 text-indigo-200 hover:bg-indigo-500/20 text-xl px-12 py-8">
                    View Investor Deck
                    <TrendingUp className="w-6 h-6 ml-3" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-indigo-400 mt-8">
                PE/VC-specific demo • 48-hour DD turnaround • Portfolio monitoring included • Exit positioning support
              </p>
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}