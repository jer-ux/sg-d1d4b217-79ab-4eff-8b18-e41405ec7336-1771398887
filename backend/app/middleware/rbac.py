"""
KINCAID HEALTH™ ROLE-BASED ACCESS CONTROL (RBAC)
Authorization enforcement layer
"""

from typing import List, Optional, Callable
from fastapi import Request, HTTPException, status
from functools import wraps
from enum import Enum
import logging

logger = logging.getLogger(__name__)


class Role(str, Enum):
    """System roles with hierarchical permissions"""
    SUPER_ADMIN = "super_admin"
    ENTERPRISE_ADMIN = "enterprise_admin"
    ACTUARY = "actuary"
    BENEFITS_ANALYST = "benefits_analyst"
    BROKER = "broker"
    CFO = "cfo"
    CHRO = "chro"
    AUDITOR = "auditor"
    BOARD_VIEWER = "board_viewer"


class Permission(str, Enum):
    """Granular permissions"""
    # Data permissions
    VIEW_CLAIMS = "view_claims"
    EDIT_CLAIMS = "edit_claims"
    DELETE_CLAIMS = "delete_claims"
    EXPORT_CLAIMS = "export_claims"
    
    # Member permissions
    VIEW_MEMBERS = "view_members"
    EDIT_MEMBERS = "edit_members"
    VIEW_PHI = "view_phi"
    
    # Analytics permissions
    RUN_ANALYTICS = "run_analytics"
    VIEW_REPORTS = "view_reports"
    CREATE_REPORTS = "create_reports"
    SCHEDULE_REPORTS = "schedule_reports"
    
    # Contract permissions
    VIEW_CONTRACTS = "view_contracts"
    EDIT_CONTRACTS = "edit_contracts"
    APPROVE_CONTRACTS = "approve_contracts"
    
    # Financial permissions
    VIEW_FINANCIALS = "view_financials"
    EDIT_BUDGET = "edit_budget"
    APPROVE_BUDGET = "approve_budget"
    
    # Administrative permissions
    MANAGE_USERS = "manage_users"
    MANAGE_ROLES = "manage_roles"
    MANAGE_ORGANIZATION = "manage_organization"
    VIEW_AUDIT_LOGS = "view_audit_logs"
    
    # AI/Simulation permissions
    RUN_SIMULATIONS = "run_simulations"
    USE_AI_COPILOT = "use_ai_copilot"
    
    # Evidence permissions
    CREATE_EVIDENCE = "create_evidence"
    APPROVE_EVIDENCE = "approve_evidence"
    
    # Board permissions
    VIEW_BOARD_MATERIALS = "view_board_materials"
    CREATE_BOARD_REPORTS = "create_board_reports"


# Role-Permission Matrix
ROLE_PERMISSIONS = {
    Role.SUPER_ADMIN: [p for p in Permission],  # All permissions
    
    Role.ENTERPRISE_ADMIN: [
        Permission.VIEW_CLAIMS, Permission.EDIT_CLAIMS, Permission.EXPORT_CLAIMS,
        Permission.VIEW_MEMBERS, Permission.EDIT_MEMBERS, Permission.VIEW_PHI,
        Permission.RUN_ANALYTICS, Permission.VIEW_REPORTS, Permission.CREATE_REPORTS,
        Permission.VIEW_CONTRACTS, Permission.EDIT_CONTRACTS,
        Permission.VIEW_FINANCIALS,
        Permission.MANAGE_USERS, Permission.VIEW_AUDIT_LOGS,
        Permission.RUN_SIMULATIONS, Permission.USE_AI_COPILOT,
        Permission.CREATE_EVIDENCE
    ],
    
    Role.ACTUARY: [
        Permission.VIEW_CLAIMS, Permission.EXPORT_CLAIMS,
        Permission.VIEW_MEMBERS, Permission.VIEW_PHI,
        Permission.RUN_ANALYTICS, Permission.VIEW_REPORTS, Permission.CREATE_REPORTS,
        Permission.SCHEDULE_REPORTS,
        Permission.VIEW_CONTRACTS,
        Permission.VIEW_FINANCIALS,
        Permission.RUN_SIMULATIONS, Permission.USE_AI_COPILOT,
        Permission.CREATE_EVIDENCE
    ],
    
    Role.BENEFITS_ANALYST: [
        Permission.VIEW_CLAIMS, Permission.EXPORT_CLAIMS,
        Permission.VIEW_MEMBERS, Permission.VIEW_PHI,
        Permission.RUN_ANALYTICS, Permission.VIEW_REPORTS,
        Permission.VIEW_CONTRACTS,
        Permission.RUN_SIMULATIONS, Permission.USE_AI_COPILOT
    ],
    
    Role.BROKER: [
        Permission.VIEW_CLAIMS, Permission.EXPORT_CLAIMS,
        Permission.VIEW_MEMBERS,  # PHI restricted
        Permission.RUN_ANALYTICS, Permission.VIEW_REPORTS, Permission.CREATE_REPORTS,
        Permission.VIEW_CONTRACTS,
        Permission.RUN_SIMULATIONS
    ],
    
    Role.CFO: [
        Permission.VIEW_CLAIMS, Permission.EXPORT_CLAIMS,
        Permission.VIEW_MEMBERS,
        Permission.RUN_ANALYTICS, Permission.VIEW_REPORTS, Permission.CREATE_REPORTS,
        Permission.VIEW_CONTRACTS, Permission.APPROVE_CONTRACTS,
        Permission.VIEW_FINANCIALS, Permission.EDIT_BUDGET, Permission.APPROVE_BUDGET,
        Permission.RUN_SIMULATIONS, Permission.USE_AI_COPILOT,
        Permission.VIEW_BOARD_MATERIALS, Permission.CREATE_BOARD_REPORTS
    ],
    
    Role.CHRO: [
        Permission.VIEW_CLAIMS, Permission.EXPORT_CLAIMS,
        Permission.VIEW_MEMBERS, Permission.EDIT_MEMBERS, Permission.VIEW_PHI,
        Permission.RUN_ANALYTICS, Permission.VIEW_REPORTS, Permission.CREATE_REPORTS,
        Permission.VIEW_CONTRACTS,
        Permission.VIEW_FINANCIALS,
        Permission.RUN_SIMULATIONS, Permission.USE_AI_COPILOT
    ],
    
    Role.AUDITOR: [
        Permission.VIEW_CLAIMS,
        Permission.VIEW_MEMBERS, Permission.VIEW_PHI,
        Permission.VIEW_REPORTS,
        Permission.VIEW_CONTRACTS,
        Permission.VIEW_FINANCIALS,
        Permission.VIEW_AUDIT_LOGS,
        Permission.APPROVE_EVIDENCE
    ],
    
    Role.BOARD_VIEWER: [
        Permission.VIEW_REPORTS,
        Permission.VIEW_FINANCIALS,
        Permission.VIEW_BOARD_MATERIALS
    ]
}


class RBACEnforcer:
    """
    RBAC enforcement engine.
    
    Checks user permissions before allowing operations.
    """
    
    @staticmethod
    def has_permission(role: str, permission: Permission) -> bool:
        """Check if role has specific permission"""
        try:
            role_enum = Role(role)
            return permission in ROLE_PERMISSIONS.get(role_enum, [])
        except ValueError:
            logger.warning(f"Unknown role: {role}")
            return False
    
    @staticmethod
    def has_any_permission(role: str, permissions: List[Permission]) -> bool:
        """Check if role has any of the specified permissions"""
        return any(RBACEnforcer.has_permission(role, p) for p in permissions)
    
    @staticmethod
    def has_all_permissions(role: str, permissions: List[Permission]) -> bool:
        """Check if role has all of the specified permissions"""
        return all(RBACEnforcer.has_permission(role, p) for p in permissions)
    
    @staticmethod
    def get_user_permissions(role: str) -> List[Permission]:
        """Get all permissions for a role"""
        try:
            role_enum = Role(role)
            return ROLE_PERMISSIONS.get(role_enum, [])
        except ValueError:
            return []


def require_permission(permission: Permission):
    """
    Decorator to require specific permission for endpoint.
    
    Usage:
        @app.get("/api/claims")
        @require_permission(Permission.VIEW_CLAIMS)
        async def get_claims():
            ...
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            # Extract request from args/kwargs
            request = None
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break
            
            if not request and "request" in kwargs:
                request = kwargs["request"]
            
            if not request:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Request object not found"
                )
            
            # Get user role from request state
            if not hasattr(request.state, "user"):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Authentication required"
                )
            
            user_role = request.state.user.get("role")
            if not user_role:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="User role not found"
                )
            
            # Check permission
            if not RBACEnforcer.has_permission(user_role, permission):
                logger.warning(
                    f"Permission denied: user_role={user_role}, "
                    f"required_permission={permission}"
                )
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Permission required: {permission.value}"
                )
            
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator


def require_any_permission(permissions: List[Permission]):
    """
    Decorator to require any of the specified permissions.
    
    Usage:
        @require_any_permission([Permission.VIEW_CLAIMS, Permission.VIEW_REPORTS])
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            request = None
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break
            
            if not request and "request" in kwargs:
                request = kwargs["request"]
            
            if not request:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Request object not found"
                )
            
            if not hasattr(request.state, "user"):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Authentication required"
                )
            
            user_role = request.state.user.get("role")
            if not user_role:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="User role not found"
                )
            
            if not RBACEnforcer.has_any_permission(user_role, permissions):
                logger.warning(
                    f"Permission denied: user_role={user_role}, "
                    f"required_any={[p.value for p in permissions]}"
                )
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Insufficient permissions"
                )
            
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator


def require_role(roles: List[Role]):
    """
    Decorator to require specific role(s) for endpoint.
    
    Usage:
        @require_role([Role.ACTUARY, Role.SUPER_ADMIN])
    """
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        async def wrapper(*args, **kwargs):
            request = None
            for arg in args:
                if isinstance(arg, Request):
                    request = arg
                    break
            
            if not request and "request" in kwargs:
                request = kwargs["request"]
            
            if not request:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Request object not found"
                )
            
            if not hasattr(request.state, "user"):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Authentication required"
                )
            
            user_role = request.state.user.get("role")
            if not user_role:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="User role not found"
                )
            
            if user_role not in [r.value for r in roles]:
                logger.warning(
                    f"Role denied: user_role={user_role}, "
                    f"required_roles={[r.value for r in roles]}"
                )
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Insufficient role"
                )
            
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator


# Example Usage
"""
from fastapi import FastAPI, Depends
from backend.app.middleware.rbac import require_permission, Permission

app = FastAPI()

@app.get("/api/claims")
@require_permission(Permission.VIEW_CLAIMS)
async def get_claims(request: Request):
    # Only users with VIEW_CLAIMS permission can access
    return {"claims": [...]}

@app.post("/api/simulations")
@require_permission(Permission.RUN_SIMULATIONS)
async def run_simulation(request: Request, params: dict):
    # Only actuaries, enterprise admins, and super admins can run simulations
    return {"results": [...]}

@app.delete("/api/claims/{claim_id}")
@require_role([Role.SUPER_ADMIN, Role.ENTERPRISE_ADMIN])
async def delete_claim(request: Request, claim_id: int):
    # Only admins can delete claims
    return {"status": "deleted"}
"""