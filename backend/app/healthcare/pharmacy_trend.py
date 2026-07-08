"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Pharmacy Trend Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class PharmacyTrendResult:
    total_trend: float
    brand_trend: float
    generic_trend: float
    specialty_trend: float
    rebate_impact: float
    components: Dict[str, float]


class PharmacyTrendEngine:
    """
    Pharmacy cost trend analysis with brand/generic/specialty breakdown
    """
    
    def __init__(self):
        self.brand_mix = 0.25
        self.generic_mix = 0.60
        self.specialty_mix = 0.15
    
    def project_trend(
        self,
        base_pharmacy_spend: float,
        brand_inflation: float = 0.12,
        generic_deflation: float = -0.08,
        specialty_inflation: float = 0.18,
        rebate_rate: float = 0.28,
        utilization_growth: float = 0.03
    ) -> PharmacyTrendResult:
        """
        Project pharmacy trend with mix-adjusted components
        
        Args:
            base_pharmacy_spend: Current annual Rx spend
            brand_inflation: Brand drug unit cost trend
            generic_deflation: Generic drug unit cost trend (typically negative)
            specialty_inflation: Specialty drug inflation
            rebate_rate: Rebate as % of gross spend
            utilization_growth: Script volume growth rate
        """
        # Component trends
        brand_component = self.brand_mix * brand_inflation
        generic_component = self.generic_mix * generic_deflation
        specialty_component = self.specialty_mix * specialty_inflation
        
        # Weighted average trend
        net_unit_cost_trend = brand_component + generic_component + specialty_component
        
        # Total trend = unit cost + utilization + interaction
        total_trend = (1 + net_unit_cost_trend) * (1 + utilization_growth) - 1
        
        # Apply rebate impact
        rebate_adjusted_trend = total_trend * (1 - rebate_rate)
        
        # Project spend
        projected_spend = base_pharmacy_spend * (1 + rebate_adjusted_trend)
        
        return PharmacyTrendResult(
            total_trend=rebate_adjusted_trend,
            brand_trend=brand_inflation,
            generic_trend=generic_deflation,
            specialty_trend=specialty_inflation,
            rebate_impact=rebate_rate,
            components={
                "base_spend": base_pharmacy_spend,
                "projected_spend": projected_spend,
                "brand_component": brand_component,
                "generic_component": generic_component,
                "specialty_component": specialty_component,
                "utilization_growth": utilization_growth,
                "rebate_savings": base_pharmacy_spend * rebate_rate
            }
        )
    
    def simulate_rebate_scenarios(
        self,
        base_spend: float,
        rebate_scenarios: List[float]
    ) -> Dict[str, float]:
        """
        Simulate net cost under different rebate scenarios
        """
        results = {}
        for rate in rebate_scenarios:
            net_cost = base_spend * (1 - rate)
            results[f"rebate_{int(rate*100)}pct"] = net_cost
        return results