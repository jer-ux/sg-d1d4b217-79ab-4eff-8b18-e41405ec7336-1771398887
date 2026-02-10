"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { WarEvent } from "@/lib/warroom/types";
import { formatMoney } from "@/components/warroom/filters";
import { useState } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Clock, Target, Users, DollarSign, Activity, FileText, Zap, Shield, BarChart3, Calendar, MapPin } from "lucide-react";

export default function EvidenceDrawer({
  openEvent,
  onClose,
}: {
  openEvent: WarEvent | null;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "analysis" | "impact" | "actions" | "evidence">("overview");
  const receipts = openEvent?.receipts ?? [];

  if (!openEvent) return null;

  // Mock comprehensive data - in production, this would come from API
  const comprehensiveData = {
    rootCause: {
      primary: "Systematic overpayment due to outdated provider contract rates",
      contributing: [
        "Manual rate verification process with 15-day lag",
        "Legacy pricing database not synced with current contracts",
        "Insufficient validation rules in claims processing system",
      ],
      evidenceStrength: 0.92,
    },
    financialImpact: {
      identified: openEvent.amount,
      projected12Month: openEvent.amount * 4.2,
      atRisk: openEvent.amount * 0.15,
      recoverable: openEvent.amount * 0.78,
      breakdown: [
        { category: "Direct overpayment", amount: openEvent.amount * 0.65, pct: 0.65 },
        { category: "Compound interest", amount: openEvent.amount * 0.13, pct: 0.13 },
        { category: "Operational inefficiency", amount: openEvent.amount * 0.22, pct: 0.22 },
      ],
    },
    timeline: {
      discovered: "2026-01-15",
      validated: "2026-01-22",
      escalated: "2026-01-28",
      projected_resolution: "2026-03-15",
      daysOpen: 26,
      daysToResolution: 45,
    },
    affectedPopulation: {
      claims: 1847,
      members: 423,
      providers: 67,
      geographies: ["Northeast Region", "Mid-Atlantic", "Southeast"],
      departments: ["Operations", "Finance", "Clinical"],
    },
    recommendations: [
      {
        priority: "IMMEDIATE",
        action: "Implement automated rate validation pre-adjudication",
        impact: "Prevent 95% of future occurrences",
        effort: "Medium",
        timeline: "4-6 weeks",
        owner: "IT + Benefits Operations",
      },
      {
        priority: "HIGH",
        action: "Initiate provider contract audit and recovery process",
        impact: formatMoney(openEvent.amount * 0.78),
        effort: "High",
        timeline: "8-12 weeks",
        owner: "Legal + Finance",
      },
      {
        priority: "MEDIUM",
        action: "Establish continuous contract monitoring system",
        impact: "Long-term risk mitigation",
        effort: "Medium",
        timeline: "12 weeks",
        owner: "Benefits Analytics",
      },
    ],
    riskFactors: [
      { factor: "Regulatory exposure", severity: "Medium", description: "Potential ERISA fiduciary breach if not addressed" },
      { factor: "Member impact", severity: "Low", description: "No direct member cost impact, internal cost only" },
      { factor: "Vendor relationship", severity: "High", description: "Provider network stability concerns if recovery pursued aggressively" },
      { factor: "Reputational", severity: "Medium", description: "Board-level scrutiny on financial controls" },
    ],
    historicalContext: {
      similarEvents: 3,
      lastOccurrence: "2024-08-15",
      totalHistoricalLoss: openEvent.amount * 2.8,
      trendDirection: "improving",
    },
    stakeholders: [
      { role: "CFO", interest: "Financial recovery and control improvement", engagement: "High" },
      { role: "Benefits Director", interest: "Operational efficiency and vendor management", engagement: "High" },
      { role: "Legal Counsel", interest: "Regulatory compliance and liability mitigation", engagement: "Medium" },
      { role: "IT Leadership", interest: "System enhancement and automation", engagement: "Medium" },
    ],
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "analysis", label: "Root Cause", icon: Target },
    { id: "impact", label: "Financial Impact", icon: DollarSign },
    { id: "actions", label: "Recommendations", icon: Zap },
    { id: "evidence", label: "Evidence", icon: Shield },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70]">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60"
        />

        {/* Drawer */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="absolute right-0 top-0 h-full w-[800px] max-w-[92vw] k-panel overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-white/10 p-6 z-10">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    openEvent.state === "REALIZED" ? "bg-emerald-500/20 text-emerald-400" :
                    openEvent.state === "APPROVED" ? "bg-cyan-500/20 text-cyan-400" :
                    openEvent.state === "AT_RISK" ? "bg-rose-500/20 text-rose-400" :
                    "bg-amber-500/20 text-amber-400"
                  }`}>
                    {openEvent.state.replace("_", " ")}
                  </div>
                  <div className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-500/20 text-blue-400 capitalize">
                    {openEvent.lane}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{openEvent.title}</h2>
                {openEvent.subtitle && (
                  <p className="text-sm text-white/65">{openEvent.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition text-sm font-medium"
              >
                Close
              </button>
            </div>

            {/* Key Metrics Bar */}
            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs text-white/55 mb-1">Amount</div>
                <div className={`text-lg font-bold ${openEvent.amount < 0 ? "text-rose-400" : "text-emerald-400"}`}>
                  {formatMoney(openEvent.amount)}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs text-white/55 mb-1">Confidence</div>
                <div className="text-lg font-bold text-cyan-400">{(openEvent.confidence * 100).toFixed(0)}%</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs text-white/55 mb-1">Days Open</div>
                <div className="text-lg font-bold text-white/90">{comprehensiveData.timeline.daysOpen}</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs text-white/55 mb-1">Owner</div>
                <div className="text-sm font-semibold text-white/90 truncate">{openEvent.owner || "Unassigned"}</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        : "bg-white/5 text-white/60 hover:text-white/90 border border-white/10"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    {/* Event Details */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-cyan-400" />
                        Event Details
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-white/55 mb-1">Event ID</div>
                          <div className="text-sm text-white/90 font-mono">{openEvent.id}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/55 mb-1">Created</div>
                          <div className="text-sm text-white/90">{comprehensiveData.timeline.discovered}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/55 mb-1">Validated</div>
                          <div className="text-sm text-white/90">{comprehensiveData.timeline.validated}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/55 mb-1">Time Sensitivity</div>
                          <div className="text-sm font-semibold text-amber-400">
                            {(openEvent.timeSensitivity * 100).toFixed(0)}% Critical
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Affected Population */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        Affected Population
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="p-4 rounded-lg bg-black/30 border border-white/5">
                          <div className="text-2xl font-bold text-purple-400 mb-1">
                            {comprehensiveData.affectedPopulation.claims.toLocaleString()}
                          </div>
                          <div className="text-xs text-white/65">Claims Impacted</div>
                        </div>
                        <div className="p-4 rounded-lg bg-black/30 border border-white/5">
                          <div className="text-2xl font-bold text-purple-400 mb-1">
                            {comprehensiveData.affectedPopulation.members.toLocaleString()}
                          </div>
                          <div className="text-xs text-white/65">Members Affected</div>
                        </div>
                        <div className="p-4 rounded-lg bg-black/30 border border-white/5">
                          <div className="text-2xl font-bold text-purple-400 mb-1">
                            {comprehensiveData.affectedPopulation.providers}
                          </div>
                          <div className="text-xs text-white/65">Providers Involved</div>
                        </div>
                        <div className="p-4 rounded-lg bg-black/30 border border-white/5">
                          <div className="text-2xl font-bold text-purple-400 mb-1">
                            {comprehensiveData.affectedPopulation.geographies.length}
                          </div>
                          <div className="text-xs text-white/65">Regions</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs text-white/55 mb-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            Geographies
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {comprehensiveData.affectedPopulation.geographies.map((geo, i) => (
                              <span key={i} className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs">
                                {geo}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Historical Context */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-amber-400" />
                        Historical Context
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                          <span className="text-sm text-white/70">Similar Events (Past 24mo)</span>
                          <span className="text-sm font-semibold text-white/90">{comprehensiveData.historicalContext.similarEvents}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                          <span className="text-sm text-white/70">Last Occurrence</span>
                          <span className="text-sm font-semibold text-white/90">{comprehensiveData.historicalContext.lastOccurrence}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                          <span className="text-sm text-white/70">Total Historical Loss</span>
                          <span className="text-sm font-semibold text-rose-400">{formatMoney(comprehensiveData.historicalContext.totalHistoricalLoss)}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-black/30">
                          <span className="text-sm text-white/70">Trend Direction</span>
                          <div className="flex items-center gap-2">
                            <TrendingDown className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-semibold text-emerald-400 capitalize">
                              {comprehensiveData.historicalContext.trendDirection}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "analysis" && (
                  <div className="space-y-6">
                    {/* Root Cause */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          <Target className="w-5 h-5 text-rose-400" />
                          Primary Root Cause
                        </h3>
                        <div className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                          {(comprehensiveData.rootCause.evidenceStrength * 100).toFixed(0)}% Evidence Strength
                        </div>
                      </div>
                      <p className="text-white/90 text-base leading-relaxed">
                        {comprehensiveData.rootCause.primary}
                      </p>
                    </div>

                    {/* Contributing Factors */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-lg font-bold mb-4">Contributing Factors</h3>
                      <div className="space-y-3">
                        {comprehensiveData.rootCause.contributing.map((factor, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-black/30 border border-white/5">
                            <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {i + 1}
                            </div>
                            <p className="text-sm text-white/80 flex-1">{factor}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risk Factors */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                        Risk Factors
                      </h3>
                      <div className="space-y-3">
                        {comprehensiveData.riskFactors.map((risk, i) => (
                          <div key={i} className="p-4 rounded-lg bg-black/30 border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-white/90">{risk.factor}</span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                risk.severity === "High" ? "bg-rose-500/20 text-rose-400" :
                                risk.severity === "Medium" ? "bg-amber-500/20 text-amber-400" :
                                "bg-blue-500/20 text-blue-400"
                              }`}>
                                {risk.severity}
                              </span>
                            </div>
                            <p className="text-sm text-white/65">{risk.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "impact" && (
                  <div className="space-y-6">
                    {/* Financial Summary */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-500/5 border border-rose-500/20">
                        <div className="text-sm text-white/65 mb-2">Identified Loss</div>
                        <div className="text-3xl font-bold text-rose-400 mb-1">
                          {formatMoney(comprehensiveData.financialImpact.identified)}
                        </div>
                        <div className="text-xs text-white/55">Current Period</div>
                      </div>
                      <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
                        <div className="text-sm text-white/65 mb-2">12-Month Projection</div>
                        <div className="text-3xl font-bold text-amber-400 mb-1">
                          {formatMoney(comprehensiveData.financialImpact.projected12Month)}
                        </div>
                        <div className="text-xs text-white/55">If Unaddressed</div>
                      </div>
                      <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
                        <div className="text-sm text-white/65 mb-2">Recoverable Amount</div>
                        <div className="text-3xl font-bold text-emerald-400 mb-1">
                          {formatMoney(comprehensiveData.financialImpact.recoverable)}
                        </div>
                        <div className="text-xs text-white/55">78% Recovery Rate</div>
                      </div>
                      <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                        <div className="text-sm text-white/65 mb-2">Amount at Risk</div>
                        <div className="text-3xl font-bold text-purple-400 mb-1">
                          {formatMoney(comprehensiveData.financialImpact.atRisk)}
                        </div>
                        <div className="text-xs text-white/55">Urgent Attention</div>
                      </div>
                    </div>

                    {/* Impact Breakdown */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-lg font-bold mb-4">Financial Impact Breakdown</h3>
                      <div className="space-y-3">
                        {comprehensiveData.financialImpact.breakdown.map((item, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-white/80">{item.category}</span>
                              <div className="text-right">
                                <div className="text-sm font-bold text-white/90">{formatMoney(item.amount)}</div>
                                <div className="text-xs text-white/55">{(item.pct * 100).toFixed(0)}%</div>
                              </div>
                            </div>
                            <div className="h-2 rounded-full bg-black/30 overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                                style={{ width: `${item.pct * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-blue-400" />
                        Timeline & Milestones
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-white/90">Discovered</span>
                              <span className="text-sm text-white/65">{comprehensiveData.timeline.discovered}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-3 h-3 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-white/90">Validated</span>
                              <span className="text-sm text-white/65">{comprehensiveData.timeline.validated}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-3 h-3 rounded-full bg-cyan-500 mt-1 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-white/90">Escalated</span>
                              <span className="text-sm text-white/65">{comprehensiveData.timeline.escalated}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="w-3 h-3 rounded-full bg-amber-500 mt-1 flex-shrink-0 animate-pulse" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-white/90">Projected Resolution</span>
                              <span className="text-sm text-white/65">{comprehensiveData.timeline.projected_resolution}</span>
                            </div>
                            <div className="text-xs text-white/55">
                              {comprehensiveData.timeline.daysToResolution} days from now
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "actions" && (
                  <div className="space-y-6">
                    {/* Recommendations */}
                    <div className="space-y-4">
                      {comprehensiveData.recommendations.map((rec, i) => (
                        <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:border-cyan-500/30 transition-colors">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                                rec.priority === "IMMEDIATE" ? "bg-rose-500/20 text-rose-400" :
                                rec.priority === "HIGH" ? "bg-amber-500/20 text-amber-400" :
                                "bg-blue-500/20 text-blue-400"
                              }`}>
                                {i + 1}
                              </div>
                              <div>
                                <div className={`text-xs font-semibold mb-1 ${
                                  rec.priority === "IMMEDIATE" ? "text-rose-400" :
                                  rec.priority === "HIGH" ? "text-amber-400" :
                                  "text-blue-400"
                                }`}>
                                  {rec.priority} PRIORITY
                                </div>
                                <h4 className="text-base font-bold text-white/90">{rec.action}</h4>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                              <div className="text-xs text-white/55 mb-1">Expected Impact</div>
                              <div className="text-sm font-semibold text-emerald-400">{rec.impact}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                              <div className="text-xs text-white/55 mb-1">Timeline</div>
                              <div className="text-sm font-semibold text-white/90">{rec.timeline}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                              <div className="text-xs text-white/55 mb-1">Effort Level</div>
                              <div className="text-sm font-semibold text-white/90">{rec.effort}</div>
                            </div>
                            <div className="p-3 rounded-lg bg-black/30 border border-white/5">
                              <div className="text-xs text-white/55 mb-1">Owner</div>
                              <div className="text-sm font-semibold text-cyan-400">{rec.owner}</div>
                            </div>
                          </div>

                          <button className="w-full px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-medium text-sm">
                            Assign & Track Action
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Stakeholder Engagement */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        Key Stakeholder Engagement
                      </h3>
                      <div className="space-y-3">
                        {comprehensiveData.stakeholders.map((stakeholder, i) => (
                          <div key={i} className="p-4 rounded-lg bg-black/30 border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-white/90">{stakeholder.role}</span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                stakeholder.engagement === "High" ? "bg-emerald-500/20 text-emerald-400" :
                                "bg-amber-500/20 text-amber-400"
                              }`}>
                                {stakeholder.engagement} Engagement
                              </span>
                            </div>
                            <p className="text-sm text-white/65">{stakeholder.interest}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "evidence" && (
                  <div className="space-y-6">
                    {/* Event Metadata */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-lg font-bold mb-4">Event Metadata</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-white/55 mb-1">Event ID</div>
                          <div className="text-sm text-white/90 font-mono text-xs">{openEvent.id}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/55 mb-1">Lane</div>
                          <div className="text-sm text-white/90 capitalize">{openEvent.lane}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/55 mb-1">State</div>
                          <div className="text-sm text-white/90">{openEvent.state.replace("_", " ")}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/55 mb-1">Owner</div>
                          <div className="text-sm text-white/90">{openEvent.owner ?? "Unassigned"}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/55 mb-1">Amount</div>
                          <div className="text-sm font-semibold text-white/90">{formatMoney(openEvent.amount)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/55 mb-1">Confidence</div>
                          <div className="text-sm text-white/90">{(openEvent.confidence * 100).toFixed(0)}%</div>
                        </div>
                      </div>
                    </div>

                    {/* Evidence Receipts */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-400" />
                        Evidence Receipts ({receipts.length})
                      </h3>

                      {receipts.length === 0 ? (
                        <div className="p-6 rounded-lg border border-white/10 bg-white/5 text-center">
                          <CheckCircle2 className="w-12 h-12 text-white/30 mx-auto mb-3" />
                          <p className="text-sm text-white/65 mb-4">
                            No receipts attached yet. Generate evidence from the event actions.
                          </p>
                          <button className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors font-medium text-sm">
                            Generate Receipt
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {receipts.map((r, idx) => (
                            <motion.div
                              key={r.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="rounded-lg border border-white/10 bg-black/30 p-4"
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-white/90 mb-1">{r.title}</div>
                                  <div className="flex items-center gap-2 text-xs text-white/55">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                    Verified Evidence
                                  </div>
                                </div>
                              </div>
                              {r.hash && (
                                <div className="mb-2 p-2 rounded bg-black/50 border border-white/5">
                                  <div className="text-xs text-white/55 mb-1">Content Hash</div>
                                  <div className="text-xs font-mono text-white/80">{r.hash}</div>
                                </div>
                              )}
                              {r.freshness && (
                                <div className="mb-2">
                                  <div className="text-xs text-white/55 mb-1">Data Freshness</div>
                                  <div className="text-xs text-emerald-400">{r.freshness}</div>
                                </div>
                              )}
                              {r.url && (
                                <div className="mb-2">
                                  <div className="text-xs text-white/55 mb-1">Source</div>
                                  <a 
                                    href={r.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-cyan-400 hover:text-cyan-300 transition truncate block"
                                  >
                                    {r.url}
                                  </a>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Decision Notes */}
                    {openEvent.notes && (openEvent.notes.notes || openEvent.notes.attachments?.length) ? (
                      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                        <h3 className="text-lg font-bold mb-4">Decision Notes</h3>
                        
                        {openEvent.notes.notes && (
                          <div className="mb-4 p-4 rounded-lg bg-black/30 border border-white/5">
                            <p className="text-sm text-white/80 whitespace-pre-wrap">{openEvent.notes.notes}</p>
                          </div>
                        )}

                        {openEvent.notes.attachments?.length ? (
                          <>
                            <h4 className="text-sm font-semibold text-white/70 mb-3">
                              Attachments ({openEvent.notes.attachments.length})
                            </h4>
                            <div className="space-y-2">
                              {openEvent.notes.attachments.map((att) => (
                                <div key={att.id} className="p-3 rounded-lg bg-black/30 border border-white/5">
                                  <div className="text-sm font-medium text-white/90 mb-1">{att.title}</div>
                                  <a 
                                    href={att.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-cyan-400 hover:text-cyan-300 transition truncate block mb-1"
                                  >
                                    {att.url}
                                  </a>
                                  {att.hash && (
                                    <div className="text-xs text-white/50 font-mono mt-2">Hash: {att.hash}</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-black/95 backdrop-blur-sm border-t border-white/10 p-6">
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:from-cyan-500 hover:to-blue-500 transition flex items-center justify-center gap-2"
                onClick={() => {
                  window.open(`/api/war-room/packet/${openEvent.id}`, "_blank");
                }}
              >
                <FileText className="w-4 h-4" />
                Download Action Packet (PDF)
              </button>
              <button
                type="button"
                className="px-4 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 transition font-medium"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(openEvent, null, 2));
                }}
              >
                Copy JSON
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}