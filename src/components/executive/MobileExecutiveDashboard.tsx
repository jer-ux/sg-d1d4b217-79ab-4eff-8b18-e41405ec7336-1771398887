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
  ChevronRight,
  Bell,
  Settings,
  Menu,
  X,
  Search,
  Filter,
  Share2,
  Download,
  Zap,
  Eye,
  ArrowUpRight
} from "lucide-react";

interface MobileMetric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: any;
  color: string;
}

interface QuickAction {
  id: string;
  label: string;
  icon: any;
  color: string;
  action: string;
}

export function MobileExecutiveDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedView, setSelectedView] = useState<"overview" | "alerts" | "insights">("overview");

  const metrics: MobileMetric[] = [
    {
      label: "Total Value",
      value: "$12.4M",
      change: 28.5,
      trend: "up",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      label: "Active Items",
      value: "47",
      change: 12.3,
      trend: "up",
      icon: Target,
      color: "text-blue-500"
    },
    {
      label: "Health Score",
      value: "87%",
      change: 5.2,
      trend: "up",
      icon: Activity,
      color: "text-emerald-500"
    },
    {
      label: "Risk Exposure",
      value: "$2.1M",
      change: -15.7,
      trend: "down",
      icon: Shield,
      color: "text-orange-500"
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: "1",
      label: "Generate Report",
      icon: Download,
      color: "bg-blue-500",
      action: "generate-report"
    },
    {
      id: "2",
      label: "View Alerts",
      icon: AlertTriangle,
      color: "bg-red-500",
      action: "view-alerts"
    },
    {
      id: "3",
      label: "Ask AI",
      icon: Zap,
      color: "bg-purple-500",
      action: "ask-ai"
    },
    {
      id: "4",
      label: "Share",
      icon: Share2,
      color: "bg-green-500",
      action: "share"
    }
  ];

  const criticalAlerts = [
    {
      id: "1",
      title: "PBM Contract Renewal - 30 Days",
      impact: "$3.2M annually at risk",
      priority: "critical" as const
    },
    {
      id: "2",
      title: "GLP-1 Drug Spend Over Budget",
      impact: "$1.8M variance",
      priority: "high" as const
    },
    {
      id: "3",
      title: "Fraud Pattern Detected",
      impact: "$680K potential recovery",
      priority: "high" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pb-20">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>

            <h1 className="text-lg font-bold text-white">Executive Hub</h1>

            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-white" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  3
                </Badge>
              </button>
              <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar">
            {(["overview", "alerts", "insights"] as const).map((view) => (
              <button
                key={view}
                onClick={() => setSelectedView(view)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  selectedView === view
                    ? "bg-blue-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Side Menu Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="w-72 h-full bg-slate-900 border-r border-slate-800 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-white mb-6">Menu</h2>
            
            <div className="space-y-2">
              {[
                { label: "Command Center", icon: Activity },
                { label: "Analytics", icon: TrendingUp },
                { label: "Reports", icon: Download },
                { label: "Settings", icon: Settings }
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-slate-400" />
                  <span className="text-white">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                    metric.color === "text-green-500" ? "from-green-500/20 to-emerald-500/20" :
                    metric.color === "text-blue-500" ? "from-blue-500/20 to-cyan-500/20" :
                    metric.color === "text-emerald-500" ? "from-emerald-500/20 to-teal-500/20" :
                    "from-orange-500/20 to-red-500/20"
                  } flex items-center justify-center`}>
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>

                  <div className="flex items-center gap-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={`text-xs font-semibold ${
                      metric.trend === "up" ? "text-green-500" : "text-red-500"
                    }`}>
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 text-xs mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-white">{metric.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-all"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-white text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Critical Alerts */}
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Critical Alerts</h3>
              <Badge variant="outline" className="border-red-500/30 text-red-500 text-xs">
                {criticalAlerts.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {criticalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${
                    alert.priority === "critical"
                      ? "border-red-500/30 bg-red-500/5"
                      : "border-orange-500/30 bg-orange-500/5"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        alert.priority === "critical"
                          ? "border-red-500 text-red-500"
                          : "border-orange-500 text-orange-500"
                      }`}
                    >
                      {alert.priority.toUpperCase()}
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </div>

                  <h4 className="text-sm font-semibold text-white mb-1">{alert.title}</h4>
                  <p className="text-xs text-slate-400">{alert.impact}</p>

                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs h-8">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-slate-700 text-slate-300 text-xs h-8">
                      <Zap className="w-3 h-3 mr-1" />
                      Act
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              View All Alerts
              <ArrowUpRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>

        {/* AI Assistant Quick Access */}
        <Card className="bg-gradient-to-br from-blue-950/50 to-purple-950/50 border-blue-800/30 backdrop-blur-sm">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">AI Copilot</h3>
                <p className="text-xs text-slate-400">Ask anything</p>
              </div>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="What should I focus on today?"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <Button
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 h-8"
              >
                <Search className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}