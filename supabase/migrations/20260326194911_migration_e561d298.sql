-- Create contract_uploads table for tracking upload progress
CREATE TABLE IF NOT EXISTS contract_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  upload_status TEXT NOT NULL DEFAULT 'pending',
  upload_progress INTEGER DEFAULT 0,
  storage_path TEXT,
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contract_uploads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for contract_uploads
CREATE POLICY "Users can view their own uploads"
  ON contract_uploads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own uploads"
  ON contract_uploads FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own uploads"
  ON contract_uploads FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own uploads"
  ON contract_uploads FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_contract_uploads_user_id ON contract_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_contract_uploads_status ON contract_uploads(upload_status);