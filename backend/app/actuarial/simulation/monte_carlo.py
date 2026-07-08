"""
KINCAID HEALTH™ SIMULATION ENGINE
Monte Carlo Simulator
"""

from typing import Dict, Any, List, Callable, Optional
import numpy as np
from datetime import datetime

from .distributions import DistributionFactory
from .random_variables import RandomVariable


class MonteCarloSimulator:
    """
    Monte Carlo simulation engine for actuarial models
    """
    
    def __init__(self, n_simulations: int = 10000, random_seed: Optional[int] = None):
        """
        Initialize simulator
        
        Args:
            n_simulations: Number of simulations to run
            random_seed: Random seed for reproducibility
        """
        self.n_simulations = n_simulations
        self.random_seed = random_seed
        
        if random_seed is not None:
            np.random.seed(random_seed)
        
        self.factory = DistributionFactory()
        self.results: Optional[np.ndarray] = None
        self.execution_time_ms: Optional[float] = None
    
    def run(
        self,
        model_function: Callable,
        random_variables: List[RandomVariable],
        **kwargs
    ) -> np.ndarray:
        """
        Run Monte Carlo simulation
        
        Args:
            model_function: Function that takes random inputs and returns result
            random_variables: List of RandomVariable instances
            **kwargs: Additional fixed parameters
            
        Returns:
            Array of simulation results
        """
        start_time = datetime.now()
        
        results = []
        
        for _ in range(self.n_simulations):
            # Generate random values for each variable
            inputs = {}
            for rv in random_variables:
                inputs[rv.name] = rv.generate(1, self.factory)[0]
            
            # Run model
            result = model_function(**inputs, **kwargs)
            results.append(result)
        
        self.results = np.array(results)
        
        end_time = datetime.now()
        self.execution_time_ms = (end_time - start_time).total_seconds() * 1000
        
        return self.results
    
    def run_parallel_inputs(
        self,
        model_function: Callable,
        input_samples: Dict[str, np.ndarray]
    ) -> np.ndarray:
        """
        Run simulation with pre-generated input samples
        
        Args:
            model_function: Vectorized function
            input_samples: Dictionary of input arrays
            
        Returns:
            Array of results
        """
        start_time = datetime.now()
        
        self.results = model_function(**input_samples)
        
        end_time = datetime.now()
        self.execution_time_ms = (end_time - start_time).total_seconds() * 1000
        
        return self.results
    
    def get_statistics(self) -> Dict[str, Any]:
        """
        Calculate statistics from simulation results
        
        Returns:
            Dictionary of statistical measures
        """
        if self.results is None:
            raise ValueError("No simulation results available. Run simulation first.")
        
        return {
            'mean': float(np.mean(self.results)),
            'median': float(np.median(self.results)),
            'std': float(np.std(self.results)),
            'min': float(np.min(self.results)),
            'max': float(np.max(self.results)),
            'cv': float(np.std(self.results) / np.mean(self.results)),
            'skewness': float(self._skewness()),
            'kurtosis': float(self._kurtosis())
        }
    
    def get_percentiles(self, percentiles: List[float] = [10, 25, 50, 75, 90, 95, 99]) -> Dict[str, float]:
        """
        Calculate percentiles from results
        
        Args:
            percentiles: List of percentile values
            
        Returns:
            Dictionary mapping percentile to value
        """
        if self.results is None:
            raise ValueError("No simulation results available")
        
        return {
            f'p{int(p)}': float(np.percentile(self.results, p))
            for p in percentiles
        }
    
    def get_summary(self) -> Dict[str, Any]:
        """
        Get complete summary of simulation results
        
        Returns:
            Dictionary with statistics and percentiles
        """
        return {
            'n_simulations': self.n_simulations,
            'execution_time_ms': self.execution_time_ms,
            'statistics': self.get_statistics(),
            'percentiles': self.get_percentiles(),
            'random_seed': self.random_seed
        }
    
    def _skewness(self) -> float:
        """Calculate skewness"""
        if self.results is None:
            return 0.0
        mean = np.mean(self.results)
        std = np.std(self.results)
        return np.mean(((self.results - mean) / std) ** 3)
    
    def _kurtosis(self) -> float:
        """Calculate excess kurtosis"""
        if self.results is None:
            return 0.0
        mean = np.mean(self.results)
        std = np.std(self.results)
        return np.mean(((self.results - mean) / std) ** 4) - 3