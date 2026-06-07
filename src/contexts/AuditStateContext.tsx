import React, { createContext, useContext, useState, useEffect } from "react";

export interface AuditItem {
  id: number;
  text: string;
  category: string;
  weight: number; // impact weight (1-10)
  remediation: string;
}

export interface PersonaAudit {
  id: string;
  name: string;
  title: string;
  riskWeight: number; // multiplier for financial calculations
  items: AuditItem[];
}

export const INITIAL_AUDITS: Record<string, PersonaAudit> = {
  actuarial: {
    id: "actuarial",
    name: "Actuarial Focus",
    title: "Actuarial Trend & Reserve Accuracy",
    riskWeight: 150000,
    items: [
      { id: 1, category: "Data Access", weight: 9, text: "We have direct, un-redacted access to claim-level pharmacy data (not aggregated PBM portal exports).", remediation: "Negotiate direct feed access or transition to SiriusB independent claims vault." },
      { id: 2, category: "Trend Modeling", weight: 8, text: "Our trend models isolate unit cost, utilization, and drug mix separately.", remediation: "Utilize SiriusB Trend Decomposition Panel to isolate cost drivers." },
      { id: 3, category: "Benchmarking", weight: 8, text: "We independently benchmark specialty drug ingredient costs against CMS NADAC pricing.", remediation: "Implement real-time NADAC-to-AWP spread mapping audits." },
      { id: 4, category: "Model Governance", weight: 7, text: "All model assumptions (rebate pass-through, generic launch timing) are version-controlled.", remediation: "Utilize continuous model version-control features." },
      { id: 5, category: "IBNR Adjustments", weight: 7, text: "We adjust IBNR and reserves using credibility-weighted industry and plan experience.", remediation: "Run automated credibility-weighting calculations quarterly." }
    ]
  },
  cfo: {
    id: "cfo",
    name: "CFO Focus",
    title: "EBITDA & Financial Leakage",
    riskWeight: 245000,
    items: [
      { id: 1, category: "Contract Compliance", weight: 10, text: "We perform automated monthly audits on 100% of PBM pharmacy claims (not random quarterly samples).", remediation: "Deploy SiriusB automated monthly claims auditing engine." },
      { id: 2, category: "Rebate Verification", weight: 9, text: "We independently verify that 100% of manufacturer rebates and admin fees are fully credited back.", remediation: "Reconciliation of PBM administrative fees to wholesale rebate payouts." },
      { id: 3, category: "Contract Alignment", weight: 8, text: "Our broker/consultant has zero financial ties, commissions, or indirect overrides from our PBM partner.", remediation: "Request fully transparent fee-only contracts with mandatory form 5500 schedule C disclosures." },
      { id: 4, category: "Fiduciary Risk", weight: 9, text: "Our benefits team documents all fiduciary-grade decisions with formal, audit-ready evidence receipts.", remediation: "Adopt SiriusB Fiduciary Ledger with cryptographically signed evidence receipts." },
      { id: 5, category: "Renewal Defense", weight: 8, text: "We issue clean RFPs based on plan-specific historical experience rather than PBM-provided averages.", remediation: "Construct independent dynamic RFPs with the PBM Contract Vault." }
    ]
  },
  hr: {
    id: "hr",
    name: "HR Focus",
    title: "ERISA Compliance & Member Experience",
    riskWeight: 120000,
    items: [
      { id: 1, category: "ERISA Governance", weight: 10, text: "We have fully analyzed the impact of CAA 2021 (Consolidated Appropriations Act) on our fiduciary liabilities.", remediation: "Run detailed ERISA and CAA fiduciary risk workshops." },
      { id: 2, category: "Member Transparency", weight: 8, text: "Employees have transparent point-of-care tools to compare actual costs (insurance vs. generic cash vs. GoodRx).", remediation: "Activate the Employee Cost Transparency & generic alternative portal." },
      { id: 3, category: "Formulary Audits", weight: 7, text: "We review and challenge exclusionary formulary changes that push members to higher-cost brand drugs.", remediation: "Conduct independent clinical review of all mid-year formulary exclusions." },
      { id: 4, category: "Broker Oversight", weight: 9, text: "We demand and log annual disclosures of all direct and indirect compensation earned by our broker.", remediation: "Mandate annual broker disclosure audits matching strict CAA requirements." },
      { id: 5, category: "Benefit Integrity", weight: 8, text: "We run independent clinical reviews of all specialty medication approvals and high-cost claims.", remediation: "Implement prior-authorization clinical oversight outside PBM walls." }
    ]
  },
  pe_operators: {
    id: "pe_operators",
    name: "PE Focus",
    title: "Portfolio EBITDA Optimization",
    riskWeight: 310000,
    items: [
      { id: 1, category: "Portfolio Leverage", weight: 9, text: "We aggregate purchasing power across all portfolio companies into a master coalition agreement.", remediation: "Establish a master portfolio coalition contract with standard custom pricing sheets." },
      { id: 2, category: "Due Diligence", weight: 10, text: "We perform a formal PBM contract forensics review during the pre-acquisition due diligence phase.", remediation: "Integrate SiriusB Contract X-Ray into the standard M&A pre-close diligence playbook." },
      { id: 3, category: "Leakage Tracking", weight: 8, text: "We track and report pharmacy program leakage as a direct impact metric on enterprise value.", remediation: "Link PBM audited leakage directly into portco EBITDA reports and exit valuation models." },
      { id: 4, category: "Post-Close Integration", weight: 8, text: "All newly acquired portcos are automatically migrated to our audited master agreement within 90 days.", remediation: "Automate transition mapping and deployment guides for newly acquired entities." },
      { id: 5, category: "Exit Readiness", weight: 9, text: "We have clean, audited pharmacy trend records ready to showcase as enterprise value improvements upon exit.", remediation: "Provide historical audited saving receipts and clean trend lines to prospective buyers." }
    ]
  },
  broker: {
    id: "broker",
    name: "Broker Focus",
    title: "Fiduciary Advisory & RFP Excellence",
    riskWeight: 140000,
    items: [
      { id: 1, category: "Fiduciary Disclosure", weight: 10, text: "We provide full written disclosures of all direct and indirect commissions under CAA 2021 guidelines.", remediation: "Provide written fiduciary fee agreement schedules automatically to all clients." },
      { id: 2, category: "RFP Validation", weight: 8, text: "We utilize real historical claim-level data (not sample claim files) for RFP bid verification.", remediation: "Use the SiriusB PBM RFP Opportunity Sandbox to upload and verify all bids dynamically." },
      { id: 3, category: "Audit Independence", weight: 9, text: "Our contract audits are conducted by independent, non-conflict third-party analytical suites.", remediation: "Incorporate third-party forensic audits into the core client advisory model." },
      { id: 4, category: "Guarantees Validation", weight: 8, text: "We run monthly validation checks on all client PBM contract discount and rebate guarantees.", remediation: "Introduce continuous guarantee validation alerts for client portfolios." },
      { id: 5, category: "Fiduciary Status", weight: 9, text: "We formally act as co-fiduciaries alongside our plan sponsor clients regarding vendor selection.", remediation: "Adopt a formal co-fiduciary posture with documented, objective decision logs." }
    ]
  }
};

interface AuditContextType {
  audits: Record<string, PersonaAudit>;
  checkedItems: Record<string, number[]>; // format: { [personaId]: [checkedItemIds] }
  toggleItem: (personaId: string, itemId: number) => void;
  resetAll: () => void;
  selectPreset: (scenario: "clean" | "medium_risk" | "high_risk" | "fully_optimized") => void;
  getCalculations: () => {
    totalChecked: number;
    totalPossible: number;
    completionPercent: number;
    averageScore: number;
    totalProjectedLeakage: number;
    unlockedSavingsPotential: number;
    erisaCriticalRisks: number;
  };
}

const AuditStateContext = createContext<AuditContextType | undefined>(undefined);

export function AuditStateProvider({ children }: { children: React.ReactNode }) {
  const [audits] = useState<Record<string, PersonaAudit>>(INITIAL_AUDITS);
  const [checkedItems, setCheckedItems] = useState<Record<string, number[]>>({
    actuarial: [1, 3],
    cfo: [3],
    hr: [2],
    pe_operators: [1, 4],
    broker: [1]
  });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("siriusb_audit_state");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved audit state", e);
      }
    }
  }, []);

  const saveState = (newState: Record<string, number[]>) => {
    setCheckedItems(newState);
    localStorage.setItem("siriusb_audit_state", JSON.stringify(newState));
  };

  const toggleItem = (personaId: string, itemId: number) => {
    const current = checkedItems[personaId] || [];
    let updated: number[];
    if (current.includes(itemId)) {
      updated = current.filter(id => id !== itemId);
    } else {
      updated = [...current, itemId];
    }
    const nextState = { ...checkedItems, [personaId]: updated };
    saveState(nextState);
  };

  const resetAll = () => {
    const reset: Record<string, number[]> = {
      actuarial: [],
      cfo: [],
      hr: [],
      pe_operators: [],
      broker: []
    };
    saveState(reset);
  };

  const selectPreset = (scenario: "clean" | "medium_risk" | "high_risk" | "fully_optimized") => {
    let preset: Record<string, number[]> = {};
    if (scenario === "clean") {
      preset = { actuarial: [], cfo: [], hr: [], pe_operators: [], broker: [] };
    } else if (scenario === "medium_risk") {
      preset = {
        actuarial: [1, 3],
        cfo: [3, 5],
        hr: [2, 4],
        pe_operators: [1, 4],
        broker: [1, 2]
      };
    } else if (scenario === "high_risk") {
      preset = {
        actuarial: [],
        cfo: [],
        hr: [],
        pe_operators: [],
        broker: []
      };
    } else if (scenario === "fully_optimized") {
      preset = {
        actuarial: [1, 2, 3, 4, 5],
        cfo: [1, 2, 3, 4, 5],
        hr: [1, 2, 3, 4, 5],
        pe_operators: [1, 2, 3, 4, 5],
        broker: [1, 2, 3, 4, 5]
      };
    }
    saveState(preset);
  };

  const getCalculations = () => {
    let totalChecked = 0;
    let totalPossible = 0;
    let weightedScoreSum = 0;
    let maxWeightedSum = 0;
    let totalProjectedLeakage = 0;
    let erisaCriticalRisks = 0;

    Object.keys(audits).forEach(pId => {
      const persona = audits[pId];
      const checked = checkedItems[pId] || [];
      const unchecked = persona.items.filter(item => !checked.includes(item.id));

      totalChecked += checked.length;
      totalPossible += persona.items.length;

      persona.items.forEach(item => {
        maxWeightedSum += item.weight;
        if (checked.includes(item.id)) {
          weightedScoreSum += item.weight;
        } else {
          // Unchecked high weight (>= 8) items contribute directly to financial leakage & ERISA risks
          totalProjectedLeakage += item.weight * persona.riskWeight * 0.15;
          if (item.category === "ERISA Governance" || item.category === "Fiduciary Risk" || item.weight >= 9) {
            erisaCriticalRisks += 1;
          }
        }
      });
    });

    const completionPercent = totalPossible > 0 ? Math.round((totalChecked / totalPossible) * 100) : 0;
    const averageScore = maxWeightedSum > 0 ? Math.round((weightedScoreSum / maxWeightedSum) * 100) : 0;
    const unlockedSavingsPotential = totalProjectedLeakage * 0.65; // realistic target saving

    return {
      totalChecked,
      totalPossible,
      completionPercent,
      averageScore,
      totalProjectedLeakage,
      unlockedSavingsPotential,
      erisaCriticalRisks
    };
  };

  return (
    <AuditStateContext.Provider value={{
      audits,
      checkedItems,
      toggleItem,
      resetAll,
      selectPreset,
      getCalculations
    }}>
      {children}
    </AuditStateContext.Provider>
  );
}

export function useAuditState() {
  const context = useContext(AuditStateContext);
  if (!context) {
    throw new Error("useAuditState must be used within an AuditStateProvider");
  }
  return context;
}