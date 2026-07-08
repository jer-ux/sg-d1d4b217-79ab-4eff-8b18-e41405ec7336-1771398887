/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Interactive What-If Scenario Builder
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, TrendingDown, RotateCcw } from "lucide-react";

interface WhatIfCalculatorProps {
  baseScenario: Record<string, any>;
  onCalculate: (adjustedParams: Record<string, any>) => void;
}

interface Parameter {
  name: string;
  label: string;
  description: string;
  baseValue: number;
  min: number;
  max: number;
  step: number;
  format: (value: number) => string;
}

export function WhatIfCalculator({ baseScenario, onCalculate }: WhatIfCalculatorProps) {
  const parameters: Parameter[] = [
    {
      name: "trend_mean",
      label: "Medical Trend",
      description: "Annual healthcare cost inflation rate",
      baseValue: 0.08,
      min: 0.03,
      max: 0.15,
      step: 0.005,
      format: (v) => `${(v * 100).toFixed(1)}%`
    },
    {
      name: "util_mean",
      label: "Utilization Factor",
      description: "Change in healthcare service usage",
      baseValue: 1.02,
      min: 0.90,
      max: 1.15,
      step: 0.01,
      format: (v) => `${((v - 1) * 100).toFixed(1)}%`
    },
    {
      name: "severity_mean",
      label: "Severity Factor",
      description: "Change in cost per service",
      baseValue: 1.04,
      min: 0.95,
      max: 1.20,
      step: 0.01,
      format: (v) => `${((v - 1) * 100).toFixed(1)}%`
    }
  ];

  const [adjustments, setAdjustments] = useState<Record<string, number>>(
    parameters.reduce((acc, p) => ({ ...acc, [p.name]: p.baseValue }), {})
  );

  const [comparisonResult, setComparisonResult] = useState<{
    baseline: number;
    adjusted: number;
    difference: number;
    percentChange: number;
  } | null>(null);

  const handleAdjustment = (name: string, value: number) => {
    setAdjustments(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = async () => {
    const adjustedParams = { ...baseScenario, ...adjustments };
    
    // Run both baseline and adjusted scenarios
    const [baselineRes, adjustedRes] = await Promise.all([
      fetch("/api/simulations/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "healthcare",
          scenario: "baseline",
          params: { ...baseScenario, iterations: 5000 }
        })
      }),
      fetch("/api/simulations/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "healthcare",
          scenario: "custom",
          params: { ...adjustedParams, iterations: 5000 }
        })
      })
    ]);

    const baselineData = await baselineRes.json();
    const adjustedData = await adjustedRes.json();

    const baseline = baselineData.summary.mean;
    const adjusted = adjustedData.summary.mean;
    const difference = adjusted - baseline;
    const percentChange = (difference / baseline) * 100;

    setComparisonResult({
      baseline,
      adjusted,
      difference,
      percentChange
    });

    onCalculate(adjustedParams);
  };

  const handleReset = () => {
    setAdjustments(
      parameters.reduce((acc, p) => ({ ...acc, [p.name]: p.baseValue }), {})
    );
    setComparisonResult(null);
  };

  const hasChanges = parameters.some(p => 
    Math.abs(adjustments[p.name] - p.baseValue) > 0.001
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">What-If Calculator</h2>
          </div>
          <p className="text-muted-foreground">
            Adjust parameters and see the impact on costs
          </p>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleReset}
          disabled={!hasChanges}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Baseline
        </Button>
      </div>

      <Card className="p-6">
        <div className="space-y-8">
          {parameters.map((param) => {
            const currentValue = adjustments[param.name];
            const isIncreased = currentValue > param.baseValue;
            const isDecreased = currentValue < param.baseValue;
            const changePercent = ((currentValue - param.baseValue) / param.baseValue) * 100;

            return (
              <div key={param.name}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <Label className="text-base font-semibold">{param.label}</Label>
                    <p className="text-sm text-muted-foreground">{param.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{param.format(currentValue)}</div>
                    {Math.abs(changePercent) > 0.1 && (
                      <div className={`flex items-center gap-1 text-sm ${
                        isIncreased ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                      }`}>
                        {isIncreased ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {Math.abs(changePercent).toFixed(1)}% from baseline
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Slider
                    value={[currentValue]}
                    onValueChange={([value]) => handleAdjustment(param.name, value)}
                    min={param.min}
                    max={param.max}
                    step={param.step}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{param.format(param.min)}</span>
                    <span>Baseline: {param.format(param.baseValue)}</span>
                    <span>{param.format(param.max)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Button 
          onClick={handleCalculate} 
          disabled={!hasChanges}
          className="w-full mt-6"
        >
          Calculate Impact
        </Button>
      </Card>

      {comparisonResult && (
        <Card className="p-6 border-primary">
          <h3 className="font-semibold text-lg mb-4">Impact Analysis</h3>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Baseline Scenario</div>
              <div className="text-2xl font-bold">
                ${(comparisonResult.baseline / 1_000_000).toFixed(2)}M
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Adjusted Scenario</div>
              <div className="text-2xl font-bold">
                ${(comparisonResult.adjusted / 1_000_000).toFixed(2)}M
              </div>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-1">Cost Difference</div>
              <div className={`text-2xl font-bold flex items-center gap-2 ${
                comparisonResult.difference > 0 
                  ? "text-red-600 dark:text-red-400" 
                  : "text-green-600 dark:text-green-400"
              }`}>
                {comparisonResult.difference > 0 ? (
                  <TrendingUp className="h-6 w-6" />
                ) : (
                  <TrendingDown className="h-6 w-6" />
                )}
                ${Math.abs(comparisonResult.difference / 1_000_000).toFixed(2)}M
              </div>
            </div>
          </div>

          <div className={`mt-6 p-4 rounded-lg ${
            comparisonResult.difference > 0 
              ? "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800" 
              : "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"
          }`}>
            <p className={`font-medium ${
              comparisonResult.difference > 0 
                ? "text-red-900 dark:text-red-100" 
                : "text-green-900 dark:text-green-100"
            }`}>
              {comparisonResult.difference > 0 ? "Cost Increase: " : "Cost Savings: "}
              {Math.abs(comparisonResult.percentChange).toFixed(1)}%
            </p>
            <p className={`text-sm mt-1 ${
              comparisonResult.difference > 0 
                ? "text-red-800 dark:text-red-200" 
                : "text-green-800 dark:text-green-200"
            }`}>
              Your adjustments would {comparisonResult.difference > 0 ? "increase" : "decrease"} costs by 
              approximately ${Math.abs(comparisonResult.difference).toLocaleString()} compared to baseline.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}