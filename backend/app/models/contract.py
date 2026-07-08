"""
KINCAID IQ™ INTELLIGENCE KERNEL
Contract Model — Vendor Contracts
"""

from sqlalchemy import Column, String, Float, DateTime, Date, Boolean, JSON, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class Contract(Base):
    """
    Contract entity for PBM, TPA, stop-loss, and vendor agreements
    
    Includes:
    - Contract terms
    - Financial guarantees
    - Performance metrics
    - Compliance requirements
    """
    __tablename__ = "contracts"
    
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
    
    vendor_id = Column(
        String,
        ForeignKey("vendors.id", ondelete="SET NULL")
    )
    
    # Contract identification
    contract_number = Column(
        String,
        index=True
    )
    
    contract_type = Column(
        String  # pbm, tpa, stop_loss, medical_network, pharmacy_network
    )
    
    contract_name = Column(
        String
    )
    
    # Dates
    effective_date = Column(
        Date
    )
    
    termination_date = Column(
        Date
    )
    
    renewal_date = Column(
        Date
    )
    
    # Financial terms
    admin_fee = Column(
        Float
    )
    
    admin_fee_type = Column(
        String  # PEPM, percentage, flat
    )
    
    # Guarantees (JSON structure)
    guarantees = Column(
        JSON
    )
    
    # Performance metrics
    performance_metrics = Column(
        JSON
    )
    
    # Contract document
    document_url = Column(
        String
    )
    
    document_text = Column(
        Text  # Extracted text from PDF
    )
    
    # Extracted clauses
    clauses = Column(
        JSON
    )
    
    # Risk assessment
    risk_score = Column(
        Float
    )
    
    risk_factors = Column(
        JSON
    )
    
    # Status
    status = Column(
        String,
        default="active"  # active, expired, terminated, pending
    )
    
    # Metadata
    metadata = Column(
        JSON
    )
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
    
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )
    
    # Relationships
    organization = relationship("Organization", back_populates="contracts")
    vendor = relationship("Vendor", back_populates="contracts")
    evidence_objects = relationship("EvidenceObject", back_populates="contract")