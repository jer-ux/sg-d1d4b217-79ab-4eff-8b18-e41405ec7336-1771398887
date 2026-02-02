import Link from "next/link";
import FamilyOfficesShell from "@/components/family-offices/FamilyOfficesShell";

function BulletBlock(props: { title: string; desc: string; bullets: string[] }) {
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

export default function VentureCapitalSupport() {
  return (
    <FamilyOfficesShell
      backHref="/family-offices"
      backLabel="Back to Family Offices"
      title="Diligence & Governance for Direct Venture Investing"
      subtitle="Family offices investing directly in venture-stage companies need independent validation, portfolio oversight systems, and governance frameworks that don't depend on fund managers or syndicate leads. Kincaid provides conflict-free analysis and board-ready artifacts without chasing deal flow."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <BulletBlock
          title="Pre-Investment Diligence"
          desc="Independent validation before capital commits—financial, operational, and governance risk assessment."
          bullets={[
            "Financial forensics: Revenue quality, burn analysis, capital efficiency metrics",
            "Operational reality check: Team capability, product-market fit evidence, execution track record",
            "Governance structure: Board composition, decision rights, founder control dynamics",
            "Risk mapping: Regulatory exposure, IP ownership, customer concentration",
            "Management claims validation: Independent verification of growth projections and market positioning",
          ]}
        />

        <BulletBlock
          title="Portfolio Oversight Systems"
          desc="Long-horizon KPI frameworks that track what matters—not just what founders want to report."
          bullets={[
            "Standardized metrics: Consistent KPI definitions across portfolio companies",
            "Early warning signals: Leading indicators of burn risk, customer churn, or market misalignment",
            "Governance tracking: Board meeting quality, decision documentation, fiduciary compliance",
            "Quarterly validation: Independent review of management-reported data",
            "Exit readiness: Continuous assessment of strategic options and valuation defensibility",
          ]}
        />
      </div>

      <div className="mt-4 rounded-3xl border border-white/10 bg-black/40 p-6">
        <div className="text-lg font-semibold text-white/90">Board & Council Representation</div>
        <div className="mt-2 text-sm text-white/70">
          For family offices taking board seats or observer roles, Kincaid provides independent preparation,
          governance documentation, and fiduciary risk analysis.
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            {
              t: "Pre-Board Preparation",
              b: ["Material review and risk flagging", "Independent data validation", "Question frameworks for management"],
            },
            {
              t: "Meeting Documentation",
              b: ["Decision audit trails", "Fiduciary record-keeping", "Governance compliance tracking"],
            },
            {
              t: "Risk Monitoring",
              b: ["Conflict identification", "Regulatory exposure assessment", "Exit scenario planning"],
            },
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
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white/90">What We Don&apos;t Do</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {[
              "Deal sourcing: We don't chase deal flow or take finder's fees",
              "Fund management: We don't manage venture funds or SPVs",
              "Investment banking: We don't structure transactions or broker deals",
              "Placement services: No commissions or success fees—ever",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-semibold text-white/90">Why Independence Matters</div>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {[
              "No conflicts: Fee-only structure with zero financial incentive to recommend any deal",
              "Objective analysis: Evidence-first methodology that challenges narratives",
              "Fiduciary alignment: Our reputation depends on accuracy, not transaction volume",
              "Long-term thinking: Built for multi-decade capital stewardship",
            ].map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35" />
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="text-lg font-semibold text-white/90">Typical Engagement Model</div>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            {
              n: "1",
              t: "Discovery & Scoping",
              d: "Understand your investment thesis, portfolio structure, and governance requirements",
            },
            { n: "2", t: "Diligence Framework", d: "Custom frameworks for your risk tolerance and investment strategy" },
            { n: "3", t: "Ongoing Support", d: "Portfolio monitoring, board preparation, and governance tracking" },
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