"""
KINCAID HEALTH™ AIOS
Audit Logging Service
"""

from typing import Optional, Dict, Any
from uuid import UUID
import structlog

from app.models.schemas import AuditLogCreate
from app.models.database import AuditLog
from app.services.database import get_db

logger = structlog.get_logger()

class AuditService:
    @staticmethod
    async def log_action(
        user_id: Optional[str],
        action: str,
        resource: str,
        resource_id: Optional[str] = None,
        details: Optional[Dict[str, Any]] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None
    ) -> str:
        """
        Log an action to audit trail.
        
        Args:
            user_id: User performing the action
            action: Action type (e.g., "create", "read", "update", "delete")
            resource: Resource being accessed (e.g., "report", "simulation", "data")
            resource_id: Specific resource identifier
            details: Additional context
            ip_address: Client IP
            user_agent: Client user agent
            
        Returns:
            Audit log ID
        """
        try:
            with get_db() as db:
                audit_log = AuditLog(
                    user_id=UUID(user_id) if user_id else None,
                    action=action,
                    resource=resource,
                    resource_id=resource_id,
                    details=details,
                    ip_address=ip_address,
                    user_agent=user_agent
                )
                db.add(audit_log)
                db.commit()
                db.refresh(audit_log)
                
                logger.info(
                    "action_logged",
                    audit_id=str(audit_log.id),
                    user_id=user_id,
                    action=action,
                    resource=resource
                )
                
                return str(audit_log.id)
        except Exception as e:
            logger.error("audit_log_failed", error=str(e))
            raise

# Global audit service instance
audit_service = AuditService()