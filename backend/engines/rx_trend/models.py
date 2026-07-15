"""
Pydantic models for Rx Trend Forecast Engine
"""

from pydantic import BaseModel, Field
from typing import List


class RxHistory(BaseModel):
    """Historical pharmacy claims data"""
    year: int
    members: int
    gross_cost: float
    rebate: float
    specialty_percent: float = Field(ge=0, le=1)
    generic_dispensing_rate: float = Field(ge=0, le=1)


class RxAssumptions(BaseModel):
    """Pharmacy benefit trend assumptions"""
    brand_price_trend: float
    generic_price_trend: float
    specialty_trend: float
    utilization_trend: float
    rebate_change: float
    formulary_savings: float


class RxForecast(BaseModel):
    """Projected pharmacy costs"""
    year: int
    gross_cost: float
    rebates: float
    net_cost: float
    pmpm: float

    def __str__(self):
        return (
            f"Year {self.year}\n"
            f"Gross Cost: ${self.gross_cost:,.0f}\n"
            f"Rebates: ${self.rebates:,.0f}\n"
            f"Net Cost: ${self.net_cost:,.0f}\n"
            f"PMPM: ${self.pmpm:.0f}"
        )