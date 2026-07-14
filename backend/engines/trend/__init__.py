"""
Medical Trend Forecasting Engine

Core actuarial engine for projecting future healthcare costs using:
- Historical claims data
- Medical inflation rates
- Utilization trends
- Severity shifts
- Mix changes
- Savings programs
"""

from .medical_forecast_engine import MedicalTrendEngine
from .models import (
    TrendForecastRequest,
    TrendForecastResponse,
    TrendComponents,
    HistoricalClaims,
)

__all__ = [
    "MedicalTrendEngine",
    "TrendForecastRequest",
    "TrendForecastResponse",
    "TrendComponents",
    "HistoricalClaims",
]