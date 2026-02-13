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
} from "lucide-react";
import { ArbitrageEventDrawer } from "@/components/arbitrage/ArbitrageEventDrawer";
import { ArbitrageDetectionViz, DataFlowVisualization, KPIDashboardPreview } from "@/components/platform/PremiumGraphics";

type Severity = "Critical" | "High" | "Medium" | "Low";
type Status = "Open" | "Investigating" | "Monitoring" | "Resolved";
type ThemeKey = "rose" | "blue" | "amber" | "emerald" | "cyan" | "violet";

export type ArbitrageEvent = {
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
  detailedExplanation?: {
    headline: string;
    executiveSummary: string[];
    whyItMatters: string;
    whatToDoNext: string;
    gatingNote: string;
  };
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
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(251,113,133,0.35),0_0_48px_rgba(236,72,153,0.20)]",
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
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_48px_rgba(99,102,241,0.18)]",
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
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(252,211,77,0.35),0_0_48px_rgba(249,115,22,0.18)]",
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
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(52,211,153,0.35),0_0_48px_rgba(20,184,166,0.18)]",
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
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_48px_rgba(59,130,246,0.16)]",
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
    hoverRing: "group-hover:shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_0_48px_rgba(217,70,239,0.18)]",
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

export const EVENTS: ArbitrageEvent[] = [
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
    detailedExplanation: {
      headline: "Carrier Admin Fee Discrepancy Detected",
      executiveSummary: [
        "Anthem's reported admin fees don't match Schedule C compensation disclosures in Form 5500 filings",
        "Potential undisclosed compensation or fee layering creating $420k-$780k annual impact",
        "Requires immediate contract exhibit review and remittance reconciliation",
      ],
      whyItMatters: "This variance indicates potential hidden fees or undisclosed compensation arrangements that directly impact your plan costs. Left unaddressed, this could compound annually and violate ERISA disclosure requirements.",
      whatToDoNext: "Request detailed fee schedule breakdown from Anthem, cross-reference with Schedule C filings, and engage benefits counsel to review contract language for hidden compensation clauses.",
      gatingNote: "Action requires VERIFIED evidence receipts and documented audit trail per governance requirements.",
    },
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
    detailedExplanation: {
      headline: "Network Steering Driving Up Unit Costs",
      executiveSummary: [
        "Plan design language is forcing members into higher-cost network tiers",
        "Gap between guaranteed pricing and actual allowed amounts averaging 18-24%",
        "Estimated annual impact of $310k-$540k in unnecessary member and plan costs",
      ],
      whyItMatters: "Network steering clauses can artificially inflate costs while appearing to provide choice. This impacts both plan spend and member out-of-pocket costs, affecting satisfaction and retention.",
      whatToDoNext: "Analyze claims data by network tier, validate pricing guarantees against actual allowed amounts, and renegotiate network access provisions in renewal.",
      gatingNote: "Requires claims-level data analysis with proper data lineage and quality validation.",
    },
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
    detailedExplanation: {
      headline: "Pharmacy Rebate Terms Creating Leakage",
      executiveSummary: [
        "Rebate definition language excludes specialty and certain distribution channels",
        "Potential under-remittance of $260k-$610k annually based on claim patterns",
        "Weak audit rights prevent verification of rebate completeness",
      ],
      whyItMatters: "Pharmacy rebates represent 15-25% of total drug spend. Weak definitions and audit rights mean you're likely leaving significant money on the table with no ability to verify.",
      whatToDoNext: "Request detailed rebate methodology documentation, conduct claims-level rebate reconciliation, and strengthen audit rights language for next renewal.",
      gatingNote: "Full analysis requires PBM transparency and claims-level data access.",
    },
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
    detailedExplanation: {
      headline: "Stop-Loss Attachment Point Shift Increases Risk",
      executiveSummary: [
        "Attachment point increased without proportional premium adjustment",
        "Current claims trend suggests $180k-$360k additional exposure",
        "Renewal disclosure didn't clearly highlight impact of the change",
      ],
      whyItMatters: "Stop-loss protection is your safety net against catastrophic claims. A higher attachment point means more risk on your balance sheet before coverage kicks in.",
      whatToDoNext: "Model claims volatility against new attachment point, evaluate if premium savings justify increased risk, and consider negotiating back to previous level.",
      gatingNote: "Requires actuarial modeling and claims trend analysis.",
    },
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
    detailedExplanation: {
      headline: "Duplicate PEPM Billing During Vendor Transition",
      executiveSummary: [
        "Vendor transition resulted in overlapping service periods with duplicate PEPM fees",
        "Previous vendor not properly terminated, new vendor already billing",
        "Estimated duplicate charges of $95k-$210k depending on overlap duration",
      ],
      whyItMatters: "Per-employee-per-month (PEPM) fees add up quickly across your population. Paying for duplicate services is pure waste with no benefit to members.",
      whatToDoNext: "Verify termination date of previous vendor, confirm fee schedule overlap, demand refund for duplicate period, and tighten transition controls for future vendor changes.",
      gatingNote: "Straightforward reconciliation requiring invoice and contract review.",
    },
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
    detailedExplanation: {
      headline: "PBM Spread Pricing Indicators in Generic Drug Pricing",
      executiveSummary: [
        "Maximum Allowable Cost (MAC) list pricing shows spread indicators vs. industry benchmarks",
        "Generic drug pricing 25-40% above transparent benchmark sources",
        "Estimated annual impact of $520k-$1.1M based on generic utilization patterns",
      ],
      whyItMatters: "Spread pricing is where PBMs profit on the difference between what they charge your plan and what they pay pharmacies. This is the #1 driver of hidden PBM costs.",
      whatToDoNext: "Demand full MAC list transparency, benchmark against NADAC or FDB prices, enforce audit rights to verify pharmacy reimbursement, and explore pass-through pricing model.",
      gatingNote: "Requires claims-level drug pricing data and benchmark comparison analysis.",
    },
  },
];

function AnimatedGradientOverlay({
  theme,
}: {
  theme: (typeof THEME)[ThemeKey];
}) {
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

export default function ArbitrageEventsPage() {
  const [selectedEvent, setSelectedEvent] = React.useState<ArbitrageEvent | null>(null);

  const handleCloseDrawer = React.useCallback(() => {
    setSelectedEvent(null);
  }, []);

  return (
    <>
      <section className="w-full">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-sm text-white/60">Arbitrage Events</div>
            <div className="text-xl font-semibold text-white">
              EBITDA leaks worth auditing (vibrant mode ✅)
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs text-white/60">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.35)]" />
            Live signals
          </div>
        </div>

        {/* Premium Graphics Section */}
        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ArbitrageDetectionViz />
          <div className="grid gap-4">
            <KPIDashboardPreview />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {EVENTS.map((e) => {
            const t = THEME[e.theme];
            const Icon = e.icon;

            return (
              <div
                key={e.id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedEvent(e)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    setSelectedEvent(e);
                  }
                }}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 p-5",
                  "backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer",
                  t.hoverRing,
                ].join(" ")}
              >
                {/* left accent bar */}
                <div className={`absolute left-0 top-0 h-full w-2 ${t.bar}`} />

                {/* animated gradient overlay */}
                <AnimatedGradientOverlay theme={t} />

                {/* subtle inner vignette for contrast */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_15%,rgba(255,255,255,0.10),transparent_60%)] opacity-60" />

                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={[
                        "grid h-11 w-11 place-items-center rounded-2xl ring-1",
                        t.iconBg,
                        t.iconRing,
                        t.iconGlow,
                      ].join(" ")}
                    >
                      <Icon className={`h-5 w-5 ${t.title}`} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-xs font-semibold text-white/70">
                          {e.id}
                        </div>
                        <span className={`text-xs font-semibold ${t.subtle}`}>
                          {e.carrier}
                        </span>
                      </div>
                      <div className={`mt-1 text-base font-semibold ${t.title}`}>
                        {e.title}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <SeverityBadge severity={e.severity} />
                    <StatusPill status={e.status} />
                  </div>
                </div>

                <div className="relative mt-3 text-sm text-white/75 leading-relaxed">
                  {e.description}
                </div>

                <div className="relative mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/60">Est. impact</span>
                    <span className="text-sm font-semibold text-white">
                      {e.estImpact}
                    </span>
                  </div>
                  <div className="text-xs text-white/50">{e.updated}</div>
                </div>

                {/* hover "intensifier" sheen */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -inset-24 bg-[conic-gradient(from_180deg,rgba(255,255,255,0.0),rgba(255,255,255,0.14),rgba(255,255,255,0.0))] blur-2xl" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Drawer */}
      <ArbitrageEventDrawer
        open={selectedEvent !== null}
        onClose={handleCloseDrawer}
        event={selectedEvent}
      />
    </>
  );
}