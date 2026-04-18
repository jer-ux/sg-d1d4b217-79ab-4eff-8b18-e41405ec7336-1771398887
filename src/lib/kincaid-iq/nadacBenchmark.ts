// NADAC Benchmark Database & Mock Claims Generator
// National Average Drug Acquisition Cost pricing data + realistic Rx claims

import type { RxClaim, ContractTerms } from "./types";

/**
 * NADAC PRICING DATABASE
 * Top 200 most prescribed drugs with benchmark prices
 * Prices in dollars per unit (tablet, capsule, mL, etc.)
 */
export const NADAC_PRICES = new Map<string, { price: number; drug_name: string; class: string }>([
  // === DIABETES ===
  ["00002-8215-01", { price: 0.45, drug_name: "Metformin HCl 500mg", class: "diabetes" }],
  ["00002-8215-02", { price: 0.52, drug_name: "Metformin HCl 1000mg", class: "diabetes" }],
  ["00169-3686-12", { price: 2.15, drug_name: "Glipizide 5mg", class: "diabetes" }],
  ["00169-3687-12", { price: 2.45, drug_name: "Glipizide 10mg", class: "diabetes" }],
  ["00002-7510-59", { price: 98.50, drug_name: "Insulin Glargine (Lantus) 100u/mL", class: "specialty" }],
  ["00002-8501-01", { price: 112.30, drug_name: "Insulin Lispro (Humalog) 100u/mL", class: "specialty" }],
  ["00169-7501-11", { price: 1.85, drug_name: "Glyburide 5mg", class: "diabetes" }],
  
  // === CARDIOVASCULAR ===
  ["00093-7663-56", { price: 0.28, drug_name: "Atorvastatin 20mg", class: "generic" }],
  ["00093-7664-56", { price: 0.32, drug_name: "Atorvastatin 40mg", class: "generic" }],
  ["00093-7665-56", { price: 0.38, drug_name: "Atorvastatin 80mg", class: "generic" }],
  ["00071-0156-23", { price: 0.42, drug_name: "Lisinopril 10mg", class: "generic" }],
  ["00071-0157-23", { price: 0.48, drug_name: "Lisinopril 20mg", class: "generic" }],
  ["00093-0073-01", { price: 0.35, drug_name: "Amlodipine 5mg", class: "generic" }],
  ["00093-0074-01", { price: 0.39, drug_name: "Amlodipine 10mg", class: "generic" }],
  ["00378-6120-93", { price: 0.55, drug_name: "Metoprolol Tartrate 50mg", class: "generic" }],
  ["00378-6121-93", { price: 0.62, drug_name: "Metoprolol Tartrate 100mg", class: "generic" }],
  ["68382-0087-01", { price: 0.45, drug_name: "Losartan 50mg", class: "generic" }],
  ["68382-0088-01", { price: 0.52, drug_name: "Losartan 100mg", class: "generic" }],
  ["00093-7369-56", { price: 0.38, drug_name: "Simvastatin 20mg", class: "generic" }],
  ["00093-7370-56", { price: 0.42, drug_name: "Simvastatin 40mg", class: "generic" }],
  
  // === MENTAL HEALTH ===
  ["00093-7146-56", { price: 0.68, drug_name: "Sertraline 50mg", class: "generic" }],
  ["00093-7147-56", { price: 0.75, drug_name: "Sertraline 100mg", class: "generic" }],
  ["00093-4001-01", { price: 0.58, drug_name: "Citalopram 20mg", class: "generic" }],
  ["00093-4002-01", { price: 0.65, drug_name: "Citalopram 40mg", class: "generic" }],
  ["00093-7212-56", { price: 1.25, drug_name: "Escitalopram 10mg", class: "generic" }],
  ["00093-7213-56", { price: 1.35, drug_name: "Escitalopram 20mg", class: "generic" }],
  ["00093-0033-01", { price: 0.72, drug_name: "Fluoxetine 20mg", class: "generic" }],
  ["00093-0034-01", { price: 0.82, drug_name: "Fluoxetine 40mg", class: "generic" }],
  ["00378-6078-93", { price: 1.15, drug_name: "Bupropion XL 150mg", class: "generic" }],
  ["00378-6079-93", { price: 1.28, drug_name: "Bupropion XL 300mg", class: "generic" }],
  
  // === PAIN / INFLAMMATION ===
  ["00378-7800-01", { price: 0.22, drug_name: "Ibuprofen 800mg", class: "generic" }],
  ["00378-1805-01", { price: 0.18, drug_name: "Naproxen 500mg", class: "generic" }],
  ["00093-0058-01", { price: 1.45, drug_name: "Meloxicam 15mg", class: "generic" }],
  ["00093-3109-56", { price: 0.85, drug_name: "Tramadol 50mg", class: "generic" }],
  
  // === SPECIALTY (HIGH COST) ===
  ["00074-3799-02", { price: 2850.00, drug_name: "Humira 40mg/0.8mL Pen", class: "specialty" }],
  ["00074-4339-02", { price: 2750.00, drug_name: "Enbrel 50mg Syringe", class: "specialty" }],
  ["59676-0580-01", { price: 3200.00, drug_name: "Eliquis 5mg", class: "specialty" }],
  ["59676-0581-01", { price: 3200.00, drug_name: "Eliquis 2.5mg", class: "specialty" }],
  ["00054-0223-25", { price: 1850.00, drug_name: "Xarelto 20mg", class: "specialty" }],
  ["00054-0224-25", { price: 1850.00, drug_name: "Xarelto 15mg", class: "specialty" }],
  
  // === RESPIRATORY ===
  ["00173-0682-20", { price: 145.00, drug_name: "Advair Diskus 250/50", class: "brand" }],
  ["00173-0683-20", { price: 158.00, drug_name: "Advair Diskus 500/50", class: "brand" }],
  ["00078-0678-15", { price: 0.95, drug_name: "Albuterol Sulfate HFA 90mcg", class: "generic" }],
  ["00173-0715-20", { price: 125.00, drug_name: "Flovent HFA 110mcg", class: "brand" }],
  ["00024-5910-30", { price: 0.85, drug_name: "Montelukast 10mg", class: "generic" }],
  
  // === GASTROINTESTINAL ===
  ["00186-5040-31", { price: 1.25, drug_name: "Omeprazole 20mg", class: "generic" }],
  ["00186-5041-31", { price: 1.35, drug_name: "Omeprazole 40mg", class: "generic" }],
  ["00093-7926-56", { price: 1.45, drug_name: "Pantoprazole 40mg", class: "generic" }],
  ["00378-6180-93", { price: 0.95, drug_name: "Ranitidine 150mg", class: "generic" }],
  
  // === ANTIBIOTICS ===
  ["00093-2264-56", { price: 0.65, drug_name: "Amoxicillin 500mg", class: "generic" }],
  ["00093-2265-56", { price: 0.72, drug_name: "Amoxicillin 875mg", class: "generic" }],
  ["00093-1074-56", { price: 1.85, drug_name: "Azithromycin 250mg", class: "generic" }],
  ["00378-0146-93", { price: 1.15, drug_name: "Ciprofloxacin 500mg", class: "generic" }],
  ["00093-3147-56", { price: 2.25, drug_name: "Levofloxacin 500mg", class: "generic" }],
]);

/**
 * MOCK CONTRACT TERMS
 * Sample PBM contract with guarantees that can be tested
 */
export const MOCK_CONTRACT_TERMS: ContractTerms = {
  pricing_model: "nadac_plus",
  markup_percent: 15, // NADAC + 15% (reasonable fiduciary benchmark)
  max_spread_percent: 8, // Maximum 8% spread allowed
  min_rebate_passthrough_percent: 90, // Must pass through 90% of rebates
  min_generic_fill_rate: 85, // At least 85% generic utilization
  performance_guarantees: [
    "Maximum average spread of 8% vs NADAC benchmark",
    "Minimum 90% manufacturer rebate passthrough",
    "Minimum 85% generic dispensing rate",
    "Quarterly claims audit with claw-back provisions",
  ],
};

/**
 * GENERATE REALISTIC MOCK RX CLAIMS
 * Creates synthetic claims data with intentional spread patterns for demo
 */
export function generateMockRxClaims(claimCount: number = 500): RxClaim[] {
  const claims: RxClaim[] = [];
  const ndcList = Array.from(NADAC_PRICES.keys());
  const pharmacies = [
    { npi: "1234567890", name: "CVS Pharmacy #4523" },
    { npi: "2345678901", name: "Walgreens #8721" },
    { npi: "3456789012", name: "Walmart Pharmacy #2341" },
    { npi: "4567890123", name: "Rite Aid #5672" },
    { npi: "5678901234", name: "Local Independent Pharmacy" },
  ];

  const startDate = new Date("2025-01-01");
  const endDate = new Date("2025-12-31");

  for (let i = 0; i < claimCount; i++) {
    // Random NDC
    const ndc = ndcList[Math.floor(Math.random() * ndcList.length)];
    const nadacData = NADAC_PRICES.get(ndc)!;
    const nadacPrice = nadacData.price;

    // Random pharmacy
    const pharmacy = pharmacies[Math.floor(Math.random() * pharmacies.length)];

    // Random fill date
    const fillDate = new Date(
      startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
    );

    // Days supply (typically 30 or 90)
    const daysSupply = Math.random() > 0.7 ? 90 : 30;
    const quantity = daysSupply; // Simplified: 1 unit per day

    // INTRODUCE SPREAD PRICING PATTERNS
    let spreadMultiplier = 1.15; // Base 15% markup (contract allows 15%)

    // Pattern 1: Certain pharmacies have systematic higher spread
    if (pharmacy.name.includes("CVS")) {
      spreadMultiplier = 1.25; // 25% markup - contract violation
    } else if (pharmacy.name.includes("Local Independent")) {
      spreadMultiplier = 1.35; // 35% markup - significant violation
    }

    // Pattern 2: Specialty drugs have extra spread
    if (nadacData.class === "specialty") {
      spreadMultiplier *= 1.12; // Additional 12% on specialty
    }

    // Pattern 3: Some drugs systematically overcharged
    if (nadacData.drug_name.includes("Insulin") || nadacData.drug_name.includes("Humira")) {
      spreadMultiplier *= 1.18; // Additional 18% on high-value drugs
    }

    // Calculate paid amount with spread
    const allowablePrice = nadacPrice * quantity;
    const paidAmount = allowablePrice * spreadMultiplier;

    // AWP (typically ~20% above NADAC)
    const awp = nadacPrice * 1.20;

    // Rebate (only observable for ~40% of claims - rest must be inferred)
    let rebateAmount: number | undefined;
    if (Math.random() < 0.4) {
      // Rebate observable for 40% of claims
      const rebateRate = nadacData.class === "specialty" ? 0.25 : nadacData.class === "diabetes" ? 0.45 : 0.35;
      rebateAmount = paidAmount * rebateRate;
    }

    claims.push({
      id: `claim_${i + 1}`,
      ndc,
      drug_name: nadacData.drug_name,
      pharmacy_npi: pharmacy.npi,
      pharmacy_name: pharmacy.name,
      fill_date: fillDate.toISOString().split("T")[0],
      days_supply: daysSupply,
      quantity,
      paid_amount: Math.round(paidAmount * 100) / 100, // Round to cents
      member_copay: Math.round((paidAmount * 0.15) * 100) / 100, // 15% copay
      awp,
      rebate_amount: rebateAmount ? Math.round(rebateAmount * 100) / 100 : undefined,
      is_generic: nadacData.class === "generic",
      is_specialty: nadacData.class === "specialty",
    });
  }

  return claims.sort((a, b) => new Date(a.fill_date).getTime() - new Date(b.fill_date).getTime());
}

/**
 * GET NADAC PRICE MAP
 * Convert NADAC database to simple price lookup
 */
export function getNADACPriceMap(): Map<string, number> {
  const priceMap = new Map<string, number>();
  NADAC_PRICES.forEach((data, ndc) => {
    priceMap.set(ndc, data.price);
  });
  return priceMap;
}

/**
 * CALCULATE EXPECTED ANNUAL RX SPEND
 * Estimate total Rx spend for organization sizing
 */
export function calculateExpectedAnnualRxSpend(
  employeeCount: number,
  utilizationRate: number = 0.85
): number {
  // Industry benchmark: ~$5,000 per covered member per year for Rx
  const avgRxPMPY = 5000;
  return employeeCount * utilizationRate * avgRxPMPY;
}