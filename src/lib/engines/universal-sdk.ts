/**
 * Universal Engine SDK
 * 
 * Unified data ingestion, normalization, and routing for all Kincaid IQ engines.
 * Single data feed → 150+ specialized engines
 */

export interface UniversalDataPayload {
  // Core identifiers
  organization_id: string;
  submission_date: Date;
  data_period: {
    start_date: Date;
    end_date: Date;
  };

  // Medical Claims (standard schema)
  medical_claims?: MedicalClaim[];
  
  // Pharmacy Claims
  pharmacy_claims?: PharmacyClaim[];
  
  // Member Census
  members?: Member[];
  
  // Financial Data
  financials?: FinancialData;
  
  // Contracts & Agreements
  contracts?: Contract[];
  
  // Optional: Pre-computed aggregates
  aggregates?: PrecomputedAggregates;
}

export interface MedicalClaim {
  claim_id: string;
  member_id: string;
  service_date: Date;
  paid_date?: Date;
  paid_amount: number;
  allowed_amount: number;
  member_paid: number;
  provider_id: string;
  diagnosis_codes: string[];  // ICD-10
  procedure_codes: string[];  // CPT/HCPCS
  drg_code?: string;
  service_category: 'inpatient' | 'outpatient' | 'professional' | 'ancillary';
  place_of_service: string;
  network_status: 'in_network' | 'out_of_network';
}

export interface PharmacyClaim {
  claim_id: string;
  member_id: string;
  fill_date: Date;
  ndc_code: string;
  drug_name: string;
  therapeutic_class: string;
  quantity: number;
  days_supply: number;
  ingredient_cost: number;
  dispensing_fee: number;
  paid_amount: number;
  member_copay: number;
  pharmacy_id: string;
  network_status: 'in_network' | 'out_of_network';
  mail_order: boolean;
  generic_indicator: boolean;
}

export interface Member {
  member_id: string;
  date_of_birth: Date;
  gender: 'M' | 'F' | 'U';
  zip_code: string;
  relationship: 'employee' | 'spouse' | 'child' | 'other';
  coverage_tier: 'single' | 'family';
  enrollment_date: Date;
  termination_date?: Date;
  cobra_status: boolean;
}

export interface FinancialData {
  premium_paid: number;
  stop_loss_premium: number;
  admin_fees: number;
  total_enrollment: number;
  member_months: number;
}

export interface Contract {
  contract_id: string;
  contract_type: 'pbm' | 'tpa' | 'stop_loss' | 'medical_network' | 'other';
  effective_date: Date;
  termination_date?: Date;
  key_terms: Record<string, any>;
}

export interface PrecomputedAggregates {
  total_medical_pmpm: number;
  total_rx_pmpm: number;
  member_months: number;
  large_claim_count: number;
}

/**
 * Universal Engine Router
 * Routes normalized data to appropriate engine categories
 */
export class EngineRouter {
  async routeToEngines(payload: UniversalDataPayload): Promise<EngineRoutes> {
    const routes: EngineRoutes = {
      financial_trend_engines: [],
      healthcare_economics_engines: [],
      fiduciary_governance_engines: [],
      workforce_engines: [],
      predictive_ai_engines: [],
      pe_cfo_engines: [],
    };

    // Auto-detect which engines can run based on data availability
    if (payload.medical_claims && payload.medical_claims.length > 0) {
      routes.financial_trend_engines.push(
        'medical-trend-forecasting',
        'catastrophic-claims-forecasting',
        'high-cost-claimant-prediction',
        'inflation-decomposition',
        'provider-unit-cost-trend',
        'utilization-trend-engine',
        'case-mix-adjustment'
      );
      
      routes.predictive_ai_engines.push(
        'large-claimant-prediction',
        'hospital-admission-prediction',
        'readmission-prediction',
        'chronic-disease-progression'
      );
    }

    if (payload.pharmacy_claims && payload.pharmacy_claims.length > 0) {
      routes.financial_trend_engines.push(
        'rx-trend-forecasting',
        'glp1-financial-impact',
        'gene-therapy-exposure',
        'oncology-cost-projection'
      );
      
      routes.healthcare_economics_engines.push(
        'specialty-pharmacy-economics',
        'biosimilar-adoption-modeling',
        'drug-pipeline-forecasting',
        'rebate-optimization',
        'pbm-spread-pricing-detection'
      );
    }

    if (payload.members && payload.members.length > 0) {
      routes.financial_trend_engines.push(
        'geographic-normalization',
        'age-gender-risk-adjustment',
        'pmpm-normalization',
        'seasonality-adjustment',
        'credibility-weighting'
      );
      
      routes.workforce_engines.push(
        'workforce-health-risk',
        'absenteeism-forecasting',
        'presenteeism-impact',
        'productivity-loss-valuation',
        'workforce-demographic-projections',
        'population-health-segmentation'
      );
    }

    if (payload.contracts && payload.contracts.length > 0) {
      routes.fiduciary_governance_engines.push(
        'erisa-fiduciary-risk-scoring',
        'pbm-contract-scoring',
        'stop-loss-contract-scoring',
        'tpa-governance-scoring',
        'vendor-compensation-transparency',
        'hidden-revenue-detection',
        'conflict-of-interest-analysis'
      );
      
      routes.healthcare_economics_engines.push(
        'reference-based-pricing-savings',
        'direct-contracting-valuation',
        'centers-of-excellence-roi',
        'bundled-payment-modeling'
      );
    }

    if (payload.financials) {
      routes.pe_cfo_engines.push(
        'ebitda-enhancement',
        'working-capital-impact',
        'cash-flow-forecasting',
        'enterprise-value-creation',
        'margin-improvement',
        'operating-leverage'
      );
    }

    return routes;
  }

  async normalizeData(rawData: any): Promise<UniversalDataPayload> {
    // Normalize disparate data sources to standard schema
    return {
      organization_id: rawData.org_id || rawData.employer_id,
      submission_date: new Date(),
      data_period: {
        start_date: new Date(rawData.period_start),
        end_date: new Date(rawData.period_end),
      },
      medical_claims: this.normalizeMedicalClaims(rawData.claims || rawData.medical),
      pharmacy_claims: this.normalizePharmacyClaims(rawData.rx || rawData.pharmacy),
      members: this.normalizeMembers(rawData.census || rawData.members),
      financials: this.normalizeFinancials(rawData.financial || rawData.summary),
      contracts: this.normalizeContracts(rawData.contracts || rawData.agreements),
    };
  }

  private normalizeMedicalClaims(raw: any[]): MedicalClaim[] {
    if (!raw) return [];
    return raw.map(claim => ({
      claim_id: claim.claim_id || claim.clm_id,
      member_id: claim.member_id || claim.subscriber_id,
      service_date: new Date(claim.service_date || claim.dos),
      paid_date: claim.paid_date ? new Date(claim.paid_date) : undefined,
      paid_amount: parseFloat(claim.paid_amount || claim.paid || 0),
      allowed_amount: parseFloat(claim.allowed_amount || claim.allowed || 0),
      member_paid: parseFloat(claim.member_paid || claim.copay || 0),
      provider_id: claim.provider_id || claim.prov_id,
      diagnosis_codes: claim.diagnosis_codes || claim.dx_codes || [],
      procedure_codes: claim.procedure_codes || claim.proc_codes || [],
      drg_code: claim.drg_code || claim.drg,
      service_category: this.mapServiceCategory(claim.service_type || claim.category),
      place_of_service: claim.place_of_service || claim.pos || 'unknown',
      network_status: claim.network_status || claim.in_network ? 'in_network' : 'out_of_network',
    }));
  }

  private normalizePharmacyClaims(raw: any[]): PharmacyClaim[] {
    if (!raw) return [];
    return raw.map(rx => ({
      claim_id: rx.claim_id || rx.rx_id,
      member_id: rx.member_id || rx.subscriber_id,
      fill_date: new Date(rx.fill_date || rx.date_filled),
      ndc_code: rx.ndc_code || rx.ndc,
      drug_name: rx.drug_name || rx.medication,
      therapeutic_class: rx.therapeutic_class || rx.class || 'unknown',
      quantity: parseInt(rx.quantity || rx.qty || 0),
      days_supply: parseInt(rx.days_supply || rx.days || 0),
      ingredient_cost: parseFloat(rx.ingredient_cost || rx.cost || 0),
      dispensing_fee: parseFloat(rx.dispensing_fee || rx.fee || 0),
      paid_amount: parseFloat(rx.paid_amount || rx.paid || 0),
      member_copay: parseFloat(rx.member_copay || rx.copay || 0),
      pharmacy_id: rx.pharmacy_id || rx.pharm_id,
      network_status: rx.network_status || rx.in_network ? 'in_network' : 'out_of_network',
      mail_order: Boolean(rx.mail_order || rx.is_mail),
      generic_indicator: Boolean(rx.generic_indicator || rx.is_generic),
    }));
  }

  private normalizeMembers(raw: any[]): Member[] {
    if (!raw) return [];
    return raw.map(member => ({
      member_id: member.member_id || member.subscriber_id,
      date_of_birth: new Date(member.date_of_birth || member.dob),
      gender: member.gender || member.sex || 'U',
      zip_code: member.zip_code || member.zip || 'unknown',
      relationship: member.relationship || 'employee',
      coverage_tier: member.coverage_tier || 'single',
      enrollment_date: new Date(member.enrollment_date || member.effective_date),
      termination_date: member.termination_date ? new Date(member.termination_date) : undefined,
      cobra_status: Boolean(member.cobra_status || member.is_cobra),
    }));
  }

  private normalizeFinancials(raw: any): FinancialData | undefined {
    if (!raw) return undefined;
    return {
      premium_paid: parseFloat(raw.premium_paid || raw.premium || 0),
      stop_loss_premium: parseFloat(raw.stop_loss_premium || raw.sl_premium || 0),
      admin_fees: parseFloat(raw.admin_fees || raw.fees || 0),
      total_enrollment: parseInt(raw.total_enrollment || raw.enrollment || 0),
      member_months: parseFloat(raw.member_months || raw.mm || 0),
    };
  }

  private normalizeContracts(raw: any[]): Contract[] {
    if (!raw) return [];
    return raw.map(contract => ({
      contract_id: contract.contract_id || contract.id,
      contract_type: contract.contract_type || contract.type || 'other',
      effective_date: new Date(contract.effective_date || contract.start_date),
      termination_date: contract.termination_date ? new Date(contract.termination_date) : undefined,
      key_terms: contract.key_terms || contract.terms || {},
    }));
  }

  private mapServiceCategory(serviceType: string): 'inpatient' | 'outpatient' | 'professional' | 'ancillary' {
    const type = (serviceType || '').toLowerCase();
    if (type.includes('inpatient') || type.includes('ip')) return 'inpatient';
    if (type.includes('outpatient') || type.includes('op')) return 'outpatient';
    if (type.includes('professional') || type.includes('prof')) return 'professional';
    return 'ancillary';
  }
}

export interface EngineRoutes {
  financial_trend_engines: string[];
  healthcare_economics_engines: string[];
  fiduciary_governance_engines: string[];
  workforce_engines: string[];
  predictive_ai_engines: string[];
  pe_cfo_engines: string[];
}

/**
 * Engine Execution Orchestrator
 */
export class EngineOrchestrator {
  private router: EngineRouter;

  constructor() {
    this.router = new EngineRouter();
  }

  async processSubmission(rawData: any): Promise<EngineExecutionResult> {
    // Step 1: Normalize data to universal schema
    const payload = await this.router.normalizeData(rawData);

    // Step 2: Route to applicable engines
    const routes = await this.router.routeToEngines(payload);

    // Step 3: Execute engines in parallel
    const results: EngineResult[] = [];

    // Financial & Trend Engines
    for (const engine of routes.financial_trend_engines) {
      results.push(await this.executeEngine(engine, payload));
    }

    // Healthcare Economics Engines
    for (const engine of routes.healthcare_economics_engines) {
      results.push(await this.executeEngine(engine, payload));
    }

    // Fiduciary & Governance Engines
    for (const engine of routes.fiduciary_governance_engines) {
      results.push(await this.executeEngine(engine, payload));
    }

    // Workforce & Human Capital Engines
    for (const engine of routes.workforce_engines) {
      results.push(await this.executeEngine(engine, payload));
    }

    // Predictive AI Engines
    for (const engine of routes.predictive_ai_engines) {
      results.push(await this.executeEngine(engine, payload));
    }

    // Private Equity & CFO Engines
    for (const engine of routes.pe_cfo_engines) {
      results.push(await this.executeEngine(engine, payload));
    }

    return {
      submission_id: this.generateSubmissionId(),
      processed_at: new Date(),
      total_engines_executed: results.length,
      results,
      routes,
    };
  }

  private async executeEngine(engineId: string, payload: UniversalDataPayload): Promise<EngineResult> {
    // Engine execution logic would be implemented here
    // This is the interface that all 150+ engines implement
    return {
      engine_id: engineId,
      status: 'success',
      execution_time_ms: 0,
      output: {},
    };
  }

  private generateSubmissionId(): string {
    return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export interface EngineExecutionResult {
  submission_id: string;
  processed_at: Date;
  total_engines_executed: number;
  results: EngineResult[];
  routes: EngineRoutes;
}

export interface EngineResult {
  engine_id: string;
  status: 'success' | 'failed' | 'skipped';
  execution_time_ms: number;
  output: any;
  error?: string;
}