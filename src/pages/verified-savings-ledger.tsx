import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function ValueLedgerPage() {
  return (
    <>
      <SEO
        title="Verified Savings Ledger — Kincaid IQ"
        description="CFO-grade value tracking with evidence receipts, controls monitoring, and variance analysis."
      />
      <Container>
        <PageHero
          title="Verified Savings Ledger"
          subtitle="Auditable value tracking with controls monitoring and variance analysis built in. Every dollar tracked, every decision verified."
        />

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Ledger Features</h2>
          <CardGrid
            items={[
              {
                title: "Evidence-Based Entries",
                body: "Every ledger entry backed by immutable evidence receipts with full audit trails.",
              },
              {
                title: "Controls Monitoring",
                body: "Real-time oversight of financial and operational controls with automated variance detection.",
              },
              {
                title: "Variance Analysis",
                body: "Identify deviations from expected outcomes and trace them to root causes instantly.",
              },
              {
                title: "CFO-Grade Reporting",
                body: "Reports that meet the standards of CFOs, auditors, and boards of directors.",
              },
              {
                title: "Actuarial Metrics",
                body: "Actuarial-grade metrics for portfolio value verification and risk assessment.",
              },
              {
                title: "Integration Ready",
                body: "Native integration with Snowflake, Databricks, ServiceNow, and your existing stack.",
              },
            ]}
          />
        </section>

        <section className="mb-16">
          <div className="k-panel p-8">
            <h2 className="text-2xl font-semibold mb-4">Make Value Provable</h2>
            <div className="text-white/70">
              The Verified Savings Ledger turns cost and operational opacity into an auditable record with evidence receipts, controls, and action workflows that drive verified outcomes.
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}