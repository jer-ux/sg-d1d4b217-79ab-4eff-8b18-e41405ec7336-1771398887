import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingDown, ArrowRight, Check, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DrugSwap {
  currentDrug: string;
  currentCost: number;
  suggestedAlternative: string;
  costPlusCost: number;
  monthlySavings: number;
  safetyEquivalent: boolean;
  therapeuticClass: string;
}

const suggestedSwaps: DrugSwap[] = [
  {
    currentDrug: "Lipitor (Atorvastatin) 40mg",
    currentCost: 89.00,
    suggestedAlternative: "Generic Atorvastatin 40mg",
    costPlusCost: 6.20,
    monthlySavings: 82.80,
    safetyEquivalent: true,
    therapeuticClass: "Cardiovascular"
  },
  {
    currentDrug: "Januvia (Sitagliptin) 100mg",
    currentCost: 527.00,
    suggestedAlternative: "Generic Sitagliptin 100mg",
    costPlusCost: 31.80,
    monthlySavings: 495.20,
    safetyEquivalent: true,
    therapeuticClass: "Diabetes"
  },
  {
    currentDrug: "Prozac (Fluoxetine) 20mg",
    currentCost: 67.00,
    suggestedAlternative: "Generic Fluoxetine 20mg",
    costPlusCost: 4.50,
    monthlySavings: 62.50,
    safetyEquivalent: true,
    therapeuticClass: "Mental Health"
  },
  {
    currentDrug: "Gleevec (Imatinib) 400mg",
    currentCost: 2450.00,
    suggestedAlternative: "Generic Imatinib 400mg",
    costPlusCost: 39.00,
    monthlySavings: 2411.00,
    safetyEquivalent: true,
    therapeuticClass: "Oncology"
  },
  {
    currentDrug: "Tecfidera (Dimethyl Fumarate) 240mg",
    currentCost: 4800.00,
    suggestedAlternative: "Generic Dimethyl Fumarate 240mg",
    costPlusCost: 92.00,
    monthlySavings: 4708.00,
    safetyEquivalent: true,
    therapeuticClass: "Specialty"
  }
];

export function FormularyOptimizationEngine() {
  const [selectedSwaps, setSelectedSwaps] = useState<string[]>([suggestedSwaps[0].currentDrug]);

  const toggleSwap = (drugName: string) => {
    setSelectedSwaps(prev =>
      prev.includes(drugName)
        ? prev.filter(d => d !== drugName)
        : [...prev, drugName]
    );
  };

  const totalMonthlySavings = suggestedSwaps
    .filter(swap => selectedSwaps.includes(swap.currentDrug))
    .reduce((sum, swap) => sum + swap.monthlySavings, 0);

  const totalAnnualSavings = totalMonthlySavings * 12;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs font-mono uppercase">
          <Sparkles className="w-3 h-3 inline mr-1.5" />
          Intelligent Drug Swap Optimizer
        </Badge>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
          Formulary Optimization Engine
        </h2>
        <p className="text-zinc-400 text-sm">
          AI-powered analysis of your current medications with therapeutic-equivalent Cost Plus alternatives. Select swaps to model exact annual savings.
        </p>
      </div>

      {/* Swap Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {suggestedSwaps.map((swap, idx) => {
          const isSelected = selectedSwaps.includes(swap.currentDrug);
          const savingsPercent = Math.round((swap.monthlySavings / swap.currentCost) * 100);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card 
                onClick={() => toggleSwap(swap.currentDrug)}
                className={`cursor-pointer transition-all duration-300 ${
                  isSelected 
                    ? 'bg-cyan-500/5 border-cyan-500/30 shadow-lg shadow-cyan-500/10' 
                    : 'bg-zinc-950/40 border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    
                    {/* Left: Current Drug */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className="bg-zinc-900 text-zinc-400 border-zinc-800 text-[10px] font-normal mb-2">
                            {swap.therapeuticClass}
                          </Badge>
                          <p className="text-base font-bold text-white">{swap.currentDrug}</p>
                          <p className="text-xs text-zinc-500 mt-1">Current PBM contract pricing</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-zinc-500 font-mono">Monthly Cost</p>
                          <p className="text-2xl font-black text-red-400 font-mono">
                            ${swap.currentCost.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Arrow */}
                    <div className="flex items-center justify-center">
                      <div className={`flex flex-col items-center gap-2 ${isSelected ? 'opacity-100' : 'opacity-40'}`}>
                        <ArrowRight className={`w-6 h-6 ${isSelected ? 'text-cyan-400' : 'text-zinc-600'}`} />
                        <Badge className={`text-[9px] font-bold ${
                          isSelected 
                            ? 'bg-green-500/10 text-green-400 border-green-500/30' 
                            : 'bg-zinc-900 text-zinc-500 border-zinc-800'
                        }`}>
                          -{savingsPercent}%
                        </Badge>
                      </div>
                    </div>

                    {/* Right: Suggested Alternative */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          {swap.safetyEquivalent && (
                            <Badge className="bg-green-500/10 text-green-400 border-green-500/30 text-[10px] font-bold mb-2">
                              <Check className="w-3 h-3 inline mr-1" />
                              FDA Equivalent
                            </Badge>
                          )}
                          <p className="text-base font-bold text-cyan-400">{swap.suggestedAlternative}</p>
                          <p className="text-xs text-zinc-500 mt-1">Cost Plus transparent pricing</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-zinc-500 font-mono">Monthly Cost</p>
                          <p className="text-2xl font-black text-green-400 font-mono">
                            ${swap.costPlusCost.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Far Right: Monthly Savings */}
                    <div className="lg:border-l lg:border-zinc-800 lg:pl-6 text-center">
                      <p className="text-[10px] font-mono text-zinc-500 uppercase mb-1">Monthly Savings</p>
                      <p className="text-3xl font-black text-white font-mono">
                        ${swap.monthlySavings.toFixed(0)}
                      </p>
                      <div className="mt-3">
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mx-auto ${
                          isSelected 
                            ? 'bg-cyan-500 border-cyan-500' 
                            : 'bg-transparent border-zinc-700'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 text-zinc-950" />}
                        </div>
                      </div>
                    </div>

                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Total Savings Summary */}
      <Card className="bg-gradient-to-r from-cyan-950/40 to-green-950/40 border-cyan-500/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.1),transparent_50%)]" />
        <CardContent className="p-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            
            <div className="text-center md:text-left space-y-2">
              <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                Selected Optimizations
              </p>
              <p className="text-4xl font-black text-white font-mono">
                {selectedSwaps.length}
              </p>
              <p className="text-xs text-zinc-500">
                of {suggestedSwaps.length} therapeutic swaps
              </p>
            </div>

            <div className="text-center space-y-2">
              <p className="text-xs font-mono text-white uppercase tracking-widest">
                Projected Annual Savings
              </p>
              <p className="text-5xl md:text-6xl font-black text-cyan-400 font-mono">
                ${(totalAnnualSavings / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-zinc-400">
                ${totalMonthlySavings.toFixed(0)}/month across selected medications
              </p>
            </div>

            <div className="flex justify-center md:justify-end">
              <Button 
                disabled={selectedSwaps.length === 0}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-zinc-950 font-bold uppercase tracking-wider px-8 py-6 rounded-xl shadow-xl shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <TrendingDown className="w-4 h-4 mr-2" />
                Export Optimization Plan
              </Button>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Bottom Notice */}
      <div className="bg-zinc-950/60 p-5 rounded-xl border border-zinc-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-300 leading-relaxed">
          All suggested alternatives are FDA-approved therapeutic equivalents with identical active ingredients, dosages, and safety profiles. 
          Consult with your clinical team or pharmacist before implementing formulary changes.
        </p>
      </div>

    </div>
  );
}