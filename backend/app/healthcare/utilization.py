"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Utilization Analytics Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class UtilizationMetrics:
    admits_per_1000: float
    er_visits_per_1000: float
    outpatient_visits_per_member: float
    office_visits_per_member: float
    rx_scripts_per_member: float
    high_utilizers_pct: float


class UtilizationAnalytics:
    """
    Member utilization pattern analysis and trend forecasting
    """
    
    def __init__(self):
        self.benchmark_admits_per_1000 = 85
        self.benchmark_er_per_1000 = 350
        self.high_utilizer_threshold = 10000  # $10K+ annual cost
    
    def calculate_metrics(
        self,
        population: int,
        inpatient_admits: int,
        er_visits: int,
        outpatient_visits: int,
        office_visits: int,
        rx_scripts: int,
        total_spend: float
    ) -> UtilizationMetrics:
        """
        Calculate standard utilization metrics
        """
        admits_per_1000 = (inpatient_admits / population) * 1000
        er_per_1000 = (er_visits / population) * 1000
        outpatient_per_member = outpatient_visits / population
        office_per_member = office_visits / population
        rx_per_member = rx_scripts / population
        
        # Estimate high utilizers (top 5% of spenders)
        high_util_pct = 0.05  # Simplified assumption
        
        return UtilizationMetrics(
            admits_per_1000=admits_per_1000,
            er_visits_per_1000=er_per_1000,
            outpatient_visits_per_member=outpatient_per_member,
            office_visits_per_member=office_per_member,
            rx_scripts_per_member=rx_per_member,
            high_utilizers_pct=high_util_pct
        )
    
    def benchmark_comparison(
        self,
        metrics: UtilizationMetrics
    ) -> Dict[str, Dict[str, float]]:
        """
        Compare to industry benchmarks
        """
        return {
            "inpatient_admits": {
                "actual": metrics.admits_per_1000,
                "benchmark": self.benchmark_admits_per_1000,
                "variance": metrics.admits_per_1000 - self.benchmark_admits_per_1000,
                "variance_pct": ((metrics.admits_per_1000 / self.benchmark_admits_per_1000) - 1)
            },
            "er_visits": {
                "actual": metrics.er_visits_per_1000,
                "benchmark": self.benchmark_er_per_1000,
                "variance": metrics.er_visits_per_1000 - self.benchmark_er_per_1000,
                "variance_pct": ((metrics.er_visits_per_1000 / self.benchmark_er_per_1000) - 1)
            }
        }
    
    def project_utilization_trend(
        self,
        base_utilization: float,
        population_growth: float,
        aging_impact: float,
        wellness_program_impact: float = -0.03
    ) -> Dict[str, float]:
        """
        Project future utilization with demographic and program impacts
        
        Args:
            base_utilization: Current visits per member
            population_growth: Expected population change rate
            aging_impact: Utilization increase from aging population
            wellness_program_impact: Expected reduction from wellness programs
        """
        # Natural trend
        natural_trend = aging_impact + (population_growth * 0.5)
        
        # Net trend with interventions
        net_trend = natural_trend + wellness_program_impact
        
        projected_utilization = base_utilization * (1 + net_trend)
        
        return {
            "base_utilization": base_utilization,
            "projected_utilization": projected_utilization,
            "natural_trend": natural_trend,
            "wellness_impact": wellness_program_impact,
            "net_trend": net_trend
        }