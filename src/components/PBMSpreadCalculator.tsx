"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pill, TrendingDown, AlertCircle, Lock, Mail, Building2, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: "",
    email: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedDrug, setSelectedDrug] = useState("Lipitor 10mg");
  const [pbmPrice, setPbmPrice] = useState("4.25");
  const [quantity, setQuantity] = useState("30");
  const { toast } = useToast();

  const nadacPrice = NADAC_PRICES[selectedDrug] || 0;
  const pbmPriceNum = parseFloat(pbmPrice) || 0;
  const quantityNum = parseFloat(quantity) || 0;

  const nadacTotal = nadacPrice * quantityNum;
  const pbmTotal = pbmPriceNum * quantityNum;
  const spreadDollar = pbmTotal - nadacTotal;
  const spreadPercent = nadacTotal > 0 ? ((spreadDollar / nadacTotal) * 100).toFixed(0) : "0";

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadFormData,
          subject: "PBM Spread Calculator Access Request",
          message: `Requested access to PBM Spread Calculator from company: ${leadFormData.company}`
        })
      });

      if (response.ok) {
        setIsUnlocked(true);
        toast({
          title: "Calculator Unlocked",
          description: "You now have full access to the PBM Spread Calculator. Select a drug below to see markups.",
        });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Unable to unlock calculator. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {!isUnlocked ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-[#0C1117] border border-red-500/20 rounded-xl p-6 text-center">
            <Lock className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">
              Unlock Hidden Markup Analysis
            </h4>
            <p className="text-sm text-neutral-400">
              See the actual spread between your PBM charges vs. NADAC benchmark prices. Provide your contact information to access the calculator.
            </p>
          </div>

          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </label>
              <Input
                type="text"
                value={leadFormData.name}
                onChange={(e) => setLeadFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Smith"
                required
                className="bg-[#0C1117] border-[#2A3F54] focus:border-red-500 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Business Email *
              </label>
              <Input
                type="email"
                value={leadFormData.email}
                onChange={(e) => setLeadFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john.smith@company.com"
                required
                className="bg-[#0C1117] border-[#2A3F54] focus:border-red-500 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-neutral-300 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Company Name *
              </label>
              <Input
                type="text"
                value={leadFormData.company}
                onChange={(e) => setLeadFormData(prev => ({ ...prev, company: e.target.value }))}
                placeholder="Acme Corporation"
                required
                className="bg-[#0C1117] border-[#2A3F54] focus:border-red-500 text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold py-4 rounded-xl shadow-lg"
            >
              {isSubmitting ? "Unlocking..." : "Unlock Markup Calculator"}
            </Button>

            <p className="text-xs text-neutral-500 text-center">
              Your information is secure and will only be used to provide you with relevant insights.
            </p>
          </form>
        </motion.div>
      ) : (
        <>
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
        </>
      )}
    </Card>
  );
}