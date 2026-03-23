import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Activity,
  Clock,
  DollarSign,
  Zap,
  Database
} from "lucide-react";

interface AnalyticsData {
  revenue: { current: number; previous: number; trend: number };
  users: { active: number; new: number; trend: number };
  apiCalls: { total: number; average: number; trend: number };
  performance: { uptime: number; latency: number; trend: number };
}

export function EnterpriseAnalytics() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    revenue: { current: 125000, previous: 98000, trend: 27.5 },
    users: { active: 1847, new: 234, trend: 15.3 },
    apiCalls: { total: 4829384, average: 160979, trend: 8.7 },
    performance: { uptime: 99.97, latency: 45, trend: -12.4 }
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-500";
    if (trend < 0) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
          <TabsList>
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
            <TabsTrigger value="90d">90 Days</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatNumber(analytics.revenue.current)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className={`h-3 w-3 ${getTrendColor(analytics.revenue.trend)}`} />
              <span className={getTrendColor(analytics.revenue.trend)}>
                {analytics.revenue.trend > 0 ? "+" : ""}{analytics.revenue.trend}%
              </span>
              {" "}vs last period
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.users.active)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className={`h-3 w-3 ${getTrendColor(analytics.users.trend)}`} />
              <span className={getTrendColor(analytics.users.trend)}>
                {analytics.users.new} new this period
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.apiCalls.total)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Activity className={`h-3 w-3 ${getTrendColor(analytics.apiCalls.trend)}`} />
              <span className={getTrendColor(analytics.apiCalls.trend)}>
                {formatNumber(analytics.apiCalls.average)}/day avg
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow border-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.performance.uptime}%</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Clock className={`h-3 w-3 text-green-500`} />
              <span className="text-green-500">
                {analytics.performance.latency}ms avg latency
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Usage Trends</CardTitle>
            <CardDescription>API calls and active sessions over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 mx-auto mb-4 text-purple-500 opacity-50" />
                <p className="text-muted-foreground">Advanced analytics visualization</p>
                <p className="text-sm text-muted-foreground">Real-time data streaming</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
            <CardDescription>User activity by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg">
              <div className="text-center">
                <Database className="h-16 w-16 mx-auto mb-4 text-blue-500 opacity-50" />
                <p className="text-muted-foreground">Global distribution map</p>
                <p className="text-sm text-muted-foreground">Multi-region deployment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}