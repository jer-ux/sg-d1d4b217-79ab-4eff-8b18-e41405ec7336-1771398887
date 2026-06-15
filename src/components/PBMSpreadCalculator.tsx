"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pill, TrendingDown, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NADAC_PRICES: Record<string, number> = {
  "Lipitor 10mg": 0.12,
  "Metformin 500mg": 0.04,
  "Lisinopril 10mg": 0.03,
  "Atorvastatin 20mg": 0.11,
  "Omeprazole 20mg": 0.08,
  "Losartan 50mg": 0.07,
  "Gabapentin 300mg": 0.09,
  "Simvastatin 20mg": 0.06
};

export function PBMSpreadCalculator() {
  const [selectedDrug, setSelectedDrug] = useState("Lipitor 10mg");
  const [pbmPrice, setPbmPrice] = useState("4.25");
  const [quantity, setQuantity] = useState("30");

  const nadacPrice = NADAC_PRICES[selectedDrug] || 0;
  const pbmPriceNum = parseFloat(pbmPrice) || 0;
  const quantityNum = parseFloat(quantity) || 0;

  const nadacTotal = nadacPrice * quantityNum;
  const pbmTotal = pbmPriceNum * quantityNum;
  const spreadDollar = pbmTotal - nadacTotal;
  const spreadPercent = nadacTotal > 0 ? ((spreadDollar / nadacTotal) * 100).toFixed(0) : "0";

  return (
    <Card className="bg-gradient-to-br from-[#0F1419] to-[#151B23] border border-[#2A3F54] rounded-2xl p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
          <Pill className="w-5 h-5 text-red-400" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-white">
          Hidden PBM Markup Calculator
        </h3>
      </div>

      <p className="text-neutral-400 text-sm mb-6">
        See the actual spread between what your PBM charges vs. the NADAC benchmark price (what generic drugs actually cost).
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-300">
            Select Drug
          </label>
          <select
            value={selectedDrug}
            onChange={(e) => setSelectedDrug(e.target.value)}
            className="w-full bg-[#0C1117] border border-[#2A3F54] focus:border-[#B8860B] text-white rounded-lg px-3 py-2.5 outline-none"
          >
            {Object.keys(NADAC_PRICES).map((drug) => (
              <option key={drug} value={drug}>{drug}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-300">
            Your PBM Price (per unit)
          </label>
          <Input
            type="number"
            step="0.01"
            value={pbmPrice}
            onChange={(e) => setPbmPrice(e.target.value)}
            placeholder="4.25"
            className="bg-[#0C1117] border-[#2A3F54] focus:border-red-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-neutral-300">
            Quantity (pills)
          </label>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="30"
            className="bg-[#0C1117] border-[#2A3F54] focus:border-[#B8860B] text-white"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-emerald-400">NADAC Benchmark</span>
            <Badge className="bg-emerald-500/20 text-emerald-300 border-none text-xs">
              Actual Cost
            </Badge>
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            ${nadacTotal.toFixed(2)}
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            ${nadacPrice.toFixed(2)} per unit × {quantity}
          </div>
        </div>

        <div className="bg-red-950/20 border border-red-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-red-400">Your PBM Charge</span>
            <Badge className="bg-red-500/20 text-red-300 border-none text-xs">
              What You Pay
            </Badge>
          </div>
          <div className="text-3xl font-bold text-red-400">
            ${pbmTotal.toFixed(2)}
          </div>
          <div className="text-xs text-neutral-400 mt-1">
            ${pbmPriceNum.toFixed(2)} per unit × {quantity}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 bg-gradient-to-br from-[#1A0505] to-[#0C1117] border border-red-500/20 rounded-xl p-6 relative overflow-hidden"
      >
        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-red-500/5 rounded-full blur-2xl" />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-xs font-mono text-red-400">PBM Markup Spread</span>
            </div>
            <div className="text-4xl font-bold text-red-400">
              ${spreadDollar.toFixed(2)}
            </div>
            <div className="text-xs text-neutral-400 mt-1">
              {spreadPercent}% markup over actual drug cost
            </div>
          </div>
          <div className="text-right">
            <TrendingDown className="w-12 h-12 text-red-500/30 mb-2" />
            <p className="text-xs text-neutral-500 max-w-[200px]">
              This spread is pure margin retained by your PBM
            </p>
          </div>
        </div>
      </motion.div>
    </Card>
  );
}