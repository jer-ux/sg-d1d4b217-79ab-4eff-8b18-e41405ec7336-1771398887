import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function IncidentsPage() {
  return (
    <>
      <SEO title="Platform Incidents — Kincaid IQ" description="Monitor data pipeline failures, staleness, and ingestion mismatches." />
      <Container>
        <PageHero
          title="Incidents"
          subtitle="Real-time monitoring of data pipeline health, ingestion failures, and staleness events."
        />
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Incident Types</h2>
            <CardGrid
              items={[
                { title: "Ingestion Failures", body: "API timeout, auth failures, or malformed payloads from source systems." },
                { title: "Staleness Alerts", body: "Data not refreshed within defined SLAs (e.g. > 1 hour)." },
                { title: "Value Mismatches", body: "Discrepancies between source system totals and ledger values." },
                { title: "Orphaned Receipts", body: "Evidence receipts that cannot be linked to a valid parent event." },
              ]}
            />
          </section>
        </div>
      </Container>
    </>
  );
}