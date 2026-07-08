"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
PMPM Analytics Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class PMPMAnalysis:
    medical_pmpm: float
    pharmacy_pmpm: float
    total_pmpm: float
    trend_vs_prior: float
    category_breakdown: Dict[str, float]


class PMPMAnalytics:
    """
    Per Member Per Month cost analysis and decomposition
    """
    
    def calculate_pmpm(
        self,
        total_claims: float,
        member_months: int
    ) -> float:
        """Calculate PMPM cost"""
        return total_claims / member_months
    
    def decompose_pmpm(
        self,
        medical_claims: float,
        pharmacy_claims: float,
        member_months: int,
        category_claims: Dict[str, float] = None
    ) -> PMPMAnalysis:
        """
        Decompose PMPM by major categories
        
        Args:
            medical_claims: Total medical claims
            pharmacy_claims: Total Rx claims  
            member_months: Total member months exposure
            category_claims: Optional detailed category breakdown
        """
        medical_pmpm = medical_claims / member_months
        pharmacy_pmpm = pharmacy_claims / member_months
        total_pmpm = (medical_claims + pharmacy_claims) / member_months
        
        # Default category breakdown if not provided
        if category_claims is None:
            category_claims = {
                "inpatient": medical_claims * 0.35,
                "outpatient": medical_claims * 0.30,
                "professional": medical_claims * 0.25,
                "other_medical": medical_claims * 0.10
            }
        
        category_pmpm = {
            cat: (spend / member_months)
            for cat, spend in category_claims.items()
        }
        
        return PMPMAnalysis(
            medical_pmpm=medical_pmpm,
            pharmacy_pmpm=pharmacy_pmpm,
            total_pmpm=total_pmpm,
            trend_vs_prior=0.0,  # Will be calculated with historical data
            category_breakdown=category_pmpm
        )
    
    def trend_analysis(
        self,
        current_pmpm: float,
        prior_pmpm: float,
        months_between: int = 12
    ) -> Dict[str, float]:
        """
        Calculate trend rate between periods
        """
        raw_trend = (current_pmpm / prior_pmpm) - 1.0
        annualized_trend = ((current_pmpm / prior_pmpm) ** (12 / months_between)) - 1.0
        
        return {
            "current_pmpm": current_pmpm,
            "prior_pmpm": prior_pmpm,
            "raw_trend": raw_trend,
            "annualized_trend": annualized_trend,
            "absolute_change": current_pmpm - prior_pmpm
        }
    
    def benchmark_pmpm(
        self,
        actual_pmpm: float,
        region: str = "national",
        plan_type: str = "ppo"
    ) -> Dict[str, float]:
        """
        Compare PMPM to regional benchmarks
        """
        # Simplified benchmark lookup (in production, use actual benchmark database)
        benchmarks = {
            "national_ppo": 450.0,
            "national_hmo": 420.0,
            "midwest_ppo": 430.0,
            "midwest_hmo": 400.0
        }
        
        key = f"{region}_{plan_type}"
        benchmark = benchmarks.get(key, 450.0)
        
        variance = actual_pmpm - benchmark
        variance_pct = (actual_pmpm / benchmark) - 1.0
        
        return {
            "actual_pmpm": actual_pmpm,
            "benchmark_pmpm": benchmark,
            "variance": variance,
            "variance_pct": variance_pct,
            "percentile_ranking": 50.0  # Placeholder - requires benchmark distribution
        }