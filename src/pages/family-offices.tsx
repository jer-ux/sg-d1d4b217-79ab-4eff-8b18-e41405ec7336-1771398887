import FamilyOfficesShell from "@/components/family-offices/FamilyOfficesShell";
import { Card } from "@/components/family-offices/Card";

function Pillar({
  label,
  value,
  desc,
}: {
  label: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
      <div className="text-[11px] tracking-[0.2em] text-white/50">{label}</div>
      <div className="mt-2 text-sm font-semibold text-white/90">{value}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/70">{desc}</div>
    </div>
  );
}

export default function FamilyOfficesPage() {
  return (
    <FamilyOfficesShell
      title="How We Serve Family Offices"
      eyebrow="LOCAL • INTERNATIONAL • SOVEREIGN-ADJACENT"
      subtitle="Governance-grade decision intelligence for family offices—evidence-first analysis, board-ready artifacts, and defensible oversight."
    >
      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/70">
        Family offices operate differently. Capital is permanent. Reputation is
        inherited. Decisions must hold up over decades—not quarters. Kincaid
        Risk Management Consultants strengthens fiduciary judgment with
        evidence, governance, and defensibility.
      </p>

      {/* QUICK PILLARS */}
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Pillar
          label="POSITIONING"
          value="Independent, conflict-free"
          desc="No placement fees. No conflicted incentives. Governance comes first."
        />
        <Pillar
          label="METHOD"
          value="Evidence-first decisioning"
          desc="Traceable sources, clear limitations, and audit-ready outputs."
        />
        <Pillar
          label="OUTPUT"
          value="Board / council-ready artifacts"
          desc="Clarity on scenarios, trade-offs, and defensible recommendations."
        />
      </div>

      {/* CORE SECTIONS */}
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card
          title="Governance & Decision Intelligence"
          desc="Independent, conflict-free analysis and board/council-ready decision artifacts. No black boxes. No automated decisions."
          bullets={[
            "Evidence-first analysis across finance, ops, workforce, IT, and contracts",
            "Scenario framing & trade-off clarity",
            "Fiduciary documentation and audit-ready outputs",
          ]}
        />

        <Card
          title="Venture Capital Support"
          desc="For direct investing, venture studios, and strategic minority stakes—diligence and governance without chasing deal flow."
          bullets={[
            "Pre-investment diligence (financial, operational, governance risk)",
            "Portfolio KPI systems for long-horizon oversight",
            "Independent validation of management claims",
          ]}
          href="/venture-capital-support"
          ctaLabel="Venture Capital Support"
        />

        <Card
          title="M&A Support"
          desc="Buy-side and sell-side diligence with integration-risk realism—so issues surface before they become permanent."
          bullets={[
            "Buy-side & sell-side diligence",
            "Governance and integration risk assessment",
            "Board reporting during transition periods",
          ]}
          href="/m-a-support"
          ctaLabel="M&A Support"
        />
      </div>

      {/* REACH */}
      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-xs tracking-[0.2em] text-white/50">
            LOCAL & INTERNATIONAL REACH
          </div>
          <h2 className="mt-3 text-xl font-semibold text-white/90">
            Local & International Reach
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Built for long-horizon capital environments—where governance needs
            to survive scrutiny, transitions, and time.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <div className="text-sm font-semibold text-white/90">
                United States
              </div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
                  <span>Middle-market family offices</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
                  <span>
                    Healthcare, technology, real estate, infrastructure exposure
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
                  <span>Regulatory and fiduciary complexity</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <div className="text-sm font-semibold text-white/90">
                International & Gulf
              </div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
                  <span>Multi-generational governance structures</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
                  <span>Sovereign-adjacent capital environments</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
                  <span>Cross-border entities and long-horizon assets</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* WHY */}
        <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-black/40 p-6">
          <h2 className="text-xl font-semibold text-white/90">
            Why Family Offices Work With Kincaid
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              {
                t: "Independent",
                d: "No placement fees. No conflicted incentives.",
              },
              {
                t: "Evidence-first",
                d: "Traceable sources, clear limitations.",
              },
              {
                t: "Governance-grade",
                d: "Built for boards, councils, and regulators.",
              },
              {
                t: "Global credibility",
                d: "Local execution, international posture.",
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-sm font-semibold text-white/90">{x.t}</div>
                <div className="mt-2 text-sm text-white/70">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold text-white/90">
              Philosophy
            </div>
            <div className="mt-2 text-sm leading-relaxed text-white/70">
              Technology should illuminate judgment, not replace it. Capital
              stewardship demands evidence, humility, and accountability.
            </div>
          </div>
        </div>
      </div>
    </FamilyOfficesShell>
  );
}