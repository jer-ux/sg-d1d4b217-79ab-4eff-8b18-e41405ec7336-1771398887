import { SEO } from "@/components/SEO";
import { Container, PageHero, CTA } from "@/components/Blocks";

export default function CompanyPage() {
  return (
    <>
      <SEO
        title="Company — Kincaid IQ"
        description="Building decision-grade value systems that turn opacity into clarity for enterprise and capital markets."
      />
      <Container>
        <PageHero
          title="Company"
          subtitle="Building decision-grade value systems that turn opacity into clarity for enterprise and capital markets."
        />

        <section className="mb-16">
          <div className="k-panel p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <div className="text-white/70 space-y-4">
              <p>
                Kincaid IQ exists to make value provable. We build decision-grade value systems that turn complex cost and operational opacity into auditable ledgers with evidence receipts, controls monitoring, and verified outcomes.
              </p>
              <p>
                From CFOs to investors, from operations teams to family offices—our platform delivers the clarity and confidence that decision-makers need to act with conviction.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="k-panel p-8">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Evidence-Based</h3>
              <p className="text-white/70 text-sm">
                Every decision backed by immutable evidence receipts with full audit trails and cryptographic proof.
              </p>
            </div>

            <div className="k-panel p-8">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Controls-First</h3>
              <p className="text-white/70 text-sm">
                Built-in controls monitoring with automated variance detection ensures outcomes stay on track.
              </p>
            </div>

            <div className="k-panel p-8">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="text-xl font-semibold mb-2">Verified Outcomes</h3>
              <p className="text-white/70 text-sm">
                12-month delivery guarantee with CFO-grade reporting and auditable proof at every milestone.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="k-panel p-8">
            <h2 className="text-2xl font-semibold mb-4">Why We Built This</h2>
            <div className="text-white/70 space-y-4">
              <p>
                Traditional cost and value tracking systems fail when decisions matter most. They lack evidence, ignore controls, and produce reports that nobody trusts.
              </p>
              <p>
                We built Kincaid IQ to change that. Our decision-grade value systems deliver the evidence, controls, and auditability that CFOs, investors, and boards demand—with marketplace-native delivery that meets teams where they work.
              </p>
            </div>
          </div>
        </section>

        <CTA />
      </Container>
    </>
  );
}