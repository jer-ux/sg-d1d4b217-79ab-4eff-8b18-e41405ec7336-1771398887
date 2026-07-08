"""
KINCAID IQ™ INTELLIGENCE KERNEL
Vendor Model — Third-party Service Providers
"""

from sqlalchemy import Column, String, Float, DateTime, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class Vendor(Base):
    """
    Vendor entity for PBMs, TPAs, brokers, consultants, networks
    
    Tracks:
    - Performance metrics
    - Financial impact
    - Risk assessment
    - Contract history
    """
    __tablename__ = "vendors"
    
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
    
    # Vendor identification
    vendor_name = Column(
        String,
        nullable=False
    )
    
    vendor_type = Column(
        String  # pbm, tpa, broker, consultant, network, stop_loss
    )
    
    # Contact
    contact_name = Column(
        String
    )
    
    contact_email = Column(
        String
    )
    
    contact_phone = Column(
        String
    )
    
    # Performance
    performance_score = Column(
        Float
    )
    
    performance_metrics = Column(
        JSON
    )
    
    # Financial
    total_spend = Column(
        Float
    )
    
    savings_claimed = Column(
        Float
    )
    
    savings_validated = Column(
        Float
    )
    
    # Risk
    risk_score = Column(
        Float
    )
    
    risk_factors = Column(
        JSON
    )
    
    # Status
    is_active = Column(
        Boolean,
        default=True
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
    organization = relationship("Organization", back_populates="vendors")
    contracts = relationship("Contract", back_populates="vendor", cascade="all, delete-orphan")