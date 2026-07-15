"""
Rx Analytics Module

Advanced pharmacy benefit analytics and reporting.
"""

from .models import RxHistory, RxForecast
from typing import List


class RxAnalytics:
    """Pharmacy benefit analytics and insights"""

    def calculate_net_trend(
        self,
        history: List[RxHistory]
    ) -> float:
        """
        Calculate historical net cost trend from claims history.
        
        Args:
            history: List of historical pharmacy data
            
        Returns:
            Average annual net cost trend rate
        """
        if len(history) < 2:
            return 0.0
        
        # Sort by year
        sorted_history = sorted(history, key=lambda x: x.year)
        
        # Calculate net costs
        net_costs = []
        for record in sorted_history:
            net_cost = record.gross_cost - record.rebate
            net_costs.append(net_cost)
        
        # Calculate year-over-year trends
        trends = []
        for i in range(1, len(net_costs)):
            trend = (net_costs[i] - net_costs[i-1]) / net_costs[i-1]
            trends.append(trend)
        
        # Return average trend
        return sum(trends) / len(trends) if trends else 0.0

    def calculate_rebate_efficiency(
        self,
        history: List[RxHistory]
    ) -> dict:
        """
        Analyze rebate effectiveness over time.
        
        Returns:
            Dictionary with rebate metrics
        """
        if not history:
            return {}
        
        sorted_history = sorted(history, key=lambda x: x.year)
        latest = sorted_history[-1]
        
        rebate_rate = latest.rebate / latest.gross_cost if latest.gross_cost > 0 else 0
        
        return {
            "latest_rebate_rate": round(rebate_rate * 100, 2),
            "latest_gross_cost": latest.gross_cost,
            "latest_rebate": latest.rebate,
            "latest_net_cost": latest.gross_cost - latest.rebate
        }

    def calculate_specialty_impact(
        self,
        history: List[RxHistory]
    ) -> dict:
        """
        Analyze specialty drug cost impact.
        
        Returns:
            Dictionary with specialty metrics
        """
        if not history:
            return {}
        
        sorted_history = sorted(history, key=lambda x: x.year)
        latest = sorted_history[-1]
        
        specialty_cost = latest.gross_cost * latest.specialty_percent
        
        return {
            "specialty_percent": round(latest.specialty_percent * 100, 2),
            "specialty_cost": round(specialty_cost, 2),
            "traditional_cost": round(latest.gross_cost - specialty_cost, 2)
        }

    def calculate_generic_efficiency(
        self,
        history: List[RxHistory]
    ) -> dict:
        """
        Analyze generic dispensing rate trends.
        
        Returns:
            Dictionary with generic metrics
        """
        if not history:
            return {}
        
        sorted_history = sorted(history, key=lambda x: x.year)
        
        # Calculate trend in generic dispensing rate
        gdr_trend = 0.0
        if len(sorted_history) >= 2:
            first = sorted_history[0]
            latest = sorted_history[-1]
            years = latest.year - first.year
            if years > 0:
                gdr_trend = (latest.generic_dispensing_rate - first.generic_dispensing_rate) / years
        
        latest = sorted_history[-1]
        
        return {
            "latest_gdr": round(latest.generic_dispensing_rate * 100, 2),
            "gdr_trend": round(gdr_trend * 100, 2),
            "years_analyzed": len(sorted_history)
        }

    def generate_forecast_summary(
        self,
        forecast: List[RxForecast]
    ) -> dict:
        """
        Generate summary statistics for forecast.
        
        Args:
            forecast: List of forecast results
            
        Returns:
            Dictionary with summary metrics
        """
        if not forecast:
            return {}
        
        first_year = forecast[0]
        last_year = forecast[-1]
        
        total_gross_increase = last_year.gross_cost - first_year.gross_cost
        total_net_increase = last_year.net_cost - first_year.net_cost
        
        avg_annual_gross_trend = (
            (last_year.gross_cost / first_year.gross_cost) ** (1 / len(forecast)) - 1
            if len(forecast) > 0 else 0
        )
        
        return {
            "years_projected": len(forecast),
            "starting_net_cost": round(first_year.net_cost, 2),
            "ending_net_cost": round(last_year.net_cost, 2),
            "total_net_increase": round(total_net_increase, 2),
            "avg_annual_trend": round(avg_annual_gross_trend * 100, 2),
            "starting_pmpm": round(first_year.pmpm, 2),
            "ending_pmpm": round(last_year.pmpm, 2)
        }

    def detect_cost_drivers(
        self,
        history: List[RxHistory],
        forecast: List[RxForecast]
    ) -> dict:
        """
        Identify primary cost drivers from historical and projected data.
        
        Returns:
            Dictionary with driver analysis
        """
        drivers = {}
        
        # Analyze specialty impact
        if history:
            sorted_history = sorted(history, key=lambda x: x.year)
            latest = sorted_history[-1]
            
            if latest.specialty_percent > 0.3:
                drivers["specialty_high"] = {
                    "message": "Specialty drugs represent >30% of costs",
                    "value": round(latest.specialty_percent * 100, 2)
                }
            
            if latest.generic_dispensing_rate < 0.85:
                drivers["generic_low"] = {
                    "message": "Generic dispensing rate below target (85%)",
                    "value": round(latest.generic_dispensing_rate * 100, 2)
                }
        
        # Analyze rebate effectiveness
        rebate_metrics = self.calculate_rebate_efficiency(history)
        if rebate_metrics and rebate_metrics.get("latest_rebate_rate", 0) < 15:
            drivers["rebate_low"] = {
                "message": "Rebate rate below industry average (15%)",
                "value": rebate_metrics["latest_rebate_rate"]
            }
        
        return drivers