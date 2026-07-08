"""
KINCAID HEALTH™ SIMULATION ENGINE
Correlation Engine for Multivariate Simulations
"""

from dataclasses import dataclass
from typing import List, Dict
import numpy as np


@dataclass
class CorrelatedVariable:
    """
    Variable with mean and standard deviation
    """
    name: str
    mean: float
    std: float


class CorrelationEngine:
    """
    Generate correlated random variables using multivariate normal distribution
    """
    
    def __init__(self):
        self.variables: List[CorrelatedVariable] = []
        self.correlation_matrix = None
    
    def add_variable(self, variable: CorrelatedVariable):
        """Add a variable to the correlation structure"""
        self.variables.append(variable)
    
    def set_correlation_matrix(self, matrix):
        """
        Set correlation matrix (must be square and symmetric)
        
        Example:
            [[1.0, 0.65, 0.42],
             [0.65, 1.0, 0.31],
             [0.42, 0.31, 1.0]]
        """
        self.correlation_matrix = np.array(matrix)
    
    def generate(self, samples=10000):
        """
        Generate correlated samples using multivariate normal distribution
        
        Returns:
            numpy array of shape (samples, n_variables)
        """
        if self.correlation_matrix is None:
            raise ValueError("Correlation matrix not set")
        
        if len(self.variables) != len(self.correlation_matrix):
            raise ValueError("Number of variables must match correlation matrix size")
        
        # Extract means and standard deviations
        means = [v.mean for v in self.variables]
        stds = [v.std for v in self.variables]
        
        # Convert correlation matrix to covariance matrix
        # Cov = diag(std) * Corr * diag(std)
        covariance = np.outer(stds, stds) * self.correlation_matrix
        
        # Generate correlated samples
        results = np.random.multivariate_normal(means, covariance, samples)
        
        return results
    
    def generate_dict(self, samples=10000) -> Dict[str, np.ndarray]:
        """
        Generate correlated samples and return as dictionary
        
        Returns:
            Dictionary mapping variable names to arrays of samples
        """
        results = self.generate(samples)
        
        return {
            self.variables[i].name: results[:, i]
            for i in range(len(self.variables))
        }
    
    def get_variable_names(self) -> List[str]:
        """Get list of variable names"""
        return [v.name for v in self.variables]
    
    def summary(self) -> Dict[str, Dict[str, float]]:
        """Get summary of correlation structure"""
        return {
            'n_variables': len(self.variables),
            'variables': {
                v.name: {'mean': v.mean, 'std': v.std}
                for v in self.variables
            },
            'correlation_matrix': self.correlation_matrix.tolist() if self.correlation_matrix is not None else None
        }