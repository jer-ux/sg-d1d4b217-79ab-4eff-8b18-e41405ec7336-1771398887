"""
Rx Trend Calculator

Computes composite trend rate from pharmacy benefit components.
"""


class RxTrendCalculator:
    """
    Calculate Rx trend rate from component assumptions.
    
    Formula:
        Rx Trend = Brand Inflation + Generic Deflation + 
                   Specialty Mix + Utilization + GLP-1 Impact - 
                   Rebates - Biosimilar Savings
    """
    
    def calculate_trend(
        self,
        brand_inflation: float,
        generic_deflation: float,
        specialty_mix_shift: float,
        utilization: float,
        glp1_impact: float,
        rebate_rate: float,
        biosimilar_savings: float
    ) -> float:
        """
        Calculate composite Rx trend rate.
        
        Args:
            brand_inflation: Brand drug inflation rate (e.g., 0.08 = 8%)
            generic_deflation: Generic price deflation (negative, e.g., -0.03 = -3%)
            specialty_mix_shift: Specialty drug mix shift (e.g., 0.04 = 4%)
            utilization: Utilization growth rate (e.g., 0.02 = 2%)
            glp1_impact: GLP-1 drug impact on trend (e.g., 0.015 = 1.5%)
            rebate_rate: Effective rebate rate (e.g., 0.03 = 3%)
            biosimilar_savings: Biosimilar savings rate (e.g., 0.01 = 1%)
            
        Returns:
            Composite trend rate (decimal)
        """
        trend = (
            brand_inflation +
            generic_deflation +
            specialty_mix_shift +
            utilization +
            glp1_impact -
            rebate_rate -
            biosimilar_savings
        )
        
        return trend
    
    
    def decompose_trend(
        self,
        brand_inflation: float,
        generic_deflation: float,
        specialty_mix_shift: float,
        utilization: float,
        glp1_impact: float,
        rebate_rate: float,
        biosimilar_savings: float
    ) -> dict:
        """
        Return trend components for reporting.
        
        Returns:
            Dictionary of trend components
        """
        return {
            "brand_inflation": brand_inflation,
            "generic_deflation": generic_deflation,
            "specialty_mix_shift": specialty_mix_shift,
            "utilization": utilization,
            "glp1_impact": glp1_impact,
            "rebate_rate": -rebate_rate,
            "biosimilar_savings": -biosimilar_savings,
            "composite_trend": self.calculate_trend(
                brand_inflation,
                generic_deflation,
                specialty_mix_shift,
                utilization,
                glp1_impact,
                rebate_rate,
                biosimilar_savings
            )
        }