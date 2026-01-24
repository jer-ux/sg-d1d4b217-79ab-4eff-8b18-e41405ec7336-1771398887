import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function ActuarialBenefitsPage() {
  return (
    <>
      <SEO
        title="Actuarial Benefits — Kincaid IQ"
        description="Actuarial-grade metrics for portfolio value verification and risk assessment."
      />
      <Container>
        <PageHero
          title="Actuarial Benefits"
          subtitle="Actuarial-grade metrics for portfolio value verification, risk assessment, and investment decision-making."
        />

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Actuarial Framework</h2>
          <CardGrid
            items={[
              {
                title: "Portfolio Verification",
                body: "Actuarial-grade verification of portfolio value with evidence-based proof.",
              },
              {
                title: "Risk Assessment",
                body: "Quantitative risk analysis using actuarial methods and historical data.",
              },
              {
                title: "Value Modeling",
                body: "Actuarial models for value projection, scenario analysis, and sensitivity testing.",
              },
              {
                title: "Loss Forecasting",
                body: "Predictive models for loss forecasting and reserve estimation.",
              },
              {
                title: "Return Analysis",
                body: "Actuarial analysis of investment returns and performance attribution.",
              },
              {
                title: "Compliance Reporting",
                body: "Actuarial reports that meet regulatory and fiduciary standards.",
              },
            ]}
          />
        </section>
      </Container>
    </>
  );
}