"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Board Reporting Engine
"""

from typing import Dict, List
import numpy as np


class BoardReporter:
    """
    Generate board-level governance reports
    """
    
    def fiduciary_compliance_report(
        self,
        total_spend: float,
        audit_findings: List[Dict],
        policy_compliance_score: float
    ) -> Dict[str, any]:
        """
        Fiduciary compliance report for board review
        """
        # Classify findings by severity
        critical = [f for f in audit_findings if f.get("severity") == "critical"]
        high = [f for f in audit_findings if f.get("severity") == "high"]
        medium = [f for f in audit_findings if f.get("severity") == "medium"]
        
        # Overall risk rating
        if critical:
            risk_rating = "High Risk"
        elif len(high) >= 3:
            risk_rating = "Moderate-High Risk"
        elif len(high) >= 1 or len(medium) >= 5:
            risk_rating = "Moderate Risk"
        else:
            risk_rating = "Low Risk"
        
        return {
            "total_plan_spend": total_spend,
            "findings_summary": {
                "critical": len(critical),
                "high": len(high),
                "medium": len(medium),
                "low": len(audit_findings) - len(critical) - len(high) - len(medium)
            },
            "policy_compliance_score": policy_compliance_score,
            "overall_risk_rating": risk_rating,
            "board_action_required": len(critical) > 0 or len(high) >= 2,
            "detailed_findings": audit_findings[:5]  # Top 5 for board review
        }
    
    def cost_containment_scorecard(
        self,
        baseline_pmpm: float,
        current_pmpm: float,
        target_pmpm: float,
        initiatives: List[Dict[str, float]]
    ) -> Dict[str, any]:
        """
        Cost containment scorecard for board
        """
        # Calculate performance
        actual_savings = baseline_pmpm - current_pmpm
        target_savings = baseline_pmpm - target_pmpm
        achievement_pct = (actual_savings / target_savings) if target_savings != 0 else 0
        
        # Grade performance
        if achievement_pct >= 1.0:
            grade = "A - Exceeds Target"
        elif achievement_pct >= 0.90:
            grade = "B - Meets Target"
        elif achievement_pct >= 0.75:
            grade = "C - Approaching Target"
        else:
            grade = "D - Below Target"
        
        # Initiative effectiveness
        initiative_results = []
        for init in initiatives:
            roi = (init["savings"] / init["cost"]) if init["cost"] > 0 else 0
            initiative_results.append({
                "name": init["name"],
                "investment": init["cost"],
                "savings": init["savings"],
                "roi": roi,
                "status": "Effective" if roi > 2.0 else "Marginal" if roi > 1.0 else "Underperforming"
            })
        
        return {
            "baseline_pmpm": baseline_pmpm,
            "current_pmpm": current_pmpm,
            "target_pmpm": target_pmpm,
            "actual_savings": actual_savings,
            "target_savings": target_savings,
            "achievement_pct": achievement_pct * 100,
            "performance_grade": grade,
            "initiatives": initiative_results
        }
    
    def strategic_risk_dashboard(
        self,
        risks: List[Dict[str, any]]
    ) -> Dict[str, any]:
        """
        Strategic healthcare risk dashboard
        """
        # Categorize and prioritize risks
        categorized = {
            "Financial": [],
            "Regulatory": [],
            "Operational": [],
            "Strategic": []
        }
        
        for risk in risks:
            category = risk.get("category", "Operational")
            if category in categorized:
                categorized[category].append(risk)
        
        # Calculate aggregate risk score
        total_exposure = sum(r.get("financial_impact", 0) * r.get("probability", 0) for r in risks)
        
        return {
            "total_identified_risks": len(risks),
            "categorized_risks": categorized,
            "aggregate_financial_exposure": total_exposure,
            "top_3_risks": sorted(risks, key=lambda x: x.get("priority_score", 0), reverse=True)[:3],
            "mitigation_status": self._assess_mitigation_status(risks)
        }
    
    def _assess_mitigation_status(self, risks: List[Dict]) -> Dict[str, int]:
        """Assess risk mitigation status"""
        status = {
            "Fully Mitigated": 0,
            "In Progress": 0,
            "Not Started": 0
        }
        
        for risk in risks:
            mitigation = risk.get("mitigation_status", "Not Started")
            if mitigation in status:
                status[mitigation] += 1
        
        return status
    
    def annual_governance_summary(
        self,
        year: int,
        key_decisions: List[str],
        financial_summary: Dict[str, float],
        compliance_metrics: Dict[str, float]
    ) -> Dict[str, any]:
        """
        Annual governance summary for board
        """
        return {
            "fiscal_year": year,
            "governance_highlights": {
                "board_meetings": 4,  # Quarterly
                "key_decisions": key_decisions,
                "policies_reviewed": len(key_decisions)
            },
            "financial_stewardship": financial_summary,
            "compliance_performance": compliance_metrics,
            "forward_looking": {
                "next_year_priorities": self._generate_priorities(financial_summary, compliance_metrics),
                "strategic_initiatives": []
            }
        }
    
    def _generate_priorities(
        self,
        financial: Dict[str, float],
        compliance: Dict[str, float]
    ) -> List[str]:
        """Generate next year priorities"""
        priorities = []
        
        if financial.get("trend", 0) > 0.08:
            priorities.append("Cost trend management")
        
        if compliance.get("score", 100) < 90:
            priorities.append("Compliance enhancement")
        
        priorities.append("Vendor performance review")
        
        return priorities