"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Renewal Projection Engine
"""

import numpy as np
from typing import Dict, List


class RenewalProjectionEngine:
    """
    Healthcare plan renewal modeling, rate projection, and budget forecasting
    """
    
    def project_renewal_rate(
        self,
        current_annual_cost: float,
        medical_trend: float,
        pharmacy_trend: float,
        medical_pct_of_total: float = 0.75,
        pharmacy_pct_of_total: float = 0.25,
        large_claim_impact: float = 0,
        plan_design_changes: float = 0
    ) -> Dict[str, float]:
        """
        Project renewal rate increase
        """
        # Calculate blended trend
        blended_trend = (medical_trend * medical_pct_of_total) + (pharmacy_trend * pharmacy_pct_of_total)
        
        # Add large claim impact
        large_claim_adjustment = large_claim_impact / current_annual_cost if current_annual_cost > 0 else 0
        
        # Total renewal rate
        renewal_rate = blended_trend + large_claim_adjustment + plan_design_changes
        
        # Projected costs
        projected_cost = current_annual_cost * (1 + renewal_rate)
        dollar_increase = projected_cost - current_annual_cost
        
        return {
            "current_annual_cost": current_annual_cost,
            "medical_trend": medical_trend,
            "pharmacy_trend": pharmacy_trend,
            "blended_trend": blended_trend,
            "large_claim_impact": large_claim_impact,
            "large_claim_adjustment": large_claim_adjustment,
            "plan_design_changes": plan_design_changes,
            "total_renewal_rate": renewal_rate,
            "projected_annual_cost": projected_cost,
            "dollar_increase": dollar_increase
        }
    
    def multi_year_projection(
        self,
        base_year_cost: float,
        annual_trend: float,
        years: int = 5
    ) -> List[Dict[str, float]]:
        """
        Project costs over multiple years
        """
        projections = []
        current_cost = base_year_cost
        
        for year in range(1, years + 1):
            projected_cost = current_cost * (1 + annual_trend)
            increase = projected_cost - current_cost
            
            projections.append({
                "year": year,
                "projected_cost": projected_cost,
                "increase_from_prior": increase,
                "cumulative_increase": projected_cost - base_year_cost,
                "cumulative_increase_pct": (projected_cost - base_year_cost) / base_year_cost if base_year_cost > 0 else 0
            })
            
            current_cost = projected_cost
        
        return projections
    
    def renewal_sensitivity_analysis(
        self,
        base_cost: float,
        base_trend: float,
        trend_scenarios: List[float]
    ) -> Dict[str, any]:
        """
        Analyze renewal under different trend scenarios
        """
        scenarios = []
        
        for scenario_trend in trend_scenarios:
            projected = base_cost * (1 + scenario_trend)
            variance = projected - (base_cost * (1 + base_trend))
            
            scenarios.append({
                "trend": scenario_trend,
                "projected_cost": projected,
                "variance_from_base": variance
            })
        
        return {
            "base_cost": base_cost,
            "base_trend": base_trend,
            "scenarios": scenarios
        }
    
    def budget_impact_analysis(
        self,
        current_employer_contribution: float,
        current_employee_contribution: float,
        projected_increase: float,
        employer_share_pct: float = 0.80
    ) -> Dict[str, float]:
        """
        Analyze budget impact on employer and employees
        """
        total_current = current_employer_contribution + current_employee_contribution
        total_projected = total_current + projected_increase
        
        # Split increase based on cost-sharing
        employer_increase = projected_increase * employer_share_pct
        employee_increase = projected_increase * (1 - employer_share_pct)
        
        new_employer_contribution = current_employer_contribution + employer_increase
        new_employee_contribution = current_employee_contribution + employee_increase
        
        return {
            "current_total_cost": total_current,
            "projected_total_cost": total_projected,
            "total_increase": projected_increase,
            "current_employer_contribution": current_employer_contribution,
            "projected_employer_contribution": new_employer_contribution,
            "employer_increase": employer_increase,
            "current_employee_contribution": current_employee_contribution,
            "projected_employee_contribution": new_employee_contribution,
            "employee_increase": employee_increase,
            "employer_share_pct": employer_share_pct
        }