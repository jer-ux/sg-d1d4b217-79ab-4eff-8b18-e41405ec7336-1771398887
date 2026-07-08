"""
KINCAID IQ™ INTELLIGENCE KERNEL
Core Data Models and Schemas

The IntelligenceObject base class and domain entities
"""

from datetime import datetime
from typing import Optional, List, Dict, Any
from enum import Enum
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy import Column, String, Integer, Float, DateTime, JSON, ForeignKey, Text, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.models.database import Base


# ============================================================================
# ENUMERATIONS
# ============================================================================

class IntelligenceObjectType(str, Enum):
    """Types of intelligence objects in the system"""
    DRUG = "drug"
    CONTRACT = "contract"
    EMPLOYEE = "employee"
    VENDOR = "vendor"
    CLAIM = "claim"
    DECISION = "decision"
    RISK = "risk"
    RECOMMENDATION = "recommendation"
    MODEL = "model"
    REPORT = "report"
    DATASET = "dataset"
    METRIC = "metric"
    SIMULATION = "simulation"
    EVENT = "event"


class ConfidenceLevel(str, Enum):
    """Confidence levels for intelligence objects"""
    VERY_LOW = "very_low"  # < 50%
    LOW = "low"  # 50-70%
    MEDIUM = "medium"  # 70-85%
    HIGH = "high"  # 85-95%
    VERY_HIGH = "very_high"  # > 95%


class RiskLevel(str, Enum):
    """Risk severity levels"""
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    MINIMAL = "minimal"


# ============================================================================
# SQLALCHEMY MODELS (Database Tables)
# ============================================================================

class IntelligenceObjectModel(Base):
    """
    Base table for all intelligence objects
    
    Every entity in the system (drug, contract, claim, etc.) inherits from this
    """
    __tablename__ = "intelligence_objects"
    
    # Primary identification
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type = Column(SQLEnum(IntelligenceObjectType), nullable=False, index=True)
    
    # Ownership and source
    owner_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    source = Column(String(255), nullable=True)  # Where this data came from
    source_id = Column(String(255), nullable=True)  # External ID in source system
    
    # Temporal
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Intelligence metadata
    confidence_score = Column(Float, nullable=True)  # 0.0 to 1.0
    confidence_level = Column(SQLEnum(ConfidenceLevel), nullable=True)
    
    # Financial impact
    financial_impact = Column(Float, nullable=True)  # Dollar amount
    financial_impact_min = Column(Float, nullable=True)  # Lower bound
    financial_impact_max = Column(Float, nullable=True)  # Upper bound
    
    # Risk assessment
    risk_score = Column(Float, nullable=True)  # 0.0 to 1.0
    risk_level = Column(SQLEnum(RiskLevel), nullable=True)
    
    # Evidence and relationships
    evidence = Column(JSON, nullable=True)  # Supporting evidence
    relationships = Column(JSON, nullable=True)  # Related object IDs
    metadata = Column(JSON, nullable=True)  # Additional metadata
    
    # Permissions
    permissions = Column(JSON, nullable=True)  # Access control
    
    # Versioning
    version = Column(Integer, default=1, nullable=False)
    previous_version_id = Column(UUID(as_uuid=True), nullable=True)
    
    # Relationships
    owner = relationship("OrganizationModel", back_populates="intelligence_objects")


class OrganizationModel(Base):
    """Organization/Client entity"""
    __tablename__ = "organizations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    domain = Column(String(255), nullable=True)
    
    # Plan metadata
    employee_count = Column(Integer, nullable=True)
    annual_healthcare_spend = Column(Float, nullable=True)
    
    # Temporal
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationships
    intelligence_objects = relationship("IntelligenceObjectModel", back_populates="owner")
    datasets = relationship("DatasetModel", back_populates="organization")


class DatasetModel(Base):
    """Uploaded datasets"""
    __tablename__ = "datasets"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    
    name = Column(String(255), nullable=False)
    type = Column(String(100), nullable=False)  # claims, pharmacy, eligibility, etc.
    file_path = Column(String(512), nullable=False)
    file_size = Column(Integer, nullable=True)
    row_count = Column(Integer, nullable=True)
    
    # Validation
    validation_status = Column(String(50), default="pending")  # pending, valid, invalid
    validation_errors = Column(JSON, nullable=True)
    
    # Processing
    processing_status = Column(String(50), default="pending")  # pending, processing, completed, failed
    processed_at = Column(DateTime, nullable=True)
    
    # Metadata
    schema_detected = Column(JSON, nullable=True)
    date_range_start = Column(DateTime, nullable=True)
    date_range_end = Column(DateTime, nullable=True)
    
    # Temporal
    uploaded_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    
    # Relationships
    organization = relationship("OrganizationModel", back_populates="datasets")


# ============================================================================
# PYDANTIC SCHEMAS (API Request/Response)
# ============================================================================

class IntelligenceObjectBase(BaseModel):
    """Base schema for intelligence objects"""
    type: IntelligenceObjectType
    owner_id: Optional[uuid.UUID] = None
    source: Optional[str] = None
    source_id: Optional[str] = None
    confidence_score: Optional[float] = Field(None, ge=0.0, le=1.0)
    confidence_level: Optional[ConfidenceLevel] = None
    financial_impact: Optional[float] = None
    financial_impact_min: Optional[float] = None
    financial_impact_max: Optional[float] = None
    risk_score: Optional[float] = Field(None, ge=0.0, le=1.0)
    risk_level: Optional[RiskLevel] = None
    evidence: Optional[Dict[str, Any]] = None
    relationships: Optional[Dict[str, List[str]]] = None
    metadata: Optional[Dict[str, Any]] = None
    permissions: Optional[Dict[str, Any]] = None


class IntelligenceObjectCreate(IntelligenceObjectBase):
    """Schema for creating intelligence objects"""
    pass


class IntelligenceObjectResponse(IntelligenceObjectBase):
    """Schema for intelligence object responses"""
    id: uuid.UUID
    timestamp: datetime
    created_at: datetime
    updated_at: datetime
    version: int
    previous_version_id: Optional[uuid.UUID] = None
    
    model_config = ConfigDict(from_attributes=True)


class OrganizationBase(BaseModel):
    """Base organization schema"""
    name: str
    domain: Optional[str] = None
    employee_count: Optional[int] = None
    annual_healthcare_spend: Optional[float] = None


class OrganizationCreate(OrganizationBase):
    """Schema for creating organizations"""
    pass


class OrganizationResponse(OrganizationBase):
    """Schema for organization responses"""
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class DatasetBase(BaseModel):
    """Base dataset schema"""
    name: str
    type: str
    file_path: str
    file_size: Optional[int] = None
    row_count: Optional[int] = None


class DatasetCreate(DatasetBase):
    """Schema for creating datasets"""
    organization_id: uuid.UUID


class DatasetResponse(DatasetBase):
    """Schema for dataset responses"""
    id: uuid.UUID
    organization_id: uuid.UUID
    validation_status: str
    validation_errors: Optional[Dict[str, Any]] = None
    processing_status: str
    processed_at: Optional[datetime] = None
    schema_detected: Optional[Dict[str, Any]] = None
    date_range_start: Optional[datetime] = None
    date_range_end: Optional[datetime] = None
    uploaded_at: datetime
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# ============================================================================
# SPECIALIZED DOMAIN SCHEMAS
# ============================================================================

class ClaimSchema(IntelligenceObjectBase):
    """Healthcare claim"""
    type: IntelligenceObjectType = IntelligenceObjectType.CLAIM
    claim_id: str
    member_id: str
    provider_id: Optional[str] = None
    service_date: datetime
    paid_date: Optional[datetime] = None
    billed_amount: float
    paid_amount: float
    diagnosis_codes: List[str] = []
    procedure_codes: List[str] = []


class ContractSchema(IntelligenceObjectBase):
    """Vendor contract"""
    type: IntelligenceObjectType = IntelligenceObjectType.CONTRACT
    contract_id: str
    vendor_name: str
    contract_type: str  # PBM, TPA, Stop-Loss, etc.
    effective_date: datetime
    expiration_date: datetime
    annual_value: Optional[float] = None
    key_terms: Optional[Dict[str, Any]] = None


class RecommendationSchema(IntelligenceObjectBase):
    """AI-generated recommendation"""
    type: IntelligenceObjectType = IntelligenceObjectType.RECOMMENDATION
    title: str
    description: str
    action_items: List[str] = []
    expected_savings: Optional[float] = None
    implementation_difficulty: str = "medium"  # low, medium, high
    time_to_value: Optional[str] = None
    agent_source: Optional[str] = None  # Which AI agent generated this