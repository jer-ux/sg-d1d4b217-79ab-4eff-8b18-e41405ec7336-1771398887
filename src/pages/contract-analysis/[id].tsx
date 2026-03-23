import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  FileText,
  DollarSign,
  BarChart3,
  Clock,
  Loader2,
  ArrowLeft,
  Share2,
  FileCheck
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ContractAnalysis = Database["public"]["Tables"]["contract_analysis_results"]["Row"];

export default function ContractAnalysisPage() {
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadAnalysis(id as string);
    }
  }, [id]);

  const loadAnalysis = async (uploadId: string) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("contract_analysis_results")
        .select("*")
        .eq("upload_id", uploadId)
        .single();

      if (fetchError) throw fetchError;
      if (!data) throw new Error("Analysis not found");

      setAnalysis(data);
    } catch (err: any) {
      setError(err.message || "Failed to load analysis");
      console.error("Error loading analysis:", err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "critical": return "text-red-500 border-red-500";
      case "high": return "text-orange-500 border-orange-500";
      case "medium": return "text-yellow-500 border-yellow-500";
      case "low": return "text-green-500 border-green-500";
      default: return "text-gray-500 border-gray-500";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-yellow-500";
    if (score >= 55) return "text-orange-500";
    return "text-red-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-lg">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        <div className="container mx-auto px-4 py-20">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {error || "Analysis not found. Please try uploading your contract again."}
            </AlertDescription>
          </Alert>
          <div className="mt-6">
            <Link href="/solutions/contract-xray">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contract X-Ray
              </Button>
            </Link>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const detailedAnalysis = analysis.detailed_analysis as any;
  const provisions = detailedAnalysis?.provisions || [];
  const redFlags = detailedAnalysis?.redFlags || [];
  const summary = analysis.analysis_summary as any;

  return (
    <>
      <Head>
        <title>{analysis.contract_name} - Analysis Results | SiriusB iQ</title>
        <meta name="description" content="Comprehensive PBM contract analysis results" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        <main className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link href="/solutions/contract-xray">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contract X-Ray
              </Button>
            </Link>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">{analysis.contract_name}</h1>
                <p className="text-gray-400">
                  Analyzed on {new Date(analysis.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">Overall Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(analysis.overall_score)}`}>
                  {analysis.overall_score}/100
                </div>
                <Progress value={analysis.overall_score} className="h-2" />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">Risk Level</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge variant="outline" className={`text-lg ${getRiskColor(analysis.risk_level)}`}>
                  {analysis.risk_level}
                </Badge>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">Potential Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-500 mb-1">
                  ${(analysis.potential_savings / 1000000).toFixed(1)}M
                </div>
                <p className="text-sm text-gray-400">Annual opportunity</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-400">Red Flags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-orange-500 mb-1">
                  {analysis.red_flags_count}
                </div>
                <p className="text-sm text-gray-400">Issues identified</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="provisions">Provisions ({provisions.length})</TabsTrigger>
              <TabsTrigger value="red-flags">Red Flags ({redFlags.length})</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                  <CardDescription>Key findings and analysis overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Strengths */}
                  {summary?.strengths && summary.strengths.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        Strengths
                      </h3>
                      <ul className="space-y-2">
                        {summary.strengths.map((strength: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300">
                            <span className="text-green-500 mt-1">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Concerns */}
                  {summary?.concerns && summary.concerns.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        Concerns
                      </h3>
                      <ul className="space-y-2">
                        {summary.concerns.map((concern: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300">
                            <span className="text-yellow-500 mt-1">•</span>
                            <span>{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Critical Issues */}
                  {summary?.critical_issues && summary.critical_issues.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-red-500" />
                        Critical Issues
                      </h3>
                      <ul className="space-y-2">
                        {summary.critical_issues.map((issue: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-300">
                            <span className="text-red-500 mt-1">•</span>
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Analysis Metadata */}
                  <div className="pt-6 border-t border-gray-800 flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>Processing time: {detailedAnalysis?.processingTime?.toFixed(1) || 2.3}s</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      <span>Confidence: {Math.round((detailedAnalysis?.confidence || 0.85) * 100)}%</span>
                    </div>
                    {detailedAnalysis?.aiModel && (
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-4 h-4" />
                        <span>Model: {detailedAnalysis.aiModel}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Provisions Tab */}
            <TabsContent value="provisions" className="space-y-4">
              {provisions.map((provision: any, idx: number) => (
                <Card key={idx} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{provision.name}</CardTitle>
                        <CardDescription>{provision.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className={getRiskColor(provision.riskLevel)}>
                        {provision.riskLevel}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">Score</span>
                          <span className={`font-semibold ${getScoreColor(provision.score)}`}>
                            {provision.score}/100
                          </span>
                        </div>
                        <Progress value={provision.score} className="h-2" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Impact</div>
                        <div className="text-lg font-bold text-green-500">
                          ${(provision.estimatedImpact / 1000).toFixed(0)}K
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <h4 className="text-sm font-semibold mb-2">Recommendation</h4>
                      <p className="text-sm text-gray-300">{provision.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Red Flags Tab */}
            <TabsContent value="red-flags" className="space-y-4">
              {redFlags.length === 0 ? (
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="py-12 text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Critical Red Flags</h3>
                    <p className="text-gray-400">This contract appears to have favorable terms overall.</p>
                  </CardContent>
                </Card>
              ) : (
                redFlags.map((flag: any, idx: number) => (
                  <Card key={idx} className="bg-gray-900 border-gray-800">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <AlertTriangle className={`w-5 h-5 ${getRiskColor(flag.severity).split(' ')[0]}`} />
                          {flag.title}
                        </CardTitle>
                        <Badge variant="outline" className={getRiskColor(flag.severity)}>
                          {flag.severity}
                        </Badge>
                      </div>
                      <CardDescription>Related to: {flag.provision}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">{flag.description}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                        <div>
                          <div className="text-sm text-gray-400">Estimated Impact</div>
                          <div className="text-xl font-bold text-orange-500">
                            ${(flag.estimatedImpact / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div className="flex-1 max-w-md ml-8">
                          <div className="text-sm font-semibold mb-1">Recommendation</div>
                          <p className="text-sm text-gray-400">{flag.recommendation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                  <CardDescription>Prioritized action items to maximize savings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">High Priority Actions</h3>
                    <div className="space-y-3">
                      {redFlags
                        .filter((f: any) => f.severity === "Critical" || f.severity === "High")
                        .map((flag: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
                            <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-orange-500 font-bold">{idx + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-1">{flag.provision}</h4>
                              <p className="text-sm text-gray-400">{flag.recommendation}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-400">Potential Savings</div>
                              <div className="text-lg font-bold text-green-500">
                                ${(flag.estimatedImpact / 1000).toFixed(0)}K
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-800">
                    <h3 className="text-lg font-semibold mb-4">Total Opportunity</h3>
                    <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-6 rounded-lg border border-green-500/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">Estimated Annual Savings</div>
                          <div className="text-4xl font-bold text-green-500">
                            ${(analysis.potential_savings / 1000000).toFixed(2)}M
                          </div>
                        </div>
                        <DollarSign className="w-16 h-16 text-green-500/20" />
                      </div>
                      <p className="text-sm text-gray-400 mt-4">
                        Based on identified inefficiencies and industry benchmarks. Actual savings may vary based on implementation.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button size="lg" className="flex-1">
                      <FileText className="w-4 h-4 mr-2" />
                      Schedule Expert Review
                    </Button>
                    <Button size="lg" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Full Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}