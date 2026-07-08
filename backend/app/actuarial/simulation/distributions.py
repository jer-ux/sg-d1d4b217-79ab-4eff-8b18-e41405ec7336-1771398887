"""
KINCAID HEALTH™ SIMULATION ENGINE
Distribution Factory
"""

from dataclasses import dataclass
import numpy as np


@dataclass
class Distribution:
    """
    Probability distribution specification
    """
    name: str
    parameters: dict


class DistributionFactory:
    """
    Generate random samples from common distributions
    """
    
    @staticmethod
    def normal(mean, std, size):
        """Normal distribution"""
        return np.random.normal(mean, std, size)
    
    @staticmethod
    def lognormal(mu, sigma, size):
        """Lognormal distribution (for right-skewed data)"""
        return np.random.lognormal(mu, sigma, size)
    
    @staticmethod
    def gamma(shape, scale, size):
        """Gamma distribution"""
        return np.random.gamma(shape, scale, size)
    
    @staticmethod
    def poisson(rate, size):
        """Poisson distribution (for counts)"""
        return np.random.poisson(rate, size)
    
    @staticmethod
    def exponential(scale, size):
        """Exponential distribution"""
        return np.random.exponential(scale, size)
    
    @staticmethod
    def uniform(low, high, size):
        """Uniform distribution"""
        return np.random.uniform(low, high, size)