"""
KINCAID HEALTH™ SIMULATION ENGINE
Models Using Correlated Variables
"""

import numpy as np
from .correlation import CorrelationEngine, CorrelatedVariable


class CorrelatedHealthcareTrendModel:
    """
    Healthcare cost model with correlated trend, utilization, and severity
    """
    
    def __init__(
        self,
        trend_mean=0.08,
        trend_std=0.015,
        util_mean=1.02,
        util_std=0.02,
        severity_mean=1.04,
        severity_std=0.03,
        correlation_matrix=None
    ):
        """
        Initialize with correlated variables
        
        Default correlation matrix represents typical healthcare relationships:
        - Trend and utilization: 0.65 (strong positive)
        - Trend and severity: 0.42 (moderate positive)
        - Utilization and severity: 0.31 (weak positive)
        """
        self.engine = CorrelationEngine()
        
        self.engine.add_variable(CorrelatedVariable("trend", trend_mean, trend_std))
        self.engine.add_variable(CorrelatedVariable("utilization", util_mean, util_std))
        self.engine.add_variable(CorrelatedVariable("severity", severity_mean, severity_std))
        
        if correlation_matrix is None:
            correlation_matrix = [
                [1.0, 0.65, 0.42],
                [0.65, 1.0, 0.31],
                [0.42, 0.31, 1.0]
            ]
        
        self.engine.set_correlation_matrix(correlation_matrix)
    
    def simulate(self, base_cost, samples=10000):
        """
        Simulate healthcare costs with correlated drivers
        
        Args:
            base_cost: Base annual cost
            samples: Number of Monte Carlo samples
        
        Returns:
            Array of simulated costs
        """
        # Generate correlated samples
        results = self.engine.generate(samples)
        
        trend = results[:, 0]
        utilization = results[:, 1]
        severity = results[:, 2]
        
        # Calculate projected costs
        projected_costs = base_cost * (1 + trend) * utilization * severity
        
        return projected_costs


class CorrelatedMarketRiskModel:
    """
    Investment portfolio with correlated asset returns
    """
    
    def __init__(
        self,
        equity_mean=0.09,
        equity_std=0.18,
        bond_mean=0.04,
        bond_std=0.06,
        real_estate_mean=0.07,
        real_estate_std=0.12,
        correlation_matrix=None
    ):
        """
        Initialize with correlated asset classes
        
        Default correlation matrix:
        - Equity and bonds: -0.15 (negative correlation - flight to quality)
        - Equity and real estate: 0.45 (moderate positive)
        - Bonds and real estate: 0.20 (weak positive)
        """
        self.engine = CorrelationEngine()
        
        self.engine.add_variable(CorrelatedVariable("equity", equity_mean, equity_std))
        self.engine.add_variable(CorrelatedVariable("bond", bond_mean, bond_std))
        self.engine.add_variable(CorrelatedVariable("real_estate", real_estate_mean, real_estate_std))
        
        if correlation_matrix is None:
            correlation_matrix = [
                [1.0, -0.15, 0.45],
                [-0.15, 1.0, 0.20],
                [0.45, 0.20, 1.0]
            ]
        
        self.engine.set_correlation_matrix(correlation_matrix)
    
    def simulate(self, equity_allocation, bond_allocation, real_estate_allocation, portfolio_value, samples=10000):
        """
        Simulate portfolio returns
        
        Args:
            equity_allocation: Equity weight (e.g., 0.60 for 60%)
            bond_allocation: Bond weight (e.g., 0.30 for 30%)
            real_estate_allocation: Real estate weight (e.g., 0.10 for 10%)
            portfolio_value: Starting portfolio value
            samples: Number of Monte Carlo samples
        
        Returns:
            Array of ending portfolio values
        """
        results = self.engine.generate(samples)
        
        equity_returns = results[:, 0]
        bond_returns = results[:, 1]
        real_estate_returns = results[:, 2]
        
        # Calculate portfolio return
        portfolio_returns = (
            equity_allocation * equity_returns +
            bond_allocation * bond_returns +
            real_estate_allocation * real_estate_returns
        )
        
        ending_values = portfolio_value * (1 + portfolio_returns)
        
        return ending_values


class CorrelatedOperationalRiskModel:
    """
    Operational costs with correlated drivers
    """
    
    def __init__(
        self,
        labor_mean=0.05,
        labor_std=0.02,
        materials_mean=0.06,
        materials_std=0.03,
        overhead_mean=0.04,
        overhead_std=0.015,
        correlation_matrix=None
    ):
        """
        Initialize with correlated cost drivers
        
        Default correlation matrix:
        - Labor and materials: 0.55 (strong positive - inflation)
        - Labor and overhead: 0.40 (moderate positive)
        - Materials and overhead: 0.35 (moderate positive)
        """
        self.engine = CorrelationEngine()
        
        self.engine.add_variable(CorrelatedVariable("labor", labor_mean, labor_std))
        self.engine.add_variable(CorrelatedVariable("materials", materials_mean, materials_std))
        self.engine.add_variable(CorrelatedVariable("overhead", overhead_mean, overhead_std))
        
        if correlation_matrix is None:
            correlation_matrix = [
                [1.0, 0.55, 0.40],
                [0.55, 1.0, 0.35],
                [0.40, 0.35, 1.0]
            ]
        
        self.engine.set_correlation_matrix(correlation_matrix)
    
    def simulate(self, base_labor_cost, base_materials_cost, base_overhead_cost, samples=10000):
        """
        Simulate total operational costs
        
        Returns:
            Array of total costs
        """
        results = self.engine.generate(samples)
        
        labor_inflation = results[:, 0]
        materials_inflation = results[:, 1]
        overhead_inflation = results[:, 2]
        
        total_costs = (
            base_labor_cost * (1 + labor_inflation) +
            base_materials_cost * (1 + materials_inflation) +
            base_overhead_cost * (1 + overhead_inflation)
        )
        
        return total_costs