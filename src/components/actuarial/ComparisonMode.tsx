/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Side-by-Side Scenario Comparison
 */

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";

interface ComparisonResult {
  scenario: string;
  mean: number;
  median: number;
  p95: number;
  var95: number;
}

interface ComparisonModeProps {
  modelType: string;
  scenarios: string[];
  baseParams: Record<string, any>;
}

export function ComparisonMode({ modelType, scenarios, baseParams }: ComparisonModeProps) {
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<"mean" | "p95" | "var95">("mean");

  useEffect(() => {
    runComparison();
  }, [scenarios, baseParams]);

  const runComparison = async () => {
    setIsLoading(true);

    try {
      const promises = scenarios.map(async (scenario) => {
        const response = await fetch("/api/simulations/run", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: modelType,
            scenario,
            params: baseParams
          })
        });

        const data = await response.json();
        return {
          scenario,
          mean: data.summary.mean,
          median: data.summary.median,
          p95: data.summary.p95,
          var95: data.var95
        };
      });

      const comparisonResults = await Promise.all(promises);
      setResults(comparisonResults);
    } catch (error) {
      console.error("Comparison error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const metricLabels = {
    mean: "Average Outcome",
    p95: "95th Percentile",
    var95: "Value at Risk (95%)"
  };

  const chartData = results.map(r => ({
    name: r.scenario.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    value: r[selectedMetric],
    scenario: r.scenario
  }));

  const getBarColor = (scenario: string) => {
    if (scenario.includes("baseline")) return "hsl(var(--primary))";
    if (scenario.includes("high") || scenario.includes("shock") || scenario.includes("pressure")) return "hsl(0, 84%, 60%)";
    if (scenario.includes("cost") || scenario.includes("containment") || scenario.includes("optimization")) return "hsl(142, 76%, 36%)";
    return "hsl(var(--muted))";
  };

  const calculateDifference = (value: number, baseValue: number) => {
    const diff = ((value - baseValue) / baseValue) * 100;
    return {
      value: Math.abs(diff),
      isIncrease: diff > 0,
      isBaseline: Math.abs(diff) < 0.1
    };
  };

  const baselineResult = results.find(r => r.scenario.includes("baseline"));

  if (isLoading) {
    return (
      <Card className="p-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 w-48 bg-muted rounded mx-auto mb-4" />
          <div className="h-4 w-64 bg-muted rounded mx-auto" />
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Scenario Comparison</h2>
          <p className="text-muted-foreground">
            Compare {scenarios.length} scenarios side-by-side
          </p>
        </div>

        <div className="flex gap-2">
          {Object.entries(metricLabels).map(([key, label]) => (
            <Button
              key={key}
              variant={selectedMetric === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric(key as any)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">{metricLabels[selectedMetric]} Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="name" 
              className="text-xs"
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              className="text-xs"
              tickFormatter={(value) => `$${(value / 1_000_000).toFixed(1)}M`}
            />
            <Tooltip 
              formatter={(value: number) => `$${value.toLocaleString()}`}
              contentStyle={{ 
                backgroundColor: "hsl(var(--background))", 
                border: "1px solid hsl(var(--border))" 
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.scenario)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {results.map((result) => {
          const isBaseline = result.scenario.includes("baseline");
          const diff = baselineResult && !isBaseline 
            ? calculateDifference(result[selectedMetric], baselineResult[selectedMetric])
            : null;

          return (
            <Card key={result.scenario} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold mb-1">
                    {result.scenario.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </h4>
                  {isBaseline && <Badge variant="secondary">Baseline</Badge>}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Mean</div>
                  <div className="text-2xl font-bold">
                    ${(result.mean / 1_000_000).toFixed(2)}M
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">95th Percentile</div>
                  <div className="text-lg font-semibold">
                    ${(result.p95 / 1_000_000).toFixed(2)}M
                  </div>
                </div>

                {diff && (
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${
                    diff.isIncrease 
                      ? "bg-red-50 dark:bg-red-950" 
                      : "bg-green-50 dark:bg-green-950"
                  }`}>
                    {diff.isBaseline ? (
                      <Minus className="h-4 w-4" />
                    ) : diff.isIncrease ? (
                      <TrendingUp className="h-4 w-4 text-red-600 dark:text-red-400" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-green-600 dark:text-green-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      diff.isIncrease 
                        ? "text-red-900 dark:text-red-100" 
                        : "text-green-900 dark:text-green-100"
                    }`}>
                      {diff.isIncrease ? "+" : "-"}{diff.value.toFixed(1)}% vs baseline
                    </span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-primary/5 border-primary/20">
        <h4 className="font-semibold mb-2">What This Comparison Shows</h4>
        <p className="text-sm text-muted-foreground">
          These scenarios use different assumptions about future conditions. The baseline represents 
          expected normal conditions, while other scenarios show what could happen under different 
          economic or operational situations.
        </p>
      </Card>
    </div>
  );
}