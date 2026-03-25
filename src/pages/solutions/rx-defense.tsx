import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PBMLandingPage } from "@/components/pbm/PBMLandingPage";

export default function RxDefensePage() {
  return (
    <>
      <SEO
        title="Rx Defense - PBM Contract Intelligence Platform | SiriusB iQ"
        description="AI-powered PBM contract analysis. Score contracts 0-100 across 35 critical issues. Get executive-ready reports and negotiation leverage."
        image="/og-image.png"
      />
      <SiteHeader />
      <main>
        <PBMLandingPage />
      </main>
      <SiteFooter />
    </>
  );
}