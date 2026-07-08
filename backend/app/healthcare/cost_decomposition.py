"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Cost Driver Decomposition Engine
"""

import numpy as np
from typing import Dict, List, Tuple


class CostDecompositionEngine:
    """
    Decompose healthcare costs into granular drivers
    """
    
    def decompose_pmpm(
        self,
        total_pmpm: float,
        member_months: int
    ) -> Dict[str, float]:
        """
        Decompose PMPM into standard categories
        """
        # Industry standard distribution
        inpatient = total_pmpm * 0.35
        outpatient = total_pmpm * 0.25
        professional = total_pmpm * 0.20
        pharmacy = total_pmpm * 0.15
        other = total_pmpm * 0.05
        
        return {
            "total_pmpm": total_pmpm,
            "inpatient_pmpm": inpatient,
            "outpatient_pmpm": outpatient,
            "professional_pmpm": professional,
            "pharmacy_pmpm": pharmacy,
            "other_pmpm": other,
            "member_months": member_months,
            "total_cost": total_pmpm * member_months
        }
    
    def frequency_severity_decomposition(
        self,
        total_cost: float,
        claim_count: int,
        member_months: int
    ) -> Dict[str, float]:
        """
        Decompose into frequency and severity
        
        Cost = Frequency × Severity
        """
        # Frequency (claims per 1000 members per month)
        frequency = (claim_count / member_months * 1000) if member_months > 0 else 0
        
        # Severity (average cost per claim)
        severity = (total_cost / claim_count) if claim_count > 0 else 0
        
        # Cost per member per month
        pmpm = (total_cost / member_months) if member_months > 0 else 0
        
        return {
            "total_cost": total_cost,
            "claim_count": claim_count,
            "member_months": member_months,
            "frequency_per_1000": frequency,
            "severity_per_claim": severity,
            "pmpm": pmpm,
            "verification": frequency * severity / 1000  # Should equal PMPM
        }
    
    def cohort_cost_analysis(
        self,
        age_bands: Dict[str, Dict[str, float]]
    ) -> List[Dict[str, any]]:
        """
        Analyze cost by age cohort
        
        age_bands = {
            "0-17": {"members": 50, "total_cost": 25000},
            "18-34": {"members": 120, "total_cost": 80000},
            ...
        }
        """
        results = []
        total_members = sum(band["members"] for band in age_bands.values())
        total_cost = sum(band["total_cost"] for band in age_bands.values())
        overall_pmpm = (total_cost / total_members / 12) if total_members > 0 else 0
        
        for age_range, data in age_bands.items():
            members = data["members"]
            cost = data["total_cost"]
            pmpm = (cost / members / 12) if members > 0 else 0
            
            results.append({
                "age_range": age_range,
                "members": members,
                "pct_of_population": (members / total_members) if total_members > 0 else 0,
                "total_cost": cost,
                "pct_of_cost": (cost / total_cost) if total_cost > 0 else 0,
                "pmpm": pmpm,
                "relative_cost_index": (pmpm / overall_pmpm) if overall_pmpm > 0 else 0
            })
        
        return results
    
    def high_cost_claimant_impact(
        self,
        total_cost: float,
        high_cost_threshold: float,
        high_cost_claimants: int,
        high_cost_total: float,
        total_members: int
    ) -> Dict[str, float]:
        """
        Analyze impact of high-cost claimants
        """
        high_cost_pct = (high_cost_total / total_cost) if total_cost > 0 else 0
        member_pct = (high_cost_claimants / total_members) if total_members > 0 else 0
        
        # Concentration ratio
        concentration = high_cost_pct / member_pct if member_pct > 0 else 0
        
        return {
            "total_cost": total_cost,
            "high_cost_threshold": high_cost_threshold,
            "high_cost_claimants": high_cost_claimants,
            "high_cost_total": high_cost_total,
            "high_cost_pct_of_total": high_cost_pct,
            "high_cost_pct_of_members": member_pct,
            "concentration_ratio": concentration,
            "avg_cost_per_high_cost_claimant": high_cost_total / high_cost_claimants if high_cost_claimants > 0 else 0
        }
    
    def chronic_condition_cost_drivers(
        self,
        conditions: Dict[str, Dict[str, float]]
    ) -> List[Dict[str, any]]:
        """
        Decompose costs by chronic condition
        
        conditions = {
            "Diabetes": {"prevalence": 0.08, "pmpm": 650},
            "Hypertension": {"prevalence": 0.12, "pmpm": 480},
            ...
        }
        """
        results = []
        
        for condition, data in conditions.items():
            prevalence = data["prevalence"]
            pmpm = data["pmpm"]
            
            # Contribution to overall PMPM
            weighted_pmpm = prevalence * pmpm
            
            results.append({
                "condition": condition,
                "prevalence": prevalence,
                "pmpm": pmpm,
                "weighted_pmpm_contribution": weighted_pmpm
            })
        
        # Sort by impact
        results = sorted(results, key=lambda x: x["weighted_pmpm_contribution"], reverse=True)
        
        return results
    
    def provider_network_analysis(
        self,
        in_network_cost: float,
        out_of_network_cost: float,
        in_network_utilization: float,
        out_of_network_utilization: float
    ) -> Dict[str, float]:
        """
        Analyze cost differential between network tiers
        """
        total_cost = in_network_cost + out_of_network_cost
        in_network_pct = in_network_cost / total_cost if total_cost > 0 else 0
        
        # Per-unit cost comparison
        in_network_unit = in_network_cost / in_network_utilization if in_network_utilization > 0 else 0
        out_of_network_unit = out_of_network_cost / out_of_network_utilization if out_of_network_utilization > 0 else 0
        
        cost_differential = out_of_network_unit - in_network_unit
        differential_pct = (cost_differential / in_network_unit) if in_network_unit > 0 else 0
        
        # Potential savings if all OON shifted to IN
        potential_savings = out_of_network_utilization * cost_differential
        
        return {
            "in_network_cost": in_network_cost,
            "out_of_network_cost": out_of_network_cost,
            "total_cost": total_cost,
            "in_network_pct": in_network_pct,
            "in_network_unit_cost": in_network_unit,
            "out_of_network_unit_cost": out_of_network_unit,
            "cost_differential": cost_differential,
            "differential_pct": differential_pct,
            "potential_savings": potential_savings
        }