import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";
import { Hero3D } from "@/components/Hero3D";

export default function VerifiedSavingsLedger() {
  return (
    <>
      <SEO
        title="Verified Savings Ledger — Kincaid IQ"
        description="Stop arguing about 'opportunities.' Start reconciling an auditable value ledger with receipts, owners, and board-ready reporting."
      />
      <div className="min-h-screen bg-[#070B12] text-white">
        <SiteHeader />
        
        <main>
          <Container>
            <PageHero
              title="Verified Savings Ledger"
              subtitle="Stop arguing about 'opportunities.' Start reconciling an auditable value ledger with receipts, owners, and board-ready reporting."
            />

            <div className="mb-8">
              <Hero3D />
            </div>

            <div className="mb-8">
              <ProofBar />
            </div>

            <CardGrid
              items={[
                { title: "Ledger States", body: "Identified → Approved → Realized → At-risk. Each state change is logged, attributable, and supported by evidence receipts." },
                { title: "Evidence Receipts", body: "Source artifacts, lineage, tests, transform versions, and confidence—so the CFO can click into proof, not slides." },
                { title: "Journal-Entry Thinking", body: "Management-accounting entries with clear recognition logic and reconciliation cadence—finance-native behavior, not dashboard theater." },
              ]}
            />

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="k-panel p-6">
                <div className="font-semibold">What a CFO sees</div>
                <div className="text-sm text-white/70 mt-2">
                  A controlled register of economic claims: owners, due dates, receipts, aging/decay, and realized outcomes tied to action.
                </div>
                <ul className="mt-4 text-sm text-white/70 list-disc pl-5 space-y-2">
                  <li>Reconciliation report by category and counterparty</li>
                  <li>Exceptions queue (blocked approvals, missing receipts, stale disputes)</li>
                  <li>Audit trail of every change (append-only events)</li>
                </ul>
              </div>

              <div className="k-panel p-6">
                <div className="font-semibold">What capital sees</div>
                <div className="text-sm text-white/70 mt-2">
                  Reduced uncertainty: evidence packs for diligence, underwriteable value, and repeatable realization discipline post-close.
                </div>
                <ul className="mt-4 text-sm text-white/70 list-disc pl-5 space-y-2">
                  <li>Diligence-ready "Proof Packs"</li>
                  <li>Repeatable post-close value realization</li>
                  <li>Governance posture that survives scrutiny</li>
                </ul>
              </div>
            </div>

            <CTA />
          </Container>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}