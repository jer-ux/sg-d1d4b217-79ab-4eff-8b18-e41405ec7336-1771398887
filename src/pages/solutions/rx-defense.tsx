import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Shield, TrendingDown, AlertTriangle, DollarSign, FileText, BarChart3, Pill, Activity, Target, Award, CheckCircle2, ArrowRight } from "lucide-react";

export default function RXDefensePage() {
  return (
    <>
      <SEO
        title="RX Defense - Pharmaceutical Cost Protection | SiriusB iQ"
        description="Defend against pharmaceutical cost inflation with AI-powered PBM oversight, formulary optimization, and real-time drug pricing intelligence."
        image="/og-image.png"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <SiteHeader />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-6">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="max-w-7xl mx-auto relative">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-8 w-8 text-blue-400" />
              <Badge variant="outline" className="text-blue-300 border-blue-400">
                Pharmaceutical Defense
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              RX Defense Platform
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl">
              AI-powered pharmaceutical cost defense system that identifies PBM overcharges, 
              optimizes formularies, and protects your organization from drug pricing inflation.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link href="/request-demo">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Request Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/war-room-v2">
                <Button size="lg" variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-950">
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
                { icon: DollarSign, label: "Average Savings", value: "$2.4M", sublabel: "Per client annually" },
                { icon: TrendingDown, label: "Cost Reduction", value: "18-32%", sublabel: "Pharmaceutical spend" },
                { icon: AlertTriangle, label: "Issues Detected", value: "850+", sublabel: "Across all clients" },
                { icon: Award, label: "Recovery Rate", value: "94%", sublabel: "Of identified overcharges" }
              ].map((metric, idx) => (
                <Card key={idx} className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-6">
                    <metric.icon className="h-8 w-8 text-blue-400 mb-4" />
                    <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm font-medium text-slate-300">{metric.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{metric.sublabel}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Comprehensive Defense Capabilities
            </h2>
            
            <Tabs defaultValue="pbm" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 bg-slate-900/50 mb-8">
                <TabsTrigger value="pbm">PBM Oversight</TabsTrigger>
                <TabsTrigger value="formulary">Formulary Defense</TabsTrigger>
                <TabsTrigger value="pricing">Price Intelligence</TabsTrigger>
                <TabsTrigger value="audit">Claims Audit</TabsTrigger>
              </TabsList>

              <TabsContent value="pbm" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Shield className="h-6 w-6 text-blue-400" />
                      PBM Oversight & Validation
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Real-time monitoring and validation of PBM practices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Spread Pricing Detection",
                          description: "Identify hidden markups between PBM acquisition and plan costs",
                          features: ["Automated AWP analysis", "MAC list validation", "Benchmark comparisons"]
                        },
                        {
                          title: "Rebate Verification",
                          description: "Ensure contracted rebates are fully passed through",
                          features: ["Quarterly rebate audits", "Manufacturer tracking", "Reconciliation tools"]
                        },
                        {
                          title: "DIR Fee Analysis",
                          description: "Monitor and challenge Direct and Indirect Remuneration fees",
                          features: ["Fee categorization", "Impact quantification", "Recovery procedures"]
                        },
                        {
                          title: "Specialty Drug Review",
                          description: "Deep analysis of high-cost specialty medication management",
                          features: ["Prior auth monitoring", "Step therapy compliance", "Alternative sourcing"]
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                          <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                          <p className="text-sm text-slate-400 mb-3">{item.description}</p>
                          <ul className="space-y-1">
                            {item.features.map((feature, fidx) => (
                              <li key={fidx} className="text-sm text-slate-300 flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
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

              <TabsContent value="formulary" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Pill className="h-6 w-6 text-blue-400" />
                      Formulary Optimization & Defense
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Strategic formulary management to minimize costs while maintaining care quality
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Therapeutic Alternatives",
                          description: "Identify clinically equivalent, lower-cost medication options",
                          impact: "12-18% average savings"
                        },
                        {
                          title: "Tier Structure Analysis",
                          description: "Optimize copay tiers to incentivize cost-effective choices",
                          impact: "8-12% utilization shift"
                        },
                        {
                          title: "Prior Authorization Rules",
                          description: "Balance cost control with member access and clinical needs",
                          impact: "15-20% specialty reduction"
                        },
                        {
                          title: "Step Therapy Programs",
                          description: "Ensure appropriate first-line therapy before expensive options",
                          impact: "10-14% cost avoidance"
                        },
                        {
                          title: "Generic Substitution",
                          description: "Maximize generic utilization without compromising outcomes",
                          impact: "25-35% drug savings"
                        },
                        {
                          title: "Biosimilar Adoption",
                          description: "Strategic transition to biosimilar alternatives for biologics",
                          impact: "20-30% specialty savings"
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-white">{item.title}</h4>
                            <Badge variant="outline" className="text-green-400 border-green-400">
                              {item.impact}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pricing" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="h-6 w-6 text-blue-400" />
                      Real-Time Price Intelligence
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Market-leading pharmaceutical pricing data and analytics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      {[
                        {
                          category: "Market Benchmarking",
                          items: [
                            "AWP, WAC, and NADAC pricing databases",
                            "Regional pricing variations",
                            "Competitive landscape analysis",
                            "Trend forecasting models"
                          ]
                        },
                        {
                          category: "Manufacturer Programs",
                          items: [
                            "Patient assistance program tracking",
                            "Copay card monitoring",
                            "Manufacturer coupon intelligence",
                            "Foundation support identification"
                          ]
                        },
                        {
                          category: "Alternative Sourcing",
                          items: [
                            "340B pharmacy networks",
                            "Canadian pharmacy options",
                            "International pricing comparisons",
                            "Compounding alternatives"
                          ]
                        },
                        {
                          category: "Predictive Analytics",
                          items: [
                            "Pipeline drug cost projections",
                            "Patent expiry calendars",
                            "Generic launch predictions",
                            "Utilization trend modeling"
                          ]
                        }
                      ].map((section, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                            <Target className="h-5 w-5 text-blue-400" />
                            {section.category}
                          </h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {section.items.map((item, iidx) => (
                              <div key={iidx} className="text-sm text-slate-300 flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="audit" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <FileText className="h-6 w-6 text-blue-400" />
                      Automated Claims Audit System
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      AI-powered claim-by-claim validation and recovery
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Billing Validation",
                          checks: [
                            "Duplicate claim detection",
                            "Incorrect NDC codes",
                            "Quantity/days supply errors",
                            "Invalid refill patterns"
                          ]
                        },
                        {
                          title: "Clinical Appropriateness",
                          checks: [
                            "Drug-drug interactions",
                            "Contraindication alerts",
                            "Dosage validation",
                            "Duration compliance"
                          ]
                        },
                        {
                          title: "Contract Compliance",
                          checks: [
                            "Guaranteed discount verification",
                            "Performance guarantee tracking",
                            "Network access validation",
                            "Service level monitoring"
                          ]
                        }
                      ].map((audit, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/50 rounded-lg">
                          <h4 className="font-semibold text-white mb-3">{audit.title}</h4>
                          <ul className="space-y-2">
                            {audit.checks.map((check, cidx) => (
                              <li key={cidx} className="text-sm text-slate-300 flex items-start gap-2">
                                <Activity className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                                {check}
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

        {/* Integration & Technology */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              Seamless Integration & Real-Time Defense
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Continuous Monitoring",
                  description: "24/7 automated surveillance of pharmaceutical claims and PBM activities",
                  features: ["Real-time alerts", "Anomaly detection", "Trend analysis"]
                },
                {
                  icon: BarChart3,
                  title: "War Room Integration",
                  description: "Direct integration with Executive War Room for strategic oversight",
                  features: ["Live dashboards", "Executive reports", "Action workflows"]
                },
                {
                  icon: FileText,
                  title: "Evidence Library",
                  description: "Comprehensive audit trails and recovery documentation",
                  features: ["Automated reports", "Compliance records", "ROI tracking"]
                }
              ].map((item, idx) => (
                <Card key={idx} className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <item.icon className="h-12 w-12 text-blue-400 mb-4" />
                    <CardTitle className="text-white">{item.title}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.features.map((feature, fidx) => (
                        <li key={fidx} className="text-sm text-slate-300 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-blue-400" />
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

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Protect Your Organization from RX Cost Inflation
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Deploy AI-powered pharmaceutical defense and start recovering overcharges within 30 days.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/request-demo">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Schedule Defense Assessment
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/war-room-v2">
                <Button size="lg" variant="outline" className="border-blue-400 text-blue-300 hover:bg-blue-950">
                  Explore War Room
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}