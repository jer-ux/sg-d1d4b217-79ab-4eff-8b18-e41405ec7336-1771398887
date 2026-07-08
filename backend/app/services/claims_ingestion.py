"""
KINCAID HEALTH™ CLAIMS INGESTION PIPELINE
Medical & Pharmacy Claims Processing
"""

from typing import Dict, List, Any, Optional
from datetime import datetime, date
from sqlalchemy.orm import Session
from sqlalchemy import and_
import logging

from ..models import (
    Claim, ClaimLine, ClaimDiagnosis, ClaimProcedure,
    Member, Eligibility, Provider, Facility, Organization
)
from ..models.claim import ClaimTypeEnum, ClaimStatusEnum
from ..claims.rules_engine import ClaimsRulesEngine

logger = logging.getLogger(__name__)


class ClaimsIngestionPipeline:
    """
    Enterprise-grade claims ingestion pipeline
    Handles EDI 837, flat files, and API submissions
    """
    
    def __init__(self, db: Session, organization_id: int):
        self.db = db
        self.organization_id = organization_id
        self.rules_engine = ClaimsRulesEngine()
        self.stats = {
            "received": 0,
            "processed": 0,
            "errors": 0,
            "warnings": 0,
            "duplicates": 0
        }
    
    def ingest_claim_batch(
        self,
        claims_data: List[Dict[str, Any]],
        auto_validate: bool = True
    ) -> Dict[str, Any]:
        """
        Ingest a batch of claims
        
        Args:
            claims_data: List of claim dictionaries
            auto_validate: Run validation rules automatically
            
        Returns:
            Ingestion summary with stats and errors
        """
        results = []
        
        for claim_data in claims_data:
            try:
                self.stats["received"] += 1
                result = self._ingest_single_claim(claim_data, auto_validate)
                results.append(result)
                
                if result["status"] == "SUCCESS":
                    self.stats["processed"] += 1
                elif result["status"] == "DUPLICATE":
                    self.stats["duplicates"] += 1
                else:
                    self.stats["errors"] += 1
                    
                if result.get("warnings"):
                    self.stats["warnings"] += len(result["warnings"])
                    
            except Exception as e:
                logger.error(f"Error ingesting claim: {str(e)}")
                self.stats["errors"] += 1
                results.append({
                    "status": "ERROR",
                    "error": str(e),
                    "claim_id": claim_data.get("claim_id", "UNKNOWN")
                })
        
        self.db.commit()
        
        return {
            "summary": self.stats,
            "results": results
        }
    
    def _ingest_single_claim(
        self,
        claim_data: Dict[str, Any],
        auto_validate: bool
    ) -> Dict[str, Any]:
        """Process a single claim"""
        
        # Check for duplicates
        existing = self.db.query(Claim).filter(
            and_(
                Claim.claim_id == claim_data["claim_id"],
                Claim.organization_id == self.organization_id
            )
        ).first()
        
        if existing:
            return {
                "status": "DUPLICATE",
                "claim_id": claim_data["claim_id"],
                "existing_id": existing.id
            }
        
        # Validate member exists
        member = self._get_or_create_member(claim_data)
        if not member:
            return {
                "status": "ERROR",
                "error": "Member not found or invalid",
                "claim_id": claim_data["claim_id"]
            }
        
        # Create claim header
        claim = Claim(
            claim_id=claim_data["claim_id"],
            claim_number=claim_data.get("claim_number"),
            member_id=member.id,
            subscriber_id=claim_data.get("subscriber_id"),
            organization_id=self.organization_id,
            
            # Dates
            service_date_from=self._parse_date(claim_data["service_date_from"]),
            service_date_to=self._parse_date(claim_data["service_date_to"]),
            received_date=self._parse_date(claim_data.get("received_date", datetime.now())),
            processed_date=self._parse_date(claim_data.get("processed_date")) if claim_data.get("processed_date") else None,
            paid_date=self._parse_date(claim_data.get("paid_date")) if claim_data.get("paid_date") else None,
            
            # Classification
            claim_type=ClaimTypeEnum(claim_data["claim_type"]),
            place_of_service=claim_data.get("place_of_service"),
            admission_type=claim_data.get("admission_type"),
            bill_type=claim_data.get("bill_type"),
            
            # Financial
            billed_amount=float(claim_data.get("billed_amount", 0)),
            allowed_amount=float(claim_data.get("allowed_amount", 0)),
            paid_amount=float(claim_data.get("paid_amount", 0)),
            member_responsibility=float(claim_data.get("member_responsibility", 0)),
            deductible_applied=float(claim_data.get("deductible_applied", 0)),
            coinsurance_applied=float(claim_data.get("coinsurance_applied", 0)),
            copay_applied=float(claim_data.get("copay_applied", 0)),
            cob_amount=float(claim_data.get("cob_amount", 0)),
            
            # Status
            status=ClaimStatusEnum(claim_data.get("status", "RECEIVED"))
        )
        
        self.db.add(claim)
        self.db.flush()  # Get claim.id
        
        # Add claim lines
        for line_data in claim_data.get("lines", []):
            line = ClaimLine(
                claim_id=claim.id,
                line_number=line_data["line_number"],
                procedure_code=line_data["procedure_code"],
                procedure_modifier_1=line_data.get("modifier_1"),
                procedure_modifier_2=line_data.get("modifier_2"),
                procedure_modifier_3=line_data.get("modifier_3"),
                procedure_modifier_4=line_data.get("modifier_4"),
                revenue_code=line_data.get("revenue_code"),
                units=float(line_data.get("units", 1)),
                days=int(line_data.get("days", 1)),
                billed_amount=float(line_data.get("billed_amount", 0)),
                allowed_amount=float(line_data.get("allowed_amount", 0)),
                paid_amount=float(line_data.get("paid_amount", 0)),
                diagnosis_pointer_1=line_data.get("diagnosis_pointer_1"),
                diagnosis_pointer_2=line_data.get("diagnosis_pointer_2"),
                diagnosis_pointer_3=line_data.get("diagnosis_pointer_3"),
                diagnosis_pointer_4=line_data.get("diagnosis_pointer_4")
            )
            self.db.add(line)
        
        # Add diagnoses
        for diag_data in claim_data.get("diagnoses", []):
            diagnosis = ClaimDiagnosis(
                claim_id=claim.id,
                diagnosis_sequence=diag_data["sequence"],
                diagnosis_code=diag_data["code"],
                diagnosis_description=diag_data.get("description"),
                present_on_admission=diag_data.get("present_on_admission")
            )
            self.db.add(diagnosis)
        
        # Add procedures (institutional)
        for proc_data in claim_data.get("procedures", []):
            procedure = ClaimProcedure(
                claim_id=claim.id,
                procedure_sequence=proc_data["sequence"],
                procedure_code=proc_data["code"],
                procedure_code_type=proc_data["code_type"],
                procedure_description=proc_data.get("description"),
                procedure_date=self._parse_date(proc_data.get("date"))
            )
            self.db.add(procedure)
        
        # Run validation if requested
        if auto_validate:
            validation = self._validate_claim(claim)
            claim.validation_status = validation["status"]
            claim.validation_errors = validation.get("errors")
            claim.validation_warnings = validation.get("warnings")
        
        return {
            "status": "SUCCESS",
            "claim_id": claim.claim_id,
            "internal_id": claim.id,
            "validation_status": claim.validation_status if auto_validate else "NOT_VALIDATED",
            "warnings": claim.validation_warnings if auto_validate else []
        }
    
    def _get_or_create_member(self, claim_data: Dict[str, Any]) -> Optional[Member]:
        """Get existing member or create if needed"""
        member_id = claim_data.get("member_id")
        
        if not member_id:
            return None
        
        member = self.db.query(Member).filter(
            and_(
                Member.member_id == member_id,
                Member.organization_id == self.organization_id
            )
        ).first()
        
        return member
    
    def _validate_claim(self, claim: Claim) -> Dict[str, Any]:
        """Run validation rules on claim"""
        
        # Get member with eligibility
        member = self.db.query(Member).filter(Member.id == claim.member_id).first()
        
        # Get eligibility for service date
        eligibility = self.db.query(Eligibility).filter(
            and_(
                Eligibility.member_id == member.id,
                Eligibility.eligibility_date == claim.service_date_from
            )
        ).first()
        
        # Build claim dict for rules engine
        claim_dict = {
            "claim_id": claim.claim_id,
            "member": {
                "age": member.age,
                "gender": member.gender.value,
                "date_of_birth": member.date_of_birth
            },
            "service_date": claim.service_date_from,
            "eligibility": {
                "is_eligible": eligibility.is_eligible if eligibility else False,
                "coverage_type": eligibility.coverage_type.value if eligibility else None
            },
            "billed_amount": claim.billed_amount,
            "paid_amount": claim.paid_amount,
            "claim_type": claim.claim_type.value,
            "place_of_service": claim.place_of_service,
            "lines": [
                {
                    "procedure_code": line.procedure_code,
                    "units": line.units,
                    "billed_amount": line.billed_amount
                }
                for line in claim.lines
            ],
            "diagnoses": [
                {
                    "code": diag.diagnosis_code,
                    "sequence": diag.diagnosis_sequence
                }
                for diag in claim.diagnoses
            ]
        }
        
        # Run validation
        validation_result = self.rules_engine.validate_claim(claim_dict)
        
        # Determine status
        if validation_result["errors"]:
            status = "FAILED"
        elif validation_result["warnings"]:
            status = "WARNING"
        else:
            status = "PASSED"
        
        return {
            "status": status,
            "errors": validation_result["errors"],
            "warnings": validation_result["warnings"]
        }
    
    def _parse_date(self, date_value: Any) -> Optional[date]:
        """Parse date from various formats"""
        if not date_value:
            return None
        
        if isinstance(date_value, date):
            return date_value
        
        if isinstance(date_value, datetime):
            return date_value.date()
        
        if isinstance(date_value, str):
            # Try common formats
            for fmt in ["%Y-%m-%d", "%m/%d/%Y", "%Y%m%d"]:
                try:
                    return datetime.strptime(date_value, fmt).date()
                except ValueError:
                    continue
        
        return None
    
    def get_ingestion_stats(self) -> Dict[str, Any]:
        """Return current ingestion statistics"""
        return {
            **self.stats,
            "success_rate": (self.stats["processed"] / self.stats["received"] * 100) if self.stats["received"] > 0 else 0
        }