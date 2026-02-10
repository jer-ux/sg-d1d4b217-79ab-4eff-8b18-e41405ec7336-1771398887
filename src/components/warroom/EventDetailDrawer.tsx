"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useMemo } from "react";
import { X, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock, DollarSign, Users, Target, FileText, BarChart3, Zap, Shield, Activity, Calendar, ArrowRight, ExternalLink, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import type { WarEvent } from "@/lib/warroom/types";
// We'll generate data on the fly if not found, or use a mock lookup
import { generateDemoData } from "@/lib/warroom/detail";

type EventDetailDrawerProps = {
  eventId: string | null;
  open: boolean;
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

// Helper to get analysis data for a specific event
function useEventAnalysis(event: WarEvent | undefined) {
  return useMemo(() => {
    if (!event) return null;
    
    // In a real app, this would come from the API or separate store
    // For now, we generate consistent demo data based on the event ID
    const baseAmount = Math.abs(event.amount);
    
    return {
      rootCause: {
        primary: "Systematic pricing discrepancies detected through multi-carrier rate file analysis revealing 12-18% overcharges on specialty pharmacy claims due to contract rate table misalignment",
        contributing: [
          "Legacy claims system lacking real-time pricing validation against current contract rates",
          "Insufficient clinical review staffing during Q4 enrollment surge periods",
          "Vendor performance SLA gaps allowing processing delays that compound financial exposure"
        ],
        timeline: [
          { date: "2024-01-15", event: "Initial anomaly detected", impact: "Alert generated" },
          { date: "2024-01-18", event: "Pattern analysis completed", impact: "Escalated to L2" },
          { date: "2024-01-25", event: "Root cause identified", impact: "Financial impact quantified" }
        ],
        dataQuality: {
          completeness: 0.94,
          accuracy: 0.89,
          timeliness: 0.92,
          sources: 4
        }
      },
      financialImpact: {
        immediate: baseAmount * 0.2,
        monthly: baseAmount * 0.1,
        quarterly: baseAmount * 0.3,
        annualized: baseAmount * 1.2,
        netPresentValue: baseAmount * 0.9,
        roi: 3.2,
        paybackPeriods: 4
      },
      riskProfile: {
        probabilityOfSuccess: event.confidence,
        implementationRisk: "Low",
        regulatoryRisk: "Low",
        operationalImpact: "Moderate",
        reputationalRisk: "Minimal",
        mitigationStrategies: [
          "Implement enhanced pre-payment edits in claims processing system",
          "Establish weekly executive steering committee reviews",
          "Deploy automated monitoring dashboards"
        ]
      },
      recommendations: {
        immediate: [
          "Schedule kickoff meeting with implementation team within 48 hours",
          "Finalize evidence package and obtain executive sponsor sign-off",
          "Initiate vendor negotiations"
        ],
        shortTerm: [
          "Complete detailed process mapping and gap analysis",
          "Implement quick-win improvements",
          "Deploy enhanced monitoring"
        ],
        longTerm: [
          "Design and implement enterprise-wide process transformation",
          "Build predictive analytics capabilities",
          "Establish center of excellence"
        ],
        resources: [
          { role: "Project Manager", fte: 1.0, duration: "12 weeks", cost: 45000 },
          { role: "Business Analyst", fte: 2.0, duration: "8 weeks", cost: 56000 }
        ],
        timeline: [
          { phase: "Planning", duration: "Weeks 1-3", milestones: ["Requirements gathering", "Design approval"] },
          { phase: "Execution", duration: "Weeks 4-8", milestones: ["System changes", "UAT"] },
          { phase: "Rollout", duration: "Weeks 9-12", milestones: ["Pilot", "Full production"] }
        ]
      },
      benchmarking: {
        industryAverage: baseAmount * 0.8,
        topQuartile: baseAmount * 1.3,
        peerComparison: "Top Decile",
        marketTrend: "Increasing Opportunity",
        competitiveAdvantage: [
          "Top quartile performers achieving 15% better outcomes",
          "Peer organizations investing in automation"
        ]
      },
      stakeholders: [
        { name: event.owner || "Executive Sponsor", role: "Sponsor", involvement: "Oversight", commitment: "2h/week" },
        { name: "Sarah Chen", role: "Program Mgr", involvement: "Execution", commitment: "Full-time" },
        { name: "Mike Rodriguez", role: "Finance", involvement: "Validation", commitment: "10h/week" }
      ],
      evidence: {
        primarySources: 3,
        documentCount: 12,
        dataPoints: 15420,
        lastUpdated: new Date().toISOString(),
        verificationStatus: event.confidence > 0.8 ? "Validated" : "Under Review",
        auditTrail: [
          { timestamp: "2024-02-01 09:00", action: "Event Created", user: "System", outcome: "Created" },
          { timestamp: "2024-02-01 14:30", action: "Analysis Complete", user: "Analyst", outcome: "Verified" }
        ]
      }
    };
  }, [event]);
}

export function EventDetailDrawer({
  eventId,
  onClose,
  open,
}: EventDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState("overview");

  // Lookup event data
  const { events } = generateDemoData();
  const event = useMemo(() => {
      if (!eventId) return null;
      return events.find(e => e.id === eventId) as WarEvent | undefined;
  }, [eventId, events]);

  const analysis = useEventAnalysis(event);
  
  if (!open || !event || !analysis) return null;

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
          className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex-shrink-0 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl px-8 py-6">
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
          <div className="flex-1 overflow-y-auto px-8 py-6">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
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
                            <div className="text-sm font-semibold text-emerald-400">{formatPercent(receipt.confidence || 0.9)}</div>
                            <div className="text-xs text-white/50">Confidence</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </TabsContent>

              {/* Other tabs content (Financial, Root Cause, etc.) ... reusing similar structure */}
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
                    </div>
                  </div>
                </Card>
              </TabsContent>

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
              </TabsContent>

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
              </TabsContent>

               <TabsContent value="risk" className="space-y-6 mt-0">
                 <Card className="p-6 bg-white/5 border-white/10">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-400" />
                    Risk Assessment Profile
                  </h3>
                   <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
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
                    </div>
                   </div>
                 </Card>
               </TabsContent>

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
                      <div className="text-3xl font-bold text-emerald-400 mb-1">{analysis.evidence.dataPoints.toLocaleString()}</div>
                      <div className="text-xs text-white/50">Data Points</div>
                    </div>
                  </div>
                </Card>
               </TabsContent>

            </Tabs>
          </div>

          {/* Footer Actions */}
          <div className="flex-shrink-0 sticky bottom-0 border-t border-white/10 bg-slate-950/95 backdrop-blur-xl px-8 py-4">
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