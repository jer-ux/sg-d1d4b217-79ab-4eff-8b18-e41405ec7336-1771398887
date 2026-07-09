"""
Statistical Engine - Universal statistical computation and analysis.

Capabilities:
- Distribution fitting and analysis
- Regression modeling (linear, logistic, polynomial)
- Credibility weighting and experience rating
- Hypothesis testing (t-tests, chi-square, ANOVA)
- Correlation and covariance analysis
- Confidence interval calculation
- Bayesian updating
"""

from .service import StatisticalEngine
from .models import (
    DistributionRequest,
    DistributionResponse,
    RegressionRequest,
    RegressionResponse,
    CredibilityRequest,
    CredibilityResponse,
    HypothesisTestRequest,
    HypothesisTestResponse,
)

__all__ = [
    "StatisticalEngine",
    "DistributionRequest",
    "DistributionResponse",
    "RegressionRequest",
    "RegressionResponse",
    "CredibilityRequest",
    "CredibilityResponse",
    "HypothesisTestRequest",
    "HypothesisTestResponse",
]