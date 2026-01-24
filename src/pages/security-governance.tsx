import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA } from "@/components/Blocks";

export default function SecurityGovernance() {
  return (
    <>
      <SEO
        title="Security & Governance — Kincaid IQ"
        description="Controls-first analytics. Evidence chains, access discipline, and audit trails that keep decision systems safe at scale."
      />
      <Container>
        <PageHero
          title="Security & Governance"
          subtitle="Controls-first analytics. Evidence chains, access discipline, and audit trails that keep decision systems safe at scale."
        />

        <CardGrid
          items={[
            { 
              title: "Evidence Receipts Standard", 
              body: "Every claim is linked to sources, lineage, tests, and versioning—designed to be replayable and reviewable." 
            },
            { 
              title: "Access + Segregation", 
              body: "Role-based access and separation of duties patterns aligned to finance-grade controls." 
            },
            { 
              title: "Audit Trail and Monitoring", 
              body: "Append-only event journals, exception queues, and control checks to reduce governance risk." 
            },
          ]}
        />

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="k-panel p-6">
            <div className="font-semibold">Governance principle</div>
            <div className="text-sm text-white/70 mt-2">
              If it can't be explained, replayed, and reconciled, it's not decision-grade.
            </div>
          </div>
          <div className="k-panel p-6">
            <div className="font-semibold">Security posture</div>
            <div className="text-sm text-white/70 mt-2">
              Access controls, data lineage, and exception monitoring built into every workflow—not bolted on after.
            </div>
          </div>
        </div>

        <div className="mt-8 k-panel p-6">
          <div className="font-semibold">Why it matters for boards</div>
          <div className="text-sm text-white/70 mt-3 space-y-2">
            <div>• Regulatory audit readiness without scrambling</div>
            <div>• Clear accountability chains for high-impact decisions</div>
            <div>• Risk reduction through controlled, measurable workflows</div>
            <div>• No black-box AI or opaque analytics</div>
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}