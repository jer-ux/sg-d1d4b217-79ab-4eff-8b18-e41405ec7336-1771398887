"""
KINCAID HEALTH™ SIMULATION ENGINE
Matrix and Data Validators
"""

import numpy as np
from typing import List, Tuple


class MatrixValidator:
    """Validate correlation matrices"""
    
    @staticmethod
    def validate(matrix) -> Tuple[bool, List[str]]:
        """
        Validate correlation matrix
        Returns: (is_valid, list_of_errors)
        """
        errors = []
        matrix = np.array(matrix)
        
        # Check square
        if matrix.shape[0] != matrix.shape[1]:
            errors.append("Correlation matrix must be square")
            return False, errors
        
        # Check symmetric
        if not np.allclose(matrix, matrix.T):
            errors.append("Matrix must be symmetric")
        
        # Check diagonal equals 1
        if not np.allclose(np.diag(matrix), 1.0):
            errors.append("Diagonal must equal 1")
        
        # Check all values in [-1, 1]
        if np.any(matrix < -1) or np.any(matrix > 1):
            errors.append("All correlations must be between -1 and 1")
        
        # Check positive semi-definite
        eigenvalues = np.linalg.eigvals(matrix)
        if np.any(eigenvalues < -1e-10):
            errors.append("Matrix must be positive semi-definite")
        
        return len(errors) == 0, errors
    
    @staticmethod
    def check_positive_definite(matrix) -> bool:
        """Check if matrix is positive definite"""
        try:
            np.linalg.cholesky(matrix)
            return True
        except np.linalg.LinAlgError:
            return False


class DataValidator:
    """Validate simulation inputs"""
    
    @staticmethod
    def validate_parameters(params: dict) -> Tuple[bool, List[str]]:
        """Validate simulation parameters"""
        errors = []
        
        # Check required fields
        if 'base_cost' in params and params['base_cost'] <= 0:
            errors.append("Base cost must be positive")
        
        # Check trend parameters
        if 'trend_mean' in params:
            if params['trend_mean'] < -0.5 or params['trend_mean'] > 0.5:
                errors.append("Trend mean should be between -50% and +50%")
        
        if 'trend_sd' in params:
            if params['trend_sd'] < 0:
                errors.append("Trend standard deviation must be non-negative")
            if params['trend_sd'] > 0.1:
                errors.append("Warning: High trend volatility (>10%)")
        
        # Check multipliers
        for key in ['util_mean', 'severity_mean']:
            if key in params:
                if params[key] < 0.5 or params[key] > 2.0:
                    errors.append(f"{key} should be between 0.5 and 2.0")
        
        return len(errors) == 0, errors