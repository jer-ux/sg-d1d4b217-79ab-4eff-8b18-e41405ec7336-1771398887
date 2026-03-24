import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GitBranch,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Target,
  Zap,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface Scenario {
  id: string;
  name: string;
  description: string;
  probability: number;
  impact: "high" | "medium" | "low";
  financialOutcome: {
    best: string;
    likely: string;
    worst: string;
  };
  pros: string[];
  cons: string[];
  risks: string[];
  timeframe: string;
  confidence: number;
}

export function StrategicDecisionEngine() {
  const [selectedDecision, setSelectedDecision] = useState<string>("pbm-renewal");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const decisions = [
    {
      id: "pbm-renewal",
      title: "PBM Contract Renewal",
      description: "Renew vs Switch Vendors",
      urgency: "30 days",
      impact: "$3.2M annually"
    },
    {
      id: "specialty-pharmacy",
      title: "Specialty Pharmacy",
      description: "In-house vs Outsource",
      urgency: "60 days",
      impact: "$1.8M annually"
    },
    {
      id: "glp1-strategy",
      title: "GLP-1 Drug Strategy",
      description: "Coverage Policy",
      urgency: "Immediate",
      impact: "$540K annually"
    }
  ];

  const scenarios: Scenario[] = [
    {
      id: "renew-current",
      name: "Renew with Current PBM",
      description: "Continue existing relationship with negotiated improvements",
      probability: 40,
      impact: "medium",
      financialOutcome: {
        best: "+$180K savings",
        likely: "+$90K savings",
        worst: "$0 (status quo)"
      },
      pros: [
        "No disruption to members",
        "Known vendor relationship",
        "Quick implementation (60 days)",
        "Improved rebate terms (90% → 92%)"
      ],
      cons: [
        "Spread pricing still allowed",
        "Limited audit rights remain",
        "Above-market admin fees",
        "3-year commitment required"
      ],
      risks: [
        "Vendor may not honor improvements",
        "Market rates continue dropping",
        "Competition intensifies"
      ],
      timeframe: "60 days to implement",
      confidence: 85
    },
    {
      id: "switch-optum",
      name: "Switch to OptumRx",
      description: "Move to pass-through pricing model with stronger terms",
      probability: 45,
      impact: "high",
      financialOutcome: {
        best: "+$680K savings",
        likely: "+$520K savings",
        worst: "+$300K savings"
      },
      pros: [
        "Pass-through pricing (no spread)",
        "98% rebate guarantee",
        "Quarterly audit rights",
        "Lowest admin fees ($3.25 PEPM)"
      ],
      cons: [
        "Member disruption (formulary changes)",
        "Implementation complexity (120 days)",
        "2-year minimum commitment",
        "Higher dispensing fees"
      ],
      risks: [
        "Implementation delays possible",
        "Member satisfaction dip (temporary)",
        "Formulary changes require communication"
      ],
      timeframe: "120 days to implement",
      confidence: 78
    },
    {
      id: "multi-vendor",
      name: "Multi-Vendor Strategy",
      description: "Split services between 2-3 specialized vendors",
      probability: 15,
      impact: "high",
      financialOutcome: {
        best: "+$840K savings",
        likely: "+$420K savings",
        worst: "-$150K (complexity costs)"
      },
      pros: [
        "Best-of-breed for each service",
        "Maximum leverage in negotiations",
        "Avoid vendor lock-in",
        "Highest potential savings"
      ],
      cons: [
        "High complexity to manage",
        "Integration challenges",
        "Longer implementation (180 days)",
        "Requires dedicated staff"
      ],
      risks: [
        "Coordination failures",
        "Data integration issues",
        "Vendor finger-pointing",
        "Increased administrative burden"
      ],
      timeframe: "180 days to implement",
      confidence: 62
    }
  ];

  const handleAnalyzeScenario = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <GitBranch className="w-7 h-7 text-purple-500" />
            Strategic Decision Engine
          </h2>
          <p className="text-slate-400 mt-1">
            AI-powered scenario modeling and decision support
          </p>
        </div>

        <Button
          onClick={handleAnalyzeScenario}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-purple-600 to-blue-600"
        >
          {isAnalyzing ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Run Deep Analysis
            </>
          )}
        </Button>
      </div>

      {/* Decision Selection */}
      <div className="grid grid-cols-3 gap-4">
        {decisions.map((decision) => (
          <button
            key={decision.id}
            onClick={() => setSelectedDecision(decision.id)}
            className={`p-5 rounded-xl border-2 transition-all text-left ${
              selectedDecision === decision.id
                ? "border-purple-500 bg-purple-500/10"
                : "border-slate-700 hover:border-slate-600"
            }`}
          >
            <h3 className="font-semibold text-white mb-1">{decision.title}</h3>
            <p className="text-sm text-slate-400 mb-3">{decision.description}</p>
            
            <div className="flex items-center justify-between text-xs">
              <Badge variant="outline" className="border-orange-500/30 text-orange-500">
                {decision.urgency}
              </Badge>
              <span className="text-green-500 font-semibold">{decision.impact}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Scenario Comparison */}
      <div className="grid grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className="bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-purple-700 transition-all"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-white mb-1">{scenario.name}</h3>
                  <p className="text-sm text-slate-400">{scenario.description}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`${
                    scenario.impact === "high"
                      ? "border-red-500/30 text-red-500"
                      : scenario.impact === "medium"
                      ? "border-yellow-500/30 text-yellow-500"
                      : "border-green-500/30 text-green-500"
                  }`}
                >
                  {scenario.impact.toUpperCase()}
                </Badge>
              </div>

              {/* Probability */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-slate-400">Probability</span>
                  <span className="font-semibold text-white">{scenario.probability}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                    style={{ width: `${scenario.probability}%` }}
                  />
                </div>
              </div>

              {/* Financial Outcomes */}
              <div className="p-4 bg-slate-800/50 rounded-lg mb-4">
                <div className="text-xs text-slate-400 mb-2">Financial Impact:</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-400">Best Case:</span>
                    <span className="font-semibold text-white">{scenario.financialOutcome.best}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-400">Likely:</span>
                    <span className="font-semibold text-white">{scenario.financialOutcome.likely}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-400">Worst Case:</span>
                    <span className="font-semibold text-white">{scenario.financialOutcome.worst}</span>
                  </div>
                </div>
              </div>

              {/* Pros */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-green-500 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Advantages
                </div>
                <ul className="space-y-1">
                  {scenario.pros.slice(0, 3).map((pro, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">•</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-red-500 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  Disadvantages
                </div>
                <ul className="space-y-1">
                  {scenario.cons.slice(0, 3).map((con, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-slate-400">Timeline: </span>
                  <span className="text-white font-medium">{scenario.timeframe}</span>
                </div>
                <Badge variant="outline" className="border-blue-500/30 text-blue-500 text-xs">
                  {scenario.confidence}% confidence
                </Badge>
              </div>

              <Button
                variant="outline"
                className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-purple-900/20 hover:border-purple-500"
              >
                View Full Analysis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* AI Recommendation */}
      <Card className="bg-gradient-to-br from-purple-950/30 to-blue-950/30 border-purple-700/30 backdrop-blur-sm">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">AI Strategic Recommendation</h3>
              
              <p className="text-slate-300 mb-4">
                Based on analysis of financial impact, risk exposure, and implementation complexity, 
                I recommend <strong className="text-blue-400">switching to OptumRx</strong> (Scenario 2).
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-slate-400">Expected Savings</span>
                  </div>
                  <p className="text-xl font-bold text-white">$520K/year</p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-slate-400">Success Probability</span>
                  </div>
                  <p className="text-xl font-bold text-white">78%</p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span className="text-xs text-slate-400">Implementation</span>
                  </div>
                  <p className="text-xl font-bold text-white">120 days</p>
                </div>
              </div>

              <div className="p-4 bg-blue-950/30 border border-blue-800/30 rounded-lg">
                <p className="text-sm text-blue-200 font-semibold mb-2">Why this recommendation:</p>
                <ul className="space-y-1 text-sm text-blue-100">
                  <li>• <strong>Best value/risk ratio</strong> - High savings with manageable implementation</li>
                  <li>• <strong>Pass-through pricing eliminates conflict of interest</strong> - Saves $480K annually</li>
                  <li>• <strong>98% rebate guarantee is industry-leading</strong> - Additional $180K savings</li>
                  <li>• <strong>120-day timeline is achievable</strong> - Aligns with renewal deadline</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}