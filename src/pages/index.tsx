"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SEO } from "@/components/SEO";
import { FileText, Shield, TrendingUp, CheckCircle2, Sparkles, Zap, Crown, Star, Activity, ArrowRight, Lock, Building2, Users, Database, BarChart3, Globe, Award } from "lucide-react";
import { ExecutiveWarRoom } from "@/components/warroom/ExecutiveWarRoom";
import { CHROWarRoom } from "@/components/warroom/CHROWarRoom";
import { BadgeDetailSystem } from "@/components/home/BadgeDetailSystem";
import { Hero3D } from "@/components/Hero3D";

const Badge = ({ children, icon: Icon }: { children: React.ReactNode; icon?: React.ComponentType<{ className?: string }> }) => (
  <motion.span
    className="inline-flex items-center rounded-full border border-purple-500/40 bg-gradient-to-r from-purple-950/80 to-blue-900/60 px-4 py-1.5 text-xs font-medium text-purple-200 shadow-lg shadow-purple-500/20 backdrop-blur-sm"
    whileHover={{ scale: 1.05, y: -2, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
  >
    {Icon ? <Icon className="mr-1.5 h-3.5 w-3.5 text-purple-400" /> : <Sparkles className="mr-1.5 h-3.5 w-3.5 text-purple-400" />}
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
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-500/40 to-blue-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-60" />
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

const Pill = ({ k, v }: { k: string; v: string }) => (
  <motion.div
    className="rounded-xl border border-purple-500/40 bg-gradient-to-br from-black/80 via-purple-950/40 to-black/80 px-5 py-3 backdrop-blur-sm shadow-lg shadow-purple-500/20"
    whileHover={{ scale: 1.08, y: -3, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)", rotateY: 5, z: 30 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
  >
    <div className="text-xs text-purple-400/90 font-semibold uppercase tracking-wide">{k}</div>
    <div className="mt-1.5 text-base font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">{v}</div>
  </motion.div>
);

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const [selectedBadge, setSelectedBadge] = useState<"receipts" | "ebitda" | "verification" | "trust" | "immutable" | null>(null);
  const [badgeLevel, setBadgeLevel] = useState(1);

  const handleBadgeClick = (badgeType: "receipts" | "ebitda" | "verification" | "trust" | "immutable") => {
    setSelectedBadge(badgeType);
    setBadgeLevel(1);
  };

  const handleNextLevel = () => {
    setBadgeLevel(prev => prev + 1);
  };

  const handleBadgeClose = () => {
    setSelectedBadge(null);
    setBadgeLevel(1);
  };

  return (
    <>
      <SEO
        title="SiriusB iQ - Enterprise Algorithmic Fiduciary Platform"
        description="Enterprise-grade governance platform. Multi-tenancy, SSO, SOC2 compliance. Every decision backed by cryptographic proof, every metric traced to evidence."
        image="/og-image.png"
      />
      <main className="relative min-h-screen bg-black text-zinc-100 overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-purple-950/20 via-black to-blue-950/10 pointer-events-none" style={{ zIndex: 0 }} />

        {/* Hero Section with 3D Effects */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-0" ref={heroRef}>
          <div className="absolute inset-0 z-0">
            <Hero3D />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            {mounted ? (
              <motion.div 
                style={{ opacity: heroOpacity, scale: heroScale }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Left Column - Text Content with 3D */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                  style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
                >
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge icon={Building2}>Enterprise-Grade</Badge>
                    <Badge icon={Shield}>SOC2 Compliant</Badge>
                    <Badge icon={Award}>HIPAA Ready</Badge>
                  </div>

                  <motion.h1 
                    className="text-4xl md:text-[58px] leading-tight font-bold"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.span 
                      className="bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent"
                      style={{ display: "block", transform: "translateZ(30px)" }}
                    >
                      Enterprise Algorithmic
                    </motion.span>
                    <motion.span 
                      className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent"
                      style={{ display: "block", transform: "translateZ(20px)" }}
                    >
                      Fiduciary Platform
                    </motion.span>
                  </motion.h1>

                  <motion.p 
                    className="text-xl text-gray-300 mb-8 leading-relaxed"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    Transform enterprise operations with AI-powered governance, real-time oversight, and algorithmic compliance enforcement. Multi-tenant architecture, SSO integration, and cryptographic audit trails built for Fortune 500 scale.
                  </motion.p>

                  {/* Enterprise Trust Badges */}
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-purple-400">99.99%</div>
                      <div className="text-xs text-gray-400 mt-1">Uptime SLA</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-purple-400">SOC2</div>
                      <div className="text-xs text-gray-400 mt-1">Type II</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-purple-400">256-bit</div>
                      <div className="text-xs text-gray-400 mt-1">Encryption</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className="text-2xl font-bold text-purple-400">24/7</div>
                      <div className="text-xs text-gray-400 mt-1">Support</div>
                    </div>
                  </motion.div>

                  {/* CTA Buttons with 3D */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, z: 50, rotateY: 5 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                    >
                      <Link
                        href="/enterprise/dashboard"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <Building2 className="mr-2 h-5 w-5" />
                        <span>Enterprise Portal</span>
                        <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, z: 50, rotateY: -5 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                    >
                      <Link
                        href="/request-demo"
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <span>Request Enterprise Demo</span>
                        <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H6" />
                        </svg>
                      </Link>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Right Column - Image with 3D Transform */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                  style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
                >
                  <motion.div 
                    className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl shadow-amber-500/10"
                    whileHover={{ scale: 1.02, rotateY: 5, z: 50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img
                      src="/e36f3ab62edc9c2fba9186685bb06e694fd8e78149112009407488c8477129df.png"
                      alt="SiriusB iQ Enterprise Platform"
                      className="w-full h-auto"
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent pointer-events-none"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <h1 className="text-4xl md:text-[58px] font-bold leading-tight">
                    <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                      Enterprise Algorithmic
                    </span>
                    <span className="text-white">Fiduciary Platform</span>
                  </h1>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Enterprise Features Section */}
        <section id="enterprise" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-lg font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent mb-4">
              <Building2 className="h-6 w-6 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
              Enterprise-Grade Infrastructure
            </div>
            <h2 className="text-4xl font-black bg-gradient-to-br from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Built for scale, security, and compliance
            </h2>
            <p className="mt-3 text-base text-zinc-400 max-w-3xl">
              Multi-tenant architecture, SSO integration, comprehensive audit trails, and enterprise-grade security controls ready for your most demanding workloads.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card3D
              title="Multi-Tenant Architecture"
              subtitle="Isolated data, shared infrastructure"
              icon={Database}
              delay={0.1}
            >
              Complete data isolation with organization-level tenancy. Role-based access control, department hierarchies, and granular permissions at every level.
            </Card3D>

            <Card3D
              title="SSO & Enterprise Auth"
              subtitle="SAML 2.0, OAuth 2.0, OIDC support"
              icon={Shield}
              delay={0.2}
            >
              Seamless integration with Okta, Azure AD, Google Workspace. Multi-factor authentication, session management, and passwordless login options.
            </Card3D>

            <Card3D
              title="SOC2 Type II Compliant"
              subtitle="Audited security controls"
              icon={Award}
              delay={0.3}
            >
              Third-party audited security framework. Continuous compliance monitoring, automated policy enforcement, and audit-ready documentation.
            </Card3D>

            <Card3D
              title="Real-Time Analytics"
              subtitle="Live dashboards, instant insights"
              icon={BarChart3}
              delay={0.4}
            >
              WebSocket-powered live updates. Executive dashboards, team analytics, and usage metrics refreshed in real-time across all devices.
            </Card3D>

            <Card3D
              title="Global CDN & Edge"
              subtitle="Sub-50ms latency worldwide"
              icon={Globe}
              delay={0.5}
            >
              Distributed edge network with automatic failover. 99.99% uptime SLA, regional data residency, and disaster recovery built-in.
            </Card3D>

            <Card3D
              title="Enterprise API"
              subtitle="RESTful & GraphQL endpoints"
              icon={Zap}
              delay={0.6}
            >
              Comprehensive API with versioning, webhooks, and real-time subscriptions. Rate limiting, API key management, and developer documentation.
            </Card3D>
          </div>
        </section>

        {/* Proof Section with Enhanced 3D Cards */}
        <section id="proof" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-lg font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
              <Shield className="h-6 w-6 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
              Cryptographic Verification at Scale
            </div>
            <div className="mt-3 text-base text-zinc-400">
              Every metric must cite a receipt. Every receipt must be traceable. Every audit must be reproducible.
            </div>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card3D
              title="Lineage-backed KPIs"
              subtitle="Cryptographic proof chains"
              icon={TrendingUp}
              delay={0.1}
            >
              Every KPI carries SHA-256 hashed citations to source documents. Full provenance tracking from raw data ingestion through transformation to final metrics with timestamped audit trails.
            </Card3D>
            <Card3D
              title="Deterministic diffs"
              subtitle="Immutable change history"
              icon={FileText}
              delay={0.2}
            >
              Contract versions, invoices, and plan changes tracked with git-like versioning. Complete change-log with who approved what, when, and why—immutable and tamper-evident.
            </Card3D>
            <Card3D
              title="Enterprise audit exports"
              subtitle="Compliance-ready evidence bundles"
              icon={CheckCircle2}
              delay={0.3}
            >
              Generate cryptographically signed audit packages: hashed files, extraction outputs, approval workflows, and audit trails. Your evidence survives the most rigorous scrutiny.
            </Card3D>
          </div>
        </section>

        {/* Dashboard Section with 3D Effects */}
        <section id="dashboard" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center shadow-lg shadow-purple-500/30"
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <TrendingUp className="h-6 w-6 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
              </motion.div>
              <div>
                <h2 className="text-4xl font-black bg-gradient-to-br from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Executive Command Center
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Real-time metrics, evidence-backed KPIs, and algorithmic insights for C-suite decision making
                </p>
              </div>
            </div>
            <motion.div
              className="mt-8 rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-zinc-900/50 to-emerald-900/30 p-6 backdrop-blur-sm shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.01, rotateY: 1 }}
              style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
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
                    👆 Interactive 4-Level Evidence Drill-Through
                  </div>
                  <div className="text-sm text-zinc-300 leading-relaxed">
                    All <span className="font-bold text-emerald-400">8 tiles</span> demonstrate enterprise-grade drill-down capabilities with cryptographic proof:
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-2 text-xs">
                      <div className="flex items-center gap-2 rounded-lg bg-zinc-900/70 px-3 py-2 backdrop-blur-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-400 font-bold text-xs">1</div>
                        <span className="text-zinc-400">Executive Summary</span>
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-zinc-900/70 px-3 py-2 backdrop-blur-sm">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-400 font-bold text-xs">2</div>
                        <span className="text-zinc-400">Factor Analysis</span>
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
                    <span>Every metric cryptographically linked to source documents with SHA-256 hashing</span>
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

        {/* CHRO War Room Section */}
        <section id="war-room" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/30"
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <Users className="h-6 w-6 text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
              </motion.div>
              <div>
                <h2 className="text-4xl font-black bg-gradient-to-br from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
                  CHRO Intelligence Center
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Human capital analytics and workforce intelligence for strategic talent decisions
                </p>
              </div>
            </div>
            <p className="text-base text-zinc-300 leading-relaxed max-w-3xl">
              Real-time workforce analytics, benefits utilization tracking, and retention forecasting. Every HR metric backed by evidence, every decision supported by data.
            </p>
          </motion.div>

          <motion.div
            className="rounded-3xl border border-emerald-500/40 bg-gradient-to-br from-zinc-950/95 via-emerald-950/10 to-zinc-900/90 p-8 shadow-2xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
            style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-600/20 via-teal-500/20 to-emerald-600/20 opacity-50 blur-xl" />
            <div className="relative">
              <CHROWarRoom />
            </div>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, z: 30 }}
              whileTap={{ scale: 0.95 }}
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <Link
                href="/enterprise/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-zinc-950/80 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-emerald-400/70 hover:bg-emerald-950/40"
              >
                <Building2 className="h-5 w-5 text-emerald-400" />
                <span>Enterprise Portal</span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Enterprise Trust Section */}
        <section id="trust" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-lg font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
              <Shield className="h-6 w-6 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
              Enterprise Security & Compliance
            </div>
            <div className="mt-3 text-base text-zinc-400">
              Security-first architecture. Compliance-ready controls. Audit-proof documentation.
            </div>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card3D title="Zero Trust Architecture" subtitle="Least privilege + continuous verification" icon={Shield} delay={0.1}>
              Role-based access control with just-in-time elevation. Tamper-evident activity logs, network segmentation, and encrypted data at rest and in transit.
            </Card3D>
            <Card3D title="Compliance Automation" subtitle="SOC2, HIPAA, ISO27001 ready" icon={Award} delay={0.2}>
              Automated policy enforcement, continuous compliance monitoring, and one-click audit report generation. Every control mapped to frameworks.
            </Card3D>
            <Card3D title="Enterprise SLAs" subtitle="99.99% uptime guarantee" icon={CheckCircle2} delay={0.3}>
              Multi-region redundancy, automated failover, disaster recovery tested quarterly. 24/7 enterprise support with dedicated account management.
            </Card3D>
          </div>
          <motion.div
            className="mt-12 rounded-3xl border border-purple-500/40 bg-gradient-to-br from-zinc-950/95 via-purple-950/20 to-zinc-900/90 p-8 shadow-2xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01, rotateY: 1 }}
            style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-purple-600/30 via-purple-500/30 to-blue-600/30 opacity-70 blur-xl" />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xl font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
                  Enterprise transformation starts here
                </div>
                <div className="mt-2 text-sm text-zinc-400">
                  Schedule a consultation with our enterprise team to discuss your governance requirements.
                </div>
              </div>
              <div className="flex gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05, z: 30 }} 
                  whileTap={{ scale: 0.95 }}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  <Link
                    href="/enterprise/dashboard"
                    className="inline-flex items-center gap-2 rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-600/30 to-blue-600/30 px-6 py-3 text-base font-bold backdrop-blur-xl transition-all hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/30"
                  >
                    <Building2 className="h-5 w-5 relative" />
                    <span className="relative">Enterprise Portal →</span>
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2, z: 30 }} 
                  whileTap={{ scale: 0.95 }}
                  style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                >
                  <Link
                    href="/request-demo"
                    className="inline-flex items-center gap-2 rounded-xl border border-purple-500/50 bg-zinc-950/80 px-5 py-3 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-purple-400/70 hover:bg-purple-950/40"
                  >
                    <Lock className="h-5 w-5 text-purple-400" />
                    Request Demo
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <motion.footer
          className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col gap-3 border-t border-purple-500/30 pt-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-3 w-3 text-purple-500/70" />
              <span>© {new Date().getFullYear()} SiriusB iQ - Enterprise Algorithmic Fiduciary Platform</span>
            </div>
            <div className="flex gap-6">
              <Link href="/enterprise/dashboard" className="transition-all hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                Enterprise Portal
              </Link>
              <Link href="#proof" className="transition-all hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                Security
              </Link>
              <Link href="/request-demo" className="transition-all hover:text-purple-400 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                Contact Sales
              </Link>
            </div>
          </div>
        </motion.footer>
      </main>

      <BadgeDetailSystem
        badgeType={selectedBadge}
        level={badgeLevel}
        onClose={handleBadgeClose}
        onNextLevel={handleNextLevel}
      />
    </>
  );
}