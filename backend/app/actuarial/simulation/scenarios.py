"""
KINCAID HEALTH™ SIMULATION ENGINE
Scenario Definitions
"""

from dataclasses import dataclass


@dataclass
class Scenario:
    """
    Deterministic scenario specification
    """
    name: str
    assumptions: dict
    description: str
    
    def to_dict(self):
        return {
            'name': self.name,
            'assumptions': self.assumptions,
            'description': self.description
        }