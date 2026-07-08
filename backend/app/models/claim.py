"""
KINCAID HEALTH™ DATA MODELS
Medical Claims
"""

from sqlalchemy import Column, String, Integer, Date, Boolean, Float, ForeignKey, DateTime, Text, JSON, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import date, datetime
from enum import Enum
from .database import Base


class ClaimTypeEnum(str, Enum):
    """Claim type codes"""
    PROFESSIONAL = "P"  # 837P - Physician/Professional
    INSTITUTIONAL = "I"  # 837I - Hospital/Facility
    DENTAL = "D"
    VISION = "V"


class ClaimStatusEnum(str, Enum):
    """Claim processing status"""
    RECEIVED = "RECEIVED"
    PENDING = "PENDING"
    ADJUDICATED = "ADJUDICATED"
    PAID = "PAID"
    DENIED = "DENIED"
    ADJUSTED = "ADJUSTED"


class Claim(Base):
    """
    Medical Claim Header
    Links to ClaimLines, Diagnoses, Procedures
    """
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    
    # Identifiers
    claim_id = Column(String(50), unique=True, nullable=False, index=True)
    claim_number = Column(String(50), index=True)
    
    # Member
    member_id = Column(Integer, ForeignKey("members.id"), nullable=False, index=True)
    subscriber_id = Column(String(50), index=True)
    
    # Organization
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False, index=True)
    
    # Dates
    service_date_from = Column(Date, nullable=False, index=True)
    service_date_to = Column(Date, nullable=False)
    received_date = Column(Date, index=True)
    processed_date = Column(Date, index=True)
    paid_date = Column(Date, index=True)
    
    # Provider
    rendering_provider_id = Column(Integer, ForeignKey("providers.id"), nullable=True, index=True)
    billing_provider_id = Column(Integer, ForeignKey("providers.id"), nullable=True, index=True)
    facility_id = Column(Integer, ForeignKey("facilities.id"), nullable=True, index=True)
    
    # Classification
    claim_type = Column(SQLEnum(ClaimTypeEnum), nullable=False)
    place_of_service = Column(String(2))  # CMS Place of Service codes
    admission_type = Column(String(1), nullable=True)  # For institutional claims
    bill_type = Column(String(4), nullable=True)  # UB-04 bill type (0131, etc.)
    
    # Financial
    billed_amount = Column(Float, default=0.0)
    allowed_amount = Column(Float, default=0.0)
    paid_amount = Column(Float, default=0.0)
    member_responsibility = Column(Float, default=0.0)
    deductible_applied = Column(Float, default=0.0)
    coinsurance_applied = Column(Float, default=0.0)
    copay_applied = Column(Float, default=0.0)
    cob_amount = Column(Float, default=0.0)  # Coordination of benefits
    
    # Status
    status = Column(SQLEnum(ClaimStatusEnum), nullable=False, default=ClaimStatusEnum.RECEIVED)
    denial_reason = Column(Text, nullable=True)
    
    # Flags
    is_reversed = Column(Boolean, default=False)
    is_adjusted = Column(Boolean, default=False)
    original_claim_id = Column(Integer, ForeignKey("claims.id"), nullable=True)
    
    # Validation
    validation_status = Column(String(20), default="PENDING")  # PASSED, FAILED, WARNING
    validation_errors = Column(JSON, nullable=True)
    validation_warnings = Column(JSON, nullable=True)
    
    # Risk Flags
    is_large_claim = Column(Boolean, default=False)
    is_anomaly = Column(Boolean, default=False)
    anomaly_score = Column(Float, nullable=True)
    anomaly_reasons = Column(JSON, nullable=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    member = relationship("Member", back_populates="claims")
    organization = relationship("Organization")
    rendering_provider = relationship("Provider", foreign_keys=[rendering_provider_id], backref="rendered_claims")
    billing_provider = relationship("Provider", foreign_keys=[billing_provider_id], backref="billed_claims")
    facility = relationship("Facility", backref="claims")
    lines = relationship("ClaimLine", back_populates="claim", cascade="all, delete-orphan")
    diagnoses = relationship("ClaimDiagnosis", back_populates="claim", cascade="all, delete-orphan")
    procedures = relationship("ClaimProcedure", back_populates="claim", cascade="all, delete-orphan")
    original_claim = relationship("Claim", remote_side=[id], backref="adjustments")

    def __repr__(self):
        return f"<Claim(id={self.claim_id}, member={self.member_id}, amount=${self.paid_amount})>"

    @property
    def total_charges(self) -> float:
        """Sum of all line-level charges"""
        return sum(line.billed_amount for line in self.lines)

    @property
    def net_paid(self) -> float:
        """Net payment after COB"""
        return self.paid_amount - self.cob_amount


class ClaimLine(Base):
    """
    Claim Line Items
    Procedure/Service details
    """
    __tablename__ = "claim_lines"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    claim_id = Column(Integer, ForeignKey("claims.id"), nullable=False, index=True)
    
    # Line Details
    line_number = Column(Integer, nullable=False)
    
    # Procedure
    procedure_code = Column(String(10), nullable=False, index=True)  # CPT/HCPCS
    procedure_modifier_1 = Column(String(2), nullable=True)
    procedure_modifier_2 = Column(String(2), nullable=True)
    procedure_modifier_3 = Column(String(2), nullable=True)
    procedure_modifier_4 = Column(String(2), nullable=True)
    
    # Revenue Code (for institutional claims)
    revenue_code = Column(String(4), nullable=True, index=True)
    
    # Quantity & Units
    units = Column(Float, default=1.0)
    days = Column(Integer, default=1)
    
    # Financial
    billed_amount = Column(Float, default=0.0)
    allowed_amount = Column(Float, default=0.0)
    paid_amount = Column(Float, default=0.0)
    
    # Diagnosis Pointers (link to diagnosis codes)
    diagnosis_pointer_1 = Column(Integer, nullable=True)
    diagnosis_pointer_2 = Column(Integer, nullable=True)
    diagnosis_pointer_3 = Column(Integer, nullable=True)
    diagnosis_pointer_4 = Column(Integer, nullable=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    claim = relationship("Claim", back_populates="lines")

    def __repr__(self):
        return f"<ClaimLine(claim_id={self.claim_id}, line={self.line_number}, code={self.procedure_code})>"


class ClaimDiagnosis(Base):
    """
    Claim Diagnosis Codes
    ICD-10-CM codes
    """
    __tablename__ = "claim_diagnoses"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    claim_id = Column(Integer, ForeignKey("claims.id"), nullable=False, index=True)
    
    # Diagnosis Details
    diagnosis_sequence = Column(Integer, nullable=False)  # 1-12 (primary, secondary, etc.)
    diagnosis_code = Column(String(10), nullable=False, index=True)  # ICD-10-CM
    diagnosis_description = Column(String(255), nullable=True)
    present_on_admission = Column(String(1), nullable=True)  # Y, N, U, W
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    claim = relationship("Claim", back_populates="diagnoses")

    def __repr__(self):
        return f"<ClaimDiagnosis(claim_id={self.claim_id}, seq={self.diagnosis_sequence}, code={self.diagnosis_code})>"


class ClaimProcedure(Base):
    """
    Institutional Claim Procedures
    ICD-10-PCS or CPT codes
    """
    __tablename__ = "claim_procedures"

    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign Keys
    claim_id = Column(Integer, ForeignKey("claims.id"), nullable=False, index=True)
    
    # Procedure Details
    procedure_sequence = Column(Integer, nullable=False)
    procedure_code = Column(String(10), nullable=False, index=True)
    procedure_code_type = Column(String(10), nullable=False)  # ICD10PCS, CPT, HCPCS
    procedure_description = Column(String(255), nullable=True)
    procedure_date = Column(Date, nullable=True)
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    claim = relationship("Claim", back_populates="procedures")

    def __repr__(self):
        return f"<ClaimProcedure(claim_id={self.claim_id}, seq={self.procedure_sequence}, code={self.procedure_code})>"