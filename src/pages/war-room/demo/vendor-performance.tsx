import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Shield, TrendingUp, TrendingDown, AlertTriangle, ExternalLink, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VendorPerformanceDemo() {
  const [activeTab, setActiveTab] = useState<"overview" | "methodology" | "evidence" | "actions">("overview");

  return (
    <>
      <Head>
        <title>Vendor Performance Analysis — War Room Demo</title>
        <meta
          name="description"
          content="Quantified vendor SLA compliance and performance issues with audit-grade evidence and actionable remediation paths."
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
                  <div className="text-sm font-semibold">Vendor Performance Analysis</div>
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
            <Card className="overflow-hidden rounded-3xl border-amber-800/40 bg-gradient-to-br from-amber-950/40 via-orange-950/30 to-yellow-950/20 shadow-[0_0_60px_rgba(251,191,36,0.15)]">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-950/60 backdrop-blur-sm">
                    <CheckCircle2 className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-amber-300">
                      Vendor SLA Compliance
                    </div>
                    <div className="text-sm text-white/60">Performance Against Contracted Service Levels</div>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="text-6xl font-bold tracking-tight text-white drop-shadow-2xl">73%</div>
                    <div className="mt-3 flex items-center gap-2 text-amber-400">
                      <TrendingDown className="h-5 w-5" />
                      <span className="text-lg font-semibold">27 pp below SLA targets</span>
                    </div>
                    <div className="mt-4 text-white/70">
                      Systematic vendor underperformance across key service metrics. TPA processing delays, PBM claim
                      errors, and wellness vendor non-compliance creating $4.2M in operational costs and member
                      dissatisfaction.
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4">
                    <MetricCard label="TPA Compliance" value="68%" trend="Below Target" />
                    <MetricCard label="PBM Performance" value="71%" trend="At Risk" />
                    <MetricCard label="Wellness Vendor" value="82%" trend="Marginal" />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <StatusBadge status="VERIFIED" />
                  <StatusBadge status="HIGH_CONFIDENCE" />
                  <StatusBadge status="CONTRACTUAL" />
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
      <div className="mt-1 text-xs font-medium text-amber-400">{trend}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    VERIFIED: { bg: "bg-emerald-400/20", text: "text-emerald-300", border: "border-emerald-400/40", label: "Verified" },
    HIGH_CONFIDENCE: { bg: "bg-blue-400/20", text: "text-blue-300", border: "border-blue-400/40", label: "89% Confidence" },
    CONTRACTUAL: { bg: "bg-purple-400/20", text: "text-purple-300", border: "border-purple-400/40", label: "Contractual Basis" },
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
              Vendor performance across key service providers is 27 percentage points below contracted SLA targets,
              creating operational inefficiencies and member dissatisfaction. Three critical areas require immediate
              attention:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>TPA processing delays (68% compliance): Claims adjudication exceeding 15-day SLA, call center hold times averaging 18 minutes vs 5-minute target</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>PBM claim errors (71% compliance): 4.2% rejection rate vs 2% target, specialty drug authorization delays, formulary update failures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400">•</span>
                <span>Wellness program gaps (82% compliance): Low engagement rates, incomplete biometric screening reporting, vendor portal downtime</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Vendor Performance Breakdown</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FactorCard
            title="TPA Performance"
            value="68%"
            description="Claims processing and member services below SLA"
            impact="$2.4M annual cost"
            severity="critical"
          />
          <FactorCard
            title="PBM Compliance"
            value="71%"
            description="Prescription processing errors and delays"
            impact="$1.3M annual cost"
            severity="high"
          />
          <FactorCard
            title="Wellness Vendor"
            value="82%"
            description="Program engagement and reporting gaps"
            impact="$500K annual cost"
            severity="medium"
          />
          <FactorCard
            title="Financial Penalties"
            value="$1.8M"
            description="Available SLA penalty credits not applied"
            impact="Recoverable"
            severity="medium"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Impact Analysis</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm text-white/50">Total Cost Impact</div>
                <div className="mt-2 text-3xl font-bold text-white">$4.2M</div>
                <div className="mt-1 text-xs text-white/60">Annual operational costs</div>
              </div>
              <div>
                <div className="text-sm text-white/50">Available Credits</div>
                <div className="mt-2 text-3xl font-bold text-white">$1.8M</div>
                <div className="mt-1 text-xs text-white/60">SLA penalty recoverable</div>
              </div>
              <div>
                <div className="text-sm text-white/50">Member Impact</div>
                <div className="mt-2 text-3xl font-bold text-white">48K</div>
                <div className="mt-1 text-xs text-white/60">Affected employees</div>
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
        <h2 className="mb-4 text-xl font-semibold">Tracking Methodology</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="text-sm font-semibold text-white">1. Contract SLA Extraction</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Parse vendor contracts to extract all service level agreements: claims processing turnaround time,
                call center metrics (hold time, abandonment rate), system uptime requirements, reporting deadlines,
                and penalty credit calculations.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">2. Performance Data Collection</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Aggregate vendor performance data from: claims system timestamps, call center recordings, system
                availability monitoring, member satisfaction surveys, and vendor-provided reporting dashboards.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">3. Compliance Scoring</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Calculate compliance percentage for each SLA metric by comparing actual performance to contracted
                targets. Weight metrics by contractual importance and financial impact. Generate time-series trends
                to identify systemic vs episodic failures.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">4. Financial Impact Quantification</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Estimate operational costs from vendor underperformance: staff time spent on escalations, member
                churn risk, administrative burden, and quality issues. Calculate available penalty credits per
                contract terms.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Data Sources</h2>
        <div className="space-y-3">
          <DataSourceCard
            source="Vendor Contracts"
            format="PDF, Word, proprietary"
            volume="15 active contracts"
            freshness="Annual review"
          />
          <DataSourceCard
            source="Claims System"
            format="Database logs, timestamps"
            volume="2.4M claims/year"
            freshness="Real-time"
          />
          <DataSourceCard
            source="Call Center Metrics"
            format="IVR logs, recordings"
            volume="180K calls/year"
            freshness="Daily aggregation"
          />
          <DataSourceCard
            source="Member Surveys"
            format="NPS, satisfaction scores"
            volume="12K responses/year"
            freshness="Quarterly"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Statistical Validation</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs text-white/50">Data Completeness</div>
                <div className="mt-1 text-lg font-bold text-white">97%</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Measurement Period</div>
                <div className="mt-1 text-lg font-bold text-white">12 months</div>
              </div>
              <div>
                <div className="text-xs text-white/50">SLA Metrics Tracked</div>
                <div className="mt-1 text-lg font-bold text-white">47</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Vendor Count</div>
                <div className="mt-1 text-lg font-bold text-white">15</div>
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
                <div className="mt-1 font-mono text-sm text-white">VENDOR-PERF-2024-001</div>
              </div>
              <Shield className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs text-white/50">Cryptographic Hash (SHA-256)</div>
              <div className="mt-1 break-all rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-white/90">
                c9f5e2b7a4d1f8c3e6b9d2a5f1c8e4b7d3a9f6c2e5b8d1f4a7c3e9b6d2f5a8c1
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs text-white/50">Confidence Score</div>
                <div className="mt-1 text-lg font-bold text-emerald-400">89%</div>
              </div>
              <div>
                <div className="text-xs text-white/50">DQ Pass Rate</div>
                <div className="mt-1 text-lg font-bold text-white">42/46 tests</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Last Verified</div>
                <div className="mt-1 text-sm font-semibold text-white">15 minutes ago</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Owner</div>
                <div className="mt-1 text-sm font-semibold text-white">Vendor Management Team</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Data Quality Checks</h2>
        <div className="space-y-2">
          <DQCheckCard check="Contract terms validation" status="passed" details="All SLA thresholds parsed correctly" />
          <DQCheckCard check="Performance data completeness" status="passed" details="97% data coverage achieved" />
          <DQCheckCard check="Timestamp accuracy" status="passed" details="Claims processing times validated" />
          <DQCheckCard check="Call center metrics" status="warning" details="5% call recordings missing" />
          <DQCheckCard check="Member survey responses" status="passed" details="Statistical significance achieved" />
          <DQCheckCard check="Financial penalty calculations" status="passed" details="Contract formulas applied correctly" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Audit Trail</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="space-y-4">
              <AuditStep timestamp="2024-02-06 21:48:30 UTC" system="Contract Parser" action="15 vendor contracts analyzed, 47 SLA metrics extracted" />
              <AuditStep timestamp="2024-02-06 21:50:15 UTC" system="Performance Aggregator" action="Claims, call center, and survey data compiled" />
              <AuditStep timestamp="2024-02-06 21:52:42 UTC" system="Compliance Calculator" action="SLA scoring completed for all vendors" />
              <AuditStep timestamp="2024-02-06 21:53:58 UTC" system="Evidence Receipt Generator" action="Cryptographic hash generated and stored" />
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
            title="Vendor Performance Review"
            description="Schedule formal quarterly business reviews with TPA and PBM, present SLA compliance data, demand corrective action plans with timelines"
            impact="$1.8M penalty credits"
            timeframe="30 days"
            owner="Vendor Management"
          />
          <ActionCard
            priority="High"
            title="TPA Process Improvement"
            description="Implement automated claims workflow monitoring, deploy real-time SLA dashboards, establish escalation protocols for delays"
            impact="$2.4M cost reduction"
            timeframe="90 days"
            owner="Operations"
          />
          <ActionCard
            priority="High"
            title="PBM Performance Standards"
            description="Renegotiate contract with stricter SLA penalties, require weekly performance reporting, implement prior authorization automation"
            impact="$1.3M cost reduction"
            timeframe="120 days"
            owner="Procurement"
          />
          <ActionCard
            priority="Medium"
            title="Wellness Program Enhancement"
            description="Require vendor portal improvements, implement biometric screening automation, enhance member engagement tracking"
            impact="$500K cost reduction"
            timeframe="180 days"
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
                  "Formal vendor performance reviews",
                  "Submit SLA penalty credit requests",
                  "Deploy real-time monitoring"
                ]}
              />
              <RoadmapPhase
                phase="Q2 2024"
                items={[
                  "TPA process automation rollout",
                  "Begin PBM contract renegotiation",
                  "Wellness vendor requirements"
                ]}
              />
              <RoadmapPhase
                phase="Q3-Q4 2024"
                items={[
                  "New vendor agreements executed",
                  "Quarterly compliance audits",
                  "Full-year impact assessment"
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
              <div className="text-sm text-emerald-300">Cost Recovery</div>
              <div className="mt-2 text-3xl font-bold text-white">$4.2M</div>
              <div className="mt-2 text-xs text-white/60">Annual operational savings</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-blue-800/40 bg-gradient-to-br from-blue-950/40 to-cyan-950/20">
            <CardContent className="p-6">
              <div className="text-sm text-blue-300">SLA Improvement</div>
              <div className="mt-2 text-3xl font-bold text-white">+22pp</div>
              <div className="mt-2 text-xs text-white/60">To 95% compliance target</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-purple-800/40 bg-gradient-to-br from-purple-950/40 to-fuchsia-950/20">
            <CardContent className="p-6">
              <div className="text-sm text-purple-300">Member Satisfaction</div>
              <div className="mt-2 text-3xl font-bold text-white">+18 NPS</div>
              <div className="mt-2 text-xs text-white/60">Expected improvement</div>
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