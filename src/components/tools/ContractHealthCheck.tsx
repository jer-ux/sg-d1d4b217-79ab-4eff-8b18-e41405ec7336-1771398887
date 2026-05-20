import { useState } from "react";
import { Upload, FileText, AlertTriangle, CheckCircle2, XCircle, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RedFlag {
  severity: "critical" | "high" | "medium";
  provision: string;
  issue: string;
  impact: string;
  page?: number;
}

export function ContractHealthCheck() {
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<RedFlag[] | null>(null);
  const [overallScore, setOverallScore] = useState<number>(0);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResults(null);
    }
  };

  const analyzeContract = () => {
    setAnalyzing(true);
    
    // Simulate analysis with mock data
    setTimeout(() => {
      const mockRedFlags: RedFlag[] = [
        {
          severity: "critical",
          provision: "Fiduciary Loyalty",
          issue: "No explicit fiduciary acceptance found",
          impact: "PBM can legally act in its own interest over the plan. Personal liability exposure for plan fiduciaries.",
          page: 3
        },
        {
          severity: "critical",
          provision: "Rebate Revenue Retention",
          issue: "No 100% pass-through language detected",
          impact: "$627K potential annual leakage. PBM retains undisclosed manufacturer payments.",
          page: 12
        },
        {
          severity: "high",
          provision: "Audit Rights",
          issue: "Extrapolation permitted without appeal",
          impact: "$384K risk exposure. PBM can project overpayments across all claims without verification.",
          page: 18
        },
        {
          severity: "high",
          provision: "Pharmacy Ownership Disclosure",
          issue: "No conflict of interest disclosure requirement",
          impact: "$512K routing bias risk. PBM-owned pharmacies receive preferential treatment.",
          page: 7
        },
        {
          severity: "high",
          provision: "DIR Fees",
          issue: "Post-adjudication price adjustments permitted",
          impact: "$425K hidden retroactive charges. Point-of-sale pricing is not final.",
          page: 15
        },
        {
          severity: "medium",
          provision: "Data Ownership",
          issue: "Plan data access restricted to quarterly reports",
          impact: "$96K missed intervention opportunities. Real-time fraud detection impossible.",
          page: 22
        },
        {
          severity: "medium",
          provision: "Termination Clause",
          issue: "90-day notice with administrative fees",
          impact: "$156K exit barrier. Plan cannot respond quickly to PBM performance issues.",
          page: 29
        }
      ];

      setResults(mockRedFlags);
      setOverallScore(32); // Out of 100
      setAnalyzing(false);
    }, 3000);
  };

  const criticalCount = results?.filter(r => r.severity === "critical").length || 0;
  const highCount = results?.filter(r => r.severity === "high").length || 0;
  const mediumCount = results?.filter(r => r.severity === "medium").length || 0;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-red-500/30 bg-gray-900/50 backdrop-blur-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 rounded-full mb-4">
            <FileText className="w-5 h-5 text-red-400" />
            <span className="text-sm font-semibold text-red-300">Free Contract Analysis</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            PBM Contract Health Check
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload your PBM contract and get instant analysis of red flags, hidden costs, and fiduciary risks
          </p>
        </div>

        {/* Upload Area */}
        {!results && (
          <div>
            <div className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-purple-500/50 transition-colors">
              <Upload className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {file ? file.name : "Upload Your PBM Contract"}
              </h3>
              <p className="text-gray-400 mb-6">
                PDF format, first 50 pages analyzed free
              </p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="contract-upload"
              />
              <label htmlFor="contract-upload">
                <Button
                  as="span"
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10 cursor-pointer"
                >
                  Select File
                </Button>
              </label>
            </div>

            {file && (
              <div className="mt-6 flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-10 h-10 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">{file.name}</p>
                    <p className="text-sm text-gray-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  onClick={analyzeContract}
                  disabled={analyzing}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  {analyzing ? "Analyzing..." : "Analyze Contract"}
                </Button>
              </div>
            )}

            {/* Sample Report CTA */}
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
              <div className="flex items-start gap-4">
                <Eye className="w-6 h-6 text-purple-400 mt-1" />
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    See a Sample Analysis First
                  </h4>
                  <p className="text-gray-400 text-sm mb-3">
                    View a detailed example of what our X-Ray analysis reveals in a typical PBM contract
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                  >
                    View Sample Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* Score Card */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-red-500/30 p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-white mb-2">Contract Health Score</h3>
                  <p className="text-gray-400">Based on 15 critical provision analysis</p>
                </div>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-8 border-red-500/30 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-400">{overallScore}</div>
                      <div className="text-xs text-gray-400">/ 100</div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2">
                    <Badge className="bg-red-500/20 text-red-300 border-red-500/50">
                      FAILING
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-red-400">{criticalCount}</div>
                    <div className="text-xs text-gray-400 mt-1">Critical</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-400">{highCount}</div>
                    <div className="text-xs text-gray-400 mt-1">High</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-yellow-400">{mediumCount}</div>
                    <div className="text-xs text-gray-400 mt-1">Medium</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Red Flags */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                Detected Red Flags
              </h3>
              <div className="space-y-3">
                {results.map((flag, idx) => (
                  <Card
                    key={idx}
                    className={`p-5 border-l-4 ${
                      flag.severity === "critical"
                        ? "border-l-red-500 bg-red-500/5"
                        : flag.severity === "high"
                        ? "border-l-orange-500 bg-orange-500/5"
                        : "border-l-yellow-500 bg-yellow-500/5"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <XCircle
                          className={`w-6 h-6 ${
                            flag.severity === "critical"
                              ? "text-red-400"
                              : flag.severity === "high"
                              ? "text-orange-400"
                              : "text-yellow-400"
                          }`}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-semibold">{flag.provision}</span>
                            <Badge
                              className={`text-xs ${
                                flag.severity === "critical"
                                  ? "bg-red-500/20 text-red-300 border-red-500/50"
                                  : flag.severity === "high"
                                  ? "bg-orange-500/20 text-orange-300 border-orange-500/50"
                                  : "bg-yellow-500/20 text-yellow-300 border-yellow-500/50"
                              }`}
                            >
                              {flag.severity.toUpperCase()}
                            </Badge>
                            {flag.page && (
                              <span className="text-xs text-gray-500">Page {flag.page}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-9 space-y-2">
                      <div>
                        <span className="text-sm font-semibold text-gray-400">Issue:</span>
                        <p className="text-white">{flag.issue}</p>
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-gray-400">Financial Impact:</span>
                        <p className="text-gray-300">{flag.impact}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Full Report CTA */}
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                This Contract Has Serious Issues
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                We've identified {results.length} red flags in your contract analysis. Get a complete 50+ page forensic report with specific fix language and negotiation strategies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                >
                  Schedule Contract Review Call
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Summary (PDF)
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                100% confidential • No obligation • Expert review within 48 hours
              </p>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}