"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Large Claimant Modeling Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class LargeClaimantProfile:
    member_id: str
    annual_claims: float
    conditions: List[str]
    risk_tier: str
    projected_next_year: float


class LargeClaimantEngine:
    """
    Large claimant identification, projection, and management strategies
    """
    
    def __init__(self):
        self.large_claim_threshold = 50000  # $50K+
        self.catastrophic_threshold = 250000  # $250K+
    
    def identify_large_claimants(
        self,
        claims_data: List[Dict]
    ) -> List[LargeClaimantProfile]:
        """
        Identify and profile large claimants
        """
        large_claimants = []
        
        for member in claims_data:
            annual_claims = member.get("annual_claims", 0)
            
            if annual_claims >= self.large_claim_threshold:
                # Estimate next year projection (persistence factor)
                persistence = 0.65 if annual_claims < self.catastrophic_threshold else 0.75
                projected = annual_claims * persistence
                
                # Determine risk tier
                if annual_claims >= self.catastrophic_threshold:
                    tier = "Catastrophic"
                elif annual_claims >= 100000:
                    tier = "Severe"
                else:
                    tier = "Large"
                
                large_claimants.append(LargeClaimantProfile(
                    member_id=member.get("member_id", ""),
                    annual_claims=annual_claims,
                    conditions=member.get("conditions", []),
                    risk_tier=tier,
                    projected_next_year=projected
                ))
        
        return large_claimants
    
    def shock_claim_probability(
        self,
        population: int,
        avg_age: float = 45
    ) -> Dict[str, float]:
        """
        Estimate probability of shock claims (>$1M)
        """
        # Base rate per 10,000 members
        base_rate = 0.5  # 0.5 per 10K
        
        # Age adjustment
        if avg_age > 55:
            base_rate *= 1.5
        elif avg_age > 45:
            base_rate *= 1.2
        
        # Expected shock claims
        expected_shocks = (population / 10000) * base_rate
        
        # Average cost of shock claim
        avg_shock_cost = 1250000
        
        return {
            "population": population,
            "shock_claims_per_10k": base_rate,
            "expected_annual_shocks": expected_shocks,
            "avg_shock_claim_cost": avg_shock_cost,
            "expected_annual_cost": expected_shocks * avg_shock_cost,
            "pmpm_impact": (expected_shocks * avg_shock_cost) / (population * 12)
        }
    
    def large_claim_concentration(
        self,
        total_claims: float,
        large_claimant_claims: float,
        population: int,
        large_claimant_count: int
    ) -> Dict[str, float]:
        """
        Analyze concentration of claims in large claimants
        """
        concentration_pct = large_claimant_claims / total_claims
        member_pct = large_claimant_count / population
        
        return {
            "total_claims": total_claims,
            "large_claimant_claims": large_claimant_claims,
            "concentration_pct": concentration_pct,
            "large_claimant_count": large_claimant_count,
            "large_claimant_pct_of_population": member_pct,
            "concentration_ratio": concentration_pct / member_pct if member_pct > 0 else 0
        }
    
    def project_large_claim_trend(
        self,
        historical_large_claims: List[float],
        volatility: float = 0.25
    ) -> Dict[str, float]:
        """
        Project future large claim activity
        """
        if len(historical_large_claims) < 2:
            return {"error": "Insufficient historical data"}
        
        # Calculate historical trend
        years = len(historical_large_claims)
        trend = (historical_large_claims[-1] / historical_large_claims[0]) ** (1 / years) - 1
        
        # Monte Carlo projection
        simulations = []
        for _ in range(1000):
            projected = historical_large_claims[-1] * (1 + np.random.normal(trend, volatility))
            simulations.append(projected)
        
        return {
            "current_year": historical_large_claims[-1],
            "historical_trend": trend,
            "projected_mean": float(np.mean(simulations)),
            "projected_p50": float(np.percentile(simulations, 50)),
            "projected_p75": float(np.percentile(simulations, 75)),
            "projected_p90": float(np.percentile(simulations, 90))
        }