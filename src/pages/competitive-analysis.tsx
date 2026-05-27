import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MeasureMedComparison } from "@/components/marketing/MeasureMedComparison";

export default function CompetitiveAnalysisPage() {
  return (
    <>
      <SEO
        title="Competitive Analysis | SiriusB iQ vs MeasureMed"
        description="Forensic intelligence platform vs clinical optimization system. Compare SiriusB iQ's investigative capabilities against MeasureMed's formulary optimization approach."
      />
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <SiteHeader />
        
        <main className="flex-1 py-20">
          <MeasureMedComparison />
        </main>
        
        <SiteFooter />
      </div>
    </>
  );
}