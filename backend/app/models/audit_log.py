"""
KINCAID IQ™ INTELLIGENCE KERNEL
Audit Log Model — Complete Activity Tracking
"""

from sqlalchemy import Column, String, DateTime, JSON, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class AuditLog(Base):
    """
    Comprehensive audit trail for all platform activities
    
    Tracks:
    - User actions
    - Agent decisions
    - Data changes
    - System events
    - Security events
    """
    __tablename__ = "audit_logs"
    
    id = Column(
        String,
        primary_key=True,
        default=generate_uuid
    )
    
    # Actor
    user_id = Column(
        String,
        ForeignKey("users.id", ondelete="SET NULL")
    )
    
    actor_type = Column(
        String  # user, agent, system
    )
    
    actor_name = Column(
        String
    )
    
    # Action
    action = Column(
        String,
        nullable=False  # create, read, update, delete, approve, reject, execute
    )
    
    action_category = Column(
        String  # data, analysis, decision, system, security
    )
    
    # Target
    target_type = Column(
        String  # dataset, evidence_object, contract, user, organization
    )
    
    target_id = Column(
        String
    )
    
    evidence_object_id = Column(
        String,
        ForeignKey("evidence_objects.id", ondelete="SET NULL")
    )
    
    # Details
    description = Column(
        Text
    )
    
    before_state = Column(
        JSON  # State before action
    )
    
    after_state = Column(
        JSON  # State after action
    )
    
    # Context
    request_id = Column(
        String  # Trace ID for related actions
    )
    
    ip_address = Column(
        String
    )
    
    user_agent = Column(
        String
    )
    
    # Metadata
    metadata = Column(
        JSON
    )
    
    # Timestamp
    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        index=True
    )
    
    # Relationships
    user = relationship("User", back_populates="audit_logs")
    evidence_object = relationship("EvidenceObject", back_populates="audit_logs")