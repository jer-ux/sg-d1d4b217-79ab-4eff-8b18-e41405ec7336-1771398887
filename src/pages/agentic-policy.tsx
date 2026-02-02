import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Container, PageHero, CardGrid, CTA } from "@/components/Blocks";

export default function AgenticPolicy() {
  return (
    <>
      <SEO
        title="12-Month Agentic Adoption Policy — Kincaid IQ"
        description="A governed program to deploy agents safely and measurably—designed for CFO and board scrutiny."
      />
      <div className="min-h-screen bg-[#070B12] text-white">
        <SiteHeader />
        
        <main>
          <Container>
            <PageHero
              title="12-Month Agentic Adoption Policy"
              subtitle="A governed program to deploy agents safely and measurably across operating and sales systems—designed for CFO and board scrutiny, not demo theater."
            />

            <CardGrid
              items={[
                { 
                  title: "Months 0–2: Diagnose + Baseline", 
                  body: "Map operating and sales workflows, define value hypotheses, set KPIs, and establish controls, access boundaries, and evidence standards." 
                },
                { 
                  title: "Months 3–6: Deploy High-ROI Agents", 
                  body: "Launch agent workflows with human-in-the-loop approvals, telemetry, and exception handling. Measure cycle-time and cost impacts." 
                },
                { 
                  title: "Months 7–12: Scale + Control", 
                  body: "Harden governance: policy enforcement, model drift controls, audit trails, and a continuous-improvement cadence tied to realized outcomes." 
                },
              ]}
            />

            <CTA />
          </Container>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}