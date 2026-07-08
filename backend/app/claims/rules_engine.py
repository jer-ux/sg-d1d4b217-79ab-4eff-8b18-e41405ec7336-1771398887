"""
KINCAID HEALTH™ CLAIMS INTELLIGENCE
Claims Rules Engine - Validation & Anomaly Detection
"""

from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
import numpy as np


class ClaimsRulesEngine:
    """
    Validates claims against business rules, detects anomalies,
    and identifies potential fraud, waste, and abuse.
    """
    
    def __init__(self):
        self.rules = self._initialize_rules()
        self.validation_results = []
        
    def _initialize_rules(self) -> Dict[str, Any]:
        """Initialize standard healthcare claims validation rules."""
        return {
            "temporal": {
                "service_date_in_future": True,
                "service_date_too_old": 365,  # days
                "date_of_death_check": True,
                "eligibility_verification": True
            },
            "financial": {
                "outlier_threshold_std": 3.0,
                "duplicate_claim_window": 7,  # days
                "max_charge_multiplier": 10.0,  # vs. allowed
                "zero_paid_check": True
            },
            "clinical": {
                "age_gender_procedure_match": True,
                "diagnosis_procedure_correlation": True,
                "max_units_per_day": {
                    "office_visit": 3,
                    "lab": 50,
                    "imaging": 5
                },
                "impossible_combinations": True
            },
            "provider": {
                "license_verification": True,
                "specialty_match": True,
                "out_of_network_flag": True,
                "bill_type_validation": True
            },
            "pharmacy": {
                "days_supply_limit": 90,
                "quantity_limits": True,
                "age_restrictions": True,
                "duplicate_therapy": 30,  # days
                "prior_authorization_check": True
            }
        }
    
    def validate_claim(
        self,
        claim: Dict[str, Any],
        member_data: Dict[str, Any],
        provider_data: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Validate a single claim against all applicable rules.
        
        Args:
            claim: Claim data dictionary
            member_data: Member eligibility and demographic data
            provider_data: Provider directory information
            
        Returns:
            Validation results with flags and severity
        """
        results = {
            "claim_id": claim.get("claim_id"),
            "valid": True,
            "flags": [],
            "errors": [],
            "warnings": [],
            "severity": "none"
        }
        
        # Temporal validation
        temporal_flags = self._validate_temporal(claim, member_data)
        results["flags"].extend(temporal_flags)
        
        # Financial validation
        financial_flags = self._validate_financial(claim)
        results["flags"].extend(financial_flags)
        
        # Clinical validation
        clinical_flags = self._validate_clinical(claim, member_data)
        results["flags"].extend(clinical_flags)
        
        # Provider validation
        if provider_data:
            provider_flags = self._validate_provider(claim, provider_data)
            results["flags"].extend(provider_flags)
        
        # Categorize flags
        for flag in results["flags"]:
            if flag["severity"] == "error":
                results["errors"].append(flag)
                results["valid"] = False
            elif flag["severity"] == "warning":
                results["warnings"].append(flag)
        
        # Overall severity
        if results["errors"]:
            results["severity"] = "error"
        elif results["warnings"]:
            results["severity"] = "warning"
        
        self.validation_results.append(results)
        return results
    
    def _validate_temporal(
        self,
        claim: Dict[str, Any],
        member_data: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Validate date-related rules."""
        flags = []
        service_date = claim.get("service_date")
        
        if not service_date:
            flags.append({
                "rule": "missing_service_date",
                "severity": "error",
                "message": "Service date is required"
            })
            return flags
        
        # Future date check
        if service_date > datetime.now():
            flags.append({
                "rule": "service_date_in_future",
                "severity": "error",
                "message": f"Service date {service_date} is in the future"
            })
        
        # Too old check
        if (datetime.now() - service_date).days > self.rules["temporal"]["service_date_too_old"]:
            flags.append({
                "rule": "service_date_too_old",
                "severity": "warning",
                "message": f"Service date is over {self.rules['temporal']['service_date_too_old']} days old"
            })
        
        # Eligibility check
        member_eff_date = member_data.get("effective_date")
        member_term_date = member_data.get("termination_date")
        
        if member_eff_date and service_date < member_eff_date:
            flags.append({
                "rule": "service_before_eligibility",
                "severity": "error",
                "message": "Service date before member eligibility start"
            })
        
        if member_term_date and service_date > member_term_date:
            flags.append({
                "rule": "service_after_termination",
                "severity": "error",
                "message": "Service date after member eligibility end"
            })
        
        return flags
    
    def _validate_financial(self, claim: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Validate financial amounts and patterns."""
        flags = []
        
        charged_amt = claim.get("charged_amount", 0)
        allowed_amt = claim.get("allowed_amount", 0)
        paid_amt = claim.get("paid_amount", 0)
        
        # Zero paid check
        if paid_amt == 0 and charged_amt > 0:
            flags.append({
                "rule": "zero_paid_nonzero_charge",
                "severity": "warning",
                "message": "Claim has charges but zero payment"
            })
        
        # Charge vs allowed outlier
        if allowed_amt > 0:
            ratio = charged_amt / allowed_amt
            if ratio > self.rules["financial"]["max_charge_multiplier"]:
                flags.append({
                    "rule": "excessive_charges",
                    "severity": "warning",
                    "message": f"Charges are {ratio:.1f}x allowed amount"
                })
        
        # Negative amounts
        if charged_amt < 0 or paid_amt < 0:
            flags.append({
                "rule": "negative_amount",
                "severity": "error",
                "message": "Negative financial amount detected"
            })
        
        # Paid exceeds allowed
        if paid_amt > allowed_amt * 1.01:  # 1% tolerance
            flags.append({
                "rule": "overpayment",
                "severity": "error",
                "message": f"Paid amount (${paid_amt:.2f}) exceeds allowed (${allowed_amt:.2f})"
            })
        
        return flags
    
    def _validate_clinical(
        self,
        claim: Dict[str, Any],
        member_data: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Validate clinical logic and appropriateness."""
        flags = []
        
        procedure = claim.get("procedure_code")
        diagnosis_codes = claim.get("diagnosis_codes", [])
        member_age = member_data.get("age")
        member_gender = claim.get("member_gender")
        
        # Age/gender/procedure validation
        if procedure and member_age is not None and member_gender:
            if self._is_age_gender_mismatch(procedure, member_age, member_gender):
                flags.append({
                    "rule": "age_gender_procedure_mismatch",
                    "severity": "warning",
                    "message": f"Procedure {procedure} unusual for age {member_age}, gender {member_gender}"
                })
        
        # Missing diagnosis
        if not diagnosis_codes or len(diagnosis_codes) == 0:
            flags.append({
                "rule": "missing_diagnosis",
                "severity": "warning",
                "message": "No diagnosis codes present"
            })
        
        # Units validation
        units = claim.get("units", 1)
        if units > 100:  # Arbitrary threshold
            flags.append({
                "rule": "excessive_units",
                "severity": "warning",
                "message": f"{units} units seems excessive"
            })
        
        return flags
    
    def _validate_provider(
        self,
        claim: Dict[str, Any],
        provider_data: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Validate provider-related rules."""
        flags = []
        
        provider_npi = claim.get("provider_npi")
        provider_specialty = provider_data.get("specialty")
        procedure = claim.get("procedure_code")
        
        # License verification
        if not provider_data.get("active_license"):
            flags.append({
                "rule": "inactive_license",
                "severity": "error",
                "message": "Provider license is inactive"
            })
        
        # Specialty match
        if provider_specialty and procedure:
            if not self._is_specialty_match(provider_specialty, procedure):
                flags.append({
                    "rule": "specialty_mismatch",
                    "severity": "warning",
                    "message": f"Procedure {procedure} unusual for specialty {provider_specialty}"
                })
        
        return flags
    
    def _is_age_gender_mismatch(
        self,
        procedure: str,
        age: int,
        gender: str
    ) -> bool:
        """Check if procedure is appropriate for age/gender."""
        # Simplified logic - real system would use comprehensive rules
        gender_specific = {
            "obstetric": ["F"],
            "prostate": ["M"],
            "mammogram": ["F"],
            "vasectomy": ["M"]
        }
        
        for category, allowed_genders in gender_specific.items():
            if category in procedure.lower() and gender not in allowed_genders:
                return True
        
        return False
    
    def _is_specialty_match(self, specialty: str, procedure: str) -> bool:
        """Check if procedure matches provider specialty."""
        # Simplified - real system would have comprehensive mapping
        specialty_procedures = {
            "cardiology": ["cardiac", "heart", "ekg", "echo"],
            "orthopedic": ["joint", "fracture", "bone", "spine"],
            "dermatology": ["skin", "lesion", "biopsy"]
        }
        
        specialty_lower = specialty.lower()
        if specialty_lower in specialty_procedures:
            keywords = specialty_procedures[specialty_lower]
            return any(kw in procedure.lower() for kw in keywords)
        
        return True  # Default to valid
    
    def detect_duplicate_claims(
        self,
        claims: List[Dict[str, Any]],
        window_days: int = 7
    ) -> List[Dict[str, Any]]:
        """
        Detect potential duplicate claims within a time window.
        
        Args:
            claims: List of claim dictionaries
            window_days: Time window for duplicate detection
            
        Returns:
            List of duplicate claim groups
        """
        duplicates = []
        
        # Sort by member, provider, service date
        sorted_claims = sorted(
            claims,
            key=lambda c: (
                c.get("member_id", ""),
                c.get("provider_npi", ""),
                c.get("service_date", datetime.min)
            )
        )
        
        for i, claim in enumerate(sorted_claims):
            for j in range(i + 1, len(sorted_claims)):
                other = sorted_claims[j]
                
                # Check if potentially duplicate
                if self._are_duplicate_claims(claim, other, window_days):
                    duplicates.append({
                        "claim_1": claim.get("claim_id"),
                        "claim_2": other.get("claim_id"),
                        "reason": "Same member, provider, procedure within window",
                        "severity": "high" if claim.get("paid_amount", 0) > 1000 else "medium"
                    })
        
        return duplicates
    
    def _are_duplicate_claims(
        self,
        claim1: Dict[str, Any],
        claim2: Dict[str, Any],
        window_days: int
    ) -> bool:
        """Check if two claims are potential duplicates."""
        # Same member
        if claim1.get("member_id") != claim2.get("member_id"):
            return False
        
        # Same provider
        if claim1.get("provider_npi") != claim2.get("provider_npi"):
            return False
        
        # Same procedure
        if claim1.get("procedure_code") != claim2.get("procedure_code"):
            return False
        
        # Within time window
        date1 = claim1.get("service_date")
        date2 = claim2.get("service_date")
        if date1 and date2:
            if abs((date1 - date2).days) > window_days:
                return False
        
        return True
    
    def get_validation_summary(self) -> Dict[str, Any]:
        """Get summary statistics of validation results."""
        total = len(self.validation_results)
        if total == 0:
            return {"total_claims": 0}
        
        valid = sum(1 for r in self.validation_results if r["valid"])
        errors = sum(len(r["errors"]) for r in self.validation_results)
        warnings = sum(len(r["warnings"]) for r in self.validation_results)
        
        return {
            "total_claims": total,
            "valid_claims": valid,
            "invalid_claims": total - valid,
            "validation_rate": (valid / total) * 100,
            "total_errors": errors,
            "total_warnings": warnings,
            "avg_errors_per_claim": errors / total,
            "avg_warnings_per_claim": warnings / total
        }