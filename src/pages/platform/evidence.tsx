import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function EvidencePage() {
  return (
    <>
      <SEO title="Evidence Receipts — Kincaid IQ" description="Immutable proof of value with lineage, hashes, and confidence scores." />
      <Container>
        <PageHero
          title="Evidence Receipts"
          subtitle="Every decision backed by cryptographic proof. Trace lineage from source data to realized value."
        />
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Receipt Architecture</h2>
            <CardGrid
              items={[
                { title: "Lineage Tracking", body: "Direct links to source queries in Snowflake, Databricks, and ServiceNow." },
                { title: "Cryptographic Hash", body: "SHA-256 content hashing ensures data has not been tampered with." },
                { title: "Freshness Guarantees", body: "ISO-8601 duration tracking prevents stale data usage." },
                { title: "Confidence Scores", body: "ML-driven confidence metrics (0.0-1.0) for every automated insight." },
              ]}
            />
          </section>
        </div>
      </Container>
    </>
  );
}