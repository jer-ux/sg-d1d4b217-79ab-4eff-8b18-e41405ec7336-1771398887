"""
KINCAID HEALTH™ SIMULATION ENGINE
Scenario Generation
"""

from typing import Dict, Any, List
import numpy as np


class ScenarioGenerator:
    """
    Generate deterministic scenario analyses
    """
    
    @staticmethod
    def stress_test(
        base_value: float,
        stress_factors: Dict[str, float]
    ) -> Dict[str, float]:
        """
        Apply stress factors to base value
        
        Args:
            base_value: Baseline value
            stress_factors: Dictionary of scenario names to multipliers
            
        Returns:
            Dictionary of scenario results
        """
        results = {'base': base_value}
        
        for scenario_name, factor in stress_factors.items():
            results[scenario_name] = base_value * factor
        
        return results
    
    @staticmethod
    def three_point_scenario(
        optimistic: float,
        most_likely: float,
        pessimistic: float,
        weights: tuple = (0.25, 0.50, 0.25)
    ) -> Dict[str, Any]:
        """
        Three-point estimate with weighted average
        
        Args:
            optimistic: Best case
            most_likely: Expected case
            pessimistic: Worst case
            weights: Tuple of weights (opt, likely, pess)
            
        Returns:
            Scenario analysis results
        """
        weighted_avg = (
            optimistic * weights[0] +
            most_likely * weights[1] +
            pessimistic * weights[2]
        )
        
        return {
            'optimistic': optimistic,
            'most_likely': most_likely,
            'pessimistic': pessimistic,
            'weighted_average': weighted_avg,
            'range': pessimistic - optimistic,
            'weights': weights
        }
    
    @staticmethod
    def sensitivity_analysis(
        base_function: callable,
        param_name: str,
        param_range: np.ndarray,
        **fixed_params
    ) -> List[Dict[str, Any]]:
        """
        One-way sensitivity analysis
        
        Args:
            base_function: Function to analyze
            param_name: Parameter to vary
            param_range: Array of parameter values to test
            **fixed_params: Other parameters held constant
            
        Returns:
            List of sensitivity results
        """
        results = []
        
        for param_value in param_range:
            params = fixed_params.copy()
            params[param_name] = param_value
            
            output = base_function(**params)
            
            results.append({
                param_name: float(param_value),
                'output': float(output)
            })
        
        return results
    
    @staticmethod
    def tornado_chart_data(
        base_function: callable,
        parameters: Dict[str, tuple],
        **base_params
    ) -> List[Dict[str, Any]]:
        """
        Generate data for tornado chart (multi-parameter sensitivity)
        
        Args:
            base_function: Model function
            parameters: Dict of param names to (low, high) tuples
            **base_params: Base parameter values
            
        Returns:
            List of sensitivity ranges for each parameter
        """
        base_output = base_function(**base_params)
        
        results = []
        
        for param_name, (low_val, high_val) in parameters.items():
            # Low scenario
            low_params = base_params.copy()
            low_params[param_name] = low_val
            low_output = base_function(**low_params)
            
            # High scenario
            high_params = base_params.copy()
            high_params[param_name] = high_val
            high_output = base_function(**high_params)
            
            results.append({
                'parameter': param_name,
                'base_value': base_params[param_name],
                'low_value': low_val,
                'high_value': high_val,
                'base_output': base_output,
                'low_output': low_output,
                'high_output': high_output,
                'range': abs(high_output - low_output),
                'sensitivity': abs((high_output - low_output) / base_output)
            })
        
        # Sort by sensitivity (most impactful first)
        results.sort(key=lambda x: x['sensitivity'], reverse=True)
        
        return results