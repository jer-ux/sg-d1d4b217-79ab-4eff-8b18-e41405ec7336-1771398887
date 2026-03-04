import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, Users, Lightbulb, AlertTriangle } from "lucide-react";

interface McKinsey7S {
  category: "Hard" | "Soft";
  element: string;
  status: "Strong" | "Moderate" | "Needs Attention";
  insights: string[];
  recommendations: string[];
}

interface StrategicImperative {
  priority: "Critical" | "High" | "Medium";
  initiative: string;
  impact: string;
  timeline: string;
  owner: string;
}

interface McKinseyStrategyPanelProps {
  laneId?: string;
  eventData?: any;
}

export function McKinseyStrategyPanel({ laneId, eventData }: McKinseyStrategyPanelProps) {
  const mckinsey7S: McKinsey7S[] = [
    {
      category: "Hard",
      element: "Strategy",
      status: "Strong",
      insights: [
        "Clear cost reduction objectives aligned with EBITDA improvement",
        "Multi-year roadmap for operational excellence",
        "Data-driven decision making framework in place"
      ],
      recommendations: [
        "Formalize strategy review cadence (quarterly)",
        "Establish strategy cascade to all organizational levels"
      ]
    },
    {
      category: "Hard",
      element: "Structure",
      status: "Needs Attention",
      insights: [
        "Siloed operations limiting cross-functional synergies",
        "Decision rights unclear in claims processing",
        "Reporting lines create bottlenecks"
      ],
      recommendations: [
        "Implement matrix structure for strategic initiatives",
        "Create cross-functional excellence centers",
        "Clarify accountability using RACI framework"
      ]
    },
    {
      category: "Hard",
      element: "Systems",
      status: "Moderate",
      insights: [
        "Legacy systems hindering real-time analytics",
        "War Room dashboard improving visibility",
        "Integration gaps between claims and finance"
      ],
      recommendations: [
        "Accelerate cloud migration roadmap",
        "Implement API-first architecture",
        "Deploy real-time data pipelines"
      ]
    },
    {
      category: "Soft",
      element: "Shared Values",
      status: "Strong",
      insights: [
        "Strong commitment to fiduciary responsibility",
        "Member-first culture permeates organization",
        "Transparency valued across leadership"
      ],
      recommendations: [
        "Codify values in decision-making frameworks",
        "Amplify success stories showcasing values"
      ]
    },
    {
      category: "Soft",
      element: "Style",
      status: "Moderate",
      insights: [
        "Leadership accessible but decision-making slow",
        "Consensus-driven approach delays action",
        "Risk aversion limiting innovation"
      ],
      recommendations: [
        "Adopt RAPID framework for faster decisions",
        "Empower front-line decision making",
        "Celebrate intelligent failures in innovation"
      ]
    },
    {
      category: "Soft",
      element: "Staff",
      status: "Moderate",
      insights: [
        "High domain expertise in benefits management",
        "Digital skills gap in analytics and automation",
        "Change management capabilities developing"
      ],
      recommendations: [
        "Launch upskilling program for digital literacy",
        "Hire data science and automation specialists",
        "Build internal change agent network"
      ]
    },
    {
      category: "Soft",
      element: "Skills",
      status: "Needs Attention",
      insights: [
        "Limited advanced analytics capabilities",
        "Process optimization skills underdeveloped",
        "Strategic thinking concentrated at top"
      ],
      recommendations: [
        "Partner with Bain for capability building",
        "Implement rotational programs for skill development",
        "Create centers of excellence for critical skills"
      ]
    }
  ];

  const strategicImperatives: StrategicImperative[] = [
    {
      priority: "Critical",
      initiative: "Claims Processing Transformation",
      impact: "$2.3M annual savings, 40% cycle time reduction",
      timeline: "Q1-Q3 2026",
      owner: "COO"
    },
    {
      priority: "Critical",
      initiative: "PBM Contract Renegotiation",
      impact: "$4.1M guaranteed savings, improved rebate terms",
      timeline: "Q2-Q4 2026",
      owner: "CFO"
    },
    {
      priority: "High",
      initiative: "Member Experience Digitalization",
      impact: "30% reduction in service calls, improved satisfaction",
      timeline: "Q2 2026 - Q1 2027",
      owner: "Chief Digital Officer"
    },
    {
      priority: "High",
      initiative: "Predictive Analytics Implementation",
      impact: "Early intervention in high-cost cases, 15% reduction in outliers",
      timeline: "Q3 2026 - Q2 2027",
      owner: "Chief Analytics Officer"
    },
    {
      priority: "Medium",
      initiative: "Vendor Consolidation Program",
      impact: "$800K administrative savings, simplified operations",
      timeline: "Q4 2026 - Q2 2027",
      owner: "VP Procurement"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Strong": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Moderate": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Needs Attention": return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      case "High": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "Medium": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default: return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* McKinsey 7S Framework Analysis */}
      <Card className="p-6 bg-slate-900/50 border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Target className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">McKinsey 7S Framework</h3>
            <p className="text-sm text-slate-400">Organizational alignment assessment</p>
          </div>
        </div>

        <div className="grid gap-4">
          {/* Hard Elements */}
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <div className="h-1 w-8 bg-blue-500 rounded" />
              Hard Elements
            </h4>
            <div className="grid gap-3">
              {mckinsey7S.filter(s => s.category === "Hard").map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h5 className="font-medium text-slate-200">{item.element}</h5>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-slate-400 mb-1">Current State</p>
                      <ul className="text-sm text-slate-300 space-y-1">
                        {item.insights.map((insight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-500 mt-1">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-2">
                        <Lightbulb className="h-3 w-3" />
                        Recommendations
                      </p>
                      <ul className="text-sm text-blue-300 space-y-1">
                        {item.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-500 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soft Elements */}
          <div>
            <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
              <div className="h-1 w-8 bg-emerald-500 rounded" />
              Soft Elements
            </h4>
            <div className="grid gap-3">
              {mckinsey7S.filter(s => s.category === "Soft").map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h5 className="font-medium text-slate-200">{item.element}</h5>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-slate-400 mb-1">Current State</p>
                      <ul className="text-sm text-slate-300 space-y-1">
                        {item.insights.map((insight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-500 mt-1">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-400 mb-1 flex items-center gap-2">
                        <Lightbulb className="h-3 w-3" />
                        Recommendations
                      </p>
                      <ul className="text-sm text-blue-300 space-y-1">
                        {item.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-slate-500 mt-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Strategic Imperatives */}
      <Card className="p-6 bg-slate-900/50 border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Strategic Imperatives</h3>
            <p className="text-sm text-slate-400">McKinsey-prioritized transformation roadmap</p>
          </div>
        </div>

        <div className="space-y-3">
          {strategicImperatives.map((initiative, idx) => (
            <div key={idx} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <Badge className={getPriorityColor(initiative.priority)}>{initiative.priority}</Badge>
                  <h4 className="font-medium text-slate-200">{initiative.initiative}</h4>
                </div>
                <Users className="h-4 w-4 text-slate-400 flex-shrink-0" />
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs mb-1">Expected Impact</p>
                  <p className="text-slate-200">{initiative.impact}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Timeline</p>
                  <p className="text-slate-200">{initiative.timeline}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-1">Owner</p>
                  <p className="text-slate-200">{initiative.owner}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="p-6 bg-slate-900/50 border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-amber-500/20 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-100">Strategic Insights</h3>
            <p className="text-sm text-slate-400">McKinsey perspective on critical areas</p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-200 font-medium mb-2">Alignment Gap Identified</p>
            <p className="text-slate-300">
              Hard elements (Strategy, Structure, Systems) are misaligned with Soft elements (Style, Staff, Skills). 
              Priority should be given to organizational development and capability building to support strategic objectives.
            </p>
          </div>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <p className="text-emerald-200 font-medium mb-2">Quick Wins Available</p>
            <p className="text-slate-300">
              Claims processing transformation and PBM renegotiation can deliver $6.4M in savings within 12 months. 
              Recommend immediate resource allocation and executive sponsorship.
            </p>
          </div>
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-amber-200 font-medium mb-2">Change Management Critical</p>
            <p className="text-slate-300">
              Current leadership style and staff capabilities may impede transformation velocity. 
              Parallel track of organizational change management essential for success.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}