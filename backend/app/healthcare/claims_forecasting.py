"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Medical Claims Forecasting Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import List, Dict
from datetime import datetime, timedelta


@dataclass
class ClaimsForecast:
    forecast_period: str
    projected_claims: float
    confidence_interval: tuple
    trend_components: Dict[str, float]
    risk_factors: List[str]


class MedicalClaimsEngine:
    """
    Medical claims forecasting with seasonal adjustment and risk scoring
    """
    
    def __init__(self):
        self.historical_claims = []
        self.seasonality_factors = {
            1: 1.08,  # January (deductible reset)
            2: 1.02,
            3: 0.98,
            4: 0.95,
            5: 0.92,
            6: 0.90,
            7: 0.88,
            8: 0.90,
            9: 0.95,
            10: 1.00,
            11: 1.05,
            12: 1.10   # December (year-end spend down)
        }
    
    def add_historical_data(self, claims: List[float], months: List[int]):
        """Load historical claims data"""
        self.historical_claims = list(zip(months, claims))
    
    def forecast_next_period(
        self,
        months_ahead: int = 12,
        base_monthly_claims: float = None,
        trend_rate: float = 0.08,
        volatility: float = 0.12
    ) -> ClaimsForecast:
        """
        Forecast claims for future period
        
        Args:
            months_ahead: Forecast horizon in months
            base_monthly_claims: Current monthly claims run rate
            trend_rate: Annual medical trend
            volatility: Claims volatility factor
        """
        if base_monthly_claims is None and self.historical_claims:
            base_monthly_claims = np.mean([c for _, c in self.historical_claims])
        
        # Monthly trend factor
        monthly_trend = (1 + trend_rate) ** (1/12)
        
        # Project each month
        forecasts = []
        for month in range(1, months_ahead + 1):
            # Apply trend
            trended_base = base_monthly_claims * (monthly_trend ** month)
            
            # Apply seasonality
            month_of_year = ((datetime.now().month + month - 1) % 12) + 1
            seasonal_factor = self.seasonality_factors.get(month_of_year, 1.0)
            
            # Add volatility
            monthly_forecast = trended_base * seasonal_factor * np.random.normal(1.0, volatility)
            forecasts.append(monthly_forecast)
        
        total_forecast = sum(forecasts)
        
        # Monte Carlo confidence interval
        simulations = []
        for _ in range(1000):
            sim_total = 0
            for month in range(1, months_ahead + 1):
                trended = base_monthly_claims * (monthly_trend ** month)
                month_of_year = ((datetime.now().month + month - 1) % 12) + 1
                seasonal = self.seasonality_factors.get(month_of_year, 1.0)
                sim_total += trended * seasonal * np.random.normal(1.0, volatility)
            simulations.append(sim_total)
        
        return ClaimsForecast(
            forecast_period=f"{months_ahead} months",
            projected_claims=total_forecast,
            confidence_interval=(
                float(np.percentile(simulations, 5)),
                float(np.percentile(simulations, 95))
            ),
            trend_components={
                "base_monthly": base_monthly_claims,
                "annual_trend": trend_rate,
                "seasonality_impact": np.mean(list(self.seasonality_factors.values())) - 1.0,
                "volatility": volatility
            },
            risk_factors=self._identify_risk_factors(trend_rate, volatility)
        )
    
    def _identify_risk_factors(self, trend: float, volatility: float) -> List[str]:
        """Identify key risk factors"""
        risks = []
        if trend > 0.10:
            risks.append("High medical trend (>10%)")
        if volatility > 0.15:
            risks.append("High claims volatility")
        if datetime.now().month == 1:
            risks.append("Deductible reset period - expect claims surge")
        return risks
    
    def decompose_trend(
        self,
        current_pmpm: float,
        prior_pmpm: float
    ) -> Dict[str, float]:
        """
        Decompose trend into utilization and unit cost components
        
        Uses standard actuarial decomposition:
        Total Trend = Utilization Change + Unit Cost Change + Interaction
        """
        total_trend = (current_pmpm / prior_pmpm) - 1.0
        
        # Simplified decomposition (in practice, use detailed claims data)
        util_trend = total_trend * 0.40  # Typically 40% utilization
        unit_cost_trend = total_trend * 0.55  # Typically 55% unit cost
        interaction = total_trend * 0.05  # Interaction term
        
        return {
            "total_trend": total_trend,
            "utilization_component": util_trend,
            "unit_cost_component": unit_cost_trend,
            "interaction_term": interaction,
            "current_pmpm": current_pmpm,
            "prior_pmpm": prior_pmpm
        }