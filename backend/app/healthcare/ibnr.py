"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
IBNR Estimation Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class IBNREstimate:
    total_ibnr: float
    by_service_category: Dict[str, float]
    confidence_interval: tuple
    methodology: str


class IBNREngine:
    """
    Incurred But Not Reported claims reserve estimation
    """
    
    def __init__(self):
        self.completion_factors = {
            "inpatient": {1: 0.50, 2: 0.75, 3: 0.92, 4: 0.98, 5: 0.995},
            "outpatient": {1: 0.60, 2: 0.85, 3: 0.95, 4: 0.99, 5: 0.998},
            "professional": {1: 0.70, 2: 0.90, 3: 0.97, 4: 0.995, 5: 1.0},
            "pharmacy": {1: 0.95, 2: 0.995, 3: 1.0, 4: 1.0, 5: 1.0}
        }
    
    def estimate_ibnr(
        self,
        paid_claims_by_category: Dict[str, Dict[int, float]],
        lag_month: int = 2
    ) -> IBNREstimate:
        """
        Estimate IBNR using completion factor method
        
        Args:
            paid_claims_by_category: {category: {lag_month: paid_amount}}
            lag_month: Current reporting lag (months since month-end)
        """
        ibnr_by_category = {}
        total_ibnr = 0
        
        for category, paid_by_lag in paid_claims_by_category.items():
            # Get completion factor for this category and lag
            factors = self.completion_factors.get(category, self.completion_factors["professional"])
            completion = factors.get(lag_month, 0.95)
            
            # Get paid claims at this lag
            paid = paid_by_lag.get(lag_month, 0)
            
            # Estimate ultimate
            ultimate = paid / completion if completion > 0 else paid
            
            # IBNR = Ultimate - Paid
            ibnr = ultimate - paid
            ibnr_by_category[category] = ibnr
            total_ibnr += ibnr
        
        # Monte Carlo confidence interval
        simulations = []
        for _ in range(1000):
            sim_total = 0
            for category, paid_by_lag in paid_claims_by_category.items():
                factors = self.completion_factors.get(category, self.completion_factors["professional"])
                base_completion = factors.get(lag_month, 0.95)
                
                # Add volatility to completion factor
                completion = np.random.normal(base_completion, 0.02)
                completion = max(0.5, min(1.0, completion))
                
                paid = paid_by_lag.get(lag_month, 0)
                ultimate = paid / completion if completion > 0 else paid
                sim_total += (ultimate - paid)
            
            simulations.append(sim_total)
        
        return IBNREstimate(
            total_ibnr=total_ibnr,
            by_service_category=ibnr_by_category,
            confidence_interval=(
                float(np.percentile(simulations, 5)),
                float(np.percentile(simulations, 95))
            ),
            methodology="Completion Factor Method"
        )
    
    def chain_ladder_ibnr(
        self,
        triangle: List[List[float]]
    ) -> Dict[str, float]:
        """
        Chain ladder IBNR method for experienced actuaries
        
        Args:
            triangle: Claims development triangle (rows=accident periods, cols=development periods)
        """
        n_periods = len(triangle)
        
        # Calculate age-to-age factors
        factors = []
        for col in range(n_periods - 1):
            numerator = sum(triangle[row][col + 1] for row in range(n_periods - col - 1) if col + 1 < len(triangle[row]))
            denominator = sum(triangle[row][col] for row in range(n_periods - col - 1) if col < len(triangle[row]))
            if denominator > 0:
                factors.append(numerator / denominator)
            else:
                factors.append(1.0)
        
        # Project ultimate claims
        total_ibnr = 0
        for row in range(n_periods):
            latest_paid = triangle[row][-1] if triangle[row] else 0
            ultimate = latest_paid
            
            # Apply remaining factors
            for i in range(len(triangle[row]) - 1, n_periods - 1):
                if i < len(factors):
                    ultimate *= factors[i]
            
            ibnr = ultimate - latest_paid
            total_ibnr += ibnr
        
        return {
            "total_ibnr": total_ibnr,
            "age_to_age_factors": factors,
            "methodology": "Chain Ladder"
        }