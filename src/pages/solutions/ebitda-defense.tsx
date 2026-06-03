import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Shield, TrendingUp, AlertTriangle, DollarSign, FileText, BarChart3, Target, Activity, Lock, Award, CheckCircle2, ArrowRight, Zap } from "lucide-react";
import Nav from "@/components/Nav";

export default function EBITDADefensePage() {
  return (
    <>
      <SEO
        title="EBITDA Defense - Financial Performance Protection | SiriusB iQ"
        description="Protect and optimize EBITDA with AI-powered margin defense, cost leakage detection, and real-time financial performance monitoring."
        image="/og-image.png"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
        <SiteHeader />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-8 w-8 text-purple-400" />
              <Badge variant="outline" className="text-purple-300 border-purple-400">
                EBITDA Protection
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-300 bg-clip-text text-transparent">
              EBITDA Defense Platform
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl">
              Enterprise-grade financial defense system that protects margins, eliminates cost leakage, 
              and safeguards EBITDA from hidden inefficiencies and contractual erosion. We partner with the most qualified actuaries and consultants to deliver comprehensive financial protection.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/war-room-v2">
                <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-950">
                  View War Room
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: TrendingUp, label: "EBITDA Protection", value: "$8.2M", sublabel: "Average annual impact" },
                { icon: DollarSign, label: "Margin Improvement", value: "3.2%", sublabel: "Average increase" },
                { icon: AlertTriangle, label: "Leakage Detected", value: "$12.4M", sublabel: "Across client base" },
                { icon: Award, label: "Recovery Rate", value: "91%", sublabel: "Of identified losses" }
              ].map((metric, idx) => (
                <Card key={idx} className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-6">
                    <metric.icon className="h-8 w-8 text-purple-400 mb-4" />
                    <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm font-medium text-slate-300">{metric.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{metric.sublabel}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Defense Pillars */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Four Pillars of EBITDA Defense
            </h2>
            
            <Tabs defaultValue="contract" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 bg-slate-900/50 mb-8">
                <TabsTrigger value="contract">Contract Defense</TabsTrigger>
                <TabsTrigger value="cost">Cost Leakage</TabsTrigger>
                <TabsTrigger value="vendor">Vendor Management</TabsTrigger>
                <TabsTrigger value="monitoring">Real-Time Monitoring</TabsTrigger>
              </TabsList>

              <TabsContent value="contract" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FileText className="h-6 w-6 text-purple-400" />
                      Contract Defense & Compliance
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Protect contracted terms and prevent financial erosion
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Guaranteed Discount Validation",
                          description: "Continuous verification of contracted discount rates and rebate thresholds",
                          impact: "$1.2M avg recovery",
                          features: ["Automated quarterly audits", "Contract clause enforcement", "Shortfall alerts"]
                        },
                        {
                          title: "Performance Guarantee Tracking",
                          description: "Monitor and enforce service level agreements and penalty clauses",
                          impact: "98% SLA compliance",
                          features: ["Real-time SLA monitoring", "Penalty calculation", "Automated claims"]
                        },
                        {
                          title: "Price Escalation Defense",
                          description: "Challenge unauthorized price increases and CPI adjustments",
                          impact: "$850K avg savings",
                          features: ["Market benchmarking", "Escalation clause review", "Negotiation support"]
                        },
                        {
                          title: "Contract Renewal Optimization",
                          description: "Strategic timing and leverage for contract renegotiations",
                          impact: "12% better terms",
                          features: ["Market intelligence", "Alternative sourcing", "Competitive bidding"]
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-white">{item.title}</h4>
                            <Badge variant="outline" className="text-green-400 border-green-400">
                              {item.impact}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                          <ul className="space-y-1">
                            {item.features.map((feature, fidx) => (
                              <li key={fidx} className="text-sm text-slate-300 flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cost" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <AlertTriangle className="h-6 w-6 text-purple-400" />
                      Cost Leakage Detection & Recovery
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Identify and eliminate hidden costs across all operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          category: "Administrative Leakage",
                          items: [
                            { name: "Duplicate payments", impact: "$240K avg" },
                            { name: "Incorrect billing rates", impact: "$180K avg" },
                            { name: "Unauthorized fees", impact: "$320K avg" },
                            { name: "Processing errors", impact: "$150K avg" }
                          ]
                        },
                        {
                          category: "Operational Leakage",
                          items: [
                            { name: "Excess inventory costs", impact: "$420K avg" },
                            { name: "Inefficient workflows", impact: "$280K avg" },
                            { name: "Redundant services", impact: "$195K avg" },
                            { name: "Waste & spoilage", impact: "$165K avg" }
                          ]
                        },
                        {
                          category: "Financial Leakage",
                          items: [
                            { name: "Interest penalties", impact: "$95K avg" },
                            { name: "Late payment fees", impact: "$125K avg" },
                            { name: "Currency losses", impact: "$210K avg" },
                            { name: "Tax optimization gaps", impact: "$380K avg" }
                          ]
                        }
                      ].map((section, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <Zap className="h-5 w-5 text-purple-400" />
                            {section.category}
                          </h4>
                          <ul className="space-y-2">
                            {section.items.map((item, iidx) => (
                              <li key={iidx} className="flex justify-between items-start">
                                <span className="text-sm text-slate-300">{item.name}</span>
                                <Badge variant="outline" className="text-xs text-orange-400 border-orange-400">
                                  {item.impact}
                                </Badge>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vendor" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="h-6 w-6 text-purple-400" />
                      Strategic Vendor Management
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Optimize vendor relationships and spending efficiency
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Vendor Performance Scoring",
                          description: "Comprehensive evaluation of vendor value delivery and cost efficiency",
                          metrics: [
                            "Quality & reliability scores",
                            "Cost competitiveness index",
                            "Service level achievement",
                            "Innovation contribution"
                          ]
                        },
                        {
                          title: "Spend Consolidation Analysis",
                          description: "Identify opportunities to consolidate vendors and increase leverage",
                          metrics: [
                            "Volume aggregation potential",
                            "Price negotiation power",
                            "Administrative efficiency gains",
                            "Risk concentration assessment"
                          ]
                        },
                        {
                          title: "Alternative Sourcing Intelligence",
                          description: "Continuous market monitoring for better vendor alternatives",
                          metrics: [
                            "Competitive landscape tracking",
                            "New entrant evaluation",
                            "Technology disruption alerts",
                            "Market pricing benchmarks"
                          ]
                        },
                        {
                          title: "Vendor Risk Management",
                          description: "Proactive identification and mitigation of vendor-related risks",
                          metrics: [
                            "Financial health monitoring",
                            "Dependency analysis",
                            "Contingency planning",
                            "Exit strategy development"
                          ]
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                          <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                          <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                          <div className="grid md:grid-cols-2 gap-2">
                            {item.metrics.map((metric, midx) => (
                              <div key={midx} className="text-sm text-slate-300 flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                {metric}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="monitoring" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="h-6 w-6 text-purple-400" />
                      Real-Time EBITDA Monitoring
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Continuous financial performance tracking and alert systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Margin Compression Detection",
                          alerts: [
                            "Revenue decline patterns",
                            "Cost inflation trends",
                            "Mix shift impact",
                            "Pricing pressure indicators"
                          ]
                        },
                        {
                          title: "Cash Flow Impact Analysis",
                          alerts: [
                            "Working capital trends",
                            "Payment term changes",
                            "Collection efficiency",
                            "Receivables aging"
                          ]
                        },
                        {
                          title: "Profitability Segmentation",
                          alerts: [
                            "Customer profitability shifts",
                            "Product line performance",
                            "Channel effectiveness",
                            "Geographic variance"
                          ]
                        },
                        {
                          title: "Competitive Intelligence",
                          alerts: [
                            "Market share trends",
                            "Competitive pricing moves",
                            "Industry benchmark gaps",
                            "Strategic threat assessment"
                          ]
                        }
                      ].map((section, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-purple-400" />
                            {section.title}
                          </h4>
                          <ul className="space-y-2">
                            {section.alerts.map((alert, aidx) => (
                              <li key={aidx} className="text-sm text-slate-300 flex items-start gap-2">
                                <Lock className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                {alert}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* War Room Integration */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Executive War Room Integration
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BarChart3,
                  title: "Real-Time Dashboards",
                  description: "Live EBITDA tracking with drill-down capabilities into every margin impact",
                  features: ["KPI monitoring", "Trend analysis", "Variance reporting"]
                },
                {
                  icon: AlertTriangle,
                  title: "Automated Alerts",
                  description: "Intelligent notification system for margin threats and recovery opportunities",
                  features: ["Priority scoring", "Action workflows", "Escalation paths"]
                },
                {
                  icon: FileText,
                  title: "Evidence & Audit Trails",
                  description: "Comprehensive documentation for all findings and recovery actions",
                  features: ["Automated reports", "Compliance tracking", "ROI validation"]
                }
              ].map((item, idx) => (
                <Card key={idx} className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <item.icon className="h-12 w-12 text-purple-400 mb-4" />
                    <CardTitle className="text-white">{item.title}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.features.map((feature, fidx) => (
                        <li key={fidx} className="text-sm text-slate-300 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-purple-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ROI & Impact */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Measurable EBITDA Impact
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">First Year Impact</CardTitle>
                  <CardDescription className="text-slate-400">
                    Average results across enterprise clients
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { metric: "Contract Recovery", value: "$2.1M", trend: "+240%" },
                    { metric: "Cost Leakage Elimination", value: "$3.8M", trend: "+180%" },
                    { metric: "Vendor Optimization", value: "$1.6M", trend: "+95%" },
                    { metric: "Process Improvement", value: "$800K", trend: "+120%" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-800/50 rounded">
                      <span className="text-slate-300">{item.metric}</span>
                      <div className="text-right">
                        <div className="text-white font-semibold">{item.value}</div>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          {item.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Long-Term Value</CardTitle>
                  <CardDescription className="text-slate-400">
                    Sustained margin protection and growth
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { metric: "EBITDA Margin Improvement", value: "3.2%", trend: "Year-over-year" },
                    { metric: "Cost Base Optimization", value: "8.5%", trend: "Ongoing reduction" },
                    { metric: "Vendor Cost Savings", value: "12.3%", trend: "Annual improvement" },
                    { metric: "Process Efficiency Gains", value: "15%", trend: "Productivity lift" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-slate-800/50 rounded">
                      <span className="text-slate-300">{item.metric}</span>
                      <div className="text-right">
                        <div className="text-white font-semibold">{item.value}</div>
                        <div className="text-xs text-slate-400">{item.trend}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Strengthen Your EBITDA Defense Today
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Deploy enterprise-grade margin protection and start recovering value within 30 days.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Schedule EBITDA Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/war-room-v2">
                <Button size="lg" variant="outline" className="border-purple-400 text-purple-300 hover:bg-purple-950">
                  Explore War Room
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
      <Nav />
    </>
  );
}