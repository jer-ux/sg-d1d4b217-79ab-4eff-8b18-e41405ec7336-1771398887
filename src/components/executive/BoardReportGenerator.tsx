import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  FileText,
  Presentation,
  Mail,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Users,
  Target,
  Sparkles
} from "lucide-react";

export function BoardReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSections, setSelectedSections] = useState<string[]>([
    "executive-summary",
    "financial-performance",
    "strategic-initiatives",
    "risk-assessment"
  ]);

  const reportSections = [
    {
      id: "executive-summary",
      title: "Executive Summary",
      description: "High-level overview with key takeaways",
      icon: FileText,
      required: true
    },
    {
      id: "financial-performance",
      title: "Financial Performance",
      description: "Revenue, savings, ROI metrics",
      icon: DollarSign,
      required: true
    },
    {
      id: "strategic-initiatives",
      title: "Strategic Initiatives",
      description: "Progress on key projects",
      icon: Target,
      required: false
    },
    {
      id: "risk-assessment",
      title: "Risk Assessment",
      description: "Identified risks and mitigation",
      icon: AlertTriangle,
      required: false
    },
    {
      id: "market-intelligence",
      title: "Market Intelligence",
      description: "Competitive landscape, trends",
      icon: TrendingUp,
      required: false
    },
    {
      id: "operational-metrics",
      title: "Operational Metrics",
      description: "KPIs, performance indicators",
      icon: Users,
      required: false
    }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In production, call API to generate report
    // const response = await fetch('/api/executive/generate-board-report', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ sections: selectedSections })
    // });
    
    setIsGenerating(false);
    
    // Download the generated report
    console.log("Report generated with sections:", selectedSections);
  };

  const toggleSection = (sectionId: string) => {
    const section = reportSections.find(s => s.id === sectionId);
    if (section?.required) return;
    
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Presentation className="w-7 h-7 text-blue-500" />
            Board Report Generator
          </h2>
          <p className="text-slate-400 mt-1">
            AI-powered executive presentations in 60 seconds
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Delivery
          </Button>
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Mail className="w-4 h-4 mr-2" />
            Email to Board
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="col-span-2 space-y-6">
          {/* Quick Templates */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Templates</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedSections(["executive-summary", "financial-performance", "risk-assessment"])}
                  className="p-4 rounded-xl border-2 border-slate-700 hover:border-blue-500 transition-all text-left group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-white">Quick Update</span>
                  </div>
                  <p className="text-xs text-slate-400">Financial highlights + risks</p>
                </button>

                <button
                  onClick={() => setSelectedSections(reportSections.map(s => s.id))}
                  className="p-4 rounded-xl border-2 border-slate-700 hover:border-purple-500 transition-all text-left group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold text-white">Comprehensive</span>
                  </div>
                  <p className="text-xs text-slate-400">All sections included</p>
                </button>

                <button
                  onClick={() => setSelectedSections(["executive-summary", "strategic-initiatives", "market-intelligence"])}
                  className="p-4 rounded-xl border-2 border-slate-700 hover:border-green-500 transition-all text-left group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-green-500" />
                    <span className="font-semibold text-white">Strategic</span>
                  </div>
                  <p className="text-xs text-slate-400">Focus on initiatives</p>
                </button>
              </div>
            </div>
          </Card>

          {/* Section Selection */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Report Sections</h3>
              
              <div className="space-y-3">
                {reportSections.map((section) => (
                  <div
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedSections.includes(section.id)
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-slate-700 hover:border-slate-600"
                    } ${section.required ? "opacity-100" : "opacity-100"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedSections.includes(section.id)
                            ? "bg-blue-500/20"
                            : "bg-slate-800"
                        }`}>
                          <section.icon className={`w-5 h-5 ${
                            selectedSections.includes(section.id)
                              ? "text-blue-500"
                              : "text-slate-400"
                          }`} />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white">{section.title}</span>
                            {section.required && (
                              <Badge variant="outline" className="border-blue-500/30 text-blue-500 text-xs">
                                Required
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-400">{section.description}</p>
                        </div>
                      </div>

                      {selectedSections.includes(section.id) && (
                        <CheckCircle2 className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Preview & Actions */}
        <div className="space-y-6">
          {/* Report Preview */}
          <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700 backdrop-blur-sm">
            <div className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">Report Preview</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Sections:</span>
                  <span className="font-semibold text-white">{selectedSections.length} of {reportSections.length}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Est. Length:</span>
                  <span className="font-semibold text-white">{selectedSections.length * 3}-{selectedSections.length * 5} slides</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Generation Time:</span>
                  <span className="font-semibold text-white">~60 seconds</span>
                </div>

                <div className="pt-3 border-t border-slate-700">
                  <div className="text-sm text-slate-400 mb-2">Output Formats:</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-slate-300">PowerPoint (.pptx)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-slate-300">PDF Document</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-slate-300">Google Slides</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleGenerateReport}
                disabled={isGenerating || selectedSections.length === 0}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Board Report
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* AI Enhancement */}
          <Card className="bg-gradient-to-br from-purple-950/30 to-blue-950/30 border-purple-700/30 backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-sm font-bold text-white">AI Enhancements</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Executive Summaries</p>
                    <p className="text-xs text-slate-400">Claude-powered insights</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Data Storytelling</p>
                    <p className="text-xs text-slate-400">Compelling narratives</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Smart Visualizations</p>
                    <p className="text-xs text-slate-400">Auto-optimized charts</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">Talking Points</p>
                    <p className="text-xs text-slate-400">Speaker notes included</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}