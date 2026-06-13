import { useState } from "react";
import { Search, Building2, ShieldCheck, AlertOctagon, TrendingUp, HelpCircle } from "lucide-react";
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
  const [query, setQuery] = useState("");
  const [selectedBroker, setSelectedBroker] = useState<BrokerDetails | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const normalized = query.toLowerCase().trim();
    
    // Exact or partial search
    const foundKey = Object.keys(mockBrokers).find(key => normalized.includes(foundBrokerName(key)) || key.includes(normalized));
    if (foundKey) {
      setSelectedBroker(mockBrokers[foundKey]);
    } else {
      setSelectedBroker(null);
    }
  };

  const foundBrokerName = (key: string) => {
    return key;
  };

  return (
    <div className="bg-[#0C1117] border border-[#2A3F54] rounded-xl p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/5 rounded-full blur-3xl" />

      <div className="mb-5">
        <h4 className="text-lg font-serif font-bold text-white flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#B8860B]" />
          Benefits Broker Transparency Directory
        </h4>
        <p className="text-xs text-neutral-400 mt-1">
          Benefits brokers are legally required to disclose hidden commissions under CAA Section 202. Look up your firm to check transparency compliance.
        </p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Type broker (e.g. Mercer, Gallagher, Lockton, USI...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#151B23] border border-[#2A3F54] rounded-lg pl-10 pr-4 py-2.5 text-xs text-neutral-200 focus:outline-none focus:border-[#B8860B] transition-all"
          />
        </div>
        <button
          type="submit"
          className="bg-[#1A3A52] hover:bg-[#234766] text-white px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shrink-0"
        >
          Check Score
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
              className="space-y-4"
            >
              <div className="flex items-center justify-between bg-[#151B23]/50 border border-[#2A3F54] p-3.5 rounded-lg">
                <div>
                  <div className="text-xs text-neutral-500 font-mono uppercase">Benefits Agency</div>
                  <div className="text-sm font-semibold text-white mt-0.5">{selectedBroker.name}</div>
                </div>
                <div className={`h-11 w-11 rounded-full flex items-center justify-center font-serif text-lg font-bold border ${
                  selectedBroker.grade === "B" ? "border-emerald-500 text-emerald-400 bg-emerald-500/10" :
                  selectedBroker.grade === "C" ? "border-yellow-500 text-yellow-400 bg-yellow-500/10" :
                  "border-red-500 text-red-400 bg-red-500/10"
                }`}>
                  {selectedBroker.grade}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#151B23]/30 border border-[#2A3F54]/60 p-3 rounded">
                  <div className="text-[10px] text-neutral-500 font-mono">EST. CAA COMMISSION SKIMS</div>
                  <div className="text-xs font-bold text-red-400 mt-1">{selectedBroker.estimatedOverrides}</div>
                </div>
                <div className="bg-[#151B23]/30 border border-[#2A3F54]/60 p-3 rounded">
                  <div className="text-[10px] text-neutral-500 font-mono">REGULATORY RISK</div>
                  <div className="text-xs font-bold text-white mt-1 flex items-center gap-1">
                    <AlertOctagon className={`h-3.5 w-3.5 ${
                      selectedBroker.riskRating === "Low" ? "text-emerald-400" :
                      selectedBroker.riskRating === "Moderate" ? "text-yellow-400" :
                      "text-red-400"
                    }`} />
                    {selectedBroker.riskRating}
                  </div>
                </div>
              </div>

              <div className="bg-[#1A3A52]/10 border border-[#1A3A52]/30 p-3.5 rounded-lg text-xs leading-relaxed text-neutral-300">
                <div className="font-semibold text-[#B8860B] flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="h-4 w-4" />
                  CAA Section 202 Compliance Action:
                </div>
                {selectedBroker.disclosureCompliance === "100% Fully Disclosed" ? (
                  "The broker provides robust fee schedules. Continue monitoring annual renewal bonus allocations to ensure compliance."
                ) : (
                  "Potential CAA compliance breach detected. You may have legal exposure under ERISA. Carve out PBM services to bypass non-fiduciary consulting overrides."
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="no-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-yellow-950/10 border border-yellow-900/30 rounded-lg p-5 text-center text-xs text-yellow-200"
            >
              <HelpCircle className="h-8 w-8 text-[#B8860B] mx-auto mb-2" />
              <p className="font-semibold">Brokerage Firm Not In Registry</p>
              <p className="text-neutral-400 mt-1">
                This firm hasn't submitted their full Section 202 compensation transparency filings to our forensic archive.
              </p>
            </motion.div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-xs text-neutral-500 border border-dashed border-[#2A3F54] rounded-lg">
            <Building2 className="h-8 w-8 text-neutral-600 mb-2" />
            <p>Enter your broker's name above to retrieve compliance grades.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}