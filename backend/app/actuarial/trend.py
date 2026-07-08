"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Trend Analysis with Evidence Tracking
"""

from typing import Dict, Any, List, Optional
import pandas as pd
import numpy as np
from datetime import datetime

from .interfaces import ModelResult, Assumption


class TrendEngine:
    """
    Healthcare cost trend calculation engine
    """
    
    def __init__(self):
        self.evidence: List[Dict[str, Any]] = []
        self.warnings: List[str] = []
    
    def annual_trend(
        self,
        df: pd.DataFrame,
        column: str,
        date_column: str = 'service_date'
    ) -> ModelResult:
        """
        Calculate annual trend from claims data
        
        Returns geometric mean annual growth rate
        """
        self.evidence = []
        self.warnings = []
        
        try:
            # Extract year from date column
            df['year'] = pd.to_datetime(df[date_column]).dt.year
            
            # Group by year and sum
            yearly = df.groupby('year')[column].sum()
            
            # Calculate year-over-year growth
            yoy_growth = yearly.pct_change()
            
            # Evidence tracking
            self.evidence.append({
                'type': 'data_summary',
                'years': list(yearly.index),
                'annual_totals': list(yearly.values),
                'yoy_growth': list(yoy_growth.values)
            })
            
            # Calculate geometric mean
            valid_growth = yoy_growth.dropna()
            if len(valid_growth) == 0:
                self.warnings.append("Insufficient data for trend calculation")
                geometric_mean = 0.07  # Default to industry standard
            else:
                geometric_mean = (np.prod(1 + valid_growth) ** (1 / len(valid_growth))) - 1
            
            # Validate reasonableness
            if geometric_mean < 0:
                self.warnings.append("Negative trend detected - unusual pattern")
            elif geometric_mean > 0.20:
                self.warnings.append("Very high trend (>20%) - verify data quality")
            
            # Build assumption with provenance
            trend_assumption = Assumption(
                name='calculated_trend',
                value=float(geometric_mean),
                source='historical_claims_analysis',
                effective_date=datetime.now().isoformat(),
                confidence=0.85 if len(valid_growth) >= 2 else 0.50,
                notes=f'Calculated from {len(yearly)} years of data'
            )
            
            return ModelResult(
                name='annual_trend_analysis',
                success=True,
                metrics={
                    'annual_trend': round(geometric_mean, 4),
                    'monthly_trend': round(geometric_mean / 12, 4),
                    'years_analyzed': len(yearly),
                    'volatility': round(float(valid_growth.std()), 4) if len(valid_growth) > 0 else 0.0
                },
                assumptions={
                    'trend': trend_assumption.__dict__
                },
                warnings=self.warnings,
                confidence=trend_assumption.confidence,
                evidence=self.evidence
            )
        
        except Exception as e:
            return ModelResult(
                name='annual_trend_analysis',
                success=False,
                metrics={},
                assumptions={},
                warnings=[f"Trend calculation failed: {str(e)}"],
                confidence=0.0,
                evidence=self.evidence
            )
    
    def rolling_trend(
        self,
        df: pd.DataFrame,
        column: str,
        window_months: int = 12
    ) -> Dict[str, Any]:
        """
        Calculate rolling trend over time
        """
        # Convert to monthly series
        df['month'] = pd.to_datetime(df['service_date']).dt.to_period('M')
        monthly = df.groupby('month')[column].sum()
        
        # Calculate rolling average
        rolling_avg = monthly.rolling(window=window_months).mean()
        
        # Calculate trend
        rolling_trend = rolling_avg.pct_change(periods=window_months)
        
        return {
            'monthly_values': list(monthly.values),
            'rolling_average': list(rolling_avg.values),
            'rolling_trend': list(rolling_trend.values),
            'periods': [str(p) for p in monthly.index]
        }
    
    def seasonal_adjustment(
        self,
        df: pd.DataFrame,
        column: str
    ) -> Dict[str, Any]:
        """
        Calculate seasonal factors by month
        """
        df['month'] = pd.to_datetime(df['service_date']).dt.month
        
        # Calculate monthly averages
        monthly_avg = df.groupby('month')[column].mean()
        overall_avg = df[column].mean()
        
        # Seasonal factors
        seasonal_factors = monthly_avg / overall_avg
        
        return {
            'seasonal_factors': seasonal_factors.to_dict(),
            'peak_month': int(seasonal_factors.idxmax()),
            'low_month': int(seasonal_factors.idxmin()),
            'seasonality_range': float(seasonal_factors.max() - seasonal_factors.min())
        }
    
    def trend_with_credibility(
        self,
        data_trend: float,
        benchmark_trend: float,
        credibility_weight: float
    ) -> float:
        """
        Blend data-driven trend with benchmark using credibility
        """
        return (credibility_weight * data_trend) + ((1 - credibility_weight) * benchmark_trend)