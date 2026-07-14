"""
Pydantic models for Rx Trend Forecast Engine
"""

from pydantic import BaseModel, Field
from typing import List, Optional


class ClaimsHistory(BaseModel):
    """Historical pharmacy claims data"""
    year: int = Field(..., description="Calendar year")
    members: int = Field(..., gt=0, description="Member months")
    rx_cost: float = Field(..., ge=0, description="Total Rx spend")
    brand_cost: float = Field(..., ge=0, description="Brand drug cost")
    generic_cost: float = Field(..., ge=0, description="Generic drug cost")
    specialty_cost: float = Field(..., ge=0, description="Specialty drug cost")
    scripts_filled: int = Field(..., gt=0, description="Total scripts")
    utilization_rate: float = Field(..., ge=0, description="Scripts per member")


class TrendAssumption(BaseModel):
    """Rx trend component assumptions"""
    brand_inflation: float = Field(..., description="Brand drug inflation rate")
    generic_deflation: float = Field(..., description="Generic price deflation (negative)")
    specialty_mix_shift: float = Field(..., description="Specialty drug mix shift")
    utilization_trend: float = Field(..., description="Utilization growth rate")
    glp1_impact: float = Field(0.0, description="GLP-1 drug impact on trend")
    rebate_rate: float = Field(..., ge=0, le=1, description="Effective rebate rate")
    biosimilar_savings: float = Field(0.0, description="Biosimilar savings rate")


class ForecastResult(BaseModel):
    """Annual forecast result"""
    year: int = Field(..., description="Forecast year")
    projected_cost: float = Field(..., description="Total projected Rx cost")
    projected_pmpm: float = Field(..., description="Per member per month cost")
    trend_rate: float = Field(..., description="Applied trend rate")
    brand_cost: Optional[float] = Field(None, description="Projected brand cost")
    generic_cost: Optional[float] = Field(None, description="Projected generic cost")
    specialty_cost: Optional[float] = Field(None, description="Projected specialty cost")
    
    class Config:
        json_schema_extra = {
            "example": {
                "year": 1,
                "projected_cost": 5250000,
                "projected_pmpm": 437.50,
                "trend_rate": 0.05,
                "brand_cost": 2100000,
                "generic_cost": 1050000,
                "specialty_cost": 2100000
            }
        }


class ForecastRequest(BaseModel):
    """API request model"""
    current_cost: float = Field(..., gt=0, description="Current annual Rx cost")
    members: int = Field(..., gt=0, description="Current member count")
    years: int = Field(..., gt=0, le=10, description="Forecast horizon (years)")
    assumptions: TrendAssumption = Field(..., description="Trend assumptions")
    historical_claims: Optional[List[ClaimsHistory]] = Field(None, description="Historical data")


class ForecastResponse(BaseModel):
    """API response model"""
    engine: str = "Rx Trend Forecast Engine"
    version: str = "1.0.0"
    results: List[ForecastResult]
    summary: dict