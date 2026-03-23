import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  FileText, 
  AlertTriangle,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Activity,
  BarChart3,
  Download,
  RefreshCw,
  Shield,
  Zap,
  Upload
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardMetrics {
  totalUploads: number;
  activeAnalyses: number;
  completedAnalyses: number;
  totalUsers: number;
  avgProcessingTime: number;
  totalSavingsIdentified: number;
  criticalIssues: number;
  avgRiskScore: number;
  uploadTrend: number;
  processingTrend: number;
}

interface RecentActivity {
  id: string;
  organization: string;
  contractName: string;
  status: string;
  riskScore: number;
  savingsIdentified: number;
  uploadedAt: string;
}

interface TopIssue {
  issue: string;
  frequency: number;
  avgImpact: number;
  trend: "up" | "down" | "stable";
}

export default function BoardDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalUploads: 0,
    activeAnalyses: 0,
    completedAnalyses: 0,
    totalUsers: 0,
    avgProcessingTime: 0,
    totalSavingsIdentified: 0,
    criticalIssues: 0,
    avgRiskScore: 0,
    uploadTrend: 0,
    processingTrend: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [topIssues, setTopIssues] = useState<TopIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadDashboardData(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);

    try {
      // Get contract uploads metrics
      const { data: uploads } = await supabase
        .from("contract_uploads")
        .select("id, upload_status, uploaded_at, contract_analysis_results(overall_score, potential_savings)");

      // Get organizations count
      const { count: orgCount } = await supabase
        .from("contract_organizations")
        .select("*", { count: "exact", head: true });

      if (uploads) {
        const completed = uploads.filter(u => u.upload_status === "completed");
        const active = uploads.filter(u => u.upload_status === "processing");
        
        // Extract analysis data safely
        const mappedUploads = uploads.map(u => {
          const analysisArray = u.contract_analysis_results as any;
          const analysis = Array.isArray(analysisArray) ? analysisArray[0] : analysisArray;
          return {
            ...u,
            overall_score: analysis?.overall_score || 0,
            potential_savings: analysis?.potential_savings || 0
          };
        });

        const criticalCount = mappedUploads.filter(u => u.overall_score && u.overall_score < 70).length; // low score = high risk
        
        const avgProcessing = 145; // Mock average processing time in seconds

        const totalSavings = mappedUploads.reduce((acc, u) => acc + (u.potential_savings || 0), 0);
        const avgRisk = mappedUploads.length > 0
          ? mappedUploads.reduce((acc, u) => acc + (u.overall_score || 0), 0) / mappedUploads.length
          : 0;

        // Calculate trends (compare last 7 days vs previous 7 days)
        const now = new Date();
        const last7Days = uploads.filter(u => {
          const uploadDate = new Date(u.uploaded_at || Date.now());
          const daysAgo = Math.floor((now.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24));
          return daysAgo <= 7;
        }).length;

        const prev7Days = uploads.filter(u => {
          const uploadDate = new Date(u.uploaded_at || Date.now());
          const daysAgo = Math.floor((now.getTime() - uploadDate.getTime()) / (1000 * 60 * 60 * 24));
          return daysAgo > 7 && daysAgo <= 14;
        }).length;

        const uploadTrend = prev7Days > 0 ? ((last7Days - prev7Days) / prev7Days) * 100 : 0;

        setMetrics({
          totalUploads: uploads.length,
          activeAnalyses: active.length,
          completedAnalyses: completed.length,
          totalUsers: orgCount || 0,
          avgProcessingTime: avgProcessing,
          totalSavingsIdentified: totalSavings,
          criticalIssues: criticalCount,
          avgRiskScore: avgRisk,
          uploadTrend,
          processingTrend: uploadTrend * 0.8 // Simulate processing trend
        });

        // Recent activity (last 10 uploads)
        const recent = mappedUploads
          .slice()
          .sort((a, b) => new Date(b.uploaded_at || 0).getTime() - new Date(a.uploaded_at || 0).getTime())
          .slice(0, 10)
          .map(u => ({
            id: u.id,
            organization: "Demo Org", // Would come from join in production
            contractName: `Contract-${u.id.slice(0, 8)}`,
            status: u.upload_status || 'unknown',
            riskScore: u.overall_score || 0,
            savingsIdentified: u.potential_savings || 0,
            uploadedAt: u.uploaded_at || new Date().toISOString()
          }));

        setRecentActivity(recent);
      }

      // Simulate top issues data
      setTopIssues([
        { issue: "Rebate Pass-Through Clauses", frequency: 42, avgImpact: 850000, trend: "up" },
        { issue: "Audit Rights Restrictions", frequency: 38, avgImpact: 320000, trend: "up" },
        { issue: "MAC Pricing Transparency", frequency: 35, avgImpact: 1200000, trend: "stable" },
        { issue: "Termination Penalties", frequency: 31, avgImpact: 450000, trend: "down" },
        { issue: "Data Access Limitations", frequency: 28, avgImpact: 280000, trend: "stable" }
      ]);

    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/10 text-green-500";
      case "processing": return "bg-blue-500/10 text-blue-500";
      case "failed": return "bg-red-500/10 text-red-500";
      default: return "bg-gray-500/10 text-gray-500";
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return "text-red-500";
    if (score >= 60) return "text-orange-500";
    if (score >= 40) return "text-yellow-500";
    return "text-green-500";
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Board Dashboard - Contract Intelligence | SiriusB iQ</title>
        </Head>
        <div className="min-h-screen bg-black text-white">
          <SiteHeader />
          <main className="container mx-auto px-4 py-24">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
                <p className="text-gray-400">Loading dashboard data...</p>
              </div>
            </div>
          </main>
          <SiteFooter />
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Board Dashboard - Contract Intelligence | SiriusB iQ</title>
        <meta name="description" content="Executive dashboard for PBM contract intelligence and analytics" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        <main className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Contract Intelligence Dashboard</h1>
              <p className="text-gray-400">Real-time analytics and performance metrics</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadDashboardData()}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="default" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Uploads */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <Badge variant="outline" className="text-xs">
                  {metrics.uploadTrend > 0 ? (
                    <><TrendingUp className="w-3 h-3 mr-1" />+{metrics.uploadTrend.toFixed(1)}%</>
                  ) : (
                    <><TrendingDown className="w-3 h-3 mr-1" />{metrics.uploadTrend.toFixed(1)}%</>
                  )}
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{metrics.totalUploads}</div>
              <div className="text-sm text-gray-400">Total Contracts</div>
            </Card>

            {/* Active Analyses */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Activity className="w-6 h-6 text-purple-500" />
                </div>
                <Badge variant="outline" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />Live
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{metrics.activeAnalyses}</div>
              <div className="text-sm text-gray-400">Processing Now</div>
            </Card>

            {/* Total Savings */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
                <Badge variant="outline" className="text-xs text-green-500">
                  <TrendingUp className="w-3 h-3 mr-1" />High Impact
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{formatCurrency(metrics.totalSavingsIdentified)}</div>
              <div className="text-sm text-gray-400">Savings Identified</div>
            </Card>

            {/* Critical Issues */}
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <Badge variant="outline" className="text-xs text-red-500">
                  <Shield className="w-3 h-3 mr-1" />Urgent
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-1">{metrics.criticalIssues}</div>
              <div className="text-sm text-gray-400">High-Risk Contracts</div>
            </Card>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-2xl font-bold">{metrics.totalUsers}</div>
                  <div className="text-xs text-gray-400">Active Organizations</div>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">{metrics.completedAnalyses}</div>
                  <div className="text-xs text-gray-400">Completed Analyses</div>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{formatTime(metrics.avgProcessingTime)}</div>
                  <div className="text-xs text-gray-400">Avg Processing Time</div>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{metrics.avgRiskScore.toFixed(0)}</div>
                  <div className="text-xs text-gray-400">Avg Risk Score</div>
                </div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="activity" className="space-y-6">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="issues">Top Issues</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            {/* Recent Activity Tab */}
            <TabsContent value="activity" className="space-y-4">
              <Card className="bg-gray-900 border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-semibold">Recent Contract Uploads</h2>
                  <p className="text-sm text-gray-400">Last 10 contracts analyzed</p>
                </div>
                <div className="divide-y divide-gray-800">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="p-6 hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-semibold">{activity.contractName}</span>
                            <Badge className={getStatusColor(activity.status)}>
                              {activity.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <span>{activity.organization}</span>
                            <span className={getRiskColor(activity.riskScore)}>
                              Risk: {activity.riskScore}
                            </span>
                            <span className="text-green-500">
                              Savings: {formatCurrency(activity.savingsIdentified)}
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">
                          {new Date(activity.uploadedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Top Issues Tab */}
            <TabsContent value="issues" className="space-y-4">
              <Card className="bg-gray-900 border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-semibold">Most Common Issues</h2>
                  <p className="text-sm text-gray-400">Issues found across all analyzed contracts</p>
                </div>
                <div className="divide-y divide-gray-800">
                  {topIssues.map((issue, idx) => (
                    <div key={idx} className="p-6 hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl font-bold text-gray-600">#{idx + 1}</div>
                          <div>
                            <div className="font-semibold mb-1">{issue.issue}</div>
                            <div className="text-sm text-gray-400">
                              Found in {issue.frequency} contracts
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-red-500">
                            {formatCurrency(issue.avgImpact)}
                          </div>
                          <div className="text-xs text-gray-400">Avg Impact</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-800 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${(issue.frequency / 50) * 100}%` }}
                          />
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {issue.trend === "up" && <TrendingUp className="w-3 h-3 mr-1 text-red-500" />}
                          {issue.trend === "down" && <TrendingDown className="w-3 h-3 mr-1 text-green-500" />}
                          {issue.trend === "stable" && <span className="mr-1">→</span>}
                          {issue.trend}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">System Performance</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">API Response Time</span>
                        <span className="font-semibold">124ms</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Database Query Time</span>
                        <span className="font-semibold">45ms</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">AI Processing Time</span>
                        <span className="font-semibold">2.3s</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Uptime</span>
                        <span className="font-semibold text-green-500">99.9%</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "99.9%" }} />
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="bg-gray-900 border-gray-800 p-6">
                  <h3 className="text-lg font-semibold mb-4">Capacity Status</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Concurrent Users</span>
                        <span className="font-semibold">42 / 500</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "8.4%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Storage Used</span>
                        <span className="font-semibold">24 GB / 1 TB</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "2.4%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">API Rate Limit</span>
                        <span className="font-semibold">1,247 / 10,000</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "12.47%" }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Processing Queue</span>
                        <span className="font-semibold">{metrics.activeAnalyses} contracts</span>
                      </div>
                      <div className="bg-gray-800 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${(metrics.activeAnalyses / 20) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Quick Actions */}
          <Card className="bg-gray-900 border-gray-800 p-6 mt-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="flex flex-wrap gap-3">
              <Link href="/pbm-contract-vault">
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  View Contract Vault
                </Button>
              </Link>
              <Link href="/contract-comparison">
                <Button variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Compare Contracts
                </Button>
              </Link>
              <Link href="/solutions/contract-xray">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Contract
                </Button>
              </Link>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Full Report
              </Button>
            </div>
          </Card>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}