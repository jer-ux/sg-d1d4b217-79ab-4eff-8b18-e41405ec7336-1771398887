-- Create Enterprise Features Tables

-- Organization Branding
CREATE TABLE IF NOT EXISTS organization_branding (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES contract_organizations(id) ON DELETE CASCADE,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#0F172A',
  secondary_color TEXT DEFAULT '#3B82F6',
  accent_color TEXT DEFAULT '#10B981',
  font_family TEXT DEFAULT 'Inter',
  white_label_enabled BOOLEAN DEFAULT false,
  report_header_text TEXT,
  report_footer_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(organization_id)
);

-- Webhook Configurations
CREATE TABLE IF NOT EXISTS webhook_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES contract_organizations(id) ON DELETE CASCADE,
  webhook_name TEXT NOT NULL,
  webhook_url TEXT NOT NULL,
  events TEXT[] NOT NULL,
  is_active BOOLEAN DEFAULT true,
  secret_key TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_triggered_at TIMESTAMP WITH TIME ZONE
);

-- Notification Templates
CREATE TABLE IF NOT EXISTS notification_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES contract_organizations(id) ON DELETE CASCADE,
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL CHECK (template_type IN ('email', 'slack', 'teams', 'sms')),
  event_trigger TEXT NOT NULL,
  subject TEXT,
  body_template TEXT NOT NULL,
  variables JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SLA Metrics Tracking
CREATE TABLE IF NOT EXISTS sla_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES contract_organizations(id) ON DELETE CASCADE,
  metric_date DATE NOT NULL,
  avg_upload_time_seconds NUMERIC(10,2),
  avg_analysis_time_seconds NUMERIC(10,2),
  avg_api_response_ms INTEGER,
  uptime_percentage NUMERIC(5,2),
  total_requests INTEGER DEFAULT 0,
  successful_requests INTEGER DEFAULT 0,
  failed_requests INTEGER DEFAULT 0,
  p95_response_time_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(organization_id, metric_date)
);

-- Cost Allocation by Department
CREATE TABLE IF NOT EXISTS cost_allocation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES contract_organizations(id) ON DELETE CASCADE,
  department TEXT NOT NULL,
  cost_center TEXT,
  budget_allocated NUMERIC(12,2) DEFAULT 0,
  budget_consumed NUMERIC(12,2) DEFAULT 0,
  contracts_analyzed INTEGER DEFAULT 0,
  ai_api_calls INTEGER DEFAULT 0,
  storage_gb_used NUMERIC(10,2) DEFAULT 0,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_webhooks_org ON webhook_configurations(organization_id);
CREATE INDEX IF NOT EXISTS idx_notifications_org ON notification_templates(organization_id);
CREATE INDEX IF NOT EXISTS idx_sla_org_date ON sla_metrics(organization_id, metric_date DESC);
CREATE INDEX IF NOT EXISTS idx_cost_org_period ON cost_allocation(organization_id, period_start, period_end);

-- Enable RLS
ALTER TABLE organization_branding ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE sla_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_allocation ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their org branding" ON organization_branding FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage org branding" ON organization_branding FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Users can view webhooks" ON webhook_configurations FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage webhooks" ON webhook_configurations FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Users can view templates" ON notification_templates FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage templates" ON notification_templates FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
  )
);

CREATE POLICY "Users can view SLA metrics" ON sla_metrics FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "System can insert SLA metrics" ON sla_metrics FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can view cost allocation" ON cost_allocation FOR SELECT USING (
  organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can manage cost allocation" ON cost_allocation FOR ALL USING (
  organization_id IN (
    SELECT organization_id FROM organization_members WHERE user_id = auth.uid() AND role IN ('admin', 'owner')
  )
);