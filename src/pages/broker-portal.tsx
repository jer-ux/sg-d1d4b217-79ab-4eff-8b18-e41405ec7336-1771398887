// KINCAID HEALTH™ BROKER/CONSULTANT PORTAL
// Tenant-aware dashboard with role-based access

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  TrendingUp,
  Users,
  DollarSign,
  AlertTriangle,
  FileText,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ChevronRight,
  Activity,
  ShieldCheck,
  Target,
  BarChart3,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePortalAuth } from "@/contexts/PortalAuthContext";

interface ClientSummary {
  client_id: string;
  client_name: string;
  employees: number;
  pmpm: number;
  trend: number;
  savings_opportunity: number;
  last_analysis: string;
  health_score: "excellent" | "good" | "fair" | "poor";
}

interface AnalyticsSummary {
  total_lives: number;
  total_claims: number;
  avg_pmpm: number;
  avg_trend: number;
  high_cost_claimants: number;
  pharmacy_spend: number;
  medical_spend: number;
  savings_identified: number;
}

export default function BrokerPortal() {
  const router = useRouter();
  const { user, loading: authLoading, signOut } = usePortalAuth();
  const [clients, setClients] = useState<ClientSummary[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push("/login?redirect=/broker-portal");
      return;
    }

    // Check if user has broker/consultant role
    if (!authLoading && user) {
      const allowedRoles = ["broker", "consultant", "enterprise_admin"];
      if (!allowedRoles.includes(user.role)) {
        router.push("/?error=unauthorized");
        return;
      }

      loadBrokerDashboard();
    }
  }, [user, authLoading, router]);

  const loadBrokerDashboard = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch clients (automatically filtered by tenant_id via middleware)
      const clientsRes = await fetch("/api/broker/clients", {
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "X-Tenant-ID": user.tenant_id
        }
      });
      
      if (clientsRes.ok) {
        const clientsData = await clientsRes.json();
        setClients(clientsData);
      }

      // Fetch analytics summary (tenant-scoped)
      const analyticsRes = await fetch("/api/broker/analytics/summary", {
        headers: {
          "Authorization": `Bearer ${user.token}`,
          "X-Tenant-ID": user.tenant_id
        }
      });
      
      if (analyticsRes.ok) {
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error("Failed to load broker dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const getHealthScoreColor = (score: string) => {
    const colors = {
      excellent: "text-green-600 bg-green-50 border-green-200",
      good: "text-blue-600 bg-blue-50 border-blue-200",
      fair: "text-yellow-600 bg-yellow-50 border-yellow-200",
      poor: "text-red-600 bg-red-50 border-red-200"
    };
    return colors[score as keyof typeof colors];
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading broker portal...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <SEO
        title="Broker Portal - Kincaid Health"
        description="Manage your clients and analyze health benefits performance"
      />

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Broker Portal</h1>
                <p className="text-sm text-muted-foreground">
                  {user.organization_name} • {user.role}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm" onClick={loadBrokerDashboard}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Analytics Summary Cards */}
          {analytics && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="outline">Total</Badge>
                </div>
                <div className="text-3xl font-bold">{analytics.total_lives.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Covered Lives</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="outline">Avg</Badge>
                </div>
                <div className="text-3xl font-bold">${analytics.avg_pmpm.toFixed(0)}</div>
                <p className="text-sm text-muted-foreground">PMPM</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="outline">Trend</Badge>
                </div>
                <div className="text-3xl font-bold">{(analytics.avg_trend * 100).toFixed(1)}%</div>
                <p className="text-sm text-muted-foreground">Avg Trend</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Target className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="outline">Opportunity</Badge>
                </div>
                <div className="text-3xl font-bold">${(analytics.savings_identified / 1000000).toFixed(1)}M</div>
                <p className="text-sm text-muted-foreground">Savings Identified</p>
              </Card>
            </div>
          )}

          {/* Main Content Tabs */}
          <Tabs defaultValue="clients" className="space-y-6">
            <TabsList>
              <TabsTrigger value="clients">
                <Building2 className="h-4 w-4 mr-2" />
                Clients
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports">
                <FileText className="h-4 w-4 mr-2" />
                Reports
              </TabsTrigger>
              <TabsTrigger value="opportunities">
                <Target className="h-4 w-4 mr-2" />
                Opportunities
              </TabsTrigger>
            </TabsList>

            {/* Clients Tab */}
            <TabsContent value="clients" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Clients</h2>
                <p className="text-sm text-muted-foreground">
                  {clients.length} active clients
                </p>
              </div>

              <div className="grid gap-4">
                {clients.map((client) => (
                  <Card
                    key={client.client_id}
                    className={cn(
                      "p-6 cursor-pointer hover:border-primary transition-colors",
                      selectedClient === client.client_id && "border-primary bg-accent"
                    )}
                    onClick={() => setSelectedClient(client.client_id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{client.client_name}</h3>
                          <Badge className={getHealthScoreColor(client.health_score)}>
                            {client.health_score.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Employees</p>
                            <p className="text-lg font-semibold">{client.employees.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">PMPM</p>
                            <p className="text-lg font-semibold">${client.pmpm.toFixed(0)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Trend</p>
                            <p className={cn(
                              "text-lg font-semibold",
                              client.trend > 0.08 ? "text-red-600" : "text-green-600"
                            )}>
                              {(client.trend * 100).toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Savings Opp.</p>
                            <p className="text-lg font-semibold text-green-600">
                              ${(client.savings_opportunity / 1000).toFixed(0)}K
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Last analysis: {client.last_analysis}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Portfolio Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed analytics coming soon. This will show aggregated metrics across your client portfolio.
                </p>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Client Reports</h3>
                <p className="text-muted-foreground">
                  Generate and download client reports. This will integrate with the executive reporting engine.
                </p>
              </Card>
            </TabsContent>

            {/* Opportunities Tab */}
            <TabsContent value="opportunities">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Savings Opportunities</h3>
                <p className="text-muted-foreground">
                  AI-identified opportunities across your client portfolio. This will show PBM leakage, stop-loss optimization, etc.
                </p>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}