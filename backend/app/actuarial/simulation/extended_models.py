"""
KINCAID HEALTH™ SIMULATION ENGINE
Extended Actuarial Models
"""

import numpy as np


class StopLossModel:
    """Stop-loss insurance simulation"""
    
    def simulate(
        self,
        base_claims,
        attachment_point,
        frequency_mean,
        frequency_sd,
        severity_mean,
        severity_sd
    ):
        """
        Simulate stop-loss claims above attachment point
        
        Args:
            base_claims: Base aggregate claims
            attachment_point: Dollar threshold for stop-loss coverage
            frequency_mean: Expected number of large claims
            frequency_sd: Standard deviation of claim frequency
            severity_mean: Average large claim size
            severity_sd: Standard deviation of claim severity
        """
        # Simulate number of large claims
        frequency = max(0, np.random.normal(frequency_mean, frequency_sd))
        
        # Simulate severity of each large claim
        total_large_claims = 0
        for _ in range(int(frequency)):
            claim_amount = np.random.lognormal(
                np.log(severity_mean),
                severity_sd / severity_mean
            )
            if claim_amount > attachment_point:
                total_large_claims += (claim_amount - attachment_point)
        
        return total_large_claims


class IBNRModel:
    """Incurred But Not Reported reserve estimation"""
    
    def simulate(
        self,
        paid_claims,
        report_lag_mean,
        report_lag_sd,
        development_factor_mean,
        development_factor_sd
    ):
        """
        Estimate IBNR reserves
        
        Args:
            paid_claims: Currently paid claims
            report_lag_mean: Average months to report
            report_lag_sd: Variation in reporting lag
            development_factor_mean: Expected claim development
            development_factor_sd: Variation in development
        """
        # Simulate reporting lag effect
        lag_factor = np.random.lognormal(
            np.log(report_lag_mean),
            report_lag_sd / report_lag_mean
        )
        
        # Simulate development factor
        dev_factor = np.random.normal(
            development_factor_mean,
            development_factor_sd
        )
        
        # IBNR = Paid * Development * Lag adjustment
        ibnr = paid_claims * dev_factor * (lag_factor / report_lag_mean)
        
        return max(0, ibnr)


class PensionFundingModel:
    """Pension plan funding simulation"""
    
    def simulate(
        self,
        current_assets,
        current_liabilities,
        expected_return,
        return_volatility,
        benefit_payments,
        contributions,
        discount_rate_change
    ):
        """
        Simulate pension funded status
        
        Args:
            current_assets: Current plan assets
            current_liabilities: Present value of liabilities
            expected_return: Expected asset return rate
            return_volatility: Volatility of returns
            benefit_payments: Expected benefit payments
            contributions: Expected contributions
            discount_rate_change: Change in discount rate
        """
        # Simulate asset return
        asset_return = np.random.normal(
            expected_return,
            return_volatility
        )
        
        # Update assets
        ending_assets = (
            current_assets * (1 + asset_return) +
            contributions -
            benefit_payments
        )
        
        # Update liabilities (discount rate sensitivity)
        duration = 12.0  # Average duration assumption
        liability_change = -duration * discount_rate_change
        ending_liabilities = current_liabilities * (1 + liability_change)
        
        # Calculate funded ratio
        funded_ratio = ending_assets / ending_liabilities
        
        return funded_ratio


class PricingModel:
    """Insurance pricing simulation"""
    
    def simulate(
        self,
        expected_claims,
        claims_volatility,
        expense_ratio,
        target_margin,
        risk_charge,
        market_competition
    ):
        """
        Simulate insurance premium pricing
        
        Args:
            expected_claims: Expected claim cost
            claims_volatility: Volatility in claims
            expense_ratio: Operating expense ratio
            target_margin: Target profit margin
            risk_charge: Risk load for volatility
            market_competition: Competitive pressure factor (0-1)
        """
        # Simulate claims uncertainty
        claim_cost = np.random.lognormal(
            np.log(expected_claims),
            claims_volatility
        )
        
        # Calculate risk load
        risk_load = claim_cost * risk_charge * claims_volatility
        
        # Base premium calculation
        base_premium = claim_cost * (1 + expense_ratio + target_margin)
        
        # Add risk charge
        premium_with_risk = base_premium + risk_load
        
        # Apply market pressure
        final_premium = premium_with_risk * (1 - market_competition * 0.1)
        
        return final_premium


class WorkforceCostModel:
    """Workforce cost projection"""
    
    def simulate(
        self,
        current_headcount,
        average_salary,
        salary_increase_mean,
        salary_increase_sd,
        turnover_rate,
        benefit_cost_ratio,
        hiring_cost_per_employee
    ):
        """
        Simulate total workforce costs
        
        Args:
            current_headcount: Current employee count
            average_salary: Average annual salary
            salary_increase_mean: Expected salary increase rate
            salary_increase_sd: Volatility in salary increases
            turnover_rate: Annual turnover rate
            benefit_cost_ratio: Benefits as % of salary
            hiring_cost_per_employee: Cost to hire replacement
        """
        # Simulate salary increase
        salary_increase = np.random.normal(
            salary_increase_mean,
            salary_increase_sd
        )
        
        # New average salary
        new_avg_salary = average_salary * (1 + salary_increase)
        
        # Simulate turnover
        turnover_count = np.random.binomial(
            current_headcount,
            turnover_rate
        )
        
        # Calculate costs
        base_salary_cost = current_headcount * new_avg_salary
        benefit_cost = base_salary_cost * benefit_cost_ratio
        hiring_cost = turnover_count * hiring_cost_per_employee
        
        total_cost = base_salary_cost + benefit_cost + hiring_cost
        
        return total_cost