"""
Simulation Engine - Data Models
"""

from typing import List, Dict, Optional, Literal
from datetime import datetime
from pydantic import BaseModel, Field


class VariableDistribution(BaseModel):
    """Definition of a random variable in the simulation."""
    name: str = Field(..., description="Variable name")
    distribution: Literal["normal", "lognormal", "uniform", "triangular", "gamma"] = Field(
        default="normal",
        description="Distribution type"
    )
    parameters: Dict[str, float] = Field(..., description="Distribution parameters (mean, std, min, max, etc.)")


class CorrelationMatrix(BaseModel):
    """Correlation structure between variables."""
    variable_names: List[str] = Field(..., description="Names of correlated variables")
    correlation_matrix: List[List[float]] = Field(..., description="NxN correlation matrix")


class MonteCarloRequest(BaseModel):
    """Request for Monte Carlo simulation."""
    variables: List[VariableDistribution] = Field(..., description="Random variables to simulate")
    correlations: Optional[CorrelationMatrix] = Field(None, description="Correlation structure")
    n_simulations: int = Field(default=10000, ge=100, le=1000000, description="Number of simulation runs")
    formula: Optional[str] = Field(None, description="Output formula (e.g., 'x1 * x2 + x3')")
    seed: Optional[int] = Field(None, description="Random seed for reproducibility")


class SimulationResults(BaseModel):
    """Results from Monte Carlo simulation."""
    mean: float
    median: float
    std: float
    percentile_5: float
    percentile_25: float
    percentile_75: float
    percentile_95: float
    min: float
    max: float
    skewness: float
    kurtosis: float


class MonteCarloResponse(BaseModel):
    """Response from Monte Carlo simulation."""
    results: SimulationResults = Field(..., description="Summary statistics of simulation")
    samples: Optional[List[float]] = Field(None, description="Raw simulation samples (if requested)")
    evidence_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    n_simulations: int
    insights: List[str] = Field(default=[], description="Key insights from simulation")


class VaRRequest(BaseModel):
    """Request for Value at Risk (VaR) and CVaR calculation."""
    returns_or_losses: List[float] = Field(..., description="Historical returns or loss data")
    confidence_level: float = Field(default=0.95, ge=0.5, le=0.999, description="Confidence level for VaR")
    method: Literal["historical", "parametric", "monte_carlo"] = Field(
        default="historical",
        description="VaR calculation method"
    )
    holding_period: int = Field(default=1, ge=1, description="Holding period in days")
    portfolio_value: Optional[float] = Field(None, gt=0, description="Portfolio value for absolute VaR")


class VaRResponse(BaseModel):
    """Response from VaR calculation."""
    var: float = Field(..., description="Value at Risk at specified confidence level")
    cvar: float = Field(..., description="Conditional Value at Risk (Expected Shortfall)")
    confidence_level: float
    method: str
    portfolio_value: Optional[float] = None
    var_absolute: Optional[float] = Field(None, description="Absolute VaR if portfolio value provided")
    cvar_absolute: Optional[float] = Field(None, description="Absolute CVaR if portfolio value provided")
    evidence_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    interpretation: str = Field(..., description="Plain language interpretation")


class ScenarioDefinition(BaseModel):
    """Definition of a stress test scenario."""
    name: str = Field(..., description="Scenario name")
    variable_shocks: Dict[str, float] = Field(..., description="Variable name -> shock percentage")


class ScenarioRequest(BaseModel):
    """Request for scenario analysis and stress testing."""
    base_values: Dict[str, float] = Field(..., description="Baseline values for all variables")
    scenarios: List[ScenarioDefinition] = Field(..., description="Stress test scenarios to evaluate")
    formula: str = Field(..., description="Output formula (e.g., 'revenue - costs')")


class ScenarioResult(BaseModel):
    """Result for a single scenario."""
    scenario_name: str
    output_value: float
    change_from_base: float
    change_percentage: float
    shocked_values: Dict[str, float]


class ScenarioResponse(BaseModel):
    """Response from scenario analysis."""
    base_output: float = Field(..., description="Output under baseline assumptions")
    scenario_results: List[ScenarioResult] = Field(..., description="Results for each scenario")
    worst_case: ScenarioResult = Field(..., description="Worst-case scenario")
    best_case: ScenarioResult = Field(..., description="Best-case scenario")
    evidence_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)