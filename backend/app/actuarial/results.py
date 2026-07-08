"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Results Formatting & Export
"""

from typing import Dict, Any
import json
from datetime import datetime

from app.actuarial.interfaces import ActuarialResults


class ResultsFormatter:
    """
    Format actuarial results for different audiences
    """
    
    @staticmethod
    def format_for_cfo(results: ActuarialResults) -> Dict[str, Any]:
        """
        CFO War Room format - executive summary
        """
        return {
            'executive_summary': {
                'expected_annual_cost': f"${results.expected_claims:,.0f}",
                'expected_pmpm': f"${results.expected_pmpm:,.2f}",
                'confidence_level': f"{results.credibility_weight * 100:.0f}%",
                'trend_projection': f"{results.projected_trend * 100:.1f}%"
            },
            'risk_profile': {
                'median_outcome': f"${results.percentile_50:,.0f}",
                '95th_percentile': f"${results.percentile_95:,.0f}",
                'worst_case_99th': f"${results.percentile_99:,.0f}"
            },
            'confidence_interval': {
                'lower_bound': f"${results.ci_lower:,.0f}",
                'expected': f"${results.expected_claims:,.0f}",
                'upper_bound': f"${results.ci_upper:,.0f}"
            },
            'data_quality': {
                'score': f"{results.data_quality_score * 100:.0f}%",
                'warnings': results.warnings
            }
        }
    
    @staticmethod
    def format_for_actuary(results: ActuarialResults) -> Dict[str, Any]:
        """
        Actuarial format - detailed technical output
        """
        return {
            'model_metadata': {
                'model_name': results.model_name,
                'execution_timestamp': results.execution_timestamp.isoformat(),
                'assumptions': results.assumptions
            },
            'experience_metrics': {
                'expected_claims': results.expected_claims,
                'expected_pmpm': results.expected_pmpm,
                'credibility_weight': results.credibility_weight,
                'historical_trend': results.historical_trend,
                'projected_trend': results.projected_trend
            },
            'forecast': {
                'periods': results.forecast_periods,
                'total': results.forecast_total
            },
            'risk_distribution': {
                'p50': results.percentile_50,
                'p75': results.percentile_75,
                'p90': results.percentile_90,
                'p95': results.percentile_95,
                'p99': results.percentile_99
            },
            'confidence_intervals': {
                'lower': results.ci_lower,
                'upper': results.ci_upper
            },
            'quality_metrics': {
                'data_quality_score': results.data_quality_score,
                'warnings': results.warnings
            }
        }
    
    @staticmethod
    def export_to_json(results: ActuarialResults, filepath: str):
        """Export results to JSON file"""
        output = ResultsFormatter.format_for_actuary(results)
        with open(filepath, 'w') as f:
            json.dump(output, f, indent=2, default=str)