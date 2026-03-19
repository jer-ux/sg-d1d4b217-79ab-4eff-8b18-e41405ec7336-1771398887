import { SEO } from "@/components/SEO";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { NISTComplianceDashboard } from "@/components/security/NISTComplianceDashboard";

export default function NISTCompliancePage() {
  return (
    <>
      <SEO 
        title="NIST Cybersecurity Framework Compliance - SiriusB iQ"
        description="View our NIST CSF compliance status, security controls, and cybersecurity framework implementation."
      />
      <div className="min-h-screen bg-background">
        <Nav />
        <main className="container mx-auto px-4 py-12">
          <NISTComplianceDashboard />
        </main>
        <Footer />
      </div>
    </>
  );
}