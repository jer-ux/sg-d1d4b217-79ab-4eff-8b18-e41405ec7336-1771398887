import { SEO } from "@/components/SEO";
import Link from "next/link";
import { Container, PageHero, CardGrid, CTA, ProofBar } from "@/components/Blocks";

export default function AgenticTransformation() {
  return (
    <>
      <SEO
        title="AI Agentic Transformation — Kincaid IQ"
        description="Agent deployment that survives governance. Analyze systems, deploy controlled workflows, and measure realized outcomes."
      />
      <Container>
        <PageHero
          title="AI Agentic Transformation"
          subtitle="Agent deployment that survives governance. We analyze operating and sales systems, deploy controlled agent workflows, and measure realized outcomes."
        />

        <div className="mb-8">
          <ProofBar />
        </div>

        <CardGrid
          items={[
            { 
              title: "Operating + Sales System Analysis", 
              body: "Map workflows, bottlenecks, controls, and handoffs. Identify where agents produce measurable leverage." 
            },
            { 
              title: "Governed Agent Workflows", 
              body: "Human approvals, telemetry, exception handling, and policy enforcement. No black-box chaos." 
            },
            { 
              title: "Value Measurement + Ledger", 
              body: "Tie outcomes to a ledger discipline: what's identified, approved, realized, and decaying—owned and reconciled." 
            },
          ]}
        />

        <div className="mt-8 k-panel p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-semibold">Want the 12-month policy blueprint?</div>
            <div className="text-sm text-white/70 mt-1">
              A structured adoption policy with controls-first gating and board-safe reporting.
            </div>
          </div>
          <Link href="/agentic-policy" className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition w-fit">
            View the policy
          </Link>
        </div>

        <CTA />
      </Container>
    </>
  );
}