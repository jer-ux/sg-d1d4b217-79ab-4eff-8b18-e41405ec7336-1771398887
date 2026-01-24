import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";

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
          <ProofBar />
        </div>

        <CardGrid
          items={[
            { 
              title: "Governance-Grade Reporting", 
              body: "Board-safe reporting cadence with evidence packs, ledger movements, and exceptions surfaced early." 
            },
            { 
              title: "Vendor + Cost Opacity", 
              body: "Identify leakage, prove it, assign owners, and track closure with reconciliation discipline." 
            },
            { 
              title: "Risk and Controls", 
              body: "Controls monitoring, access boundaries, and audit trails that scale across holdings and teams." 
            },
          ]}
        />

        <div className="mt-8 k-panel p-6">
          <div className="font-semibold">Why families need this</div>
          <div className="text-sm text-white/70 mt-2">
            Holdings complexity explodes faster than internal capacity. Evidence-led oversight prevents fire drills and keeps governance posture defensible.
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}