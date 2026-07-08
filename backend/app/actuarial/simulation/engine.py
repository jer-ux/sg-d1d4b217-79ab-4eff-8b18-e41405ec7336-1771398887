"""
KINCAID HEALTH™ SIMULATION ENGINE
Main Simulation Engine with Registry
"""

from dataclasses import dataclass
from typing import Callable, Dict
import numpy as np


@dataclass
class SimulationResult:
    """
    Simulation output
    """
    values: np.ndarray
    summary: Dict[str, float]
    assumptions: Dict[str, float]


class SimulationEngine:
    """
    Registry-based simulation engine
    """
    
    def __init__(self):
        self._models = {}
    
    def register(self, name: str, model: Callable):
        """
        Register a simulation model
        
        Args:
            name: Model identifier
            model: Callable model function
        """
        self._models[name] = model
    
    def run(self, name: str, iterations: int, **kwargs) -> SimulationResult:
        """
        Run registered model
        
        Args:
            name: Model name
            iterations: Number of simulations
            **kwargs: Model parameters
            
        Returns:
            SimulationResult with values and summary
        """
        if name not in self._models:
            raise ValueError(f"Unknown model: {name}")
        
        model = self._models[name]
        
        values = np.array([
            model(**kwargs)
            for _ in range(iterations)
        ])
        
        summary = {
            "mean": float(np.mean(values)),
            "median": float(np.median(values)),
            "minimum": float(np.min(values)),
            "maximum": float(np.max(values)),
            "std_dev": float(np.std(values)),
            "p5": float(np.percentile(values, 5)),
            "p25": float(np.percentile(values, 25)),
            "p75": float(np.percentile(values, 75)),
            "p95": float(np.percentile(values, 95))
        }
        
        return SimulationResult(
            values=values,
            summary=summary,
            assumptions=kwargs
        )