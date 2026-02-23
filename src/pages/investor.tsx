"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Lock, Unlock, ChevronDown } from "lucide-react";

const PremiumBackground = dynamic(() => 
  import("@/components/premium/PremiumBackground").then(mod => ({ default: mod.PremiumBackground })), 
  { ssr: false }
);

export default function InvestorAccess() {
  const [code, setCode] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("INV_ACCESS_OK") : null;
    if (saved === "1") setOk(true);
  }, []);

  async function verify() {
    setErr(null);
    const r = await fetch("/api/investor/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const d = await r.json();
    if (d?.ok) {
      localStorage.setItem("INV_ACCESS_OK", "1");
      setOk(true);
    } else {
      setErr("Invalid code.");
    }
  }

  const slides = [
    {
      id: "title",
      image: "/slide01_title.png",
      title: "SiriusB iQ",
      subtitle: "Algorithmic Fiduciary Intelligence Platform",
      description: "Transforming enterprise benefits into verifiable alpha"
    },
    {
      id: "problem",
      image: "/slide02_problem.png",
      title: "The $1.2T Opacity Problem",
      subtitle: "Enterprise Benefits Lack Accountability",
      description: "Benefits spend represents 30-40% of total compensation yet operates in a black box with zero real-time verification"
    },
    {
      id: "thesis",
      image: "/slide03_thesis.png",
      title: "Investment Thesis",
      subtitle: "Receipts + Ledger = Fiduciary AI",
      description: "We turn unstructured benefits chaos into structured, verifiable intelligence that scales across the enterprise"
    },
    {
      id: "architecture",
      image: "/slide04_architecture.png",
      title: "Platform Architecture",
      subtitle: "Modular Chassis + Vertical Modules",
      description: "Sovereign data platform with pluggable intelligence modules for every stakeholder"
    },
    {
      id: "moat",
      image: "/slide05_moat.png",
      title: "Competitive Moat",
      subtitle: "Data Network Effects at Scale",
      description: "Every receipt strengthens the ledger. Every ledger entry improves the AI. Compounding defensibility."
    },
    {
      id: "warroom",
      image: "/slide06_warroom.png",
      title: "War Room Intelligence",
      subtitle: "Real-Time Fiduciary Command Center",
      description: "CFOs see every dollar in flight, every variance, every intervention opportunity—in real time"
    },
    {
      id: "ledger",
      image: "/slide07_ledger.png",
      title: "Verified Savings Ledger",
      subtitle: "Immutable Proof of Performance",
      description: "Blockchain-grade verification of every savings claim, every negotiation, every vendor commitment"
    },
    {
      id: "trust",
      image: "/slide08_trust.png",
      title: "Enterprise Trust Layer",
      subtitle: "SOC 2 + Blockchain + Audit Trails",
      description: "Bank-grade security meets pharmaceutical-grade compliance for Fortune 500 peace of mind"
    },
    {
      id: "platform",
      image: "/slide09_platform.png",
      title: "Full Stack Platform",
      subtitle: "Data Lake → Intelligence → Action",
      description: "Ingest anything, analyze everything, verify outcomes, compound value across the enterprise"
    },
    {
      id: "whynow",
      image: "/slide_whynow.png",
      title: "Why Now",
      subtitle: "Perfect Storm of Market Forces",
      description: "AI commoditization + regulatory pressure + CFO accountability = inflection point for fiduciary intelligence"
    },
    {
      id: "dataquality",
      image: "/slide_dataquality.png",
      title: "Data Quality Edge",
      subtitle: "Clean Data = Better AI = Compounding Alpha",
      description: "Our data cleaning pipeline turns enterprise chaos into pristine training sets for agentic workflows"
    },
    {
      id: "roi",
      image: "/slide_roi.png",
      title: "ROI at Scale",
      subtitle: "10-15% Savings on $100M+ Benefits Spend",
      description: "Payback in 6-9 months. 3-5x ROI in year one. Compounding value as data network effects scale."
    },
    {
      id: "timeline",
      image: "/slide_timeline.png",
      title: "Traction & Roadmap",
      subtitle: "From MVP to Enterprise Scale",
      description: "Pilot customers, proven savings, expanding modules—demonstrating product-market fit at velocity"
    },
    {
      id: "partnership",
      image: "/slide_partnership.png",
      title: "Partnership Model",
      subtitle: "Ecosystem Strategy for 10x Growth",
      description: "Consultants, brokers, TPAs become force multipliers. We provide rails, they provide reach."
    },
    {
      id: "cta",
      image: "/slide10_cta.png",
      title: "Investment Opportunity",
      subtitle: "Join the Fiduciary Intelligence Revolution",
      description: "Seed round open. Building the operating system for enterprise benefits transparency."
    }
  ];

  if (!ok) {
    return (
      <main className="relative min-h-screen overflow-hidden">
        <PremiumBackground />
        
        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl"
          >
            <div className="rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 border border-purple-500/20">
                  <Lock className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-purple-400">Investor Access</div>
                  <h1 className="text-xl font-semibold text-white">Private Materials Portal</h1>
                </div>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-white/70">
                Access the full pitch deck with market analysis, platform architecture, traction metrics, and investment thesis.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/90">Access Code</label>
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && verify()}
                    placeholder="Enter your access code"
                    className="w-full rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                <button
                  onClick={verify}
                  className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 font-medium text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Unlock className="h-4 w-4" />
                    Unlock Investor Materials
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              </div>

              {err && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
                >
                  {err}
                </motion.div>
              )}

              <div className="mt-6 rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">What's Inside</div>
                <ul className="space-y-2 text-sm text-white/70">
                  {[
                    "15-slide strategic pitch deck",
                    "Market sizing & competitive analysis",
                    "Platform architecture deep-dive",
                    "Traction metrics & ROI validation",
                    "Investment thesis & use of funds"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="mt-1.5 h-1 w-1 rounded-full bg-purple-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-center text-xs text-white/50">
              For investor inquiries: <a href="mailto:investors@siriusb.ai" className="text-purple-400 hover:text-purple-300 transition-colors">investors@siriusb.ai</a>
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main ref={containerRef} className="relative min-h-screen">
      <PremiumBackground />
      
      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-purple-500 to-fuchsia-500 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Lock Button */}
      <motion.button
        onClick={() => {
          localStorage.removeItem("INV_ACCESS_OK");
          setOk(false);
        }}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/40 px-4 py-2 text-sm text-white/80 backdrop-blur-xl transition-all hover:bg-white/10 hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Lock className="h-4 w-4" />
        Lock Portal
      </motion.button>

      {/* Slides */}
      <div className="relative space-y-0">
        {slides.map((slide, index) => {
          const slideProgress = useTransform(
            scrollYProgress,
            [index / slides.length, (index + 1) / slides.length],
            [0, 1]
          );
          
          const opacity = useTransform(slideProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
          const scale = useTransform(slideProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

          return (
            <motion.section
              key={slide.id}
              className="relative flex min-h-screen items-center justify-center px-6 py-20"
              style={{ opacity, scale }}
            >
              <div className="relative z-10 w-full max-w-7xl">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
                  {/* Text Content */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-xs font-medium text-purple-300 backdrop-blur-sm">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                      Slide {index + 1} of {slides.length}
                    </div>

                    <div>
                      <h2 className="text-4xl font-bold tracking-tight text-white lg:text-5xl">
                        {slide.title}
                      </h2>
                      <p className="mt-3 text-xl font-medium text-purple-300">
                        {slide.subtitle}
                      </p>
                    </div>

                    <p className="text-lg leading-relaxed text-white/70">
                      {slide.description}
                    </p>

                    {index === slides.length - 1 && (
                      <div className="flex flex-wrap gap-4 pt-4">
                        <Link
                          href="/request-demo"
                          className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 font-medium text-white transition-all hover:scale-105"
                        >
                          Schedule Discussion
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <a
                          href="mailto:investors@siriusb.ai"
                          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-xl transition-all hover:bg-white/10"
                        >
                          Contact Investor Relations
                        </a>
                      </div>
                    )}
                  </motion.div>

                  {/* Slide Image */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl transition-all hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20">
                      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                        <Image
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
                  </motion.div>
                </div>
              </div>

              {/* Scroll indicator (only on first slide) */}
              {index === 0 && (
                <motion.div
                  className="absolute bottom-12 left-1/2 -translate-x-1/2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div className="flex flex-col items-center gap-2 text-white/50">
                    <span className="text-xs font-medium uppercase tracking-wider">Scroll to explore</span>
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </motion.div>
              )}
            </motion.section>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-white">SiriusB iQ Investor Portal</p>
              <p className="mt-1 text-xs text-white/50">Confidential & Proprietary Information</p>
            </div>
            <div className="flex gap-6 text-sm text-white/70">
              <Link href="/company" className="transition-colors hover:text-purple-400">Company</Link>
              <Link href="/security-governance" className="transition-colors hover:text-purple-400">Security</Link>
              <a href="mailto:investors@siriusb.ai" className="transition-colors hover:text-purple-400">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}