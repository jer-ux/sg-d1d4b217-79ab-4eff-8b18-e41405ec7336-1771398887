import { useState } from "react";
import { Sparkles, Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { Intervention, InterventionType } from "@/lib/kincaid-iq/types";
import { calculateInterventionSavings } from "@/lib/kincaid-iq/actuarial";

const AVAILABLE_INTERVENTIONS: Record<InterventionType, Omit<Intervention, "type">> = {
  vendor_switch: {
    name: "TPA/Carrier Switch",
    expected_savings_percent: 12,
    confidence: "high",
    implementation_months: 6,
  },
  pbm_optimization: {
    name: "PBM Optimization",
    expected_savings_percent: 10,
    confidence: "high",
    implementation_months: 6,
  },
  benefit_redesign: {
    name: "HDHP Migration",
    expected_savings_percent: 8,
    confidence: "medium",
    implementation_months: 12,
  },
  wellness_program: {
    name: "Chronic Disease Management",
    expected_savings_percent: 4,
    confidence: "medium",
    implementation_months: 18,
  },
  stop_loss_adjustment: {
    name: "Stop Loss Optimization",
    expected_savings_percent: 3,
    confidence: "high",
    implementation_months: 3,
  },
  network_steering: {
    name: "Center of Excellence Network",
    expected_savings_percent: 6,
    confidence: "high",
    implementation_months: 9,
  },
};

type Props = {
  currentAnnualCost: number;
  onInterventionsChange: (interventions: Intervention[], totalSavings: number) => void;
};

export function InterventionSimulator({ currentAnnualCost, onInterventionsChange }: Props) {
  const [selectedInterventions, setSelectedInterventions] = useState<Intervention[]>([]);
  const [selectedType, setSelectedType] = useState<InterventionType | null>(null);

  const addIntervention = () => {
    if (!selectedType) return;
    
    const intervention: Intervention = {
      type: selectedType,
      ...AVAILABLE_INTERVENTIONS[selectedType],
    };

    const newInterventions = [...selectedInterventions, intervention];
    setSelectedInterventions(newInterventions);
    
    const totalSavings = calculateInterventionSavings(currentAnnualCost, newInterventions);
    onInterventionsChange(newInterventions, totalSavings);
    
    setSelectedType(null);
  };

  const removeIntervention = (index: number) => {
    const newInterventions = selectedInterventions.filter((_, i) => i !== index);
    setSelectedInterventions(newInterventions);
    
    const totalSavings = calculateInterventionSavings(currentAnnualCost, newInterventions);
    onInterventionsChange(newInterventions, totalSavings);
  };

  const totalSavingsPercent = selectedInterventions.reduce((acc, int) => {
    const remaining = 1 - acc;
    return acc + remaining * (int.expected_savings_percent / 100);
  }, 0) * 100;

  const totalSavingsDollar = calculateInterventionSavings(currentAnnualCost, selectedInterventions);

  return (
    <Card className="border-amber-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/30 p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-amber-500/10 p-2">
          <Sparkles className="h-5 w-5 text-amber-400" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Intervention Simulator</h3>
          <p className="text-sm text-slate-400">Model cost compression strategies</p>
        </div>
      </div>

      {/* Add Intervention */}
      <div className="mb-6 flex gap-3">
        <Select value={selectedType || undefined} onValueChange={(v) => setSelectedType(v as InterventionType)}>
          <SelectTrigger className="flex-1 border-slate-700 bg-slate-900 text-white">
            <SelectValue placeholder="Select intervention..." />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(AVAILABLE_INTERVENTIONS).map(([type, data]) => (
              <SelectItem key={type} value={type}>
                {data.name} (-{data.expected_savings_percent}%)
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={addIntervention}
          disabled={!selectedType}
          className="bg-amber-500 hover:bg-amber-600"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Selected Interventions */}
      <div className="space-y-3">
        {selectedInterventions.map((intervention, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-3"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-white">{intervention.name}</p>
                <Badge variant="outline" className="text-xs">
                  -{intervention.expected_savings_percent}%
                </Badge>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${
                    intervention.confidence === "high" 
                      ? "border-green-500/50 text-green-400" 
                      : "border-yellow-500/50 text-yellow-400"
                  }`}
                >
                  {intervention.confidence} confidence
                </Badge>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {intervention.implementation_months} month implementation
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeIntervention(index)}
              className="text-red-400 hover:bg-red-950/30 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}

        {selectedInterventions.length === 0 && (
          <div className="rounded-lg border border-dashed border-slate-700 p-8 text-center">
            <p className="text-sm text-slate-400">No interventions selected</p>
            <p className="mt-1 text-xs text-slate-500">Add strategies above to model savings</p>
          </div>
        )}
      </div>

      {/* Summary */}
      {selectedInterventions.length > 0 && (
        <div className="mt-6 rounded-lg border border-amber-500/30 bg-amber-950/20 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-400">Modeled Savings</p>
              <p className="mt-1 text-2xl font-bold text-amber-400">
                {totalSavingsPercent.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Annual Savings</p>
              <p className="mt-1 text-2xl font-bold text-emerald-400">
                ${(totalSavingsDollar / 1000).toFixed(0)}K
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}