"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Formulary Analytics Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class FormularyTier:
    tier: int
    drugs: List[str]
    copay: float
    coinsurance: float


class FormularyAnalyticsEngine:
    """
    Formulary optimization, tier analysis, and therapeutic substitution modeling
    """
    
    def analyze_tier_distribution(
        self,
        claims_by_tier: Dict[int, float]
    ) -> Dict[str, any]:
        """
        Analyze distribution of claims across formulary tiers
        """
        total_spend = sum(claims_by_tier.values())
        
        tier_analysis = {}
        for tier, spend in claims_by_tier.items():
            tier_analysis[f"tier_{tier}"] = {
                "spend": spend,
                "pct_of_total": spend / total_spend if total_spend > 0 else 0
            }
        
        # Identify opportunities
        tier_3_plus = sum(spend for tier, spend in claims_by_tier.items() if tier >= 3)
        tier_3_plus_pct = tier_3_plus / total_spend if total_spend > 0 else 0
        
        opportunity_flag = tier_3_plus_pct > 0.25  # 25%+ in high-cost tiers
        
        return {
            "total_pharmacy_spend": total_spend,
            "tier_distribution": tier_analysis,
            "tier_3_plus_spend": tier_3_plus,
            "tier_3_plus_pct": tier_3_plus_pct,
            "optimization_opportunity": "High" if opportunity_flag else "Moderate"
        }
    
    def therapeutic_substitution_savings(
        self,
        brand_drug_spend: float,
        brand_drug_claims: int,
        generic_available: bool = True,
        generic_substitution_rate: float = 0.75,
        cost_differential: float = 0.70
    ) -> Dict[str, float]:
        """
        Calculate savings from therapeutic substitution
        """
        if not generic_available:
            return {
                "substitution_savings": 0,
                "reason": "No generic alternative available"
            }
        
        # Estimate claims that could switch
        switchable_claims = brand_drug_claims * generic_substitution_rate
        switchable_spend = brand_drug_spend * generic_substitution_rate
        
        # Calculate savings (generics typically 70% cheaper)
        savings = switchable_spend * cost_differential
        
        # Remaining brand spend
        remaining_brand = brand_drug_spend - switchable_spend
        generic_spend = switchable_spend - savings
        
        return {
            "current_brand_spend": brand_drug_spend,
            "switchable_spend": switchable_spend,
            "projected_savings": savings,
            "savings_pct": savings / brand_drug_spend if brand_drug_spend > 0 else 0,
            "remaining_brand_spend": remaining_brand,
            "generic_spend": generic_spend,
            "total_projected_spend": remaining_brand + generic_spend
        }
    
    def prior_authorization_impact(
        self,
        specialty_drug_spend: float,
        pa_approval_rate: float = 0.65,
        avg_denial_savings: float = 8500
    ) -> Dict[str, float]:
        """
        Model impact of prior authorization program
        """
        # Estimate denied claims
        requests = specialty_drug_spend / avg_denial_savings  # Rough estimate
        denials = requests * (1 - pa_approval_rate)
        
        # Savings from denials
        denial_savings = denials * avg_denial_savings
        
        # Administrative cost
        admin_cost_per_request = 75
        total_admin_cost = requests * admin_cost_per_request
        
        # Net savings
        net_savings = denial_savings - total_admin_cost
        
        return {
            "specialty_drug_spend": specialty_drug_spend,
            "estimated_pa_requests": requests,
            "approval_rate": pa_approval_rate,
            "denials": denials,
            "gross_savings_from_denials": denial_savings,
            "admin_cost": total_admin_cost,
            "net_savings": net_savings,
            "roi": net_savings / total_admin_cost if total_admin_cost > 0 else 0
        }
    
    def step_therapy_analysis(
        self,
        total_drug_class_spend: float,
        first_line_therapy_pct: float = 0.40,
        second_line_cost_multiplier: float = 3.0
    ) -> Dict[str, float]:
        """
        Analyze step therapy effectiveness
        """
        # Current state
        first_line_spend = total_drug_class_spend * first_line_therapy_pct
        higher_line_spend = total_drug_class_spend * (1 - first_line_therapy_pct)
        
        # Optimal state (75% start on first-line)
        optimal_first_line_pct = 0.75
        
        # Calculate potential savings if more patients started on first-line
        incremental_first_line = (optimal_first_line_pct - first_line_therapy_pct)
        
        # Assume first-line costs 1/3 of second-line
        avg_first_line_cost = first_line_spend / first_line_therapy_pct if first_line_therapy_pct > 0 else 0
        avg_higher_line_cost = avg_first_line_cost * second_line_cost_multiplier
        
        savings_opportunity = incremental_first_line * avg_higher_line_cost * (1 - 1/second_line_cost_multiplier)
        
        return {
            "total_drug_class_spend": total_drug_class_spend,
            "current_first_line_pct": first_line_therapy_pct,
            "optimal_first_line_pct": optimal_first_line_pct,
            "savings_opportunity": savings_opportunity,
            "recommendation": "Implement Step Therapy Protocol" if savings_opportunity > 50000 else "Monitor"
        }
    
    def specialty_tier_management(
        self,
        specialty_drug_spend: float,
        specialty_pct_of_total: float,
        members: int
    ) -> Dict[str, any]:
        """
        Analyze specialty drug tier performance
        """
        specialty_pmpm = specialty_drug_spend / (members * 12) if members > 0 else 0
        
        # Benchmarks
        industry_specialty_pct = 0.52  # Specialty is ~52% of Rx spend
        industry_specialty_pmpm = 48  # ~$48 PMPM industry average
        
        # Performance vs benchmarks
        pct_variance = specialty_pct_of_total - industry_specialty_pct
        pmpm_variance = specialty_pmpm - industry_specialty_pmpm
        
        if specialty_pmpm > industry_specialty_pmpm * 1.15:
            alert = "Specialty costs 15%+ above industry average"
        elif specialty_pct_of_total > industry_specialty_pct * 1.10:
            alert = "High specialty utilization"
        else:
            alert = "Within normal range"
        
        return {
            "specialty_drug_spend": specialty_drug_spend,
            "specialty_pct_of_total": specialty_pct_of_total,
            "specialty_pmpm": specialty_pmpm,
            "industry_specialty_pct": industry_specialty_pct,
            "industry_specialty_pmpm": industry_specialty_pmpm,
            "pct_variance": pct_variance,
            "pmpm_variance": pmpm_variance,
            "alert": alert
        }