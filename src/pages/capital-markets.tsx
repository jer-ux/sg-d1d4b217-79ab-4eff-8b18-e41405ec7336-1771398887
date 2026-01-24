import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA } from "@/components/Blocks";

export default function CapitalMarketsPage() {
  return (
    <>
      <SEO
        title="Investor Access — Kincaid IQ"
        description="Portfolio value verification, actuarial-grade metrics, and M&A due diligence tools for investors."
      />
      <Container>
        <PageHero
          title="Investor Access"
          subtitle="Portfolio value verification, actuarial-grade metrics, and M&A due diligence tools for capital markets professionals."
        />

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">For Investors</h2>
          <CardGrid
            items={[
              {
                title: "Portfolio Verification",
                body: "Verify portfolio value with actuarial-grade metrics and evidence-based proof.",
              },
              {
                title: "Due Diligence Tools",
                body: "Comprehensive M&A due diligence with controls monitoring and variance analysis.",
              },
              {
                title: "Risk Assessment",
                body: "Quantitative risk analysis using actuarial methods and historical data.",
              },
              {
                title: "Value Tracking",
                body: "Real-time value tracking with CFO-grade ledger and evidence receipts.",
              },
              {
                title: "Performance Analytics",
                body: "Actuarial analysis of investment returns and performance attribution.",
              },
              {
                title: "Compliance Reporting",
                body: "Reports that meet regulatory and fiduciary standards for investors.",
              },
            ]}
          />
        </section>

        <section className="mb-16">
          <div className="k-panel p-8">
            <h2 className="text-2xl font-semibold mb-4">Built for Capital Markets</h2>
            <div className="text-white/70 space-y-3">
              <p>
                Kincaid IQ provides decision-grade value systems that meet the rigorous requirements of investors, family offices, and capital markets professionals.
              </p>
              <p>
                From portfolio value verification to M&A due diligence, our platform turns opacity into clarity with evidence-based insights and auditable outcomes.
              </p>
            </div>
          </div>
        </section>

        <CTA />
      </Container>
    </>
  );
}