"""
KINCAID HEALTH™ CLAIMS INTELLIGENCE
Anomaly Detection Engine - Fraud, Waste, Abuse
"""

from typing import Dict, List, Any, Tuple
import numpy as np
from datetime import datetime, timedelta
from collections import defaultdict


class AnomalyDetectionEngine:
    """
    Detects anomalous patterns in claims data that may indicate
    fraud, waste, abuse, or coding errors.
    """
    
    def __init__(self, sensitivity: float = 2.5):
        """
        Args:
            sensitivity: Z-score threshold for outlier detection (default 2.5 std devs)
        """
        self.sensitivity = sensitivity
        self.anomalies = []
        
    def detect_all_anomalies(
        self,
        claims: List[Dict[str, Any]],
        member_data: Dict[str, Any],
        provider_data: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """
        Run all anomaly detection algorithms.
        
        Returns:
            List of detected anomalies with severity and evidence
        """
        anomalies = []
        
        # Financial anomalies
        anomalies.extend(self.detect_outlier_charges(claims))
        anomalies.extend(self.detect_billing_patterns(claims))
        
        # Utilization anomalies
        anomalies.extend(self.detect_excessive_utilization(claims, member_data))
        anomalies.extend(self.detect_impossible_volumes(claims))
        
        # Provider anomalies
        anomalies.extend(self.detect_provider_anomalies(claims, provider_data))
        
        # Member anomalies
        anomalies.extend(self.detect_member_anomalies(claims, member_data))
        
        # Temporal anomalies
        anomalies.extend(self.detect_temporal_anomalies(claims))
        
        self.anomalies = anomalies
        return anomalies
    
    def detect_outlier_charges(
        self,
        claims: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Detect claims with outlier charge amounts."""
        anomalies = []
        
        # Group by procedure code
        by_procedure = defaultdict(list)
        for claim in claims:
            proc = claim.get("procedure_code")
            amt = claim.get("paid_amount", 0)
            if proc and amt > 0:
                by_procedure[proc].append({
                    "claim_id": claim.get("claim_id"),
                    "amount": amt,
                    "provider_npi": claim.get("provider_npi"),
                    "service_date": claim.get("service_date")
                })
        
        # Detect outliers within each procedure
        for proc_code, proc_claims in by_procedure.items():
            if len(proc_claims) < 10:  # Need sufficient sample
                continue
            
            amounts = [c["amount"] for c in proc_claims]
            mean = np.mean(amounts)
            std = np.std(amounts)
            
            if std == 0:
                continue
            
            for claim in proc_claims:
                z_score = (claim["amount"] - mean) / std
                
                if abs(z_score) > self.sensitivity:
                    anomalies.append({
                        "type": "outlier_charge",
                        "claim_id": claim["claim_id"],
                        "procedure_code": proc_code,
                        "amount": claim["amount"],
                        "expected_range": f"${mean-2*std:.2f} - ${mean+2*std:.2f}",
                        "z_score": z_score,
                        "severity": "high" if abs(z_score) > 4 else "medium",
                        "message": f"Charge ${claim['amount']:.2f} is {abs(z_score):.1f} std devs from mean"
                    })
        
        return anomalies
    
    def detect_billing_patterns(
        self,
        claims: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Detect suspicious billing patterns."""
        anomalies = []
        
        # Upcoding detection - sudden shift to higher-cost codes
        by_provider = defaultdict(list)
        for claim in claims:
            npi = claim.get("provider_npi")
            if npi:
                by_provider[npi].append(claim)
        
        for npi, provider_claims in by_provider.items():
            if len(provider_claims) < 20:
                continue
            
            # Sort by date
            sorted_claims = sorted(
                provider_claims,
                key=lambda c: c.get("service_date", datetime.min)
            )
            
            # Calculate avg paid amount over time
            window = 30  # days
            first_half = sorted_claims[:len(sorted_claims)//2]
            second_half = sorted_claims[len(sorted_claims)//2:]
            
            first_avg = np.mean([c.get("paid_amount", 0) for c in first_half if c.get("paid_amount", 0) > 0])
            second_avg = np.mean([c.get("paid_amount", 0) for c in second_half if c.get("paid_amount", 0) > 0])
            
            if first_avg > 0:
                pct_change = ((second_avg - first_avg) / first_avg) * 100
                
                if pct_change > 50:  # 50% increase
                    anomalies.append({
                        "type": "upcoding_pattern",
                        "provider_npi": npi,
                        "first_period_avg": first_avg,
                        "second_period_avg": second_avg,
                        "percent_change": pct_change,
                        "severity": "high" if pct_change > 100 else "medium",
                        "message": f"Provider billing increased {pct_change:.1f}% - possible upcoding"
                    })
        
        return anomalies
    
    def detect_excessive_utilization(
        self,
        claims: List[Dict[str, Any]],
        member_data: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Detect members with excessive utilization."""
        anomalies = []
        
        # Group by member
        by_member = defaultdict(list)
        for claim in claims:
            member_id = claim.get("member_id")
            if member_id:
                by_member[member_id].append(claim)
        
        for member_id, member_claims in by_member.items():
            # Count visits, procedures, prescriptions
            visit_count = len([c for c in member_claims if self._is_visit(c)])
            
            # Excessive visits threshold
            if visit_count > 30:  # 30+ visits per period
                anomalies.append({
                    "type": "excessive_visits",
                    "member_id": member_id,
                    "visit_count": visit_count,
                    "severity": "medium",
                    "message": f"Member has {visit_count} visits - unusually high"
                })
            
            # Multiple providers for same condition
            providers = set(c.get("provider_npi") for c in member_claims)
            if len(providers) > 10:
                anomalies.append({
                    "type": "provider_shopping",
                    "member_id": member_id,
                    "provider_count": len(providers),
                    "severity": "medium",
                    "message": f"Member visited {len(providers)} different providers"
                })
        
        return anomalies
    
    def detect_impossible_volumes(
        self,
        claims: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Detect physically impossible service volumes."""
        anomalies = []
        
        # Group by provider and date
        by_provider_date = defaultdict(list)
        for claim in claims:
            npi = claim.get("provider_npi")
            date = claim.get("service_date")
            if npi and date:
                key = (npi, date.date() if isinstance(date, datetime) else date)
                by_provider_date[key].append(claim)
        
        for (npi, date), day_claims in by_provider_date.items():
            # Count distinct members seen
            members = set(c.get("member_id") for c in day_claims)
            
            # Impossible volume thresholds
            if len(members) > 100:  # 100+ patients in one day
                anomalies.append({
                    "type": "impossible_volume",
                    "provider_npi": npi,
                    "service_date": date,
                    "patient_count": len(members),
                    "severity": "high",
                    "message": f"Provider saw {len(members)} patients in one day - physically impossible"
                })
            
            # Sum of service minutes
            total_units = sum(c.get("units", 1) for c in day_claims)
            if total_units > 500:  # 500+ units in one day
                anomalies.append({
                    "type": "excessive_units",
                    "provider_npi": npi,
                    "service_date": date,
                    "total_units": total_units,
                    "severity": "high",
                    "message": f"Provider billed {total_units} units in one day"
                })
        
        return anomalies
    
    def detect_provider_anomalies(
        self,
        claims: List[Dict[str, Any]],
        provider_data: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Detect provider-level anomalies."""
        anomalies = []
        
        # Billing patterns by provider specialty
        by_specialty = defaultdict(lambda: defaultdict(list))
        for claim in claims:
            npi = claim.get("provider_npi")
            specialty = provider_data.get(npi, {}).get("specialty", "unknown")
            proc = claim.get("procedure_code")
            if npi and proc:
                by_specialty[specialty][npi].append(claim)
        
        # Detect providers whose billing deviates from peers
        for specialty, providers in by_specialty.items():
            if len(providers) < 5:  # Need peer group
                continue
            
            # Calculate average billing per provider
            provider_totals = {}
            for npi, provider_claims in providers.items():
                total = sum(c.get("paid_amount", 0) for c in provider_claims)
                provider_totals[npi] = total
            
            amounts = list(provider_totals.values())
            mean = np.mean(amounts)
            std = np.std(amounts)
            
            if std == 0:
                continue
            
            for npi, total in provider_totals.items():
                z_score = (total - mean) / std
                
                if z_score > self.sensitivity:
                    anomalies.append({
                        "type": "provider_outlier",
                        "provider_npi": npi,
                        "specialty": specialty,
                        "total_billed": total,
                        "peer_average": mean,
                        "z_score": z_score,
                        "severity": "high" if z_score > 4 else "medium",
                        "message": f"Provider billing {z_score:.1f}x above specialty peers"
                    })
        
        return anomalies
    
    def detect_member_anomalies(
        self,
        claims: List[Dict[str, Any]],
        member_data: Dict[str, Any]
    ) -> List[Dict[str, Any]]:
        """Detect member-level anomalies."""
        anomalies = []
        
        # Geographically impossible - multiple locations same day
        by_member_date = defaultdict(lambda: defaultdict(list))
        for claim in claims:
            member_id = claim.get("member_id")
            date = claim.get("service_date")
            if member_id and date:
                key = date.date() if isinstance(date, datetime) else date
                by_member_date[member_id][key].append(claim)
        
        for member_id, dates in by_member_date.items():
            for date, day_claims in dates.items():
                locations = set()
                for claim in day_claims:
                    facility = claim.get("facility_id")
                    if facility:
                        locations.add(facility)
                
                if len(locations) > 3:  # 3+ facilities in one day
                    anomalies.append({
                        "type": "geographic_impossibility",
                        "member_id": member_id,
                        "service_date": date,
                        "facility_count": len(locations),
                        "severity": "medium",
                        "message": f"Member at {len(locations)} facilities in one day"
                    })
        
        return anomalies
    
    def detect_temporal_anomalies(
        self,
        claims: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Detect time-based anomalies."""
        anomalies = []
        
        # Batch billing detection - many claims on same date
        by_submission_date = defaultdict(list)
        for claim in claims:
            submission_date = claim.get("submission_date")
            if submission_date:
                key = submission_date.date() if isinstance(submission_date, datetime) else submission_date
                by_submission_date[key].append(claim)
        
        for submission_date, day_claims in by_submission_date.items():
            if len(day_claims) > 100:  # 100+ claims submitted same day
                # Check if all from same provider
                providers = set(c.get("provider_npi") for c in day_claims)
                if len(providers) == 1:
                    anomalies.append({
                        "type": "batch_billing",
                        "provider_npi": list(providers)[0],
                        "submission_date": submission_date,
                        "claim_count": len(day_claims),
                        "severity": "medium",
                        "message": f"Provider submitted {len(day_claims)} claims on same day - possible batch billing"
                    })
        
        return anomalies
    
    def _is_visit(self, claim: Dict[str, Any]) -> bool:
        """Check if claim represents a visit/encounter."""
        proc = claim.get("procedure_code", "").lower()
        visit_keywords = ["visit", "consultation", "exam", "evaluation"]
        return any(kw in proc for kw in visit_keywords)
    
    def get_anomaly_summary(self) -> Dict[str, Any]:
        """Get summary statistics of detected anomalies."""
        if not self.anomalies:
            return {"total_anomalies": 0}
        
        by_type = defaultdict(int)
        by_severity = defaultdict(int)
        
        for anomaly in self.anomalies:
            by_type[anomaly["type"]] += 1
            by_severity[anomaly.get("severity", "unknown")] += 1
        
        return {
            "total_anomalies": len(self.anomalies),
            "by_type": dict(by_type),
            "by_severity": dict(by_severity),
            "high_severity_count": by_severity.get("high", 0),
            "medium_severity_count": by_severity.get("medium", 0),
            "low_severity_count": by_severity.get("low", 0)
        }