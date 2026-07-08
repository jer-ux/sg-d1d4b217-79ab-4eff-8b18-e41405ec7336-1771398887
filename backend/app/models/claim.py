"""
KINCAID IQ™ INTELLIGENCE KERNEL
Claim Model — Healthcare Claims Data
"""

from sqlalchemy import Column, String, Integer, Float, DateTime, Date, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class Claim(Base):
    """
    Healthcare claim entity
    
    Represents medical and pharmacy claims with:
    - Financial data
    - Clinical codes
    - Provider information
    - Adjudication status
    """
    __tablename__ = "claims"
    
    id = Column(
        String,
        primary_key=True,
        default=generate_uuid
    )
    
    organization_id = Column(
        String,
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False
    )
    
    dataset_id = Column(
        String,
        ForeignKey("datasets.id", ondelete="CASCADE")
    )
    
    # Claim identification
    claim_id = Column(
        String,
        nullable=False,
        index=True
    )
    
    claim_type = Column(
        String  # medical, pharmacy
    )
    
    # Member information
    member_id = Column(
        String,
        index=True
    )
    
    # Financial
    billed_amount = Column(
        Float
    )
    
    allowed_amount = Column(
        Float
    )
    
    paid_amount = Column(
        Float
    )
    
    member_responsibility = Column(
        Float
    )
    
    # Dates
    service_date = Column(
        Date
    )
    
    paid_date = Column(
        Date
    )
    
    # Clinical
    diagnosis_codes = Column(
        JSON  # Array of ICD-10 codes
    )
    
    procedure_codes = Column(
        JSON  # Array of CPT/HCPCS codes
    )
    
    ndc_code = Column(
        String  # For pharmacy claims
    )
    
    # Provider
    provider_id = Column(
        String
    )
    
    provider_name = Column(
        String
    )
    
    provider_specialty = Column(
        String
    )
    
    # Status
    claim_status = Column(
        String  # paid, denied, pending
    )
    
    # Metadata
    metadata = Column(
        JSON
    )
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
    
    # Relationships
    organization = relationship("Organization", back_populates="claims")
    dataset = relationship("Dataset", back_populates="claims")