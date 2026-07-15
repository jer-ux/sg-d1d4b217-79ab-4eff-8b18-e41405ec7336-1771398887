"""
Rx Trend Engine

Main orchestrator for pharmacy benefit trend forecasting.
"""

from .assumptions import RxTrendCalculator
from .forecast import RxForecaster


class RxTrendEngine:
    """Pharmacy benefit trend forecasting engine"""

    def __init__(self):
        self.trend = RxTrendCalculator()
        self.forecaster = RxForecaster()

    def run(
        self,
        current_gross_cost: float,
        current_rebate: float,
        members: int,
        years: int,
        assumptions: dict
    ):
        """
        Run pharmacy benefit forecast.
        
        Args:
            current_gross_cost: Current gross pharmacy cost
            current_rebate: Current rebate amount
            members: Number of covered members
            years: Number of years to project
            assumptions: Dictionary of trend assumptions
            
        Returns:
            List of RxForecast objects
        """
        # Calculate composite trend rate
        trend_rate = self.trend.calculate_trend(
            assumptions["brand_price_trend"],
            assumptions["generic_price_trend"],
            assumptions["specialty_trend"],
            assumptions["utilization_trend"],
            assumptions["rebate_change"],
            assumptions["formulary_savings"]
        )

        # Generate forecast
        return self.forecaster.project(
            current_gross_cost,
            current_rebate,
            members,
            years,
            trend_rate
        )