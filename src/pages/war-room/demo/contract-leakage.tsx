import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Shield, TrendingUp, AlertTriangle, ExternalLink, FileText, DollarSign } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ContractLeakageDemo() {
  const [activeTab, setActiveTab] = useState<"overview" | "methodology" | "evidence" | "actions">("overview");

  return (
    <>
      <Head>
        <title>Contract Leakage Analysis — War Room Demo</title>
        <meta
          name="description"
          content="Quantified contract leakage and pricing errors with audit-grade evidence and actionable remediation paths."
        />
      </Head>

      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/war-room"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to War Room
                </Link>
                <div className="h-4 w-px bg-white/20" />
                <div>
                  <div className="text-xs text-white/50">War Room Demo</div>
                  <div className="text-sm font-semibold">Contract Leakage Analysis</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button asChild variant="outline" className="h-9 rounded-xl border-white/15 bg-transparent">
                  <Link href="/contact">Request Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-12">
          {/* Hero Metric */}
          <section className="mb-12">
            <Card className="overflow-hidden rounded-3xl border-rose-800/40 bg-gradient-to-br from-rose-950/40 via-red-950/30 to-orange-950/20 shadow-[0_0_60px_rgba(251,113,133,0.15)]">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-950/60 backdrop-blur-sm">
                    <DollarSign className="h-6 w-6 text-rose-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-rose-300">
                      Contract Leakage Exposure
                    </div>
                    <div className="text-sm text-white/60">Pricing Errors & Out-of-Network Overpayments</div>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="text-6xl font-bold tracking-tight text-white drop-shadow-2xl">$3.4M</div>
                    <div className="mt-3 flex items-center gap-2 text-rose-400">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-lg font-semibold">Annual leakage identified</span>
                    </div>
                    <div className="mt-4 text-white/70">
                      Systematic contract pricing errors and out-of-network overpayments creating recoverable EBITDA
                      impact across portfolio companies. $2.1M in pricing errors, $890K in OON issues, $450K in bundle
                      violations.
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4">
                    <MetricCard label="Pricing Errors" value="$2.1M" trend="High Recovery" />
                    <MetricCard label="Out-of-Network" value="$890K" trend="Negotiable" />
                    <MetricCard label="Bundle Violations" value="$450K" trend="Preventable" />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <StatusBadge status="VERIFIED" />
                  <StatusBadge status="HIGH_CONFIDENCE" />
                  <StatusBadge status="ACTIONABLE" />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Tabs */}
          <nav className="mb-8 flex gap-2 border-b border-white/10">
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              label="Overview"
            />
            <TabButton
              active={activeTab === "methodology"}
              onClick={() => setActiveTab("methodology")}
              label="Methodology"
            />
            <TabButton
              active={activeTab === "evidence"}
              onClick={() => setActiveTab("evidence")}
              label="Evidence"
            />
            <TabButton
              active={activeTab === "actions"}
              onClick={() => setActiveTab("actions")}
              label="Actions"
            />
          </nav>

          {/* Tab Content */}
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "methodology" && <MethodologyTab />}
          {activeTab === "evidence" && <EvidenceTab />}
          {activeTab === "actions" && <ActionsTab />}
        </main>
      </div>
    </>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-sm font-medium transition-all ${
        active
          ? "border-b-2 border-white text-white"
          : "border-b-2 border-transparent text-white/50 hover:text-white/80"
      }`}
    >
      {label}
    </button>
  );
}

function MetricCard({ label, value, trend }: { label: string; value: string; trend: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-sm">
      <div className="text-xs text-white/50">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums text-white">{value}</div>
      <div className="mt-1 text-xs font-medium text-rose-400">{trend}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    VERIFIED: { bg: "bg-emerald-400/20", text: "text-emerald-300", border: "border-emerald-400/40", label: "Verified" },
    HIGH_CONFIDENCE: { bg: "bg-blue-400/20", text: "text-blue-300", border: "border-blue-400/40", label: "91% Confidence" },
    ACTIONABLE: { bg: "bg-purple-400/20", text: "text-purple-300", border: "border-purple-400/40", label: "Actionable" },
  };

  const { bg, text, border, label } = config[status as keyof typeof config];

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${bg} ${text} ${border}`}>
      <Shield className="h-3 w-3" />
      {label}
    </span>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-xl font-semibold">Executive Summary</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <p className="text-white/80 leading-relaxed">
              Systematic contract compliance failures are creating $3.4M in annual leakage across the portfolio.
              Analysis reveals three primary leakage categories:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span>Pricing errors ($2.1M): Claims paid above contracted rates, missing tiered discounts, incorrect DRG weights</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span>Out-of-network overpayments ($890K): Unapproved providers, missing referrals, balance billing exposure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span>Bundle violations ($450K): Unbundled procedures, duplicate billing, missing global period discounts</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Leakage Categories</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FactorCard
            title="Pricing Errors"
            value="$2.1M"
            description="Claims paid above contracted fee schedules"
            impact="62% of total leakage"
            severity="critical"
          />
          <FactorCard
            title="Out-of-Network"
            value="$890K"
            description="Unapproved providers and missing authorizations"
            impact="26% of total leakage"
            severity="high"
          />
          <FactorCard
            title="Bundle Violations"
            value="$450K"
            description="Unbundled procedures and duplicate billing"
            impact="13% of total leakage"
            severity="medium"
          />
          <FactorCard
            title="Recovery Rate"
            value="78%"
            description="Estimated recoverable amount through audits"
            impact="$2.65M actionable"
            severity="medium"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Portfolio Impact</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm text-white/50">Companies Affected</div>
                <div className="mt-2 text-3xl font-bold text-white">15 of 15</div>
                <div className="mt-1 text-xs text-white/60">100% of portfolio</div>
              </div>
              <div>
                <div className="text-sm text-white/50">Avg Leakage Rate</div>
                <div className="mt-2 text-3xl font-bold text-white">2.8%</div>
                <div className="mt-1 text-xs text-white/60">Of claims spend</div>
              </div>
              <div>
                <div className="text-sm text-white/50">Total Exposure</div>
                <div className="mt-2 text-3xl font-bold text-white">$3.4M</div>
                <div className="mt-1 text-xs text-white/60">Annual run rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function FactorCard({ title, value, description, impact, severity }: { title: string; value: string; description: string; impact: string; severity: string }) {
  const severityColors = {
    critical: "border-rose-800/40 bg-gradient-to-br from-rose-950/40 to-red-950/20",
    high: "border-orange-800/40 bg-gradient-to-br from-orange-950/40 to-amber-950/20",
    medium: "border-amber-800/40 bg-gradient-to-br from-amber-950/40 to-yellow-950/20",
  };

  return (
    <Card className={`rounded-2xl border ${severityColors[severity as keyof typeof severityColors]}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-medium text-white/80">{title}</div>
            <div className="mt-2 text-3xl font-bold text-white">{value}</div>
          </div>
          <AlertTriangle className={`h-5 w-5 ${severity === "critical" ? "text-rose-400" : severity === "high" ? "text-orange-400" : "text-amber-400"}`} />
        </div>
        <div className="mt-3 text-sm text-white/60">{description}</div>
        <div className="mt-3 text-xs font-medium text-white/80">Impact: {impact}</div>
      </CardContent>
    </Card>
  );
}

function MethodologyTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-xl font-semibold">Detection Methodology</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="text-sm font-semibold text-white">1. Contract Database Validation</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Load and validate all carrier contracts, fee schedules, and network agreements. Parse tiered discount
                structures, DRG weights, and bundled procedure definitions. Maintain version history for contract amendments.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">2. Claims-to-Contract Matching</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Match each processed claim to applicable contract terms using provider NPI, service date, procedure codes,
                and place of service. Flag mismatches in pricing, network status, or authorization requirements.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">3. Pricing Validation Engine</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Compare paid amounts against contracted rates, applying: percentage discounts, per-diem rates, DRG
                payments, case rates, and bundled procedure rules. Calculate expected vs actual payment for each claim.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">4. Leakage Quantification</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Aggregate overpayments by category (pricing, network, bundles), provider, and time period. Classify by
                recoverability (current year recoverable, statute of limitations, write-off). Generate audit evidence packets.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Data Sources</h2>
        <div className="space-y-3">
          <DataSourceCard
            source="Carrier Contracts"
            format="PDF, EDI 810, proprietary"
            volume="247 contracts"
            freshness="Monthly updates"
          />
          <DataSourceCard
            source="Fee Schedules"
            format="CSV, Excel, database"
            volume="15 payers"
            freshness="Quarterly refresh"
          />
          <DataSourceCard
            source="Claims Data"
            format="EDI 837, 835 remittance"
            volume="2.4M claims/year"
            freshness="< 24 hours"
          />
          <DataSourceCard
            source="Provider Master"
            format="NPI registry, credentialing"
            volume="18K providers"
            freshness="Weekly sync"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Statistical Validation</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs text-white/50">Detection Rate</div>
                <div className="mt-1 text-lg font-bold text-white">2.8% of claims</div>
              </div>
              <div>
                <div className="text-xs text-white/50">False Positive Rate</div>
                <div className="mt-1 text-lg font-bold text-white">&lt; 2%</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Avg Overpayment</div>
                <div className="mt-1 text-lg font-bold text-white">$487</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Sample Size</div>
                <div className="mt-1 text-lg font-bold text-white">2.4M claims</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function DataSourceCard({ source, format, volume, freshness }: { source: string; format: string; volume: string; freshness: string }) {
  return (
    <Card className="rounded-xl border-white/10 bg-white/5">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">{source}</div>
            <div className="mt-1 text-xs text-white/60">{format}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-white/50">Volume</div>
            <div className="text-sm font-semibold text-white">{volume}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className="text-white/50">Freshness:</span>
          <span className="font-semibold text-emerald-400">{freshness}</span>
        </div>
      </CardContent>
    </Card>
  );
}

function EvidenceTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-xl font-semibold">Evidence Receipt</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/50">Receipt ID</div>
                <div className="mt-1 font-mono text-sm text-white">CONTRACT-LEAKAGE-2024-001</div>
              </div>
              <Shield className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs text-white/50">Cryptographic Hash (SHA-256)</div>
              <div className="mt-1 break-all rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-white/90">
                b8e4d9f1c3a7b2e5d8c1f4a9b6e3d7f2c9a5e1b8d4f7c2a6e9b3d1f5a8c4e7b2
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs text-white/50">Confidence Score</div>
                <div className="mt-1 text-lg font-bold text-emerald-400">91%</div>
              </div>
              <div>
                <div className="text-xs text-white/50">DQ Pass Rate</div>
                <div className="mt-1 text-lg font-bold text-white">44/48 tests</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Last Verified</div>
                <div className="mt-1 text-sm font-semibold text-white">8 minutes ago</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Owner</div>
                <div className="mt-1 text-sm font-semibold text-white">Contract Compliance Team</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Data Quality Checks</h2>
        <div className="space-y-2">
          <DQCheckCard check="Contract version validation" status="passed" details="All contracts matched to service dates" />
          <DQCheckCard check="Provider network status" status="passed" details="100% NPI validation complete" />
          <DQCheckCard check="Procedure code validity" status="passed" details="CPT/HCPCS codes verified" />
          <DQCheckCard check="Fee schedule matching" status="passed" details="Pricing rules applied correctly" />
          <DQCheckCard check="Bundle logic validation" status="warning" details="3% manual review flagged" />
          <DQCheckCard check="Authorization tracking" status="passed" details="Referral requirements checked" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Audit Trail</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="space-y-4">
              <AuditStep timestamp="2024-02-06 21:52:15 UTC" system="Contract Database" action="247 contracts loaded and validated" />
              <AuditStep timestamp="2024-02-06 21:53:42 UTC" system="Claims Matching Engine" action="2.4M claims matched to contracts" />
              <AuditStep timestamp="2024-02-06 21:55:18 UTC" system="Pricing Validation" action="68,420 pricing variances identified" />
              <AuditStep timestamp="2024-02-06 21:56:33 UTC" system="Evidence Receipt Generator" action="Cryptographic hash generated and stored" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function DQCheckCard({ check, status, details }: { check: string; status: string; details: string }) {
  const statusConfig = {
    passed: { bg: "bg-emerald-400/10", border: "border-emerald-400/30", icon: "✓", color: "text-emerald-400" },
    warning: { bg: "bg-amber-400/10", border: "border-amber-400/30", icon: "⚠", color: "text-amber-400" },
    failed: { bg: "bg-rose-400/10", border: "border-rose-400/30", icon: "✗", color: "text-rose-400" },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <Card className={`rounded-xl border ${config.border} ${config.bg}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 text-lg ${config.color}`}>{config.icon}</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">{check}</div>
            <div className="mt-1 text-xs text-white/60">{details}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AuditStep({ timestamp, system, action }: { timestamp: string; system: string; action: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1.5 h-2 w-2 rounded-full bg-emerald-400" />
      <div className="flex-1">
        <div className="text-sm font-semibold text-white">{system}</div>
        <div className="mt-1 text-xs text-white/60">{action}</div>
        <div className="mt-1 text-xs text-white/40">{timestamp}</div>
      </div>
    </div>
  );
}

function ActionsTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-4 text-xl font-semibold">Recommended Actions</h2>
        <div className="space-y-4">
          <ActionCard
            priority="Critical"
            title="Claims Audit & Recovery"
            description="Initiate retroactive claims audit for past 12 months, submit recovery requests to carriers, implement prospective monitoring"
            impact="$2.65M recovery target"
            timeframe="60 days"
            owner="Claims Operations"
          />
          <ActionCard
            priority="High"
            title="Contract Repricing Engine"
            description="Deploy automated repricing engine with real-time contract validation, reject claims with pricing errors at adjudication"
            impact="$1.8M annual savings"
            timeframe="90 days"
            owner="IT & Benefits"
          />
          <ActionCard
            priority="High"
            title="Provider Network Cleanup"
            description="Verify network status for all providers, implement strict referral authorization, terminate non-compliant relationships"
            impact="$890K annual savings"
            timeframe="120 days"
            owner="Network Management"
          />
          <ActionCard
            priority="Medium"
            title="Bundle Validation"
            description="Implement automated bundling rules, train adjudication staff, establish quarterly contract compliance audits"
            impact="$450K annual savings"
            timeframe="180 days"
            owner="Medical Management"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Implementation Roadmap</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="space-y-6">
              <RoadmapPhase
                phase="Q1 2024"
                items={[
                  "Launch claims audit (12-month lookback)",
                  "Deploy repricing engine pilot",
                  "Begin provider network verification"
                ]}
              />
              <RoadmapPhase
                phase="Q2 2024"
                items={[
                  "Submit recovery requests to carriers",
                  "Repricing engine full rollout",
                  "Complete network status cleanup"
                ]}
              />
              <RoadmapPhase
                phase="Q3-Q4 2024"
                items={[
                  "Bundle validation go-live",
                  "Quarterly compliance audits",
                  "Measure full-year impact"
                ]}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Expected Outcomes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl border-emerald-800/40 bg-gradient-to-br from-emerald-950/40 to-teal-950/20">
            <CardContent className="p-6">
              <div className="text-sm text-emerald-300">Total Recovery</div>
              <div className="mt-2 text-3xl font-bold text-white">$2.65M</div>
              <div className="mt-2 text-xs text-white/60">78% of identified leakage</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-blue-800/40 bg-gradient-to-br from-blue-950/40 to-cyan-950/20">
            <CardContent className="p-6">
              <div className="text-sm text-blue-300">Ongoing Prevention</div>
              <div className="mt-2 text-3xl font-bold text-white">$3.1M/yr</div>
              <div className="mt-2 text-xs text-white/60">Future leakage avoided</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-purple-800/40 bg-gradient-to-br from-purple-950/40 to-fuchsia-950/20">
            <CardContent className="p-6">
              <div className="text-sm text-purple-300">ROI Timeline</div>
              <div className="mt-2 text-3xl font-bold text-white">6 Mo</div>
              <div className="mt-2 text-xs text-white/60">Full payback period</div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function ActionCard({ priority, title, description, impact, timeframe, owner }: { priority: string; title: string; description: string; impact: string; timeframe: string; owner: string }) {
  const priorityColors = {
    Critical: "border-rose-800/40 bg-gradient-to-br from-rose-950/40 to-red-950/20",
    High: "border-orange-800/40 bg-gradient-to-br from-orange-950/40 to-amber-950/20",
    Medium: "border-amber-800/40 bg-gradient-to-br from-amber-950/40 to-yellow-950/20",
  };

  return (
    <Card className={`rounded-2xl border ${priorityColors[priority as keyof typeof priorityColors]}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold uppercase tracking-wider ${priority === "Critical" ? "text-rose-400" : priority === "High" ? "text-orange-400" : "text-amber-400"}`}>
                {priority}
              </span>
              <span className="text-xs text-white/40">•</span>
              <span className="text-xs text-white/60">{timeframe}</span>
            </div>
            <div className="mt-2 text-lg font-semibold text-white">{title}</div>
            <div className="mt-2 text-sm text-white/70 leading-relaxed">{description}</div>
            <div className="mt-4 flex items-center gap-6 text-xs">
              <div>
                <span className="text-white/50">Impact: </span>
                <span className="font-semibold text-emerald-400">{impact}</span>
              </div>
              <div>
                <span className="text-white/50">Owner: </span>
                <span className="font-semibold text-white">{owner}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RoadmapPhase({ phase, items }: { phase: string; items: string[] }) {
  return (
    <div>
      <div className="text-sm font-semibold text-white">{phase}</div>
      <ul className="mt-3 space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-white/70">
            <span className="text-emerald-400">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}