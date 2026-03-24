-- Create Enterprise Reporting Tables

-- 1. report_templates
CREATE TABLE IF NOT EXISTS report_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  sections JSONB,
  format TEXT DEFAULT 'pdf',
  is_custom BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  organization_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. report_schedules
CREATE TABLE IF NOT EXISTS report_schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  template_id UUID REFERENCES report_templates(id),
  frequency TEXT NOT NULL,
  recipients JSONB,
  filters JSONB,
  next_run TIMESTAMP WITH TIME ZONE,
  last_run TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  organization_id UUID,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. report_history
CREATE TABLE IF NOT EXISTS report_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID,
  contract_ids JSONB,
  generated_by UUID REFERENCES auth.users(id),
  organization_id UUID,
  format TEXT DEFAULT 'pdf',
  status TEXT DEFAULT 'completed',
  report_count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. report_email_logs
CREATE TABLE IF NOT EXISTS report_email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID REFERENCES report_history(id),
  recipients JSONB,
  sent_by UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'sent',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. report_analytics
CREATE TABLE IF NOT EXISTS report_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID,
  total_reports_generated INTEGER DEFAULT 0,
  active_templates INTEGER DEFAULT 0,
  scheduled_reports INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_analytics ENABLE ROW LEVEL SECURITY;

-- Add basic public policies for demo/testing (in production, restrict to org)
CREATE POLICY "Public read report_templates" ON report_templates FOR SELECT USING (true);
CREATE POLICY "Public insert report_templates" ON report_templates FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update report_templates" ON report_templates FOR UPDATE USING (true);

CREATE POLICY "Public read report_schedules" ON report_schedules FOR SELECT USING (true);
CREATE POLICY "Public insert report_schedules" ON report_schedules FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update report_schedules" ON report_schedules FOR UPDATE USING (true);
CREATE POLICY "Public delete report_schedules" ON report_schedules FOR DELETE USING (true);

CREATE POLICY "Public read report_history" ON report_history FOR SELECT USING (true);
CREATE POLICY "Public insert report_history" ON report_history FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read report_email_logs" ON report_email_logs FOR SELECT USING (true);
CREATE POLICY "Public insert report_email_logs" ON report_email_logs FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read report_analytics" ON report_analytics FOR SELECT USING (true);
CREATE POLICY "Public insert report_analytics" ON report_analytics FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update report_analytics" ON report_analytics FOR UPDATE USING (true);