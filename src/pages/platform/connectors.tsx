import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function ConnectorsPage() {
  return (
    <>
      <SEO title="Connectors — Kincaid IQ" description="Manage integrations with Snowflake, Databricks, ServiceNow, and more." />
      <Container>
        <PageHero
          title="Connectors"
          subtitle="Enterprise-grade integrations for your data stack. Zero-copy ingress, secure egress."
        />
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Active Integrations</h2>
            <CardGrid
              items={[
                { title: "Snowflake", body: "Direct query push-down and external function support." },
                { title: "Databricks", body: "Delta Sharing and Unity Catalog integration." },
                { title: "ServiceNow", body: "Bi-directional ticket sync and incident creation." },
                { title: "Salesforce", body: "Revenue data ingestion and opportunity matching." },
              ]}
            />
          </section>
        </div>
      </Container>
    </>
  );
}