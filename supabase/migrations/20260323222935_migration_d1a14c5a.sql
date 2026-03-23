CREATE TABLE IF NOT EXISTS contract_alerts (
  id TEXT PRIMARY KEY,
  contract_id UUID REFERENCES contract_uploads(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  severity TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE contract_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view alerts" ON contract_alerts FOR SELECT USING (true);
CREATE POLICY "Users can insert alerts" ON contract_alerts FOR INSERT WITH CHECK (true);