import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function AgenticTransformationPage() {
  return (
    <>
      <SEO
        title="Agentic Transformation — Kincaid IQ"
        description="Evidence-based transformation pathways with controls monitoring and verified outcomes."
      />
      <Container>
        <PageHero
          title="Agentic Transformation"
          subtitle="Evidence-based transformation pathways with controls monitoring, variance analysis, and verified outcomes."
        />

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Transformation Framework</h2>
          <CardGrid
            items={[
              {
                title: "Evidence-Based Planning",
                body: "Transformation roadmaps backed by evidence receipts and verified impact analysis.",
              },
              {
                title: "Controls-First Approach",
                body: "Built-in controls monitoring ensures transformation stays on track and on budget.",
              },
              {
                title: "Verified Outcomes",
                body: "Every transformation milestone verified with evidence and auditable proof.",
              },
              {
                title: "Continuous Monitoring",
                body: "Real-time tracking of transformation progress with variance detection and alerts.",
              },
              {
                title: "Action Workflows",
                body: "Automated workflows that turn transformation insights into executable actions.",
              },
              {
                title: "12-Month Guarantee",
                body: "Our 12-month agentic policy ensures verified delivery and measurable outcomes.",
              },
            ]}
          />
        </section>
      </Container>
    </>
  );
}