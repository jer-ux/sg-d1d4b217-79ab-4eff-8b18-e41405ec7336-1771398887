import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, TrendingUp, Users, Calendar, 
  Lightbulb, CheckCircle, AlertTriangle, 
  DollarSign, Zap, Shield, Activity,
  Brain, FileText, Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

type Scenario = {
  id: string;
  name: string;
  description: string;
  impact: number;
  probability: number;
  timeframe: string;
  investment: number;
  expectedReturn: number;
  risks: string[];
  dependencies: string[];
};

type Initiative = {
  id: string;
  name: string;
  owner: string;
  status: "planning" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  targetDate: string;
  progress: number;
  kpis: Array<{ metric: string; target: string; current: string }>;
};

export function StrategySessionMode() {
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  
  const scenarios: Scenario[] = [
    {
      id: "aggressive-growth",
      name: "Aggressive Market Expansion",
      description: "Double down on agentic automation and evidence-backed approach to capture 25% market share",
      impact: 8.5,
      probability: 0.65,
      timeframe: "18-24 months",
      investment: 2400000,
      expectedReturn: 12800000,
      risks: [
        "Competitive response from established players",
        "Technology adoption curve slower than expected",
        "Regulatory changes impacting automation"
      ],
      dependencies: [
        "Successful completion of AI agent platform",
        "Evidence library reaching critical mass",
        "Series A funding secured"
      ]
    },
    {
      id: "partnership-model",
      name: "Strategic Partnership Strategy",
      description: "Partner with Big 4 consulting firms and major TPAs to distribute platform",
      impact: 7.2,
      probability: 0.78,
      timeframe: "12-18 months",
      investment: 1200000,
      expectedReturn: 8600000,
      risks: [
        "Partner channel conflicts",
        "Margin compression from revenue sharing",
        "Loss of direct client relationships"
      ],
      dependencies: [
        "White-label version of War Room",
        "Partner success program established",
        "Legal framework for partnerships"
      ]
    },
    {
      id: "vertical-integration",
      name: "Vertical Integration Play",
      description: "Acquire or build complementary services (TPA, PBM consulting) for full-stack solution",
      impact: 9.1,
      probability: 0.42,
      timeframe: "24-36 months",
      investment: 8500000,
      expectedReturn: 28000000,
      risks: [
        "Integration complexity and execution risk",
        "Regulatory hurdles for combined entity",
        "Cultural integration challenges"
      ],
      dependencies: [
        "Series B funding ($15M+)",
        "Experienced M&A team",
        "Proven platform scalability"
      ]
    },
    {
      id: "platform-ecosystem",
      name: "Platform Ecosystem Model",
      description: "Build marketplace connecting data sources, AI agents, and compliance tools",
      impact: 8.8,
      probability: 0.71,
      timeframe: "18-30 months",
      investment: 3200000,
      expectedReturn: 16400000,
      risks: [
        "Platform network effects take time",
        "Quality control of third-party integrations",
        "Revenue model uncertainty"
      ],
      dependencies: [
        "API infrastructure maturity",
        "Developer relations program",
        "Marketplace governance model"
      ]
    }
  ];

  const initiatives: Initiative[] = [
    {
      id: "ai-agent-platform",
      name: "Agentic Automation Platform v2.0",
      owner: "Engineering",
      status: "in-progress",
      priority: "high",
      targetDate: "Q3 2026",
      progress: 67,
      kpis: [
        { metric: "Agent Reliability", target: "99.5%", current: "97.8%" },
        { metric: "Tasks Automated", target: "2000/mo", current: "847/mo" },
        { metric: "Cost Reduction", target: "40%", current: "28%" }
      ]
    },
    {
      id: "evidence-library",
      name: "Evidence Library Scale-Up",
      owner: "Product",
      status: "in-progress",
      priority: "high",
      targetDate: "Q2 2026",
      progress: 82,
      kpis: [
        { metric: "Verified Receipts", target: "10K", current: "2.8K" },
        { metric: "Compliance Coverage", target: "100%", current: "94%" },
        { metric: "Retrieval Speed", target: "<100ms", current: "150ms" }
      ]
    },
    {
      id: "partnership-program",
      name: "Strategic Partnership Program",
      owner: "Business Development",
      status: "planning",
      priority: "medium",
      targetDate: "Q4 2026",
      progress: 23,
      kpis: [
        { metric: "Partners Signed", target: "5", current: "1" },
        { metric: "Channel Revenue", target: "$2M", current: "$0" },
        { metric: "Partner NPS", target: "50+", current: "N/A" }
      ]
    },
    {
      id: "series-a",
      name: "Series A Fundraising",
      owner: "CEO/CFO",
      status: "planning",
      priority: "high",
      targetDate: "Q3 2026",
      progress: 34,
      kpis: [
        { metric: "Target Raise", target: "$15M", current: "$0" },
        { metric: "Valuation", target: "$75M", current: "TBD" },
        { metric: "Investors Met", target: "30", current: "12" }
      ]
    }
  ];

  const getScenarioColor = (score: number) => {
    if (score >= 8) return "from-green-500 to-emerald-500";
    if (score >= 6) return "from-yellow-500 to-amber-500";
    return "from-red-500 to-orange-500";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 border-green-500/30 text-green-300";
      case "in-progress": return "bg-blue-500/20 border-blue-500/30 text-blue-300";
      default: return "bg-gray-500/20 border-gray-500/30 text-gray-300";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500/20 border-red-500/30 text-red-300";
      case "medium": return "bg-yellow-500/20 border-yellow-500/30 text-yellow-300";
      default: return "bg-gray-500/20 border-gray-500/30 text-gray-300";
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-white/5 backdrop-blur-xl border-purple-500/20 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Strategy Session Mode
            </h3>
            <p className="text-white/60">
              Quarterly planning workspace with scenario modeling and strategic initiative tracking
            </p>
          </div>
          <Badge className="bg-purple-500/20 border-purple-500/30 text-purple-300 px-4 py-2">
            <Calendar className="w-4 h-4 mr-2" />
            Q2 2026 Planning
          </Badge>
        </div>

        <Tabs defaultValue="scenarios" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/5">
            <TabsTrigger value="scenarios" className="data-[state=active]:bg-purple-500/20">
              <Lightbulb className="w-4 h-4 mr-2" />
              Scenario Planning
            </TabsTrigger>
            <TabsTrigger value="initiatives" className="data-[state=active]:bg-purple-500/20">
              <Target className="w-4 h-4 mr-2" />
              Strategic Initiatives
            </TabsTrigger>
            <TabsTrigger value="alignment" className="data-[state=active]:bg-purple-500/20">
              <Activity className="w-4 h-4 mr-2" />
              Framework Alignment
            </TabsTrigger>
          </TabsList>

          {/* Scenario Planning Tab */}
          <TabsContent value="scenarios" className="space-y-6 mt-6">
            <div className="grid gap-6">
              {scenarios.map((scenario, idx) => {
                const expectedScore = scenario.impact * scenario.probability;
                const roi = ((scenario.expectedReturn - scenario.investment) / scenario.investment) * 100;

                return (
                  <motion.div
                    key={scenario.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card 
                      className={`p-6 cursor-pointer transition-all ${
                        activeScenario === scenario.id
                          ? "bg-purple-500/10 border-purple-500/40"
                          : "bg-white/5 border-white/20 hover:border-purple-500/30"
                      }`}
                      onClick={() => setActiveScenario(
                        activeScenario === scenario.id ? null : scenario.id
                      )}
                    >
                      <div className="flex items-start gap-6">
                        {/* Score Circle */}
                        <div className={`flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br ${getScenarioColor(expectedScore)} flex items-center justify-center border-2 border-white/20`}>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                              {expectedScore.toFixed(1)}
                            </div>
                            <div className="text-[10px] text-white/60">SCORE</div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <h4 className="text-xl font-bold mb-2 text-white">{scenario.name}</h4>
                          <p className="text-sm text-white/60 mb-4">{scenario.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-white/40 mb-1">Impact Potential</div>
                              <div className="text-lg font-bold text-white">{scenario.impact}/10</div>
                            </div>
                            <div>
                              <div className="text-xs text-white/40 mb-1">Success Probability</div>
                              <div className="text-lg font-bold text-white">{(scenario.probability * 100).toFixed(0)}%</div>
                            </div>
                            <div>
                              <div className="text-xs text-white/40 mb-1">Expected ROI</div>
                              <div className="text-lg font-bold text-green-400">{roi.toFixed(0)}%</div>
                            </div>
                            <div>
                              <div className="text-xs text-white/40 mb-1">Timeframe</div>
                              <div className="text-lg font-bold text-white">{scenario.timeframe}</div>
                            </div>
                          </div>

                          {activeScenario === scenario.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-6 pt-6 border-t border-white/10"
                            >
                              <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                    <h5 className="font-semibold text-white">Key Risks</h5>
                                  </div>
                                  <ul className="space-y-2">
                                    {scenario.risks.map((risk, i) => (
                                      <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                                        <span className="text-red-400 mt-1">•</span>
                                        <span>{risk}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <h5 className="font-semibold text-white">Dependencies</h5>
                                  </div>
                                  <ul className="space-y-2">
                                    {scenario.dependencies.map((dep, i) => (
                                      <li key={i} className="text-sm text-white/60 flex items-start gap-2">
                                        <span className="text-green-400 mt-1">•</span>
                                        <span>{dep}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="mt-6 flex gap-3">
                                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white">
                                  <Sparkles className="w-4 h-4 mr-2" />
                                  Run Detailed Simulation
                                </Button>
                                <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                                  <FileText className="w-4 h-4 mr-2" />
                                  Export Scenario Brief
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          {/* Strategic Initiatives Tab */}
          <TabsContent value="initiatives" className="space-y-6 mt-6">
            <div className="grid gap-4">
              {initiatives.map((initiative, idx) => (
                <motion.div
                  key={initiative.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 bg-white/5 border-white/20">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-white">{initiative.name}</h4>
                          <Badge className={getStatusColor(initiative.status)}>
                            {initiative.status}
                          </Badge>
                          <Badge className={getPriorityColor(initiative.priority)}>
                            {initiative.priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-white/50">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {initiative.owner}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Target: {initiative.targetDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-purple-400 mb-1">
                          {initiative.progress}%
                        </div>
                        <div className="text-xs text-white/40">Complete</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${initiative.progress}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        />
                      </div>
                    </div>

                    {/* KPIs */}
                    <div className="grid grid-cols-3 gap-4">
                      {initiative.kpis.map((kpi, i) => (
                        <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">
                          <div className="text-xs text-white/40 mb-1">{kpi.metric}</div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-bold text-white">{kpi.current}</span>
                            <span className="text-xs text-white/40">/ {kpi.target}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Framework Alignment Tab */}
          <TabsContent value="alignment" className="space-y-6 mt-6">
            <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-6 h-6 text-blue-400" />
                <h4 className="text-xl font-bold text-white">Strategic Framework Alignment</h4>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-blue-300 mb-3">McKinsey 7S Alignment</h5>
                  <div className="space-y-2">
                    {[
                      { element: "Strategy", score: 85 },
                      { element: "Structure", score: 72 },
                      { element: "Systems", score: 91 },
                      { element: "Skills", score: 78 },
                      { element: "Staff", score: 68 },
                      { element: "Style", score: 82 },
                      { element: "Shared Values", score: 88 }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-white/60">{item.element}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${item.score}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-white w-10 text-right">{item.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-purple-300 mb-3">Bain RAPID Clarity</h5>
                  <div className="space-y-2">
                    {[
                      { role: "Recommend", clarity: 92 },
                      { role: "Agree", clarity: 78 },
                      { role: "Perform", clarity: 85 },
                      { role: "Input", clarity: 71 },
                      { role: "Decide", clarity: 88 }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-white/60">{item.role}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                              style={{ width: `${item.clarity}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-white w-10 text-right">{item.clarity}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white mb-1">Strategic Alignment Insight</div>
                    <p className="text-sm text-white/60">
                      Overall strategic alignment is strong at 82%. Focus areas for Q2: strengthen Staff capabilities 
                      (hiring plan) and clarify Input roles in RAPID framework (stakeholder map needed).
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}