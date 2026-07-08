"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Monte Carlo Forecasting Engine
"""

import numpy as np
from typing import Dict, List, Tuple
from ..actuarial.simulation.distributions import DistributionFactory


class MonteCarloEngine:
    """
    Advanced Monte Carlo simulation for healthcare forecasting
    """
    
    def forecast_healthcare_costs(
        self,
        base_pmpm: float,
        member_count: int,
        trend_mean: float,
        trend_std: float,
        utilization_mean: float,
        utilization_std: float,
        n_simulations: int = 10000,
        n_years: int = 3
    ) -> Dict[str, any]:
        """
        Multi-year healthcare cost forecasting with uncertainty
        """
        results = []
        
        # Create distributions
        trend_dist = DistributionFactory.create("normal", mean=trend_mean, std=trend_std)
        util_dist = DistributionFactory.create("normal", mean=utilization_mean, std=utilization_std)
        
        for sim in range(n_simulations):
            yearly_costs = []
            current_pmpm = base_pmpm
            
            for year in range(n_years):
                # Sample trend and utilization
                trend = trend_dist.sample()[0]
                util_change = util_dist.sample()[0]
                
                # Apply changes
                current_pmpm = current_pmpm * (1 + trend) * (1 + util_change)
                annual_cost = current_pmpm * member_count * 12
                
                yearly_costs.append({
                    "year": year + 1,
                    "pmpm": current_pmpm,
                    "annual_cost": annual_cost
                })
            
            results.append(yearly_costs)
        
        # Aggregate statistics by year
        year_stats = []
        for year_idx in range(n_years):
            year_costs = [sim[year_idx]["annual_cost"] for sim in results]
            year_pmpm = [sim[year_idx]["pmpm"] for sim in results]
            
            year_stats.append({
                "year": year_idx + 1,
                "mean_cost": np.mean(year_costs),
                "median_cost": np.median(year_costs),
                "p10": np.percentile(year_costs, 10),
                "p25": np.percentile(year_costs, 25),
                "p75": np.percentile(year_costs, 75),
                "p90": np.percentile(year_costs, 90),
                "std_dev": np.std(year_costs),
                "mean_pmpm": np.mean(year_pmpm)
            })
        
        return {
            "simulations": n_simulations,
            "years": n_years,
            "base_pmpm": base_pmpm,
            "year_statistics": year_stats,
            "total_uncertainty_range": year_stats[-1]["p90"] - year_stats[-1]["p10"]
        }
    
    def stop_loss_attachment_optimization(
        self,
        expected_claims: float,
        claim_volatility: float,
        attachment_points: List[float],
        n_simulations: int = 10000
    ) -> Dict[str, any]:
        """
        Optimize stop-loss attachment point via simulation
        """
        # Simulate claim distributions
        claims_dist = DistributionFactory.create(
            "lognormal",
            mean=np.log(expected_claims),
            sigma=claim_volatility
        )
        
        results = {}
        for attachment in attachment_points:
            excess_claims = []
            
            for _ in range(n_simulations):
                total_claims = claims_dist.sample()[0]
                excess = max(0, total_claims - attachment)
                excess_claims.append(excess)
            
            results[attachment] = {
                "mean_excess": np.mean(excess_claims),
                "median_excess": np.median(excess_claims),
                "p90_excess": np.percentile(excess_claims, 90),
                "probability_of_excess": sum(1 for x in excess_claims if x > 0) / n_simulations
            }
        
        return {
            "attachment_points": attachment_points,
            "results": results,
            "recommendation": min(results.items(), key=lambda x: x[1]["p90_excess"])[0]
        }
    
    def reserve_adequacy_test(
        self,
        current_reserve: float,
        expected_ibnr: float,
        ibnr_volatility: float,
        confidence_level: float = 0.95,
        n_simulations: int = 10000
    ) -> Dict[str, any]:
        """
        Test reserve adequacy via Monte Carlo
        """
        # Simulate IBNR outcomes
        ibnr_dist = DistributionFactory.create(
            "gamma",
            shape=(expected_ibnr / ibnr_volatility) ** 2,
            scale=ibnr_volatility ** 2 / expected_ibnr
        )
        
        simulated_ibnr = ibnr_dist.sample(n_simulations)
        
        # Calculate deficiency probability
        deficiencies = simulated_ibnr - current_reserve
        prob_deficient = sum(1 for d in deficiencies if d > 0) / n_simulations
        
        # Recommended reserve at confidence level
        recommended = np.percentile(simulated_ibnr, confidence_level * 100)
        
        return {
            "current_reserve": current_reserve,
            "expected_ibnr": expected_ibnr,
            "simulated_mean": np.mean(simulated_ibnr),
            "simulated_median": np.median(simulated_ibnr),
            "prob_deficient": prob_deficient,
            "recommended_reserve": recommended,
            "additional_reserve_needed": max(0, recommended - current_reserve),
            "confidence_level": confidence_level
        }