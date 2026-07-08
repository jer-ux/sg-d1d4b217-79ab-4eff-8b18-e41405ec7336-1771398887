"""
KINCAID HEALTH™ SIMULATION ENGINE
Model Registry with Auto-Discovery
"""

from typing import Dict, Callable, List, Optional
from dataclasses import dataclass


@dataclass
class ModelMetadata:
    """Model metadata for registry"""
    name: str
    category: str
    description: str
    required_params: List[str]
    optional_params: List[str]
    example_values: Dict[str, float]


class ModelRegistry:
    """Central registry for all simulation models"""
    
    def __init__(self):
        self._models: Dict[str, Callable] = {}
        self._metadata: Dict[str, ModelMetadata] = {}
    
    def register(
        self,
        name: str,
        model: Callable,
        category: str,
        description: str,
        required_params: List[str],
        optional_params: List[str] = None,
        example_values: Dict[str, float] = None
    ):
        """Register a model with metadata"""
        self._models[name] = model
        self._metadata[name] = ModelMetadata(
            name=name,
            category=category,
            description=description,
            required_params=required_params,
            optional_params=optional_params or [],
            example_values=example_values or {}
        )
    
    def get(self, name: str) -> Optional[Callable]:
        """Get model by name"""
        return self._models.get(name)
    
    def get_metadata(self, name: str) -> Optional[ModelMetadata]:
        """Get model metadata"""
        return self._metadata.get(name)
    
    def list_models(self) -> List[str]:
        """List all registered model names"""
        return list(self._models.keys())
    
    def list_by_category(self, category: str) -> List[str]:
        """List models by category"""
        return [
            name for name, meta in self._metadata.items()
            if meta.category == category
        ]
    
    def list_categories(self) -> List[str]:
        """List all categories"""
        categories = set(meta.category for meta in self._metadata.values())
        return sorted(categories)
    
    def get_all_metadata(self) -> List[ModelMetadata]:
        """Get all model metadata"""
        return list(self._metadata.values())