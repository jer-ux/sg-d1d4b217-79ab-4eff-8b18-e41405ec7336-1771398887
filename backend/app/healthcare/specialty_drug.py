"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Specialty Drug Forecasting Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import List, Dict


@dataclass
class SpecialtyForecast:
    projected_spend: float
    per_member_per_month: float
    trend_rate: float
    top_conditions: List[Dict[str, float]]
    risk_factors: List[str]


class SpecialtyDrugEngine:
    """
    Specialty drug cost forecasting and pipeline impact analysis
    """
    
    def __init__(self):
        self.specialty_categories = {
            "oncology": 0.35,
            "autoimmune": 0.25,
            "ms_neurology": 0.15,
            "rare_disease": 0.10,
            "hiv_hepatitis": 0.08,
            "other": 0.07
        }
        self.avg_trend = 0.14  # 14% specialty trend
    
    def forecast_specialty_spend(
        self,
        current_specialty_spend: float,
        population: int,
        trend_rate: float = None,
        pipeline_impact: float = 0.03,
        utilization_management_savings: float = 0.05
    ) -> SpecialtyForecast:
        """
        Forecast specialty drug spend with pipeline and UM impact
        
        Args:
            current_specialty_spend: Current annual specialty spend
            population: Total covered lives
            trend_rate: Custom trend (defaults to 14%)
            pipeline_impact: Additional cost from new drug approvals
            utilization_management_savings: Savings from UM programs
        """
        if trend_rate is None:
            trend_rate = self.avg_trend
        
        # Base trend projection
        base_projection = current_specialty_spend * (1 + trend_rate)
        
        # Add pipeline impact
        pipeline_cost = current_specialty_spend * pipeline_impact
        
        # Subtract UM savings
        um_savings = current_specialty_spend * utilization_management_savings
        
        # Net projection
        projected_spend = base_projection + pipeline_cost - um_savings
        
        # PMPM calculation
        pmpm = projected_spend / (population * 12)
        
        # Top conditions by spend
        top_conditions = [
            {"condition": cat, "spend": projected_spend * pct}
            for cat, pct in sorted(
                self.specialty_categories.items(),
                key=lambda x: x[1],
                reverse=True
            )[:5]
        ]
        
        # Risk factors
        risks = []
        if trend_rate > 0.12:
            risks.append("High specialty trend (>12%)")
        if pipeline_impact > 0.05:
            risks.append("Significant pipeline impact expected")
        
        return SpecialtyForecast(
            projected_spend=projected_spend,
            per_member_per_month=pmpm,
            trend_rate=trend_rate + pipeline_impact - utilization_management_savings,
            top_conditions=top_conditions,
            risk_factors=risks
        )
    
    def biosimilar_impact(
        self,
        current_biologic_spend: float,
        biosimilar_adoption_rate: float = 0.40,
        biosimilar_discount: float = 0.35
    ) -> Dict[str, float]:
        """
        Calculate potential savings from biosimilar adoption
        """
        addressable_spend = current_biologic_spend * biosimilar_adoption_rate
        savings = addressable_spend * biosimilar_discount
        
        return {
            "current_biologic_spend": current_biologic_spend,
            "addressable_spend": addressable_spend,
            "potential_savings": savings,
            "savings_rate": (savings / current_biologic_spend),
            "net_spend": current_biologic_spend - savings
        }