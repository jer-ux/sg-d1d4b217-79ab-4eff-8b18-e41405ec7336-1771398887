"""
KINCAID HEALTH™ HEALTHCARE INTELLIGENCE SDK
Bayesian Updating Engine
"""

import numpy as np
from typing import Dict, Tuple


class BayesianUpdatingEngine:
    """
    Bayesian methods for adaptive healthcare analytics
    """
    
    def update_trend_estimate(
        self,
        prior_mean: float,
        prior_std: float,
        observed_trend: float,
        observation_std: float
    ) -> Dict[str, float]:
        """
        Bayesian update of trend estimate given new observation
        
        Uses conjugate normal-normal model:
        Prior: N(prior_mean, prior_std²)
        Likelihood: N(observed_trend, observation_std²)
        Posterior: N(posterior_mean, posterior_std²)
        """
        # Calculate posterior parameters
        prior_precision = 1 / (prior_std ** 2)
        obs_precision = 1 / (observation_std ** 2)
        
        posterior_precision = prior_precision + obs_precision
        posterior_std = np.sqrt(1 / posterior_precision)
        
        posterior_mean = (prior_precision * prior_mean + obs_precision * observed_trend) / posterior_precision
        
        # Weight given to new observation
        observation_weight = obs_precision / posterior_precision
        
        return {
            "prior_mean": prior_mean,
            "prior_std": prior_std,
            "observed_trend": observed_trend,
            "observation_std": observation_std,
            "posterior_mean": posterior_mean,
            "posterior_std": posterior_std,
            "observation_weight": observation_weight,
            "update_magnitude": abs(posterior_mean - prior_mean)
        }
    
    def adaptive_pmpm_forecast(
        self,
        historical_pmpm: List[float],
        forecast_months: int = 12
    ) -> Dict[str, any]:
        """
        Adaptive PMPM forecasting using exponential smoothing with Bayesian updates
        """
        if len(historical_pmpm) < 3:
            raise ValueError("Need at least 3 historical periods")
        
        # Calculate historical trend
        trends = [(historical_pmpm[i] - historical_pmpm[i-1]) / historical_pmpm[i-1] 
                  for i in range(1, len(historical_pmpm))]
        mean_trend = np.mean(trends)
        std_trend = np.std(trends)
        
        # Forecast with uncertainty that grows over time
        forecasts = []
        last_value = historical_pmpm[-1]
        
        for month in range(1, forecast_months + 1):
            # Trend dampening over time
            effective_trend = mean_trend * (0.95 ** (month - 1))
            
            forecast = last_value * (1 + effective_trend)
            
            # Uncertainty grows with forecast horizon
            forecast_std = std_trend * np.sqrt(month)
            
            forecasts.append({
                "month": month,
                "forecast_pmpm": forecast,
                "lower_bound": forecast - 1.96 * forecast_std,
                "upper_bound": forecast + 1.96 * forecast_std,
                "uncertainty": forecast_std
            })
            
            last_value = forecast
        
        return {
            "historical_periods": len(historical_pmpm),
            "mean_historical_trend": mean_trend,
            "forecasts": forecasts
        }
    
    def claims_credibility_bayesian(
        self,
        expected_claims: float,
        expected_std: float,
        actual_claims: float,
        credibility: float
    ) -> Dict[str, float]:
        """
        Bayesian credibility-weighted claims estimate
        
        Combines prior expectation with actual experience using credibility weight
        """
        # Credibility-weighted estimate
        bayesian_estimate = credibility * actual_claims + (1 - credibility) * expected_claims
        
        # Posterior standard deviation
        posterior_std = expected_std * np.sqrt(1 - credibility)
        
        # Update magnitude
        update = bayesian_estimate - expected_claims
        update_pct = update / expected_claims if expected_claims > 0 else 0
        
        return {
            "expected_claims": expected_claims,
            "actual_claims": actual_claims,
            "credibility": credibility,
            "bayesian_estimate": bayesian_estimate,
            "posterior_std": posterior_std,
            "update": update,
            "update_pct": update_pct
        }
    
    def sequential_trend_learning(
        self,
        initial_belief: float,
        observations: List[float],
        observation_noise: float = 0.02
    ) -> List[Dict[str, float]]:
        """
        Sequential Bayesian learning from stream of trend observations
        """
        results = []
        current_mean = initial_belief
        current_std = 0.03  # Initial uncertainty
        
        for i, obs in enumerate(observations):
            # Update belief
            updated = self.update_trend_estimate(
                prior_mean=current_mean,
                prior_std=current_std,
                observed_trend=obs,
                observation_std=observation_noise
            )
            
            results.append({
                "observation_number": i + 1,
                "observed_value": obs,
                "prior_belief": current_mean,
                "posterior_belief": updated["posterior_mean"],
                "posterior_uncertainty": updated["posterior_std"],
                "learning_rate": updated["observation_weight"]
            })
            
            # Update for next iteration
            current_mean = updated["posterior_mean"]
            current_std = updated["posterior_std"]
        
        return results