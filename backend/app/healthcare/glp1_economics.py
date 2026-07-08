"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
GLP-1 Economics Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict


@dataclass
class GLP1Impact:
    current_spend: float
    projected_spend: float
    utilization_rate: float
    average_cost_per_user: float
    total_cost_impact: float
    medical_offset: float
    net_cost: float


class GLP1EconomicsEngine:
    """
    GLP-1 drug cost modeling with medical cost offset analysis
    """
    
    def __init__(self):
        self.avg_annual_cost_per_user = 13500  # Typical GLP-1 annual cost
        self.medical_offset_factor = 0.25  # 25% medical cost reduction
    
    def project_glp1_impact(
        self,
        total_population: int,
        current_utilization_rate: float = 0.02,
        projected_utilization_rate: float = 0.05,
        avg_medical_cost_per_eligible: float = 15000,
        years_ahead: int = 3
    ) -> GLP1Impact:
        """
        Project GLP-1 financial impact over time
        
        Args:
            total_population: Total covered lives
            current_utilization_rate: Current % on GLP-1
            projected_utilization_rate: Projected % on GLP-1
            avg_medical_cost_per_eligible: Average annual medical cost for eligible members
            years_ahead: Forecast horizon
        """
        # Current state
        current_users = int(total_population * current_utilization_rate)
        current_spend = current_users * self.avg_annual_cost_per_user
        
        # Projected state
        projected_users = int(total_population * projected_utilization_rate)
        projected_spend = projected_users * self.avg_annual_cost_per_user
        
        # Medical offset (reduced diabetes complications, surgeries, etc.)
        eligible_for_offset = projected_users - current_users
        medical_offset = eligible_for_offset * avg_medical_cost_per_eligible * self.medical_offset_factor
        
        # Net cost impact
        incremental_drug_cost = projected_spend - current_spend
        net_cost = incremental_drug_cost - medical_offset
        
        return GLP1Impact(
            current_spend=current_spend,
            projected_spend=projected_spend,
            utilization_rate=projected_utilization_rate,
            average_cost_per_user=self.avg_annual_cost_per_user,
            total_cost_impact=incremental_drug_cost,
            medical_offset=medical_offset,
            net_cost=net_cost
        )
    
    def roi_analysis(
        self,
        program_cost: float,
        expected_utilization_increase: float,
        population: int
    ) -> Dict[str, float]:
        """
        Calculate ROI of GLP-1 access program
        """
        new_users = int(population * expected_utilization_increase)
        drug_cost = new_users * self.avg_annual_cost_per_user
        medical_savings = new_users * 15000 * self.medical_offset_factor
        
        net_savings = medical_savings - (drug_cost + program_cost)
        roi = (net_savings / program_cost) if program_cost > 0 else 0
        
        return {
            "program_cost": program_cost,
            "new_users": new_users,
            "incremental_drug_cost": drug_cost,
            "medical_savings": medical_savings,
            "net_savings": net_savings,
            "roi": roi,
            "payback_months": (program_cost / (net_savings / 12)) if net_savings > 0 else float('inf')
        }