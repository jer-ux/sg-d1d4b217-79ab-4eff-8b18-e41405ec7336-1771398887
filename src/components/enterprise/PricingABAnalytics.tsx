/**
 * Pricing A/B Test Analytics
 * Interactive pricing experiment dashboard
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
  DollarSign,
  Users,
  Target,
  Info,
  Download,
  Zap,
  AlertCircle,
} from "lucide-react";

interface PricingVariant {
  id: string;
  name: string;
  price: number;
  users: number;
  conversions: number;
  revenue: number;
  churnRate: number;
  avgDealSize: number;
}

export function PricingABAnalytics() {
  const [selectedExperiment, setSelectedExperiment] = useState<string>("annual-pricing");
  const [timeRange, setTimeRange] = useState<string>("30d");
  const [hoveredVariant, setHoveredVariant] = useState<string | null>(null);

  const experiments = [
    {
      id: "annual-pricing",
      name: "Annual Pricing Test",
      status: "Running",
      confidence: 96,
      startDate: "Mar 1, 2026",
    },
    {
      id: "feature-tiers",
      name: "Feature Tier Structure",
      status: "Completed",
      confidence: 98,
      startDate: "Feb 1, 2026",
    },
    {
      id: "trial-length",
      name: "Trial Duration Impact",
      status: "Running",
      confidence: 89,
      startDate: "Mar 15, 2026",
    },
  ];

  const variants: Record<string, PricingVariant[]> = {
    "annual-pricing": [
      {
        id: "control",
        name: "Monthly Only ($99/mo)",
        price: 99,
        users: 1250,
        conversions: 156,
        revenue: 187000,
        churnRate: 8.4,
        avgDealSize: 1188,
      },
      {
        id: "variant-a",
        name: "Annual Option ($89/mo)",
        price: 89,
        users: 1280,
        conversions: 198,
        revenue: 234000,
        churnRate: 5.2,
        avgDealSize: 1068,
      },
      {
        id: "variant-b",
        name: "Annual Discount ($79/mo)",
        price: 79,
        users: 1310,
        conversions: 215,
        revenue: 241000,
        churnRate: 4.8,
        avgDealSize: 948,
      },
    ],
  };

  const currentVariants = variants[selectedExperiment] || [];
  const currentExperiment = experiments.find((e) => e.id === selectedExperiment);

  const getRecommendation = () => {
    if (selectedExperiment === "annual-pricing") {
      return {
        winner: "variant-b",
        message:
          "Annual discount drives 25% more conversions with lower churn. Recommend implementing for all plans.",
        impact: "+$54K monthly revenue",
        confidence: 96,
      };
    }
    return null;
  };

  const recommendation = getRecommendation();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Pricing Experiments</h2>
          <p className="text-muted-foreground mt-1">
            Interactive A/B testing analytics for pricing optimization
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Experiment Selector */}
      <div className="grid grid-cols-3 gap-4">
        {experiments.map((exp) => (
          <button
            key={exp.id}
            onClick={() => setSelectedExperiment(exp.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all hover:shadow-md ${
              selectedExperiment === exp.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Badge
                className={
                  exp.status === "Running"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }
              >
                {exp.status}
              </Badge>
              <span className="text-xs text-muted-foreground">{exp.startDate}</span>
            </div>
            <h4 className="font-semibold text-sm mb-1">{exp.name}</h4>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold text-blue-600">{exp.confidence}%</div>
              <span className="text-xs text-muted-foreground">confidence</span>
            </div>
          </button>
        ))}
      </div>

      {/* AI Recommendation */}
      {recommendation && (
        <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              AI Recommendation
              <Badge className="bg-green-100 text-green-800">
                {recommendation.confidence}% Confidence
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-2">{recommendation.message}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-600">{recommendation.impact}</span>
              </div>
              <Button size="sm">Implement Changes</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Variant Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Variant Comparison</CardTitle>
          <CardDescription>
            Hover over variants for detailed metrics. Click for drill-down analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {currentVariants.map((variant) => {
              const isWinner = variant.id === recommendation?.winner;
              const conversionRate = ((variant.conversions / variant.users) * 100).toFixed(1);

              return (
                <div
                  key={variant.id}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    isWinner
                      ? "border-green-500 bg-green-50 dark:bg-green-950"
                      : hoveredVariant === variant.id
                      ? "border-blue-500 shadow-lg"
                      : "border-gray-200"
                  }`}
                  onMouseEnter={() => setHoveredVariant(variant.id)}
                  onMouseLeave={() => setHoveredVariant(null)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold">{variant.name}</h3>
                        {isWinner && (
                          <Badge className="bg-green-100 text-green-800">
                            Recommended Winner
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {variant.users.toLocaleString()} users in test group
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">
                        ${(variant.revenue / 1000).toFixed(0)}K
                      </div>
                      <p className="text-sm text-muted-foreground">Total Revenue</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-5 gap-4">
                    <div className="relative group">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        Price
                        <Info className="h-3 w-3" />
                      </div>
                      <div className="text-2xl font-bold">${variant.price}</div>
                      <div className="text-xs text-muted-foreground">/month</div>
                      <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Monthly subscription price
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        Conversions
                        <Info className="h-3 w-3" />
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {variant.conversions}
                      </div>
                      <div className="text-xs text-muted-foreground">{conversionRate}% rate</div>
                      <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Users who became paying customers
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        Avg Deal
                        <Info className="h-3 w-3" />
                      </div>
                      <div className="text-2xl font-bold">
                        ${(variant.avgDealSize / 1000).toFixed(1)}K
                      </div>
                      <div className="text-xs text-muted-foreground">per customer</div>
                      <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Average annual contract value
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        Churn Rate
                        <Info className="h-3 w-3" />
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        {variant.churnRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">monthly</div>
                      <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Percentage of customers who cancel
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                        LTV Impact
                        <Info className="h-3 w-3" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        ${((variant.avgDealSize * 12) / (variant.churnRate / 100) / 1000).toFixed(
                          0
                        )}
                        K
                      </div>
                      <div className="text-xs text-muted-foreground">lifetime value</div>
                      <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        Estimated customer lifetime value
                      </div>
                    </div>
                  </div>

                  {/* Visual Metrics Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Conversion Performance</span>
                      <span className="font-semibold">{conversionRate}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          isWinner ? "bg-green-500" : "bg-blue-500"
                        } transition-all`}
                        style={{ width: `${conversionRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Statistical Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Statistical Analysis</CardTitle>
          <CardDescription>Detailed experiment metrics and significance testing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">Sample Size</div>
              <div className="text-2xl font-bold">
                {currentVariants
                  .reduce((sum, v) => sum + v.users, 0)
                  .toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Total participants</p>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Statistical Power</div>
              <div className="text-2xl font-bold text-green-600">
                {currentExperiment?.confidence}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">Confidence level</p>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-2">Test Duration</div>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">Days running</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}