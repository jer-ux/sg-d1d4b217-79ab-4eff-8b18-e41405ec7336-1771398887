import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA } from "@/components/Blocks";

export default function FamilyOfficesPage() {
  return (
    <>
      <SEO
        title="Family Offices — Kincaid IQ"
        description="Comprehensive value tracking, portfolio verification, and decision-grade analytics for family offices."
      />
      <Container>
        <PageHero
          title="Family Offices"
          subtitle="Comprehensive value tracking, portfolio verification, and decision-grade analytics tailored for family offices."
        />

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Family Office Solutions</h2>
          <CardGrid
            items={[
              {
                title: "Portfolio Dashboard",
                body: "Unified dashboard for tracking portfolio value across all asset classes and investments.",
              },
              {
                title: "Evidence-Based Reporting",
                body: "Every portfolio decision backed by evidence receipts and auditable proof.",
              },
              {
                title: "Multi-Generation Planning",
                body: "Long-term value tracking and planning tools for multi-generational wealth management.",
              },
              {
                title: "Privacy & Security",
                body: "Enterprise-grade security with controls monitoring and compliance built in.",
              },
              {
                title: "Actuarial Metrics",
                body: "Actuarial-grade metrics for risk assessment and portfolio optimization.",
              },
              {
                title: "Fiduciary Standards",
                body: "Reports and analytics that meet fiduciary and regulatory standards.",
              },
            ]}
          />
        </section>

        <section className="mb-16">
          <div className="k-panel p-8">
            <h2 className="text-2xl font-semibold mb-4">Trusted by Family Offices</h2>
            <div className="text-white/70 space-y-3">
              <p>
                Kincaid IQ provides the decision-grade value systems that family offices need to manage complex portfolios with confidence and clarity.
              </p>
              <p>
                From portfolio verification to long-term planning, our platform delivers evidence-based insights and auditable outcomes across all asset classes.
              </p>
            </div>
          </div>
        </section>

        <CTA />
      </Container>
    </>
  );
}