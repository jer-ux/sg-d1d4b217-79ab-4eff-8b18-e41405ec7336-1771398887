"""
KINCAID HEALTH™ SIMULATION ENGINE
Pre-built Simulation Models
"""

from typing import Dict, Any, Optional
import numpy as np

from .engine import SimulationEngine
from .random_variables import RandomVariableBuilder


class SimulationModel:
    """
    Pre-configured simulation models for common actuarial analyses
    """
    
    @staticmethod
    def premium_renewal_uncertainty(
        current_pmpm: float,
        member_count: int,
        expected_trend: float = 0.07,
        trend_uncertainty: float = 0.02,
        n_simulations: int = 10000
    ) -> Dict[str, Any]:
        """
        Model premium renewal uncertainty
        
        Args:
            current_pmpm: Current PMPM
            member_count: Member count
            expected_trend: Expected trend rate
            trend_uncertainty: Trend volatility
            n_simulations: Number of simulations
            
        Returns:
            Renewal analysis with confidence bands
        """
        engine = SimulationEngine(n_simulations)
        
        return engine.claims_cost_forecast(
            current_pmpm=current_pmpm,
            member_count=member_count,
            trend_rate=expected_trend,
            trend_volatility=trend_uncertainty
        )
    
    @staticmethod
    def aggregate_claims_distribution(
        frequency_rate: float,
        average_severity: float,
        severity_cv: float = 0.50,
        n_simulations: int = 10000
    ) -> Dict[str, Any]:
        """
        Model aggregate claims using frequency-severity approach
        
        Args:
            frequency_rate: Expected claim count
            average_severity: Average claim size
            severity_cv: Coefficient of variation for severity
            n_simulations: Number of simulations
            
        Returns:
            Aggregate claims distribution
        """
        engine = SimulationEngine(n_simulations)
        
        # Random variables
        frequency_rv = RandomVariableBuilder.claim_frequency(frequency_rate)
        severity_rv = RandomVariableBuilder.claim_severity(average_severity, severity_cv)
        
        def aggregate_claims(claim_frequency: float, claim_severity: float) -> float:
            # Number of claims (Poisson)
            n_claims = int(np.random.poisson(claim_frequency))
            # Total claims
            if n_claims == 0:
                return 0
            # Generate individual claim amounts
            claims = engine.factory.lognormal(
                np.log(claim_severity) - 0.5 * (severity_cv ** 2),
                severity_cv,
                n_claims
            )
            return float(np.sum(claims))
        
        results = engine.simulator.run(aggregate_claims, [frequency_rv, severity_rv])
        
        from .statistics import StatisticalAnalyzer
        stats = StatisticalAnalyzer.descriptive_statistics(results)
        percentiles = StatisticalAnalyzer.percentile_analysis(results)
        
        return {
            'model': 'aggregate_claims',
            'parameters': {
                'frequency_rate': frequency_rate,
                'average_severity': average_severity,
                'severity_cv': severity_cv
            },
            'statistics': stats,
            'percentiles': percentiles
        }
    
    @staticmethod
    def large_claim_shock(
        base_claims: float,
        shock_threshold: float,
        shock_probability: float = 0.05,
        n_simulations: int = 10000
    ) -> Dict[str, Any]:
        """
        Model impact of large claim shocks
        
        Args:
            base_claims: Base claims amount
            shock_threshold: Shock claim threshold
            shock_probability: Probability of shock
            n_simulations: Number of simulations
            
        Returns:
            Large claim shock analysis
        """
        engine = SimulationEngine(n_simulations)
        
        large_claim_rv = RandomVariableBuilder.large_claim(shock_threshold)
        
        def total_with_shock(large_claim: float) -> float:
            # Random shock occurrence
            if np.random.random() < shock_probability:
                return base_claims + large_claim
            return base_claims
        
        results = engine.simulator.run(total_with_shock, [large_claim_rv])
        
        from .statistics import StatisticalAnalyzer
        from .var import ValueAtRiskCalculator
        
        stats = StatisticalAnalyzer.descriptive_statistics(results)
        var = ValueAtRiskCalculator.calculate_cvar(results, 0.95)
        
        # Calculate shock impact
        shocked_results = results[results > base_claims]
        shock_rate = len(shocked_results) / len(results)
        
        return {
            'model': 'large_claim_shock',
            'parameters': {
                'base_claims': base_claims,
                'shock_threshold': shock_threshold,
                'shock_probability': shock_probability
            },
            'statistics': stats,
            'risk_metrics': {
                'var_95': var['var'],
                'cvar_95': var['cvar'],
                'actual_shock_rate': float(shock_rate),
                'average_shock_size': float(np.mean(shocked_results - base_claims)) if len(shocked_results) > 0 else 0
            }
        }
    
    @staticmethod
    def multi_year_projection(
        base_pmpm: float,
        member_count: int,
        years: int = 3,
        trend: float = 0.07,
        trend_volatility: float = 0.02,
        n_simulations: int = 10000
    ) -> Dict[str, Any]:
        """
        Multi-year cost projection with uncertainty
        
        Args:
            base_pmpm: Starting PMPM
            member_count: Member count
            years: Number of years
            trend: Annual trend
            trend_volatility: Trend uncertainty
            n_simulations: Number of simulations
            
        Returns:
            Multi-year projection
        """
        engine = SimulationEngine(n_simulations)
        
        trend_rv = RandomVariableBuilder.medical_trend(trend, trend_volatility)
        
        year_results = {}
        
        for year in range(1, years + 1):
            def project_year(medical_trend: float) -> float:
                return base_pmpm * ((1 + medical_trend) ** year) * member_count * 12
            
            results = engine.simulator.run(project_year, [trend_rv])
            
            year_results[f'year_{year}'] = {
                'mean': float(np.mean(results)),
                'p50': float(np.percentile(results, 50)),
                'p75': float(np.percentile(results, 75)),
                'p90': float(np.percentile(results, 90)),
                'p95': float(np.percentile(results, 95))
            }
        
        return {
            'model': 'multi_year_projection',
            'projections': year_results,
            'parameters': {
                'base_pmpm': base_pmpm,
                'member_count': member_count,
                'years': years,
                'trend': trend,
                'volatility': trend_volatility
            }
        }