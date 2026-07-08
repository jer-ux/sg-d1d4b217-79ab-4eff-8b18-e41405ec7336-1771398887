"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Completion Factor Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class CompletionFactorSet:
    month_1: float
    month_2: float
    month_3: float
    ultimate: float
    confidence_level: str


class CompletionFactorEngine:
    """
    Claims completion pattern analysis for IBNR estimation
    """
    
    def __init__(self):
        # Default completion factors (cumulative)
        self.default_pattern = {
            1: 0.45,
            2: 0.72,
            3: 0.88,
            4: 0.95,
            5: 0.98,
            6: 0.995,
            12: 1.000
        }
    
    def calculate_completion_factors(
        self,
        paid_claims_by_lag: Dict[int, float],
        ultimate_claims: float = None
    ) -> CompletionFactorSet:
        """
        Calculate completion factors from historical paid claims data
        
        Args:
            paid_claims_by_lag: Dict of {lag_months: cumulative_paid}
            ultimate_claims: Known ultimate claims for closed periods
        """
        if ultimate_claims is None:
            # Estimate ultimate from the latest paid data
            max_lag = max(paid_claims_by_lag.keys())
            ultimate_claims = paid_claims_by_lag[max_lag] / self.default_pattern.get(max_lag, 0.98)
        
        # Calculate cumulative completion factors
        completion_factors = {}
        for lag, paid in sorted(paid_claims_by_lag.items()):
            completion_factors[lag] = paid / ultimate_claims
        
        return CompletionFactorSet(
            month_1=completion_factors.get(1, self.default_pattern[1]),
            month_2=completion_factors.get(2, self.default_pattern[2]),
            month_3=completion_factors.get(3, self.default_pattern[3]),
            ultimate=1.0,
            confidence_level="Medium"  # Based on data volume
        )
    
    def estimate_ibnr(
        self,
        incurred_month: str,
        paid_to_date: float,
        lag_months: int
    ) -> Dict[str, float]:
        """
        Estimate IBNR for a specific incurred month
        
        Args:
            incurred_month: Month claims were incurred
            paid_to_date: Claims paid so far
            lag_months: Months since incurral
        """
        # Get completion factor for this lag
        completion_factor = self.default_pattern.get(lag_months, 0.95)
        
        # Ultimate = Paid / Completion Factor
        estimated_ultimate = paid_to_date / completion_factor
        
        # IBNR = Ultimate - Paid
        ibnr = estimated_ultimate - paid_to_date
        
        return {
            "incurred_month": incurred_month,
            "paid_to_date": paid_to_date,
            "lag_months": lag_months,
            "completion_factor": completion_factor,
            "estimated_ultimate": estimated_ultimate,
            "ibnr": ibnr,
            "ibnr_ratio": ibnr / paid_to_date if paid_to_date > 0 else 0
        }
    
    def project_payment_pattern(
        self,
        incurred_claims: float,
        forecast_months: int = 12
    ) -> List[Dict[str, float]]:
        """
        Project monthly payment pattern for newly incurred claims
        """
        projections = []
        cumulative_paid = 0
        
        for month in range(1, forecast_months + 1):
            # Get completion factor
            completion = self.default_pattern.get(month, 1.0)
            
            # Calculate cumulative and incremental paid
            cumulative = incurred_claims * completion
            incremental = cumulative - cumulative_paid
            cumulative_paid = cumulative
            
            projections.append({
                "month": month,
                "incremental_paid": incremental,
                "cumulative_paid": cumulative,
                "pct_complete": completion * 100
            })
        
        return projections