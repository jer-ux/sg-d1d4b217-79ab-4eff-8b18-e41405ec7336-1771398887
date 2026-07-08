"""
KINCAID HEALTH™ EVIDENCE SPINE
Complete data lineage tracking from source to insight
"""

from typing import Dict, List, Optional, Any
from datetime import datetime
from enum import Enum
import hashlib
import json


class EvidenceType(str, Enum):
    """Types of evidence objects"""
    SOURCE_FILE = "source_file"
    INGESTION_JOB = "ingestion_job"
    VALIDATION_RESULT = "validation_result"
    TRANSFORMATION = "transformation"
    ANALYTICS_RUN = "analytics_run"
    MODEL_PREDICTION = "model_prediction"
    RECOMMENDATION = "recommendation"
    DECISION = "decision"
    AUDIT_EVENT = "audit_event"


class DataQualityScore:
    """
    Calculate comprehensive data quality scores
    Completeness + Accuracy + Consistency + Timeliness + Coverage
    """
    
    @staticmethod
    def calculate_completeness(
        required_fields: List[str],
        actual_data: Dict[str, Any]
    ) -> float:
        """
        Calculate completeness score (0-1)
        Percentage of required fields that are non-null
        """
        if not required_fields:
            return 1.0
            
        filled = sum(
            1 for field in required_fields
            if field in actual_data and actual_data[field] is not None
        )
        
        return filled / len(required_fields)
        
    @staticmethod
    def calculate_accuracy(
        validation_results: Dict[str, bool]
    ) -> float:
        """
        Calculate accuracy score (0-1)
        Percentage of validations that passed
        """
        if not validation_results:
            return 1.0
            
        passed = sum(1 for valid in validation_results.values() if valid)
        return passed / len(validation_results)
        
    @staticmethod
    def calculate_consistency(
        cross_checks: List[Dict[str, Any]]
    ) -> float:
        """
        Calculate consistency score (0-1)
        Check if data is consistent across sources/periods
        """
        if not cross_checks:
            return 1.0
            
        consistent = sum(1 for check in cross_checks if check.get("consistent", False))
        return consistent / len(cross_checks)
        
    @staticmethod
    def calculate_timeliness(
        expected_date: datetime,
        actual_date: datetime,
        sla_days: int = 5
    ) -> float:
        """
        Calculate timeliness score (0-1)
        How close to expected delivery date
        """
        days_late = (actual_date - expected_date).days
        
        if days_late <= 0:
            return 1.0
        elif days_late >= sla_days:
            return 0.0
        else:
            return 1.0 - (days_late / sla_days)
            
    @staticmethod
    def calculate_coverage(
        expected_count: int,
        actual_count: int
    ) -> float:
        """
        Calculate coverage score (0-1)
        Percentage of expected records received
        """
        if expected_count == 0:
            return 1.0
            
        return min(actual_count / expected_count, 1.0)
        
    @classmethod
    def calculate_overall_score(
        cls,
        completeness: float,
        accuracy: float,
        consistency: float,
        timeliness: float,
        coverage: float,
        weights: Optional[Dict[str, float]] = None
    ) -> Dict[str, Any]:
        """
        Calculate weighted overall data quality score
        
        Args:
            completeness: Completeness score 0-1
            accuracy: Accuracy score 0-1
            consistency: Consistency score 0-1
            timeliness: Timeliness score 0-1
            coverage: Coverage score 0-1
            weights: Optional custom weights (default: equal weight)
            
        Returns:
            Overall score with breakdown
        """
        if weights is None:
            weights = {
                "completeness": 0.25,
                "accuracy": 0.25,
                "consistency": 0.20,
                "timeliness": 0.15,
                "coverage": 0.15
            }
            
        overall = (
            weights["completeness"] * completeness +
            weights["accuracy"] * accuracy +
            weights["consistency"] * consistency +
            weights["timeliness"] * timeliness +
            weights["coverage"] * coverage
        )
        
        # Determine quality grade
        if overall >= 0.90:
            grade = "A"
        elif overall >= 0.80:
            grade = "B"
        elif overall >= 0.70:
            grade = "C"
        elif overall >= 0.60:
            grade = "D"
        else:
            grade = "F"
            
        return {
            "overall_score": overall,
            "grade": grade,
            "dimensions": {
                "completeness": completeness,
                "accuracy": accuracy,
                "consistency": consistency,
                "timeliness": timeliness,
                "coverage": coverage
            },
            "weights": weights
        }


class EvidenceSpine:
    """
    Track complete data lineage from source to decision
    Every insight traceable to source evidence
    """
    
    def __init__(self, tenant_id: str):
        self.tenant_id = tenant_id
        
    def create_evidence_object(
        self,
        evidence_type: EvidenceType,
        entity_type: str,
        entity_id: str,
        metadata: Dict[str, Any],
        parent_evidence_id: Optional[str] = None
    ) -> str:
        """
        Create evidence object in the spine
        
        Args:
            evidence_type: Type of evidence
            entity_type: Entity being tracked (claim, member, file, etc)
            entity_id: Unique identifier for the entity
            metadata: Evidence metadata
            parent_evidence_id: Parent evidence for traceability chain
            
        Returns:
            Evidence object ID
        """
        evidence_id = self._generate_evidence_id(
            evidence_type,
            entity_type,
            entity_id
        )
        
        evidence_object = {
            "evidence_id": evidence_id,
            "tenant_id": self.tenant_id,
            "evidence_type": evidence_type.value,
            "entity_type": entity_type,
            "entity_id": entity_id,
            "parent_evidence_id": parent_evidence_id,
            "metadata": metadata,
            "created_at": datetime.utcnow(),
            "created_by": "system"  # Or actual user
        }
        
        self._store_evidence(evidence_object)
        return evidence_id
        
    def track_file_ingestion(
        self,
        file_name: str,
        file_hash: str,
        source: str,
        record_count: int,
        quality_scores: Dict[str, float]
    ) -> str:
        """Track source file ingestion"""
        return self.create_evidence_object(
            evidence_type=EvidenceType.SOURCE_FILE,
            entity_type="file",
            entity_id=file_hash,
            metadata={
                "file_name": file_name,
                "source": source,
                "record_count": record_count,
                "quality_scores": quality_scores
            }
        )
        
    def track_transformation(
        self,
        transformation_name: str,
        input_evidence_ids: List[str],
        output_count: int,
        rules_applied: List[str]
    ) -> str:
        """Track data transformation"""
        evidence_id = self.create_evidence_object(
            evidence_type=EvidenceType.TRANSFORMATION,
            entity_type="transformation",
            entity_id=transformation_name,
            metadata={
                "output_count": output_count,
                "rules_applied": rules_applied
            }
        )
        
        # Link to input evidence
        for input_id in input_evidence_ids:
            self._create_evidence_link(input_id, evidence_id)
            
        return evidence_id
        
    def track_analytics_run(
        self,
        model_name: str,
        model_version: str,
        input_evidence_ids: List[str],
        results: Dict[str, Any],
        confidence: float
    ) -> str:
        """Track analytics model execution"""
        evidence_id = self.create_evidence_object(
            evidence_type=EvidenceType.ANALYTICS_RUN,
            entity_type="analytics",
            entity_id=f"{model_name}_{model_version}",
            metadata={
                "model_name": model_name,
                "model_version": model_version,
                "results": results,
                "confidence": confidence
            }
        )
        
        # Link to input evidence
        for input_id in input_evidence_ids:
            self._create_evidence_link(input_id, evidence_id)
            
        return evidence_id
        
    def track_recommendation(
        self,
        recommendation_type: str,
        recommendation: str,
        supporting_evidence_ids: List[str],
        financial_impact: float,
        confidence: float
    ) -> str:
        """Track AI-generated recommendation"""
        evidence_id = self.create_evidence_object(
            evidence_type=EvidenceType.RECOMMENDATION,
            entity_type="recommendation",
            entity_id=recommendation_type,
            metadata={
                "recommendation": recommendation,
                "financial_impact": financial_impact,
                "confidence": confidence
            }
        )
        
        # Link to supporting evidence
        for evidence_id_support in supporting_evidence_ids:
            self._create_evidence_link(evidence_id_support, evidence_id)
            
        return evidence_id
        
    def track_decision(
        self,
        decision_type: str,
        decision: str,
        decision_maker: str,
        recommendation_evidence_id: str,
        rationale: str
    ) -> str:
        """Track human decision based on recommendation"""
        return self.create_evidence_object(
            evidence_type=EvidenceType.DECISION,
            entity_type="decision",
            entity_id=decision_type,
            metadata={
                "decision": decision,
                "decision_maker": decision_maker,
                "rationale": rationale
            },
            parent_evidence_id=recommendation_evidence_id
        )
        
    def get_evidence_lineage(
        self,
        evidence_id: str,
        depth: int = 10
    ) -> Dict[str, Any]:
        """
        Get complete lineage for an evidence object
        Trace back to original source data
        
        Args:
            evidence_id: Evidence object to trace
            depth: Maximum depth to traverse
            
        Returns:
            Evidence lineage tree
        """
        evidence = self._get_evidence(evidence_id)
        if not evidence:
            return {}
            
        lineage = {
            "evidence": evidence,
            "parents": [],
            "children": []
        }
        
        # Traverse parents
        if evidence.get("parent_evidence_id") and depth > 0:
            parent_lineage = self.get_evidence_lineage(
                evidence["parent_evidence_id"],
                depth - 1
            )
            lineage["parents"].append(parent_lineage)
            
        # Get linked evidence
        links = self._get_evidence_links(evidence_id)
        for link in links:
            if depth > 0:
                linked_lineage = self.get_evidence_lineage(
                    link["linked_evidence_id"],
                    depth - 1
                )
                lineage["children"].append(linked_lineage)
                
        return lineage
        
    def generate_evidence_report(
        self,
        entity_type: str,
        entity_id: str
    ) -> Dict[str, Any]:
        """
        Generate comprehensive evidence report for an entity
        
        Args:
            entity_type: Type of entity (claim, member, recommendation, etc)
            entity_id: Entity identifier
            
        Returns:
            Evidence report with lineage, quality scores, and audit trail
        """
        # Get all evidence for entity
        evidence_objects = self._get_evidence_by_entity(entity_type, entity_id)
        
        report = {
            "entity_type": entity_type,
            "entity_id": entity_id,
            "evidence_count": len(evidence_objects),
            "evidence_chain": [],
            "quality_summary": {},
            "audit_trail": []
        }
        
        for evidence in evidence_objects:
            # Build lineage
            lineage = self.get_evidence_lineage(evidence["evidence_id"])
            report["evidence_chain"].append(lineage)
            
            # Extract quality scores
            if "quality_scores" in evidence.get("metadata", {}):
                report["quality_summary"] = evidence["metadata"]["quality_scores"]
                
            # Add to audit trail
            report["audit_trail"].append({
                "timestamp": evidence["created_at"],
                "evidence_type": evidence["evidence_type"],
                "created_by": evidence["created_by"]
            })
            
        return report
        
    def _generate_evidence_id(
        self,
        evidence_type: EvidenceType,
        entity_type: str,
        entity_id: str
    ) -> str:
        """Generate unique evidence ID"""
        timestamp = datetime.utcnow().isoformat()
        hash_input = f"{self.tenant_id}:{evidence_type.value}:{entity_type}:{entity_id}:{timestamp}"
        hash_hex = hashlib.sha256(hash_input.encode()).hexdigest()[:16]
        return f"EV-{hash_hex}"
        
    def _store_evidence(self, evidence_object: Dict[str, Any]):
        """Store evidence object in database"""
        # Production: insert into evidence_objects table
        pass
        
    def _create_evidence_link(
        self,
        source_evidence_id: str,
        target_evidence_id: str
    ):
        """Create link between evidence objects"""
        # Production: insert into evidence_links table
        pass
        
    def _get_evidence(self, evidence_id: str) -> Optional[Dict[str, Any]]:
        """Get evidence object by ID"""
        # Production: query database
        return None
        
    def _get_evidence_links(self, evidence_id: str) -> List[Dict[str, Any]]:
        """Get all evidence links for an object"""
        # Production: query database
        return []
        
    def _get_evidence_by_entity(
        self,
        entity_type: str,
        entity_id: str
    ) -> List[Dict[str, Any]]:
        """Get all evidence objects for an entity"""
        # Production: query database
        return []


# Example usage
if __name__ == "__main__":
    spine = EvidenceSpine(tenant_id="acme-corp")
    
    # Track file ingestion
    file_evidence = spine.track_file_ingestion(
        file_name="claims_2024_q1.csv",
        file_hash="abc123",
        source="carrier",
        record_count=50000,
        quality_scores={
            "completeness": 0.98,
            "accuracy": 0.95,
            "timeliness": 1.0
        }
    )
    
    # Track transformation
    transform_evidence = spine.track_transformation(
        transformation_name="claims_normalization",
        input_evidence_ids=[file_evidence],
        output_count=49800,
        rules_applied=["deduplicate", "normalize_codes", "validate_amounts"]
    )
    
    # Track analytics
    analytics_evidence = spine.track_analytics_run(
        model_name="high_cost_predictor",
        model_version="2.1",
        input_evidence_ids=[transform_evidence],
        results={"predicted_high_cost": 125},
        confidence=0.87
    )
    
    # Track recommendation
    rec_evidence = spine.track_recommendation(
        recommendation_type="intervention",
        recommendation="Implement care management for 125 high-risk members",
        supporting_evidence_ids=[analytics_evidence],
        financial_impact=-850000,
        confidence=0.87
    )
    
    # Get lineage
    lineage = spine.get_evidence_lineage(rec_evidence)
    print(json.dumps(lineage, indent=2, default=str))