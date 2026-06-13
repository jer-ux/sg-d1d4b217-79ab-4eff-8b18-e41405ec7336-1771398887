import { useState, useEffect } from "react";
import { TrendingUp, FileText, ArrowRight, Loader2, Award, User, Mail, Building2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function LandingActuarialReport() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", lives: "" });
  const [gateSubmitting, setGateSubmitting] = useState(false);

  const [lives, setLives] = useState(350);
  const [spend, setSpend] = useState(2400000);
  const [rebateShare, setRebateShare] = useState(60);
  const [generating, setGenerating] = useState(false);
  const [complete, setComplete] = useState(false);

  const estimatedWaste = spend * 0.28;
  const estimatedSavings = estimatedWaste * (1 - rebateShare / 200);
  const pmpmImpact = (estimatedSavings / lives) / 12;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsUnlocked(localStorage.getItem("fiduciary_lab_unlocked") === "true");
    }

    const handleUnlockSync = () => {
      setIsUnlocked(localStorage.getItem("fiduciary_lab_unlocked") === "true");
    };

    window.addEventListener("fiduciary_lab_unlocked_change", handleUnlockSync);
    return () => window.removeEventListener("fiduciary_lab_unlocked_change", handleUnlockSync);
  }, []);

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.email) return;
    setGateSubmitting(true);

    try {
      await fetch("/api/contact/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          message: `Gated Fiduciary Lab Unlock (Actuarial). Lives: ${formData.lives || "N/A"}`,
          source: "fiduciary_lab_gate"
        })
      });
    } catch (err) {
      console.error("Lead capture submission failed:", err);
    }

    localStorage.setItem("fiduciary_lab_unlocked", "true");
    window.dispatchEvent(new Event("fiduciary_lab_unlocked_change"));
    setIsUnlocked(true);
    setGateSubmitting(false);
  };

  const handleGenerateReport = () => {
    if (!isUnlocked) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setComplete(true);
      const link = document.createElement("a");
      link.href = "/SiriusB_iQ_Glassmorphic_v1_Rimes_Market_Validation_Brief.pdf";
      link.download = "SiriusB_Actuarial_Fiduciary_Briefing.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 2500);
  };

  return (
    <div className="bg-[#0C1117] border border-[#2A3F54] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/5 rounded-full blur-3xl" />

      <div className="mb-4">
        <h4 className="text-lg font-serif font-bold text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-[#B8860B]" />
          Instant Fiduciary Cost Modeler
        </h4>
        <p className="text-xs text-neutral-400 mt-1">
          Adjust benefits parameters to calculate immediate cash recoveries and download your Actuarial Executive Briefing.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isUnlocked ? (
          <motion.form
            key="gate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleGateSubmit}
            className="space-y-3.5 bg-[#151B23]/40 border border-[#2A3F54] p-5 rounded-lg relative z-10"
          >
            <div className="text-center pb-1">
              <span className="text-[10px] font-mono text-[#B8860B] uppercase tracking-wider font-semibold">Fiduciary Verification Required</span>
              <p className="text-xs text-neutral-300 mt-1">Enter your business coordinates to unlock the diagnostic sandbox tools.</p>
            </div>

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0C1117] border border-[#2A3F54] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#B8860B]"
              />
            </div>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="text"
                required
                placeholder="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-[#0C1117] border border-[#2A3F54] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#B8860B]"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="email"
                required
                placeholder="Work Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#0C1117] border border-[#2A3F54] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#B8860B]"
              />
            </div>

            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-500" />
              <input
                type="number"
                placeholder="Employee Count / Covered Lives"
                value={formData.lives}
                onChange={(e) => setFormData({ ...formData, lives: e.target.value })}
                className="w-full bg-[#0C1117] border border-[#2A3F54] rounded-md pl-9 pr-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#B8860B]"
              />
            </div>

            <button
              type="submit"
              disabled={gateSubmitting}
              className="w-full bg-[#1A3A52] hover:bg-[#234766] disabled:opacity-80 text-white py-2 px-4 rounded text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
            >
              {gateSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Unlock Forensic Sandbox
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-3 mb-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-neutral-300">
                  <span>Covered Lives</span>
                  <span className="text-[#B8860B] font-semibold">{lives}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2500"
                  step="25"
                  value={lives}
                  onChange={(e) => setLives(Number(e.target.value))}
                  className="w-full h-1 bg-[#151B23] rounded appearance-none cursor-pointer accent-[#B8860B]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-neutral-300">
                  <span>Annual Rx Spend</span>
                  <span className="text-[#B8860B] font-semibold">${(spend / 1000000).toFixed(1)}M</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="10000000"
                  step="100000"
                  value={spend}
                  onChange={(e) => setSpend(Number(e.target.value))}
                  className="w-full h-1 bg-[#151B23] rounded appearance-none cursor-pointer accent-[#B8860B]"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-neutral-300">
                  <span>Traditional Pass-Through %</span>
                  <span className="text-[#B8860B] font-semibold">{rebateShare}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  step="5"
                  value={rebateShare}
                  onChange={(e) => setRebateShare(Number(e.target.value))}
                  className="w-full h-1 bg-[#151B23] rounded appearance-none cursor-pointer accent-[#B8860B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-[#151B23]/50 border border-[#2A3F54] p-2.5 rounded">
                <div className="text-[9px] text-neutral-500 font-mono">RECOVERY TARGET</div>
                <div className="text-xs font-bold text-emerald-400 mt-0.5">
                  ${estimatedSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
              </div>
              <div className="bg-[#151B23]/50 border border-[#2A3F54] p-2.5 rounded">
                <div className="text-[9px] text-neutral-500 font-mono">PMPM IMPACT</div>
                <div className="text-xs font-bold text-[#B8860B] mt-0.5">
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
                  className="bg-emerald-950/20 border border-emerald-900/40 p-3 rounded-lg flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Award className="h-4 w-4 shrink-0" />
                    <div>
                      <p className="font-semibold text-[11px]">Briefing Downloaded!</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setComplete(false)}
                    className="text-neutral-400 hover:text-white font-mono text-[9px] underline"
                  >
                    Reset
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="idle"
                  disabled={generating}
                  onClick={handleGenerateReport}
                  className="w-full bg-gradient-to-r from-[#1A3A52] to-[#234766] text-white py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-[#B8860B]/30 disabled:opacity-80"
                >
                  {generating ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-[#B8860B]" />
                      Modeling...
                    </>
                  ) : (
                    <>
                      <FileText className="h-3.5 w-3.5 text-[#B8860B]" />
                      Download Actuarial Briefing (PDF)
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}