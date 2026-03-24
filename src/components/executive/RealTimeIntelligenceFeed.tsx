import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Globe,
  DollarSign,
  Users,
  FileText,
  Clock,
  ChevronRight,
  Filter,
  ArrowUpRight
} from "lucide-react";

interface IntelligenceItem {
  id: string;
  source: string;
  category: string;
  headline: string;
  timestamp: string;
  impact: "positive" | "negative" | "neutral";
  relevance: number;
  urgency: "critical" | "high" | "medium" | "low";
  actions: string[];
  tags: string[];
}

export function RealTimeIntelligenceFeed() {
  const [filter, setFilter] = useState<"all" | "critical" | "market" | "regulatory">("all");
  const [intelligenceItems, setIntelligenceItems] = useState<IntelligenceItem[]>([
    {
      id: "1",
      source: "Bloomberg Healthcare",
      category: "Market Consolidation",
      headline: "CVS Health announces $10B acquisition of specialty pharmacy network",
      timestamp: "12 minutes ago",
      impact: "negative",
      relevance: 95,
      urgency: "critical",
      actions: [
        "Review CVS contract terms",
        "Assess negotiation leverage",
        "Explore alternative vendors"
      ],
      tags: ["PBM", "M&A", "Market Risk"]
    },
    {
      id: "2",
      source: "Federal Register",
      category: "Regulatory",
      headline: "CMS proposes new PBM transparency requirements effective Q3 2026",
      timestamp: "2 hours ago",
      impact: "positive",
      relevance: 92,
      urgency: "high",
      actions: [
        "Update contract templates",
        "Train legal team",
        "Client communication plan"
      ],
      tags: ["Compliance", "Transparency", "Opportunity"]
    },
    {
      id: "3",
      source: "Healthcare Dive",
      category: "Drug Pricing",
      headline: "GLP-1 drug prices drop 15% as generics enter market",
      timestamp: "4 hours ago",
      impact: "positive",
      relevance: 88,
      urgency: "medium",
      actions: [
        "Renegotiate rebate terms",
        "Update formulary",
        "Member education"
      ],
      tags: ["Specialty Drugs", "Cost Savings"]
    },
    {
      id: "4",
      source: "WSJ",
      category: "Fraud Alert",
      headline: "DOJ indicts major pharmacy chain for $340M upcoding scheme",
      timestamp: "6 hours ago",
      impact: "neutral",
      relevance: 85,
      urgency: "high",
      actions: [
        "Audit similar patterns",
        "Review pharmacy network",
        "Implement detection"
      ],
      tags: ["Fraud", "Compliance", "Risk"]
    },
    {
      id: "5",
      source: "AHIP Report",
      category: "Industry Trends",
      headline: "Self-funded plans reach 68% adoption among Fortune 500",
      timestamp: "8 hours ago",
      impact: "neutral",
      relevance: 78,
      urgency: "low",
      actions: [
        "Update competitive analysis",
        "Refine positioning",
        "Sales enablement"
      ],
      tags: ["Market Trends", "Strategy"]
    },
    {
      id: "6",
      source: "Reuters",
      category: "Technology",
      headline: "AI-powered prior authorization systems reduce approval time by 70%",
      timestamp: "10 hours ago",
      impact: "positive",
      relevance: 82,
      urgency: "medium",
      actions: [
        "Evaluate AI solutions",
        "ROI analysis",
        "Pilot program"
      ],
      tags: ["Innovation", "Efficiency"]
    }
  ]);

  const filteredItems = intelligenceItems.filter(item => {
    if (filter === "all") return true;
    if (filter === "critical") return item.urgency === "critical";
    if (filter === "market") return item.category.includes("Market") || item.category.includes("Drug");
    if (filter === "regulatory") return item.category.includes("Regulatory") || item.category.includes("Compliance");
    return true;
  });

  return (
    <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Real-Time Intelligence</h2>
              <p className="text-sm text-slate-400">Market insights & regulatory updates</p>
            </div>
          </div>

          <Badge variant="outline" className="border-green-500/30 text-green-500">
            <Activity className="w-3 h-3 mr-1 animate-pulse" />
            Live
          </Badge>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: "all", label: "All Updates", count: intelligenceItems.length },
            { id: "critical", label: "Critical", count: intelligenceItems.filter(i => i.urgency === "critical").length },
            { id: "market", label: "Market", count: intelligenceItems.filter(i => i.category.includes("Market") || i.category.includes("Drug")).length },
            { id: "regulatory", label: "Regulatory", count: intelligenceItems.filter(i => i.category.includes("Regulatory") || i.category.includes("Compliance")).length }
          ].map((filterOption) => (
            <button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter === filterOption.id
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {filterOption.label}
              <Badge variant="outline" className="ml-2 border-slate-600 text-slate-400">
                {filterOption.count}
              </Badge>
            </button>
          ))}
        </div>

        {/* Intelligence Feed */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-xl border-2 border-slate-800 bg-slate-800/30 hover:border-slate-700 transition-all cursor-pointer group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      item.urgency === "critical"
                        ? "border-red-500/30 text-red-500"
                        : item.urgency === "high"
                        ? "border-orange-500/30 text-orange-500"
                        : item.urgency === "medium"
                        ? "border-yellow-500/30 text-yellow-500"
                        : "border-slate-500/30 text-slate-500"
                    }`}
                  >
                    {item.urgency.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-slate-500">{item.source}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span className="text-xs text-slate-500">{item.timestamp}</span>
                </div>
              </div>

              {/* Category */}
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-blue-500/30 text-blue-500 text-xs">
                  {item.category}
                </Badge>
                {item.impact === "positive" ? (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                ) : item.impact === "negative" ? (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                ) : (
                  <Activity className="w-4 h-4 text-slate-500" />
                )}
              </div>

              {/* Headline */}
              <h3 className="text-base font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {item.headline}
              </h3>

              {/* Relevance Score */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Relevance to Your Business</span>
                  <span className="font-semibold text-white">{item.relevance}%</span>
                </div>
                <div className="w-full bg-slate-700/30 rounded-full h-2">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.relevance >= 90
                        ? "bg-gradient-to-r from-red-500 to-orange-500"
                        : item.relevance >= 80
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500"
                    }`}
                    style={{ width: `${item.relevance}%` }}
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {item.tags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="border-slate-600 text-slate-400 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-700">
                <p className="text-xs text-slate-400 mb-2">Recommended Actions:</p>
                <div className="space-y-1">
                  {item.actions.map((action, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <ChevronRight className="w-3 h-3 text-blue-500" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Details Button */}
              <Button
                size="sm"
                variant="outline"
                className="w-full mt-4 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-blue-500"
              >
                View Full Analysis
                <ArrowUpRight className="w-3 h-3 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Monitoring <span className="font-semibold text-white">24</span> sources
            </p>
            <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
              <Filter className="w-4 h-4 mr-2" />
              Customize Sources
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}