import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { 
  DollarSign, 
  TrendingUp, 
  Zap,
  Download,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Clock,
  BarChart3
} from "lucide-react";

interface UsageMetric {
  service: string;
  current: number;
  limit: number;
  unit: string;
  cost: number;
  overageCost: number;
}

export default function UsageBillingPage() {
  const [currentPeriod] = useState({
    start: "2026-03-01",
    end: "2026-03-31",
    daysRemaining: 8
  });

  const usageMetrics: UsageMetric[] = [
    {
      service: "Contract Uploads",
      current: 247,
      limit: 500,
      unit: "contracts",
      cost: 0,
      overageCost: 25
    },
    {
      service: "AI Analysis Minutes",
      current: 1840,
      limit: 2000,
      unit: "minutes",
      cost: 0,
      overageCost: 5
    },
    {
      service: "Claude API Calls",
      current: 24547,
      limit: 50000,
      unit: "calls",
      cost: 1247,
      overageCost: 0.051
    },
    {
      service: "Storage",
      current: 342,
      limit: 1000,
      unit: "GB",
      cost: 0,
      overageCost: 0.10
    },
    {
      service: "Active Users",
      current: 47,
      limit: 50,
      unit: "seats",
      cost: 0,
      overageCost: 190
    },
    {
      service: "API Requests",
      current: 87234,
      limit: 100000,
      unit: "requests",
      cost: 0,
      overageCost: 0.001
    }
  ];

  const calculateOverage = (metric: UsageMetric) => {
    if (metric.current <= metric.limit) return 0;
    const overage = metric.current - metric.limit;
    return overage * metric.overageCost;
  };

  const totalOverages = usageMetrics.reduce((sum, m) => sum + calculateOverage(m), 0);
  const totalCosts = usageMetrics.reduce((sum, m) => sum + m.cost, 0);
  const projectedTotal = totalCosts + totalOverages;

  const recentInvoices = [
    { date: "2026-02-01", amount: 25890, status: "paid", items: "Base Plan + $890 overages" },
    { date: "2026-01-01", amount: 25450, status: "paid", items: "Base Plan + $450 overages" },
    { date: "2025-12-01", amount: 25000, status: "paid", items: "Base Plan only" },
    { date: "2025-11-01", amount: 26720, status: "paid", items: "Base Plan + $1,720 overages" }
  ];

  const upsellOpportunities = [
    {
      title: "Upgrade to Unlimited Plan",
      description: "Eliminate all usage limits and save $890/month on overages",
      savings: 890,
      newPrice: 35000,
      recommended: true
    },
    {
      title: "Add Premium Processing Bundle",
      description: "10x faster analysis + priority queue + dedicated GPU",
      savings: 0,
      newPrice: 2000,
      recommended: true
    },
    {
      title: "Increase User Seats to 100",
      description: "Accommodate team growth without per-seat overages",
      savings: 380,
      newPrice: 5000,
      recommended: false
    }
  ];

  return (
    <>
      <Head>
        <title>Usage & Billing - SiriusB iQ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <EnterpriseHeader />

        <main className="container mx-auto px-4 py-8 max-w-[1400px]">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Usage & Billing</h1>
              <p className="text-gray-600">
                Current billing period: {new Date(currentPeriod.start).toLocaleDateString()} - {new Date(currentPeriod.end).toLocaleDateString()}
              </p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
          </div>

          {/* Cost Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Current Month Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">
                  ${projectedTotal.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {currentPeriod.daysRemaining} days remaining
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Base Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">$25,000</div>
                <div className="text-sm text-gray-500 mt-1">Enterprise Tier</div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Overage Charges</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">
                  ${totalOverages.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-1">This billing cycle</div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">API Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">
                  ${totalCosts.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 mt-1">Claude API usage</div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Alert Banner */}
          {totalOverages > 0 && (
            <Card className="mb-8 border-orange-200 bg-orange-50">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                    <div>
                      <h3 className="font-semibold text-orange-900">
                        You're currently exceeding your plan limits
                      </h3>
                      <p className="text-sm text-orange-700">
                        Consider upgrading to avoid ${totalOverages} in overage charges this month
                      </p>
                    </div>
                  </div>
                  <Button>View Upgrade Options</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage Metrics */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Real-Time Usage Tracking</CardTitle>
              <CardDescription>Monitor your consumption against plan limits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {usageMetrics.map((metric, idx) => {
                const percentage = (metric.current / metric.limit) * 100;
                const isOverage = metric.current > metric.limit;
                const overage = calculateOverage(metric);

                return (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="font-medium">{metric.service}</div>
                        {isOverage && (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            Over Limit
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {metric.current.toLocaleString()} / {metric.limit.toLocaleString()} {metric.unit}
                        </div>
                        {isOverage && overage > 0 && (
                          <div className="text-sm text-orange-600">
                            +${overage.toLocaleString()} overage
                          </div>
                        )}
                        {metric.cost > 0 && (
                          <div className="text-sm text-gray-500">
                            ${metric.cost.toLocaleString()} usage cost
                          </div>
                        )}
                      </div>
                    </div>
                    <Progress 
                      value={Math.min(percentage, 100)} 
                      className={isOverage ? "bg-orange-200" : ""}
                    />
                    <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                      <span>{percentage.toFixed(1)}% used</span>
                      {!isOverage && (
                        <span>{(metric.limit - metric.current).toLocaleString()} {metric.unit} remaining</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Tabs defaultValue="opportunities" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="opportunities">
                <TrendingUp className="h-4 w-4 mr-2" />
                Upsells
              </TabsTrigger>
              <TabsTrigger value="invoices">
                <CreditCard className="h-4 w-4 mr-2" />
                Invoices
              </TabsTrigger>
              <TabsTrigger value="forecast">
                <BarChart3 className="h-4 w-4 mr-2" />
                Forecast
              </TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Optimization Opportunities</CardTitle>
                  <CardDescription>
                    Save ${upsellOpportunities.reduce((sum, o) => sum + o.savings, 0)}/month with these upgrades
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upsellOpportunities.map((opp, idx) => (
                    <div key={idx} className={`p-4 border rounded-lg ${opp.recommended ? 'border-blue-200 bg-blue-50' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{opp.title}</h3>
                            {opp.recommended && (
                              <Badge className="bg-blue-600">Recommended</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{opp.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          {opp.savings > 0 && (
                            <div>
                              <div className="text-sm text-gray-600">Monthly Savings</div>
                              <div className="text-2xl font-bold text-green-600">
                                ${opp.savings}
                              </div>
                            </div>
                          )}
                          <div>
                            <div className="text-sm text-gray-600">New Cost</div>
                            <div className="text-2xl font-bold">
                              ${(opp.newPrice / 1000).toFixed(0)}K/mo
                            </div>
                          </div>
                          {opp.savings > 0 && (
                            <div>
                              <div className="text-sm text-gray-600">Annual Savings</div>
                              <div className="text-xl font-bold text-green-600">
                                ${(opp.savings * 12).toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>
                        <Button>Upgrade Now</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="invoices">
              <Card>
                <CardHeader>
                  <CardTitle>Invoice History</CardTitle>
                  <CardDescription>Past billing statements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentInvoices.map((invoice, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">
                            {new Date(invoice.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                          </div>
                          <div className="text-sm text-gray-600">{invoice.items}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold">${invoice.amount.toLocaleString()}</div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              {invoice.status}
                            </Badge>
                          </div>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="forecast">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Forecast</CardTitle>
                  <CardDescription>Projected costs based on current usage trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Next Month (Projected)</div>
                        <div className="text-2xl font-bold">${(projectedTotal * 1.15).toLocaleString()}</div>
                        <div className="flex items-center gap-1 text-sm text-orange-600 mt-1">
                          <ArrowUp className="h-4 w-4" />
                          15% increase
                        </div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Q2 2026 (Projected)</div>
                        <div className="text-2xl font-bold">${(projectedTotal * 3.2).toLocaleString()}</div>
                        <div className="text-sm text-gray-500 mt-1">3-month total</div>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="text-sm text-gray-600 mb-1">Annual (Projected)</div>
                        <div className="text-2xl font-bold">${(projectedTotal * 12).toLocaleString()}</div>
                        <div className="text-sm text-gray-500 mt-1">Based on current usage</div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-blue-900">Optimization Recommendation</h3>
                      </div>
                      <p className="text-sm text-blue-700 mb-3">
                        Based on your growth trajectory, upgrading to the Unlimited Plan would save you 
                        ${((projectedTotal * 12) - 420000).toLocaleString()} annually.
                      </p>
                      <Button size="sm">View Unlimited Plan Details</Button>
                    </div>
                  </div>
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