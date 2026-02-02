import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";

export default function ActuarialBenefits() {
  return (
    <>
      <SEO
        title="Actuarial Employee Benefits Consulting — Kincaid IQ"
        description="Actuarial-led benefits intelligence with audit-grade proof—built for CFO scrutiny and procurement reality."
      />
      <div className="min-h-screen bg-[#070B12] text-white">
        <SiteHeader />
        
        <main>
          <Container>
            <PageHero
              title="Actuarial Employee Benefits Consulting"
              subtitle="Actuarial-led benefits intelligence with audit-grade proof—built for CFO scrutiny and procurement reality."
            />

            <div className="mb-8">
              <ProofBar />
            </div>

            <CardGrid
              items={[
                { 
                  title: "PBM / Rx Contract Intelligence", 
                  body: "Price protection, guarantees, and leakage detection backed by receipts and reconciliation workflows." 
                },
                { 
                  title: "Deterministic Benchmarking", 
                  body: "Variance attribution and trend drivers with methodology disclosure—board-ready, not hand-wavy." 
                },
                { 
                  title: "Compliance + Controls", 
                  body: "Scenario modeling, evidence chains, and control testing to reduce regulatory and litigation exposure." 
                },
              ]}
            />

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="k-panel p-6">
                <div className="font-semibold">What's different</div>
                <div className="text-sm text-white/70 mt-2">
                  Not "analytics." A decision system: evidence receipts, an auditable ledger, and workflows that close value.
                </div>
              </div>
              <div className="k-panel p-6">
                <div className="font-semibold">Where it fits</div>
                <div className="text-sm text-white/70 mt-2">
                  Employers, advisors, and sponsors who need defensible, measurable outcomes—not another dashboard.
                </div>
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