"""
KINCAID HEALTH™ SIMULATION ENGINE
Main Simulation Orchestrator
"""

from typing import Dict, Any, List, Optional
import numpy as np
from datetime import datetime

from .monte_carlo import MonteCarloSimulator
from .distributions import DistributionFactory
from .random_variables import RandomVariable, RandomVariableBuilder
from .scenarios import ScenarioGenerator
from .statistics import StatisticalAnalyzer
from .confidence import ConfidenceIntervalCalculator
from .var import ValueAtRiskCalculator


class SimulationEngine:
    """
    Unified simulation engine orchestrating all simulation capabilities
    """
    
    def __init__(self, n_simulations: int = 10000, random_seed: Optional[int] = None):
        """
        Initialize simulation engine
        
        Args:
            n_simulations: Number of Monte Carlo simulations
            random_seed: Random seed for reproducibility
        """
        self.n_simulations = n_simulations
        self.random_seed = random_seed
        self.simulator = MonteCarloSimulator(n_simulations, random_seed)
        self.factory = DistributionFactory()
    
    def run_complete_analysis(
        self,
        base_value: float,
        volatility: float,
        trend: float = 0.07,
        periods: int = 12
    ) -> Dict[str, Any]:
        """
        Run complete simulation analysis
        
        Args:
            base_value: Starting value (e.g., current PMPM)
            volatility: Standard deviation
            trend: Expected growth rate
            periods: Number of periods to simulate
            
        Returns:
            Complete analysis results
        """
        # Define random variables
        trend_rv = RandomVariableBuilder.medical_trend(trend, volatility)
        
        # Model function
        def project_cost(medical_trend: float) -> float:
            return base_value * ((1 + medical_trend) ** (periods / 12))
        
        # Run Monte Carlo
        results = self.simulator.run(project_cost, [trend_rv])
        
        # Statistical analysis
        stats = StatisticalAnalyzer.descriptive_statistics(results)
        percentiles = StatisticalAnalyzer.percentile_analysis(results)
        tail = StatisticalAnalyzer.tail_analysis(results, 95)
        
        # Confidence intervals
        mean_ci = ConfidenceIntervalCalculator.mean_ci(results, 0.90)
        
        # Value at Risk
        var_results = ValueAtRiskCalculator.var_multiple_levels(results, [0.90, 0.95, 0.99])
        
        return {
            'simulation': {
                'n_simulations': self.n_simulations,
                'execution_time_ms': self.simulator.execution_time_ms,
                'random_seed': self.random_seed
            },
            'inputs': {
                'base_value': base_value,
                'trend': trend,
                'volatility': volatility,
                'periods': periods
            },
            'statistics': stats,
            'percentiles': percentiles,
            'confidence_intervals': {
                'mean': mean_ci
            },
            'tail_risk': tail,
            'value_at_risk': var_results,
            'timestamp': datetime.now().isoformat()
        }
    
    def claims_cost_forecast(
        self,
        current_pmpm: float,
        member_count: int,
        trend_rate: float = 0.07,
        trend_volatility: float = 0.02,
        claim_volatility: float = 0.15
    ) -> Dict[str, Any]:
        """
        Simulate healthcare claims cost forecast
        
        Args:
            current_pmpm: Current per member per month cost
            member_count: Number of members
            trend_rate: Expected medical trend
            trend_volatility: Uncertainty in trend
            claim_volatility: Claims variability
            
        Returns:
            Forecast with uncertainty bands
        """
        # Random variables
        trend_rv = RandomVariableBuilder.medical_trend(trend_rate, trend_volatility)
        
        # Model: PMPM * (1 + trend) * member_count * 12 months
        def annual_cost(medical_trend: float) -> float:
            projected_pmpm = current_pmpm * (1 + medical_trend)
            base_annual = projected_pmpm * member_count * 12
            # Add claims volatility
            claim_shock = np.random.normal(1.0, claim_volatility)
            return base_annual * claim_shock
        
        # Run simulation
        results = self.simulator.run(annual_cost, [trend_rv])
        
        # Analysis
        stats = StatisticalAnalyzer.descriptive_statistics(results)
        percentiles = StatisticalAnalyzer.percentile_analysis(results, [10, 25, 50, 75, 90, 95, 99])
        var = ValueAtRiskCalculator.calculate_cvar(results, 0.95)
        
        return {
            'forecast': {
                'current_pmpm': current_pmpm,
                'projected_mean': stats['mean'],
                'projected_median': stats['median'],
                'volatility': stats['std']
            },
            'scenarios': {
                'best_case': percentiles['p10'],
                'expected': percentiles['p50'],
                'worst_case': percentiles['p90']
            },
            'risk_metrics': {
                'var_95': var['var'],
                'cvar_95': var['cvar']
            },
            'percentiles': percentiles,
            'statistics': stats
        }
    
    def stop_loss_scenario_analysis(
        self,
        expected_large_claims: float,
        attachment_points: List[int],
        premium_load: float = 0.25
    ) -> List[Dict[str, Any]]:
        """
        Analyze stop-loss scenarios
        
        Args:
            expected_large_claims: Expected large claims amount
            attachment_points: List of attachment points to evaluate
            premium_load: Carrier load factor
            
        Returns:
            Scenario analysis for each attachment point
        """
        scenarios = []
        
        for ap in attachment_points:
            # Simulate large claims with Pareto distribution
            large_claim_rv = RandomVariableBuilder.large_claim(ap, shape=2.5)
            
            def total_cost(large_claim: float) -> float:
                # Premium cost
                premium = expected_large_claims * (1 + premium_load)
                # Retained risk (claims below attachment)
                retained = min(large_claim, ap)
                return premium + retained
            
            results = self.simulator.run(total_cost, [large_claim_rv])
            
            scenarios.append({
                'attachment_point': ap,
                'mean_cost': float(np.mean(results)),
                'median_cost': float(np.median(results)),
                'p75_cost': float(np.percentile(results, 75)),
                'p95_cost': float(np.percentile(results, 95)),
                'volatility': float(np.std(results))
            })
        
        # Find optimal (lowest median cost)
        optimal = min(scenarios, key=lambda x: x['median_cost'])
        
        return {
            'scenarios': scenarios,
            'recommended': optimal,
            'analysis': 'Scenario analysis complete'
        }