"""
KINCAID HEALTH™ SIMULATION ENGINE
Probability Distribution Factory
"""

from dataclasses import dataclass
from typing import Dict, Any, Optional
import numpy as np


@dataclass
class Distribution:
    """
    Probability distribution descriptor
    """
    name: str
    parameters: Dict[str, float]
    description: Optional[str] = None
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'name': self.name,
            'parameters': self.parameters,
            'description': self.description
        }


class DistributionFactory:
    """
    Factory for generating random samples from various distributions
    """
    
    @staticmethod
    def normal(mean: float, std: float, size: int) -> np.ndarray:
        """
        Generate normal (Gaussian) distribution samples
        
        Args:
            mean: Mean (μ)
            std: Standard deviation (σ)
            size: Number of samples
            
        Returns:
            Array of samples
        """
        return np.random.normal(mean, std, size)
    
    @staticmethod
    def lognormal(mu: float, sigma: float, size: int) -> np.ndarray:
        """
        Generate lognormal distribution samples
        
        Common for healthcare claims (right-skewed)
        
        Args:
            mu: Mean of underlying normal
            sigma: Standard deviation of underlying normal
            size: Number of samples
            
        Returns:
            Array of samples
        """
        return np.random.lognormal(mu, sigma, size)
    
    @staticmethod
    def gamma(shape: float, scale: float, size: int) -> np.ndarray:
        """
        Generate gamma distribution samples
        
        Useful for modeling aggregate losses
        
        Args:
            shape: Shape parameter (k)
            scale: Scale parameter (θ)
            size: Number of samples
            
        Returns:
            Array of samples
        """
        return np.random.gamma(shape, scale, size)
    
    @staticmethod
    def poisson(rate: float, size: int) -> np.ndarray:
        """
        Generate Poisson distribution samples
        
        Useful for claim counts
        
        Args:
            rate: Expected rate (λ)
            size: Number of samples
            
        Returns:
            Array of samples
        """
        return np.random.poisson(rate, size)
    
    @staticmethod
    def exponential(scale: float, size: int) -> np.ndarray:
        """
        Generate exponential distribution samples
        
        Useful for time between events
        
        Args:
            scale: Scale parameter (1/λ)
            size: Number of samples
            
        Returns:
            Array of samples
        """
        return np.random.exponential(scale, size)
    
    @staticmethod
    def uniform(low: float, high: float, size: int) -> np.ndarray:
        """
        Generate uniform distribution samples
        
        Args:
            low: Lower bound
            high: Upper bound
            size: Number of samples
            
        Returns:
            Array of samples
        """
        return np.random.uniform(low, high, size)
    
    @staticmethod
    def triangular(left: float, mode: float, right: float, size: int) -> np.ndarray:
        """
        Generate triangular distribution samples
        
        Useful when min, most likely, and max are known
        
        Args:
            left: Minimum value
            mode: Most likely value (peak)
            right: Maximum value
            size: Number of samples
            
        Returns:
            Array of samples
        """
        return np.random.triangular(left, mode, right, size)
    
    @staticmethod
    def beta(alpha: float, beta_param: float, size: int) -> np.ndarray:
        """
        Generate beta distribution samples
        
        Useful for modeling proportions and percentages
        
        Args:
            alpha: Alpha parameter
            beta_param: Beta parameter
            size: Number of samples
            
        Returns:
            Array of samples
        """
        return np.random.beta(alpha, beta_param, size)
    
    @staticmethod
    def pareto(shape: float, scale: float, size: int) -> np.ndarray:
        """
        Generate Pareto distribution samples
        
        Useful for modeling catastrophic claims
        
        Args:
            shape: Shape parameter (α)
            scale: Scale parameter (xm)
            size: Number of samples
            
        Returns:
            Array of samples
        """
        return (np.random.pareto(shape, size) + 1) * scale
    
    @staticmethod
    def get_distribution_info(name: str) -> Dict[str, str]:
        """
        Get information about a distribution
        
        Args:
            name: Distribution name
            
        Returns:
            Dictionary with distribution info
        """
        info = {
            'normal': {
                'description': 'Bell curve - symmetric around mean',
                'use_case': 'General purpose, measurement errors',
                'parameters': 'mean, std'
            },
            'lognormal': {
                'description': 'Right-skewed - positive values only',
                'use_case': 'Healthcare claims, income, stock prices',
                'parameters': 'mu, sigma'
            },
            'gamma': {
                'description': 'Right-skewed - aggregate losses',
                'use_case': 'Waiting times, aggregate claims',
                'parameters': 'shape, scale'
            },
            'poisson': {
                'description': 'Discrete counts of events',
                'use_case': 'Number of claims in a period',
                'parameters': 'rate'
            },
            'exponential': {
                'description': 'Time between events',
                'use_case': 'Inter-arrival times, claim intervals',
                'parameters': 'scale'
            },
            'pareto': {
                'description': 'Heavy tail - catastrophic events',
                'use_case': 'Large claims, extreme events',
                'parameters': 'shape, scale'
            }
        }
        
        return info.get(name, {'description': 'Unknown distribution'})