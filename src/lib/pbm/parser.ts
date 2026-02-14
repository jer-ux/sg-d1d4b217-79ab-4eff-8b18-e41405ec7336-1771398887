/**
 * PBM Contract Parser
 * Extracts structured economic terms from raw contract documents
 */

import type { 
  ParsedContract, 
  RebateTerms, 
  SpreadPricingClause, 
  AdminFeeStructure, 
  SpecialtyDefinition 
} from "./types";

interface ParsingResult {
  success: boolean;
  data?: Partial<ParsedContract>;
  confidence: number;
  notes: string[];
  manual_review_required: boolean;
  errors?: string[];
}

/**
 * Mock implementation - in production would use:
 * - OCR for PDFs
 * - NLP extraction models
 * - Pattern matching for economic terms
 * - LLM-based structured extraction
 */
export async function parseContract(
  fileId: string,
  orgId: string,
  documentText: string
): Promise<ParsingResult> {
  
  const notes: string[] = [];
  let confidence = 0;
  let manualReviewRequired = false;

  try {
    // Extract rebate terms
    const rebateTerms = extractRebateTerms(documentText);
    if (rebateTerms.confidence < 0.8) {
      notes.push("Low confidence in rebate term extraction");
      manualReviewRequired = true;
    }
    confidence += rebateTerms.confidence * 0.3;

    // Extract spread pricing
    const spreadPricing = extractSpreadPricing(documentText);
    if (spreadPricing.confidence < 0.8) {
      notes.push("Spread pricing terms unclear or missing");
      manualReviewRequired = true;
    }
    confidence += spreadPricing.confidence * 0.25;

    // Extract admin fees
    const adminFees = extractAdminFees(documentText);
    confidence += adminFees.confidence * 0.2;

    // Extract specialty definitions
    const specialtyDef = extractSpecialtyDefinition(documentText);
    confidence += specialtyDef.confidence * 0.25;

    // Extract contract metadata
    const metadata = extractContractMetadata(documentText);

    const parsedData: Partial<ParsedContract> = {
      file_id: fileId,
      org_id: orgId,
      parsing_timestamp: new Date(),
      
      rebate_terms: rebateTerms.data,
      spread_pricing: spreadPricing.data,
      admin_fees: adminFees.data,
      specialty_definition: specialtyDef.data,
      
      pbm_name: metadata.pbm_name,
      contract_effective_date: metadata.effective_date,
      contract_end_date: metadata.end_date,
      
      extraction_confidence: confidence,
      parsing_notes: notes,
      manual_review_required: manualReviewRequired
    };

    return {
      success: true,
      data: parsedData,
      confidence,
      notes,
      manual_review_required: manualReviewRequired
    };

  } catch (error) {
    return {
      success: false,
      confidence: 0,
      notes: ["Critical parsing error"],
      manual_review_required: true,
      errors: [error instanceof Error ? error.message : "Unknown error"]
    };
  }
}

function extractRebateTerms(text: string): { data: RebateTerms; confidence: number } {
  // Pattern matching for rebate percentages
  const retainedMatch = text.match(/retain(?:ed)?[\s:]+(\d+(?:\.\d+)?)\s*%/i);
  const passthroughMatch = text.match(/pass[\s-]?through[\s:]+(\d+(?:\.\d+)?)\s*%/i);
  
  const retained = retainedMatch ? parseFloat(retainedMatch[1]) : 0;
  const passthrough = passthroughMatch ? parseFloat(passthroughMatch[1]) : 100 - retained;

  // Look for guaranteed rebate amounts
  const brandRebateMatch = text.match(/brand[\s\w]*rebate[\s:]+\$?(\d+(?:\.\d+)?)/i);
  const genericRebateMatch = text.match(/generic[\s\w]*rebate[\s:]+\$?(\d+(?:\.\d+)?)/i);
  const specialtyRebateMatch = text.match(/specialty[\s\w]*rebate[\s:]+\$?(\d+(?:\.\d+)?)/i);

  let confidence = 0.5;
  if (retainedMatch || passthroughMatch) confidence += 0.3;
  if (brandRebateMatch || genericRebateMatch) confidence += 0.2;

  return {
    data: {
      retained_percentage: retained,
      passthrough_percentage: passthrough,
      guaranteed_rebate_brand: brandRebateMatch ? parseFloat(brandRebateMatch[1]) : undefined,
      guaranteed_rebate_generic: genericRebateMatch ? parseFloat(genericRebateMatch[1]) : undefined,
      guaranteed_rebate_specialty: specialtyRebateMatch ? parseFloat(specialtyRebateMatch[1]) : undefined,
      rebate_timing: text.toLowerCase().includes("quarterly") ? "quarterly" : "annual",
      rebate_basis: text.includes("AWP") ? "AWP" : "MAC",
      conditions: []
    },
    confidence: Math.min(confidence, 1.0)
  };
}

function extractSpreadPricing(text: string): { data: SpreadPricingClause; confidence: number } {
  const awpDiscountMatch = text.match(/AWP[\s-]+(\d+(?:\.\d+)?)\s*%/i);
  const dispensingFeeMatch = text.match(/dispensing[\s\w]*fee[\s:]+\$?(\d+(?:\.\d+)?)/i);
  
  const hasTransparencyLanguage = text.toLowerCase().includes("transparent") || 
                                   text.toLowerCase().includes("pass-through");

  let confidence = 0.4;
  if (awpDiscountMatch) confidence += 0.3;
  if (dispensingFeeMatch) confidence += 0.3;

  return {
    data: {
      mac_definition: text.includes("MAC") ? "Defined in Appendix" : "Not specified",
      awp_discount_percentage: awpDiscountMatch ? parseFloat(awpDiscountMatch[1]) : 15.0,
      dispensing_fee_per_script: dispensingFeeMatch ? parseFloat(dispensingFeeMatch[1]) : 2.50,
      ingredient_cost_basis: text.includes("MAC") ? "MAC" : "AWP",
      spread_disclosed: hasTransparencyLanguage,
      transparency_level: hasTransparencyLanguage ? "partial" : "opaque"
    },
    confidence: Math.min(confidence, 1.0)
  };
}

function extractAdminFees(text: string): { data: AdminFeeStructure; confidence: number } {
  const pepmMatch = text.match(/PEPM[\s:]+\$?(\d+(?:\.\d+)?)/i);
  const perScriptMatch = text.match(/per[\s-]script[\s\w]*fee[\s:]+\$?(\d+(?:\.\d+)?)/i);
  const guaranteeMatch = text.match(/guarantee[\s:]+\$?([\d,]+(?:\.\d+)?)/i);

  let confidence = 0.5;
  if (pepmMatch) confidence += 0.25;
  if (perScriptMatch) confidence += 0.25;

  return {
    data: {
      pepm_admin_fee: pepmMatch ? parseFloat(pepmMatch[1]) : 8.50,
      per_script_fee: perScriptMatch ? parseFloat(perScriptMatch[1]) : 0,
      performance_guarantee_amount: guaranteeMatch ? parseFloat(guaranteeMatch[1].replace(/,/g, "")) : undefined,
      performance_metrics: [],
      fee_escalation_clause: undefined
    },
    confidence: Math.min(confidence, 1.0)
  };
}

function extractSpecialtyDefinition(text: string): { data: SpecialtyDefinition; confidence: number } {
  const thresholdMatch = text.match(/specialty[\s\w]*threshold[\s:]+\$?([\d,]+(?:\.\d+)?)/i);
  const hasWhiteBagging = text.toLowerCase().includes("white bag");
  const hasMandatoryMail = text.toLowerCase().includes("mandatory mail") || 
                           text.toLowerCase().includes("required mail");

  let confidence = 0.5;
  if (thresholdMatch) confidence += 0.3;
  if (hasWhiteBagging || hasMandatoryMail) confidence += 0.2;

  return {
    data: {
      specialty_threshold_amount: thresholdMatch ? parseFloat(thresholdMatch[1].replace(/,/g, "")) : 1000,
      carveout_limitations: [],
      white_bagging_allowed: hasWhiteBagging,
      brown_bagging_allowed: true,
      mandatory_mail_percentage: hasMandatoryMail ? 50 : undefined,
      specialty_networks: [],
      prior_auth_required: text.toLowerCase().includes("prior auth")
    },
    confidence: Math.min(confidence, 1.0)
  };
}

function extractContractMetadata(text: string) {
  // Extract PBM name (look for common PBMs)
  const pbmNames = ["CVS Caremark", "Express Scripts", "OptumRx", "MedImpact", "Prime Therapeutics"];
  const pbmName = pbmNames.find(name => text.includes(name)) || "Unknown PBM";

  // Extract dates
  const effectiveDateMatch = text.match(/effective[\s\w]*date[\s:]+(\d{1,2}\/\d{1,2}\/\d{4})/i);
  const endDateMatch = text.match(/(?:termination|end)[\s\w]*date[\s:]+(\d{1,2}\/\d{1,2}\/\d{4})/i);

  return {
    pbm_name: pbmName,
    effective_date: effectiveDateMatch ? new Date(effectiveDateMatch[1]) : new Date(),
    end_date: endDateMatch ? new Date(endDateMatch[1]) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  };
}

export function generateContractSummary(parsed: ParsedContract): string {
  return `
Contract Analysis Summary
PBM: ${parsed.pbm_name}
Period: ${parsed.contract_effective_date.toLocaleDateString()} - ${parsed.contract_end_date.toLocaleDateString()}

REBATE STRUCTURE:
- Retained: ${parsed.rebate_terms.retained_percentage}%
- Pass-through: ${parsed.rebate_terms.passthrough_percentage}%
- Timing: ${parsed.rebate_terms.rebate_timing}

SPREAD PRICING:
- AWP Discount: ${parsed.spread_pricing.awp_discount_percentage}%
- Dispensing Fee: $${parsed.spread_pricing.dispensing_fee_per_script}
- Transparency: ${parsed.spread_pricing.transparency_level}

ADMIN FEES:
- PEPM: $${parsed.admin_fees.pepm_admin_fee}
- Per Script: $${parsed.admin_fees.per_script_fee}

SPECIALTY:
- Threshold: $${parsed.specialty_definition.specialty_threshold_amount}
- White Bagging: ${parsed.specialty_definition.white_bagging_allowed ? "Yes" : "No"}

Extraction Confidence: ${(parsed.extraction_confidence * 100).toFixed(1)}%
Manual Review: ${parsed.manual_review_required ? "REQUIRED" : "Not required"}
  `.trim();
}