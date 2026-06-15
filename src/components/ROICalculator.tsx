"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, DollarSign, Users, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ROICalculator() {
  const [employees, setEmployees] = useState<string>("500");
  const [pharmacySpend, setPharmacySpend] = useState<string>("2500000");
  const [pbmFee, setPbmFee] = useState<string>("34.8");
  
  const [showResults, setShowResults] = useState(false);

  const currentCost = (parseFloat(pharmacySpend) || 0) * ((parseFloat(pbmFee) || 0) / 100);
  const kincaidCost = (parseFloat(pharmacySpend) || 0) * 0.025;
  const annualSavings = currentCost - kincaidCost;
  const savingsPercent = currentCost > 0 ? ((annualSavings / currentCost) * 100).toFixed(1) : "0";

  useEffect(() => {
    if (parseFloat(pharmacySpend) > 0 && parseFloat(pbmFee) > 0) {
      setShowResults(true);
    }
  }, [pharmacySpend, pbmFee]);

  return (
    <Card className="bg-gradient-to-br from-[#0F1419] to-[#151B23] border border-[#2A3F54] rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <DollarSign className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-white">
          Your Potential Savings Calculator
        </h3>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
            <Users className="w-4 h-4 text-neutral-400" />
            Employee Count
          </label>
          <Input
            type="number"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            placeholder="500"
            className="bg-[#0C1117] border-[#2A3F54] focus:border-emerald-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-300">
            Annual Pharmacy Spend
          </label>
          <Input
            type="number"
            value={pharmacySpend}
            onChange={(e) => setPharmacySpend(e.target.value)}
            placeholder="2500000"
            className="bg-[#0C1117] border-[#2A3F54] focus:border-emerald-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            Current PBM Fee %
          </label>
          <Input
            type="number"
            step="0.1"
            value={pbmFee}
            onChange={(e) => setPbmFee(e.target.value)}
            placeholder="34.8"
            className="bg-[#0C1117] border-[#2A3F54] focus:border-red-500 text-white"
          />
        </div>
      </div>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-[#2A3F54] to-transparent" />

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5">
                <div className="text-xs font-mono text-red-400 mb-2">Current PBM Cost</div>
                <div className="text-3xl font-bold text-red-400">
                  ${currentCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  {pbmFee}% effective fee rate
                </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5">
                <div className="text-xs font-mono text-emerald-400 mb-2">Kincaid Fiduciary Cost</div>
                <div className="text-3xl font-bold text-emerald-400">
                  ${kincaidCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  2.5% fiduciary fee (guaranteed)
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#1A3A52] to-[#234766] border border-[#B8860B]/30 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono text-[#B8860B]">Annual Savings Potential</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full font-bold">
                    {savingsPercent}% Reduction
                  </span>
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent flex items-center gap-3">
                  ${annualSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  <TrendingUp className="w-8 h-8 text-emerald-400" />
                </div>
                <p className="text-xs text-neutral-400 mt-3">
                  Based on your inputs vs. Kincaid Fiduciary's 2.5% transparent fee model
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}