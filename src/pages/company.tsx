import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Container, PageHero } from "@/components/Blocks";

export default function Company() {
  return (
    <>
      <SEO
        title="Company — Kincaid IQ"
        description="Built for boards. Run by operators. Kincaid IQ exists to convert opacity into verified value—with governance that survives scrutiny."
      />
      <Container>
        <PageHero
          title="Company"
          subtitle="Built for boards. Run by operators. Kincaid IQ exists to convert opacity into verified value—with governance that survives scrutiny."
        />

        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 k-panel p-6">
            <div className="font-semibold">What we do</div>
            <div className="text-sm text-white/70 mt-2">
              We build decision systems that are finance-native: evidence receipts, value ledgers, control gates, and workflows that close outcomes.
              Our practices span enterprise marketplaces, agentic transformation, and actuarial benefits consulting.
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-3 text-sm text-white/70">
              <div className="border border-white/10 rounded-xl bg-white/5 p-4">
                <div className="text-white/90 font-medium">Marketplace Practice</div>
                <div className="mt-1">Snowflake • Databricks • ServiceNow</div>
              </div>
              <div className="border border-white/10 rounded-xl bg-white/5 p-4">
                <div className="text-white/90 font-medium">Agentic Transformation</div>
                <div className="mt-1">12-month adoption policy</div>
              </div>
              <div className="border border-white/10 rounded-xl bg-white/5 p-4">
                <div className="text-white/90 font-medium">Actuarial Benefits</div>
                <div className="mt-1">PBM/Rx • compliance • benchmarking</div>
              </div>
            </div>

            <div className="mt-6 text-sm text-white/70">
              <div className="font-semibold text-white/90 mb-2">Who we serve</div>
              <div className="space-y-1">
                <div>• CFOs and finance teams needing defensible value measurement</div>
                <div>• Capital markets (M&A, VC, PE) underwriting value with evidence</div>
                <div>• Family offices managing complex holdings and vendor ecosystems</div>
                <div>• Enterprise buyers seeking marketplace-native, governed solutions</div>
              </div>
            </div>
          </div>

          <div className="k-panel p-6">
            <div className="font-semibold">Our approach</div>
            <div className="text-sm text-white/70 mt-2 space-y-3">
              <div>
                <div className="text-white/90">Controls-first</div>
                <div>Governance before scale</div>
              </div>
              <div>
                <div className="text-white/90">Evidence-led</div>
                <div>Receipts, not opinions</div>
              </div>
              <div>
                <div className="text-white/90">Ledger discipline</div>
                <div>Reconciliation, not dashboards</div>
              </div>
              <div>
                <div className="text-white/90">Marketplace-native</div>
                <div>Distribution through trust</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 k-panel p-6">
          <div className="font-semibold">Why we exist</div>
          <div className="text-sm text-white/70 mt-2">
            Most "analytics" dies because it can't survive scrutiny. Boards don't trust it. Finance can't reconcile it. Value evaporates.
            We fix that: evidence receipts, controlled workflows, and ledger-based accountability that makes value provable and realized.
          </div>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <Link
            href="/contact"
            className="k-panel p-6 hover:bg-white/5 transition text-center"
          >
            <div className="font-semibold">Request a demo</div>
            <div className="text-sm text-white/70 mt-1">See how we build decision-grade systems</div>
          </Link>
          <Link
            href="/case-studies"
            className="k-panel p-6 hover:bg-white/5 transition text-center"
          >
            <div className="font-semibold">Case studies</div>
            <div className="text-sm text-white/70 mt-1">Real proof patterns and outcomes</div>
          </Link>
          <Link
            href="/capital-markets"
            className="k-panel p-6 hover:bg-white/5 transition text-center"
          >
            <div className="font-semibold">Investor access</div>
            <div className="text-sm text-white/70 mt-1">Diligence packs and realization discipline</div>
          </Link>
        </div>
      </Container>
    </>
  );
}