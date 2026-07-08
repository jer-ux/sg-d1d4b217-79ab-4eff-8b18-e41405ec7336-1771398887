/**
 * KINCAID HEALTH™ ACTUARIAL DASHBOARD
 * Glossary of Actuarial Terms
 */

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, ExternalLink } from "lucide-react";

interface GlossaryTerm {
  term: string;
  definition: string;
  formula?: string;
  example?: string;
  category: string;
  relatedTerms?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "PMPM",
    definition: "Per Member Per Month - The average cost per covered member per month. This is a standard healthcare cost metric used to compare plan performance.",
    formula: "Total Claims / Number of Members / Number of Months",
    example: "$5M claims / 1000 members / 12 months = $417 PMPM",
    category: "Healthcare",
    relatedTerms: ["PEPM", "Utilization"]
  },
  {
    term: "VaR (Value at Risk)",
    definition: "The maximum expected loss at a given confidence level. For example, 95% VaR means there's only a 5% chance losses will exceed this amount.",
    formula: "95th percentile of loss distribution",
    example: "VaR(95%) = $1.2M means 95% confidence losses stay under $1.2M",
    category: "Risk",
    relatedTerms: ["TVaR", "Confidence Interval"]
  },
  {
    term: "TVaR (Tail Value at Risk)",
    definition: "The average of all losses that exceed the VaR threshold. Also called Conditional VaR or Expected Shortfall.",
    formula: "Average of losses beyond VaR threshold",
    example: "If VaR(95%) = $1.2M and TVaR(95%) = $1.5M, extreme losses average $1.5M",
    category: "Risk",
    relatedTerms: ["VaR", "Tail Risk"]
  },
  {
    term: "Medical Trend",
    definition: "The annual rate of increase in healthcare costs, driven by inflation, utilization changes, and new treatments.",
    example: "8% medical trend means costs increase 8% year-over-year",
    category: "Healthcare",
    relatedTerms: ["Inflation", "Utilization"]
  },
  {
    term: "Stop-Loss",
    definition: "Insurance that protects self-funded employers from catastrophic claims. Specific stop-loss covers individual large claims; aggregate stop-loss covers total plan costs.",
    example: "Specific stop-loss at $150K means insurer pays claims above $150K per person",
    category: "Insurance",
    relatedTerms: ["Attachment Point", "Deductible"]
  },
  {
    term: "IBNR",
    definition: "Incurred But Not Reported - Claims that have occurred but haven't been submitted yet. Important for accurate reserve setting.",
    formula: "Estimated based on claim lag patterns",
    example: "Services in December might not be claimed until February",
    category: "Reserving",
    relatedTerms: ["Claims Lag", "Run-out"]
  },
  {
    term: "Credibility",
    definition: "A statistical measure of how much weight to give to actual experience vs. expected values. Higher credibility means more reliance on observed data.",
    formula: "Z = sqrt(claims / 1082) for full credibility",
    example: "1000 claims = 96% credibility, meaning 96% weight on actual experience",
    category: "Statistics",
    relatedTerms: ["Statistical Significance", "Sample Size"]
  },
  {
    term: "Loss Ratio",
    definition: "Claims paid divided by premium collected. A key profitability metric for insurance.",
    formula: "Total Claims / Total Premium",
    example: "$8M claims / $10M premium = 80% loss ratio",
    category: "Insurance",
    relatedTerms: ["Combined Ratio", "Premium"]
  },
  {
    term: "Utilization",
    definition: "The rate at which covered members use healthcare services. Measured as services per member per period.",
    example: "3.5 doctor visits per member per year",
    category: "Healthcare",
    relatedTerms: ["PMPM", "Frequency"]
  },
  {
    term: "Severity",
    definition: "The average cost per service or claim. Combined with frequency/utilization to determine total costs.",
    example: "Average hospital admission cost = $15,000",
    category: "Healthcare",
    relatedTerms: ["Utilization", "Unit Cost"]
  },
  {
    term: "Monte Carlo Simulation",
    definition: "A computational technique that runs thousands of scenarios with random variables to estimate the range of possible outcomes.",
    example: "10,000 simulations show costs between $4.8M - $6.2M with 95% confidence",
    category: "Statistics",
    relatedTerms: ["Stochastic Modeling", "Probability Distribution"]
  },
  {
    term: "Confidence Interval",
    definition: "A range of values that likely contains the true value with a specified probability. Wider intervals mean more uncertainty.",
    formula: "[Lower Bound, Upper Bound] at X% confidence",
    example: "95% CI: [$5.1M, $5.9M] means 95% confidence true value is in this range",
    category: "Statistics",
    relatedTerms: ["Standard Error", "Margin of Error"]
  },
  {
    term: "Funded Status",
    definition: "For pensions, the ratio of plan assets to plan liabilities. Above 100% is overfunded, below 100% is underfunded.",
    formula: "Plan Assets / Plan Liabilities",
    example: "$50M assets / $45M liabilities = 111% funded status",
    category: "Pensions",
    relatedTerms: ["Asset Liability Management", "Funding Ratio"]
  }
];

export function GlossarySidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const categories = Array.from(new Set(glossaryTerms.map(t => t.category)));

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Actuarial Glossary</h3>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search terms..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(null)}
          >
            All
          </Badge>
          {categories.map(category => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {filteredTerms.map((term) => {
            const isExpanded = expandedTerm === term.term;

            return (
              <Card
                key={term.term}
                className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => setExpandedTerm(isExpanded ? null : term.term)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-base">{term.term}</h4>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {term.category}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-2">
                  {term.definition}
                </p>

                {isExpanded && (
                  <div className="mt-4 space-y-3 pt-3 border-t">
                    {term.formula && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">
                          Formula
                        </div>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {term.formula}
                        </code>
                      </div>
                    )}

                    {term.example && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-1">
                          Example
                        </div>
                        <p className="text-xs bg-primary/5 p-2 rounded">
                          {term.example}
                        </p>
                      </div>
                    )}

                    {term.relatedTerms && term.relatedTerms.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground mb-2">
                          Related Terms
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {term.relatedTerms.map(related => (
                            <Badge
                              key={related}
                              variant="outline"
                              className="text-xs cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchTerm(related);
                                setExpandedTerm(related);
                              }}
                            >
                              {related}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No terms found matching "{searchTerm}"</p>
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t">
        <a
          href="/docs/actuarial-glossary"
          className="flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          View Full Glossary
        </a>
      </div>
    </Card>
  );
}