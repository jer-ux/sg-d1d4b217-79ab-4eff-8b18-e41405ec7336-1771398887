import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SEO } from "@/components/SEO";
import { FileText, Shield, TrendingUp, CheckCircle2, Sparkles, Zap, Crown, Star } from "lucide-react";
import { ExecutiveWarRoom } from "@/components/warroom/ExecutiveWarRoom";

// Vegas-style floating particles
const VegasParticles = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particles = Array.from({ length: 30 }, (_, i) => {
      const particle = document.createElement("div");
      particle.className = "absolute rounded-full opacity-0 animate-float-particle";
      particle.style.cssText = `
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        background: ${i % 3 === 0 ? "#fbbf24" : i % 3 === 1 ? "#3b82f6" : "#a855f7"};
        box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
        animation-delay: ${Math.random() * 5}s;
        animation-duration: ${Math.random() * 10 + 15}s;
      `;
      return particle;
    });

    particles.forEach((p) => container.appendChild(p));
    return () => particles.forEach((p) => p.remove());
  }, []);

  return <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0" />;
};

const Badge = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) => (
  <motion.span
    className="inline-flex items-center rounded-full border border-amber-500/30 bg-gradient-to-r from-amber-950/80 to-amber-900/60 px-3 py-1 text-xs text-amber-200 shadow-lg shadow-amber-500/20 backdrop-blur-sm"
    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {Icon ? <Icon className="mr-1.5 h-3 w-3 text-amber-400" /> : <Sparkles className="mr-1.5 h-3 w-3 text-amber-400" />}
    {children}
  </motion.span>
);

const Card3D = ({
  title,
  subtitle,
  children,
  icon: Icon,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  delay?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-2xl border border-amber-500/20 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-6 shadow-2xl backdrop-blur-sm"
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, z: 50 }}
    >
      {/* Luxe glow effect */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-amber-600/0 via-amber-500/30 to-purple-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-blue-500/10 via-transparent to-amber-500/10 opacity-50" />
      
      <div className="relative" style={{ transform: "translateZ(50px)" }}>
        {Icon && (
          <motion.div
            className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 text-amber-400 shadow-lg shadow-amber-500/30"
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
        )}
        <div className="mb-3">
          <div className="text-lg font-semibold bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
            {title}
          </div>
          {subtitle && <div className="mt-1 text-sm text-amber-300/70">{subtitle}</div>}
        </div>
        <div className="text-sm leading-relaxed text-zinc-300">{children}</div>
      </div>
    </motion.div>
  );
};

const Pill = ({ k, v }: { k: string; v: string }) => (
  <motion.div
    className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-black/80 via-amber-950/30 to-black/80 px-4 py-3 backdrop-blur-sm shadow-lg shadow-amber-500/10"
    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 25px rgba(251, 191, 36, 0.3)" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="text-xs text-amber-400/80 font-medium">{k}</div>
    <div className="mt-1 text-sm font-semibold bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">{v}</div>
  </motion.div>
);

const ReceiptCard = ({
  title,
  status,
  statusColor,
  details,
  delay = 0,
}: {
  title: string;
  status: string;
  statusColor: string;
  details: string;
  delay?: number;
}) => (
  <motion.div
    className="group relative rounded-2xl border border-amber-500/20 bg-gradient-to-br from-black/80 via-amber-950/20 to-zinc-950/60 p-4 backdrop-blur-sm shadow-xl"
    initial={{ opacity: 0, y: 20, rotateX: -10 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ delay, duration: 0.6, type: "spring" }}
    whileHover={{ y: -6, scale: 1.02, rotateX: 2 }}
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Vegas-style shimmer */}
    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-600/0 via-emerald-500/40 to-emerald-600/0 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/5 to-purple-500/5 opacity-60" />
    
    <div className="relative" style={{ transform: "translateZ(30px)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <FileText className="h-4 w-4 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          {title}
        </div>
        <span className={`text-xs font-semibold ${statusColor} drop-shadow-[0_0_6px_currentColor]`}>{status}</span>
      </div>
      <div className="mt-2 text-xs text-zinc-400">{details}</div>
    </div>
  </motion.div>
);

const AnimatedBackground = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    {/* Premium gradient mesh */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
    
    {/* Vegas-style animated orbs with metallic tones */}
    <motion.div
      className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-amber-500/15 via-amber-600/10 to-transparent blur-3xl"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.4, 0.6, 0.4],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-purple-500/15 via-blue-600/10 to-transparent blur-3xl"
      animate={{
        scale: [1.3, 1, 1.3],
        opacity: [0.4, 0.6, 0.4],
        rotate: [0, -90, 0],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-amber-500/10 blur-3xl"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    
    {/* Luxury grid pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#fbbf2412_1px,transparent_1px),linear-gradient(to_bottom,#fbbf2412_1px,transparent_1px)] bg-[size:64px_64px]" />
    
    {/* Radial gradient overlay for depth */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
  </div>
);

export default function HomePage() {
  return (
    <>
      <SEO
        title="Kincaid IQ - Receipts-first benefits governance"
        description="Stop debating opinions. Run benefits like an EBITDA system. Every claim backed by evidence: vendor invoices, plan docs, contracts—linked, versioned, and provable."
        image="/og-image.png"
      />
      
      <main className="relative min-h-screen bg-black text-zinc-100 overflow-hidden">
        <AnimatedBackground />
        <VegasParticles />
        
        {/* Hero with premium 3D */}
        <section className="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-24">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            >
              <div className="mb-6 flex flex-wrap gap-2">
                <Badge icon={Star}>Receipts as the product</Badge>
                <Badge icon={TrendingUp}>EBITDA governance</Badge>
                <Badge icon={Shield}>Verification</Badge>
                <Badge icon={Crown}>Enterprise trust</Badge>
              </div>

              <motion.h1
                className="bg-gradient-to-br from-white via-amber-100 to-zinc-300 bg-clip-text text-5xl font-bold tracking-tight text-transparent drop-shadow-[0_0_30px_rgba(251,191,36,0.2)] md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Stop debating opinions.
                <br />
                <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-purple-300 bg-clip-text text-transparent">
                  Run benefits like an EBITDA system.
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 text-base leading-relaxed text-zinc-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Kincaid IQ turns every claim into evidence: vendor invoices, plan docs, contracts,
                5500s, fees, rebates, utilization rules—linked, versioned, and provable.
                You don't "believe" the numbers. You can defend them.
              </motion.p>

              {/* Premium CTA buttons */}
              <motion.div
                className="mt-8 flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/evidence-receipts"
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-2xl shadow-amber-500/40 transition-all hover:shadow-amber-500/60"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 via-white to-amber-400 opacity-0 group-hover:opacity-30"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <Zap className="h-4 w-4" />
                    <span className="relative">Upload receipts →</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="#ebitda"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/50 bg-zinc-950/80 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-amber-400/70 hover:bg-amber-950/30 hover:shadow-lg hover:shadow-amber-500/20"
                  >
                    <TrendingUp className="h-4 w-4 text-amber-400" />
                    See EBITDA governance
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-5 flex items-center gap-2 text-xs text-amber-400/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Sparkles className="h-3 w-3" />
                <span>Upload → Verify → Govern → Reduce leakage → Prove outcomes.</span>
              </motion.div>
            </motion.div>

            {/* Right side: 3D receipts ledger with Vegas feel */}
            <motion.div
              className="relative rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, x: 30, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
              whileHover={{ scale: 1.03, rotateY: 2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Multi-layer glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-600/20 via-amber-500/30 to-purple-600/20 opacity-60 blur-2xl" />
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-amber-500/20 via-purple-500/10 to-blue-500/20 opacity-80" />
              
              <div className="relative" style={{ transform: "translateZ(40px)" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-base font-bold bg-gradient-to-r from-amber-300 to-white bg-clip-text text-transparent">
                    Receipts Ledger
                  </div>
                  <Badge icon={Crown}>Immutable-ish</Badge>
                </div>

                <div className="grid gap-4">
                  <ReceiptCard
                    title="Carrier Invoice — Jan 2026"
                    status="VERIFIED"
                    statusColor="text-emerald-400"
                    details="Hash: 9f3c…a21b · Source: Secure Upload · Linked: Plan 2026 / Vendor A"
                    delay={0.6}
                  />

                  <ReceiptCard
                    title="PBM Contract — Amendment #2"
                    status="NEEDS REVIEW"
                    statusColor="text-amber-400"
                    details="Versioned · Redline detected · Missing signature page"
                    delay={0.8}
                  />

                  <ReceiptCard
                    title="Form 5500 — Plan Year 2025"
                    status="VERIFIED"
                    statusColor="text-emerald-400"
                    details="Extracted: participants, plan year, funding, schedules · Diff vs 2024 computed"
                    delay={1}
                  />
                </div>

                <motion.div
                  className="mt-6 grid grid-cols-2 gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <Pill k="Receipts linked" v="Plan → Vendor → KPI" />
                  <Pill k="Proof mode" v="Hash + lineage + diffs" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Proof: Verification + Auditability with 3D cards */}
        <section id="proof" className="relative mx-auto w-full max-w-6xl px-6 py-16">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-base font-bold bg-gradient-to-r from-amber-300 to-white bg-clip-text text-transparent">
              <Shield className="h-5 w-5 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
              Verification is the moat
            </div>
            <div className="mt-2 text-zinc-400">
              Every metric must cite a receipt. Every receipt must be traceable.
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card3D
              title="Lineage-backed KPIs"
              subtitle="No black boxes. Show the inputs."
              icon={TrendingUp}
              delay={0.1}
            >
              KPIs carry citations to the underlying documents and extraction steps. If a CFO asks "why
              do we believe this?", you click once and show the evidence trail.
            </Card3D>

            <Card3D
              title="Deterministic diffs"
              subtitle="What changed, when, and who approved it"
              icon={FileText}
              delay={0.2}
            >
              Contract versions, invoices, eligibility, and plan changes are diffed over time.
              You get a change-log that procurement, legal, and finance can actually use.
            </Card3D>

            <Card3D
              title="Audit-ready exports"
              subtitle="Board packet, renewal packet, and legal packet"
              icon={CheckCircle2}
              delay={0.3}
            >
              Export evidence bundles: hashed files, extraction outputs, approvals, and notes.
              Your story survives scrutiny because it's not a story—it's a ledger.
            </Card3D>
          </div>
        </section>

        {/* EBITDA governance with premium styling */}
        <section id="ebitda" className="relative mx-auto w-full max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-base font-bold bg-gradient-to-r from-amber-300 to-white bg-clip-text text-transparent">
                <TrendingUp className="h-5 w-5 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
                EBITDA governance language
              </div>
              <h2 className="mt-4 bg-gradient-to-br from-white via-amber-100 to-zinc-300 bg-clip-text text-4xl font-bold text-transparent">
                Benefits leakage is EBITDA leakage.
              </h2>
              <p className="mt-4 text-zinc-300 leading-relaxed">
                We frame everything as financial control: unit economics (PEPM), variance drivers,
                vendor take-rate, avoidable spend, and enforcement. This is governance, not vibes.
              </p>

              <motion.div
                className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Pill k="Control objective" v="Reduce spend variance" />
                <Pill k="Evidence" v="Invoices + contracts + 5500s" />
                <Pill k="Mechanism" v="Verification + approvals" />
                <Pill k="Outcome" v="Defensible EBITDA improvement" />
              </motion.div>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, x: 30, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.02, rotateY: -2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-600/20 via-purple-600/20 to-blue-600/20 opacity-60 blur-xl" />
              
              <div className="relative" style={{ transform: "translateZ(30px)" }}>
                <div className="text-base font-bold bg-gradient-to-r from-amber-300 to-white bg-clip-text text-transparent mb-6">
                  Governance loop
                </div>
                <div className="grid gap-4">
                  {[
                    ["1) Ingest receipts", "Upload PDFs, invoices, contracts, 5500s, reports"],
                    ["2) Verify", "Hash + parse + cross-check + flag inconsistencies"],
                    ["3) Approve", "Human-in-the-loop decisions with notes and provenance"],
                    ["4) Monitor", "KPIs, drift, and exceptions with evidence links"],
                    ["5) Report", "Board/audit packets generated from the ledger"],
                  ].map(([t, d], i) => (
                    <motion.div
                      key={t}
                      className="group relative rounded-xl border border-amber-500/20 bg-gradient-to-br from-black/80 via-amber-950/10 to-black/80 p-4 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02, borderColor: "rgba(251, 191, 36, 0.4)" }}
                    >
                      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-amber-600/0 via-amber-500/30 to-amber-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur" />
                      <div className="relative">
                        <div className="text-sm font-semibold text-white">{t}</div>
                        <div className="mt-1 text-xs text-zinc-400">{d}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Executive War Room - Live CFO Dashboard */}
        <section id="dashboard" className="relative mx-auto w-full max-w-7xl px-6 py-16">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
              </div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-br from-white via-amber-100 to-zinc-300 bg-clip-text text-transparent">
                  Live CFO Dashboard
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Real-time metrics, evidence-backed KPIs, and executive insights
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ExecutiveWarRoom />
          </motion.div>
        </section>

        {/* Enterprise Trust with Vegas luxury */}
        <section id="trust" className="relative mx-auto w-full max-w-6xl px-6 py-16">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-base font-bold bg-gradient-to-r from-amber-300 to-white bg-clip-text text-transparent">
              <Shield className="h-5 w-5 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
              Enterprise trust (security/legal) is unmissable
            </div>
            <div className="mt-2 text-zinc-400">
              If Legal and Security can't sign off, nothing ships. So we build for them first.
            </div>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card3D title="Security posture" subtitle="Least privilege + audit trails" icon={Shield} delay={0.1}>
              Role-based access, tamper-evident activity logs, and compartmentalized data handling.
              Your risk team gets visibility instead of surprises.
            </Card3D>

            <Card3D title="Legal readiness" subtitle="Contracts, approvals, and change control" icon={FileText} delay={0.2}>
              Every contract version, signature artifact, and approval decision is retained and searchable.
              You can prove what was agreed, when, and by whom.
            </Card3D>

            <Card3D title="Compliance workflows" subtitle="HIPAA-adjacent discipline" icon={CheckCircle2} delay={0.3}>
              Tight handling of sensitive documents, clear data boundaries, and repeatable procedures.
              Not "trust us"—operational controls.
            </Card3D>
          </div>

          <motion.div
            className="mt-10 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-zinc-950/90 via-amber-950/10 to-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-600/20 via-purple-600/20 to-blue-600/20 opacity-60 blur-xl" />
            
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-amber-300 to-white bg-clip-text text-transparent">
                  Make the next step obvious
                </div>
                <div className="mt-1 text-sm text-zinc-400">
                  Upload your first receipt bundle and we'll generate a verified baseline.
                </div>
              </div>
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/evidence-receipts"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-amber-500/40 transition-all hover:shadow-amber-500/60"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-amber-400 via-white to-amber-400 opacity-0 group-hover:opacity-30"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <Zap className="h-4 w-4 relative" />
                    <span className="relative">Start with receipts →</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/evidence-receipts"
                    className="inline-flex items-center gap-2 rounded-xl border border-amber-500/50 bg-zinc-950/80 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-amber-400/70 hover:bg-amber-950/30"
                  >
                    <TrendingUp className="h-4 w-4 text-amber-400" />
                    View KPIs
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer with Vegas touch */}
        <motion.footer
          className="relative mx-auto w-full max-w-6xl px-6 py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-3 border-t border-amber-500/20 pt-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-3 w-3 text-amber-500/70" />
              <span>© {new Date().getFullYear()} Kincaid IQ</span>
            </div>
            <div className="flex gap-6">
              <Link href="#proof" className="transition-all hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                Proof
              </Link>
              <Link href="#trust" className="transition-all hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                Trust
              </Link>
              <Link href="/evidence-receipts" className="transition-all hover:text-amber-400 hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]">
                Login
              </Link>
            </div>
          </div>
        </motion.footer>
      </main>
    </>
  );
}