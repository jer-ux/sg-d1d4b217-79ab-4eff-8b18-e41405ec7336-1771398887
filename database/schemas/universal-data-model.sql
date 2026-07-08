-- =============================================================================
-- KINCAID HEALTH™ AIOS
-- UNIVERSAL DATA MODEL
-- Enterprise Entity Hierarchy & Relationships
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- LEVEL 1: ORGANIZATION (Root Entity)
-- =============================================================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- 'enterprise', 'holding_company', 'subsidiary'
  industry TEXT,
  headquarters_location TEXT,
  employee_count INTEGER,
  revenue_annual DECIMAL(15,2),
  fiscal_year_end DATE,
  tax_id TEXT,
  duns_number TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID,
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_organizations_type ON organizations(type);
CREATE INDEX idx_organizations_industry ON organizations(industry);

-- =============================================================================
-- LEVEL 2: DIVISIONS (Business Units)
-- =============================================================================

CREATE TABLE divisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  division_code TEXT,
  region TEXT,
  head_count INTEGER,
  budget_annual DECIMAL(15,2),
  
  -- Hierarchy
  parent_division_id UUID REFERENCES divisions(id),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_divisions_org ON divisions(organization_id);
CREATE INDEX idx_divisions_parent ON divisions(parent_division_id);

-- =============================================================================
-- LEVEL 3: DEPARTMENTS (Functional Areas)
-- =============================================================================

CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  division_id UUID NOT NULL REFERENCES divisions(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  department_code TEXT,
  function TEXT, -- 'operations', 'finance', 'hr', 'legal', 'technology'
  cost_center TEXT,
  head_count INTEGER,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_departments_division ON departments(division_id);
CREATE INDEX idx_departments_function ON departments(function);

-- =============================================================================
-- LEVEL 4: EMPLOYEES (People)
-- =============================================================================

CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID REFERENCES departments(id),
  
  -- Identity
  employee_number TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  
  -- Employment
  job_title TEXT,
  employment_status TEXT, -- 'active', 'inactive', 'terminated', 'leave'
  hire_date DATE,
  termination_date DATE,
  salary_annual DECIMAL(12,2),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_employees_dept ON employees(department_id);
CREATE INDEX idx_employees_status ON employees(employment_status);
CREATE INDEX idx_employees_number ON employees(employee_number);

-- =============================================================================
-- LEVEL 5: PLANS (Benefit Plans)
-- =============================================================================

CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  
  -- Plan Details
  plan_name TEXT NOT NULL,
  plan_type TEXT, -- 'medical', 'dental', 'vision', 'pharmacy', 'disability', 'life'
  plan_year INTEGER,
  effective_date DATE,
  termination_date DATE,
  
  -- Financial
  premium_total DECIMAL(15,2),
  deductible DECIMAL(10,2),
  out_of_pocket_max DECIMAL(10,2),
  
  -- Enrollment
  covered_lives INTEGER,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_plans_org ON plans(organization_id);
CREATE INDEX idx_plans_type ON plans(plan_type);
CREATE INDEX idx_plans_year ON plans(plan_year);

-- =============================================================================
-- LEVEL 6: CLAIMS (Healthcare Claims)
-- =============================================================================

CREATE TABLE claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID NOT NULL REFERENCES plans(id),
  employee_id UUID REFERENCES employees(id),
  
  -- Claim Identity
  claim_number TEXT UNIQUE NOT NULL,
  claim_type TEXT, -- 'medical', 'pharmacy', 'dental', 'vision'
  claim_status TEXT, -- 'pending', 'approved', 'denied', 'paid'
  
  -- Dates
  service_date DATE,
  received_date DATE,
  processed_date DATE,
  paid_date DATE,
  
  -- Financial
  billed_amount DECIMAL(12,2),
  allowed_amount DECIMAL(12,2),
  paid_amount DECIMAL(12,2),
  member_responsibility DECIMAL(12,2),
  
  -- Clinical
  diagnosis_codes TEXT[],
  procedure_codes TEXT[],
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_claims_plan ON claims(plan_id);
CREATE INDEX idx_claims_employee ON claims(employee_id);
CREATE INDEX idx_claims_number ON claims(claim_number);
CREATE INDEX idx_claims_status ON claims(claim_status);
CREATE INDEX idx_claims_service_date ON claims(service_date);

-- =============================================================================
-- LEVEL 7: CONTRACTS (Agreements)
-- =============================================================================

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  
  -- Contract Identity
  contract_number TEXT UNIQUE NOT NULL,
  contract_type TEXT, -- 'pbm', 'stop_loss', 'tpa', 'provider', 'vendor'
  contract_status TEXT, -- 'draft', 'active', 'expired', 'terminated'
  
  -- Parties
  vendor_id UUID,
  
  -- Terms
  effective_date DATE,
  termination_date DATE,
  auto_renewal BOOLEAN DEFAULT FALSE,
  notice_days INTEGER,
  
  -- Financial
  contract_value_annual DECIMAL(15,2),
  
  -- Documents
  document_url TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_contracts_org ON contracts(organization_id);
CREATE INDEX idx_contracts_vendor ON contracts(vendor_id);
CREATE INDEX idx_contracts_type ON contracts(contract_type);
CREATE INDEX idx_contracts_status ON contracts(contract_status);

-- =============================================================================
-- LEVEL 8: VENDORS (Suppliers/Partners)
-- =============================================================================

CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Identity
  vendor_name TEXT NOT NULL,
  vendor_type TEXT, -- 'pbm', 'carrier', 'tpa', 'provider', 'consultant'
  tax_id TEXT,
  duns_number TEXT,
  
  -- Contact
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  
  -- Performance
  performance_score DECIMAL(5,2),
  risk_rating TEXT, -- 'low', 'medium', 'high'
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_vendors_type ON vendors(vendor_type);
CREATE INDEX idx_vendors_risk ON vendors(risk_rating);

-- =============================================================================
-- LEVEL 9: INVOICES (Billing Documents)
-- =============================================================================

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  contract_id UUID REFERENCES contracts(id),
  vendor_id UUID NOT NULL REFERENCES vendors(id),
  
  -- Invoice Identity
  invoice_number TEXT UNIQUE NOT NULL,
  invoice_status TEXT, -- 'pending', 'approved', 'paid', 'disputed'
  
  -- Dates
  invoice_date DATE,
  due_date DATE,
  paid_date DATE,
  
  -- Financial
  invoice_amount DECIMAL(15,2),
  paid_amount DECIMAL(15,2),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_invoices_contract ON invoices(contract_id);
CREATE INDEX idx_invoices_vendor ON invoices(vendor_id);
CREATE INDEX idx_invoices_status ON invoices(invoice_status);
CREATE INDEX idx_invoices_date ON invoices(invoice_date);

-- =============================================================================
-- LEVEL 10: PAYMENTS (Transactions)
-- =============================================================================

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id UUID REFERENCES invoices(id),
  
  -- Payment Identity
  payment_number TEXT UNIQUE NOT NULL,
  payment_method TEXT, -- 'ach', 'wire', 'check', 'card'
  payment_status TEXT, -- 'pending', 'completed', 'failed', 'reversed'
  
  -- Dates
  payment_date DATE,
  cleared_date DATE,
  
  -- Financial
  payment_amount DECIMAL(15,2),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_payments_invoice ON payments(invoice_id);
CREATE INDEX idx_payments_status ON payments(payment_status);
CREATE INDEX idx_payments_date ON payments(payment_date);

-- =============================================================================
-- LEVEL 11: DRUGS (Pharmaceuticals)
-- =============================================================================

CREATE TABLE drugs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Drug Identity
  ndc TEXT UNIQUE NOT NULL,
  drug_name TEXT NOT NULL,
  generic_name TEXT,
  brand_name TEXT,
  
  -- Classification
  therapeutic_class TEXT,
  drug_class TEXT,
  controlled_substance BOOLEAN DEFAULT FALSE,
  
  -- Pricing
  awp DECIMAL(10,2),
  wac DECIMAL(10,2),
  nadac DECIMAL(10,2),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_drugs_ndc ON drugs(ndc);
CREATE INDEX idx_drugs_therapeutic_class ON drugs(therapeutic_class);

-- =============================================================================
-- LEVEL 12: PROVIDERS (Healthcare Providers)
-- =============================================================================

CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Provider Identity
  npi TEXT UNIQUE,
  provider_name TEXT NOT NULL,
  provider_type TEXT, -- 'physician', 'hospital', 'facility', 'pharmacy'
  specialty TEXT,
  
  -- Contact
  address TEXT,
  phone TEXT,
  
  -- Network
  network_status TEXT, -- 'in_network', 'out_of_network', 'preferred'
  
  -- Performance
  quality_score DECIMAL(5,2),
  cost_efficiency_score DECIMAL(5,2),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_providers_npi ON providers(npi);
CREATE INDEX idx_providers_type ON providers(provider_type);
CREATE INDEX idx_providers_network ON providers(network_status);

-- =============================================================================
-- LEVEL 13: BENEFITS (Coverage)
-- =============================================================================

CREATE TABLE benefits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID NOT NULL REFERENCES plans(id),
  
  -- Benefit Details
  benefit_name TEXT NOT NULL,
  benefit_type TEXT, -- 'medical', 'pharmacy', 'preventive', 'mental_health'
  
  -- Coverage
  coverage_level TEXT, -- 'individual', 'family'
  deductible DECIMAL(10,2),
  coinsurance DECIMAL(5,2),
  copay DECIMAL(7,2),
  out_of_pocket_max DECIMAL(10,2),
  
  -- Limits
  annual_limit DECIMAL(12,2),
  lifetime_limit DECIMAL(12,2),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_benefits_plan ON benefits(plan_id);
CREATE INDEX idx_benefits_type ON benefits(benefit_type);

-- =============================================================================
-- LEVEL 14: FINANCIAL STATEMENTS (Accounting)
-- =============================================================================

CREATE TABLE financial_statements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  
  -- Statement Identity
  statement_type TEXT NOT NULL, -- 'income', 'balance_sheet', 'cash_flow'
  fiscal_period TEXT, -- '2024-Q1', '2024-Q2', '2024'
  statement_date DATE,
  
  -- Financial Data (stored as JSONB for flexibility)
  line_items JSONB,
  
  -- Status
  status TEXT, -- 'draft', 'final', 'audited'
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_financial_statements_org ON financial_statements(organization_id);
CREATE INDEX idx_financial_statements_type ON financial_statements(statement_type);
CREATE INDEX idx_financial_statements_period ON financial_statements(fiscal_period);

-- =============================================================================
-- LEVEL 15: POLICIES (Rules/Guidelines)
-- =============================================================================

CREATE TABLE policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  
  -- Policy Identity
  policy_name TEXT NOT NULL,
  policy_type TEXT, -- 'benefits', 'compliance', 'governance', 'security'
  policy_number TEXT UNIQUE,
  
  -- Content
  policy_text TEXT,
  policy_url TEXT,
  
  -- Lifecycle
  effective_date DATE,
  review_date DATE,
  status TEXT, -- 'draft', 'active', 'retired'
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_policies_org ON policies(organization_id);
CREATE INDEX idx_policies_type ON policies(policy_type);
CREATE INDEX idx_policies_status ON policies(status);

-- =============================================================================
-- LEVEL 16: AI MODELS (Machine Learning Models)
-- =============================================================================

CREATE TABLE ai_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Model Identity
  model_name TEXT NOT NULL,
  model_type TEXT, -- 'classification', 'regression', 'forecasting', 'clustering'
  model_version TEXT,
  
  -- Purpose
  use_case TEXT,
  target_variable TEXT,
  
  -- Performance
  accuracy DECIMAL(5,4),
  precision_score DECIMAL(5,4),
  recall DECIMAL(5,4),
  f1_score DECIMAL(5,4),
  
  -- Training
  training_date TIMESTAMPTZ,
  training_records INTEGER,
  features JSONB,
  
  -- Deployment
  deployment_status TEXT, -- 'development', 'staging', 'production', 'retired'
  deployment_date TIMESTAMPTZ,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_ai_models_type ON ai_models(model_type);
CREATE INDEX idx_ai_models_status ON ai_models(deployment_status);

-- =============================================================================
-- LEVEL 17: RISKS (Exposures)
-- =============================================================================

CREATE TABLE risks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  
  -- Risk Identity
  risk_name TEXT NOT NULL,
  risk_type TEXT, -- 'financial', 'operational', 'compliance', 'strategic', 'clinical'
  risk_category TEXT,
  
  -- Assessment
  likelihood TEXT, -- 'low', 'medium', 'high'
  impact TEXT, -- 'low', 'medium', 'high', 'critical'
  risk_score DECIMAL(5,2),
  
  -- Financial Impact
  potential_loss_min DECIMAL(15,2),
  potential_loss_max DECIMAL(15,2),
  
  -- Status
  risk_status TEXT, -- 'identified', 'assessed', 'mitigated', 'accepted', 'transferred'
  
  -- Ownership
  owner_id UUID,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_risks_org ON risks(organization_id);
CREATE INDEX idx_risks_type ON risks(risk_type);
CREATE INDEX idx_risks_status ON risks(risk_status);

-- =============================================================================
-- LEVEL 18: CONTROLS (Mitigations)
-- =============================================================================

CREATE TABLE controls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  risk_id UUID REFERENCES risks(id),
  
  -- Control Identity
  control_name TEXT NOT NULL,
  control_type TEXT, -- 'preventive', 'detective', 'corrective'
  control_category TEXT,
  
  -- Effectiveness
  effectiveness TEXT, -- 'effective', 'partially_effective', 'ineffective'
  test_date DATE,
  test_result TEXT,
  
  -- Ownership
  owner_id UUID,
  
  -- Status
  control_status TEXT, -- 'designed', 'implemented', 'operating', 'retired'
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_controls_risk ON controls(risk_id);
CREATE INDEX idx_controls_type ON controls(control_type);
CREATE INDEX idx_controls_status ON controls(control_status);

-- =============================================================================
-- LEVEL 19: RECOMMENDATIONS (Actions)
-- =============================================================================

CREATE TABLE recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  
  -- Recommendation Identity
  recommendation_title TEXT NOT NULL,
  recommendation_type TEXT, -- 'cost_savings', 'risk_reduction', 'process_improvement', 'compliance'
  priority TEXT, -- 'low', 'medium', 'high', 'critical'
  
  -- Content
  description TEXT,
  rationale TEXT,
  implementation_steps JSONB,
  
  -- Impact
  estimated_savings DECIMAL(15,2),
  estimated_roi DECIMAL(5,2),
  risk_reduction_score DECIMAL(5,2),
  
  -- Timeline
  recommended_date DATE,
  target_implementation_date DATE,
  actual_implementation_date DATE,
  
  -- Source
  source TEXT, -- 'ai_agent', 'human_analyst', 'automated_rule'
  source_agent TEXT,
  confidence_score DECIMAL(5,2),
  
  -- Status
  status TEXT, -- 'proposed', 'approved', 'in_progress', 'implemented', 'rejected'
  
  -- Ownership
  assigned_to UUID,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_recommendations_org ON recommendations(organization_id);
CREATE INDEX idx_recommendations_type ON recommendations(recommendation_type);
CREATE INDEX idx_recommendations_status ON recommendations(status);
CREATE INDEX idx_recommendations_priority ON recommendations(priority);

-- =============================================================================
-- ENTITY RELATIONSHIPS & LINEAGE
-- =============================================================================

CREATE TABLE entity_relationships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Source & Target
  source_entity_type TEXT NOT NULL,
  source_entity_id UUID NOT NULL,
  target_entity_type TEXT NOT NULL,
  target_entity_id UUID NOT NULL,
  
  -- Relationship
  relationship_type TEXT, -- 'has_many', 'belongs_to', 'references', 'impacts', 'derives_from'
  relationship_strength DECIMAL(5,2), -- 0.0 to 1.0
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX idx_entity_relationships_source ON entity_relationships(source_entity_type, source_entity_id);
CREATE INDEX idx_entity_relationships_target ON entity_relationships(target_entity_type, target_entity_id);

-- =============================================================================
-- ENGINE ACTIVITY LOG (Which engine touched which entity)
-- =============================================================================

CREATE TABLE engine_activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Engine
  engine_name TEXT NOT NULL, -- 'economic_engine', 'statistical_engine', etc.
  engine_operation TEXT NOT NULL,
  
  -- Entity
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  
  -- Activity
  activity_type TEXT, -- 'read', 'write', 'compute', 'analyze'
  
  -- Performance
  execution_time_ms INTEGER,
  
  -- Results
  results JSONB,
  
  -- Metadata
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID,
  session_id UUID
);

CREATE INDEX idx_engine_activity_engine ON engine_activity_log(engine_name);
CREATE INDEX idx_engine_activity_entity ON engine_activity_log(entity_type, entity_id);
CREATE INDEX idx_engine_activity_timestamp ON engine_activity_log(timestamp);

-- =============================================================================
-- VIEWS FOR COMMON QUERIES
-- =============================================================================

-- Organization hierarchy view
CREATE VIEW organization_hierarchy AS
SELECT 
  o.id as organization_id,
  o.name as organization_name,
  d.id as division_id,
  d.name as division_name,
  dept.id as department_id,
  dept.name as department_name,
  COUNT(DISTINCT e.id) as employee_count
FROM organizations o
LEFT JOIN divisions d ON d.organization_id = o.id
LEFT JOIN departments dept ON dept.division_id = d.id
LEFT JOIN employees e ON e.department_id = dept.id
GROUP BY o.id, o.name, d.id, d.name, dept.id, dept.name;

-- Claims financial summary view
CREATE VIEW claims_financial_summary AS
SELECT
  c.plan_id,
  p.plan_name,
  COUNT(c.id) as claim_count,
  SUM(c.billed_amount) as total_billed,
  SUM(c.allowed_amount) as total_allowed,
  SUM(c.paid_amount) as total_paid,
  AVG(c.paid_amount) as avg_claim_cost
FROM claims c
JOIN plans p ON p.id = c.plan_id
WHERE c.claim_status = 'paid'
GROUP BY c.plan_id, p.plan_name;

-- Vendor performance view
CREATE VIEW vendor_performance AS
SELECT
  v.id as vendor_id,
  v.vendor_name,
  v.vendor_type,
  COUNT(DISTINCT con.id) as contract_count,
  SUM(con.contract_value_annual) as total_contract_value,
  COUNT(DISTINCT inv.id) as invoice_count,
  SUM(inv.invoice_amount) as total_invoiced,
  v.performance_score,
  v.risk_rating
FROM vendors v
LEFT JOIN contracts con ON con.vendor_id = v.id
LEFT JOIN invoices inv ON inv.vendor_id = v.id
GROUP BY v.id, v.vendor_name, v.vendor_type, v.performance_score, v.risk_rating;

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) SETUP
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE drugs ENABLE ROW LEVEL SECURITY;
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE risks ENABLE ROW LEVEL SECURITY;
ALTER TABLE controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (authenticated users can read, admins can write)
CREATE POLICY "authenticated_read" ON organizations FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON divisions FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON departments FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON employees FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON plans FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON claims FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON contracts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON vendors FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON invoices FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON payments FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON drugs FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON providers FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON benefits FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON financial_statements FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON policies FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON ai_models FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON risks FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON controls FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "authenticated_read" ON recommendations FOR SELECT USING (auth.uid() IS NOT NULL);

-- =============================================================================
-- END OF UNIVERSAL DATA MODEL
-- =============================================================================