import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, Calendar, TrendingUp, 
  Shield, Zap, Target, CheckCircle, AlertCircle,
  DollarSign, Activity, Users
} from "lucide-react";
import { motion } from "framer-motion";

type ReportSection = {
  id: string;
  title: string;
  included: boolean;
  icon: React.ElementType;
};

export function ExecutiveReportGenerator() {
  const [reportPeriod, setReportPeriod] = useState<"month" | "quarter" | "year">("quarter");
  const [sections, setSections] = useState<ReportSection[]>([
    { id: "executive-summary", title: "Executive Summary", included: true, icon: Target },
    { id: "financial-impact", title: "Financial Impact Analysis", included: true, icon: DollarSign },
    { id: "mckinsey-7s", title: "McKinsey 7S Assessment", included: true, icon: Activity },
    { id: "bain-rapid", title: "Bain RAPID Framework", included: true, icon: Users },
    { id: "bcg-matrix", title: "BCG Portfolio Analysis", included: true, icon: TrendingUp },
    { id: "porter-forces", title: "Porter's Five Forces", included: true, icon: Shield },
    { id: "war-room-metrics", title: "War Room KPIs", included: true, icon: Zap },
    { id: "evidence-library", title: "Evidence & Compliance", included: true, icon: FileText },
    { id: "recommendations", title: "Strategic Recommendations", included: true, icon: CheckCircle }
  ]);
  const [generating, setGenerating] = useState(false);

  const toggleSection = (id: string) => {
    setSections(sections.map(s => 
      s.id === id ? { ...s, included: !s.included } : s
    ));
  };

  const generateReport = async () => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGenerating(false);
    
    const reportData = {
      period: reportPeriod,
      sections: sections.filter(s => s.included).map(s => s.id),
      generatedAt: new Date().toISOString()
    };
    
    console.log("Generated report:", reportData);
    
    alert("Executive report generated! In production, this would download a comprehensive PDF report with all selected sections.");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 backdrop-blur-xl border-blue-500/20 p-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Executive Report Generator
          </h3>
          <p className="text-white/60">
            Generate board-ready strategic reports combining operational metrics with consulting frameworks
          </p>
        </div>

        {/* Report Period Selection */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-white/70 mb-3 block">
            Reporting Period
          </label>
          <div className="flex gap-3">
            {[
              { value: "month" as const, label: "Monthly" },
              { value: "quarter" as const, label: "Quarterly" },
              { value: "year" as const, label: "Annual" }
            ].map((period) => (
              <Button
                key={period.value}
                variant={reportPeriod === period.value ? "default" : "outline"}
                onClick={() => setReportPeriod(period.value)}
                className={
                  reportPeriod === period.value
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "border-white/20 bg-white/5 text-white/60 hover:bg-white/10"
                }
              >
                <Calendar className="w-4 h-4 mr-2" />
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Section Selection */}
        <div className="mb-8">
          <label className="text-sm font-semibold text-white/70 mb-3 block">
            Report Sections
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all ${
                      section.included
                        ? "bg-blue-500/10 border-blue-500/40"
                        : "bg-white/5 border-white/20"
                    }`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          section.included ? "bg-blue-500/20" : "bg-white/5"
                        }`}>
                          <Icon className={`w-4 h-4 ${
                            section.included ? "text-blue-400" : "text-white/40"
                          }`} />
                        </div>
                        <span className={`text-sm font-medium ${
                          section.included ? "text-white" : "text-white/50"
                        }`}>
                          {section.title}
                        </span>
                      </div>
                      {section.included && (
                        <CheckCircle className="w-5 h-5 text-blue-400" />
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Report Preview Stats */}
        <Card className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border-blue-500/20 p-6 mb-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">
                {sections.filter(s => s.included).length}
              </div>
              <div className="text-sm text-white/50">Sections Included</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">
                ~{sections.filter(s => s.included).length * 3}
              </div>
              <div className="text-sm text-white/50">Pages Estimated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-1">
                {reportPeriod === "month" ? "30" : reportPeriod === "quarter" ? "90" : "365"}
              </div>
              <div className="text-sm text-white/50">Days Covered</div>
            </div>
          </div>
        </Card>

        {/* Generate Button */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-white/50">
            <AlertCircle className="w-4 h-4 inline mr-2" />
            Report will include live data from War Room and all strategic frameworks
          </div>
          <Button
            size="lg"
            onClick={generateReport}
            disabled={generating || sections.filter(s => s.included).length === 0}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white"
          >
            {generating ? (
              <>
                <Activity className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Generate Executive Report
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Sample Report Preview */}
      <Card className="bg-white/5 backdrop-blur-xl border-amber-500/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-5 h-5 text-amber-400" />
          <h4 className="font-bold text-white">Report Will Include</h4>
        </div>
        <div className="space-y-2 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Executive summary with key insights and recommendations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Financial impact analysis with ROI calculations</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Strategic framework assessments (McKinsey, Bain, BCG, Porter)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Operational KPIs and War Room metrics</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Evidence-backed findings with audit trails</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Board-ready visualizations and executive dashboards</span>
          </div>
        </div>
      </Card>
    </div>
  );
}