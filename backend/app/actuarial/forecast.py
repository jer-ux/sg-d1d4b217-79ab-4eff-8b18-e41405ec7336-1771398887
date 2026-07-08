"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Financial Forecasting Engine
"""

from typing import Dict, Any, List
import numpy as np


class ForecastEngine:
    """
    Multi-period financial projection engine
    """
    
    def project(
        self,
        current: float,
        annual_rate: float,
        years: int
    ) -> List[float]:
        """
        Project values forward with compound growth
        
        Args:
            current: Starting value
            annual_rate: Annual growth rate (e.g., 0.07 for 7%)
            years: Number of years to project
            
        Returns:
            List of projected values
        """
        values = []
        amount = current
        
        for _ in range(years):
            amount *= (1 + annual_rate)
            values.append(amount)
        
        return values
    
    def project_pmpm(
        self,
        base_pmpm: float,
        trend_rate: float,
        periods: int,
        member_count: int
    ) -> Dict[str, Any]:
        """
        Project Per Member Per Month costs
        
        Args:
            base_pmpm: Current PMPM cost
            trend_rate: Annual trend rate
            periods: Number of months to project
            member_count: Number of members
            
        Returns:
            Dictionary with projection details
        """
        monthly_trend = trend_rate / 12
        projections = []
        cumulative_cost = 0
        
        current_pmpm = base_pmpm
        for month in range(1, periods + 1):
            current_pmpm *= (1 + monthly_trend)
            monthly_total = current_pmpm * member_count
            cumulative_cost += monthly_total
            
            projections.append({
                'month': month,
                'pmpm': round(current_pmpm, 2),
                'monthly_total': round(monthly_total, 2),
                'cumulative_total': round(cumulative_cost, 2)
            })
        
        return {
            'projections': projections,
            'base_pmpm': round(base_pmpm, 2),
            'projected_pmpm': round(current_pmpm, 2),
            'total_projected': round(cumulative_cost, 2),
            'trend_rate': trend_rate
        }
    
    def project_with_seasonality(
        self,
        base_value: float,
        trend_rate: float,
        periods: int,
        seasonal_factors: List[float]
    ) -> List[Dict[str, Any]]:
        """
        Project with seasonal adjustment
        
        Args:
            base_value: Starting value
            trend_rate: Annual trend
            periods: Number of periods
            seasonal_factors: List of 12 monthly factors (e.g., [0.95, 1.02, ...])
            
        Returns:
            List of period projections with seasonality
        """
        monthly_trend = trend_rate / 12
        projections = []
        current_value = base_value
        
        for period in range(periods):
            month_index = period % 12
            seasonal_factor = seasonal_factors[month_index]
            
            # Apply trend
            current_value *= (1 + monthly_trend)
            
            # Apply seasonal adjustment
            adjusted_value = current_value * seasonal_factor
            
            projections.append({
                'period': period + 1,
                'base_value': round(current_value, 2),
                'seasonal_factor': round(seasonal_factor, 4),
                'adjusted_value': round(adjusted_value, 2)
            })
        
        return projections
    
    def net_present_value(
        self,
        cash_flows: List[float],
        discount_rate: float
    ) -> float:
        """
        Calculate NPV of future cash flows
        
        Args:
            cash_flows: List of future cash flows
            discount_rate: Annual discount rate
            
        Returns:
            Net present value
        """
        npv = 0
        for t, cf in enumerate(cash_flows, start=1):
            npv += cf / ((1 + discount_rate) ** t)
        
        return npv
    
    def forecast_range(
        self,
        base: float,
        trend: float,
        volatility: float,
        periods: int,
        confidence_level: float = 0.90
    ) -> Dict[str, Any]:
        """
        Forecast with confidence intervals
        
        Args:
            base: Base value
            trend: Expected trend rate
            volatility: Standard deviation of trend
            periods: Number of periods
            confidence_level: Confidence level (0.90, 0.95, etc)
            
        Returns:
            Forecast with confidence bands
        """
        # Z-score for confidence level
        z_scores = {0.90: 1.645, 0.95: 1.96, 0.99: 2.576}
        z = z_scores.get(confidence_level, 1.96)
        
        projections = []
        current = base
        
        for period in range(1, periods + 1):
            current *= (1 + trend)
            
            # Confidence interval grows with time
            std_error = current * volatility * np.sqrt(period)
            lower_bound = current - (z * std_error)
            upper_bound = current + (z * std_error)
            
            projections.append({
                'period': period,
                'expected': round(current, 2),
                'lower_bound': round(max(0, lower_bound), 2),
                'upper_bound': round(upper_bound, 2),
                'confidence_level': confidence_level
            })
        
        return {
            'projections': projections,
            'base_value': base,
            'trend_rate': trend,
            'volatility': volatility
        }