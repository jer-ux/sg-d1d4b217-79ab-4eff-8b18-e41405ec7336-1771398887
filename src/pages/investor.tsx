import { Suspense } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import { SiteFooter } from "@/components/site/SiteFooter";
import Nav from "@/components/Nav";
import Hero3DInvestor from "@/components/investor/Hero3DInvestor";
import Footer from "@/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Brain,
  Shield,
  TrendingUp,
  Lock,
  CheckCircle2,
  Users,
  Globe,
  AlertTriangle,
  TrendingDown,
  Lightbulb,
  Target,
  Zap,
  Award,
  Rocket,
  Play,
  BarChart3
} from "lucide-react";

// Dynamic imports for 3D components
const MetricsCloud3D = dynamic(() => import("@/components/investor/MetricsCloud3D"), { ssr: false });
const Timeline3D = dynamic(() => import("@/components/investor/Timeline3D"), { ssr: false });
const ROIVisualization3D = dynamic(() => import("@/components/investor/ROIVisualization3D"), { ssr: false });

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
};

const slideInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

const slideInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
};

export default function InvestorPage() {
  const investmentHighlights = [
    {
      icon: Brain,
      title: "AI-Native Platform",
      description: "Built from the ground up with agentic AI at the core, not retrofitted legacy software",
      color: "from-blue-600 to-blue-500"
    },
    {
      icon: Shield,
      title: "Fiduciary-Grade Security",
      description: "SOC 2, HIPAA compliant with enterprise-grade audit trails and governance",
      color: "from-purple-600 to-purple-500"
    },
    {
      icon: TrendingUp,
      title: "Proven ROI",
      description: "Average 18% cost reduction in first year with documented savings evidence",
      color: "from-green-600 to-green-500"
    },
    {
      icon: Lock,
      title: "Data Moat",
      description: "Proprietary benchmarking database across $12B+ in benefits spend",
      color: "from-orange-600 to-orange-500"
    }
  ];

  const competitiveAdvantages = [
    {
      title: "Algorithmic Fiduciary Intelligence",
      description: "Our AI agents continuously monitor, analyze, and optimize benefits programs in real-time—going far beyond static dashboards or manual consulting.",
      icon: Brain
    },
    {
      title: "Evidence-Based Lineage",
      description: "Every recommendation includes complete audit trails linking to source documents, creating defensible fiduciary documentation.",
      icon: CheckCircle2
    },
    {
      title: "Multi-Stakeholder Platform",
      description: "Unified workspace for CFOs, HR, brokers, advisors, and TPAs—eliminating information silos and misaligned incentives.",
      icon: Users
    },
    {
      title: "Network Effects",
      description: "Each customer adds anonymized benchmarking data, making the platform exponentially more valuable for all participants.",
      icon: Globe
    }
  ];

  const useOfFunds = [];

  const milestones = [
    { quarter: "Q2 2026", title: "Series A Close", details: "Complete $10M raise, expand team to 25" },
    { quarter: "Q3 2026", title: "Product 2.0 Launch", details: "Release agentic workflow automation suite" },
    { quarter: "Q4 2026", title: "Enterprise Expansion", details: "Onboard 10 new Fortune 1000 customers" },
    { quarter: "Q1 2027", title: "Strategic Partnerships", details: "Integrate with major HRIS & benefits platforms" },
    { quarter: "Q2 2027", title: "Break Even", details: "Achieve operational profitability" },
    { quarter: "Q4 2027", title: "Series B Prep", details: "Position for $30M+ growth round" }
  ];

  const risks = [
    { risk: "Market Education", mitigation: "Early customers validate need; 24-month sales cycles already budgeted" },
    { risk: "Regulatory Changes", mitigation: "SOC 2, HIPAA certified; compliance-first architecture" },
    { risk: "Data Privacy Concerns", mitigation: "Zero raw PII stored; all data anonymized and aggregated" },
    { risk: "Competitive Entry", mitigation: "18-month technical lead; proprietary data moat; strong customer lock-in" }
  ];

  return (
    <>
      <Head>
        <title>Investor Relations - SiriusB iQ AI Data Sciences Lab</title>
        <meta name="description" content="SiriusB iQ investor presentation - Revolutionizing enterprise benefits intelligence with AI-native platform" />
      </Head>

      <Nav />

      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* 3D Hero Section */}
        <motion.div 
          className="pt-12"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <Suspense fallback={
            <div className="w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center">
              <div className="text-blue-400 text-sm sm:text-base">Loading 3D visualization...</div>
            </div>
          }>
            <Hero3DInvestor />
          </Suspense>
        </motion.div>

        {/* Executive Summary */}
        <section className="pb-6 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-6"
            >
              <h2 className="text-5xl font-bold text-blue-100 mb-4">
                Investment Thesis
              </h2>
              <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                SiriusB iQ is building the <span className="text-blue-400 font-semibold">algorithmic fiduciary intelligence platform</span> for enterprise benefits—transforming a $120B market riddled with opacity, misaligned incentives, and manual processes.
              </p>
            </motion.div>

            {/* Investment Highlights Grid */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {investmentHighlights.map((highlight, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="group relative"
                >
                  <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${highlight.color} mb-4`}>
                      <highlight.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-100 mb-3">{highlight.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Problem/Solution */}
        <section className="py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Problem */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInLeft}
              >
                <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-red-950/20 to-transparent border border-red-500/20">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-red-600 to-red-500 mb-6">
                    <AlertTriangle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-red-100 mb-6">The Problem</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <TrendingDown className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
                      <span><strong>$800B+ annually</strong> spent on U.S. employee benefits with <strong>15-25% waste</strong> due to poor oversight</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <TrendingDown className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
                      <span><strong>Misaligned incentives</strong> between brokers, TPAs, PBMs, and plan sponsors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <TrendingDown className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
                      <span><strong>Manual processes</strong> require armies of consultants for basic analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <TrendingDown className="h-6 w-6 text-red-400 mt-1 flex-shrink-0" />
                      <span><strong>No audit trail</strong> for fiduciary compliance—massive litigation risk</span>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideInRight}
              >
                <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-green-950/20 to-transparent border border-green-500/20">
                  <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-green-600 to-green-500 mb-6">
                    <Lightbulb className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-green-100 mb-6">Our Solution</h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                      <span><strong>Agentic AI platform</strong> that continuously monitors benefits programs and surfaces optimization opportunities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                      <span><strong>Evidence-based lineage</strong> for every insight—complete audit trails linking to source documents</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                      <span><strong>Multi-stakeholder collaboration</strong> workspace aligning CFO, HR, brokers, and advisors</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                      <span><strong>Proprietary benchmarking</strong> against $12B+ database of anonymized benefits data</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Competitive Advantages */}
        <section className="py-6 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-6"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-3">
                Our Competitive Moat
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Four structural advantages that compound over time
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {competitiveAdvantages.map((advantage, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500">
                      <advantage.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-100 mb-3">{advantage.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{advantage.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Market Opportunity with 3D */}
        <section className="py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-6"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-3">
                Market Opportunity
              </h2>
              <p className="text-xl text-gray-400">
                Massive, underserved market with clear path to value
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
            >
              <Suspense fallback={<div className="w-full h-[500px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
                <MetricsCloud3D />
              </Suspense>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                { icon: TrendingUp, label: "Market Growth", value: "23% CAGR", sublabel: "Benefits tech sector", color: "from-blue-600 to-blue-500" },
                { icon: Target, label: "Addressable Market", value: "$120B TAM", sublabel: "U.S. benefits consulting", color: "from-blue-500 to-blue-400" },
                { icon: Zap, label: "Time to Value", value: "< 90 Days", sublabel: "Contract to first insight", color: "from-blue-600 to-blue-500" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative group"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold text-blue-100 mb-2">{stat.value}</h3>
                    <p className="text-gray-300 font-medium mb-1">{stat.label}</p>
                    <p className="text-gray-500 text-sm">{stat.sublabel}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ROI Visualization Section */}
        <section className="py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
              className="text-center mb-6"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-3">
                Return on Investment
              </h2>
              <p className="text-xl text-gray-400">
                Exponential value creation over 5 years
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
            >
              <Suspense fallback={<div className="w-full h-[500px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
                <ROIVisualization3D />
              </Suspense>
            </motion.div>
          </div>
        </section>

        {/* Use of Funds */}
        <section className="py-6 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-6"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-3">
                Use of Funds
              </h2>
              <p className="text-xl text-gray-400">
                $10M Series A allocation for 18-month runway
              </p>
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto space-y-4"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {useOfFunds.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-blue-100">{item.category}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-blue-400">{item.amount}</span>
                      <span className="text-lg text-gray-400">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden mb-3">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <p className="text-gray-400">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              className="text-center mb-6"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-3">
                Execution Roadmap
              </h2>
              <p className="text-xl text-gray-400">
                Clear milestones to market leadership
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={scaleIn}
              className="mb-6"
            >
              <Suspense fallback={<div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
                <Timeline3D />
              </Suspense>
            </motion.div>

            {/* Milestone Cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
                >
                  <div className="inline-flex px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold mb-4">
                    {milestone.quarter}
                  </div>
                  <h3 className="text-xl font-bold text-green-100 mb-2">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.details}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Risk Factors */}
        <section className="py-6 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-6"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-3">
                Risk Factors & Mitigation
              </h2>
              <p className="text-xl text-gray-400">
                Transparent assessment of challenges and our strategies
              </p>
            </motion.div>

            <motion.div
              className="max-w-5xl mx-auto space-y-4"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {risks.map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-orange-500/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="h-5 w-5 text-orange-400" />
                        <h3 className="text-lg font-bold text-orange-100">Risk</h3>
                      </div>
                      <p className="text-gray-300">{item.risk}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Shield className="h-5 w-5 text-green-400" />
                        <h3 className="text-lg font-bold text-green-100">Mitigation</h3>
                      </div>
                      <p className="text-gray-300">{item.mitigation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Highlight */}
        <section className="py-6 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-6"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-3">
                Leadership Team
              </h2>
              <p className="text-xl text-gray-400">
                Deep domain expertise across benefits, AI, and enterprise SaaS
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20"
            >
              <div className="text-center">
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 mb-6">
                  <Award className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-blue-100 mb-4">Jeremiah Shrack, Founder & CEO</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  15+ years in benefits consulting and compliance. Previously led $500M+ benefits programs for Fortune 500 clients. Deep expertise in ERISA, fiduciary governance, and benefits optimization.
                </p>
                <Link 
                  href="/board-of-directors"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Full Board of Directors
                  <Rocket className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-6 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center"
            >
              <motion.div 
                className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-blue-950/20 to-transparent border border-blue-500/20"
                whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.4)" }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 mb-2">
                  <Rocket className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-blue-100">
                  Join Our Growth Story
                </h3>
                <p className="text-gray-300 max-w-2xl text-lg leading-relaxed">
                  We're raising a <strong className="text-blue-400">$10M Series A</strong> to accelerate product development, expand our enterprise sales team, and capture market leadership in the algorithmic fiduciary intelligence space.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Link
                    href="/request-demo"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
                  >
                    <Play className="h-6 w-6" />
                    <span>Request Investor Meeting</span>
                  </Link>
                  <Link
                    href="/platform"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-zinc-800 text-white text-lg font-semibold hover:bg-zinc-700 transition-all duration-300 border border-zinc-700"
                  >
                    <BarChart3 className="h-6 w-6" />
                    <span>Explore Platform</span>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}