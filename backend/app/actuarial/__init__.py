"""
KINCAID HEALTH™ ACTUARIAL INTELLIGENCE ENGINE
Complete actuarial modeling and forecasting system
"""

from app.actuarial.engine import ActuarialEngine
from app.actuarial.models import (
    ActuarialModel,
    TrendProjectionModel,
    StopLossOptimizationModel,
    LossRatioModel,
    PremiumForecastModel,
)
from app.actuarial.registry import ModelRegistry

__all__ = [
    "ActuarialEngine",
    "ActuarialModel",
    "TrendProjectionModel",
    "StopLossOptimizationModel",
    "LossRatioModel",
    "PremiumForecastModel",
    "ModelRegistry",
]

__version__ = "1.0.0"