"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Financial Forecasting Engine
"""

from typing import Dict, Any, List
import pandas as pd

from app.actuarial.interfaces import ClaimsData


class ForecastEngine:
    """
    Financial forecasting engine
    
    Projects future costs based on:
    - Historical experience
    - Trend assumptions
    - Member months projection
    """
    
    def generate_forecast(
        self,
        data: ClaimsData,
        trend_rate: float,
        periods: int = 12
    ) -> Dict[str, Any]:
        """
        Generate multi-period forecast
        """
        df = pd.DataFrame(data.claims)
        
        # Calculate baseline PMPM
        if 'paid_amount' in df.columns and data.member_months > 0:
            baseline_pmpm = df['paid_amount'].sum() / data.member_months
        else:
            baseline_pmpm = 500  # Default assumption
        
        # Generate period-by-period forecast
        forecast_periods = []
        cumulative_total = 0
        
        for i in range(periods):
            period_number = i + 1
            trend_factor = (1 + trend_rate) ** period_number
            projected_pmpm = baseline_pmpm * trend_factor
            projected_total = projected_pmpm * data.member_months
            cumulative_total += projected_total
            
            forecast_periods.append({
                'period': period_number,
                'pmpm': round(projected_pmpm, 2),
                'total': round(projected_total, 2),
                'cumulative': round(cumulative_total, 2),
                'trend_factor': round(trend_factor, 4)
            })
        
        return {
            'baseline_pmpm': round(baseline_pmpm, 2),
            'expected_pmpm': round(forecast_periods[-1]['pmpm'], 2),
            'forecast_periods': forecast_periods,
            'total_projected': round(cumulative_total, 2),
            'trend_rate': trend_rate
        }