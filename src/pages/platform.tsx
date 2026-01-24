import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";
import { Hero3D } from "@/components/Hero3D";

export default function PlatformPage() {
  return (
    <>
      <SEO
        title="Platform — Kincaid IQ"
        description="A controls-first operating system for converting enterprise opacity into verified value—built on evidence receipts, a CFO-grade ledger, and action workflows."
      />
      <Container>
        <PageHero
          title="Kincaid IQ Platform"
          subtitle="A controls-first operating system for converting enterprise opacity into verified value—built on evidence receipts, a CFO-grade ledger, and action workflows."
        />

        <div className="mb-8">
          <Hero3D />
        </div>

        <div className="mb-8">
          <ProofBar />
        </div>

        <CardGrid
          items={[
            {
              title: "Evidence Receipts",
              body: "Every claim is backed by lineage, source artifacts, tests, and versioned transforms.",
            },
            {
              title: "Value Ledger",
              body: "Identified → Approved → Realized → At-risk, with accountable owners and audit-grade tracking.",
            },
            {
              title: "Controls Monitoring",
              body: "Validation gates, exceptions, and continuous controls reporting that holds up to CFO scrutiny.",
            },
          ]}
        />

        <section className="mt-16 mb-16">
          <div className="k-panel p-8">
            <h2 className="text-2xl font-semibold mb-4">Built for Enterprise Scale</h2>
            <div className="text-white/70 space-y-3">
              <p>
                Kincaid IQ provides decision-grade value systems that meet the requirements of CFOs, investors, and operations leaders.
              </p>
              <p>
                From cost optimization to M&A due diligence, our platform turns opacity into clarity with evidence-based insights and auditable outcomes.
              </p>
            </div>
          </div>
        </section>

        <CTA />
      </Container>
    </>
  );
}