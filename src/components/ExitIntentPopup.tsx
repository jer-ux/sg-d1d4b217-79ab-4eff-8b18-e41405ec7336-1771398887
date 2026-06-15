"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [hasShown, setHasShown] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          subject: "Download: $6.4B Arbitrage Report",
          message: "Lead magnet download request",
          name: email.split("@")[0]
        })
      });

      if (response.ok) {
        toast({
          title: "Report Download Started",
          description: "The $6.4B Arbitrage Report is downloading. Check your email for the full PDF.",
        });
        
        window.open("/The_6_4_Billion_Arbitrage.pdf", "_blank");
        setIsVisible(false);
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to process your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998]"
            onClick={() => setIsVisible(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-2xl"
          >
            <div className="bg-gradient-to-br from-[#0F1419] via-[#1A2A3A] to-[#0F1419] border border-[#B8860B]/30 rounded-2xl p-8 shadow-2xl relative">
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-[#B8860B]/10 rounded-xl border border-[#B8860B]/30">
                  <FileText className="w-8 h-8 text-[#B8860B]" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">
                    Wait! Don't Leave Empty-Handed
                  </h3>
                  <p className="text-neutral-400 text-sm">
                    Download our exclusive $6.4B Arbitrage Report
                  </p>
                </div>
              </div>

              <div className="bg-[#0C1117] border border-[#2A3F54] rounded-xl p-6 mb-6">
                <h4 className="font-bold text-white mb-3">What's Inside:</h4>
                <ul className="space-y-2 text-sm text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>How Big Three PBMs extract $6.4B in hidden arbitrage annually</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>The exact spread-pricing formulas they use to mask overcharges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>8 contract clauses that enable systematic plan asset leakage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Evidence-based defense strategies to recover lost funds</span>
                  </li>
                </ul>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-neutral-300 mb-2 block">
                    Enter your email to download
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@company.com"
                    required
                    className="bg-[#0C1117] border-[#2A3F54] focus:border-[#B8860B] text-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#B8860B] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#B8860B] text-white font-bold py-6 rounded-xl shadow-lg shadow-[#B8860B]/20"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Free Report (PDF)
                </Button>
              </form>

              <p className="text-xs text-neutral-500 text-center mt-4">
                No spam. Unsubscribe anytime. Your data is secure and never shared.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}