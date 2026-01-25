import { SEO } from "@/components/SEO";
import { Container, PageHero, CTA } from "@/components/Blocks";
import Link from "next/link";

export default function DocsPage() {
  return (
    <>
      <SEO
        title="Documentation — Kincaid IQ"
        description="Integration guides, API references, and best practices for Kincaid IQ platform."
      />
      <Container>
        <PageHero
          title="Documentation"
          subtitle="Integration guides, API references, and best practices for Kincaid IQ platform."
        />

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">Integration Guides</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/docs/snowflake-integration" className="k-panel p-6 hover:bg-white/5 transition">
                <div className="font-semibold text-white mb-2">Snowflake Integration</div>
                <div className="text-sm text-white/70">
                  Complete setup guide for automatic event ingestion from Snowflake data warehouse.
                </div>
              </Link>
              <Link href="/docs/snowflake-quickstart" className="k-panel p-6 hover:bg-white/5 transition">
                <div className="font-semibold text-white mb-2">Snowflake Quick Start</div>
                <div className="text-sm text-white/70">
                  5-minute setup: generate token, configure Vercel, deploy Snowflake procedure.
                </div>
              </Link>
              <Link href="/docs/snowflake-secrets" className="k-panel p-6 hover:bg-white/5 transition">
                <div className="font-semibold text-white mb-2">Snowflake Secrets Management</div>
                <div className="text-sm text-white/70">
                  Secure token storage, rotation workflow, access control, and audit logging.
                </div>
              </Link>
              <Link href="/docs/api-ingest-examples" className="k-panel p-6 hover:bg-white/5 transition">
                <div className="font-semibold text-white mb-2">API Ingest Examples</div>
                <div className="text-sm text-white/70">
                  Single event, batch ingestion, ServiceNow/Databricks integration patterns.
                </div>
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">API Reference</h2>
            <div className="space-y-4">
              <div className="k-panel p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-mono text-sm text-emerald-400">POST /api/war-room/ingest</div>
                  <div className="text-xs text-white/50">Authentication Required</div>
                </div>
                <div className="text-sm text-white/70 mb-4">
                  Ingest single event or batch into War Room. Requires <code className="text-white">x-kiq-ingest-token</code> header.
                </div>
                <div className="font-mono text-xs bg-white/5 p-4 rounded-lg border border-white/10">
                  {`curl -X POST https://yourdomain.com/api/war-room/ingest \\
  -H "Content-Type: application/json" \\
  -H "x-kiq-ingest-token: your-token" \\
  -d '{"id":"EVT-001","lane":"value","title":"Test event"}'`}
                </div>
              </div>

              <div className="k-panel p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-mono text-sm text-blue-400">GET /api/war-room/stream</div>
                  <div className="text-xs text-white/50">Server-Sent Events</div>
                </div>
                <div className="text-sm text-white/70 mb-4">
                  Real-time SSE stream for War Room updates (event_upsert, event_delete, ledger_update).
                </div>
                <div className="font-mono text-xs bg-white/5 p-4 rounded-lg border border-white/10">
                  {`const eventSource = new EventSource('/api/war-room/stream');
eventSource.onmessage = (e) => {
  const { type, event } = JSON.parse(e.data);
  // Update UI
};`}
                </div>
              </div>

              <div className="k-panel p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-mono text-sm text-violet-400">POST /api/packet/submit</div>
                  <div className="text-xs text-white/50">Operator Role Required</div>
                </div>
                <div className="text-sm text-white/70 mb-4">
                  Submit packet for approval. Enforces policy checks (owner assigned, receipts attached).
                </div>
                <div className="font-mono text-xs bg-white/5 p-4 rounded-lg border border-white/10">
                  {`curl -X POST /api/packet/submit \\
  -H "Authorization: Bearer <token>" \\
  -d '{"eventId":"evt-123"}'`}
                </div>
              </div>

              <div className="k-panel p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-mono text-sm text-amber-400">POST /api/macros/submit-drafts</div>
                  <div className="text-xs text-white/50">Operator Role Required</div>
                </div>
                <div className="text-sm text-white/70 mb-4">
                  Bulk submit up to 25 DRAFT packets in a specific lane. Returns success/failure breakdown.
                </div>
                <div className="font-mono text-xs bg-white/5 p-4 rounded-lg border border-white/10">
                  {`curl -X POST /api/macros/submit-drafts \\
  -H "Authorization: Bearer <token>" \\
  -d '{"lane":"value","max":25}'`}
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Best Practices</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Evidence Receipt Quality",
                  points: [
                    "Always include confidence scores (0.0 - 1.0) from ML models",
                    "Set freshness thresholds based on data criticality (PT5M for real-time, PT1H for batch)",
                    "Use SHA-256 hashes for all query results (tamper detection)",
                    "Include direct links to source queries in Snowflake/Databricks",
                  ],
                },
                {
                  title: "Change Data Capture (CDC)",
                  points: [
                    "Hash payloads before delivery to detect meaningful changes",
                    "Store DELIVERY_HASH in source table to prevent duplicate sends",
                    "Use LAST_DELIVERED_AT to track delivery timing",
                    "Log all delivery attempts (success and failure) for audit trail",
                  ],
                },
                {
                  title: "Security & Compliance",
                  points: [
                    "Rotate ingest tokens every 90 days (use Snowflake secrets)",
                    "Grant minimal permissions (USAGE on integration, EXECUTE on procedure)",
                    "Enable query logging in Snowflake for audit trail",
                    "Use mTLS for production deployments (certificate-based auth)",
                  ],
                },
                {
                  title: "Performance Optimization",
                  points: [
                    "Batch events up to 50 per request (6x faster than serial)",
                    "Index UPDATED_AT column in WARROOM_EVENTS table",
                    "Use Snowflake tasks with 5-minute schedule (balance freshness vs cost)",
                    "Monitor delivery log for failed attempts (retry logic)",
                  ],
                },
              ].map((section) => (
                <div key={section.title} className="k-panel p-6">
                  <div className="font-semibold text-white mb-3">{section.title}</div>
                  <ul className="list-disc list-inside space-y-2 text-sm text-white/70 ml-4">
                    {section.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Support</h2>
            <div className="k-panel p-8">
              <p className="text-white/70 leading-relaxed mb-4">
                Need help with integration or have questions about the platform?
              </p>
              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="px-4 py-2 rounded-xl bg-white text-black hover:bg-white/90 transition text-sm font-medium"
                >
                  Contact Support
                </Link>
                <Link
                  href="https://github.com/kincaid-iq/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm"
                >
                  View on GitHub
                </Link>
              </div>
            </div>
          </section>

          <CTA />
        </div>
      </Container>
    </>
  );
}