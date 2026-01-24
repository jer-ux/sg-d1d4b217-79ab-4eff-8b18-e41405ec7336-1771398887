import { SEO } from "@/components/SEO";
import { Container, PageHero, CTA } from "@/components/Blocks";
import Link from "next/link";

export default function CaseStudiesPage() {
  return (
    <>
      <SEO
        title="Case Studies — Kincaid IQ"
        description="Real-world examples of decision-grade value systems delivering verified outcomes."
      />
      <Container>
        <PageHero
          title="Case Studies"
          subtitle="Real-world examples of decision-grade value systems delivering verified outcomes across enterprise and capital markets."
        />

        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="k-panel k-glow p-8">
              <div className="text-sm text-white/60 mb-2">Enterprise Cost Optimization</div>
              <h3 className="text-2xl font-semibold mb-3">$47M in Verified Savings</h3>
              <p className="text-white/70 mb-4">
                Global enterprise reduced cloud infrastructure costs by $47M with evidence receipts, controls monitoring, and CFO-grade value ledger.
              </p>
              <div className="space-y-2 text-sm text-white/70">
                <div>✓ 12-month delivery guarantee</div>
                <div>✓ Evidence-based cost tracking</div>
                <div>✓ Automated controls monitoring</div>
                <div>✓ Quarterly verified outcomes</div>
              </div>
            </div>

            <div className="k-panel k-glow p-8">
              <div className="text-sm text-white/60 mb-2">M&A Due Diligence</div>
              <h3 className="text-2xl font-semibold mb-3">$2.3B Transaction Verified</h3>
              <p className="text-white/70 mb-4">
                Private equity firm verified target company value and identified $120M in undisclosed liabilities using actuarial-grade metrics.
              </p>
              <div className="space-y-2 text-sm text-white/70">
                <div>✓ Comprehensive due diligence</div>
                <div>✓ Portfolio value verification</div>
                <div>✓ Risk assessment and modeling</div>
                <div>✓ Auditable proof and evidence</div>
              </div>
            </div>

            <div className="k-panel k-glow p-8">
              <div className="text-sm text-white/60 mb-2">Family Office Portfolio</div>
              <h3 className="text-2xl font-semibold mb-3">Multi-Generational Wealth</h3>
              <p className="text-white/70 mb-4">
                Family office unified portfolio tracking across 40+ investments with evidence-based reporting and fiduciary-grade controls.
              </p>
              <div className="space-y-2 text-sm text-white/70">
                <div>✓ Unified portfolio dashboard</div>
                <div>✓ Multi-asset class tracking</div>
                <div>✓ Privacy and security controls</div>
                <div>✓ Fiduciary compliance reporting</div>
              </div>
            </div>

            <div className="k-panel k-glow p-8">
              <div className="text-sm text-white/60 mb-2">Agentic Transformation</div>
              <h3 className="text-2xl font-semibold mb-3">Operations Modernization</h3>
              <p className="text-white/70 mb-4">
                Enterprise transformed operations with evidence-based pathways, controls monitoring, and verified outcomes delivered in 12 months.
              </p>
              <div className="space-y-2 text-sm text-white/70">
                <div>✓ Evidence-based planning</div>
                <div>✓ Controls-first approach</div>
                <div>✓ Automated action workflows</div>
                <div>✓ 12-month delivery guarantee</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="k-panel p-8">
            <h2 className="text-2xl font-semibold mb-4">Your Case Study Awaits</h2>
            <p className="text-white/70 mb-6">
              Every Kincaid IQ engagement delivers evidence-based outcomes with auditable proof. Whether you're optimizing costs, conducting due diligence, or transforming operations, we turn opacity into clarity.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition font-medium"
            >
              Start your case study
            </Link>
          </div>
        </section>

        <CTA />
      </Container>
    </>
  );
}