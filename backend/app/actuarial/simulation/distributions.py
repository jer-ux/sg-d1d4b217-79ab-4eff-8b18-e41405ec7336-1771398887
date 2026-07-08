"""
KINCAID HEALTH™ SIMULATION ENGINE
Distribution Classes with ABC Pattern
"""

from abc import ABC, abstractmethod
import numpy as np


class Distribution(ABC):
    """Abstract base class for probability distributions"""
    
    @abstractmethod
    def sample(self, size=1):
        """Generate random samples from the distribution"""
        raise NotImplementedError()


class NormalDistribution(Distribution):
    """Normal (Gaussian) distribution"""
    
    def __init__(self, mean, std):
        self.mean = mean
        self.std = std
    
    def sample(self, size=1):
        return np.random.normal(
            self.mean,
            self.std,
            size
        )


class LogNormalDistribution(Distribution):
    """Log-normal distribution for positive-skewed data"""
    
    def __init__(self, mean, sigma):
        self.mean = mean
        self.sigma = sigma
    
    def sample(self, size=1):
        return np.random.lognormal(
            self.mean,
            self.sigma,
            size
        )


class GammaDistribution(Distribution):
    """Gamma distribution for healthcare severity modeling"""
    
    def __init__(self, shape, scale):
        self.shape = shape
        self.scale = scale
    
    def sample(self, size=1):
        return np.random.gamma(
            self.shape,
            self.scale,
            size
        )


class PoissonDistribution(Distribution):
    """Poisson distribution for count data"""
    
    def __init__(self, rate):
        self.rate = rate
    
    def sample(self, size=1):
        return np.random.poisson(
            self.rate,
            size
        )


class WeibullDistribution(Distribution):
    """Weibull distribution for survival analysis"""
    
    def __init__(self, shape):
        self.shape = shape
    
    def sample(self, size=1):
        return np.random.weibull(
            self.shape,
            size
        )


class BetaDistribution(Distribution):
    """Beta distribution for probabilities"""
    
    def __init__(self, alpha, beta):
        self.alpha = alpha
        self.beta = beta
    
    def sample(self, size=1):
        return np.random.beta(
            self.alpha,
            self.beta,
            size
        )


class ExponentialDistribution(Distribution):
    """Exponential distribution for time-to-event"""
    
    def __init__(self, rate):
        self.rate = rate
    
    def sample(self, size=1):
        return np.random.exponential(
            1.0 / self.rate,
            size
        )


class UniformDistribution(Distribution):
    """Uniform distribution"""
    
    def __init__(self, low, high):
        self.low = low
        self.high = high
    
    def sample(self, size=1):
        return np.random.uniform(
            self.low,
            self.high,
            size
        )


class TriangularDistribution(Distribution):
    """Triangular distribution for three-point estimates"""
    
    def __init__(self, low, mode, high):
        self.low = low
        self.mode = mode
        self.high = high
    
    def sample(self, size=1):
        return np.random.triangular(
            self.low,
            self.mode,
            self.high,
            size
        )


class DistributionFactory:
    """Factory for creating distribution instances"""
    
    registry = {
        "normal": NormalDistribution,
        "lognormal": LogNormalDistribution,
        "gamma": GammaDistribution,
        "poisson": PoissonDistribution,
        "weibull": WeibullDistribution,
        "beta": BetaDistribution,
        "exponential": ExponentialDistribution,
        "uniform": UniformDistribution,
        "triangular": TriangularDistribution
    }
    
    @classmethod
    def create(cls, name, **kwargs):
        """Create a distribution instance by name"""
        if name not in cls.registry:
            raise ValueError(f"Unknown distribution: {name}")
        
        return cls.registry[name](**kwargs)
    
    @classmethod
    def list_distributions(cls):
        """List all available distributions"""
        return list(cls.registry.keys())


SUPPORTED_DISTRIBUTIONS = {
    "normal": {
        "description": "Continuous symmetric bell curve",
        "parameters": ["mean", "std"],
        "use_case": "General continuous data"
    },
    "lognormal": {
        "description": "Positive skew, multiplicative effects",
        "parameters": ["mean", "sigma"],
        "use_case": "Healthcare costs, claim severity"
    },
    "gamma": {
        "description": "Healthcare severity modeling",
        "parameters": ["shape", "scale"],
        "use_case": "Large claims, severity distributions"
    },
    "poisson": {
        "description": "Count data, frequency",
        "parameters": ["rate"],
        "use_case": "Claim count, event frequency"
    },
    "weibull": {
        "description": "Survival analysis, time-to-event",
        "parameters": ["shape"],
        "use_case": "Member retention, mortality"
    },
    "beta": {
        "description": "Probability bounded [0,1]",
        "parameters": ["alpha", "beta"],
        "use_case": "Loss ratios, utilization rates"
    },
    "exponential": {
        "description": "Time between events",
        "parameters": ["rate"],
        "use_case": "Inter-claim timing"
    },
    "uniform": {
        "description": "Equal probability across range",
        "parameters": ["low", "high"],
        "use_case": "Unknown distributions"
    },
    "triangular": {
        "description": "Three-point estimate",
        "parameters": ["low", "mode", "high"],
        "use_case": "Expert judgment, quick modeling"
    }
}