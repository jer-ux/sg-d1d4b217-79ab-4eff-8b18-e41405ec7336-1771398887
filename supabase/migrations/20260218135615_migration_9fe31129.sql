-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CLAIMS DATABANK - Store healthcare/insurance claims data
CREATE TABLE claims_databank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Claims metadata
  claim_count INTEGER,
  total_amount DECIMAL(15,2),
  date_range_start DATE,
  date_range_end DATE,
  plan_year INTEGER,
  
  -- Processing status
  status TEXT CHECK (status IN ('uploaded', 'processing', 'processed', 'error')) DEFAULT 'uploaded',
  processing_notes TEXT,
  error_message TEXT,
  
  -- Data quality metrics
  valid_records INTEGER,
  invalid_records INTEGER,
  duplicate_records INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CENSUS DATABANK - Store employee/member census data
CREATE TABLE census_databank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Census metadata
  member_count INTEGER,
  census_date DATE,
  plan_year INTEGER,
  organization_name TEXT,
  
  -- Demographics summary
  average_age DECIMAL(5,2),
  male_count INTEGER,
  female_count INTEGER,
  dependent_count INTEGER,
  
  -- Processing status
  status TEXT CHECK (status IN ('uploaded', 'processing', 'processed', 'error')) DEFAULT 'uploaded',
  processing_notes TEXT,
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. FINANCIAL DATABANK - Store financial statements, invoices, and accounting data
CREATE TABLE financial_databank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Financial metadata
  document_type TEXT CHECK (document_type IN ('invoice', 'statement', 'ledger', 'budget', 'forecast', 'other')),
  fiscal_period TEXT,
  fiscal_year INTEGER,
  vendor_name TEXT,
  
  -- Financial summary
  total_revenue DECIMAL(15,2),
  total_expenses DECIMAL(15,2),
  net_amount DECIMAL(15,2),
  currency TEXT DEFAULT 'USD',
  
  -- Processing status
  status TEXT CHECK (status IN ('uploaded', 'processing', 'processed', 'error')) DEFAULT 'uploaded',
  processing_notes TEXT,
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CONTRACTS DATABANK - Store vendor contracts, agreements, and legal documents
CREATE TABLE contracts_databank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contract metadata
  contract_type TEXT CHECK (contract_type IN ('vendor', 'service', 'insurance', 'partnership', 'employment', 'other')),
  vendor_name TEXT,
  contract_value DECIMAL(15,2),
  start_date DATE,
  end_date DATE,
  auto_renewal BOOLEAN DEFAULT false,
  
  -- Risk assessment
  risk_score INTEGER CHECK (risk_score >= 0 AND risk_score <= 100),
  compliance_status TEXT CHECK (compliance_status IN ('compliant', 'review_needed', 'non_compliant', 'unknown')) DEFAULT 'unknown',
  
  -- Processing status
  status TEXT CHECK (status IN ('uploaded', 'processing', 'processed', 'error')) DEFAULT 'uploaded',
  processing_notes TEXT,
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ACTUARIAL DATABANK - Store Form 5500, actuarial reports, and compliance documents
CREATE TABLE actuarial_databank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Actuarial metadata
  document_type TEXT CHECK (document_type IN ('form_5500', 'actuarial_report', 'valuation', 'experience_study', 'other')),
  plan_year INTEGER,
  plan_name TEXT,
  ein TEXT,
  
  -- Key metrics
  participant_count INTEGER,
  total_assets DECIMAL(15,2),
  total_liabilities DECIMAL(15,2),
  funding_ratio DECIMAL(5,2),
  
  -- Processing status
  status TEXT CHECK (status IN ('uploaded', 'processing', 'processed', 'error')) DEFAULT 'uploaded',
  processing_notes TEXT,
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. PHARMACY DATABANK - Store pharmacy benefit manager (PBM) data
CREATE TABLE pharmacy_databank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Pharmacy metadata
  pbm_name TEXT,
  claim_count INTEGER,
  total_cost DECIMAL(15,2),
  date_range_start DATE,
  date_range_end DATE,
  
  -- Pharmacy analytics
  generic_utilization_rate DECIMAL(5,2),
  brand_utilization_rate DECIMAL(5,2),
  specialty_utilization_rate DECIMAL(5,2),
  average_cost_per_script DECIMAL(10,2),
  
  -- Processing status
  status TEXT CHECK (status IN ('uploaded', 'processing', 'processed', 'error')) DEFAULT 'uploaded',
  processing_notes TEXT,
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. ANALYTICS DATABANK - Store custom reports, dashboards, and analytical outputs
CREATE TABLE analytics_databank (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  upload_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Analytics metadata
  report_type TEXT CHECK (report_type IN ('dashboard', 'trend_analysis', 'benchmark', 'forecast', 'custom', 'other')),
  report_title TEXT,
  report_period TEXT,
  tags TEXT[], -- Array for categorization
  
  -- Sharing and collaboration
  is_shared BOOLEAN DEFAULT false,
  shared_with TEXT[], -- Array of user IDs
  
  -- Processing status
  status TEXT CHECK (status IN ('uploaded', 'processing', 'processed', 'error')) DEFAULT 'uploaded',
  processing_notes TEXT,
  error_message TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_claims_user_id ON claims_databank(user_id);
CREATE INDEX idx_claims_status ON claims_databank(status);
CREATE INDEX idx_claims_upload_date ON claims_databank(upload_date);

CREATE INDEX idx_census_user_id ON census_databank(user_id);
CREATE INDEX idx_census_status ON census_databank(status);
CREATE INDEX idx_census_upload_date ON census_databank(upload_date);

CREATE INDEX idx_financial_user_id ON financial_databank(user_id);
CREATE INDEX idx_financial_status ON financial_databank(status);
CREATE INDEX idx_financial_document_type ON financial_databank(document_type);

CREATE INDEX idx_contracts_user_id ON contracts_databank(user_id);
CREATE INDEX idx_contracts_status ON contracts_databank(status);
CREATE INDEX idx_contracts_end_date ON contracts_databank(end_date);

CREATE INDEX idx_actuarial_user_id ON actuarial_databank(user_id);
CREATE INDEX idx_actuarial_status ON actuarial_databank(status);
CREATE INDEX idx_actuarial_document_type ON actuarial_databank(document_type);

CREATE INDEX idx_pharmacy_user_id ON pharmacy_databank(user_id);
CREATE INDEX idx_pharmacy_status ON pharmacy_databank(status);
CREATE INDEX idx_pharmacy_upload_date ON pharmacy_databank(upload_date);

CREATE INDEX idx_analytics_user_id ON analytics_databank(user_id);
CREATE INDEX idx_analytics_status ON analytics_databank(status);
CREATE INDEX idx_analytics_tags ON analytics_databank USING GIN(tags);

-- Enable Row Level Security on all databank tables
ALTER TABLE claims_databank ENABLE ROW LEVEL SECURITY;
ALTER TABLE census_databank ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_databank ENABLE ROW LEVEL SECURITY;
ALTER TABLE contracts_databank ENABLE ROW LEVEL SECURITY;
ALTER TABLE actuarial_databank ENABLE ROW LEVEL SECURITY;
ALTER TABLE pharmacy_databank ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_databank ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for claims_databank
CREATE POLICY "Users can view their own claims data" ON claims_databank FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own claims data" ON claims_databank FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own claims data" ON claims_databank FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own claims data" ON claims_databank FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for census_databank
CREATE POLICY "Users can view their own census data" ON census_databank FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own census data" ON census_databank FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own census data" ON census_databank FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own census data" ON census_databank FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for financial_databank
CREATE POLICY "Users can view their own financial data" ON financial_databank FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own financial data" ON financial_databank FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own financial data" ON financial_databank FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own financial data" ON financial_databank FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for contracts_databank
CREATE POLICY "Users can view their own contracts data" ON contracts_databank FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own contracts data" ON contracts_databank FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own contracts data" ON contracts_databank FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own contracts data" ON contracts_databank FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for actuarial_databank
CREATE POLICY "Users can view their own actuarial data" ON actuarial_databank FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own actuarial data" ON actuarial_databank FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own actuarial data" ON actuarial_databank FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own actuarial data" ON actuarial_databank FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for pharmacy_databank
CREATE POLICY "Users can view their own pharmacy data" ON pharmacy_databank FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own pharmacy data" ON pharmacy_databank FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own pharmacy data" ON pharmacy_databank FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own pharmacy data" ON pharmacy_databank FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for analytics_databank
CREATE POLICY "Users can view their own analytics data" ON analytics_databank FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own analytics data" ON analytics_databank FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own analytics data" ON analytics_databank FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own analytics data" ON analytics_databank FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all databank tables
CREATE TRIGGER update_claims_databank_updated_at BEFORE UPDATE ON claims_databank FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_census_databank_updated_at BEFORE UPDATE ON census_databank FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_financial_databank_updated_at BEFORE UPDATE ON financial_databank FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contracts_databank_updated_at BEFORE UPDATE ON contracts_databank FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_actuarial_databank_updated_at BEFORE UPDATE ON actuarial_databank FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pharmacy_databank_updated_at BEFORE UPDATE ON pharmacy_databank FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_analytics_databank_updated_at BEFORE UPDATE ON analytics_databank FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();