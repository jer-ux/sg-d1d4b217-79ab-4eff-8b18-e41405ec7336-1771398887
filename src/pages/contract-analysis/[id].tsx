import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign, 
  Download,
  Share2,
  Shield,
  Target,
  BarChart3,
  FileCheck
} from "lucide-react";
import { generateExecutiveSummary, downloadReport } from "@/lib/contracts/reportGenerator";
import type { ProvisionAnalysis, RedFlag } from "@/lib/contracts/types";

// Dynamic import to avoid SSR issues with react-pdf
const PDFViewerWithHighlights = dynamic(
  () => import("@/components/contracts/PDFViewerWithHighlights").then(mod => ({ default: mod.PDFViewerWithHighlights })),
  { ssr: false }
);

interface AnalysisResult {
  id: string;
  contract_name: string;
  pbm_name: string;
  contract_type: string;
  overall_score: number;
  potential_savings: number;
  risk_level: string;
  total_provisions_analyzed: number;
  red_flags_count: number;
  annual_cost_estimate: number;
  analysis_summary: {
    strengths: string[];
    concerns: string[];
    critical_issues: string[];
  };
  detailed_analysis: {
    provisions: ProvisionAnalysis[];
    redFlags: RedFlag[];
    processingTime: number;
    aiModel: string;
    confidence: number;
  };
  storage_path?: string;
}

export default function ContractAnalysisPage() {
  const router = useRouter();
  const { id } = router.query;
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      loadAnalysis(id as string);
    }
  }, [id]);

  async function loadAnalysis(analysisId: string) {
    try {
      // Get analysis from database
      const { data, error } = await supabase
        .from("contract_analysis_results")
        .select(`
          *,
          contract_uploads!inner(storage_path, file_name)
        `)
        .eq("id", analysisId)
        .single();

      if (error) throw error;

      // Get PDF URL from storage
      if (data.contract_uploads?.storage_path) {
        const { data: urlData } = supabase.storage
          .from("contract-uploads")
          .getPublicUrl(data.contract_uploads.storage_path);

        if (urlData) {
          setPdfUrl(urlData.publicUrl);
        }
      }

      setAnalysis(data as any);
    } catch (error) {
      console.error("Error loading analysis:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDownloadReport = () => {
    if (!analysis) return;

    const fullAnalysisResult = {
      overallScore: analysis.overall_score,
      riskLevel: analysis.risk_level as 'Low' | 'Medium' | 'High' | 'Critical',
      provisions: analysis.detailed_analysis?.provisions || [],
      redFlags: analysis.detailed_analysis?.redFlags || [],
      criticalIssuesCount: analysis.analysis_summary?.critical_issues?.length || 0,
      totalRedFlags: analysis.red_flags_count || 0,
      estimatedSavings: analysis.potential_savings || 0,
      processingTime: analysis.detailed_analysis?.processingTime || 0,
      analyzedAt: new Date().toISOString(),
      aiModel: analysis.detailed_analysis?.aiModel,
      confidence: analysis.detailed_analysis?.confidence
    };

    const html = generateExecutiveSummary(
      analysis.contract_name,
      analysis.pbm_name,
      fullAnalysisResult,
      {
        financial: 75,
        legal: 80,
        operational: 70,
        compliance: 85,
        overall: analysis.overall_score
      },
      analysis.overall_score,
      analysis.potential_savings,
      analysis.annual_cost_estimate
    );

    const filename = `${analysis.contract_name.replace(/\s+/g, "_")}_Analysis_Report.html`;
    downloadReport(html, filename);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "low": return "text-green-600 bg-green-50 dark:bg-green-950";
      case "medium": return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950";
      case "high": return "text-orange-600 bg-orange-50 dark:bg-orange-950";
      case "critical": return "text-red-600 bg-red-50 dark:bg-red-950";
      default: return "text-gray-600 bg-gray-50 dark:bg-gray-950";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    if (score >= 40) return "text-orange-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Analysis Not Found</CardTitle>
            <CardDescription>
              The analysis you're looking for doesn't exist or has been deleted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/solutions/contract-xray")}>
              Upload New Contract
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const provisions = analysis.detailed_analysis?.provisions || [];
  const redFlags = analysis.detailed_analysis?.redFlags || [];

  return (
    <>
      <Head>
        <title>Contract Analysis Results - {analysis.contract_name}</title>
        <meta
          name="description"
          content={`Analysis results for ${analysis.contract_name} - ${analysis.pbm_name}`}
        />
      </Head>

      <div className="flex min-h-screen flex-col">
        <SiteHeader />

        <main className="flex-1 py-12">
          <div className="container max-w-7xl">
            {/* Hero Section */}
            <div className="mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <h1 className="text-3xl font-bold">{analysis.contract_name}</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{analysis.pbm_name}</Badge>
                    <Badge variant="outline">{analysis.contract_type}</Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Overall Score</p>
                        <p className={`text-3xl font-bold ${getScoreColor(analysis.overall_score)}`}>
                          {analysis.overall_score}
                          <span className="text-lg text-muted-foreground">/100</span>
                        </p>
                      </div>
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                        <Badge className={`text-base font-semibold ${getRiskColor(analysis.risk_level)}`}>
                          {analysis.risk_level}
                        </Badge>
                      </div>
                      <Shield className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Potential Savings</p>
                        <p className="text-3xl font-bold text-green-600">
                          ${(analysis.potential_savings / 1000000).toFixed(1)}M
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Red Flags</p>
                        <p className="text-3xl font-bold text-red-600">
                          {analysis.red_flags_count}
                        </p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="pdf-viewer" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="pdf-viewer" className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4" />
                  PDF Viewer
                </TabsTrigger>
                <TabsTrigger value="summary" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Summary
                </TabsTrigger>
                <TabsTrigger value="provisions" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Provisions
                </TabsTrigger>
                <TabsTrigger value="red-flags" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Red Flags
                </TabsTrigger>
                <TabsTrigger value="savings" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Savings
                </TabsTrigger>
              </TabsList>

              {/* PDF Viewer Tab */}
              <TabsContent value="pdf-viewer" className="space-y-6">
                {pdfUrl ? (
                  <PDFViewerWithHighlights
                    pdfUrl={pdfUrl}
                    provisions={provisions}
                    redFlags={redFlags}
                    contractText=""
                  />
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">PDF not available for viewing</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Executive Summary Tab */}
              <TabsContent value="summary" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <TrendingUp className="h-5 w-5" />
                        Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.analysis_summary.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span className="text-sm">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Concerns */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-yellow-600">
                        <AlertTriangle className="h-5 w-5" />
                        Concerns
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.analysis_summary.concerns.map((concern, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-yellow-600 mt-1">⚠</span>
                            <span className="text-sm">{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Critical Issues */}
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        Critical Issues
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysis.analysis_summary.critical_issues.map((issue, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">✗</span>
                            <span className="text-sm font-medium">{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Provisions Tab */}
              <TabsContent value="provisions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Provision Analysis</CardTitle>
                    <CardDescription>
                      {provisions.length} provisions analyzed
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {provisions.map((provision, index) => (
                        <div
                          key={index}
                          className="border rounded-lg p-4 space-y-2"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{provision.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {provision.description}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge
                                variant={
                                  provision.score >= 80
                                    ? "default"
                                    : provision.score >= 60
                                    ? "secondary"
                                    : "destructive"
                                }
                              >
                                {provision.score}/100
                              </Badge>
                              <Badge variant="outline">{provision.impact}</Badge>
                            </div>
                          </div>
                          <Progress value={provision.score} className="h-2" />
                          <p className="text-sm">
                            <span className="font-medium">Recommendation:</span>{" "}
                            {provision.recommendation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Red Flags Tab */}
              <TabsContent value="red-flags" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Red Flags & Risk Factors</CardTitle>
                    <CardDescription>
                      {redFlags.length} issues identified
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {redFlags.map((flag, index) => (
                        <div
                          key={index}
                          className={`border-l-4 rounded-r-lg p-4 space-y-2 ${
                            flag.severity === "Critical"
                              ? "border-red-600 bg-red-50 dark:bg-red-950/30"
                              : flag.severity === "High"
                              ? "border-orange-600 bg-orange-50 dark:bg-orange-950/30"
                              : "border-yellow-600 bg-yellow-50 dark:bg-yellow-950/30"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="h-4 w-4" />
                                <h4 className="font-semibold">{flag.title}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {flag.description}
                              </p>
                              {flag.estimatedCost && (
                                <p className="text-sm font-medium">
                                  Estimated Cost: {flag.estimatedCost}
                                </p>
                              )}
                            </div>
                            <Badge
                              variant={
                                flag.severity === "Critical"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {flag.severity}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Savings Tab */}
              <TabsContent value="savings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Savings Opportunities</CardTitle>
                    <CardDescription>
                      Potential annual savings: $
                      {(analysis.potential_savings / 1000000).toFixed(1)}M
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-green-600">
                              ${(analysis.potential_savings / 1000000).toFixed(1)}M
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Total Annual Savings Potential
                            </p>
                          </div>
                          <DollarSign className="h-12 w-12 text-green-600" />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Current Annual Cost</span>
                            <span className="font-semibold">
                              ${(analysis.annual_cost_estimate / 1000000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Optimized Cost</span>
                            <span className="font-semibold text-green-600">
                              $
                              {(
                                (analysis.annual_cost_estimate -
                                  analysis.potential_savings) /
                                1000000
                              ).toFixed(1)}
                              M
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm font-bold">
                            <span>Savings</span>
                            <span className="text-green-600">
                              {Math.round(
                                (analysis.potential_savings /
                                  analysis.annual_cost_estimate) *
                                  100
                              )}
                              % reduction
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {provisions
                          .filter((p) => p.score < 70)
                          .slice(0, 4)
                          .map((provision, index) => (
                            <Card key={index}>
                              <CardHeader>
                                <CardTitle className="text-base">
                                  {provision.name}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {provision.recommendation}
                                </p>
                                <Badge variant="outline">
                                  Improvement Opportunity
                                </Badge>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}