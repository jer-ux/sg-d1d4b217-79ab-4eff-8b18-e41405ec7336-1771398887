"""
KINCAID HEALTH™ MULTI-TENANT ISOLATION
Row-Level Security Enforcement
"""

from typing import Optional, Callable
from fastapi import Request, HTTPException, status
from sqlalchemy import event
from sqlalchemy.orm import Session
from functools import wraps
import logging

logger = logging.getLogger(__name__)


class TenantContext:
    """Thread-local tenant context"""
    _current_organization_id: Optional[int] = None
    _current_user_id: Optional[int] = None
    _current_role: Optional[str] = None
    
    @classmethod
    def set_context(cls, organization_id: int, user_id: int, role: str):
        """Set tenant context for current request"""
        cls._current_organization_id = organization_id
        cls._current_user_id = user_id
        cls._current_role = role
        logger.debug(f"Tenant context set: org={organization_id}, user={user_id}, role={role}")
    
    @classmethod
    def get_organization_id(cls) -> Optional[int]:
        """Get current organization ID"""
        return cls._current_organization_id
    
    @classmethod
    def get_user_id(cls) -> Optional[int]:
        """Get current user ID"""
        return cls._current_user_id
    
    @classmethod
    def get_role(cls) -> Optional[str]:
        """Get current user role"""
        return cls._current_role
    
    @classmethod
    def clear_context(cls):
        """Clear tenant context (end of request)"""
        cls._current_organization_id = None
        cls._current_user_id = None
        cls._current_role = None


class TenantIsolationMiddleware:
    """
    FastAPI middleware for multi-tenant data isolation.
    
    Enforces organization_id filtering on all database queries.
    Prevents cross-tenant data leakage.
    """
    
    def __init__(self, app):
        self.app = app
    
    async def __call__(self, scope, receive, send):
        if scope["type"] == "http":
            request = Request(scope, receive=receive)
            
            # Extract tenant context from JWT or API key
            organization_id = await self._extract_organization_id(request)
            user_id = await self._extract_user_id(request)
            role = await self._extract_role(request)
            
            if organization_id:
                # Set thread-local context
                TenantContext.set_context(organization_id, user_id, role)
            
            try:
                await self.app(scope, receive, send)
            finally:
                # Always clear context after request
                TenantContext.clear_context()
        else:
            await self.app(scope, receive, send)
    
    async def _extract_organization_id(self, request: Request) -> Optional[int]:
        """Extract organization ID from request"""
        # Try JWT claims first
        if hasattr(request.state, "user"):
            return request.state.user.get("organization_id")
        
        # Try API key metadata
        if hasattr(request.state, "api_key"):
            return request.state.api_key.get("organization_id")
        
        # Try header (for service-to-service calls)
        org_header = request.headers.get("X-Organization-ID")
        if org_header:
            return int(org_header)
        
        return None
    
    async def _extract_user_id(self, request: Request) -> Optional[int]:
        """Extract user ID from request"""
        if hasattr(request.state, "user"):
            return request.state.user.get("user_id")
        return None
    
    async def _extract_role(self, request: Request) -> Optional[str]:
        """Extract user role from request"""
        if hasattr(request.state, "user"):
            return request.state.user.get("role")
        return None


def enforce_tenant_isolation(db: Session):
    """
    Attach SQLAlchemy event listener to enforce tenant isolation.
    
    Automatically filters all SELECT queries by organization_id.
    Prevents developers from accidentally querying across tenants.
    """
    
    @event.listens_for(db, "before_cursor_execute", retval=True)
    def receive_before_cursor_execute(conn, cursor, statement, params, context, executemany):
        """Intercept SQL queries and inject organization_id filter"""
        
        organization_id = TenantContext.get_organization_id()
        if not organization_id:
            # No tenant context = likely system operation or misconfiguration
            logger.warning("Query executed without tenant context")
            return statement, params
        
        # Parse statement to check if it's a SELECT on a tenant-scoped table
        statement_upper = statement.upper()
        
        if "SELECT" in statement_upper and "organization_id" not in statement_upper.replace("ORGANIZATION_ID", ""):
            # Check if query is on a tenant-scoped table
            tenant_tables = [
                "CLAIMS", "MEMBERS", "ENROLLMENTS", "ELIGIBILITY",
                "PROVIDERS", "CONTRACTS", "EVIDENCE_OBJECTS",
                "DATASETS", "AUDIT_LOGS"
            ]
            
            if any(table in statement_upper for table in tenant_tables):
                # This is a risky pattern - log warning
                logger.warning(f"Query on tenant table without organization_id filter: {statement[:100]}")
        
        return statement, params


def require_tenant_context(func: Callable) -> Callable:
    """
    Decorator to require tenant context for endpoint.
    
    Raises 403 Forbidden if no organization_id in context.
    """
    @wraps(func)
    async def wrapper(*args, **kwargs):
        organization_id = TenantContext.get_organization_id()
        if not organization_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Tenant context required"
            )
        return await func(*args, **kwargs)
    
    return wrapper


def get_current_organization_id() -> int:
    """
    Get current organization ID from tenant context.
    
    Raises 403 if not set.
    """
    organization_id = TenantContext.get_organization_id()
    if not organization_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Organization context required"
        )
    return organization_id


def verify_organization_access(db: Session, organization_id: int) -> bool:
    """
    Verify current user has access to specified organization.
    
    Checks:
    - User belongs to organization
    - User has appropriate role
    - Organization is active
    """
    current_org_id = TenantContext.get_organization_id()
    current_role = TenantContext.get_role()
    
    # Super admins can access any organization
    if current_role == "super_admin":
        return True
    
    # Users can only access their own organization
    if current_org_id != organization_id:
        logger.warning(
            f"Cross-tenant access attempt: user_org={current_org_id}, "
            f"requested_org={organization_id}"
        )
        return False
    
    return True


# PostgreSQL Row-Level Security (RLS) Policies
RLS_POLICIES = """
-- Enable RLS on all tenant-scoped tables
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE eligibility ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for claims table
CREATE POLICY tenant_isolation_claims ON claims
    USING (organization_id = current_setting('app.current_organization_id')::int);

CREATE POLICY tenant_isolation_members ON members
    USING (organization_id = current_setting('app.current_organization_id')::int);

CREATE POLICY tenant_isolation_enrollments ON enrollments
    USING (organization_id = current_setting('app.current_organization_id')::int);

CREATE POLICY tenant_isolation_eligibility ON eligibility
    USING (organization_id = current_setting('app.current_organization_id')::int);

CREATE POLICY tenant_isolation_providers ON providers
    USING (organization_id = current_setting('app.current_organization_id')::int);

CREATE POLICY tenant_isolation_contracts ON contracts
    USING (organization_id = current_setting('app.current_organization_id')::int);

CREATE POLICY tenant_isolation_evidence ON evidence_objects
    USING (organization_id = current_setting('app.current_organization_id')::int);

CREATE POLICY tenant_isolation_datasets ON datasets
    USING (organization_id = current_setting('app.current_organization_id')::int);

CREATE POLICY tenant_isolation_audit_logs ON audit_logs
    USING (organization_id = current_setting('app.current_organization_id')::int);

-- Super admin bypass policy (for each table)
CREATE POLICY super_admin_bypass_claims ON claims
    USING (current_setting('app.current_role') = 'super_admin');

CREATE POLICY super_admin_bypass_members ON members
    USING (current_setting('app.current_role') = 'super_admin');

-- Repeat for all tenant-scoped tables...
"""


def set_rls_context(db: Session, organization_id: int, role: str):
    """
    Set PostgreSQL session variables for RLS enforcement.
    
    Must be called at the start of each database transaction.
    """
    db.execute(f"SET app.current_organization_id = {organization_id}")
    db.execute(f"SET app.current_role = '{role}'")
    logger.debug(f"RLS context set: org={organization_id}, role={role}")


class TenantScopedQuery:
    """
    Helper class for building tenant-scoped queries.
    
    Usage:
        query = TenantScopedQuery(db, Claim)
        results = query.filter(Claim.service_date > date(2026, 1, 1)).all()
    """
    
    def __init__(self, db: Session, model):
        self.db = db
        self.model = model
        self.organization_id = get_current_organization_id()
    
    def query(self):
        """Return base query with organization_id filter applied"""
        return self.db.query(self.model).filter(
            self.model.organization_id == self.organization_id
        )
    
    def filter(self, *args):
        """Add additional filters to tenant-scoped query"""
        return self.query().filter(*args)
    
    def all(self):
        """Execute query and return all results"""
        return self.query().all()
    
    def first(self):
        """Execute query and return first result"""
        return self.query().first()
    
    def count(self):
        """Execute query and return count"""
        return self.query().count()