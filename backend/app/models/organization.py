"""
KINCAID HEALTH™ INTELLIGENCE KERNEL
Organization Model — Multi-tenant Architecture
"""

from sqlalchemy import Column, String, Integer, DateTime, Boolean, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class Organization(Base):
    """
    Multi-tenant organization entity
    
    Each organization represents a customer/employer with:
    - Users (employees, admins)
    - Datasets (claims, contracts, financials)
    - Evidence objects
    - Audit trails
    """
    __tablename__ = "organizations"
    
    id = Column(
        String,
        primary_key=True,
        default=generate_uuid
    )
    
    name = Column(
        String,
        nullable=False
    )
    
    industry = Column(
        String
    )
    
    employee_count = Column(
        Integer
    )
    
    # Subscription tier (free, professional, enterprise)
    tier = Column(
        String,
        default="professional"
    )
    
    # Feature flags
    features = Column(
        JSON,
        default=dict
    )
    
    # Settings
    settings = Column(
        JSON,
        default=dict
    )
    
    is_active = Column(
        Boolean,
        default=True
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
    users = relationship("User", back_populates="organization", cascade="all, delete-orphan")
    datasets = relationship("Dataset", back_populates="organization", cascade="all, delete-orphan")
    claims = relationship("Claim", back_populates="organization", cascade="all, delete-orphan")
    contracts = relationship("Contract", back_populates="organization", cascade="all, delete-orphan")
    vendors = relationship("Vendor", back_populates="organization", cascade="all, delete-orphan")
    evidence_objects = relationship("EvidenceObject", back_populates="organization", cascade="all, delete-orphan")