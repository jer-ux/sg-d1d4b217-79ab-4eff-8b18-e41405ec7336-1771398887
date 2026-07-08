"""
KINCAID HEALTH™ SUPER ADMIN API
Tenant management and user provisioning
"""

from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime
import uuid

from app.middleware.rbac import require_role
from app.middleware.tenant_isolation import get_current_tenant
from app.models.schemas import TenantCreate, TenantResponse, UserCreate, UserResponse
from app.services.database import get_db

router = APIRouter(prefix="/admin", tags=["Super Admin"])


@router.get("/tenants", response_model=List[TenantResponse])
@require_role("super_admin")
async def list_tenants(db = Depends(get_db)):
    """
    List all tenant organizations (super admin only)
    """
    # Mock data - replace with actual database query
    tenants = [
        {
            "tenant_id": "tenant-001",
            "organization_name": "Acme Corporation",
            "organization_type": "enterprise",
            "status": "active",
            "created_at": "2026-01-15",
            "user_count": 12,
            "data_volume_gb": 45.3,
            "plan_tier": "enterprise"
        },
        {
            "tenant_id": "tenant-002",
            "organization_name": "Smith Benefits Group",
            "organization_type": "broker",
            "status": "active",
            "created_at": "2026-02-20",
            "user_count": 5,
            "data_volume_gb": 12.7,
            "plan_tier": "professional"
        },
        {
            "tenant_id": "tenant-003",
            "organization_name": "Healthcare Advisors Inc",
            "organization_type": "consultant",
            "status": "active",
            "created_at": "2026-03-10",
            "user_count": 8,
            "data_volume_gb": 23.1,
            "plan_tier": "professional"
        }
    ]
    
    return tenants


@router.post("/tenants", response_model=TenantResponse)
@require_role("super_admin")
async def create_tenant(
    tenant: TenantCreate,
    db = Depends(get_db)
):
    """
    Create new tenant organization and provision admin user
    """
    tenant_id = f"tenant-{uuid.uuid4().hex[:8]}"
    
    # In production, this would:
    # 1. Create tenant record in database
    # 2. Set up tenant-specific schema/namespace
    # 3. Create admin user with credentials
    # 4. Send welcome email
    # 5. Initialize default settings
    
    return {
        "tenant_id": tenant_id,
        "organization_name": tenant.organization_name,
        "organization_type": tenant.organization_type,
        "status": "pending",
        "created_at": datetime.utcnow().isoformat(),
        "user_count": 0,
        "data_volume_gb": 0.0,
        "plan_tier": tenant.plan_tier
    }


@router.get("/users", response_model=List[UserResponse])
@require_role("super_admin")
async def list_all_users(db = Depends(get_db)):
    """
    List all users across all tenants (super admin only)
    """
    # Mock data - replace with actual database query
    users = [
        {
            "user_id": "user-001",
            "email": "john.smith@acme.com",
            "full_name": "John Smith",
            "role": "enterprise_admin",
            "tenant_id": "tenant-001",
            "tenant_name": "Acme Corporation",
            "status": "active",
            "last_login": "2026-07-08 14:30"
        },
        {
            "user_id": "user-002",
            "email": "jane.doe@acme.com",
            "full_name": "Jane Doe",
            "role": "actuary",
            "tenant_id": "tenant-001",
            "tenant_name": "Acme Corporation",
            "status": "active",
            "last_login": "2026-07-08 09:15"
        },
        {
            "user_id": "user-003",
            "email": "bob.wilson@smithbenefits.com",
            "full_name": "Bob Wilson",
            "role": "broker",
            "tenant_id": "tenant-002",
            "tenant_name": "Smith Benefits Group",
            "status": "active",
            "last_login": "2026-07-07 16:45"
        }
    ]
    
    return users


@router.post("/users", response_model=UserResponse)
@require_role("super_admin")
async def create_user(
    user: UserCreate,
    db = Depends(get_db)
):
    """
    Create new user in existing tenant
    """
    user_id = f"user-{uuid.uuid4().hex[:8]}"
    
    # In production, this would:
    # 1. Validate tenant exists
    # 2. Create user record
    # 3. Hash temporary password
    # 4. Send invitation email
    # 5. Log action in audit trail
    
    return {
        "user_id": user_id,
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role,
        "tenant_id": user.tenant_id,
        "tenant_name": "Tenant Name",  # Would lookup from DB
        "status": "pending",
        "last_login": None
    }


@router.get("/audit-log")
@require_role("super_admin")
async def get_audit_log(
    limit: int = 100,
    offset: int = 0,
    db = Depends(get_db)
):
    """
    Retrieve platform-wide audit log
    """
    # Mock data - replace with actual audit log query
    return {
        "total": 1523,
        "limit": limit,
        "offset": offset,
        "events": [
            {
                "event_id": "evt-001",
                "timestamp": "2026-07-08T15:23:00Z",
                "action": "tenant.created",
                "actor": "admin@kincaidhealth.com",
                "tenant_id": "tenant-003",
                "details": {"organization": "Healthcare Advisors Inc"}
            },
            {
                "event_id": "evt-002",
                "timestamp": "2026-07-08T14:15:00Z",
                "action": "user.created",
                "actor": "admin@kincaidhealth.com",
                "tenant_id": "tenant-002",
                "details": {"email": "new.user@smithbenefits.com"}
            }
        ]
    }