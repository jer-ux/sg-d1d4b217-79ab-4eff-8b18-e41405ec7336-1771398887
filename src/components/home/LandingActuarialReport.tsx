import { useState } from "react";
import { TrendingUp, FileText, ArrowRight, Loader2, Award, Percent, DollarSign, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LandingActuarialReport() {
  const [lives, setLives] = useState(350);
  const [spend, setSpend] = useState(2400000);
  const [rebateShare, setRebateShare] = useState(60);
  const [generating, setGenerating] = useState(false);
  const [complete, setComplete] = useState(false);

  const estimatedWaste = spend * 0.28;
  const estimatedSavings = estimatedWaste * (1 - rebateShare / 200);
  const pmpmImpact = (estimatedSavings / lives) / 12;

  const handleGenerateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setComplete(true);
      // Trigger native download
      const link = document.createElement("a");
      link.href = "/SiriusB_iQ_Glassmorphic_v1_Rimes_Market_Validation_Brief.pdf";
      link.download = "SiriusB_Actuarial_Fiduciary_Briefing.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2500);
  };

  return (
    <div className="bg-[#0C1117] border border-[#2A3F54] rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/5 rounded-full blur-3xl" />

      <div className="mb-5">
        <h4 className="text-lg font-serif font-bold text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#B8860B]" />
          Instant Fiduciary Cost Modeler
        </h4>
        <p className="text-xs text-neutral-400 mt-1">
          Adjust benefits parameters to calculate immediate cash recoveries and download your Actuarial Executive Briefing.
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-neutral-300">
            <span>Employee Count (Lives)</span>
            <span className="text-white font-semibold">{lives} lives</span>
          </div>
          <input
            type="range"
            min="100"
            max="2500"
            step="25"
            value={lives}
            onChange={(e) => setLives(Number(e.target.value))}
            className="w-full h-1.5 bg-[#151B23] rounded appearance-none cursor-pointer accent-[#B8860B]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-neutral-300">
            <span>Annual Rx Benefit Spend</span>
            <span className="text-white font-semibold">${(spend / 1000000).toFixed(1)}M</span>
          </div>
          <input
            type="range"
            min="500000"
            max="10000000"
            step="100000"
            value={spend}
            onChange={(e) => setSpend(Number(e.target.value))}
            className="w-full h-1.5 bg-[#151B23] rounded appearance-none cursor-pointer accent-[#B8860B]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-neutral-300">
            <span>Traditional Rebate Pass-Through %</span>
            <span className="text-white font-semibold">{rebateShare}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="95"
            step="5"
            value={rebateShare}
            onChange={(e) => setRebateShare(Number(e.target.value))}
            className="w-full h-1.5 bg-[#151B23] rounded appearance-none cursor-pointer accent-[#B8860B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-[#151B23]/50 border border-[#2A3F54] p-3 rounded">
          <div className="text-[10px] text-neutral-500 font-mono">ANNUAL RECOVERY TARGET</div>
          <div className="text-base font-bold text-emerald-400 mt-0.5">
            ${estimatedSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div className="bg-[#151B23]/50 border border-[#2A3F54] p-3 rounded">
          <div className="text-[10px] text-neutral-500 font-mono">PMPM IMPACT</div>
          <div className="text-base font-bold text-[#B8860B] mt-0.5">
            -${pmpmImpact.toFixed(2)} PMPM
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {complete ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-lg flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-2 text-emerald-400">
              <Award className="h-5 w-5 shrink-0 animate-bounce" />
              <div>
                <p className="font-semibold">Actuarial Briefing Downloaded!</p>
                <p className="text-[10px] text-neutral-400">Check your downloads folder.</p>
              </div>
            </div>
            <button
              onClick={() => setComplete(false)}
              className="text-neutral-400 hover:text-white font-mono text-[10px] underline"
            >
              Reset tool
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="idle"
            disabled={generating}
            onClick={handleGenerateReport}
            className="w-full bg-gradient-to-r from-[#1A3A52] to-[#234766] hover:from-[#234766] hover:to-[#1A3A52] text-white py-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 border border-[#B8860B]/30 disabled:opacity-80"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-[#B8860B]" />
                Assembling Actuarial Models...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 text-[#B8860B]" />
                Generate Forensic Actuarial Report (PDF)
                <ArrowRight className="h-4 w-4 text-[#B8860B]" />
              </>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}