/**
 * A/B Test Results Dashboard
 * Interactive analytics with drill-downs and tooltips
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  ChevronDown,
  ChevronUp,
  Info,
  Download,
  Filter,
} from "lucide-react";

interface ABTestMetric {
  id: string;
  name: string;
  variantA: number;
  variantB: number;
  improvement: number;
  confidence: number;
  sampleSize: number;
  status: "running" | "completed" | "paused";
}

interface DrillDownData {
  segment: string;
  variantA: number;
  variantB: number;
  improvement: number;
  users: number;
}

export function ABTestResults() {
  const [selectedTest, setSelectedTest] = useState<string>("pricing-tiers");
  const [timeRange, setTimeRange] = useState<string>("7d");
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Mock A/B test data
  const tests: ABTestMetric[] = [
    {
      id: "pricing-tiers",
      name: "Pricing Tier Display",
      variantA: 12.4,
      variantB: 15.8,
      improvement: 27.4,
      confidence: 95,
      sampleSize: 5420,
      status: "completed",
    },
    {
      id: "cta-button",
      name: "CTA Button Color",
      variantA: 8.2,
      variantB: 11.3,
      improvement: 37.8,
      confidence: 98,
      sampleSize: 8930,
      status: "completed",
    },
    {
      id: "feature-highlight",
      name: "Feature Highlighting",
      variantA: 22.1,
      variantB: 19.8,
      improvement: -10.4,
      confidence: 91,
      sampleSize: 3210,
      status: "running",
    },
    {
      id: "trial-duration",
      name: "Trial Duration Copy",
      variantA: 5.6,
      variantB: 7.9,
      improvement: 41.1,
      confidence: 99,
      sampleSize: 12400,
      status: "completed",
    },
  ];

  // Drill-down data by segment
  const drillDownData: Record<string, DrillDownData[]> = {
    "pricing-tiers": [
      { segment: "Enterprise", variantA: 18.2, variantB: 24.5, improvement: 34.6, users: 1240 },
      { segment: "SMB", variantA: 10.8, variantB: 12.4, improvement: 14.8, users: 2890 },
      { segment: "Startup", variantA: 8.1, variantB: 11.2, improvement: 38.3, users: 1290 },
    ],
    "cta-button": [
      { segment: "Desktop", variantA: 9.4, variantB: 13.2, improvement: 40.4, users: 5120 },
      { segment: "Mobile", variantA: 6.8, variantB: 9.1, improvement: 33.8, users: 3810 },
    ],
    "feature-highlight": [
      { segment: "New Users", variantA: 28.4, variantB: 31.2, improvement: 9.9, users: 1580 },
      { segment: "Returning", variantA: 18.7, variantB: 14.2, improvement: -24.1, users: 1630 },
    ],
    "trial-duration": [
      { segment: "Tech Industry", variantA: 6.8, variantB: 9.4, improvement: 38.2, users: 4820 },
      { segment: "Healthcare", variantA: 4.2, variantB: 6.1, improvement: 45.2, users: 3910 },
      { segment: "Finance", variantA: 5.9, variantB: 8.2, improvement: 39.0, users: 3670 },
    ],
  };

  const currentTest = tests.find((t) => t.id === selectedTest);
  const currentDrillDown = drillDownData[selectedTest] || [];

  const getImprovementColor = (improvement: number) => {
    if (improvement > 20) return "text-green-600";
    if (improvement > 0) return "text-blue-600";
    return "text-red-600";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "bg-green-100 text-green-800";
    if (confidence >= 90) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getStatusColor = (status: string) => {
    if (status === "completed") return "bg-green-100 text-green-800";
    if (status === "running") return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">A/B Test Results</h2>
          <p className="text-muted-foreground mt-1">
            Interactive analytics with drill-down capabilities
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Test Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Active Tests</CardTitle>
          <CardDescription>Select a test to view detailed analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {tests.map((test) => (
              <button
                key={test.id}
                onClick={() => setSelectedTest(test.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
                  selectedTest === test.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getStatusColor(test.status)}>
                    {test.status}
                  </Badge>
                  {test.improvement > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                </div>
                <h4 className="font-semibold text-sm mb-1">{test.name}</h4>
                <div className={`text-2xl font-bold ${getImprovementColor(test.improvement)}`}>
                  {test.improvement > 0 ? "+" : ""}
                  {test.improvement.toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {test.sampleSize.toLocaleString()} samples
                </p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Analytics */}
      {currentTest && (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="segments">Segment Analysis</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Conversion Rate
                    <div className="relative group ml-auto">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Percentage of users who completed the desired action
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentTest.variantB}%</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getImprovementColor(currentTest.improvement)}>
                      {currentTest.improvement > 0 ? "+" : ""}
                      {currentTest.improvement.toFixed(1)}%
                    </Badge>
                    <span className="text-xs text-muted-foreground">vs control</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Sample Size
                    <div className="relative group ml-auto">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Total number of users in the test
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {currentTest.sampleSize.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">unique users</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Confidence
                    <div className="relative group ml-auto">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Statistical confidence level
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentTest.confidence}%</div>
                  <Badge className={getConfidenceColor(currentTest.confidence)} variant="outline">
                    {currentTest.confidence >= 95 ? "High" : "Medium"}
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Est. Impact
                    <div className="relative group ml-auto">
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Projected annual revenue impact
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${Math.round(currentTest.improvement * 10000).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">annual increase</p>
                </CardContent>
              </Card>
            </div>

            {/* Interactive Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Variant Comparison</CardTitle>
                <CardDescription>
                  Hover over bars for detailed metrics. Click to expand segment analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    {/* Variant A */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gray-400" />
                          <span className="font-medium">Variant A (Control)</span>
                        </div>
                        <span className="text-sm font-semibold">{currentTest.variantA}%</span>
                      </div>
                      <div
                        className="relative h-12 bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
                        onMouseEnter={() => setHoveredBar("variant-a")}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <div
                          className="h-full bg-gray-400 transition-all group-hover:bg-gray-500"
                          style={{ width: `${(currentTest.variantA / 25) * 100}%` }}
                        />
                        {hoveredBar === "variant-a" && (
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded shadow-lg text-sm whitespace-nowrap z-10">
                            <div className="font-semibold">Variant A</div>
                            <div>Conversion: {currentTest.variantA}%</div>
                            <div>Users: {Math.round(currentTest.sampleSize * 0.5).toLocaleString()}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Variant B */}
                    <div className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <span className="font-medium">Variant B (Test)</span>
                        </div>
                        <span className="text-sm font-semibold">{currentTest.variantB}%</span>
                      </div>
                      <div
                        className="relative h-12 bg-blue-100 rounded-lg overflow-hidden cursor-pointer group"
                        onMouseEnter={() => setHoveredBar("variant-b")}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        <div
                          className="h-full bg-blue-500 transition-all group-hover:bg-blue-600"
                          style={{ width: `${(currentTest.variantB / 25) * 100}%` }}
                        />
                        {hoveredBar === "variant-b" && (
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded shadow-lg text-sm whitespace-nowrap z-10">
                            <div className="font-semibold">Variant B</div>
                            <div>Conversion: {currentTest.variantB}%</div>
                            <div>Users: {Math.round(currentTest.sampleSize * 0.5).toLocaleString()}</div>
                            <div className="text-green-400">
                              +{currentTest.improvement.toFixed(1)}% improvement
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="segments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Segment Drill-Down Analysis</CardTitle>
                <CardDescription>
                  Performance breakdown by user segment. Click segments for deeper insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentDrillDown.map((segment, index) => (
                    <div
                      key={index}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() =>
                        setExpandedMetric(expandedMetric === segment.segment ? null : segment.segment)
                      }
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold">{segment.segment}</h4>
                          <Badge variant="outline">{segment.users.toLocaleString()} users</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`text-lg font-bold ${getImprovementColor(segment.improvement)}`}>
                            {segment.improvement > 0 ? "+" : ""}
                            {segment.improvement.toFixed(1)}%
                          </div>
                          {expandedMetric === segment.segment ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                          <div className="text-xs text-muted-foreground mb-1">Variant A</div>
                          <div className="h-8 bg-gray-100 rounded overflow-hidden">
                            <div
                              className="h-full bg-gray-400 flex items-center justify-end pr-2"
                              style={{ width: `${(segment.variantA / 35) * 100}%` }}
                            >
                              <span className="text-xs font-semibold text-white">
                                {segment.variantA}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="relative group">
                          <div className="text-xs text-muted-foreground mb-1">Variant B</div>
                          <div className="h-8 bg-blue-100 rounded overflow-hidden">
                            <div
                              className="h-full bg-blue-500 flex items-center justify-end pr-2"
                              style={{ width: `${(segment.variantB / 35) * 100}%` }}
                            >
                              <span className="text-xs font-semibold text-white">
                                {segment.variantB}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {expandedMetric === segment.segment && (
                        <div className="mt-4 pt-4 border-t space-y-2">
                          <div className="text-sm">
                            <strong>Detailed Metrics:</strong>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Sample Size</div>
                              <div className="font-semibold">{segment.users.toLocaleString()}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Confidence</div>
                              <div className="font-semibold">
                                {Math.min(95, 85 + Math.random() * 10).toFixed(1)}%
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Conversions (A)</div>
                              <div className="font-semibold">
                                {Math.round((segment.variantA / 100) * segment.users * 0.5)}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Conversions (B)</div>
                              <div className="font-semibold">
                                {Math.round((segment.variantB / 100) * segment.users * 0.5)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline">
            <Card>
              <CardHeader>
                <CardTitle>Performance Timeline</CardTitle>
                <CardDescription>Conversion trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Timeline chart visualization would go here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Test Configuration</CardTitle>
                <CardDescription>Detailed test setup and parameters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Test ID</div>
                      <div className="font-mono">{currentTest.id}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Status</div>
                      <Badge className={getStatusColor(currentTest.status)}>
                        {currentTest.status}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Traffic Split</div>
                      <div>50% / 50%</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Duration</div>
                      <div>{timeRange}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}