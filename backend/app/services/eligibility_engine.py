"""
KINCAID HEALTH™ ELIGIBILITY ENGINE
Member enrollment and eligibility processing
"""

from typing import Dict, List, Optional, Any
from datetime import datetime, date, timedelta
from decimal import Decimal
import pandas as pd
from enum import Enum


class CoverageTier(str, Enum):
    """Standard coverage tiers"""
    EMPLOYEE_ONLY = "employee_only"
    EMPLOYEE_SPOUSE = "employee_spouse"
    EMPLOYEE_CHILD = "employee_child"
    FAMILY = "family"


class CoverageStatus(str, Enum):
    """Member coverage status"""
    ACTIVE = "active"
    TERMINATED = "terminated"
    COBRA = "cobra"
    PENDING = "pending"
    SUSPENDED = "suspended"


class EligibilityEngine:
    """
    Process enrollment and eligibility data
    Maintains accurate member demographics and coverage periods
    """
    
    def __init__(self, tenant_id: str):
        self.tenant_id = tenant_id
        
    def process_eligibility_file(
        self,
        file_path: str,
        effective_date: date
    ) -> Dict[str, Any]:
        """
        Process eligibility snapshot file
        
        Args:
            file_path: Path to eligibility file
            effective_date: Effective date for the snapshot
            
        Returns:
            Processing results
        """
        df = pd.read_csv(file_path, dtype=str)
        
        results = {
            "effective_date": effective_date.isoformat(),
            "total_members": len(df),
            "active_members": 0,
            "terminated_members": 0,
            "new_enrollments": 0,
            "terminations": 0,
            "coverage_changes": 0,
            "errors": []
        }
        
        # Required fields
        required_fields = [
            "member_id", "first_name", "last_name", "date_of_birth",
            "coverage_effective_date", "coverage_tier", "plan_id"
        ]
        
        missing_fields = [f for f in required_fields if f not in df.columns]
        if missing_fields:
            results["errors"].append(f"Missing fields: {missing_fields}")
            return results
            
        # Process each member
        for idx, row in df.iterrows():
            try:
                member_data = self._normalize_member(row, effective_date)
                
                # Determine if new enrollment, termination, or change
                existing_member = self._get_existing_member(member_data["member_id"])
                
                if not existing_member:
                    # New enrollment
                    self._create_member(member_data)
                    results["new_enrollments"] += 1
                    results["active_members"] += 1
                    
                elif member_data["status"] == CoverageStatus.TERMINATED:
                    # Termination
                    self._terminate_member(member_data)
                    results["terminations"] += 1
                    results["terminated_members"] += 1
                    
                else:
                    # Check for coverage changes
                    if self._has_coverage_change(existing_member, member_data):
                        self._update_member_coverage(member_data)
                        results["coverage_changes"] += 1
                        
                    results["active_members"] += 1
                    
            except Exception as e:
                results["errors"].append({
                    "row": idx + 1,
                    "member_id": row.get("member_id"),
                    "error": str(e)
                })
                
        return results
        
    def calculate_member_months(
        self,
        start_date: date,
        end_date: date
    ) -> Dict[str, Any]:
        """
        Calculate member months for a date range
        
        Args:
            start_date: Start of reporting period
            end_date: End of reporting period
            
        Returns:
            Member months by coverage tier and plan
        """
        # Query active members during period
        members = self._get_active_members(start_date, end_date)
        
        member_months = {
            "total": 0,
            "by_tier": {tier.value: 0 for tier in CoverageTier},
            "by_plan": {},
            "average_enrollment": 0
        }
        
        months_in_period = (end_date.year - start_date.year) * 12 + \
                          (end_date.month - start_date.month) + 1
        
        for member in members:
            # Calculate months this member was active
            member_start = max(member["effective_date"], start_date)
            member_end = min(
                member["termination_date"] or end_date,
                end_date
            )
            
            months_active = (member_end.year - member_start.year) * 12 + \
                          (member_end.month - member_start.month) + 1
                          
            # Add to totals
            member_months["total"] += months_active
            member_months["by_tier"][member["coverage_tier"]] += months_active
            
            plan_id = member["plan_id"]
            if plan_id not in member_months["by_plan"]:
                member_months["by_plan"][plan_id] = 0
            member_months["by_plan"][plan_id] += months_active
            
        # Calculate average enrollment
        if months_in_period > 0:
            member_months["average_enrollment"] = \
                member_months["total"] / months_in_period
                
        return member_months
        
    def validate_member_eligibility(
        self,
        member_id: str,
        service_date: date
    ) -> Dict[str, Any]:
        """
        Validate member eligibility for a specific date
        
        Args:
            member_id: Member identifier
            service_date: Date of service
            
        Returns:
            Eligibility status and coverage details
        """
        member = self._get_member_snapshot(member_id, service_date)
        
        if not member:
            return {
                "eligible": False,
                "reason": "Member not found",
                "coverage": None
            }
            
        # Check if service date falls within coverage period
        effective = member["coverage_effective_date"]
        termination = member["coverage_termination_date"]
        
        is_eligible = effective <= service_date and \
                     (termination is None or service_date <= termination)
        
        return {
            "eligible": is_eligible,
            "member_id": member_id,
            "coverage_tier": member["coverage_tier"],
            "plan_id": member["plan_id"],
            "effective_date": effective,
            "termination_date": termination,
            "reason": None if is_eligible else "Coverage not active on service date"
        }
        
    def identify_cobra_candidates(
        self,
        lookback_days: int = 60
    ) -> List[Dict[str, Any]]:
        """
        Identify members who recently terminated and may be COBRA candidates
        
        Args:
            lookback_days: Days to look back for terminations
            
        Returns:
            List of COBRA candidates
        """
        cutoff_date = date.today() - timedelta(days=lookback_days)
        
        # Query recently terminated members
        terminated = self._get_terminated_members_since(cutoff_date)
        
        candidates = []
        for member in terminated:
            # Exclude terminations due to death or gross misconduct
            if member.get("termination_reason") in ["death", "gross_misconduct"]:
                continue
                
            # Calculate COBRA eligibility period
            term_date = member["termination_date"]
            cobra_end = term_date + timedelta(days=18 * 30)  # 18 months
            
            candidates.append({
                "member_id": member["member_id"],
                "full_name": f"{member['first_name']} {member['last_name']}",
                "termination_date": term_date,
                "coverage_tier": member["coverage_tier"],
                "cobra_eligible_until": cobra_end,
                "monthly_premium": self._calculate_cobra_premium(member)
            })
            
        return candidates
        
    def _normalize_member(
        self,
        row: pd.Series,
        effective_date: date
    ) -> Dict[str, Any]:
        """Normalize member eligibility data"""
        return {
            "tenant_id": self.tenant_id,
            "member_id": str(row["member_id"]).strip(),
            "first_name": str(row["first_name"]).strip().title(),
            "last_name": str(row["last_name"]).strip().title(),
            "date_of_birth": self._parse_date(row["date_of_birth"]),
            "gender": str(row.get("gender", "U")).upper()[0],
            "coverage_effective_date": self._parse_date(row["coverage_effective_date"]),
            "coverage_termination_date": self._parse_date(row.get("coverage_termination_date")),
            "coverage_tier": self._normalize_coverage_tier(row["coverage_tier"]),
            "plan_id": str(row["plan_id"]).strip(),
            "employee_id": str(row.get("employee_id", "")).strip(),
            "status": self._determine_status(row, effective_date),
            "snapshot_date": effective_date
        }
        
    def _normalize_coverage_tier(self, tier_str: str) -> str:
        """Normalize coverage tier to standard values"""
        tier_map = {
            "ee": CoverageTier.EMPLOYEE_ONLY,
            "employee": CoverageTier.EMPLOYEE_ONLY,
            "es": CoverageTier.EMPLOYEE_SPOUSE,
            "employee+spouse": CoverageTier.EMPLOYEE_SPOUSE,
            "ec": CoverageTier.EMPLOYEE_CHILD,
            "employee+child": CoverageTier.EMPLOYEE_CHILD,
            "family": CoverageTier.FAMILY,
            "employee+family": CoverageTier.FAMILY
        }
        
        normalized = tier_str.lower().strip().replace(" ", "").replace("+", "")
        return tier_map.get(normalized, CoverageTier.EMPLOYEE_ONLY).value
        
    def _determine_status(self, row: pd.Series, effective_date: date) -> str:
        """Determine member status"""
        term_date_str = row.get("coverage_termination_date")
        
        if pd.notna(term_date_str):
            term_date = self._parse_date(term_date_str)
            if term_date and term_date <= effective_date:
                return CoverageStatus.TERMINATED.value
                
        cobra_flag = str(row.get("is_cobra", "N")).upper()
        if cobra_flag == "Y":
            return CoverageStatus.COBRA.value
            
        return CoverageStatus.ACTIVE.value
        
    def _parse_date(self, date_str: str) -> Optional[date]:
        """Parse date from various formats"""
        if pd.isna(date_str):
            return None
            
        date_formats = ["%Y-%m-%d", "%m/%d/%Y", "%Y%m%d"]
        
        for fmt in date_formats:
            try:
                return datetime.strptime(str(date_str).strip(), fmt).date()
            except ValueError:
                continue
                
        return None
        
    def _get_existing_member(self, member_id: str) -> Optional[Dict[str, Any]]:
        """Get existing member from database"""
        # Production: query database
        return None
        
    def _create_member(self, member_data: Dict[str, Any]):
        """Create new member record"""
        pass
        
    def _terminate_member(self, member_data: Dict[str, Any]):
        """Terminate member coverage"""
        pass
        
    def _update_member_coverage(self, member_data: Dict[str, Any]):
        """Update member coverage details"""
        pass
        
    def _has_coverage_change(
        self,
        existing: Dict[str, Any],
        new: Dict[str, Any]
    ) -> bool:
        """Check if coverage has changed"""
        change_fields = ["coverage_tier", "plan_id"]
        return any(existing.get(f) != new.get(f) for f in change_fields)
        
    def _get_active_members(
        self,
        start_date: date,
        end_date: date
    ) -> List[Dict[str, Any]]:
        """Get members active during period"""
        # Production: query database
        return []
        
    def _get_member_snapshot(
        self,
        member_id: str,
        snapshot_date: date
    ) -> Optional[Dict[str, Any]]:
        """Get member eligibility as of a specific date"""
        # Production: query database
        return None
        
    def _get_terminated_members_since(
        self,
        cutoff_date: date
    ) -> List[Dict[str, Any]]:
        """Get members terminated since cutoff date"""
        # Production: query database
        return []
        
    def _calculate_cobra_premium(self, member: Dict[str, Any]) -> Decimal:
        """Calculate COBRA premium (102% of regular premium)"""
        # Production: lookup plan premium and apply 102% multiplier
        return Decimal("0")


# Example usage
if __name__ == "__main__":
    engine = EligibilityEngine(tenant_id="acme-corp")
    
    # Process eligibility snapshot
    results = engine.process_eligibility_file(
        file_path="data/eligibility_2024_01.csv",
        effective_date=date(2024, 1, 1)
    )
    
    print(f"Eligibility Processing Results:")
    print(f"  Total Members: {results['total_members']}")
    print(f"  Active: {results['active_members']}")
    print(f"  New Enrollments: {results['new_enrollments']}")
    print(f"  Terminations: {results['terminations']}")
    
    # Calculate member months
    member_months = engine.calculate_member_months(
        start_date=date(2024, 1, 1),
        end_date=date(2024, 12, 31)
    )
    
    print(f"\nMember Months:")
    print(f"  Total: {member_months['total']}")
    print(f"  Average Enrollment: {member_months['average_enrollment']:.1f}")