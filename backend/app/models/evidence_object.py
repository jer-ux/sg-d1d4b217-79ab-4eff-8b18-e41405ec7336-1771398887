"""
KINCAID IQ™ INTELLIGENCE KERNEL
Evidence Object Model — Unified Intelligence Entity
"""

from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, JSON, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class EvidenceObject(Base):
    """
    Universal evidence object — the core IntelligenceObject pattern
    
    Every finding, recommendation, decision, and report is an evidence object with:
    - Complete provenance
    - Confidence scoring
    - Financial impact
    - Risk assessment
    - Relationship graph
    - Version history
    - Audit trail
    """
    __tablename__ = "evidence_objects"
    
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
    
    # Object classification
    object_type = Column(
        String,
        nullable=False  # finding, recommendation, decision, risk, model, report
    )
    
    object_category = Column(
        String  # financial, clinical, operational, compliance
    )
    
    # Core content
    title = Column(
        String,
        nullable=False
    )
    
    description = Column(
        Text
    )
    
    # Intelligence metadata
    confidence_score = Column(
        Float  # 0.0 to 1.0
    )
    
    confidence_level = Column(
        String  # very_low, low, medium, high, very_high
    )
    
    # Financial impact
    financial_impact_min = Column(
        Float
    )
    
    financial_impact_expected = Column(
        Float
    )
    
    financial_impact_max = Column(
        Float
    )
    
    # Risk assessment
    risk_score = Column(
        Float  # 0.0 to 1.0
    )
    
    risk_level = Column(
        String  # minimal, low, medium, high, critical
    )
    
    # Provenance
    source_type = Column(
        String  # data, model, agent, user, external
    )
    
    source_id = Column(
        String
    )
    
    evidence_chain = Column(
        JSON  # Array of evidence sources
    )
    
    # Relationships
    related_objects = Column(
        JSON  # Array of related evidence object IDs
    )
    
    contract_id = Column(
        String,
        ForeignKey("contracts.id", ondelete="SET NULL")
    )
    
    # Agent attribution
    agent_name = Column(
        String  # Which AI agent generated this
    )
    
    agent_version = Column(
        String
    )
    
    # Review status
    review_status = Column(
        String,
        default="pending"  # pending, reviewed, approved, rejected
    )
    
    reviewed_by = Column(
        String  # User ID
    )
    
    reviewed_at = Column(
        DateTime
    )
    
    # Version control
    version = Column(
        Integer,
        default=1
    )
    
    previous_version_id = Column(
        String,
        ForeignKey("evidence_objects.id", ondelete="SET NULL")
    )
    
    # Full data payload
    data = Column(
        JSON
    )
    
    # Timestamps
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
    
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )
    
    expires_at = Column(
        DateTime  # For time-sensitive findings
    )
    
    # Relationships
    organization = relationship("Organization", back_populates="evidence_objects")
    contract = relationship("Contract", back_populates="evidence_objects")
    audit_logs = relationship("AuditLog", back_populates="evidence_object", cascade="all, delete-orphan")