import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Users,
  Building2,
  TrendingUp,
  Shield,
  Key,
  Database,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  BarChart3,
  FileText,
  Settings
} from "lucide-react";
import { authService } from "@/services/authService";
import { organizationService } from "@/services/organizationService";
import { auditService } from "@/services/auditService";

interface DashboardMetrics {
  users: { total: number; active: number; trend: number };
  apiCalls: { total: number; today: number; trend: number };
  storage: { used: number; total: number; trend: number };
  incidents: { open: number; resolved: number; critical: number };
}

export function EnterpriseDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    users: { total: 0, active: 0, trend: 0 },
    apiCalls: { total: 0, today: 0, trend: 0 },
    storage: { used: 0, total: 100, trend: 0 },
    incidents: { open: 0, resolved: 0, critical: 0 }
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (!user?.organization_id) return;

      // Load audit logs
      const logs = await auditService.getAuditLogs({
        organizationId: user.organization_id,
        limit: 10
      });
      setRecentActivity(logs);

      // Mock metrics (would come from actual usage tracking in production)
      setMetrics({
        users: { total: 142, active: 89, trend: 12 },
        apiCalls: { total: 1847293, today: 45829, trend: 8 },
        storage: { used: 67.5, total: 100, trend: 5 },
        incidents: { open: 3, resolved: 28, critical: 1 }
      });

      setLoading(false);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getActivityIcon = (action: string) => {
    if (action.includes("login")) return <Users className="h-4 w-4" />;
    if (action.includes("api")) return <Key className="h-4 w-4" />;
    if (action.includes("data")) return <Database className="h-4 w-4" />;
    return <Activity className="h-4 w-4" />;
  };

  const getTrendColor = (trend: number) => {
    if (trend > 0) return "text-green-500";
    if (trend < 0) return "text-red-500";
    return "text-gray-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.users.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className={getTrendColor(metrics.users.trend)}>
                {metrics.users.trend > 0 ? "+" : ""}{metrics.users.trend}%
              </span>
              {" "}from last month
            </p>
            <div className="mt-2">
              <Badge variant="secondary">{metrics.users.active} active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Calls</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.apiCalls.total)}</div>
            <p className="text-xs text-muted-foreground">
              <span className={getTrendColor(metrics.apiCalls.trend)}>
                {metrics.apiCalls.trend > 0 ? "+" : ""}{metrics.apiCalls.trend}%
              </span>
              {" "}from last month
            </p>
            <div className="mt-2">
              <Badge variant="secondary">{formatNumber(metrics.apiCalls.today)} today</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.storage.used}GB</div>
            <p className="text-xs text-muted-foreground">
              of {metrics.storage.total}GB available
            </p>
            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all"
                style={{ width: `${(metrics.storage.used / metrics.storage.total) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.incidents.open}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.incidents.resolved} resolved this month
            </p>
            <div className="mt-2 flex gap-2">
              {metrics.incidents.critical > 0 && (
                <Badge variant="destructive">
                  {metrics.incidents.critical} critical
                </Badge>
              )}
              {metrics.incidents.critical === 0 && (
                <Badge variant="secondary" className="bg-green-500 text-white">
                  All clear
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest actions across your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <div className="mt-1">{getActivityIcon(activity.action || "")}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <Badge variant="outline" className="text-xs">
                          {activity.resource_type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        User: {activity.user_id?.substring(0, 8)}...
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
                {recentActivity.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No recent activity
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>API calls over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Analytics charts coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Optimization</CardTitle>
                <CardDescription>Monthly spending trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <DollarSign className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Cost analytics coming soon</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>
                Current certification and audit status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">SOC 2 Type II</p>
                      <p className="text-sm text-muted-foreground">Certified until Dec 2026</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-500 text-white">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">HIPAA Compliance</p>
                      <p className="text-sm text-muted-foreground">Last audit: Jan 2026</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-500 text-white">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">ISO 27001</p>
                      <p className="text-sm text-muted-foreground">Audit scheduled for Mar 2026</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-500 text-white">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Settings</CardTitle>
              <CardDescription>
                Manage your organization configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team Members
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Key className="h-4 w-4 mr-2" />
                  API Keys & Integrations
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Data Retention Policies
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Advanced Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}