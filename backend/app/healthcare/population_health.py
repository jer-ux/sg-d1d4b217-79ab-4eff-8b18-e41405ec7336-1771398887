"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Population Health Modeling Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class PopulationSegment:
    segment_name: str
    member_count: int
    avg_age: float
    risk_score: float
    cost_pmpm: float
    interventions: List[str]


class PopulationHealthEngine:
    """
    Population segmentation and care management program ROI modeling
    """
    
    def segment_population(
        self,
        members: List[Dict],
        segmentation_strategy: str = "risk_based"
    ) -> List[PopulationSegment]:
        """
        Segment population by risk, cost, or condition
        """
        if segmentation_strategy == "risk_based":
            return self._segment_by_risk(members)
        elif segmentation_strategy == "cost_based":
            return self._segment_by_cost(members)
        else:
            return self._segment_by_condition(members)
    
    def _segment_by_risk(self, members: List[Dict]) -> List[PopulationSegment]:
        """Segment by risk score"""
        low_risk = [m for m in members if m.get("risk_score", 1.0) < 1.0]
        medium_risk = [m for m in members if 1.0 <= m.get("risk_score", 1.0) < 2.0]
        high_risk = [m for m in members if m.get("risk_score", 1.0) >= 2.0]
        
        segments = []
        for group, name in [(low_risk, "Low Risk"), (medium_risk, "Medium Risk"), (high_risk, "High Risk")]:
            if group:
                segments.append(PopulationSegment(
                    segment_name=name,
                    member_count=len(group),
                    avg_age=np.mean([m.get("age", 45) for m in group]),
                    risk_score=np.mean([m.get("risk_score", 1.0) for m in group]),
                    cost_pmpm=np.mean([m.get("pmpm", 400) for m in group]),
                    interventions=self._recommend_interventions(name)
                ))
        
        return segments
    
    def _segment_by_cost(self, members: List[Dict]) -> List[PopulationSegment]:
        """Segment by cost tier"""
        costs = [m.get("annual_cost", 5000) for m in members]
        p80 = np.percentile(costs, 80)
        
        high_cost = [m for m in members if m.get("annual_cost", 5000) >= p80]
        other = [m for m in members if m.get("annual_cost", 5000) < p80]
        
        return [
            PopulationSegment(
                segment_name="High Cost",
                member_count=len(high_cost),
                avg_age=np.mean([m.get("age", 45) for m in high_cost]),
                risk_score=np.mean([m.get("risk_score", 1.0) for m in high_cost]),
                cost_pmpm=np.mean([m.get("pmpm", 400) for m in high_cost]),
                interventions=["Case Management", "Specialty Care Coordination"]
            ),
            PopulationSegment(
                segment_name="Standard Cost",
                member_count=len(other),
                avg_age=np.mean([m.get("age", 45) for m in other]),
                risk_score=np.mean([m.get("risk_score", 1.0) for m in other]),
                cost_pmpm=np.mean([m.get("pmpm", 400) for m in other]),
                interventions=["Wellness Programs", "Preventive Care Outreach"]
            )
        ]
    
    def _segment_by_condition(self, members: List[Dict]) -> List[PopulationSegment]:
        """Segment by chronic conditions"""
        diabetic = [m for m in members if "diabetes" in m.get("conditions", [])]
        cardiac = [m for m in members if "heart_disease" in m.get("conditions", [])]
        healthy = [m for m in members if not m.get("conditions", [])]
        
        segments = []
        for group, name, interventions in [
            (diabetic, "Diabetic", ["Diabetes Management", "Nutrition Coaching"]),
            (cardiac, "Cardiac", ["Cardiac Rehab", "Medication Adherence"]),
            (healthy, "Healthy", ["Wellness", "Preventive Screening"])
        ]:
            if group:
                segments.append(PopulationSegment(
                    segment_name=name,
                    member_count=len(group),
                    avg_age=np.mean([m.get("age", 45) for m in group]),
                    risk_score=np.mean([m.get("risk_score", 1.0) for m in group]),
                    cost_pmpm=np.mean([m.get("pmpm", 400) for m in group]),
                    interventions=interventions
                ))
        
        return segments
    
    def _recommend_interventions(self, segment: str) -> List[str]:
        """Recommend interventions by segment"""
        recommendations = {
            "Low Risk": ["Wellness Programs", "Preventive Screening", "Health Education"],
            "Medium Risk": ["Care Coaching", "Chronic Disease Management", "Medication Adherence"],
            "High Risk": ["Case Management", "Specialist Coordination", "24/7 Nurse Line"]
        }
        return recommendations.get(segment, [])
    
    def care_management_roi(
        self,
        program_cost_per_member: float,
        targeted_members: int,
        expected_cost_reduction: float = 0.08,
        baseline_pmpm: float = 450
    ) -> Dict[str, float]:
        """
        Calculate ROI for care management programs
        """
        annual_program_cost = program_cost_per_member * targeted_members * 12
        baseline_annual_cost = baseline_pmpm * targeted_members * 12
        
        # Expected savings
        annual_savings = baseline_annual_cost * expected_cost_reduction
        
        net_savings = annual_savings - annual_program_cost
        roi = (net_savings / annual_program_cost) if annual_program_cost > 0 else 0
        
        return {
            "program_cost_annual": annual_program_cost,
            "expected_savings": annual_savings,
            "net_savings": net_savings,
            "roi": roi,
            "roi_pct": roi * 100,
            "break_even_reduction": (program_cost_per_member / baseline_pmpm) if baseline_pmpm > 0 else 0
        }