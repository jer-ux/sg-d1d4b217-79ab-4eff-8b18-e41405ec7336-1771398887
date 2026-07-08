"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Credibility Weighting Engine
"""

from typing import Dict, Any
import math


class CredibilityEngine:
    """
    Classical credibility theory implementation
    
    Bühlmann Credibility: Z = sqrt(n / (n + k))
    where k is the credibility constant
    """
    
    def __init__(self, k: int = 1082):
        """
        Initialize with credibility constant
        
        Args:
            k: Credibility constant (1082 for healthcare, 1000 for commercial)
        """
        self.k = k
    
    def calculate_z(self, exposure: int) -> float:
        """
        Calculate credibility factor Z
        
        Args:
            exposure: Number of exposure units (member-months, lives, etc)
            
        Returns:
            Credibility factor between 0 and 1
        """
        return math.sqrt(exposure / (exposure + self.k))
    
    def weighted_average(
        self,
        experience: float,
        manual: float,
        z: float
    ) -> float:
        """
        Blend experience data with manual rates using credibility
        
        Args:
            experience: Experience-based value (from actual data)
            manual: Manual/benchmark value
            z: Credibility factor (0 to 1)
            
        Returns:
            Credibility-weighted average
        """
        return (z * experience) + ((1 - z) * manual)
    
    def full_credibility_standard(
        self,
        claims: int,
        expected_frequency: float = 0.15,
        confidence_level: float = 0.95,
        accuracy: float = 0.05
    ) -> Dict[str, Any]:
        """
        Calculate full credibility standard
        
        Full credibility when:
        n >= (z^2 * variance) / (accuracy^2 * expected^2)
        
        Returns:
            Dictionary with credibility analysis
        """
        # Z-score for confidence level
        z_score = 1.96 if confidence_level == 0.95 else 2.576  # 95% or 99%
        
        # Assume Poisson (variance = mean)
        variance = expected_frequency
        
        # Full credibility standard
        n_required = (z_score ** 2 * variance) / (accuracy ** 2 * expected_frequency ** 2)
        
        # Actual credibility
        if claims >= n_required:
            credibility_pct = 1.0
            status = "Full Credibility"
        else:
            credibility_pct = math.sqrt(claims / n_required)
            status = "Partial Credibility"
        
        return {
            'claims_observed': claims,
            'claims_required_full': round(n_required, 0),
            'credibility_percent': round(credibility_pct, 4),
            'status': status,
            'confidence_level': confidence_level,
            'accuracy_target': accuracy
        }
    
    def classify_credibility(self, z: float) -> str:
        """
        Classify credibility level
        
        Args:
            z: Credibility factor
            
        Returns:
            Classification label
        """
        if z >= 0.90:
            return "Full Credibility"
        elif z >= 0.75:
            return "Substantial Credibility"
        elif z >= 0.50:
            return "Partial Credibility"
        elif z >= 0.25:
            return "Minimal Credibility"
        else:
            return "Insufficient Credibility"