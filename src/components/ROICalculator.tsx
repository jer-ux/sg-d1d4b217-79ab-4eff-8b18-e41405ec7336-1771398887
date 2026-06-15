"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, DollarSign, Users, AlertTriangle, Lock, Mail, Building2, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export function ROICalculator() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [leadFormData, setLeadFormData] = useState({
    name: "",
    email: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [employees, setEmployees] = useState<string>("500");
  const [pharmacySpend, setPharmacySpend] = useState<string>("2500000");
  const [pbmFee, setPbmFee] = useState<string>("34.8");
  
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  const currentCost = (parseFloat(pharmacySpend) || 0) * ((parseFloat(pbmFee) || 0) / 100);
  const kincaidCost = (parseFloat(pharmacySpend) || 0) * 0.025;
  const annualSavings = currentCost - kincaidCost;
  const savingsPercent = currentCost > 0 ? ((annualSavings / currentCost) * 100).toFixed(1) : "0";

  useEffect(() => {
    if (parseFloat(pharmacySpend) > 0 && parseFloat(pbmFee) > 0) {
      setShowResults(true);
    }
  }, [pharmacySpend, pbmFee]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadFormData,
          subject: "ROI Calculator Access Request",
          message: `Requested access to ROI Calculator from company: ${leadFormData.company}`
        })
      });

      if (response.ok) {
        setIsUnlocked(true);
        toast({
          title: "Calculator Unlocked",
          description: "You now have full access to the ROI Calculator. Input your numbers below.",
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
        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
          <DollarSign className="w-5 h-5 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-white">
          Your Potential Savings Calculator
        </h3>
      </div>

      {!isUnlocked ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-[#0C1117] border border-emerald-500/20 rounded-xl p-6 text-center">
            <Lock className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h4 className="text-lg font-bold text-white mb-2">
              Unlock Your Personalized Savings Estimate
            </h4>
            <p className="text-sm text-neutral-400">
              Provide your contact information to access the ROI Calculator and see your potential savings.
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
                className="bg-[#0C1117] border-[#2A3F54] focus:border-emerald-500 text-white"
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
                className="bg-[#0C1117] border-[#2A3F54] focus:border-emerald-500 text-white"
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
                className="bg-[#0C1117] border-[#2A3F54] focus:border-emerald-500 text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold py-4 rounded-xl shadow-lg"
            >
              {isSubmitting ? "Unlocking..." : "Unlock ROI Calculator"}
            </Button>

            <p className="text-xs text-neutral-500 text-center">
              Your information is secure and will only be used to provide you with relevant insights.
            </p>
          </form>
        </motion.div>
      ) : (
        <>
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
        </>
      )}
    </Card>
  );
}