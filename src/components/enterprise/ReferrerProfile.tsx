/**
 * Referrer Profile Dashboard
 * Detailed referrer performance analytics
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
  Target,
  Award,
  Share2,
  Link as LinkIcon,
  Mail,
  Download,
  Info,
  ChevronRight,
} from "lucide-react";

interface ReferralMetric {
  month: string;
  clicks: number;
  signups: number;
  conversions: number;
  revenue: number;
  commission: number;
}

interface TopReferral {
  name: string;
  company: string;
  value: number;
  status: "Active" | "Churned" | "Trial";
  joinDate: string;
}

export function ReferrerProfile() {
  const [timeRange, setTimeRange] = useState<string>("12m");
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const metrics: ReferralMetric[] = [
    { month: "Jan", clicks: 342, signups: 28, conversions: 12, revenue: 36000, commission: 5400 },
    { month: "Feb", clicks: 389, signups: 31, conversions: 15, revenue: 45000, commission: 6750 },
    { month: "Mar", clicks: 412, signups: 35, conversions: 18, revenue: 54000, commission: 8100 },
    { month: "Apr", clicks: 456, signups: 38, conversions: 20, revenue: 60000, commission: 9000 },
    { month: "May", clicks: 501, signups: 42, conversions: 22, revenue: 66000, commission: 9900 },
    { month: "Jun", clicks: 478, signups: 40, conversions: 21, revenue: 63000, commission: 9450 },
  ];

  const topReferrals: TopReferral[] = [
    { name: "Acme Corp", company: "Healthcare", value: 12000, status: "Active", joinDate: "Jan 2026" },
    { name: "TechStart Inc", company: "Technology", value: 9500, status: "Active", joinDate: "Feb 2026" },
    { name: "Global Benefits", company: "Insurance", value: 8200, status: "Trial", joinDate: "Mar 2026" },
    { name: "HR Solutions", company: "HR Tech", value: 7800, status: "Active", joinDate: "Jan 2026" },
    { name: "HealthFirst", company: "Healthcare", value: 6500, status: "Churned", joinDate: "Nov 2025" },
  ];

  const totalMetrics = {
    clicks: metrics.reduce((sum, m) => sum + m.clicks, 0),
    signups: metrics.reduce((sum, m) => sum + m.signups, 0),
    conversions: metrics.reduce((sum, m) => sum + m.conversions, 0),
    revenue: metrics.reduce((sum, m) => sum + m.revenue, 0),
    commission: metrics.reduce((sum, m) => sum + m.commission, 0),
  };

  const conversionRate = ((totalMetrics.conversions / totalMetrics.signups) * 100).toFixed(1);
  const clickToSignup = ((totalMetrics.signups / totalMetrics.clicks) * 100).toFixed(1);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      Active: "bg-green-100 text-green-800",
      Trial: "bg-blue-100 text-blue-800",
      Churned: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Referrer Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Track your referral performance and earnings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              Total Clicks
              <div className="relative group ml-auto">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Unique clicks on your referral link
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalMetrics.clicks.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last period</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Sign-ups
              <div className="relative group ml-auto">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Users who created an account
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalMetrics.signups}</div>
            <p className="text-xs text-muted-foreground mt-1">{clickToSignup}% of clicks</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4" />
              Conversions
              <div className="relative group ml-auto">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Sign-ups who became paying customers
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalMetrics.conversions}</div>
            <p className="text-xs text-muted-foreground mt-1">{conversionRate}% conversion rate</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue
              <div className="relative group ml-auto">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Total revenue from your referrals
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(totalMetrics.revenue / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">ARR generated</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4 text-green-600" />
              Your Earnings
              <div className="relative group ml-auto">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  15% commission on all referrals
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              ${(totalMetrics.commission / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">Next payout: Apr 1</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="referrals">Top Referrals</TabsTrigger>
          <TabsTrigger value="tools">Referral Tools</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>
                Hover over bars for detailed metrics. Click to drill down.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.map((metric) => (
                  <div
                    key={metric.month}
                    className="space-y-2 cursor-pointer"
                    onMouseEnter={() => setHoveredBar(metric.month)}
                    onMouseLeave={() => setHoveredBar(null)}
                    onClick={() =>
                      setSelectedMetric(selectedMetric === metric.month ? null : metric.month)
                    }
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{metric.month}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">
                          {metric.conversions} conversions
                        </span>
                        <span className="font-semibold text-green-600">
                          ${(metric.commission / 1000).toFixed(1)}K
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all"
                          style={{
                            width: `${(metric.commission / 10000) * 100}%`,
                          }}
                        />
                      </div>

                      {hoveredBar === metric.month && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-3 rounded shadow-lg text-sm whitespace-nowrap z-10">
                          <div className="font-semibold">{metric.month} 2026</div>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2">
                            <div className="text-gray-300">Clicks:</div>
                            <div className="text-right">{metric.clicks}</div>
                            <div className="text-gray-300">Sign-ups:</div>
                            <div className="text-right">{metric.signups}</div>
                            <div className="text-gray-300">Conversions:</div>
                            <div className="text-right">{metric.conversions}</div>
                            <div className="text-gray-300">Revenue:</div>
                            <div className="text-right">
                              ${(metric.revenue / 1000).toFixed(0)}K
                            </div>
                            <div className="text-green-400">Commission:</div>
                            <div className="text-right text-green-400">
                              ${(metric.commission / 1000).toFixed(1)}K
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {selectedMetric === metric.month && (
                      <div className="mt-2 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950">
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Click-through</div>
                            <div className="text-lg font-semibold">
                              {((metric.signups / metric.clicks) * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Conversion</div>
                            <div className="text-lg font-semibold">
                              {((metric.conversions / metric.signups) * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Avg Deal Size</div>
                            <div className="text-lg font-semibold">
                              ${(metric.revenue / metric.conversions / 1000).toFixed(1)}K
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Commission Rate</div>
                            <div className="text-lg font-semibold">15%</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Funnel Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Visual breakdown of your referral funnel</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">Clicks</div>
                  <div className="flex-1 h-12 bg-blue-100 rounded-lg overflow-hidden">
                    <div className="h-full w-full bg-blue-500 flex items-center justify-end pr-4">
                      <span className="text-white font-semibold">
                        {totalMetrics.clicks.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">Sign-ups</div>
                  <div className="flex-1 h-12 bg-purple-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-purple-500 flex items-center justify-end pr-4"
                      style={{
                        width: `${(totalMetrics.signups / totalMetrics.clicks) * 100}%`,
                      }}
                    >
                      <span className="text-white font-semibold">{totalMetrics.signups}</span>
                    </div>
                  </div>
                  <div className="w-20 text-sm text-muted-foreground">{clickToSignup}%</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-32 text-sm font-medium">Conversions</div>
                  <div className="flex-1 h-12 bg-green-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-green-500 flex items-center justify-end pr-4"
                      style={{
                        width: `${(totalMetrics.conversions / totalMetrics.clicks) * 100}%`,
                      }}
                    >
                      <span className="text-white font-semibold">{totalMetrics.conversions}</span>
                    </div>
                  </div>
                  <div className="w-20 text-sm text-muted-foreground">{conversionRate}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Referrals</CardTitle>
              <CardDescription>Your highest-value customer referrals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topReferrals.map((referral, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{referral.name}</div>
                        <div className="text-sm text-muted-foreground">{referral.company}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold">
                          ${(referral.value / 1000).toFixed(1)}K/yr
                        </div>
                        <div className="text-sm text-muted-foreground">{referral.joinDate}</div>
                      </div>
                      <Badge className={getStatusColor(referral.status)}>
                        {referral.status}
                      </Badge>
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <CardTitle>Referral Tools</CardTitle>
              <CardDescription>Share your referral link and track performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Referral Link</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value="https://siriusb.ai/ref/YOUR_CODE"
                    className="flex-1 px-3 py-2 border rounded-lg bg-gray-50"
                  />
                  <Button>
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Template
                </Button>
                <Button variant="outline" className="justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Social Share
                </Button>
                <Button variant="outline" className="justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Marketing Kit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>Track your commission payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "Mar 1, 2026", amount: 9450, status: "Paid" },
                  { date: "Feb 1, 2026", amount: 8100, status: "Paid" },
                  { date: "Jan 1, 2026", amount: 6750, status: "Paid" },
                  { date: "Apr 1, 2026", amount: 9900, status: "Pending" },
                ].map((payout, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <div className="font-semibold">{payout.date}</div>
                      <div className="text-sm text-muted-foreground">Monthly commission</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-semibold text-lg">
                          ${(payout.amount / 1000).toFixed(1)}K
                        </div>
                      </div>
                      <Badge
                        className={
                          payout.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {payout.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}