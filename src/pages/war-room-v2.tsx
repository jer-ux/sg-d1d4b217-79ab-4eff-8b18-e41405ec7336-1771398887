import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, TrendingUp, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { WarRoomV2 } from "@/components/warroom/WarRoomV2";
import { RankedEventsPanel } from "@/components/RankedEventsPanel";

const THEME = {
  blue: {
    bar: "bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-500",
    g1: "rgba(59,130,246,0.50)",
    g2: "rgba(14,165,233,0.40)",
    g3: "rgba(99,102,241,0.35)",
    title: "text-sky-200",
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
    iconBg: "bg-violet-500/15",
    iconRing: "ring-violet-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(167,139,250,0.25),0_0_24px_rgba(168,85,247,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_0_48px_rgba(217,70,239,0.18)]",
  },
  rose: {
    bar: "bg-gradient-to-b from-rose-400 via-pink-500 to-fuchsia-500",
    g1: "rgba(244,63,94,0.55)",
    g2: "rgba(236,72,153,0.45)",
    g3: "rgba(217,70,239,0.40)",
    title: "text-rose-200",
    iconBg: "bg-rose-500/15",
    iconRing: "ring-rose-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(251,113,133,0.25),0_0_24px_rgba(244,63,94,0.25)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(251,113,133,0.35),0_0_48px_rgba(236,72,153,0.20)]",
  },
  amber: {
    bar: "bg-gradient-to-b from-amber-300 via-orange-500 to-rose-500",
    g1: "rgba(245,158,11,0.55)",
    g2: "rgba(249,115,22,0.45)",
    g3: "rgba(244,63,94,0.25)",
    title: "text-amber-200",
    iconBg: "bg-amber-500/15",
    iconRing: "ring-amber-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(252,211,77,0.25),0_0_24px_rgba(249,115,22,0.22)]",
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(252,211,77,0.35),0_0_48px_rgba(249,115,22,0.18)]",
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

type StatCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  themeKey: ThemeKey;
  delay?: number;
};

function StatCard({ icon: Icon, label, value, themeKey, delay = 0 }: StatCardProps) {
  const t = THEME[themeKey];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={[
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-6",
        "backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5",
        t.hoverRing,
      ].join(" ")}
    >
      <div className={`absolute left-0 top-0 h-full w-2 ${t.bar}`} />
      <AnimatedGradientOverlay theme={t} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_15%,rgba(255,255,255,0.10),transparent_60%)] opacity-60" />

      <div className="relative flex items-start gap-4">
        <div
          className={[
            "grid h-12 w-12 place-items-center rounded-2xl ring-1",
            t.iconBg,
            t.iconRing,
            t.iconGlow,
          ].join(" ")}
        >
          <Icon className={`h-6 w-6 ${t.title}`} />
        </div>

        <div className="flex-1">
          <div className="text-sm text-white/70">{label}</div>
          <div className={`text-2xl font-bold ${t.title}`}>{value}</div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute -inset-24 bg-[conic-gradient(from_180deg,rgba(255,255,255,0.0),rgba(255,255,255,0.14),rgba(255,255,255,0.0))] blur-2xl" />
      </div>
    </motion.div>
  );
}

export default function WarRoomV2Page() {
  return (
    <>
      <SEO
        title="War Room V2 - Real-Time Intelligence | Kincaid IQ"
        description="AI-powered real-time event management with ranked intelligence and governance automation"
      />

      <Nav />

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_50%)]" />

          <div className="relative z-10 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 backdrop-blur-xl mb-6">
                <Zap className="h-4 w-4 text-violet-300" />
                <span className="text-sm text-violet-200">Real-Time Intelligence Platform</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
                War Room V2
              </h1>

              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                AI-powered event management with real-time ranking, governance automation, and verified evidence trails
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <StatCard
                icon={Activity}
                label="Events Processed"
                value="10M+"
                themeKey="blue"
                delay={0}
              />
              <StatCard
                icon={TrendingUp}
                label="Avg Response Time"
                value="<100ms"
                themeKey="emerald"
                delay={0.1}
              />
              <StatCard
                icon={AlertTriangle}
                label="Active Incidents"
                value="24"
                themeKey="rose"
                delay={0.2}
              />
              <StatCard
                icon={CheckCircle}
                label="Resolution Rate"
                value="99.2%"
                themeKey="violet"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Ranked Events Panel */}
        <section className="px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <RankedEventsPanel />
          </div>
        </section>

        {/* War Room Grid */}
        <section className="px-4 pb-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 backdrop-blur-xl p-8"
            >
              <div className={`absolute left-0 top-0 h-full w-2 ${THEME.blue.bar}`} />
              <AnimatedGradientOverlay theme={THEME.blue} />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_15%,rgba(255,255,255,0.10),transparent_60%)] opacity-60" />

              <div className="relative">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-sky-200 mb-2">Live Event Stream</h2>
                  <p className="text-white/70">Real-time intelligence feed with AI-powered governance</p>
                </div>

                <WarRoomV2 />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}