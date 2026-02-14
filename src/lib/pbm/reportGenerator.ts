/**
 * Board-Ready Actuarial Report Generator
 * Produces executive summaries and detailed analysis
 */

import type {
  ActuarialReport,
  FinancialModel,
  ParsedContract,
  ImplementationPhase,
  AuditEntry
} from "./types";

export async function generateActuarialReport(
  parsed_contract: ParsedContract,
  financial_model: FinancialModel
): Promise<ActuarialReport> {
  
  const high_priority_opportunities = financial_model.arbitrage_opportunities.filter(
    opp => opp.severity === "critical" || opp.severity === "high"
  );
  
  const total_arbitrage = financial_model.total_identified_arbitrage;
  const arbitrage_percentage = (total_arbitrage / financial_model.total_annual_pharmacy_spend) * 100;
  
  const implementation_roadmap = generateImplementationRoadmap(financial_model);
  const board_recommendations = generateBoardRecommendations(financial_model, parsed_contract);
  
  const audit_trail: AuditEntry[] = [
    {
      timestamp: new Date(),
      action: "contract_uploaded",
      actor: "system",
      details: { file_id: parsed_contract.file_id }
    },
    {
      timestamp: parsed_contract.parsing_timestamp,
      action: "contract_parsed",
      actor: "parser_engine",
      details: { confidence: parsed_contract.extraction_confidence }
    },
    {
      timestamp: financial_model.model_timestamp,
      action: "financial_model_generated",
      actor: "modeling_engine",
      details: { total_arbitrage }
    },
    {
      timestamp: new Date(),
      action: "actuarial_report_generated",
      actor: "report_generator",
      details: { opportunity_count: financial_model.arbitrage_opportunities.length }
    }
  ];

  return {
    report_id: `report_${Date.now()}`,
    contract_id: parsed_contract.contract_id,
    generated_timestamp: new Date(),
    
    executive_summary: {
      total_annual_spend: financial_model.total_annual_pharmacy_spend,
      identified_arbitrage: total_arbitrage,
      arbitrage_as_percentage: arbitrage_percentage,
      high_priority_opportunities: high_priority_opportunities.length,
      estimated_implementation_timeline: `${implementation_roadmap.length * 3}-${implementation_roadmap.length * 6} months`
    },
    
    detailed_findings: financial_model.arbitrage_opportunities,
    financial_model,
    
    board_recommendations,
    implementation_roadmap,
    
    audit_trail
  };
}

function generateImplementationRoadmap(model: FinancialModel): ImplementationPhase[] {
  const phases: ImplementationPhase[] = [];
  
  // Phase 1: Quick wins (low complexity, high confidence)
  const quickWins = model.arbitrage_opportunities.filter(
    opp => opp.implementation_complexity === "low" && opp.confidence_level > 0.8
  );
  
  if (quickWins.length > 0) {
    phases.push({
      phase_number: 1,
      phase_name: "Immediate Opportunities",
      opportunities_addressed: quickWins.map(o => o.opportunity_id),
      estimated_savings: quickWins.reduce((sum, o) => sum + o.potential_savings, 0),
      implementation_months: 3,
      prerequisites: ["Board approval", "PBM contract review"],
      risk_factors: ["PBM resistance", "Contract amendment required"]
    });
  }
  
  // Phase 2: Medium complexity opportunities
  const mediumOps = model.arbitrage_opportunities.filter(
    opp => opp.implementation_complexity === "medium"
  );
  
  if (mediumOps.length > 0) {
    phases.push({
      phase_number: 2,
      phase_name: "Structural Improvements",
      opportunities_addressed: mediumOps.map(o => o.opportunity_id),
      estimated_savings: mediumOps.reduce((sum, o) => sum + o.potential_savings, 0),
      implementation_months: 6,
      prerequisites: ["Phase 1 completion", "Data infrastructure ready"],
      risk_factors: ["System integration complexity", "Member communication required"]
    });
  }
  
  // Phase 3: High complexity / strategic changes
  const highComplexity = model.arbitrage_opportunities.filter(
    opp => opp.implementation_complexity === "high"
  );
  
  if (highComplexity.length > 0) {
    phases.push({
      phase_number: 3,
      phase_name: "Strategic Transformation",
      opportunities_addressed: highComplexity.map(o => o.opportunity_id),
      estimated_savings: highComplexity.reduce((sum, o) => sum + o.potential_savings, 0),
      implementation_months: 12,
      prerequisites: ["Phase 1 & 2 success", "Alternative PBM evaluation"],
      risk_factors: ["Contract termination", "Transition disruption", "Member impact"]
    });
  }
  
  return phases;
}

function generateBoardRecommendations(
  model: FinancialModel,
  contract: ParsedContract
): string[] {
  const recommendations: string[] = [];
  
  const total_savings = model.total_identified_arbitrage;
  const spend = model.total_annual_pharmacy_spend;
  const savings_percentage = (total_savings / spend) * 100;
  
  // Primary recommendation
  if (savings_percentage > 15) {
    recommendations.push(
      `CRITICAL: Identified $${total_savings.toLocaleString()} (${savings_percentage.toFixed(1)}%) in arbitrage opportunities. Immediate PBM contract renegotiation recommended.`
    );
  } else if (savings_percentage > 8) {
    recommendations.push(
      `SIGNIFICANT: $${total_savings.toLocaleString()} in potential savings identified. Recommend structured improvement program with PBM.`
    );
  } else {
    recommendations.push(
      `MODERATE: $${total_savings.toLocaleString()} in optimization opportunities. Recommend incremental improvements over 12-month period.`
    );
  }
  
  // Rebate recommendations
  if (contract.rebate_terms.retained_percentage > 20) {
    recommendations.push(
      `Rebate Retention: PBM currently retains ${contract.rebate_terms.retained_percentage}% of manufacturer rebates. Industry best practice is 100% pass-through. This represents $${model.hidden_costs.retained_rebates.toLocaleString()} annual opportunity.`
    );
  }
  
  // Transparency recommendations
  if (contract.spread_pricing.transparency_level === "opaque") {
    recommendations.push(
      "Pricing Transparency: Contract lacks spread disclosure and MAC list access. Recommend requiring full transparency as condition of contract renewal."
    );
  }
  
  // Specialty recommendations
  const specialtyOpp = model.arbitrage_opportunities.find(o => o.opportunity_type === "specialty_markup");
  if (specialtyOpp && specialtyOpp.potential_savings > 500000) {
    recommendations.push(
      `Specialty Drug Management: Identified $${specialtyOpp.potential_savings.toLocaleString()} in specialty arbitrage. Recommend evaluating specialty pharmacy carve-out or direct contracting with manufacturers.`
    );
  }
  
  // Implementation timeline
  recommendations.push(
    "Implementation Timeline: Phased approach over 12-18 months recommended, starting with low-complexity opportunities while evaluating strategic alternatives."
  );
  
  // Risk mitigation
  recommendations.push(
    "Risk Mitigation: Engage independent PBM consultant to validate findings and support contract negotiations. Consider RFP process to establish competitive benchmark."
  );
  
  return recommendations;
}

export function formatReportForBoard(report: ActuarialReport): string {
  const { executive_summary, financial_model } = report;
  
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHARMACY BENEFIT ARBITRAGE ANALYSIS
Board-Ready Executive Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FINANCIAL OVERVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Annual Pharmacy Spend:    $${executive_summary.total_annual_spend.toLocaleString()}
Identified Arbitrage:            $${executive_summary.identified_arbitrage.toLocaleString()}
Arbitrage as % of Spend:         ${executive_summary.arbitrage_as_percentage.toFixed(1)}%

Confidence-Weighted Savings:     $${financial_model.confidence_weighted_savings.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPPORTUNITY BREAKDOWN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${financial_model.arbitrage_opportunities
  .slice(0, 5)
  .map((opp, idx) => `
${idx + 1}. ${opp.opportunity_type.replace(/_/g, " ").toUpperCase()}
   Severity: ${opp.severity.toUpperCase()}
   Potential Savings: $${opp.potential_savings.toLocaleString()}
   Confidence: ${(opp.confidence_level * 100).toFixed(0)}%
   Complexity: ${opp.implementation_complexity}
`)
  .join("\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BOARD RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${report.board_recommendations.map((rec, idx) => `${idx + 1}. ${rec}`).join("\n\n")}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMPLEMENTATION ROADMAP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${report.implementation_roadmap
  .map(phase => `
PHASE ${phase.phase_number}: ${phase.phase_name}
Timeline: ${phase.implementation_months} months
Estimated Savings: $${phase.estimated_savings.toLocaleString()}
Opportunities: ${phase.opportunities_addressed.length}
`)
  .join("\n")}

Total Timeline: ${executive_summary.estimated_implementation_timeline}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Report Generated: ${report.generated_timestamp.toLocaleString()}
All assumptions and calculations available in detailed appendix.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
}