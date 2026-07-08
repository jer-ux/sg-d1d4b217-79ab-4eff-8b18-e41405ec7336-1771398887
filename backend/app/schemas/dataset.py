"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Dataset Schemas
"""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class DatasetBase(BaseModel):
    """Base dataset schema"""
    name: str
    source: str
    rows: int
    quality_score: int


class DatasetCreate(DatasetBase):
    """Schema for creating dataset"""
    pass


class DatasetResponse(DatasetBase):
    """Schema for dataset response"""
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True


class DatasetProfile(BaseModel):
    """Dataset profile information"""
    rows: int
    columns: list
    missing: dict
    quality_score: int
    duplicates: int