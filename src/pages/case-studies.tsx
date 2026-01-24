import { SEO } from "@/components/SEO";
import { Container, PageHero, CTA } from "@/components/Blocks";
import { Hero3D } from "@/components/Hero3D";
import Link from "next/link";

const cases = [
  {
    title: "Global Healthcare System: $47M → $11M Reality Check",
    company: "Fortune 500 Healthcare",
    challenge: "PBM promised $47M in rebate optimization and formulary savings over 3 years. Zero evidence receipts. No reconciliation framework.",
    solution: "Deployed Verified Savings Ledger with pharmacy claims integration, rebate tracking, and monthly reconciliation workflows.",
    outcome: "$11.2M actually realized and defended. CFO killed renewal. Kincaid IQ evidence pack prevented $36M writeoff in audit.",
    metrics: [
      { label: "Claimed savings", value: "$47M", color: "text-orange-400" },
      { label: "Realized & proven", value: "$11.2M", color: "text-emerald-400" },
      { label: "Audit risk avoided", value: "$36M", color: "text-rose-400" },
    ],
    tags: ["Evidence Receipts", "CFO Defense", "Audit Trail"],
  },
  {
    title: "PE Portfolio: Exit Diligence Saved with Value Office",
    company: "Mid-Market PE Firm",
    challenge: "$18M in 'cost synergies' claimed post-acquisition. Buyer's diligence team demanded proof. No ledger, no owners, no reconciliation.",
    solution: "90-day value office sprint: evidence packs, owner assignment, weekly reconciliation, controls monitoring.",
    outcome: "Proved $7.4M realized, $4.1M in-flight with clear timelines. Exit closed at premium valuation. Buyer adopted Kincaid IQ framework.",
    metrics: [
      { label: "Claimed synergies", value: "$18M", color: "text-orange-400" },
      { label: "Proven realized", value: "$7.4M", color: "text-emerald-400" },
      { label: "In-flight (tracked)", value: "$4.1M", color: "text-cyan-400" },
    ],
    tags: ["Diligence Sprint", "Value Office", "Exit Ready"],
  },
  {
    title: "Enterprise AI Transformation: 200 'Opportunities' to 12 Controlled Agents",
    company: "Fortune 1000 Financial Services",
    challenge: "CIO committed to 'AI transformation' with 200+ identified use cases. No policy, no controls, no measurement. Board demanded governance.",
    solution: "12-month agentic adoption policy: 3 controlled pilots with approval gates, exception monitoring, and ROI measurement.",
    outcome: "12 agents deployed with controls. $3.2M verified productivity gain. Zero governance incidents. Board approved scale plan.",
    metrics: [
      { label: "Initial 'opportunities'", value: "200+", color: "text-orange-400" },
      { label: "Controlled deployments", value: "12", color: "text-emerald-400" },
      { label: "Measured ROI", value: "$3.2M", color: "text-violet-400" },
    ],
    tags: ["Agentic Policy", "Controls Framework", "Board Governance"],
  },
  {
    title: "Snowflake Marketplace: From Services to Productized Delivery",
    company: "Data Analytics Consultancy",
    challenge: "High-margin services model but inconsistent delivery, long sales cycles, and limited scalability through cloud marketplaces.",
    solution: "Marketplace-native packaging: decision systems as Snowflake Native Apps with templated evidence packs and automated value tracking.",
    outcome: "3x faster deal cycles. 40% gross margin improvement. Snowflake co-sell momentum. Repeatable delivery motion.",
    metrics: [
      { label: "Deal cycle reduction", value: "3x faster", color: "text-cyan-400" },
      { label: "Margin improvement", value: "+40%", color: "text-emerald-400" },
      { label: "Co-sell pipeline", value: "$12M", color: "text-violet-400" },
    ],
    tags: ["Marketplace GTM", "Productized Delivery", "Co-Sell"],
  },
];

export default function CaseStudies() {
  return (
    <>
      <SEO
        title="Case Studies — Kincaid IQ"
        description="Real proof patterns: Evidence receipts, reconciliation artifacts, and realized outcomes. No hype, just decision-grade narratives."
      />
      <Container>
        <PageHero
          title="Case Studies"
          subtitle="Real proof patterns. No hype. Decision-grade narratives with evidence receipts, reconciliation artifacts, and realized outcomes."
        />

        <div className="mb-8">
          <Hero3D />
        </div>

        {/* Case Study Cards */}
        <div className="space-y-8">
          {cases.map((c, idx) => (
            <div key={c.title} className="k-panel p-8 hover:bg-white/5 transition-all duration-300">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient">
                    {c.title}
                  </div>
                  <div className="text-sm text-white/50 mt-1">{c.company}</div>
                </div>
                <div className="text-xs px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  Case #{idx + 1}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <div className="text-xs font-semibold text-rose-400 mb-2">CHALLENGE</div>
                  <div className="text-sm text-white/70">{c.challenge}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-violet-400 mb-2">SOLUTION</div>
                  <div className="text-sm text-white/70">{c.solution}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-emerald-400 mb-2">OUTCOME</div>
                  <div className="text-sm text-white/70">{c.outcome}</div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-black/30 border border-white/5">
                {c.metrics.map((m) => (
                  <div key={m.label} className="text-center">
                    <div className={`text-2xl font-bold ${m.color} animate-fade-in`}>
                      {m.value}
                    </div>
                    <div className="text-xs text-white/50 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 transition"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Evidence Pack CTA */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="k-panel p-8">
            <div className="text-lg font-semibold bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
              Want the full evidence pack?
            </div>
            <div className="text-sm text-white/70 mt-3">
              We provide detailed proof narratives with:
            </div>
            <ul className="mt-3 text-sm text-white/60 space-y-2">
              <li>• Evidence receipts and data lineage</li>
              <li>• Reconciliation artifacts and variance analysis</li>
              <li>• Control framework and exception logs</li>
              <li>• Board-ready executive summary</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-medium hover:from-violet-600 hover:to-fuchsia-600 transition"
              >
                Request evidence pack
              </Link>
            </div>
          </div>

          <div className="k-panel p-8">
            <div className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Building your own case study?
            </div>
            <div className="text-sm text-white/70 mt-3">
              Start with our decision-grade framework:
            </div>
            <ul className="mt-3 text-sm text-white/60 space-y-2">
              <li>• Evidence receipts standard</li>
              <li>• Verified Savings Ledger setup</li>
              <li>• Controls monitoring framework</li>
              <li>• Reconciliation workflow templates</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/platform"
                className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:from-emerald-600 hover:to-teal-600 transition"
              >
                Explore platform
              </Link>
            </div>
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}