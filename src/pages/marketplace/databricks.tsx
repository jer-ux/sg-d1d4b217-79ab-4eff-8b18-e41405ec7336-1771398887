import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";

export default function DatabricksMarketplace() {
  return (
    <>
      <SEO
        title="Databricks Marketplace Practice — Kincaid IQ"
        description="Lakehouse-aligned decision systems with pipeline discipline, measurement, and controlled agent workflows."
      />
      <Container>
        <PageHero
          title="Databricks Marketplace Practice"
          subtitle="Lakehouse-aligned decision systems: pipeline discipline, measurement, and controlled agent workflows with governance-first delivery."
        />

        <div className="mb-8">
          <ProofBar />
        </div>

        <CardGrid
          items={[
            { 
              title: "Lakehouse Patterns", 
              body: "Bronze/silver/gold-style discipline with evidence receipts and replayable transformations." 
            },
            { 
              title: "Agent Pipelines", 
              body: "Agent workflows are measured and governed: approvals, telemetry, exception handling, and drift controls." 
            },
            { 
              title: "Marketplace Packaging", 
              body: "Standardized deliverables that reduce services drag while preserving auditability and trust." 
            },
          ]}
        />

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="k-panel p-6">
            <div className="font-semibold">Where it wins</div>
            <ul className="mt-3 text-sm text-white/70 list-disc pl-5 space-y-2">
              <li>High-volume pipelines needing strong lineage</li>
              <li>ML/agent initiatives needing governance to scale</li>
              <li>Repeatable delivery to improve GM and reduce cycle time</li>
            </ul>
          </div>
          <div className="k-panel p-6">
            <div className="font-semibold">What we standardize</div>
            <ul className="mt-3 text-sm text-white/70 list-disc pl-5 space-y-2">
              <li>Evidence receipts and transform versioning</li>
              <li>Controls checks and exception queues</li>
              <li>Board-ready reporting artifacts</li>
            </ul>
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}