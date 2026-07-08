"""
KINCAID HEALTH™ AIOS
SQLAlchemy Database Models
"""

from sqlalchemy import Column, String, DateTime, JSON, Enum, ForeignKey, Text, Boolean
from sqlalchemy.dialects.postgresql import UUID, INET, JSONB
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import uuid
import enum

Base = declarative_base()

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    EXECUTIVE = "executive"
    ANALYST = "analyst"
    AUDITOR = "auditor"
    VIEWER = "viewer"

class Profile(Base):
    __tablename__ = "profiles"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), nullable=False, unique=True)
    email = Column(String, nullable=False)
    full_name = Column(String)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.VIEWER)
    organization = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Permission(Base):
    __tablename__ = "permissions"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    role = Column(Enum(UserRole), nullable=False)
    resource = Column(String, nullable=False)
    action = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AuditLog(Base):
    __tablename__ = "audit_logs"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True))
    action = Column(String, nullable=False)
    resource = Column(String, nullable=False)
    resource_id = Column(String)
    details = Column(JSONB)
    ip_address = Column(INET)
    user_agent = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class SystemConfig(Base):
    __tablename__ = "system_config"
    
    key = Column(String, primary_key=True)
    value = Column(JSONB, nullable=False)
    description = Column(Text)
    updated_by = Column(UUID(as_uuid=True))
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())