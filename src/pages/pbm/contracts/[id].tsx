import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Download,
  Share2,
  MoreVertical,
  Eye,
  Loader2,
  PlayCircle,
  AlertCircle,
} from "lucide-react";
import { pbmContractService } from "@/services/pbmContractService";
import { pbmAnalysisService } from "@/services/pbmAnalysisService";

export default function ContractDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id && typeof id === "string") {
      loadContract(id);
    }
  }, [id]);

  const loadContract = async (contractId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await pbmContractService.getContract(contractId);
      setContract(data);
    } catch (err: any) {
      console.error("Error loading contract:", err);
      setError(err.message || "Failed to load contract");
    } finally {
      setLoading(false);
    }
  };

  const handleStartAnalysis = async () => {
    if (!contract?.versions?.[0]?.id) return;

    setAnalyzing(true);
    try {
      const analysisId = await pbmAnalysisService.generateMockAnalysis(
        contract.versions[0].id
      );
      
      await loadContract(contract.id);
      
      router.push(`/pbm/analyses/${analysisId}/quick-look`);
    } catch (error) {
      console.error("Analysis error:", error);
      setError("Failed to start analysis. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "analyzed":
        return "bg-green-100 text-green-800 border-green-200";
      case "uploaded":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-blue-600" />
          <p className="mt-4 text-slate-600">Loading contract...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500" />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Error Loading Contract
          </h3>
          <p className="mt-2 text-sm text-slate-600">{error}</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Link href="/pbm/contracts">
              <Button variant="outline">Back to Contracts</Button>
            </Link>
            <Button onClick={() => loadContract(id as string)}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <FileText className="mx-auto h-16 w-16 text-slate-300" />
          <h3 className="mt-4 text-lg font-semibold text-slate-900">
            Contract not found
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            The contract you're looking for doesn't exist or has been deleted.
          </p>
          <Link href="/pbm/contracts">
            <Button className="mt-6">Back to Contracts</Button>
          </Link>
        </div>
      </div>
    );
  }

  const latestAnalysis = contract.versions?.[0]?.analyses?.[0];

  return (
    <>
      <SEO
        title={`${contract.contract_title} - PBM Contract Intelligence | SiriusB iQ`}
        description="Contract analysis and details"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/pbm/contracts">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                </Link>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-900">
                      {contract.contract_title}
                    </h1>
                    <Badge
                      variant="outline"
                      className={getStatusColor(contract.status)}
                    >
                      {contract.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">
                    {contract.employer_name} • {contract.pbm_name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-8">
          {/* Quick Stats */}
          {latestAnalysis && (
            <div className="mb-6 grid gap-6 sm:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Overall Score
                    </p>
                    <p className="mt-2 text-3xl font-bold text-slate-900">
                      {latestAnalysis.overall_score?.toFixed(1) || "—"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-blue-100 p-3">
                    <TrendingUp className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Rating Band
                    </p>
                    <p className="mt-2 text-xl font-bold text-slate-900">
                      {latestAnalysis.rating_band || "—"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-100 p-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Analysis Date
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {new Date(latestAnalysis.analyzed_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="rounded-lg bg-purple-100 p-3">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">
                      Status
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {latestAnalysis.status}
                    </p>
                  </div>
                  <div className="rounded-lg bg-orange-100 p-3">
                    <AlertTriangle className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analyses">Analyses</TabsTrigger>
              <TabsTrigger value="versions">Versions</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Contract Details
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Employer Name</p>
                    <p className="mt-1 text-slate-900">{contract.employer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">PBM Name</p>
                    <p className="mt-1 text-slate-900">{contract.pbm_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Contract Type</p>
                    <p className="mt-1 text-slate-900">{contract.contract_type}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Effective Date</p>
                    <p className="mt-1 text-slate-900">
                      {new Date(contract.effective_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Renewal Date</p>
                    <p className="mt-1 text-slate-900">
                      {new Date(contract.renewal_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">Uploaded</p>
                    <p className="mt-1 text-slate-900">
                      {new Date(contract.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>

              {!latestAnalysis && (
                <Card className="p-12 text-center">
                  <PlayCircle className="mx-auto h-16 w-16 text-blue-600" />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    Ready to Analyze
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Start AI-powered analysis to evaluate this contract across 35 critical issues
                  </p>
                  <Button
                    className="mt-6 gap-2"
                    onClick={handleStartAnalysis}
                    disabled={analyzing}
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Start Analysis"
                    )}
                  </Button>
                </Card>
              )}

              {latestAnalysis && (
                <Card className="p-6">
                  <h2 className="mb-4 text-lg font-semibold text-slate-900">
                    Latest Analysis
                  </h2>
                  <div className="space-y-4">
                    <div className="rounded-lg border border-slate-200 p-4">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <p className="font-medium text-slate-900">
                            Overall Score: {latestAnalysis.overall_score?.toFixed(1)} / 100
                          </p>
                          <p className="text-sm text-slate-600">
                            {latestAnalysis.rating_band}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={getStatusColor(latestAnalysis.status)}
                        >
                          {latestAnalysis.status}
                        </Badge>
                      </div>
                      <p className="mb-4 text-sm text-slate-600">
                        {latestAnalysis.executive_summary?.substring(0, 200)}...
                      </p>
                      <div className="flex gap-2">
                        <Link href={`/pbm/analyses/${latestAnalysis.id}/quick-look`}>
                          <Button size="sm" variant="outline" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View Reports
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Analyses Tab */}
            <TabsContent value="analyses">
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Analysis History
                </h2>
                {contract.versions?.[0]?.analyses?.length > 0 ? (
                  <div className="space-y-3">
                    {contract.versions[0].analyses.map((analysis: any) => (
                      <div
                        key={analysis.id}
                        className="rounded-lg border border-slate-200 p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-slate-900">
                              Score: {analysis.overall_score?.toFixed(1)} / 100
                            </p>
                            <p className="text-sm text-slate-600">
                              {new Date(analysis.analyzed_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Link href={`/pbm/analyses/${analysis.id}/quick-look`}>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-sm text-slate-600">
                    No analyses yet
                  </p>
                )}
              </Card>
            </TabsContent>

            {/* Versions Tab */}
            <TabsContent value="versions">
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Contract Versions
                </h2>
                <div className="space-y-3">
                  {contract.versions?.map((version: any) => (
                    <div
                      key={version.id}
                      className="rounded-lg border border-slate-200 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-slate-900">
                            {version.version_name}
                          </p>
                          <p className="text-sm text-slate-600">
                            {new Date(version.created_at).toLocaleDateString()}
                          </p>
                          {version.notes && (
                            <p className="mt-2 text-sm text-slate-500">{version.notes}</p>
                          )}
                        </div>
                        <Button size="sm" variant="outline" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity">
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">
                  Activity Log
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                    <div>
                      <p className="font-medium text-slate-900">Contract uploaded</p>
                      <p className="text-slate-600">
                        {new Date(contract.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {contract.versions?.[0]?.analyses?.map((analysis: any) => (
                    <div key={analysis.id} className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 h-2 w-2 rounded-full bg-green-500" />
                      <div>
                        <p className="font-medium text-slate-900">Analysis completed</p>
                        <p className="text-slate-600">
                          {new Date(analysis.analyzed_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}