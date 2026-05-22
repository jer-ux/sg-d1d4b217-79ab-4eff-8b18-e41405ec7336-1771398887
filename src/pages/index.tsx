"use client";
import Head from "next/head";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { SEO } from "@/components/SEO";
import { FileText, Shield, TrendingUp, CheckCircle2, Sparkles, Zap, Crown, Star, Activity, ArrowRight, Lock, Building2, Users, Database, BarChart3, Globe, Award, AlertTriangle, Search, Clock } from "lucide-react";
import { ExecutiveWarRoom } from "@/components/warroom/ExecutiveWarRoom";
import { CHROWarRoom } from "@/components/warroom/CHROWarRoom";
import { BadgeDetailSystem } from "@/components/home/BadgeDetailSystem";
import { Hero3D } from "@/components/Hero3D";
import { ExecutiveKPITile } from "@/components/warroom/tiles/ExecutiveKPITile";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FreeContractReviewCTA } from "@/components/marketing/FreeContractReviewCTA";
import Nav from "@/components/Nav";

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
      className="group relative rounded-xl sm:rounded-2xl border border-purple-500/30 bg-gradient-to-br from-zinc-950/95 via-purple-950/20 to-zinc-900/90 p-4 sm:p-6 shadow-2xl backdrop-blur-sm transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute -inset-px rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-500/40 to-blue-600/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute -inset-px rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 opacity-60" />
      <motion.div
        className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100"
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
            className="mb-3 sm:mb-4 inline-flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-purple-400 shadow-lg shadow-purple-500/40"
            whileHover={{ rotate: 360, scale: 1.15 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
          >
            <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
          </motion.div>
        )}
        <div className="mb-2 sm:mb-3">
          <div className="text-lg sm:text-xl font-bold bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
            {title}
          </div>
          {subtitle && <div className="mt-1 text-xs sm:text-sm text-purple-300/70 font-medium">{subtitle}</div>}
        </div>
        <div className="text-xs sm:text-sm leading-relaxed text-zinc-300">{children}</div>
      </div>
    </motion.div>
  );
};

const Pill = ({ k, v }: { k: string; v: string }) => (
  <motion.div
    className="rounded-lg sm:rounded-xl border border-purple-500/40 bg-gradient-to-br from-black/80 via-purple-950/40 to-black/80 px-3 sm:px-5 py-2 sm:py-3 backdrop-blur-sm shadow-lg shadow-purple-500/20"
    whileHover={{ scale: 1.08, y: -3, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)", rotateY: 5, z: 30 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
  >
    <div className="text-[10px] sm:text-xs text-purple-400/90 font-semibold uppercase tracking-wide">{k}</div>
    <div className="mt-1 sm:mt-1.5 text-sm sm:text-base font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">{v}</div>
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
      <Head>
        <title>Kincaid IQ - Stop Overpaying for Healthcare</title>
        <meta
          name="description"
          content="Find hidden overcharges in your benefits contracts. Reduce costs by 20-35% while improving employee coverage."
        />
      </Head>
      
      <Nav />
      
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
                  <motion.h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] leading-tight font-bold"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <motion.span 
                      className="bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent"
                      style={{ display: "block", transform: "translateZ(30px)" }}
                    >
                      Is your PBM adviser
                    </motion.span>
                    <motion.span 
                      className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent"
                      style={{ display: "block", transform: "translateZ(20px)" }}
                    >
                      advising your properly
                    </motion.span>
                  </motion.h1>

                  {/* Fiduciary Callout */}
                  <motion.div
                    className="rounded-xl sm:rounded-2xl border border-amber-500/40 bg-gradient-to-br from-amber-950/40 via-black/90 to-amber-900/20 px-4 sm:px-6 py-4 sm:py-5 backdrop-blur-sm shadow-lg shadow-amber-500/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(251, 191, 36, 0.3)" }}
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-amber-400" />
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-amber-100 leading-relaxed font-medium">
                        You are legally required to have a fiduciary for your 401(k) plan. <span className="font-bold bg-gradient-to-r from-amber-300 to-white bg-clip-text text-transparent">Why would your PBM be any different?</span>
                      </p>
                    </div>
                  </motion.div>

                  <motion.p 
                    className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    Find hidden overcharges in PBM contracts. Eliminate wasteful spending. Save 20-35% while improving coverage. Every dollar verified with proof.
                  </motion.p>

                  {/* CTA Buttons with 3D */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
                    style={{ transform: "translateZ(30px)" }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, z: 50, rotateY: -5 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
                      className="w-full sm:w-auto"
                    >
                      <a
                        href="https://calendly.com/jer-kincaidrmc/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Book Your PBM Consultation</span>
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                    </motion.div>
                  </motion.div>

                  <motion.p 
                    className="text-xs sm:text-sm text-gray-400"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    Free contract analysis • No implementation required • Results in 14 days
                  </motion.p>
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
                      alt="Benefits Cost Analysis Dashboard"
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
                    <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">
                      Stop overpaying
                    </span>
                    <span className="text-white">for employee benefits</span>
                  </h1>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Schedule a Consultation Section */}
        <section id="consultation" className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-black/95 to-amber-900/20 p-8 sm:p-12 shadow-2xl backdrop-blur-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-600/20 via-amber-500/30 to-amber-600/20 opacity-60 blur-xl" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column - Messaging */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/40 px-4 py-2 text-sm font-semibold text-amber-300 mb-6 w-fit">
                  <Shield className="h-4 w-4" />
                  Free Contract Analysis
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
                  <span className="bg-gradient-to-r from-amber-300 via-amber-100 to-white bg-clip-text text-transparent">
                    Apply for your
                  </span>
                  <br />
                  <span className="text-white">PBM Consultation</span>
                </h2>

                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6">
                  Discover the hidden overcharges in your PBM contract. Our team will conduct a preliminary analysis and show you exactly where your money is going.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
                      <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white">30-Minute Discovery Call</div>
                      <div className="text-sm text-zinc-400">Review your contract structure and identify immediate red flags</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
                      <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Preliminary Findings Report</div>
                      <div className="text-sm text-zinc-400">Documented evidence of potential overcharges within 48 hours</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
                      <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white">No Obligation</div>
                      <div className="text-sm text-zinc-400">Free analysis with no commitment required</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {/* Calendly Booking Button */}
                <motion.div
                  className="mb-6"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <a
                    href="https://calendly.com/jer-kincaidrmc/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 px-8 py-5 text-lg font-bold text-white shadow-2xl hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 transition-all duration-200 hover:shadow-amber-500/50"
                  >
                    <Clock className="h-6 w-6" />
                    <span>Book Your Consultation Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <p className="text-center text-sm text-amber-300/70 mt-3">
                    Schedule directly • 30-minute call • No forms required
                  </p>
                </motion.div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-amber-500/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-black/60 text-zinc-400">or fill out the form below</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-amber-500/30 bg-black/60 p-6 sm:p-8 backdrop-blur-sm">
                  <form className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-amber-100 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-lg border border-amber-500/30 bg-black/40 px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-amber-100 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-lg border border-amber-500/30 bg-black/40 px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="john.smith@company.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-amber-100 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        className="w-full rounded-lg border border-amber-500/30 bg-black/40 px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="Acme Corporation"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-amber-100 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full rounded-lg border border-amber-500/30 bg-black/40 px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="employees" className="block text-sm font-semibold text-amber-100 mb-2">
                        Number of Employees
                      </label>
                      <select
                        id="employees"
                        name="employees"
                        className="w-full rounded-lg border border-amber-500/30 bg-black/40 px-4 py-3 text-white focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                      >
                        <option value="">Select range</option>
                        <option value="1-50">1-50</option>
                        <option value="51-200">51-200</option>
                        <option value="201-500">201-500</option>
                        <option value="501-1000">501-1,000</option>
                        <option value="1001+">1,001+</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-amber-100 mb-2">
                        What's your biggest concern with your current PBM?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full rounded-lg border border-amber-500/30 bg-black/40 px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                        placeholder="e.g., Rising costs, lack of transparency, hidden fees..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-4 text-lg font-bold text-white shadow-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-200 hover:shadow-amber-500/25"
                    >
                      Apply for PBM Consultation
                    </motion.button>

                    <p className="text-xs text-center text-zinc-500">
                      By submitting, you agree to receive communications from Kincaid IQ. We respect your privacy.
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/40 bg-purple-950/40 px-4 py-2 text-sm font-semibold text-purple-300 mb-6">
              <Sparkles className="h-4 w-4" />
              Our Process
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-300 via-purple-100 to-white bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              From contract upload to verified savings in 14 days. Every step documented, every finding backed by evidence.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:gap-12">
            {/* Step 1 */}
            <motion.div
              className="grid lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="lg:order-1">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 text-2xl font-black text-blue-400">
                    1
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Upload Your Contract</h3>
                </div>
                <p className="text-base text-zinc-300 leading-relaxed mb-6">
                  Securely upload your PBM contract through our encrypted portal. We accept PDFs, scanned documents, and digital contracts. Your data is encrypted end-to-end with SOC2 compliance.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0" />
                    <span className="text-sm text-zinc-400">256-bit AES encryption</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0" />
                    <span className="text-sm text-zinc-400">SOC2 Type II certified infrastructure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-400 shrink-0" />
                    <span className="text-sm text-zinc-400">HIPAA-compliant data handling</span>
                  </div>
                </div>
              </div>
              <motion.div
                className="lg:order-2 rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/40 to-black/60 p-8 backdrop-blur-sm"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center h-48 sm:h-64">
                  <FileText className="h-24 w-24 sm:h-32 sm:w-32 text-blue-400/60" />
                </div>
              </motion.div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              className="grid lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <motion.div
                className="lg:order-1 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-black/60 p-8 backdrop-blur-sm"
                whileHover={{ scale: 1.02, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center h-48 sm:h-64">
                  <Search className="h-24 w-24 sm:h-32 sm:w-32 text-purple-400/60" />
                </div>
              </motion.div>
              <div className="lg:order-2">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 text-2xl font-black text-purple-400">
                    2
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Forensic Analysis</h3>
                </div>
                <p className="text-base text-zinc-300 leading-relaxed mb-6">
                  Our AI-powered Contract X-Ray engine performs a comprehensive forensic analysis. We examine every clause, pricing term, rebate structure, and hidden fee against actuarial benchmarks.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0" />
                    <span className="text-sm text-zinc-400">47 common overcharge patterns identified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0" />
                    <span className="text-sm text-zinc-400">NADAC benchmark comparison</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-purple-400 shrink-0" />
                    <span className="text-sm text-zinc-400">Actuarial validation of findings</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              className="grid lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="lg:order-1">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 text-2xl font-black text-amber-400">
                    3
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Evidence Package</h3>
                </div>
                <p className="text-base text-zinc-300 leading-relaxed mb-6">
                  Receive a comprehensive audit report with every finding documented and timestamped. Every overcharge is backed by cryptographic proof, ready for negotiation or litigation.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0" />
                    <span className="text-sm text-zinc-400">SHA-256 timestamped evidence</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0" />
                    <span className="text-sm text-zinc-400">Court-grade documentation</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0" />
                    <span className="text-sm text-zinc-400">Audit-ready compliance reports</span>
                  </div>
                </div>
              </div>
              <motion.div
                className="lg:order-2 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/40 to-black/60 p-8 backdrop-blur-sm"
                whileHover={{ scale: 1.02, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center h-48 sm:h-64">
                  <Shield className="h-24 w-24 sm:h-32 sm:w-32 text-amber-400/60" />
                </div>
              </motion.div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              className="grid lg:grid-cols-2 gap-8 items-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="lg:order-1 rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-950/40 to-black/60 p-8 backdrop-blur-sm"
                whileHover={{ scale: 1.02, rotateY: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center h-48 sm:h-64">
                  <TrendingUp className="h-24 w-24 sm:h-32 sm:w-32 text-green-400/60" />
                </div>
              </motion.div>
              <div className="lg:order-2">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-500/30 text-2xl font-black text-green-400">
                    4
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">Recover Your Savings</h3>
                </div>
                <p className="text-base text-zinc-300 leading-relaxed mb-6">
                  Armed with documented proof, negotiate with your PBM from a position of strength. Our clients recover an average of 87% of identified overcharges. Typical recovery: $2.4M annually.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                    <span className="text-sm text-zinc-400">Evidence-backed negotiations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                    <span className="text-sm text-zinc-400">87% average recovery rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                    <span className="text-sm text-zinc-400">Ongoing monitoring included</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline Summary */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="inline-flex items-center gap-4 rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-black/80 to-blue-950/40 px-8 py-6 backdrop-blur-sm">
              <Clock className="h-8 w-8 text-purple-400" />
              <div className="text-left">
                <div className="text-2xl font-black bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">
                  14 Days
                </div>
                <div className="text-sm text-zinc-400">From upload to documented findings</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Proof Section with Enhanced 3D Cards */}
        <section id="proof" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12">
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

        {/* Forensics Section */}
        <section id="forensics" className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <motion.div
            className="mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 text-base sm:text-lg font-black bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent mb-3 sm:mb-4">
              <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
              Contract Forensics Engine
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              Your PBM contract is a crime scene.<br className="hidden sm:block"/>
              <span className="bg-gradient-to-br from-red-400 via-red-500 to-red-700 bg-clip-text text-transparent">We have the forensics.</span>
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-3xl leading-relaxed">
              Rx Defense IQ Contract X-Ray is the only actuarially-anchored, evidence-spine-governed PBM contract forensic engine built for ERISA fiduciaries who refuse to lose.
            </p>
          </motion.div>

          {/* Forensic Statistics Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.div
              className="rounded-lg sm:rounded-xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-black/80 p-4 sm:p-6 backdrop-blur-sm shadow-lg"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">47</div>
              <div className="mt-1 text-[10px] sm:text-xs text-red-300/70 font-medium uppercase tracking-wide">Avg Issues/Contract</div>
            </motion.div>
            <motion.div
              className="rounded-lg sm:rounded-xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-black/80 p-4 sm:p-6 backdrop-blur-sm shadow-lg"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">$2.4M</div>
              <div className="mt-1 text-[10px] sm:text-xs text-red-300/70 font-medium uppercase tracking-wide">Annual Recovery</div>
            </motion.div>
            <motion.div
              className="rounded-lg sm:rounded-xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-black/80 p-4 sm:p-6 backdrop-blur-sm shadow-lg"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">87%</div>
              <div className="mt-1 text-[10px] sm:text-xs text-red-300/70 font-medium uppercase tracking-wide">Recovery Success Rate</div>
            </motion.div>
            <motion.div
              className="rounded-lg sm:rounded-xl border border-red-500/30 bg-gradient-to-br from-red-950/40 to-black/80 p-4 sm:p-6 backdrop-blur-sm shadow-lg"
              whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 30px rgba(239, 68, 68, 0.3)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">14</div>
              <div className="mt-1 text-[10px] sm:text-xs text-red-300/70 font-medium uppercase tracking-wide">Days to Evidence</div>
            </motion.div>
          </motion.div>

          {/* Forensic Capabilities Grid */}
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8 sm:mb-12">
            <Card3D
              title="Spread Analysis"
              subtitle="AWP vs NADAC forensics"
              icon={BarChart3}
              delay={0.1}
            >
              Deep analysis of Average Wholesale Price vs NADAC benchmark spreads. Identify overcharging on generic drugs where PBMs exploit spread pricing to inflate costs by 200-400%.
            </Card3D>

            <Card3D
              title="Rebate Leakage Detection"
              subtitle="Follow the money trail"
              icon={TrendingUp}
              delay={0.2}
            >
              Track manufacturer rebates through every layer. Identify retained rebates, delayed pass-throughs, and contractual violations. Average finding: $847K in unreturned rebates per audit.
            </Card3D>

            <Card3D
              title="MAC List Manipulation"
              subtitle="Maximum Allowable Cost gaming"
              icon={AlertTriangle}
              delay={0.3}
            >
              Forensic analysis of MAC list updates and pricing changes. Detect when PBMs manipulate pricing lists to capture spread on high-volume generics. Typical recovery: $1.2M annually.
            </Card3D>

            <Card3D
              title="Specialty Drug Markups"
              subtitle="High-cost medication forensics"
              icon={Activity}
              delay={0.4}
            >
              Deep dive into specialty pharmacy markups and adherence to contracted discount guarantees. Uncover hidden fees, inflated dispensing charges, and violated rebate terms.
            </Card3D>

            <Card3D
              title="Dir Fee Clawbacks"
              subtitle="Point-of-sale vs post-adjudication"
              icon={Shield}
              delay={0.5}
            >
              Track Direct and Indirect Remuneration fees that appear after claims are paid. Identify retroactive clawbacks that violate transparency requirements. Average recovery: $340K/year.
            </Card3D>

            <Card3D
              title="Formulary Manipulation"
              subtitle="Therapeutic class switching"
              icon={Search}
              delay={0.6}
            >
              Detect non-clinical formulary changes that drive members to higher-cost alternatives. Identify PBM conflicts of interest and recovered spread opportunities.
            </Card3D>
          </div>

          {/* Evidence Standards */}
          <motion.div
            className="mb-12 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/20 via-black/90 to-zinc-900/90 p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-black bg-gradient-to-r from-red-300 to-white bg-clip-text text-transparent mb-3">
                Court-Grade Evidence Standards
              </h3>
              <p className="text-base text-zinc-300 leading-relaxed">
                Every finding must survive hostile cross-examination. Every number must be reproducible by opposing counsel.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                  <CheckCircle2 className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <div className="font-bold text-white">SHA-256 Timestamped Evidence</div>
                  <div className="mt-1 text-sm text-zinc-400">Every contract clause, claim record, and invoice cryptographically hashed with RFC 3161 timestamps</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                  <CheckCircle2 className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <div className="font-bold text-white">Chain of Custody Tracking</div>
                  <div className="mt-1 text-sm text-zinc-400">Complete audit trail from data ingestion through analysis to final report with signed attestations</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                  <CheckCircle2 className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <div className="font-bold text-white">Actuarial Validation</div>
                  <div className="mt-1 text-sm text-zinc-400">Every statistical claim reviewed by credentialed actuaries; ASA/FSA certified methodologies</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/20">
                  <CheckCircle2 className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <div className="font-bold text-white">Reproducible Calculations</div>
                  <div className="mt-1 text-sm text-zinc-400">Open calculation methodologies; opposing experts can verify every number using same inputs</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quote Box */}
          <motion.div
            className="mb-12 bg-gradient-to-br from-red-950/40 via-black/80 to-red-900/20 border border-red-500/30 rounded-2xl p-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(239, 68, 68, 0.2)" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1 w-12 bg-gradient-to-r from-red-500 to-red-700 rounded-full" />
            </div>
            <blockquote className="text-2xl font-bold text-red-100 leading-relaxed">
              "Most PBM contracts are written to be misunderstood. <span className="bg-gradient-to-r from-red-400 to-red-200 bg-clip-text text-transparent">Ours are written to be prosecuted.</span>"
            </blockquote>
            <div className="mt-6 text-sm text-red-300/60">
              — Contract Forensics Methodology, Rx Defense IQ
            </div>
          </motion.div>

          {/* What We Prosecute */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-black text-white mb-6">What We Prosecute</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-red-500/20 bg-black/40 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-500" />
                  <div>
                    <div className="font-bold text-red-200">Spread Pricing Violations</div>
                    <div className="mt-1 text-sm text-zinc-400">AWP-based pricing where NADAC benchmarks are contractually required. Average overcharge: $340/claim.</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-black/40 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-500" />
                  <div>
                    <div className="font-bold text-red-200">Undisclosed Rebate Retention</div>
                    <div className="mt-1 text-sm text-zinc-400">Manufacturer rebates kept by PBM despite contractual pass-through obligations. Average finding: $847K/year.</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-black/40 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-500" />
                  <div>
                    <div className="font-bold text-red-200">MAC List Gaming</div>
                    <div className="mt-1 text-sm text-zinc-400">Manipulated Maximum Allowable Cost lists to capture spread on high-volume generics. Recovery: $1.2M annually.</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-black/40 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-500" />
                  <div>
                    <div className="font-bold text-red-200">DIR Fee Clawbacks</div>
                    <div className="mt-1 text-sm text-zinc-400">Retroactive Direct/Indirect Remuneration fees that violate transparency requirements. Average recovery: $340K/year.</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-black/40 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-500" />
                  <div>
                    <div className="font-bold text-red-200">Formulary Conflicts</div>
                    <div className="mt-1 text-sm text-zinc-400">Non-clinical formulary changes driving members to PBM-owned pharmacies or higher-cost alternatives.</div>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-red-500/20 bg-black/40 p-5 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-500" />
                  <div>
                    <div className="font-bold text-red-200">Specialty Pharmacy Markups</div>
                    <div className="mt-1 text-sm text-zinc-400">Violated discount guarantees, hidden fees, and inflated dispensing charges on high-cost medications.</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-center max-w-2xl">
              <p className="text-base sm:text-lg text-zinc-300 mb-4 sm:mb-6">
                Ready to discover what your PBM isn't telling you? Launch a forensic investigation and get documented proof of every overcharge.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/solutions/contract-xray"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-red-600 to-red-800 rounded-xl hover:from-red-500 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                >
                  <Search className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Launch Forensic Investigation
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/solutions/rx-defense"
                  className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-red-300 border-2 border-red-500/50 rounded-xl hover:bg-red-950/30 hover:border-red-400 transition-all duration-200"
                >
                  <FileText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  View Sample Audit Report
                </Link>
              </motion.div>
            </div>
            <div className="text-xs sm:text-sm text-zinc-500 text-center px-4">
              Free contract analysis • Documented findings in 14 days • No commitment required
            </div>
          </motion.div>
        </section>

        {/* Dashboard Section with 3D Effects */}
        <section id="dashboard" className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-end gap-3 mb-4">
              <div className="text-right">
                <h2 className="text-4xl font-black bg-gradient-to-br from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Kincaid IQ RX X-Ray
                </h2>
                <p className="text-sm text-zinc-400 mt-1">
                  Real-time metrics, evidence-backed KPIs, and algorithmic insights for C-suite decision making
                </p>
              </div>
              <motion.div 
                className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center shadow-lg shadow-purple-500/30"
                whileHover={{ rotate: 360, scale: 1.15 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <TrendingUp className="h-6 w-6 text-purple-400 drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
              </motion.div>
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

        {/* CHRO War Room Section */}
        <section id="war-room" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12">
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
          <motion.div
            className="mt-10 flex justify-center"
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
                href="/request-demo"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/50 bg-zinc-950/80 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-emerald-400/70 hover:bg-emerald-950/40"
              >
                <Users className="h-5 w-5 text-emerald-400" />
                <span>Schedule HR Analytics Demo</span>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Enterprise Trust Section */}
        <section id="trust" className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12">
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
                    <span className="relative">Contact Sales →</span>
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
          <div className="text-center py-8 border-t border-white/10">
            <span>© {new Date().getFullYear()} Kincaid IQ</span>
          </div>
        </motion.footer>

        {/* Free Contract Review CTA */}
        <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
          <div className="max-w-5xl mx-auto">
            <FreeContractReviewCTA />
          </div>
        </section>

        <SiteFooter />
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