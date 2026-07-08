"""
KINCAID HEALTH™ AIOS
Pydantic Request/Response Schemas
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional, Dict, Any, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    ADMIN = "admin"
    EXECUTIVE = "executive"
    ANALYST = "analyst"
    AUDITOR = "auditor"
    VIEWER = "viewer"

class ProfileBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: UserRole = UserRole.VIEWER
    organization: Optional[str] = None

class ProfileCreate(ProfileBase):
    user_id: str

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    role: Optional[UserRole] = None
    organization: Optional[str] = None

class ProfileResponse(ProfileBase):
    id: str
    user_id: str
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class PermissionBase(BaseModel):
    role: UserRole
    resource: str
    action: str

class PermissionResponse(PermissionBase):
    id: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class AuditLogBase(BaseModel):
    action: str
    resource: str
    resource_id: Optional[str] = None
    details: Optional[Dict[str, Any]] = None

class AuditLogCreate(AuditLogBase):
    user_id: Optional[str] = None
    ip_address: Optional[str] = None
    user_agent: Optional[str] = None

class AuditLogResponse(AuditLogBase):
    id: str
    user_id: Optional[str]
    ip_address: Optional[str]
    user_agent: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

class SystemConfigBase(BaseModel):
    key: str
    value: Dict[str, Any]
    description: Optional[str] = None

class SystemConfigUpdate(BaseModel):
    value: Dict[str, Any]
    description: Optional[str] = None

class SystemConfigResponse(SystemConfigBase):
    updated_by: Optional[str]
    updated_at: datetime
    
    class Config:
        from_attributes = True

class HealthCheckResponse(BaseModel):
    status: str
    timestamp: float
    version: str
    services: Dict[str, str]

class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.now)