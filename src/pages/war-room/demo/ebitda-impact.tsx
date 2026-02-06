import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Shield, TrendingUp, AlertTriangle, ExternalLink, FileText, DollarSign } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EBITDAImpactDemo() {
  const [activeTab, setActiveTab] = useState<"overview" | "methodology" | "evidence" | "actions">("overview");

  return (
    <>
      <Head>
        <title>EBITDA Impact Analysis — War Room Demo</title>
        <meta
          name="description"
          content="Quantified EBITDA impact from benefits cost volatility with audit-grade evidence and actionable remediation paths."
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
                  <div className="text-sm font-semibold">EBITDA Impact Analysis</div>
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
                      Cost Trend Stress Index
                    </div>
                    <div className="text-sm text-white/60">EBITDA Impact from Benefits Volatility</div>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="text-6xl font-bold tracking-tight text-white drop-shadow-2xl">11.2%</div>
                    <div className="mt-3 flex items-center gap-2 text-rose-400">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-lg font-semibold">+2.2pp vs 9% baseline</span>
                    </div>
                    <div className="mt-4 text-white/70">
                      Benefits costs trending 220 basis points above actuarial baseline, representing $18.4M annual
                      EBITDA headwind across portfolio companies.
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4">
                    <MetricCard label="Annual EBITDA Impact" value="$18.4M" trend="High Risk" />
                    <MetricCard label="Portfolio Companies Affected" value="12 of 15" trend="Widespread" />
                    <MetricCard label="Estimated Recoverable" value="$6.8M" trend="Actionable" />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <StatusBadge status="VERIFIED" />
                  <StatusBadge status="HIGH_CONFIDENCE" />
                  <StatusBadge status="BOARD_READY" />
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
    HIGH_CONFIDENCE: { bg: "bg-blue-400/20", text: "text-blue-300", border: "border-blue-400/40", label: "94% Confidence" },
    BOARD_READY: { bg: "bg-purple-400/20", text: "text-purple-300", border: "border-purple-400/40", label: "Board Ready" },
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
              Benefits costs across the portfolio are trending 220 basis points above actuarial baseline projections,
              creating an $18.4M annual EBITDA headwind. This variance represents structural cost pressure from:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span>Medical trend acceleration (12.4% actual vs 8.5% budgeted)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span>Pharmacy cost inflation (18.2% specialty drug trend)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span>Utilization increases (8.1% visit frequency growth)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400">•</span>
                <span>Plan design inefficiencies ($6.8M recoverable leakage identified)</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Contributing Factors</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FactorCard
            title="Medical Trend"
            value="+12.4%"
            description="Hospital and physician costs exceeding baseline"
            impact="$8.2M annual"
            severity="high"
          />
          <FactorCard
            title="Pharmacy Trend"
            value="+18.2%"
            description="Specialty drug costs and utilization increases"
            impact="$6.4M annual"
            severity="critical"
          />
          <FactorCard
            title="Utilization Increase"
            value="+8.1%"
            description="Higher visit frequency and service intensity"
            impact="$2.9M annual"
            severity="medium"
          />
          <FactorCard
            title="Plan Design Gaps"
            value="$6.8M"
            description="Recoverable leakage from structural inefficiencies"
            impact="Actionable"
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
                <div className="mt-2 text-3xl font-bold text-white">12 of 15</div>
                <div className="mt-1 text-xs text-white/60">80% of portfolio</div>
              </div>
              <div>
                <div className="text-sm text-white/50">Avg EBITDA Impact</div>
                <div className="mt-2 text-3xl font-bold text-white">2.1%</div>
                <div className="mt-1 text-xs text-white/60">Of company EBITDA</div>
              </div>
              <div>
                <div className="text-sm text-white/50">Total Exposure</div>
                <div className="mt-2 text-3xl font-bold text-white">$18.4M</div>
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
        <h2 className="mb-4 text-xl font-semibold">Calculation Methodology</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="text-sm font-semibold text-white">1. Baseline Establishment</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Actuarial baseline set using 3-year rolling average of normalized claims experience, adjusted for:
                demographics, geographic mix, plan design changes, and industry trend factors (HCCI benchmark data).
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">2. Actual Trend Calculation</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Trailing 12-month claims run rate compared to prior 12-month period, normalized for membership changes,
                seasonality (Box-Jenkins ARIMA), and plan year transitions.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">3. Variance Attribution</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Variance decomposition into medical trend, pharmacy trend, utilization changes, and plan design impact
                using regression analysis and actuarial incurred but not reported (IBNR) adjustments.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">4. EBITDA Impact Model</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Financial impact calculated as: (Actual Trend - Baseline Trend) × Total Benefits Spend × Portfolio
                Company Count, with sensitivity analysis for different intervention scenarios.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Data Sources</h2>
        <div className="space-y-3">
          <DataSourceCard
            source="Medical Claims"
            format="EDI 837I/P, 835 remittance"
            volume="2.4M claims/year"
            freshness="< 24 hours"
          />
          <DataSourceCard
            source="Pharmacy Claims"
            format="NCPDP, PBM extracts"
            volume="890K Rx/year"
            freshness="< 12 hours"
          />
          <DataSourceCard
            source="Eligibility"
            format="EDI 834, census data"
            volume="48K members"
            freshness="Daily"
          />
          <DataSourceCard
            source="Plan Documents"
            format="SPD, SBC, contracts"
            volume="45 plans"
            freshness="Real-time"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Statistical Validation</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs text-white/50">Confidence Interval</div>
                <div className="mt-1 text-lg font-bold text-white">95% (±0.4pp)</div>
              </div>
              <div>
                <div className="text-xs text-white/50">P-Value</div>
                <div className="mt-1 text-lg font-bold text-white">&lt; 0.01</div>
              </div>
              <div>
                <div className="text-xs text-white/50">R-Squared</div>
                <div className="mt-1 text-lg font-bold text-white">0.89</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Sample Size</div>
                <div className="mt-1 text-lg font-bold text-white">48K members</div>
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
                <div className="mt-1 font-mono text-sm text-white">EBITDA-IMPACT-2024-001</div>
              </div>
              <Shield className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs text-white/50">Cryptographic Hash (SHA-256)</div>
              <div className="mt-1 break-all rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-white/90">
                a7f3c9e2d8b4f1a6c5e8d2b9f4a1c7e3d9b5f2a8c4e1d7b3f9a6c2e8d5b1f4a7
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs text-white/50">Confidence Score</div>
                <div className="mt-1 text-lg font-bold text-emerald-400">94%</div>
              </div>
              <div>
                <div className="text-xs text-white/50">DQ Pass Rate</div>
                <div className="mt-1 text-lg font-bold text-white">47/50 tests</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Last Verified</div>
                <div className="mt-1 text-sm font-semibold text-white">12 minutes ago</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Owner</div>
                <div className="mt-1 text-sm font-semibold text-white">CFO Analytics Team</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Data Quality Checks</h2>
        <div className="space-y-2">
          <DQCheckCard check="Claims completeness validation" status="passed" details="100% of expected claims files received" />
          <DQCheckCard check="Provider network validation" status="passed" details="All providers verified against master file" />
          <DQCheckCard check="Diagnosis code validity" status="passed" details="ICD-10 codes validated, 0 errors" />
          <DQCheckCard check="Pricing reasonability" status="passed" details="All amounts within 3σ of mean" />
          <DQCheckCard check="Duplicate detection" status="passed" details="No duplicate claims identified" />
          <DQCheckCard check="Cross-system reconciliation" status="warning" details="2% variance in eligibility count" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Audit Trail</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="space-y-4">
              <AuditStep timestamp="2024-02-06 21:45:22 UTC" system="Claims Data Extract" action="EDI 837 files ingested from UHC, Cigna, Aetna" />
              <AuditStep timestamp="2024-02-06 21:46:03 UTC" system="DQ Validation Engine" action="50 data quality checks executed" />
              <AuditStep timestamp="2024-02-06 21:47:15 UTC" system="Actuarial Engine" action="Trend calculation completed" />
              <AuditStep timestamp="2024-02-06 21:48:42 UTC" system="Evidence Receipt Generator" action="Cryptographic hash generated and stored" />
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
            title="Pharmacy Benefit Redesign"
            description="Implement specialty drug management program with prior authorization and step therapy protocols"
            impact="$4.2M annual savings"
            timeframe="90 days"
            owner="Benefits VP"
          />
          <ActionCard
            priority="High"
            title="High-Cost Claimant Management"
            description="Deploy care coordination and case management for top 50 claimants (representing 35% of total costs)"
            impact="$2.8M annual savings"
            timeframe="60 days"
            owner="Clinical Team"
          />
          <ActionCard
            priority="Medium"
            title="Network Optimization"
            description="Renegotiate hospital contracts in top 3 metros, implement reference-based pricing for ASCs"
            impact="$1.9M annual savings"
            timeframe="180 days"
            owner="Procurement"
          />
          <ActionCard
            priority="Medium"
            title="Plan Design Incentives"
            description="Increase HDHP adoption through enhanced HSA employer contributions and member education"
            impact="$1.4M annual savings"
            timeframe="Next plan year"
            owner="HR Leadership"
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
                  "Specialty drug program launch",
                  "High-cost claimant outreach",
                  "Network analysis complete"
                ]}
              />
              <RoadmapPhase
                phase="Q2 2024"
                items={[
                  "Contract renegotiations begin",
                  "HDHP enrollment campaign",
                  "Mid-year progress review"
                ]}
              />
              <RoadmapPhase
                phase="Q3-Q4 2024"
                items={[
                  "New contracts implemented",
                  "Full-year impact measurement",
                  "Next year strategy planning"
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
              <div className="text-sm text-emerald-300">EBITDA Protection</div>
              <div className="mt-2 text-3xl font-bold text-white">$10.3M</div>
              <div className="mt-2 text-xs text-white/60">56% of identified exposure</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-blue-800/40 bg-gradient-to-br from-blue-950/40 to-cyan-950/20">
            <CardContent className="p-6">
              <div className="text-sm text-blue-300">Trend Reduction</div>
              <div className="mt-2 text-3xl font-bold text-white">-3.8pp</div>
              <div className="mt-2 text-xs text-white/60">From 11.2% to 7.4%</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-purple-800/40 bg-gradient-to-br from-purple-950/40 to-fuchsia-950/20">
            <CardContent className="p-6">
              <div className="text-sm text-purple-300">Implementation Time</div>
              <div className="mt-2 text-3xl font-bold text-white">6-12 Mo</div>
              <div className="mt-2 text-xs text-white/60">Full program deployment</div>
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