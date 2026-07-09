"""
Statistical Engine - Data Models
"""

from typing import List, Dict, Optional, Literal
from datetime import datetime
from pydantic import BaseModel, Field


class DistributionRequest(BaseModel):
    """Request for distribution analysis and fitting."""
    data: List[float] = Field(..., description="Sample data points")
    distribution_type: Literal["normal", "lognormal", "gamma", "weibull", "poisson"] = Field(
        default="normal",
        description="Type of distribution to fit"
    )
    confidence_level: float = Field(default=0.95, ge=0, le=1, description="Confidence level for intervals")


class DistributionParameters(BaseModel):
    """Fitted distribution parameters."""
    distribution: str
    parameters: Dict[str, float] = Field(..., description="Distribution parameters (mean, std, shape, etc.)")
    goodness_of_fit: float = Field(..., description="R-squared or similar fit metric")
    confidence_intervals: Dict[str, tuple[float, float]] = Field(..., description="Confidence intervals for parameters")


class DistributionResponse(BaseModel):
    """Response from distribution analysis."""
    fitted: DistributionParameters = Field(..., description="Fitted distribution parameters")
    summary_statistics: Dict[str, float] = Field(..., description="Mean, median, std, skewness, kurtosis")
    percentiles: Dict[str, float] = Field(..., description="Key percentiles (5th, 25th, 50th, 75th, 95th)")
    evidence_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    insights: List[str] = Field(default=[], description="Key statistical insights")


class RegressionRequest(BaseModel):
    """Request for regression analysis."""
    x: List[List[float]] = Field(..., description="Independent variables (features)")
    y: List[float] = Field(..., description="Dependent variable (target)")
    model_type: Literal["linear", "logistic", "polynomial"] = Field(
        default="linear",
        description="Type of regression model"
    )
    polynomial_degree: Optional[int] = Field(None, ge=2, le=5, description="Degree for polynomial regression")
    include_intercept: bool = Field(default=True, description="Include intercept term")


class RegressionCoefficient(BaseModel):
    """A regression coefficient with statistics."""
    name: str
    value: float
    std_error: float
    t_statistic: float
    p_value: float
    confidence_interval: tuple[float, float]


class RegressionResponse(BaseModel):
    """Response from regression analysis."""
    coefficients: List[RegressionCoefficient] = Field(..., description="Regression coefficients")
    r_squared: float = Field(..., description="R-squared (coefficient of determination)")
    adjusted_r_squared: float = Field(..., description="Adjusted R-squared")
    f_statistic: float = Field(..., description="F-statistic for overall model significance")
    residual_std_error: float = Field(..., description="Standard error of residuals")
    predictions: Optional[List[float]] = Field(None, description="Predicted values")
    evidence_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    methodology: str = Field(default="Ordinary Least Squares (OLS)")


class CredibilityRequest(BaseModel):
    """Request for credibility weighting calculation."""
    experience_data: List[float] = Field(..., description="Experience data (claims, losses, etc.)")
    expected_value: float = Field(..., description="Expected value from external benchmark")
    k_parameter: Optional[float] = Field(None, gt=0, description="Credibility parameter (Bühlmann k)")
    confidence_level: float = Field(default=0.95, ge=0, le=1)


class CredibilityResponse(BaseModel):
    """Response from credibility analysis."""
    credibility_factor: float = Field(..., ge=0, le=1, description="Z credibility factor")
    credibility_weighted_estimate: float = Field(..., description="Weighted estimate combining experience and expected")
    experience_mean: float = Field(..., description="Mean of experience data")
    experience_variance: float = Field(..., description="Variance of experience data")
    full_credibility_size: float = Field(..., description="Sample size needed for full credibility")
    confidence_interval: tuple[float, float] = Field(..., description="Confidence interval for weighted estimate")
    evidence_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    methodology: str = Field(default="Bühlmann Credibility Theory")


class HypothesisTestRequest(BaseModel):
    """Request for hypothesis testing."""
    sample_1: List[float] = Field(..., description="First sample")
    sample_2: Optional[List[float]] = Field(None, description="Second sample (for two-sample tests)")
    test_type: Literal["t_test", "paired_t", "chi_square", "anova", "z_test"] = Field(
        default="t_test",
        description="Type of hypothesis test"
    )
    alternative: Literal["two_sided", "less", "greater"] = Field(
        default="two_sided",
        description="Alternative hypothesis"
    )
    significance_level: float = Field(default=0.05, ge=0, le=1, description="Alpha significance level")
    null_hypothesis_value: Optional[float] = Field(None, description="Null hypothesis value (for one-sample tests)")


class HypothesisTestResponse(BaseModel):
    """Response from hypothesis testing."""
    test_statistic: float = Field(..., description="Calculated test statistic")
    p_value: float = Field(..., description="P-value")
    reject_null: bool = Field(..., description="Whether to reject null hypothesis")
    confidence_interval: Optional[tuple[float, float]] = Field(None, description="Confidence interval for difference")
    effect_size: Optional[float] = Field(None, description="Cohen's d or similar effect size measure")
    power: Optional[float] = Field(None, description="Statistical power of the test")
    evidence_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    methodology: str = Field(..., description="Test methodology used")
    interpretation: str = Field(..., description="Plain language interpretation of results")