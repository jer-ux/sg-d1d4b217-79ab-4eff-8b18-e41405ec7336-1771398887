"""
Unit tests for Medical Trend Forecast Engine
"""

import pytest
from datetime import date
from typing import List

from .models import (
    TrendForecastRequest,
    TrendForecastResponse,
    TrendComponents,
    HistoricalClaims,
    ClaimsPeriod,
    TrendMethod,
)
from .medical_forecast_engine import MedicalTrendEngine


@pytest.fixture
def sample_historical_claims() -> HistoricalClaims:
    """Sample historical claims data for testing"""
    return HistoricalClaims(
        periods=[
            ClaimsPeriod(
                period_start=date(2024, 1, 1),
                period_end=date(2024, 12, 31),
                total_claims=12_500_000,
                member_months=50_000,
            ),
            ClaimsPeriod(
                period_start=date(2025, 1, 1),
                period_end=date(2025, 12, 31),
                total_claims=13_125_000,
                member_months=52_000,
            ),
        ]
    )


@pytest.fixture
def engine() -> MedicalTrendEngine:
    """Create engine instance"""
    return MedicalTrendEngine()


class TestClaimsPeriod:
    """Test ClaimsPeriod model"""
    
    def test_auto_calculate_pmpm(self):
        """Test automatic PMPM calculation"""
        period = ClaimsPeriod(
            period_start=date(2024, 1, 1),
            period_end=date(2024, 12, 31),
            total_claims=1_200_000,
            member_months=5_000,
        )
        assert period.pmpm == 240.0
    
    def test_manual_pmpm_override(self):
        """Test manual PMPM override"""
        period = ClaimsPeriod(
            period_start=date(2024, 1, 1),
            period_end=date(2024, 12, 31),
            total_claims=1_200_000,
            member_months=5_000,
            pmpm=250.0,  # Override
        )
        assert period.pmpm == 250.0


class TestHistoricalClaims:
    """Test HistoricalClaims validation"""
    
    def test_minimum_periods_validation(self):
        """Test that at least 2 periods are required"""
        with pytest.raises(ValueError):
            HistoricalClaims(
                periods=[
                    ClaimsPeriod(
                        period_start=date(2024, 1, 1),
                        period_end=date(2024, 12, 31),
                        total_claims=1_000_000,
                        member_months=5_000,
                    )
                ]
            )
    
    def test_chronological_order_validation(self):
        """Test that periods must be in chronological order"""
        with pytest.raises(ValueError, match="chronological"):
            HistoricalClaims(
                periods=[
                    ClaimsPeriod(
                        period_start=date(2025, 1, 1),
                        period_end=date(2025, 12, 31),
                        total_claims=1_000_000,
                        member_months=5_000,
                    ),
                    ClaimsPeriod(
                        period_start=date(2024, 1, 1),
                        period_end=date(2024, 12, 31),
                        total_claims=1_000_000,
                        member_months=5_000,
                    ),
                ]
            )


class TestTrendComponents:
    """Test TrendComponents model"""
    
    def test_composite_trend_calculation(self):
        """Test composite trend calculation"""
        components = TrendComponents(
            medical_inflation=0.045,
            utilization_change=0.01,
            severity_change=0.015,
            mix_shift=0.005,
            savings_programs=0.015,
        )
        # 0.045 + 0.01 + 0.015 + 0.005 - 0.015 = 0.06
        assert components.composite_trend == pytest.approx(0.06)
    
    def test_component_range_validation(self):
        """Test that components must be between -1 and 1"""
        with pytest.raises(ValueError):
            TrendComponents(
                medical_inflation=1.5,  # Invalid: > 1.0
                utilization_change=0.0,
                severity_change=0.0,
                mix_shift=0.0,
                savings_programs=0.0,
            )


class TestMedicalTrendEngine:
    """Test MedicalTrendEngine core logic"""
    
    def test_simple_trend_forecast(self, engine, sample_historical_claims):
        """Test simple trend method"""
        request = TrendForecastRequest(
            historical_claims=sample_historical_claims,
            forecast_periods=12,
            method=TrendMethod.SIMPLE,
            confidence_interval=0.95,
        )
        
        response = engine.forecast(request)
        
        # Verify response structure
        assert isinstance(response, TrendForecastResponse)
        assert len(response.forecast) == 12
        assert response.method_used == TrendMethod.SIMPLE
        assert response.composite_trend > 0
        assert 0 <= response.r_squared <= 1
    
    def test_actuarial_decomposition(self, engine, sample_historical_claims):
        """Test actuarial decomposition method"""
        request = TrendForecastRequest(
            historical_claims=sample_historical_claims,
            forecast_periods=12,
            method=TrendMethod.ACTUARIAL_DECOMPOSITION,
        )
        
        response = engine.forecast(request)
        
        # Verify trend components exist
        assert response.trend_components.medical_inflation > 0
        assert response.composite_trend > 0
        
        # Verify forecast periods
        assert len(response.forecast) == 12
        for i, period in enumerate(response.forecast, 1):
            assert period.period == i
            assert period.projected_pmpm > 0
            assert period.lower_bound < period.projected_claims < period.upper_bound
    
    def test_compound_trend(self, engine, sample_historical_claims):
        """Test compound growth rate method"""
        request = TrendForecastRequest(
            historical_claims=sample_historical_claims,
            forecast_periods=6,
            method=TrendMethod.COMPOUND,
        )
        
        response = engine.forecast(request)
        
        assert response.method_used == TrendMethod.COMPOUND
        assert len(response.forecast) == 6
        
        # Verify compound growth
        baseline = response.baseline_pmpm
        for period in response.forecast:
            expected_min = baseline * 0.95  # At least 95% of baseline
            assert period.projected_pmpm >= expected_min
    
    def test_manual_trend_components(self, engine, sample_historical_claims):
        """Test with manually specified trend components"""
        custom_components = TrendComponents(
            medical_inflation=0.05,
            utilization_change=0.02,
            severity_change=0.01,
            mix_shift=0.005,
            savings_programs=0.025,
        )
        
        request = TrendForecastRequest(
            historical_claims=sample_historical_claims,
            forecast_periods=12,
            trend_components=custom_components,
        )
        
        response = engine.forecast(request)
        
        # Verify custom components were used
        assert response.trend_components.medical_inflation == 0.05
        assert response.trend_components.utilization_change == 0.02
        assert response.trend_components.savings_programs == 0.025
        assert response.composite_trend == pytest.approx(0.06)  # 0.05+0.02+0.01+0.005-0.025
    
    def test_seasonality_adjustment(self, engine, sample_historical_claims):
        """Test seasonal adjustments"""
        request_with_seasonality = TrendForecastRequest(
            historical_claims=sample_historical_claims,
            forecast_periods=12,
            apply_seasonality=True,
        )
        
        request_without_seasonality = TrendForecastRequest(
            historical_claims=sample_historical_claims,
            forecast_periods=12,
            apply_seasonality=False,
        )
        
        response_seasonal = engine.forecast(request_with_seasonality)
        response_no_seasonal = engine.forecast(request_without_seasonality)
        
        # January (period 1) should be higher with seasonality
        jan_seasonal = response_seasonal.forecast[0].projected_pmpm
        jan_no_seasonal = response_no_seasonal.forecast[0].projected_pmpm
        assert jan_seasonal > jan_no_seasonal
        
        # June (period 6) should be lower with seasonality
        jun_seasonal = response_seasonal.forecast[5].projected_pmpm
        jun_no_seasonal = response_no_seasonal.forecast[5].projected_pmpm
        assert jun_seasonal < jun_no_seasonal
    
    def test_data_quality_warnings(self, engine):
        """Test that data quality warnings are generated"""
        # Create data with large volatility
        volatile_claims = HistoricalClaims(
            periods=[
                ClaimsPeriod(
                    period_start=date(2024, 1, 1),
                    period_end=date(2024, 12, 31),
                    total_claims=10_000_000,
                    member_months=50_000,  # PMPM = 200
                ),
                ClaimsPeriod(
                    period_start=date(2025, 1, 1),
                    period_end=date(2025, 12, 31),
                    total_claims=15_000_000,
                    member_months=50_000,  # PMPM = 300 (50% jump)
                ),
            ]
        )
        
        request = TrendForecastRequest(
            historical_claims=volatile_claims,
            forecast_periods=12,
        )
        
        response = engine.forecast(request)
        
        # Should generate warning about large change
        assert len(response.warnings) > 0
        assert any("Large PMPM change" in w for w in response.warnings)
    
    def test_low_credibility_warning(self, engine):
        """Test warning for small populations"""
        small_population = HistoricalClaims(
            periods=[
                ClaimsPeriod(
                    period_start=date(2024, 1, 1),
                    period_end=date(2024, 12, 31),
                    total_claims=100_000,
                    member_months=500,  # Less than 100 lives
                ),
                ClaimsPeriod(
                    period_start=date(2025, 1, 1),
                    period_end=date(2025, 12, 31),
                    total_claims=105_000,
                    member_months=500,
                ),
            ]
        )
        
        request = TrendForecastRequest(
            historical_claims=small_population,
            forecast_periods=12,
        )
        
        response = engine.forecast(request)
        
        # Should warn about low credibility
        assert any("Low credibility" in w for w in response.warnings)
    
    def test_confidence_intervals(self, engine, sample_historical_claims):
        """Test that confidence intervals widen over time"""
        request = TrendForecastRequest(
            historical_claims=sample_historical_claims,
            forecast_periods=24,
            confidence_interval=0.95,
        )
        
        response = engine.forecast(request)
        
        # Confidence intervals should widen as we forecast further
        period_1_range = (
            response.forecast[0].upper_bound - response.forecast[0].lower_bound
        )
        period_24_range = (
            response.forecast[23].upper_bound - response.forecast[23].lower_bound
        )
        
        assert period_24_range > period_1_range
    
    def test_exponential_smoothing(self, engine, sample_historical_claims):
        """Test exponential smoothing method"""
        request = TrendForecastRequest(
            historical_claims=sample_historical_claims,
            forecast_periods=12,
            method=TrendMethod.EXPONENTIAL_SMOOTHING,
        )
        
        response = engine.forecast(request)
        
        assert response.method_used == TrendMethod.EXPONENTIAL_SMOOTHING
        assert len(response.forecast) == 12
    
    def test_linear_regression(self, engine, sample_historical_claims):
        """Test linear regression method"""
        request = TrendForecastRequest(
            historical_claims=sample_historical_claims,
            forecast_periods=12,
            method=TrendMethod.LINEAR_REGRESSION,
        )
        
        response = engine.forecast(request)
        
        assert response.method_used == TrendMethod.LINEAR_REGRESSION
        assert response.r_squared is not None


class TestForecastResponse:
    """Test forecast response structure"""
    
    def test_forecast_period_structure(self, engine, sample_historical_claims):
        """Test that forecast periods have correct structure"""
        request = TrendForecastRequest(
            historical_claims=sample_historical_claims,
            forecast_periods=3,
        )
        
        response = engine.forecast(request)
        
        for i, period in enumerate(response.forecast, 1):
            assert period.period == i
            assert period.period_start > sample_historical_claims.periods[-1].period_end
            assert period.period_end > period.period_start
            assert period.projected_pmpm > 0
            assert period.projected_claims > 0
            assert period.lower_bound < period.projected_claims
            assert period.upper_bound > period.projected_claims


if __name__ == "__main__":
    pytest.main([__file__, "-v"])