import { SEO } from "@/components/SEO";
import { Container, PageHero, CTA } from "@/components/Blocks";

const cases = [
  {
    title: "Verified Savings Ledger: From 'opportunity' to reconciliation",
    body: "Evidence receipts + value ledger states (Identified → Approved → Realized → At-risk) to survive CFO review and accelerate renewal conversations.",
    tags: ["CFO-grade proof", "Ledger workflow", "Audit trail"],
  },
  {
    title: "Marketplace-native delivery: Packaging decision systems",
    body: "Productized delivery motion through Snowflake/Databricks/ServiceNow-aligned patterns to reduce delivery drag and raise gross margin.",
    tags: ["Marketplace GTM", "Low delivery drag", "Distribution"],
  },
  {
    title: "Agentic transformation: Controlled automation in ops + sales",
    body: "Agent workflows with policy gates, approvals, and measurement—built to scale without governance failure.",
    tags: ["Agent policy", "Controls monitoring", "Measurable ROI"],
  },
];

export default function CaseStudies() {
  return (
    <>
      <SEO
        title="Case Studies — Kincaid IQ"
        description="Decision-grade narratives with clear proof patterns: evidence, reconciliation, control, and realized outcomes."
      />
      <Container>
        <PageHero
          title="Case Studies"
          subtitle="Short, decision-grade narratives. No hype. Clear proof patterns: evidence, reconciliation, control, and realized outcomes."
        />

        <div className="grid md:grid-cols-3 gap-4">
          {cases.map((c) => (
            <div key={c.title} className="k-panel p-6">
              <div className="font-semibold">{c.title}</div>
              <div className="text-sm text-white/70 mt-2">{c.body}</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 k-panel p-6">
          <div className="font-semibold">Want a deeper case study?</div>
          <div className="text-sm text-white/70 mt-2">
            We can provide more detailed proof narratives, evidence packs, and reconciliation artifacts for qualified prospects.
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}