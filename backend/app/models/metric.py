"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Metric Model
"""

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import String

from app.database import Base


class Metric(Base):
    """Calculated metric entity"""
    
    __tablename__ = "metrics"
    
    id = Column(
        Integer,
        primary_key=True
    )
    
    dataset_id = Column(
        Integer
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