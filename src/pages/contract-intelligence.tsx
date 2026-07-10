import Head from "next/head";
import { useState } from "react";
import { SEO } from "@/components/SEO";
import { KincaidHealthNav } from "@/components/siriusb/SiriusBNav";
import { KincaidHealthFooter } from "@/components/siriusb/SiriusBFooter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FileText, Shield, AlertTriangle, CheckCircle2, Target, Download,
  FileUp, Activity, Search, BookOpen, Scale, FileSearch, Upload
} from "lucide-react";

type IntelligenceResult = any;

const ContractIntelligenceEngine = {
  analyze: async (id: string, name: string, text: string) => {
    return {
      report: {
        quickLook: {
          contractScore: 6.8,
          topStrengths: [{ category: "pricing", brief: "Good transparent pricing" }],
          topRisks: [{ category: "data_ownership", brief: "PBM retains rights" }]
        },
        negotiationGuide: {
          riskyClause: [
            {
              category: "rebates",
              currentLanguage: "PBM retains 15%",
              recommendedLanguage: "100% pass-through",
              talkingPoints: ["Transparency is key", "Industry standard is 100%"]
            }
          ]
        },
        boardSummary: {
          overallGovernanceScore: 6.8,
          confidenceLevel: "medium",
          recommendation: "renegotiate",
          executiveBrief: "The contract contains several hidden risks.",
          topEconomicExposures: [{ exposure: "Rebates", impact: "$1.2M" }],
          topTransparencyFailures: [{ failure: "MAC lists", consequence: "Hidden spread" }],
          terminationExitRisk: "High penalties for early termination."
        }
      },
      analyses: [
        {
          score: { riskLevel: "red" },
          clause: { category: "data_ownership", pageNumber: 3, textSnippet: "PBM owns all data" },
          riskExplanation: { whyItMatters: "Loss of control", suggestedPosition: "Client retains ownership" }
        },
        {
          score: { riskLevel: "green" },
          clause: { category: "audit_rights", pageNumber: 5, textSnippet: "Client may audit annually" },
          riskExplanation: { whyItMatters: "Transparency", suggestedPosition: "Maintain current language" }
        }
      ]
    };
  }
};

export default function ContractIntelligencePage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<IntelligenceResult | null>(null);
  const [activeTab, setActiveTab] = useState("upload");

  const handleDemoUpload = async () => {
    setAnalyzing(true);
    
    const demoContractText = `
PHARMACY BENEFIT MANAGEMENT AGREEMENT
1. REBATES. PBM will retain 15% of all manufacturer rebates.
2. AUDIT. Client may audit once per year.
3. DATA. PBM owns all claims data.
4. SPREAD PRICING. PBM utilizes MAC pricing to determine pharmacy payments.
5. TERMINATION. 180 days notice required with early termination penalties.
    `;

    setTimeout(async () => {
      try {
        const res = await ContractIntelligenceEngine.analyze(
          "demo_123",
          "Acme_PBM_Contract_2024.pdf",
          demoContractText
        );
        setResults(res);
        setActiveTab("dashboard");
      } catch (error) {
        console.error(error);
      } finally {
        setAnalyzing(false);
      }
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Contract Intelligence | Kincaid Health</title>
        <meta name="description" content="AI-powered PBM contract analysis and optimization" />
      </Head>

      <KincaidHealthNav />

      <div className="min-h-screen bg-black text-white">
        <SiriusBNav />

        <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Activity className="w-3 h-3 mr-1" />
              Contract Intelligence Engine
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-2">PBM Contract Analysis</h1>
            <p className="text-lg text-slate-400">
              Extract, classify, and score economic risk from PBM contracts in seconds.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-slate-900 border border-slate-800 rounded-lg p-1">
              <TabsTrigger value="upload">Upload</TabsTrigger>
              <TabsTrigger value="dashboard" disabled={!results}>Dashboard</TabsTrigger>
              <TabsTrigger value="explorer" disabled={!results}>Clause Explorer</TabsTrigger>
              <TabsTrigger value="guide" disabled={!results}>Negotiation Guide</TabsTrigger>
              <TabsTrigger value="board" disabled={!results}>Board Summary</TabsTrigger>
              <TabsTrigger value="compare" disabled={!results}>Compare</TabsTrigger>
            </TabsList>

            {/* UPLOAD SCREEN */}
            <TabsContent value="upload" className="mt-6">
              <Card className="bg-slate-900/50 border-slate-800 p-12 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                  <FileUp className="w-10 h-10 text-blue-400" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">Upload PBM Contract</h2>
                <p className="text-slate-400 max-w-md mx-auto mb-8">
                  Drag and drop your PDF contract here. Our AI will extract text, segment clauses, and classify economic risks automatically.
                </p>
                <div className="flex gap-4">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-500 text-white px-8"
                    onClick={handleDemoUpload}
                    disabled={analyzing}
                  >
                    {analyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Processing PDF...
                      </>
                    ) : (
                      <>
                        <FileSearch className="w-4 h-4 mr-2" />
                        Run Demo Contract
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* DASHBOARD */}
            {results && (
              <TabsContent value="dashboard" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Card className="bg-slate-900 border-slate-800 p-6">
                    <div className="text-slate-400 text-sm font-medium mb-2">Overall Contract Score</div>
                    <div className="text-4xl font-bold text-white mb-1">
                      {results.report.quickLook.contractScore.toFixed(1)}<span className="text-lg text-slate-500">/10</span>
                    </div>
                    <Badge variant="outline" className="border-red-500 text-red-400 bg-red-500/10">High Risk</Badge>
                  </Card>
                  
                  <Card className="bg-slate-900 border-slate-800 p-6">
                    <div className="text-slate-400 text-sm font-medium mb-2">Red Flags</div>
                    <div className="text-4xl font-bold text-red-400 mb-1">
                      {results.analyses.filter(a => a.score.riskLevel === 'red').length}
                    </div>
                    <div className="text-sm text-slate-500">Critical economic exposures</div>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800 p-6">
                    <div className="text-slate-400 text-sm font-medium mb-2">Strong Clauses</div>
                    <div className="text-4xl font-bold text-green-400 mb-1">
                      {results.analyses.filter(a => a.score.riskLevel === 'green').length}
                    </div>
                    <div className="text-sm text-slate-500">Employer-aligned terms</div>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800 p-6">
                    <div className="text-slate-400 text-sm font-medium mb-2">Top Hidden Risk</div>
                    <div className="text-lg font-bold text-white mb-1 leading-tight">
                      Data Ownership
                    </div>
                    <div className="text-sm text-red-400 flex items-center mt-2">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      PBM retains rights
                    </div>
                  </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-slate-900 border-slate-800 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-blue-400" />
                      Top Strengths
                    </h3>
                    <div className="space-y-4">
                      {results.report.quickLook.topStrengths.map((str, i) => (
                        <div key={i} className="flex gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                          <div>
                            <div className="font-medium text-slate-200 capitalize">{str.category.replace(/_/g, " ")}</div>
                            <div className="text-sm text-slate-400">{str.brief}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800 p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                      Top Risks
                    </h3>
                    <div className="space-y-4">
                      {results.report.quickLook.topRisks.map((risk, i) => (
                        <div key={i} className="flex gap-3">
                          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                          <div>
                            <div className="font-medium text-slate-200 capitalize">{risk.category.replace(/_/g, " ")}</div>
                            <div className="text-sm text-slate-400">{risk.brief}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>
            )}

            {/* CLAUSE EXPLORER */}
            {results && (
              <TabsContent value="explorer" className="mt-6">
                <Card className="bg-slate-900 border-slate-800 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-white">Clause Explorer</h2>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Search clauses..." 
                        className="bg-slate-950 border border-slate-800 rounded-md pl-9 pr-4 py-2 text-sm text-slate-200 w-64 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {results.analyses.map((analysis, i) => (
                      <div key={i} className="bg-slate-950 rounded-lg p-5 border border-slate-800">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className={
                              analysis.score.riskLevel === 'red' ? "bg-red-500/10 text-red-400 border-red-500/20" :
                              analysis.score.riskLevel === 'yellow' ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" :
                              "bg-green-500/10 text-green-400 border-green-500/20"
                            }>
                              {analysis.score.riskLevel.toUpperCase()} RISK
                            </Badge>
                            <h3 className="font-semibold text-lg text-white capitalize">
                              {analysis.clause.category.replace(/_/g, " ")}
                            </h3>
                          </div>
                          <div className="text-sm text-slate-500">Page {analysis.clause.pageNumber}</div>
                        </div>
                        
                        <div className="bg-slate-900 p-3 rounded text-sm text-slate-300 font-mono mb-4 border border-slate-800">
                          "{analysis.clause.textSnippet}"
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-500 font-medium block mb-1">Why it matters:</span>
                            <span className="text-slate-300">{analysis.riskExplanation.whyItMatters}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 font-medium block mb-1">Recommended Action:</span>
                            <span className="text-blue-400 font-medium">{analysis.riskExplanation.suggestedPosition}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            )}

            {/* NEGOTIATION GUIDE */}
            {results && (
              <TabsContent value="guide" className="mt-6">
                <Card className="bg-slate-900 border-slate-800 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-white">Negotiation Guide</h2>
                      <p className="text-slate-400 text-sm mt-1">Suggested replacement language and broker talking points.</p>
                    </div>
                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800">
                      <Download className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>

                  <div className="space-y-6">
                    {results.report.negotiationGuide.riskyClause.map((item, i) => (
                      <Card key={i} className="bg-slate-950 border-slate-800 overflow-hidden">
                        <div className="bg-slate-900 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
                          <h4 className="font-semibold text-white capitalize flex items-center">
                            <Target className="w-4 h-4 mr-2 text-blue-400" />
                            {item.category.replace(/_/g, " ")}
                          </h4>
                        </div>
                        <div className="p-6 grid md:grid-cols-2 gap-6">
                          <div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Current Language</div>
                            <div className="bg-red-950/20 border border-red-900/30 p-3 rounded text-sm text-slate-300 mb-4">
                              {item.currentLanguage}
                            </div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recommended Language</div>
                            <div className="bg-green-950/20 border border-green-900/30 p-3 rounded text-sm text-green-400">
                              {item.recommendedLanguage}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Broker Talking Points</div>
                            <ul className="space-y-2">
                              {item.talkingPoints.map((tp, idx) => (
                                <li key={idx} className="flex gap-2 text-sm text-slate-300">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                  {tp}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </TabsContent>
            )}

            {/* BOARD SUMMARY */}
            {results && (
              <TabsContent value="board" className="mt-6">
                <div className="max-w-4xl mx-auto">
                  <Card className="bg-white text-slate-900 p-10 shadow-2xl relative overflow-hidden rounded-xl">
                    {/* Watermark */}
                    <div className="absolute top-10 right-10 opacity-5">
                      <Scale className="w-48 h-48" />
                    </div>

                    <div className="border-b-2 border-slate-200 pb-6 mb-8">
                      <div className="flex justify-between items-end">
                        <div>
                          <h1 className="text-3xl font-serif font-bold text-slate-900">Contract Governance Brief</h1>
                          <p className="text-slate-500 mt-1 uppercase tracking-wider text-sm font-semibold">
                            Fiduciary & Economic Risk Assessment
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-500">Date: {new Date().toLocaleDateString()}</div>
                          <div className="text-sm font-medium text-slate-500">Entity: Acme Corp</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-10">
                      <div className="col-span-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Overall Governance Score</div>
                        <div className="text-3xl font-bold text-red-600">
                          {results.report.boardSummary.overallGovernanceScore.toFixed(1)}<span className="text-lg text-slate-400">/10</span>
                        </div>
                      </div>
                      <div className="col-span-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Confidence Level</div>
                        <div className="text-xl font-bold text-slate-700 capitalize mt-1">
                          {results.report.boardSummary.confidenceLevel}
                        </div>
                      </div>
                      <div className="col-span-1 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Recommendation</div>
                        <div className="text-xl font-bold text-red-600 capitalize mt-1">
                          {results.report.boardSummary.recommendation}
                        </div>
                      </div>
                    </div>

                    <div className="mb-10">
                      <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Executive Brief</h3>
                      <p className="text-slate-700 leading-relaxed">
                        {results.report.boardSummary.executiveBrief}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-10">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Top Economic Exposures</h3>
                        <ul className="space-y-4">
                          {results.report.boardSummary.topEconomicExposures.map((exp, i) => (
                            <li key={i} className="text-sm">
                              <div className="font-bold text-slate-800">{exp.exposure}</div>
                              <div className="text-slate-600">{exp.impact}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-4">Transparency Failures</h3>
                        <ul className="space-y-4">
                          {results.report.boardSummary.topTransparencyFailures.map((fail, i) => (
                            <li key={i} className="text-sm">
                              <div className="font-bold text-slate-800">{fail.failure}</div>
                              <div className="text-slate-600">{fail.consequence}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Termination / Exit Risk</h3>
                      <p className="text-slate-700 text-sm">
                        {results.report.boardSummary.terminationExitRisk}
                      </p>
                    </div>

                  </Card>
                </div>
              </TabsContent>
            )}

            {/* COMPARE TAB (Placeholder for future iteration) */}
            {results && (
              <TabsContent value="compare" className="mt-6">
                <Card className="bg-slate-900/50 border-slate-800 p-12 text-center">
                  <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h2 className="text-xl font-semibold text-white mb-2">Contract Comparison Engine</h2>
                  <p className="text-slate-400 max-w-md mx-auto mb-6">
                    Upload a revised version of the contract to see side-by-side redlines, identified improvements, regressions, and unresolved gaps.
                  </p>
                  <Button variant="outline" className="border-slate-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Revised Contract
                  </Button>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>

        <KincaidHealthFooter />
      </div>
    </>
  );
}