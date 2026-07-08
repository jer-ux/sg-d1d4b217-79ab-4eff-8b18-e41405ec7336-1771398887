"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Rebate Economics Engine
"""

import numpy as np
from typing import Dict, List


class RebateEconomicsEngine:
    """
    Manufacturer rebate modeling, pass-through analysis, and rebate optimization
    """
    
    def calculate_effective_net_cost(
        self,
        gross_drug_cost: float,
        manufacturer_rebates: float,
        dispensing_fees: float,
        pbm_admin_fees: float
    ) -> Dict[str, float]:
        """
        Calculate true net cost after all rebates and fees
        """
        net_cost = gross_drug_cost - manufacturer_rebates + dispensing_fees + pbm_admin_fees
        
        effective_discount = manufacturer_rebates / gross_drug_cost if gross_drug_cost > 0 else 0
        
        return {
            "gross_drug_cost": gross_drug_cost,
            "manufacturer_rebates": manufacturer_rebates,
            "dispensing_fees": dispensing_fees,
            "pbm_admin_fees": pbm_admin_fees,
            "net_cost": net_cost,
            "effective_discount_pct": effective_discount,
            "cost_per_dollar_spent": net_cost / gross_drug_cost if gross_drug_cost > 0 else 0
        }
    
    def rebate_pass_through_analysis(
        self,
        manufacturer_rebates: float,
        pbm_retained_rebates: float,
        pbm_admin_fee_on_rebates: float = 0
    ) -> Dict[str, float]:
        """
        Analyze rebate pass-through percentage
        """
        employer_rebates = manufacturer_rebates - pbm_retained_rebates - pbm_admin_fee_on_rebates
        pass_through_pct = employer_rebates / manufacturer_rebates if manufacturer_rebates > 0 else 0
        
        # Industry benchmarks
        best_in_class_passthrough = 0.98  # 98%
        typical_passthrough = 0.90  # 90%
        
        if pass_through_pct >= best_in_class_passthrough:
            rating = "Excellent"
        elif pass_through_pct >= typical_passthrough:
            rating = "Good"
        elif pass_through_pct >= 0.80:
            rating = "Fair"
        else:
            rating = "Poor"
        
        opportunity = (best_in_class_passthrough - pass_through_pct) * manufacturer_rebates
        
        return {
            "manufacturer_rebates": manufacturer_rebates,
            "pbm_retained": pbm_retained_rebates,
            "employer_received": employer_rebates,
            "pass_through_pct": pass_through_pct,
            "best_in_class_benchmark": best_in_class_passthrough,
            "rating": rating,
            "opportunity_amount": opportunity if opportunity > 0 else 0
        }
    
    def formulary_rebate_optimization(
        self,
        drug_a_cost: float,
        drug_a_rebate: float,
        drug_b_cost: float,
        drug_b_rebate: float,
        claims_volume: int
    ) -> Dict[str, any]:
        """
        Compare net cost of therapeutically equivalent drugs
        """
        # Net costs
        drug_a_net = drug_a_cost - drug_a_rebate
        drug_b_net = drug_b_cost - drug_b_rebate
        
        # Annual impact
        drug_a_annual = drug_a_net * claims_volume
        drug_b_annual = drug_b_net * claims_volume
        
        savings = abs(drug_a_annual - drug_b_annual)
        preferred_drug = "Drug A" if drug_a_net < drug_b_net else "Drug B"
        
        return {
            "drug_a_gross_cost": drug_a_cost,
            "drug_a_rebate": drug_a_rebate,
            "drug_a_net_cost": drug_a_net,
            "drug_b_gross_cost": drug_b_cost,
            "drug_b_rebate": drug_b_rebate,
            "drug_b_net_cost": drug_b_net,
            "preferred_drug": preferred_drug,
            "annual_savings_opportunity": savings,
            "recommendation": f"Favor {preferred_drug} on formulary"
        }
    
    def rebate_guarantee_performance(
        self,
        guaranteed_rebate_pmpm: float,
        actual_rebate_pmpm: float,
        members: int,
        contract_months: int = 12
    ) -> Dict[str, float]:
        """
        Analyze performance vs guaranteed rebates
        """
        guaranteed_total = guaranteed_rebate_pmpm * members * contract_months
        actual_total = actual_rebate_pmpm * members * contract_months
        
        variance = actual_total - guaranteed_total
        variance_pct = variance / guaranteed_total if guaranteed_total > 0 else 0
        
        if variance >= 0:
            status = "Guarantee Met"
        else:
            status = "Shortfall"
        
        return {
            "guaranteed_rebate_pmpm": guaranteed_rebate_pmpm,
            "actual_rebate_pmpm": actual_rebate_pmpm,
            "members": members,
            "contract_months": contract_months,
            "guaranteed_total": guaranteed_total,
            "actual_total": actual_total,
            "variance": variance,
            "variance_pct": variance_pct,
            "status": status
        }
    
    def rebate_lag_impact(
        self,
        monthly_rebates: float,
        payment_lag_months: int = 3
    ) -> Dict[str, float]:
        """
        Calculate cash flow impact of rebate payment delays
        """
        # Opportunity cost of delayed rebates
        annual_interest_rate = 0.05  # 5% assumed cost of capital
        monthly_rate = annual_interest_rate / 12
        
        # Rebates in transit
        rebates_in_transit = monthly_rebates * payment_lag_months
        
        # Opportunity cost
        monthly_opportunity_cost = rebates_in_transit * monthly_rate
        annual_opportunity_cost = monthly_opportunity_cost * 12
        
        return {
            "monthly_rebates": monthly_rebates,
            "payment_lag_months": payment_lag_months,
            "rebates_in_transit": rebates_in_transit,
            "monthly_opportunity_cost": monthly_opportunity_cost,
            "annual_opportunity_cost": annual_opportunity_cost,
            "recommendation": "Negotiate shorter payment terms" if payment_lag_months > 2 else "Acceptable"
        }