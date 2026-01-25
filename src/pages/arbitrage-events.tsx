import { SEO } from "@/components/SEO";
import { Container, PageHero, CTA, CardGrid } from "@/components/Blocks";

export default function ArbitrageEventsPage() {
  return (
    <>
      <SEO
        title="Arbitrage Events — Kincaid IQ"
        description="Discover, validate, and act on value arbitrage opportunities across PBM rebates, cloud waste, contract leakage, and operational inefficiencies."
      />
      <Container>
        <PageHero
          title="Arbitrage Events"
          subtitle="Discover, validate, and act on value arbitrage opportunities across PBM rebates, cloud waste, contract leakage, and operational inefficiencies."
        />

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-semibold mb-6">What Are Arbitrage Events?</h2>
            <div className="k-panel p-8">
              <p className="text-white/70 leading-relaxed">
                Arbitrage events are specific, quantified opportunities where your organization can capture value by
                identifying gaps between contractual guarantees and actual performance, inefficiencies in operational
                processes, or misalignments between systems and policies.
              </p>
              <p className="text-white/70 leading-relaxed mt-4">
                Each event is backed by <strong className="text-white">evidence receipts</strong> from your data warehouse
                (Snowflake, Databricks) and operational systems (ServiceNow, Salesforce), ensuring CFO-grade confidence
                before action is taken.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Types of Arbitrage Events</h2>
            <CardGrid
              items={[
                {
                  title: "PBM Rebate Shortfalls",
                  body: "Contractual rebate guarantees vs. actual rebate payments. Automatically detect variance and trigger collection workflows.",
                },
                {
                  title: "Cloud Waste",
                  body: "Idle compute, over-provisioned storage, orphaned snapshots. Surface high-cost waste with evidence and recommended actions.",
                },
                {
                  title: "Contract Leakage",
                  body: "SaaS renewals without usage validation, vendor price increases without negotiation, auto-renew traps.",
                },
                {
                  title: "Operational Inefficiency",
                  body: "Manual processes that could be automated, duplicate efforts across teams, workflow bottlenecks causing delays.",
                },
                {
                  title: "Regulatory Compliance Gaps",
                  body: "Missing controls, incomplete audit trails, data quality issues that create regulatory risk and potential fines.",
                },
                {
                  title: "Revenue Leakage",
                  body: "Billing errors, unbilled services, pricing discrepancies. Capture lost revenue with automated detection and recovery.",
                },
              ]}
            />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Event Lifecycle</h2>
            <div className="space-y-4">
              {[
                {
                  stage: "1. Discovery",
                  desc: "Automated analytics in Snowflake/Databricks detect anomalies, variances, or policy violations.",
                },
                {
                  stage: "2. Validation",
                  desc: "Evidence receipts generated with lineage, freshness, and confidence scores. DQ gates ensure data quality.",
                },
                {
                  stage: "3. War Room Ingestion",
                  desc: "Event surfaces in War Room dashboard with dollar amount, time sensitivity, and actionability score.",
                },
                {
                  stage: "4. Assignment",
                  desc: "Decision owner assigned via Command Palette or workflow automation. Packet status moves to SUBMITTED.",
                },
                {
                  stage: "5. Approval",
                  desc: "CFO/controller reviews evidence, signs packet, moves to APPROVED. Value moved to Verified Savings Ledger.",
                },
                {
                  stage: "6. Realization",
                  desc: "Action taken (rebate collected, waste eliminated, contract renegotiated). Ledger updated to REALIZED.",
                },
              ].map((step) => (
                <div key={step.stage} className="k-panel p-6 flex gap-4">
                  <div className="text-emerald-400 font-mono font-semibold">{step.stage}</div>
                  <div className="text-white/70">{step.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Evidence-Backed Decision Making</h2>
            <div className="k-panel p-8">
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Every arbitrage event includes <strong className="text-white">evidence receipts</strong> that trace back
                  to source data, ensuring auditability and CFO-grade confidence.
                </p>
                <p className="font-mono text-sm bg-white/5 p-4 rounded-lg border border-white/10">
                  <strong className="text-white">Example Receipt:</strong><br />
                  {`{`}<br />
                  &nbsp;&nbsp;"id": "rcpt-pbm-001",<br />
                  &nbsp;&nbsp;"title": "PBM rebate variance query",<br />
                  &nbsp;&nbsp;"hash": "sha256:abc123...",<br />
                  &nbsp;&nbsp;"freshness": "PT5M",<br />
                  &nbsp;&nbsp;"confidence": 0.94,<br />
                  &nbsp;&nbsp;"sourceSystem": "snowflake",<br />
                  &nbsp;&nbsp;"sourceRef": "query-123-456",<br />
                  &nbsp;&nbsp;"url": "https://snowflake.com/..."{`}`}
                  <br />{`}`}
                </p>
                <p>
                  This receipt includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Lineage:</strong> Trace back to source query/table in Snowflake</li>
                  <li><strong className="text-white">Hash:</strong> Cryptographic proof of data integrity</li>
                  <li><strong className="text-white">Freshness:</strong> How recent is this data? (ISO 8601 duration)</li>
                  <li><strong className="text-white">Confidence:</strong> Model confidence score (0.0 - 1.0)</li>
                  <li><strong className="text-white">Source Ref:</strong> Direct link to query/record in source system</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Integration with War Room</h2>
            <div className="k-panel p-8">
              <p className="text-white/70 leading-relaxed">
                Arbitrage events are automatically ingested into the <strong className="text-white">War Room</strong> from
                your data warehouse via secure API. The War Room dashboard organizes events into four lanes:
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-emerald-400 font-semibold mb-2">Value Lane</div>
                  <div className="text-sm text-white/70">
                    High-dollar opportunities (rebate shortfalls, revenue leakage, contract savings)
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-blue-400 font-semibold mb-2">Controls Lane</div>
                  <div className="text-sm text-white/70">
                    Compliance gaps, audit risks, data quality incidents, policy violations
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-violet-400 font-semibold mb-2">Agentic Lane</div>
                  <div className="text-sm text-white/70">
                    AI-driven automation opportunities, workflow optimization, process improvement
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <div className="text-amber-400 font-semibold mb-2">Marketplace Lane</div>
                  <div className="text-sm text-white/70">
                    Third-party integrations, vendor onboarding, marketplace health, SLA monitoring
                  </div>
                </div>
              </div>
            </div>
          </section>

          <CTA />
        </div>
      </Container>
    </>
  );
}