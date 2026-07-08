"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Plan Design Simulator
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class PlanDesign:
    deductible: float
    coinsurance: float
    out_of_pocket_max: float
    copay_primary: float
    copay_specialist: float
    copay_er: float


class PlanDesignSimulator:
    """
    Model financial impact of plan design changes
    """
    
    def deductible_impact(
        self,
        current_deductible: float,
        proposed_deductible: float,
        claims_below_deductible: float,
        total_claims: float
    ) -> Dict[str, float]:
        """
        Calculate impact of deductible change
        """
        # Estimate shift in cost responsibility
        deductible_increase = proposed_deductible - current_deductible
        
        # Assume 40% of claims fall in deductible range
        affected_claims_pct = 0.40
        affected_claims = total_claims * affected_claims_pct
        
        # Employer savings (employee pays more)
        employer_savings = deductible_increase * affected_claims_pct
        employee_cost_increase = employer_savings
        
        return {
            "current_deductible": current_deductible,
            "proposed_deductible": proposed_deductible,
            "deductible_increase": deductible_increase,
            "affected_claims_pct": affected_claims_pct,
            "employer_savings": employer_savings,
            "employee_cost_increase": employee_cost_increase,
            "net_plan_cost_reduction": employer_savings
        }
    
    def coinsurance_impact(
        self,
        current_coinsurance: float,
        proposed_coinsurance: float,
        claims_in_coinsurance_range: float
    ) -> Dict[str, float]:
        """
        Model impact of coinsurance changes
        """
        coinsurance_change = proposed_coinsurance - current_coinsurance
        
        # Calculate cost shift
        employer_cost_reduction = claims_in_coinsurance_range * (-coinsurance_change)
        employee_cost_increase = claims_in_coinsurance_range * coinsurance_change
        
        return {
            "current_coinsurance": current_coinsurance,
            "proposed_coinsurance": proposed_coinsurance,
            "claims_in_range": claims_in_coinsurance_range,
            "employer_savings": employer_cost_reduction,
            "employee_cost_increase": employee_cost_increase
        }
    
    def out_of_pocket_max_impact(
        self,
        current_oop_max: float,
        proposed_oop_max: float,
        members_hitting_oop: int,
        avg_claims_above_oop: float
    ) -> Dict[str, float]:
        """
        Analyze OOP maximum changes
        """
        oop_increase = proposed_oop_max - current_oop_max
        
        # Members hitting OOP pay more before reaching max
        total_employee_increase = members_hitting_oop * oop_increase
        
        # Employer pays less
        employer_savings = total_employee_increase
        
        return {
            "current_oop_max": current_oop_max,
            "proposed_oop_max": proposed_oop_max,
            "oop_increase": oop_increase,
            "members_hitting_oop": members_hitting_oop,
            "total_employee_increase": total_employee_increase,
            "employer_savings": employer_savings
        }
    
    def copay_tier_modeling(
        self,
        current_copays: Dict[str, float],
        proposed_copays: Dict[str, float],
        visit_volumes: Dict[str, int]
    ) -> Dict[str, any]:
        """
        Model copay structure changes
        """
        copay_changes = {}
        total_employer_savings = 0
        total_employee_increase = 0
        
        for service, proposed in proposed_copays.items():
            current = current_copays.get(service, 0)
            change = proposed - current
            volume = visit_volumes.get(service, 0)
            
            impact = change * volume
            total_employer_savings += impact
            total_employee_increase += impact
            
            copay_changes[service] = {
                "current_copay": current,
                "proposed_copay": proposed,
                "change": change,
                "annual_visits": volume,
                "annual_impact": impact
            }
        
        return {
            "copay_changes": copay_changes,
            "total_employer_savings": total_employer_savings,
            "total_employee_increase": total_employee_increase
        }
    
    def hdhp_conversion_analysis(
        self,
        traditional_plan_cost: float,
        hdhp_premium_savings: float,
        employer_hsa_contribution: float,
        utilization_reduction_pct: float = 0.15
    ) -> Dict[str, float]:
        """
        Analyze conversion to high-deductible health plan
        """
        # Expected utilization reduction
        utilization_savings = traditional_plan_cost * utilization_reduction_pct
        
        # Net employer savings
        gross_savings = hdhp_premium_savings + utilization_savings
        net_savings = gross_savings - employer_hsa_contribution
        
        return {
            "traditional_plan_cost": traditional_plan_cost,
            "hdhp_premium_savings": hdhp_premium_savings,
            "utilization_reduction": utilization_savings,
            "employer_hsa_contribution": employer_hsa_contribution,
            "gross_savings": gross_savings,
            "net_employer_savings": net_savings,
            "roi": net_savings / employer_hsa_contribution if employer_hsa_contribution > 0 else 0
        }
    
    def value_based_design_impact(
        self,
        total_pharmacy_spend: float,
        chronic_medication_spend: float,
        copay_reduction_pct: float = 0.50,
        adherence_improvement: float = 0.12,
        downstream_medical_savings_ratio: float = 3.0
    ) -> Dict[str, float]:
        """
        Model value-based insurance design (VBID) for chronic medications
        """
        # Increased Rx costs from lower copays
        increased_rx_cost = chronic_medication_spend * copay_reduction_pct
        
        # Improved adherence leads to medical cost savings
        medical_savings = increased_rx_cost * downstream_medical_savings_ratio * adherence_improvement
        
        # Net savings
        net_savings = medical_savings - increased_rx_cost
        
        return {
            "total_pharmacy_spend": total_pharmacy_spend,
            "chronic_medication_spend": chronic_medication_spend,
            "increased_rx_cost": increased_rx_cost,
            "adherence_improvement": adherence_improvement,
            "medical_savings": medical_savings,
            "net_savings": net_savings,
            "roi": medical_savings / increased_rx_cost if increased_rx_cost > 0 else 0
        }