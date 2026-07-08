"""
KINCAID IQ™ DATA INTELLIGENCE CORE v0.1
Upload API Endpoints
"""

from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import Depends

import pandas as pd
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.dataset import Dataset
from app.services.ingestion import DataIngestion
from app.services.validation import DataValidator


router = APIRouter(
    prefix="/upload",
    tags=["upload"]
)


@router.post("/")
async def upload_file(
    file: UploadFile,
    db: Session = Depends(get_db)
):
    """
    Upload and profile a dataset
    
    Workflow:
    1. Load file into DataFrame
    2. Profile dataset
    3. Validate quality
    4. Store metadata in database
    """
    
    # Load file
    engine = DataIngestion()
    
    if file.filename.endswith('.csv'):
        df = engine.load_csv(file.file)
    elif file.filename.endswith(('.xlsx', '.xls')):
        df = engine.load_excel(file.file)
    else:
        return {"error": "Unsupported file type"}
    
    # Profile dataset
    profile = engine.profile(df)
    
    # Validate quality
    validator = DataValidator()
    validation = validator.validate(df)
    
    # Store in database
    dataset = Dataset(
        name=file.filename,
        source="upload",
        rows=profile["rows"],
        quality_score=validation["quality_score"]
    )
    db.add(dataset)
    db.commit()
    db.refresh(dataset)
    
    return {
        "dataset_id": dataset.id,
        "profile": profile,
        "quality": validation
    }


@router.get("/datasets")
async def list_datasets(
    db: Session = Depends(get_db)
):
    """List all uploaded datasets"""
    
    datasets = db.query(Dataset).all()
    
    return {
        "datasets": [
            {
                "id": d.id,
                "name": d.name,
                "rows": d.rows,
                "quality_score": d.quality_score,
                "created_at": d.created_at
            }
            for d in datasets
        ]
    }