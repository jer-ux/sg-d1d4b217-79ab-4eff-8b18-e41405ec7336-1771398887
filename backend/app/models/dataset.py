"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Dataset Model
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.database import Base


def generate_uuid():
    return str(uuid.uuid4())


class Dataset(Base):
    __tablename__ = "datasets"
    
    id = Column(
        String,
        primary_key=True,
        default=generate_uuid
    )
    
    organization_id = Column(
        String,
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False
    )
    
    name = Column(
        String
    )
    
    source = Column(
        String
    )
    
    rows = Column(
        Integer
    )
    
    quality_score = Column(
        Integer
    )
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )
    
    # Relationships
    organization = relationship("Organization", back_populates="datasets")
    claims = relationship("Claim", back_populates="dataset", cascade="all, delete-orphan")
    metrics = relationship("Metric", back_populates="dataset", cascade="all, delete-orphan")