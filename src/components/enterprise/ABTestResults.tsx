import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Crown, BarChart3, Users, DollarSign } from "lucide-react";

interface ABTestResult {
  id: string;
  name: string;
  status: "running" | "completed" | "paused";
  start_date: string;
  end_date: string | null;
  hypothesis: string;
  variant_a: {
    name: string;
    price: string;
    sample_size: number;
    conversions: number;
    conversion_rate: number;
    revenue: number;
    avg_deal_size: number;
  };
  variant_b: {
    name: string;
    price: string;
    sample_size: number;
    conversions: number;
    conversion_rate: number;
    revenue: number;
    avg_deal_size: number;
  };
  statistical_significance: number;
  winner: "a" | "b" | null;
  revenue_impact: string;
  recommendation: string;
}

interface ABTestResultsProps {
  tests: ABTestResult[];
}

export function ABTestResults({ tests }: ABTestResultsProps) {
  const calculateLift = (variantA: number, variantB: number) => {
    const lift = ((variantB - variantA) / variantA) * 100;
    return lift;
  };

  const getSignificanceColor = (significance: number) => {
    if (significance >= 95) return "text-green-600";
    if (significance >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getSignificanceLabel = (significance: number) => {
    if (significance >= 95) return "Ready to deploy";
    if (significance >= 80) return "Continue monitoring";
    return "Insufficient data";
  };

  return (
    <div className="space-y-6">
      {tests.map((test) => {
        const conversionLift = calculateLift(test.variant_a.conversion_rate, test.variant_b.conversion_rate);
        const revenueLift = calculateLift(test.variant_a.revenue, test.variant_b.revenue);
        const dealSizeLift = calculateLift(test.variant_a.avg_deal_size, test.variant_b.avg_deal_size);

        return (
          <Card key={test.id} className="border-2">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle>{test.name}</CardTitle>
                    <Badge variant={test.status === "running" ? "default" : test.status === "completed" ? "secondary" : "outline"}>
                      {test.status}
                    </Badge>
                    {test.winner && (
                      <Badge className="bg-green-600">
                        Winner: Variant {test.winner.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mb-3">{test.hypothesis}</CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Started: {test.start_date}</span>
                    {test.end_date && <span>Ended: {test.end_date}</span>}
                    <span className={getSignificanceColor(test.statistical_significance)}>
                      {test.statistical_significance}% confidence
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-600">{test.revenue_impact}</p>
                  <p className="text-sm text-muted-foreground">Projected Impact</p>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="comparison" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>

                <TabsContent value="comparison" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Variant A */}
                    <div className="space-y-4">
                      <div className={`flex items-center justify-between p-4 rounded-lg ${test.winner === "a" ? "bg-green-50 border-2 border-green-600" : "bg-blue-50"}`}>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Variant A (Control)</p>
                          <p className="text-2xl font-bold">{test.variant_a.price}</p>
                          <p className="text-xs text-muted-foreground">{test.variant_a.name}</p>
                        </div>
                        {test.winner === "a" && <Crown className="h-6 w-6 text-yellow-500" />}
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="text-sm">Sample Size</span>
                          <span className="font-bold">{test.variant_a.sample_size.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="text-sm">Conversions</span>
                          <span className="font-bold">{test.variant_a.conversions}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="text-sm">Conversion Rate</span>
                          <span className="font-bold">{test.variant_a.conversion_rate}%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="text-sm">Revenue</span>
                          <span className="font-bold">${test.variant_a.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="text-sm">Avg Deal Size</span>
                          <span className="font-bold">${test.variant_a.avg_deal_size.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Variant B */}
                    <div className="space-y-4">
                      <div className={`flex items-center justify-between p-4 rounded-lg ${test.winner === "b" ? "bg-green-50 border-2 border-green-600" : "bg-purple-50"}`}>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Variant B (Test)</p>
                          <p className="text-2xl font-bold">{test.variant_b.price}</p>
                          <p className="text-xs text-muted-foreground">{test.variant_b.name}</p>
                        </div>
                        {test.winner === "b" && <Crown className="h-6 w-6 text-yellow-500" />}
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="text-sm">Sample Size</span>
                          <span className="font-bold">{test.variant_b.sample_size.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="text-sm">Conversions</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{test.variant_b.conversions}</span>
                            {test.variant_b.conversions > test.variant_a.conversions ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="text-sm">Conversion Rate</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">{test.variant_b.conversion_rate}%</span>
                            <Badge variant={conversionLift > 0 ? "default" : "destructive"} className="text-xs">
                              {conversionLift > 0 ? "+" : ""}{conversionLift.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="text-sm">Revenue</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">${test.variant_b.revenue.toLocaleString()}</span>
                            <Badge variant={revenueLift > 0 ? "default" : "destructive"} className="text-xs">
                              {revenueLift > 0 ? "+" : ""}{revenueLift.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="text-sm">Avg Deal Size</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold">${test.variant_b.avg_deal_size.toLocaleString()}</span>
                            <Badge variant={dealSizeLift > 0 ? "default" : "destructive"} className="text-xs">
                              {dealSizeLift > 0 ? "+" : ""}{dealSizeLift.toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Statistical Significance */}
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <span className="font-semibold">Statistical Significance</span>
                      </div>
                      <span className={`text-lg font-bold ${getSignificanceColor(test.statistical_significance)}`}>
                        {test.statistical_significance}%
                      </span>
                    </div>
                    <Progress value={test.statistical_significance} className="h-3 mb-2" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Total sample: {(test.variant_a.sample_size + test.variant_b.sample_size).toLocaleString()} users
                      </span>
                      <span className={`font-semibold ${getSignificanceColor(test.statistical_significance)}`}>
                        {getSignificanceLabel(test.statistical_significance)}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Users className="h-4 w-4 text-blue-600" />
                          Conversion Lift
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-3xl font-bold ${conversionLift > 0 ? "text-green-600" : "text-red-600"}`}>
                          {conversionLift > 0 ? "+" : ""}{conversionLift.toFixed(1)}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Variant B vs Control
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          Revenue Lift
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-3xl font-bold ${revenueLift > 0 ? "text-green-600" : "text-red-600"}`}>
                          {revenueLift > 0 ? "+" : ""}{revenueLift.toFixed(1)}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Total revenue impact
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-purple-600" />
                          Deal Size Lift
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-3xl font-bold ${dealSizeLift > 0 ? "text-green-600" : "text-red-600"}`}>
                          {dealSizeLift > 0 ? "+" : ""}{dealSizeLift.toFixed(1)}%
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Average contract value
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Performance Metrics Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Conversion Rate Difference</span>
                            <span className="font-semibold">
                              {Math.abs(test.variant_b.conversion_rate - test.variant_a.conversion_rate).toFixed(2)}%
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1 bg-blue-200 h-2 rounded-full" style={{ width: `${(test.variant_a.conversion_rate / Math.max(test.variant_a.conversion_rate, test.variant_b.conversion_rate)) * 100}%` }}></div>
                            <div className="flex-1 bg-purple-200 h-2 rounded-full" style={{ width: `${(test.variant_b.conversion_rate / Math.max(test.variant_a.conversion_rate, test.variant_b.conversion_rate)) * 100}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Revenue per User</span>
                            <span className="font-semibold">
                              ${Math.abs((test.variant_b.revenue / test.variant_b.sample_size) - (test.variant_a.revenue / test.variant_a.sample_size)).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex-1 bg-blue-200 h-2 rounded-full" style={{ width: `${((test.variant_a.revenue / test.variant_a.sample_size) / Math.max((test.variant_a.revenue / test.variant_a.sample_size), (test.variant_b.revenue / test.variant_b.sample_size))) * 100}%` }}></div>
                            <div className="flex-1 bg-purple-200 h-2 rounded-full" style={{ width: `${((test.variant_b.revenue / test.variant_b.sample_size) / Math.max((test.variant_a.revenue / test.variant_a.sample_size), (test.variant_b.revenue / test.variant_b.sample_size))) * 100}%` }}></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="insights" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        {test.winner ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <AlertCircle className="h-5 w-5 text-yellow-600" />}
                        Test Recommendation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{test.recommendation}</p>
                      {test.statistical_significance >= 95 ? (
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Deploy Winning Variant
                        </Button>
                      ) : test.statistical_significance >= 80 ? (
                        <Button className="w-full" variant="outline">
                          Continue Test (Need More Data)
                        </Button>
                      ) : (
                        <Button className="w-full" variant="outline">
                          Extend Test Duration
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Projected Annual Impact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-slate-50 rounded">
                        <span className="text-sm">If deployed today</span>
                        <span className="font-bold">{test.revenue_impact} ARR</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded">
                        <span className="text-sm">At current growth rate</span>
                        <span className="font-bold text-blue-600">
                          {test.revenue_impact.replace(/[+-]/, (match) => match === "+" ? "+" : "-")}
                          {(parseFloat(test.revenue_impact.replace(/[^0-9.]/g, "")) * 1.3).toFixed(0)}K ARR
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                        <span className="text-sm">12-month projection</span>
                        <span className="font-bold text-green-600">
                          {test.revenue_impact.replace(/[+-]/, (match) => match === "+" ? "+" : "-")}
                          {(parseFloat(test.revenue_impact.replace(/[^0-9.]/g, "")) * 2.1).toFixed(0)}K ARR
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}