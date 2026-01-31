"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import {
  ShieldAlert,
  Building2,
  Pill,
  Activity,
  BadgeDollarSign,
  FileWarning,
  TrendingUp,
  Clock,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { ArbitrageEventDrawer } from "@/components/arbitrage/ArbitrageEventDrawer";

type Severity = "Critical" | "High" | "Medium" | "Low";
type Status = "Open" | "Investigating" | "Monitoring" | "Resolved";
type ThemeKey = "rose" | "blue" | "amber" | "emerald" | "cyan" | "violet";

type ArbitrageEvent = {
  id: string;
  carrier: string;
  title: string;
  description: string;
  severity: Severity;
  status: Status;
  estImpact: string;
  updated: string;
  theme: ThemeKey;
  icon: React.ComponentType<{ className?: string }>;
};

const THEME: Record<
  ThemeKey,
  {
    bar: string;
    g1: string;
    g2: string;
    g3: string;
    title: string;
    subtle: string;
    iconBg: string;
    iconRing: string;
    iconGlow: string;
    hoverRing: string;
  }
> = {
  rose: {
    bar: "bg-gradient-to-b from-rose-400 via-pink-500 to-fuchsia-500",
    g1: "rgba(244,63,94,0.55)",
    g2: "rgba(236,72,153,0.45)",
    g3: "rgba(217,70,239,0.40)",
    title: "text-rose-200",
    subtle: "text-rose-100/70",
    iconBg: "bg-rose-500/15",
    iconRing: "ring-rose-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(251,113,133,0.25),0_0_24px_rgba(244,63,94,0.25)]",
    hoverRing:
      "group-hover:shadow-[0_0_0_1px_rgba(251,113,133,0.35),0_0_48px_rgba(236,72,153,0.20)]",
  },
  blue: {
    bar: "bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-500",
    g1: "rgba(59,130,246,0.50)",
    g2: "rgba(14,165,233,0.40)",
    g3: "rgba(99,102,241,0.35)",
    title: "text-sky-200",
    subtle: "text-sky-100/70",
    iconBg: "bg-sky-500/15",
    iconRing: "ring-sky-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(56,189,248,0.25),0_0_24px_rgba(59,130,246,0.22)]",
    hoverRing:
      "group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_48px_rgba(99,102,241,0.18)]",
  },
  amber: {
    bar: "bg-gradient-to-b from-amber-300 via-orange-500 to-rose-500",
    g1: "rgba(245,158,11,0.55)",
    g2: "rgba(249,115,22,0.45)",
    g3: "rgba(244,63,94,0.25)",
    title: "text-amber-200",
    subtle: "text-amber-100/70",
    iconBg: "bg-amber-500/15",
    iconRing: "ring-amber-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(252,211,77,0.25),0_0_24px_rgba(249,115,22,0.22)]",
    hoverRing:
      "group-hover:shadow-[0_0_0_1px_rgba(252,211,77,0.35),0_0_48px_rgba(249,115,22,0.18)]",
  },
  emerald: {
    bar: "bg-gradient-to-b from-emerald-300 via-emerald-500 to-teal-500",
    g1: "rgba(16,185,129,0.55)",
    g2: "rgba(20,184,166,0.40)",
    g3: "rgba(34,197,94,0.30)",
    title: "text-emerald-200",
    subtle: "text-emerald-100/70",
    iconBg: "bg-emerald-500/15",
    iconRing: "ring-emerald-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(52,211,153,0.25),0_0_24px_rgba(16,185,129,0.22)]",
    hoverRing:
      "group-hover:shadow-[0_0_0_1px_rgba(52,211,153,0.35),0_0_48px_rgba(20,184,166,0.18)]",
  },
  cyan: {
    bar: "bg-gradient-to-b from-cyan-300 via-cyan-500 to-blue-500",
    g1: "rgba(6,182,212,0.55)",
    g2: "rgba(34,211,238,0.40)",
    g3: "rgba(59,130,246,0.30)",
    title: "text-cyan-200",
    subtle: "text-cyan-100/70",
    iconBg: "bg-cyan-500/15",
    iconRing: "ring-cyan-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(34,211,238,0.25),0_0_24px_rgba(6,182,212,0.22)]",
    hoverRing:
      "group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_48px_rgba(59,130,246,0.16)]",
  },
  violet: {
    bar: "bg-gradient-to-b from-violet-400 via-purple-500 to-fuchsia-500",
    g1: "rgba(139,92,246,0.55)",
    g2: "rgba(168,85,247,0.45)",
    g3: "rgba(217,70,239,0.30)",
    title: "text-violet-200",
    subtle: "text-violet-100/70",
    iconBg: "bg-violet-500/15",
    iconRing: "ring-violet-400/40",
    iconGlow: "shadow-[0_0_0_1px_rgba(167,139,250,0.25),0_0_24px_rgba(168,85,247,0.22)]",
    hoverRing:
      "group-hover:shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_0_48px_rgba(217,70,239,0.18)]",
  },
};

function SeverityBadge({ severity }: { severity: Severity }) {
  const map: Record<Severity, string> = {
    Critical:
      "bg-rose-500/20 text-rose-200 ring-1 ring-rose-400/40 shadow-[0_0_18px_rgba(244,63,94,0.22)]",
    High: "bg-orange-500/20 text-orange-200 ring-1 ring-orange-400/40 shadow-[0_0_18px_rgba(249,115,22,0.20)]",
    Medium:
      "bg-yellow-500/20 text-yellow-200 ring-1 ring-yellow-400/40 shadow-[0_0_18px_rgba(234,179,8,0.18)]",
    Low: "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40 shadow-[0_0_18px_rgba(16,185,129,0.16)]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide ${map[severity]}`}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {severity}
    </span>
  );
}

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, string> = {
    Open: "bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/35",
    Investigating: "bg-amber-500/15 text-amber-200 ring-1 ring-amber-400/35",
    Monitoring: "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/35",
    Resolved: "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-400/35",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${map[status]} shadow-[0_0_18px_rgba(255,255,255,0.06)]`}
    >
      {status}
    </span>
  );
}

const EVENTS: ArbitrageEvent[] = [
  {
    id: "AE-10901",
    carrier: "Anthem",
    title: "Carrier admin fee variance vs. disclosed Schedule C",
    description:
      "Detected mismatch between carrier-stated admin fees and 5500-derived compensation trail. Review contract exhibits + remittance.",
    severity: "Critical",
    status: "Investigating",
    estImpact: "$420k–$780k",
    updated: "Updated 2h ago",
    theme: "rose",
    icon: FileWarning,
  },
  {
    id: "AE-10902",
    carrier: "UnitedHealth",
    title: "Network steering clause creates hidden unit-cost spread",
    description:
      "Plan design constraints appear to force utilization into higher-cost tiers. Validate pricing guarantees vs. actual allowed amounts.",
    severity: "High",
    status: "Open",
    estImpact: "$310k–$540k",
    updated: "Updated today",
    theme: "blue",
    icon: Activity,
  },
  {
    id: "AE-10903",
    carrier: "Cigna",
    title: "Rx rebate definition weak; risk of under-remittance",
    description:
      "Rebate terms may exclude specialty and certain channels. Run a rebate completeness audit against claim-level aggregation.",
    severity: "High",
    status: "Monitoring",
    estImpact: "$260k–$610k",
    updated: "Updated yesterday",
    theme: "amber",
    icon: BadgeDollarSign,
  },
  {
    id: "AE-10904",
    carrier: "Aetna",
    title: "Stop-loss attachment point shifted; exposure increased",
    description:
      "Attachment point change creates EBITDA-at-risk variance under current claims trend. Verify renewal language and disclosure.",
    severity: "Medium",
    status: "Investigating",
    estImpact: "$180k–$360k",
    updated: "Updated 3d ago",
    theme: "emerald",
    icon: ShieldAlert,
  },
  {
    id: "AE-10905",
    carrier: "Tech Corp",
    title: "Vendor swap introduced duplicate PEPM charges",
    description:
      "Two overlapping vendors billing PEPM for similar services. Check termination dates + fee schedule alignment.",
    severity: "Medium",
    status: "Open",
    estImpact: "$95k–$210k",
    updated: "Updated 5d ago",
    theme: "cyan",
    icon: Building2,
  },
  {
    id: "AE-10906",
    carrier: "Express Scripts",
    title: "PBM spread pricing signal in MAC list behavior",
    description:
      "Observed spread indicators across generics vs. benchmark. Validate MAC transparency + audit rights + network terms.",
    severity: "Critical",
    status: "Open",
    estImpact: "$520k–$1.1M",
    updated: "Updated 1w ago",
    theme: "violet",
    icon: Pill,
  },
];

function EventCard({ event, onClick }: { event: ArbitrageEvent; onClick: () => void }) {
  const th = THEME[event.theme];
  const Icon = event.icon;

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-slate-900/80"
      onClick={onClick}
      whileHover={{ y: -4 }}
      style={{ cursor: "pointer" }}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 h-full w-1.5 ${th.bar}`} />

      {/* Animated gradient overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${th.g1}, ${th.g2}, ${th.g3}, transparent)`,
        }}
      />

      <div className="relative p-6 pl-8">
        {/* Header row */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-lg ${th.iconBg} ring-1 ${th.iconRing} ${th.iconGlow} transition-all duration-300`}
            >
              <Icon className={`h-5 w-5 ${th.title}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${th.title}`}>{event.id}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-sm font-medium text-slate-300">{event.carrier}</span>
              </div>
              <div className="mt-1 flex items-center gap-2">
                <SeverityBadge severity={event.severity} />
                <StatusPill status={event.status} />
              </div>
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-slate-200" />
        </div>

        {/* Title */}
        <h3 className={`mb-2 text-lg font-semibold leading-tight ${th.title} transition-colors duration-300`}>
          {event.title}
        </h3>

        {/* Description */}
        <p className={`mb-4 text-sm leading-relaxed ${th.subtle}`}>{event.description}</p>

        {/* Footer metrics */}
        <div className="flex items-center gap-6 border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-300">{event.estImpact}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <span className="text-xs text-slate-400">{event.updated}</span>
          </div>
        </div>
      </div>

      {/* Hover ring */}
      <div className={`pointer-events-none absolute inset-0 rounded-xl transition-shadow duration-300 ${th.hoverRing}`} />
    </motion.div>
  );
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ArbitrageEventsPage() {
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);

  const handleOpenDrawer = (eventId: string) => {
    setSelectedEventId(eventId);
  };

  const handleCloseDrawer = () => {
    setSelectedEventId(null);
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.08),transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.06),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-12">
          {/* Header */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-400">
              <TrendingUp className="h-4 w-4" />
              <span>CFO Executive Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold text-white">Arbitrage Events</h1>
            <p className="mt-2 text-slate-400">
              Real-time monitoring of carrier contract variances, pricing anomalies, and value
              leakage opportunities.
            </p>
          </motion.div>

          {/* Event grid */}
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {EVENTS.map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                <EventCard event={event} onClick={() => handleOpenDrawer(event.id)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Drawer */}
      <ArbitrageEventDrawer
        open={selectedEventId !== null}
        onClose={handleCloseDrawer}
        eventId={selectedEventId || ""}
      />
    </>
  );
}