"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, DollarSign, Shield, Calendar, User } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Container, PageHero, CTA, CardGrid } from "@/components/Blocks";
import { ArbitrageEventDrawer } from "@/components/arbitrage/ArbitrageEventDrawer";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function tone(severity?: string) {
  if (severity === "CRITICAL") return "border-rose-400/25 bg-rose-400/10 text-rose-100";
  if (severity === "HIGH") return "border-amber-300/25 bg-amber-300/10 text-amber-100";
  return "border-emerald-400/25 bg-emerald-400/10 text-emerald-100";
}

function Chip({ label, className }: { label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${className ?? ""}`}>
      {label}
    </span>
  );
}

// Mock arbitrage events for the listing
const mockEvents = [
  {
    event_id: "AE-10901",
    event_type: "SEC × 5500 Plan Asset Variance",
    severity: "CRITICAL",
    verification_status: "VERIFIED",
    quarter: "2024-Q3",
    company_name: "Anthem BCBS",
    variance_value: 2450000,
    variance_pct: 0.087,
    owner: "Sarah Chen",
    status: "IN_REVIEW",
    created_at: "2024-10-15T14:32:00Z",
  },
  {
    event_id: "AE-10902",
    event_type: "Benefits Disclosure Coverage Regression",
    severity: "HIGH",
    verification_status: "VERIFIED",
    quarter: "2024-Q3",
    company_name: "UnitedHealth Group",
    drop_rate: 0.124,
    coverage_rate: 0.756,
    prev_coverage: 0.88,
    owner: "Michael Rodriguez",
    status: "SUBMITTED",
    created_at: "2024-10-14T09:15:00Z",
  },
  {
    event_id: "AE-10903",
    event_type: "Form 5500 Schedule C Fee Disclosure Gap",
    severity: "HIGH",
    verification_status: "NOT_VERIFIED",
    quarter: "2024-Q2",
    company_name: "Cigna Health",
    variance_value: 890000,
    variance_pct: 0.034,
    owner: "Jessica Park",
    status: "DRAFT",
    created_at: "2024-10-12T16:45:00Z",
  },
  {
    event_id: "AE-10904",
    event_type: "SEC × 5500 Participant Count Mismatch",
    severity: "MEDIUM",
    verification_status: "VERIFIED",
    quarter: "2024-Q3",
    company_name: "Aetna CVS Health",
    variance_value: 0,
    variance_pct: 0.012,
    owner: "David Kim",
    status: "APPROVED",
    created_at: "2024-10-10T11:20:00Z",
  },
];

function EventCard({ event, onClick }: { event: any; onClick: () => void }) {
  const verified = event.verification_status === "VERIFIED";

  return (
    <motion.div
      variants={fadeUp}
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Chip label={event.severity} className={tone(event.severity)} />
              <Chip
                label={verified ? "VERIFIED" : "NOT VERIFIED"}
                className={
                  verified
                    ? "border-emerald-400/25 bg-emerald-400/10 text-emerald-100"
                    : "border-white/15 bg-white/[0.05] text-white/80"
                }
              />
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-white/95">
              {event.event_type}
            </h3>
            <div className="mt-2 flex items-center gap-3 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {event.quarter}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {event.owner}
              </span>
            </div>
          </div>
          {event.severity === "CRITICAL" && (
            <AlertTriangle className="h-6 w-6 shrink-0 text-rose-400" />
          )}
        </motion.div>

        <div className="space-y-3 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Company</span>
            <span className="font-medium text-white/90">{event.company_name}</span>
          </div>
          
          {typeof event.variance_value === "number" && event.variance_value > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Variance</span>
              <span className="font-mono font-semibold text-amber-300">
                ${(event.variance_value / 1000000).toFixed(2)}M
              </span>
            </div>
          )}
          
          {typeof event.drop_rate === "number" && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/60">Drop Rate</span>
              <span className="font-mono font-semibold text-rose-300">
                {(event.drop_rate * 100).toFixed(1)}%
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Status</span>
            <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-1 text-xs text-white/85">
              {event.status}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Event ID</span>
            <span className="font-mono text-xs text-white/70">{event.event_id}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center text-sm text-white/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span>Click to view details</span>
          <svg
            className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function ArbitrageEventsPage() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedEventId, setSelectedEventId] = React.useState<string | null>(null);

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedEventId(null), 300);
  };

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
          {/* Live Events Section */}
          <section>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Live Arbitrage Events</h2>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-sm text-white/60">{mockEvents.length} active events</span>
              </div>
            </div>
            
            <motion.div
              className="grid gap-6 md:grid-cols-2"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {mockEvents.map((event) => (
                <EventCard
                  key={event.event_id}
                  event={event}
                  onClick={() => handleEventClick(event.event_id)}
                />
              ))}
            </motion.div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold">What Are Arbitrage Events?</h2>
            <div className="k-panel p-8">
              <p className="leading-relaxed text-white/70">
                Arbitrage events are specific, quantified opportunities where your organization can capture value by
                identifying gaps between contractual guarantees and actual performance, inefficiencies in operational
                processes, or misalignments between systems and policies.
              </p>
              <p className="mt-4 leading-relaxed text-white/70">
                Each event is backed by <strong className="text-white">evidence receipts</strong> from your data warehouse
                (Snowflake, Databricks) and operational systems (ServiceNow, Salesforce), ensuring CFO-grade confidence
                before action is taken.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold">Types of Arbitrage Events</h2>
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
            <h2 className="mb-6 text-2xl font-semibold">Event Lifecycle</h2>
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
                <div key={step.stage} className="k-panel flex gap-4 p-6">
                  <div className="font-mono font-semibold text-emerald-400">{step.stage}</div>
                  <div className="text-white/70">{step.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-2xl font-semibold">Evidence-Backed Decision Making</h2>
            <div className="k-panel p-8">
              <div className="space-y-4 leading-relaxed text-white/70">
                <p>
                  Every arbitrage event includes <strong className="text-white">evidence receipts</strong> that trace back
                  to source data, ensuring auditability and CFO-grade confidence.
                </p>
                <p className="rounded-lg border border-white/10 bg-white/5 p-4 font-mono text-sm">
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
                <ul className="ml-4 list-inside list-disc space-y-2">
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
            <h2 className="mb-6 text-2xl font-semibold">Integration with War Room</h2>
            <div className="k-panel p-8">
              <p className="leading-relaxed text-white/70">
                Arbitrage events are automatically ingested into the <strong className="text-white">War Room</strong> from
                your data warehouse via secure API. The War Room dashboard organizes events into four lanes:
              </p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 font-semibold text-emerald-400">Value Lane</div>
                  <div className="text-sm text-white/70">
                    High-dollar opportunities (rebate shortfalls, revenue leakage, contract savings)
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 font-semibold text-blue-400">Controls Lane</div>
                  <div className="text-sm text-white/70">
                    Compliance gaps, audit risks, data quality incidents, policy violations
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 font-semibold text-violet-400">Agentic Lane</div>
                  <div className="text-sm text-white/70">
                    AI-driven automation opportunities, workflow optimization, process improvement
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 font-semibold text-amber-400">Marketplace Lane</div>
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

      <ArbitrageEventDrawer
        open={drawerOpen}
        onClose={handleCloseDrawer}
        eventId={selectedEventId}
      />
    </>
  );
}