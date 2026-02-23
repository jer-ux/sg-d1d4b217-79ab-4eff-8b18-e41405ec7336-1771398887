"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import { SEO } from "@/components/SEO";
import { FileText, Shield, TrendingUp, CheckCircle2, Sparkles, Zap, Crown, Star, Activity, ArrowRight, Eye, Target, Database } from "lucide-react";
import { ExecutiveWarRoom } from "@/components/warroom/ExecutiveWarRoom";
import * as THREE from "three";

// Premium 3D Background Component
const Premium3DBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#a855f7" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
        <pointLight position={[0, 10, 0]} intensity={0.6} color="#fbbf24" />
        
        {/* Floating Distorted Spheres */}
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
          <Sphere args={[1, 64, 64]} position={[-3, 2, -5]}>
            <MeshDistortMaterial color="#a855f7" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
          </Sphere>
        </Float>
        
        <Float speed={2} rotationIntensity={0.8} floatIntensity={1}>
          <Sphere args={[0.8, 64, 64]} position={[4, -2, -6]}>
            <MeshDistortMaterial color="#3b82f6" distort={0.5} speed={1.5} roughness={0.1} metalness={0.9} />
          </Sphere>
        </Float>
        
        <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.9}>
          <Sphere args={[0.6, 64, 64]} position={[2, 3, -7]}>
            <MeshDistortMaterial color="#fbbf24" distort={0.3} speed={2.5} roughness={0.3} metalness={0.7} />
          </Sphere>
        </Float>

        {/* Particle Field */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={3000}
              array={new Float32Array(
                Array.from({ length: 3000 }, () => [
                  (Math.random() - 0.5) * 20,
                  (Math.random() - 0.5) * 20,
                  (Math.random() - 0.5) * 20,
                ]).flat()
              )}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial size={0.02} color="#a855f7" transparent opacity={0.6} />
        </points>
      </Canvas>
    </div>
  );
};

// Premium Badge Component
const Badge = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) => (
  <motion.span
    className="inline-flex items-center rounded-full border border-purple-500/40 bg-gradient-to-r from-purple-950/80 to-blue-900/60 px-4 py-1.5 text-xs font-medium text-purple-200 shadow-lg shadow-purple-500/20 backdrop-blur-sm"
    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    {Icon ? <Icon className="mr-1.5 h-3.5 w-3.5 text-purple-400" /> : <Sparkles className="mr-1.5 h-3.5 w-3.5 text-purple-400" />}
    {children}
  </motion.span>
);

// Premium 3D Card Component
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
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative rounded-2xl border border-purple-500/30 bg-gradient-to-br from-zinc-950/95 via-purple-950/20 to-zinc-900/90 p-6 shadow-2xl backdrop-blur-sm transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Premium glow effects */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-500/40 to-blue-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-60" />
      
      {/* Sparkle effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 0%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative" style={{ transform: "translateZ(50px)" }}>
        {Icon && (
          <motion.div
            className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-purple-400 shadow-lg shadow-purple-500/40"
            whileHover={{ rotate: 360, scale: 1.15 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          >
            <Icon className="h-7 w-7" />
          </motion.div>
        )}
        <div className="mb-3">
          <div className="text-xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
            {title}
          </div>
          {subtitle && <div className="mt-1 text-sm text-purple-300/70 font-medium">{subtitle}</div>}
        </div>
        <div className="text-sm leading-relaxed text-zinc-300">{children}</div>
      </div>
    </motion.div>
  );
};

// Premium Stat Pill
const Pill = ({ k, v }: { k: string; v: string }) => (
  <motion.div
    className="rounded-xl border border-purple-500/40 bg-gradient-to-br from-black/80 via-purple-950/40 to-black/80 px-5 py-3 backdrop-blur-sm shadow-lg shadow-purple-500/20"
    whileHover={{ scale: 1.08, y: -3, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="text-xs text-purple-400/90 font-semibold uppercase tracking-wide">{k}</div>
    <div className="mt-1.5 text-base font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">{v}</div>
  </motion.div>
);

// Premium Receipt Card
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
    className="group relative rounded-2xl border border-purple-500/30 bg-gradient-to-br from-black/80 via-purple-950/30 to-zinc-950/70 p-5 backdrop-blur-sm shadow-xl"
    initial={{ opacity: 0, y: 20, rotateX: -10 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
    whileHover={{ y: -8, scale: 1.02, rotateX: 2 }}
    style={{ transformStyle: "preserve-3d" }}
  >
    {/* Glow effect */}
    <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-600/0 via-emerald-500/50 to-emerald-600/0 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-70" />
    
    <div className="relative" style={{ transform: "translateZ(30px)" }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <FileText className="h-4 w-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
          {title}
        </div>
        <span className={`text-xs font-bold ${statusColor} drop-shadow-[0_0_6px_currentColor]`}>{status}</span>
      </div>
      <div className="mt-2 text-xs text-zinc-400 leading-relaxed">{details}</div>
    </div>
  </motion.div>
);

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <>
      <SEO
        title="Kincaid IQ - Receipts-first benefits governance"
        description="Stop debating opinions. Run benefits like an EBITDA system. Every claim backed by evidence: vendor invoices, plan docs, contracts—linked, versioned, and provable."
        image="/og-image.png"
      />
      
      <main className="relative min-h-screen bg-black text-zinc-100 overflow-hidden">
        <Premium3DBackground />
        
        {/* Gradient overlay for purple theme */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-950/30 via-black to-blue-950/20" />
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1)_0%,transparent_50%)]" />
        
        {/* Hero Section with 3D */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-32"
        >
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex flex-wrap gap-3">
                <Badge icon={Star}>Receipts as the product</Badge>
                <Badge icon={TrendingUp}>EBITDA governance</Badge>
                <Badge icon={Shield}>Verification</Badge>
                <Badge icon={Crown}>Enterprise trust</Badge>
              </div>

              <motion.h1
                className="bg-gradient-to-br from-white via-purple-200 to-blue-200 bg-clip-text text-6xl font-black tracking-tight text-transparent drop-shadow-[0_0_40px_rgba(168,85,247,0.3)] lg:text-7xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Stop debating opinions.
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-purple-200 to-blue-400 bg-clip-text text-transparent">
                  Run benefits like an EBITDA system.
                </span>
              </motion.h1>

              <motion.p
                className="mt-6 text-lg leading-relaxed text-zinc-300"
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
                className="mt-10 flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  href="/upload-5500"
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-600/30 to-blue-600/30 px-8 py-4 text-lg font-bold shadow-lg shadow-purple-500/30 backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:border-purple-400/60 hover:shadow-purple-500/50"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-400 via-white to-blue-400 opacity-0 group-hover:opacity-30"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  <Zap className="h-5 w-5 relative" />
                  <span className="relative">Upload receipts →</span>
                </Link>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/ebitda-governance"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-500/50 bg-zinc-950/80 px-6 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-purple-400/70 hover:bg-purple-950/40 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    See EBITDA governance
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-6 flex items-center gap-2 text-sm text-purple-400/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Sparkles className="h-4 w-4" />
                <span>Upload → Verify → Govern → Reduce leakage → Prove outcomes.</span>
              </motion.div>

              {/* Founder credibility badge */}
              <motion.div
                className="mt-10 flex items-center gap-4 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-zinc-950/90 via-purple-950/20 to-zinc-900/70 p-5 backdrop-blur-sm shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                whileHover={{ scale: 1.02, borderColor: "rgba(168, 85, 247, 0.5)" }}
              >
                <div className="relative h-16 w-16 flex-shrink-0">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500/60 to-blue-500/60 blur-md" />
                  <img
                    src="/jeremiah-shrack-outdoor.png"
                    alt="Jeremiah Franklin Shrack"
                    className="relative h-16 w-16 rounded-full object-cover ring-2 ring-purple-500/40"
                  />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Built by practitioners, not theorists</div>
                  <div className="mt-1 text-xs text-zinc-400">
                    Jeremiah Shrack, CEO — 20 years solving healthcare benefits leakage
                  </div>
                  <Link
                    href="/company"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-purple-400 transition-colors hover:text-purple-300"
                  >
                    <span>Learn about our approach</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Right side: 3D receipts ledger */}
            <motion.div
              className="relative rounded-3xl border border-purple-500/40 bg-gradient-to-br from-zinc-950/95 via-purple-950/20 to-zinc-900/90 p-8 shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, x: 40, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02, rotateY: 2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Multi-layer glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/30 via-purple-500/40 to-blue-600/30 opacity-70 blur-2xl" />
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-80" />
              
              <div className="relative" style={{ transform: "translateZ(40px)" }}>
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xl font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
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
        </motion.section>

        {/* Verification Section */}
        <section id="proof" className="relative mx-auto w-full max-w-7xl px-6 py-20">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-lg font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
              <Shield className="h-6 w-6 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
              Verification is the moat
            </div>
            <div className="mt-3 text-base text-zinc-400">
              Every metric must cite a receipt. Every receipt must be traceable.
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
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

        {/* EBITDA Governance Section */}
        <section id="ebitda" className="relative mx-auto w-full max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 text-lg font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
                <TrendingUp className="h-6 w-6 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
                EBITDA governance language
              </div>
              <h2 className="mt-4 bg-gradient-to-br from-white via-purple-200 to-blue-200 bg-clip-text text-5xl font-black text-transparent">
                Benefits leakage is EBITDA leakage.
              </h2>
              <p className="mt-5 text-base text-zinc-300 leading-relaxed">
                We frame everything as financial control: unit economics (PEPM), variance drivers,
                vendor take-rate, avoidable spend, and enforcement. This is governance, not vibes.
              </p>

              <motion.div
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
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

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  href="/kincaid-iq"
                  className="group inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-gradient-to-r from-violet-600/30 to-purple-600/30 px-6 py-3.5 text-base font-bold backdrop-blur-xl transition-all hover:scale-105 hover:border-violet-400/60 hover:shadow-lg hover:shadow-violet-500/30"
                >
                  <Activity className="h-5 w-5 text-violet-400" />
                  <span>Try Kincaid IQ Cost Compression Tool →</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-purple-500/40 bg-gradient-to-br from-zinc-950/95 via-purple-950/20 to-zinc-900/90 p-8 shadow-2xl backdrop-blur-sm"
              initial={{ opacity: 0, x: 30, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.02, rotateY: -2 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/30 via-purple-500/30 to-blue-600/30 opacity-70 blur-xl" />
              
              <div className="relative" style={{ transform: "translateZ(30px)" }}>
                <div className="text-xl font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent mb-6">
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
                      className="group relative rounded-xl border border-purple-500/30 bg-gradient-to-br from-black/80 via-purple-950/20 to-black/80 p-4 backdrop-blur-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      whileHover={{ x: 10, scale: 1.02, borderColor: "rgba(168, 85, 247, 0.5)" }}
                    >
                      <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-purple-600/0 via-purple-500/40 to-purple-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur" />
                      <div className="relative">
                        <div className="text-sm font-bold text-white">{t}</div>
                        <div className="mt-1 text-xs text-zinc-400">{d}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Executive War Room Dashboard */}
        <section id="dashboard" className="relative mx-auto w-full max-w-7xl px-6 py-20">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <TrendingUp className="h-6 w-6 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
              </div>
              <div>
                <h2 className="text-4xl font-black bg-gradient-to-br from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Live CFO Dashboard
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Real-time metrics, evidence-backed KPIs, and executive insights
                </p>
              </div>
            </div>

            {/* Interactive Demo Callout */}
            <motion.div
              className="mt-8 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-zinc-900/50 to-emerald-900/30 p-6 backdrop-blur-sm shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <motion.div
                    className="rounded-xl bg-emerald-500/30 p-3 shadow-lg shadow-emerald-500/30"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="h-6 w-6 text-emerald-400" />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <div className="text-lg font-bold text-emerald-300 mb-2">
                    👆 Click Any Tile Below for 4-Level Drill-Through Demo
                  </div>
                  <div className="text-sm text-zinc-300 leading-relaxed">
                    All <span className="font-bold text-emerald-400">8 tiles</span> are fully interactive with evidence-backed drill-downs:
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                      <div className="flex items-center gap-2 rounded-lg bg-zinc-900/70 px-3 py-2 backdrop-blur-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-400 font-bold text-xs">1</div>
                        <span className="text-zinc-400">Executive Summary</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-zinc-900/70 px-3 py-2 backdrop-blur-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-400 font-bold text-xs">2</div>
                        <span className="text-zinc-400">Factor Breakdown</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-zinc-900/70 px-3 py-2 backdrop-blur-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-400 font-bold text-xs">3</div>
                        <span className="text-zinc-400">Transactions</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-zinc-900/70 px-3 py-2 backdrop-blur-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-400 font-bold text-xs">4</div>
                        <span className="text-zinc-400">Evidence Receipt</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400/80">
                    <Shield className="h-3 w-3" />
                    <span>Every metric traced to source receipts with cryptographic proof</span>
                  </div>
                </div>
              </div>
            </motion.div>
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

        {/* Enterprise Trust Section */}
        <section id="trust" className="relative mx-auto w-full max-w-7xl px-6 py-20">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-lg font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
              <Shield className="h-6 w-6 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
              Enterprise trust (security/legal) is unmissable
            </div>
            <div className="mt-3 text-base text-zinc-400">
              If Legal and Security can't sign off, nothing ships. So we build for them first.
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
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
            className="mt-12 rounded-3xl border border-purple-500/40 bg-gradient-to-br from-zinc-950/95 via-purple-950/20 to-zinc-900/90 p-8 shadow-2xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/30 via-purple-500/30 to-blue-600/30 opacity-70 blur-xl" />
            
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xl font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
                  Make the next step obvious
                </div>
                <div className="mt-2 text-sm text-zinc-400">
                  Upload your first receipt bundle and we'll generate a verified baseline.
                </div>
              </div>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/upload-5500"
                    className="inline-flex items-center gap-2 rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-600/30 to-blue-600/30 px-6 py-3 text-base font-bold backdrop-blur-xl transition-all hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <Zap className="h-5 w-5 relative" />
                    <span className="relative">Start with receipts →</span>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/evidence-receipts"
                    className="inline-flex items-center gap-2 rounded-xl border border-purple-500/50 bg-zinc-950/80 px-5 py-3 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-purple-400/70 hover:bg-purple-950/40"
                  >
                    <TrendingUp className="h-5 w-5 text-purple-400" />
                    View KPIs
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          className="relative mx-auto w-full max-w-7xl px-6 py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-3 border-t border-purple-500/30 pt-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-3 w-3 text-purple-500/70" />
              <span>© {new Date().getFullYear()} Kincaid IQ</span>
            </div>
            <div className="flex gap-6">
              <Link href="#proof" className="transition-all hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                Proof
              </Link>
              <Link href="#trust" className="transition-all hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                Trust
              </Link>
              <Link href="/evidence-receipts" className="transition-all hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                Login
              </Link>
            </div>
          </div>
        </motion.footer>
      </main>
    </>
  );
}