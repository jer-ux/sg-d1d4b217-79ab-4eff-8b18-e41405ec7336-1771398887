import { SEO } from "@/components/SEO";
import { Container, PageHero, CardGrid, CTA } from "@/components/Blocks";
import { Hero3D } from "@/components/Hero3D";

export default function SecurityGovernance() {
  return (
    <>
      <SEO
        title="Security & Governance — Kincaid IQ"
        description="Controls-first analytics. Evidence chains, access discipline, and audit trails that keep decision systems safe at scale."
      />
      <Container>
        <PageHero
          title="Security & Governance"
          subtitle="Controls-first analytics. Evidence chains, access discipline, and audit trails that keep decision systems safe at scale."
        />

        <div className="mb-8">
          <Hero3D />
        </div>

        {/* Security Metrics */}
        <div className="mb-12 grid md:grid-cols-4 gap-6">
          <div className="k-panel p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent animate-fade-in">
              100%
            </div>
            <div className="text-sm text-white/60 mt-2">Audit trail coverage</div>
          </div>
          <div className="k-panel p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent animate-fade-in">
              SOC 2
            </div>
            <div className="text-sm text-white/60 mt-2">Type II certified</div>
          </div>
          <div className="k-panel p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent animate-fade-in">
              Zero
            </div>
            <div className="text-sm text-white/60 mt-2">Governance incidents</div>
          </div>
          <div className="k-panel p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent animate-fade-in">
              Real-time
            </div>
            <div className="text-sm text-white/60 mt-2">Exception monitoring</div>
          </div>
        </div>

        <CardGrid
          items={[
            { 
              title: "Evidence Receipts Standard", 
              body: "Every claim is linked to sources, lineage, tests, and versioning—designed to be replayable and reviewable.",
              highlight: "Cryptographic signatures"
            },
            { 
              title: "Access + Segregation", 
              body: "Role-based access and separation of duties patterns aligned to finance-grade controls.",
              highlight: "Zero trust architecture"
            },
            { 
              title: "Audit Trail and Monitoring", 
              body: "Append-only event journals, exception queues, and control checks to reduce governance risk.",
              highlight: "Immutable logs"
            },
          ]}
        />

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="k-panel p-8">
            <div className="text-xl font-semibold mb-4 bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent">
              Governance principle
            </div>
            <div className="text-white/70 mb-4">
              If it can't be explained, replayed, and reconciled, it's not decision-grade.
            </div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>→ Complete data lineage from source to decision</li>
              <li>→ Version control for all logic and rules</li>
              <li>→ Reconciliation workflows with variance tracking</li>
              <li>→ Board-ready evidence packs on demand</li>
            </ul>
          </div>
          <div className="k-panel p-8">
            <div className="text-xl font-semibold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Security posture
            </div>
            <div className="text-white/70 mb-4">
              Access controls, data lineage, and exception monitoring built into every workflow—not bolted on after.
            </div>
            <ul className="text-sm text-white/60 space-y-2">
              <li>→ Encryption at rest and in transit (AES-256)</li>
              <li>→ Multi-factor authentication mandatory</li>
              <li>→ API keys with granular scope control</li>
              <li>→ SOC 2 Type II + HIPAA compliance</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 k-panel p-8">
          <div className="text-xl font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
            Why it matters for boards
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-white/70">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-emerald-400 text-xl">✓</div>
                <div>
                  <span className="text-white font-medium">Regulatory audit readiness</span> without scrambling — all evidence and controls already documented
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-cyan-400 text-xl">✓</div>
                <div>
                  <span className="text-white font-medium">Clear accountability chains</span> for high-impact decisions with owner assignments and approval gates
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="text-violet-400 text-xl">✓</div>
                <div>
                  <span className="text-white font-medium">Risk reduction</span> through controlled, measurable workflows with exception monitoring
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="text-amber-400 text-xl">✓</div>
                <div>
                  <span className="text-white font-medium">No black-box AI</span> or opaque analytics — full transparency into logic, data, and decisions
                </div>
              </div>
            </div>
          </div>
        </div>

        <CTA />
      </Container>
    </>
  );
}