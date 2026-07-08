"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Monte Carlo Simulation Framework
"""

from .engine import SimulationEngine, SimulationResult
from .monte_carlo import MonteCarloEngine
from .statistics import SummaryStatistics
from .confidence import ConfidenceInterval
from .var import RiskMetrics
from .scenarios import Scenario, ScenarioLibrary
from .distributions import Distribution, DistributionFactory
from .random_variables import RandomVariable
from .models import (
    HealthcareTrendModel,
    PremiumRenewalModel,
    AggregateLossModel,
    LargeClaimShockModel
)
from .extended_models import (
    StopLossModel,
    IBNRModel,
    PensionFundingModel,
    PricingModel,
    WorkforceCostModel
)
from .default_scenarios import library as default_scenarios

__all__ = [
    "SimulationEngine",
    "SimulationResult",
    "MonteCarloEngine",
    "SummaryStatistics",
    "ConfidenceInterval",
    "RiskMetrics",
    "Scenario",
    "ScenarioLibrary",
    "Distribution",
    "DistributionFactory",
    "RandomVariable",
    "HealthcareTrendModel",
    "PremiumRenewalModel",
    "AggregateLossModel",
    "LargeClaimShockModel",
    "StopLossModel",
    "IBNRModel",
    "PensionFundingModel",
    "PricingModel",
    "WorkforceCostModel",
    "default_scenarios",
]