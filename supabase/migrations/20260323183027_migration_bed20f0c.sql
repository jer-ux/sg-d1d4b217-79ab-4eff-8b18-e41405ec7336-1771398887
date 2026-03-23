-- Add Claude AI Co-Pilot support to database schema
-- Store AI conversations and analysis insights

CREATE TABLE IF NOT EXISTS contract_ai_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID REFERENCES contract_uploads(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES contract_organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_type TEXT NOT NULL CHECK (session_type IN ('analysis', 'qa', 'negotiation', 'review')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contract_ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES contract_ai_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contract_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID REFERENCES contract_uploads(id) ON DELETE CASCADE,
  insight_type TEXT NOT NULL CHECK (insight_type IN ('risk', 'opportunity', 'compliance', 'benchmark', 'recommendation')),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('Low', 'Medium', 'High', 'Critical')),
  financial_impact DECIMAL(15,2),
  confidence_score INTEGER CHECK (confidence_score >= 0 AND confidence_score <= 100),
  supporting_evidence JSONB DEFAULT '[]',
  ai_reasoning TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contract_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID REFERENCES contract_uploads(id) ON DELETE CASCADE,
  recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('immediate', 'short_term', 'long_term', 'strategic')),
  priority INTEGER CHECK (priority >= 1 AND priority <= 10),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  expected_impact DECIMAL(15,2),
  implementation_effort TEXT CHECK (implementation_effort IN ('Low', 'Medium', 'High')),
  timeline_days INTEGER,
  success_probability INTEGER CHECK (success_probability >= 0 AND success_probability <= 100),
  action_items JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contract_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  upload_id UUID REFERENCES contract_uploads(id) ON DELETE CASCADE,
  provision_type TEXT NOT NULL,
  your_score INTEGER CHECK (your_score >= 0 AND your_score <= 100),
  industry_average INTEGER CHECK (industry_average >= 0 AND industry_average <= 100),
  best_in_class INTEGER CHECK (best_in_class >= 0 AND best_in_class <= 100),
  percentile_rank INTEGER CHECK (percentile_rank >= 0 AND percentile_rank <= 100),
  gap_analysis TEXT,
  improvement_potential DECIMAL(15,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_ai_sessions_upload ON contract_ai_sessions(upload_id);
CREATE INDEX idx_ai_messages_session ON contract_ai_messages(session_id);
CREATE INDEX idx_insights_upload ON contract_insights(upload_id);
CREATE INDEX idx_insights_type ON contract_insights(insight_type);
CREATE INDEX idx_recommendations_upload ON contract_recommendations(upload_id);
CREATE INDEX idx_recommendations_priority ON contract_recommendations(priority);
CREATE INDEX idx_benchmarks_upload ON contract_benchmarks(upload_id);

-- RLS Policies
ALTER TABLE contract_ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_ai_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contract_benchmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their AI sessions" ON contract_ai_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view session messages" ON contract_ai_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM contract_ai_sessions
      WHERE contract_ai_sessions.id = contract_ai_messages.session_id
      AND contract_ai_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can view contract insights" ON contract_insights
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM contract_uploads
      WHERE contract_uploads.id = contract_insights.upload_id
      AND contract_uploads.organization_id IN (
        SELECT organization_id FROM contract_organizations WHERE id = contract_uploads.organization_id
      )
    )
  );

CREATE POLICY "Users can view recommendations" ON contract_recommendations
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM contract_uploads
      WHERE contract_uploads.id = contract_recommendations.upload_id
    )
  );

CREATE POLICY "Users can view benchmarks" ON contract_benchmarks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM contract_uploads
      WHERE contract_uploads.id = contract_benchmarks.upload_id
    )
  );