"""
KINCAID HEALTH™ SIMULATION ENGINE
Scenario Management
"""

from dataclasses import dataclass, field
from typing import Dict, List


@dataclass
class Scenario:
    """Scenario definition with named assumptions"""
    name: str
    description: str
    assumptions: Dict[str, float]
    tags: List[str] = field(default_factory=list)
    
    def to_dict(self):
        return {
            'name': self.name,
            'description': self.description,
            'assumptions': self.assumptions,
            'tags': self.tags
        }


class ScenarioLibrary:
    """Registry for pre-defined scenarios"""
    
    def __init__(self):
        self._scenarios = {}
    
    def register(self, scenario: Scenario):
        """Register a scenario"""
        self._scenarios[scenario.name] = scenario
    
    def get(self, name: str) -> Scenario:
        """Get scenario by name"""
        if name not in self._scenarios:
            raise ValueError(f"Unknown scenario: {name}")
        return self._scenarios[name]
    
    def list(self) -> List[str]:
        """List all scenario names"""
        return list(self._scenarios.keys())
    
    def all(self) -> List[Scenario]:
        """Get all scenarios"""
        return list(self._scenarios.values())
    
    def filter_by_tag(self, tag: str) -> List[Scenario]:
        """Get scenarios with specific tag"""
        return [s for s in self._scenarios.values() if tag in s.tags]