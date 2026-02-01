import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";
import { TechBackdrop } from "@/components/TechBackdrop";
import { 
  DataFlowVisualization, 
  KPIDashboardPreview, 
  EvidenceReceipt3D,
  ArbitrageDetectionViz,
  NetworkGraphAnimation 
} from "@/components/platform/PremiumGraphics";
import { motion } from "framer-motion";
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Database, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Target,
  Lock
} from "lucide-react";

export default function Home() {
  return (
    <>
      <SEO 
        title="SiriusB iQ AI Data Sciences Lab - Fiduciary-Grade Transparency Engine"
        description="Evidence receipts, immutable artifacts, and executive-grade dashboards that quantify EBITDA drag and recoverable value—without hand-wavy consulting theater."
      />
      
      <main className="relative min-h-screen overflow-hidden bg-black text-white">
        {/* Animated Tech Background */}
        <TechBackdrop intensity={1.2} density={1.1} />
        
        {/* Hero Section with 3D Globe */}
        <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Content */}
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs font-medium tracking-wider text-purple-300 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                FIDUCIARY-GRADE TRANSPARENCY ENGINE
              </div>
              
              <h1 className="text-5xl font-bold leading-tight text-white lg:text-6xl">
                Kincaid IQ turns{" "}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                  plan complexity
                </span>{" "}
                into decision clarity.
              </h1>
              
              <p className="text-lg leading-relaxed text-white/70">
                Evidence receipts, immutable artifacts, and executive-grade dashboards that quantify
                EBITDA drag and recoverable value—without hand-wavy consulting theater.
              </p>

              {/* Key Features */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Shield, label: "Audit-Grade Provenance" },
                  { icon: Zap, label: "Real-Time Detection" },
                  { icon: TrendingUp, label: "Value Quantification" },
                  { icon: Lock, label: "Immutable Evidence" },
                ].map((feature, idx) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <feature.icon className="h-5 w-5 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-white/90">{feature.label}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/request-demo"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-base font-semibold text-white transition-all hover:shadow-[0_0_40px_rgba(139,92,246,0.5)]"
                >
                  <span className="relative z-10">Request Demo</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
                
                <Link
                  href="/platform"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  <span>Explore Platform</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Right: 3D Hero */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Hero3D />
            </motion.div>
          </div>
        </section>

        {/* Features Grid with Premium Graphics */}
        <section className="relative mx-auto max-w-7xl px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium tracking-wider text-emerald-300 backdrop-blur-sm">
              <Target className="h-3.5 w-3.5" />
              PLATFORM CAPABILITIES
            </div>
            <h2 className="text-4xl font-bold text-white lg:text-5xl">
              Built for{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Fiduciary Excellence
              </span>
            </h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Data Flow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">Data Pipeline Intelligence</h3>
                <p className="mt-2 text-white/60">
                  Real-time transformation tracking with cryptographic proof at every stage
                </p>
              </div>
              <DataFlowVisualization />
            </motion.div>

            {/* Evidence Receipt */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">Evidence Receipts</h3>
                <p className="mt-2 text-white/60">
                  Immutable, audit-grade artifacts with full lineage provenance
                </p>
              </div>
              <EvidenceReceipt3D />
            </motion.div>

            {/* KPI Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">Live KPI Dashboards</h3>
                <p className="mt-2 text-white/60">
                  Executive-grade visibility with verified metrics and real-time updates
                </p>
              </div>
              <KPIDashboardPreview />
            </motion.div>

            {/* Arbitrage Detection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">Arbitrage Detection</h3>
                <p className="mt-2 text-white/60">
                  Automated variance detection across filings, ledgers, and source systems
                </p>
              </div>
              <ArbitrageDetectionViz />
            </motion.div>
          </div>

          {/* Network Graph */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8"
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white">Integration Network</h3>
              <p className="mt-2 text-white/60">
                Seamless connectivity across your entire data ecosystem
              </p>
            </div>
            <NetworkGraphAnimation />
          </motion.div>
        </section>

        {/* Trust Bar */}
        <section className="relative mx-auto max-w-7xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-12 backdrop-blur-xl"
          >
            <div className="text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-xs font-medium tracking-wider text-blue-300 backdrop-blur-sm">
                <CheckCircle2 className="h-3.5 w-3.5" />
                TRUSTED BY INDUSTRY LEADERS
              </div>
              
              <h2 className="mb-6 text-3xl font-bold text-white lg:text-4xl">
                Enterprise-Grade Security & Compliance
              </h2>
              
              <p className="mx-auto max-w-3xl text-lg text-white/70">
                SOC 2 Type II certified. HIPAA compliant. Built for the most demanding fiduciary environments.
              </p>

              <div className="mt-12 grid gap-8 sm:grid-cols-3">
                {[
                  { value: "99.99%", label: "Uptime SLA" },
                  { value: "< 100ms", label: "API Latency" },
                  { value: "256-bit", label: "Encryption" },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                  >
                    <div className="text-4xl font-bold text-blue-400">{stat.value}</div>
                    <div className="mt-2 text-sm text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="relative mx-auto max-w-7xl px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-blue-950/60 via-purple-950/40 to-blue-950/60 p-16 text-center backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_70%)]" />
            
            <div className="relative z-10">
              <h2 className="mb-6 text-4xl font-bold text-white lg:text-5xl">
                Ready to Transform Your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Data Governance?
                </span>
              </h2>
              
              <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
                Join the leading organizations using Kincaid IQ to deliver fiduciary-grade transparency and quantifiable value.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/request-demo"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-5 text-lg font-semibold text-white transition-all hover:shadow-[0_0_50px_rgba(139,92,246,0.6)]"
                >
                  <span className="relative z-10">Schedule Demo</span>
                  <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
                
                <Link
                  href="/platform"
                  className="group inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-10 py-5 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15"
                >
                  <Database className="h-5 w-5" />
                  <span>View Platform</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}