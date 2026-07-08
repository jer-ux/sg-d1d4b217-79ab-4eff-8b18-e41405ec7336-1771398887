"""
KINCAID HEALTH™ SIMULATION ENGINE
Random Variable Definitions
"""

from dataclasses import dataclass
from typing import Dict, Any, Optional
import numpy as np


@dataclass
class RandomVariable:
    """
    Random variable with probability distribution
    """
    name: str
    distribution: str
    parameters: Dict[str, float]
    description: Optional[str] = None
    
    def generate(self, size: int, factory) -> np.ndarray:
        """
        Generate random samples
        
        Args:
            size: Number of samples
            factory: DistributionFactory instance
            
        Returns:
            Array of samples
        """
        if self.distribution == 'normal':
            return factory.normal(
                self.parameters['mean'],
                self.parameters['std'],
                size
            )
        elif self.distribution == 'lognormal':
            return factory.lognormal(
                self.parameters['mu'],
                self.parameters['sigma'],
                size
            )
        elif self.distribution == 'gamma':
            return factory.gamma(
                self.parameters['shape'],
                self.parameters['scale'],
                size
            )
        elif self.distribution == 'poisson':
            return factory.poisson(
                self.parameters['rate'],
                size
            )
        elif self.distribution == 'exponential':
            return factory.exponential(
                self.parameters['scale'],
                size
            )
        elif self.distribution == 'uniform':
            return factory.uniform(
                self.parameters['low'],
                self.parameters['high'],
                size
            )
        elif self.distribution == 'triangular':
            return factory.triangular(
                self.parameters['left'],
                self.parameters['mode'],
                self.parameters['right'],
                size
            )
        elif self.distribution == 'pareto':
            return factory.pareto(
                self.parameters['shape'],
                self.parameters['scale'],
                size
            )
        else:
            raise ValueError(f"Unknown distribution: {self.distribution}")
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            'name': self.name,
            'distribution': self.distribution,
            'parameters': self.parameters,
            'description': self.description
        }


class RandomVariableBuilder:
    """
    Builder for common healthcare random variables
    """
    
    @staticmethod
    def claim_severity(mean: float, cv: float = 0.50) -> RandomVariable:
        """
        Lognormal random variable for claim amounts
        
        Args:
            mean: Expected claim size
            cv: Coefficient of variation (std/mean)
            
        Returns:
            RandomVariable instance
        """
        sigma = np.sqrt(np.log(1 + cv**2))
        mu = np.log(mean) - 0.5 * sigma**2
        
        return RandomVariable(
            name='claim_severity',
            distribution='lognormal',
            parameters={'mu': mu, 'sigma': sigma},
            description=f'Claim size - mean ${mean:,.0f}, CV {cv:.1%}'
        )
    
    @staticmethod
    def claim_frequency(annual_rate: float) -> RandomVariable:
        """
        Poisson random variable for claim counts
        
        Args:
            annual_rate: Expected claims per year
            
        Returns:
            RandomVariable instance
        """
        return RandomVariable(
            name='claim_frequency',
            distribution='poisson',
            parameters={'rate': annual_rate},
            description=f'Claims per year - rate {annual_rate:.2f}'
        )
    
    @staticmethod
    def medical_trend(base_trend: float, volatility: float = 0.02) -> RandomVariable:
        """
        Normal random variable for trend uncertainty
        
        Args:
            base_trend: Expected trend rate
            volatility: Standard deviation of trend
            
        Returns:
            RandomVariable instance
        """
        return RandomVariable(
            name='medical_trend',
            distribution='normal',
            parameters={'mean': base_trend, 'std': volatility},
            description=f'Trend uncertainty - {base_trend:.1%} ± {volatility:.1%}'
        )
    
    @staticmethod
    def large_claim(threshold: float, shape: float = 2.5) -> RandomVariable:
        """
        Pareto random variable for catastrophic claims
        
        Args:
            threshold: Minimum claim size (shock threshold)
            shape: Pareto shape parameter (tail heaviness)
            
        Returns:
            RandomVariable instance
        """
        return RandomVariable(
            name='large_claim',
            distribution='pareto',
            parameters={'shape': shape, 'scale': threshold},
            description=f'Large claims above ${threshold:,.0f}'
        )