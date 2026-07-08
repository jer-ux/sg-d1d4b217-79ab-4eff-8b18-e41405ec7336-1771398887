"""
KINCAID HEALTH™ CODE MAPPING SERVICE
ICD-10, CPT, HCPCS, NDC code normalization and crosswalks
"""

from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
import re


class CodeType(str, Enum):
    """Medical code system types"""
    ICD10_DIAGNOSIS = "icd10_dx"
    ICD10_PROCEDURE = "icd10_px"
    CPT = "cpt"
    HCPCS = "hcpcs"
    NDC = "ndc"
    DRG = "drg"
    REVENUE_CODE = "revenue"
    

@dataclass
class CodeMapping:
    """Standardized code with metadata"""
    original_code: str
    standardized_code: str
    code_type: CodeType
    description: str
    category: str
    is_valid: bool
    confidence: float
    alternative_codes: List[str]
    

class CodeMappingService:
    """
    Medical code normalization and mapping service
    
    Handles:
    - ICD-10 diagnosis and procedure codes
    - CPT procedure codes
    - HCPCS codes
    - NDC drug codes
    - DRG codes
    - Revenue codes
    """
    
    def __init__(self):
        self.code_validators = {
            CodeType.ICD10_DIAGNOSIS: self._validate_icd10_dx,
            CodeType.ICD10_PROCEDURE: self._validate_icd10_px,
            CodeType.CPT: self._validate_cpt,
            CodeType.HCPCS: self._validate_hcpcs,
            CodeType.NDC: self._validate_ndc,
            CodeType.DRG: self._validate_drg,
        }
        
    # ================================================================
    # PUBLIC API
    # ================================================================
    
    def normalize_code(
        self, 
        code: str, 
        code_type: CodeType
    ) -> CodeMapping:
        """
        Normalize and validate a medical code
        
        Args:
            code: Raw code from source system
            code_type: Type of code (ICD-10, CPT, etc.)
            
        Returns:
            CodeMapping with standardized code and metadata
        """
        # Clean input
        clean_code = self._clean_code(code, code_type)
        
        # Validate format
        validator = self.code_validators.get(code_type)
        if not validator:
            return self._invalid_mapping(code, code_type, "Unknown code type")
            
        is_valid, error_message = validator(clean_code)
        
        if not is_valid:
            return self._invalid_mapping(code, code_type, error_message)
        
        # Look up description and category
        description = self._get_description(clean_code, code_type)
        category = self._get_category(clean_code, code_type)
        alternatives = self._get_alternatives(clean_code, code_type)
        
        return CodeMapping(
            original_code=code,
            standardized_code=clean_code,
            code_type=code_type,
            description=description,
            category=category,
            is_valid=True,
            confidence=1.0,
            alternative_codes=alternatives
        )
    
    def map_icd10_to_ccs(self, icd10_code: str) -> Optional[str]:
        """Map ICD-10 diagnosis to Clinical Classification Software (CCS) category"""
        # Implementation would use AHRQ CCS crosswalk
        # Placeholder for now
        clean_code = self._clean_code(icd10_code, CodeType.ICD10_DIAGNOSIS)
        
        # Example mappings (would be comprehensive table in production)
        ccs_mapping = {
            "E11": "049",  # Type 2 diabetes → Diabetes mellitus without complication
            "I10": "098",  # Essential hypertension → Essential hypertension
            "J44": "127",  # COPD → Chronic obstructive pulmonary disease
        }
        
        # Match on first 3 characters for category-level mapping
        prefix = clean_code[:3]
        return ccs_mapping.get(prefix)
    
    def map_ndc_to_gpi(self, ndc_code: str) -> Optional[str]:
        """Map NDC drug code to Generic Product Identifier (GPI)"""
        # Implementation would use Medi-Span or First DataBank crosswalk
        clean_ndc = self._clean_code(ndc_code, CodeType.NDC)
        
        # Would query drug database in production
        # Placeholder for now
        return None
    
    def batch_normalize(
        self, 
        codes: List[Tuple[str, CodeType]]
    ) -> List[CodeMapping]:
        """Normalize multiple codes efficiently"""
        return [
            self.normalize_code(code, code_type) 
            for code, code_type in codes
        ]
    
    # ================================================================
    # VALIDATORS
    # ================================================================
    
    def _validate_icd10_dx(self, code: str) -> Tuple[bool, str]:
        """Validate ICD-10 diagnosis code format"""
        # ICD-10-CM: 3-7 alphanumeric characters
        # First char: letter (A-Z except U)
        # Second char: digit (0-9)
        # Remaining: alphanumeric
        
        if not code:
            return False, "Empty code"
        
        if len(code) < 3 or len(code) > 7:
            return False, f"Invalid length: {len(code)} (must be 3-7)"
        
        if not code[0].isalpha() or code[0] == 'U':
            return False, f"Invalid first character: {code[0]}"
        
        if not code[1].isdigit():
            return False, f"Invalid second character: {code[1]} (must be digit)"
        
        return True, ""
    
    def _validate_icd10_px(self, code: str) -> Tuple[bool, str]:
        """Validate ICD-10 procedure code format"""
        # ICD-10-PCS: Exactly 7 alphanumeric characters
        
        if len(code) != 7:
            return False, f"Invalid length: {len(code)} (must be exactly 7)"
        
        if not code.isalnum():
            return False, "Must be alphanumeric"
        
        return True, ""
    
    def _validate_cpt(self, code: str) -> Tuple[bool, str]:
        """Validate CPT procedure code format"""
        # CPT: 5 digits, may have 2-character modifier
        
        if len(code) < 5:
            return False, f"Invalid length: {len(code)} (minimum 5 digits)"
        
        base_code = code[:5]
        if not base_code.isdigit():
            return False, "First 5 characters must be digits"
        
        # Validate modifier if present
        if len(code) > 5:
            modifier = code[5:]
            if len(modifier) != 2 or not modifier.isalnum():
                return False, f"Invalid modifier: {modifier}"
        
        return True, ""
    
    def _validate_hcpcs(self, code: str) -> Tuple[bool, str]:
        """Validate HCPCS code format"""
        # HCPCS: 1 letter + 4 digits
        
        if len(code) != 5:
            return False, f"Invalid length: {len(code)} (must be 5)"
        
        if not code[0].isalpha():
            return False, f"First character must be letter: {code[0]}"
        
        if not code[1:].isdigit():
            return False, "Last 4 characters must be digits"
        
        return True, ""
    
    def _validate_ndc(self, code: str) -> Tuple[bool, str]:
        """Validate NDC drug code format"""
        # NDC: Various formats (5-4-2, 5-3-2, 4-4-2)
        # Total: 11 digits (without dashes)
        
        digits_only = code.replace("-", "")
        
        if len(digits_only) != 11:
            return False, f"Invalid length: {len(digits_only)} (must be 11 digits)"
        
        if not digits_only.isdigit():
            return False, "Must contain only digits"
        
        return True, ""
    
    def _validate_drg(self, code: str) -> Tuple[bool, str]:
        """Validate DRG code format"""
        # DRG: 3 digits
        
        if len(code) != 3:
            return False, f"Invalid length: {len(code)} (must be 3 digits)"
        
        if not code.isdigit():
            return False, "Must be numeric"
        
        return True, ""
    
    # ================================================================
    # HELPERS
    # ================================================================
    
    def _clean_code(self, code: str, code_type: CodeType) -> str:
        """Standardize code format"""
        if not code:
            return ""
        
        # Remove whitespace
        clean = code.strip().upper()
        
        # Remove decimal points from ICD codes
        if code_type in [CodeType.ICD10_DIAGNOSIS, CodeType.ICD10_PROCEDURE]:
            clean = clean.replace(".", "")
        
        # Standardize NDC format (remove dashes)
        if code_type == CodeType.NDC:
            clean = clean.replace("-", "")
        
        return clean
    
    def _get_description(self, code: str, code_type: CodeType) -> str:
        """Get human-readable description of code"""
        # In production, would query code description tables
        # Placeholder examples
        
        descriptions = {
            "E1165": "Type 2 diabetes mellitus with hyperglycemia",
            "99213": "Office visit, established patient, level 3",
            "J1745": "Injection, infliximab, biosimilar, 10 mg",
        }
        
        return descriptions.get(code, f"{code_type.value.upper()} code: {code}")
    
    def _get_category(self, code: str, code_type: CodeType) -> str:
        """Get high-level category for code"""
        # In production, would use code range tables
        
        if code_type == CodeType.ICD10_DIAGNOSIS:
            # Map based on first letter
            category_map = {
                "A": "Infectious diseases",
                "B": "Infectious diseases",
                "C": "Neoplasms",
                "D": "Blood/immune disorders",
                "E": "Endocrine/metabolic",
                "F": "Mental disorders",
                "G": "Nervous system",
                "H": "Eye/ear disorders",
                "I": "Circulatory system",
                "J": "Respiratory system",
                "K": "Digestive system",
                "L": "Skin disorders",
                "M": "Musculoskeletal",
                "N": "Genitourinary",
                "O": "Pregnancy",
                "P": "Perinatal",
                "Q": "Congenital",
                "R": "Symptoms/signs",
                "S": "Injury",
                "T": "Injury",
                "V": "External causes",
                "W": "External causes",
                "X": "External causes",
                "Y": "External causes",
                "Z": "Health status",
            }
            return category_map.get(code[0], "Unknown")
        
        return code_type.value
    
    def _get_alternatives(self, code: str, code_type: CodeType) -> List[str]:
        """Get alternative/related codes"""
        # In production, would query crosswalk tables
        return []
    
    def _invalid_mapping(
        self, 
        code: str, 
        code_type: CodeType, 
        error: str
    ) -> CodeMapping:
        """Create invalid code mapping result"""
        return CodeMapping(
            original_code=code,
            standardized_code=code,
            code_type=code_type,
            description=f"Invalid code: {error}",
            category="INVALID",
            is_valid=False,
            confidence=0.0,
            alternative_codes=[]
        )


# ================================================================
# USAGE EXAMPLE
# ================================================================

"""
# Initialize service
mapper = CodeMappingService()

# Normalize individual code
result = mapper.normalize_code("E11.65", CodeType.ICD10_DIAGNOSIS)
print(f"Original: {result.original_code}")
print(f"Standardized: {result.standardized_code}")
print(f"Description: {result.description}")
print(f"Valid: {result.is_valid}")

# Batch normalization
codes = [
    ("E11.65", CodeType.ICD10_DIAGNOSIS),
    ("99213", CodeType.CPT),
    ("J1745", CodeType.HCPCS),
]
results = mapper.batch_normalize(codes)

# Map to classification systems
ccs_category = mapper.map_icd10_to_ccs("E1165")
gpi = mapper.map_ndc_to_gpi("00002751501")
"""