-- Create contacts table for form submissions
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  job_title TEXT,
  message TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add status check constraint
ALTER TABLE contacts ADD CONSTRAINT contacts_status_check 
  CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed'));

-- Add source check constraint  
ALTER TABLE contacts ADD CONSTRAINT contacts_source_check
  CHECK (source IN ('website', 'landing_page', 'demo_request', 'pricing_page', 'contact_page', 'other'));

-- Create indexes for common queries
CREATE INDEX idx_contacts_status ON contacts(status);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- RLS Template T3: Anonymous/public form submissions
-- Public can submit contact forms (anon_insert)
CREATE POLICY "anon_insert" ON contacts 
  FOR INSERT 
  WITH CHECK (true);

-- Public can read their own submissions (optional - you may want to restrict this)
CREATE POLICY "public_read" ON contacts 
  FOR SELECT 
  USING (true);

-- Comment
COMMENT ON TABLE contacts IS 'Contact form submissions from website';