"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Employee Contribution Optimizer
"""

import numpy as np
from typing import Dict, List


class ContributionOptimizer:
    """
    Optimize employee contribution strategy for cost-sharing and enrollment
    """
    
    def calculate_optimal_split(
        self,
        total_premium: float,
        employer_budget: float,
        employees: int,
        desired_employee_affordability_pct: float = 0.095
    ) -> Dict[str, float]:
        """
        Calculate optimal employer-employee premium split
        """
        # Per employee premium
        premium_per_employee = total_premium / employees if employees > 0 else 0
        
        # Employer contribution
        employer_contribution_per_employee = employer_budget / employees if employees > 0 else 0
        
        # Employee pays the rest
        employee_contribution_per_employee = premium_per_employee - employer_contribution_per_employee
        
        # Affordability check (ACA: <9.5% of household income)
        affordable = employee_contribution_per_employee / premium_per_employee if premium_per_employee > 0 else 0
        
        return {
            "total_premium": total_premium,
            "employer_budget": employer_budget,
            "employees": employees,
            "premium_per_employee": premium_per_employee,
            "employer_contribution_per_employee": employer_contribution_per_employee,
            "employee_contribution_per_employee": employee_contribution_per_employee,
            "employer_share_pct": employer_contribution_per_employee / premium_per_employee if premium_per_employee > 0 else 0,
            "employee_share_pct": employee_contribution_per_employee / premium_per_employee if premium_per_employee > 0 else 0,
            "aca_affordable": affordable <= desired_employee_affordability_pct
        }
    
    def tier_contribution_strategy(
        self,
        single_premium: float,
        family_premium: float,
        employer_single_pct: float = 0.85,
        employer_family_pct: float = 0.70
    ) -> Dict[str, float]:
        """
        Calculate tiered contribution rates
        """
        employer_single = single_premium * employer_single_pct
        employee_single = single_premium - employer_single
        
        employer_family = family_premium * employer_family_pct
        employee_family = family_premium - employer_family
        
        return {
            "single_premium": single_premium,
            "employer_single_contribution": employer_single,
            "employee_single_contribution": employee_single,
            "employer_single_pct": employer_single_pct,
            "family_premium": family_premium,
            "employer_family_contribution": employer_family,
            "employee_family_contribution": employee_family,
            "employer_family_pct": employer_family_pct
        }
    
    def enrollment_elasticity_model(
        self,
        current_employee_cost: float,
        proposed_employee_cost: float,
        current_enrollment_pct: float = 0.92
    ) -> Dict[str, float]:
        """
        Model enrollment changes based on employee cost
        """
        # Cost increase
        cost_increase_pct = (proposed_employee_cost - current_employee_cost) / current_employee_cost if current_employee_cost > 0 else 0
        
        # Elasticity: -0.3 (for every 1% cost increase, 0.3% enrollment decline)
        elasticity = -0.3
        enrollment_change_pct = cost_increase_pct * elasticity
        
        # Projected enrollment
        projected_enrollment_pct = current_enrollment_pct * (1 + enrollment_change_pct)
        
        return {
            "current_employee_cost": current_employee_cost,
            "proposed_employee_cost": proposed_employee_cost,
            "cost_increase_pct": cost_increase_pct,
            "current_enrollment_pct": current_enrollment_pct,
            "enrollment_change_pct": enrollment_change_pct,
            "projected_enrollment_pct": projected_enrollment_pct,
            "enrollment_decline": current_enrollment_pct - projected_enrollment_pct
        }
    
    def wellness_incentive_ROI(
        self,
        incentive_per_employee: float,
        participation_rate: float,
        medical_savings_per_participant: float,
        employees: int
    ) -> Dict[str, float]:
        """
        Calculate ROI of wellness incentive programs
        """
        total_incentive_cost = incentive_per_employee * participation_rate * employees
        participants = participation_rate * employees
        total_medical_savings = medical_savings_per_participant * participants
        
        net_savings = total_medical_savings - total_incentive_cost
        roi = net_savings / total_incentive_cost if total_incentive_cost > 0 else 0
        
        return {
            "incentive_per_employee": incentive_per_employee,
            "participation_rate": participation_rate,
            "employees": employees,
            "participants": participants,
            "total_incentive_cost": total_incentive_cost,
            "medical_savings_per_participant": medical_savings_per_participant,
            "total_medical_savings": total_medical_savings,
            "net_savings": net_savings,
            "roi": roi
        }
    
    def cost_share_sensitivity(
        self,
        base_employee_contribution: float,
        contribution_scenarios: List[float],
        base_enrollment_rate: float = 0.92
    ) -> List[Dict[str, float]]:
        """
        Sensitivity analysis of contribution rates on enrollment
        """
        elasticity = -0.3
        scenarios = []
        
        for scenario_contribution in contribution_scenarios:
            cost_change_pct = (scenario_contribution - base_employee_contribution) / base_employee_contribution if base_employee_contribution > 0 else 0
            enrollment_change_pct = cost_change_pct * elasticity
            projected_enrollment = base_enrollment_rate * (1 + enrollment_change_pct)
            
            scenarios.append({
                "employee_contribution": scenario_contribution,
                "cost_change_pct": cost_change_pct,
                "projected_enrollment_pct": projected_enrollment,
                "enrollment_loss": base_enrollment_rate - projected_enrollment
            })
        
        return scenarios