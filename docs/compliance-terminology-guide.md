# Compliance Terminology Implementation Guide
**For SiriusB iQ Platform**

---

## Executive Summary

This guide maps enterprise compliance terminology from our research to specific platform features, ensuring we speak the language of CFOs, compliance officers, and benefits leaders at 10,000+ employee organizations.

---

## 1. Core Compliance Terms Mapping

### Current Platform Terms → Compliance-Aligned Terms

| Current Term | Compliance Term | Where to Use | Why It Matters |
|--------------|-----------------|--------------|----------------|
| **War Room** | **Controls Dashboard** or **Governance Center** | Main navigation, product marketing | "War Room" sounds tactical; compliance teams need "Controls" language |
| **Events** | **Exception Items** or **Control Findings** | Event listings, alerts | Aligns with audit and internal controls terminology |
| **Receipts** | **Evidence Artifacts** or **Audit Evidence** | Evidence library, receipt attachments | Standard audit terminology per SOX/ERISA |
| **Value Creation Lane** | **Verified Savings Ledger** | Lane labels, reporting | CFO/Finance language for cost savings tracking |
| **At Risk State** | **Exception Queue** or **At-Risk Value** | Status indicators | Mirrors exception reporting in financial controls |
| **Owner** | **Accountable Party** or **Control Owner** | Assignment fields | Standard RACI/governance terminology |
| **Confidence Score** | **Evidence Quality Score** or **Assurance Level** | Metrics, dashboards | Aligns with audit assurance levels (limited, reasonable, high) |

---

## 2. Feature-Specific Terminology

### A. Verified Savings Ledger (Value Lane)

**Compliance Context:** ERISA fiduciary duty requires documented cost reasonableness and vendor selection justification.

#### Current Implementation (verified-savings-ledger.tsx)
```typescript
// CURRENT - Good foundation
"Verified Savings Ledger"
"Ledger State Flow"
"Evidence Receipt System"
"Audit-Grade Value Tracking"
```

#### Recommended Enhancements
```typescript
// ENHANCED - Add compliance-specific terms
{
  pageTitle: "Verified Savings Ledger",
  subtitle: "ERISA-Compliant Cost Savings Documentation", // NEW
  
  stateLabels: {
    identified: "Identified Opportunity",
    approved: "Approved Savings (Board-Ready)", // ENHANCED
    realized: "Realized Value (Actualized)", // ENHANCED
    atRisk: "Exception Queue (At-Risk Value)" // ENHANCED
  },
  
  sections: {
    evidence: "Audit Evidence Library", // ENHANCED
    reconciliation: "Savings Reconciliation Report", // NEW
    fiduciary: "Fiduciary Documentation Package" // NEW
  }
}
```

**Implementation Locations:**
- `src/pages/verified-savings-ledger.tsx` - Page headers and descriptions
- `src/components/warroom/WarRoomGrid.tsx` - State labels and lane metadata
- `src/lib/warroom/types.ts` - Type definitions and enums

---

### B. War Room / Controls Dashboard

**Compliance Context:** Internal audit teams need "controls" language; boards need "governance" framing.

#### Current Implementation (war-room/index.tsx)
```typescript
// CURRENT
"War Room - Real-Time Intelligence Platform"
"Four Lane Ledger"
"Ranked Events"
```

#### Recommended Dual-Track Approach
```typescript
// ENHANCED - Support both tactical and compliance views
{
  // For operational users (benefits managers, analysts)
  operationalView: {
    title: "War Room",
    subtitle: "Real-Time Operational Intelligence"
  },
  
  // For compliance/executive users (CFO, audit committee)
  complianceView: {
    title: "Governance & Controls Center", // NEW
    subtitle: "Real-Time Controls Monitoring & Exception Management", // NEW
    alternateTitle: "Enterprise Controls Dashboard" // NEW
  },
  
  // User can toggle view based on role
  toggleLabel: "Switch to Compliance View"
}
```

**Implementation Strategy:**
1. Add role-based terminology switching in `src/components/Nav.tsx`
2. Store user preference in localStorage or user profile
3. Conditional rendering based on `isComplianceView` flag

---

### C. Evidence & Audit Trail

**Compliance Context:** SOX requires 7-year retention; ERISA requires 6-year retention; audit trails must be immutable.

#### Current Implementation (WarRoomGrid.tsx)
```typescript
// CURRENT
"Evidence Receipt"
"Cryptographic Hash"
"Freshness"
```

#### Enhanced Compliance Terminology
```typescript
// ENHANCED
{
  receiptLabels: {
    title: "Audit Evidence Artifact", // ENHANCED
    hash: "Digital Signature (SHA-256)", // ENHANCED
    freshness: "Data Recency Certification", // ENHANCED
    retention: "Retention Period: 7 Years (SOX Compliant)", // NEW
    immutable: "Immutable Audit Trail", // NEW
    custody: "Chain of Custody Verified" // NEW
  },
  
  attestations: {
    verified: "Evidence Verified by: {owner}",
    approved: "Board Approval: {date}",
    archived: "Archived per Retention Policy"
  }
}
```

**Implementation Locations:**
- `src/components/warroom/EvidenceDrawer.tsx` - Evidence detail view
- `src/components/ledger/LedgerDetailModal.tsx` - Receipt metadata
- `src/lib/warroom/types.ts` - EvidenceReceipt type extensions

---

### D. Contract Compliance Monitoring

**Compliance Context:** Procurement policies require vendor performance tracking and contract compliance verification.

#### New Terminology Additions
```typescript
// ADD TO PLATFORM
{
  contractCompliance: {
    monitoring: "Contract Terms Compliance",
    verification: "Rate Card Verification",
    exceptions: "Contract Exception Report",
    sla: "SLA Performance Tracking",
    rebates: "Rebate Reconciliation & Pass-Through Verification"
  },
  
  vendorGovernance: {
    scorecard: "Vendor Performance Scorecard",
    audit: "Vendor Audit Log",
    risk: "Vendor Risk Assessment",
    renewal: "Contract Renewal Alert (90-Day Notice)"
  }
}
```

**New Components Needed:**
- `src/components/compliance/ContractCompliancePanel.tsx`
- `src/components/compliance/VendorScorecard.tsx`
- `src/pages/compliance/contract-monitoring.tsx`

---

### E. Reporting & Dashboards

**Compliance Context:** Board reporting requires specific KPI terminology and audit committee language.

#### Enhanced Report Labels
```typescript
// ENHANCED REPORTING TERMINOLOGY
{
  executiveReports: {
    summary: "Executive Summary - Compliance Status",
    exceptions: "Material Exceptions Report",
    findings: "Internal Audit Findings Summary",
    remediation: "Corrective Action Plan Status"
  },
  
  boardReports: {
    fiduciary: "Fiduciary Compliance Certification",
    controls: "Internal Controls Assessment (SOX 404)",
    vendor: "Vendor Governance Report",
    savings: "Cost Savings Realization Report"
  },
  
  regulatoryReports: {
    erisa: "ERISA Compliance Documentation",
    aca: "ACA Reporting Package (Forms 1094-C/1095-C)",
    hipaa: "HIPAA Business Associate Compliance",
    sox: "SOX 404 Controls Testing Results"
  }
}
```

---

## 3. User Role-Based Terminology

### CFO / Finance Team
**Language:** Value, ROI, reconciliation, realized savings, P&L impact

```typescript
// CFO-FOCUSED LABELS
{
  kpis: [
    "Total Identified Value: $X.XM",
    "Realized Savings (YTD): $X.XM",
    "Savings Realization Rate: XX%",
    "Value at Risk (Exception Queue): $XXK",
    "Average Days to Realization: XX days"
  ],
  
  reports: [
    "Savings Reconciliation Report",
    "Value Realization Dashboard",
    "Exception Queue Summary",
    "Vendor Cost Variance Analysis"
  ]
}
```

### Compliance Officer / Internal Audit
**Language:** Controls, findings, evidence, attestation, remediation

```typescript
// COMPLIANCE-FOCUSED LABELS
{
  kpis: [
    "Control Findings (Open): XX",
    "Exception Items Requiring Review: XX",
    "Evidence Artifacts Verified: XX%",
    "Days to Remediation (Avg): XX",
    "Material Weaknesses: X"
  ],
  
  reports: [
    "Internal Controls Testing Results",
    "Exception Management Report",
    "Audit Evidence Summary",
    "Corrective Action Plan Tracker"
  ]
}
```

### Benefits Leader / HR
**Language:** Plan administration, eligibility, claims, member experience

```typescript
// BENEFITS-FOCUSED LABELS
{
  kpis: [
    "Premium Payment Accuracy: XX%",
    "Eligibility File Reconciliation: XX records",
    "Claims Payment Variance: $XXK",
    "PBM Rebate Pass-Through: $XXK",
    "Vendor SLA Compliance: XX%"
  ],
  
  reports: [
    "Premium Reconciliation Report",
    "Claims Audit Summary",
    "PBM Performance Review",
    "Vendor Performance Scorecard"
  ]
}
```

### General Counsel / Legal
**Language:** Contracts, liability, risk, attestation, compliance status

```typescript
// LEGAL-FOCUSED LABELS
{
  kpis: [
    "Contract Compliance Rate: XX%",
    "Regulatory Violations: X",
    "Vendor Contract Renewals (Next 90 Days): XX",
    "Audit Findings Requiring Legal Review: X",
    "Data Breach Risk Score: Low/Medium/High"
  ],
  
  reports: [
    "Contract Compliance Status Report",
    "Regulatory Compliance Dashboard",
    "Vendor Contract Audit",
    "Legal Risk Assessment"
  ]
}
```

---

## 4. Implementation Checklist

### Phase 1: Core Platform (Immediate)
- [ ] Update `laneMeta` in `WarRoomGrid.tsx` with compliance-aligned labels
- [ ] Add compliance terminology to `verified-savings-ledger.tsx` page
- [ ] Enhance `EvidenceReceipt` type with audit-specific fields
- [ ] Update navigation labels in `Nav.tsx` with role-based options
- [ ] Add "Compliance View" toggle for executive users

### Phase 2: Reporting & Documentation (Near-term)
- [ ] Create "Fiduciary Documentation Package" export feature
- [ ] Add "Savings Reconciliation Report" template
- [ ] Build "Internal Controls Testing Report" template
- [ ] Implement "Exception Queue" filtered view
- [ ] Add retention period labels to all evidence artifacts

### Phase 3: Advanced Features (Medium-term)
- [ ] Contract compliance monitoring module
- [ ] Vendor performance scorecard component
- [ ] Regulatory reporting templates (ERISA, SOX, ACA)
- [ ] Board-ready presentation builder
- [ ] Audit trail export (PDF, Excel) with compliance attestation

---

## 5. Style Guide for Compliance Communications

### Writing Rules

1. **Use Present Tense & Active Voice**
   - ✅ "Evidence verified by Finance Team"
   - ❌ "Evidence was verified"

2. **Avoid Jargon, Define Acronyms**
   - ✅ "ERISA (Employee Retirement Income Security Act) Compliance"
   - ❌ "ERISA Compliance" (without definition on first use)

3. **Be Specific with Numbers**
   - ✅ "94.2% evidence verification rate"
   - ❌ "High verification rate"

4. **Use Status Labels Consistently**
   - Open → Identified
   - In Review → Under Review
   - Approved → Approved (Board-Ready)
   - Closed → Realized
   - At Risk → Exception Queue

5. **Emphasize Auditability**
   - Always mention: "Audit trail preserved" or "SOX-compliant retention"
   - Include timestamps: "Last verified: 2026-02-22 17:45 UTC"
   - Reference retention: "Archived per 7-year retention policy"

---

## 6. API Response Terminology

### Current vs. Enhanced
```typescript
// CURRENT API RESPONSE
{
  "event_id": "evt_123",
  "title": "Premium overcharge detected",
  "state": "IDENTIFIED"
}

// ENHANCED COMPLIANCE RESPONSE
{
  "finding_id": "ctrl_find_123", // Changed from event_id
  "control_description": "Premium Payment Verification", // NEW
  "exception_title": "Premium overcharge detected", // Changed from title
  "status": "OPEN", // Changed from state
  "control_owner": "Finance Operations", // NEW
  "severity": "HIGH", // Enhanced
  "compliance_impact": "Material - ERISA fiduciary duty", // NEW
  "remediation_due_date": "2026-03-15", // NEW
  "audit_trail": {
    "created_at": "2026-02-22T17:45:00Z",
    "created_by": "system",
    "last_modified_at": "2026-02-22T17:45:00Z",
    "last_modified_by": "finance_ops",
    "retention_expires": "2033-02-22T17:45:00Z" // 7 years
  }
}
```

---

## 7. Search & Filter Terminology

### Filter Labels (Enhanced)
```typescript
{
  filters: {
    // Current
    "state": "Status",
    "lane": "Category",
    
    // Enhanced Compliance Filters
    "control_owner": "Control Owner",
    "severity": "Materiality Level", // Not just "severity"
    "compliance_framework": "Regulatory Framework", // NEW
    "remediation_status": "Corrective Action Status", // NEW
    "audit_period": "Audit Period", // NEW
    "retention_bucket": "Retention Category" // NEW
  },
  
  filterOptions: {
    compliance_framework: [
      "ERISA - Fiduciary Duty",
      "SOX 404 - Internal Controls",
      "HIPAA - Privacy & Security",
      "ACA - Reporting Requirements",
      "State Privacy Laws (CPRA/CDPA)"
    ],
    
    severity: [
      "Material Weakness",
      "Significant Deficiency",
      "Control Deficiency",
      "Observation"
    ]
  }
}
```

---

## 8. Help Text & Tooltips

### Compliance-Aware Help Text
```typescript
{
  tooltips: {
    "evidence_quality_score": {
      label: "Evidence Quality Score",
      helpText: "Measures completeness and reliability of audit evidence per ERISA documentation standards. Score ≥85% = Board-ready; ≥70% = Acceptable; <70% = Requires additional evidence.",
      learnMoreUrl: "/docs/evidence-standards"
    },
    
    "savings_realization_rate": {
      label: "Savings Realization Rate",
      helpText: "Percentage of approved savings that have been actualized and verified. CFOs typically target 75-85% realization within 12 months of approval.",
      benchmark: "Industry Average: 68% (Source: Deloitte Benefits Survey 2025)"
    },
    
    "retention_period": {
      label: "Retention Period",
      helpText: "Required document retention per SOX (7 years) and ERISA (6 years). Platform automatically archives evidence per the longer retention requirement.",
      compliance: "SOX 802 / ERISA §107"
    }
  }
}
```

---

## 9. Error Messages (Compliance-Aware)

### Before (Generic)
```typescript
"Action failed. Please try again."
"Invalid input."
"Permission denied."
```

### After (Compliance-Context)
```typescript
{
  errors: {
    approvalWithoutEvidence: {
      title: "Approval Blocked - Insufficient Evidence",
      message: "Cannot approve this item without verified audit evidence. ERISA fiduciary standards require documented support for all cost savings claims.",
      action: "Attach evidence artifacts before approving.",
      learnMore: "/docs/fiduciary-standards"
    },
    
    retentionViolation: {
      title: "Retention Policy Violation",
      message: "Cannot delete this evidence. SOX 802 requires 7-year retention of all financial documentation.",
      action: "Evidence will be automatically archived per retention schedule.",
      compliance: "SOX Section 802 (2002)"
    },
    
    unauthorizedAccess: {
      title: "Access Control - Insufficient Permissions",
      message: "Your role does not have access to audit evidence for this control area. Contact your Compliance Officer to request access.",
      action: "Request access via governance workflow.",
      policy: "Segregation of Duties Policy §4.2"
    }
  }
}
```

---

## 10. Implementation Code Examples

### A. Role-Based Terminology Component

```typescript
// NEW FILE: src/lib/compliance/terminology.ts

export type UserRole = "cfo" | "compliance" | "benefits" | "legal" | "analyst";

export const complianceTerminology = {
  eventLabel: {
    cfo: "Value Item",
    compliance: "Control Finding",
    benefits: "Plan Exception",
    legal: "Contract Variance",
    analyst: "Event"
  },
  
  stateLabel: {
    IDENTIFIED: {
      cfo: "Identified Opportunity",
      compliance: "Open Finding",
      benefits: "Under Review",
      legal: "Open Issue",
      analyst: "Identified"
    },
    APPROVED: {
      cfo: "Approved Savings",
      compliance: "Approved for Remediation",
      benefits: "Action Approved",
      legal: "Legal Review Complete",
      analyst: "Approved"
    },
    REALIZED: {
      cfo: "Realized Value",
      compliance: "Finding Closed",
      benefits: "Resolved",
      legal: "Matter Closed",
      analyst: "Realized"
    },
    AT_RISK: {
      cfo: "Value at Risk",
      compliance: "Exception Queue",
      benefits: "Escalation Required",
      legal: "Legal Risk",
      analyst: "At Risk"
    }
  }
};

export function getTerminology(
  role: UserRole,
  termKey: keyof typeof complianceTerminology
) {
  return complianceTerminology[termKey]?.[role] ?? complianceTerminology[termKey]?.analyst;
}
```

### B. Enhanced Evidence Receipt Component

```typescript
// UPDATED: src/lib/warroom/types.ts

export type EvidenceReceipt = {
  // Core Identifiers
  receipt_id: string;
  
  // Audit Trail (Enhanced)
  created_at: string;
  created_by: string;
  last_verified_at: string;
  verified_by: string;
  retention_expires_at: string; // NEW - 7 years from creation
  
  // Evidence Metadata
  source_artifact_hash: string; // SHA-256
  transform_hash?: string;
  data_lineage: string[]; // NEW - Source system → Transform → Output
  
  // Quality Metrics
  freshness_minutes: number;
  dq_tests_passed: number;
  dq_tests_total: number;
  evidence_quality_score: number; // NEW - 0-100
  
  // Ownership & Attestation
  control_owner: string; // NEW - Replaces generic "owner"
  attestation_statement?: string; // NEW - "I attest that this evidence is complete and accurate"
  attested_by?: string;
  attested_at?: string;
  
  // Compliance Context
  compliance_framework?: string[]; // NEW - ["ERISA", "SOX 404"]
  materiality_level?: "Material" | "Significant" | "Control Deficiency" | "Observation";
  
  // Existing fields
  confidence: number;
  verified: boolean;
  notes?: string;
};
```

### C. Update WarRoomGrid with Compliance Labels

```typescript
// UPDATED: src/components/warroom/WarRoomGrid.tsx (partial)

const laneMeta: Record<LaneKey, { 
  label: string; 
  headline: string; 
  color: string; 
  bgGradient: string;
  complianceLabel: string; // NEW
  complianceHeadline: string; // NEW
}> = {
  value: { 
    label: "Verified Savings Ledger", 
    headline: "Reconcile value with receipts and owners.",
    color: "emerald",
    bgGradient: "from-emerald-500/10 to-emerald-600/5",
    complianceLabel: "Cost Savings Controls", // NEW
    complianceHeadline: "ERISA-compliant savings documentation with audit trail." // NEW
  },
  controls: { 
    label: "Controls & Compliance", 
    headline: "Continuous controls. Evidence-first posture.",
    color: "blue",
    bgGradient: "from-blue-500/10 to-blue-600/5",
    complianceLabel: "Internal Controls Monitoring", // NEW
    complianceHeadline: "SOX 404 control testing with automated exception management." // NEW
  },
  // ... etc
};

// In component, use conditional rendering:
const isComplianceView = useComplianceView(); // Custom hook

<h3 className="text-xl font-semibold">
  {isComplianceView ? meta.complianceLabel : meta.label}
</h3>
<p className="text-sm text-white/60 mt-1">
  {isComplianceView ? meta.complianceHeadline : meta.headline}
</p>
```

---

## 11. Quick Reference: Terminology Glossary

| Platform Term | Compliance Equivalent | Definition |
|---------------|----------------------|------------|
| **Event** | Control Finding / Exception Item | A detected variance or opportunity requiring review |
| **Receipt** | Audit Evidence Artifact | Documented proof supporting a claim or finding |
| **Owner** | Control Owner / Accountable Party | Individual responsible for remediation |
| **State** | Status / Finding Status | Current lifecycle stage of an exception |
| **Confidence** | Evidence Quality Score / Assurance Level | Reliability of supporting evidence (0-100%) |
| **Lane** | Control Domain / Category | Functional area (financial, operational, compliance) |
| **Ticket** | Finding Summary / Alert | Brief description of exception for quick review |
| **At Risk** | Exception Queue / Remediation Overdue | Items requiring escalation or intervention |
| **Realized** | Finding Closed / Value Actualized | Completed and verified outcome |
| **Velocity** | Remediation Rate / Throughput | Speed of exception resolution |

---

## 12. Next Steps

### Immediate Actions
1. **Create terminology toggle**: Add `useComplianceView()` hook in `src/hooks/`
2. **Update type definitions**: Extend `EvidenceReceipt` in `types.ts`
3. **Enhance page headers**: Update `verified-savings-ledger.tsx` and `war-room/index.tsx`
4. **Add role detection**: Implement user role detection in auth context

### Near-term Priorities
5. **Build compliance reports**: Create board-ready export templates
6. **Add retention labels**: Display retention periods on all evidence
7. **Implement contract monitoring**: New compliance module for vendor contracts
8. **Create fiduciary package**: One-click export for ERISA compliance

### Long-term Roadmap
9. **Regulatory reporting**: Pre-built templates for ERISA, SOX, ACA
10. **Audit workflow**: Integrated audit preparation and response tools
11. **Benchmarking**: Industry comparisons with compliance-specific metrics
12. **Certification tracking**: Vendor SOC 2, ISO, HIPAA certification monitoring

---

## Conclusion

Implementing correct compliance terminology is critical for enterprise adoption. By mapping our platform features to the language of CFOs, compliance officers, and audit committees, we:

1. **Build credibility** with enterprise buyers
2. **Reduce friction** in sales conversations
3. **Accelerate adoption** by speaking their language
4. **Enable self-service** with familiar terms
5. **Support compliance workflows** with audit-ready documentation

Start with the **Phase 1 checklist** above, prioritizing user-facing labels in `WarRoomGrid.tsx`, `verified-savings-ledger.tsx`, and navigation components.

---

**Document Version**: 1.0  
**Last Updated**: 2026-02-22  
**Prepared for**: SiriusB iQ Engineering & Product Teams