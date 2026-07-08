"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Employer Benchmark Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class BenchmarkData:
    metric_name: str
    employer_value: float
    industry_p25: float
    industry_median: float
    industry_p75: float
    best_in_class: float


class EmployerBenchmarkEngine:
    """
    Industry benchmarking, peer group analysis, and performance percentile ranking
    """
    
    def calculate_percentile_ranking(
        self,
        employer_value: float,
        peer_distribution: List[float]
    ) -> Dict[str, any]:
        """
        Calculate where employer ranks vs peers
        """
        if not peer_distribution:
            return {"error": "No peer data available"}
        
        # Calculate percentile
        peer_array = np.array(peer_distribution)
        percentile = (np.sum(peer_array <= employer_value) / len(peer_array)) * 100
        
        # Calculate z-score
        mean = np.mean(peer_array)
        std = np.std(peer_array)
        z_score = (employer_value - mean) / std if std > 0 else 0
        
        # Performance rating
        if percentile >= 75:
            rating = "Top Quartile"
        elif percentile >= 50:
            rating = "Above Median"
        elif percentile >= 25:
            rating = "Below Median"
        else:
            rating = "Bottom Quartile"
        
        return {
            "employer_value": employer_value,
            "peer_mean": mean,
            "peer_median": float(np.median(peer_array)),
            "peer_p25": float(np.percentile(peer_array, 25)),
            "peer_p75": float(np.percentile(peer_array, 75)),
            "percentile_ranking": percentile,
            "z_score": z_score,
            "performance_rating": rating
        }
    
    def multi_metric_scorecard(
        self,
        benchmarks: List[BenchmarkData],
        weights: Dict[str, float] = None
    ) -> Dict[str, any]:
        """
        Create composite scorecard across multiple metrics
        """
        if not benchmarks:
            return {"error": "No benchmark data provided"}
        
        # Default equal weighting
        if not weights:
            weights = {b.metric_name: 1.0 / len(benchmarks) for b in benchmarks}
        
        metric_scores = []
        for benchmark in benchmarks:
            # Score based on position in distribution
            range_span = benchmark.industry_p75 - benchmark.industry_p25
            if range_span > 0:
                # Lower is better for costs
                if "cost" in benchmark.metric_name.lower() or "pmpm" in benchmark.metric_name.lower():
                    score = 1 - ((benchmark.employer_value - benchmark.industry_p25) / range_span)
                else:  # Higher is better for quality metrics
                    score = (benchmark.employer_value - benchmark.industry_p25) / range_span
                
                # Clamp to 0-1
                score = max(0, min(1, score))
            else:
                score = 0.5
            
            metric_scores.append({
                "metric": benchmark.metric_name,
                "employer_value": benchmark.employer_value,
                "industry_median": benchmark.industry_median,
                "score": score,
                "weight": weights.get(benchmark.metric_name, 0)
            })
        
        # Calculate weighted composite score
        composite_score = sum(m["score"] * m["weight"] for m in metric_scores)
        
        if composite_score >= 0.75:
            overall_rating = "Excellent"
        elif composite_score >= 0.60:
            overall_rating = "Good"
        elif composite_score >= 0.40:
            overall_rating = "Fair"
        else:
            overall_rating = "Needs Improvement"
        
        return {
            "metric_scores": metric_scores,
            "composite_score": composite_score,
            "overall_rating": overall_rating
        }
    
    def peer_group_definition(
        self,
        employer_size: int,
        industry: str,
        geography: str,
        funding_type: str
    ) -> Dict[str, any]:
        """
        Define appropriate peer group for benchmarking
        """
        # Size bands
        if employer_size < 100:
            size_band = "Small (1-99)"
        elif employer_size < 500:
            size_band = "Mid (100-499)"
        elif employer_size < 5000:
            size_band = "Large (500-4,999)"
        else:
            size_band = "Jumbo (5,000+)"
        
        # Peer group criteria
        peer_criteria = {
            "size_band": size_band,
            "industry": industry,
            "geography": geography,
            "funding_type": funding_type
        }
        
        # Recommended minimum peer group size
        min_peer_count = 30
        
        return {
            "employer_size": employer_size,
            "size_band": size_band,
            "peer_group_criteria": peer_criteria,
            "minimum_peer_count": min_peer_count,
            "recommendation": f"Compare to {size_band} employers in {industry} industry"
        }
    
    def identify_outliers(
        self,
        employer_value: float,
        peer_mean: float,
        peer_std: float,
        threshold_std: float = 2.0
    ) -> Dict[str, any]:
        """
        Identify statistical outliers requiring investigation
        """
        z_score = (employer_value - peer_mean) / peer_std if peer_std > 0 else 0
        
        is_outlier = abs(z_score) > threshold_std
        
        if is_outlier:
            if z_score > 0:
                direction = "significantly higher"
                concern_level = "High"
            else:
                direction = "significantly lower"
                concern_level = "Review" if z_score < -threshold_std else "Monitor"
        else:
            direction = "within normal range"
            concern_level = "None"
        
        return {
            "employer_value": employer_value,
            "peer_mean": peer_mean,
            "peer_std": peer_std,
            "z_score": z_score,
            "is_outlier": is_outlier,
            "direction": direction,
            "concern_level": concern_level,
            "recommendation": "Investigate root causes" if is_outlier else "Continue monitoring"
        }
    
    def cost_trend_comparison(
        self,
        employer_trend: float,
        industry_median_trend: float,
        best_in_class_trend: float
    ) -> Dict[str, float]:
        """
        Compare cost trend performance
        """
        trend_vs_industry = employer_trend - industry_median_trend
        trend_vs_best = employer_trend - best_in_class_trend
        
        if employer_trend <= best_in_class_trend:
            performance = "Best in Class"
        elif employer_trend <= industry_median_trend:
            performance = "Above Average"
        elif employer_trend <= industry_median_trend + 0.02:
            performance = "Below Average"
        else:
            performance = "Significantly Underperforming"
        
        return {
            "employer_trend": employer_trend,
            "industry_median_trend": industry_median_trend,
            "best_in_class_trend": best_in_class_trend,
            "variance_vs_industry": trend_vs_industry,
            "variance_vs_best": trend_vs_best,
            "performance_rating": performance
        }