"""
KINCAID HEALTH™ SIMULATION ENGINE
Value at Risk (VaR) Calculator
"""

from typing import Dict, Any, List
import numpy as np


class ValueAtRiskCalculator:
    """
    Calculate Value at Risk and Conditional Value at Risk
    """
    
    @staticmethod
    def calculate_var(
        data: np.ndarray,
        confidence_level: float = 0.95
    ) -> Dict[str, float]:
        """
        Calculate Value at Risk (VaR)
        
        VaR is the maximum loss at a given confidence level
        
        Args:
            data: Array of loss values
            confidence_level: Confidence level (e.g., 0.95 for 95%)
            
        Returns:
            VaR statistics
        """
        percentile = confidence_level * 100
        var = np.percentile(data, percentile)
        
        return {
            'var': float(var),
            'confidence_level': confidence_level,
            'percentile': percentile,
            'interpretation': f'{confidence_level*100:.0f}% of outcomes are below ${var:,.2f}'
        }
    
    @staticmethod
    def calculate_cvar(
        data: np.ndarray,
        confidence_level: float = 0.95
    ) -> Dict[str, float]:
        """
        Calculate Conditional Value at Risk (CVaR / Expected Shortfall)
        
        CVaR is the expected loss given that VaR is exceeded
        
        Args:
            data: Array of loss values
            confidence_level: Confidence level
            
        Returns:
            CVaR statistics
        """
        percentile = confidence_level * 100
        var = np.percentile(data, percentile)
        
        # CVaR is the average of losses exceeding VaR
        tail_losses = data[data >= var]
        cvar = np.mean(tail_losses)
        
        return {
            'cvar': float(cvar),
            'var': float(var),
            'confidence_level': confidence_level,
            'tail_count': len(tail_losses),
            'interpretation': f'Average loss when exceeding VaR: ${cvar:,.2f}'
        }
    
    @staticmethod
    def var_multiple_levels(
        data: np.ndarray,
        levels: List[float] = [0.90, 0.95, 0.99]
    ) -> List[Dict[str, Any]]:
        """
        Calculate VaR and CVaR at multiple confidence levels
        
        Args:
            data: Array of loss values
            levels: List of confidence levels
            
        Returns:
            List of VaR/CVaR results
        """
        results = []
        
        for level in levels:
            var = ValueAtRiskCalculator.calculate_var(data, level)
            cvar = ValueAtRiskCalculator.calculate_cvar(data, level)
            
            results.append({
                'confidence_level': level,
                'var': var['var'],
                'cvar': cvar['cvar'],
                'shortfall': cvar['cvar'] - var['var']
            })
        
        return results
    
    @staticmethod
    def risk_contribution(
        portfolio_data: np.ndarray,
        component_data: np.ndarray,
        confidence_level: float = 0.95
    ) -> Dict[str, float]:
        """
        Calculate risk contribution of a component to portfolio VaR
        
        Args:
            portfolio_data: Portfolio loss distribution
            component_data: Component loss distribution
            confidence_level: Confidence level
            
        Returns:
            Risk contribution metrics
        """
        portfolio_var = np.percentile(portfolio_data, confidence_level * 100)
        component_var = np.percentile(component_data, confidence_level * 100)
        
        # Marginal VaR (approximation via correlation)
        correlation = np.corrcoef(portfolio_data, component_data)[0, 1]
        
        return {
            'portfolio_var': float(portfolio_var),
            'component_var': float(component_var),
            'correlation': float(correlation),
            'contribution_pct': float((component_var / portfolio_var * 100) if portfolio_var != 0 else 0)
        }
    
    @staticmethod
    def backtesting(
        predictions: np.ndarray,
        actuals: np.ndarray,
        confidence_level: float = 0.95
    ) -> Dict[str, Any]:
        """
        Backtest VaR model accuracy
        
        Args:
            predictions: Predicted VaR values
            actuals: Actual observed losses
            confidence_level: Confidence level used for VaR
            
        Returns:
            Backtest results
        """
        exceptions = np.sum(actuals > predictions)
        total = len(actuals)
        exception_rate = exceptions / total
        expected_rate = 1 - confidence_level
        
        return {
            'exceptions': int(exceptions),
            'total_observations': total,
            'exception_rate': float(exception_rate),
            'expected_rate': float(expected_rate),
            'model_accurate': abs(exception_rate - expected_rate) < 0.05,
            'interpretation': 'Pass' if abs(exception_rate - expected_rate) < 0.05 else 'Fail'
        }