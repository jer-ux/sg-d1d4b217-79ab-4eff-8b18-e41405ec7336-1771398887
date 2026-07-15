"""
Rx Trend Forecast Engine

Actuarial engine for projecting pharmacy benefit costs.
"""

from .engine import RxTrendEngine
from .models import RxHistory, RxAssumptions, RxForecast
from .analytics import RxAnalytics

__version__ = "1.0.0"

__all__ = [
    "RxTrendEngine",
    "RxHistory",
    "RxAssumptions",
    "RxForecast",
    "RxAnalytics",
]