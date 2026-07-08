"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Organization Model
"""

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime

from datetime import datetime

from app.database import Base


class Organization(Base):
    """Organization/Company entity"""
    
    __tablename__ = "organizations"
    
    id = Column(
        Integer,
        primary_key=True
    )
    
    name = Column(
        String
    )
    
    industry = Column(
        String
    )
    
    employee_count = Column(
        Integer
    )
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )