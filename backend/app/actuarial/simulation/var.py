"""
KINCAID HEALTH™ SIMULATION ENGINE
Value at Risk
"""

import numpy as np


class RiskMetrics:
    
    @staticmethod
    def var(values, confidence=0.95):
        """
        Calculate Value at Risk
        
        Args:
            values: Array of loss values
            confidence: Confidence level (0.95 = 95%)
            
        Returns:
            VaR value
        """
        return float(
            np.percentile(
                values,
                confidence * 100
            )
        )
    
    @staticmethod
    def tvar(values, confidence=0.95):
        """
        Calculate Tail Value at Risk (CVaR)
        
        Args:
            values: Array of loss values
            confidence: Confidence level
            
        Returns:
            Mean of tail losses
        """
        threshold = np.percentile(
            values,
            confidence * 100
        )
        
        tail = values[values >= threshold]
        
        return float(np.mean(tail))