"""
Rx Forecast Projections

Projects future pharmacy costs using compound growth.
"""

from .models import ForecastResult


class RxForecast:
    """
    Generate multi-year Rx cost projections.
    
    Uses compound growth formula:
        Future Cost = Current Cost × (1 + Trend)^Years
    """
    
    def project(
        self,
        current_cost: float,
        members: int,
        years: int,
        trend_rate: float
    ) -> list:
        """
        Project Rx costs over multiple years.
        
        Args:
            current_cost: Current annual Rx spend
            members: Current member count
            years: Forecast horizon
            trend_rate: Composite trend rate (decimal)
            
        Returns:
            List of ForecastResult objects
        """
        results = []
        
        for year in range(1, years + 1):
            projected = current_cost * ((1 + trend_rate) ** year)
            pmpm = projected / (members * 12)
            
            results.append(
                ForecastResult(
                    year=year,
                    projected_cost=round(projected, 2),
                    projected_pmpm=round(pmpm, 2),
                    trend_rate=trend_rate
                )
            )
        
        return results
    
    
    def project_by_category(
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
        Project Rx costs by drug category.
        
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
            List of ForecastResult objects with category detail
        """
        results = []
        
        for year in range(1, years + 1):
            brand = current_brand * ((1 + brand_trend) ** year)
            generic = current_generic * ((1 + generic_trend) ** year)
            specialty = current_specialty * ((1 + specialty_trend) ** year)
            
            total = brand + generic + specialty
            pmpm = total / (members * 12)
            
            # Weighted average trend
            total_current = current_brand + current_generic + current_specialty
            weighted_trend = (
                (current_brand / total_current * brand_trend) +
                (current_generic / total_current * generic_trend) +
                (current_specialty / total_current * specialty_trend)
            )
            
            results.append(
                ForecastResult(
                    year=year,
                    projected_cost=round(total, 2),
                    projected_pmpm=round(pmpm, 2),
                    trend_rate=weighted_trend,
                    brand_cost=round(brand, 2),
                    generic_cost=round(generic, 2),
                    specialty_cost=round(specialty, 2)
                )
            )
        
        return results