"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Dataset Model
"""

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database import Base


class Dataset(Base):
    """Uploaded dataset entity"""
    
    __tablename__ = "datasets"
    
    id = Column(
        Integer,
        primary_key=True
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