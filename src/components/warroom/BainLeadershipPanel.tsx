import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

interface RAPIDDecision {
  decision: string;
  recommend: string[];
  agree: string[];
  perform: string[];
  input: string[];
  decide: string;
  status: "Decided" | "In Progress" | "Blocked";
  dueDate: string;
  impact: "High" | "Medium" | "Low";
}

interface LeadershipPrinciple {
  principle: string;
  description: string;
  currentState: "Excellent" | "Good" | "Needs Improvement";
  actions: string[];
  metrics: string;
}

interface BainLeadershipPanelProps {
  laneId?: string;
  eventData?: any;
}

export function BainLeadershipPanel({ laneId, eventData }: BainLeadershipPanelProps) {
  const rapidDecisions: RAPIDDecision[] = [
    {
      decision: "Claims Processing System Vendor Selection",
      recommend: ["VP Technology", "VP Operations", "External Consultant"],
      agree: ["CFO", "General Counsel", "CISO"],
      perform: ["Implementation Team", "IT Department"],
      input: ["Claims Processors", "Member Services", "Finance Team"],
      decide: "CEO",
      status: "In Progress",
      dueDate: "March 15, 2026",
      impact: "High"
    },
    {
      decision: "PBM Contract Terms Approval",
      recommend: ["Chief Pharmacy Officer", "Benefits Consultant"],
      agree: ["CFO", "General Counsel"],
      perform: ["Procurement", "Legal"],
      input: ["Clinical Team", "Finance", "Member Advocates"],
      decide: "Board of Trustees",
      status: "Decided",
      dueDate: "February 28, 2026",
      impact: "High"
    },
    {
      decision: "War Room Dashboard Feature Prioritization",
      recommend: ["Product Manager", "Analytics Lead"],
      agree: ["CTO"],
      perform: ["Development Team"],
      input: ["Executive Users", "Operations Managers"],
      decide: "Chief Digital Officer",
      status: "In Progress",
      dueDate: "March 10, 2026",
      impact: "Medium"
    },
    {
      decision: "Cost Reduction Target Allocation by Department",
      recommend: ["CFO", "Department Heads"],
      agree: ["CEO", "Board Finance Committee"],
      perform: ["Department Heads", "Finance Controllers"],
      input: ["Operations Teams", "HR"],
      decide: "CEO",
      status: "Blocked",
      dueDate: "March 5, 2026",
      impact: "High"
    }
  ];

  const leadershipPrinciples: LeadershipPrinciple[] = [
    {
      principle: "Results-Oriented Mindset",
      description: "Drive measurable outcomes with clear accountability",
      currentState: "Good",
      actions: [
        "Establish monthly performance reviews with quantified metrics",
        "Implement outcome-based incentive structures",
        "Create real-time dashboards for KPI tracking"
      ],
      metrics: "$8.2M savings target vs. $6.1M achieved YTD (74% of target)"
    },
    {
      principle: "Speed to Decision",
      description: "Accelerate decision-making while maintaining quality",
      currentState: "Needs Improvement",
      actions: [
        "Implement RAPID framework for all strategic decisions",
        "Reduce approval layers from 5 to 3 for operational decisions",
        "Empower front-line managers with decision authority up to $50K"
      ],
      metrics: "Average decision cycle: 23 days (target: 10 days)"
    },
    {
      principle: "Customer-Centric Focus",
      description: "Member needs drive strategy and operations",
      currentState: "Excellent",
      actions: [
        "Maintain quarterly member satisfaction surveys",
        "Continue investment in member experience technology",
        "Expand member advisory council participation"
      ],
      metrics: "Member NPS: 72 (Industry avg: 45)"
    },
    {
      principle: "Data-Driven Insights",
      description: "Leverage analytics for competitive advantage",
      currentState: "Good",
      actions: [
        "Expand predictive analytics capabilities",
        "Train all managers in data interpretation",
        "Implement A/B testing for process improvements"
      ],
      metrics: "85% of decisions backed by analytics (target: 95%)"
    },
    {
      principle: "Organizational Agility",
      description: "Adapt quickly to market and regulatory changes",
      currentState: "Needs Improvement",
      actions: [
        "Create cross-functional rapid response teams",
        "Implement agile methodologies in operations",
        "Build scenario planning capabilities"
      ],
      metrics: "Time to implement regulatory changes: 45 days (target: 30 days)"
    },
    {
      principle: "Talent Development",
      description: "Build capabilities for sustainable growth",
      currentState: "Good",
      actions: [
        "Launch leadership development program",
        "Expand technical training for digital skills",
        "Create clear career progression pathways"
      ],
      metrics: "85% retention of high performers, 72% internal promotion rate"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Decided": return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case "In Progress": return <Clock className="h-4 w-4 text-amber-400" />;
      case "Blocked": return <XCircle className="h-4 w-4 text-rose-400" />;
      default: return <AlertCircle className="h-4 w-4 text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Decided": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "In Progress": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Blocked": return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case "Excellent": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Good": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Needs Improvement": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-rose-400";
      case "Medium": return "text-amber-400";
      case "Low": return "text-blue-400";
      default: return "text-slate-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* RAPID Decision Framework */}
      <Card className="p-6 bg-slate-900/50 border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Users className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">RAPID Decision Framework</h3>
            <p className="text-sm text-slate-400">Bain's methodology for clear accountability</p>
          </div>
        </div>

        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div className="grid grid-cols-5 gap-4 text-sm">
            <div>
              <p className="font-medium text-purple-400 mb-1">R - Recommend</p>
              <p className="text-slate-400 text-xs">Makes proposal</p>
            </div>
            <div>
              <p className="font-medium text-blue-400 mb-1">A - Agree</p>
              <p className="text-slate-400 text-xs">Must approve</p>
            </div>
            <div>
              <p className="font-medium text-emerald-400 mb-1">P - Perform</p>
              <p className="text-slate-400 text-xs">Implements</p>
            </div>
            <div>
              <p className="font-medium text-amber-400 mb-1">I - Input</p>
              <p className="text-slate-400 text-xs">Provides advice</p>
            </div>
            <div>
              <p className="font-medium text-rose-400 mb-1">D - Decide</p>
              <p className="text-slate-400 text-xs">Final call</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {rapidDecisions.map((decision, idx) => (
            <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(decision.status)}
                    <h4 className="font-medium text-slate-200">{decision.decision}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(decision.status)}>{decision.status}</Badge>
                    <span className={`text-sm font-medium ${getImpactColor(decision.impact)}`}>
                      {decision.impact} Impact
                    </span>
                    <span className="text-sm text-slate-400">Due: {decision.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-xs font-medium text-purple-400 mb-2">Recommend</p>
                  <ul className="space-y-1">
                    {decision.recommend.map((person, i) => (
                      <li key={i} className="text-slate-300">{person}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-blue-400 mb-2">Agree</p>
                  <ul className="space-y-1">
                    {decision.agree.map((person, i) => (
                      <li key={i} className="text-slate-300">{person}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-emerald-400 mb-2">Perform</p>
                  <ul className="space-y-1">
                    {decision.perform.map((person, i) => (
                      <li key={i} className="text-slate-300">{person}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-amber-400 mb-2">Input</p>
                  <ul className="space-y-1">
                    {decision.input.map((person, i) => (
                      <li key={i} className="text-slate-300">{person}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-rose-400 mb-2">Decide</p>
                  <p className="text-slate-200 font-medium">{decision.decide}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Leadership Principles */}
      <Card className="p-6 bg-slate-900/50 border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Users className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Bain Leadership Principles</h3>
            <p className="text-sm text-slate-400">Assessment of organizational leadership maturity</p>
          </div>
        </div>

        <div className="space-y-4">
          {leadershipPrinciples.map((principle, idx) => (
            <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-slate-200">{principle.principle}</h4>
                    <Badge className={getStateColor(principle.currentState)}>
                      {principle.currentState}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400">{principle.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-2">Current Metrics</p>
                  <p className="text-sm text-slate-300">{principle.metrics}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-2">Recommended Actions</p>
                  <ul className="space-y-1">
                    {principle.actions.map((action, i) => (
                      <li key={i} className="text-sm text-blue-300 flex items-start gap-2">
                        <span className="text-slate-500 mt-1">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Implementation Roadmap */}
      <Card className="p-6 bg-slate-900/50 border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">90-Day Implementation Plan</h3>
            <p className="text-sm text-slate-400">Bain-recommended quick wins</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <p className="text-emerald-200 font-medium mb-2">Days 1-30: Foundation</p>
            <ul className="text-slate-300 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Implement RAPID framework for top 10 strategic decisions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Launch leadership assessment and 360-degree feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400">✓</span>
                <span>Establish weekly executive decision-making cadence</span>
              </li>
            </ul>
          </div>
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-200 font-medium mb-2">Days 31-60: Acceleration</p>
            <ul className="text-slate-300 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span>Deploy talent development programs for top 50 leaders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span>Implement agile methodologies in 3 pilot departments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">→</span>
                <span>Launch data literacy training for all managers</span>
              </li>
            </ul>
          </div>
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-purple-200 font-medium mb-2">Days 61-90: Scale</p>
            <ul className="text-slate-300 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">◆</span>
                <span>Expand RAPID to all departments and decision types</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">◆</span>
                <span>Measure and report on leadership principle metrics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">◆</span>
                <span>Conduct first performance review under new framework</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}