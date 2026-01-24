import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";
import { Hero3D } from "@/components/Hero3D";

export default function FamilyOffices() {
  return (
    <>
      <SEO
        title="Family Offices — Kincaid IQ"
        description="A clarity engine for complex holdings, vendor ecosystems, and operational cost structures—built for oversight and decision confidence."
      />
      <Container>
        <PageHero
          title="Family Offices"
          subtitle="A clarity engine for complex holdings, vendor ecosystems, and operational cost structures—built for oversight and decision confidence."
        />

        <div className="mb-8">
          <Hero3D />
        </div>

        <div className="mb-8">
          <ProofBar />
        </div>

        {/* Family Office Challenges */}
        <div className="mb-12 k-panel p-8">
          <div className="text-2xl font-semibold mb-6 bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">
            The family office complexity trap
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-l-4 border-orange-500 pl-6">
              <div className="font-semibold text-orange-300 mb-2">Holdings Sprawl</div>
              <div className="text-sm text-white/70">
                Real estate, operating companies, investments, foundations — each with its own vendors, costs, and reporting standards. Consolidation is a nightmare.
              </div>
            </div>
            <div className="border-l-4 border-rose-500 pl-6">
              <div className="font-semibold text-rose-300 mb-2">Vendor Opacity</div>
              <div className="text-sm text-white/70">
                Wealth managers, tax advisors, property managers, consultants — everyone claims value, nobody proves it. Fees compound while outcomes evaporate.
              </div>
            </div>
            <div className="border-l-4 border-amber-500 pl-6">
              <div className="font-semibold text-amber-300 mb-2">Governance Risk</div>
              <div className="text-sm text-white/70">
                Multi-generational transitions require audit trails, but legacy systems can't produce them. Compliance becomes a crisis during transitions.
              </div>
            </div>
          </div>
        </div>

        {/* Core Capabilities */}
        <CardGrid
          items={[
            { 
              title: "Governance-Grade Reporting", 
              body: "Board-safe reporting cadence with evidence packs, ledger movements, and exceptions surfaced early.",
              highlight: "Family board ready"
            },
            { 
              title: "Vendor + Cost Opacity", 
              body: "Identify leakage, prove it, assign owners, and track closure with reconciliation discipline.",
              highlight: "Fee transparency"
            },
            { 
              title: "Risk and Controls", 
              body: "Controls monitoring, access boundaries, and audit trails that scale across holdings and teams.",
              highlight: "Multi-entity support"
            },
          ]}
        />

        {/* Real Scenario */}
        <div className="mt-12 k-panel p-8">
          <div className="text-xl font-semibold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent">
            Real family office scenario
          </div>
          <div className="space-y-6">
            <div className="border-l-4 border-rose-500 pl-6">
              <div className="font-semibold text-rose-300 mb-2">The Problem</div>
              <div className="text-sm text-white/70">
                Multi-generational family office with $400M+ AUM across 12 operating entities, 8 properties, and 30+ advisors. 
                Matriarch transitioning governance to next generation. No unified ledger. No audit trails. $2.8M in annual advisor fees with zero proof of value. 
                Succession planning stalled due to opacity.
              </div>
            </div>
            <div className="border-l-4 border-emerald-500 pl-6">
              <div className="font-semibold text-emerald-300 mb-2">The Solution</div>
              <div className="text-sm text-white/70">
                90-day Kincaid IQ implementation: Unified value ledger across all entities, vendor evidence packs, governance framework with approval gates, 
                and family board reporting templates. Every dollar tracked with owner assignment and quarterly reconciliation.
              </div>
            </div>
            <div className="border-l-4 border-cyan-500 pl-6">
              <div className="font-semibold text-cyan-300 mb-2">The Outcome</div>
              <div className="text-sm text-white/70">
                Identified $840K in duplicate vendor costs and unverifiable advisor fees. Consolidated to 18 advisors with evidence-based value propositions. 
                Governance transition completed with full audit trail. Next generation has confidence and controls. Family board meetings now data-driven, not opinion-driven.
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 k-panel p-8">
          <div className="text-xl font-semibold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Why families need this
          </div>
          <div className="text-white/70 mb-6">
            Holdings complexity explodes faster than internal capacity. Evidence-led oversight prevents fire drills and keeps governance posture defensible during transitions, audits, and multi-generational planning.
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-white/60">
            <div>→ Succession planning requires audit-ready documentation</div>
            <div>→ Tax efficiency depends on defensible cost allocation</div>
            <div>→ Vendor consolidation needs evidence of redundancy</div>
            <div>→ Fiduciary duty demands proof of value stewardship</div>
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}