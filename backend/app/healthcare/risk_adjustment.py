"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Risk Adjustment Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class RiskScore:
    member_id: str
    hcc_score: float
    rx_score: float
    composite_score: float
    risk_tier: str


class RiskAdjustmentEngine:
    """
    HCC and RxHCC risk score calculation and population risk stratification
    """
    
    def __init__(self):
        # Simplified HCC weights (actual weights come from CMS)
        self.hcc_weights = {
            "diabetes": 0.318,
            "heart_failure": 0.368,
            "copd": 0.328,
            "cancer": 0.562,
            "kidney_disease": 0.237
        }
        
        self.rxhcc_weights = {
            "diabetes_drugs": 0.186,
            "anticoagulants": 0.291,
            "cancer_drugs": 0.448,
            "hiv_drugs": 0.712
        }
    
    def calculate_risk_score(
        self,
        member_id: str,
        hcc_conditions: List[str],
        rx_conditions: List[str],
        age: int,
        gender: str
    ) -> RiskScore:
        """
        Calculate member risk score using HCC and RxHCC models
        """
        # Base demographic factor
        base_score = 1.0
        if age >= 65:
            base_score += 0.25
        if age >= 75:
            base_score += 0.15
        
        # Sum HCC weights
        hcc_score = sum(self.hcc_weights.get(condition, 0) for condition in hcc_conditions)
        
        # Sum RxHCC weights
        rx_score = sum(self.rxhcc_weights.get(condition, 0) for condition in rx_conditions)
        
        # Composite score
        composite = base_score + hcc_score + (rx_score * 0.5)
        
        # Risk tier
        if composite < 1.0:
            tier = "Low"
        elif composite < 2.0:
            tier = "Medium"
        elif composite < 3.5:
            tier = "High"
        else:
            tier = "Catastrophic"
        
        return RiskScore(
            member_id=member_id,
            hcc_score=hcc_score,
            rx_score=rx_score,
            composite_score=composite,
            risk_tier=tier
        )
    
    def population_risk_distribution(
        self,
        member_scores: List[RiskScore]
    ) -> Dict[str, float]:
        """
        Analyze population risk distribution
        """
        scores = [m.composite_score for m in member_scores]
        
        return {
            "mean_risk_score": float(np.mean(scores)),
            "median_risk_score": float(np.median(scores)),
            "std_dev": float(np.std(scores)),
            "p90": float(np.percentile(scores, 90)),
            "p95": float(np.percentile(scores, 95)),
            "low_risk_pct": len([s for s in member_scores if s.risk_tier == "Low"]) / len(member_scores),
            "high_risk_pct": len([s for s in member_scores if s.risk_tier in ["High", "Catastrophic"]]) / len(member_scores)
        }
    
    def risk_adjusted_pmpm(
        self,
        actual_pmpm: float,
        population_risk_score: float,
        benchmark_risk_score: float = 1.0
    ) -> Dict[str, float]:
        """
        Calculate risk-adjusted PMPM for fair comparisons
        """
        risk_adjustment_factor = population_risk_score / benchmark_risk_score
        risk_adjusted = actual_pmpm / risk_adjustment_factor
        
        return {
            "actual_pmpm": actual_pmpm,
            "population_risk_score": population_risk_score,
            "benchmark_risk_score": benchmark_risk_score,
            "risk_adjusted_pmpm": risk_adjusted,
            "adjustment_factor": risk_adjustment_factor
        }