import { SEO } from "@/components/SEO";
import { Container, ProofBar, CTA } from "@/components/Blocks";
import Link from "next/link";

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
          <section className="py-20 relative">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-xs text-white/70 mb-6">
                Decision-grade value systems
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
                Make value <span className="text-blue-400">provable</span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Evidence receipts, CFO-grade value ledger, and marketplace-native delivery across Snowflake, Databricks, and ServiceNow.
              </p>

              <div className="flex gap-3 justify-center mb-10">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl bg-white text-black hover:bg-white/90 transition font-medium"
                >
                  Request demo
                </Link>
                <Link
                  href="/platform"
                  className="px-6 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition"
                >
                  Explore platform
                </Link>
              </div>

              <ProofBar />
            </div>
          </section>

          <section className="py-16">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="k-panel k-glow p-8">
                <div className="text-3xl mb-3">📋</div>
                <div className="text-xl font-semibold mb-2">Evidence Receipts</div>
                <div className="text-white/65 text-sm">
                  Every decision backed by immutable proof. Track what changed, who approved it, and the verified impact.
                </div>
              </div>

              <div className="k-panel k-glow p-8">
                <div className="text-3xl mb-3">💰</div>
                <div className="text-xl font-semibold mb-2">CFO-Grade Ledger</div>
                <div className="text-white/65 text-sm">
                  Auditable value tracking with controls monitoring and variance analysis built in.
                </div>
              </div>

              <div className="k-panel k-glow p-8">
                <div className="text-3xl mb-3">🔗</div>
                <div className="text-xl font-semibold mb-2">Marketplace Delivery</div>
                <div className="text-white/65 text-sm">
                  Native integrations across Snowflake, Databricks, and ServiceNow with automated workflows.
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for decision-makers</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                From CFOs to investors, from operations teams to family offices—Kincaid IQ turns opacity into clarity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="k-panel p-8">
                <div className="text-2xl font-semibold mb-3">For Enterprise</div>
                <ul className="space-y-2 text-white/70">
                  <li>✓ Evidence-based cost optimization</li>
                  <li>✓ Controls-first analytics</li>
                  <li>✓ Agentic transformation pathways</li>
                  <li>✓ 12-month delivery guarantee</li>
                </ul>
                <Link href="/platform" className="inline-block mt-4 text-blue-400 hover:text-blue-300">
                  Learn more →
                </Link>
              </div>

              <div className="k-panel p-8">
                <div className="text-2xl font-semibold mb-3">For Investors</div>
                <ul className="space-y-2 text-white/70">
                  <li>✓ Portfolio value verification</li>
                  <li>✓ Actuarial-grade metrics</li>
                  <li>✓ M&A due diligence tools</li>
                  <li>✓ Family office dashboards</li>
                </ul>
                <Link href="/capital-markets" className="inline-block mt-4 text-blue-400 hover:text-blue-300">
                  Investor access →
                </Link>
              </div>
            </div>
          </section>

          <CTA />
        </Container>
      </div>
    </>
  );
}