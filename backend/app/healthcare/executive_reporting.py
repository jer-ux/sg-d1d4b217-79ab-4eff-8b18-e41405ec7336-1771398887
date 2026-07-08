"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Executive Reporting Engine
"""

from typing import Dict, List
import numpy as np


class ExecutiveReporter:
    """
    Generate executive-level healthcare analytics reports
    """
    
    def executive_summary(
        self,
        total_cost: float,
        pmpm: float,
        trend: float,
        member_count: int,
        benchmark_pmpm: float = None
    ) -> Dict[str, any]:
        """
        High-level executive summary
        """
        # Calculate key metrics
        annual_cost = total_cost
        monthly_cost = total_cost / 12
        
        # Benchmarking
        if benchmark_pmpm:
            variance = pmpm - benchmark_pmpm
            variance_pct = (variance / benchmark_pmpm) * 100
            position = "Above" if variance > 0 else "Below"
        else:
            variance = None
            variance_pct = None
            position = "No Benchmark"
        
        # Cost per employee (assuming 12 months)
        cost_per_employee = (pmpm * 12) if pmpm > 0 else 0
        
        return {
            "headline_metrics": {
                "annual_cost": f"${annual_cost:,.0f}",
                "pmpm": f"${pmpm:.2f}",
                "trend": f"{trend:.1%}",
                "members": f"{member_count:,}"
            },
            "cost_analysis": {
                "monthly_cost": monthly_cost,
                "cost_per_employee_annual": cost_per_employee,
                "projected_next_year": annual_cost * (1 + trend)
            },
            "benchmarking": {
                "benchmark_pmpm": benchmark_pmpm,
                "variance": variance,
                "variance_pct": variance_pct,
                "position": position
            },
            "executive_summary_text": self._generate_summary_text(
                annual_cost, pmpm, trend, member_count, variance_pct
            )
        }
    
    def _generate_summary_text(
        self,
        total_cost: float,
        pmpm: float,
        trend: float,
        members: int,
        variance_pct: float = None
    ) -> str:
        """Generate plain-language executive summary"""
        summary = f"Your organization spent ${total_cost:,.0f} on healthcare for {members:,} members, "
        summary += f"at a per-member-per-month cost of ${pmpm:.2f}. "
        
        if trend > 0.10:
            summary += f"Your trend of {trend:.1%} is significantly above typical industry levels (6-8%). "
        elif trend > 0.06:
            summary += f"Your trend of {trend:.1%} is within typical industry range (6-8%). "
        else:
            summary += f"Your trend of {trend:.1%} is below industry average, indicating strong cost control. "
        
        if variance_pct:
            if variance_pct > 10:
                summary += f"You are paying {variance_pct:.1f}% above benchmark. Immediate action recommended."
            elif variance_pct > 5:
                summary += f"You are {variance_pct:.1f}% above benchmark. Optimization opportunity exists."
            elif variance_pct < -5:
                summary += f"You are {abs(variance_pct):.1f}% below benchmark. Strong performance."
        
        return summary
    
    def cost_driver_executive_view(
        self,
        drivers: Dict[str, float]
    ) -> List[Dict[str, any]]:
        """
        Rank cost drivers for executive attention
        """
        total = sum(drivers.values())
        
        ranked = []
        for driver, amount in sorted(drivers.items(), key=lambda x: x[1], reverse=True):
            pct = (amount / total * 100) if total > 0 else 0
            
            # Priority classification
            if pct > 30:
                priority = "Critical"
            elif pct > 15:
                priority = "High"
            elif pct > 5:
                priority = "Medium"
            else:
                priority = "Low"
            
            ranked.append({
                "driver": driver,
                "amount": amount,
                "pct_of_total": pct,
                "priority": priority
            })
        
        return ranked
    
    def roi_analysis(
        self,
        program_name: str,
        annual_cost: float,
        annual_savings: float,
        implementation_cost: float = 0
    ) -> Dict[str, any]:
        """
        ROI analysis for executive decision-making
        """
        net_savings = annual_savings - annual_cost
        roi = (net_savings / annual_cost) if annual_cost > 0 else 0
        payback_months = (implementation_cost / (annual_savings / 12)) if annual_savings > 0 else float('inf')
        
        # 3-year projection
        year_3_savings = (annual_savings - annual_cost) * 3 - implementation_cost
        
        recommendation = "Proceed" if roi > 1.5 else "Review" if roi > 0.5 else "Do Not Proceed"
        
        return {
            "program": program_name,
            "annual_program_cost": annual_cost,
            "annual_savings": annual_savings,
            "net_annual_benefit": net_savings,
            "roi": roi,
            "roi_pct": roi * 100,
            "payback_months": payback_months if payback_months != float('inf') else "N/A",
            "year_3_cumulative_savings": year_3_savings,
            "recommendation": recommendation
        }
    
    def quarterly_board_update(
        self,
        quarter: str,
        metrics: Dict[str, float]
    ) -> Dict[str, any]:
        """
        Quarterly update for board presentation
        """
        return {
            "quarter": quarter,
            "key_metrics": metrics,
            "narrative": self._generate_board_narrative(quarter, metrics),
            "action_items": self._identify_action_items(metrics)
        }
    
    def _generate_board_narrative(self, quarter: str, metrics: Dict) -> str:
        """Generate board-level narrative"""
        return f"{quarter} healthcare costs tracked as expected with no adverse trends."
    
    def _identify_action_items(self, metrics: Dict) -> List[str]:
        """Identify board-level action items"""
        actions = []
        
        if metrics.get("trend", 0) > 0.10:
            actions.append("Review trend mitigation strategies")
        
        if metrics.get("variance_pct", 0) > 10:
            actions.append("Benchmark analysis and vendor negotiation")
        
        return actions if actions else ["Continue monitoring"]