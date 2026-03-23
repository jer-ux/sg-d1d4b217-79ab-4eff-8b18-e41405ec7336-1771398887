import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  FileText, 
  AlertTriangle, 
  DollarSign,
  Activity,
  CheckCircle2,
  Clock
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardMetrics {
  totalContracts: number;
  activeUsers: number;
  avgScore: number;
  totalSavings: number;
  riskDistribution: { low: number; medium: number; high: number; critical: number };
  recentActivity: Array<{ id: string; type: string; timestamp: string; user: string }>;
}

export function EnterpriseDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalContracts: 0,
    activeUsers: 0,
    avgScore: 0,
    totalSavings: 0,
    riskDistribution: { low: 0, medium: 0, high: 0, critical: 0 },
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardMetrics();
  }, []);

  const loadDashboardMetrics = async () => {
    try {
      // Load contracts
      const { data: contracts } = await supabase
        .from('contract_analysis_results')
        .select('overall_score, potential_savings, risk_level');

      if (contracts) {
        const totalContracts = contracts.length;
        const avgScore = contracts.reduce((acc, c) => acc + (c.overall_score || 0), 0) / totalContracts || 0;
        const totalSavings = contracts.reduce((acc, c) => acc + (c.potential_savings || 0), 0);

        const riskDistribution = {
          low: contracts.filter(c => c.risk_level === 'Low').length,
          medium: contracts.filter(c => c.risk_level === 'Medium').length,
          high: contracts.filter(c => c.risk_level === 'High').length,
          critical: contracts.filter(c => c.risk_level === 'Critical').length,
        };

        setMetrics({
          totalContracts,
          activeUsers: 24, // Mock data
          avgScore: Math.round(avgScore),
          totalSavings,
          riskDistribution,
          recentActivity: [] // Will be populated from audit logs
        });
      }
    } catch (error) {
      console.error('Failed to load metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Contracts</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.totalContracts}</div>
            <p className="text-xs text-gray-500 mt-1">
              <TrendingUp className="inline h-3 w-3 text-green-600 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.activeUsers}</div>
            <p className="text-xs text-gray-500 mt-1">
              <Activity className="inline h-3 w-3 text-green-600 mr-1" />
              8 online now
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Contract Score</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{metrics.avgScore}/100</div>
            <Progress value={metrics.avgScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Savings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(metrics.totalSavings / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-gray-500 mt-1">Identified opportunities</p>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Distribution</CardTitle>
          <CardDescription>Contract risk levels across your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Low Risk
                </Badge>
                <span className="text-sm text-gray-600">{metrics.riskDistribution.low} contracts</span>
              </div>
              <Progress 
                value={(metrics.riskDistribution.low / metrics.totalContracts) * 100} 
                className="w-1/2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  Medium Risk
                </Badge>
                <span className="text-sm text-gray-600">{metrics.riskDistribution.medium} contracts</span>
              </div>
              <Progress 
                value={(metrics.riskDistribution.medium / metrics.totalContracts) * 100} 
                className="w-1/2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  High Risk
                </Badge>
                <span className="text-sm text-gray-600">{metrics.riskDistribution.high} contracts</span>
              </div>
              <Progress 
                value={(metrics.riskDistribution.high / metrics.totalContracts) * 100} 
                className="w-1/2"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Critical Risk
                </Badge>
                <span className="text-sm text-gray-600">{metrics.riskDistribution.critical} contracts</span>
              </div>
              <Progress 
                value={(metrics.riskDistribution.critical / metrics.totalContracts) * 100} 
                className="w-1/2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">API Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.98%</div>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142ms</div>
            <p className="text-xs text-gray-500 mt-1">p95: 350ms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Processing Queue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              <Clock className="h-6 w-6 text-blue-600" />
              2
            </div>
            <p className="text-xs text-gray-500 mt-1">Contracts in queue</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}