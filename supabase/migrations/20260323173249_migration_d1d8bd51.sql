-- Create PBM Contracts Database Schema
-- This creates the foundation for storing and analyzing PBM contracts

-- 1. Main contracts table with PBM categorization
CREATE TABLE IF NOT EXISTS pbm_contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pbm_name TEXT NOT NULL CHECK (pbm_name IN ('OptumRx', 'CVS Health', 'Express Scripts', 'Prime Therapeutics')),
  contract_name TEXT NOT NULL,
  contract_type TEXT NOT NULL CHECK (contract_type IN ('Commercial', 'Medicare Part D', 'Medicaid', 'Government', 'Self-Funded')),
  effective_date DATE NOT NULL,
  expiration_date DATE,
  plan_size TEXT CHECK (plan_size IN ('Small (<500)', 'Medium (500-5000)', 'Large (5000-50000)', 'Enterprise (50000+)')),
  file_url TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uploaded_by UUID REFERENCES auth.users(id),
  overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
  risk_level TEXT CHECK (risk_level IN ('Low', 'Medium', 'High', 'Critical')),
  total_provisions INTEGER DEFAULT 10,
  red_flags INTEGER DEFAULT 0,
  annual_cost_estimate DECIMAL(15,2),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Contract provisions table (stores individual clause analysis)
CREATE TABLE IF NOT EXISTS contract_provisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id UUID NOT NULL REFERENCES pbm_contracts(id) ON DELETE CASCADE,
  provision_name TEXT NOT NULL,
  provision_type TEXT NOT NULL CHECK (provision_type IN (
    'Rebate Pass-Through',
    'Formulary Control',
    'Specialty Drug Pricing',
    'MAC Transparency',
    'PBM Compensation',
    'Audit Rights',
    'Data Ownership',
    'Spread Pricing',
    'Generic Substitution',
    'Prior Authorization'
  )),
  score INTEGER CHECK (score >= 0 AND score <= 100),
  risk_flag TEXT CHECK (risk_flag IN ('Red Flag', 'Concern', 'Fair', 'Good', 'Excellent')),
  extracted_text TEXT,
  analysis TEXT,
  recommendations TEXT,
  cost_impact DECIMAL(15,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Comparison sessions table (tracks user comparisons)
CREATE TABLE IF NOT EXISTS comparison_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  session_name TEXT,
  contract_ids UUID[] NOT NULL,
  comparison_results JSONB,
  key_findings TEXT[],
  cost_variance DECIMAL(15,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Contract analytics table (aggregated metrics)
CREATE TABLE IF NOT EXISTS contract_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pbm_name TEXT NOT NULL,
  avg_score DECIMAL(5,2),
  total_contracts INTEGER DEFAULT 0,
  high_risk_count INTEGER DEFAULT 0,
  avg_cost_estimate DECIMAL(15,2),
  common_red_flags TEXT[],
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contracts_pbm ON pbm_contracts(pbm_name);
CREATE INDEX IF NOT EXISTS idx_contracts_type ON pbm_contracts(contract_type);
CREATE INDEX IF NOT EXISTS idx_contracts_date ON pbm_contracts(effective_date);
CREATE INDEX IF NOT EXISTS idx_contracts_score ON pbm_contracts(overall_score);
CREATE INDEX IF NOT EXISTS idx_provisions_contract ON contract_provisions(contract_id);
CREATE INDEX IF NOT EXISTS idx_provisions_type ON contract_provisions(provision_type);
CREATE INDEX IF NOT EXISTS idx_comparison_user ON comparison_sessions(user_id);

-- Enable Row Level Security
ALTER TABLE pbm_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_provisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparison_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for pbm_contracts (public read, authenticated write)
CREATE POLICY "Anyone can view contracts" ON pbm_contracts FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert contracts" ON pbm_contracts FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update contracts" ON pbm_contracts FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete contracts" ON pbm_contracts FOR DELETE USING (auth.uid() IS NOT NULL);

-- RLS Policies for contract_provisions
CREATE POLICY "Anyone can view provisions" ON contract_provisions FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage provisions" ON contract_provisions FOR ALL USING (auth.uid() IS NOT NULL);

-- RLS Policies for comparison_sessions
CREATE POLICY "Users can view their own comparisons" ON comparison_sessions FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can create comparisons" ON comparison_sessions FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update their comparisons" ON comparison_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their comparisons" ON comparison_sessions FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for analytics (public read)
CREATE POLICY "Anyone can view analytics" ON contract_analytics FOR SELECT USING (true);
CREATE POLICY "System can update analytics" ON contract_analytics FOR ALL USING (true);