"""
Rx Forecast Projections

Projects future pharmacy costs using compound growth.
"""

from .models import RxForecast


class RxForecaster:
    """Project pharmacy benefit costs"""

    def project(
        self,
        current_gross_cost: float,
        current_rebate: float,
        members: int,
        years: int,
        trend_rate: float
    ) -> list[RxForecast]:
        """
        Project future pharmacy costs.
        
        Formula:
        Future Cost = Current Cost × (1 + Trend)^Years
        
        Args:
            current_gross_cost: Current gross pharmacy cost
            current_rebate: Current rebate amount
            members: Number of covered members
            years: Number of years to project
            trend_rate: Composite trend rate
            
        Returns:
            List of yearly projections
        """
        results = []
        
        # Calculate current rebate percentage
        rebate_rate = current_rebate / current_gross_cost if current_gross_cost > 0 else 0
        
        for year in range(1, years + 1):
            # Project gross cost
            projected_gross = current_gross_cost * ((1 + trend_rate) ** year)
            
            # Project rebates (assume rebate rate stays constant)
            projected_rebate = projected_gross * rebate_rate
            
            # Calculate net cost
            net_cost = projected_gross - projected_rebate
            
            # Calculate PMPM
            pmpm = net_cost / (members * 12)
            
            results.append(
                RxForecast(
                    year=year,
                    gross_cost=round(projected_gross, 2),
                    rebates=round(projected_rebate, 2),
                    net_cost=round(net_cost, 2),
                    pmpm=round(pmpm, 2)
                )
            )
        
        return results