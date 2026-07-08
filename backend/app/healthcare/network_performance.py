"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Network Performance Analytics Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class NetworkMetrics:
    network_name: str
    total_providers: int
    utilization_rate: float
    avg_discount_pct: float
    quality_score: float
    member_satisfaction: float


class NetworkPerformanceEngine:
    """
    Provider network utilization, discount effectiveness, and quality metrics
    """
    
    def analyze_network_utilization(
        self,
        in_network_claims: float,
        out_of_network_claims: float,
        in_network_providers: int,
        total_providers: int
    ) -> Dict[str, float]:
        """
        Analyze network utilization and leakage
        """
        total_claims = in_network_claims + out_of_network_claims
        in_network_pct = in_network_claims / total_claims if total_claims > 0 else 0
        leakage_pct = out_of_network_claims / total_claims if total_claims > 0 else 0
        
        provider_participation = in_network_providers / total_providers if total_providers > 0 else 0
        
        return {
            "in_network_claims": in_network_claims,
            "out_of_network_claims": out_of_network_claims,
            "total_claims": total_claims,
            "in_network_pct": in_network_pct,
            "leakage_pct": leakage_pct,
            "provider_participation_rate": provider_participation,
            "leakage_cost_impact": out_of_network_claims * 0.30  # Typical OON cost premium
        }
    
    def calculate_network_discount(
        self,
        billed_charges: float,
        allowed_amounts: float
    ) -> Dict[str, float]:
        """
        Calculate effective network discount rates
        """
        discount = billed_charges - allowed_amounts
        discount_pct = discount / billed_charges if billed_charges > 0 else 0
        
        # Industry benchmarks
        tier_1_benchmark = 0.55  # 55% discount
        tier_2_benchmark = 0.45  # 45% discount
        
        if discount_pct >= tier_1_benchmark:
            performance = "Excellent"
        elif discount_pct >= tier_2_benchmark:
            performance = "Good"
        elif discount_pct >= 0.35:
            performance = "Average"
        else:
            performance = "Below Average"
        
        return {
            "billed_charges": billed_charges,
            "allowed_amounts": allowed_amounts,
            "discount_amount": discount,
            "discount_pct": discount_pct,
            "tier_1_benchmark": tier_1_benchmark,
            "tier_2_benchmark": tier_2_benchmark,
            "performance_rating": performance
        }
    
    def compare_networks(
        self,
        networks: List[NetworkMetrics]
    ) -> Dict[str, any]:
        """
        Compare multiple provider networks
        """
        if not networks:
            return {"error": "No networks to compare"}
        
        # Find best performers
        best_utilization = max(networks, key=lambda x: x.utilization_rate)
        best_discount = max(networks, key=lambda x: x.avg_discount_pct)
        best_quality = max(networks, key=lambda x: x.quality_score)
        
        # Calculate averages
        avg_utilization = np.mean([n.utilization_rate for n in networks])
        avg_discount = np.mean([n.avg_discount_pct for n in networks])
        avg_quality = np.mean([n.quality_score for n in networks])
        
        return {
            "network_count": len(networks),
            "best_utilization_network": best_utilization.network_name,
            "best_discount_network": best_discount.network_name,
            "best_quality_network": best_quality.network_name,
            "avg_utilization_rate": avg_utilization,
            "avg_discount_pct": avg_discount,
            "avg_quality_score": avg_quality,
            "networks": [
                {
                    "name": n.network_name,
                    "utilization_rate": n.utilization_rate,
                    "discount_pct": n.avg_discount_pct,
                    "quality_score": n.quality_score
                }
                for n in networks
            ]
        }
    
    def narrow_network_savings(
        self,
        broad_network_pmpm: float,
        narrow_network_discount_improvement: float = 0.08
    ) -> Dict[str, float]:
        """
        Calculate potential savings from narrow network strategy
        """
        savings_per_member = broad_network_pmpm * narrow_network_discount_improvement
        narrow_network_pmpm = broad_network_pmpm - savings_per_member
        
        return {
            "broad_network_pmpm": broad_network_pmpm,
            "narrow_network_pmpm": narrow_network_pmpm,
            "savings_per_member_monthly": savings_per_member,
            "savings_per_member_annual": savings_per_member * 12,
            "discount_improvement_pct": narrow_network_discount_improvement
        }