"""
Economic Engine - Universal economic computation and modeling.

Capabilities:
- Cost attribution and allocation
- Revenue forecasting
- ROI calculation
- Economic value measurement
- Price elasticity modeling
- Budget optimization
- Capital allocation
"""

from .service import EconomicEngine
from .models import (
    CostAnalysisRequest,
    CostAnalysisResponse,
    ROIRequest,
    ROIResponse,
    ValueFlowRequest,
    ValueFlowResponse,
)

__all__ = [
    "EconomicEngine",
    "CostAnalysisRequest",
    "CostAnalysisResponse",
    "ROIRequest",
    "ROIResponse",
    "ValueFlowRequest",
    "ValueFlowResponse",
]