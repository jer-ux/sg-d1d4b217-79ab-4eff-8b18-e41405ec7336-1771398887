"""
KINCAID HEALTH™ DATA MODELS
SQLAlchemy ORM Entities
"""

from .database import Base, engine, SessionLocal, get_db
from .user import User
from .organization import Organization
from .dataset import Dataset
from .metric import Metric
from .dashboard import Dashboard
from .claim import Claim, ClaimLine, ClaimDiagnosis, ClaimProcedure
from .pharmacy_claim import PharmacyClaim
from .member import Member, Enrollment, Eligibility
from .provider import Provider, Facility
from .contract import Contract, ContractTerm, PBMContract, NetworkContract
from .vendor import Vendor
from .evidence_object import EvidenceObject
from .audit_log import AuditLog

__all__ = [
    # Core Infrastructure
    "Base",
    "engine",
    "SessionLocal",
    "get_db",
    
    # Users & Organizations
    "User",
    "Organization",
    
    # Analytics
    "Dataset",
    "Metric",
    "Dashboard",
    
    # Healthcare Core
    "Claim",
    "ClaimLine",
    "ClaimDiagnosis",
    "ClaimProcedure",
    "PharmacyClaim",
    "Member",
    "Enrollment",
    "Eligibility",
    "Provider",
    "Facility",
    
    # Contracts & Vendors
    "Contract",
    "ContractTerm",
    "PBMContract",
    "NetworkContract",
    "Vendor",
    
    # Evidence & Audit
    "EvidenceObject",
    "AuditLog",
]