"""
Unit tests for Rx Trend Forecast Engine
"""

import pytest
from ..engine import RxTrendEngine
from ..assumptions import RxTrendCalculator
from ..forecast import RxForecast


class TestRxTrendCalculator:
    """Test trend calculation logic"""
    
    def setup_method(self):
        self.calculator = RxTrendCalculator()
    
    def test_basic_trend_calculation(self):
        """Test basic trend calculation"""
        trend = self.calculator.calculate_trend(
            brand_inflation=0.08,
            generic_deflation=-0.03,
            specialty_mix_shift=0.04,
            utilization=0.02,
            glp1_impact=0.015,
            rebate_rate=0.03,
            biosimilar_savings=0.01
        )
        
        expected = 0.08 - 0.03 + 0.04 + 0.02 + 0.015 - 0.03 - 0.01
        assert abs(trend - expected) < 0.0001
    
    def test_trend_decomposition(self):
        """Test trend component breakdown"""
        components = self.calculator.decompose_trend(
            brand_inflation=0.08,
            generic_deflation=-0.03,
            specialty_mix_shift=0.04,
            utilization=0.02,
            glp1_impact=0.015,
            rebate_rate=0.03,
            biosimilar_savings=0.01
        )
        
        assert "composite_trend" in components
        assert components["brand_inflation"] == 0.08
        assert components["rebate_rate"] == -0.03


class TestRxForecast:
    """Test forecast projection logic"""
    
    def setup_method(self):
        self.forecaster = RxForecast()
    
    def test_simple_projection(self):
        """Test basic cost projection"""
        results = self.forecaster.project(
            current_cost=5000000,
            members=1000,
            years=3,
            trend_rate=0.05
        )
        
        assert len(results) == 3
        assert results[0].year == 1
        assert results[0].projected_cost == 5000000 * 1.05
        assert results[2].projected_cost == pytest.approx(5000000 * (1.05 ** 3))
    
    def test_category_projection(self):
        """Test projection by drug category"""
        results = self.forecaster.project_by_category(
            current_brand=2000000,
            current_generic=1000000,
            current_specialty=2000000,
            members=1000,
            years=2,
            brand_trend=0.08,
            generic_trend=-0.03,
            specialty_trend=0.12
        )
        
        assert len(results) == 2
        assert results[0].brand_cost is not None
        assert results[0].generic_cost is not None
        assert results[0].specialty_cost is not None


class TestRxTrendEngine:
    """Test engine orchestration"""
    
    def setup_method(self):
        self.engine = RxTrendEngine()
    
    def test_engine_run(self):
        """Test complete engine execution"""
        assumptions = {
            "brand_inflation": 0.08,
            "generic_deflation": -0.03,
            "specialty_mix_shift": 0.04,
            "utilization_trend": 0.02,
            "glp1_impact": 0.015,
            "rebate_rate": 0.03,
            "biosimilar_savings": 0.01
        }
        
        results = self.engine.run(
            current_cost=5000000,
            members=1000,
            years=5,
            assumptions=assumptions
        )
        
        assert len(results) == 5
        assert all(r.trend_rate > 0 for r in results)
        assert results[-1].projected_cost > 5000000
    
    def test_trend_components_reporting(self):
        """Test trend component extraction"""
        assumptions = {
            "brand_inflation": 0.08,
            "generic_deflation": -0.03,
            "specialty_mix_shift": 0.04,
            "utilization_trend": 0.02,
            "glp1_impact": 0.015,
            "rebate_rate": 0.03,
            "biosimilar_savings": 0.01
        }
        
        components = self.engine.get_trend_components(assumptions)
        
        assert "composite_trend" in components
        assert "brand_inflation" in components
        assert "glp1_impact" in components


if __name__ == "__main__":
    pytest.main([__file__, "-v"])