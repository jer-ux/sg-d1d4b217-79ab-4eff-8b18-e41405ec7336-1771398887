"""
KINCAID HEALTH™ SIMULATION ENGINE
Confidence Interval Calculator
"""

from typing import Dict, Any, Tuple
import numpy as np
from scipy import stats


class ConfidenceIntervalCalculator:
    """
    Calculate confidence intervals for various statistics
    """
    
    @staticmethod
    def mean_ci(
        data: np.ndarray,
        confidence: float = 0.95
    ) -> Dict[str, float]:
        """
        Calculate confidence interval for mean
        
        Args:
            data: Array of values
            confidence: Confidence level (e.g., 0.95 for 95%)
            
        Returns:
            Mean and confidence interval
        """
        mean = np.mean(data)
        sem = stats.sem(data)
        ci = stats.t.interval(confidence, len(data)-1, loc=mean, scale=sem)
        
        return {
            'mean': float(mean),
            'lower_bound': float(ci[0]),
            'upper_bound': float(ci[1]),
            'confidence_level': confidence,
            'margin_of_error': float(ci[1] - mean)
        }
    
    @staticmethod
    def median_ci(
        data: np.ndarray,
        confidence: float = 0.95
    ) -> Dict[str, float]:
        """
        Calculate bootstrap confidence interval for median
        
        Args:
            data: Array of values
            confidence: Confidence level
            
        Returns:
            Median and confidence interval
        """
        # Bootstrap method
        n_bootstrap = 10000
        bootstrap_medians = []
        
        for _ in range(n_bootstrap):
            sample = np.random.choice(data, size=len(data), replace=True)
            bootstrap_medians.append(np.median(sample))
        
        bootstrap_medians = np.array(bootstrap_medians)
        alpha = (1 - confidence) / 2
        
        return {
            'median': float(np.median(data)),
            'lower_bound': float(np.percentile(bootstrap_medians, alpha * 100)),
            'upper_bound': float(np.percentile(bootstrap_medians, (1 - alpha) * 100)),
            'confidence_level': confidence
        }
    
    @staticmethod
    def percentile_ci(
        data: np.ndarray,
        percentile: float,
        confidence: float = 0.95
    ) -> Dict[str, float]:
        """
        Calculate confidence interval for a percentile
        
        Args:
            data: Array of values
            percentile: Target percentile (e.g., 95 for 95th percentile)
            confidence: Confidence level
            
        Returns:
            Percentile and confidence interval
        """
        # Bootstrap method
        n_bootstrap = 10000
        bootstrap_percentiles = []
        
        for _ in range(n_bootstrap):
            sample = np.random.choice(data, size=len(data), replace=True)
            bootstrap_percentiles.append(np.percentile(sample, percentile))
        
        bootstrap_percentiles = np.array(bootstrap_percentiles)
        alpha = (1 - confidence) / 2
        
        return {
            'percentile': percentile,
            'value': float(np.percentile(data, percentile)),
            'lower_bound': float(np.percentile(bootstrap_percentiles, alpha * 100)),
            'upper_bound': float(np.percentile(bootstrap_percentiles, (1 - alpha) * 100)),
            'confidence_level': confidence
        }
    
    @staticmethod
    def proportion_ci(
        successes: int,
        trials: int,
        confidence: float = 0.95
    ) -> Dict[str, float]:
        """
        Calculate confidence interval for proportion
        
        Args:
            successes: Number of successes
            trials: Total number of trials
            confidence: Confidence level
            
        Returns:
            Proportion and confidence interval
        """
        proportion = successes / trials
        
        # Wilson score interval
        z = stats.norm.ppf(1 - (1 - confidence) / 2)
        denominator = 1 + z**2 / trials
        centre = (proportion + z**2 / (2 * trials)) / denominator
        spread = z * np.sqrt((proportion * (1 - proportion) / trials + z**2 / (4 * trials**2))) / denominator
        
        return {
            'proportion': float(proportion),
            'lower_bound': float(centre - spread),
            'upper_bound': float(centre + spread),
            'confidence_level': confidence,
            'sample_size': trials
        }
    
    @staticmethod
    def prediction_interval(
        data: np.ndarray,
        confidence: float = 0.95
    ) -> Dict[str, float]:
        """
        Calculate prediction interval for next observation
        
        Args:
            data: Historical data
            confidence: Confidence level
            
        Returns:
            Prediction interval
        """
        mean = np.mean(data)
        std = np.std(data, ddof=1)
        n = len(data)
        
        # T-distribution critical value
        t_crit = stats.t.ppf((1 + confidence) / 2, n - 1)
        
        # Prediction interval (wider than confidence interval)
        margin = t_crit * std * np.sqrt(1 + 1/n)
        
        return {
            'mean': float(mean),
            'lower_bound': float(mean - margin),
            'upper_bound': float(mean + margin),
            'confidence_level': confidence,
            'margin': float(margin)
        }