import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid } from "@/components/Blocks";

export default function AdminPage() {
  return (
    <>
      <SEO title="Administration — Kincaid IQ" description="Manage tenants, roles, policies, and platform settings." />
      <Container>
        <PageHero
          title="Administration"
          subtitle="Platform governance, access control, and tenant configuration."
        />
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Admin Controls</h2>
            <CardGrid
              items={[
                { title: "User Management", body: "SSO configuration, role assignment, and access logs." },
                { title: "Policy Engine", body: "Define approval workflows and value thresholds." },
                { title: "Audit Logs", body: "Complete platform activity history for compliance." },
                { title: "Tenant Settings", body: "Branding, regional data residency, and limits." },
              ]}
            />
          </section>
        </div>
      </Container>
    </>
  );
}