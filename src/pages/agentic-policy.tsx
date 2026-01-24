import { SEO } from "@/components/SEO";
import { Container, PageHero } from "@/components/Blocks";

export default function AgenticPolicyPage() {
  return (
    <>
      <SEO
        title="12-Month Agentic Policy — Kincaid IQ"
        description="Verified delivery guarantee with evidence receipts and auditable outcomes."
      />
      <Container>
        <PageHero
          title="12-Month Agentic Policy"
          subtitle="Verified delivery guarantee with evidence receipts, controls monitoring, and auditable outcomes."
        />

        <section className="mb-16">
          <div className="k-panel p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-3">Delivery Guarantee</h2>
              <p className="text-white/70">
                Kincaid IQ provides a 12-month delivery guarantee backed by evidence receipts, controls monitoring, and verified outcomes. Every milestone is tracked, every decision is auditable, and every result is provable.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">What's Included</h3>
              <ul className="space-y-2 text-white/70">
                <li>✓ Evidence receipts for every decision and milestone</li>
                <li>✓ CFO-grade value ledger with controls monitoring</li>
                <li>✓ Variance analysis and automated alerting</li>
                <li>✓ Quarterly verified outcomes reviews</li>
                <li>✓ Action workflows with automated execution</li>
                <li>✓ Full audit trail and compliance reporting</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Verified Outcomes</h3>
              <p className="text-white/70">
                Our 12-month policy ensures that every transformation delivers verified, measurable outcomes. If we don't deliver, we don't get paid. It's that simple.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}