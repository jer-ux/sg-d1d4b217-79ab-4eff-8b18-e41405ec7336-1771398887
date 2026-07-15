"""
Rx Trend Calculator

Computes composite trend rate from pharmacy components.
"""


class RxTrendCalculator:
    """Calculate pharmacy benefit trend rate"""

    def calculate_trend(
        self,
        brand_price_trend: float,
        generic_price_trend: float,
        specialty_trend: float,
        utilization_trend: float,
        rebate_change: float,
        formulary_savings: float
    ) -> float:
        """
        Calculate composite Rx trend rate.
        
        Formula:
        Rx Trend = Brand Inflation + Generic Deflation + 
                   Specialty Mix + Utilization + 
                   Rebate Impact - Formulary Savings
        
        Args:
            brand_price_trend: Brand drug inflation rate
            generic_price_trend: Generic drug price trend (often negative)
            specialty_trend: Specialty drug mix shift
            utilization_trend: Script volume change
            rebate_change: Rebate rate change (negative = more rebates)
            formulary_savings: Formulary management savings
            
        Returns:
            Composite trend rate
        """
        trend = (
            brand_price_trend +
            generic_price_trend +
            specialty_trend +
            utilization_trend +
            rebate_change -
            formulary_savings
        )
        
        return trend

    def get_components(
        self,
        brand_price_trend: float,
        generic_price_trend: float,
        specialty_trend: float,
        utilization_trend: float,
        rebate_change: float,
        formulary_savings: float
    ) -> dict:
        """Return detailed trend component breakdown"""
        return {
            "brand_inflation": brand_price_trend,
            "generic_deflation": generic_price_trend,
            "specialty_mix_shift": specialty_trend,
            "utilization": utilization_trend,
            "rebate_impact": rebate_change,
            "formulary_savings": formulary_savings,
            "composite_trend": self.calculate_trend(
                brand_price_trend,
                generic_price_trend,
                specialty_trend,
                utilization_trend,
                rebate_change,
                formulary_savings
            )
        }