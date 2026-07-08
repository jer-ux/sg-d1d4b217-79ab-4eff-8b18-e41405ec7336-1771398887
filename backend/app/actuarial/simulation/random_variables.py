"""
KINCAID HEALTH™ SIMULATION ENGINE
Random Variable Definitions
"""

from dataclasses import dataclass


@dataclass
class RandomVariable:
    """
    Random variable specification
    """
    name: str
    distribution: str
    parameters: dict
    
    def to_dict(self):
        return {
            'name': self.name,
            'distribution': self.distribution,
            'parameters': self.parameters
        }