import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA } from "@/components/Blocks";

export default function MAVCPEPage() {
  return (
    <>
      <SEO
        title="M&A / VC / PE — Kincaid IQ"
        description="Due diligence tools, value verification, and portfolio monitoring for M&A, VC, and PE professionals."
      />
      <Container>
        <PageHero
          title="M&A / VC / PE"
          subtitle="Due diligence tools, value verification, and portfolio monitoring for M&A, venture capital, and private equity professionals."
        />

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Deal Intelligence</h2>
          <CardGrid
            items={[
              {
                title: "Due Diligence",
                body: "Comprehensive due diligence with evidence receipts, controls monitoring, and variance analysis.",
              },
              {
                title: "Value Verification",
                body: "Verify target company value with actuarial-grade metrics and auditable proof.",
              },
              {
                title: "Portfolio Monitoring",
                body: "Real-time portfolio company monitoring with CFO-grade value ledger.",
              },
              {
                title: "Synergy Analysis",
                body: "Evidence-based synergy identification and tracking for M&A transactions.",
              },
              {
                title: "Exit Planning",
                body: "Exit value optimization with controls-first analytics and verified outcomes.",
              },
              {
                title: "LP Reporting",
                body: "LP-grade reporting with evidence receipts and auditable performance tracking.",
              },
            ]}
          />
        </section>

        <section className="mb-16">
          <div className="k-panel p-8">
            <h2 className="text-2xl font-semibold mb-4">Built for Deal Professionals</h2>
            <div className="text-white/70 space-y-3">
              <p>
                Kincaid IQ provides decision-grade value systems that M&A, VC, and PE professionals rely on for due diligence, portfolio monitoring, and exit optimization.
              </p>
              <p>
                From target value verification to portfolio company tracking, our platform delivers evidence-based insights and auditable outcomes at every stage of the investment lifecycle.
              </p>
            </div>
          </div>
        </section>

        <CTA />
      </Container>
    </>
  );
}