import { LedgerState, LedgerCategory } from "@/lib/ledger/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface LedgerFiltersProps {
  selectedStates: LedgerState[];
  selectedCategories: LedgerCategory[];
  onStateToggle: (state: LedgerState) => void;
  onCategoryToggle: (category: LedgerCategory) => void;
  onClearAll: () => void;
}

const states: LedgerState[] = ["identified", "approved", "realized", "at-risk", "disputed", "rejected"];
const categories: LedgerCategory[] = [
  "cost-reduction",
  "revenue-enhancement",
  "productivity-gain",
  "risk-avoidance",
  "working-capital",
  "capex-avoidance"
];

const stateColors: Record<LedgerState, string> = {
  identified: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  approved: "bg-green-500/20 text-green-300 border-green-500/30",
  realized: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "at-risk": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  disputed: "bg-red-500/20 text-red-300 border-red-500/30",
  rejected: "bg-gray-500/20 text-gray-300 border-gray-500/30"
};

const categoryLabels: Record<LedgerCategory, string> = {
  "cost-reduction": "Cost Reduction",
  "revenue-enhancement": "Revenue Enhancement",
  "productivity-gain": "Productivity Gain",
  "risk-avoidance": "Risk Avoidance",
  "working-capital": "Working Capital",
  "capex-avoidance": "CapEx Avoidance"
};

export function LedgerFilters({
  selectedStates,
  selectedCategories,
  onStateToggle,
  onCategoryToggle,
  onClearAll
}: LedgerFiltersProps) {
  const hasFilters = selectedStates.length > 0 || selectedCategories.length > 0;

  return (
    <div className="k-panel p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="font-medium text-white">Filters</div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClearAll}>
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div>
        <div className="text-sm text-white/60 mb-2">State</div>
        <div className="flex flex-wrap gap-2">
          {states.map((state) => (
            <Badge
              key={state}
              className={`cursor-pointer transition-all ${
                selectedStates.includes(state)
                  ? stateColors[state]
                  : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
              }`}
              onClick={() => onStateToggle(state)}
            >
              {state}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm text-white/60 mb-2">Category</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              className={`cursor-pointer transition-all ${
                selectedCategories.includes(category)
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                  : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
              }`}
              onClick={() => onCategoryToggle(category)}
            >
              {categoryLabels[category]}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}