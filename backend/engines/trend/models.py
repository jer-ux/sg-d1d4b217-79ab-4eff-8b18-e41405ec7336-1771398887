"""
Pydantic models for Medical Trend Forecast Engine
"""

from typing import List, Optional, Dict
from datetime import date
from pydantic import BaseModel, Field, validator
from enum import Enum


class TrendMethod(str, Enum):
    """Trend calculation methodology"""
    SIMPLE = "simple"
    COMPOUND = "compound"
    EXPONENTIAL_SMOOTHING = "exponential_smoothing"
    LINEAR_REGRESSION = "linear_regression"
    ACTUARIAL_DECOMPOSITION = "actuarial_decomposition"


class ClaimsPeriod(BaseModel):
    """Historical claims data for a single period"""
    period_start: date
    period_end: date
    total_claims: float = Field(..., gt=0, description="Total paid claims")
    member_months: int = Field(..., gt=0, description="Member months of exposure")
    pmpm: Optional[float] = Field(None, description="Calculated PMPM")
    
    @validator("pmpm", always=True)
    def calculate_pmpm(cls, v, values):
        """Auto-calculate PMPM if not provided"""
        if v is None and "total_claims" in values and "member_months" in values:
            return values["total_claims"] / values["member_months"]
        return v


class HistoricalClaims(BaseModel):
    """Collection of historical claims periods"""
    periods: List[ClaimsPeriod] = Field(..., min_items=2, description="At least 2 periods required")
    
    @validator("periods")
    def validate_chronological(cls, v):
        """Ensure periods are in chronological order"""
        dates = [p.period_start for p in v]
        if dates != sorted(dates):
            raise ValueError("Periods must be in chronological order")
        return v


class TrendComponents(BaseModel):
    """Decomposed trend components"""
    medical_inflation: float = Field(..., ge=-1.0, le=1.0, description="CPI-Medical inflation rate")
    utilization_change: float = Field(0.0, ge=-1.0, le=1.0, description="Change in services per member")
    severity_change: float = Field(0.0, ge=-1.0, le=1.0, description="Change in cost per service")
    mix_shift: float = Field(0.0, ge=-1.0, le=1.0, description="Population or benefit mix shift")
    savings_programs: float = Field(0.0, ge=-1.0, le=1.0, description="Expected savings from interventions")
    
    @property
    def composite_trend(self) -> float:
        """Calculate composite trend from components"""
        return (
            self.medical_inflation
            + self.utilization_change
            + self.severity_change
            + self.mix_shift
            - self.savings_programs
        )


class TrendForecastRequest(BaseModel):
    """Request for medical trend forecast"""
    historical_claims: HistoricalClaims
    forecast_periods: int = Field(..., gt=0, le=60, description="Number of months to forecast")
    method: TrendMethod = Field(TrendMethod.ACTUARIAL_DECOMPOSITION, description="Calculation method")
    trend_components: Optional[TrendComponents] = Field(None, description="Override trend components")
    confidence_interval: float = Field(0.95, ge=0.5, le=0.99, description="Confidence level for bounds")
    apply_seasonality: bool = Field(True, description="Apply seasonal adjustments")
    
    class Config:
        json_schema_extra = {
            "example": {
                "historical_claims": {
                    "periods": [
                        {
                            "period_start": "2024-01-01",
                            "period_end": "2024-12-31",
                            "total_claims": 12500000,
                            "member_months": 50000
                        },
                        {
                            "period_start": "2025-01-01",
                            "period_end": "2025-12-31",
                            "total_claims": 13125000,
                            "member_months": 52000
                        }
                    ]
                },
                "forecast_periods": 12,
                "method": "actuarial_decomposition",
                "confidence_interval": 0.95
            }
        }


class ForecastPeriod(BaseModel):
    """Forecasted values for a single period"""
    period: int
    period_start: date
    period_end: date
    projected_pmpm: float
    projected_claims: float
    lower_bound: float
    upper_bound: float
    trend_rate: float


class TrendForecastResponse(BaseModel):
    """Response from medical trend forecast"""
    forecast: List[ForecastPeriod]
    trend_components: TrendComponents
    composite_trend: float
    baseline_pmpm: float
    baseline_period: str
    method_used: TrendMethod
    confidence_interval: float
    r_squared: Optional[float] = Field(None, description="Model fit quality (0-1)")
    mean_absolute_error: Optional[float] = Field(None, description="MAE on historical data")
    warnings: List[str] = Field(default_factory=list)
    
    class Config:
        json_schema_extra = {
            "example": {
                "forecast": [
                    {
                        "period": 1,
                        "period_start": "2026-01-01",
                        "period_end": "2026-12-31",
                        "projected_pmpm": 265.50,
                        "projected_claims": 13912500,
                        "lower_bound": 13250000,
                        "upper_bound": 14575000,
                        "trend_rate": 0.06
                    }
                ],
                "trend_components": {
                    "medical_inflation": 0.045,
                    "utilization_change": 0.01,
                    "severity_change": 0.015,
                    "mix_shift": 0.005,
                    "savings_programs": 0.015
                },
                "composite_trend": 0.06,
                "baseline_pmpm": 252.40,
                "baseline_period": "2025-01-01 to 2025-12-31",
                "method_used": "actuarial_decomposition",
                "confidence_interval": 0.95,
                "r_squared": 0.92
            }
        }