"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Stop-Loss Pricing Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict


@dataclass
class StopLossPricing:
    specific_attachment: float
    aggregate_attachment: float
    specific_premium_rate: float
    aggregate_premium_rate: float
    total_premium: float
    expected_claims_above_attachment: float


class StopLossPricingEngine:
    """
    Stop-loss insurance pricing and expected reimbursement estimation
    """
    
    def price_specific_stop_loss(
        self,
        attachment_point: float,
        population: int,
        avg_claims_pmpm: float,
        large_claim_frequency: float = 0.015
    ) -> Dict[str, float]:
        """
        Price specific stop-loss coverage
        
        Args:
            attachment_point: Individual claim threshold (e.g., $150,000)
            population: Covered lives
            avg_claims_pmpm: Average claims per member per month
            large_claim_frequency: % of members expected to exceed attachment
        """
        annual_claims = avg_claims_pmpm * population * 12
        
        # Expected claims above attachment
        expected_large_claimants = population * large_claim_frequency
        avg_claim_above_attachment = attachment_point * 0.35  # Average excess
        expected_reimbursement = expected_large_claimants * avg_claim_above_attachment
        
        # Add carrier margin and expenses (typically 15-25%)
        margin_factor = 1.20
        premium = expected_reimbursement * margin_factor
        
        # Per employee per month rate
        pepm = premium / (population * 12)
        
        return {
            "attachment_point": attachment_point,
            "expected_reimbursement": expected_reimbursement,
            "annual_premium": premium,
            "pepm_rate": pepm,
            "expected_loss_ratio": expected_reimbursement / premium if premium > 0 else 0,
            "expected_large_claimants": expected_large_claimants
        }
    
    def price_aggregate_stop_loss(
        self,
        expected_claims: float,
        attachment_corridor: float = 1.25,
        population: int = 1000
    ) -> Dict[str, float]:
        """
        Price aggregate stop-loss coverage
        
        Args:
            expected_claims: Expected annual claims
            attachment_corridor: Attachment as % of expected (e.g., 125%)
            population: Covered lives
        """
        attachment = expected_claims * attachment_corridor
        
        # Estimate probability of exceeding attachment
        # Using normal approximation
        cv = 0.15  # Coefficient of variation
        std_dev = expected_claims * cv
        z_score = (attachment - expected_claims) / std_dev
        prob_exceed = 1 - 0.5 * (1 + np.math.erf(z_score / np.sqrt(2)))
        
        # Expected reimbursement
        # Simplified: assume 10% average excess when exceeded
        expected_reimbursement = prob_exceed * expected_claims * 0.10
        
        # Add margin
        margin_factor = 1.15
        premium = expected_reimbursement * margin_factor
        
        return {
            "expected_claims": expected_claims,
            "attachment_point": attachment,
            "attachment_corridor": attachment_corridor,
            "probability_exceeding": prob_exceed,
            "expected_reimbursement": expected_reimbursement,
            "annual_premium": premium,
            "pepm_rate": premium / (population * 12)
        }
    
    def combined_stop_loss_quote(
        self,
        population: int,
        avg_pmpm: float,
        specific_attachment: float = 150000,
        aggregate_corridor: float = 1.25
    ) -> Dict[str, float]:
        """
        Quote combined specific and aggregate stop-loss
        """
        # Specific coverage
        specific = self.price_specific_stop_loss(
            attachment_point=specific_attachment,
            population=population,
            avg_claims_pmpm=avg_pmpm
        )
        
        # Aggregate coverage
        expected_annual_claims = avg_pmpm * population * 12
        aggregate = self.price_aggregate_stop_loss(
            expected_claims=expected_annual_claims,
            attachment_corridor=aggregate_corridor,
            population=population
        )
        
        total_premium = specific["annual_premium"] + aggregate["annual_premium"]
        total_pepm = specific["pepm_rate"] + aggregate["pepm_rate"]
        
        return {
            "specific_attachment": specific_attachment,
            "specific_premium": specific["annual_premium"],
            "specific_pepm": specific["pepm_rate"],
            "aggregate_corridor": aggregate_corridor,
            "aggregate_attachment": aggregate["attachment_point"],
            "aggregate_premium": aggregate["annual_premium"],
            "aggregate_pepm": aggregate["pepm_rate"],
            "total_premium": total_premium,
            "total_pepm": total_pepm
        }