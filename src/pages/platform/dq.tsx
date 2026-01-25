import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function DQPage() {
  return (
    <>
      <SEO title="DQ + Deterministic Replay — Kincaid IQ" description="Data quality gates and deterministic replay for audit readiness." />
      <Container>
        <PageHero
          title="DQ & Replay"
          subtitle="Ensure data quality with automated gates and deterministic replay capabilities for audit defense."
        />
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Quality Controls</h2>
            <CardGrid
              items={[
                { title: "DQ Gates", body: "Block pipelines automatically when null rates or schema drift exceed thresholds." },
                { title: "Deterministic Replay", body: "Re-run historical logic against time-travelled data snapshots." },
                { title: "Drift Detection", body: "Monitor distribution shifts in key value drivers (rebates, costs)." },
                { title: "Schema Enforcement", body: "Strict contract testing between ingestion and consumption layers." },
              ]}
            />
          </section>
        </div>
      </Container>
    </>
  );
}