"""
KINCAID HEALTH™ SIMULATION ENGINE
Monte Carlo Engine
"""

import numpy as np


class MonteCarloEngine:
    
    def run(self, n_simulations, model_function):
        """
        Run Monte Carlo simulation
        
        Args:
            n_simulations: Number of iterations
            model_function: Function to simulate (takes no args, returns float)
            
        Returns:
            Array of results
        """
        results = np.array([
            model_function()
            for _ in range(n_simulations)
        ])
        
        return results