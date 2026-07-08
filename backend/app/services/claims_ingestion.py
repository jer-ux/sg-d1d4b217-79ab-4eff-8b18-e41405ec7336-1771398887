"""
KINCAID HEALTH™ CLAIMS INGESTION SERVICE
Medical and pharmacy claims processing pipeline
"""

from typing import Dict, List, Optional, Any
from datetime import datetime, date
from decimal import Decimal
import pandas as pd
import hashlib
import re

from app.services.validation import DataValidator
from app.services.code_mapping import CodeMapper
from app.services.deduplication import DeduplicationEngine


class ClaimsIngestionPipeline:
    """
    End-to-end claims processing pipeline
    Validates, deduplicates, normalizes, and loads claims data
    """
    
    def __init__(self, tenant_id: str):
        self.tenant_id = tenant_id
        self.validator = DataValidator()
        self.code_mapper = CodeMapper()
        self.deduplicator = DeduplicationEngine()
        
    def process_medical_claims(
        self,
        file_path: str,
        file_format: str = "csv"
    ) -> Dict[str, Any]:
        """
        Process medical claims file
        
        Args:
            file_path: Path to claims file
            file_format: csv, excel, fixed_width, or x12
            
        Returns:
            Processing results with counts and errors
        """
        # Load raw data
        if file_format == "csv":
            df = pd.read_csv(file_path, dtype=str)
        elif file_format == "excel":
            df = pd.read_excel(file_path, dtype=str)
        elif file_format == "x12":
            df = self._parse_x12_837(file_path)
        else:
            raise ValueError(f"Unsupported format: {file_format}")
            
        results = {
            "total_records": len(df),
            "valid_records": 0,
            "invalid_records": 0,
            "duplicate_records": 0,
            "errors": [],
            "warnings": []
        }
        
        # Validate required fields
        required_fields = [
            "member_id", "claim_number", "service_date",
            "provider_npi", "diagnosis_code", "procedure_code",
            "allowed_amount", "paid_amount"
        ]
        
        missing_fields = [f for f in required_fields if f not in df.columns]
        if missing_fields:
            results["errors"].append(f"Missing required fields: {missing_fields}")
            return results
            
        # Process each claim
        valid_claims = []
        for idx, row in df.iterrows():
            try:
                # Validate claim structure
                validation = self.validator.validate_medical_claim(row.to_dict())
                if not validation["valid"]:
                    results["invalid_records"] += 1
                    results["errors"].append({
                        "row": idx + 1,
                        "claim_number": row.get("claim_number"),
                        "errors": validation["errors"]
                    })
                    continue
                    
                # Normalize codes
                normalized_claim = self._normalize_medical_claim(row)
                
                # Check for duplicates
                is_duplicate = self.deduplicator.is_duplicate_claim(
                    normalized_claim,
                    self.tenant_id
                )
                
                if is_duplicate:
                    results["duplicate_records"] += 1
                    results["warnings"].append({
                        "row": idx + 1,
                        "claim_number": row.get("claim_number"),
                        "message": "Duplicate claim detected"
                    })
                    continue
                    
                # Add to valid claims
                valid_claims.append(normalized_claim)
                results["valid_records"] += 1
                
            except Exception as e:
                results["invalid_records"] += 1
                results["errors"].append({
                    "row": idx + 1,
                    "claim_number": row.get("claim_number", "unknown"),
                    "error": str(e)
                })
                
        # Bulk load valid claims
        if valid_claims:
            self._bulk_insert_medical_claims(valid_claims)
            
        return results
        
    def process_pharmacy_claims(
        self,
        file_path: str,
        file_format: str = "csv"
    ) -> Dict[str, Any]:
        """
        Process pharmacy claims file
        
        Args:
            file_path: Path to pharmacy claims file
            file_format: csv, excel, or ncpdp
            
        Returns:
            Processing results
        """
        # Load raw data
        if file_format == "csv":
            df = pd.read_csv(file_path, dtype=str)
        elif file_format == "excel":
            df = pd.read_excel(file_path, dtype=str)
        elif file_format == "ncpdp":
            df = self._parse_ncpdp(file_path)
        else:
            raise ValueError(f"Unsupported format: {file_format}")
            
        results = {
            "total_records": len(df),
            "valid_records": 0,
            "invalid_records": 0,
            "duplicate_records": 0,
            "errors": [],
            "warnings": []
        }
        
        # Validate required fields
        required_fields = [
            "member_id", "claim_number", "fill_date",
            "ndc", "quantity", "days_supply",
            "ingredient_cost", "dispensing_fee", "total_paid"
        ]
        
        missing_fields = [f for f in required_fields if f not in df.columns]
        if missing_fields:
            results["errors"].append(f"Missing required fields: {missing_fields}")
            return results
            
        # Process each pharmacy claim
        valid_claims = []
        for idx, row in df.iterrows():
            try:
                # Validate pharmacy claim
                validation = self.validator.validate_pharmacy_claim(row.to_dict())
                if not validation["valid"]:
                    results["invalid_records"] += 1
                    results["errors"].append({
                        "row": idx + 1,
                        "claim_number": row.get("claim_number"),
                        "errors": validation["errors"]
                    })
                    continue
                    
                # Normalize pharmacy claim
                normalized_claim = self._normalize_pharmacy_claim(row)
                
                # Check for duplicates
                is_duplicate = self.deduplicator.is_duplicate_claim(
                    normalized_claim,
                    self.tenant_id
                )
                
                if is_duplicate:
                    results["duplicate_records"] += 1
                    continue
                    
                valid_claims.append(normalized_claim)
                results["valid_records"] += 1
                
            except Exception as e:
                results["invalid_records"] += 1
                results["errors"].append({
                    "row": idx + 1,
                    "error": str(e)
                })
                
        # Bulk load
        if valid_claims:
            self._bulk_insert_pharmacy_claims(valid_claims)
            
        return results
        
    def _normalize_medical_claim(self, row: pd.Series) -> Dict[str, Any]:
        """Normalize medical claim data"""
        # Clean and validate diagnosis codes
        dx_codes = []
        for i in range(1, 13):
            dx_field = f"diagnosis_code_{i}" if i > 1 else "diagnosis_code"
            if dx_field in row and pd.notna(row[dx_field]):
                cleaned = self.code_mapper.normalize_icd10(row[dx_field])
                if cleaned:
                    dx_codes.append(cleaned)
                    
        # Clean and validate procedure codes
        proc_codes = []
        for i in range(1, 7):
            proc_field = f"procedure_code_{i}" if i > 1 else "procedure_code"
            if proc_field in row and pd.notna(row[proc_field]):
                cleaned = self.code_mapper.normalize_cpt(row[proc_field])
                if cleaned:
                    proc_codes.append(cleaned)
                    
        return {
            "tenant_id": self.tenant_id,
            "member_id": str(row["member_id"]).strip(),
            "claim_number": str(row["claim_number"]).strip(),
            "service_date": self._parse_date(row["service_date"]),
            "provider_npi": self._normalize_npi(row["provider_npi"]),
            "diagnosis_codes": dx_codes,
            "procedure_codes": proc_codes,
            "place_of_service": str(row.get("place_of_service", "")).strip(),
            "allowed_amount": self._parse_decimal(row["allowed_amount"]),
            "paid_amount": self._parse_decimal(row["paid_amount"]),
            "member_responsibility": self._parse_decimal(row.get("member_responsibility", 0)),
            "claim_type": row.get("claim_type", "medical").lower(),
            "created_at": datetime.utcnow(),
            "claim_hash": self._generate_claim_hash(row)
        }
        
    def _normalize_pharmacy_claim(self, row: pd.Series) -> Dict[str, Any]:
        """Normalize pharmacy claim data"""
        # Normalize NDC
        ndc = self.code_mapper.normalize_ndc(row["ndc"])
        
        # Map to GPI
        gpi = self.code_mapper.map_ndc_to_gpi(ndc) if ndc else None
        
        return {
            "tenant_id": self.tenant_id,
            "member_id": str(row["member_id"]).strip(),
            "claim_number": str(row["claim_number"]).strip(),
            "fill_date": self._parse_date(row["fill_date"]),
            "ndc": ndc,
            "gpi": gpi,
            "drug_name": row.get("drug_name", "").strip(),
            "quantity": float(row["quantity"]),
            "days_supply": int(row["days_supply"]),
            "ingredient_cost": self._parse_decimal(row["ingredient_cost"]),
            "dispensing_fee": self._parse_decimal(row.get("dispensing_fee", 0)),
            "total_paid": self._parse_decimal(row["total_paid"]),
            "member_copay": self._parse_decimal(row.get("member_copay", 0)),
            "pharmacy_npi": self._normalize_npi(row.get("pharmacy_npi", "")),
            "is_brand": row.get("is_brand", "").upper() == "Y",
            "is_specialty": row.get("is_specialty", "").upper() == "Y",
            "created_at": datetime.utcnow(),
            "claim_hash": self._generate_claim_hash(row)
        }
        
    def _parse_date(self, date_str: str) -> Optional[date]:
        """Parse date from various formats"""
        if pd.isna(date_str):
            return None
            
        date_formats = [
            "%Y-%m-%d",
            "%m/%d/%Y",
            "%Y%m%d",
            "%m-%d-%Y"
        ]
        
        for fmt in date_formats:
            try:
                return datetime.strptime(str(date_str).strip(), fmt).date()
            except ValueError:
                continue
                
        return None
        
    def _parse_decimal(self, value: Any) -> Decimal:
        """Parse decimal from string, handling currency symbols"""
        if pd.isna(value):
            return Decimal("0")
            
        # Remove currency symbols and commas
        cleaned = re.sub(r'[,$]', '', str(value).strip())
        try:
            return Decimal(cleaned)
        except:
            return Decimal("0")
            
    def _normalize_npi(self, npi: str) -> Optional[str]:
        """Normalize NPI to 10 digits"""
        if pd.isna(npi):
            return None
            
        # Remove non-digits
        digits = re.sub(r'\D', '', str(npi))
        
        # Validate length
        if len(digits) != 10:
            return None
            
        return digits
        
    def _generate_claim_hash(self, row: pd.Series) -> str:
        """Generate unique hash for claim deduplication"""
        key_fields = [
            str(row.get("member_id", "")),
            str(row.get("claim_number", "")),
            str(row.get("service_date", row.get("fill_date", ""))),
            str(row.get("provider_npi", row.get("pharmacy_npi", "")))
        ]
        
        hash_input = "|".join(key_fields).encode()
        return hashlib.sha256(hash_input).hexdigest()
        
    def _parse_x12_837(self, file_path: str) -> pd.DataFrame:
        """Parse X12 837 EDI file"""
        # Simplified X12 parser - production would use dedicated library
        # like pyx12 or python-x12
        raise NotImplementedError("X12 837 parsing requires EDI library")
        
    def _parse_ncpdp(self, file_path: str) -> pd.DataFrame:
        """Parse NCPDP pharmacy claim file"""
        # Simplified NCPDP parser
        raise NotImplementedError("NCPDP parsing requires specialized library")
        
    def _bulk_insert_medical_claims(self, claims: List[Dict[str, Any]]):
        """Bulk insert medical claims to database"""
        # Production implementation would use SQLAlchemy bulk_insert_mappings
        # or database-specific bulk load utilities
        pass
        
    def _bulk_insert_pharmacy_claims(self, claims: List[Dict[str, Any]]):
        """Bulk insert pharmacy claims to database"""
        pass


# Example usage
if __name__ == "__main__":
    pipeline = ClaimsIngestionPipeline(tenant_id="acme-corp")
    
    # Process medical claims
    results = pipeline.process_medical_claims(
        file_path="data/medical_claims_2024.csv",
        file_format="csv"
    )
    
    print(f"Medical Claims Processing Results:")
    print(f"  Total: {results['total_records']}")
    print(f"  Valid: {results['valid_records']}")
    print(f"  Invalid: {results['invalid_records']}")
    print(f"  Duplicates: {results['duplicate_records']}")
    
    # Process pharmacy claims
    results = pipeline.process_pharmacy_claims(
        file_path="data/pharmacy_claims_2024.csv",
        file_format="csv"
    )
    
    print(f"\nPharmacy Claims Processing Results:")
    print(f"  Total: {results['total_records']}")
    print(f"  Valid: {results['valid_records']}")
    print(f"  Invalid: {results['invalid_records']}")
    print(f"  Duplicates: {results['duplicate_records']}")