import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";

function MarketplaceTile({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <div className="k-panel p-6">
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-white/70 mt-2">{body}</div>
      <div className="mt-4">
        <Link href={href} className="inline-flex px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm">
          View detail
        </Link>
      </div>
    </div>
  );
}

export default function Marketplace() {
  return (
    <>
      <SEO
        title="Marketplace Practice — Kincaid IQ"
        description="Build once. Distribute through Snowflake, Databricks, and ServiceNow-aligned delivery motions—high trust, low delivery drag."
      />
      <Container>
        <PageHero
          title="Marketplace Practice"
          subtitle="Build once. Distribute through Snowflake, Databricks, and ServiceNow-aligned delivery motions—high trust, low delivery drag."
        />

        <div className="mb-8">
          <ProofBar />
        </div>

        <CardGrid
          items={[
            { title: "Productized Delivery", body: "Repeatable packaging, deployment patterns, and governance primitives that reduce implementation variance." },
            { title: "Distribution Advantage", body: "Marketplaces shorten procurement paths and anchor buyer trust when proof and controls are embedded." },
            { title: "High-GM Operating Model", body: "Configuration over custom work. Evidence receipts and ledger outputs become standardized deliverables." },
          ]}
        />

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <MarketplaceTile
            title="Snowflake Marketplace"
            body="Snowflake-native data apps, evidence-ledgers, and deterministic governance patterns."
            href="/marketplace/snowflake"
          />
          <MarketplaceTile
            title="Databricks Marketplace"
            body="Lakehouse + agent pipelines with controlled lineage, measurement, and scale-ready patterns."
            href="/marketplace/databricks"
          />
          <MarketplaceTile
            title="ServiceNow Practice"
            body="Workflow and approvals layer: actionability, assignment, closure, and audit trail."
            href="/marketplace/servicenow"
          />
        </div>

        <CTA />
      </Container>
    </>
  );
}