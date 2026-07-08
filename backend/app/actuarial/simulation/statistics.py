"""
KINCAID HEALTH™ SIMULATION ENGINE
Summary Statistics
"""

import numpy as np


class SummaryStatistics:
    
    @staticmethod
    def summarize(values):
        """
        Calculate summary statistics
        
        Args:
            values: Array of simulation results
            
        Returns:
            Dictionary of statistics
        """
        return {
            "mean": float(np.mean(values)),
            "median": float(np.median(values)),
            "std": float(np.std(values)),
            "minimum": float(np.min(values)),
            "maximum": float(np.max(values)),
            "cv": float(np.std(values) / np.mean(values)),
            "p25": float(np.percentile(values, 25)),
            "p75": float(np.percentile(values, 75))
        }