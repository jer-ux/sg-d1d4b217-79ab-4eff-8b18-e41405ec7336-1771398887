"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Metric Model
"""

from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Metric(Base):
    """Calculated metric entity"""
    
    __tablename__ = "metrics"
    
    id = Column(
        Integer,
        primary_key=True
    )
    
    dataset_id = Column(
        String,
        ForeignKey("datasets.id", ondelete="CASCADE")
    )
    
    name = Column(
        String
    )
    
    value = Column(
        Float
    )
    
    category = Column(
        String
    )
    
    # Relationships
    dataset = relationship("Dataset", back_populates="metrics")