import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  Users,
  FileText,
  Clock,
  Eye
} from "lucide-react";

interface ExecutiveMetric {
  id: string;
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  target?: string;
  status: "on-track" | "at-risk" | "critical";
  icon: any;
  color: string;
}

interface StrategicAlert {
  id: string;
  priority: "critical" | "high" | "medium";
  category: string;
  title: string;
  impact: string;
  actionRequired: string;
  deadline: string;
  confidence: number;
}

export function ExecutiveDashboard() {
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "90d">("30d");

  const metrics: ExecutiveMetric[] = [
    {
      id: "1",
      label: "Total Value Created",
      value: "$12.4M",
      change: 28.5,
      trend: "up",
      target: "$15M",
      status: "on-track",
      icon: DollarSign,
      color: "emerald"
    },
    {
      id: "2",
      label: "Active Opportunities",
      value: "47",
      change: 12.3,
      trend: "up",
      target: "50",
      status: "on-track",
      icon: Target,
      color: "blue"
    },
    {
      id: "3",
      label: "Portfolio Health",
      value: "87%",
      change: 5.2,
      trend: "up",
      target: "90%",
      status: "on-track",
      icon: Activity,
      color: "green"
    },
    {
      id: "4",
      label: "Risk Exposure",
      value: "$2.1M",
      change: -15.7,
      trend: "down",
      target: "$1.5M",
      status: "at-risk",
      icon: Shield,
      color: "amber"
    }
  ];

  const strategicAlerts: StrategicAlert[] = [
    {
      id: "1",
      priority: "critical",
      category: "Contract Risk",
      title: "Major PBM Contract Renewal - 30 Days",
      impact: "$3.2M annually at risk",
      actionRequired: "Initiate RFP process with 3 alternative vendors",
      deadline: "7 days",
      confidence: 95
    },
    {
      id: "2",
      priority: "high",
      category: "Cost Optimization",
      title: "GLP-1 Drug Spend Trending 45% Over Budget",
      impact: "$1.8M variance by year-end",
      actionRequired: "Implement step therapy + member education",
      deadline: "Q2 implementation",
      confidence: 92
    },
    {
      id: "3",
      priority: "high",
      category: "Fraud Detection",
      title: "Systematic Overbilling Pattern Detected",
      impact: "$680K potential recovery",
      actionRequired: "Launch audit + vendor negotiation",
      deadline: "30-day recovery window",
      confidence: 87
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.id} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/20 flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 text-${metric.color}-500`} />
                </div>

                <div className="flex items-center gap-2">
                  {metric.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold ${
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {Math.abs(metric.change)}%
                  </span>
                </div>
              </div>

              <div>
                <p className="text-slate-400 text-sm mb-1">{metric.label}</p>
                <p className="text-3xl font-bold text-white mb-2">{metric.value}</p>
                
                {metric.target && (
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500">Target: {metric.target}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        metric.status === "on-track" 
                          ? "border-green-500/30 text-green-500" 
                          : metric.status === "at-risk"
                          ? "border-amber-500/30 text-amber-500"
                          : "border-red-500/30 text-red-500"
                      }`}
                    >
                      {metric.status === "on-track" ? "On Track" : metric.status === "at-risk" ? "At Risk" : "Critical"}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Strategic Alerts */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Strategic Alerts Requiring Executive Action
            </h2>
            <Badge variant="outline" className="border-red-500/30 text-red-500">
              {strategicAlerts.filter(a => a.priority === "critical").length} Critical
            </Badge>
          </div>

          <div className="space-y-4">
            {strategicAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-5 rounded-xl border-2 ${
                  alert.priority === "critical"
                    ? "border-red-500/30 bg-red-500/5"
                    : "border-orange-500/30 bg-orange-500/5"
                } hover:border-opacity-50 transition-all cursor-pointer group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline"
                      className={`${
                        alert.priority === "critical"
                          ? "border-red-500 text-red-500"
                          : "border-orange-500 text-orange-500"
                      }`}
                    >
                      {alert.priority.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-slate-500">{alert.category}</span>
                  </div>
                  
                  <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                    {alert.confidence}% confidence
                  </Badge>
                </div>

                <h3 className="text-white font-semibold mb-3">{alert.title}</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Financial Impact</p>
                    <p className="text-sm font-semibold text-white">{alert.impact}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Action Deadline</p>
                    <p className="text-sm font-semibold text-orange-400">{alert.deadline}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 mb-3">
                  <p className="text-xs text-slate-400 mb-1">AI Recommendation:</p>
                  <p className="text-sm text-slate-200">{alert.actionRequired}</p>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                    <Target className="w-3 h-3 mr-1" />
                    Take Action
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}