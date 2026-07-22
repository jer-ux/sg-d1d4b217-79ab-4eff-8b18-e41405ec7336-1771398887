import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Activity,
  DollarSign,
  Zap
} from "lucide-react";

interface RiskMetric {
  label: string;
  value: number;
  threshold: number;
  status: "low" | "medium" | "high" | "critical";
  trend: "up" | "down" | "stable";
  impact: string;
}

export function RiskExposureDashboard() {
  const riskMetrics: RiskMetric[] = [
    {
      label: "Specialty Drug Exposure",
      value: 3247000,
      threshold: 2500000,
      status: "high",
      trend: "up",
      impact: "$3.2M annual exposure, 29.9% above threshold"
    },
    {
      label: "Stop-Loss Utilization",
      value: 78,
      threshold: 85,
      status: "medium",
      trend: "up",
      impact: "78% of attachment point, trending toward trigger"
    },
    {
      label: "Catastrophic Claim Risk",
      value: 23,
      threshold: 15,
      status: "high",
      trend: "stable",
      impact: "23% probability of $1M+ claim in next 12 months"
    },
    {
      label: "GLP-1 Drug Trend",
      value: 187,
      threshold: 100,
      status: "critical",
      trend: "up",
      impact: "187% growth rate, major EBITDA pressure"
    }
  ];

  const overallRiskScore = Math.round(
    riskMetrics.reduce((acc, metric) => {
      const statusScore = {
        low: 1,
        medium: 2,
        high: 3,
        critical: 4
      }[metric.status];
      return acc + statusScore;
    }, 0) / riskMetrics.length * 25
  );

  const getRiskColor = (status: string) => {
    switch (status) {
      case "low":
        return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "medium":
        return "text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "high":
        return "text-orange-400 bg-orange-500/10 border-orange-500/20";
      case "critical":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      default:
        return "text-neutral-400 bg-neutral-500/10 border-neutral-500/20";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-3 h-3" />;
    if (trend === "down") return <TrendingUp className="w-3 h-3 rotate-180" />;
    return <Activity className="w-3 h-3" />;
  };

  const getOverallRiskStatus = () => {
    if (overallRiskScore >= 75) return { status: "critical", color: "from-red-500 to-orange-500", label: "CRITICAL RISK" };
    if (overallRiskScore >= 50) return { status: "high", color: "from-orange-500 to-amber-500", label: "HIGH RISK" };
    if (overallRiskScore >= 25) return { status: "medium", color: "from-amber-500 to-yellow-500", label: "ELEVATED RISK" };
    return { status: "low", color: "from-emerald-500 to-teal-500", label: "LOW RISK" };
  };

  const overallRisk = getOverallRiskStatus();

  return (
    <Card className="bg-gradient-to-br from-[#0F1419] to-[#1A3A52] border-[#B8860B]/20 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-white">
                Risk Exposure Dashboard
              </CardTitle>
              <p className="text-xs text-neutral-400 mt-1">
                Real-time risk monitoring & catastrophic claim prediction
              </p>
            </div>
          </div>
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(239, 68, 68, 0.2)",
                "0 0 30px rgba(239, 68, 68, 0.4)",
                "0 0 20px rgba(239, 68, 68, 0.2)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Badge className={`${getRiskColor(overallRisk.status)} px-3 py-1 text-xs font-bold border`}>
              {overallRisk.label}
            </Badge>
          </motion.div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Risk Score */}
        <div className="relative p-6 bg-black/30 rounded-xl border border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-semibold text-neutral-300">
                Composite Risk Score
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Aggregated risk across all categories
              </p>
            </div>
            <motion.div
              className={`text-4xl font-bold bg-gradient-to-r ${overallRisk.color} bg-clip-text text-transparent`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {overallRiskScore}
            </motion.div>
          </div>
          <Progress 
            value={overallRiskScore} 
            className="h-3 bg-neutral-800/50"
          />
          <div className="flex justify-between text-xs text-neutral-500 mt-2">
            <span>0 - Low Risk</span>
            <span>100 - Critical</span>
          </div>
        </div>

        {/* Individual Risk Metrics */}
        <div className="grid gap-4">
          {riskMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-black/20 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h5 className="text-sm font-semibold text-white">
                      {metric.label}
                    </h5>
                    <Badge className={`${getRiskColor(metric.status)} px-2 py-0.5 text-[10px] font-bold border`}>
                      {metric.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-neutral-400">
                    {metric.impact}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <div className={`${metric.trend === "up" ? "text-red-400" : "text-emerald-400"}`}>
                    {getTrendIcon(metric.trend)}
                  </div>
                </div>
              </div>

              {/* Value Display */}
              <div className="flex items-baseline gap-2 mb-2">
                {metric.label.includes("Exposure") || metric.label.includes("Claim") ? (
                  <>
                    <DollarSign className="w-4 h-4 text-[#B8860B]" />
                    <span className="text-2xl font-bold text-white">
                      {(metric.value / 1000000).toFixed(1)}M
                    </span>
                  </>
                ) : (
                  <>
                    {metric.label.includes("GLP-1") ? (
                      <Zap className="w-4 h-4 text-[#B8860B]" />
                    ) : (
                      <Activity className="w-4 h-4 text-[#B8860B]" />
                    )}
                    <span className="text-2xl font-bold text-white">
                      {metric.value}%
                    </span>
                  </>
                )}
                <span className="text-xs text-neutral-500">
                  / {metric.label.includes("Exposure") || metric.label.includes("Claim") 
                    ? `$${(metric.threshold / 1000000).toFixed(1)}M` 
                    : `${metric.threshold}%`} threshold
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <Progress 
                  value={
                    metric.label.includes("Exposure") || metric.label.includes("Claim")
                      ? (metric.value / metric.threshold) * 100
                      : (metric.value / 100) * 100
                  }
                  className="h-2 bg-neutral-800/50"
                />
                {/* Threshold Marker */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-[#B8860B]"
                  style={{ 
                    left: metric.label.includes("Exposure") || metric.label.includes("Claim")
                      ? "100%" 
                      : `${metric.threshold}%` 
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Items */}
        <div className="p-4 bg-gradient-to-r from-[#B8860B]/10 to-transparent rounded-lg border border-[#B8860B]/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#B8860B] mt-0.5 flex-shrink-0" />
            <div>
              <h5 className="text-sm font-semibold text-[#B8860B] mb-1">
                Immediate Actions Required
              </h5>
              <ul className="text-xs text-neutral-400 space-y-1">
                <li>• Review GLP-1 utilization management strategy</li>
                <li>• Evaluate stop-loss attachment point for Q4 renewal</li>
                <li>• Implement specialty drug prior authorization protocols</li>
                <li>• Schedule catastrophic claim scenario planning session</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}