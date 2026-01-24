import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";

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
          <ProofBar />
        </div>

        <CardGrid
          items={[
            { 
              title: "Diligence Acceleration", 
              body: "Evidence packs and reconciliation artifacts that reduce time-to-truth and stabilize investment narratives." 
            },
            { 
              title: "Value Realization Discipline", 
              body: "Ledger states and owner-driven workflows to ensure value doesn't evaporate post-close." 
            },
            { 
              title: "Governance Posture", 
              body: "Controls-first design that withstands audit, board scrutiny, and integration complexity." 
            },
          ]}
        />

        <div className="mt-8 k-panel p-6">
          <div className="font-semibold">Typical engagement shapes</div>
          <div className="mt-3 grid md:grid-cols-3 gap-3 text-sm text-white/70">
            <div className="border border-white/10 rounded-xl bg-white/5 p-4">Diligence sprint</div>
            <div className="border border-white/10 rounded-xl bg-white/5 p-4">Post-close realization</div>
            <div className="border border-white/10 rounded-xl bg-white/5 p-4">Marketplace packaging</div>
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}