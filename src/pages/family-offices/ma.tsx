import Link from "next/link";
import FamilyOfficesShell from "@/components/family-offices/FamilyOfficesShell";

function Section(props: { title: string; desc: string; bullets: string[] }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-lg font-semibold text-white/90">{props.title}</div>
      <div className="mt-2 text-sm text-white/70">{props.desc}</div>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {props.bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MASupport() {
  return (
    <FamilyOfficesShell
      backHref="/family-offices"
      backLabel="Back to Family Offices"
      title="Diligence & Integration Risk for Family Office M&A"
      subtitle="Family offices acquiring businesses or divesting assets need independent validation that surfaces integration risks before they become permanent. Kincaid provides buy-side and sell-side diligence with governance-grade documentation and board-ready risk analysis."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section
          title="Buy-Side Diligence"
          desc="Independent validation before acquisition—financial, operational, and governance risk assessment."
          bullets={[
            "Quality of earnings: Revenue sustainability, margin defensibility, working capital reality",
            "Operational assessment: People, processes, systems, and customer relationships",
            "Integration complexity: Cultural fit, technology stack compatibility, regulatory hurdles",
            "Hidden liabilities: Legal exposure, compliance gaps, contractual obligations",
            "Synergy realism: Evidence-based analysis of cost savings and revenue opportunities",
          ]}
        />
        <Section
          title="Sell-Side Diligence"
          desc="Pre-transaction preparation and buyer-ready documentation for family offices divesting assets."
          bullets={[
            "Readiness assessment: Identify and remediate issues before buyer diligence begins",
            "Data room preparation: Organized, complete documentation that accelerates buyer confidence",
            "Carve-out complexity: Financial statement separation, IT infrastructure, shared services",
            "Management presentation: Independent validation of seller-prepared materials",
            "Risk disclosure: Proactive identification and explanation of known issues",
          ]}
        />
      </div>

      <div className="mt-4 rounded-3xl border border-white/10 bg-black/40 p-6">
        <div className="text-lg font-semibold text-white/90">Integration Risk Assessment</div>
        <div className="mt-2 text-sm text-white/70">
          Most M&A value destruction happens post-close. We map integration complexity before it becomes irreversible.
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "People & Culture", b: ["Leadership continuity", "Talent retention risk", "Cultural compatibility", "Compensation alignment"] },
            { t: "Systems & Data", b: ["Technology stack gaps", "Data migration complexity", "Cybersecurity posture", "IT debt quantification"] },
            { t: "Operations", b: ["Process standardization", "Supply chain dependencies", "Customer transition risk", "Vendor contract transfers"] },
            { t: "Governance", b: ["Board structure transition", "Decision authority mapping", "Regulatory compliance", "Audit and control systems"] },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white/90">{x.t}</div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {x.b.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section
          title="Post-Close Transition Support"
          desc="The first 100 days determine long-term success. We provide independent monitoring and board reporting during critical transition periods."
          bullets={[
            "Integration tracking: KPI monitoring against plan assumptions",
            "Risk escalation: Early warning systems for deviations and delays",
            "Board reporting: Independent status updates and governance documentation",
            "Decision support: Evidence-based recommendations for course corrections",
          ]}
        />
        <Section
          title="Cross-Border Complexity"
          desc="For international family offices navigating multi-jurisdictional transactions."
          bullets={[
            "Regulatory mapping: Cross-border compliance and approval requirements",
            "Tax structuring: Independent validation of advisor recommendations",
            "Currency & treasury: FX risk and capital repatriation analysis",
            "Local partnerships: Coordination with regional legal and financial advisors",
          ]}
        />
      </div>

      <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-lg font-semibold text-white/90">Our M&A Philosophy</div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            {
              t: "Integration Risk > Deal Terms",
              d: "The best deal structure can't save a flawed integration plan. We prioritize post-close execution over purchase price negotiation.",
            },
            {
              t: "Evidence Over Narrative",
              d: "Management presentations are starting points, not endpoints. We validate claims with independent data and customer interviews.",
            },
            {
              t: "Governance from Day One",
              d: "Post-close success requires clarity on decision rights, approval authorities, and escalation paths—designed before closing.",
            },
            {
              t: "No Transaction Incentives",
              d: "We're paid for analysis quality, not deal completion. Our incentive is accuracy, not transaction volume.",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <div className="text-sm font-semibold text-white/90">{x.t}</div>
              <div className="mt-2 text-sm text-white/70">{x.d}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-lg font-semibold text-white/90">Typical Engagement Timeline</div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          {[
            { n: "1", t: "Week 1–2", d: "Initial data room review, management interviews, preliminary risk identification" },
            { n: "2", t: "Week 3–4", d: "Deep-dive analysis, independent validation, integration complexity assessment" },
            { n: "3", t: "Week 5–6", d: "Final report preparation, board presentation, deal recommendations" },
            { n: "4", t: "Post-Close", d: "Optional: 100-day integration monitoring and board reporting" },
          ].map((x) => (
            <div key={x.n} className="rounded-2xl border border-white/10 bg-black/40 p-5">
              <div className="text-xs tracking-[0.2em] text-white/50">{x.n}</div>
              <div className="mt-2 text-sm font-semibold text-white/90">{x.t}</div>
              <div className="mt-2 text-sm text-white/70">{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </FamilyOfficesShell>
  );
}