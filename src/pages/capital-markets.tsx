import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { TrendingUp, PieChart, AlertTriangle, CheckCircle2, DollarSign, Target, Zap, Shield, BarChart3, LineChart, Activity, TrendingDown, ArrowRight, Eye, FileText, Clock, Users, Building2 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8 }
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.15 }
};

export default function CapitalMarketsPage() {
  const [expandedRisk, setExpandedRisk] = useState<number | null>(null);
  const [expandedTool, setExpandedTool] = useState<number | null>(null);
  const [expandedWorkflow, setExpandedWorkflow] = useState<number | null>(null);

  const investmentRisks = [
    {
      title: "Hidden EBITDA Leak",
      reality: "Target shows $8.2M EBITDA. Pharma costs buried in 'Benefits & Wellness' line item show $2.4M unexplained variance vs. peer benchmarks.",
      impact: "$12M valuation miss. Post-close team discovers PBM rebates weren't passed through. CFO can't explain where the money went.",
      solution: "SiriusB iQ Contract X-Ray surfaces hidden spreads in 48 hours. Evidence receipts prove $2.1M recoverable with contract renegotiation.",
      icon: TrendingDown,
      color: "rose"
    },
    {
      title: "Valuation Blind Spot",
      reality: "You're paying 6.2x EBITDA based on seller's cost structure. Healthcare represents 22% of OpEx but diligence packet has zero line-item detail.",
      impact: "Board approved the deal assuming 'market rates.' Actual pharmacy costs are 40% above NADAC benchmarks. EBITDA multiple was really 8.1x.",
      solution: "SiriusB iQ benchmarks every claim against NADAC + AWP floor. Delivers normalized EBITDA model with pharmacy spread elimination scenarios pre-LOI.",
      icon: Eye,
      color: "amber"
    },
    {
      title: "Post-Close Surprise",
      reality: "Deal closed. 100-day plan assumes '$3.2M in quick wins from PBM optimization.' No evidence, no owner, no timeline, no proof.",
      impact: "Month 6: CFO reports zero realization. PBM contract locked for 18 months. Board questions team competence. LP confidence erodes.",
      solution: "SiriusB iQ Value Office assigns owners to every synergy claim. Weekly reconciliation shows $1.8M realized, $1.1M at-risk with recovery plans, $300K deferred.",
      icon: AlertTriangle,
      color: "orange"
    },
    {
      title: "Exit Story Gap",
      reality: "You've owned the asset 3 years. Created 'significant value' in healthcare costs. Buyer asks: 'Prove it.' You have PowerPoint slides, no receipts.",
      impact: "Buyer discounts your optimization claims by 80%. Exit valuation drops $22M because you can't document realization with audit-grade evidence.",
      solution: "SiriusB iQ Evidence Ledger ships with every board pack. 285 receipts per year, audit-ready lineage, buyers adopt the framework and pay premium for governance.",
      icon: FileText,
      color: "red"
    }
  ];

  const ddWorkflow = [
    {
      step: "Data Upload",
      duration: "Day 1",
      description: "Secure upload of pharmacy claims, PBM contract, census, and plan design documents into isolated diligence workspace",
      deliverables: ["Encrypted data room", "HIPAA-compliant processing", "Automated data validation", "Exception queue generation"],
      icon: Shield
    },
    {
      step: "Evidence Pack Build",
      duration: "Days 2-3",
      description: "AI-driven analysis surfaces hidden spreads, benchmarks claims against NADAC, identifies contract leakage, and generates risk heat maps",
      deliverables: ["Contract X-Ray report", "NADAC benchmark analysis", "Hidden spread detection", "Risk-ranked exception list"],
      icon: BarChart3
    },
    {
      step: "Validation & Synthesis",
      duration: "Day 4",
      description: "SiriusB iQ team validates findings, builds normalized EBITDA model, and creates board-ready evidence package with recovery scenarios",
      deliverables: ["Normalized EBITDA model", "Recovery scenario analysis", "Evidence receipt archive", "Value creation roadmap"],
      icon: CheckCircle2
    },
    {
      step: "Management Presentation",
      duration: "Day 5",
      description: "Live walkthrough with deal team covering findings, value at-risk, quick wins, and post-close governance framework recommendation",
      deliverables: ["Executive briefing deck", "Q&A session", "Post-close playbook", "Value office setup guide"],
      icon: Users
    }
  ];

  const portfolioTools = [
    {
      title: "Executive Command Center",
      description: "Portfolio-wide dashboard tracking healthcare costs, realization status, and governance compliance across all holdings with real-time alerts",
      features: ["Multi-portfolio views", "Realization heatmaps", "At-risk flagging", "Board-ready exports"],
      outcomes: ["87% realization rate vs. 34% industry avg", "60% faster monthly close", "Zero post-close surprises"],
      icon: Activity,
      color: "indigo"
    },
    {
      title: "Value Creation Tracker",
      description: "Owner-assigned synergy tracking with weekly reconciliation workflows, evidence receipt generation, and automated variance alerting",
      features: ["Synergy owner assignment", "Weekly reconciliation", "Evidence automation", "Variance alerting"],
      outcomes: ["$5.2M avg realized per portfolio co", "15min weekly review time", "100% owner accountability"],
      icon: Target,
      color: "cyan"
    },
    {
      title: "Contract Compliance Monitor",
      description: "Continuous monitoring of PBM contract performance vs. guarantees with automated breach detection and recovery workflow initiation",
      features: ["Guarantee tracking", "Breach detection", "Recovery workflows", "Vendor scorecards"],
      outcomes: ["$1.8M avg recoveries per breach", "72hr resolution time", "98% compliance rate"],
      icon: Shield,
      color: "violet"
    },
    {
      title: "Benchmarking Engine",
      description: "Real-time comparison of pharmacy costs against NADAC, peer portfolios, and Mark Cuban Cost Plus pricing with immediate outlier flagging",
      features: ["NADAC benchmarking", "Peer comparison", "Cost Plus analysis", "Outlier detection"],
      outcomes: ["23% spread reduction avg", "48hr outlier resolution", "$2.4M savings per portfolio co"],
      icon: BarChart3,
      color: "blue"
    },
    {
      title: "Quick Win Identifier",
      description: "AI-powered analysis surfaces immediate value opportunities with pre-built evidence packs and implementation playbooks for rapid deployment",
      features: ["Opportunity scoring", "Implementation guides", "Evidence automation", "ROI projections"],
      outcomes: ["$400K avg 90-day wins", "8 day avg implementation", "3.2x ROI on quick wins"],
      icon: Zap,
      color: "amber"
    },
    {
      title: "Exit Package Generator",
      description: "Automated creation of buyer-ready evidence packages documenting all value creation with audit-grade receipts and governance framework handoff",
      features: ["Evidence compilation", "Audit trail generation", "Governance handoff docs", "Buyer onboarding kit"],
      outcomes: ["$18M avg premium vs. undocumented exits", "100% buyer adoption rate", "Zero discount on optimization claims"],
      icon: TrendingUp,
      color: "emerald"
    }
  ];

  return (
    <>
      <Head>
        <title>Capital Markets Focus - SiriusB iQ</title>
        <meta name="description" content="Deal intelligence and value architecture for PE/VC/M&A professionals. Evidence-backed diligence, controlled value realization, and audit-ready governance." />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Nav />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-black via-indigo-950/20 to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <LineChart className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-indigo-300 font-medium">For PE / VC / M&A Professionals</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
                The Hidden EBITDA Story
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
                Your target's healthcare costs hide $2-4M in phantom spread. Post-close teams can't find it. 
                Buyers discount your exit claims. <span className="text-indigo-300 font-semibold">Evidence-backed diligence changes everything.</span>
              </p>
            </motion.div>

            {/* Animated Metrics */}
            <motion.div {...staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { value: "23%", label: "Hidden Savings Found", subtext: "Avg per portfolio co", color: "indigo" },
                { value: "$1.8M", label: "Avg Recovery", subtext: "Per diligence sprint", color: "cyan" },
                { value: "3-5x", label: "EBITDA Multiple", subtext: "Premium on exits", color: "violet" },
                { value: "48hr", label: "DD Turnaround", subtext: "Evidence pack ready", color: "blue" }
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  className={`p-6 rounded-2xl bg-gradient-to-br from-${metric.color}-950/40 to-transparent border border-${metric.color}-500/20 hover:border-${metric.color}-500/40 transition-all duration-300 hover:scale-105`}
                >
                  <div className={`text-4xl font-bold text-${metric.color}-300 mb-2`}>{metric.value}</div>
                  <div className="text-sm font-semibold text-gray-300 mb-1">{metric.label}</div>
                  <div className="text-xs text-gray-500">{metric.subtext}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Investment Risks Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-100 mb-4">
                The Four Risks Destroying Deal Value
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Traditional diligence misses hidden healthcare spreads, creating post-close surprises that evaporate EBITDA and crater exit multiples
              </p>
            </motion.div>

            <motion.div {...staggerContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {investmentRisks.map((risk, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  className={`p-8 rounded-2xl bg-gradient-to-br from-${risk.color}-950/20 to-transparent border border-${risk.color}-500/20 hover:border-${risk.color}-500/40 transition-all duration-300 cursor-pointer`}
                  onClick={() => setExpandedRisk(expandedRisk === index ? null : index)}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-${risk.color}-500/20`}>
                      <risk.icon className={`w-6 h-6 text-${risk.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{risk.title}</h3>
                      <div className={`text-sm font-semibold ${risk.color === 'rose' ? 'text-rose-400' : risk.color === 'amber' ? 'text-amber-400' : risk.color === 'orange' ? 'text-orange-400' : 'text-red-400'}`}>
                        Click to expand
                      </div>
                    </div>
                  </div>

                  {expandedRisk === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <div className="text-sm font-semibold text-gray-400 mb-2">THE REALITY:</div>
                        <p className="text-gray-300 leading-relaxed">{risk.reality}</p>
                      </div>
                      
                      <div>
                        <div className="text-sm font-semibold text-gray-400 mb-2">THE IMPACT:</div>
                        <p className="text-gray-300 leading-relaxed">{risk.impact}</p>
                      </div>
                      
                      <div className={`p-4 rounded-xl bg-${risk.color}-500/10 border border-${risk.color}-500/20`}>
                        <div className="text-sm font-semibold text-gray-400 mb-2">SIRIUSB IQ SOLUTION:</div>
                        <p className="text-gray-200 leading-relaxed">{risk.solution}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 48-Hour DD Workflow */}
        <section className="py-20 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-100 mb-4">
                48-Hour Diligence Workflow
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                From data upload to management presentation in under 2 days. Evidence-backed findings, normalized EBITDA model, and post-close playbook included.
              </p>
            </motion.div>

            <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ddWorkflow.map((phase, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-transparent border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                  onClick={() => setExpandedWorkflow(expandedWorkflow === index ? null : index)}
                >
                  <div className="absolute top-4 right-4 text-6xl font-bold text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors">
                    {index + 1}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="inline-block p-3 rounded-xl bg-indigo-500/20 mb-4">
                      <phase.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    
                    <div className="text-sm font-semibold text-indigo-400 mb-2">{phase.duration}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{phase.step}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{phase.description}</p>

                    {expandedWorkflow === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-indigo-500/20"
                      >
                        <div className="text-xs font-semibold text-gray-400 mb-2">DELIVERABLES:</div>
                        <div className="space-y-2">
                          {phase.deliverables.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                              <CheckCircle2 className="w-3 h-3 text-indigo-400 flex-shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Portfolio Management Arsenal */}
        <section className="py-20 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-100 mb-4">
                Portfolio Management Arsenal
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Post-close value office tools that ensure every synergy has an owner, every claim has evidence, and every board pack has audit-grade receipts
              </p>
            </motion.div>

            <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioTools.map((tool, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  className={`p-8 rounded-2xl bg-gradient-to-br from-${tool.color}-950/20 to-transparent border border-${tool.color}-500/20 hover:border-${tool.color}-500/40 transition-all duration-300 cursor-pointer`}
                  onClick={() => setExpandedTool(expandedTool === index ? null : index)}
                >
                  <div className={`inline-block p-3 rounded-xl bg-${tool.color}-500/20 mb-4`}>
                    <tool.icon className={`w-6 h-6 text-${tool.color}-400`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{tool.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{tool.description}</p>

                  {expandedTool === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 mt-6"
                    >
                      <div>
                        <div className="text-xs font-semibold text-gray-400 mb-2">KEY FEATURES:</div>
                        <div className="space-y-2">
                          {tool.features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                              <div className={`w-1.5 h-1.5 rounded-full bg-${tool.color}-400`} />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className={`p-3 rounded-xl bg-${tool.color}-500/10 border border-${tool.color}-500/20`}>
                        <div className="text-xs font-semibold text-gray-400 mb-2">OUTCOMES:</div>
                        <div className="space-y-1">
                          {tool.outcomes.map((outcome, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                              <CheckCircle2 className={`w-3 h-3 text-${tool.color}-400 flex-shrink-0`} />
                              <span>{outcome}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Real Portfolio Impact */}
        <section className="py-20 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-100 mb-4">
                Real Portfolio Impact
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Mid-market PE firm with 8 portfolio companies deploys SiriusB iQ value office across holdings
              </p>
            </motion.div>

            <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-rose-950/20 to-transparent border border-rose-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">❌</div>
                  <h3 className="text-2xl font-bold text-rose-300">Before SiriusB iQ</h3>
                </div>
                <div className="space-y-4 text-gray-400">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <p>Healthcare costs tracked as single line item across all 8 companies. Zero visibility into actual spend components.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <p>100-day plans promised "$12M in pharmacy optimization" but no owners, no tracking, no evidence.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <p>CFO admits to IC: "We think we saved money but can't prove it. PBM won't share real data."</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <p>Exit buyer discounts optimization claims by 90%. Lost $31M in valuation premium.</p>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/20 to-transparent border border-emerald-500/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-4xl">✓</div>
                  <h3 className="text-2xl font-bold text-emerald-300">With SiriusB iQ</h3>
                </div>
                <div className="space-y-4 text-gray-400">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p>Portfolio-wide dashboard shows real-time pharmacy costs vs. NADAC benchmarks across all holdings.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p>$8.8M in documented savings across 8 companies with 285 evidence receipts per year per holding.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p>Every synergy has owner, status, and proof. Weekly 15min reconciliation per portfolio company.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p>Exit buyer adopts governance framework. Pays $37M premium for "audit-ready value creation discipline."</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} className="mt-12 text-center">
              <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-transparent border border-indigo-500/20">
                <div className="text-5xl font-bold text-indigo-300 mb-2">$37M</div>
                <div className="text-lg text-gray-300">Enterprise Value Added from Documented Governance</div>
                <div className="text-sm text-gray-500 mt-2">4.2x multiple on healthcare optimization vs. undocumented claims</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Exit Positioning Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-100 mb-4">
                Turn Healthcare Into Premium Valuation
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Buyers pay premium for documented governance discipline. Evidence receipts convert PowerPoint claims into measurable alpha.
              </p>
            </motion.div>

            <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { metric: "285", label: "Evidence Receipts/Year", subtext: "Per portfolio company", icon: FileText, color: "cyan" },
                { metric: "100%", label: "Audit-Ready Lineage", subtext: "Every claim traced to source", icon: Shield, color: "violet" },
                { metric: "$18M", label: "Avg Premium", subtext: "Documented vs. undocumented exits", icon: TrendingUp, color: "emerald" },
                { metric: "4.2x", label: "Valuation Multiple", subtext: "On proven optimization claims", icon: DollarSign, color: "indigo" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  className={`p-6 rounded-2xl bg-gradient-to-br from-${item.color}-950/40 to-transparent border border-${item.color}-500/20 hover:border-${item.color}-500/40 transition-all duration-300 text-center group hover:scale-105`}
                >
                  <div className={`inline-block p-3 rounded-xl bg-${item.color}-500/20 mb-4`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                  </div>
                  <div className={`text-4xl font-bold text-${item.color}-300 mb-2`}>{item.metric}</div>
                  <div className="text-sm font-semibold text-gray-300 mb-1">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.subtext}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Success Metrics Grid */}
        <section className="py-20 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-100 mb-4">
                Capital Markets Success Metrics
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Evidence-backed diligence, controlled value realization, and audit-ready governance deliver measurable alpha
              </p>
            </motion.div>

            <motion.div {...staggerContainer} className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { value: "48hr", label: "DD Turnaround", subtext: "Evidence pack ready" },
                { value: "$8.8M", label: "Portfolio Value", subtext: "8 companies avg" },
                { value: "87%", label: "Realization Rate", subtext: "vs. 34% industry" },
                { value: "285", label: "Receipts/Year", subtext: "Per holding" },
                { value: "15min", label: "Weekly Review", subtext: "Per portfolio co" },
                { value: "$37M", label: "Exit Premium", subtext: "Governance value add" }
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  className="p-8 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-transparent border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 text-center hover:scale-105"
                >
                  <div className="text-5xl font-bold text-indigo-300 mb-3">{metric.value}</div>
                  <div className="text-sm font-semibold text-gray-300 mb-1">{metric.label}</div>
                  <div className="text-xs text-gray-500">{metric.subtext}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Premium DD Package CTA */}
        <section className="py-20 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fadeInUp} className="p-12 rounded-3xl bg-gradient-to-br from-indigo-950/40 to-transparent border border-indigo-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent" />
              
              <div className="relative z-10 text-center mb-8">
                <h3 className="text-4xl md:text-5xl font-bold text-indigo-100 mb-4">
                  Get Your Premium DD Package
                </h3>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Evidence-backed diligence playbook, normalized EBITDA template, and post-close value office framework
                </p>
              </div>

              <form className="space-y-6 relative z-10 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="px-6 py-4 rounded-xl bg-black/50 border border-indigo-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/40 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-6 py-4 rounded-xl bg-black/50 border border-indigo-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/40 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select className="px-6 py-4 rounded-xl bg-black/50 border border-indigo-500/20 text-white focus:outline-none focus:border-indigo-500/40 transition-colors">
                    <option value="">Role</option>
                    <option value="gp">GP / Managing Partner</option>
                    <option value="principal">Principal / VP</option>
                    <option value="analyst">Associate / Analyst</option>
                    <option value="advisor">Advisor / Consultant</option>
                  </select>
                  <select className="px-6 py-4 rounded-xl bg-black/50 border border-indigo-500/20 text-white focus:outline-none focus:border-indigo-500/40 transition-colors">
                    <option value="">AUM Range</option>
                    <option value="sub500">Under $500M</option>
                    <option value="500to2b">$500M - $2B</option>
                    <option value="2to10b">$2B - $10B</option>
                    <option value="over10b">Over $10B</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Firm Name"
                  className="w-full px-6 py-4 rounded-xl bg-black/50 border border-indigo-500/20 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/40 transition-colors"
                />

                <Link
                  href="/request-demo"
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-lg font-semibold hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Access Premium DD Package</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="text-xs text-gray-500 text-center">
                  Includes: 48hr diligence playbook · Evidence pack template · Value office setup guide · Exit documentation framework
                </p>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fadeInUp}>
              <h3 className="text-4xl md:text-5xl font-bold text-indigo-100 mb-6">
                Ready to De-Risk Your Next Deal?
              </h3>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Schedule a 48-hour diligence sprint briefing and see how evidence-backed healthcare analysis transforms deal confidence
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/request-demo"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-lg font-semibold hover:from-indigo-500 hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-105"
                >
                  <Users className="w-5 h-5" />
                  <span>Schedule DD Briefing</span>
                </Link>
                <Link
                  href="/investor"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-100 text-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <FileText className="w-5 h-5" />
                  <span>View Investor Deck</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}