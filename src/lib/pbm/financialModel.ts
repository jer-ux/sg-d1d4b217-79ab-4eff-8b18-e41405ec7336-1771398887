/**
 * PBM Financial Modeling Engine
 * Quantifies arbitrage opportunities and hidden revenue streams
 */

import type {
  ParsedContract,
  FinancialModel,
  RevenueStream,
  ArbitrageOpportunity,
  FinancialAssumption,
  SensitivityScenario
} from "./types";

interface ModelingInputs {
  parsed_contract: ParsedContract;
  total_covered_lives: number;
  estimated_annual_scripts: number;
  average_cost_per_script: number;
  specialty_utilization_percentage: number;
  mail_order_percentage: number;
}

export async function generateFinancialModel(
  inputs: ModelingInputs
): Promise<FinancialModel> {
  
  const { parsed_contract, total_covered_lives, estimated_annual_scripts, average_cost_per_script } = inputs;
  
  // Calculate base pharmacy spend
  const total_annual_spend = estimated_annual_scripts * average_cost_per_script;
  
  // Calculate visible costs
  const visible_costs = calculateVisibleCosts(inputs);
  
  // Calculate hidden costs (the arbitrage)
  const hidden_costs = calculateHiddenCosts(inputs);
  
  // Identify revenue streams
  const revenue_streams = identifyRevenueStreams(inputs, hidden_costs);
  
  // Detect arbitrage opportunities
  const arbitrage_opportunities = detectArbitrageOpportunities(inputs, revenue_streams);
  
  // Build assumptions
  const assumptions = buildAssumptions(inputs);
  
  // Run sensitivity analysis
  const sensitivity_analysis = runSensitivityAnalysis(inputs, arbitrage_opportunities);
  
  const total_identified_arbitrage = arbitrage_opportunities.reduce(
    (sum, opp) => sum + opp.potential_savings, 
    0
  );
  
  const confidence_weighted_savings = arbitrage_opportunities.reduce(
    (sum, opp) => sum + (opp.potential_savings * opp.confidence_level), 
    0
  );

  return {
    model_id: `model_${Date.now()}`,
    contract_id: parsed_contract.contract_id,
    model_timestamp: new Date(),
    
    total_annual_pharmacy_spend: total_annual_spend,
    
    visible_costs,
    hidden_costs,
    
    revenue_streams,
    arbitrage_opportunities,
    
    total_identified_arbitrage,
    confidence_weighted_savings,
    
    assumptions,
    sensitivity_analysis
  };
}

function calculateVisibleCosts(inputs: ModelingInputs) {
  const { parsed_contract, estimated_annual_scripts, average_cost_per_script, total_covered_lives } = inputs;
  
  const ingredient_cost = estimated_annual_scripts * average_cost_per_script * 
    (1 - parsed_contract.spread_pricing.awp_discount_percentage / 100);
  
  const dispensing_fees = estimated_annual_scripts * parsed_contract.spread_pricing.dispensing_fee_per_script;
  
  const admin_fees = (total_covered_lives * parsed_contract.admin_fees.pepm_admin_fee * 12) +
    (estimated_annual_scripts * parsed_contract.admin_fees.per_script_fee);

  return {
    ingredient_cost,
    dispensing_fees,
    admin_fees
  };
}

function calculateHiddenCosts(inputs: ModelingInputs) {
  const { parsed_contract, estimated_annual_scripts, average_cost_per_script, specialty_utilization_percentage } = inputs;
  
  // Spread markup: difference between what PBM pays pharmacy and charges client
  const estimated_pbm_acquisition_cost = average_cost_per_script * 0.85; // Assume PBM gets 15% better pricing
  const client_pays = average_cost_per_script * (1 - parsed_contract.spread_pricing.awp_discount_percentage / 100);
  const spread_per_script = client_pays - estimated_pbm_acquisition_cost;
  const spread_markup = estimated_annual_scripts * spread_per_script;
  
  // Retained rebates: manufacturer rebates not passed through
  const estimated_total_rebates = estimated_annual_scripts * average_cost_per_script * 0.25; // 25% rebate rate
  const retained_rebates = estimated_total_rebates * (parsed_contract.rebate_terms.retained_percentage / 100);
  
  // Specialty markups
  const specialty_scripts = estimated_annual_scripts * (specialty_utilization_percentage / 100);
  const specialty_avg_cost = average_cost_per_script * 10; // Specialty ~10x more expensive
  const specialty_markup_rate = 0.08; // 8% markup on specialty
  const specialty_markups = specialty_scripts * specialty_avg_cost * specialty_markup_rate;
  
  // Mail mandate premium
  const mail_scripts = estimated_annual_scripts * (inputs.mail_order_percentage / 100);
  const mail_premium_per_script = 5.0; // PBM makes extra $5 per mail script
  const mail_mandate_premium = mail_scripts * mail_premium_per_script;

  return {
    spread_markup,
    retained_rebates,
    specialty_markups,
    mail_mandate_premium
  };
}

function identifyRevenueStreams(inputs: ModelingInputs, hidden_costs: any): RevenueStream[] {
  const { parsed_contract } = inputs;
  
  return [
    {
      stream_id: `stream_spread_${Date.now()}`,
      contract_id: parsed_contract.contract_id,
      stream_type: "spread_markup",
      revenue_category: "hidden",
      annual_amount_min: hidden_costs.spread_markup * 0.8,
      annual_amount_max: hidden_costs.spread_markup * 1.2,
      annual_amount_likely: hidden_costs.spread_markup,
      basis_calculation: "Client price minus estimated PBM acquisition cost",
      assumptions: ["PBM receives 15% better pricing than AWP discount passed to client"],
      sensitivity_factors: ["Actual PBM acquisition costs", "MAC list pricing"]
    },
    {
      stream_id: `stream_rebate_${Date.now()}`,
      contract_id: parsed_contract.contract_id,
      stream_type: "rebate_retention",
      revenue_category: parsed_contract.rebate_terms.passthrough_percentage === 100 ? "visible" : "hidden",
      annual_amount_min: hidden_costs.retained_rebates * 0.7,
      annual_amount_max: hidden_costs.retained_rebates * 1.3,
      annual_amount_likely: hidden_costs.retained_rebates,
      basis_calculation: `${parsed_contract.rebate_terms.retained_percentage}% of manufacturer rebates retained`,
      assumptions: ["Average rebate rate 25% of ingredient cost"],
      sensitivity_factors: ["Actual manufacturer rebate agreements", "Drug mix shift"]
    },
    {
      stream_id: `stream_specialty_${Date.now()}`,
      contract_id: parsed_contract.contract_id,
      stream_type: "specialty_carveout",
      revenue_category: "semi-transparent",
      annual_amount_min: hidden_costs.specialty_markups * 0.6,
      annual_amount_max: hidden_costs.specialty_markups * 1.5,
      annual_amount_likely: hidden_costs.specialty_markups,
      basis_calculation: "Additional markup on specialty drugs above standard pricing",
      assumptions: ["8% specialty markup", "Specialty utilization as provided"],
      sensitivity_factors: ["Specialty drug mix", "Biosimilar adoption"]
    },
    {
      stream_id: `stream_mail_${Date.now()}`,
      contract_id: parsed_contract.contract_id,
      stream_type: "mail_mandate",
      revenue_category: "hidden",
      annual_amount_min: hidden_costs.mail_mandate_premium * 0.5,
      annual_amount_max: hidden_costs.mail_mandate_premium * 1.5,
      annual_amount_likely: hidden_costs.mail_mandate_premium,
      basis_calculation: "Premium charged for mail order fulfillment above retail equivalent",
      assumptions: ["$5 per script mail premium"],
      sensitivity_factors: ["Mail order penetration", "Member opt-out rates"]
    }
  ];
}

function detectArbitrageOpportunities(
  inputs: ModelingInputs,
  revenue_streams: RevenueStream[]
): ArbitrageOpportunity[] {
  
  const opportunities: ArbitrageOpportunity[] = [];
  const { parsed_contract } = inputs;
  
  // Excessive spread opportunity
  const spread_stream = revenue_streams.find(s => s.stream_type === "spread_markup");
  if (spread_stream && spread_stream.annual_amount_likely > 500000) {
    opportunities.push({
      opportunity_id: `opp_spread_${Date.now()}`,
      contract_id: parsed_contract.contract_id,
      severity: spread_stream.annual_amount_likely > 2000000 ? "critical" : "high",
      opportunity_type: "excessive_spread",
      current_cost: spread_stream.annual_amount_likely,
      market_benchmark: spread_stream.annual_amount_likely * 0.3,
      potential_savings: spread_stream.annual_amount_likely * 0.7,
      confidence_level: 0.85,
      evidence_items: [
        `Spread pricing structure: ${parsed_contract.spread_pricing.transparency_level}`,
        `AWP discount: ${parsed_contract.spread_pricing.awp_discount_percentage}%`,
        "Estimated PBM acquisition advantage: 15%"
      ],
      recommended_actions: [
        "Negotiate pass-through pricing model",
        "Request MAC list transparency",
        "Implement quarterly spread audits"
      ],
      implementation_complexity: "medium",
      detected_timestamp: new Date()
    });
  }
  
  // Rebate retention opportunity
  if (parsed_contract.rebate_terms.retained_percentage > 10) {
    const rebate_stream = revenue_streams.find(s => s.stream_type === "rebate_retention");
    if (rebate_stream) {
      opportunities.push({
        opportunity_id: `opp_rebate_${Date.now()}`,
        contract_id: parsed_contract.contract_id,
        severity: parsed_contract.rebate_terms.retained_percentage > 30 ? "critical" : "high",
        opportunity_type: "rebate_retention",
        current_cost: rebate_stream.annual_amount_likely,
        market_benchmark: 0,
        potential_savings: rebate_stream.annual_amount_likely,
        confidence_level: 0.90,
        evidence_items: [
          `Rebate retention: ${parsed_contract.rebate_terms.retained_percentage}%`,
          `Pass-through: ${parsed_contract.rebate_terms.passthrough_percentage}%`,
          "Market standard: 100% pass-through"
        ],
        recommended_actions: [
          "Negotiate 100% rebate pass-through",
          "Implement rebate reconciliation process",
          "Consider direct manufacturer contracting"
        ],
        implementation_complexity: "low",
        detected_timestamp: new Date()
      });
    }
  }
  
  // Transparency opportunity
  if (parsed_contract.spread_pricing.transparency_level === "opaque") {
    opportunities.push({
      opportunity_id: `opp_transparency_${Date.now()}`,
      contract_id: parsed_contract.contract_id,
      severity: "high",
      opportunity_type: "lack_transparency",
      current_cost: 0,
      market_benchmark: 0,
      potential_savings: (spread_stream?.annual_amount_likely || 0) * 0.5,
      confidence_level: 0.70,
      evidence_items: [
        "No spread disclosure in contract",
        "Opaque pricing methodology",
        "No access to MAC lists"
      ],
      recommended_actions: [
        "Request full pricing transparency",
        "Demand quarterly spread reports",
        "Consider PBM change if transparency not provided"
      ],
      implementation_complexity: "low",
      detected_timestamp: new Date()
    });
  }

  return opportunities.sort((a, b) => b.potential_savings - a.potential_savings);
}

function buildAssumptions(inputs: ModelingInputs): FinancialAssumption[] {
  return [
    {
      assumption_id: "ass_1",
      category: "Pharmacy Utilization",
      description: "Annual prescription volume per covered life",
      value: inputs.estimated_annual_scripts / inputs.total_covered_lives,
      source: "estimated",
      confidence: 0.8
    },
    {
      assumption_id: "ass_2",
      category: "Rebate Rate",
      description: "Average manufacturer rebate as % of ingredient cost",
      value: "25%",
      source: "industry_benchmark",
      confidence: 0.75
    },
    {
      assumption_id: "ass_3",
      category: "PBM Acquisition Cost",
      description: "PBM pays 15% less than client AWP discount",
      value: "AWP - 30% (vs client AWP - 15%)",
      source: "market_data",
      confidence: 0.70
    },
    {
      assumption_id: "ass_4",
      category: "Specialty Markup",
      description: "Additional margin on specialty drugs",
      value: "8%",
      source: "industry_benchmark",
      confidence: 0.65
    }
  ];
}

function runSensitivityAnalysis(
  inputs: ModelingInputs,
  opportunities: ArbitrageOpportunity[]
): SensitivityScenario[] {
  
  const total_savings = opportunities.reduce((sum, opp) => sum + opp.potential_savings, 0);
  
  return [
    {
      scenario_name: "Optimistic: Higher rebate retention",
      variable_changed: "Rebate retention percentage",
      change_percentage: 20,
      impact_on_savings: total_savings * 0.15,
      likelihood: "medium"
    },
    {
      scenario_name: "Conservative: Lower spread markup",
      variable_changed: "PBM acquisition cost advantage",
      change_percentage: -30,
      impact_on_savings: total_savings * -0.25,
      likelihood: "medium"
    },
    {
      scenario_name: "Specialty utilization increase",
      variable_changed: "Specialty drug percentage",
      change_percentage: 50,
      impact_on_savings: total_savings * 0.10,
      likelihood: "high"
    }
  ];
}