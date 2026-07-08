"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Monte Carlo Simulation Framework
"""

from .engine import SimulationEngine, SimulationResult
from .monte_carlo import MonteCarloEngine
from .statistics import SummaryStatistics
from .confidence import ConfidenceInterval
from .var import RiskMetrics
from .scenarios import Scenario
from .distributions import Distribution, DistributionFactory
from .random_variables import RandomVariable
from .models import (
    HealthcareTrendModel,
    PremiumRenewalModel,
    AggregateLossModel,
    LargeClaimShockModel
)

__all__ = [
    "SimulationEngine",
    "SimulationResult",
    "MonteCarloEngine",
    "SummaryStatistics",
    "ConfidenceInterval",
    "RiskMetrics",
    "Scenario",
    "Distribution",
    "DistributionFactory",
    "RandomVariable",
    "HealthcareTrendModel",
    "PremiumRenewalModel",
    "AggregateLossModel",
    "LargeClaimShockModel",
]