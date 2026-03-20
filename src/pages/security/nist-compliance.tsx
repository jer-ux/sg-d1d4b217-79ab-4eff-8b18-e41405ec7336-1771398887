import { useState } from "react";
import { SEO } from "@/components/SEO";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { NISTComplianceDashboard } from "@/components/security/NISTComplianceDashboard";
import { 
  Breadcrumb, 
  QuickJumpNav, 
  RelatedPagesBar,
  ScrollProgress
} from "@/components/security/SecurityNavigation";

export default function NISTCompliancePage() {
  const [activeSection, setActiveSection] = useState("identify");

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    // Smooth scroll to section
    const element = document.getElementById(section);
    if (element) {
      const offset = 120; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <SEO 
        title="NIST Cybersecurity Framework Compliance - SiriusB iQ"
        description="View our NIST CSF compliance status, security controls, and cybersecurity framework implementation."
      />
      <ScrollProgress sections={["overview", "identify", "protect", "detect", "respond", "recover"]} />
      <div className="min-h-screen bg-background">
        <Nav />
        <main className="container mx-auto px-4 py-12">
          {/* Breadcrumb Navigation */}
          <Breadcrumb 
            items={[
              { label: "Security", href: "/security/security-policy" },
              { label: "NIST Compliance" }
            ]} 
          />

          {/* Related Pages Bar */}
          <RelatedPagesBar currentPage="nist" />

          {/* Two Column Layout: Sidebar + Content */}
          <div className="grid lg:grid-cols-[250px_1fr] gap-8">
            {/* Quick Jump Navigation - Sticky Sidebar */}
            <aside className="hidden lg:block">
              <QuickJumpNav 
                activeSection={activeSection} 
                onNavigate={handleNavigate}
              />
            </aside>

            {/* Main Content */}
            <div>
              <NISTComplianceDashboard 
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}