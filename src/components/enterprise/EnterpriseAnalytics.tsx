/**
 * Enterprise Analytics Component
 * Advanced analytics and insights dashboard
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  Users,
  FileText,
  Clock,
} from "lucide-react";

export function EnterpriseAnalytics() {
  const analyticsData = {
    reportGeneration: {
      total: 1247,
      thisMonth: 89,
      avgTime: "3.2 min",
      trend: "+12%",
    },
    userActivity: {
      activeUsers: 47,
      totalSessions: 892,
      avgSessionTime: "24 min",
      trend: "+8%",
    },
    costSavings: {
      total: 2400000,
      thisMonth: 187000,
      avgPerContract: 9700,
      trend: "+15%",
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Analytics Overview</h2>
        <p className="text-gray-500 mt-1">
          Comprehensive insights into your contract analysis operations
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Report Generation</CardTitle>
                <FileText className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.reportGeneration.total}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {analyticsData.reportGeneration.thisMonth} this month
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  {analyticsData.reportGeneration.trend}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">User Activity</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData.userActivity.activeUsers}</div>
                <p className="text-xs text-gray-500 mt-1">
                  {analyticsData.userActivity.totalSessions} sessions
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  {analyticsData.userActivity.trend}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
                <TrendingUp className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${(analyticsData.costSavings.total / 1000000).toFixed(1)}M
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ${(analyticsData.costSavings.thisMonth / 1000).toFixed(0)}K this month
                </p>
                <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  {analyticsData.costSavings.trend}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Usage Trends</CardTitle>
              <CardDescription>Contract analysis activity over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                <BarChart3 className="h-16 w-16 opacity-20" />
                <span className="ml-4">Chart visualization would go here</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>API calls and rate limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total API Calls</span>
                  <Badge>45,234</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Response Time</span>
                  <Badge variant="secondary">234ms</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Success Rate</span>
                  <Badge variant="default">99.7%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>System performance and efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Processing Time</span>
                  <Badge>{analyticsData.reportGeneration.avgTime}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average Session Duration</span>
                  <Badge variant="secondary">{analyticsData.userActivity.avgSessionTime}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Completion Rate</span>
                  <Badge variant="default">94.3%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Savings Analysis</CardTitle>
              <CardDescription>Cost savings breakdown and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Savings Identified</span>
                  <Badge className="text-base">
                    ${(analyticsData.costSavings.total / 1000000).toFixed(2)}M
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average per Contract</span>
                  <Badge variant="secondary">
                    ${analyticsData.costSavings.avgPerContract.toLocaleString()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Month-over-Month Growth</span>
                  <Badge variant="default" className="text-green-600">
                    +{analyticsData.costSavings.trend}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}