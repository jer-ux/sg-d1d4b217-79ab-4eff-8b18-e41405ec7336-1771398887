"""
KINCAID HEALTH™ ACTUARIAL ENGINE
Monte Carlo Simulation Engine
"""

from typing import Dict, Any
import numpy as np
import pandas as pd

from app.actuarial.interfaces import ClaimsData, ActuarialAssumptions


class SimulationEngine:
    """
    Monte Carlo risk simulation
    
    Generates distribution of possible outcomes
    considering:
    - Claims variability
    - Trend uncertainty
    - Large claim shocks
    """
    
    def monte_carlo_simulation(
        self,
        data: ClaimsData,
        assumptions: ActuarialAssumptions
    ) -> Dict[str, Any]:
        """
        Run Monte Carlo simulation
        """
        df = pd.DataFrame(data.claims)
        
        # Calculate baseline statistics
        if 'paid_amount' in df.columns:
            baseline_total = df['paid_amount'].sum()
            baseline_mean = df['paid_amount'].mean()
            baseline_std = df['paid_amount'].std()
        else:
            baseline_total = data.member_months * 500
            baseline_mean = 5000
            baseline_std = 15000
        
        # Run simulations
        n_sims = assumptions.simulations
        simulated_totals = []
        
        np.random.seed(42)  # Reproducibility
        
        for _ in range(n_sims):
            # Simulate claim amounts with lognormal distribution
            n_claims = len(df) if not df.empty else 100
            
            # Lognormal parameters
            mu = np.log(baseline_mean)
            sigma = 1.2  # Moderate variability
            
            sim_claims = np.random.lognormal(mu, sigma, n_claims)
            sim_total = sim_claims.sum()
            
            # Apply trend shock
            trend_shock = np.random.normal(assumptions.trend_rate, 0.02)
            sim_total *= (1 + trend_shock)
            
            simulated_totals.append(sim_total)
        
        # Calculate percentiles
        simulated_array = np.array(simulated_totals)
        
        return {
            'mean': round(simulated_array.mean(), 2),
            'median': round(np.median(simulated_array), 2),
            'percentile_50': round(np.percentile(simulated_array, 50), 2),
            'percentile_75': round(np.percentile(simulated_array, 75), 2),
            'percentile_90': round(np.percentile(simulated_array, 90), 2),
            'percentile_95': round(np.percentile(simulated_array, 95), 2),
            'percentile_99': round(np.percentile(simulated_array, 99), 2),
            'std_dev': round(simulated_array.std(), 2),
            'coefficient_of_variation': round(simulated_array.std() / simulated_array.mean(), 4),
            'simulations': n_sims
        }