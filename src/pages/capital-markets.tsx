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
      color: "rose",
      particles: 12
    },
    {
      title: "Valuation Blind Spot",
      reality: "You're paying 6.2x EBITDA based on seller's cost structure. Healthcare represents 22% of OpEx but diligence packet has zero line-item detail.",
      impact: "Board approved the deal assuming 'market rates.' Actual pharmacy costs are 40% above NADAC benchmarks. EBITDA multiple was really 8.1x.",
      solution: "SiriusB iQ benchmarks every claim against NADAC + AWP floor. Delivers normalized EBITDA model with pharmacy spread elimination scenarios pre-LOI.",
      icon: Eye,
      color: "amber",
      particles: 10
    },
    {
      title: "Post-Close Surprise",
      reality: "Deal closed. 100-day plan assumes '$3.2M in quick wins from PBM optimization.' No evidence, no owner, no timeline, no proof.",
      impact: "Month 6: CFO reports zero realization. PBM contract locked for 18 months. Board questions team competence. LP confidence erodes.",
      solution: "SiriusB iQ Value Office assigns owners to every synergy claim. Weekly reconciliation shows $1.8M realized, $1.1M at-risk with recovery plans, $300K deferred.",
      icon: AlertTriangle,
      color: "orange",
      particles: 11
    },
    {
      title: "Exit Story Gap",
      reality: "You've owned the asset 3 years. Created 'significant value' in healthcare costs. Buyer asks: 'Prove it.' You have PowerPoint slides, no receipts.",
      impact: "Buyer discounts your optimization claims by 80%. Exit valuation drops $22M because you can't document realization with audit-grade evidence.",
      solution: "SiriusB iQ Evidence Ledger ships with every board pack. 285 receipts per year, audit-ready lineage, buyers adopt the framework and pay premium for governance.",
      icon: FileText,
      color: "red",
      particles: 13
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
      color: "indigo",
      particles: 14
    },
    {
      title: "Value Creation Tracker",
      description: "Owner-assigned synergy tracking with weekly reconciliation workflows, evidence receipt generation, and automated variance alerting",
      features: ["Synergy owner assignment", "Weekly reconciliation", "Evidence automation", "Variance alerting"],
      outcomes: ["$5.2M avg realized per portfolio co", "15min weekly review time", "100% owner accountability"],
      icon: Target,
      color: "cyan",
      particles: 12
    },
    {
      title: "Contract Compliance Monitor",
      description: "Continuous monitoring of PBM contract performance vs. guarantees with automated breach detection and recovery workflow initiation",
      features: ["Guarantee tracking", "Breach detection", "Recovery workflows", "Vendor scorecards"],
      outcomes: ["$1.8M avg recoveries per breach", "72hr resolution time", "98% compliance rate"],
      icon: Shield,
      color: "violet",
      particles: 13
    },
    {
      title: "Benchmarking Engine",
      description: "Real-time comparison of pharmacy costs against NADAC, peer portfolios, and Mark Cuban Cost Plus pricing with immediate outlier flagging",
      features: ["NADAC benchmarking", "Peer comparison", "Cost Plus analysis", "Outlier detection"],
      outcomes: ["23% spread reduction avg", "48hr outlier resolution", "$2.4M savings per portfolio co"],
      icon: BarChart3,
      color: "blue",
      particles: 11
    },
    {
      title: "Quick Win Identifier",
      description: "AI-powered analysis surfaces immediate value opportunities with pre-built evidence packs and implementation playbooks for rapid deployment",
      features: ["Opportunity scoring", "Implementation guides", "Evidence automation", "ROI projections"],
      outcomes: ["$400K avg 90-day wins", "8 day avg implementation", "3.2x ROI on quick wins"],
      icon: Zap,
      color: "amber",
      particles: 15
    },
    {
      title: "Exit Package Generator",
      description: "Automated creation of buyer-ready evidence packages documenting all value creation with audit-grade receipts and governance framework handoff",
      features: ["Evidence compilation", "Audit trail generation", "Governance handoff docs", "Buyer onboarding kit"],
      outcomes: ["$18M avg premium vs. undocumented exits", "100% buyer adoption rate", "Zero discount on optimization claims"],
      icon: TrendingUp,
      color: "emerald",
      particles: 14
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
        <section className="relative py-24 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/3 w-[800px] h-[800px] bg-gradient-radial from-indigo-500/20 via-indigo-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 100, 0],
                y: [0, -60, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/3 w-[700px] h-[700px] bg-gradient-radial from-blue-500/15 via-blue-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -80, 0],
                y: [0, 50, 0],
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10 px-6">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <LineChart className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-indigo-300 font-medium">For PE / VC / M&A Professionals</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent leading-tight">
                The Hidden EBITDA Story
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
                Your target's healthcare costs hide $2-4M in phantom spread. Post-close teams can't find it. 
                Buyers discount your exit claims. <span className="text-indigo-300 font-semibold">Evidence-backed diligence changes everything.</span>
              </p>
            </motion.div>

            {/* Animated Metrics */}
            <motion.div {...staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { value: "23%", label: "Hidden Savings Found", subtext: "Avg per portfolio co", color: "indigo", particles: 12 },
                { value: "$1.8M", label: "Avg Recovery", subtext: "Per diligence sprint", color: "cyan", particles: 10 },
                { value: "3-5x", label: "EBITDA Multiple", subtext: "Premium on exits", color: "violet", particles: 13 },
                { value: "48hr", label: "DD Turnaround", subtext: "Evidence pack ready", color: "blue", particles: 11 }
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-black/80 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  {/* Floating particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {Array.from({ length: metric.particles }).map((_, j) => (
                      <motion.div
                        key={j}
                        className={`absolute w-1 h-1 bg-${metric.color}-400/60 rounded-full`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -25, 0],
                          x: [0, Math.random() * 15 - 7.5, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1.3, 0],
                        }}
                        transition={{
                          duration: 2.5 + Math.random() * 1.5,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>

                  <div className={`text-4xl font-bold text-${metric.color}-300 mb-2`}>{metric.value}</div>
                  <div className="text-sm font-semibold text-gray-300 mb-1">{metric.label}</div>
                  <div className="text-xs text-gray-500">{metric.subtext}</div>

                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
                    initial={false}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden">
          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-red-500/15 via-red-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -70, 0],
                y: [0, 40, 0],
                scale: [1, 1.1, 1],
                opacity: [0.25, 0.4, 0.25]
              }}
              transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
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
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-black/80 border border-slate-700/50 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer backdrop-blur-xl"
                  onClick={() => setExpandedRisk(expandedRisk === index ? null : index)}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Floating particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {Array.from({ length: risk.particles }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-${risk.color}-400/60 rounded-full`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -25, 0],
                          x: [0, Math.random() * 15 - 7.5, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1.3, 0],
                        }}
                        transition={{
                          duration: 2.5 + Math.random() * 1.5,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-start gap-4 mb-6 relative">
                    <motion.div 
                      className={`p-3 rounded-xl bg-${risk.color}-500/20 group-hover:shadow-lg group-hover:shadow-${risk.color}-500/50 transition-all`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <risk.icon className={`w-6 h-6 text-${risk.color}-400`} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-100 transition-colors">{risk.title}</h3>
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
                      className="space-y-6 relative"
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

                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
                    initial={false}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </motion.div>

                  {/* Corner accents */}
                  <div className={`absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-indigo-500/0 group-hover:border-indigo-500/60 rounded-tr-2xl transition-all duration-500`} />
                  <div className={`absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-indigo-500/0 group-hover:border-indigo-500/60 rounded-bl-2xl transition-all duration-500`} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 48-Hour DD Workflow */}
        <section className="py-20 px-6 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden">
          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-radial from-indigo-500/15 via-indigo-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 90, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative">
            <motion.div {...fadeInUp} className="text-center mb-12">
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
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-black/80 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl"
                  onClick={() => setExpandedWorkflow(expandedWorkflow === index ? null : index)}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="absolute top-4 right-4 text-6xl font-bold text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors">
                    {index + 1}
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-block p-3 rounded-xl bg-indigo-500/20 mb-4 group-hover:shadow-xl group-hover:shadow-indigo-500/50 transition-all"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <phase.icon className="w-6 h-6 text-indigo-400" />
                    </motion.div>
                    
                    <div className="text-sm font-semibold text-indigo-400 mb-2">{phase.duration}</div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-100 transition-colors">{phase.step}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">{phase.description}</p>

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

                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
                    initial={false}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Market Intelligence */}
        <section className="py-20 relative overflow-hidden">
          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-[700px] h-[700px] bg-gradient-radial from-cyan-500/15 via-cyan-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, 60, 0],
                y: [0, -30, 0],
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.35, 0.2]
              }}
              transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-100 mb-4">
                Portfolio Intelligence Suite
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Continuous value tracking, governance automation, and exit documentation across your entire portfolio
              </p>
            </motion.div>

            <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioTools.map((tool, index) => (
                <motion.div
                  key={index}
                  {...fadeInUp}
                  className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-black/80 border border-slate-700/50 hover:border-indigo-500/40 transition-all duration-300 cursor-pointer backdrop-blur-xl"
                  onClick={() => setExpandedTool(expandedTool === index ? null : index)}
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Floating particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                    {Array.from({ length: tool.particles }).map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-1 h-1 bg-${tool.color}-400/60 rounded-full`}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -25, 0],
                          x: [0, Math.random() * 15 - 7.5, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1.3, 0],
                        }}
                        transition={{
                          duration: 2.5 + Math.random() * 1.5,
                          repeat: Infinity,
                          delay: Math.random() * 2,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>

                  <motion.div 
                    className={`inline-block p-3 rounded-xl bg-${tool.color}-500/20 mb-4 group-hover:shadow-xl group-hover:shadow-${tool.color}-500/50 transition-all`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <tool.icon className={`w-6 h-6 text-${tool.color}-400`} />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-100 transition-colors">{tool.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">{tool.description}</p>

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

                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl"
                    initial={false}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    />
                  </motion.div>

                  {/* Corner accents */}
                  <div className={`absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-indigo-500/0 group-hover:border-indigo-500/60 rounded-tr-2xl transition-all duration-500`} />
                  <div className={`absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-indigo-500/0 group-hover:border-indigo-500/60 rounded-bl-2xl transition-all duration-500`} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden">
          {/* Background orbs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/2 right-1/3 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/20 via-indigo-500/5 to-transparent rounded-full blur-3xl"
              animate={{ 
                x: [0, -60, 0],
                y: [0, 40, 0],
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="max-w-4xl mx-auto px-6 text-center relative">
            <motion.div {...fadeInUp}>
              <h3 className="text-4xl md:text-5xl font-bold text-indigo-100 mb-6">
                Ready to De-Risk Your Next Deal?
              </h3>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Schedule a 48-hour diligence sprint briefing and see how evidence-backed healthcare analysis transforms deal confidence
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/request-demo">
                  <motion.button
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-lg font-semibold shadow-2xl shadow-indigo-500/40"
                    whileHover={{ scale: 1.05, boxShadow: "0 30px 60px -10px rgba(99, 102, 241, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Users className="w-5 h-5" />
                    <span>Schedule DD Briefing</span>
                  </motion.button>
                </Link>
                <Link href="/investor">
                  <motion.button
                    className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-100 text-lg font-semibold"
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.15)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText className="w-5 h-5" />
                    <span>View Investor Deck</span>
                  </motion.button>
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

function HelpCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}