import React from "react";
import { SEO } from "@/components/SEO";

type PersonaKey = "CEO" | "CFO" | "COO" | "CIO" | "CHRO";

const primaryCta = { label: "Request Executive Review", href: "/contact" };
const secondaryCta = { label: "See Proof Trail", href: "/proof-library" };

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-6 md:px-10">{children}</div>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold tracking-[0.18em] text-neutral-400">
      {children}
    </div>
  );
}

function CTAButtons() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
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
  );
}

function Divider() {
  return <div className="my-14 h-px w-full bg-white/10" />;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  );
}

function PersonaTabs() {
  const [active, setActive] = React.useState<PersonaKey>("CFO");

  const data = React.useMemo(() => {
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
                "rounded-2xl px-4 py-2 text-sm font-semibold transition",
                is
                  ? "bg-white text-neutral-950 shadow-sm"
                  : "bg-white/5 text-white/80 hover:bg-white/10",
              ].join(" ")}
            >
              {k}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="text-xl font-semibold tracking-tight text-white md:text-2xl">
            {current.headline}
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/80">
            {current.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-white" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-neutral-950 p-5 md:p-6">
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
        </div>
      </div>
    </div>
  );
}

function PremiumCard({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-sm">
      <SectionLabel>{label}</SectionLabel>
      <div className="mt-3 text-lg font-semibold text-white">{title}</div>
      <p className="mt-3 text-sm leading-relaxed text-white/75">{body}</p>
    </div>
  );
}

export default function KincaidIQPage() {
  return (
    <>
      <SEO
        title="Kincaid iQ - Actuarial-Grade Benefits Intelligence"
        description="Evidence-backed employee benefits intelligence for middle-market executives. Stop running on broker math. Start governing benefits like a financial system."
        image="/og-image.png"
      />

      <main className="min-h-screen bg-neutral-950 text-white">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-[-220px] right-[-180px] h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
          </div>

          <Container>
            <div className="relative py-16 md:py-24">
              <SectionLabel>KINCAID IQ</SectionLabel>

              <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
                Benefits decisions shouldn&apos;t run on broker math.
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/75 md:text-lg">
                Kincaid IQ delivers actuarial-grade, evidence-backed truth for middle-market employee benefits—
                so executives can cut waste, control volatility, and negotiate from facts, not narratives.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Pill>Actuarial-grade normalization</Pill>
                <Pill>Proof trail per KPI</Pill>
                <Pill>Audit-ready governance</Pill>
                <Pill>Renewal leverage</Pill>
              </div>

              <CTAButtons />

              <p className="mt-6 text-xs text-white/50">
                CFO-level scrutiny • CHRO execution • CIO-grade controls • COO-ready workflows
              </p>
            </div>
          </Container>
        </section>

        {/* WHY */}
        <section className="py-16 md:py-20">
          <Container>
            <div className="max-w-3xl">
              <SectionLabel>THE WHY</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Middle-market leaders switch when &quot;renewal season&quot; becomes a liability.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">
                Traditional brokers optimize relationships and presentation. That&apos;s fine—until the numbers don&apos;t reconcile,
                budgets get blindsided, and vendor narratives drive decisions. If the analysis can&apos;t be proven, it can&apos;t be trusted.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <PremiumCard
                label="WHAT GOES WRONG"
                title="Broker math isn't actuarial truth."
                body="Partial data, inconsistent definitions, and spreadsheet inference create &quot;trends&quot; that collapse under scrutiny. When the foundation is soft, negotiations become theater."
              />
              <PremiumCard
                label="WHAT CHANGES"
                title="We ship decision-grade truth—with receipts."
                body="Every KPI is reproducible and traceable to source data. You don't get a narrative. You get a proof trail that holds up in the boardroom."
              />
            </div>

            <Divider />

            <div className="grid gap-4 md:grid-cols-4">
              <PremiumCard
                label="PILLAR 1"
                title="Actuarial accuracy"
                body="Multi-year normalization, clean definitions, and decision-grade metrics—built for CFO review."
              />
              <PremiumCard
                label="PILLAR 2"
                title="Proof trail"
                body="Each KPI links to source documents, extraction logic, and assumptions. No &quot;trust me&quot; reporting."
              />
              <PremiumCard
                label="PILLAR 3"
                title="Leverage"
                body="When you can prove drivers, carriers and vendors lose control of the narrative—and pricing gets real."
              />
              <PremiumCard
                label="PILLAR 4"
                title="Governance"
                body="Approvals, audit logs, and repeatable workflows—so decisions are controlled, not improvised."
              />
            </div>
          </Container>
        </section>

        {/* PERSONAS */}
        <section className="py-16 md:py-20">
          <Container>
            <div className="max-w-3xl">
              <SectionLabel>EXECUTIVE LENSES</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Built for CEOs, CFOs, COOs, CIOs, and CHROs.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">
                One system. One truth. Multiple decision paths—depending on who carries the risk.
              </p>
            </div>

            <div className="mt-8">
              <PersonaTabs />
            </div>
          </Container>
        </section>

        {/* ACTUARIAL ACCURACY */}
        <section className="py-16 md:py-20">
          <Container>
            <div className="max-w-3xl">
              <SectionLabel>ACTUARIAL GRADE</SectionLabel>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                &quot;Accuracy&quot; means defined, normalized, and provable.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75 md:text-base">
                Not vibes. Not screenshots. Not carrier summaries. Definitions + normalization + evidence—every time.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <PremiumCard
                label="KPI"
                title="Normalized PEPM"
                body="Cost per employee per month using consistent participant definitions across years—so trend is real."
              />
              <PremiumCard
                label="KPI"
                title="Participation trend"
                body="Beginning/end-year participation and shifts that materially change cost interpretation."
              />
              <PremiumCard
                label="KPI"
                title="Volatility signals"
                body="What's structural vs temporary—so you stop reacting to noise and start controlling risk."
              />
              <PremiumCard
                label="KPI"
                title="Plan design impact"
                body="Design changes mapped to financial outcomes—so &quot;strategy&quot; becomes measurable."
              />
              <PremiumCard
                label="KPI"
                title="Inconsistency flags"
                body="Contradictions across filings and reports surfaced automatically—before they hit the board."
              />
              <PremiumCard
                label="KPI"
                title="Proof trail"
                body="Each metric links to source documents, page ranges, extraction method, and assumptions."
              />
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 shadow-sm transition hover:bg-white/10"
              >
                {secondaryCta.label}
              </a>
              <a
                href={primaryCta.href}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:shadow-md"
              >
                {primaryCta.label}
              </a>
            </div>
          </Container>
        </section>

        {/* FOOTER CTA */}
        <section className="py-16 md:py-20">
          <Container>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10">
              <SectionLabel>FINAL</SectionLabel>
              <div className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Stop guessing. Start governing benefits like a financial system.
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75 md:text-base">
                If your benefits strategy depends on broker narratives, you&apos;re exposed. Kincaid IQ gives you the truth,
                the receipts, and the control system to act on it.
              </p>
              <CTAButtons />
            </div>
            <p className="mt-8 text-xs text-white/40">
              © {new Date().getFullYear()} Kincaid IQ. All rights reserved.
            </p>
          </Container>
        </section>
      </main>
    </>
  );
}