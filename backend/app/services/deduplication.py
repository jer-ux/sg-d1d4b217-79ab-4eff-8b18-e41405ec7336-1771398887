"""
KINCAID HEALTH™ DEDUPLICATION ENGINE
Fuzzy matching for patient, claim, and provider deduplication
"""

from typing import List, Dict, Optional, Tuple, Set
from dataclasses import dataclass
from enum import Enum
import re
from datetime import date, timedelta
from difflib import SequenceMatcher


class MatchType(str, Enum):
    """Type of duplicate match"""
    EXACT = "exact"
    HIGH_CONFIDENCE = "high_confidence"  # >90% similarity
    PROBABLE = "probable"  # 70-90% similarity
    POSSIBLE = "possible"  # 50-70% similarity
    

@dataclass
class DuplicateMatch:
    """Duplicate record match"""
    record_id_1: str
    record_id_2: str
    match_type: MatchType
    confidence_score: float
    matching_fields: List[str]
    reason: str


class DeduplicationEngine:
    """
    Intelligent deduplication using fuzzy matching
    
    Handles:
    - Patient/member deduplication
    - Claim deduplication
    - Provider deduplication
    """
    
    def __init__(self):
        self.soundex_cache: Dict[str, str] = {}
        
    # ================================================================
    # PATIENT DEDUPLICATION
    # ================================================================
    
    def find_duplicate_patients(
        self, 
        patients: List[Dict]
    ) -> List[DuplicateMatch]:
        """
        Find duplicate patient records
        
        Args:
            patients: List of patient dicts with keys:
                - patient_id
                - first_name
                - last_name
                - dob
                - ssn (optional)
                - address (optional)
                
        Returns:
            List of potential duplicate matches
        """
        matches = []
        
        for i, p1 in enumerate(patients):
            for p2 in patients[i+1:]:
                match = self._compare_patients(p1, p2)
                if match:
                    matches.append(match)
        
        return matches
    
    def _compare_patients(
        self, 
        p1: Dict, 
        p2: Dict
    ) -> Optional[DuplicateMatch]:
        """Compare two patient records for duplication"""
        
        # Exact match on SSN
        if p1.get("ssn") and p2.get("ssn"):
            if p1["ssn"] == p2["ssn"]:
                return DuplicateMatch(
                    record_id_1=p1["patient_id"],
                    record_id_2=p2["patient_id"],
                    match_type=MatchType.EXACT,
                    confidence_score=1.0,
                    matching_fields=["ssn"],
                    reason="Exact SSN match"
                )
        
        # Name and DOB matching
        name_similarity = self._name_similarity(
            p1.get("first_name", ""),
            p1.get("last_name", ""),
            p2.get("first_name", ""),
            p2.get("last_name", "")
        )
        
        dob_match = p1.get("dob") == p2.get("dob") if p1.get("dob") and p2.get("dob") else False
        
        # High confidence: Name >90% similar + same DOB
        if name_similarity > 0.9 and dob_match:
            return DuplicateMatch(
                record_id_1=p1["patient_id"],
                record_id_2=p2["patient_id"],
                match_type=MatchType.HIGH_CONFIDENCE,
                confidence_score=name_similarity,
                matching_fields=["name", "dob"],
                reason=f"Name similarity: {name_similarity:.2%}, same DOB"
            )
        
        # Probable: Name >70% similar + DOB within 1 day (data entry error)
        if name_similarity > 0.7 and self._dob_within_days(
            p1.get("dob"), 
            p2.get("dob"), 
            1
        ):
            return DuplicateMatch(
                record_id_1=p1["patient_id"],
                record_id_2=p2["patient_id"],
                match_type=MatchType.PROBABLE,
                confidence_score=name_similarity * 0.9,
                matching_fields=["name", "dob"],
                reason=f"Name similarity: {name_similarity:.2%}, DOB within 1 day"
            )
        
        # Possible: Name >50% similar + same last 4 SSN
        if name_similarity > 0.5:
            ssn1_last4 = p1.get("ssn", "")[-4:] if p1.get("ssn") else ""
            ssn2_last4 = p2.get("ssn", "")[-4:] if p2.get("ssn") else ""
            
            if ssn1_last4 and ssn2_last4 and ssn1_last4 == ssn2_last4:
                return DuplicateMatch(
                    record_id_1=p1["patient_id"],
                    record_id_2=p2["patient_id"],
                    match_type=MatchType.POSSIBLE,
                    confidence_score=name_similarity * 0.7,
                    matching_fields=["name", "ssn_last4"],
                    reason=f"Name similarity: {name_similarity:.2%}, same SSN last 4"
                )
        
        return None
    
    # ================================================================
    # CLAIM DEDUPLICATION
    # ================================================================
    
    def find_duplicate_claims(
        self, 
        claims: List[Dict]
    ) -> List[DuplicateMatch]:
        """
        Find duplicate claim records
        
        Args:
            claims: List of claim dicts with keys:
                - claim_id
                - patient_id
                - service_date
                - provider_id
                - billed_amount
                - diagnosis_codes
                - procedure_codes
                
        Returns:
            List of potential duplicate claims
        """
        matches = []
        
        for i, c1 in enumerate(claims):
            for c2 in claims[i+1:]:
                match = self._compare_claims(c1, c2)
                if match:
                    matches.append(match)
        
        return matches
    
    def _compare_claims(
        self, 
        c1: Dict, 
        c2: Dict
    ) -> Optional[DuplicateMatch]:
        """Compare two claim records for duplication"""
        
        # Exact match: Same patient, date, provider, amount
        if (
            c1.get("patient_id") == c2.get("patient_id") and
            c1.get("service_date") == c2.get("service_date") and
            c1.get("provider_id") == c2.get("provider_id") and
            abs(c1.get("billed_amount", 0) - c2.get("billed_amount", 0)) < 0.01
        ):
            return DuplicateMatch(
                record_id_1=c1["claim_id"],
                record_id_2=c2["claim_id"],
                match_type=MatchType.EXACT,
                confidence_score=1.0,
                matching_fields=["patient_id", "service_date", "provider_id", "amount"],
                reason="Exact match on patient, date, provider, amount"
            )
        
        # High confidence: Same patient, date, provider, similar amount
        if (
            c1.get("patient_id") == c2.get("patient_id") and
            c1.get("service_date") == c2.get("service_date") and
            c1.get("provider_id") == c2.get("provider_id")
        ):
            amount_diff_pct = abs(
                c1.get("billed_amount", 0) - c2.get("billed_amount", 0)
            ) / max(c1.get("billed_amount", 1), c2.get("billed_amount", 1))
            
            if amount_diff_pct < 0.05:  # Within 5%
                return DuplicateMatch(
                    record_id_1=c1["claim_id"],
                    record_id_2=c2["claim_id"],
                    match_type=MatchType.HIGH_CONFIDENCE,
                    confidence_score=0.95,
                    matching_fields=["patient_id", "service_date", "provider_id"],
                    reason=f"Same patient/date/provider, amount within 5% ({amount_diff_pct:.1%})"
                )
        
        # Probable: Same patient/date, overlapping procedures
        if (
            c1.get("patient_id") == c2.get("patient_id") and
            c1.get("service_date") == c2.get("service_date")
        ):
            proc_overlap = self._procedure_overlap(
                c1.get("procedure_codes", []),
                c2.get("procedure_codes", [])
            )
            
            if proc_overlap > 0.7:
                return DuplicateMatch(
                    record_id_1=c1["claim_id"],
                    record_id_2=c2["claim_id"],
                    match_type=MatchType.PROBABLE,
                    confidence_score=0.85,
                    matching_fields=["patient_id", "service_date", "procedures"],
                    reason=f"Same patient/date, {proc_overlap:.0%} procedure overlap"
                )
        
        return None
    
    # ================================================================
    # PROVIDER DEDUPLICATION
    # ================================================================
    
    def find_duplicate_providers(
        self, 
        providers: List[Dict]
    ) -> List[DuplicateMatch]:
        """
        Find duplicate provider records
        
        Args:
            providers: List of provider dicts with keys:
                - provider_id
                - npi
                - name
                - tin
                - address
                
        Returns:
            List of potential duplicate providers
        """
        matches = []
        
        for i, prov1 in enumerate(providers):
            for prov2 in providers[i+1:]:
                match = self._compare_providers(prov1, prov2)
                if match:
                    matches.append(match)
        
        return matches
    
    def _compare_providers(
        self, 
        prov1: Dict, 
        prov2: Dict
    ) -> Optional[DuplicateMatch]:
        """Compare two provider records for duplication"""
        
        # Exact match on NPI
        if prov1.get("npi") and prov2.get("npi"):
            if prov1["npi"] == prov2["npi"]:
                return DuplicateMatch(
                    record_id_1=prov1["provider_id"],
                    record_id_2=prov2["provider_id"],
                    match_type=MatchType.EXACT,
                    confidence_score=1.0,
                    matching_fields=["npi"],
                    reason="Exact NPI match"
                )
        
        # High confidence: Same TIN + similar name
        if prov1.get("tin") and prov2.get("tin"):
            if prov1["tin"] == prov2["tin"]:
                name_sim = self._string_similarity(
                    prov1.get("name", ""),
                    prov2.get("name", "")
                )
                
                if name_sim > 0.7:
                    return DuplicateMatch(
                        record_id_1=prov1["provider_id"],
                        record_id_2=prov2["provider_id"],
                        match_type=MatchType.HIGH_CONFIDENCE,
                        confidence_score=0.95,
                        matching_fields=["tin", "name"],
                        reason=f"Same TIN, name similarity: {name_sim:.2%}"
                    )
        
        return None
    
    # ================================================================
    # FUZZY MATCHING UTILITIES
    # ================================================================
    
    def _name_similarity(
        self, 
        first1: str, 
        last1: str, 
        first2: str, 
        last2: str
    ) -> float:
        """Calculate name similarity score"""
        # Normalize names
        first1 = self._normalize_name(first1)
        last1 = self._normalize_name(last1)
        first2 = self._normalize_name(first2)
        last2 = self._normalize_name(last2)
        
        # Last name is more important (weight: 0.7)
        last_sim = self._string_similarity(last1, last2)
        first_sim = self._string_similarity(first1, first2)
        
        # Also check Soundex (phonetic matching)
        last_soundex_match = self._soundex(last1) == self._soundex(last2)
        first_soundex_match = self._soundex(first1) == self._soundex(first2)
        
        # Combine scores
        last_score = max(last_sim, 0.9 if last_soundex_match else 0)
        first_score = max(first_sim, 0.9 if first_soundex_match else 0)
        
        return (last_score * 0.7) + (first_score * 0.3)
    
    def _string_similarity(self, s1: str, s2: str) -> float:
        """Calculate string similarity using Levenshtein-based algorithm"""
        return SequenceMatcher(None, s1.lower(), s2.lower()).ratio()
    
    def _soundex(self, name: str) -> str:
        """Generate Soundex code for phonetic matching"""
        if name in self.soundex_cache:
            return self.soundex_cache[name]
        
        # Soundex algorithm
        name = name.upper()
        
        # Keep first letter
        soundex = name[0]
        
        # Mapping
        mapping = {
            'BFPV': '1',
            'CGJKQSXZ': '2',
            'DT': '3',
            'L': '4',
            'MN': '5',
            'R': '6'
        }
        
        # Convert remaining letters
        for char in name[1:]:
            for letters, code in mapping.items():
                if char in letters:
                    if soundex[-1] != code:  # Avoid duplicates
                        soundex += code
                    break
        
        # Pad or truncate to 4 characters
        soundex = (soundex + '000')[:4]
        
        self.soundex_cache[name] = soundex
        return soundex
    
    def _normalize_name(self, name: str) -> str:
        """Normalize name for comparison"""
        # Remove special characters, extra spaces
        name = re.sub(r'[^a-zA-Z\s]', '', name)
        name = ' '.join(name.split())
        return name.strip().upper()
    
    def _dob_within_days(
        self, 
        dob1: Optional[date], 
        dob2: Optional[date], 
        days: int
    ) -> bool:
        """Check if two DOBs are within N days of each other"""
        if not dob1 or not dob2:
            return False
        
        diff = abs((dob1 - dob2).days)
        return diff <= days
    
    def _procedure_overlap(
        self, 
        codes1: List[str], 
        codes2: List[str]
    ) -> float:
        """Calculate overlap between procedure code lists"""
        if not codes1 or not codes2:
            return 0.0
        
        set1 = set(codes1)
        set2 = set(codes2)
        
        intersection = len(set1 & set2)
        union = len(set1 | set2)
        
        return intersection / union if union > 0 else 0.0


# ================================================================
# USAGE EXAMPLE
# ================================================================

"""
# Initialize engine
dedup = DeduplicationEngine()

# Find duplicate patients
patients = [
    {
        "patient_id": "P001",
        "first_name": "John",
        "last_name": "Smith",
        "dob": date(1985, 3, 15),
        "ssn": "123-45-6789"
    },
    {
        "patient_id": "P002",
        "first_name": "Jon",
        "last_name": "Smyth",
        "dob": date(1985, 3, 15),
        "ssn": None
    }
]

matches = dedup.find_duplicate_patients(patients)
for match in matches:
    print(f"Found {match.match_type} match:")
    print(f"  IDs: {match.record_id_1} <-> {match.record_id_2}")
    print(f"  Confidence: {match.confidence_score:.2%}")
    print(f"  Reason: {match.reason}")
"""