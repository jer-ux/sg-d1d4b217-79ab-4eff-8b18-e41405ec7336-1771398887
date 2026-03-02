import { Suspense } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Play, TrendingUp, Target, Zap, Shield, Clock, CheckCircle2 } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic imports for 3D components
const Hero3DInvestor = dynamic(() => import("@/components/investor/Hero3DInvestor"), { ssr: false });
const MetricsCloud3D = dynamic(() => import("@/components/investor/MetricsCloud3D"), { ssr: false });
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

export default function CapitalMarketsPage() {
  return (
    <>
      <Head>
        <title>Capital Markets & Investors | SiriusB iQ</title>
        <meta name="description" content="Reduce uncertainty. Underwrite value with evidence receipts, controlled ledgers, and repeatable realization discipline." />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <Nav />

        {/* 3D Hero Section */}
        <motion.div 
          className="pt-20"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <Suspense fallback={
            <div className="w-full h-[600px] flex items-center justify-center">
              <div className="text-blue-400">Loading 3D visualization...</div>
            </div>
          }>
            <Hero3DInvestor />
          </Suspense>
        </motion.div>

        {/* Diligence Metrics Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-4">
                De-Risk Your Next Deal
              </h2>
              <p className="text-xl text-gray-400">
                Evidence-backed diligence and post-close realization tracking
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                { icon: Clock, label: "Diligence Cycle Reduction", value: "60%", color: "from-emerald-600 to-emerald-500" },
                { icon: Target, label: "Value Leakage Identified", value: "$24M avg", color: "from-rose-600 to-rose-500" },
                { icon: CheckCircle2, label: "Post-Close Realization", value: "87%", color: "from-violet-600 to-violet-500" },
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
                    <p className="text-gray-400">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Investor Benefits Section with 3D */}
        <section className="py-16 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-4">
                Why Investors Choose SiriusB iQ
              </h2>
              <p className="text-xl text-gray-400">
                Evidence receipts, controlled ledgers, and repeatable realization discipline
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

            {/* Benefits Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                {
                  icon: "⚡",
                  title: "Accelerate Diligence",
                  body: "Evidence packs reduce time-to-truth by 60%. Pre-built reconciliation artifacts, data lineage, and exception queues eliminate debate.",
                  color: "from-cyan-600 to-cyan-500"
                },
                {
                  icon: "🎯",
                  title: "Underwrite Value with Confidence",
                  body: "CFO-grade ledgers with cryptographic receipts, variance tracking, and audit trails. Know what's real before you close.",
                  color: "from-violet-600 to-violet-500"
                },
                {
                  icon: "✓",
                  title: "Ensure Post-Close Realization",
                  body: "Owner-driven workflows, approval gates, and at-risk decay logic prevent value evaporation during integration.",
                  color: "from-emerald-600 to-emerald-500"
                }
              ].map((benefit, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative group"
                >
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className={`text-xl font-semibold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent mb-3`}>
                      {benefit.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Real Scenarios Section */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInRight}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-4">
                Real Scenarios: How SiriusB iQ Protects Capital
              </h2>
              <p className="text-xl text-gray-400">
                See the difference evidence-backed diligence makes
              </p>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Without SiriusB iQ */}
              <motion.div
                variants={fadeInUp}
                className="p-8 rounded-2xl bg-gradient-to-br from-rose-950/20 to-transparent border border-rose-500/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center text-2xl">
                    ❌
                  </div>
                  <h3 className="text-2xl font-semibold text-rose-300">Without SiriusB iQ</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  PE firm acquires SaaS company with "$8M in cost synergies" promised. 18 months later, CFO can't prove any realization. 
                  Value evaporated. Exit valuation drops $40M. LP confidence shattered.
                </p>
              </motion.div>

              {/* With SiriusB iQ */}
              <motion.div
                variants={fadeInUp}
                className="p-8 rounded-2xl bg-gradient-to-br from-emerald-950/20 to-transparent border border-emerald-500/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-2xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-semibold text-emerald-300">With SiriusB iQ</h3>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  Same scenario, but SiriusB iQ Value Office deployed on Day 1. Every synergy has an owner, evidence receipt, and weekly reconciliation. 
                  $5.2M realized and proven. $1.8M at-risk flagged early with recovery plans. Exit closes at premium with buyer adopting the framework.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ROI Visualization Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-zinc-950 to-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={slideInLeft}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-blue-100 mb-4">
                Engagement Models
              </h2>
              <p className="text-xl text-gray-400">
                Flexible frameworks that scale with your portfolio
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

            {/* Engagement Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              {[
                {
                  title: "Diligence Sprint",
                  body: "2-4 week engagement to build evidence packs, validate claims, and surface leakage before you close the deal.",
                  highlight: "60% faster",
                  color: "cyan"
                },
                {
                  title: "Post-Close Value Office",
                  body: "90-180 day integration support with owner assignment, reconciliation workflows, and realization tracking.",
                  highlight: "87% realization",
                  color: "violet"
                },
                {
                  title: "Portfolio Governance",
                  body: "Ongoing controls monitoring, quarterly evidence reviews, and audit-ready reporting across multiple holdings.",
                  highlight: "Board-ready",
                  color: "emerald"
                }
              ].map((engagement, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative group"
                >
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                    <div className={`inline-block px-4 py-2 rounded-xl bg-${engagement.color}-500/20 text-${engagement.color}-400 text-sm font-semibold mb-4`}>
                      {engagement.highlight}
                    </div>
                    <h3 className="text-xl font-bold text-blue-100 mb-3">{engagement.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{engagement.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Engagement Timeline */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-blue-500/20"
            >
              <h3 className="text-xl font-semibold text-blue-100 mb-6">Typical Engagement Shapes</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { phase: "Pre-LOI", desc: "Initial signal extraction", color: "cyan" },
                  { phase: "Diligence", desc: "Evidence pack build", color: "violet" },
                  { phase: "Post-Close", desc: "Value office setup", color: "emerald" },
                  { phase: "Exit Prep", desc: "Defensible reporting", color: "amber" }
                ].map((stage, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border border-${stage.color}-500/30 bg-${stage.color}-500/5 hover:bg-${stage.color}-500/10 transition-all duration-300`}
                  >
                    <div className={`text-${stage.color}-300 font-medium mb-1`}>{stage.phase}</div>
                    <div className="text-xs text-gray-400">{stage.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-b from-black to-zinc-950">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="text-center"
            >
              <motion.div 
                className="inline-flex flex-col items-center gap-6 p-12 rounded-2xl bg-gradient-to-br from-blue-950/20 to-transparent border border-blue-500/20"
                whileHover={{ scale: 1.02, borderColor: "rgba(59, 130, 246, 0.4)" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-3xl font-bold text-blue-100">
                  Ready to De-Risk Your Next Deal?
                </h3>
                <p className="text-gray-400 max-w-2xl text-lg">
                  Get access to our investor evidence pack template, diligence playbook, and post-close value office framework.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/request-demo"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg font-semibold hover:from-blue-500 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
                  >
                    <Play className="h-6 w-6" />
                    <span>Request Investor Access</span>
                  </Link>
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-xl border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/10 text-blue-100 text-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    <Shield className="h-6 w-6" />
                    <span>View Case Studies</span>
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