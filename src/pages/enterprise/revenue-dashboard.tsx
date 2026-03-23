import { useState } from "react";
import Head from "next/head";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnterpriseHeader } from "@/components/enterprise/EnterpriseHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Zap,
  Crown,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Package,
  CreditCard,
  BarChart3
} from "lucide-react";

export default function RevenueDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const revenueData = {
    mrr: 47500,
    arr: 570000,
    growth: 23.5,
    churn: 2.1,
    ltv: 156000,
    cac: 8200,
    activeSeats: 247,
    totalSeats: 300,
    avgRevenuePerUser: 192.31,
    expansionRevenue: 12400,
    contractionRevenue: 1200
  };

  const addOns = [
    { name: "Premium AI Processing", users: 12, mrr: 24000, status: "active" },
    { name: "Advanced Analytics Pack", users: 8, mrr: 8000, status: "active" },
    { name: "Custom Integration", users: 3, mrr: 9000, status: "active" },
    { name: "Multi-Region Storage", users: 2, mrr: 6000, status: "active" },
    { name: "White-Label Reseller", users: 1, mrr: 5000, status: "active" }
  ];

  const upcomingRenewals = [
    { company: "Acme Corp", value: 25000, date: "2026-04-15", risk: "low" },
    { company: "TechCo Industries", value: 50000, date: "2026-04-22", risk: "medium" },
    { company: "Global Pharma", value: 75000, date: "2026-05-01", risk: "low" },
    { company: "Finance Plus", value: 30000, date: "2026-05-10", risk: "high" }
  ];

  const upsellOpportunities = [
    { 
      company: "Acme Corp", 
      opportunity: "Upgrade to Enterprise Plus",
      potential: 25000,
      probability: 75,
      action: "Contact renewal team"
    },
    { 
      company: "StartupXYZ", 
      opportunity: "Add Premium Processing",
      potential: 12000,
      probability: 60,
      action: "Schedule demo"
    },
    { 
      company: "MidMarket Co", 
      opportunity: "Custom AI Model Training",
      potential: 50000,
      probability: 40,
      action: "Send proposal"
    }
  ];

  return (
    <>
      <Head>
        <title>Revenue Operations - SiriusB iQ</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
        <EnterpriseHeader />

        <main className="container mx-auto px-4 py-8 max-w-[1400px]">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Revenue Operations</h1>
              <p className="text-gray-600">Real-time revenue metrics and growth opportunities</p>
            </div>
            <div className="flex gap-2">
              <Button variant={selectedPeriod === "month" ? "default" : "outline"} onClick={() => setSelectedPeriod("month")}>
                Month
              </Button>
              <Button variant={selectedPeriod === "quarter" ? "default" : "outline"} onClick={() => setSelectedPeriod("quarter")}>
                Quarter
              </Button>
              <Button variant={selectedPeriod === "year" ? "default" : "outline"} onClick={() => setSelectedPeriod("year")}>
                Year
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-green-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">MRR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">${(revenueData.mrr / 1000).toFixed(1)}K</div>
                <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                  <ArrowUp className="h-4 w-4" />
                  {revenueData.growth}% vs last month
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">ARR</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">${(revenueData.arr / 1000).toFixed(0)}K</div>
                <div className="text-sm text-gray-500 mt-1">Annual Run Rate</div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">LTV / CAC</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">
                  {(revenueData.ltv / revenueData.cac).toFixed(1)}x
                </div>
                <div className="text-sm text-gray-500 mt-1">Efficiency Ratio</div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-gray-600">Net Churn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{revenueData.churn}%</div>
                <div className="text-sm text-green-600 mt-1">Target: &lt;5%</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Expansion Revenue</CardTitle>
                <CardDescription>Upsells and add-ons this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600 mb-4">
                  ${(revenueData.expansionRevenue / 1000).toFixed(1)}K
                </div>
                <div className="space-y-3">
                  {addOns.slice(0, 3).map((addon, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium">{addon.name}</div>
                        <div className="text-sm text-gray-600">{addon.users} customers</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">${(addon.mrr / 1000).toFixed(1)}K/mo</div>
                        <Badge className="bg-green-600 text-white">Active</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seat Utilization</CardTitle>
                <CardDescription>Current license usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold">{revenueData.activeSeats}</span>
                    <span className="text-gray-500">/ {revenueData.totalSeats} seats</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${(revenueData.activeSeats / revenueData.totalSeats) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {((revenueData.activeSeats / revenueData.totalSeats) * 100).toFixed(1)}% utilized
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-semibold text-blue-900">Upsell Opportunity</div>
                      <div className="text-sm text-blue-700">
                        53 unused seats = ${((revenueData.totalSeats - revenueData.activeSeats) * 190).toLocaleString()}/month potential
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="renewals" className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="renewals">
                <CreditCard className="h-4 w-4 mr-2" />
                Renewals
              </TabsTrigger>
              <TabsTrigger value="upsells">
                <TrendingUp className="h-4 w-4 mr-2" />
                Upsells
              </TabsTrigger>
              <TabsTrigger value="addons">
                <Package className="h-4 w-4 mr-2" />
                Add-Ons
              </TabsTrigger>
            </TabsList>

            <TabsContent value="renewals">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Renewals (Next 60 Days)</CardTitle>
                  <CardDescription>
                    ${upcomingRenewals.reduce((sum, r) => sum + r.value, 0).toLocaleString()} total ARR at risk
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingRenewals.map((renewal, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{renewal.company}</div>
                          <div className="text-sm text-gray-600">Renews: {new Date(renewal.date).toLocaleDateString()}</div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold">${(renewal.value / 1000).toFixed(0)}K</div>
                            <Badge 
                              variant="outline"
                              className={
                                renewal.risk === "low" ? "bg-green-50 text-green-700 border-green-200" :
                                renewal.risk === "medium" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {renewal.risk} risk
                            </Badge>
                          </div>
                          <Button size="sm">Contact</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upsells">
              <Card>
                <CardHeader>
                  <CardTitle>High-Value Upsell Opportunities</CardTitle>
                  <CardDescription>
                    ${upsellOpportunities.reduce((sum, u) => sum + u.potential, 0).toLocaleString()} weighted pipeline
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upsellOpportunities.map((opp, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <div className="font-medium">{opp.company}</div>
                            <div className="text-sm text-blue-600">{opp.opportunity}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">
                              ${(opp.potential / 1000).toFixed(0)}K
                            </div>
                            <div className="text-sm text-gray-600">{opp.probability}% probability</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="bg-blue-50">
                            Weighted: ${((opp.potential * opp.probability) / 100 / 1000).toFixed(1)}K
                          </Badge>
                          <Button size="sm" variant="outline">
                            {opp.action}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addons">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Add-On</CardTitle>
                  <CardDescription>Performance of premium features</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {addOns.map((addon, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium">{addon.name}</div>
                          <div className="text-sm text-gray-600">
                            {addon.users} customers • ${(addon.mrr / addon.users).toFixed(0)}/user/mo
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">${(addon.mrr / 1000).toFixed(1)}K</div>
                          <div className="text-sm text-green-600">MRR</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Crown className="h-6 w-6 text-green-600" />
                        <div>
                          <div className="font-semibold text-green-900">Total Add-On Revenue</div>
                          <div className="text-sm text-green-700">32% of total MRR</div>
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-green-600">
                        ${(addOns.reduce((sum, a) => sum + a.mrr, 0) / 1000).toFixed(1)}K
                      </div>
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