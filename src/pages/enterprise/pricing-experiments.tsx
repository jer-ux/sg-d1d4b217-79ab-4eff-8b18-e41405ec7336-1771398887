import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FlaskConical, TrendingUp, Users, DollarSign, Target, BarChart3, Zap, Crown } from "lucide-react";

export default function PricingExperimentsPage() {
  const [activeExperiment, setActiveExperiment] = useState<string>("annual-discount");

  const experiments = [
    {
      id: "annual-discount",
      name: "Annual Prepay Discount Test",
      status: "running",
      variant_a: "15% discount",
      variant_b: "20% discount",
      winner: null,
      sample_size: 1247,
      confidence: 87,
      impact: "+$124K ARR",
      conversions_a: 156,
      conversions_b: 203,
      conversion_rate_a: 12.5,
      conversion_rate_b: 16.3,
      revenue_a: "$780K",
      revenue_b: "$1.015M",
      started: "2026-03-01",
      expected_end: "2026-04-15"
    },
    {
      id: "enterprise-tier",
      name: "Enterprise Tier Pricing",
      status: "completed",
      variant_a: "$50K/year",
      variant_b: "$65K/year",
      winner: "b",
      sample_size: 894,
      confidence: 94,
      impact: "+$87K ARR",
      conversions_a: 23,
      conversions_b: 19,
      conversion_rate_a: 5.2,
      conversion_rate_b: 4.3,
      revenue_a: "$1.15M",
      revenue_b: "$1.235M",
      started: "2026-01-15",
      expected_end: "2026-03-01"
    },
    {
      id: "freemium-limit",
      name: "Freemium Contract Limit",
      status: "running",
      variant_a: "3 contracts/month",
      variant_b: "5 contracts/month",
      winner: null,
      sample_size: 3421,
      confidence: 72,
      impact: "+$67K ARR",
      conversions_a: 287,
      conversions_b: 251,
      conversion_rate_a: 16.8,
      conversion_rate_b: 14.7,
      revenue_a: "$1.435M",
      revenue_b: "$1.255M",
      started: "2026-02-15",
      expected_end: "2026-04-30"
    },
    {
      id: "seat-pricing",
      name: "Per-Seat Pricing Model",
      status: "draft",
      variant_a: "$190/seat/month",
      variant_b: "$250/seat/month",
      winner: null,
      sample_size: 0,
      confidence: 0,
      impact: "TBD",
      conversions_a: 0,
      conversions_b: 0,
      conversion_rate_a: 0,
      conversion_rate_b: 0,
      revenue_a: "$0",
      revenue_b: "$0",
      started: null,
      expected_end: null
    }
  ];

  const pricingVariants = [
    {
      tier: "Starter",
      current: "$5K/year",
      variant_a: "$4K/year",
      variant_b: "$6K/year",
      hypothesis: "Lower entry price increases volume",
      status: "testing"
    },
    {
      tier: "Professional",
      current: "$15K/year",
      variant_a: "$12K/year",
      variant_b: "$18K/year",
      hypothesis: "Premium positioning improves margins",
      status: "planning"
    },
    {
      tier: "Enterprise",
      current: "$50K/year",
      variant_a: "$45K/year",
      variant_b: "$65K/year",
      hypothesis: "Higher price signals quality to Fortune 500",
      status: "completed"
    }
  ];

  const metrics = [
    { label: "Active Experiments", value: "2", icon: FlaskConical, color: "text-blue-600" },
    { label: "Total Sample Size", value: "4,668", icon: Users, color: "text-green-600" },
    { label: "Revenue Impact", value: "+$191K", icon: DollarSign, color: "text-purple-600" },
    { label: "Avg Confidence", value: "84.3%", icon: Target, color: "text-orange-600" }
  ];

  const insights = [
    {
      title: "20% Discount Drives Higher Conversion",
      finding: "Annual prepay with 20% discount converts 30% better than 15% discount",
      action: "Roll out 20% discount to all prospects",
      impact: "+$124K ARR",
      confidence: 87
    },
    {
      title: "Higher Enterprise Pricing Wins",
      finding: "$65K/year Enterprise tier maintains conversions while increasing revenue per deal",
      action: "Increase Enterprise pricing from $50K to $65K",
      impact: "+$87K ARR",
      confidence: 94
    },
    {
      title: "Tighter Freemium Limits Boost Paid",
      finding: "3 contracts/month limit converts 14% more users to paid than 5 contracts",
      action: "Reduce freemium limit to 3 contracts/month",
      impact: "+$180K ARR (projected)",
      confidence: 72
    }
  ];

  return (
    <>
      <Head>
        <title>Pricing Experiments - A/B Testing Dashboard | SiriusB iQ</title>
        <meta name="description" content="Data-driven pricing optimization through controlled A/B testing" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <SiteHeader />

        <main className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FlaskConical className="h-8 w-8 text-blue-600" />
              <h1 className="text-4xl font-bold">Pricing Experiments</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Data-driven pricing optimization through controlled A/B testing
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-3xl font-bold mt-2">{metric.value}</p>
                    </div>
                    <metric.icon className={`h-8 w-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="experiments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="experiments">Active Experiments</TabsTrigger>
              <TabsTrigger value="insights">Key Insights</TabsTrigger>
              <TabsTrigger value="variants">Pricing Variants</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="experiments" className="space-y-6">
              {experiments.map((exp) => (
                <Card key={exp.id} className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-3">
                          {exp.name}
                          <Badge variant={exp.status === "running" ? "default" : exp.status === "completed" ? "secondary" : "outline"}>
                            {exp.status}
                          </Badge>
                          {exp.winner && (
                            <Badge variant="default" className="bg-green-600">
                              Winner: Variant {exp.winner.toUpperCase()}
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {exp.started && `Started: ${exp.started}`}
                          {exp.expected_end && ` • Expected end: ${exp.expected_end}`}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{exp.impact}</p>
                        <p className="text-sm text-muted-foreground">Projected Impact</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Variant A */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Variant A (Control)</p>
                            <p className="text-xl font-bold">{exp.variant_a}</p>
                          </div>
                          {exp.winner === "a" && <Crown className="h-6 w-6 text-yellow-500" />}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Conversions:</span>
                            <span className="font-semibold">{exp.conversions_a}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Conversion Rate:</span>
                            <span className="font-semibold">{exp.conversion_rate_a}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Revenue:</span>
                            <span className="font-semibold">{exp.revenue_a}</span>
                          </div>
                        </div>
                      </div>

                      {/* Variant B */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Variant B (Test)</p>
                            <p className="text-xl font-bold">{exp.variant_b}</p>
                          </div>
                          {exp.winner === "b" && <Crown className="h-6 w-6 text-yellow-500" />}
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Conversions:</span>
                            <span className="font-semibold">{exp.conversions_b}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Conversion Rate:</span>
                            <span className="font-semibold">{exp.conversion_rate_b}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Revenue:</span>
                            <span className="font-semibold">{exp.revenue_b}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Statistical Confidence */}
                    <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Statistical Confidence</span>
                        <span className="text-sm font-bold">{exp.confidence}%</span>
                      </div>
                      <Progress value={exp.confidence} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-2">
                        Sample size: {exp.sample_size.toLocaleString()} users
                        {exp.confidence >= 95 && " • Ready to deploy"}
                        {exp.confidence >= 80 && exp.confidence < 95 && " • Continue monitoring"}
                        {exp.confidence < 80 && " • Need more data"}
                      </p>
                    </div>

                    {exp.status === "draft" && (
                      <Button className="w-full mt-4">
                        <Zap className="mr-2 h-4 w-4" />
                        Launch Experiment
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="insights" className="space-y-6">
              {insights.map((insight, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                      {insight.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <p className="font-medium mb-2">Finding:</p>
                      <p className="text-muted-foreground">{insight.finding}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="font-medium mb-2">Recommended Action:</p>
                      <p className="text-muted-foreground">{insight.action}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-green-600">{insight.impact}</p>
                        <p className="text-sm text-muted-foreground">Projected Revenue Impact</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{insight.confidence}%</p>
                        <p className="text-sm text-muted-foreground">Confidence Level</p>
                      </div>
                    </div>
                    <Button className="w-full">
                      Implement Recommendation
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="variants" className="space-y-6">
              {pricingVariants.map((variant, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{variant.tier} Tier</CardTitle>
                    <CardDescription>{variant.hypothesis}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="p-4 border-2 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Current Price</p>
                        <p className="text-2xl font-bold">{variant.current}</p>
                      </div>
                      <div className="p-4 border-2 border-blue-200 bg-blue-50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Variant A (Lower)</p>
                        <p className="text-2xl font-bold text-blue-600">{variant.variant_a}</p>
                      </div>
                      <div className="p-4 border-2 border-purple-200 bg-purple-50 rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Variant B (Higher)</p>
                        <p className="text-2xl font-bold text-purple-600">{variant.variant_b}</p>
                      </div>
                    </div>
                    <Badge variant={variant.status === "testing" ? "default" : variant.status === "completed" ? "secondary" : "outline"}>
                      {variant.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    Immediate Actions (High Confidence)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border-l-4 border-green-600 bg-green-50">
                    <p className="font-semibold mb-2">✅ Roll out 20% annual discount (94% confidence)</p>
                    <p className="text-sm text-muted-foreground">Expected impact: +$124K ARR within 60 days</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-600 bg-green-50">
                    <p className="font-semibold mb-2">✅ Increase Enterprise tier to $65K (87% confidence)</p>
                    <p className="text-sm text-muted-foreground">Expected impact: +$87K ARR, no conversion loss</p>
                  </div>
                  <div className="p-4 border-l-4 border-green-600 bg-green-50">
                    <p className="font-semibold mb-2">✅ Reduce freemium to 3 contracts/month (72% confidence)</p>
                    <p className="text-sm text-muted-foreground">Expected impact: +$180K ARR from improved conversion</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-orange-600" />
                    Next Experiments to Launch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border-l-4 border-orange-600 bg-orange-50">
                    <p className="font-semibold mb-2">🧪 Test per-seat pricing ($190 vs $250/seat)</p>
                    <p className="text-sm text-muted-foreground">Hypothesis: Premium seat pricing increases perceived value</p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-600 bg-orange-50">
                    <p className="font-semibold mb-2">🧪 Test Starter tier positioning ($4K vs $6K)</p>
                    <p className="text-sm text-muted-foreground">Hypothesis: Lower entry point increases market penetration</p>
                  </div>
                  <div className="p-4 border-l-4 border-orange-600 bg-orange-50">
                    <p className="font-semibold mb-2">🧪 Test quarterly billing option (vs annual only)</p>
                    <p className="text-sm text-muted-foreground">Hypothesis: Lower commitment increases conversion for SMBs</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Combined Revenue Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-slate-50 rounded">
                      <span>Current Annual Discount (15%)</span>
                      <span className="font-semibold">Baseline</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded">
                      <span>+ 20% Discount Rollout</span>
                      <span className="font-semibold text-green-600">+$124K</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded">
                      <span>+ Enterprise Tier Increase</span>
                      <span className="font-semibold text-green-600">+$87K</span>
                    </div>
                    <div className="flex justify-between p-3 bg-green-50 rounded">
                      <span>+ Freemium Limit Tightening</span>
                      <span className="font-semibold text-green-600">+$180K</span>
                    </div>
                    <div className="flex justify-between p-4 bg-blue-600 text-white rounded-lg">
                      <span className="font-bold">Total Projected Impact</span>
                      <span className="font-bold text-xl">+$391K ARR</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6" size="lg">
                    Deploy All Winning Experiments
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}