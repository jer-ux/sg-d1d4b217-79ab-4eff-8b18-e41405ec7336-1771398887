"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Stop-Loss Optimization Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class StopLossScenario:
    attachment_point: float
    annual_premium: float
    expected_net_cost: float
    risk_retained: float
    risk_transferred: float


class StopLossOptimizer:
    """
    Optimize stop-loss attachment points and evaluate risk transfer economics
    """
    
    def optimize_specific_attachment(
        self,
        population: int,
        avg_pmpm: float,
        attachment_points: List[float] = None
    ) -> List[StopLossScenario]:
        """
        Evaluate multiple specific attachment points
        """
        if attachment_points is None:
            attachment_points = [100000, 125000, 150000, 175000, 200000, 250000]
        
        scenarios = []
        
        for attachment in attachment_points:
            # Estimate premium (simplified)
            large_claim_freq = self._estimate_frequency(attachment, avg_pmpm)
            avg_excess = attachment * 0.30
            expected_reimbursement = population * large_claim_freq * avg_excess
            premium = expected_reimbursement * 1.20  # 20% margin
            
            # Expected net cost (premium - expected reimbursement)
            net_cost = premium - expected_reimbursement
            
            # Risk metrics
            risk_retained = attachment * population * large_claim_freq
            risk_transferred = expected_reimbursement
            
            scenarios.append(StopLossScenario(
                attachment_point=attachment,
                annual_premium=premium,
                expected_net_cost=net_cost,
                risk_retained=risk_retained,
                risk_transferred=risk_transferred
            ))
        
        return scenarios
    
    def _estimate_frequency(self, attachment: float, avg_pmpm: float) -> float:
        """Estimate frequency of claims exceeding attachment"""
        # Simplified model - in practice, use actual claims distribution
        avg_annual = avg_pmpm * 12
        ratio = attachment / avg_annual
        
        if ratio < 5:
            return 0.025
        elif ratio < 10:
            return 0.015
        elif ratio < 20:
            return 0.008
        else:
            return 0.003
    
    def calculate_optimal_attachment(
        self,
        population: int,
        avg_pmpm: float,
        risk_tolerance: str = "medium"
    ) -> Dict[str, float]:
        """
        Calculate optimal attachment point based on risk tolerance
        """
        # Risk tolerance mapping
        tolerance_multipliers = {
            "low": 10,      # 10x average annual cost
            "medium": 15,   # 15x average annual cost
            "high": 25      # 25x average annual cost
        }
        
        multiplier = tolerance_multipliers.get(risk_tolerance, 15)
        avg_annual_cost = avg_pmpm * 12
        optimal_attachment = avg_annual_cost * multiplier
        
        # Round to standard increments
        standard_attachments = [100000, 125000, 150000, 175000, 200000, 250000, 300000]
        optimal_attachment = min(standard_attachments, key=lambda x: abs(x - optimal_attachment))
        
        return {
            "avg_annual_cost_per_member": avg_annual_cost,
            "risk_tolerance": risk_tolerance,
            "multiplier": multiplier,
            "calculated_attachment": optimal_attachment,
            "expected_frequency": self._estimate_frequency(optimal_attachment, avg_pmpm)
        }
    
    def self_fund_vs_fully_insured(
        self,
        population: int,
        fully_insured_premium: float,
        self_funded_claims: float,
        stop_loss_premium: float,
        admin_fees: float = 50000
    ) -> Dict[str, float]:
        """
        Compare self-funded with stop-loss vs fully insured
        """
        # Fully insured total cost
        fi_total = fully_insured_premium
        
        # Self-funded total cost
        sf_total = self_funded_claims + stop_loss_premium + admin_fees
        
        # Savings
        savings = fi_total - sf_total
        savings_pct = (savings / fi_total) if fi_total > 0 else 0
        
        return {
            "fully_insured_premium": fi_total,
            "self_funded_claims": self_funded_claims,
            "stop_loss_premium": stop_loss_premium,
            "admin_fees": admin_fees,
            "self_funded_total": sf_total,
            "savings": savings,
            "savings_pct": savings_pct,
            "recommendation": "Self-Funded" if savings > 0 else "Fully Insured"
        }