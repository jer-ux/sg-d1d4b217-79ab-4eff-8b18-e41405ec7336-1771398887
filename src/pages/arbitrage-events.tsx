"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { AlertTriangle, TrendingDown, DollarSign, Shield, Calendar, User, TrendingUp, Activity, Zap } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Container, PageHero, CTA, CardGrid } from "@/components/Blocks";
import { ArbitrageEventDrawer } from "@/components/arbitrage/ArbitrageEventDrawer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function getCategoryTheme(category: string) {
  const themes: Record<string, { bg: string; border: string; text: string; icon: string; gradient: string; cardBg: string; accentBar: string }> = {
    "Eligibility Leakage": {
      bg: "bg-rose-500/40",
      border: "border-rose-400/60",
      text: "text-rose-200",
      icon: "text-rose-300",
      gradient: "from-rose-500/40 via-rose-500/20 to-rose-500/10",
      cardBg: "bg-rose-950/40",
      accentBar: "bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600",
    },
    "PBM / Rx Economics": {
      bg: "bg-blue-500/40",
      border: "border-blue-400/60",
      text: "text-blue-200",
      icon: "text-blue-300",
      gradient: "from-blue-500/40 via-blue-500/20 to-blue-500/10",
      cardBg: "bg-blue-950/40",
      accentBar: "bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600",
    },
    "Pharmacy Pricing": {
      bg: "bg-violet-500/40",
      border: "border-violet-400/60",
      text: "text-violet-200",
      icon: "text-violet-300",
      gradient: "from-violet-500/40 via-violet-500/20 to-violet-500/10",
      cardBg: "bg-violet-950/40",
      accentBar: "bg-gradient-to-b from-violet-400 via-violet-500 to-violet-600",
    },
    "Network / Access": {
      bg: "bg-emerald-500/40",
      border: "border-emerald-400/60",
      text: "text-emerald-200",
      icon: "text-emerald-300",
      gradient: "from-emerald-500/40 via-emerald-500/20 to-emerald-500/10",
      cardBg: "bg-emerald-950/40",
      accentBar: "bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600",
    },
    "Contract Leakage": {
      bg: "bg-amber-500/40",
      border: "border-amber-400/60",
      text: "text-amber-200",
      icon: "text-amber-300",
      gradient: "from-amber-500/40 via-amber-500/20 to-amber-500/10",
      cardBg: "bg-amber-950/40",
      accentBar: "bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600",
    },
    "Cloud Waste": {
      bg: "bg-cyan-500/40",
      border: "border-cyan-400/60",
      text: "text-cyan-200",
      icon: "text-cyan-300",
      gradient: "from-cyan-500/40 via-cyan-500/20 to-cyan-500/10",
      cardBg: "bg-cyan-950/40",
      accentBar: "bg-gradient-to-b from-cyan-400 via-cyan-500 to-cyan-600",
    },
  };

  return themes[category] || {
    bg: "bg-white/20",
    border: "border-white/30",
    text: "text-white",
    icon: "text-white/80",
    gradient: "from-white/20 via-white/10 to-white/5",
    cardBg: "bg-white/10",
    accentBar: "bg-gradient-to-b from-white/60 via-white/40 to-white/20",
  };
}

function getSeverityTheme(severity?: string) {
  if (severity === "CRITICAL") return { 
    bg: "bg-rose-500/30", 
    border: "border-rose-300/70", 
    text: "text-rose-100",
    dot: "bg-rose-400",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.5)]"
  };
  if (severity === "HIGH") return { 
    bg: "bg-orange-500/30", 
    border: "border-orange-300/70", 
    text: "text-orange-100",
    dot: "bg-orange-400",
    glow: "shadow-[0_0_20px_rgba(251,146,60,0.5)]"
  };
  if (severity === "MEDIUM") return { 
    bg: "bg-yellow-500/30", 
    border: "border-yellow-300/70", 
    text: "text-yellow-100",
    dot: "bg-yellow-400",
    glow: "shadow-[0_0_20px_rgba(250,204,21,0.5)]"
  };
  return { 
    bg: "bg-emerald-500/30", 
    border: "border-emerald-300/70", 
    text: "text-emerald-100",
    dot: "bg-emerald-400",
    glow: "shadow-[0_0_20px_rgba(52,211,153,0.5)]"
  };
}

function getStatusTheme(status: string) {
  const themes: Record<string, { bg: string; border: string; text: string }> = {
    "IN_REVIEW": { bg: "bg-blue-500/30", border: "border-blue-300/70", text: "text-blue-100" },
    "SUBMITTED": { bg: "bg-violet-500/30", border: "border-violet-300/70", text: "text-violet-100" },
    "DRAFT": { bg: "bg-zinc-500/30", border: "border-zinc-300/70", text: "text-zinc-200" },
    "APPROVED": { bg: "bg-emerald-500/30", border: "border-emerald-300/70", text: "text-emerald-100" },
    "ACTIONED": { bg: "bg-cyan-500/30", border: "border-cyan-300/70", text: "text-cyan-100" },
  };
  return themes[status] || { bg: "bg-white/20", border: "border-white/30", text: "text-white" };
}

function Chip({ label, className }: { label: string; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border-2 px-3 py-1 text-xs font-bold ${className ?? ""}`}>
      {label}
    </span>
  );
}

// Mock arbitrage events for the listing
const mockEvents = [
  {
    event_id: "AE-10901",
    event_type: "SEC × 5500 Plan Asset Variance",
    category: "Eligibility Leakage",
    severity: "CRITICAL",
    verification_status: "VERIFIED",
    quarter: "2024-Q3",
    company_name: "Anthem BCBS",
    variance_value: 2450000,
    variance_pct: 0.087,
    owner: "Sarah Chen",
    status: "IN_REVIEW",
    created_at: "2024-10-15T14:32:00Z",
    icon_type: "alert" as const,
  },
  {
    event_id: "AE-10902",
    event_type: "Benefits Disclosure Coverage Regression",
    category: "PBM / Rx Economics",
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
    icon_type: "trending" as const,
  },
  {
    event_id: "AE-10903",
    event_type: "Form 5500 Schedule C Fee Disclosure Gap",
    category: "Contract Leakage",
    severity: "HIGH",
    verification_status: "NOT_VERIFIED",
    quarter: "2024-Q2",
    company_name: "Cigna Health",
    variance_value: 890000,
    variance_pct: 0.034,
    owner: "Jessica Park",
    status: "DRAFT",
    created_at: "2024-10-12T16:45:00Z",
    icon_type: "dollar" as const,
  },
  {
    event_id: "AE-10904",
    event_type: "SEC × 5500 Participant Count Mismatch",
    category: "Network / Access",
    severity: "MEDIUM",
    verification_status: "VERIFIED",
    quarter: "2024-Q3",
    company_name: "Aetna CVS Health",
    variance_value: 0,
    variance_pct: 0.012,
    owner: "David Kim",
    status: "APPROVED",
    created_at: "2024-10-10T11:20:00Z",
    icon_type: "shield" as const,
  },
  {
    event_id: "AE-10905",
    event_type: "Cloud Resource Over-Provisioning",
    category: "Cloud Waste",
    severity: "HIGH",
    verification_status: "VERIFIED",
    quarter: "2024-Q3",
    company_name: "Tech Corp",
    variance_value: 1200000,
    variance_pct: 0.045,
    owner: "Alex Thompson",
    status: "ACTIONED",
    created_at: "2024-10-09T08:30:00Z",
    icon_type: "activity" as const,
  },
  {
    event_id: "AE-10906",
    event_type: "Specialty Drug Pricing Variance",
    category: "Pharmacy Pricing",
    severity: "CRITICAL",
    verification_status: "VERIFIED",
    quarter: "2024-Q3",
    company_name: "Express Scripts",
    variance_value: 1850000,
    variance_pct: 0.092,
    owner: "Emma Wilson",
    status: "IN_REVIEW",
    created_at: "2024-10-08T13:15:00Z",
    icon_type: "zap" as const,
  },
];

function EventCard({ event, onClick }: { event: any; onClick: () => void }) {
  const verified = event.verification_status === "VERIFIED";
  const categoryTheme = getCategoryTheme(event.category);
  const severityTheme = getSeverityTheme(event.severity);
  const statusTheme = getStatusTheme(event.status);

  const IconComponent = 
    event.icon_type === "alert" ? AlertTriangle :
    event.icon_type === "trending" ? TrendingDown :
    event.icon_type === "dollar" ? DollarSign :
    event.icon_type === "shield" ? Shield :
    event.icon_type === "activity" ? Activity :
    event.icon_type === "zap" ? Zap :
    TrendingUp;

  return (
    <motion.div
      variants={fadeUp}
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 ${categoryTheme.border} ${categoryTheme.cardBg} backdrop-blur-sm p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_20px_100px_rgba(0,0,0,0.8)]`}
    >
      {/* SUPER VIBRANT animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryTheme.gradient} opacity-80 transition-opacity duration-300 group-hover:opacity-100`} />
      
      {/* THICK colorful accent bar on left with STRONG glow */}
      <div className={`absolute left-0 top-0 h-full w-1.5 ${categoryTheme.accentBar} shadow-[0_0_30px_currentColor] opacity-100`} />
      
      <div className="relative">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Chip 
                label={event.severity} 
                className={`${severityTheme.bg} ${severityTheme.border} ${severityTheme.text} ${severityTheme.glow} font-black uppercase tracking-wider`}
              />
              <Chip
                label={verified ? "✓ VERIFIED" : "⚠ NOT VERIFIED"}
                className={
                  verified
                    ? "border-2 border-emerald-300/70 bg-emerald-500/40 text-emerald-50 shadow-[0_0_25px_rgba(52,211,153,0.6)] font-black uppercase"
                    : "border-2 border-amber-300/70 bg-amber-500/40 text-amber-50 shadow-[0_0_25px_rgba(251,191,36,0.6)] font-black uppercase"
                }
              />
              <Chip
                label={event.category}
                className={`${categoryTheme.bg} ${categoryTheme.border} ${categoryTheme.text} font-bold uppercase tracking-wide shadow-lg`}
              />
            </div>
            <h3 className="text-xl font-black text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] group-hover:text-white">
              {event.event_type}
            </h3>
            <div className="mt-3 flex items-center gap-3 text-sm text-white/90 font-semibold">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {event.quarter}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {event.owner}
              </span>
            </div>
          </div>
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl ${categoryTheme.bg} ${categoryTheme.border} border-2 shadow-[0_0_30px_currentColor]`}>
            <IconComponent className={`h-8 w-8 ${categoryTheme.icon} drop-shadow-lg`} />
          </div>
        </div>

        <div className="space-y-3 border-t-2 border-white/30 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/80 font-semibold">Company</span>
            <span className="font-bold text-white drop-shadow">{event.company_name}</span>
          </div>
          
          {typeof event.variance_value === "number" && event.variance_value > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80 font-semibold">Variance</span>
              <span className={`font-mono text-xl font-black ${categoryTheme.text} drop-shadow-[0_2px_15px_currentColor]`}>
                ${(event.variance_value / 1000000).toFixed(2)}M
              </span>
            </div>
          )}
          
          {typeof event.drop_rate === "number" && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80 font-semibold">Drop Rate</span>
              <span className="font-mono text-xl font-black text-rose-300 drop-shadow-[0_2px_15px_rgba(244,63,94,0.8)]">
                {(event.drop_rate * 100).toFixed(1)}%
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/80 font-semibold">Status</span>
            <span className={`rounded-full border-2 px-5 py-1.5 text-xs font-black uppercase tracking-wider shadow-lg ${statusTheme.bg} ${statusTheme.border} ${statusTheme.text}`}>
              {event.status.replace(/_/g, " ")}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-white/80 font-semibold">Event ID</span>
            <span className="font-mono text-sm text-white font-bold">{event.event_id}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center text-sm text-white/70 font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-white">
          <span>Click to view details →</span>
          <svg
            className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
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
                  color: "from-blue-500/40 to-blue-500/20",
                  border: "border-blue-400/60",
                  accentBar: "bg-gradient-to-r from-blue-400 to-blue-600",
                },
                {
                  stage: "2. Validation",
                  desc: "Evidence receipts generated with lineage, freshness, and confidence scores. DQ gates ensure data quality.",
                  color: "from-violet-500/40 to-violet-500/20",
                  border: "border-violet-400/60",
                  accentBar: "bg-gradient-to-r from-violet-400 to-violet-600",
                },
                {
                  stage: "3. War Room Ingestion",
                  desc: "Event surfaces in War Room dashboard with dollar amount, time sensitivity, and actionability score.",
                  color: "from-emerald-500/40 to-emerald-500/20",
                  border: "border-emerald-400/60",
                  accentBar: "bg-gradient-to-r from-emerald-400 to-emerald-600",
                },
                {
                  stage: "4. Assignment",
                  desc: "Decision owner assigned via Command Palette or workflow automation. Packet status moves to SUBMITTED.",
                  color: "from-amber-500/40 to-amber-500/20",
                  border: "border-amber-400/60",
                  accentBar: "bg-gradient-to-r from-amber-400 to-amber-600",
                },
                {
                  stage: "5. Approval",
                  desc: "CFO/controller reviews evidence, signs packet, moves to APPROVED. Value moved to Verified Savings Ledger.",
                  color: "from-cyan-500/40 to-cyan-500/20",
                  border: "border-cyan-400/60",
                  accentBar: "bg-gradient-to-r from-cyan-400 to-cyan-600",
                },
                {
                  stage: "6. Realization",
                  desc: "Action taken (rebate collected, waste eliminated, contract renegotiated). Ledger updated to REALIZED.",
                  color: "from-rose-500/40 to-rose-500/20",
                  border: "border-rose-400/60",
                  accentBar: "bg-gradient-to-r from-rose-400 to-rose-600",
                },
              ].map((step) => (
                <div key={step.stage} className={`relative overflow-hidden rounded-2xl border-2 ${step.border} bg-white/[0.02] p-6`}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-60`} />
                  <div className={`absolute left-0 top-0 h-full w-1.5 ${step.accentBar} shadow-[0_0_20px_currentColor]`} />
                  <div className="relative flex gap-4">
                    <div className="font-mono font-bold text-lg text-white">{step.stage}</div>
                    <div className="text-white/80 font-medium">{step.desc}</div>
                  </div>
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
                <div className="relative overflow-hidden rounded-lg border-2 border-emerald-400/60 bg-emerald-950/40 p-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/40 to-transparent" />
                  <div className="relative">
                    <div className="mb-2 font-bold text-lg text-emerald-300">Value Lane</div>
                    <div className="text-sm text-white/80">
                      High-dollar opportunities (rebate shortfalls, revenue leakage, contract savings)
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border-2 border-blue-400/60 bg-blue-950/40 p-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 to-transparent" />
                  <div className="relative">
                    <div className="mb-2 font-bold text-lg text-blue-300">Controls Lane</div>
                    <div className="text-sm text-white/80">
                      Compliance gaps, audit risks, data quality incidents, policy violations
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border-2 border-violet-400/60 bg-violet-950/40 p-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/40 to-transparent" />
                  <div className="relative">
                    <div className="mb-2 font-bold text-lg text-violet-300">Agentic Lane</div>
                    <div className="text-sm text-white/80">
                      AI-driven automation opportunities, workflow optimization, process improvement
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden rounded-lg border-2 border-amber-400/60 bg-amber-950/40 p-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/40 to-transparent" />
                  <div className="relative">
                    <div className="mb-2 font-bold text-lg text-amber-300">Marketplace Lane</div>
                    <div className="text-sm text-white/80">
                      Third-party integrations, vendor onboarding, marketplace health, SLA monitoring
                    </div>
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