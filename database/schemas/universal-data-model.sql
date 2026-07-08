-- KINCAID HEALTH™ INTELLIGENCE KERNEL
-- Universal Enterprise Data Model
-- Complete schema for multi-tenant intelligence platform

-- ============================================================================
-- MULTI-TENANT ARCHITECTURE
-- ============================================================================

CREATE TABLE organizations (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    industry VARCHAR,
    employee_count INTEGER,
    tier VARCHAR DEFAULT 'professional',  -- free, professional, enterprise
    features JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_organizations_tier ON organizations(tier);
CREATE INDEX idx_organizations_is_active ON organizations(is_active);

-- ============================================================================
-- AUTHENTICATION & AUTHORIZATION
-- ============================================================================

CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    organization_id VARCHAR NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    email VARCHAR UNIQUE NOT NULL,
    hashed_password VARCHAR NOT NULL,
    full_name VARCHAR,
    role VARCHAR DEFAULT 'analyst',  -- admin, analyst, viewer, executive
    permissions JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT TRUE,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_organization ON users(organization_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================================================
-- DATA FABRIC
-- ============================================================================

CREATE TABLE datasets (
    id VARCHAR PRIMARY KEY,
    organization_id VARCHAR NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR,
    source VARCHAR,
    rows INTEGER,
    quality_score INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_datasets_organization ON datasets(organization_id);

CREATE TABLE metrics (
    id SERIAL PRIMARY KEY,
    dataset_id VARCHAR REFERENCES datasets(id) ON DELETE CASCADE,
    name VARCHAR,
    value FLOAT,
    category VARCHAR
);

CREATE INDEX idx_metrics_dataset ON metrics(dataset_id);
CREATE INDEX idx_metrics_category ON metrics(category);

-- ============================================================================
-- HEALTHCARE CLAIMS
-- ============================================================================

CREATE TABLE claims (
    id VARCHAR PRIMARY KEY,
    organization_id VARCHAR NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    dataset_id VARCHAR REFERENCES datasets(id) ON DELETE CASCADE,
    
    -- Identification
    claim_id VARCHAR NOT NULL,
    claim_type VARCHAR,  -- medical, pharmacy
    member_id VARCHAR,
    
    -- Financial
    billed_amount FLOAT,
    allowed_amount FLOAT,
    paid_amount FLOAT,
    member_responsibility FLOAT,
    
    -- Dates
    service_date DATE,
    paid_date DATE,
    
    -- Clinical
    diagnosis_codes JSONB,  -- Array of ICD-10 codes
    procedure_codes JSONB,  -- Array of CPT/HCPCS codes
    ndc_code VARCHAR,  -- For pharmacy claims
    
    -- Provider
    provider_id VARCHAR,
    provider_name VARCHAR,
    provider_specialty VARCHAR,
    
    -- Status
    claim_status VARCHAR,  -- paid, denied, pending
    
    -- Metadata
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_claims_organization ON claims(organization_id);
CREATE INDEX idx_claims_dataset ON claims(dataset_id);
CREATE INDEX idx_claims_claim_id ON claims(claim_id);
CREATE INDEX idx_claims_member_id ON claims(member_id);
CREATE INDEX idx_claims_service_date ON claims(service_date);
CREATE INDEX idx_claims_claim_type ON claims(claim_type);

-- ============================================================================
-- VENDORS
-- ============================================================================

CREATE TABLE vendors (
    id VARCHAR PRIMARY KEY,
    organization_id VARCHAR NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Identification
    vendor_name VARCHAR NOT NULL,
    vendor_type VARCHAR,  -- pbm, tpa, broker, consultant, network, stop_loss
    
    -- Contact
    contact_name VARCHAR,
    contact_email VARCHAR,
    contact_phone VARCHAR,
    
    -- Performance
    performance_score FLOAT,
    performance_metrics JSONB,
    
    -- Financial
    total_spend FLOAT,
    savings_claimed FLOAT,
    savings_validated FLOAT,
    
    -- Risk
    risk_score FLOAT,
    risk_factors JSONB,
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Metadata
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_vendors_organization ON vendors(organization_id);
CREATE INDEX idx_vendors_type ON vendors(vendor_type);
CREATE INDEX idx_vendors_is_active ON vendors(is_active);

-- ============================================================================
-- CONTRACTS
-- ============================================================================

CREATE TABLE contracts (
    id VARCHAR PRIMARY KEY,
    organization_id VARCHAR NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    vendor_id VARCHAR REFERENCES vendors(id) ON DELETE SET NULL,
    
    -- Identification
    contract_number VARCHAR,
    contract_type VARCHAR,  -- pbm, tpa, stop_loss, medical_network, pharmacy_network
    contract_name VARCHAR,
    
    -- Dates
    effective_date DATE,
    termination_date DATE,
    renewal_date DATE,
    
    -- Financial terms
    admin_fee FLOAT,
    admin_fee_type VARCHAR,  -- PEPM, percentage, flat
    
    -- Guarantees & Performance
    guarantees JSONB,
    performance_metrics JSONB,
    
    -- Document
    document_url VARCHAR,
    document_text TEXT,  -- Extracted text from PDF
    clauses JSONB,  -- Extracted clauses
    
    -- Risk assessment
    risk_score FLOAT,
    risk_factors JSONB,
    
    -- Status
    status VARCHAR DEFAULT 'active',  -- active, expired, terminated, pending
    
    -- Metadata
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contracts_organization ON contracts(organization_id);
CREATE INDEX idx_contracts_vendor ON contracts(vendor_id);
CREATE INDEX idx_contracts_contract_number ON contracts(contract_number);
CREATE INDEX idx_contracts_type ON contracts(contract_type);
CREATE INDEX idx_contracts_status ON contracts(status);
CREATE INDEX idx_contracts_effective_date ON contracts(effective_date);

-- ============================================================================
-- EVIDENCE OBJECTS (IntelligenceObject Pattern)
-- ============================================================================

CREATE TABLE evidence_objects (
    id VARCHAR PRIMARY KEY,
    organization_id VARCHAR NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    
    -- Classification
    object_type VARCHAR NOT NULL,  -- finding, recommendation, decision, risk, model, report
    object_category VARCHAR,  -- financial, clinical, operational, compliance
    
    -- Core content
    title VARCHAR NOT NULL,
    description TEXT,
    
    -- Intelligence metadata
    confidence_score FLOAT,  -- 0.0 to 1.0
    confidence_level VARCHAR,  -- very_low, low, medium, high, very_high
    
    -- Financial impact
    financial_impact_min FLOAT,
    financial_impact_expected FLOAT,
    financial_impact_max FLOAT,
    
    -- Risk assessment
    risk_score FLOAT,  -- 0.0 to 1.0
    risk_level VARCHAR,  -- minimal, low, medium, high, critical
    
    -- Provenance
    source_type VARCHAR,  -- data, model, agent, user, external
    source_id VARCHAR,
    evidence_chain JSONB,  -- Array of evidence sources
    
    -- Relationships
    related_objects JSONB,  -- Array of related evidence object IDs
    contract_id VARCHAR REFERENCES contracts(id) ON DELETE SET NULL,
    
    -- Agent attribution
    agent_name VARCHAR,  -- Which AI agent generated this
    agent_version VARCHAR,
    
    -- Review status
    review_status VARCHAR DEFAULT 'pending',  -- pending, reviewed, approved, rejected
    reviewed_by VARCHAR,  -- User ID
    reviewed_at TIMESTAMP,
    
    -- Version control
    version INTEGER DEFAULT 1,
    previous_version_id VARCHAR REFERENCES evidence_objects(id) ON DELETE SET NULL,
    
    -- Full data payload
    data JSONB,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP  -- For time-sensitive findings
);

CREATE INDEX idx_evidence_organization ON evidence_objects(organization_id);
CREATE INDEX idx_evidence_object_type ON evidence_objects(object_type);
CREATE INDEX idx_evidence_object_category ON evidence_objects(object_category);
CREATE INDEX idx_evidence_contract ON evidence_objects(contract_id);
CREATE INDEX idx_evidence_agent_name ON evidence_objects(agent_name);
CREATE INDEX idx_evidence_review_status ON evidence_objects(review_status);
CREATE INDEX idx_evidence_confidence_score ON evidence_objects(confidence_score);
CREATE INDEX idx_evidence_risk_score ON evidence_objects(risk_score);
CREATE INDEX idx_evidence_created_at ON evidence_objects(created_at);

-- ============================================================================
-- AUDIT TRAIL
-- ============================================================================

CREATE TABLE audit_logs (
    id VARCHAR PRIMARY KEY,
    
    -- Actor
    user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
    actor_type VARCHAR,  -- user, agent, system
    actor_name VARCHAR,
    
    -- Action
    action VARCHAR NOT NULL,  -- create, read, update, delete, approve, reject, execute
    action_category VARCHAR,  -- data, analysis, decision, system, security
    
    -- Target
    target_type VARCHAR,  -- dataset, evidence_object, contract, user, organization
    target_id VARCHAR,
    evidence_object_id VARCHAR REFERENCES evidence_objects(id) ON DELETE SET NULL,
    
    -- Details
    description TEXT,
    before_state JSONB,  -- State before action
    after_state JSONB,  -- State after action
    
    -- Context
    request_id VARCHAR,  -- Trace ID for related actions
    ip_address VARCHAR,
    user_agent VARCHAR,
    
    -- Metadata
    metadata JSONB,
    
    -- Timestamp
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_actor_type ON audit_logs(actor_type);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_action_category ON audit_logs(action_category);
CREATE INDEX idx_audit_target_type ON audit_logs(target_type);
CREATE INDEX idx_audit_evidence_object ON audit_logs(evidence_object_id);
CREATE INDEX idx_audit_created_at ON audit_logs(created_at);
CREATE INDEX idx_audit_request_id ON audit_logs(request_id);

-- ============================================================================
-- DASHBOARDS
-- ============================================================================

CREATE TABLE dashboards (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    dashboard_type VARCHAR,
    config JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- PERFORMANCE OPTIMIZATION
-- ============================================================================

-- Analyze tables for query optimization
ANALYZE organizations;
ANALYZE users;
ANALYZE datasets;
ANALYZE claims;
ANALYZE vendors;
ANALYZE contracts;
ANALYZE evidence_objects;
ANALYZE audit_logs;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE organizations IS 'Multi-tenant organization entities';
COMMENT ON TABLE users IS 'User authentication and authorization';
COMMENT ON TABLE datasets IS 'Uploaded data files and their metadata';
COMMENT ON TABLE claims IS 'Healthcare claims (medical + pharmacy)';
COMMENT ON TABLE vendors IS 'Third-party service providers (PBM, TPA, etc.)';
COMMENT ON TABLE contracts IS 'Vendor contracts with terms and performance metrics';
COMMENT ON TABLE evidence_objects IS 'Universal IntelligenceObject pattern - findings, recommendations, decisions, risks';
COMMENT ON TABLE audit_logs IS 'Complete activity tracking for compliance and governance';

-- ============================================================================
-- END SCHEMA
-- ============================================================================