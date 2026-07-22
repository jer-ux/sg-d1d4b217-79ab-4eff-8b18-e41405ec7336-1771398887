import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, CheckCircle2, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function BoardReportGenerator() {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = async () => {
    setGenerating(true);
    setProgress(0);

    const steps = [
      { label: "Extracting contract violations", value: 25 },
      { label: "Calculating EBITDA impact", value: 50 },
      { label: "Generating executive summary", value: 75 },
      { label: "Finalizing report", value: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(step.value);
    }

    setTimeout(() => {
      setGenerating(false);
      setProgress(0);
    }, 1000);
  };

  const metrics = [
    { label: "Identified Savings", value: "$2.4M", trend: "+18%", icon: TrendingUp, color: "emerald" },
    { label: "Contract Issues", value: "14", trend: "-3", icon: AlertTriangle, color: "orange" },
    { label: "Compliance Score", value: "87%", trend: "+5%", icon: CheckCircle2, color: "blue" },
    { label: "Days to Next Audit", value: "12", trend: "On track", icon: Clock, color: "purple" }
  ];

  return (
    <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Board Report Generator</h3>
            <p className="text-sm text-slate-400">One-click executive summary for board meetings</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-400" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            const colorMap = {
              emerald: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400",
              orange: "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400",
              blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
              purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400"
            };
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${colorMap[metric.color as keyof typeof colorMap]} border rounded-lg p-3`}
              >
                <div className="flex items-start justify-between mb-2">
                  <Icon className="w-4 h-4 opacity-70" />
                  <span className="text-xs font-mono opacity-70">{metric.trend}</span>
                </div>
                <div className="text-2xl font-bold mb-0.5">{metric.value}</div>
                <div className="text-xs opacity-70">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>

        {generating && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
              <span>Generating report...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
          >
            {generating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="w-4 h-4 mr-2" />
                </motion.div>
                Generating...
              </>
            ) : (
              <>
                <FileText className="w-4 h-4 mr-2" />
                Generate Board Report
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="border-slate-600 hover:bg-slate-800 text-slate-300"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-start gap-2 text-xs text-blue-300">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Report includes:</div>
              <div className="text-blue-300/80">
                Executive summary • Financial impact analysis • Contract compliance status • 
                Risk assessment • Action recommendations
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}