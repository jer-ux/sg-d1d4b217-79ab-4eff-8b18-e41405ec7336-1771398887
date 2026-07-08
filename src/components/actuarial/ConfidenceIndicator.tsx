/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Confidence Level Visualization
 */

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

interface ConfidenceIndicatorProps {
  dataQuality: number; // 0-1 scale
  sampleSize: number;
  variability: number; // coefficient of variation
  assumptions: string[];
}

export function ConfidenceIndicator({
  dataQuality,
  sampleSize,
  variability,
  assumptions
}: ConfidenceIndicatorProps) {
  
  // Calculate overall confidence score
  const calculateConfidence = () => {
    let score = 0;
    
    // Data quality contribution (40%)
    score += dataQuality * 40;
    
    // Sample size contribution (30%)
    const sampleScore = Math.min(sampleSize / 1000, 1) * 30;
    score += sampleScore;
    
    // Variability contribution (30%) - lower is better
    const variabilityScore = Math.max(0, (1 - variability) * 30);
    score += variabilityScore;
    
    return Math.round(score);
  };

  const confidenceScore = calculateConfidence();
  
  const getConfidenceLevel = () => {
    if (confidenceScore >= 80) return { level: "High", color: "green", icon: CheckCircle2 };
    if (confidenceScore >= 60) return { level: "Medium", color: "yellow", icon: Info };
    return { level: "Low", color: "red", icon: AlertTriangle };
  };

  const { level, color, icon: Icon } = getConfidenceLevel();

  const getColorClasses = () => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-50 dark:bg-green-950",
          border: "border-green-200 dark:border-green-800",
          text: "text-green-900 dark:text-green-100",
          icon: "text-green-600 dark:text-green-400"
        };
      case "yellow":
        return {
          bg: "bg-yellow-50 dark:bg-yellow-950",
          border: "border-yellow-200 dark:border-yellow-800",
          text: "text-yellow-900 dark:text-yellow-100",
          icon: "text-yellow-600 dark:text-yellow-400"
        };
      case "red":
        return {
          bg: "bg-red-50 dark:bg-red-950",
          border: "border-red-200 dark:border-red-800",
          text: "text-red-900 dark:text-red-100",
          icon: "text-red-600 dark:text-red-400"
        };
    }
  };

  const colors = getColorClasses();

  const getInterpretation = () => {
    if (confidenceScore >= 80) {
      return "This analysis is based on strong data and standard assumptions. Results are highly reliable.";
    }
    if (confidenceScore >= 60) {
      return "This analysis has moderate confidence. Consider collecting more data or validating assumptions.";
    }
    return "Results have significant uncertainty. Use with caution and consider sensitivity analysis.";
  };

  return (
    <Card className={`p-6 ${colors.bg} border-2 ${colors.border}`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full ${colors.bg}`}>
          <Icon className={`h-6 w-6 ${colors.icon}`} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className={`font-semibold text-lg ${colors.text}`}>
              {level} Confidence
            </h3>
            <Badge variant="outline" className={colors.text}>
              {confidenceScore}/100
            </Badge>
          </div>

          <p className={`text-sm mb-4 ${colors.text} opacity-90`}>
            {getInterpretation()}
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Data Quality</span>
              <div className="flex items-center gap-2">
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${color === "green" ? "bg-green-600" : color === "yellow" ? "bg-yellow-600" : "bg-red-600"}`}
                    style={{ width: `${dataQuality * 100}%` }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">
                  {Math.round(dataQuality * 100)}%
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Sample Size</span>
              <span className="text-sm text-muted-foreground">
                {sampleSize.toLocaleString()} observations
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Variability (CV)</span>
              <span className="text-sm text-muted-foreground">
                {(variability * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {assumptions.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-semibold mb-2">Key Assumptions</h4>
              <ul className="space-y-1">
                {assumptions.slice(0, 3).map((assumption, i) => (
                  <li key={i} className="text-xs opacity-80">
                    • {assumption}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}