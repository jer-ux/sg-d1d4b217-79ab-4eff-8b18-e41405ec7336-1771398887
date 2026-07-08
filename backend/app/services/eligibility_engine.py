"""
KINCAID HEALTH™ ELIGIBILITY & ENROLLMENT ENGINE
Member Eligibility Validation & Management
"""

from typing import Dict, List, Any, Optional
from datetime import datetime, date, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
import logging

from ..models import Member, Enrollment, Eligibility, Organization
from ..models.member import (
    CoverageTypeEnum, 
    EnrollmentStatusEnum,
    GenderEnum,
    RelationshipEnum
)

logger = logging.getLogger(__name__)


class EligibilityEngine:
    """
    Enterprise-grade eligibility validation and enrollment management
    """
    
    def __init__(self, db: Session, organization_id: int):
        self.db = db
        self.organization_id = organization_id
    
    def check_eligibility(
        self,
        member_id: str,
        service_date: date,
        coverage_type: CoverageTypeEnum
    ) -> Dict[str, Any]:
        """
        Check if a member is eligible for services on a given date
        
        Args:
            member_id: External member ID
            service_date: Date of service
            coverage_type: Type of coverage (MEDICAL, PHARMACY, etc.)
            
        Returns:
            Eligibility details including coverage, plan design, accumulators
        """
        
        # Get member
        member = self.db.query(Member).filter(
            and_(
                Member.member_id == member_id,
                Member.organization_id == self.organization_id
            )
        ).first()
        
        if not member:
            return {
                "eligible": False,
                "reason": "Member not found",
                "member_id": member_id
            }
        
        # Get enrollment for service date
        enrollment = self.db.query(Enrollment).filter(
            and_(
                Enrollment.member_id == member.id,
                Enrollment.coverage_type == coverage_type,
                Enrollment.coverage_start_date <= service_date,
                or_(
                    Enrollment.coverage_end_date.is_(None),
                    Enrollment.coverage_end_date >= service_date
                ),
                Enrollment.status.in_([
                    EnrollmentStatusEnum.ACTIVE,
                    EnrollmentStatusEnum.COBRA
                ])
            )
        ).first()
        
        if not enrollment:
            return {
                "eligible": False,
                "reason": "No active enrollment for service date",
                "member_id": member_id,
                "service_date": service_date.isoformat(),
                "coverage_type": coverage_type.value
            }
        
        # Get or create eligibility record
        eligibility = self.db.query(Eligibility).filter(
            and_(
                Eligibility.member_id == member.id,
                Eligibility.eligibility_date == service_date,
                Eligibility.coverage_type == coverage_type
            )
        ).first()
        
        if not eligibility:
            # Create eligibility record
            eligibility = self._create_eligibility_record(
                member, enrollment, service_date, coverage_type
            )
        
        return {
            "eligible": eligibility.is_eligible,
            "member_id": member_id,
            "member_name": member.full_name,
            "service_date": service_date.isoformat(),
            "coverage_type": coverage_type.value,
            "plan_id": enrollment.plan_id,
            "plan_name": enrollment.plan_name,
            "carrier": enrollment.carrier_name,
            "enrollment_status": enrollment.status.value,
            "plan_design": {
                "deductible": eligibility.deductible,
                "deductible_met": eligibility.deductible_met,
                "deductible_remaining": max(0, eligibility.deductible - eligibility.deductible_met),
                "out_of_pocket_max": eligibility.out_of_pocket_max,
                "out_of_pocket_met": eligibility.out_of_pocket_met,
                "out_of_pocket_remaining": max(0, eligibility.out_of_pocket_max - eligibility.out_of_pocket_met),
                "copay_office_visit": eligibility.copay_office_visit,
                "copay_specialist": eligibility.copay_specialist,
                "copay_emergency": eligibility.copay_emergency,
                "coinsurance_pct": eligibility.coinsurance_pct
            },
            "accumulators": {
                "ytd_claims": eligibility.ytd_claims,
                "ytd_paid": eligibility.ytd_paid
            }
        }
    
    def enroll_member(
        self,
        member_data: Dict[str, Any],
        enrollment_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Enroll a new member or add coverage to existing member
        
        Args:
            member_data: Member demographics and identifiers
            enrollment_data: Enrollment details (plan, dates, financial)
            
        Returns:
            Enrollment confirmation with member and enrollment IDs
        """
        
        # Get or create member
        member = self._get_or_create_member(member_data)
        
        # Create enrollment
        enrollment = Enrollment(
            member_id=member.id,
            organization_id=self.organization_id,
            coverage_type=CoverageTypeEnum(enrollment_data["coverage_type"]),
            coverage_start_date=self._parse_date(enrollment_data["coverage_start_date"]),
            coverage_end_date=self._parse_date(enrollment_data.get("coverage_end_date")),
            plan_id=enrollment_data.get("plan_id"),
            plan_name=enrollment_data.get("plan_name"),
            carrier_name=enrollment_data.get("carrier_name"),
            status=EnrollmentStatusEnum(enrollment_data.get("status", "ACTIVE")),
            employee_premium=float(enrollment_data.get("employee_premium", 0)),
            employer_premium=float(enrollment_data.get("employer_premium", 0)),
            total_premium=float(enrollment_data.get("total_premium", 0))
        )
        
        self.db.add(enrollment)
        self.db.commit()
        self.db.refresh(enrollment)
        
        # Create initial eligibility records for the first month
        self._create_initial_eligibility_records(member, enrollment)
        
        return {
            "status": "SUCCESS",
            "member_id": member.member_id,
            "enrollment_id": enrollment.id,
            "coverage_start_date": enrollment.coverage_start_date.isoformat(),
            "plan_name": enrollment.plan_name
        }
    
    def terminate_enrollment(
        self,
        member_id: str,
        coverage_type: CoverageTypeEnum,
        termination_date: date,
        reason: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Terminate member enrollment
        
        Args:
            member_id: External member ID
            coverage_type: Type of coverage to terminate
            termination_date: Last day of coverage
            reason: Termination reason (optional)
            
        Returns:
            Termination confirmation
        """
        
        # Get member
        member = self.db.query(Member).filter(
            and_(
                Member.member_id == member_id,
                Member.organization_id == self.organization_id
            )
        ).first()
        
        if not member:
            return {
                "status": "ERROR",
                "error": "Member not found",
                "member_id": member_id
            }
        
        # Get active enrollment
        enrollment = self.db.query(Enrollment).filter(
            and_(
                Enrollment.member_id == member.id,
                Enrollment.coverage_type == coverage_type,
                Enrollment.status == EnrollmentStatusEnum.ACTIVE
            )
        ).first()
        
        if not enrollment:
            return {
                "status": "ERROR",
                "error": "No active enrollment found",
                "member_id": member_id,
                "coverage_type": coverage_type.value
            }
        
        # Update enrollment
        enrollment.coverage_end_date = termination_date
        enrollment.status = EnrollmentStatusEnum.TERMINATED
        
        # Update member
        member.is_active = False
        member.termination_date = termination_date
        
        self.db.commit()
        
        return {
            "status": "SUCCESS",
            "member_id": member_id,
            "coverage_type": coverage_type.value,
            "termination_date": termination_date.isoformat()
        }
    
    def update_accumulators(
        self,
        member_id: str,
        service_date: date,
        coverage_type: CoverageTypeEnum,
        claim_amount: float,
        paid_amount: float,
        deductible_applied: float,
        out_of_pocket_applied: float
    ) -> Dict[str, Any]:
        """
        Update member accumulators after claim processing
        
        Args:
            member_id: External member ID
            service_date: Date of service
            coverage_type: Type of coverage
            claim_amount: Total claim amount
            paid_amount: Amount paid
            deductible_applied: Amount applied to deductible
            out_of_pocket_applied: Amount applied to out-of-pocket max
            
        Returns:
            Updated accumulator values
        """
        
        # Get member
        member = self.db.query(Member).filter(
            and_(
                Member.member_id == member_id,
                Member.organization_id == self.organization_id
            )
        ).first()
        
        if not member:
            return {"status": "ERROR", "error": "Member not found"}
        
        # Get eligibility record
        eligibility = self.db.query(Eligibility).filter(
            and_(
                Eligibility.member_id == member.id,
                Eligibility.eligibility_date == service_date,
                Eligibility.coverage_type == coverage_type
            )
        ).first()
        
        if not eligibility:
            return {"status": "ERROR", "error": "Eligibility record not found"}
        
        # Update accumulators
        eligibility.ytd_claims += claim_amount
        eligibility.ytd_paid += paid_amount
        eligibility.deductible_met += deductible_applied
        eligibility.out_of_pocket_met += out_of_pocket_applied
        
        # Update all future eligibility records for this year
        year_start = date(service_date.year, 1, 1)
        future_records = self.db.query(Eligibility).filter(
            and_(
                Eligibility.member_id == member.id,
                Eligibility.coverage_type == coverage_type,
                Eligibility.eligibility_date > service_date,
                Eligibility.eligibility_date >= year_start
            )
        ).all()
        
        for record in future_records:
            record.deductible_met = eligibility.deductible_met
            record.out_of_pocket_met = eligibility.out_of_pocket_met
            record.ytd_claims = eligibility.ytd_claims
            record.ytd_paid = eligibility.ytd_paid
        
        self.db.commit()
        
        return {
            "status": "SUCCESS",
            "member_id": member_id,
            "deductible_met": eligibility.deductible_met,
            "out_of_pocket_met": eligibility.out_of_pocket_met,
            "ytd_claims": eligibility.ytd_claims,
            "ytd_paid": eligibility.ytd_paid
        }
    
    def _get_or_create_member(self, member_data: Dict[str, Any]) -> Member:
        """Get existing member or create new one"""
        
        member = self.db.query(Member).filter(
            and_(
                Member.member_id == member_data["member_id"],
                Member.organization_id == self.organization_id
            )
        ).first()
        
        if member:
            return member
        
        # Create new member
        member = Member(
            member_id=member_data["member_id"],
            subscriber_id=member_data.get("subscriber_id"),
            ssn_last_4=member_data.get("ssn_last_4"),
            first_name=member_data["first_name"],
            middle_name=member_data.get("middle_name"),
            last_name=member_data["last_name"],
            date_of_birth=self._parse_date(member_data["date_of_birth"]),
            gender=GenderEnum(member_data["gender"]),
            address_line_1=member_data.get("address_line_1"),
            address_line_2=member_data.get("address_line_2"),
            city=member_data.get("city"),
            state=member_data.get("state"),
            zip_code=member_data.get("zip_code"),
            phone=member_data.get("phone"),
            email=member_data.get("email"),
            organization_id=self.organization_id,
            employee_id=member_data.get("employee_id"),
            hire_date=self._parse_date(member_data.get("hire_date")),
            relationship_code=RelationshipEnum(member_data.get("relationship_code", "01"))
        )
        
        self.db.add(member)
        self.db.flush()
        
        return member
    
    def _create_eligibility_record(
        self,
        member: Member,
        enrollment: Enrollment,
        eligibility_date: date,
        coverage_type: CoverageTypeEnum
    ) -> Eligibility:
        """Create a new eligibility record"""
        
        # Get plan design defaults (would normally come from plan configuration)
        plan_design = self._get_plan_design(enrollment.plan_id, coverage_type)
        
        eligibility = Eligibility(
            member_id=member.id,
            enrollment_id=enrollment.id,
            eligibility_date=eligibility_date,
            coverage_type=coverage_type,
            is_eligible=True,
            deductible=plan_design["deductible"],
            deductible_met=0.0,
            out_of_pocket_max=plan_design["out_of_pocket_max"],
            out_of_pocket_met=0.0,
            copay_office_visit=plan_design.get("copay_office_visit"),
            copay_specialist=plan_design.get("copay_specialist"),
            copay_emergency=plan_design.get("copay_emergency"),
            coinsurance_pct=plan_design.get("coinsurance_pct")
        )
        
        self.db.add(eligibility)
        self.db.flush()
        
        return eligibility
    
    def _create_initial_eligibility_records(
        self,
        member: Member,
        enrollment: Enrollment
    ) -> None:
        """Create eligibility records for the first month"""
        
        start_date = enrollment.coverage_start_date
        end_date = min(
            start_date + timedelta(days=30),
            enrollment.coverage_end_date if enrollment.coverage_end_date else start_date + timedelta(days=30)
        )
        
        current_date = start_date
        while current_date <= end_date:
            self._create_eligibility_record(
                member, enrollment, current_date, enrollment.coverage_type
            )
            current_date += timedelta(days=1)
    
    def _get_plan_design(
        self,
        plan_id: Optional[str],
        coverage_type: CoverageTypeEnum
    ) -> Dict[str, Any]:
        """Get plan design parameters (simplified - would query plan_designs table)"""
        
        # Default plan designs
        defaults = {
            CoverageTypeEnum.MEDICAL: {
                "deductible": 2000.0,
                "out_of_pocket_max": 6000.0,
                "copay_office_visit": 30.0,
                "copay_specialist": 50.0,
                "copay_emergency": 250.0,
                "coinsurance_pct": 20.0
            },
            CoverageTypeEnum.PHARMACY: {
                "deductible": 0.0,
                "out_of_pocket_max": 3000.0,
                "copay_office_visit": None,
                "copay_specialist": None,
                "copay_emergency": None,
                "coinsurance_pct": 10.0
            }
        }
        
        return defaults.get(coverage_type, {
            "deductible": 0.0,
            "out_of_pocket_max": 0.0,
            "coinsurance_pct": 0.0
        })
    
    def _parse_date(self, date_value: Any) -> Optional[date]:
        """Parse date from various formats"""
        if not date_value:
            return None
        
        if isinstance(date_value, date):
            return date_value
        
        if isinstance(date_value, datetime):
            return date_value.date()
        
        if isinstance(date_value, str):
            for fmt in ["%Y-%m-%d", "%m/%d/%Y", "%Y%m%d"]:
                try:
                    return datetime.strptime(date_value, fmt).date()
                except ValueError:
                    continue
        
        return None