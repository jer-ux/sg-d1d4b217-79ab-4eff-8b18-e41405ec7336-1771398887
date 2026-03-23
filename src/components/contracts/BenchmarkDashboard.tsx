import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  PieChart,
  Target,
  Award,
  AlertTriangle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BenchmarkData {
  provision: string;
  yourValue: number;
  marketMedian: number;
  marketAverage: number;
  percentile: number;
  trend: "better" | "worse" | "neutral";
  potentialSavings?: number;
}

interface IndustryComparison {
  industry: string;
  averageScore: number;
  yourScore: number;
  contracts: number;
}

interface BenchmarkDashboardProps {
  contractId: string;
  overallScore: number;
  provisions: any[];
}

export function BenchmarkDashboard({ contractId, overallScore, provisions }: BenchmarkDashboardProps) {
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkData[]>([]);
  const [industryComparisons, setIndustryComparisons] = useState<IndustryComparison[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState("healthcare");
  const [selectedMetric, setSelectedMetric] = useState("all");

  useEffect(() => {
    loadBenchmarkData();
  }, [contractId, selectedIndustry]);

  const loadBenchmarkData = async () => {
    // Mock benchmark data from 1,247 analyzed contracts
    const data: BenchmarkData[] = [
      {
        provision: "Rebate Pass-Through",
        yourValue: 90,
        marketMedian: 95,
        marketAverage: 93,
        percentile: 35,
        trend: "worse",
        potentialSavings: 180000
      },
      {
        provision: "Administrative Fees (PEPM)",
        yourValue: 4.50,
        marketMedian: 3.50,
        marketAverage: 3.75,
        percentile: 25,
        trend: "worse",
        potentialSavings: 120000
      },
      {
        provision: "Dispensing Fees",
        yourValue: 2.50,
        marketMedian: 2.50,
        marketAverage: 2.55,
        percentile: 60,
        trend: "neutral"
      },
      {
        provision: "Audit Rights (Annual)",
        yourValue: 1,
        marketMedian: 2,
        marketAverage: 1.8,
        percentile: 20,
        trend: "worse",
        potentialSavings: 240000
      },
      {
        provision: "Termination Notice (Days)",
        yourValue: 60,
        marketMedian: 60,
        marketAverage: 75,
        percentile: 55,
        trend: "neutral"
      },
      {
        provision: "Formulary Rebate %",
        yourValue: 15,
        marketMedian: 18,
        marketAverage: 17,
        percentile: 30,
        trend: "worse",
        potentialSavings: 360000
      }
    ];
    setBenchmarkData(data);

    // Industry comparisons
    const industries: IndustryComparison[] = [
      {
        industry: "Healthcare",
        averageScore: 72,
        yourScore: overallScore,
        contracts: 487
      },
      {
        industry: "Manufacturing",
        averageScore: 68,
        yourScore: overallScore,
        contracts: 312
      },
      {
        industry: "Financial Services",
        averageScore: 75,
        yourScore: overallScore,
        contracts: 248
      },
      {
        industry: "Retail",
        averageScore: 65,
        yourScore: overallScore,
        contracts: 200
      }
    ];
    setIndustryComparisons(industries);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "better":
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case "worse":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "better":
        return "text-emerald-400 bg-emerald-500/20 border-emerald-500/30";
      case "worse":
        return "text-red-400 bg-red-500/20 border-red-500/30";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30";
    }
  };

  const getPercentileColor = (percentile: number) => {
    if (percentile >= 75) return "text-emerald-400";
    if (percentile >= 50) return "text-blue-400";
    if (percentile >= 25) return "text-yellow-400";
    return "text-red-400";
  };

  const totalPotentialSavings = benchmarkData.reduce((sum, item) => sum + (item.potentialSavings || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Market Benchmarking</h3>
            <p className="text-sm text-gray-400">Compared against 1,247 PBM contracts</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-40 bg-slate-800 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="financial">Financial Services</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Your Percentile</p>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">43rd</p>
          <p className="text-xs text-gray-500">Below average for industry</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Market Leader</p>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">89/100</p>
          <p className="text-xs text-gray-500">Top 5% of contracts</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Potential Savings</p>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">${(totalPotentialSavings / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-gray-500">If matched to market median</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Below Market</p>
            <AlertTriangle className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">4 of 6</p>
          <p className="text-xs text-gray-500">Provisions need negotiation</p>
        </Card>
      </div>

      {/* Industry Comparison */}
      <Card className="p-6 bg-slate-900/50 border-white/10">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-blue-400" />
          Industry Comparison
        </h4>
        <div className="space-y-4">
          {industryComparisons.map((industry) => (
            <div key={industry.industry} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-white">{industry.industry}</span>
                  <Badge className="bg-slate-700/50 text-gray-400 text-xs">
                    {industry.contracts} contracts
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">
                    Your Score: <span className={industry.yourScore > industry.averageScore ? "text-emerald-400" : "text-red-400"}>
                      {industry.yourScore}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    Avg: {industry.averageScore}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Progress 
                  value={(industry.yourScore / 100) * 100} 
                  className="flex-1 h-2"
                />
                <span className="text-xs text-gray-500 w-12 text-right">
                  {industry.yourScore > industry.averageScore ? "+" : ""}
                  {industry.yourScore - industry.averageScore}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Provision Benchmarking */}
      <Card className="p-6 bg-slate-900/50 border-white/10">
        <h4 className="text-lg font-semibold text-white mb-4">Provision-by-Provision Analysis</h4>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {benchmarkData.map((item, index) => (
              <Card key={index} className="p-4 bg-slate-800/50 border-white/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-semibold text-white">{item.provision}</h5>
                    <Badge className={getTrendColor(item.trend)}>
                      {getTrendIcon(item.trend)}
                      <span className="ml-1">{item.trend}</span>
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400 mb-1">Your Value</p>
                      <p className="text-lg font-bold text-white">{item.yourValue}{item.provision.includes("%") ? "%" : ""}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Market Median</p>
                      <p className="text-lg font-bold text-blue-400">{item.marketMedian}{item.provision.includes("%") ? "%" : ""}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 mb-1">Market Average</p>
                      <p className="text-lg font-bold text-purple-400">{item.marketAverage}{item.provision.includes("%") ? "%" : ""}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-400">Your Percentile</span>
                      <span className={`font-bold ${getPercentileColor(item.percentile)}`}>
                        {item.percentile}th percentile
                      </span>
                    </div>
                    <Progress value={item.percentile} className="h-2" />
                  </div>

                  {item.potentialSavings && (
                    <div className="flex items-center justify-between p-2 bg-emerald-500/10 border border-emerald-500/30 rounded">
                      <span className="text-sm text-emerald-400">Potential Annual Savings:</span>
                      <span className="text-sm font-bold text-emerald-300">
                        ${(item.potentialSavings / 1000).toFixed(0)}K
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Download Report */}
      <div className="flex justify-center">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <BarChart3 className="w-4 h-4 mr-2" />
          Download Benchmark Report
        </Button>
      </div>
    </div>
  );
}