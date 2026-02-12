import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PersonaKey = "CEO" | "CFO" | "COO" | "CIO" | "CHRO";

const primaryCta = { label: "Request Executive Review", href: "/contact" };
const secondaryCta = { label: "See Proof Trail", href: "/proof-trail" };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold tracking-[0.18em] text-neutral-400">
      {children}
    </div>
  );
}

export function PersonaTabs() {
  const [active, setActive] = useState<PersonaKey>("CFO");

  const data = useMemo(() => {
    const common = {
      note: "Same data. Different lens. Board-grade outputs either way.",
    };

    return {
      CEO: {
        headline: "Predictability beats promises.",
        bullets: [
          "Turn benefits into a controlled financial system—no renewal surprises.",
          "Expose preventable waste and stop paying for narrative-driven decisions.",
          "Get a decision map: what to change, why, and what it saves.",
        ],
        outcome: "Executive decision brief + top value levers + risk hotspots.",
        ...common,
      },
      CFO: {
        headline: "If it can't be proven, it doesn't count.",
        bullets: [
          "Actuarial-grade, multi-year normalization—no broker math.",
          "Variance decomposition: what moved cost, what didn't, and what's noise.",
          "Evidence-backed KPIs that hold up in audit and board scrutiny.",
        ],
        outcome: "Normalized PEPM + drivers + volatility controls + board summary.",
        ...common,
      },
      COO: {
        headline: "Stop running benefits on chaos and inboxes.",
        bullets: [
          "Governed workflows: approvals, exceptions, and audit trails.",
          "Faster renewals with fewer fire drills and fewer \"special cases.\"",
          "Clear ownership and repeatable execution across the year.",
        ],
        outcome: "Operating cadence + controls + workflow map + escalation paths.",
        ...common,
      },
      CIO: {
        headline: "Trust requires lineage. Lineage requires design.",
        bullets: [
          "Role-based access, audit logs, and evidence trails by default.",
          "Deterministic runs: same inputs → same outputs.",
          "Structured ingestion across PDFs and messy carrier reporting.",
        ],
        outcome: "Security posture brief + data map + integration plan.",
        ...common,
      },
      CHRO: {
        headline: "Design choices deserve decision-grade truth.",
        bullets: [
          "Separate employee experience from vendor storytelling.",
          "See participation shifts, plan friction, and cost drivers clearly.",
          "Make changes that are explainable, defensible, and measurable.",
        ],
        outcome: "Plan strategy insights + participation trend + design action plan.",
        ...common,
      },
    } as const;
  }, []);

  const keys: PersonaKey[] = ["CEO", "CFO", "COO", "CIO", "CHRO"];
  const current = data[active];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6">
      <div className="flex flex-wrap gap-2">
        {keys.map((k) => {
          const is = k === active;
          return (
            <button
              key={k}
              onClick={() => setActive(k)}
              className={[
                "rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-300",
                is
                  ? "bg-white text-neutral-950 shadow-md scale-105"
                  : "bg-white/5 text-white/80 hover:bg-white/10 hover:scale-102",
              ].join(" ")}
            >
              {k}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-content`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {current.headline}
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/80">
              {current.bullets.map((b, idx) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="flex gap-3"
                >
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                  <span>{b}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${active}-outcome`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="rounded-3xl border border-white/10 bg-neutral-950 p-5 md:p-6"
          >
            <SectionLabel>OUTCOME</SectionLabel>
            <div className="mt-3 text-base font-semibold text-white">{current.outcome}</div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{current.note}</p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:shadow-md"
              >
                {primaryCta.label}
              </a>
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 shadow-sm transition hover:bg-white/10"
              >
                {secondaryCta.label}
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}