"""
KINCAID HEALTH™ SIMULATION ENGINE
Confidence Intervals
"""

import numpy as np


class ConfidenceInterval:
    
    @staticmethod
    def calculate(values, alpha=0.95):
        """
        Calculate confidence interval using percentile method
        
        Args:
            values: Array of values
            alpha: Confidence level (default 95%)
            
        Returns:
            Dictionary with lower and upper bounds
        """
        lower = np.percentile(
            values,
            (1 - alpha) / 2 * 100
        )
        
        upper = np.percentile(
            values,
            (1 + alpha) / 2 * 100
        )
        
        return {
            "lower": float(lower),
            "upper": float(upper),
            "confidence": alpha
        }