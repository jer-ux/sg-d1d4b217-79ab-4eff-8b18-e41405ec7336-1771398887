/**
 * AIOS Engines TypeScript SDK
 * Client library for calling computation engines from Next.js frontend
 */

export interface EngineRequest<T = any> {
  engine: "economic" | "statistical" | "simulation";
  operation: string;
  payload: T;
}

export interface EngineResponse<T = any> {
  success: boolean;
  engine: string;
  operation: string;
  result: T;
  execution_time_ms: number;
  timestamp: string;
}

export interface EngineError {
  detail: string;
  engine?: string;
  operation?: string;
}

/**
 * Economic Engine Operations
 */
export interface CostAttributionRequest {
  total_cost: number;
  cost_drivers: Array<{ name: string; weight: number }>;
  allocation_method?: "proportional" | "activity_based" | "direct";
}

export interface CostAttributionResponse {
  allocated_costs: Array<{ driver: string; amount: number; percentage: number }>;
  evidence_id: string;
  timestamp: string;
}

export interface ROIRequest {
  initial_investment: number;
  annual_benefits: number[];
  discount_rate: number;
  time_horizon_years?: number;
}

export interface ROIResponse {
  roi_percentage: number;
  npv: number;
  irr: number;
  payback_period_years: number;
  cumulative_benefit: number;
  evidence_id: string;
  timestamp: string;
}

/**
 * Statistical Engine Operations
 */
export interface DistributionFitRequest {
  data: number[];
  distribution?: "normal" | "lognormal" | "gamma" | "exponential";
}

export interface DistributionFitResponse {
  best_fit_distribution: string;
  parameters: Record<string, number>;
  goodness_of_fit: number;
  evidence_id: string;
  timestamp: string;
}

export interface RegressionRequest {
  independent_vars: Record<string, number[]>;
  dependent_var: number[];
  method?: "linear" | "robust";
}

export interface RegressionResponse {
  coefficients: Record<string, number>;
  r_squared: number;
  p_values: Record<string, number>;
  evidence_id: string;
  timestamp: string;
  interpretation: string;
}

/**
 * Simulation Engine Operations
 */
export interface MonteCarloRequest {
  variables: Array<{
    name: string;
    distribution: "normal" | "lognormal" | "uniform" | "triangular" | "gamma";
    parameters: Record<string, number>;
  }>;
  n_simulations?: number;
  formula?: string;
  seed?: number;
}

export interface MonteCarloResponse {
  results: {
    mean: number;
    median: number;
    std: number;
    percentile_5: number;
    percentile_25: number;
    percentile_75: number;
    percentile_95: number;
    min: number;
    max: number;
    skewness: number;
    kurtosis: number;
  };
  evidence_id: string;
  timestamp: string;
  n_simulations: number;
  insights: string[];
}

/**
 * Main Engine Client
 */
export class EngineClient {
  private baseUrl: string;
  private apiKey: string;

  constructor(apiKey: string, baseUrl: string = "/api/v1/engines") {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private async execute<TRequest, TResponse>(
    request: EngineRequest<TRequest>
  ): Promise<EngineResponse<TResponse>> {
    const response = await fetch(`${this.baseUrl}/proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": this.apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error: EngineError = await response.json();
      throw new Error(error.detail || "Engine execution failed");
    }

    return response.json();
  }

  // Economic Engine Methods
  async attributeCost(payload: CostAttributionRequest): Promise<EngineResponse<CostAttributionResponse>> {
    return this.execute({
      engine: "economic",
      operation: "attribute_cost",
      payload,
    });
  }

  async calculateROI(payload: ROIRequest): Promise<EngineResponse<ROIResponse>> {
    return this.execute({
      engine: "economic",
      operation: "calculate_roi",
      payload,
    });
  }

  // Statistical Engine Methods
  async fitDistribution(payload: DistributionFitRequest): Promise<EngineResponse<DistributionFitResponse>> {
    return this.execute({
      engine: "statistical",
      operation: "fit_distribution",
      payload,
    });
  }

  async runRegression(payload: RegressionRequest): Promise<EngineResponse<RegressionResponse>> {
    return this.execute({
      engine: "statistical",
      operation: "run_regression",
      payload,
    });
  }

  // Simulation Engine Methods
  async runMonteCarlo(payload: MonteCarloRequest): Promise<EngineResponse<MonteCarloResponse>> {
    return this.execute({
      engine: "simulation",
      operation: "monte_carlo",
      payload,
    });
  }

  // Engine Health Check
  async checkStatus(): Promise<{ engines: Record<string, any> }> {
    const response = await fetch(`${this.baseUrl}/status`, {
      headers: { "X-API-Key": this.apiKey },
    });

    if (!response.ok) {
      throw new Error("Failed to check engine status");
    }

    return response.json();
  }
}

/**
 * Create a singleton client instance
 */
let clientInstance: EngineClient | null = null;

export function getEngineClient(): EngineClient {
  if (!clientInstance) {
    const apiKey = process.env.NEXT_PUBLIC_ENGINE_API_KEY || "dev_key_001";
    clientInstance = new EngineClient(apiKey);
  }
  return clientInstance;
}

/**
 * React hooks for engine operations
 */
export function useEngineClient() {
  return getEngineClient();
}