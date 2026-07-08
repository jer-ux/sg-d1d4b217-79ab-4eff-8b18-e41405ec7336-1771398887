"""
KINCAID HEALTH™ SIMULATION ENGINE
Statistical Analysis Tools
"""

from typing import Dict, Any, List
import numpy as np
from scipy import stats


class StatisticalAnalyzer:
    """
    Advanced statistical analysis for simulation results
    """
    
    @staticmethod
    def descriptive_statistics(data: np.ndarray) -> Dict[str, float]:
        """
        Calculate comprehensive descriptive statistics
        
        Args:
            data: Array of values
            
        Returns:
            Dictionary of statistical measures
        """
        return {
            'count': len(data),
            'mean': float(np.mean(data)),
            'median': float(np.median(data)),
            'mode': float(stats.mode(data, keepdims=True).mode[0]),
            'std': float(np.std(data)),
            'variance': float(np.var(data)),
            'min': float(np.min(data)),
            'max': float(np.max(data)),
            'range': float(np.max(data) - np.min(data)),
            'cv': float(np.std(data) / np.mean(data)),
            'skewness': float(stats.skew(data)),
            'kurtosis': float(stats.kurtosis(data)),
            'iqr': float(np.percentile(data, 75) - np.percentile(data, 25))
        }
    
    @staticmethod
    def percentile_analysis(
        data: np.ndarray,
        percentiles: List[float] = [1, 5, 10, 25, 50, 75, 90, 95, 99]
    ) -> Dict[str, float]:
        """
        Calculate percentiles
        
        Args:
            data: Array of values
            percentiles: List of percentile values
            
        Returns:
            Dictionary of percentiles
        """
        return {
            f'p{int(p)}': float(np.percentile(data, p))
            for p in percentiles
        }
    
    @staticmethod
    def tail_analysis(data: np.ndarray, threshold_percentile: float = 95) -> Dict[str, Any]:
        """
        Analyze tail behavior (extreme values)
        
        Args:
            data: Array of values
            threshold_percentile: Percentile defining tail start
            
        Returns:
            Tail statistics
        """
        threshold = np.percentile(data, threshold_percentile)
        tail_values = data[data >= threshold]
        
        return {
            'threshold': float(threshold),
            'threshold_percentile': threshold_percentile,
            'tail_count': len(tail_values),
            'tail_percentage': float(len(tail_values) / len(data) * 100),
            'tail_mean': float(np.mean(tail_values)),
            'tail_max': float(np.max(tail_values)),
            'excess_over_threshold': float(np.mean(tail_values) - threshold)
        }
    
    @staticmethod
    def distribution_fit_test(data: np.ndarray) -> Dict[str, Any]:
        """
        Test goodness of fit for common distributions
        
        Args:
            data: Array of values
            
        Returns:
            Fit test results
        """
        fits = {}
        
        # Normal distribution
        _, p_normal = stats.normaltest(data)
        fits['normal'] = {
            'p_value': float(p_normal),
            'reject_null': p_normal < 0.05
        }
        
        # Lognormal distribution (if all positive)
        if np.all(data > 0):
            log_data = np.log(data)
            _, p_lognormal = stats.normaltest(log_data)
            fits['lognormal'] = {
                'p_value': float(p_lognormal),
                'reject_null': p_lognormal < 0.05
            }
        
        return fits
    
    @staticmethod
    def outlier_detection(
        data: np.ndarray,
        method: str = 'iqr',
        threshold: float = 1.5
    ) -> Dict[str, Any]:
        """
        Detect outliers using various methods
        
        Args:
            data: Array of values
            method: 'iqr' or 'zscore'
            threshold: Threshold multiplier
            
        Returns:
            Outlier analysis
        """
        if method == 'iqr':
            q1 = np.percentile(data, 25)
            q3 = np.percentile(data, 75)
            iqr = q3 - q1
            lower_bound = q1 - threshold * iqr
            upper_bound = q3 + threshold * iqr
            outliers = data[(data < lower_bound) | (data > upper_bound)]
        else:  # zscore
            z_scores = np.abs(stats.zscore(data))
            outliers = data[z_scores > threshold]
        
        return {
            'method': method,
            'threshold': threshold,
            'outlier_count': len(outliers),
            'outlier_percentage': float(len(outliers) / len(data) * 100),
            'outlier_values': outliers.tolist()
        }
    
    @staticmethod
    def compare_distributions(
        data1: np.ndarray,
        data2: np.ndarray
    ) -> Dict[str, Any]:
        """
        Compare two distributions
        
        Args:
            data1: First dataset
            data2: Second dataset
            
        Returns:
            Comparison statistics
        """
        # T-test
        t_stat, t_pval = stats.ttest_ind(data1, data2)
        
        # Mann-Whitney U test (non-parametric)
        u_stat, u_pval = stats.mannwhitneyu(data1, data2)
        
        # Kolmogorov-Smirnov test
        ks_stat, ks_pval = stats.ks_2samp(data1, data2)
        
        return {
            'sample1_mean': float(np.mean(data1)),
            'sample2_mean': float(np.mean(data2)),
            'mean_difference': float(np.mean(data1) - np.mean(data2)),
            't_test': {
                'statistic': float(t_stat),
                'p_value': float(t_pval),
                'significant': t_pval < 0.05
            },
            'mann_whitney': {
                'statistic': float(u_stat),
                'p_value': float(u_pval),
                'significant': u_pval < 0.05
            },
            'kolmogorov_smirnov': {
                'statistic': float(ks_stat),
                'p_value': float(ks_pval),
                'significant': ks_pval < 0.05
            }
        }