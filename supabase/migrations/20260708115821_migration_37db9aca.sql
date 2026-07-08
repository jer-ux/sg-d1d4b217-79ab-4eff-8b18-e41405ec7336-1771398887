-- LEVEL 14-16: Financial Statements, Policies, AI Models
CREATE TABLE IF NOT EXISTS financial_statements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  statement_type TEXT NOT NULL,
  fiscal_period TEXT,
  statement_date DATE,
  line_items JSONB,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS policies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id),
  policy_name TEXT NOT NULL,
  policy_type TEXT,
  policy_number TEXT UNIQUE,
  policy_text TEXT,
  policy_url TEXT,
  effective_date DATE,
  review_date DATE,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS ai_models (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  model_name TEXT NOT NULL,
  model_type TEXT,
  model_version TEXT,
  use_case TEXT,
  target_variable TEXT,
  accuracy DECIMAL(5,4),
  precision_score DECIMAL(5,4),
  recall DECIMAL(5,4),
  f1_score DECIMAL(5,4),
  training_date TIMESTAMPTZ,
  training_records INTEGER,
  features JSONB,
  deployment_status TEXT,
  deployment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_financial_statements_org ON financial_statements(organization_id);
CREATE INDEX IF NOT EXISTS idx_policies_org ON policies(organization_id);
CREATE INDEX IF NOT EXISTS idx_ai_models_status ON ai_models(deployment_status);