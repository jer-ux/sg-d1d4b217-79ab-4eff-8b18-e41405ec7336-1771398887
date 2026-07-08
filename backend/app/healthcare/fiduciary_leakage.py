"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Fiduciary Leakage Detection Engine
"""

import numpy as np
from typing import Dict, List


class FiduciaryLeakageEngine:
    """
    Detect undisclosed revenue streams and fiduciary breaches
    """
    
    def rebate_retention_analysis(
        self,
        manufacturer_rebates: float,
        employer_received_rebates: float,
        pbm_admin_fee: float
    ) -> Dict[str, float]:
        """
        Detect rebate retention by PBM
        """
        # Expected pass-through: 100% minus reasonable admin fee (2-5%)
        reasonable_retention = manufacturer_rebates * 0.03  # 3% admin
        actual_retention = manufacturer_rebates - employer_received_rebates
        
        excess_retention = actual_retention - reasonable_retention
        employer_share_pct = (employer_received_rebates / manufacturer_rebates) if manufacturer_rebates > 0 else 0
        
        # Fiduciary concern if employer gets <90%
        fiduciary_concern = employer_share_pct < 0.90
        
        return {
            "manufacturer_rebates": manufacturer_rebates,
            "employer_received": employer_received_rebates,
            "employer_share_pct": employer_share_pct,
            "pbm_admin_fee": pbm_admin_fee,
            "actual_retention": actual_retention,
            "reasonable_retention": reasonable_retention,
            "excess_retention": excess_retention,
            "fiduciary_concern": fiduciary_concern,
            "estimated_annual_leakage": excess_retention
        }
    
    def undisclosed_revenue_streams(
        self,
        disclosed_revenue: float,
        total_pbm_gross_profit: float,
        employer_spend: float
    ) -> Dict[str, float]:
        """
        Estimate undisclosed PBM revenue
        """
        # Calculate effective rate
        disclosed_rate = (disclosed_revenue / employer_spend) if employer_spend > 0 else 0
        
        # Undisclosed = Total profit - Disclosed revenue
        undisclosed_revenue = total_pbm_gross_profit - disclosed_revenue
        undisclosed_rate = (undisclosed_revenue / employer_spend) if employer_spend > 0 else 0
        
        # Transparency score
        transparency_pct = (disclosed_revenue / total_pbm_gross_profit) if total_pbm_gross_profit > 0 else 0
        
        return {
            "employer_spend": employer_spend,
            "disclosed_revenue": disclosed_revenue,
            "disclosed_rate": disclosed_rate,
            "total_pbm_profit": total_pbm_gross_profit,
            "undisclosed_revenue": undisclosed_revenue,
            "undisclosed_rate": undisclosed_rate,
            "transparency_score": transparency_pct,
            "grade": "A" if transparency_pct > 0.90 else "B" if transparency_pct > 0.75 else "C" if transparency_pct > 0.50 else "F"
        }
    
    def formulary_steering_analysis(
        self,
        preferred_drug_cost: float,
        therapeutic_equivalent_cost: float,
        pbm_rebate_on_preferred: float,
        preferred_prescriptions: int,
        total_prescriptions: int
    ) -> Dict[str, any]:
        """
        Detect formulary steering for PBM financial benefit
        """
        # Net cost comparison
        net_preferred = preferred_drug_cost - pbm_rebate_on_preferred
        net_equivalent = therapeutic_equivalent_cost
        
        # Employer perspective
        employer_pays_more = preferred_drug_cost > therapeutic_equivalent_cost
        pbm_keeps_rebate = pbm_rebate_on_preferred > 0
        
        # Calculate leakage
        if employer_pays_more and pbm_keeps_rebate:
            leakage_per_rx = preferred_drug_cost - therapeutic_equivalent_cost
            total_leakage = leakage_per_rx * preferred_prescriptions
            steering_detected = True
        else:
            leakage_per_rx = 0
            total_leakage = 0
            steering_detected = False
        
        return {
            "preferred_drug_cost": preferred_drug_cost,
            "therapeutic_equivalent_cost": therapeutic_equivalent_cost,
            "pbm_rebate": pbm_rebate_on_preferred,
            "net_preferred_to_pbm": net_preferred,
            "net_equivalent_to_pbm": net_equivalent,
            "employer_pays_more": employer_pays_more,
            "pbm_keeps_rebate": pbm_keeps_rebate,
            "steering_detected": steering_detected,
            "leakage_per_rx": leakage_per_rx,
            "affected_prescriptions": preferred_prescriptions,
            "total_leakage": total_leakage
        }
    
    def audit_rights_compliance(
        self,
        contract_audit_rights: List[str],
        actual_audit_access: List[str]
    ) -> Dict[str, any]:
        """
        Check if PBM is honoring audit rights
        """
        # Compare contracted vs actual access
        missing_rights = [right for right in contract_audit_rights if right not in actual_audit_access]
        compliance_pct = (len(actual_audit_access) / len(contract_audit_rights)) if contract_audit_rights else 0
        
        return {
            "contracted_audit_rights": contract_audit_rights,
            "actual_audit_access": actual_audit_access,
            "missing_rights": missing_rights,
            "compliance_pct": compliance_pct,
            "compliant": len(missing_rights) == 0,
            "fiduciary_concern": len(missing_rights) > 0
        }
    
    def data_transparency_score(
        self,
        provided_data_fields: List[str],
        required_data_fields: List[str]
    ) -> Dict[str, any]:
        """
        Score PBM data transparency
        """
        provided_set = set(provided_data_fields)
        required_set = set(required_data_fields)
        
        provided_count = len(provided_set.intersection(required_set))
        missing_fields = list(required_set - provided_set)
        
        transparency_score = (provided_count / len(required_set)) if required_set else 0
        
        grade = "A" if transparency_score >= 0.95 else "B" if transparency_score >= 0.85 else "C" if transparency_score >= 0.70 else "F"
        
        return {
            "required_fields": len(required_set),
            "provided_fields": provided_count,
            "missing_fields": missing_fields,
            "transparency_score": transparency_score,
            "grade": grade,
            "fiduciary_concern": transparency_score < 0.85
        }
    
    def aggregate_leakage_estimate(
        self,
        spread_leakage: float,
        rebate_leakage: float,
        steering_leakage: float,
        undisclosed_fees: float
    ) -> Dict[str, float]:
        """
        Aggregate all detected leakage sources
        """
        total_leakage = spread_leakage + rebate_leakage + steering_leakage + undisclosed_fees
        
        # Breakdown by source
        breakdown = {
            "Spread Pricing": spread_leakage,
            "Rebate Retention": rebate_leakage,
            "Formulary Steering": steering_leakage,
            "Undisclosed Fees": undisclosed_fees
        }
        
        # Largest source
        largest_source = max(breakdown, key=breakdown.get)
        
        return {
            "total_annual_leakage": total_leakage,
            "spread_leakage": spread_leakage,
            "rebate_leakage": rebate_leakage,
            "steering_leakage": steering_leakage,
            "undisclosed_fees": undisclosed_fees,
            "largest_source": largest_source,
            "largest_amount": breakdown[largest_source]
        }