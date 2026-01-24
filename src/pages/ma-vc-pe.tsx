import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";
import { Hero3D } from "@/components/Hero3D";

export default function Mavcpe() {
  return (
    <>
      <SEO
        title="M&A / VC / PE Diligence — Kincaid IQ"
        description="Find leakage. Prove it. Underwrite it. Then track realization with a ledger that survives integration reality."
      />
      <Container>
        <PageHero
          title="M&A / VC / PE Diligence"
          subtitle="Find leakage. Prove it. Underwrite it. Then track realization with a ledger that survives integration reality."
        />

        <div className="mb-8">
          <Hero3D />
        </div>

        <div className="mb-8">
          <ProofBar />
        </div>

        {/* Diligence Reality */}
        <div className="mb-12 k-panel p-8">
          <div className="text-2xl font-semibold mb-6 bg-gradient-to-r from-rose-400 to-orange-300 bg-clip-text text-transparent">
            Why most synergies evaporate
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-lg font-semibold text-rose-300 mb-3">Pre-close promises</div>
              <div className="text-sm text-white/70 space-y-2">
                <div>• Management team presents "$15M in cost synergies"</div>
                <div>• PowerPoint decks with high-level categories</div>
                <div>• No owners, no timelines, no evidence receipts</div>
                <div>• Deal model assumes 80% realization</div>
                <div>• Board approves based on "confidence"</div>
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold text-orange-300 mb-3">Post-close reality</div>
              <div className="text-sm text-white/70 space-y-2">
                <div>• 18 months later, CFO can't prove any realization</div>
                <div>• No ledger, no reconciliation, no accountability</div>
                <div>• Integration team disbanded, knowledge lost</div>
                <div>• Exit valuation drops $60M due to unproven synergies</div>
                <div>• LP confidence shattered, fund reputation damaged</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Services */}
        <CardGrid
          items={[
            { 
              title: "Diligence Proof Packs", 
              body: "Evidence receipts, methodology disclosure, and reconciliation outputs that reduce 'trust gaps.'",
              highlight: "2-4 week sprint"
            },
            { 
              title: "Integration-Ready Workflows", 
              body: "Owner assignment, approvals, and closure loops—built for post-close execution, not slideware.",
              highlight: "Day 1 ready"
            },
            { 
              title: "Realization Governance", 
              body: "At-risk decay logic, exception queues, and weekly/monthly reconciliation routines.",
              highlight: "87% realization"
            },
          ]}
        />

        {/* Engagement Phases */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="k-panel p-8">
            <div className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
              Diligence sprint (Pre-close)
            </div>
            <div className="text-white/70 mb-4">
              Rapid signal extraction with proof standards: what's real, what's recoverable, what's speculation.
            </div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>→ Evidence pack build (claims → receipts)</li>
              <li>→ Value leakage identification with cost breakdown</li>
              <li>→ At-risk assessment with probability weighting</li>
              <li>→ Integration readiness scoring</li>
            </ul>
            <div className="mt-6 text-xs text-white/50">
              Typical engagement: 2-4 weeks, $50K-$150K depending on deal complexity
            </div>
          </div>
          <div className="k-panel p-8">
            <div className="text-xl font-semibold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Post-close value office (Integration)
            </div>
            <div className="text-white/70 mb-4">
              Convert identified value into realized value, with owners, dates, and evidence-backed accountability.
            </div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>→ Value ledger setup with baseline reconciliation</li>
              <li>→ Owner assignment + approval workflow deployment</li>
              <li>→ Weekly realization tracking with variance analysis</li>
              <li>→ Quarterly board reporting with evidence packs</li>
            </ul>
            <div className="mt-6 text-xs text-white/50">
              Typical engagement: 90-180 days, retained or success-fee based
            </div>
          </div>
        </div>

        {/* Real PE Case */}
        <div className="mt-12 k-panel p-8">
          <div className="text-xl font-semibold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
            Real PE case: $18M synergies claimed → $7.4M proven
          </div>
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-xl border border-orange-500/30 bg-orange-500/5">
                <div className="text-3xl font-bold text-orange-300">$18M</div>
                <div className="text-xs text-white/60 mt-2">Claimed in diligence</div>
              </div>
              <div className="text-center p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                <div className="text-3xl font-bold text-emerald-300">$7.4M</div>
                <div className="text-xs text-white/60 mt-2">Proven & realized</div>
              </div>
              <div className="text-center p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/5">
                <div className="text-3xl font-bold text-cyan-300">$4.1M</div>
                <div className="text-xs text-white/60 mt-2">In-flight with timelines</div>
              </div>
            </div>
            <div className="text-sm text-white/70">
              <span className="text-white font-medium">The situation:</span> Mid-market PE firm acquired B2B SaaS company with $18M in 'cost synergies' identified. 
              Buyer's diligence team demanded proof before close. Seller had no evidence receipts, no owner assignment, no reconciliation framework.
            </div>
            <div className="text-sm text-white/70">
              <span className="text-white font-medium">Kincaid IQ intervention:</span> 90-day value office sprint. Built evidence packs for each synergy claim, 
              assigned owners with approval workflows, weekly reconciliation cadence, and controls monitoring. Separated proven ($7.4M), in-flight with timelines ($4.1M), 
              and speculation ($6.5M written off).
            </div>
            <div className="text-sm text-white/70">
              <span className="text-white font-medium">The outcome:</span> Exit closed at premium valuation because buyer had confidence in realization discipline. 
              Buyer adopted Kincaid IQ framework for their portfolio. Deal almost died due to synergy credibility gap—evidence receipts saved it.
            </div>
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}