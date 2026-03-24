import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  DollarSign,
  Users,
  FileText,
  Target,
  Zap,
  Brain,
  ChevronRight,
  Download,
  Share2,
  Settings,
  Bell,
  Search,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Shield,
  Globe,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Eye,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import { SEO } from "@/components/SEO";

interface ExecutiveMetric {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: any;
  color: string;
  target?: string;
}

interface StrategicAlert {
  id: string;
  priority: "critical" | "high" | "medium";
  category: string;
  title: string;
  impact: string;
  recommendation: string;
  timeframe: string;
  confidence: number;
}

interface MarketInsight {
  id: string;
  source: string;
  timestamp: string;
  category: string;
  headline: string;
  impact: "positive" | "negative" | "neutral";
  relevance: number;
  actions: string[];
}

export default function ExecutiveCommandCenter() {
  const [activeView, setActiveView] = useState<"overview" | "strategic" | "operational" | "intelligence">("overview");
  const [timeframe, setTimeframe] = useState<"24h" | "7d" | "30d" | "90d">("30d");

  // Executive KPIs
  const executiveMetrics: ExecutiveMetric[] = [
    {
      label: "Total Value Identified",
      value: "$12.4M",
      change: 28.5,
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      target: "$15M annual"
    },
    {
      label: "Active Opportunities",
      value: "47",
      change: 12.3,
      trend: "up",
      icon: Target,
      color: "text-blue-600",
      target: "50 target"
    },
    {
      label: "Portfolio Health",
      value: "87%",
      change: 5.2,
      trend: "up",
      icon: Activity,
      color: "text-emerald-600",
      target: "90% goal"
    },
    {
      label: "Risk Exposure",
      value: "$2.1M",
      change: -15.7,
      trend: "down",
      icon: Shield,
      color: "text-red-600",
      target: "$1.5M target"
    }
  ];

  // Strategic Alerts
  const strategicAlerts: StrategicAlert[] = [
    {
      id: "1",
      priority: "critical",
      category: "Contract Risk",
      title: "Major PBM Contract Renewal in 30 Days",
      impact: "$3.2M annually at risk",
      recommendation: "Initiate RFP process immediately with 3 alternative vendors",
      timeframe: "Action required within 7 days",
      confidence: 95
    },
    {
      id: "2",
      priority: "high",
      category: "Cost Optimization",
      title: "GLP-1 Drug Spend Trending 45% Above Budget",
      impact: "$1.8M budget variance by year-end",
      recommendation: "Implement step therapy protocol and member education program",
      timeframe: "Q2 implementation critical",
      confidence: 92
    },
    {
      id: "3",
      priority: "high",
      category: "Fraud Detection",
      title: "Systematic Overbilling Pattern Detected",
      impact: "$680K in potential recoveries identified",
      recommendation: "Launch formal audit and vendor negotiation",
      timeframe: "30-day recovery window",
      confidence: 87
    },
    {
      id: "4",
      priority: "medium",
      category: "Market Opportunity",
      title: "Competitor Weaknesses Create Opening",
      impact: "$5M+ market share expansion possible",
      recommendation: "Accelerate product roadmap, target Q3 launch",
      timeframe: "6-month window",
      confidence: 78
    }
  ];

  // Real-Time Market Intelligence
  const marketInsights: MarketInsight[] = [
    {
      id: "1",
      source: "Industry Report",
      timestamp: "2 hours ago",
      category: "PBM Market",
      headline: "Major PBM Merger Announced - Market Consolidation Accelerating",
      impact: "negative",
      relevance: 95,
      actions: ["Review vendor contracts", "Assess negotiation leverage", "Evaluate alternatives"]
    },
    {
      id: "2",
      source: "Regulatory Update",
      timestamp: "5 hours ago",
      category: "Compliance",
      headline: "New Transparency Rules Effective Q3 2026",
      impact: "positive",
      relevance: 88,
      actions: ["Update contract templates", "Train legal team", "Client communication plan"]
    },
    {
      id: "3",
      source: "Market Analysis",
      timestamp: "1 day ago",
      category: "Technology",
      headline: "AI Automation in Benefits Admin Reaches 68% Adoption",
      impact: "neutral",
      relevance: 82,
      actions: ["Competitive analysis", "Product enhancement", "Marketing messaging"]
    }
  ];

  return (
    <>
      <SEO 
        title="Executive Command Center - Strategic Intelligence Dashboard"
        description="Real-time executive dashboard with AI-powered strategic insights, market intelligence, and decision support"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Executive Header */}
        <div className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-xl">
          <div className="max-w-[1800px] mx-auto px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  Executive Command Center
                </h1>
                <p className="text-slate-400 text-sm">
                  Real-time strategic intelligence • AI-powered insights • Last updated: {new Date().toLocaleTimeString()}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Timeframe Selector */}
                <div className="flex bg-slate-900 rounded-lg p-1">
                  {(["24h", "7d", "30d", "90d"] as const).map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setTimeframe(tf)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        timeframe === tf
                          ? "bg-blue-600 text-white"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                </div>

                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>

                <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>

                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Board Report
                </Button>

                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  <Bell className="w-5 h-5" />
                </Button>

                <Button variant="ghost" className="text-slate-400 hover:text-white">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[1800px] mx-auto px-8 py-8">
          {/* Executive KPIs */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {executiveMetrics.map((metric, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-slate-700 transition-all">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      metric.color === "text-green-600" ? "from-green-500/20 to-emerald-500/20" :
                      metric.color === "text-blue-600" ? "from-blue-500/20 to-cyan-500/20" :
                      metric.color === "text-emerald-600" ? "from-emerald-500/20 to-teal-500/20" :
                      "from-red-500/20 to-orange-500/20"
                    } flex items-center justify-center`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>

                    <div className="flex items-center gap-1">
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
                      <p className="text-xs text-slate-500">Target: {metric.target}</p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Strategic Alerts Section */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="col-span-2">
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      Strategic Alerts Requiring Action
                    </h2>
                    <Badge variant="outline" className="border-yellow-500/30 text-yellow-500">
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
                            : alert.priority === "high"
                            ? "border-orange-500/30 bg-orange-500/5"
                            : "border-yellow-500/30 bg-yellow-500/5"
                        } hover:border-opacity-50 transition-all cursor-pointer group`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant="outline" 
                              className={`${
                                alert.priority === "critical"
                                  ? "border-red-500 text-red-500"
                                  : alert.priority === "high"
                                  ? "border-orange-500 text-orange-500"
                                  : "border-yellow-500 text-yellow-500"
                              }`}
                            >
                              {alert.priority.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-slate-500">{alert.category}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-slate-600 text-slate-400">
                              {alert.confidence}% confidence
                            </Badge>
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                          </div>
                        </div>

                        <h3 className="text-white font-semibold mb-2">{alert.title}</h3>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Financial Impact</p>
                            <p className="text-sm font-semibold text-white">{alert.impact}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500 mb-1">Action Timeframe</p>
                            <p className="text-sm font-semibold text-orange-400">{alert.timeframe}</p>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                          <p className="text-xs text-slate-400 mb-1">AI Recommendation:</p>
                          <p className="text-sm text-slate-200">{alert.recommendation}</p>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-xs">
                            <Target className="w-3 h-3 mr-1" />
                            Take Action
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" variant="ghost" className="text-slate-400 text-xs">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Discuss
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Real-Time Intelligence Feed */}
            <div>
              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      Market Intelligence
                    </h2>
                    <Badge variant="outline" className="border-green-500/30 text-green-500 text-xs">
                      <Activity className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {marketInsights.map((insight) => (
                      <div
                        key={insight.id}
                        className="p-4 rounded-lg border border-slate-800 bg-slate-800/30 hover:bg-slate-800/50 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              insight.impact === "positive" 
                                ? "border-green-500/30 text-green-500" 
                                : insight.impact === "negative"
                                ? "border-red-500/30 text-red-500"
                                : "border-slate-500/30 text-slate-500"
                            }`}
                          >
                            {insight.category}
                          </Badge>
                          <span className="text-xs text-slate-500">{insight.timestamp}</span>
                        </div>

                        <h4 className="text-sm font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {insight.headline}
                        </h4>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex-1 bg-slate-700/30 rounded-full h-1.5">
                            <div 
                              className="bg-blue-500 h-full rounded-full" 
                              style={{ width: `${insight.relevance}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-400">{insight.relevance}% relevant</span>
                        </div>

                        <div className="space-y-1">
                          {insight.actions.map((action, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                              <ChevronRight className="w-3 h-3" />
                              <span>{action}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-800"
                  >
                    View All Insights
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* AI Executive Assistant */}
          <Card className="bg-gradient-to-br from-blue-950/50 to-purple-950/50 border-blue-800/30 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Ask Your Executive AI Copilot</h2>
                  <p className="text-sm text-slate-400">Strategic insights powered by Claude 3.5 Sonnet</p>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Ask anything: 'What are our biggest risks?' or 'Should we renew with Current PBM?'"
                  className="w-full px-6 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
                />
                <Button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Ask AI
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
                >
                  Generate Board Report
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
                >
                  Analyze Top 3 Risks
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
                >
                  What Should I Focus On?
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}