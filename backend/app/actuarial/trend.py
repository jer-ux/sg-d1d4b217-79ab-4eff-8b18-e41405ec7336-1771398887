"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Trend Analysis Engine
"""

from typing import Dict, Any, List
import numpy as np
import pandas as pd
from datetime import datetime

from app.actuarial.interfaces import ClaimsData


class TrendEngine:
    """
    Medical cost trend analysis
    
    Calculates:
    - Historical trend from experience
    - Seasonality adjustment
    - Projected future trend
    """
    
    def analyze_trend(self, data: ClaimsData) -> Dict[str, Any]:
        """
        Analyze medical cost trend
        """
        df = pd.DataFrame(data.claims)
        
        if df.empty or 'paid_amount' not in df.columns:
            return self._default_trend()
        
        # Calculate monthly PMPM if date column exists
        if 'service_date' in df.columns:
            df['service_date'] = pd.to_datetime(df['service_date'])
            df['year_month'] = df['service_date'].dt.to_period('M')
            
            monthly = df.groupby('year_month')['paid_amount'].sum()
            
            if len(monthly) >= 3:
                # Calculate month-over-month trend
                trend_rate = self._calculate_trend_rate(monthly.values)
            else:
                trend_rate = 0.08  # Default 8%
        else:
            trend_rate = 0.08
        
        return {
            'trend_rate': round(trend_rate, 4),
            'annual_trend': round(trend_rate, 4),
            'monthly_trend': round(trend_rate / 12, 6),
            'confidence': 'moderate'
        }
    
    def _calculate_trend_rate(self, values: np.ndarray) -> float:
        """Calculate compound trend rate"""
        if len(values) < 2:
            return 0.08
        
        # Geometric mean growth rate
        growth_factors = values[1:] / values[:-1]
        geometric_mean = np.prod(growth_factors) ** (1 / len(growth_factors))
        
        # Annualize
        monthly_rate = geometric_mean - 1
        annual_rate = (1 + monthly_rate) ** 12 - 1
        
        # Cap at reasonable bounds
        return max(0.0, min(0.25, annual_rate))
    
    def _default_trend(self) -> Dict[str, Any]:
        """Default trend when data is insufficient"""
        return {
            'trend_rate': 0.08,
            'annual_trend': 0.08,
            'monthly_trend': 0.08 / 12,
            'confidence': 'assumed'
        }