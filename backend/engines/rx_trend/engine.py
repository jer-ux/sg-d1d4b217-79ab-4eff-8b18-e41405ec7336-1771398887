"""
Rx Trend Engine

Main orchestrator for pharmacy benefit trend forecasting.
"""

from .assumptions import RxTrendCalculator
from .forecast import RxForecast


class RxTrendEngine:
    """
    Pharmacy benefit trend forecast engine.
    
    Coordinates trend calculation and multi-year projection.
    """
    
    def __init__(self):
        self.trend = RxTrendCalculator()
        self.forecaster = RxForecast()
    
    
    def run(
        self,
        current_cost: float,
        members: int,
        years: int,
        assumptions: dict
    ) -> list:
        """
        Execute Rx trend forecast.
        
        Args:
            current_cost: Current annual Rx spend
            members: Current member count
            years: Forecast horizon (years)
            assumptions: Dict of trend assumptions
            
        Returns:
            List of annual forecast results
        """
        trend_rate = self.trend.calculate_trend(
            assumptions["brand_inflation"],
            assumptions["generic_deflation"],
            assumptions["specialty_mix_shift"],
            assumptions["utilization_trend"],
            assumptions["glp1_impact"],
            assumptions["rebate_rate"],
            assumptions["biosimilar_savings"]
        )
        
        return self.forecaster.project(
            current_cost,
            members,
            years,
            trend_rate
        )
    
    
    def run_by_category(
        self,
        current_brand: float,
        current_generic: float,
        current_specialty: float,
        members: int,
        years: int,
        brand_trend: float,
        generic_trend: float,
        specialty_trend: float
    ) -> list:
        """
        Execute Rx trend forecast by drug category.
        
        Args:
            current_brand: Current brand drug spend
            current_generic: Current generic drug spend
            current_specialty: Current specialty drug spend
            members: Current member count
            years: Forecast horizon
            brand_trend: Brand drug trend rate
            generic_trend: Generic drug trend rate
            specialty_trend: Specialty drug trend rate
            
        Returns:
            List of annual forecast results with category breakdown
        """
        return self.forecaster.project_by_category(
            current_brand,
            current_generic,
            current_specialty,
            members,
            years,
            brand_trend,
            generic_trend,
            specialty_trend
        )
    
    
    def get_trend_components(self, assumptions: dict) -> dict:
        """
        Get trend component breakdown for reporting.
        
        Args:
            assumptions: Dict of trend assumptions
            
        Returns:
            Dictionary of trend components
        """
        return self.trend.decompose_trend(
            assumptions["brand_inflation"],
            assumptions["generic_deflation"],
            assumptions["specialty_mix_shift"],
            assumptions["utilization_trend"],
            assumptions["glp1_impact"],
            assumptions["rebate_rate"],
            assumptions["biosimilar_savings"]
        )