"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Credibility Weighting Engine
"""

import math
from typing import Dict, Any


class CredibilityEngine:
    """
    Calculate actuarial credibility weights
    
    Uses classical credibility theory:
    Z = sqrt(n / (n + k))
    where n = exposure, k = full credibility standard
    """
    
    def __init__(self, full_credibility_standard: int = 1082):
        self.k = full_credibility_standard
    
    def calculate_credibility(
        self,
        member_months: int,
        claims_count: int
    ) -> Dict[str, Any]:
        """
        Calculate credibility weight
        
        Returns:
            - credibility_weight: 0.0 to 1.0
            - level: 'full', 'partial', 'minimal', 'insufficient'
            - exposure_ratio: actual / required for full credibility
        """
        # Classical credibility formula
        z = math.sqrt(member_months / (member_months + self.k))
        
        # Determine credibility level
        if z >= 0.95:
            level = 'full'
        elif z >= 0.75:
            level = 'substantial'
        elif z >= 0.50:
            level = 'partial'
        elif z >= 0.25:
            level = 'minimal'
        else:
            level = 'insufficient'
        
        # Exposure ratio
        exposure_ratio = member_months / self.k
        
        return {
            'credibility_weight': round(z, 4),
            'level': level,
            'exposure_ratio': round(exposure_ratio, 4),
            'member_months': member_months,
            'claims_count': claims_count,
            'full_credibility_standard': self.k
        }
    
    def blend_with_benchmark(
        self,
        actual_value: float,
        benchmark_value: float,
        credibility_weight: float
    ) -> float:
        """
        Blend actual experience with benchmark using credibility
        
        Blended = (Z × Actual) + ((1 - Z) × Benchmark)
        """
        return (credibility_weight * actual_value) + ((1 - credibility_weight) * benchmark_value)