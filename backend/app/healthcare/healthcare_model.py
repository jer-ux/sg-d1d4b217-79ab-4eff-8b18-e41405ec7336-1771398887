"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Core Healthcare Trend Model
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class HealthcareTrendResult:
    projected_cost: float
    trend_rate: float
    utilization_factor: float
    severity_factor: float
    components: Dict[str, float]


class HealthcareTrendModel:
    """
    Healthcare cost trend projection with utilization and severity decomposition
    """
    
    def simulate(
        self,
        base_cost: float,
        trend_mean: float,
        trend_sd: float,
        util_mean: float,
        util_sd: float,
        severity_mean: float,
        severity_sd: float,
        **kwargs
    ) -> float:
        """
        Simulate single healthcare cost projection
        
        Args:
            base_cost: Current annual healthcare cost
            trend_mean: Expected medical trend rate (e.g., 0.08 for 8%)
            trend_sd: Trend volatility
            util_mean: Utilization multiplier mean (e.g., 1.02 for 2% increase)
            util_sd: Utilization volatility
            severity_mean: Severity/unit cost multiplier mean
            severity_sd: Severity volatility
            
        Returns:
            Projected annual cost
        """
        # Sample trend components
        trend = np.random.normal(trend_mean, trend_sd)
        utilization = np.random.normal(util_mean, util_sd)
        severity = np.random.normal(severity_mean, severity_sd)
        
        # Calculate projected cost
        projected = base_cost * (1 + trend) * utilization * severity
        
        return projected
    
    def project_detailed(
        self,
        base_cost: float,
        trend_mean: float,
        trend_sd: float,
        util_mean: float,
        util_sd: float,
        severity_mean: float,
        severity_sd: float,
        iterations: int = 10000
    ) -> HealthcareTrendResult:
        """
        Detailed projection with component breakdown
        """
        results = []
        for _ in range(iterations):
            result = self.simulate(
                base_cost, trend_mean, trend_sd,
                util_mean, util_sd,
                severity_mean, severity_sd
            )
            results.append(result)
        
        return HealthcareTrendResult(
            projected_cost=float(np.mean(results)),
            trend_rate=trend_mean,
            utilization_factor=util_mean,
            severity_factor=severity_mean,
            components={
                "base": base_cost,
                "trend_impact": base_cost * trend_mean,
                "utilization_impact": base_cost * (util_mean - 1),
                "severity_impact": base_cost * (severity_mean - 1),
                "mean": float(np.mean(results)),
                "p5": float(np.percentile(results, 5)),
                "p50": float(np.percentile(results, 50)),
                "p95": float(np.percentile(results, 95)),
            }
        )