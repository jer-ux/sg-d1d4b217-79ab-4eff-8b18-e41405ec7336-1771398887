import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Shield, Zap, Users, TrendingUp, Award, CheckCircle, Sparkles, Database, Lock, Cpu, FileCheck, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Hero3D } from "@/components/Hero3D";
import { Hero3DDataNexus, Hero3DNeuralNetwork, Hero3DCubeMatrix, Hero3DParticleStorm, Hero3DHolographicRing } from "@/components/Hero3DOptions";
import { WarRoomPreview } from "@/components/kincaid-iq/WarRoomPreview";
import { useState } from "react";

const THEME = {
  blue: {
    bar: "bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-500",
    g1: "rgba(59,130,246,0.50)",
    g2: "rgba(14,165,233,0.40)",
    g3: "rgba(99,102,241,0.35)",
    title: "text-sky-200",
    subtitle: "text-sky-100/70",
    iconBg: "bg-sky-500/15",
    iconRing: "ring-sky-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_0_24px_rgba(59,130,246,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_48px_rgba(99,102,241,0.18)]",
  },
  emerald: {
    bar: "bg-gradient-to-b from-emerald-300 via-emerald-500 to-teal-500",
    g1: "rgba(16,185,129,0.55)",
    g2: "rgba(20,184,166,0.40)",
    g3: "rgba(34,197,94,0.30)",
    title: "text-emerald-200",
    subtitle: "text-emerald-100/70",
    iconBg: "bg-emerald-500/15",
    iconRing: "ring-emerald-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(52,211,153,0.25),0_0_24px_rgba(16,185,129,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(52,211,153,0.35),0_0_48px_rgba(20,184,166,0.18)]",
  },
  violet: {
    bar: "bg-gradient-to-b from-violet-400 via-purple-500 to-fuchsia-500",
    g1: "rgba(139,92,246,0.55)",
    g2: "rgba(168,85,247,0.45)",
    g3: "rgba(217,70,239,0.30)",
    title: "text-violet-200",
    subtitle: "text-violet-100/70",
    iconBg: "bg-violet-500/15",
    iconRing: "ring-violet-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(167,139,250,0.25),0_0_24px_rgba(168,85,247,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_0_48px_rgba(217,70,239,0.18)]",
  },
  cyan: {
    bar: "bg-gradient-to-b from-cyan-300 via-cyan-500 to-blue-500",
    g1: "rgba(6,182,212,0.55)",
    g2: "rgba(34,211,238,0.40)",
    g3: "rgba(59,130,246,0.30)",
    title: "text-cyan-200",
    subtitle: "text-cyan-100/70",
    iconBg: "bg-cyan-500/15",
    iconRing: "ring-cyan-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_0_24px_rgba(6,182,212,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_48px_rgba(59,130,246,0.16)]",
  },
};

type ThemeKey = keyof typeof THEME;

function AnimatedGradientOverlay({ theme }: { theme: typeof THEME[ThemeKey] }) {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-0 opacity-25 transition-opacity duration-300 group-hover:opacity-50"
      style={{
        backgroundImage: `linear-gradient(135deg, ${theme.g1}, ${theme.g2}, ${theme.g3})`,
        backgroundSize: "200% 200%",
      }}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

type FeatureCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  themeKey: ThemeKey;
  delay?: number;
};

function FeatureCard({ icon: Icon, title, description, href, themeKey, delay = 0 }: FeatureCardProps) {
  const t = THEME[themeKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <Link href={href}>
        <div
          className={[
            "group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-6",
            "backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer",
            t.hoverRing,
          ].join(" ")}
        >
          {/* Left accent bar */}
          <div className={`absolute left-0 top-0 h-full w-2 ${t.bar}`} />

          {/* Animated gradient overlay */}
          <AnimatedGradientOverlay theme={t} />

          {/* Subtle inner vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_15%,rgba(255,255,255,0.10),transparent_60%)] opacity-60" />

          <div className="relative">
            <div
              className={[
                "grid h-12 w-12 place-items-center rounded-2xl ring-1 mb-4",
                t.iconBg,
                t.iconRing,
                t.iconGlow,
              ].join(" ")}
            >
              <Icon className={`h-6 w-6 ${t.title}`} />
            </div>

            <h3 className={`text-xl font-semibold mb-2 ${t.title}`}>{title}</h3>
            <p className="text-sm text-white/75 leading-relaxed">{description}</p>
          </div>

          {/* Hover sheen */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="absolute -inset-24 bg-[conic-gradient(from_180deg,rgba(255,255,255,0.0),rgba(255,255,255,0.14),rgba(255,255,255,0.0))] blur-2xl" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function StatCard({ value, label, delay = 0 }: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-6 text-center"
    >
      <AnimatedGradientOverlay theme={THEME.violet} />
      <div className="relative">
        <div className="text-4xl font-bold text-white mb-1">{value}</div>
        <div className="text-sm text-white/70">{label}</div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [selectedPreviewMetric, setSelectedPreviewMetric] = useState<string | null>(null);
  const [heroVariant, setHeroVariant] = useState<"original" | "nexus" | "neural" | "cube" | "particle" | "holographic">("original");

  const heroOptions = [
    { id: "original" as const, label: "Original", component: Hero3D },
    { id: "nexus" as const, label: "Data Nexus", component: Hero3DDataNexus },
    { id: "neural" as const, label: "Neural Net", component: Hero3DNeuralNetwork },
    { id: "cube" as const, label: "Cube Matrix", component: Hero3DCubeMatrix },
    { id: "particle" as const, label: "Particle Storm", component: Hero3DParticleStorm },
    { id: "holographic" as const, label: "Holographic", component: Hero3DHolographicRing },
  ];

  const CurrentHero = heroOptions.find(opt => opt.id === heroVariant)?.component || Hero3D;

  return (
    <>
      <SEO
        title="Kincaid IQ AI - Fiduciary Grade Transparency Engine"
        description="Enterprise AI platform that shows EBITDA drag with receipts. Real-time incident management, verified cost optimization, and cryptographic evidence trails."
      />
      
      <Nav />

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />
          
          <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 backdrop-blur-xl"
            >
              <Receipt className="h-4 w-4 text-violet-300" />
              <span className="text-sm text-violet-200">Fiduciary Grade Transparency Engine</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            >
              Kincaid IQ AI
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
            >
              Shows EBITDA Drag With Receipts
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base md:text-lg text-white/60 max-w-3xl mx-auto"
            >
              Enterprise AI platform for autonomous operations, governance, and cryptographically verified cost optimization
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center pt-4"
            >
              <Link href="/war-room">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 shadow-[0_0_24px_rgba(99,102,241,0.35)] hover:shadow-[0_0_32px_rgba(139,92,246,0.45)]">
                  Launch War Room <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/request-demo">
                <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                  Request Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 3D Hero Showcase */}
        <section className="px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Variant Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="text-xs text-white/50 uppercase tracking-wider">Select 3D Hero Style</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {heroOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setHeroVariant(option.id)}
                      className={[
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                        "border backdrop-blur-xl",
                        heroVariant === option.id
                          ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 border-violet-400/50 text-white shadow-[0_0_24px_rgba(139,92,246,0.4)]"
                          : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white"
                      ].join(" ")}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Animated Hero Component */}
            <div className="max-w-2xl mx-auto scale-[0.36]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroVariant}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <CurrentHero />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Fiduciary Grade Intelligence</h2>
              <p className="text-lg text-white/70 max-w-3xl mx-auto">
                Every metric backed by cryptographic evidence trails. No black boxes, no trust-me numbers.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={Receipt}
                title="Evidence Receipts"
                description="Every cost optimization claim backed by cryptographically signed proof and immutable audit trails"
                href="/evidence-receipts"
                themeKey="violet"
                delay={0}
              />
              <FeatureCard
                icon={TrendingUp}
                title="EBITDA Impact"
                description="Real-time visibility into financial leakage, cost drag, and verified savings with defensible attribution"
                href="/verified-savings-ledger"
                themeKey="emerald"
                delay={0.1}
              />
              <FeatureCard
                icon={FileCheck}
                title="Fiduciary Grade"
                description="Audit-ready documentation, regulatory compliance, and board-level reporting with traceable inputs"
                href="/security-governance"
                themeKey="cyan"
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* See It In Action */}
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <div className="flex items-end justify-between gap-6">
                <div>
                  <div className="text-xs text-white/60 mb-3">Live Platform</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">See It In Action</h2>
                  <p className="text-white/70 max-w-3xl">
                    Real-time KPIs that expose financial leakage, incentive misalignment, and structural blind spots.
                    Every metric traceable to underlying evidence—claims, contracts, and verifiable inputs.
                  </p>
                </div>

                <div className="hidden md:block">
                  <Link href="/war-room">
                    <Button className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                      Launch Full War Room <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => setSelectedPreviewMetric("interactive")}
              className="cursor-pointer"
            >
              <WarRoomPreview />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm text-white/60"
            >
              Click any metric to explore drill-downs, evidence trails, and exportable proof packs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-6 md:hidden"
            >
              <Link href="/war-room">
                <Button className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600">
                  Launch Full War Room <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-16 px-4 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Platform Capabilities</h2>
              <p className="text-lg text-white/70">Enterprise-grade intelligence infrastructure</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={Shield}
                title="War Room"
                description="Real-time incident management with AI-powered event ranking and governance automation"
                href="/war-room"
                themeKey="blue"
                delay={0}
              />
              <FeatureCard
                icon={TrendingUp}
                title="Verified Savings Ledger"
                description="Blockchain-backed cost optimization tracking with immutable audit trails and EBITDA attribution"
                href="/verified-savings-ledger"
                themeKey="emerald"
                delay={0.1}
              />
              <FeatureCard
                icon={Database}
                title="Evidence Receipts"
                description="Cryptographically signed proof of business outcomes with defensible methodologies"
                href="/evidence-receipts"
                themeKey="violet"
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 px-4 bg-slate-950/40">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Kincaid IQ</h2>
              <p className="text-lg text-white/70">Transparency engine built for fiduciary accountability</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <FeatureCard
                icon={Award}
                title="Verifiable Evidence"
                description="Blockchain-backed proof with cryptographic signatures. Every claim traceable to source data, contracts, and defined methodologies."
                href="/evidence-receipts"
                themeKey="cyan"
                delay={0}
              />
              <FeatureCard
                icon={Zap}
                title="Real-time Intelligence"
                description="Live event streaming, AI-powered ranking, and instant governance automation with sub-100ms latency"
                href="/war-room"
                themeKey="violet"
                delay={0.1}
              />
              <FeatureCard
                icon={Lock}
                title="Fiduciary Security"
                description="SOC 2 Type II compliant with end-to-end encryption, audit trails, and role-based access control"
                href="/security-governance"
                themeKey="blue"
                delay={0.2}
              />
              <FeatureCard
                icon={Cpu}
                title="Enterprise Integration"
                description="Native connectors for Snowflake, Databricks, ServiceNow with pre-built adapters for major platforms"
                href="/marketplace"
                themeKey="emerald"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard value="99.9%" label="Uptime SLA" delay={0} />
              <StatCard value="<100ms" label="Event Latency" delay={0.1} />
              <StatCard value="10M+" label="Events/Day" delay={0.2} />
              <StatCard value="100%" label="Traceable Metrics" delay={0.3} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-12 text-center"
            >
              <AnimatedGradientOverlay theme={THEME.violet} />
              
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Show EBITDA Impact With Receipts?
                </h2>
                <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
                  Join enterprises using Kincaid IQ for fiduciary-grade transparency and verified outcomes
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/request-demo">
                    <Button size="lg" className="group bg-white text-black hover:bg-white/90">
                      Schedule Demo
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/platform">
                    <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
                      Explore Platform
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}