"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Spread Pricing Detection Engine
"""

import numpy as np
from typing import Dict, List


class SpreadDetectionEngine:
    """
    Detect and quantify PBM spread pricing practices
    """
    
    def calculate_spread(
        self,
        ingredient_cost: float,
        pbm_billed_amount: float,
        dispensing_fee: float = 0
    ) -> Dict[str, float]:
        """
        Calculate spread between acquisition cost and billed amount
        """
        # Spread = What PBM charges - What PBM pays
        spread = pbm_billed_amount - (ingredient_cost + dispensing_fee)
        spread_pct = (spread / ingredient_cost) if ingredient_cost > 0 else 0
        
        return {
            "ingredient_cost": ingredient_cost,
            "dispensing_fee": dispensing_fee,
            "pharmacy_cost": ingredient_cost + dispensing_fee,
            "pbm_billed_amount": pbm_billed_amount,
            "spread_amount": spread,
            "spread_pct": spread_pct,
            "markup_ratio": pbm_billed_amount / (ingredient_cost + dispensing_fee) if (ingredient_cost + dispensing_fee) > 0 else 0
        }
    
    def portfolio_spread_analysis(
        self,
        claims: List[Dict[str, float]]
    ) -> Dict[str, any]:
        """
        Analyze spread across entire claims portfolio
        
        claims = [
            {"ingredient_cost": 50, "billed": 75, "dispensing_fee": 2},
            ...
        ]
        """
        total_ingredient = 0
        total_billed = 0
        total_spread = 0
        spreads = []
        
        for claim in claims:
            ingredient = claim.get("ingredient_cost", 0)
            billed = claim.get("billed", 0)
            dispensing = claim.get("dispensing_fee", 0)
            
            spread = billed - (ingredient + dispensing)
            
            total_ingredient += ingredient
            total_billed += billed
            total_spread += spread
            spreads.append(spread)
        
        # Statistics
        avg_spread = np.mean(spreads) if spreads else 0
        median_spread = np.median(spreads) if spreads else 0
        
        return {
            "total_claims": len(claims),
            "total_ingredient_cost": total_ingredient,
            "total_billed": total_billed,
            "total_spread": total_spread,
            "avg_spread_per_claim": avg_spread,
            "median_spread": median_spread,
            "portfolio_spread_pct": (total_spread / total_ingredient) if total_ingredient > 0 else 0,
            "employer_overpayment": total_spread
        }
    
    def benchmark_spread_detection(
        self,
        pbm_price: float,
        benchmark_price: float,
        benchmark_source: str = "NADAC"
    ) -> Dict[str, any]:
        """
        Compare PBM pricing to public benchmarks
        """
        variance = pbm_price - benchmark_price
        variance_pct = (variance / benchmark_price) if benchmark_price > 0 else 0
        
        # Flag suspicious pricing
        flag = "HIGH" if variance_pct > 0.20 else "MEDIUM" if variance_pct > 0.10 else "ACCEPTABLE"
        
        return {
            "pbm_price": pbm_price,
            "benchmark_price": benchmark_price,
            "benchmark_source": benchmark_source,
            "variance": variance,
            "variance_pct": variance_pct,
            "flag": flag,
            "potential_overcharge": max(0, variance)
        }
    
    def generic_spread_analysis(
        self,
        generic_claims: List[Dict[str, float]]
    ) -> Dict[str, float]:
        """
        Analyze spread specifically on generic drugs (where spread is most egregious)
        """
        total_spread = 0
        total_ingredient = 0
        high_spread_claims = 0
        
        for claim in generic_claims:
            ingredient = claim.get("ingredient_cost", 0)
            billed = claim.get("billed", 0)
            dispensing = claim.get("dispensing_fee", 0)
            
            spread = billed - (ingredient + dispensing)
            spread_pct = (spread / ingredient) if ingredient > 0 else 0
            
            total_spread += spread
            total_ingredient += ingredient
            
            # Flag spreads >40% on generics as egregious
            if spread_pct > 0.40:
                high_spread_claims += 1
        
        return {
            "generic_claims_analyzed": len(generic_claims),
            "total_ingredient_cost": total_ingredient,
            "total_spread": total_spread,
            "avg_spread_pct": (total_spread / total_ingredient) if total_ingredient > 0 else 0,
            "high_spread_claims": high_spread_claims,
            "high_spread_pct": (high_spread_claims / len(generic_claims)) if generic_claims else 0,
            "estimated_annual_overcharge": total_spread
        }
    
    def mac_list_compliance(
        self,
        pbm_mac_price: float,
        published_mac: float,
        drug_name: str
    ) -> Dict[str, any]:
        """
        Check if PBM MAC pricing matches published MAC list
        """
        variance = pbm_mac_price - published_mac
        variance_pct = (variance / published_mac) if published_mac > 0 else 0
        
        compliant = abs(variance_pct) < 0.05  # Within 5%
        
        return {
            "drug_name": drug_name,
            "pbm_mac_price": pbm_mac_price,
            "published_mac": published_mac,
            "variance": variance,
            "variance_pct": variance_pct,
            "compliant": compliant,
            "finding": "Non-compliant" if not compliant else "Compliant"
        }