import { useState } from "react";
import { Calculator, TrendingUp, DollarSign, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface SavingsBreakdown {
  provision: string;
  currentCost: number;
  potentialSavings: number;
  percentage: number;
  priority: "high" | "medium" | "low";
}

export function SavingsCalculator() {
  const [memberCount, setMemberCount] = useState<string>("500");
  const [annualDrugSpend, setAnnualDrugSpend] = useState<string>("3000000");
  const [showResults, setShowResults] = useState(false);
  const [breakdown, setBreakdown] = useState<SavingsBreakdown[]>([]);

  const calculateSavings = () => {
    const members = parseInt(memberCount) || 0;
    const spend = parseInt(annualDrugSpend) || 0;

    if (members === 0 || spend === 0) return;

    const calculations: SavingsBreakdown[] = [
      {
        provision: "Rebate Revenue Retention",
        currentCost: spend * 0.20,
        potentialSavings: spend * 0.18,
        percentage: 18,
        priority: "high"
      },
      {
        provision: "Pharmacy Ownership Conflicts",
        currentCost: spend * 0.15,
        potentialSavings: spend * 0.12,
        percentage: 12,
        priority: "high"
      },
      {
        provision: "Lowest Net Cost Violations",
        currentCost: spend * 0.14,
        potentialSavings: spend * 0.11,
        percentage: 11,
        priority: "high"
      },
      {
        provision: "DIR Fees & Post-Adjudication",
        currentCost: spend * 0.12,
        potentialSavings: spend * 0.10,
        percentage: 10,
        priority: "high"
      },
      {
        provision: "Audit Rights Restrictions",
        currentCost: spend * 0.11,
        potentialSavings: spend * 0.09,
        percentage: 9,
        priority: "medium"
      },
      {
        provision: "Pass-Through Pricing Gaps",
        currentCost: spend * 0.09,
        potentialSavings: spend * 0.07,
        percentage: 7,
        priority: "medium"
      },
      {
        provision: "Formulary Transparency Lack",
        currentCost: spend * 0.08,
        potentialSavings: spend * 0.07,
        percentage: 7,
        priority: "medium"
      },
      {
        provision: "Specialty Network Restrictions",
        currentCost: spend * 0.07,
        potentialSavings: spend * 0.05,
        percentage: 5,
        priority: "medium"
      },
      {
        provision: "Carve-Out Prohibitions",
        currentCost: spend * 0.06,
        potentialSavings: spend * 0.04,
        percentage: 4,
        priority: "low"
      },
      {
        provision: "Clinical Program Fees",
        currentCost: spend * 0.05,
        potentialSavings: spend * 0.04,
        percentage: 4,
        priority: "low"
      }
    ];

    setBreakdown(calculations);
    setShowResults(true);
  };

  const totalSavings = breakdown.reduce((sum, item) => sum + item.potentialSavings, 0);
  const totalCurrent = breakdown.reduce((sum, item) => sum + item.currentCost, 0);
  const savingsPercentage = totalCurrent > 0 ? ((totalSavings / totalCurrent) * 100).toFixed(1) : 0;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Card className="border-purple-500/30 bg-gray-900/50 backdrop-blur-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full mb-4">
            <Calculator className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-semibold text-purple-300">Instant ROI Calculator</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Calculate Your Hidden PBM Costs
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Enter your plan details to see how much you could be saving with Kincaid IQ's Rx PBM Contract X-Ray
          </p>
        </div>

        {/* Input Form */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <Label htmlFor="members" className="text-white mb-2 block">
              Number of Covered Members
            </Label>
            <Input
              id="members"
              type="number"
              value={memberCount}
              onChange={(e) => setMemberCount(e.target.value)}
              placeholder="500"
              className="bg-gray-800/50 border-gray-700 text-white text-lg h-12"
            />
            <p className="text-xs text-gray-500 mt-1">Employees + dependents on your health plan</p>
          </div>

          <div>
            <Label htmlFor="spend" className="text-white mb-2 block">
              Annual Drug Spend
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <Input
                id="spend"
                type="number"
                value={annualDrugSpend}
                onChange={(e) => setAnnualDrugSpend(e.target.value)}
                placeholder="3000000"
                className="bg-gray-800/50 border-gray-700 text-white text-lg h-12 pl-10"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Total pharmacy costs for the year</p>
          </div>
        </div>

        <Button
          onClick={calculateSavings}
          size="lg"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold h-14 text-lg"
        >
          Calculate My Savings Potential
        </Button>

        {/* Results */}
        {showResults && (
          <div className="mt-12 space-y-8">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-rose-500/20 to-rose-600/10 border-rose-500/30 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-6 h-6 text-rose-400" />
                  <span className="text-sm font-semibold text-rose-300">Hidden Costs</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  ${(totalCurrent / 1000000).toFixed(2)}M
                </div>
                <p className="text-xs text-gray-400">Annual value leakage detected</p>
              </Card>

              <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">Potential Savings</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  ${(totalSavings / 1000000).toFixed(2)}M
                </div>
                <p className="text-xs text-gray-400">Recoverable with X-Ray analysis</p>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 border-purple-500/30 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="w-6 h-6 text-purple-400" />
                  <span className="text-sm font-semibold text-purple-300">ROI Impact</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {savingsPercentage}%
                </div>
                <p className="text-xs text-gray-400">Savings rate on identified costs</p>
              </Card>
            </div>

            {/* Detailed Breakdown */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Savings Breakdown by Provision</h3>
              <div className="space-y-3">
                {breakdown.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{item.provision}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              item.priority === "high"
                                ? "bg-rose-500/20 text-rose-300"
                                : item.priority === "medium"
                                ? "bg-orange-500/20 text-orange-300"
                                : "bg-yellow-500/20 text-yellow-300"
                            }`}
                          >
                            {item.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400">
                          Current Impact: ${(item.currentCost / 1000).toFixed(0)}K/year
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-400">
                          ${(item.potentialSavings / 1000).toFixed(0)}K
                        </div>
                        <p className="text-xs text-gray-500">recoverable</p>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-700/30 rounded-full h-2 mt-3">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to Recover ${(totalSavings / 1000000).toFixed(2)}M?
              </h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Get a free contract review and detailed savings analysis from our team of PBM forensic experts
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  Schedule Free Contract Review
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                >
                  Download Full Report (PDF)
                </Button>
              </div>
            </Card>
          </div>
        )}
      </Card>
    </div>
  );
}