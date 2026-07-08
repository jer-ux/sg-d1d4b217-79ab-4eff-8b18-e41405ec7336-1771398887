"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Data Interfaces & Contracts
"""

from typing import Dict, List, Any, Optional
from datetime import datetime
from pydantic import BaseModel, Field


class ClaimsData(BaseModel):
    """Claims data input interface"""
    claims: List[Dict[str, Any]]
    member_months: int
    plan_characteristics: Dict[str, Any]
    period_start: datetime
    period_end: datetime


class ActuarialAssumptions(BaseModel):
    """Actuarial assumptions interface"""
    trend_rate: float = Field(default=0.08, ge=0.0, le=1.0)
    credibility_threshold: float = Field(default=1082, ge=0)
    confidence_level: float = Field(default=0.95, ge=0.0, le=1.0)
    simulations: int = Field(default=10000, ge=1000)
    forecast_periods: int = Field(default=12, ge=1)
    
    # Stop-loss parameters
    stop_loss_deductible: Optional[float] = None
    stop_loss_aggregate_corridor: Optional[float] = None
    
    # Benchmarking
    industry_benchmark: Optional[str] = None
    peer_group: Optional[str] = None


class ActuarialResults(BaseModel):
    """Actuarial results output interface"""
    model_name: str
    execution_timestamp: datetime
    
    # Core metrics
    expected_claims: float
    expected_pmpm: float
    credibility_weight: float
    
    # Trend
    historical_trend: float
    projected_trend: float
    
    # Forecast
    forecast_periods: List[Dict[str, Any]]
    forecast_total: float
    
    # Risk metrics
    percentile_50: float
    percentile_75: float
    percentile_90: float
    percentile_95: float
    percentile_99: float
    
    # Confidence intervals
    ci_lower: float
    ci_upper: float
    
    # Metadata
    assumptions: Dict[str, Any]
    data_quality_score: float
    warnings: List[str] = []
    
    
class BenchmarkComparison(BaseModel):
    """Benchmark comparison interface"""
    metric_name: str
    plan_value: float
    benchmark_value: float
    variance_pct: float
    percentile_rank: float
    interpretation: str