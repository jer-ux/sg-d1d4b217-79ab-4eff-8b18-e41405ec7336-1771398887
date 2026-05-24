"use client";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { SEO } from "@/components/SEO";
import { ExecutiveWarRoom } from "@/components/warroom/ExecutiveWarRoom";
import Nav from "@/components/Nav";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function KincaidIQPage() {
  return (
    <>
      <SEO
        title="Kincaid IQ Platform | Real-Time Healthcare Intelligence"
        description="Real-time metrics, evidence-backed KPIs, and algorithmic insights for C-suite decision making in healthcare benefits management"
      />
      
      <Nav />
      
      <main className="relative min-h-screen bg-black text-zinc-100 overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-purple-950/20 via-black to-blue-950/10 pointer-events-none" style={{ zIndex: 0 }} />

        <section id="kincaid-iq" className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 py-24 sm:py-32">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-end gap-3 mb-4">
              <div className="text-right">
                <h1 className="text-4xl font-black bg-gradient-to-br from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Kincaid IQ Platform
                </h1>
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

          <motion.div
            className="mt-16 rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-950/20 via-black/90 to-blue-950/20 p-8 sm:p-12 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent mb-6">
              Why Kincaid IQ?
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-purple-500/20 bg-black/40 p-6">
                <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent mb-2">
                  Real-Time
                </div>
                <p className="text-sm text-zinc-400">
                  Live data streams with sub-second latency. No batch processing delays.
                </p>
              </div>
              <div className="rounded-xl border border-purple-500/20 bg-black/40 p-6">
                <div className="text-3xl font-black bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent mb-2">
                  Evidence-Backed
                </div>
                <p className="text-sm text-zinc-400">
                  Every KPI carries cryptographic proof chains to source documents.
                </p>
              </div>
              <div className="rounded-xl border border-purple-500/20 bg-black/40 p-6">
                <div className="text-3xl font-black bg-gradient-to-r from-purple-400 to-blue-200 bg-clip-text text-transparent mb-2">
                  Executive-Ready
                </div>
                <p className="text-sm text-zinc-400">
                  C-suite dashboards with McKinsey and Bain frameworks built-in.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}