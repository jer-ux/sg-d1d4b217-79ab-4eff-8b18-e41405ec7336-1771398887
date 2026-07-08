"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
AI Decision Support Engine
"""

import numpy as np
from typing import Dict, List


class AIDecisionEngine:
    """
    AI-powered decision support for healthcare management
    """
    
    def recommend_intervention(
        self,
        cost_drivers: Dict[str, float],
        available_budget: float,
        urgency: str = "medium"
    ) -> List[Dict[str, any]]:
        """
        AI-recommended interventions based on cost drivers
        """
        # Score each driver
        scored_drivers = []
        total_cost = sum(cost_drivers.values())
        
        for driver, cost in cost_drivers.items():
            impact_score = (cost / total_cost) * 100
            
            # Intervention effectiveness (AI model would learn these)
            effectiveness = self._estimate_effectiveness(driver)
            
            # Priority score
            priority = impact_score * effectiveness
            
            scored_drivers.append({
                "driver": driver,
                "cost": cost,
                "impact_pct": impact_score,
                "estimated_effectiveness": effectiveness,
                "priority_score": priority,
                "recommended_intervention": self._map_intervention(driver)
            })
        
        # Sort by priority
        scored_drivers.sort(key=lambda x: x["priority_score"], reverse=True)
        
        return scored_drivers
    
    def _estimate_effectiveness(self, driver: str) -> float:
        """Estimate intervention effectiveness (ML model in production)"""
        effectiveness_map = {
            "Specialty Pharmacy": 0.85,
            "High Cost Claimants": 0.70,
            "ER Utilization": 0.75,
            "Generic Dispensing Rate": 0.90,
            "Preventive Care": 0.65
        }
        return effectiveness_map.get(driver, 0.50)
    
    def _map_intervention(self, driver: str) -> str:
        """Map cost driver to intervention"""
        intervention_map = {
            "Specialty Pharmacy": "Specialty Pharmacy Management Program",
            "High Cost Claimants": "Case Management and Disease Management",
            "ER Utilization": "Telemedicine and Urgent Care Steering",
            "Generic Dispensing Rate": "Formulary Optimization",
            "Preventive Care": "Wellness Program Enhancement"
        }
        return intervention_map.get(driver, "Custom Intervention Required")
    
    def predict_trend(
        self,
        historical_trends: List[float],
        external_factors: Dict[str, float] = None
    ) -> Dict[str, float]:
        """
        AI trend prediction (simplified - would use time series model in production)
        """
        if len(historical_trends) < 3:
            return {"predicted_trend": np.mean(historical_trends), "confidence": "Low"}
        
        # Simple exponential smoothing
        alpha = 0.3
        forecast = historical_trends[-1]
        
        for trend in historical_trends[-3:]:
            forecast = alpha * trend + (1 - alpha) * forecast
        
        # Adjust for external factors
        if external_factors:
            adjustment = sum(external_factors.values()) / len(external_factors)
            forecast += adjustment
        
        # Confidence based on volatility
        volatility = np.std(historical_trends[-6:]) if len(historical_trends) >= 6 else 0.03
        confidence = "High" if volatility < 0.02 else "Medium" if volatility < 0.04 else "Low"
        
        return {
            "predicted_trend": forecast,
            "confidence": confidence,
            "volatility": volatility,
            "lower_bound": forecast - 1.96 * volatility,
            "upper_bound": forecast + 1.96 * volatility
        }
    
    def optimize_plan_design(
        self,
        current_design: Dict[str, float],
        cost_goals: Dict[str, float],
        member_satisfaction_weight: float = 0.3
    ) -> Dict[str, any]:
        """
        AI-optimized plan design recommendations
        """
        # Simulate plan design changes
        recommendations = []
        
        # Deductible optimization
        if current_design.get("deductible", 0) < 1500:
            savings = cost_goals.get("target_savings", 0) * 0.15
            satisfaction_impact = -0.1
            
            recommendations.append({
                "change": "Increase deductible to $1,500",
                "estimated_savings": savings,
                "satisfaction_impact": satisfaction_impact,
                "net_score": savings * 0.7 + satisfaction_impact * member_satisfaction_weight * 100
            })
        
        # HSA/HDHP option
        hdhp_savings = cost_goals.get("target_savings", 0) * 0.25
        recommendations.append({
            "change": "Introduce HSA-eligible HDHP option",
            "estimated_savings": hdhp_savings,
            "satisfaction_impact": 0.05,  # Some members prefer HSA
            "net_score": hdhp_savings * 0.7 + 0.05 * member_satisfaction_weight * 100
        })
        
        # Sort by net score
        recommendations.sort(key=lambda x: x["net_score"], reverse=True)
        
        return {
            "current_design": current_design,
            "recommendations": recommendations,
            "top_recommendation": recommendations[0] if recommendations else None
        }
    
    def anomaly_detection(
        self,
        metric_name: str,
        current_value: float,
        historical_values: List[float]
    ) -> Dict[str, any]:
        """
        AI anomaly detection for healthcare metrics
        """
        if len(historical_values) < 10:
            return {"anomaly_detected": False, "message": "Insufficient historical data"}
        
        # Statistical thresholds
        mean = np.mean(historical_values)
        std = np.std(historical_values)
        
        # Z-score
        z_score = (current_value - mean) / std if std > 0 else 0
        
        # Anomaly if >3 std deviations
        is_anomaly = abs(z_score) > 3
        
        severity = "Critical" if abs(z_score) > 4 else "High" if abs(z_score) > 3 else "Normal"
        
        return {
            "metric": metric_name,
            "current_value": current_value,
            "historical_mean": mean,
            "std_deviation": std,
            "z_score": z_score,
            "anomaly_detected": is_anomaly,
            "severity": severity,
            "recommendation": "Investigate immediately" if is_anomaly else "Continue monitoring"
        }