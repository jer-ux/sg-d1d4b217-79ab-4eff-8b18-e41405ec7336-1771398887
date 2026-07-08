"""
KINCAID IQ™ INTELLIGENCE KERNEL
User Model — Authentication & Authorization
"""

from sqlalchemy import Column, String, DateTime, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class User(Base):
    """
    User entity with role-based access control
    
    Roles: admin, analyst, viewer, executive
    """
    __tablename__ = "users"
    
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
    
    email = Column(
        String,
        unique=True,
        nullable=False,
        index=True
    )
    
    hashed_password = Column(
        String,
        nullable=False
    )
    
    full_name = Column(
        String
    )
    
    role = Column(
        String,
        default="analyst"  # admin, analyst, viewer, executive
    )
    
    # Permissions JSON
    permissions = Column(
        JSON,
        default=dict
    )
    
    is_active = Column(
        Boolean,
        default=True
    )
    
    last_login = Column(
        DateTime
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
    organization = relationship("Organization", back_populates="users")
    audit_logs = relationship("AuditLog", back_populates="user", cascade="all, delete-orphan")