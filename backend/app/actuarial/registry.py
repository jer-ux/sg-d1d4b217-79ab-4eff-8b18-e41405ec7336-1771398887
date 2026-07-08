"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Model Registry & Factory
"""

from typing import Dict, Type, Optional
from app.actuarial.models import (
    ActuarialModel,
    TrendProjectionModel,
    StopLossOptimizationModel,
    LossRatioModel,
    PremiumForecastModel,
)


class ModelRegistry:
    """
    Registry of available actuarial models
    """
    
    def __init__(self):
        self._models: Dict[str, Type[ActuarialModel]] = {
            'trend_projection': TrendProjectionModel,
            'stop_loss_optimization': StopLossOptimizationModel,
            'loss_ratio': LossRatioModel,
            'premium_forecast': PremiumForecastModel,
        }
    
    def register_model(self, name: str, model_class: Type[ActuarialModel]):
        """Register a new model"""
        self._models[name] = model_class
    
    def get_model(self, name: str) -> ActuarialModel:
        """Get model instance by name"""
        if name not in self._models:
            raise ValueError(f"Model '{name}' not found in registry")
        
        model_class = self._models[name]
        return model_class()
    
    def list_models(self) -> list[str]:
        """List all registered models"""
        return list(self._models.keys())
    
    def get_model_info(self, name: str) -> Dict[str, str]:
        """Get model metadata"""
        if name not in self._models:
            raise ValueError(f"Model '{name}' not found")
        
        model = self.get_model(name)
        return {
            'name': model.name,
            'version': model.version,
            'type': type(model).__name__
        }