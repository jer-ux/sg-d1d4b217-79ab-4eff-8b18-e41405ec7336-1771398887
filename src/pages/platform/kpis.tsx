import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function KPIsPage() {
  return (
    <>
      <SEO title="KPI Catalog — Kincaid IQ" description="Definitions, owners, and thresholds for value-driving metrics." />
      <Container>
        <PageHero
          title="KPI Catalog"
          subtitle="The single source of truth for value metrics. Define once, measure everywhere."
        />
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Catalog Features</h2>
            <CardGrid
              items={[
                { title: "Metric Definitions", body: "Standardized SQL/Python logic for calculating key indicators." },
                { title: "Ownership", body: "Clear stewardship assignment for every business metric." },
                { title: "Thresholds", body: "Alerting rules for variance, drops, and spikes." },
                { title: "Lineage", body: "Trace KPI dependency trees down to raw tables." },
              ]}
            />
          </section>
        </div>
      </Container>
    </>
  );
}