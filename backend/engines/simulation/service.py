"""
Simulation Engine - Core Service Implementation
"""

import numpy as np
from scipy import stats
from scipy.linalg import cholesky
from typing import List, Dict, Optional
import uuid

from .models import (
    MonteCarloRequest,
    MonteCarloResponse,
    SimulationResults,
    VaRRequest,
    VaRResponse,
    ScenarioRequest,
    ScenarioResponse,
    ScenarioResult,
)


class SimulationEngine:
    """
    Universal Simulation Engine - Monte Carlo, VaR, scenario analysis, tail risk.
    
    Provides domain-agnostic risk modeling and uncertainty quantification.
    """

    def __init__(self):
        self.engine_id = "simulation-engine-v1"
        self.version = "1.0.0"

    def run_monte_carlo(self, request: MonteCarloRequest) -> MonteCarloResponse:
        """
        Run Monte Carlo simulation with optional correlation structure.
        """
        if request.seed:
            np.random.seed(request.seed)
        
        n = request.n_simulations
        n_vars = len(request.variables)
        
        # Generate uncorrelated samples
        samples = np.zeros((n, n_vars))
        
        for i, var in enumerate(request.variables):
            dist_type = var.distribution
            params = var.parameters
            
            if dist_type == "normal":
                samples[:, i] = np.random.normal(
                    params.get("mean", 0),
                    params.get("std", 1),
                    n
                )
            elif dist_type == "lognormal":
                samples[:, i] = np.random.lognormal(
                    params.get("mean_log", 0),
                    params.get("std_log", 1),
                    n
                )
            elif dist_type == "uniform":
                samples[:, i] = np.random.uniform(
                    params.get("min", 0),
                    params.get("max", 1),
                    n
                )
            elif dist_type == "triangular":
                samples[:, i] = np.random.triangular(
                    params.get("min", 0),
                    params.get("mode", 0.5),
                    params.get("max", 1),
                    n
                )
            elif dist_type == "gamma":
                samples[:, i] = np.random.gamma(
                    params.get("shape", 2),
                    params.get("scale", 1),
                    n
                )
        
        # Apply correlation structure if provided
        if request.correlations:
            corr_matrix = np.array(request.correlations.correlation_matrix)
            # Validate correlation matrix
            if corr_matrix.shape[0] != n_vars or corr_matrix.shape[1] != n_vars:
                raise ValueError(f"Correlation matrix must be {n_vars}x{n_vars}")
            
            # Apply Cholesky decomposition for correlated samples
            try:
                # Convert to correlation space
                ranks = np.argsort(np.argsort(samples, axis=0), axis=0)
                uniform_samples = (ranks + 1) / (n + 1)
                normal_samples = stats.norm.ppf(uniform_samples)
                
                # Apply correlation
                L = cholesky(corr_matrix, lower=True)
                correlated_normal = normal_samples @ L.T
                
                # Transform back to original distributions
                for i, var in enumerate(request.variables):
                    uniform_corr = stats.norm.cdf(correlated_normal[:, i])
                    
                    dist_type = var.distribution
                    params = var.parameters
                    
                    if dist_type == "normal":
                        samples[:, i] = stats.norm.ppf(uniform_corr, 
                                                       params.get("mean", 0),
                                                       params.get("std", 1))
                    elif dist_type == "lognormal":
                        samples[:, i] = stats.lognorm.ppf(uniform_corr,
                                                          params.get("std_log", 1),
                                                          scale=np.exp(params.get("mean_log", 0)))
                    elif dist_type == "uniform":
                        samples[:, i] = stats.uniform.ppf(uniform_corr,
                                                          params.get("min", 0),
                                                          params.get("max", 1) - params.get("min", 0))
                    elif dist_type == "gamma":
                        samples[:, i] = stats.gamma.ppf(uniform_corr,
                                                        params.get("shape", 2),
                                                        scale=params.get("scale", 1))
            except np.linalg.LinAlgError:
                # Fall back to uncorrelated if matrix is not positive definite
                pass
        
        # Calculate output using formula if provided
        if request.formula:
            # Create namespace for formula evaluation
            namespace = {var.name: samples[:, i] for i, var in enumerate(request.variables)}
            namespace.update({'np': np, 'sqrt': np.sqrt, 'exp': np.exp, 'log': np.log})
            
            try:
                output = eval(request.formula, {"__builtins__": {}}, namespace)
            except Exception as e:
                raise ValueError(f"Formula evaluation failed: {str(e)}")
        else:
            # Default: sum of all variables
            output = np.sum(samples, axis=1)
        
        # Calculate summary statistics
        results = SimulationResults(
            mean=float(np.mean(output)),
            median=float(np.median(output)),
            std=float(np.std(output)),
            percentile_5=float(np.percentile(output, 5)),
            percentile_25=float(np.percentile(output, 25)),
            percentile_75=float(np.percentile(output, 75)),
            percentile_95=float(np.percentile(output, 95)),
            min=float(np.min(output)),
            max=float(np.max(output)),
            skewness=float(stats.skew(output)),
            kurtosis=float(stats.kurtosis(output)),
        )
        
        # Generate insights
        insights = []
        
        downside_prob = np.mean(output < results.mean)
        if downside_prob > 0.6:
            insights.append(f"High downside risk: {downside_prob*100:.1f}% of scenarios below mean")
        
        if results.skewness < -0.5:
            insights.append(f"Left-skewed distribution: more frequent large losses than gains")
        elif results.skewness > 0.5:
            insights.append(f"Right-skewed distribution: potential for extreme upside")
        
        if results.kurtosis > 3:
            insights.append(f"Fat tails detected: higher probability of extreme outcomes")
        
        range_ratio = (results.percentile_95 - results.percentile_5) / results.mean if results.mean != 0 else 0
        if range_ratio > 2:
            insights.append(f"High uncertainty: 90% confidence interval spans {range_ratio:.1f}x the mean")
        
        evidence_id = f"mc_{uuid.uuid4().hex[:12]}"
        
        return MonteCarloResponse(
            results=results,
            samples=output.tolist() if len(output) <= 10000 else None,  # Limit response size
            evidence_id=evidence_id,
            n_simulations=n,
            insights=insights,
        )

    def calculate_var(self, request: VaRRequest) -> VaRResponse:
        """
        Calculate Value at Risk (VaR) and Conditional Value at Risk (CVaR).
        """
        data = np.array(request.returns_or_losses)
        alpha = 1 - request.confidence_level
        
        if request.method == "historical":
            # Historical VaR: empirical quantile
            var = np.percentile(data, alpha * 100)
            
            # CVaR: mean of losses beyond VaR
            tail_losses = data[data <= var]
            cvar = np.mean(tail_losses) if len(tail_losses) > 0 else var
            
            method_desc = "Historical Simulation"
        
        elif request.method == "parametric":
            # Parametric VaR: assume normal distribution
            mu = np.mean(data)
            sigma = np.std(data)
            
            var = mu + stats.norm.ppf(alpha) * sigma
            
            # CVaR for normal distribution
            cvar = mu - sigma * stats.norm.pdf(stats.norm.ppf(alpha)) / alpha
            
            method_desc = "Parametric (Normal Distribution)"
        
        else:  # monte_carlo
            # Monte Carlo VaR: bootstrap resampling
            n_simulations = 10000
            boot_samples = np.random.choice(data, size=(n_simulations, len(data)), replace=True)
            boot_means = np.mean(boot_samples, axis=1)
            
            var = np.percentile(boot_means, alpha * 100)
            
            tail_losses = boot_means[boot_means <= var]
            cvar = np.mean(tail_losses) if len(tail_losses) > 0 else var
            
            method_desc = "Monte Carlo Bootstrap"
        
        # Scale by holding period (square root of time rule)
        if request.holding_period > 1:
            scale_factor = np.sqrt(request.holding_period)
            var *= scale_factor
            cvar *= scale_factor
        
        # Calculate absolute VaR if portfolio value provided
        var_abs = None
        cvar_abs = None
        if request.portfolio_value:
            var_abs = abs(var * request.portfolio_value)
            cvar_abs = abs(cvar * request.portfolio_value)
        
        # Interpretation
        if request.portfolio_value:
            interpretation = (
                f"At {request.confidence_level*100:.1f}% confidence, maximum loss over "
                f"{request.holding_period} day(s) is ${var_abs:,.0f} (VaR). "
                f"If losses exceed VaR, expected loss is ${cvar_abs:,.0f} (CVaR)."
            )
        else:
            interpretation = (
                f"At {request.confidence_level*100:.1f}% confidence, maximum loss is "
                f"{var*100:.2f}% (VaR). Expected loss in tail: {cvar*100:.2f}% (CVaR)."
            )
        
        evidence_id = f"var_{uuid.uuid4().hex[:12]}"
        
        return VaRResponse(
            var=float(var),
            cvar=float(cvar),
            confidence_level=request.confidence_level,
            method=method_desc,
            portfolio_value=request.portfolio_value,
            var_absolute=float(var_abs) if var_abs else None,
            cvar_absolute=float(cvar_abs) if cvar_abs else None,
            evidence_id=evidence_id,
            interpretation=interpretation,
        )

    def run_scenario_analysis(self, request: ScenarioRequest) -> ScenarioResponse:
        """
        Run scenario analysis and stress testing.
        """
        # Calculate baseline output
        namespace = request.base_values.copy()
        namespace.update({'np': np, 'sqrt': np.sqrt, 'exp': np.exp, 'log': np.log})
        
        try:
            base_output = eval(request.formula, {"__builtins__": {}}, namespace)
        except Exception as e:
            raise ValueError(f"Formula evaluation failed: {str(e)}")
        
        # Run each scenario
        scenario_results = []
        
        for scenario in request.scenarios:
            # Apply shocks to base values
            shocked_values = request.base_values.copy()
            for var_name, shock_pct in scenario.variable_shocks.items():
                if var_name in shocked_values:
                    shocked_values[var_name] *= (1 + shock_pct / 100)
            
            # Calculate scenario output
            scenario_namespace = shocked_values.copy()
            scenario_namespace.update({'np': np, 'sqrt': np.sqrt, 'exp': np.exp, 'log': np.log})
            
            scenario_output = eval(request.formula, {"__builtins__": {}}, scenario_namespace)
            
            change_abs = scenario_output - base_output
            change_pct = (change_abs / base_output * 100) if base_output != 0 else 0
            
            scenario_results.append(ScenarioResult(
                scenario_name=scenario.name,
                output_value=float(scenario_output),
                change_from_base=float(change_abs),
                change_percentage=float(change_pct),
                shocked_values=shocked_values,
            ))
        
        # Identify worst and best cases
        worst_case = min(scenario_results, key=lambda x: x.output_value)
        best_case = max(scenario_results, key=lambda x: x.output_value)
        
        evidence_id = f"scenario_{uuid.uuid4().hex[:12]}"
        
        return ScenarioResponse(
            base_output=float(base_output),
            scenario_results=scenario_results,
            worst_case=worst_case,
            best_case=best_case,
            evidence_id=evidence_id,
        )