/**
 * Enterprise Dashboard Component
 * Main dashboard for enterprise users
 */

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  ArrowUpRight,
  Download,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface DashboardMetrics {
  totalContracts: number;
  activeReports: number;
  teamMembers: number;
  monthlySavings: number;
  avgProcessingTime: number;
  completionRate: number;
}

export function EnterpriseDashboard() {
  const [metrics] = useState<DashboardMetrics>({
    totalContracts: 247,
    activeReports: 18,
    teamMembers: 12,
    monthlySavings: 487000,
    avgProcessingTime: 3.2,
    completionRate: 94,
  });

  const recentActivity = [
    {
      id: 1,
      type: "report",
      title: "Q4 Contract Analysis Report Generated",
      user: "Sarah Johnson",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 2,
      type: "contract",
      title: "New Contract Uploaded: CVS Caremark Agreement",
      user: "Mike Chen",
      time: "4 hours ago",
      status: "processing",
    },
    {
      id: 3,
      type: "team",
      title: "Team Member Added: Alex Martinez",
      user: "Admin",
      time: "1 day ago",
      status: "completed",
    },
    {
      id: 4,
      type: "report",
      title: "Weekly Executive Summary Sent",
      user: "System",
      time: "2 days ago",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold">Enterprise Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Monitor your contract analysis operations and team performance
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Contracts
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalContracts}</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Active Reports
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeReports}</div>
            <p className="text-xs text-blue-600 mt-2 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {metrics.activeReports} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Team Members
            </CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.teamMembers}</div>
            <p className="text-xs text-gray-500 mt-2">Active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Monthly Savings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(metrics.monthlySavings / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Avg Processing Time
            </CardTitle>
            <Clock className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.avgProcessingTime}m</div>
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              15% faster
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Completion Rate
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.completionRate}%</div>
            <Progress value={metrics.completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your team and system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activity.type === "report"
                        ? "bg-blue-100 dark:bg-blue-900/20"
                        : activity.type === "contract"
                        ? "bg-purple-100 dark:bg-purple-900/20"
                        : "bg-green-100 dark:bg-green-900/20"
                    }`}
                  >
                    {activity.type === "report" ? (
                      <FileText className="h-4 w-4 text-blue-600" />
                    ) : activity.type === "contract" ? (
                      <BarChart3 className="h-4 w-4 text-purple-600" />
                    ) : (
                      <Users className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      By {activity.user} • {activity.time}
                    </p>
                  </div>
                  <Badge
                    variant={activity.status === "completed" ? "default" : "secondary"}
                    className="shrink-0"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Manage Team
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Contract analysis trends over time</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <ArrowUpRight className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-gray-500">
            Chart visualization would go here
          </div>
        </CardContent>
      </Card>
    </div>
  );
}