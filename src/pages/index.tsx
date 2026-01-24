import { SEO } from "@/components/SEO";
import { Container, ProofBar, CTA, CardGrid } from "@/components/Blocks";
import { Hero3D } from "@/components/Hero3D";

export default function Home() {
  return (
    <>
      <SEO
        title="Kincaid IQ — Decision-Grade Value Systems"
        description="Evidence receipts, CFO-grade value ledger, and marketplace-native delivery across Snowflake, Databricks, and ServiceNow."
      />

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 k-grid pointer-events-none" />

        <Container>
          <div className="pt-14 pb-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-5xl font-semibold tracking-tight">
                Decision-grade value systems for capital, operators, and advisors.
              </div>
              <div className="mt-5 text-white/70 text-lg">
                Evidence receipts, CFO-grade value accounting, and marketplace-native delivery across Snowflake, Databricks, and ServiceNow.
              </div>
              <div className="mt-6">
                <ProofBar />
              </div>
            </div>
            <Hero3D />
          </div>

          <div className="mt-8">
            <CardGrid
              items={[
                {
                  title: "Marketplace Practice",
                  body: "Build once. Distribute through Snowflake, Databricks, and ServiceNow motions with low delivery drag and high trust.",
                },
                {
                  title: "AI Agentic Transformation",
                  body: "A governed 12-month adoption policy: diagnose ops + sales, deploy agents, measure value, and maintain control.",
                },
                {
                  title: "Actuarial Benefits Consulting",
                  body: "Actuarial-led PBM/Rx intelligence, compliance, benchmarking, and verified savings with audit-ready proof.",
                },
              ]}
            />
          </div>

          <CTA />
        </Container>
      </div>
    </>
  );
}