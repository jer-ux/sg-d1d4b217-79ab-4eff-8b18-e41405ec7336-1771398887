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
import { ParticleField3D } from "@/components/premium/ParticleField3D";

export default function InvestorPage() {
  const investmentHighlights = [
    {
      icon: Brain,
      title: "AI-Native Platform",
      description: "Built from the ground up with agentic AI at the core, not retrofitted legacy software",
      color: "blue",
      particles: 12
    },
    {
      icon: Shield,
      title: "Fiduciary-Grade Security",
      description: "SOC 2, HIPAA compliant with enterprise-grade audit trails and governance",
      color: "purple",
      particles: 10
    },
    {
      icon: TrendingUp,
      title: "Proven ROI",
      description: "Average 18% cost reduction in first year with documented savings evidence",
      color: "emerald",
      particles: 14
    },
    {
      icon: Lock,
      title: "Data Moat",
      description: "Proprietary benchmarking database across $12B+ in benefits spend",
      color: "amber",
      particles: 11
    }
  ];

  const competitiveAdvantages = [
    {
      title: "Algorithmic Fiduciary Intelligence",
      description: "Our AI agents continuously monitor, analyze, and optimize benefits programs in real-time—going far beyond static dashboards or manual consulting.",
      icon: Brain,
      color: "blue",
      particles: 15
    },
    {
      title: "Evidence-Based Lineage",
      description: "Every recommendation includes complete audit trails linking to source documents, creating defensible fiduciary documentation.",
      icon: CheckCircle2,
      color: "emerald",
      particles: 12
    },
    {
      title: "Multi-Stakeholder Platform",
      description: "Unified workspace for CFOs, HR, brokers, advisors, and TPAs—eliminating information silos and misaligned incentives.",
      icon: Users,
      color: "violet",
      particles: 10
    },
    {
      title: "Network Effects",
      description: "Each customer adds anonymized benchmarking data, making the platform exponentially more valuable for all participants.",
      icon: Globe,
      color: "cyan",
      particles: 13
    }
  ];

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

      <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-black">
        <ParticleField3D />

        <main className="relative">
          {/* Hero Section with 3D Background */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden border-b border-white/5">
            {/* Animated background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/4 left-1/3 w-[900px] h-[900px] bg-gradient-radial from-blue-500/20 via-blue-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, -60, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/3 w-[800px] h-[800px] bg-gradient-radial from-cyan-500/15 via-cyan-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, -80, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              />
              <motion.div
                className="absolute top-1/2 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-indigo-500/10 via-indigo-500/3 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 60, 0],
                  y: [0, -40, 0],
                  scale: [1, 1.1, 1],
                  opacity: [0.25, 0.45, 0.25]
                }}
                transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 6 }}
              />
            </div>
            
            <Hero3DInvestor />
          </section>

          {/* Executive Summary */}
          <section className="relative pb-20 px-6 bg-gradient-to-b from-black to-zinc-950 overflow-hidden">
            {/* Animated background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-blue-500/20 via-blue-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 80, 0],
                  y: [0, -40, 0],
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-purple-500/15 via-purple-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, -60, 0],
                  y: [0, 50, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
              />
            </div>

            <div className="relative max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-5xl font-bold text-blue-100 mb-4">
                  Investment Thesis
                </h2>
                <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  SiriusB iQ is building the <span className="text-blue-400 font-semibold">algorithmic fiduciary intelligence platform</span> for enterprise benefits—transforming a $120B market riddled with opacity, misaligned incentives, and manual processes.
                </p>
              </motion.div>

              {/* Investment Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {investmentHighlights.map((highlight, index) => {
                  const Icon = highlight.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
                      className="group relative"
                    >
                      {/* Floating particles */}
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: highlight.particles }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-${highlight.color}-400/60 rounded-full`}
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                              y: [0, -30, 0],
                              x: [0, Math.random() * 20 - 10, 0],
                              opacity: [0, 1, 0],
                              scale: [0, 1.5, 0],
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              delay: Math.random() * 2,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>

                      <motion.div
                        className="h-full p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-black/80 border border-blue-500/20 backdrop-blur-xl overflow-hidden"
                        whileHover={{ 
                          scale: 1.05,
                          rotateY: 5,
                          rotateX: -5,
                          borderColor: "rgba(59, 130, 246, 0.6)",
                          boxShadow: "0 30px 60px -15px rgba(59, 130, 246, 0.4)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Gradient glow on hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                          style={{
                            background: `radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15), transparent 70%)`
                          }}
                        />

                        {/* Animated icon */}
                        <motion.div
                          className="relative mb-4"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-${highlight.color}-600 to-${highlight.color}-500 group-hover:shadow-xl group-hover:shadow-${highlight.color}-500/50 transition-all duration-500`}>
                            <Icon className="h-7 w-7 text-white" />
                          </div>
                          
                          {/* Pulsing ring */}
                          <motion.div
                            className={`absolute inset-0 rounded-xl border-2 border-${highlight.color}-400/40`}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                          />
                        </motion.div>

                        <h3 className="text-xl font-bold text-blue-100 mb-3 group-hover:text-blue-50 transition-colors">{highlight.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{highlight.description}</p>

                        {/* Shimmer effect on hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                          initial={false}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                          />
                        </motion.div>

                        {/* Corner accents */}
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-blue-500/0 group-hover:border-blue-500/60 rounded-tr-2xl transition-all duration-500" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-blue-500/0 group-hover:border-blue-500/60 rounded-bl-2xl transition-all duration-500" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Problem/Solution */}
          <section className="relative py-20 px-6 overflow-hidden">
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
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-1/3 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-green-500/15 via-green-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 60, 0],
                  y: [0, -30, 0],
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.35, 0.2]
                }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </div>

            <div className="relative max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Problem */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="group"
                >
                  <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-red-950/20 to-transparent border border-red-500/20 backdrop-blur-xl group-hover:border-red-500/40 transition-all duration-500">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-red-600 to-red-500 mb-6 group-hover:shadow-xl group-hover:shadow-red-500/50 transition-all">
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
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="group"
                >
                  <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-green-950/20 to-transparent border border-green-500/20 backdrop-blur-xl group-hover:border-green-500/40 transition-all duration-500">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-green-600 to-green-500 mb-6 group-hover:shadow-xl group-hover:shadow-green-500/50 transition-all">
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
          <section className="relative py-20 px-6 bg-gradient-to-b from-zinc-950 to-black overflow-hidden">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/15 via-blue-500/5 to-transparent rounded-full blur-3xl"
                animate={{ 
                  x: [0, 90, 0],
                  y: [0, -50, 0],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-blue-100 mb-3">
                  Our Competitive Moat
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Four structural advantages that compound over time
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competitiveAdvantages.map((advantage, index) => {
                  const Icon = advantage.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.15, type: "spring" }}
                      className="group relative"
                    >
                      {/* Floating particles */}
                      <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: advantage.particles }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-1 h-1 bg-${advantage.color}-400/60 rounded-full`}
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
                        className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black/80 border border-blue-500/20 backdrop-blur-xl overflow-hidden"
                        whileHover={{ 
                          scale: 1.03,
                          borderColor: "rgba(59, 130, 246, 0.6)",
                          boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.4)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <div className="flex items-start gap-4">
                          <motion.div 
                            className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-blue-100 mb-3 group-hover:text-blue-50 transition-colors">{advantage.title}</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{advantage.description}</p>
                          </div>
                        </div>

                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                          initial={false}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            animate={{ x: ["-100%", "200%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Market Opportunity with 3D */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-blue-100 mb-3">
                  Market Opportunity
                </h2>
                <p className="text-xl text-gray-400">
                  Massive, underserved market with clear path to value
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Suspense fallback={<div className="w-full h-[500px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
                  <MetricsCloud3D />
                </Suspense>
              </motion.div>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {[
                  { label: "Market Size", value: "$4.5T", subtext: "U.S. Healthcare Economy", color: "blue", particles: 14 },
                  { label: "Waste Identified", value: "$1.2T", subtext: "Annual Addressable", color: "cyan", particles: 12 },
                  { label: "Recovery Rate", value: "62-85%", subtext: "With Evidence", color: "indigo", particles: 13 },
                  { label: "Time to Value", value: "8-18mo", subtext: "Recovery Cycle", color: "violet", particles: 11 }
                ].map((metric, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="group relative"
                  >
                    {/* Floating particles */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                      {Array.from({ length: metric.particles }).map((_, i) => (
                        <motion.div
                          key={i}
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

                    <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-xl group-hover:border-cyan-500/40 transition-all">
                      <div className="text-sm text-slate-400 mb-2">{metric.label}</div>
                      <div className={`text-3xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                      <div className="text-xs text-slate-500">{metric.subtext}</div>

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
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ROI Visualization Section */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-blue-100 mb-3">
                  Return on Investment
                </h2>
                <p className="text-xl text-gray-400">
                  Exponential value creation over 5 years
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <Suspense fallback={<div className="w-full h-[500px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
                  <ROIVisualization3D />
                </Suspense>
              </motion.div>
            </div>
          </section>

          {/* Timeline Section */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-blue-100 mb-3">
                  Execution Roadmap
                </h2>
                <p className="text-xl text-gray-400">
                  Clear milestones to market leadership
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mb-16"
              >
                <Suspense fallback={<div className="w-full h-[400px] bg-zinc-900/50 rounded-2xl animate-pulse" />}>
                  <Timeline3D />
                </Suspense>
              </motion.div>

              {/* Milestone Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
                    className="group"
                  >
                    <motion.div
                      className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black/80 border border-green-500/20 backdrop-blur-xl"
                      whileHover={{ 
                        scale: 1.05,
                        borderColor: "rgba(34, 197, 94, 0.4)",
                        boxShadow: "0 25px 50px -12px rgba(34, 197, 94, 0.4)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="inline-flex px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold mb-4 group-hover:bg-green-500/30 transition-colors">
                        {milestone.quarter}
                      </div>
                      <h3 className="text-xl font-bold text-green-100 mb-2 group-hover:text-green-50 transition-colors">{milestone.title}</h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{milestone.details}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Risk Factors */}
          <section className="py-20 px-6 bg-gradient-to-b from-black to-zinc-950">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-blue-100 mb-3">
                  Risk Factors & Mitigation
                </h2>
                <p className="text-xl text-gray-400">
                  Transparent assessment of challenges and our strategies
                </p>
              </motion.div>

              <div className="max-w-5xl mx-auto space-y-6">
                {risks.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1, type: "spring" }}
                    className="group"
                  >
                    <motion.div
                      className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black/80 border border-orange-500/20 backdrop-blur-xl"
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: "rgba(249, 115, 22, 0.4)"
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
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
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Team Highlight */}
          <section className="py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold text-blue-100 mb-3">
                  Leadership Team
                </h2>
                <p className="text-xl text-gray-400">
                  Deep domain expertise across benefits, AI, and enterprise SaaS
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto group"
              >
                <motion.div
                  className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900/80 to-black/80 border border-blue-500/20 backdrop-blur-xl"
                  whileHover={{ 
                    scale: 1.02,
                    borderColor: "rgba(59, 130, 246, 0.4)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-center">
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 mb-6 group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all">
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
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-6 bg-gradient-to-b from-zinc-950 to-black">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div 
                  className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-gradient-to-br from-blue-950/20 to-transparent border border-blue-500/20 backdrop-blur-xl"
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
                    <Link href="/request-demo">
                      <motion.button
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold shadow-lg shadow-blue-500/20"
                        whileHover={{ scale: 1.05, boxShadow: "0 30px 60px -15px rgba(59, 130, 246, 0.5)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="h-6 w-6" />
                        <span>Request Investor Meeting</span>
                      </motion.button>
                    </Link>
                    <Link href="/platform">
                      <motion.button
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-zinc-800 text-white text-lg font-semibold border border-zinc-700"
                        whileHover={{ scale: 1.05, backgroundColor: "rgb(63, 63, 70)" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <BarChart3 className="h-6 w-6" />
                        <span>Explore Platform</span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}