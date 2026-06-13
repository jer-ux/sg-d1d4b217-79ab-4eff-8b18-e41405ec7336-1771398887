import { useState, useEffect } from "react";
import { Search, Building2, ShieldCheck, AlertOctagon, TrendingUp, HelpCircle, User, Mail, Users, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BrokerDetails {
  name: string;
  grade: "A" | "B" | "C" | "D" | "F";
  transparencyScore: number;
  estimatedOverrides: string;
  riskRating: "Low" | "Moderate" | "Severe" | "Critical";
  disclosureCompliance: "100% Fully Disclosed" | "Partially Disclosed" | "Non-Compliant" | "Undisclosed";
}

const mockBrokers: Record<string, BrokerDetails> = {
  "mercer": {
    name: "Mercer",
    grade: "C",
    transparencyScore: 68,
    estimatedOverrides: "$420,000 - $680,000",
    riskRating: "Severe",
    disclosureCompliance: "Partially Disclosed"
  },
  "willis towers watson": {
    name: "Willis Towers Watson (WTW)",
    grade: "C",
    transparencyScore: 71,
    estimatedOverrides: "$380,000 - $590,000",
    riskRating: "Moderate",
    disclosureCompliance: "Partially Disclosed"
  },
  "gallagher": {
    name: "Arthur J. Gallagher",
    grade: "D",
    transparencyScore: 54,
    estimatedOverrides: "$620,000 - $940,000",
    riskRating: "Severe",
    disclosureCompliance: "Non-Compliant"
  },
  "lockton": {
    name: "Lockton Companies",
    grade: "B",
    transparencyScore: 84,
    estimatedOverrides: "$120,000 - $240,000",
    riskRating: "Low",
    disclosureCompliance: "100% Fully Disclosed"
  },
  "usi": {
    name: "USI Insurance Services",
    grade: "D",
    transparencyScore: 49,
    estimatedOverrides: "$550,000 - $810,000",
    riskRating: "Severe",
    disclosureCompliance: "Non-Compliant"
  },
  "alliant": {
    name: "Alliant Insurance Services",
    grade: "F",
    transparencyScore: 38,
    estimatedOverrides: "$780,000 - $1.2M",
    riskRating: "Critical",
    disclosureCompliance: "Undisclosed"
  }
};

export function LandingBrokerLookup() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", lives: "" });
  const [gateSubmitting, setGateSubmitting] = useState(false);

  const [query, setQuery] = useState("");
  const [selectedBroker, setSelectedBroker] = useState<BrokerDetails | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

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
          message: `Gated Fiduciary Lab Unlock (Broker Lookup). Lives: ${formData.lives || "N/A"}`,
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUnlocked) return;
    setHasSearched(true);
    const normalized = query.toLowerCase().trim();
    const foundKey = Object.keys(mockBrokers).find(key => normalized.includes(key) || key.includes(normalized));
    if (foundKey) {
      setSelectedBroker(mockBrokers[foundKey]);
    } else {
      setSelectedBroker(null);
    }
  };

  return (
    <div className="bg-[#0C1117] border border-[#2A3F54] rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[460px]">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/5 rounded-full blur-3xl" />

      <div className="mb-4">
        <h4 className="text-lg font-serif font-bold text-white flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#B8860B]" />
          Benefits Broker Transparency Directory
        </h4>
        <p className="text-xs text-neutral-400 mt-1">
          Benefits brokers are legally required to disclose commissions under CAA Section 202. Look up your firm to check ratings.
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
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Type broker (e.g. Mercer, Gallagher, USI...)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-[#151B23] border border-[#2A3F54] rounded-lg pl-10 pr-4 py-2 text-xs text-neutral-200 focus:outline-none focus:border-[#B8860B] transition-all"
                />
              </div>
              <button
                type="submit"
                className="bg-[#1A3A52] hover:bg-[#234766] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all shrink-0"
              >
                Check
              </button>
            </form>

            <AnimatePresence mode="wait">
              {hasSearched ? (
                selectedBroker ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between bg-[#151B23]/50 border border-[#2A3F54] p-3 rounded-lg">
                      <div>
                        <div className="text-[10px] text-neutral-500 font-mono uppercase">Benefits Agency</div>
                        <div className="text-xs font-semibold text-white mt-0.5">{selectedBroker.name}</div>
                      </div>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-serif text-sm font-bold border ${
                        selectedBroker.grade === "B" ? "border-emerald-500 text-emerald-400 bg-emerald-500/10" :
                        selectedBroker.grade === "C" ? "border-yellow-500 text-yellow-400 bg-yellow-500/10" :
                        "border-red-500 text-red-400 bg-red-500/10"
                      }`}>
                        {selectedBroker.grade}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-[#151B23]/30 border border-[#2A3F54]/60 p-2.5 rounded">
                        <div className="text-[9px] text-neutral-500 font-mono">COMMISSION OVERRIDES</div>
                        <div className="text-xs font-bold text-red-400 mt-0.5">{selectedBroker.estimatedOverrides}</div>
                      </div>
                      <div className="bg-[#151B23]/30 border border-[#2A3F54]/60 p-2.5 rounded">
                        <div className="text-[9px] text-neutral-500 font-mono">CAA COMPLIANCE</div>
                        <div className="text-xs font-bold text-white mt-0.5 flex items-center gap-1">
                          <AlertOctagon className="h-3.5 w-3.5 text-red-400" />
                          {selectedBroker.riskRating}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#1A3A52]/10 border border-[#1A3A52]/30 p-3 rounded text-xs leading-relaxed text-neutral-300">
                      <div className="font-semibold text-[#B8860B] flex items-center gap-1.5 mb-1 text-[10px]">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        COMPLIANCE ADVISORY
                      </div>
                      <p className="text-[11px]">
                        {selectedBroker.disclosureCompliance === "100% Fully Disclosed" ? (
                          "Fee schedule complete. Document fiduciary audits annually."
                        ) : (
                          "Undisclosed commission overrides detected. Proceed with independent PBM carve-out."
                        )}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="no-result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-yellow-950/10 border border-yellow-900/30 rounded-lg p-4 text-center text-xs text-yellow-200"
                  >
                    <HelpCircle className="h-6 w-6 text-[#B8860B] mx-auto mb-2" />
                    <p className="font-semibold text-xs">Agency Non-disclosed</p>
                    <p className="text-neutral-400 mt-1 text-[11px]">
                      This broker has not submitted compensation disclosures to our forensic transparency database.
                    </p>
                  </motion.div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center text-xs text-neutral-500 border border-dashed border-[#2A3F54] rounded-lg">
                  <Building2 className="h-6 w-6 text-neutral-600 mb-2" />
                  <p className="text-[11px]">Type an agency above to retrieve disclosure ratings.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}