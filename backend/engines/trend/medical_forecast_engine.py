"""
Medical Trend Forecast Engine

Core actuarial logic for projecting future healthcare costs.
"""

import numpy as np
from scipy import stats
from datetime import date, timedelta
from dateutil.relativedelta import relativedelta
from typing import List, Tuple, Optional
import warnings

from .models import (
    TrendForecastRequest,
    TrendForecastResponse,
    TrendComponents,
    ForecastPeriod,
    TrendMethod,
    ClaimsPeriod,
)


class MedicalTrendEngine:
    """
    Actuarial engine for medical trend forecasting.
    
    Implements multiple methodologies:
    1. Simple trend: Future Cost = Current Cost × (1+Trend)^Years
    2. Compound trend with components
    3. Exponential smoothing
    4. Linear regression on historical data
    5. Full actuarial decomposition
    """
    
    def __init__(self):
        self.warnings: List[str] = []
    
    def forecast(self, request: TrendForecastRequest) -> TrendForecastResponse:
        """
        Generate medical trend forecast.
        
        Args:
            request: TrendForecastRequest with historical data and parameters
            
        Returns:
            TrendForecastResponse with forecasted values and components
        """
        self.warnings = []
        
        # Validate data quality
        self._validate_data_quality(request.historical_claims.periods)
        
        # Calculate baseline
        baseline_period = request.historical_claims.periods[-1]
        baseline_pmpm = baseline_period.pmpm
        
        # Determine trend components
        if request.trend_components:
            trend_components = request.trend_components
        else:
            trend_components = self._calculate_trend_components(
                request.historical_claims.periods,
                request.method
            )
        
        composite_trend = trend_components.composite_trend
        
        # Calculate model fit metrics
        r_squared, mae = self._calculate_fit_metrics(
            request.historical_claims.periods,
            composite_trend
        )
        
        # Generate forecast periods
        forecast_periods = self._generate_forecast(
            baseline_pmpm=baseline_pmpm,
            baseline_date=baseline_period.period_end,
            trend_rate=composite_trend,
            num_periods=request.forecast_periods,
            confidence_interval=request.confidence_interval,
            apply_seasonality=request.apply_seasonality,
        )
        
        return TrendForecastResponse(
            forecast=forecast_periods,
            trend_components=trend_components,
            composite_trend=composite_trend,
            baseline_pmpm=baseline_pmpm,
            baseline_period=f"{baseline_period.period_start} to {baseline_period.period_end}",
            method_used=request.method,
            confidence_interval=request.confidence_interval,
            r_squared=r_squared,
            mean_absolute_error=mae,
            warnings=self.warnings,
        )
    
    def _validate_data_quality(self, periods: List[ClaimsPeriod]):
        """Check for data quality issues"""
        # Check for large period-over-period changes
        for i in range(1, len(periods)):
            prev_pmpm = periods[i-1].pmpm
            curr_pmpm = periods[i].pmpm
            pct_change = abs((curr_pmpm - prev_pmpm) / prev_pmpm)
            
            if pct_change > 0.30:
                self.warnings.append(
                    f"Large PMPM change detected: {pct_change:.1%} between periods. "
                    "Consider investigating for data quality issues."
                )
        
        # Check for credibility
        avg_member_months = np.mean([p.member_months for p in periods])
        if avg_member_months < 1200:  # Less than 100 lives
            self.warnings.append(
                "Low credibility: Small member population may result in volatile trends. "
                "Consider supplementing with industry benchmarks."
            )
    
    def _calculate_trend_components(
        self,
        periods: List[ClaimsPeriod],
        method: TrendMethod,
    ) -> TrendComponents:
        """
        Calculate trend components from historical data.
        
        Uses different methodologies based on method parameter.
        """
        if method == TrendMethod.SIMPLE:
            return self._simple_trend(periods)
        elif method == TrendMethod.COMPOUND:
            return self._compound_trend(periods)
        elif method == TrendMethod.LINEAR_REGRESSION:
            return self._regression_trend(periods)
        elif method == TrendMethod.EXPONENTIAL_SMOOTHING:
            return self._exponential_smoothing_trend(periods)
        else:  # ACTUARIAL_DECOMPOSITION
            return self._actuarial_decomposition(periods)
    
    def _simple_trend(self, periods: List[ClaimsPeriod]) -> TrendComponents:
        """Calculate simple year-over-year trend"""
        first_pmpm = periods[0].pmpm
        last_pmpm = periods[-1].pmpm
        years = len(periods) - 1
        
        # Simple annualized trend
        trend = (last_pmpm / first_pmpm) ** (1/years) - 1
        
        # Attribute all to medical inflation for simplicity
        return TrendComponents(
            medical_inflation=trend,
            utilization_change=0.0,
            severity_change=0.0,
            mix_shift=0.0,
            savings_programs=0.0,
        )
    
    def _compound_trend(self, periods: List[ClaimsPeriod]) -> TrendComponents:
        """Calculate compound annual growth rate"""
        pmpms = [p.pmpm for p in periods]
        
        # Fit exponential growth
        n = len(pmpms)
        x = np.arange(n)
        y = np.log(pmpms)
        
        # Linear regression on log scale
        slope, intercept = np.polyfit(x, y, 1)
        cagr = np.exp(slope) - 1
        
        # Split into inflation and other
        cpi_medical = 0.045  # Assume 4.5% medical CPI
        other = cagr - cpi_medical
        
        return TrendComponents(
            medical_inflation=cpi_medical,
            utilization_change=other * 0.4,
            severity_change=other * 0.4,
            mix_shift=other * 0.2,
            savings_programs=0.0,
        )
    
    def _regression_trend(self, periods: List[ClaimsPeriod]) -> TrendComponents:
        """Linear regression trend analysis"""
        pmpms = [p.pmpm for p in periods]
        n = len(pmpms)
        x = np.arange(n)
        
        # Fit linear trend
        slope, intercept = np.polyfit(x, pmpms, 1)
        
        # Convert slope to percentage trend
        avg_pmpm = np.mean(pmpms)
        trend = slope / avg_pmpm
        
        # Decompose into components (simplified heuristic)
        return TrendComponents(
            medical_inflation=0.045,
            utilization_change=trend * 0.3,
            severity_change=trend * 0.3,
            mix_shift=trend * 0.2,
            savings_programs=max(0, -trend * 0.2),
        )
    
    def _exponential_smoothing_trend(self, periods: List[ClaimsPeriod]) -> TrendComponents:
        """Exponential smoothing forecast"""
        pmpms = [p.pmpm for p in periods]
        
        # Simple exponential smoothing
        alpha = 0.3  # Smoothing parameter
        smoothed = [pmpms[0]]
        
        for i in range(1, len(pmpms)):
            s = alpha * pmpms[i] + (1 - alpha) * smoothed[-1]
            smoothed.append(s)
        
        # Trend from smoothed values
        trend = (smoothed[-1] - smoothed[0]) / smoothed[0] / (len(periods) - 1)
        
        return TrendComponents(
            medical_inflation=0.045,
            utilization_change=trend * 0.35,
            severity_change=trend * 0.35,
            mix_shift=trend * 0.15,
            savings_programs=max(0, -trend * 0.15),
        )
    
    def _actuarial_decomposition(self, periods: List[ClaimsPeriod]) -> TrendComponents:
        """
        Full actuarial trend decomposition.
        
        Decomposes trend into:
        - Medical inflation (CPI-Medical or industry benchmark)
        - Utilization (services per member)
        - Severity (cost per service)
        - Mix shift (population or benefit changes)
        - Savings programs (care management, etc.)
        """
        # Calculate observed trend
        first_pmpm = periods[0].pmpm
        last_pmpm = periods[-1].pmpm
        years = len(periods) - 1
        observed_trend = (last_pmpm / first_pmpm) ** (1/years) - 1
        
        # Component estimates (in practice, these would come from detailed claims analysis)
        medical_inflation = 0.045  # 4.5% medical CPI
        
        # Remaining trend to explain
        residual = observed_trend - medical_inflation
        
        # Heuristic split of residual
        # In production, these would be calculated from actual utilization/severity data
        utilization_change = residual * 0.35
        severity_change = residual * 0.35
        mix_shift = residual * 0.20
        savings_programs = max(0, -residual * 0.10)
        
        return TrendComponents(
            medical_inflation=medical_inflation,
            utilization_change=utilization_change,
            severity_change=severity_change,
            mix_shift=mix_shift,
            savings_programs=savings_programs,
        )
    
    def _calculate_fit_metrics(
        self,
        periods: List[ClaimsPeriod],
        trend: float,
    ) -> Tuple[float, float]:
        """Calculate R² and MAE for model fit"""
        pmpms = np.array([p.pmpm for p in periods])
        n = len(pmpms)
        
        # Predicted values using compound trend
        predicted = np.array([pmpms[0] * (1 + trend) ** i for i in range(n)])
        
        # R-squared
        ss_res = np.sum((pmpms - predicted) ** 2)
        ss_tot = np.sum((pmpms - np.mean(pmpms)) ** 2)
        r_squared = 1 - (ss_res / ss_tot) if ss_tot > 0 else 0
        
        # Mean absolute error
        mae = np.mean(np.abs(pmpms - predicted))
        
        return max(0, min(1, r_squared)), mae
    
    def _generate_forecast(
        self,
        baseline_pmpm: float,
        baseline_date: date,
        trend_rate: float,
        num_periods: int,
        confidence_interval: float,
        apply_seasonality: bool,
    ) -> List[ForecastPeriod]:
        """Generate monthly forecast periods"""
        forecast_periods = []
        
        # Calculate confidence bounds (simplified)
        z_score = stats.norm.ppf((1 + confidence_interval) / 2)
        std_error = 0.02  # 2% standard error assumption
        
        for i in range(1, num_periods + 1):
            period_start = baseline_date + relativedelta(months=i)
            period_end = period_start + relativedelta(months=1, days=-1)
            
            # Compound trend formula: Future = Current × (1 + trend)^months/12
            months_elapsed = i
            projected_pmpm = baseline_pmpm * (1 + trend_rate) ** (months_elapsed / 12)
            
            # Apply seasonality if requested
            if apply_seasonality:
                seasonal_factor = self._seasonal_factor(period_start.month)
                projected_pmpm *= seasonal_factor
            
            # Confidence bounds
            margin = projected_pmpm * std_error * z_score * np.sqrt(months_elapsed / 12)
            lower_bound = projected_pmpm - margin
            upper_bound = projected_pmpm + margin
            
            # Assume fixed member months for projection (would be input parameter in production)
            member_months = 50000
            projected_claims = projected_pmpm * member_months
            
            forecast_periods.append(
                ForecastPeriod(
                    period=i,
                    period_start=period_start,
                    period_end=period_end,
                    projected_pmpm=round(projected_pmpm, 2),
                    projected_claims=round(projected_claims, 2),
                    lower_bound=round(lower_bound * member_months, 2),
                    upper_bound=round(upper_bound * member_months, 2),
                    trend_rate=trend_rate,
                )
            )
        
        return forecast_periods
    
    def _seasonal_factor(self, month: int) -> float:
        """Return seasonal adjustment factor for given month"""
        # Healthcare typically higher in Q1 (deductible resets), lower in summer
        seasonal_factors = {
            1: 1.12,   # January - highest
            2: 1.08,
            3: 1.05,
            4: 1.02,
            5: 0.98,
            6: 0.95,   # June - lowest
            7: 0.96,
            8: 0.97,
            9: 1.00,
            10: 1.01,
            11: 1.02,
            12: 1.04,  # December
        }
        return seasonal_factors.get(month, 1.0)