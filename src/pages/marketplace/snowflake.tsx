import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";

export default function SnowflakeMarketplace() {
  return (
    <>
      <SEO
        title="Snowflake Marketplace Practice — Kincaid IQ"
        description="Snowflake-native patterns for decision systems with controlled lineage, evidence receipts, and ledger outputs."
      />
      <Container>
        <PageHero
          title="Snowflake Marketplace Practice"
          subtitle="Snowflake-native patterns for decision systems: controlled lineage, evidence receipts, and ledger outputs delivered with marketplace-grade packaging."
        />

        <div className="mb-8">
          <ProofBar />
        </div>

        <CardGrid
          items={[
            { 
              title: "Snowflake-Native Architecture", 
              body: "Stages, pipelines, dynamic tables, and deterministic transforms built to be repeatable and auditable." 
            },
            { 
              title: "Data App Packaging", 
              body: "Opinionated product packaging: onboarding, governance defaults, and proof-first outputs that pass CFO review." 
            },
            { 
              title: "Value Ledger Outputs", 
              body: "Ledger states and evidence packs designed for reconciliation, not just analytics consumption." 
            },
          ]}
        />

        <div className="mt-8 k-panel p-6">
          <div className="font-semibold">Ideal buyer outcomes</div>
          <div className="text-sm text-white/70 mt-2">
            Faster procurement, less delivery variance, and measurable, reconciled value with proof patterns baked in.
          </div>
          <div className="mt-4 grid md:grid-cols-3 gap-3 text-sm text-white/70">
            <div className="border border-white/10 rounded-xl bg-white/5 p-4">Evidence-led onboarding</div>
            <div className="border border-white/10 rounded-xl bg-white/5 p-4">Deterministic KPI + lineage</div>
            <div className="border border-white/10 rounded-xl bg-white/5 p-4">Ledger + reconciliation</div>
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}