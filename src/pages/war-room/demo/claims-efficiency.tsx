import Head from "next/head";
import Link from "next/link";
import { ArrowLeft, Shield, TrendingUp, TrendingDown, AlertTriangle, ExternalLink, FileText, Clock } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ClaimsEfficiencyDemo() {
  const [activeTab, setActiveTab] = useState<"overview" | "methodology" | "evidence" | "actions">("overview");

  return (
    <>
      <Head>
        <title>Claims Processing Efficiency — War Room Demo</title>
        <meta
          name="description"
          content="Quantified claims processing delays and error rates with audit-grade evidence and actionable remediation paths."
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
                  <div className="text-sm font-semibold">Claims Processing Efficiency</div>
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
            <Card className="overflow-hidden rounded-3xl border-orange-800/40 bg-gradient-to-br from-orange-950/40 via-amber-950/30 to-yellow-950/20 shadow-[0_0_60px_rgba(251,146,60,0.15)]">
              <CardContent className="p-8 md:p-12">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-950/60 backdrop-blur-sm">
                    <Clock className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-orange-300">
                      Claims Processing Cycle Time
                    </div>
                    <div className="text-sm text-white/60">Average Time to Adjudication & Payment</div>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="text-6xl font-bold tracking-tight text-white drop-shadow-2xl">18.4 days</div>
                    <div className="mt-3 flex items-center gap-2 text-orange-400">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-lg font-semibold">+5.4 days vs industry standard</span>
                    </div>
                    <div className="mt-4 text-white/70">
                      Claims processing delays averaging 18.4 days vs 13-day industry benchmark, with 6.8% error rate
                      requiring rework. Creates $3.2M in administrative costs, member complaints, and provider
                      relationship strain.
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-4">
                    <MetricCard label="Processing Delay" value="+5.4 days" trend="Above Benchmark" />
                    <MetricCard label="Error Rate" value="6.8%" trend="High" />
                    <MetricCard label="Annual Cost" value="$3.2M" trend="Inefficiency" />
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  <StatusBadge status="VERIFIED" />
                  <StatusBadge status="HIGH_CONFIDENCE" />
                  <StatusBadge status="OPERATIONAL" />
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
      <div className="mt-1 text-xs font-medium text-orange-400">{trend}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    VERIFIED: { bg: "bg-emerald-400/20", text: "text-emerald-300", border: "border-emerald-400/40", label: "Verified" },
    HIGH_CONFIDENCE: { bg: "bg-blue-400/20", text: "text-blue-300", border: "border-blue-400/40", label: "92% Confidence" },
    OPERATIONAL: { bg: "bg-purple-400/20", text: "text-purple-300", border: "border-purple-400/40", label: "Operational Impact" },
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
              Claims processing inefficiencies are creating 18.4-day average cycle times (vs 13-day benchmark) and
              6.8% error rates requiring manual rework. Root causes span three operational areas:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Manual adjudication bottlenecks: 34% of claims require manual review due to auto-adjudication rule gaps, staffing constraints</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>Data quality issues: 12% of claims missing required data elements, causing rejection and resubmission cycles</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-400">•</span>
                <span>System limitations: Legacy claims platform lacks workflow automation, real-time edits, and intelligent routing capabilities</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Efficiency Breakdown</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FactorCard
            title="Processing Time"
            value="18.4 days"
            description="Average claim-to-payment cycle time"
            impact="+5.4 days vs benchmark"
            severity="high"
          />
          <FactorCard
            title="Error Rate"
            value="6.8%"
            description="Claims requiring rework or correction"
            impact="2.8x industry average"
            severity="critical"
          />
          <FactorCard
            title="Manual Review"
            value="34%"
            description="Claims requiring manual adjudication"
            impact="$2.1M staff cost"
            severity="high"
          />
          <FactorCard
            title="Member Complaints"
            value="+42%"
            description="Payment delay-related inquiries"
            impact="NPS decline"
            severity="medium"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Cost Impact Analysis</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm text-white/50">Administrative Cost</div>
                <div className="mt-2 text-3xl font-bold text-white">$3.2M</div>
                <div className="mt-1 text-xs text-white/60">Annual processing overhead</div>
              </div>
              <div>
                <div className="text-sm text-white/50">Claims Processed</div>
                <div className="mt-2 text-3xl font-bold text-white">2.4M</div>
                <div className="mt-1 text-xs text-white/60">Per year</div>
              </div>
              <div>
                <div className="text-sm text-white/50">Cost Per Claim</div>
                <div className="mt-2 text-3xl font-bold text-white">$1.33</div>
                <div className="mt-1 text-xs text-white/60">Excess vs benchmark</div>
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
        <h2 className="mb-4 text-xl font-semibold">Measurement Methodology</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6 space-y-4">
            <div>
              <div className="text-sm font-semibold text-white">1. Cycle Time Tracking</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Measure elapsed time from claim receipt (EDI 837 timestamp) to final payment posting (EDI 835
                generation). Calculate percentiles (median, P90, P95) to identify outliers. Segment by claim type,
                payer, service category.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">2. Error Classification</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Categorize claim rejections and corrections by root cause: data quality (missing/invalid fields),
                pricing errors, authorization failures, coding issues. Track error frequency and resolution time for
                each category.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">3. Workflow Analysis</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Map claims through adjudication workflow stages: intake, auto-adjudication, manual review, payment
                processing. Identify bottlenecks (queue depth, staff capacity, system latency) causing delays.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">4. Benchmarking</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Compare performance to industry standards from CAQH Index, HFMA surveys, and peer group data. Calculate
                excess cost per claim from efficiency variance. Project ROI for automation investments.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Data Sources</h2>
        <div className="space-y-3">
          <DataSourceCard
            source="Claims System Logs"
            format="Database timestamps, workflow"
            volume="2.4M claims/year"
            freshness="Real-time"
          />
          <DataSourceCard
            source="EDI Transaction Files"
            format="837 submission, 835 remittance"
            volume="4.8M transactions/year"
            freshness="Daily"
          />
          <DataSourceCard
            source="Adjudication Rules"
            format="Configuration database"
            volume="8,400 rules"
            freshness="Weekly updates"
          />
          <DataSourceCard
            source="Industry Benchmarks"
            format="CAQH, HFMA reports"
            volume="Annual surveys"
            freshness="Yearly"
          />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Statistical Validation</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs text-white/50">Median Cycle Time</div>
                <div className="mt-1 text-lg font-bold text-white">14.2 days</div>
              </div>
              <div>
                <div className="text-xs text-white/50">P90 Cycle Time</div>
                <div className="mt-1 text-lg font-bold text-white">32.7 days</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Auto-Adjudication Rate</div>
                <div className="mt-1 text-lg font-bold text-white">66%</div>
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
                <div className="mt-1 font-mono text-sm text-white">CLAIMS-EFFICIENCY-2024-001</div>
              </div>
              <Shield className="h-8 w-8 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs text-white/50">Cryptographic Hash (SHA-256)</div>
              <div className="mt-1 break-all rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-white/90">
                d1f6c3a8e5b2d9f4c7a1e8b3f6d2c9a5e1b7d4f8c2a6e9b3d5f1a8c4e7b2d9f5
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs text-white/50">Confidence Score</div>
                <div className="mt-1 text-lg font-bold text-emerald-400">92%</div>
              </div>
              <div>
                <div className="text-xs text-white/50">DQ Pass Rate</div>
                <div className="mt-1 text-lg font-bold text-white">45/49 tests</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Last Verified</div>
                <div className="mt-1 text-sm font-semibold text-white">18 minutes ago</div>
              </div>
              <div>
                <div className="text-xs text-white/50">Owner</div>
                <div className="mt-1 text-sm font-semibold text-white">Claims Operations Team</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Data Quality Checks</h2>
        <div className="space-y-2">
          <DQCheckCard check="Timestamp completeness" status="passed" details="100% of claims have all timestamps" />
          <DQCheckCard check="Workflow stage validation" status="passed" details="All stages tracked correctly" />
          <DQCheckCard check="Error code accuracy" status="passed" details="Rejection reasons categorized" />
          <DQCheckCard check="Benchmark data currency" status="passed" details="2024 CAQH Index applied" />
          <DQCheckCard check="Cost allocation logic" status="warning" details="3% manual staff time estimated" />
          <DQCheckCard check="Outlier detection" status="passed" details="Statistical outliers flagged" />
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">Audit Trail</h2>
        <Card className="rounded-2xl border-white/10 bg-white/5">
          <CardContent className="p-6">
            <div className="space-y-4">
              <AuditStep timestamp="2024-02-06 21:40:12 UTC" system="Claims Data Extract" action="2.4M claims timestamps extracted from system" />
              <AuditStep timestamp="2024-02-06 21:42:38 UTC" system="Cycle Time Calculator" action="Calculated median, P90, P95 processing times" />
              <AuditStep timestamp="2024-02-06 21:44:55 UTC" system="Benchmark Comparator" action="Applied industry standards, calculated variance" />
              <AuditStep timestamp="2024-02-06 21:46:22 UTC" system="Evidence Receipt Generator" action="Cryptographic hash generated and stored" />
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
            title="Auto-Adjudication Enhancement"
            description="Expand auto-adjudication rules from 66% to 85% coverage, implement machine learning for pattern recognition, add real-time data validation"
            impact="$1.8M annual savings"
            timeframe="120 days"
            owner="IT & Operations"
          />
          <ActionCard
            priority="High"
            title="Data Quality Program"
            description="Deploy pre-submission claim scrubbing, implement provider education on common errors, establish feedback loops with EDI partners"
            impact="$900K annual savings"
            timeframe="90 days"
            owner="Provider Relations"
          />
          <ActionCard
            priority="High"
            title="Workflow Automation"
            description="Implement intelligent claim routing, deploy robotic process automation for manual tasks, add queue management dashboards"
            impact="$500K annual savings"
            timeframe="180 days"
            owner="Claims Operations"
          />
          <ActionCard
            priority="Medium"
            title="Staff Training & Tools"
            description="Enhance adjudicator training on complex claims, deploy decision support tools, implement quality monitoring"
            impact="$300K annual savings"
            timeframe="60 days"
            owner="HR & Training"
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
                  "Staff training program launch",
                  "Data quality initiative kickoff",
                  "Auto-adjudication rule analysis"
                ]}
              />
              <RoadmapPhase
                phase="Q2 2024"
                items={[
                  "Deploy claim scrubbing tools",
                  "Expand auto-adjudication coverage",
                  "Begin workflow automation pilot"
                ]}
              />
              <RoadmapPhase
                phase="Q3-Q4 2024"
                items={[
                  "Full automation rollout",
                  "Achieve 85% auto-adjudication",
                  "Measure efficiency gains"
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
              <div className="text-sm text-emerald-300">Cost Reduction</div>
              <div className="mt-2 text-3xl font-bold text-white">$3.2M</div>
              <div className="mt-2 text-xs text-white/60">Annual operational savings</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-blue-800/40 bg-gradient-to-br from-blue-950/40 to-cyan-950/20">
            <CardContent className="p-6">
              <div className="text-sm text-blue-300">Cycle Time</div>
              <div className="mt-2 text-3xl font-bold text-white">-5.4 days</div>
              <div className="mt-2 text-xs text-white/60">To 13-day industry standard</div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-purple-800/40 bg-gradient-to-br from-purple-950/40 to-fuchsia-950/20">
            <CardContent className="p-6">
              <div className="text-sm text-purple-300">Error Rate</div>
              <div className="mt-2 text-3xl font-bold text-white">-4.3pp</div>
              <div className="mt-2 text-xs text-white/60">To 2.5% target</div>
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