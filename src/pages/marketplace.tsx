import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function MarketplacePage() {
  return (
    <>
      <SEO
        title="Marketplace — Kincaid IQ"
        description="Native integrations across Snowflake, Databricks, and ServiceNow with automated workflows."
      />
      <Container>
        <PageHero
          title="Marketplace Delivery"
          subtitle="Native integrations across Snowflake, Databricks, and ServiceNow with automated workflows and action systems."
        />

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Supported Platforms</h2>
          <CardGrid
            items={[
              {
                title: "Snowflake",
                body: "Native integration with Snowflake Data Cloud for real-time analytics and value tracking.",
              },
              {
                title: "Databricks",
                body: "Seamless connectivity with Databricks for advanced analytics and ML-driven insights.",
              },
              {
                title: "ServiceNow",
                body: "Automated workflow integration with ServiceNow for action-driven outcomes.",
              },
              {
                title: "Custom Integrations",
                body: "API-first architecture enables custom integrations with your existing tech stack.",
              },
              {
                title: "Automated Workflows",
                body: "Turn insights into executable actions with automated workflows across platforms.",
              },
              {
                title: "Real-Time Sync",
                body: "Real-time data synchronization ensures your value ledger is always up to date.",
              },
            ]}
          />
        </section>
      </Container>
    </>
  );
}