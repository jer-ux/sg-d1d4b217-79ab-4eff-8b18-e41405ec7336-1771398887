"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
PBM Financial Intelligence Engine
"""

import numpy as np
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class PBMContract:
    pbm_name: str
    contract_type: str  # "Spread", "Pass-Through", "Transparent"
    admin_fee_pepm: float
    guaranteed_discount_pct: float
    guaranteed_generic_rate: float
    rebate_share_pct: float


class PBMIntelligenceEngine:
    """
    PBM contract analysis, spread pricing detection, and fiduciary compliance
    """
    
    def analyze_pbm_economics(
        self,
        ingredient_cost: float,
        dispensing_fee: float,
        pbm_allowed_amount: float,
        actual_acquisition_cost: float = None
    ) -> Dict[str, float]:
        """
        Analyze PBM pricing and identify spread
        """
        # Total cost components
        total_ingredient_and_dispensing = ingredient_cost + dispensing_fee
        
        # Calculate spread (if actual cost known)
        if actual_acquisition_cost:
            spread = pbm_allowed_amount - (actual_acquisition_cost + dispensing_fee)
            spread_pct = spread / pbm_allowed_amount if pbm_allowed_amount > 0 else 0
        else:
            spread = pbm_allowed_amount - total_ingredient_and_dispensing
            spread_pct = spread / pbm_allowed_amount if pbm_allowed_amount > 0 else 0
        
        return {
            "ingredient_cost": ingredient_cost,
            "dispensing_fee": dispensing_fee,
            "pbm_allowed_amount": pbm_allowed_amount,
            "actual_acquisition_cost": actual_acquisition_cost or ingredient_cost,
            "apparent_spread": spread,
            "spread_pct": spread_pct,
            "red_flag": spread_pct > 0.15  # 15%+ spread is concerning
        }
    
    def detect_spread_pricing(
        self,
        claims: List[Dict]
    ) -> Dict[str, any]:
        """
        Analyze claims data to detect spread pricing patterns
        """
        spreads = []
        red_flag_claims = []
        
        for claim in claims:
            ingredient = claim.get("ingredient_cost", 0)
            dispensing = claim.get("dispensing_fee", 0)
            allowed = claim.get("allowed_amount", 0)
            
            spread = allowed - (ingredient + dispensing)
            spread_pct = spread / allowed if allowed > 0 else 0
            
            spreads.append(spread)
            
            if spread_pct > 0.15:
                red_flag_claims.append({
                    "claim_id": claim.get("id"),
                    "drug_name": claim.get("drug_name"),
                    "spread": spread,
                    "spread_pct": spread_pct
                })
        
        return {
            "total_claims_analyzed": len(claims),
            "total_spread": sum(spreads),
            "avg_spread_per_claim": np.mean(spreads) if spreads else 0,
            "median_spread": float(np.median(spreads)) if spreads else 0,
            "red_flag_claims_count": len(red_flag_claims),
            "red_flag_claims": red_flag_claims[:10],  # Top 10
            "estimated_annual_overpayment": sum(spreads) * 12 if spreads else 0
        }
    
    def fiduciary_leakage_analysis(
        self,
        total_pharmacy_spend: float,
        rebates_retained_by_pbm: float,
        spread_pricing_amount: float,
        admin_fees: float
    ) -> Dict[str, float]:
        """
        Identify total fiduciary leakage in PBM relationship
        """
        # Calculate leakage sources
        leakage = rebates_retained_by_pbm + spread_pricing_amount
        
        # Total spend including hidden costs
        true_total_cost = total_pharmacy_spend + leakage
        
        # Leakage percentage
        leakage_pct = leakage / true_total_cost if true_total_cost > 0 else 0
        
        return {
            "reported_pharmacy_spend": total_pharmacy_spend,
            "rebates_retained_by_pbm": rebates_retained_by_pbm,
            "spread_pricing_leakage": spread_pricing_amount,
            "admin_fees": admin_fees,
            "total_leakage": leakage,
            "true_total_cost": true_total_cost,
            "leakage_pct": leakage_pct,
            "annual_leakage_estimate": leakage * 12,
            "fiduciary_breach_risk": "High" if leakage_pct > 0.10 else "Moderate" if leakage_pct > 0.05 else "Low"
        }
    
    def transparent_vs_spread_comparison(
        self,
        annual_rx_spend: float,
        spread_model_admin_fee_pepm: float = 3.50,
        transparent_model_admin_fee_pepm: float = 8.00,
        members: int = 1000,
        estimated_spread_pct: float = 0.12
    ) -> Dict[str, float]:
        """
        Compare spread pricing vs transparent pass-through PBM models
        """
        # Spread model
        spread_admin = spread_model_admin_fee_pepm * members * 12
        spread_leakage = annual_rx_spend * estimated_spread_pct
        spread_total = annual_rx_spend + spread_admin + spread_leakage
        
        # Transparent model
        transparent_admin = transparent_model_admin_fee_pepm * members * 12
        transparent_total = annual_rx_spend + transparent_admin
        
        # Comparison
        savings = spread_total - transparent_total
        savings_pct = savings / spread_total if spread_total > 0 else 0
        
        return {
            "annual_rx_spend": annual_rx_spend,
            "spread_model_admin": spread_admin,
            "spread_model_leakage": spread_leakage,
            "spread_model_total": spread_total,
            "transparent_model_admin": transparent_admin,
            "transparent_model_total": transparent_total,
            "savings_from_transparent": savings,
            "savings_pct": savings_pct,
            "recommendation": "Switch to Transparent" if savings > 0 else "Review Contract"
        }
    
    def rebate_retention_analysis(
        self,
        manufacturer_rebates: float,
        pbm_retained_rebates: float,
        admin_fee_rebate: float = 0
    ) -> Dict[str, float]:
        """
        Analyze rebate flow and retention
        """
        employer_rebates = manufacturer_rebates - pbm_retained_rebates - admin_fee_rebate
        employer_share_pct = employer_rebates / manufacturer_rebates if manufacturer_rebates > 0 else 0
        pbm_share_pct = pbm_retained_rebates / manufacturer_rebates if manufacturer_rebates > 0 else 0
        
        return {
            "total_manufacturer_rebates": manufacturer_rebates,
            "pbm_retained_rebates": pbm_retained_rebates,
            "admin_fee_on_rebates": admin_fee_rebate,
            "employer_received_rebates": employer_rebates,
            "employer_share_pct": employer_share_pct,
            "pbm_share_pct": pbm_share_pct,
            "fiduciary_concern": "Yes" if employer_share_pct < 0.90 else "No"
        }