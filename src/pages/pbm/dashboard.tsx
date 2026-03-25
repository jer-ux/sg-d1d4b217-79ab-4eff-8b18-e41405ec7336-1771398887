import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Plus,
  ArrowRight,
} from "lucide-react";
import { pbmContractService } from "@/services/pbmContractService";

export default function PBMDashboardPage() {
  const [stats, setStats] = useState({
    totalContracts: 0,
    avgScore: 0,
    totalAnalyses: 0,
    bandCounts: {} as Record<string, number>,
  });
  const [loading, setLoading] = useState(true);
  const [contracts, setContracts] = useState<any[]>([]);
  const [renewals, setRenewals] = useState<any[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock organization ID for demo
      const orgId = "demo-org-id";
      
      const [dashStats, contractsList, upcomingRenewals] = await Promise.all([
        pbmContractService.getDashboardStats(orgId),
        pbmContractService.listContracts(orgId),
        pbmContractService.getUpcomingRenewals(orgId, 90),
      ]);

      setStats(dashStats);
      setContracts(contractsList.slice(0, 5)); // Recent 5
      setRenewals(upcomingRenewals);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (band: string) => {
    switch (band) {
      case "Excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "Good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Fair":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Concern":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Red Flag":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <>
      <SEO
        title="Dashboard - PBM Contract Intelligence | SiriusB iQ"
        description="Manage and analyze your PBM contracts with AI-powered intelligence"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Contract Intelligence Dashboard
                </h1>
                <p className="text-sm text-slate-600">
                  AI-powered PBM contract analysis and benchmarking
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/pbm/contracts/upload">
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Upload Contract
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8">
          {/* Key Metrics */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Contracts
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stats.totalContracts}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-100 p-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Average Score
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stats.avgScore > 0 ? stats.avgScore.toFixed(1) : "—"}
                  </p>
                </div>
                <div className="rounded-lg bg-green-100 p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Analyses Complete
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stats.totalAnalyses}
                  </p>
                </div>
                <div className="rounded-lg bg-purple-100 p-3">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Upcoming Renewals
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {renewals.length}
                  </p>
                </div>
                <div className="rounded-lg bg-orange-100 p-3">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Contracts */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Contracts
                </h2>
                <Link href="/pbm/contracts">
                  <Button variant="ghost" size="sm" className="gap-1">
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 animate-pulse rounded-lg bg-slate-100"
                    />
                  ))}
                </div>
              ) : contracts.length === 0 ? (
                <div className="py-12 text-center">
                  <FileText className="mx-auto h-12 w-12 text-slate-300" />
                  <p className="mt-4 text-sm text-slate-600">
                    No contracts uploaded yet
                  </p>
                  <Link href="/pbm/contracts/upload">
                    <Button className="mt-4 gap-2" size="sm">
                      <Plus className="h-4 w-4" />
                      Upload Your First Contract
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {contracts.map((contract) => (
                    <Link
                      key={contract.id}
                      href={`/pbm/contracts/${contract.id}`}
                    >
                      <div className="group cursor-pointer rounded-lg border border-slate-200 p-4 transition-all hover:border-blue-300 hover:bg-blue-50/50">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-slate-900 group-hover:text-blue-600">
                              {contract.contract_title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-600">
                              {contract.employer_name} • {contract.pbm_name}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={getRatingColor(contract.status)}
                          >
                            {contract.status}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Card>

            {/* Upcoming Renewals */}
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Upcoming Renewals
                </h2>
                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                  Next 90 Days
                </Badge>
              </div>

              {renewals.length === 0 ? (
                <div className="py-12 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-300" />
                  <p className="mt-4 text-sm text-slate-600">
                    No renewals in the next 90 days
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {renewals.map((contract) => (
                    <div
                      key={contract.id}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-slate-900">
                            {contract.contract_title}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600">
                            {contract.pbm_name}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-orange-600">
                            {new Date(contract.renewal_date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-slate-500">
                            Renewal Date
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/pbm/contracts/upload">
              <Card className="group cursor-pointer p-6 transition-all hover:border-blue-300 hover:bg-blue-50/50">
                <Plus className="mb-3 h-8 w-8 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Upload Contract</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Start a new analysis
                </p>
              </Card>
            </Link>

            <Link href="/pbm/index">
              <Card className="group cursor-pointer p-6 transition-all hover:border-blue-300 hover:bg-blue-50/50">
                <BarChart3 className="mb-3 h-8 w-8 text-purple-600" />
                <h3 className="font-semibold text-slate-900">PBM Index</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Compare PBM scores
                </p>
              </Card>
            </Link>

            <Link href="/pbm/tasks">
              <Card className="group cursor-pointer p-6 transition-all hover:border-blue-300 hover:bg-blue-50/50">
                <CheckCircle className="mb-3 h-8 w-8 text-green-600" />
                <h3 className="font-semibold text-slate-900">Tasks</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Manage workflow
                </p>
              </Card>
            </Link>

            <Link href="/pbm/settings">
              <Card className="group cursor-pointer p-6 transition-all hover:border-blue-300 hover:bg-blue-50/50">
                <AlertTriangle className="mb-3 h-8 w-8 text-orange-600" />
                <h3 className="font-semibold text-slate-900">Settings</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Configure account
                </p>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}