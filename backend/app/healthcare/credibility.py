"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Credibility Weighting Engine
"""

import numpy as np
from typing import Dict


class CredibilityEngine:
    """
    Actuarial credibility calculations for experience rating
    """
    
    def buhlmann_credibility(
        self,
        claims: float,
        exposures: int,
        variance_within: float,
        variance_between: float
    ) -> Dict[str, float]:
        """
        Bühlmann credibility formula
        
        Z = n / (n + k)
        where k = E[Variance] / Var[Mean]
        """
        # Calculate k parameter
        k = variance_within / variance_between if variance_between > 0 else float('inf')
        
        # Credibility
        z = exposures / (exposures + k) if k != float('inf') else 0
        
        return {
            "exposures": exposures,
            "variance_within": variance_within,
            "variance_between": variance_between,
            "k_parameter": k,
            "credibility": z,
            "complement": 1 - z
        }
    
    def limited_fluctuation_credibility(
        self,
        claim_count: int,
        expected_frequency: float,
        severity_cv: float,
        accuracy: float = 0.05,
        probability: float = 0.90
    ) -> Dict[str, any]:
        """
        Limited fluctuation credibility (classical method)
        
        Based on achieving desired accuracy with given probability
        """
        # Required number of claims for full credibility
        from scipy.stats import norm
        z_score = norm.ppf((1 + probability) / 2)
        
        # Formula: n = (z * CV / r)²
        # where r = accuracy, CV = coefficient of variation
        cv = severity_cv  # Coefficient of variation of severity
        n_full = (z_score * cv / accuracy) ** 2
        
        # Partial credibility
        credibility = np.sqrt(claim_count / n_full) if claim_count < n_full else 1.0
        credibility = min(credibility, 1.0)
        
        return {
            "claim_count": claim_count,
            "required_for_full": n_full,
            "credibility": credibility,
            "accuracy_level": accuracy,
            "probability_level": probability,
            "full_credibility_achieved": claim_count >= n_full
        }
    
    def experience_rating(
        self,
        manual_rate: float,
        actual_experience: float,
        exposures: int,
        credibility: float = None
    ) -> Dict[str, float]:
        """
        Calculate experience-rated premium
        
        Rate = Z × Actual + (1-Z) × Manual
        """
        if credibility is None:
            # Simple credibility based on exposures
            credibility = min(exposures / 1000, 1.0)  # Full cred at 1000 exposures
        
        experience_rate = credibility * actual_experience + (1 - credibility) * manual_rate
        
        # Rate change
        rate_change = (experience_rate - manual_rate) / manual_rate if manual_rate > 0 else 0
        
        return {
            "manual_rate": manual_rate,
            "actual_experience": actual_experience,
            "exposures": exposures,
            "credibility": credibility,
            "experience_rate": experience_rate,
            "rate_change_pct": rate_change,
            "experience_weight": credibility,
            "manual_weight": 1 - credibility
        }
    
    def group_size_credibility(
        self,
        group_size: int
    ) -> Dict[str, float]:
        """
        Standard group size credibility table
        
        Industry standard credibility factors by group size
        """
        if group_size < 50:
            z = 0.0
        elif group_size < 100:
            z = 0.1
        elif group_size < 250:
            z = 0.2
        elif group_size < 500:
            z = 0.3
        elif group_size < 1000:
            z = 0.5
        elif group_size < 2500:
            z = 0.7
        elif group_size < 5000:
            z = 0.9
        else:
            z = 1.0
        
        return {
            "group_size": group_size,
            "credibility": z,
            "manual_weight": 1 - z,
            "classification": self._classify_group_size(group_size)
        }
    
    def _classify_group_size(self, size: int) -> str:
        """Classify group size"""
        if size < 50:
            return "Small Group (No Credibility)"
        elif size < 500:
            return "Mid-Size Group (Partial Credibility)"
        elif size < 5000:
            return "Large Group (High Credibility)"
        else:
            return "Jumbo Group (Full Credibility)"
    
    def trend_credibility(
        self,
        months_of_data: int,
        data_quality_score: float = 1.0
    ) -> Dict[str, float]:
        """
        Credibility of trend estimates based on data period length
        """
        # Base credibility on months (full cred at 36 months)
        base_cred = min(months_of_data / 36, 1.0)
        
        # Adjust for data quality
        credibility = base_cred * data_quality_score
        
        return {
            "months_of_data": months_of_data,
            "data_quality_score": data_quality_score,
            "base_credibility": base_cred,
            "adjusted_credibility": credibility,
            "recommendation": "Use with caution" if credibility < 0.5 else "Acceptable" if credibility < 0.8 else "Highly Credible"
        }