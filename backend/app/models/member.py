"""
KINCAID HEALTH™ DATA MODELS
Member, Enrollment, Eligibility
"""

from sqlalchemy import Column, String, Integer, Date, Boolean, Float, ForeignKey, DateTime, Text, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import date, datetime
from enum import Enum
from .database import Base


class GenderEnum(str, Enum):
    """Member gender codes"""
    MALE = "M"
    FEMALE = "F"
    OTHER = "X"
    UNKNOWN = "U"


class RelationshipEnum(str, Enum):
    """Member relationship to subscriber"""
    SUBSCRIBER = "01"  # Employee/Member
    SPOUSE = "02"
    CHILD = "03"
    OTHER_DEPENDENT = "53"
    LIFE_PARTNER = "G8"


class CoverageTypeEnum(str, Enum):
    """Type of coverage"""
    MEDICAL = "MEDICAL"
    DENTAL = "DENTAL"
    VISION = "VISION"
    PHARMACY = "PHARMACY"
    BEHAVIORAL = "BEHAVIORAL"
    STOP_LOSS = "STOP_LOSS"


class EnrollmentStatusEnum(str, Enum):
    """Enrollment status codes"""
    ACTIVE = "ACTIVE"
    TERMINATED = "TERMINATED"
    COBRA = "COBRA"
    SUSPENDED = "SUSPENDED"
    PENDING = "PENDING"


class Member(Base):
    """
    Member/Patient Entity
    Links to Claims, Enrollment, Eligibility
    """
    __tablename__ = "members"

    id = Column(Integer, primary_key=True, index=True)
    
    # Identifiers
    member_id = Column(String(50), unique=True, nullable=False, index=True)  # External ID
    subscriber_id = Column(String(50), index=True)  # Group subscriber
    ssn_last_4 = Column(String(4), nullable=True)  # Partial SSN for matching
    
    # Demographics
    first_name = Column(String(100), nullable=False)
    middle_name = Column(String(100), nullable=True)
    last_name = Column(String(100), nullable=False)
    date_of_birth = Column(Date, nullable=False, index=True)
    gender = Column(SQLEnum(GenderEnum), nullable=False)
    
    # Contact
    address_line_1 = Column(String(255))
    address_line_2 = Column(String(255))
    city = Column(String(100))
    state = Column(String(2))
    zip_code = Column(String(10), index=True)
    phone = Column(String(20))
    email = Column(String(255))
    
    # Employment
    organization_id = Column(Integer, ForeignKey("organizations.id"), index=True)
    employee_id = Column(String(50), index=True)
    hire_date = Column(Date, nullable=True)
    termination_date = Column(Date, nullable=True)
    
    # Relationship
    relationship_code = Column(SQLEnum(RelationshipEnum), nullable=False)
    subscriber_member_id = Column(Integer, ForeignKey("members.id"), nullable=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    is_active = Column(Boolean, default=True)
    
    # Relationships
    organization = relationship("Organization", back_populates="members")
    subscriber = relationship("Member", remote_side=[id], backref="dependents")
    enrollments = relationship("Enrollment", back_populates="member", cascade="all, delete-orphan")
    eligibility_records = relationship("Eligibility", back_populates="member", cascade="all, delete-orphan")
    claims = relationship("Claim", back_populates="member")
    pharmacy_claims = relationship("PharmacyClaim", back_populates="member")

    def __repr__(self):
        return f"<Member(id={self.member_id}, name={self.first_name} {self.last_name})>"

    @property
    def age(self) -> int:
        """Calculate current age"""
        today = date.today()
        return today.year - self.date_of_birth.year - (
            (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
        )

    @property
    def full_name(self) -> str:
        """Full name concatenation"""
        if self.middle_name:
            return f"{self.first_name} {self.middle_name} {self.last_name}"
        return f"{self.first_name} {self.last_name}"


class Enrollment(Base):
    """
    Member Enrollment Periods
    Tracks coverage start/end dates
    """
    __tablename__ = "enrollments"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False, index=True)
    
    # Enrollment Period
    coverage_type = Column(SQLEnum(CoverageTypeEnum), nullable=False)
    coverage_start_date = Column(Date, nullable=False, index=True)
    coverage_end_date = Column(Date, nullable=True, index=True)
    
    # Plan Details
    plan_id = Column(String(50), index=True)
    plan_name = Column(String(255))
    carrier_name = Column(String(255))
    
    # Status
    status = Column(SQLEnum(EnrollmentStatusEnum), nullable=False, default=EnrollmentStatusEnum.ACTIVE)
    cobra_effective_date = Column(Date, nullable=True)
    
    # Financial
    employee_premium = Column(Float, default=0.0)
    employer_premium = Column(Float, default=0.0)
    total_premium = Column(Float, default=0.0)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    member = relationship("Member", back_populates="enrollments")
    organization = relationship("Organization")

    def __repr__(self):
        return f"<Enrollment(member_id={self.member_id}, type={self.coverage_type}, start={self.coverage_start_date})>"

    def is_active_on(self, check_date: date) -> bool:
        """Check if enrollment is active on a given date"""
        if check_date < self.coverage_start_date:
            return False
        if self.coverage_end_date and check_date > self.coverage_end_date:
            return False
        return self.status in [EnrollmentStatusEnum.ACTIVE, EnrollmentStatusEnum.COBRA]


class Eligibility(Base):
    """
    Daily Eligibility Records
    Used for claims validation
    """
    __tablename__ = "eligibility"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False, index=True)
    enrollment_id = Column(Integer, ForeignKey("enrollments.id"), nullable=True, index=True)
    
    # Eligibility Date
    eligibility_date = Column(Date, nullable=False, index=True)
    
    # Coverage Details
    coverage_type = Column(SQLEnum(CoverageTypeEnum), nullable=False)
    is_eligible = Column(Boolean, default=True)
    
    # Plan Design (for this date)
    deductible = Column(Float, default=0.0)
    deductible_met = Column(Float, default=0.0)
    out_of_pocket_max = Column(Float, default=0.0)
    out_of_pocket_met = Column(Float, default=0.0)
    copay_office_visit = Column(Float, nullable=True)
    copay_specialist = Column(Float, nullable=True)
    copay_emergency = Column(Float, nullable=True)
    coinsurance_pct = Column(Float, nullable=True)
    
    # Accumulators
    ytd_claims = Column(Float, default=0.0)
    ytd_paid = Column(Float, default=0.0)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    member = relationship("Member", back_populates="eligibility_records")
    enrollment = relationship("Enrollment")

    def __repr__(self):
        return f"<Eligibility(member_id={self.member_id}, date={self.eligibility_date}, eligible={self.is_eligible})>"