import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";

export default function ServiceNowPractice() {
  return (
    <>
      <SEO
        title="ServiceNow Practice — Kincaid IQ"
        description="Turn analytics into closure with ServiceNow-aligned workflow for assignment, approvals, and value realization."
      />
      <Container>
        <PageHero
          title="ServiceNow Practice"
          subtitle="Turn analytics into closure. ServiceNow-aligned workflow for assignment, approvals, evidence capture, and value realization."
        />

        <div className="mb-8">
          <ProofBar />
        </div>

        <CardGrid
          items={[
            { 
              title: "Action Workflows", 
              body: "Find → Assign → Prove → Close. A controlled path from detection to realized outcome." 
            },
            { 
              title: "Approvals and Governance", 
              body: "Human-in-the-loop controls for high-impact actions with traceability and policy enforcement." 
            },
            { 
              title: "Audit Trail by Default", 
              body: "Every action and decision is logged, evidence-linked, and reportable for board and audit needs." 
            },
          ]}
        />

        <div className="mt-8 k-panel p-6">
          <div className="font-semibold">Why it matters</div>
          <div className="text-sm text-white/70 mt-2">
            Most analytics dies because it doesn't close. Workflow turns value into realized outcomes and makes renewal conversations effortless.
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}