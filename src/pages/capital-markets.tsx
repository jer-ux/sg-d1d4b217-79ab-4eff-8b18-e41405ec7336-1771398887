import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";
import { Hero3D } from "@/components/Hero3D";
import Link from "next/link";

const diligenceMetrics = [
  { label: "Diligence cycle reduction", value: "60%", color: "from-emerald-400 to-teal-300" },
  { label: "Value leakage identified", value: "$24M avg", color: "from-rose-400 to-orange-300" },
  { label: "Post-close realization", value: "87%", color: "from-violet-400 to-fuchsia-300" },
];

const investorBenefits = [
  {
    title: "Accelerate Diligence",
    body: "Evidence packs reduce time-to-truth by 60%. Pre-built reconciliation artifacts, data lineage, and exception queues eliminate debate.",
    icon: "⚡",
    color: "from-cyan-400 to-blue-300",
  },
  {
    title: "Underwrite Value with Confidence",
    body: "CFO-grade ledgers with cryptographic receipts, variance tracking, and audit trails. Know what's real before you close.",
    icon: "🎯",
    color: "from-violet-400 to-purple-300",
  },
  {
    title: "Ensure Post-Close Realization",
    body: "Owner-driven workflows, approval gates, and at-risk decay logic prevent value evaporation during integration.",
    icon: "✓",
    color: "from-emerald-400 to-green-300",
  },
];

export default function CapitalMarkets() {
  return (
    <>
      <SEO
        title="Capital Markets & Investors — Kincaid IQ"
        description="Reduce uncertainty. Underwrite value with evidence receipts, controlled ledgers, and repeatable realization discipline."
      />
      <Container>
        <PageHero
          title="Capital Markets & Investors"
          subtitle="Reduce uncertainty. Underwrite value with evidence receipts, controlled ledgers, and repeatable realization discipline."
        />

        <div className="mb-8">
          <Hero3D />
        </div>

        <div className="mb-8">
          <ProofBar />
        </div>

        {/* Diligence Metrics */}
        <div className="mb-12 grid md:grid-cols-3 gap-6">
          {diligenceMetrics.map((m) => (
            <div key={m.label} className="k-panel p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className={`text-4xl font-bold bg-gradient-to-r ${m.color} bg-clip-text text-transparent animate-fade-in`}>
                {m.value}
              </div>
              <div className="text-sm text-white/60 mt-3">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Investor Benefits */}
        <div className="mb-12">
          <div className="text-2xl font-semibold mb-8 text-center">
            Why Investors Choose <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Kincaid IQ</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {investorBenefits.map((b) => (
              <div key={b.title} className="k-panel p-8 hover:bg-white/5 transition-all duration-300">
                <div className="text-4xl mb-4">{b.icon}</div>
                <div className={`text-lg font-semibold bg-gradient-to-r ${b.color} bg-clip-text text-transparent mb-3`}>
                  {b.title}
                </div>
                <div className="text-sm text-white/70">{b.body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Real Investor Scenarios */}
        <div className="mb-12 k-panel p-8">
          <div className="text-xl font-semibold mb-6">
            <span className="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent">Real Scenarios:</span> How Kincaid IQ Protects Capital
          </div>
          
          <div className="space-y-6">
            <div className="border-l-4 border-rose-500 pl-6">
              <div className="font-semibold text-rose-300 mb-2">❌ Without Kincaid IQ</div>
              <div className="text-sm text-white/70">
                PE firm acquires SaaS company with "$8M in cost synergies" promised. 18 months later, CFO can't prove any realization. 
                Value evaporated. Exit valuation drops $40M. LP confidence shattered.
              </div>
            </div>

            <div className="border-l-4 border-emerald-500 pl-6">
              <div className="font-semibold text-emerald-300 mb-2">✓ With Kincaid IQ</div>
              <div className="text-sm text-white/70">
                Same scenario, but Kincaid IQ Value Office deployed on Day 1. Every synergy has an owner, evidence receipt, and weekly reconciliation. 
                $5.2M realized and proven. $1.8M at-risk flagged early with recovery plans. Exit closes at premium with buyer adopting the framework.
              </div>
            </div>
          </div>
        </div>

        {/* Engagement Models */}
        <CardGrid
          items={[
            {
              title: "Diligence Sprint",
              body: "2-4 week engagement to build evidence packs, validate claims, and surface leakage before you close the deal.",
              highlight: "60% faster",
            },
            {
              title: "Post-Close Value Office",
              body: "90-180 day integration support with owner assignment, reconciliation workflows, and realization tracking.",
              highlight: "87% realization",
            },
            {
              title: "Portfolio Governance",
              body: "Ongoing controls monitoring, quarterly evidence reviews, and audit-ready reporting across multiple holdings.",
              highlight: "Board-ready",
            },
          ]}
        />

        <div className="mt-12 k-panel p-8">
          <div className="font-semibold text-lg mb-3">Typical engagement shapes</div>
          <div className="grid md:grid-cols-4 gap-3 text-sm text-white/70">
            <div className="border border-cyan-500/30 rounded-xl bg-cyan-500/5 p-4 hover:bg-cyan-500/10 transition">
              <div className="text-cyan-300 font-medium mb-1">Pre-LOI</div>
              <div className="text-xs">Initial signal extraction</div>
            </div>
            <div className="border border-violet-500/30 rounded-xl bg-violet-500/5 p-4 hover:bg-violet-500/10 transition">
              <div className="text-violet-300 font-medium mb-1">Diligence</div>
              <div className="text-xs">Evidence pack build</div>
            </div>
            <div className="border border-emerald-500/30 rounded-xl bg-emerald-500/5 p-4 hover:bg-emerald-500/10 transition">
              <div className="text-emerald-300 font-medium mb-1">Post-Close</div>
              <div className="text-xs">Value office setup</div>
            </div>
            <div className="border border-amber-500/30 rounded-xl bg-amber-500/5 p-4 hover:bg-amber-500/10 transition">
              <div className="text-amber-300 font-medium mb-1">Exit Prep</div>
              <div className="text-xs">Defensible reporting</div>
            </div>
          </div>
        </div>

        {/* CTA for Investors */}
        <div className="mt-12 k-panel p-10 text-center">
          <div className="text-2xl font-semibold mb-4">
            Ready to <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">de-risk your next deal?</span>
          </div>
          <div className="text-white/70 mb-6 max-w-2xl mx-auto">
            Get access to our investor evidence pack template, diligence playbook, and post-close value office framework.
          </div>
          <div className="flex gap-3 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-medium hover:from-emerald-600 hover:to-cyan-600 transition"
            >
              Request investor access
            </Link>
            <Link
              href="/case-studies"
              className="px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              View case studies
            </Link>
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}