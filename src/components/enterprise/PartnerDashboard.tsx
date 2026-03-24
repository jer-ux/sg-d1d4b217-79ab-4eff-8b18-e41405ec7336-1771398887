/**
 * Partner Analytics Dashboard
 * Real-time partner performance metrics with interactive drill-downs
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  Users,
  DollarSign,
  Award,
  ArrowUpRight,
  Info,
  Download,
} from "lucide-react";

interface PartnerMetric {
  partnerId: string;
  name: string;
  tier: "Platinum" | "Gold" | "Silver" | "Bronze";
  referrals: number;
  conversions: number;
  revenue: number;
  commission: number;
  conversionRate: number;
  trend: "up" | "down" | "stable";
}

export function PartnerDashboard() {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const partners: PartnerMetric[] = [
    {
      partnerId: "P001",
      name: "TechConsult Pro",
      tier: "Platinum",
      referrals: 142,
      conversions: 89,
      revenue: 267000,
      commission: 40050,
      conversionRate: 62.7,
      trend: "up",
    },
    {
      partnerId: "P002",
      name: "HealthCare Solutions",
      tier: "Gold",
      referrals: 98,
      conversions: 54,
      revenue: 162000,
      commission: 24300,
      conversionRate: 55.1,
      trend: "up",
    },
    {
      partnerId: "P003",
      name: "Benefits Advisors Inc",
      tier: "Gold",
      referrals: 76,
      conversions: 41,
      revenue: 123000,
      commission: 18450,
      conversionRate: 53.9,
      trend: "stable",
    },
    {
      partnerId: "P004",
      name: "HR Connect",
      tier: "Silver",
      referrals: 52,
      conversions: 24,
      revenue: 72000,
      commission: 10800,
      conversionRate: 46.2,
      trend: "down",
    },
  ];

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      Platinum: "bg-purple-100 text-purple-800 border-purple-300",
      Gold: "bg-yellow-100 text-yellow-800 border-yellow-300",
      Silver: "bg-gray-100 text-gray-800 border-gray-300",
      Bronze: "bg-orange-100 text-orange-800 border-orange-300",
    };
    return colors[tier] || "bg-gray-100 text-gray-800";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === "down") return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
    return <div className="h-4 w-4 border-t-2 border-gray-400" />;
  };

  const totalMetrics = {
    referrals: partners.reduce((sum, p) => sum + p.referrals, 0),
    conversions: partners.reduce((sum, p) => sum + p.conversions, 0),
    revenue: partners.reduce((sum, p) => sum + p.revenue, 0),
    commission: partners.reduce((sum, p) => sum + p.commission, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Partner Analytics</h2>
          <p className="text-muted-foreground mt-1">
            Track partner performance and commission payouts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onMouseEnter={() => setHoveredMetric("referrals")}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Referrals
              <div className="relative group ml-auto">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                {hoveredMetric === "referrals" && (
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
                    Number of referred prospects across all partners
                  </div>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalMetrics.referrals}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last period
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onMouseEnter={() => setHoveredMetric("conversions")}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4" />
              Conversions
              <div className="relative group ml-auto">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                {hoveredMetric === "conversions" && (
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
                    Referrals that became paying customers
                  </div>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalMetrics.conversions}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {((totalMetrics.conversions / totalMetrics.referrals) * 100).toFixed(1)}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onMouseEnter={() => setHoveredMetric("revenue")}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Generated Revenue
              <div className="relative group ml-auto">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                {hoveredMetric === "revenue" && (
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
                    Total revenue from partner referrals
                  </div>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(totalMetrics.revenue / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ARR from partners
            </p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onMouseEnter={() => setHoveredMetric("commission")}
          onMouseLeave={() => setHoveredMetric(null)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4" />
              Total Commission
              <div className="relative group ml-auto">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                {hoveredMetric === "commission" && (
                  <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-10">
                    Commissions owed to partners
                  </div>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(totalMetrics.commission / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              15% avg commission rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Partner Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Partner Performance</CardTitle>
          <CardDescription>
            Click on a partner row to view detailed analytics and drill-down metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {partners.map((partner) => (
              <div
                key={partner.partnerId}
                className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                  selectedPartner === partner.partnerId
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-200"
                }`}
                onClick={() =>
                  setSelectedPartner(
                    selectedPartner === partner.partnerId ? null : partner.partnerId
                  )
                }
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div>
                      <h4 className="font-semibold">{partner.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getTierColor(partner.tier)} variant="outline">
                          {partner.tier}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          ID: {partner.partnerId}
                        </span>
                      </div>
                    </div>
                  </div>
                  {getTrendIcon(partner.trend)}
                </div>

                <div className="grid grid-cols-5 gap-4">
                  <div className="relative group">
                    <div className="text-xs text-muted-foreground mb-1">Referrals</div>
                    <div className="text-xl font-bold">{partner.referrals}</div>
                    <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {((partner.referrals / totalMetrics.referrals) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="text-xs text-muted-foreground mb-1">Conversions</div>
                    <div className="text-xl font-bold text-green-600">{partner.conversions}</div>
                    <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {partner.conversionRate.toFixed(1)}% conversion rate
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="text-xs text-muted-foreground mb-1">Revenue</div>
                    <div className="text-xl font-bold">
                      ${(partner.revenue / 1000).toFixed(0)}K
                    </div>
                    <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      ${partner.revenue.toLocaleString()} total
                    </div>
                  </div>
                  <div className="relative group">
                    <div className="text-xs text-muted-foreground mb-1">Commission</div>
                    <div className="text-xl font-bold text-blue-600">
                      ${(partner.commission / 1000).toFixed(1)}K
                    </div>
                    <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {((partner.commission / partner.revenue) * 100).toFixed(1)}% commission rate
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Conv. Rate</div>
                    <div className="h-8 bg-gray-100 rounded overflow-hidden mt-1">
                      <div
                        className="h-full bg-green-500 flex items-center justify-end pr-2"
                        style={{ width: `${partner.conversionRate}%` }}
                      >
                        <span className="text-xs font-semibold text-white">
                          {partner.conversionRate.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedPartner === partner.partnerId && (
                  <div className="mt-4 pt-4 border-t">
                    <Tabs defaultValue="breakdown" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                        <TabsTrigger value="timeline">Timeline</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                      </TabsList>
                      <TabsContent value="breakdown" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Active Referrals</div>
                            <div className="font-semibold">
                              {partner.referrals - partner.conversions}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Avg Deal Size</div>
                            <div className="font-semibold">
                              ${(partner.revenue / partner.conversions).toLocaleString(undefined, {
                                maximumFractionDigits: 0,
                              })}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Days to Convert</div>
                            <div className="font-semibold">14 days avg</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Lifetime Value</div>
                            <div className="font-semibold">
                              ${(partner.revenue * 3).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="timeline">
                        <div className="h-32 flex items-center justify-center text-muted-foreground">
                          Performance timeline chart would go here
                        </div>
                      </TabsContent>
                      <TabsContent value="details">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Partner Since</span>
                            <span className="font-medium">Jan 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payout Method</span>
                            <span className="font-medium">ACH Transfer</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Next Payout</span>
                            <span className="font-medium">Apr 1, 2026</span>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}