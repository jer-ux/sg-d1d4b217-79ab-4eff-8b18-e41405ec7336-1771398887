import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function PlatformPage() {
  return (
    <>
      <SEO
        title="Platform — Kincaid IQ"
        description="Evidence-based decision systems with controls monitoring, value ledger, and marketplace delivery."
      />
      <Container>
        <PageHero
          title="Platform Overview"
          subtitle="Evidence receipts, CFO-grade value ledger, and marketplace-native delivery across Snowflake, Databricks, and ServiceNow."
        />

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Core Capabilities</h2>
          <CardGrid
            items={[
              {
                title: "Evidence Receipts",
                body: "Every decision backed by immutable proof. Track what changed, who approved it, and the verified impact.",
              },
              {
                title: "CFO-Grade Ledger",
                body: "Auditable value tracking with controls monitoring and variance analysis built in.",
              },
              {
                title: "Marketplace Delivery",
                body: "Native integrations across Snowflake, Databricks, and ServiceNow with automated workflows.",
              },
              {
                title: "Controls Monitoring",
                body: "Real-time oversight of operational and financial controls with automated alerting.",
              },
              {
                title: "Variance Analysis",
                body: "Identify deviations from expected outcomes and trace them to root causes.",
              },
              {
                title: "Action Workflows",
                body: "Automated workflows that turn insights into executable actions across your stack.",
              },
            ]}
          />
        </section>

        <section className="mb-16">
          <div className="k-panel p-8">
            <h2 className="text-2xl font-semibold mb-4">Built for Enterprise Scale</h2>
            <div className="text-white/70 space-y-3">
              <p>
                Kincaid IQ provides decision-grade value systems that meet the requirements of CFOs, investors, and operations leaders.
              </p>
              <p>
                From cost optimization to M&A due diligence, our platform turns opacity into clarity with evidence-based insights and auditable outcomes.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}