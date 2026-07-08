"""
KINCAID HEALTH™ SIMULATION ENGINE
Pre-built Healthcare Models
"""

import numpy as np


class HealthcareTrendModel:
    """
    Healthcare cost projection with trend uncertainty
    """
    
    def simulate(
        self,
        base_cost,
        trend_mean,
        trend_sd,
        util_mean,
        util_sd,
        severity_mean,
        severity_sd
    ):
        """
        Simulate healthcare cost with three factors
        
        Args:
            base_cost: Current cost
            trend_mean: Expected trend
            trend_sd: Trend volatility
            util_mean: Utilization factor mean
            util_sd: Utilization volatility
            severity_mean: Severity factor mean
            severity_sd: Severity volatility
            
        Returns:
            Projected cost
        """
        trend = np.random.normal(trend_mean, trend_sd)
        utilization = np.random.normal(util_mean, util_sd)
        severity = np.random.normal(severity_mean, severity_sd)
        
        return (
            base_cost *
            (1 + trend) *
            utilization *
            severity
        )


class PremiumRenewalModel:
    """
    Premium renewal forecast
    """
    
    def simulate(
        self,
        current_pmpm,
        member_count,
        trend_rate,
        trend_volatility
    ):
        """
        Simulate annual premium
        
        Args:
            current_pmpm: Current per member per month
            member_count: Number of members
            trend_rate: Expected trend
            trend_volatility: Trend uncertainty
            
        Returns:
            Annual premium
        """
        trend = np.random.normal(trend_rate, trend_volatility)
        projected_pmpm = current_pmpm * (1 + trend)
        
        return projected_pmpm * member_count * 12


class AggregateLossModel:
    """
    Frequency-severity aggregate loss
    """
    
    def simulate(
        self,
        claim_frequency,
        average_severity,
        severity_cv
    ):
        """
        Simulate aggregate losses
        
        Args:
            claim_frequency: Expected claim count
            average_severity: Average claim size
            severity_cv: Coefficient of variation
            
        Returns:
            Total claims amount
        """
        # Number of claims (Poisson)
        n_claims = np.random.poisson(claim_frequency)
        
        if n_claims == 0:
            return 0.0
        
        # Severity (Lognormal)
        sigma = np.sqrt(np.log(1 + severity_cv**2))
        mu = np.log(average_severity) - 0.5 * sigma**2
        
        claims = np.random.lognormal(mu, sigma, n_claims)
        
        return float(np.sum(claims))


class LargeClaimShockModel:
    """
    Catastrophic claim shock
    """
    
    def simulate(
        self,
        base_claims,
        shock_threshold,
        shock_probability,
        shock_multiplier=2.0
    ):
        """
        Simulate shock scenario
        
        Args:
            base_claims: Normal claims
            shock_threshold: Shock trigger level
            shock_probability: Probability of shock
            shock_multiplier: Size of shock
            
        Returns:
            Total claims with potential shock
        """
        if np.random.random() < shock_probability:
            shock = shock_threshold * shock_multiplier
            return base_claims + shock
        
        return base_claims