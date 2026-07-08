"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Industry Benchmarking Engine
"""

from typing import Dict, Any
import pandas as pd

from app.actuarial.interfaces import ClaimsData, BenchmarkComparison


class BenchmarkEngine:
    """
    Industry benchmark comparison
    
    Compare plan results to:
    - NHWA (National Health & Wellness Advisors) benchmarks
    - MMIT (Milliman Medical Index)
    - SOA (Society of Actuaries) data
    """
    
    # Industry benchmark PMPM values (illustrative)
    BENCHMARKS = {
        'nhwa': {
            'medical_pmpm': 485,
            'pharmacy_pmpm': 125,
            'total_pmpm': 610
        },
        'mmit': {
            'medical_pmpm': 510,
            'pharmacy_pmpm': 135,
            'total_pmpm': 645
        },
        'soa': {
            'medical_pmpm': 495,
            'pharmacy_pmpm': 130,
            'total_pmpm': 625
        }
    }
    
    def compare_to_benchmark(
        self,
        data: ClaimsData,
        benchmark_source: str = 'nhwa'
    ) -> Dict[str, Any]:
        """
        Compare plan to industry benchmark
        """
        df = pd.DataFrame(data.claims)
        
        # Calculate plan PMPM
        if 'paid_amount' in df.columns and data.member_months > 0:
            plan_pmpm = df['paid_amount'].sum() / data.member_months
        else:
            plan_pmpm = 600
        
        # Get benchmark
        benchmark = self.BENCHMARKS.get(benchmark_source, self.BENCHMARKS['nhwa'])
        benchmark_pmpm = benchmark['total_pmpm']
        
        # Calculate variance
        variance_dollars = plan_pmpm - benchmark_pmpm
        variance_pct = (variance_dollars / benchmark_pmpm) * 100
        
        # Determine percentile rank (simplified)
        if variance_pct <= -10:
            percentile = 10
        elif variance_pct <= -5:
            percentile = 25
        elif variance_pct <= 0:
            percentile = 40
        elif variance_pct <= 5:
            percentile = 60
        elif variance_pct <= 10:
            percentile = 75
        else:
            percentile = 90
        
        # Interpretation
        if variance_pct < -10:
            interpretation = "Significantly below benchmark - excellent performance"
        elif variance_pct < -5:
            interpretation = "Below benchmark - favorable performance"
        elif variance_pct < 5:
            interpretation = "Near benchmark - typical performance"
        elif variance_pct < 10:
            interpretation = "Above benchmark - requires attention"
        else:
            interpretation = "Significantly above benchmark - urgent review needed"
        
        return {
            'plan_pmpm': round(plan_pmpm, 2),
            'benchmark_pmpm': round(benchmark_pmpm, 2),
            'variance_dollars': round(variance_dollars, 2),
            'variance_pct': round(variance_pct, 2),
            'percentile_rank': percentile,
            'interpretation': interpretation,
            'benchmark_source': benchmark_source
        }