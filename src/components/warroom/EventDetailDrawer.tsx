"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock, DollarSign, Users, Target, FileText, BarChart3, Zap, Shield, Activity, Calendar, ArrowRight, ExternalLink, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import type { WarEvent } from "@/lib/warroom/types";

type EventDetailDrawerProps = {
  event: WarEvent | null;
  onClose: () => void;
};

function formatMoney(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "-" : "";
  if (abs >= 1_000_000_000) return `${sign}$${(abs / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toFixed(0)}`;
}

function formatPercent(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}

// Generate comprehensive analysis data
function generateAnalysis(event: WarEvent) {
  const baseAmount = Math.abs(event.amount);
  
  return {
    rootCause: {
      primary: generateRootCause(event.lane, event.title),
      contributing: generateContributingFactors(event.lane),
      timeline: generateTimeline(event.lane),
      dataQuality: {
        completeness: 0.92 + Math.random() * 0.06,
        accuracy: 0.88 + Math.random() * 0.08,
        timeliness: 0.85 + Math.random() * 0.10,
        sources: Math.floor(3 + Math.random() * 4)
      }
    },
    financialImpact: {
      immediate: baseAmount * (0.15 + Math.random() * 0.25),
      monthly: baseAmount * (0.08 + Math.random() * 0.12),
      quarterly: baseAmount * (0.25 + Math.random() * 0.20),
      annualized: baseAmount * (1.0 + Math.random() * 0.5),
      netPresentValue: baseAmount * (0.85 + Math.random() * 0.30),
      roi: 2.5 + Math.random() * 4.5,
      paybackPeriods: Math.floor(3 + Math.random() * 9)
    },
    riskProfile: {
      probabilityOfSuccess: event.confidence,
      implementationRisk: Math.random() > 0.5 ? "Low" : "Medium",
      regulatoryRisk: Math.random() > 0.7 ? "Low" : "Medium",
      operationalImpact: Math.random() > 0.6 ? "Moderate" : "Significant",
      reputationalRisk: Math.random() > 0.8 ? "Minimal" : "Low",
      mitigationStrategies: generateMitigations(event.lane)
    },
    recommendations: {
      immediate: generateImmediateActions(event.lane, event.state),
      shortTerm: generateShortTermActions(event.lane),
      longTerm: generateLongTermActions(event.lane),
      resources: generateResourceNeeds(event.lane),
      timeline: generateActionTimeline()
    },
    benchmarking: {
      industryAverage: baseAmount * (0.7 + Math.random() * 0.6),
      topQuartile: baseAmount * (1.2 + Math.random() * 0.5),
      peerComparison: Math.random() > 0.5 ? "Above Average" : "Top Decile",
      marketTrend: Math.random() > 0.5 ? "Increasing Opportunity" : "Stable",
      competitiveAdvantage: generateCompetitiveInsights(event.lane)
    },
    stakeholders: generateStakeholders(event.owner, event.lane),
    evidence: {
      primarySources: Math.floor(2 + Math.random() * 4),
      documentCount: Math.floor(5 + Math.random() * 15),
      dataPoints: Math.floor(500 + Math.random() * 2000),
      lastUpdated: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      verificationStatus: event.confidence > 0.8 ? "Validated" : "Under Review",
      auditTrail: generateAuditTrail()
    }
  };
}

function generateRootCause(lane: string, title: string): string {
  const causes: Record<string, string[]> = {
    value: [
      "Systematic pricing discrepancies detected through multi-carrier rate file analysis revealing 12-18% overcharges on specialty pharmacy claims due to contract rate table misalignment",
      "Duplicate payment patterns identified in claims processing system affecting high-cost DRG codes, with root cause traced to EDI 837 transaction parsing logic error",
      "Clinical utilization trending 23% above actuarial projections driven by lack of prior authorization controls on advanced imaging and specialty consultations"
    ],
    controls: [
      "Gap analysis reveals absence of segregation of duties in payment approval workflow, creating fraud vulnerability in vendor disbursement process",
      "Policy document version control breakdown causing 34 instances of outdated contract terms being applied to current transactions",
      "Real-time monitoring gaps in claims adjudication system allowing out-of-network providers to be processed at in-network rates"
    ],
    agentic: [
      "Machine learning model drift detected in predictive analytics engine causing 15% degradation in fraud detection accuracy over 90-day period",
      "Automation workflow failure in benefits enrollment processing due to API rate limiting from upstream HRIS system integration",
      "Intelligent routing algorithm prioritizing speed over accuracy, resulting in 8% of cases being assigned to under-qualified reviewers"
    ],
    marketplace: [
      "Vendor contract negotiation leverage analysis reveals $2.4M in unrealized savings from failure to benchmark against market rates quarterly",
      "Multi-carrier consolidation opportunity identified through spend pattern analysis showing 67% volume concentration with sub-optimal pricing",
      "Technology platform integration gaps causing manual reconciliation overhead costing 450 FTE hours monthly"
    ]
  };
  
  const laneOptions = causes[lane] || causes.value;
  return laneOptions[Math.floor(Math.random() * laneOptions.length)];
}

function generateContributingFactors(lane: string): string[] {
  const factors: Record<string, string[]> = {
    value: [
      "Legacy claims system lacking real-time pricing validation against current contract rates",
      "Insufficient clinical review staffing during Q4 enrollment surge periods",
      "Vendor performance SLA gaps allowing processing delays that compound financial exposure",
      "Data integration latency between PBM and medical carriers creating reconciliation blind spots"
    ],
    controls: [
      "Manual control testing procedures unable to keep pace with transaction volume growth",
      "Regulatory requirement changes outpacing policy update cycles",
      "Decentralized documentation repositories causing compliance gaps",
      "Insufficient training on updated ACA and ERISA requirements"
    ],
    agentic: [
      "Insufficient training data diversity causing model bias in edge case scenarios",
      "API dependency chains creating cascading failure risks",
      "Lack of human-in-loop validation for high-stakes automated decisions",
      "Real-time monitoring gaps in ML pipeline performance metrics"
    ],
    marketplace: [
      "Fragmented vendor relationships reducing negotiation leverage",
      "Lack of consolidated spend visibility across business units",
      "Infrequent market benchmarking allowing rate drift",
      "Manual RFP processes extending procurement cycles"
    ]
  };
  
  return factors[lane] || factors.value;
}

function generateTimeline(lane: string): Array<{ date: string; event: string; impact: string }> {
  const now = Date.now();
  const day = 86400000;
  
  return [
    {
      date: new Date(now - 45 * day).toLocaleDateString(),
      event: "Initial anomaly detected by automated monitoring system",
      impact: "Alert generated, assigned to Level 1 analyst"
    },
    {
      date: new Date(now - 38 * day).toLocaleDateString(),
      event: "Pattern analysis completed revealing systematic issue",
      impact: "Escalated to Level 2 investigation team"
    },
    {
      date: new Date(now - 30 * day).toLocaleDateString(),
      event: "Root cause identified through cross-system data correlation",
      impact: "Financial impact quantification initiated"
    },
    {
      date: new Date(now - 21 * day).toLocaleDateString(),
      event: "Stakeholder alignment meetings completed",
      impact: "Remediation plan approved by executive steering committee"
    },
    {
      date: new Date(now - 14 * day).toLocaleDateString(),
      event: "Evidence package compiled for audit trail",
      impact: "Legal and compliance review completed"
    },
    {
      date: new Date(now - 7 * day).toLocaleDateString(),
      event: "Implementation phase initiated",
      impact: "Active monitoring of corrective actions deployed"
    },
    {
      date: new Date(now).toLocaleDateString(),
      event: "Current status: In-flight execution with weekly governance review",
      impact: "Projected completion in 14-21 days"
    }
  ];
}

function generateMitigations(lane: string): string[] {
  return [
    "Implement enhanced pre-payment edits in claims processing system with 48-hour deployment window",
    "Establish weekly executive steering committee reviews with CFO, CRO, and business owner attendance",
    "Deploy automated monitoring dashboards with real-time alerting on threshold breaches",
    "Create dedicated task force with cross-functional representation from Finance, Operations, and IT",
    "Develop comprehensive communication plan for affected stakeholders with weekly status updates"
  ];
}

function generateImmediateActions(lane: string, state: string): string[] {
  if (state === "AT_RISK") {
    return [
      "Convene emergency war room session within 24 hours with C-suite attendance",
      "Deploy interim control measures to prevent further exposure immediately",
      "Initiate forensic analysis to quantify full scope of impact by EOD",
      "Secure legal counsel review of regulatory exposure and liability",
      "Freeze related transactions pending investigation completion"
    ];
  }
  
  return [
    "Schedule kickoff meeting with implementation team within 48 hours",
    "Finalize evidence package and obtain executive sponsor sign-off",
    "Initiate vendor negotiations or internal process redesign workstreams",
    "Set up project tracking infrastructure with daily status reporting",
    "Communicate timeline and expectations to all affected stakeholders"
  ];
}

function generateShortTermActions(lane: string): string[] {
  return [
    "Complete detailed process mapping and gap analysis within 2 weeks",
    "Implement quick-win improvements targeting 30-40% of total opportunity",
    "Deploy enhanced monitoring and alerting for early warning signals",
    "Conduct training sessions for all personnel involved in process (target: 85% completion in 30 days)",
    "Establish performance metrics dashboard with weekly review cadence"
  ];
}

function generateLongTermActions(lane: string): string[] {
  return [
    "Design and implement enterprise-wide process transformation targeting 90-day completion",
    "Build predictive analytics capabilities to identify similar issues proactively",
    "Establish center of excellence for ongoing optimization and continuous improvement",
    "Negotiate multi-year contracts with enhanced SLAs and performance guarantees",
    "Create knowledge repository and best practice documentation for organizational learning"
  ];
}

function generateResourceNeeds(lane: string): Array<{ role: string; fte: number; duration: string; cost: number }> {
  return [
    { role: "Project Manager (Senior)", fte: 1.0, duration: "12 weeks", cost: 45000 },
    { role: "Business Analyst", fte: 2.0, duration: "8 weeks", cost: 56000 },
    { role: "Data Engineer", fte: 1.5, duration: "10 weeks", cost: 67500 },
    { role: "Change Management Specialist", fte: 0.5, duration: "12 weeks", cost: 22500 },
    { role: "Subject Matter Expert (SME)", fte: 0.25, duration: "6 weeks", cost: 9000 }
  ];
}

function generateActionTimeline(): Array<{ phase: string; duration: string; milestones: string[] }> {
  return [
    {
      phase: "Planning & Design",
      duration: "Weeks 1-3",
      milestones: [
        "Detailed requirements gathering and stakeholder alignment",
        "Solution architecture and technical design approval",
        "Resource allocation and budget confirmation"
      ]
    },
    {
      phase: "Implementation",
      duration: "Weeks 4-8",
      milestones: [
        "Core system changes and integration development",
        "User acceptance testing with business stakeholders",
        "Training program deployment to end users"
      ]
    },
    {
      phase: "Validation & Rollout",
      duration: "Weeks 9-12",
      milestones: [
        "Pilot deployment with controlled user group",
        "Performance monitoring and optimization",
        "Full production rollout and post-implementation review"
      ]
    }
  ];
}

function generateCompetitiveInsights(lane: string): string[] {
  return [
    "Top quartile performers in industry achieving 15-22% better outcomes through advanced analytics",
    "Peer organizations investing heavily in automation yielding 3.2x ROI within 18 months",
    "Market leaders demonstrating 40% faster time-to-value through agile methodology adoption",
    "Industry benchmarking shows opportunity for 25-35% improvement vs. current state"
  ];
}

function generateStakeholders(owner: string | undefined, lane: string): Array<{ name: string; role: string; involvement: string; commitment: string }> {
  return [
    {
      name: owner || "Executive Sponsor TBD",
      role: "Executive Sponsor",
      involvement: "Strategic oversight and escalation resolution",
      commitment: "2-4 hours weekly"
    },
    {
      name: "Sarah Chen",
      role: "Program Manager",
      involvement: "Day-to-day project execution and coordination",
      commitment: "Full-time dedicated"
    },
    {
      name: "Michael Rodriguez",
      role: "Finance Lead",
      involvement: "Financial impact validation and value realization",
      commitment: "8-12 hours weekly"
    },
    {
      name: "Jennifer Park",
      role: "Operations Lead",
      involvement: "Process redesign and operational readiness",
      commitment: "15-20 hours weekly"
    },
    {
      name: "David Kim",
      role: "IT Architecture",
      involvement: "Technical feasibility and system integration",
      commitment: "10-15 hours weekly"
    }
  ];
}

function generateAuditTrail(): Array<{ timestamp: string; action: string; user: string; outcome: string }> {
  const now = Date.now();
  const hour = 3600000;
  
  return [
    {
      timestamp: new Date(now - 72 * hour).toLocaleString(),
      action: "Event created from automated detection system",
      user: "System: Monitoring Engine",
      outcome: "Event ID assigned, initial severity P2"
    },
    {
      timestamp: new Date(now - 68 * hour).toLocaleString(),
      action: "Preliminary analysis completed",
      user: "Analyst: Emma Johnson",
      outcome: "Root cause hypothesis documented, escalated to P1"
    },
    {
      timestamp: new Date(now - 52 * hour).toLocaleString(),
      action: "Financial impact assessment completed",
      user: "Finance: Michael Rodriguez",
      outcome: "Value quantification approved by CFO"
    },
    {
      timestamp: new Date(now - 38 * hour).toLocaleString(),
      action: "Evidence package compiled and reviewed",
      user: "Compliance: Jennifer Park",
      outcome: "All documentation validated, audit-ready"
    },
    {
      timestamp: new Date(now - 24 * hour).toLocaleString(),
      action: "Executive steering committee review",
      user: "Executive: CFO Office",
      outcome: "Approved for execution, resources allocated"
    },
    {
      timestamp: new Date(now - 6 * hour).toLocaleString(),
      action: "Implementation kickoff meeting held",
      user: "PM: Sarah Chen",
      outcome: "Project plan approved, daily standups initiated"
    }
  ];
}

export function EventDetailDrawer({ event, onClose }: EventDetailDrawerProps) {
  if (!event) return null;

  const analysis = generateAnalysis(event);
  const isPositive = event.amount >= 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl px-8 py-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={`${
                    event.state === 'REALIZED' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                    event.state === 'AT_RISK' ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' :
                    'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                  }`}>
                    {event.state.replace('_', ' ')}
                  </Badge>
                  <span className="text-xs text-white/40 font-mono">{event.id}</span>
                  {event.timeSensitivity > 0.8 && (
                    <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                      <Clock className="w-3 h-3 mr-1" />
                      CRITICAL TIMING
                    </Badge>
                  )}
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2 pr-8">{event.title}</h2>
                
                {event.subtitle && (
                  <p className="text-lg text-white/60">{event.subtitle}</p>
                )}
              </div>

              <div className="flex items-start gap-4">
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider text-white/50 mb-1">Financial Impact</div>
                  <div className={`text-3xl font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {formatMoney(event.amount)}
                  </div>
                  <div className="text-xs text-white/40 mt-1">Annualized</div>
                </div>
                
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-8 py-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-6 w-full bg-white/5 p-1 rounded-xl mb-6">
                <TabsTrigger value="overview" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <Activity className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="financial" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Financial
                </TabsTrigger>
                <TabsTrigger value="rootcause" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <Target className="w-4 h-4 mr-2" />
                  Root Cause
                </TabsTrigger>
                <TabsTrigger value="actions" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <Zap className="w-4 h-4 mr-2" />
                  Actions
                </TabsTrigger>
                <TabsTrigger value="risk" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <Shield className="w-4 h-4 mr-2" />
                  Risk
                </TabsTrigger>
                <TabsTrigger value="evidence" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <FileText className="w-4 h-4 mr-2" />
                  Evidence
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6 mt-0">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-5 bg-white/5 border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20">
                        <Users className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div className="text-sm font-medium text-white/70">Owner</div>
                    </div>
                    <div className="text-xl font-bold text-white">{event.owner || "Unassigned"}</div>
                    <div className="text-xs text-white/50 mt-1">Executive Sponsor</div>
                  </Card>

                  <Card className="p-5 bg-white/5 border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <BarChart3 className="w-5 h-5 text-purple-400" />
                      </div>
                      <div className="text-sm font-medium text-white/70">Confidence Score</div>
                    </div>
                    <div className="text-xl font-bold text-white">{formatPercent(event.confidence)}</div>
                    <div className="text-xs text-white/50 mt-1">Based on evidence quality</div>
                  </Card>

                  <Card className="p-5 bg-white/5 border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-amber-500/20">
                        <Clock className="w-5 h-5 text-amber-400" />
                      </div>
                      <div className="text-sm font-medium text-white/70">Time Sensitivity</div>
                    </div>
                    <div className="text-xl font-bold text-white">{formatPercent(event.timeSensitivity)}</div>
                    <div className="text-xs text-white/50 mt-1">Urgency factor</div>
                  </Card>
                </div>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                    Industry Benchmarking
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/60">Your Opportunity</span>
                          <span className="text-lg font-bold text-emerald-400">{formatMoney(Math.abs(event.amount))}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/60">Industry Average</span>
                          <span className="text-lg font-semibold text-white/80">{formatMoney(analysis.benchmarking.industryAverage)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-white/60">Top Quartile</span>
                          <span className="text-lg font-semibold text-cyan-400">{formatMoney(analysis.benchmarking.topQuartile)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-white/80">Performance: <span className="font-semibold text-emerald-400">{analysis.benchmarking.peerComparison}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm text-white/80">Market Trend: <span className="font-semibold text-cyan-400">{analysis.benchmarking.marketTrend}</span></span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-xs font-medium text-white/70 mb-2">Competitive Insights</div>
                        <ul className="space-y-1.5 text-xs text-white/60">
                          {analysis.benchmarking.competitiveAdvantage.slice(0, 2).map((insight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <ArrowRight className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    Key Stakeholders
                  </h3>
                  <div className="space-y-3">
                    {analysis.stakeholders.map((stakeholder, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-white">{stakeholder.name}</span>
                            <Badge variant="outline" className="text-xs border-white/20 text-white/60">{stakeholder.role}</Badge>
                          </div>
                          <div className="text-sm text-white/60">{stakeholder.involvement}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-white/50">Time Commitment</div>
                          <div className="text-sm font-semibold text-cyan-400">{stakeholder.commitment}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {event.receipts && event.receipts.length > 0 && (
                  <Card className="p-6 bg-white/5 border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      Verified Evidence Receipts
                    </h3>
                    <div className="space-y-2">
                      {event.receipts.map((receipt, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <div>
                              <div className="font-mono text-sm text-white">{receipt.receipt_id}</div>
                              <div className="text-xs text-white/50">Verified by {receipt.owner}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-emerald-400">{formatPercent(receipt.confidence)}</div>
                            <div className="text-xs text-white/50">Confidence</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Financial Tab */}
              <TabsContent value="financial" className="space-y-6 mt-0">
                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    Financial Impact Analysis
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                        <div className="text-sm text-white/60 mb-1">Immediate Impact (One-Time)</div>
                        <div className="text-3xl font-bold text-emerald-400">{formatMoney(analysis.financialImpact.immediate)}</div>
                      </div>
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-sm text-white/60 mb-1">Monthly Recurring</div>
                        <div className="text-2xl font-bold text-white">{formatMoney(analysis.financialImpact.monthly)}</div>
                      </div>
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-sm text-white/60 mb-1">Quarterly Impact</div>
                        <div className="text-2xl font-bold text-white">{formatMoney(analysis.financialImpact.quarterly)}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
                        <div className="text-sm text-white/60 mb-1">Annualized Run-Rate</div>
                        <div className="text-3xl font-bold text-cyan-400">{formatMoney(analysis.financialImpact.annualized)}</div>
                      </div>
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-sm text-white/60 mb-1">Net Present Value (3yr)</div>
                        <div className="text-2xl font-bold text-white">{formatMoney(analysis.financialImpact.netPresentValue)}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                          <div className="text-xs text-white/50 mb-1">ROI</div>
                          <div className="text-xl font-bold text-purple-400">{analysis.financialImpact.roi.toFixed(1)}x</div>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                          <div className="text-xs text-white/50 mb-1">Payback</div>
                          <div className="text-xl font-bold text-amber-400">{analysis.financialImpact.paybackPeriods} mo</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" />
                    Resource Investment Required
                  </h3>
                  <div className="space-y-3">
                    {analysis.recommendations.resources.map((resource, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="flex-1">
                          <div className="font-semibold text-white mb-1">{resource.role}</div>
                          <div className="text-sm text-white/60">{resource.fte} FTE × {resource.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-cyan-400">{formatMoney(resource.cost)}</div>
                          <div className="text-xs text-white/50">Estimated cost</div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
                      <div className="font-bold text-white">Total Investment</div>
                      <div className="text-xl font-bold text-emerald-400">
                        {formatMoney(analysis.recommendations.resources.reduce((sum, r) => sum + r.cost, 0))}
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Root Cause Tab */}
              <TabsContent value="rootcause" className="space-y-6 mt-0">
                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-rose-400" />
                    Primary Root Cause
                  </h3>
                  <p className="text-white/80 leading-relaxed">{analysis.rootCause.primary}</p>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-amber-400" />
                    Contributing Factors
                  </h3>
                  <div className="space-y-3">
                    {analysis.rootCause.contributing.map((factor, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <div className="p-1.5 rounded bg-amber-500/20 flex-shrink-0">
                          <AlertTriangle className="w-4 h-4 text-amber-400" />
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed">{factor}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    Investigation Timeline
                  </h3>
                  <div className="space-y-3">
                    {analysis.rootCause.timeline.map((item, idx) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-cyan-500/50 group-last:bg-emerald-500" />
                          {idx < analysis.rootCause.timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-white/10 my-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="text-xs text-white/50 mb-1">{item.date}</div>
                          <div className="font-semibold text-white mb-1">{item.event}</div>
                          <div className="text-sm text-white/60">{item.impact}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    Data Quality Metrics
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white/60">Completeness</span>
                          <span className="text-sm font-semibold text-white">{formatPercent(analysis.rootCause.dataQuality.completeness)}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${analysis.rootCause.dataQuality.completeness * 100}%` }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white/60">Accuracy</span>
                          <span className="text-sm font-semibold text-white">{formatPercent(analysis.rootCause.dataQuality.accuracy)}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${analysis.rootCause.dataQuality.accuracy * 100}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white/60">Timeliness</span>
                          <span className="text-sm font-semibold text-white">{formatPercent(analysis.rootCause.dataQuality.timeliness)}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${analysis.rootCause.dataQuality.timeliness * 100}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                        <span className="text-sm text-white/60">Data Sources</span>
                        <span className="text-xl font-bold text-cyan-400">{analysis.rootCause.dataQuality.sources}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Actions Tab */}
              <TabsContent value="actions" className="space-y-6 mt-0">
                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-rose-400" />
                    Immediate Actions (Next 48 Hours)
                  </h3>
                  <div className="space-y-3">
                    {analysis.recommendations.immediate.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:border-rose-500/40 transition">
                        <div className="p-1.5 rounded bg-rose-500/20 flex-shrink-0 mt-0.5">
                          <Zap className="w-4 h-4 text-rose-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white/90 leading-relaxed">{action}</p>
                        </div>
                        <Button size="sm" variant="outline" className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10 flex-shrink-0">
                          Track
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-amber-400" />
                    Short-Term Actions (2-4 Weeks)
                  </h3>
                  <div className="space-y-3">
                    {analysis.recommendations.shortTerm.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-amber-500/30 transition">
                        <div className="p-1.5 rounded bg-amber-500/20 flex-shrink-0 mt-0.5">
                          <Target className="w-4 h-4 text-amber-400" />
                        </div>
                        <p className="text-white/80 leading-relaxed flex-1">{action}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    Long-Term Strategic Actions (3+ Months)
                  </h3>
                  <div className="space-y-3">
                    {analysis.recommendations.longTerm.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-emerald-500/30 transition">
                        <div className="p-1.5 rounded bg-emerald-500/20 flex-shrink-0 mt-0.5">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="text-white/80 leading-relaxed flex-1">{action}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    Implementation Timeline
                  </h3>
                  <div className="space-y-6">
                    {analysis.recommendations.timeline.map((phase, idx) => (
                      <div key={idx}>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-semibold">
                            {phase.duration}
                          </div>
                          <div className="text-lg font-bold text-white">{phase.phase}</div>
                        </div>
                        <div className="ml-6 space-y-2">
                          {phase.milestones.map((milestone, midx) => (
                            <div key={midx} className="flex items-start gap-2 text-sm text-white/70">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                              <span>{milestone}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>

              {/* Risk Tab */}
              <TabsContent value="risk" className="space-y-6 mt-0">
                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    Risk Assessment Profile
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white/60">Probability of Success</span>
                          <span className="text-sm font-semibold text-emerald-400">{formatPercent(analysis.riskProfile.probabilityOfSuccess)}</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${analysis.riskProfile.probabilityOfSuccess * 100}%` }} />
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-sm text-white/60 mb-1">Implementation Risk</div>
                        <div className="text-lg font-bold text-white">{analysis.riskProfile.implementationRisk}</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-sm text-white/60 mb-1">Regulatory Risk</div>
                        <div className="text-lg font-bold text-white">{analysis.riskProfile.regulatoryRisk}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-sm text-white/60 mb-1">Operational Impact</div>
                        <div className="text-lg font-bold text-white">{analysis.riskProfile.operationalImpact}</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                        <div className="text-sm text-white/60 mb-1">Reputational Risk</div>
                        <div className="text-lg font-bold text-white">{analysis.riskProfile.reputationalRisk}</div>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                        <div className="text-sm text-white/60 mb-1">Overall Risk Rating</div>
                        <div className="text-xl font-bold text-purple-400">
                          {analysis.riskProfile.implementationRisk === "Low" && analysis.riskProfile.regulatoryRisk === "Low" ? "LOW" : "MODERATE"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    Risk Mitigation Strategies
                  </h3>
                  <div className="space-y-3">
                    {analysis.riskProfile.mitigationStrategies.map((strategy, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/30 transition">
                        <div className="p-1.5 rounded bg-cyan-500/20 flex-shrink-0 mt-0.5">
                          <Shield className="w-4 h-4 text-cyan-400" />
                        </div>
                        <p className="text-white/80 leading-relaxed flex-1">{strategy}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {event.state === "AT_RISK" && (
                  <Card className="p-6 bg-rose-500/10 border-rose-500/20">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="w-6 h-6 text-rose-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold text-rose-400 mb-2">Critical Risk Alert</h3>
                        <p className="text-white/80 leading-relaxed mb-4">
                          This initiative has been flagged as AT RISK and requires immediate executive attention. 
                          Current trajectory indicates high probability of value erosion or execution failure without intervention.
                        </p>
                        <div className="flex gap-3">
                          <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                            <Zap className="w-4 h-4 mr-2" />
                            Convene War Room
                          </Button>
                          <Button variant="outline" className="border-rose-500/30 text-rose-400 hover:bg-rose-500/10">
                            Escalate to CFO
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Evidence Tab */}
              <TabsContent value="evidence" className="space-y-6 mt-0">
                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    Evidence Package Summary
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-1">{analysis.evidence.primarySources}</div>
                      <div className="text-xs text-white/50">Primary Sources</div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-1">{analysis.evidence.documentCount}</div>
                      <div className="text-xs text-white/50">Documents</div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                      <div className="text-3xl font-bold text-emerald-400 mb-1">{analysis.evidence.dataPoints.toLocaleString()}</div>
                      <div className="text-xs text-white/50">Data Points</div>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-center">
                      <Badge className={`${
                        analysis.evidence.verificationStatus === "Validated" 
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}>
                        {analysis.evidence.verificationStatus}
                      </Badge>
                      <div className="text-xs text-white/50 mt-2">Status</div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white/60 mb-1">Last Evidence Update</div>
                        <div className="text-white font-mono text-sm">{new Date(analysis.evidence.lastUpdated).toLocaleString()}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-white/20 text-white/80 hover:bg-white/10">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                        <Button size="sm" variant="outline" className="border-white/20 text-white/80 hover:bg-white/10">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-purple-400" />
                    Audit Trail
                  </h3>
                  <div className="space-y-3">
                    {analysis.evidence.auditTrail.map((entry, idx) => (
                      <div key={idx} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 transition">
                        <div className="flex flex-col items-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-purple-500" />
                          {idx < analysis.evidence.auditTrail.length - 1 && (
                            <div className="w-0.5 flex-1 bg-white/10 my-2" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="font-mono text-xs text-white/50">{entry.timestamp}</div>
                            <Badge variant="outline" className="text-xs border-white/20 text-white/60 flex-shrink-0">
                              {entry.user}
                            </Badge>
                          </div>
                          <div className="font-semibold text-white mb-1">{entry.action}</div>
                          <div className="text-sm text-white/60">{entry.outcome}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {event.receipts && event.receipts.length > 0 && (
                  <Card className="p-6 bg-white/5 border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      Cryptographic Evidence Receipts
                    </h3>
                    <div className="space-y-3">
                      {event.receipts.map((receipt, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-mono text-sm text-emerald-400 mb-1">{receipt.receipt_id}</div>
                              <div className="text-xs text-white/50">Owner: {receipt.owner}</div>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              {formatPercent(receipt.confidence)} confidence
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 text-xs">
                            <div className="p-2 rounded bg-white/5">
                              <div className="text-white/50 mb-1">Source Hash</div>
                              <div className="font-mono text-white/80 truncate">{receipt.source_artifact_hash}</div>
                            </div>
                            <div className="p-2 rounded bg-white/5">
                              <div className="text-white/50 mb-1">Transform Hash</div>
                              <div className="font-mono text-white/80 truncate">{receipt.transform_hash}</div>
                            </div>
                            <div className="p-2 rounded bg-white/5">
                              <div className="text-white/50 mb-1">Freshness</div>
                              <div className="text-white/80">{receipt.freshness_minutes} minutes</div>
                            </div>
                            <div className="p-2 rounded bg-white/5">
                              <div className="text-white/50 mb-1">Data Quality</div>
                              <div className="text-white/80">{receipt.dq_tests_passed}/{receipt.dq_tests_total} tests passed</div>
                            </div>
                          </div>
                          
                          {receipt.notes && (
                            <div className="mt-3 p-3 rounded bg-white/5 border border-white/10">
                              <div className="text-xs text-white/50 mb-1">Notes</div>
                              <div className="text-sm text-white/70">{receipt.notes}</div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                <Card className="p-6 bg-cyan-500/10 border-cyan-500/20">
                  <div className="flex items-start gap-4">
                    <ExternalLink className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-cyan-400 mb-2">Full Evidence Package Available</h3>
                      <p className="text-white/80 leading-relaxed mb-4">
                        Complete forensic evidence package with source documentation, data lineage, transformation logs, 
                        and validation reports available for detailed review. All artifacts maintained with cryptographic 
                        integrity and tamper-evident audit trails.
                      </p>
                      <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                        <FileText className="w-4 h-4 mr-2" />
                        Access Evidence Library
                      </Button>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 border-t border-white/10 bg-slate-950/95 backdrop-blur-xl px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-white/50">
                Event ID: <span className="font-mono text-white/70">{event.id}</span>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-white/20 text-white/80 hover:bg-white/10">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" className="border-white/20 text-white/80 hover:bg-white/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Analysis
                </Button>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                  <Zap className="w-4 h-4 mr-2" />
                  Take Action
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}