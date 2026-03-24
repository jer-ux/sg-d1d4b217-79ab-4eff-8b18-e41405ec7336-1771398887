/**
 * McKinsey Strategic Framework Dashboard
 * Enterprise-level strategic analysis using McKinsey methodologies
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Target, 
  Users, 
  Lightbulb, 
  Award,
  ArrowRight,
  Download,
  Eye,
  AlertCircle,
  CheckCircle2,
  Layers
} from "lucide-react";
import { useState } from "react";

interface SevenSElement {
  name: string;
  score: number;
  status: "strong" | "moderate" | "weak";
  insights: string[];
  recommendations: string[];
}

interface ThreeHorizon {
  horizon: number;
  name: string;
  focus: string;
  initiatives: Initiative[];
  investment: number;
  expectedReturn: number;
  timeframe: string;
}

interface Initiative {
  name: string;
  status: "on-track" | "at-risk" | "delayed";
  progress: number;
  owner: string;
  impact: "high" | "medium" | "low";
}

export function McKinseyStrategicFramework() {
  const [selectedHorizon, setSelectedHorizon] = useState<number | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  // McKinsey 7S Framework Data
  const sevenS: SevenSElement[] = [
    {
      name: "Strategy",
      score: 85,
      status: "strong",
      insights: [
        "Clear market differentiation with AI-powered analytics",
        "Strong focus on enterprise healthcare segment",
        "Competitive moat through proprietary algorithms"
      ],
      recommendations: [
        "Expand into adjacent markets (financial services, legal)",
        "Develop strategic partnerships with top-tier consultancies",
        "Invest in thought leadership and industry positioning"
      ]
    },
    {
      name: "Structure",
      score: 78,
      status: "strong",
      insights: [
        "Lean organizational design optimized for agility",
        "Clear reporting lines and accountability",
        "Strong cross-functional collaboration"
      ],
      recommendations: [
        "Establish dedicated enterprise sales division",
        "Create strategic partnerships team",
        "Build out customer success organization"
      ]
    },
    {
      name: "Systems",
      score: 92,
      status: "strong",
      insights: [
        "Advanced analytics platform with real-time processing",
        "Scalable cloud infrastructure on Vercel/Supabase",
        "Automated reporting and alerting systems"
      ],
      recommendations: [
        "Implement advanced ML/AI capabilities",
        "Enhance data integration with enterprise systems",
        "Build predictive analytics engine"
      ]
    },
    {
      name: "Shared Values",
      score: 88,
      status: "strong",
      insights: [
        "Strong commitment to transparency and fiduciary duty",
        "Customer-centric innovation culture",
        "Evidence-based decision making"
      ],
      recommendations: [
        "Codify values into company operating principles",
        "Establish ethics and governance committee",
        "Launch internal culture initiatives"
      ]
    },
    {
      name: "Style",
      score: 72,
      status: "moderate",
      insights: [
        "Entrepreneurial and innovative leadership approach",
        "Data-driven decision making culture",
        "Fast-paced execution mindset"
      ],
      recommendations: [
        "Develop leadership training programs",
        "Establish mentorship framework",
        "Create executive communication playbook"
      ]
    },
    {
      name: "Staff",
      score: 68,
      status: "moderate",
      insights: [
        "Strong technical talent with deep domain expertise",
        "Growing team with high retention",
        "Need for strategic hires in key areas"
      ],
      recommendations: [
        "Recruit enterprise sales leadership from McKinsey/Bain",
        "Build strategic partnerships team",
        "Hire VP of Customer Success from Fortune 500"
      ]
    },
    {
      name: "Skills",
      score: 82,
      status: "strong",
      insights: [
        "World-class data science and analytics capabilities",
        "Strong product development and engineering",
        "Growing enterprise sales expertise"
      ],
      recommendations: [
        "Invest in strategic selling training",
        "Develop consulting and advisory capabilities",
        "Build change management expertise"
      ]
    }
  ];

  // McKinsey Three Horizons Framework
  const threeHorizons: ThreeHorizon[] = [
    {
      horizon: 1,
      name: "Defend & Extend Core",
      focus: "Optimize existing healthcare analytics business",
      investment: 5000000,
      expectedReturn: 15000000,
      timeframe: "0-12 months",
      initiatives: [
        {
          name: "Enterprise Contract Intelligence",
          status: "on-track",
          progress: 85,
          owner: "Product Team",
          impact: "high"
        },
        {
          name: "War Room Analytics Platform",
          status: "on-track",
          progress: 92,
          owner: "Engineering",
          impact: "high"
        },
        {
          name: "Verified Savings Ledger",
          status: "on-track",
          progress: 78,
          owner: "Product Team",
          impact: "high"
        },
        {
          name: "Enterprise Sales Expansion",
          status: "at-risk",
          progress: 65,
          owner: "Sales Team",
          impact: "high"
        }
      ]
    },
    {
      horizon: 2,
      name: "Build Emerging Business",
      focus: "Expand into adjacent markets and new use cases",
      investment: 3000000,
      expectedReturn: 12000000,
      timeframe: "12-36 months",
      initiatives: [
        {
          name: "Financial Services Analytics",
          status: "on-track",
          progress: 45,
          owner: "Strategy Team",
          impact: "high"
        },
        {
          name: "Legal Contract Intelligence",
          status: "on-track",
          progress: 38,
          owner: "Product Team",
          impact: "medium"
        },
        {
          name: "Strategic Partnerships (McKinsey, Bain)",
          status: "delayed",
          progress: 25,
          owner: "BD Team",
          impact: "high"
        },
        {
          name: "International Expansion",
          status: "at-risk",
          progress: 15,
          owner: "Strategy Team",
          impact: "medium"
        }
      ]
    },
    {
      horizon: 3,
      name: "Create Viable Options",
      focus: "Seed transformative opportunities for future growth",
      investment: 1000000,
      expectedReturn: 25000000,
      timeframe: "36+ months",
      initiatives: [
        {
          name: "AI-Powered Strategic Advisory Platform",
          status: "on-track",
          progress: 20,
          owner: "Innovation Lab",
          impact: "high"
        },
        {
          name: "Predictive Risk Analytics Engine",
          status: "on-track",
          progress: 15,
          owner: "Data Science",
          impact: "high"
        },
        {
          name: "Autonomous Decision Intelligence",
          status: "on-track",
          progress: 10,
          owner: "Research Team",
          impact: "high"
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "strong":
      case "on-track":
        return "bg-green-500";
      case "moderate":
      case "at-risk":
        return "bg-yellow-500";
      case "weak":
      case "delayed":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "strong":
      case "on-track":
        return <CheckCircle2 className="h-4 w-4" />;
      case "moderate":
      case "at-risk":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const calculateOverallHealth = () => {
    const avgScore = sevenS.reduce((sum, el) => sum + el.score, 0) / sevenS.length;
    return Math.round(avgScore);
  };

  return (
    <div className="space-y-6">
      {/* Strategic Health Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">McKinsey Strategic Framework</CardTitle>
              <CardDescription>
                Enterprise-level strategic analysis and planning
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Analysis
              </Button>
              <Button size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Share with Board
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="h-8 w-8 text-blue-600" />
                  <Badge variant="outline" className="bg-green-50">Strong</Badge>
                </div>
                <div className="text-3xl font-bold">{calculateOverallHealth()}%</div>
                <p className="text-sm text-muted-foreground">Strategic Health</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Layers className="h-8 w-8 text-purple-600" />
                  <Badge variant="outline">{threeHorizons.length} Active</Badge>
                </div>
                <div className="text-3xl font-bold">$9M</div>
                <p className="text-sm text-muted-foreground">Total Investment</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <Badge variant="outline" className="bg-green-50">+420%</Badge>
                </div>
                <div className="text-3xl font-bold">$52M</div>
                <p className="text-sm text-muted-foreground">Expected Returns</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="h-8 w-8 text-amber-600" />
                  <Badge variant="outline">11 Active</Badge>
                </div>
                <div className="text-3xl font-bold">73%</div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="7s" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="7s">7S Framework</TabsTrigger>
          <TabsTrigger value="horizons">Three Horizons</TabsTrigger>
          <TabsTrigger value="insights">Strategic Insights</TabsTrigger>
        </TabsList>

        {/* 7S Framework Tab */}
        <TabsContent value="7s" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>McKinsey 7S Analysis</CardTitle>
              <CardDescription>
                Organizational effectiveness assessment across seven key elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sevenS.map((element) => (
                  <div key={element.name} className="space-y-3">
                    <div 
                      className="flex items-center justify-between cursor-pointer hover:bg-accent/50 p-3 rounded-lg transition-colors"
                      onClick={() => setSelectedElement(selectedElement === element.name ? null : element.name)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getStatusColor(element.status)}`}>
                          {getStatusIcon(element.status)}
                        </div>
                        <div>
                          <h4 className="font-semibold">{element.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Click to view details
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold">{element.score}%</div>
                          <Badge variant="outline" className={element.status === "strong" ? "bg-green-50" : "bg-yellow-50"}>
                            {element.status.charAt(0).toUpperCase() + element.status.slice(1)}
                          </Badge>
                        </div>
                        <ArrowRight className={`h-5 w-5 transition-transform ${selectedElement === element.name ? "rotate-90" : ""}`} />
                      </div>
                    </div>

                    <Progress value={element.score} className="h-2" />

                    {selectedElement === element.name && (
                      <div className="ml-14 space-y-4 border-l-2 border-blue-200 pl-6 py-2">
                        <div>
                          <h5 className="font-semibold mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-blue-600" />
                            Key Insights
                          </h5>
                          <ul className="space-y-1">
                            {element.insights.map((insight, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                {insight}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="font-semibold mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4 text-green-600" />
                            Recommendations
                          </h5>
                          <ul className="space-y-1">
                            {element.recommendations.map((rec, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                <span className="text-green-600 mt-1">→</span>
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Three Horizons Tab */}
        <TabsContent value="horizons" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {threeHorizons.map((horizon) => (
              <Card 
                key={horizon.horizon}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedHorizon === horizon.horizon ? "ring-2 ring-blue-600" : ""
                }`}
                onClick={() => setSelectedHorizon(selectedHorizon === horizon.horizon ? null : horizon.horizon)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-600">Horizon {horizon.horizon}</Badge>
                    <Badge variant="outline">{horizon.initiatives.length} Initiatives</Badge>
                  </div>
                  <CardTitle className="text-xl mt-2">{horizon.name}</CardTitle>
                  <CardDescription>{horizon.focus}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Investment</p>
                      <p className="font-semibold">
                        ${(horizon.investment / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expected Return</p>
                      <p className="font-semibold text-green-600">
                        ${(horizon.expectedReturn / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Timeframe</p>
                      <p className="font-semibold">{horizon.timeframe}</p>
                    </div>
                  </div>

                  {selectedHorizon === horizon.horizon && (
                    <div className="space-y-3 pt-4 border-t">
                      <h4 className="font-semibold">Active Initiatives</h4>
                      {horizon.initiatives.map((initiative, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(initiative.status)}`} />
                              <span className="text-sm font-medium">{initiative.name}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {initiative.impact} impact
                            </Badge>
                          </div>
                          <Progress value={initiative.progress} className="h-1" />
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{initiative.owner}</span>
                            <span>{initiative.progress}% complete</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Strategic Insights Tab */}
        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Strategic Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Advanced Technology Platform</p>
                      <p className="text-sm text-muted-foreground">
                        World-class analytics capabilities create strong competitive moat
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Clear Strategic Vision</p>
                      <p className="text-sm text-muted-foreground">
                        Well-defined market positioning and growth strategy
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Strong Value Proposition</p>
                      <p className="text-sm text-muted-foreground">
                        Proven ROI and customer success metrics
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  Strategic Priorities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Scale Enterprise Sales</p>
                      <p className="text-sm text-muted-foreground">
                        Build world-class enterprise sales organization
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Strategic Partnerships</p>
                      <p className="text-sm text-muted-foreground">
                        Establish partnerships with McKinsey, Bain, BCG
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <Target className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold">Thought Leadership</p>
                      <p className="text-sm text-muted-foreground">
                        Establish industry authority through content and research
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Executive Summary & Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold mb-2">Strategic Position</h4>
                <p className="text-sm text-muted-foreground">
                  SiriusB iQ demonstrates strong strategic health (85% overall) with world-class technology 
                  capabilities and clear market differentiation. The Three Horizons portfolio is well-balanced, 
                  with $9M invested across 11 strategic initiatives expected to generate $52M in returns.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold mb-2">Top 3 Strategic Priorities</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Scale enterprise sales through strategic hires from top-tier consultancies</li>
                  <li>2. Establish formal partnerships with McKinsey, Bain, and BCG for co-selling</li>
                  <li>3. Accelerate Horizon 2 initiatives in financial services and legal markets</li>
                </ol>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-semibold mb-2">Risk Mitigation</h4>
                <p className="text-sm text-muted-foreground">
                  Primary risk is execution velocity on enterprise sales expansion. Recommend hiring 
                  VP Enterprise Sales with McKinsey/Bain background within 90 days and establishing 
                  strategic advisory board with Fortune 500 CHROs and CFOs.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}