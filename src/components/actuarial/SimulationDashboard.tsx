"""
KINCAID HEALTH™ ACTUARIAL DASHBOARD
Main Simulation Interface
"""

import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Play, Save, FileText, HelpCircle, TrendingUp, Activity, AlertTriangle } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SimulationResult {
  summary: {
    mean: number;
    median: number;
    minimum: number;
    maximum: number;
    std_dev: number;
    p5: number;
    p25: number;
    p75: number;
    p95: number;
  };
  values: number[];
  assumptions: Record<string, any>;
}

interface Scenario {
  name: string;
  description: string;
  assumptions: Record<string, number>;
  tags: string[];
}

export function SimulationDashboard() {
  const [selectedModel, setSelectedModel] = useState<string>("healthcare");
  const [selectedScenario, setSelectedScenario] = useState<string>("baseline");
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [customParams, setCustomParams] = useState<Record<string, number>>({});
  const [comparisonResults, setComparisonResults] = useState<Record<string, SimulationResult>>({});

  // Load available scenarios
  useEffect(() => {
    fetch("/api/simulations/scenarios")
      .then(res => res.json())
      .then(data => setScenarios(data));
  }, []);

  // Run simulation
  const runSimulation = async () => {
    setIsRunning(true);
    try {
      const response = await fetch("/api/simulations/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          scenario: selectedScenario,
          iterations: 10000,
          custom_params: customParams
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Simulation failed:", error);
    } finally {
      setIsRunning(false);
    }
  };

  // Export to PDF
  const exportPDF = async () => {
    if (!result) return;
    
    const response = await fetch("/api/simulations/export-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: selectedModel,
        scenario: selectedScenario,
        result: result
      })
    });
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `simulation_${selectedModel}_${Date.now()}.pdf`;
    a.click();
  };

  // Prepare distribution data for chart
  const distributionData = result?.values
    ? Array.from({ length: 50 }, (_, i) => {
        const min = result.summary.minimum;
        const max = result.summary.maximum;
        const binSize = (max - min) / 50;
        const binStart = min + i * binSize;
        const binEnd = binStart + binSize;
        const count = result.values.filter(v => v >= binStart && v < binEnd).length;
        return {
          bin: `${(binStart / 1000000).toFixed(1)}M`,
          count: count,
          binValue: (binStart + binEnd) / 2
        };
      })
    : [];

  // Prepare percentile data
  const percentileData = result
    ? [
        { percentile: "5th", value: result.summary.p5 },
        { percentile: "25th", value: result.summary.p25 },
        { percentile: "50th", value: result.summary.median },
        { percentile: "75th", value: result.summary.p75 },
        { percentile: "95th", value: result.summary.p95 },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Actuarial Intelligence Engine</h1>
            <p className="text-slate-600 mt-1">Monte Carlo Simulation & Risk Analysis</p>
          </div>
          <Badge className="bg-emerald-100 text-emerald-700 text-sm px-3 py-1">
            <Activity className="w-3 h-3 mr-1" />
            Production Ready
          </Badge>
        </div>

        {/* Configuration Panel */}
        <Card className="p-6 bg-white shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Model Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Model Type
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Choose the type of analysis: healthcare costs, stop-loss, pension funding, etc.</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare">Healthcare Trend</SelectItem>
                  <SelectItem value="stop_loss">Stop Loss</SelectItem>
                  <SelectItem value="ibnr">IBNR Reserves</SelectItem>
                  <SelectItem value="pension">Pension Funding</SelectItem>
                  <SelectItem value="pricing">Premium Pricing</SelectItem>
                  <SelectItem value="workforce">Workforce Costs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Scenario Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                Scenario
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger>
                      <HelpCircle className="w-4 h-4 text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">Pre-configured sets of assumptions representing different economic conditions</p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </Label>
              <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map(s => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name} — {s.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Base Value */}
            <div className="space-y-2">
              <Label>Base Cost ($)</Label>
              <Input
                type="number"
                placeholder="100,000,000"
                value={customParams.base_cost || ""}
                onChange={(e) => setCustomParams({...customParams, base_cost: parseFloat(e.target.value)})}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={runSimulation} 
              disabled={isRunning}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? "Running..." : "Run Simulation"}
            </Button>
            {result && (
              <>
                <Button onClick={exportPDF} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Save Configuration
                </Button>
              </>
            )}
          </div>
        </Card>

        {/* Results Panel */}
        {result && (
          <Tabs defaultValue="summary" className="space-y-6">
            <TabsList className="bg-white shadow-sm">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="distribution">Distribution</TabsTrigger>
              <TabsTrigger value="percentiles">Percentiles</TabsTrigger>
              <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
              <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-white shadow-sm">
                  <div className="text-sm text-slate-600 mb-1">Mean</div>
                  <div className="text-2xl font-bold text-slate-900">
                    ${(result.summary.mean / 1000000).toFixed(2)}M
                  </div>
                </Card>
                <Card className="p-4 bg-white shadow-sm">
                  <div className="text-sm text-slate-600 mb-1">Median</div>
                  <div className="text-2xl font-bold text-slate-900">
                    ${(result.summary.median / 1000000).toFixed(2)}M
                  </div>
                </Card>
                <Card className="p-4 bg-white shadow-sm">
                  <div className="text-sm text-slate-600 mb-1">Std Dev</div>
                  <div className="text-2xl font-bold text-slate-900">
                    ${(result.summary.std_dev / 1000000).toFixed(2)}M
                  </div>
                </Card>
                <Card className="p-4 bg-white shadow-sm">
                  <div className="text-sm text-slate-600 mb-1">95th %ile</div>
                  <div className="text-2xl font-bold text-blue-600">
                    ${(result.summary.p95 / 1000000).toFixed(2)}M
                  </div>
                </Card>
              </div>

              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Plain Language Summary
                </h3>
                <div className="space-y-3 text-slate-700">
                  <p>
                    Based on 10,000 simulations, your expected annual healthcare cost is{" "}
                    <strong>${(result.summary.mean / 1000000).toFixed(2)} million</strong>.
                  </p>
                  <p>
                    There's a 95% chance costs will be below{" "}
                    <strong>${(result.summary.p95 / 1000000).toFixed(2)} million</strong>.
                  </p>
                  <p>
                    The typical variation (standard deviation) is{" "}
                    <strong>${(result.summary.std_dev / 1000000).toFixed(2)} million</strong>,
                    or <strong>{((result.summary.std_dev / result.summary.mean) * 100).toFixed(1)}%</strong> of the mean.
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* Distribution Tab */}
            <TabsContent value="distribution">
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Cost Distribution</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={distributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bin" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            {/* Percentiles Tab */}
            <TabsContent value="percentiles">
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Percentile Analysis</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={percentileData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="percentile" />
                    <YAxis tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`} />
                    <Tooltip formatter={(v: number) => `$${(v/1000000).toFixed(2)}M`} />
                    <Bar dataKey="value" fill="#3b82f6">
                      {percentileData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 4 ? "#ef4444" : "#3b82f6"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </TabsContent>

            {/* Risk Metrics Tab */}
            <TabsContent value="risk">
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Risk Assessment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-600 mb-2">Value at Risk (95%)</div>
                      <div className="text-3xl font-bold text-slate-900">
                        ${(result.summary.p95 / 1000000).toFixed(2)}M
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        Maximum expected cost in 95% of scenarios
                      </p>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 mb-2">Downside Risk</div>
                      <div className="text-3xl font-bold text-red-600">
                        ${((result.summary.p95 - result.summary.mean) / 1000000).toFixed(2)}M
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        Additional cost above mean in worst 5% of cases
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-slate-600 mb-2">Coefficient of Variation</div>
                      <div className="text-3xl font-bold text-slate-900">
                        {((result.summary.std_dev / result.summary.mean) * 100).toFixed(1)}%
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        Relative volatility (lower is more predictable)
                      </p>
                    </div>
                    <div>
                      <div className="text-sm text-slate-600 mb-2">Range</div>
                      <div className="text-3xl font-bold text-slate-900">
                        ${((result.summary.p95 - result.summary.p5) / 1000000).toFixed(2)}M
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        90% confidence interval width
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Assumptions Tab */}
            <TabsContent value="assumptions">
              <Card className="p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Model Assumptions</h3>
                <div className="space-y-3">
                  {Object.entries(result.assumptions).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-slate-50 rounded">
                      <span className="text-slate-700 font-medium capitalize">
                        {key.replace(/_/g, " ")}
                      </span>
                      <span className="text-slate-900 font-semibold">
                        {typeof value === "number" ? value.toFixed(4) : JSON.stringify(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        )}

        {/* Empty State */}
        {!result && !isRunning && (
          <Card className="p-12 bg-white shadow-sm text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No Simulation Results</h3>
            <p className="text-slate-600 mb-6">
              Configure your parameters above and click "Run Simulation" to see results
            </p>
            <div className="flex gap-4 justify-center text-sm text-slate-600">
              <div>📊 10,000 Monte Carlo iterations</div>
              <div>⚡ Results in ~2 seconds</div>
              <div>📄 Export to PDF</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}