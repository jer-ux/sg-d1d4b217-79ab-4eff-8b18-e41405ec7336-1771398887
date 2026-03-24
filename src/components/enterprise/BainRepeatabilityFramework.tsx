/**
 * Bain Repeatability Framework Dashboard
 * Scalable growth strategy using Bain's proven methodologies
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Repeat,
  Zap,
  Users,
  DollarSign,
  TrendingUp,
  Award,
  Target,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2
} from "lucide-react";
import { useState } from "react";

interface RepeatabilityElement {
  category: string;
  score: number;
  components: Component[];
  maturity: "nascent" | "developing" | "established" | "world-class";
}

interface Component {
  name: string;
  description: string;
  score: number;
  insights: string[];
  actions: string[];
}

interface NPSData {
  score: number;
  trend: number;
  promoters: number;
  passives: number;
  detractors: number;
  segments: {
    name: string;
    nps: number;
    responseRate: number;
  }[];
}

export function BainRepeatabilityFramework() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  // Bain Repeatability Model
  const repeatabilityModel: RepeatabilityElement[] = [
    {
      category: "Repeatable Formula",
      score: 82,
      maturity: "established",
      components: [
        {
          name: "Differentiated Core",
          description: "Unique capabilities that create customer value",
          score: 88,
          insights: [
            "AI-powered contract intelligence creates sustainable competitive advantage",
            "Proprietary algorithms for risk detection and savings identification",
            "Verified savings methodology with audit trail"
          ],
          actions: [
            "Patent core algorithms and methodologies",
            "Publish thought leadership on contract intelligence",
            "Build brand around transparency and fiduciary duty"
          ]
        },
        {
          name: "Clear Adjacencies",
          description: "Adjacent markets for profitable expansion",
          score: 75,
          insights: [
            "Healthcare analytics provides entry to broader benefits management",
            "Contract intelligence applicable to financial services and legal",
            "War Room methodology scales across industries"
          ],
          actions: [
            "Launch financial services vertical within 6 months",
            "Develop legal contract intelligence offering",
            "Build M&A due diligence product for PE firms"
          ]
        },
        {
          name: "Nonnegotiables",
          description: "Standards that define the company",
          score: 85,
          insights: [
            "Unwavering commitment to data accuracy and transparency",
            "World-class customer success and value delivery",
            "Evidence-based approach to all recommendations"
          ],
          actions: [
            "Codify nonnegotiables into company operating principles",
            "Build quality assurance processes into every workflow",
            "Create customer advisory board to maintain standards"
          ]
        }
      ]
    },
    {
      category: "Repeatable Customer Acquisition",
      score: 68,
      maturity: "developing",
      components: [
        {
          name: "Scalable Go-to-Market",
          description: "Repeatable sales and marketing processes",
          score: 65,
          insights: [
            "Enterprise sales cycle is well-defined but needs scale",
            "Strong inbound demand from thought leadership",
            "Consultant-led referrals provide qualified pipeline"
          ],
          actions: [
            "Hire VP Enterprise Sales from McKinsey/Bain within 90 days",
            "Build sales playbook and enablement program",
            "Establish strategic partnerships with top consultancies"
          ]
        },
        {
          name: "Efficient Customer Economics",
          description: "Predictable CAC and LTV ratios",
          score: 72,
          insights: [
            "LTV:CAC ratio of 4.2:1 exceeds industry benchmarks",
            "Net revenue retention of 135% drives expansion revenue",
            "Average deal size of $450K supports efficient scaling"
          ],
          actions: [
            "Optimize lead generation through content marketing",
            "Develop inside sales team for mid-market segment",
            "Create customer success playbook to drive expansion"
          ]
        },
        {
          name: "Founder-Led Sales to Process",
          description: "Transition from founder-led to scalable sales",
          score: 58,
          insights: [
            "Currently heavily dependent on founder relationships",
            "Need to document and systematize sales process",
            "Sales team lacks enterprise selling experience"
          ],
          actions: [
            "Document founder sales process and decision criteria",
            "Hire enterprise sales reps from consultancies",
            "Create comprehensive sales training program"
          ]
        }
      ]
    },
    {
      category: "Repeatable Operating Model",
      score: 75,
      maturity: "established",
      components: [
        {
          name: "Platform Scalability",
          description: "Technology architecture that scales efficiently",
          score: 90,
          insights: [
            "Cloud-native architecture on Vercel/Supabase scales automatically",
            "Real-time analytics engine processes millions of transactions",
            "API-first design enables rapid integration"
          ],
          actions: [
            "Invest in ML/AI infrastructure for predictive analytics",
            "Build enterprise-grade security and compliance features",
            "Develop white-label capability for strategic partners"
          ]
        },
        {
          name: "Delivery Excellence",
          description: "Consistent execution and customer success",
          score: 78,
          insights: [
            "Strong implementation methodology with 95% on-time delivery",
            "Customer success team drives product adoption",
            "Quarterly business reviews track value realization"
          ],
          actions: [
            "Build customer success playbook and certification program",
            "Develop industry-specific implementation templates",
            "Create center of excellence for best practices"
          ]
        },
        {
          name: "Operating Leverage",
          description: "Ability to grow revenue faster than costs",
          score: 68,
          insights: [
            "Gross margins of 82% provide excellent unit economics",
            "Need to improve sales and marketing efficiency",
            "R&D investment required for platform enhancements"
          ],
          actions: [
            "Optimize cost per acquisition through digital channels",
            "Automate implementation and onboarding processes",
            "Build self-service analytics for mid-market"
          ]
        }
      ]
    }
  ];

  // Net Promoter System Data
  const npsData: NPSData = {
    score: 72,
    trend: 8,
    promoters: 78,
    passives: 16,
    detractors: 6,
    segments: [
      { name: "Enterprise (>$1B)", nps: 85, responseRate: 92 },
      { name: "Mid-Market ($100M-$1B)", nps: 68, responseRate: 78 },
      { name: "Healthcare Payers", nps: 80, responseRate: 88 },
      { name: "Self-Insured Employers", nps: 65, responseRate: 72 }
    ]
  };

  const getMaturityColor = (maturity: string) => {
    switch (maturity) {
      case "world-class":
        return "bg-green-500";
      case "established":
        return "bg-blue-500";
      case "developing":
        return "bg-yellow-500";
      case "nascent":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMaturityLabel = (maturity: string) => {
    return maturity.split("-").map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ");
  };

  const calculateOverallScore = () => {
    const total = repeatabilityModel.reduce((sum, el) => sum + el.score, 0);
    return Math.round(total / repeatabilityModel.length);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Bain Repeatability Framework</CardTitle>
              <CardDescription>
                Scalable growth strategy and Net Promoter System
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share Insights
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Repeat className="h-8 w-8 text-blue-600" />
                  <Badge className="bg-blue-600">Established</Badge>
                </div>
                <div className="text-3xl font-bold">{calculateOverallScore()}%</div>
                <p className="text-sm text-muted-foreground">Repeatability Score</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <Badge variant="outline" className="bg-green-50">+8 pts</Badge>
                </div>
                <div className="text-3xl font-bold">{npsData.score}</div>
                <p className="text-sm text-muted-foreground">Net Promoter Score</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-8 w-8 text-purple-600" />
                  <Badge variant="outline">4.2:1</Badge>
                </div>
                <div className="text-3xl font-bold">135%</div>
                <p className="text-sm text-muted-foreground">Net Revenue Retention</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Award className="h-8 w-8 text-amber-600" />
                  <Badge variant="outline" className="bg-green-50">{npsData.promoters}%</Badge>
                </div>
                <div className="text-3xl font-bold">82%</div>
                <p className="text-sm text-muted-foreground">Gross Margin</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="repeatability" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="repeatability">Repeatability Model</TabsTrigger>
          <TabsTrigger value="nps">Net Promoter System</TabsTrigger>
          <TabsTrigger value="actions">Strategic Actions</TabsTrigger>
        </TabsList>

        {/* Repeatability Model Tab */}
        <TabsContent value="repeatability" className="space-y-4">
          <div className="space-y-4">
            {repeatabilityModel.map((element) => (
              <Card key={element.category}>
                <CardHeader
                  className="cursor-pointer hover:bg-accent/50"
                  onClick={() => setSelectedCategory(
                    selectedCategory === element.category ? null : element.category
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${getMaturityColor(element.maturity)}`}>
                        <Repeat className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle>{element.category}</CardTitle>
                        <CardDescription>
                          {element.components.length} components • {getMaturityLabel(element.maturity)}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{element.score}%</div>
                      <Badge variant="outline" className={`${getMaturityColor(element.maturity)} text-white`}>
                        {getMaturityLabel(element.maturity)}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={element.score} className="mt-4" />
                </CardHeader>

                {selectedCategory === element.category && (
                  <CardContent className="space-y-4 pt-6 border-t">
                    {element.components.map((component) => (
                      <div key={component.name} className="space-y-3">
                        <div 
                          className="flex items-center justify-between cursor-pointer hover:bg-accent/30 p-3 rounded-lg"
                          onClick={() => setSelectedComponent(
                            selectedComponent === component.name ? null : component.name
                          )}
                        >
                          <div>
                            <h4 className="font-semibold">{component.name}</h4>
                            <p className="text-sm text-muted-foreground">{component.description}</p>
                          </div>
                          <div className="text-2xl font-bold">{component.score}%</div>
                        </div>
                        <Progress value={component.score} className="h-2" />

                        {selectedComponent === component.name && (
                          <div className="ml-6 space-y-4 border-l-2 border-blue-200 pl-6 py-2">
                            <div>
                              <h5 className="font-semibold mb-2 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                                Key Insights
                              </h5>
                              <ul className="space-y-1">
                                {component.insights.map((insight, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-green-600 mt-1">•</span>
                                    {insight}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h5 className="font-semibold mb-2 flex items-center gap-2">
                                <Target className="h-4 w-4 text-blue-600" />
                                Strategic Actions
                              </h5>
                              <ul className="space-y-1">
                                {component.actions.map((action, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">→</span>
                                    {action}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Net Promoter System Tab */}
        <TabsContent value="nps" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Net Promoter Score Breakdown</CardTitle>
                <CardDescription>Customer loyalty and satisfaction metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-green-600 mb-2">{npsData.score}</div>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>+{npsData.trend} points vs. last quarter</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Promoters (9-10)</span>
                      <span className="text-sm font-bold text-green-600">{npsData.promoters}%</span>
                    </div>
                    <Progress value={npsData.promoters} className="h-2 bg-green-100" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Passives (7-8)</span>
                      <span className="text-sm font-bold text-yellow-600">{npsData.passives}%</span>
                    </div>
                    <Progress value={npsData.passives} className="h-2 bg-yellow-100" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Detractors (0-6)</span>
                      <span className="text-sm font-bold text-red-600">{npsData.detractors}%</span>
                    </div>
                    <Progress value={npsData.detractors} className="h-2 bg-red-100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>NPS by Customer Segment</CardTitle>
                <CardDescription>Loyalty metrics across customer types</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {npsData.segments.map((segment) => (
                  <div key={segment.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{segment.name}</span>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">
                          {segment.responseRate}% response
                        </Badge>
                        <span className="text-lg font-bold text-green-600">{segment.nps}</span>
                      </div>
                    </div>
                    <Progress value={segment.nps} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>NPS Insights & Action Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    What's Working
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Enterprise customers (&gt;$1B) show highest loyalty (NPS 85)</li>
                    <li>• Healthcare payers strongly satisfied with platform (NPS 80)</li>
                    <li>• Overall NPS of 72 significantly exceeds SaaS benchmark (31)</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    Improvement Areas
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Mid-market segment NPS (68) below target</li>
                    <li>• Self-insured employer satisfaction needs attention (NPS 65)</li>
                    <li>• Response rates vary significantly by segment</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold mb-2">Recommended Actions</h4>
                <ol className="space-y-2 text-sm text-muted-foreground">
                  <li>1. Implement closed-loop feedback system to address detractor concerns within 48 hours</li>
                  <li>2. Create mid-market success playbook based on enterprise best practices</li>
                  <li>3. Launch quarterly business reviews with passives to convert to promoters</li>
                  <li>4. Develop self-service analytics for self-insured employers</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Strategic Actions Tab */}
        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>90-Day Action Plan</CardTitle>
              <CardDescription>Priority initiatives to strengthen repeatability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Immediate Actions (0-30 days)
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Launch VP Enterprise Sales search</p>
                        <p className="text-sm text-muted-foreground">
                          Target candidates from McKinsey, Bain, BCG with enterprise SaaS experience
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Document sales process and playbook</p>
                        <p className="text-sm text-muted-foreground">
                          Codify founder-led sales methodology for scaling
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Implement NPS closed-loop system</p>
                        <p className="text-sm text-muted-foreground">
                          Address detractor feedback within 48 hours
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Near-Term Actions (30-60 days)
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Establish strategic partnerships</p>
                        <p className="text-sm text-muted-foreground">
                          Formalize co-selling agreements with McKinsey and Bain
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Build customer success playbook</p>
                        <p className="text-sm text-muted-foreground">
                          Create standardized onboarding and QBR processes
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Launch financial services vertical</p>
                        <p className="text-sm text-muted-foreground">
                          Adapt platform for banking and insurance use cases
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Strategic Investments (60-90 days)
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Build strategic advisory board</p>
                        <p className="text-sm text-muted-foreground">
                          Recruit Fortune 500 CHROs and CFOs for guidance
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Launch thought leadership program</p>
                        <p className="text-sm text-muted-foreground">
                          Publish research on contract intelligence and transparency
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Develop white-label capability</p>
                        <p className="text-sm text-muted-foreground">
                          Enable consultancies to rebrand and resell platform
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}