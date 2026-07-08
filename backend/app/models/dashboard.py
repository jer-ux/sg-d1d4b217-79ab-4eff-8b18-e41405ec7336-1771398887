"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Dashboard Model
"""

from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import JSON
from sqlalchemy import DateTime

from datetime import datetime

from app.database import Base


class Dashboard(Base):
    """Dashboard configuration entity"""
    
    __tablename__ = "dashboards"
    
    id = Column(
        Integer,
        primary_key=True
    )
    
    name = Column(
        String
    )
    
    dashboard_type = Column(
        String
    )
    
    config = Column(
        JSON
    )
    
    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )