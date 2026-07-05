// Kincaid Health - Fiduciary-Grade Rx Claims Intelligence Engine
// DRAP Analysis, Spread Detection, Rebate Reconstruction, Contract Compliance

import type {
  RxClaim,
  DRAPAnalysis,
  SpreadAnalysis,
  RebateReconstruction,
  ContractCompliance,
  LeakageDriver,
  ExecutiveReport,
  ContractTerms,
} from "./types";

/**
 * CORE DRAP CALCULATION
 * Delta Realized vs Allowable Pricing = Sum of (Paid - Allowable) across all claims
 * This is the EBITDA leakage - excess spend beyond fiduciary benchmarks
 */
export function calculateDRAP(
  claims: RxClaim[],
  nadacPrices: Map<string, number>,
  contractTerms: ContractTerms
): DRAPAnalysis {
  let totalPaid = 0;
  let totalAllowable = 0;
  let totalSpread = 0;
  let claimsWithSpread = 0;

  const claimBreakdown = claims.map(claim => {
    const allowablePrice = getAllowablePrice(claim, nadacPrices, contractTerms);
    const spread = claim.paid_amount - allowablePrice;
    
    totalPaid += claim.paid_amount;
    totalAllowable += allowablePrice;
    totalSpread += spread;
    
    if (spread > 0.01) claimsWithSpread++;

    return {
      claim_id: claim.id,
      ndc: claim.ndc,
      paid: claim.paid_amount,
      allowable: allowablePrice,
      spread: spread,
      spread_percent: (spread / claim.paid_amount) * 100,
    };
  });

  return {
    total_paid: totalPaid,
    total_allowable: totalAllowable,
    total_drap: totalSpread,
    drap_percent: (totalSpread / totalPaid) * 100,
    claims_analyzed: claims.length,
    claims_with_spread: claimsWithSpread,
    spread_prevalence: (claimsWithSpread / claims.length) * 100,
    claim_breakdown: claimBreakdown,
  };
}

/**
 * ALLOWABLE PRICE CALCULATION
 * Fiduciary benchmark based on NADAC + contractual terms
 */
function getAllowablePrice(
  claim: RxClaim,
  nadacPrices: Map<string, number>,
  contractTerms: ContractTerms
): number {
  const nadac = nadacPrices.get(claim.ndc) || 0;
  
  // Apply contract pricing formula
  // Example: NADAC + X% or AWP - X%
  if (contractTerms.pricing_model === "nadac_plus") {
    return nadac * (1 + contractTerms.markup_percent / 100);
  } else if (contractTerms.pricing_model === "awp_minus") {
    const awp = claim.awp || nadac * 1.20; // AWP typically ~20% above NADAC
    return awp * (1 - contractTerms.discount_percent / 100);
  }
  
  return nadac; // Default to raw NADAC if no contract terms
}

/**
 * SPREAD PRICING DETECTION
 * Identify claims with excess markup beyond contractual allowances
 */
export function detectSpreadPricing(claims: RxClaim[], drapAnalysis: DRAPAnalysis): SpreadAnalysis {
  // Group by pharmacy to identify systematic spread
  const pharmacySpread = new Map<string, { total_spread: number; claim_count: number; total_paid: number }>();
  
  claims.forEach((claim, idx) => {
    const claimDRAP = drapAnalysis.claim_breakdown[idx];
    const pharmacy = claim.pharmacy_npi || claim.pharmacy_name || "Unknown";
    
    const current = pharmacySpread.get(pharmacy) || { total_spread: 0, claim_count: 0, total_paid: 0 };
    pharmacySpread.set(pharmacy, {
      total_spread: current.total_spread + claimDRAP.spread,
      claim_count: current.claim_count + 1,
      total_paid: current.total_paid + claim.paid_amount,
    });
  });

  // Convert to sorted array
  const topPharmaciesBySpread = Array.from(pharmacySpread.entries())
    .map(([pharmacy, data]) => ({
      pharmacy,
      total_spread: data.total_spread,
      claim_count: data.claim_count,
      avg_spread_per_claim: data.total_spread / data.claim_count,
      spread_percent: (data.total_spread / data.total_paid) * 100,
    }))
    .sort((a, b) => b.total_spread - a.total_spread)
    .slice(0, 20);

  // Group by NDC to identify high-spread drugs
  const ndcSpread = new Map<string, { total_spread: number; claim_count: number; drug_name: string }>();
  
  claims.forEach((claim, idx) => {
    const claimDRAP = drapAnalysis.claim_breakdown[idx];
    const current = ndcSpread.get(claim.ndc) || { 
      total_spread: 0, 
      claim_count: 0, 
      drug_name: claim.drug_name || claim.ndc 
    };
    ndcSpread.set(claim.ndc, {
      total_spread: current.total_spread + claimDRAP.spread,
      claim_count: current.claim_count + 1,
      drug_name: current.drug_name,
    });
  });

  const topNDCsBySpread = Array.from(ndcSpread.entries())
    .map(([ndc, data]) => ({
      ndc,
      drug_name: data.drug_name,
      total_spread: data.total_spread,
      claim_count: data.claim_count,
      avg_spread_per_claim: data.total_spread / data.claim_count,
    }))
    .sort((a, b) => b.total_spread - a.total_spread)
    .slice(0, 20);

  return {
    top_pharmacies: topPharmaciesBySpread,
    top_ndcs: topNDCsBySpread,
    systematic_spread_detected: topPharmaciesBySpread.some(p => p.spread_percent > 10),
  };
}

/**
 * REBATE RECONSTRUCTION
 * Estimate manufacturer rebates using class-level inference when not directly observable
 */
export function reconstructRebates(claims: RxClaim[]): RebateReconstruction {
  // Drug class rebate assumptions (industry averages)
  const rebateRates: Record<string, number> = {
    "diabetes": 0.45, // 45% rebate
    "specialty": 0.25,
    "generic": 0.02,
    "brand": 0.35,
    "biosimilar": 0.30,
  };

  let totalRebateEstimate = 0;
  let totalObservedRebate = 0;

  const claimRebates = claims.map(claim => {
    // If rebate is directly observable in data
    if (claim.rebate_amount !== undefined && claim.rebate_amount !== null) {
      totalObservedRebate += claim.rebate_amount;
      return {
        claim_id: claim.id,
        rebate_amount: claim.rebate_amount,
        estimation_method: "observed" as const,
        confidence: "high" as const,
      };
    }

    // Otherwise infer from drug class
    const drugClass = inferDrugClass(claim);
    const rebateRate = rebateRates[drugClass] || 0.20; // 20% default
    const estimatedRebate = claim.paid_amount * rebateRate;
    
    totalRebateEstimate += estimatedRebate;

    return {
      claim_id: claim.id,
      rebate_amount: estimatedRebate,
      estimation_method: "class_inference" as const,
      confidence: (drugClass === "generic" ? "high" : "medium") as "high" | "medium" | "low",
      drug_class: drugClass,
    };
  });

  return {
    total_rebate_estimate: totalRebateEstimate,
    total_observed_rebate: totalObservedRebate,
    rebate_coverage: (totalObservedRebate / (totalRebateEstimate + totalObservedRebate)) * 100,
    claim_rebates: claimRebates,
    methodology: "Class-level inference with industry benchmark rebate rates",
  };
}

/**
 * DRUG CLASS INFERENCE
 * Classify drug based on NDC, name, and pricing patterns
 */
function inferDrugClass(claim: RxClaim): string {
  const name = claim.drug_name?.toLowerCase() || "";
  
  // Specialty pharma indicators
  if (claim.paid_amount > 5000 || name.includes("humira") || name.includes("enbrel")) {
    return "specialty";
  }
  
  // Diabetes indicators
  if (name.includes("insulin") || name.includes("metformin") || name.includes("glipizide")) {
    return "diabetes";
  }
  
  // Generic indicator (low cost + common naming)
  if (claim.paid_amount < 50 && !name.includes("xr") && !name.includes("er")) {
    return "generic";
  }
  
  // Brand default
  return "brand";
}

/**
 * CONTRACT COMPLIANCE SCORING
 * Assess PBM performance against contractual guarantees
 */
export function scoreContractCompliance(
  claims: RxClaim[],
  drapAnalysis: DRAPAnalysis,
  rebateAnalysis: RebateReconstruction,
  contractTerms: ContractTerms
): ContractCompliance {
  const guarantees: Array<{ 
    name: string; 
    target: number; 
    actual: number; 
    met: boolean;
    variance_dollars: number;
  }> = [];

  // Guarantee 1: Average spread < X%
  if (contractTerms.max_spread_percent !== undefined) {
    const spreadMet = drapAnalysis.drap_percent <= contractTerms.max_spread_percent;
    guarantees.push({
      name: "Maximum Spread %",
      target: contractTerms.max_spread_percent,
      actual: drapAnalysis.drap_percent,
      met: spreadMet,
      variance_dollars: spreadMet ? 0 : (drapAnalysis.drap_percent - contractTerms.max_spread_percent) / 100 * drapAnalysis.total_paid,
    });
  }

  // Guarantee 2: Minimum rebate passthrough
  if (contractTerms.min_rebate_passthrough_percent !== undefined) {
    const expectedPassthrough = rebateAnalysis.total_rebate_estimate * (contractTerms.min_rebate_passthrough_percent / 100);
    const actualPassthrough = rebateAnalysis.total_observed_rebate;
    const rebateMet = actualPassthrough >= expectedPassthrough;
    
    guarantees.push({
      name: "Rebate Passthrough %",
      target: contractTerms.min_rebate_passthrough_percent,
      actual: (actualPassthrough / rebateAnalysis.total_rebate_estimate) * 100,
      met: rebateMet,
      variance_dollars: rebateMet ? 0 : expectedPassthrough - actualPassthrough,
    });
  }

  // Guarantee 3: Generic fill rate
  const genericClaims = claims.filter(c => inferDrugClass(c) === "generic").length;
  const genericRate = (genericClaims / claims.length) * 100;
  
  if (contractTerms.min_generic_fill_rate !== undefined) {
    const genericMet = genericRate >= contractTerms.min_generic_fill_rate;
    guarantees.push({
      name: "Generic Fill Rate %",
      target: contractTerms.min_generic_fill_rate,
      actual: genericRate,
      met: genericMet,
      variance_dollars: 0, // Directional metric only
    });
  }

  const guaranteesMet = guarantees.filter(g => g.met).length;
  const overallScore = (guaranteesMet / guarantees.length) * 100;
  const totalRecoverableDollars = guarantees.reduce((sum, g) => sum + g.variance_dollars, 0);

  return {
    overall_score: overallScore,
    guarantees_met: guaranteesMet,
    guarantees_total: guarantees.length,
    guarantees: guarantees,
    total_recoverable_dollars: totalRecoverableDollars,
    fiduciary_risk_flags: guarantees.filter(g => !g.met).map(g => ({
      flag: `${g.name} guarantee not met`,
      severity: g.variance_dollars > 100000 ? "high" : "medium",
      exposure_dollars: g.variance_dollars,
    })),
  };
}

/**
 * IDENTIFY TOP LEAKAGE DRIVERS
 * Pinpoint specific NDCs, pharmacies, and time periods driving DRAP
 */
export function identifyLeakageDrivers(
  claims: RxClaim[],
  drapAnalysis: DRAPAnalysis,
  spreadAnalysis: SpreadAnalysis
): LeakageDriver[] {
  const drivers: LeakageDriver[] = [];

  // Driver 1: Top NDC by total spread
  if (spreadAnalysis.top_ndcs.length > 0) {
    const topNDC = spreadAnalysis.top_ndcs[0];
    drivers.push({
      category: "ndc",
      identifier: topNDC.ndc,
      description: `${topNDC.drug_name} - Excessive spread on ${topNDC.claim_count} claims`,
      total_leakage: topNDC.total_spread,
      claim_count: topNDC.claim_count,
      priority: topNDC.total_spread > 50000 ? "critical" : "high",
    });
  }

  // Driver 2: Top Pharmacy by total spread
  if (spreadAnalysis.top_pharmacies.length > 0) {
    const topPharmacy = spreadAnalysis.top_pharmacies[0];
    drivers.push({
      category: "pharmacy",
      identifier: topPharmacy.pharmacy,
      description: `Systematic spread across ${topPharmacy.claim_count} claims`,
      total_leakage: topPharmacy.total_spread,
      claim_count: topPharmacy.claim_count,
      priority: topPharmacy.total_spread > 100000 ? "critical" : "high",
    });
  }

  // Driver 3: Temporal anomalies (if date data available)
  const claimsByMonth = groupClaimsByMonth(claims, drapAnalysis);
  if (claimsByMonth.length > 0) {
    const worstMonth = claimsByMonth.sort((a, b) => b.spread - a.spread)[0];
    if (worstMonth.spread > 50000) {
      drivers.push({
        category: "temporal",
        identifier: worstMonth.month,
        description: `Spike in spread during ${worstMonth.month}`,
        total_leakage: worstMonth.spread,
        claim_count: worstMonth.claim_count,
        priority: "medium",
      });
    }
  }

  return drivers.sort((a, b) => b.total_leakage - a.total_leakage).slice(0, 5);
}

function groupClaimsByMonth(claims: RxClaim[], drapAnalysis: DRAPAnalysis): Array<{ month: string; spread: number; claim_count: number }> {
  const monthlyData = new Map<string, { spread: number; count: number }>();
  
  claims.forEach((claim, idx) => {
    if (!claim.fill_date) return;
    
    const date = new Date(claim.fill_date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const claimSpread = drapAnalysis.claim_breakdown[idx]?.spread || 0;
    
    const current = monthlyData.get(monthKey) || { spread: 0, count: 0 };
    monthlyData.set(monthKey, {
      spread: current.spread + claimSpread,
      count: current.count + 1,
    });
  });

  return Array.from(monthlyData.entries()).map(([month, data]) => ({
    month,
    spread: data.spread,
    claim_count: data.count,
  }));
}

/**
 * GENERATE EXECUTIVE REPORT
 * War room briefing format for PE investment committee
 */
export function generateExecutiveReport(
  claims: RxClaim[],
  drapAnalysis: DRAPAnalysis,
  spreadAnalysis: SpreadAnalysis,
  rebateAnalysis: RebateReconstruction,
  complianceAnalysis: ContractCompliance,
  leakageDrivers: LeakageDriver[],
  revenue: number
): ExecutiveReport {
  // EBITDA Impact
  const ebitdaImpact = (drapAnalysis.total_drap / revenue) * 100;
  const recoverableEBITDA = (complianceAnalysis.total_recoverable_dollars / revenue) * 100;

  // Top 3 Drivers
  const top3Drivers = leakageDrivers.slice(0, 3).map(d => ({
    description: d.description,
    impact_dollars: d.total_leakage,
    impact_ebitda_bps: (d.total_leakage / revenue) * 10000, // basis points
  }));

  return {
    executive_summary: {
      total_spend: drapAnalysis.total_paid,
      total_drap: drapAnalysis.total_drap,
      drap_percent: drapAnalysis.drap_percent,
      compliance_score: complianceAnalysis.overall_score,
      ebitda_impact_bps: ebitdaImpact * 100, // basis points
      top_drivers: top3Drivers,
    },
    financial_reconstruction: {
      total_paid: drapAnalysis.total_paid,
      total_allowable: drapAnalysis.total_allowable,
      total_spread: drapAnalysis.total_drap,
      spread_prevalence: drapAnalysis.spread_prevalence,
      estimated_rebates: rebateAnalysis.total_rebate_estimate,
      observed_rebates: rebateAnalysis.total_observed_rebate,
      net_plan_cost: drapAnalysis.total_paid - rebateAnalysis.total_observed_rebate,
    },
    leakage_analysis: {
      top_ndcs: spreadAnalysis.top_ndcs.slice(0, 10),
      top_pharmacies: spreadAnalysis.top_pharmacies.slice(0, 10),
      systematic_spread: spreadAnalysis.systematic_spread_detected,
      temporal_drivers: leakageDrivers.filter(d => d.category === "temporal"),
    },
    contract_performance: {
      overall_score: complianceAnalysis.overall_score,
      guarantees_met: complianceAnalysis.guarantees_met,
      guarantees_total: complianceAnalysis.guarantees_total,
      guarantees: complianceAnalysis.guarantees,
      total_recoverable: complianceAnalysis.total_recoverable_dollars,
      fiduciary_risk_flags: complianceAnalysis.fiduciary_risk_flags,
    },
    actionable_strategy: {
      immediate_recovery: [
        {
          action: "Audit PBM spread pricing practices",
          estimated_recovery: complianceAnalysis.total_recoverable_dollars,
          timeline: "30-60 days",
          difficulty: "medium",
        },
        {
          action: `Renegotiate pricing for top ${spreadAnalysis.top_ndcs.slice(0, 5).length} high-spread NDCs`,
          estimated_recovery: spreadAnalysis.top_ndcs.slice(0, 5).reduce((sum, n) => sum + n.total_spread, 0) * 0.7,
          timeline: "60-90 days",
          difficulty: "medium",
        },
        {
          action: "Implement pharmacy network steering to low-spread providers",
          estimated_recovery: spreadAnalysis.top_pharmacies.slice(0, 3).reduce((sum, p) => sum + p.total_spread, 0) * 0.5,
          timeline: "90-120 days",
          difficulty: "high",
        },
      ],
      contract_leverage: complianceAnalysis.guarantees
        .filter(g => !g.met)
        .map(g => `Demand compliance with ${g.name} guarantee - ${g.variance_dollars.toLocaleString()} at risk`),
      structural_recommendations: [
        "Transition to NADAC-plus transparent pricing model",
        "Require 100% rebate passthrough with admin fee structure",
        "Implement real-time claims adjudication monitoring",
        "Add quarterly DRAP audits with claw-back provisions",
      ],
    },
    metadata: {
      analysis_date: new Date().toISOString(),
      claims_analyzed: claims.length,
      date_range: {
        start: claims.length > 0 ? claims[0].fill_date : null,
        end: claims.length > 0 ? claims[claims.length - 1].fill_date : null,
      },
      confidence_level: rebateAnalysis.rebate_coverage > 50 ? "high" : "medium",
    },
  };
}

/**
 * MASTER ANALYSIS ORCHESTRATOR
 * Run complete fiduciary analysis pipeline
 */
export function analyzeRxClaims(
  claims: RxClaim[],
  nadacPrices: Map<string, number>,
  contractTerms: ContractTerms,
  revenue: number
): ExecutiveReport {
  // Step 1: Calculate DRAP
  const drapAnalysis = calculateDRAP(claims, nadacPrices, contractTerms);
  
  // Step 2: Detect spread pricing
  const spreadAnalysis = detectSpreadPricing(claims, drapAnalysis);
  
  // Step 3: Reconstruct rebates
  const rebateAnalysis = reconstructRebates(claims);
  
  // Step 4: Score contract compliance
  const complianceAnalysis = scoreContractCompliance(claims, drapAnalysis, rebateAnalysis, contractTerms);
  
  // Step 5: Identify leakage drivers
  const leakageDrivers = identifyLeakageDrivers(claims, drapAnalysis, spreadAnalysis);
  
  // Step 6: Generate executive report
  return generateExecutiveReport(
    claims,
    drapAnalysis,
    spreadAnalysis,
    rebateAnalysis,
    complianceAnalysis,
    leakageDrivers,
    revenue
  );
}