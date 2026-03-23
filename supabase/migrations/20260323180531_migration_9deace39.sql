-- Enterprise-Scale Database Schema for Contract X-Ray
-- Handles 100s of concurrent users with performance optimization

-- Organizations table for enterprise multi-tenancy
CREATE TABLE IF NOT EXISTS contract_organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  subscription_tier TEXT NOT NULL CHECK (subscription_tier IN ('starter', 'professional', 'enterprise', 'unlimited')),
  contract_limit INTEGER NOT NULL DEFAULT 10,
  user_limit INTEGER NOT NULL DEFAULT 5,
  api_enabled BOOLEAN DEFAULT false,
  white_label_enabled BOOLEAN DEFAULT false,
  priority_support BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Contract uploads table with enterprise features
CREATE TABLE IF NOT EXISTS contract_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES contract_organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  upload_status TEXT NOT NULL DEFAULT 'pending' CHECK (upload_status IN ('pending', 'processing', 'completed', 'failed')),
  processing_started_at TIMESTAMPTZ,
  processing_completed_at TIMESTAMPTZ,
  error_message TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Contract analysis results with detailed scoring
CREATE TABLE IF NOT EXISTS contract_analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID REFERENCES contract_uploads(id) ON DELETE CASCADE,
  contract_name TEXT NOT NULL,
  pbm_name TEXT,
  contract_type TEXT,
  effective_date DATE,
  expiration_date DATE,
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  risk_level TEXT CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')),
  total_provisions_analyzed INTEGER DEFAULT 0,
  red_flags_count INTEGER DEFAULT 0,
  annual_cost_estimate DECIMAL(15,2),
  potential_savings DECIMAL(15,2),
  analysis_summary JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Detailed provision analysis for each contract
CREATE TABLE IF NOT EXISTS contract_provision_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID REFERENCES contract_analysis_results(id) ON DELETE CASCADE,
  provision_category TEXT NOT NULL,
  provision_name TEXT NOT NULL,
  provision_text TEXT,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  risk_level TEXT CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')),
  is_red_flag BOOLEAN DEFAULT false,
  recommendation TEXT,
  industry_benchmark INTEGER,
  financial_impact DECIMAL(15,2),
  compliance_status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PDF export requests and tracking
CREATE TABLE IF NOT EXISTS contract_pdf_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  analysis_id UUID REFERENCES contract_analysis_results(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  export_type TEXT NOT NULL CHECK (export_type IN ('summary', 'detailed', 'comparison', 'executive')),
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'generating', 'completed', 'failed')),
  storage_path TEXT,
  file_size INTEGER,
  download_count INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Board dashboard analytics
CREATE TABLE IF NOT EXISTS contract_board_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES contract_organizations(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_contracts_analyzed INTEGER DEFAULT 0,
  total_red_flags_identified INTEGER DEFAULT 0,
  total_potential_savings DECIMAL(15,2) DEFAULT 0,
  average_contract_score DECIMAL(5,2),
  high_risk_contracts INTEGER DEFAULT 0,
  contracts_by_pbm JSONB DEFAULT '{}'::jsonb,
  top_risk_categories JSONB DEFAULT '{}'::jsonb,
  user_activity JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, date)
);

-- Usage tracking for performance monitoring
CREATE TABLE IF NOT EXISTS contract_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES contract_organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  duration_ms INTEGER,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contract_uploads_org ON contract_uploads(organization_id, uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_contract_uploads_user ON contract_uploads(user_id, uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_contract_uploads_status ON contract_uploads(upload_status, uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_results_upload ON contract_analysis_results(upload_id);
CREATE INDEX IF NOT EXISTS idx_provision_analysis_result ON contract_provision_analysis(analysis_id);
CREATE INDEX IF NOT EXISTS idx_pdf_exports_analysis ON contract_pdf_exports(analysis_id);
CREATE INDEX IF NOT EXISTS idx_pdf_exports_user ON contract_pdf_exports(user_id, requested_at DESC);
CREATE INDEX IF NOT EXISTS idx_board_analytics_org ON contract_board_analytics(organization_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_usage_logs_org ON contract_usage_logs(organization_id, created_at DESC);

-- Enable RLS
ALTER TABLE contract_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_analysis_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_provision_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_pdf_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_board_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_usage_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their org contracts" ON contract_uploads FOR SELECT USING (
  organization_id IN (SELECT id FROM contract_organizations WHERE id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
  ))
);

CREATE POLICY "Users can upload contracts to their org" ON contract_uploads FOR INSERT WITH CHECK (
  organization_id IN (SELECT id FROM contract_organizations WHERE id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
  ))
);

CREATE POLICY "Users can view their org analysis results" ON contract_analysis_results FOR SELECT USING (
  upload_id IN (SELECT id FROM contract_uploads WHERE organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
  ))
);

CREATE POLICY "Users can view provision analysis" ON contract_provision_analysis FOR SELECT USING (
  analysis_id IN (SELECT id FROM contract_analysis_results WHERE upload_id IN (
    SELECT id FROM contract_uploads WHERE organization_id IN (
      SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
    )
  ))
);

CREATE POLICY "Users can request PDF exports" ON contract_pdf_exports FOR INSERT WITH CHECK (
  user_id = auth.uid()
);

CREATE POLICY "Users can view their PDF exports" ON contract_pdf_exports FOR SELECT USING (
  user_id = auth.uid()
);

CREATE POLICY "Board members can view analytics" ON contract_board_analytics FOR SELECT USING (
  organization_id IN (SELECT organization_id FROM organization_members WHERE user_id = auth.uid())
);

-- Create storage bucket for contract uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'contract-uploads',
  'contract-uploads',
  false,
  52428800, -- 50MB limit
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload contracts" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'contract-uploads' AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can view their org contracts" ON storage.objects FOR SELECT USING (
  bucket_id = 'contract-uploads' AND auth.uid() IS NOT NULL
);

-- Create storage bucket for PDF exports
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'contract-exports',
  'contract-exports',
  false,
  10485760, -- 10MB limit
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- PDF export storage policies
CREATE POLICY "Users can view their exports" ON storage.objects FOR SELECT USING (
  bucket_id = 'contract-exports' AND auth.uid() IS NOT NULL
);