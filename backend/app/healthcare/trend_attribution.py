"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Trend Attribution Engine
"""

import numpy as np
from typing import Dict, List


class TrendAttributionEngine:
    """
    Decompose and attribute healthcare cost trends to root causes
    """
    
    def attribute_medical_trend(
        self,
        total_trend: float,
        unit_cost_change: float,
        utilization_change: float,
        mix_shift: float,
        population_change: float = 0
    ) -> Dict[str, float]:
        """
        Decompose medical trend into components
        
        Total Trend = Unit Cost + Utilization + Mix + Population + Interaction
        """
        # Calculate interaction term (compound effect)
        base_trend = unit_cost_change + utilization_change + mix_shift + population_change
        interaction = total_trend - base_trend
        
        # Attribution percentages
        total_components = abs(unit_cost_change) + abs(utilization_change) + abs(mix_shift) + abs(population_change)
        
        return {
            "total_trend": total_trend,
            "unit_cost_component": unit_cost_change,
            "unit_cost_pct": (unit_cost_change / total_components * 100) if total_components > 0 else 0,
            "utilization_component": utilization_change,
            "utilization_pct": (utilization_change / total_components * 100) if total_components > 0 else 0,
            "mix_shift_component": mix_shift,
            "mix_shift_pct": (mix_shift / total_components * 100) if total_components > 0 else 0,
            "population_component": population_change,
            "population_pct": (population_change / total_components * 100) if total_components > 0 else 0,
            "interaction_term": interaction,
            "primary_driver": self._identify_primary_driver(unit_cost_change, utilization_change, mix_shift, population_change)
        }
    
    def _identify_primary_driver(
        self,
        unit_cost: float,
        utilization: float,
        mix: float,
        population: float
    ) -> str:
        """Identify the largest contributor"""
        components = {
            "Unit Cost Inflation": abs(unit_cost),
            "Utilization Changes": abs(utilization),
            "Service Mix Shift": abs(mix),
            "Population Changes": abs(population)
        }
        return max(components, key=components.get)
    
    def pharmacy_trend_waterfall(
        self,
        base_cost: float,
        brand_inflation: float,
        generic_deflation: float,
        specialty_growth: float,
        rebate_change: float,
        utilization_change: float
    ) -> Dict[str, any]:
        """
        Create pharmacy trend waterfall analysis
        """
        # Build waterfall
        steps = []
        current = base_cost
        
        # Brand inflation
        brand_impact = current * brand_inflation
        current += brand_impact
        steps.append({"component": "Brand Inflation", "impact": brand_impact, "cumulative": current})
        
        # Generic deflation
        generic_impact = current * generic_deflation
        current += generic_impact
        steps.append({"component": "Generic Deflation", "impact": generic_impact, "cumulative": current})
        
        # Specialty growth
        specialty_impact = current * specialty_growth
        current += specialty_impact
        steps.append({"component": "Specialty Growth", "impact": specialty_impact, "cumulative": current})
        
        # Rebate changes
        rebate_impact = current * rebate_change
        current += rebate_impact
        steps.append({"component": "Rebate Changes", "impact": rebate_impact, "cumulative": current})
        
        # Utilization
        util_impact = current * utilization_change
        current += util_impact
        steps.append({"component": "Utilization", "impact": util_impact, "cumulative": current})
        
        total_trend = (current - base_cost) / base_cost if base_cost > 0 else 0
        
        return {
            "base_cost": base_cost,
            "final_cost": current,
            "total_trend": total_trend,
            "waterfall_steps": steps
        }
    
    def service_category_attribution(
        self,
        categories: Dict[str, Dict[str, float]]
    ) -> List[Dict[str, any]]:
        """
        Attribute trend by service category
        
        categories = {
            "Inpatient": {"base_cost": 100k, "trend": 0.08},
            "Outpatient": {"base_cost": 80k, "trend": 0.06},
            ...
        }
        """
        results = []
        total_base = sum(cat["base_cost"] for cat in categories.values())
        total_increase = 0
        
        for name, data in categories.items():
            base = data["base_cost"]
            trend = data["trend"]
            increase = base * trend
            total_increase += increase
            
            results.append({
                "category": name,
                "base_cost": base,
                "trend": trend,
                "dollar_increase": increase,
                "weight": base / total_base if total_base > 0 else 0,
                "contribution_to_total_trend": (increase / total_base) if total_base > 0 else 0
            })
        
        # Sort by contribution
        results = sorted(results, key=lambda x: x["dollar_increase"], reverse=True)
        
        return results
    
    def year_over_year_comparison(
        self,
        prior_year_cost: float,
        current_year_cost: float,
        prior_year_members: int,
        current_year_members: int
    ) -> Dict[str, float]:
        """
        YoY trend analysis with member normalization
        """
        # Total cost change
        total_change = current_year_cost - prior_year_cost
        total_change_pct = total_change / prior_year_cost if prior_year_cost > 0 else 0
        
        # PMPM change
        prior_pmpm = (prior_year_cost / prior_year_members / 12) if prior_year_members > 0 else 0
        current_pmpm = (current_year_cost / current_year_members / 12) if current_year_members > 0 else 0
        pmpm_change = current_pmpm - prior_pmpm
        pmpm_trend = pmpm_change / prior_pmpm if prior_pmpm > 0 else 0
        
        # Member impact
        member_change = current_year_members - prior_year_members
        member_impact = member_change * prior_pmpm * 12
        
        # Trend impact
        trend_impact = total_change - member_impact
        
        return {
            "prior_year_cost": prior_year_cost,
            "current_year_cost": current_year_cost,
            "total_change": total_change,
            "total_change_pct": total_change_pct,
            "prior_pmpm": prior_pmpm,
            "current_pmpm": current_pmpm,
            "pmpm_trend": pmpm_trend,
            "member_change": member_change,
            "member_impact": member_impact,
            "trend_impact": trend_impact,
            "member_contribution": (member_impact / total_change) if total_change != 0 else 0,
            "trend_contribution": (trend_impact / total_change) if total_change != 0 else 0
        }