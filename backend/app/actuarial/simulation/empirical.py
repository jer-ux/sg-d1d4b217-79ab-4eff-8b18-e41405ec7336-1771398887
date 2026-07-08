"""
KINCAID HEALTH™ SIMULATION ENGINE
Empirical Distribution Support
"""

import numpy as np
from typing import List, Optional
from dataclasses import dataclass


@dataclass
class EmpiricalDistribution:
    """Distribution based on historical data"""
    name: str
    data: np.ndarray
    
    def sample(self, size: int = 1) -> np.ndarray:
        """Sample from historical data with replacement"""
        return np.random.choice(self.data, size=size, replace=True)
    
    def percentile(self, q: float) -> float:
        """Get percentile from historical data"""
        return np.percentile(self.data, q * 100)
    
    def mean(self) -> float:
        """Get historical mean"""
        return float(np.mean(self.data))
    
    def std(self) -> float:
        """Get historical standard deviation"""
        return float(np.std(self.data))


class EmpiricalEngine:
    """Engine for empirical (bootstrap) simulations"""
    
    def __init__(self, data: np.ndarray):
        self.data = data
        self.n = len(data)
    
    def bootstrap_sample(self, size: Optional[int] = None) -> np.ndarray:
        """Generate bootstrap sample"""
        if size is None:
            size = self.n
        return np.random.choice(self.data, size=size, replace=True)
    
    def bootstrap_statistic(
        self,
        statistic_func,
        n_iterations: int = 10000
    ) -> np.ndarray:
        """Calculate bootstrap distribution of a statistic"""
        results = np.array([
            statistic_func(self.bootstrap_sample())
            for _ in range(n_iterations)
        ])
        return results
    
    def bootstrap_ci(
        self,
        statistic_func,
        confidence: float = 0.95,
        n_iterations: int = 10000
    ) -> dict:
        """Calculate bootstrap confidence interval"""
        bootstrap_stats = self.bootstrap_statistic(statistic_func, n_iterations)
        
        alpha = 1 - confidence
        lower = np.percentile(bootstrap_stats, (alpha / 2) * 100)
        upper = np.percentile(bootstrap_stats, (1 - alpha / 2) * 100)
        
        return {
            "lower": float(lower),
            "upper": float(upper),
            "mean": float(np.mean(bootstrap_stats)),
            "std": float(np.std(bootstrap_stats))
        }


def create_empirical_from_history(
    historical_values: List[float],
    name: str = "empirical"
) -> EmpiricalDistribution:
    """Create empirical distribution from historical data"""
    return EmpiricalDistribution(
        name=name,
        data=np.array(historical_values)
    )