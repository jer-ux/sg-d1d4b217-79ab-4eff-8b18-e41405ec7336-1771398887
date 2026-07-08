"""
KINCAID HEALTH™ INTELLIGENCE KERNEL
Evidence Spine — Universal Activity Tracking

Captures all system activity as evidence objects for:
- Audit compliance
- Root cause analysis
- Decision provenance
- Performance analytics
- Security forensics
"""

from datetime import datetime
from typing import Optional, Dict, Any, List
from sqlalchemy.orm import Session
import uuid
import json

from app.models.audit_log import AuditLog
from app.models.evidence_object import EvidenceObject


class EvidenceSpine:
    """
    Universal activity tracking system
    
    Every action in the system creates an evidence object:
    - Data uploads → evidence of data ingestion
    - API calls → evidence of system usage
    - AI agent executions → evidence of analytical decisions
    - User actions → evidence of human decisions
    - System events → evidence of infrastructure health
    """
    
    def __init__(self, db: Session):
        self.db = db
    
    def track_data_upload(
        self,
        organization_id: str,
        user_id: Optional[str],
        dataset_id: str,
        filename: str,
        rows: int,
        quality_score: int,
        metadata: Dict[str, Any]
    ) -> str:
        """Track data upload event"""
        
        # Create audit log
        audit_id = str(uuid.uuid4())
        audit_log = AuditLog(
            id=audit_id,
            user_id=user_id,
            actor_type="user",
            action="upload",
            action_category="data",
            target_type="dataset",
            target_id=dataset_id,
            description=f"Uploaded dataset: {filename}",
            after_state={
                "filename": filename,
                "rows": rows,
                "quality_score": quality_score,
            },
            metadata=metadata,
            created_at=datetime.utcnow()
        )
        self.db.add(audit_log)
        
        # Create evidence object
        evidence_id = str(uuid.uuid4())
        evidence = EvidenceObject(
            id=evidence_id,
            organization_id=organization_id,
            object_type="data_ingestion",
            object_category="operational",
            title=f"Data Upload: {filename}",
            description=f"Uploaded {rows:,} rows with quality score {quality_score}%",
            confidence_score=quality_score / 100.0,
            confidence_level=self._get_confidence_level(quality_score / 100.0),
            source_type="user",
            source_id=user_id,
            evidence_chain=[{"audit_log_id": audit_id}],
            data={
                "dataset_id": dataset_id,
                "filename": filename,
                "rows": rows,
                "quality_score": quality_score,
                "metadata": metadata,
            },
            review_status="approved",  # Data uploads auto-approved
            created_at=datetime.utcnow()
        )
        self.db.add(evidence)
        
        self.db.commit()
        return evidence_id
    
    def track_api_call(
        self,
        organization_id: str,
        user_id: Optional[str],
        endpoint: str,
        method: str,
        status_code: int,
        duration_ms: float,
        request_data: Optional[Dict[str, Any]] = None,
        response_data: Optional[Dict[str, Any]] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None
    ) -> str:
        """Track API call"""
        
        audit_id = str(uuid.uuid4())
        audit_log = AuditLog(
            id=audit_id,
            user_id=user_id,
            actor_type="user" if user_id else "anonymous",
            action=method.lower(),
            action_category="api",
            target_type="endpoint",
            target_id=endpoint,
            description=f"{method} {endpoint} → {status_code}",
            after_state={
                "status_code": status_code,
                "duration_ms": duration_ms,
                "request": request_data,
                "response": response_data,
            },
            ip_address=ip_address,
            user_agent=user_agent,
            created_at=datetime.utcnow()
        )
        self.db.add(audit_log)
        self.db.commit()
        
        return audit_id
    
    def track_agent_execution(
        self,
        organization_id: str,
        agent_name: str,
        agent_version: str,
        task: str,
        result: Dict[str, Any],
        confidence_score: float,
        evidence_chain: List[Dict[str, Any]],
        execution_time_ms: float
    ) -> str:
        """Track AI agent execution"""
        
        # Create audit log
        audit_id = str(uuid.uuid4())
        audit_log = AuditLog(
            id=audit_id,
            actor_type="agent",
            actor_name=agent_name,
            action="execute",
            action_category="analysis",
            target_type="task",
            description=f"Agent {agent_name} executed: {task}",
            after_state={
                "result": result,
                "confidence_score": confidence_score,
                "execution_time_ms": execution_time_ms,
            },
            created_at=datetime.utcnow()
        )
        self.db.add(audit_log)
        
        # Create evidence object
        evidence_id = str(uuid.uuid4())
        evidence = EvidenceObject(
            id=evidence_id,
            organization_id=organization_id,
            object_type="agent_analysis",
            object_category="analytical",
            title=f"{agent_name}: {task}",
            description=result.get("summary", "AI agent analysis completed"),
            confidence_score=confidence_score,
            confidence_level=self._get_confidence_level(confidence_score),
            source_type="agent",
            agent_name=agent_name,
            agent_version=agent_version,
            evidence_chain=evidence_chain + [{"audit_log_id": audit_id}],
            data=result,
            review_status="pending",  # Agent outputs need review
            created_at=datetime.utcnow()
        )
        self.db.add(evidence)
        
        self.db.commit()
        return evidence_id
    
    def track_user_decision(
        self,
        organization_id: str,
        user_id: str,
        decision_type: str,
        decision: str,
        rationale: str,
        evidence_object_ids: List[str],
        financial_impact: Optional[Dict[str, float]] = None
    ) -> str:
        """Track user decision with supporting evidence"""
        
        # Create audit log
        audit_id = str(uuid.uuid4())
        audit_log = AuditLog(
            id=audit_id,
            user_id=user_id,
            actor_type="user",
            action="decide",
            action_category="decision",
            target_type=decision_type,
            description=f"User decision: {decision}",
            after_state={
                "decision": decision,
                "rationale": rationale,
                "supporting_evidence": evidence_object_ids,
            },
            created_at=datetime.utcnow()
        )
        self.db.add(audit_log)
        
        # Create evidence object
        evidence_id = str(uuid.uuid4())
        evidence = EvidenceObject(
            id=evidence_id,
            organization_id=organization_id,
            object_type="decision",
            object_category="governance",
            title=f"Decision: {decision}",
            description=rationale,
            confidence_score=1.0,  # User decisions have full confidence
            confidence_level="very_high",
            source_type="user",
            source_id=user_id,
            evidence_chain=[{"audit_log_id": audit_id}],
            related_objects=evidence_object_ids,
            financial_impact_min=financial_impact.get("min") if financial_impact else None,
            financial_impact_expected=financial_impact.get("expected") if financial_impact else None,
            financial_impact_max=financial_impact.get("max") if financial_impact else None,
            data={
                "decision_type": decision_type,
                "decision": decision,
                "rationale": rationale,
                "supporting_evidence": evidence_object_ids,
            },
            review_status="approved",  # User decisions auto-approved
            created_at=datetime.utcnow()
        )
        self.db.add(evidence)
        
        self.db.commit()
        return evidence_id
    
    def track_system_event(
        self,
        event_type: str,
        event_name: str,
        description: str,
        severity: str,  # info, warning, error, critical
        metadata: Dict[str, Any]
    ) -> str:
        """Track system event"""
        
        audit_id = str(uuid.uuid4())
        audit_log = AuditLog(
            id=audit_id,
            actor_type="system",
            action="event",
            action_category="system",
            target_type=event_type,
            description=description,
            after_state=metadata,
            created_at=datetime.utcnow()
        )
        self.db.add(audit_log)
        self.db.commit()
        
        return audit_id
    
    def get_evidence_chain(
        self,
        evidence_object_id: str
    ) -> List[Dict[str, Any]]:
        """Retrieve complete evidence chain for an object"""
        
        evidence = self.db.query(EvidenceObject).filter(
            EvidenceObject.id == evidence_object_id
        ).first()
        
        if not evidence:
            return []
        
        chain = []
        current = evidence
        
        while current:
            chain.append({
                "evidence_id": current.id,
                "title": current.title,
                "type": current.object_type,
                "confidence": current.confidence_score,
                "created_at": current.created_at.isoformat(),
                "agent": current.agent_name,
                "source": current.source_type,
            })
            
            # Follow previous version
            if current.previous_version_id:
                current = self.db.query(EvidenceObject).filter(
                    EvidenceObject.id == current.previous_version_id
                ).first()
            else:
                current = None
        
        return chain
    
    def _get_confidence_level(self, score: float) -> str:
        """Convert confidence score to level"""
        if score >= 0.9:
            return "very_high"
        elif score >= 0.75:
            return "high"
        elif score >= 0.5:
            return "medium"
        elif score >= 0.25:
            return "low"
        else:
            return "very_low"
    
    def query_evidence(
        self,
        organization_id: str,
        object_type: Optional[str] = None,
        start_date: Optional[datetime] = None,
        end_date: Optional[datetime] = None,
        confidence_min: Optional[float] = None,
        limit: int = 100
    ) -> List[EvidenceObject]:
        """Query evidence objects with filters"""
        
        query = self.db.query(EvidenceObject).filter(
            EvidenceObject.organization_id == organization_id
        )
        
        if object_type:
            query = query.filter(EvidenceObject.object_type == object_type)
        
        if start_date:
            query = query.filter(EvidenceObject.created_at >= start_date)
        
        if end_date:
            query = query.filter(EvidenceObject.created_at <= end_date)
        
        if confidence_min:
            query = query.filter(EvidenceObject.confidence_score >= confidence_min)
        
        query = query.order_by(EvidenceObject.created_at.desc()).limit(limit)
        
        return query.all()