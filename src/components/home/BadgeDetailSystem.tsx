import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  TrendingUp, 
  Shield, 
  Crown,
  FileText,
  CheckCircle2,
  Lock,
  ChevronRight,
  BarChart3,
  AlertCircle
} from "lucide-react";

type BadgeType = "receipts" | "ebitda" | "verification" | "trust" | "immutable";

interface BadgeDetailSystemProps {
  badgeType: BadgeType | null;
  level: number;
  onClose: () => void;
  onNextLevel: () => void;
}

const getIconColor = (color: string) => {
  const colors: Record<string, string> = {
    purple: "text-purple-400",
    green: "text-green-400",
    blue: "text-blue-400",
    amber: "text-amber-400",
    emerald: "text-emerald-400",
  };
  return colors[color] || "text-purple-400";
};

const getBgColor = (color: string) => {
  const colors: Record<string, string> = {
    purple: "from-purple-500/20 to-blue-500/20",
    green: "from-green-500/20 to-emerald-500/20",
    blue: "from-blue-500/20 to-cyan-500/20",
    amber: "from-amber-500/20 to-orange-500/20",
    emerald: "from-emerald-500/20 to-teal-500/20",
  };
  return colors[color] || "from-purple-500/20 to-blue-500/20";
};

export function BadgeDetailSystem({ badgeType, level, onClose, onNextLevel }: BadgeDetailSystemProps) {
  if (!badgeType) return null;

  const data = getBadgeData(badgeType);
  const Icon = data.icon;

  return (
    <>
      {/* Level 1: Overview */}
      {level === 1 && (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Icon className={`h-6 w-6 ${getIconColor(data.color)}`} />
                {data.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <div className="text-lg font-semibold mb-2">{data.level1.subtitle}</div>
                <p className="text-sm text-muted-foreground">{data.level1.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {data.level1.stats.map((stat: any, idx: number) => (
                  <Card key={idx} className="p-4 bg-black/20 border-white/10">
                    <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-green-400 mt-1">{stat.change}</div>
                  </Card>
                ))}
              </div>

              <Button onClick={onNextLevel} className="w-full">
                View Detailed Breakdown
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Level 2: Breakdown */}
      {level === 2 && (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Icon className={`h-6 w-6 ${getIconColor(data.color)}`} />
                {data.title} - Detailed Breakdown
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              {data.level2.sections.map((section: any, idx: number) => (
                <Card key={idx} className={`p-6 bg-gradient-to-br ${getBgColor(data.color)} border-white/10`}>
                  <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
                  <div className="space-y-3">
                    {section.items.map((item: any, itemIdx: number) => (
                      <div key={itemIdx} className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                        <div className="flex-1">
                          <div className="font-medium">{item.name || item.category || item.stage || item.control || item.framework || item.outcome || item.guarantee || item.property}</div>
                          {item.description && <div className="text-sm text-muted-foreground mt-1">{item.description}</div>}
                        </div>
                        <div className="text-right ml-4">
                          {item.count && <div className="font-mono">{item.count.toLocaleString()}</div>}
                          {item.percentage && <div className="text-sm text-muted-foreground">{item.percentage}%</div>}
                          {item.verified && <div className="text-xs text-green-400">{item.verified}% verified</div>}
                          {item.annual && <div className="font-mono">${(item.annual / 1000000).toFixed(1)}M</div>}
                          {item.amount && <div className="font-mono text-red-400">${(item.amount / 1000000).toFixed(1)}M</div>}
                          {item.status && <Badge variant="outline">{item.status}</Badge>}
                          {item.value && <div className="font-mono text-sm">{item.value}</div>}
                          {item.behavior && <div className="text-xs text-muted-foreground max-w-xs">{item.behavior}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}

              <Button onClick={onNextLevel} className="w-full">
                Deep Analysis
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Level 3: Deep Analysis */}
      {level === 3 && (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Icon className={`h-6 w-6 ${getIconColor(data.color)}`} />
                {data.level3.title}
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue={data.level3.tabs[0].id} className="mt-6">
              <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${data.level3.tabs.length}, 1fr)` }}>
                {data.level3.tabs.map((tab: any) => (
                  <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
                ))}
              </TabsList>

              {data.level3.tabs.map((tab: any) => (
                <TabsContent key={tab.id} value={tab.id} className="space-y-4">
                  <p className="text-sm text-muted-foreground">{tab.content.description}</p>
                  
                  {renderTabContent(tab, data.color)}
                </TabsContent>
              ))}
            </Tabs>

            <Button onClick={onNextLevel} className="w-full mt-6">
              Open Full Governance Workspace
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Level 4: Workspace */}
      {level === 4 && (
        <Dialog open={true} onOpenChange={onClose}>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle className="text-2xl flex items-center gap-3">
                <Icon className={`h-6 w-6 ${getIconColor(data.color)}`} />
                {data.level4.title}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <Card className={`p-6 bg-gradient-to-br ${getBgColor(data.color)} border-white/10`}>
                <h3 className="font-semibold text-lg mb-4">Available Capabilities</h3>
                <div className="grid gap-3">
                  {data.level4.capabilities.map((capability: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-black/30">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{capability}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-black/20 border-white/10">
                <h3 className="font-semibold mb-4">Get Started</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This is the full governance workspace where you can manage all aspects of {data.title.toLowerCase()}.
                  Contact your account representative to enable these features.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </Card>

              <Button onClick={onClose} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

function renderTabContent(tab: any, color: string) {
  const content = tab.content;
  
  if (content.flows) {
    return (
      <div className="space-y-6">
        {content.flows.map((flow: any, idx: number) => (
          <Card key={idx} className="p-4 bg-black/20 border-white/10">
            <div className="font-semibold mb-3">{flow.name}</div>
            <div className="space-y-2">
              {flow.steps.map((step: string, stepIdx: number) => (
                <div key={stepIdx} className="flex gap-3 text-sm">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold">
                    {stepIdx + 1}
                  </div>
                  <div className="flex-1 text-muted-foreground">{step}</div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (content.checks) {
    return (
      <div className="space-y-3">
        {content.checks.map((check: any, idx: number) => (
          <Card key={idx} className={`p-4 ${check.status === 'PASS' ? 'bg-green-950/20 border-green-500/20' : 'bg-yellow-950/20 border-yellow-500/20'}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="font-semibold">{check.name || check.rule || check.check}</div>
                <div className="text-sm text-muted-foreground mt-1">{check.details || check.description || check.scope}</div>
              </div>
              <Badge variant="outline" className={check.status === 'PASS' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}>
                {check.status || check.result}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (content.categories) {
    return (
      <div className="space-y-3">
        {content.categories.map((cat: any, idx: number) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5">
            <span className="font-medium">{cat.name}</span>
            <div className="flex items-center gap-4">
              <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-400" style={{ width: `${cat.coverage}%` }} />
              </div>
              <span className="font-mono text-sm">{cat.coverage}%</span>
              <span className="text-xs text-muted-foreground">{cat.receipts} receipts</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (content.drivers) {
    return (
      <div className="space-y-3">
        {content.drivers.map((driver: any, idx: number) => (
          <Card key={idx} className={`p-4 ${driver.direction === 'favorable' ? 'bg-green-950/20 border-green-500/20' : 'bg-red-950/20 border-red-500/20'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="font-semibold">{driver.factor || driver.name}</div>
              <div className={`font-mono font-bold ${driver.direction === 'favorable' ? 'text-green-400' : 'text-red-400'}`}>
                {driver.impact || driver.target}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">{driver.explanation || driver.progress}</div>
          </Card>
        ))}
      </div>
    );
  }

  if (content.programs) {
    return (
      <div className="space-y-3">
        {content.programs.map((program: any, idx: number) => (
          <Card key={idx} className="p-4 bg-black/20 border-white/10">
            <div className="flex items-start justify-between mb-2">
              <div className="font-semibold">{program.name}</div>
              <Badge variant="outline">{program.status}</Badge>
            </div>
            <div className="text-sm text-muted-foreground mb-2">{program.target}</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-400" style={{ width: program.progress }} />
              </div>
              <span className="text-xs font-mono">{program.progress}</span>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (content.roles) {
    return (
      <div className="space-y-3">
        {content.roles.map((role: any, idx: number) => (
          <Card key={idx} className="p-4 bg-black/20 border-white/10">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-semibold">{role.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{role.users} users</div>
              </div>
              <Badge variant="outline">{role.restrictions}</Badge>
            </div>
            <div className="space-y-1">
              {role.permissions.map((perm: string, permIdx: number) => (
                <div key={permIdx} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-3 w-3 text-green-400" />
                  <span className="text-muted-foreground">{perm}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (content.recent_activity || content.recent_events) {
    const activities = content.recent_activity || content.recent_events;
    return (
      <div className="space-y-2">
        {activities.map((activity: any, idx: number) => (
          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-white/10 bg-white/5">
            <div className="flex-shrink-0 text-xs text-muted-foreground font-mono">{activity.timestamp}</div>
            <div className="flex-1">
              <div className="text-sm font-medium">{activity.action}</div>
              <div className="text-xs text-muted-foreground">{activity.user} · {activity.resource || activity.receipt}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (content.contracts) {
    return (
      <div className="space-y-3">
        {content.contracts.map((contract: any, idx: number) => (
          <Card key={idx} className="p-4 bg-black/20 border-white/10">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold">{contract.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Version {contract.version} · Signed {contract.signed_date}
                </div>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">{contract.status}</Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {contract.parties.join(" ↔ ")} · {contract.amendments} amendments
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (content.process) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          {content.process.map((step: string, idx: number) => (
            <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-black/20">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
                {idx + 1}
              </div>
              <div className="flex-1 text-sm">{step}</div>
            </div>
          ))}
        </div>
        {content.example && (
          <Card className="p-4 bg-emerald-950/20 border-emerald-500/20">
            <div className="font-semibold text-sm mb-3">Example</div>
            <div className="space-y-2 text-xs font-mono">
              <div>File: {content.example.file}</div>
              <div>Size: {content.example.size}</div>
              <div className="break-all">Hash: {content.example.hash}</div>
              <div>Uploaded: {content.example.uploaded}</div>
              <div className="text-green-400">{content.example.verified}</div>
            </div>
          </Card>
        )}
      </div>
    );
  }

  if (content.example_timeline) {
    return (
      <div className="space-y-3">
        {content.example_timeline.map((item: any, idx: number) => (
          <div key={idx} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              {idx < content.example_timeline.length - 1 && <div className="w-0.5 h-12 bg-white/10 my-2" />}
            </div>
            <div className="flex-1 pb-8">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">Version {item.version}</span>
                <Badge variant="outline">{item.change}</Badge>
              </div>
              <div className="text-xs text-muted-foreground">{item.timestamp} · {item.user}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Object.entries(item.fields).map(([k, v]) => `${k}: ${v}`).join(", ")}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (content.queue) {
    return (
      <div className="space-y-3">
        {content.queue.map((item: any, idx: number) => (
          <Card key={idx} className="p-4 bg-black/20 border-white/10">
            <div className="flex items-start justify-between mb-2">
              <div className="font-semibold">{item.receipt}</div>
              <Badge variant="outline">{item.status}</Badge>
            </div>
            <div className="text-sm text-muted-foreground mb-1">{item.issue}</div>
            <div className="text-xs text-muted-foreground">Assigned to: {item.assigned_to}</div>
          </Card>
        ))}
      </div>
    );
  }

  return <div className="text-sm text-muted-foreground">Data visualization would appear here</div>;
}

function getBadgeData(type: BadgeType) {
  const data: Record<BadgeType, any> = {
    receipts: {
      title: "Receipts as the Product",
      icon: Star,
      color: "purple",
      level1: {
        subtitle: "Document-first governance system",
        description: "Every KPI, every metric, every decision traces back to source documents. No black boxes, no trust-me spreadsheets.",
        stats: [
          { label: "Receipts Ingested", value: "12,847", change: "+23% MoM" },
          { label: "Documents Verified", value: "11,923", change: "92.8% rate" },
          { label: "KPIs Linked", value: "342", change: "100% traced" },
        ],
      },
      level2: {
        sections: [
          {
            title: "Receipt Types",
            items: [
              { name: "Carrier Invoices", count: 4234, percentage: 33, verified: 98.2 },
              { name: "PBM Contracts", count: 1876, percentage: 15, verified: 100 },
              { name: "Form 5500s", count: 892, percentage: 7, verified: 100 },
              { name: "Claims Data", count: 3654, percentage: 28, verified: 94.7 },
              { name: "Plan Documents", count: 2191, percentage: 17, verified: 99.1 },
            ],
          },
          {
            title: "Verification Pipeline",
            items: [
              { stage: "Upload", description: "Secure receipt ingestion with hash generation" },
              { stage: "Parse", description: "OCR + structured extraction" },
              { stage: "Verify", description: "Cross-reference + validation rules" },
              { stage: "Link", description: "Connect to KPIs and ledger entries" },
            ],
          },
        ],
      },
      level3: {
        title: "Deep Dive: Evidence Chain Analysis",
        tabs: [
          {
            id: "lineage",
            label: "Data Lineage",
            content: {
              description: "Complete provenance tracking from source document to KPI display",
              flows: [
                {
                  name: "Claims Cost PEPM",
                  steps: [
                    "Carrier invoice uploaded (PDF) → Hash: 9f3c...a21b",
                    "OCR extraction → Total: $4.2M, Period: Jan 2026",
                    "Cross-reference → Plan doc, member count, eligibility",
                    "Calculation → $4.2M / 18,234 members = $230.45 PEPM",
                    "KPI badge generated → Verified, Fresh (2 days old)",
                  ],
                },
              ],
            },
          },
          {
            id: "integrity",
            label: "Integrity Checks",
            content: {
              description: "Cryptographic and logical validation ensuring receipt authenticity",
              checks: [
                { name: "Hash Verification", status: "PASS", details: "All receipts match stored hashes - no tampering detected" },
                { name: "Timestamp Consistency", status: "PASS", details: "Upload dates align with document dates ±5 days" },
                { name: "Cross-Reference", status: "PASS", details: "98.2% of invoices match corresponding plan periods" },
                { name: "Duplicate Detection", status: "WARNING", details: "23 potential duplicates flagged for review" },
              ],
            },
          },
          {
            id: "coverage",
            label: "Coverage Map",
            content: {
              description: "Percentage of metrics backed by verified receipts",
              categories: [
                { name: "Financial KPIs", coverage: 100, receipts: 342 },
                { name: "Utilization Metrics", coverage: 94, receipts: 187 },
                { name: "Quality Measures", coverage: 87, receipts: 156 },
                { name: "Vendor Performance", coverage: 100, receipts: 234 },
              ],
            },
          },
        ],
      },
      level4: {
        title: "Full Governance Workspace: Receipts System",
        capabilities: [
          "Receipt library with advanced search and filtering",
          "Bulk upload and verification workflows",
          "KPI-to-receipt mapping editor",
          "Audit trail export for board packets",
          "Hash verification tools and integrity dashboards",
        ],
      },
    },
    ebitda: {
      title: "EBITDA Governance",
      icon: TrendingUp,
      color: "green",
      level1: {
        subtitle: "Benefits spend as a controllable EBITDA line",
        description: "Frame healthcare as financial control: unit economics, variance drivers, avoidable spend. This is P&L management, not HR fuzzy feelings.",
        stats: [
          { label: "Annual Benefits Spend", value: "$47.3M", change: "-8.2% YoY" },
          { label: "Avoidable Leakage", value: "$4.2M", change: "8.9% of spend" },
          { label: "EBITDA Impact", value: "+$3.1M", change: "Realized savings" },
        ],
      },
      level2: {
        sections: [
          {
            title: "Spend Breakdown",
            items: [
              { category: "Medical Claims", annual: 28400000, percentage: 60 },
              { category: "Pharmacy", annual: 12200000, percentage: 26 },
              { category: "Admin Fees", annual: 3800000, percentage: 8 },
              { category: "Stop-Loss Premium", annual: 2900000, percentage: 6 },
            ],
          },
          {
            title: "Leakage Sources",
            items: [
              { category: "Contract Non-Compliance", amount: 1680000 },
              { category: "Inappropriate Utilization", amount: 1340000 },
              { category: "Billing Errors", amount: 820000 },
              { category: "Uncaptured Rebates", amount: 360000 },
            ],
          },
        ],
      },
      level3: {
        title: "Deep Dive: EBITDA Variance Analysis",
        tabs: [
          {
            id: "drivers",
            label: "Variance Drivers",
            content: {
              description: "Root cause decomposition of spend vs. budget",
              drivers: [
                { factor: "Volume (Member Count)", impact: "+$840K", direction: "unfavorable", explanation: "Headcount grew 4.2% above plan" },
                { factor: "Unit Cost (PEPM)", impact: "-$2.1M", direction: "favorable", explanation: "Medical trend: 3.8% vs. 6.5% budget" },
                { factor: "Mix (High-Cost Cases)", impact: "+$680K", direction: "unfavorable", explanation: "3 catastrophic claims (>$250K each)" },
                { factor: "Vendor Performance", impact: "-$1.4M", direction: "favorable", explanation: "PBM contract renegotiation + enhanced rebates" },
              ],
            },
          },
          {
            id: "interventions",
            label: "Active Interventions",
            content: {
              description: "Initiatives in flight to reduce avoidable spend",
              programs: [
                { name: "High-Cost Claimant Management", target: "$920K annual savings", status: "On track", progress: "67%" },
                { name: "Specialty Pharmacy Optimization", target: "$1.2M annual savings", status: "Ahead of plan", progress: "84%" },
                { name: "Contract Enforcement (PBM)", target: "$540K recovery", status: "In negotiation", progress: "58%" },
              ],
            },
          },
        ],
      },
      level4: {
        title: "Full Governance Workspace: EBITDA Control Center",
        capabilities: [
          "Real-time spend dashboards with drill-down to claims",
          "Variance analysis with attribution to drivers",
          "Intervention tracking with ROI measurement",
          "Budget vs. actual reports with forecast updates",
          "Board-ready financial packets with evidence links",
        ],
      },
    },
    verification: {
      title: "Verification",
      icon: Shield,
      color: "blue",
      level1: {
        subtitle: "Every claim must be provable",
        description: "Cryptographic hashing, cross-referencing, human-in-the-loop approvals. No 'trust us' — operational controls.",
        stats: [
          { label: "Verification Rate", value: "92.8%", change: "+4.3% QoQ" },
          { label: "Pending Review", value: "847", change: "6.6% of total" },
          { label: "Rejected", value: "77", change: "0.6% of total" },
        ],
      },
      level2: {
        sections: [
          {
            title: "Verification Stages",
            items: [
              { stage: "Hash Generation", description: "SHA-256 on upload", status: "100% automated" },
              { stage: "OCR Extraction", description: "Structured data parsing", status: "97.3% accuracy" },
              { stage: "Cross-Reference", description: "Link to existing records", status: "94.2% match" },
              { stage: "Business Rules", description: "Logic checks + constraints", status: "89.7% pass" },
              { stage: "Human Review", description: "Flagged items escalated", status: "18hr avg" },
            ],
          },
          {
            title: "Verification Outcomes",
            items: [
              { outcome: "Auto-Verified", count: 11923, percentage: 92.8 },
              { outcome: "Pending Review", count: 847, percentage: 6.6 },
              { outcome: "Rejected", count: 77, percentage: 0.6 },
            ],
          },
        ],
      },
      level3: {
        title: "Deep Dive: Verification Engine",
        tabs: [
          {
            id: "rules",
            label: "Business Rules",
            content: {
              description: "Automated logic checks applied to every receipt",
              checks: [
                { rule: "Date Consistency", description: "Invoice date must be within ±30 days of upload date", status: "PASS" },
                { rule: "Amount Reasonableness", description: "Total cost must be within 3σ of historical average", status: "PASS" },
                { rule: "Vendor Match", description: "Vendor name must exist in approved list", status: "PASS" },
                { rule: "Duplicate Check", description: "No identical hash exists in system", status: "PASS" },
              ],
            },
          },
          {
            id: "human-review",
            label: "Human Review Queue",
            content: {
              description: "Items requiring manual adjudication",
              queue: [
                { receipt: "Carrier Invoice - Feb 2026", issue: "Amount variance: 34% above expected", assigned_to: "Sarah Chen", status: "Under review" },
                { receipt: "PBM Contract Amendment", issue: "Missing signature page", assigned_to: "Legal Team", status: "Awaiting document" },
                { receipt: "Form 5500 - 2025", issue: "Participant count mismatch vs. payroll", assigned_to: "Finance Team", status: "In reconciliation" },
              ],
            },
          },
          {
            id: "audit-trail",
            label: "Audit Trail",
            content: {
              description: "Immutable log of all verification decisions",
              recent_events: [
                { timestamp: "2026-02-23 14:32:18", action: "Receipt verified", user: "System (Auto)", receipt: "Invoice_Jan2026_CarrierA.pdf" },
                { timestamp: "2026-02-23 14:18:42", action: "Manual approval", user: "Sarah Chen", receipt: "PBM_Contract_Amendment2.pdf" },
                { timestamp: "2026-02-23 13:56:09", action: "Receipt rejected", user: "System (Rule: Duplicate)", receipt: "Claims_Q4_Duplicate.csv" },
              ],
            },
          },
        ],
      },
      level4: {
        title: "Full Governance Workspace: Verification Control Center",
        capabilities: [
          "Manual review queue with assignment and tracking",
          "Business rule editor for custom validation logic",
          "Hash verification tools and integrity monitoring",
          "Audit trail export for compliance reporting",
          "Approval workflow configuration and management",
        ],
      },
    },
    trust: {
      title: "Enterprise Trust",
      icon: Crown,
      color: "amber",
      level1: {
        subtitle: "Security, legal, and compliance by design",
        description: "If Legal and Security can't sign off, nothing ships. Role-based access, tamper-evident logs, HIPAA-adjacent controls.",
        stats: [
          { label: "Security Posture", value: "98.7%", change: "SOC 2 compliant" },
          { label: "Access Violations", value: "0", change: "Zero incidents" },
          { label: "Data Breaches", value: "0", change: "Zero incidents" },
        ],
      },
      level2: {
        sections: [
          {
            title: "Security Controls",
            items: [
              { control: "Encryption at Rest", status: "Active" },
              { control: "Encryption in Transit", status: "Active" },
              { control: "Role-Based Access", status: "Enforced" },
              { control: "Activity Logging", status: "Active" },
              { control: "Data Compartmentalization", status: "Enforced" },
            ],
          },
          {
            title: "Compliance Framework",
            items: [
              { framework: "SOC 2 Type II", status: "Certified" },
              { framework: "HIPAA-Adjacent", status: "Compliant" },
              { framework: "GDPR", status: "Compliant" },
            ],
          },
        ],
      },
      level3: {
        title: "Deep Dive: Trust Architecture",
        tabs: [
          {
            id: "access",
            label: "Access Control",
            content: {
              description: "Granular permissions with least-privilege enforcement",
              roles: [
                { name: "Executive Viewer", permissions: ["View KPIs", "Export reports"], users: 12, restrictions: "No PII access" },
                { name: "Finance Analyst", permissions: ["View receipts", "Approve ledger entries", "Run reconciliations"], users: 23, restrictions: "No member-level claims data" },
                { name: "Compliance Officer", permissions: ["Full audit trail access", "Approve/reject receipts", "Configure rules"], users: 4, restrictions: "Cannot modify historical records" },
                { name: "System Admin", permissions: ["User management", "Role configuration", "System settings"], users: 2, restrictions: "All actions logged and reviewed" },
              ],
            },
          },
          {
            id: "audit-log",
            label: "Activity Monitoring",
            content: {
              description: "Tamper-evident log of all system actions",
              recent_activity: [
                { timestamp: "2026-02-23 14:45:12", user: "sarah.chen@company.com", action: "Approved ledger entry", resource: "Entry #L-2026-00342", ip: "10.0.42.18" },
                { timestamp: "2026-02-23 14:32:08", user: "michael.torres@company.com", action: "Exported financial report", resource: "Q1_2026_EBITDA_Report.pdf", ip: "10.0.42.22" },
                { timestamp: "2026-02-23 14:18:55", user: "admin@company.com", action: "Created new user", resource: "jennifer.walsh@company.com", ip: "10.0.1.5" },
              ],
            },
          },
          {
            id: "legal",
            label: "Legal Readiness",
            content: {
              description: "Contract versioning and signature management",
              contracts: [
                { name: "PBM Master Agreement", version: 3, signed_date: "2025-08-15", parties: ["Company", "PBM Vendor A"], amendments: 2, status: "Active" },
                { name: "Carrier Agreement", version: 1, signed_date: "2026-01-01", parties: ["Company", "Insurance Carrier B"], amendments: 0, status: "Active" },
                { name: "TPA Services Agreement", version: 2, signed_date: "2024-12-01", parties: ["Company", "TPA Services LLC"], amendments: 1, status: "Active" },
              ],
            },
          },
        ],
      },
      level4: {
        title: "Full Governance Workspace: Trust & Compliance Center",
        capabilities: [
          "User and role management with permission matrices",
          "Activity monitoring dashboard with anomaly detection",
          "Contract library with version control and signatures",
          "Compliance reporting and audit packet generation",
          "Security posture dashboard with control status",
        ],
      },
    },
    immutable: {
      title: "Immutable-ish Records",
      icon: Lock,
      color: "emerald",
      level1: {
        subtitle: "Tamper-evident ledger for receipts",
        description: "Receipts are hashed on upload and linked to KPIs. Changes are logged, not deleted. You can prove what was known, when.",
        stats: [
          { label: "Total Hashes", value: "12,847", change: "100% coverage" },
          { label: "Hash Collisions", value: "0", change: "Zero conflicts" },
          { label: "Audit Entries", value: "47,329", change: "All changes logged" },
        ],
      },
      level2: {
        sections: [
          {
            title: "Hash Algorithm",
            items: [
              { property: "Algorithm", value: "SHA-256" },
              { property: "Hash Length", value: "256 bits (64 hex chars)" },
              { property: "Collision Resistance", value: "2^128 operations" },
              { property: "Pre-image Resistance", value: "2^256 operations" },
            ],
          },
          {
            title: "Immutability Guarantees",
            items: [
              { guarantee: "Receipt files", behavior: "Stored with hash, cannot be modified after upload" },
              { guarantee: "Metadata", behavior: "Versioned - changes append new record, old preserved" },
              { guarantee: "KPI links", behavior: "Historical links retained even when updated" },
              { guarantee: "Audit trail", behavior: "Append-only log, no deletions permitted" },
            ],
          },
        ],
      },
      level3: {
        title: "Deep Dive: Immutability Architecture",
        tabs: [
          {
            id: "hashing",
            label: "Hash Generation",
            content: {
              description: "Cryptographic fingerprinting of all receipts",
              process: [
                "1. Receipt uploaded (PDF, CSV, etc.)",
                "2. SHA-256 hash computed from file bytes",
                "3. Hash stored in database alongside receipt metadata",
                "4. Original file stored in immutable object storage (write-once)",
                "5. Any future download can be re-hashed and compared to stored hash",
              ],
              example: {
                file: "Carrier_Invoice_Jan2026.pdf",
                size: "2.4 MB",
                hash: "9f3c7a8d2e1b4f6c8a3d5e7f9b2c4a6d8e1f3a5b7c9d2e4f6a8b1c3d5e7f9a2b",
                uploaded: "2026-02-15 14:32:18 UTC",
                verified: "Hash matches stored value ✓",
              },
            },
          },
          {
            id: "versioning",
            label: "Metadata Versioning",
            content: {
              description: "Changes to receipt metadata create new versions, preserving history",
              example_timeline: [
                { version: 1, timestamp: "2026-02-15 14:32:18", change: "Receipt uploaded", user: "System", fields: { status: "Pending", assigned_to: null } },
                { version: 2, timestamp: "2026-02-15 16:45:22", change: "Assigned for review", user: "admin@company.com", fields: { status: "Under Review", assigned_to: "sarah.chen@company.com" } },
                { version: 3, timestamp: "2026-02-16 09:18:33", change: "Verified and approved", user: "sarah.chen@company.com", fields: { status: "Verified", assigned_to: "sarah.chen@company.com" } },
              ],
            },
          },
          {
            id: "integrity",
            label: "Integrity Monitoring",
            content: {
              description: "Continuous verification that stored hashes match file contents",
              checks: [
                { check: "Daily Hash Verification", scope: "Random sample of 500 receipts", result: "500/500 passed (100%)" },
                { check: "Weekly Full Scan", scope: "All 12,847 receipts", result: "12,847/12,847 passed (100%)" },
                { check: "Access Audit", scope: "All download events", result: "No unauthorized access detected" },
              ],
            },
          },
        ],
      },
      level4: {
        title: "Full Governance Workspace: Immutability Control Center",
        capabilities: [
          "Hash verification tools with bulk checking",
          "Version history browser with diff viewer",
          "Integrity monitoring dashboard with alerts",
          "Audit trail export for compliance reporting",
          "Forensic analysis tools for tamper detection",
        ],
      },
    },
  };

  return data[type];
}