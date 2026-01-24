import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA } from "@/components/Blocks";

export default function SecurityGovernancePage() {
  return (
    <>
      <SEO
        title="Security & Governance — Kincaid IQ"
        description="Enterprise-grade security, controls monitoring, and compliance built for decision-grade value systems."
      />
      <Container>
        <PageHero
          title="Security & Governance"
          subtitle="Enterprise-grade security, controls monitoring, and compliance built into every layer of our decision-grade value systems."
        />

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Security Framework</h2>
          <CardGrid
            items={[
              {
                title: "SOC 2 Type II",
                body: "SOC 2 Type II certified with continuous compliance monitoring and annual audits.",
              },
              {
                title: "Data Encryption",
                body: "End-to-end encryption for data at rest and in transit using industry-standard protocols.",
              },
              {
                title: "Access Controls",
                body: "Role-based access controls with multi-factor authentication and audit logging.",
              },
              {
                title: "Compliance Ready",
                body: "Built-in compliance frameworks for GDPR, CCPA, SOX, and industry regulations.",
              },
              {
                title: "Disaster Recovery",
                body: "Automated backup and disaster recovery with 99.9% uptime SLA guarantee.",
              },
              {
                title: "Penetration Testing",
                body: "Regular third-party penetration testing and vulnerability assessments.",
              },
            ]}
          />
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Governance & Controls</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="k-panel p-8">
              <h3 className="text-xl font-semibold mb-3">Evidence Receipts</h3>
              <p className="text-white/70 text-sm">
                Every decision backed by immutable evidence receipts with cryptographic proof and full audit trails.
              </p>
            </div>

            <div className="k-panel p-8">
              <h3 className="text-xl font-semibold mb-3">Controls Monitoring</h3>
              <p className="text-white/70 text-sm">
                Real-time controls monitoring with automated variance detection and alerting for operational and financial controls.
              </p>
            </div>

            <div className="k-panel p-8">
              <h3 className="text-xl font-semibold mb-3">Audit Trails</h3>
              <p className="text-white/70 text-sm">
                Comprehensive audit trails for all actions, decisions, and data changes with tamper-proof logging.
              </p>
            </div>

            <div className="k-panel p-8">
              <h3 className="text-xl font-semibold mb-3">Compliance Reporting</h3>
              <p className="text-white/70 text-sm">
                Automated compliance reporting for regulatory requirements with evidence-based proof and auditable outcomes.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="k-panel p-8">
            <h2 className="text-2xl font-semibold mb-4">Built for Trust</h2>
            <div className="text-white/70 space-y-3">
              <p>
                Security and governance aren't add-ons at Kincaid IQ—they're foundational. Our decision-grade value systems are built with controls-first architecture that meets the requirements of CFOs, auditors, and boards.
              </p>
              <p>
                From evidence receipts to controls monitoring, every layer of our platform is designed for auditability, compliance, and trust.
              </p>
            </div>
          </div>
        </section>

        <CTA />
      </Container>
    </>
  );
}