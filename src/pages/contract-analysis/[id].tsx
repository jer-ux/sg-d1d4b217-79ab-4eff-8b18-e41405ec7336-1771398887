import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Download, 
  FileText, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Shield,
  DollarSign,
  CheckCircle2,
  XCircle,
  BarChart3,
  Clock,
  ArrowLeft,
  Share2,
  Printer,
  Mail
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { ContractAnalysisResult } from "@/lib/contracts/types";
import { exportToPDF } from "@/lib/contracts/reportGenerator";

export default function ContractAnalysisPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState<any>(null);
  const [analysis, setAnalysis] = useState<ContractAnalysisResult | null>(null);

  useEffect(() => {
    if (id) {
      loadContractAnalysis();
    }
  }, [id]);

  const loadContractAnalysis = async () => {
    try {
      const { data: contractData } = await supabase
        .from('contract_uploads')
        .select('*, contract_analysis_results(*)')
        .eq('id', id)
        .single();

      if (contractData) {
        setContract(contractData);
        
        // Get analysis result
        const { data: analysisData } = await supabase
          .from('contract_analysis_results')
          .select('*')
          .eq('contract_id', id)
          .single();

        if (analysisData) {
          // Transform database result to ContractAnalysisResult format
          const analysisResult: ContractAnalysisResult = {
            overallScore: analysisData.overall_score || 0,
            riskLevel: analysisData.risk_level as any || 'Medium',
            provisions: analysisData.provisions_data || [],
            redFlags: analysisData.red_flags || [],
            criticalIssuesCount: analysisData.critical_issues_count || 0,
            totalRedFlags: (analysisData.red_flags || []).length,
            estimatedSavings: contractData.estimated_savings || 0,
            processingTime: contractData.processing_time || 0,
            analyzedAt: analysisData.analyzed_at || new Date().toISOString()
          };
          
          setAnalysis(analysisResult);
        }
      }
    } catch (error) {
      console.error('Failed to load contract analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    if (contract && analysis) {
      exportToPDF(contract.file_name, analysis);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-500';
    if (score >= 70) return 'text-blue-500';
    if (score >= 55) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Analysis... | SiriusB iQ</title>
        </Head>
        <div className="min-h-screen bg-black text-white">
          <SiteHeader />
          <main className="container mx-auto px-4 py-24">
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Loading contract analysis...</p>
              </div>
            </div>
          </main>
          <SiteFooter />
        </div>
      </>
    );
  }

  if (!contract || !analysis) {
    return (
      <>
        <Head>
          <title>Analysis Not Found | SiriusB iQ</title>
        </Head>
        <div className="min-h-screen bg-black text-white">
          <SiteHeader />
          <main className="container mx-auto px-4 py-24">
            <div className="text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-4">Analysis Not Found</h1>
              <p className="text-gray-400 mb-8">The contract analysis you're looking for doesn't exist.</p>
              <Link href="/solutions/contract-xray">
                <Button>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Contract X-Ray
                </Button>
              </Link>
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
        <title>Contract Analysis: {contract.file_name} | SiriusB iQ</title>
        <meta name="description" content="Detailed PBM contract analysis with risk scoring and savings opportunities" />
      </Head>

      <div className="min-h-screen bg-black text-white">
        <SiteHeader />

        <main className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <Link href="/solutions/contract-xray">
              <Button variant="outline" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contract X-Ray
              </Button>
            </Link>
            
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Contract Analysis Report</h1>
                <p className="text-gray-400">{contract.file_name}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Analyzed {new Date(analysis.analyzedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {(contract.file_size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={handleExportPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Executive Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-500" />
                </div>
                <Badge className={getRiskColor(analysis.riskLevel)}>
                  {analysis.riskLevel}
                </Badge>
              </div>
              <div className={`text-3xl font-bold mb-1 ${getScoreColor(analysis.overallScore)}`}>
                {analysis.overallScore}
              </div>
              <div className="text-sm text-gray-400">Overall Score</div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1 text-red-500">
                {analysis.criticalIssuesCount}
              </div>
              <div className="text-sm text-gray-400">Critical Issues</div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <FileText className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1 text-yellow-500">
                {analysis.totalRedFlags}
              </div>
              <div className="text-sm text-gray-400">Total Red Flags</div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-500" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-1 text-green-500">
                ${(analysis.estimatedSavings / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-400">Potential Savings</div>
            </Card>
          </div>

          {/* Savings Opportunity Banner */}
          <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/20 p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">Estimated Annual Savings Opportunity</h3>
                <p className="text-gray-300">Based on identified contract inefficiencies and industry benchmarks</p>
              </div>
              <div className="text-5xl font-bold text-green-400">
                ${analysis.estimatedSavings.toLocaleString()}
              </div>
            </div>
          </Card>

          <Tabs defaultValue="provisions" className="space-y-6">
            <TabsList className="bg-gray-900">
              <TabsTrigger value="provisions">Provision Analysis</TabsTrigger>
              <TabsTrigger value="redflags">Red Flags</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            {/* Provision Analysis Tab */}
            <TabsContent value="provisions" className="space-y-4">
              <Card className="bg-gray-900 border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-semibold">Detailed Provision Analysis</h2>
                  <p className="text-sm text-gray-400">Scoring breakdown across all contract provisions</p>
                </div>
                <div className="divide-y divide-gray-800">
                  {analysis.provisions.map((provision, idx) => (
                    <div key={idx} className="p-6 hover:bg-gray-800/50 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{provision.name}</h3>
                            <Badge className={getRiskColor(provision.riskLevel)}>
                              {provision.riskLevel}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-400 mb-3">{provision.description}</p>
                        </div>
                        <div className="text-right ml-6">
                          <div className={`text-3xl font-bold ${getScoreColor(provision.score)}`}>
                            {provision.score}
                          </div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-400">Performance</span>
                          <span className="font-semibold">{provision.score}%</span>
                        </div>
                        <Progress value={provision.score} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                        <div className="text-sm">
                          <span className="text-gray-400">Estimated Impact: </span>
                          <span className="font-semibold text-red-400">
                            ${provision.estimatedImpact.toLocaleString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-400">Recommendation: </span>
                          <span className="text-blue-400">{provision.recommendation}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Red Flags Tab */}
            <TabsContent value="redflags" className="space-y-4">
              <Card className="bg-gray-900 border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-semibold">Critical Issues & Red Flags</h2>
                  <p className="text-sm text-gray-400">
                    {analysis.totalRedFlags} issues identified requiring immediate attention
                  </p>
                </div>
                <div className="divide-y divide-gray-800">
                  {analysis.redFlags.map((flag, idx) => (
                    <div key={idx} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${
                          flag.severity === 'Critical' ? 'bg-red-500/10' :
                          flag.severity === 'High' ? 'bg-orange-500/10' :
                          flag.severity === 'Medium' ? 'bg-yellow-500/10' :
                          'bg-blue-500/10'
                        }`}>
                          <AlertTriangle className={`w-6 h-6 ${
                            flag.severity === 'Critical' ? 'text-red-500' :
                            flag.severity === 'High' ? 'text-orange-500' :
                            flag.severity === 'Medium' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{flag.title}</h3>
                            <Badge className={getRiskColor(flag.severity)}>
                              {flag.severity}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-400 mb-3">{flag.description}</p>
                          
                          <div className="bg-gray-800/50 rounded-lg p-4 mb-3">
                            <div className="text-sm font-semibold mb-1 text-gray-300">Recommendation:</div>
                            <p className="text-sm text-gray-400">{flag.recommendation}</p>
                          </div>

                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <span className="text-gray-400">Provision: </span>
                              <span className="font-semibold">{flag.provision}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Impact: </span>
                              <span className="font-semibold text-red-400">
                                ${flag.estimatedImpact.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Recommendations Tab */}
            <TabsContent value="recommendations" className="space-y-4">
              <Card className="bg-gray-900 border-gray-800 p-6">
                <h2 className="text-xl font-semibold mb-4">Recommended Next Steps</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      Immediate Actions (0-30 days)
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Request detailed pricing audit from your PBM</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Review rebate pass-through terms and request quarterly reconciliation</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Engage legal counsel experienced in PBM contract negotiations</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>Document all identified issues for renegotiation discussions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      Short-Term Strategy (1-3 months)
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-500 mt-1">•</span>
                        <span>Conduct RFP with 2-3 alternative PBMs for competitive benchmarking</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-500 mt-1">•</span>
                        <span>Implement quarterly contract compliance audits</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-500 mt-1">•</span>
                        <span>Negotiate MAC list transparency and monthly update guarantees</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-yellow-500 mt-1">•</span>
                        <span>Secure unrestricted audit rights with third-party verification</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      Long-Term Optimization (3-12 months)
                    </h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Renegotiate contract with identified provisions as leverage points</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Implement cost-plus pricing model for specialty drugs</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Establish performance guarantees with financial penalties</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">•</span>
                        <span>Build ongoing contract monitoring and compliance framework</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-800">
                  <h3 className="text-lg font-semibold mb-4">Need Expert Help?</h3>
                  <p className="text-gray-400 mb-4">
                    Our team of PBM contract specialists can guide you through the renegotiation process
                    and help you capture the ${(analysis.estimatedSavings / 1000000).toFixed(1)}M in identified savings.
                  </p>
                  <div className="flex gap-3">
                    <Link href="/request-demo">
                      <Button>
                        <Mail className="w-4 h-4 mr-2" />
                        Schedule Consultation
                      </Button>
                    </Link>
                    <Link href="/pbm-contract-vault">
                      <Button variant="outline">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Compare with Other Contracts
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <SiteFooter />
      </div>
    </>
  );
}