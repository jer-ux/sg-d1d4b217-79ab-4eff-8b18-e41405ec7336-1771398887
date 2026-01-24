import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";

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
          <ProofBar />
        </div>

        <CardGrid
          items={[
            { 
              title: "Diligence Proof Packs", 
              body: "Evidence receipts, methodology disclosure, and reconciliation outputs that reduce 'trust gaps.'" 
            },
            { 
              title: "Integration-Ready Workflows", 
              body: "Owner assignment, approvals, and closure loops—built for post-close execution, not slideware." 
            },
            { 
              title: "Realization Governance", 
              body: "At-risk decay logic, exception queues, and weekly/monthly reconciliation routines." 
            },
          ]}
        />

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="k-panel p-6">
            <div className="font-semibold">Diligence sprint</div>
            <div className="text-sm text-white/70 mt-2">
              Rapid signal extraction with proof standards: what's real, what's recoverable, what's speculation.
            </div>
          </div>
          <div className="k-panel p-6">
            <div className="font-semibold">Post-close value office</div>
            <div className="text-sm text-white/70 mt-2">
              Convert identified value into realized value, with owners, dates, and evidence-backed accountability.
            </div>
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}