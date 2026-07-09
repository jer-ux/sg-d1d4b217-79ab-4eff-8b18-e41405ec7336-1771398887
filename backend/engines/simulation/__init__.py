"""
Simulation Engine - Universal Monte Carlo simulation and risk modeling.

Capabilities:
- Monte Carlo simulation with correlation modeling
- Value at Risk (VaR) and Conditional Value at Risk (CVaR)
- Scenario generation and stress testing
- Tail risk analysis
- Bootstrap resampling
- Multi-variate distributions
"""

from .service import SimulationEngine
from .models import (
    MonteCarloRequest,
    MonteCarloResponse,
    VaRRequest,
    VaRResponse,
    ScenarioRequest,
    ScenarioResponse,
)

__all__ = [
    "SimulationEngine",
    "MonteCarloRequest",
    "MonteCarloResponse",
    "VaRRequest",
    "VaRResponse",
    "ScenarioRequest",
    "ScenarioResponse",
]