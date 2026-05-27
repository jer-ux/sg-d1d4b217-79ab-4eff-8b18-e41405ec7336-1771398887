-- Create shady_broker_engagements table
CREATE TABLE IF NOT EXISTS shady_broker_engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Company & Plan Info
  company_legal_name TEXT NOT NULL,
  ein TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  plan_years TEXT[] NOT NULL DEFAULT ARRAY['2024'],
  lives_covered INTEGER NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('self-funded', 'fully-insured')),
  current_broker TEXT NOT NULL,
  current_pbm TEXT NOT NULL,
  
  -- Contact Info
  contact_name TEXT NOT NULL,
  contact_title TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_mobile TEXT NOT NULL,
  
  -- Payment
  stripe_session_id TEXT UNIQUE,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_amount INTEGER DEFAULT 450000,
  
  -- File URLs
  form_5500_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  schedule_a_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  broker_disclosure_url TEXT,
  pbm_contract_url TEXT,
  
  -- Engagement State
  engagement_state TEXT NOT NULL DEFAULT 'intake' CHECK (engagement_state IN ('intake', 'in_progress', 'delivered')),
  delivery_date TIMESTAMPTZ,
  report_url TEXT,
  
  -- Metadata
  notes TEXT,
  internal_notes TEXT
);

-- Create indexes
CREATE INDEX idx_shady_broker_engagements_stripe_session ON shady_broker_engagements(stripe_session_id);
CREATE INDEX idx_shady_broker_engagements_email ON shady_broker_engagements(contact_email);
CREATE INDEX idx_shady_broker_engagements_state ON shady_broker_engagements(engagement_state);
CREATE INDEX idx_shady_broker_engagements_created ON shady_broker_engagements(created_at DESC);

-- Enable RLS
ALTER TABLE shady_broker_engagements ENABLE ROW LEVEL SECURITY;

-- Admin-only access policy
CREATE POLICY "Admin full access to shady_broker_engagements"
ON shady_broker_engagements
FOR ALL
USING (auth.jwt() ->> 'email' = 'jer@kincaidrmc.com');

-- Updated trigger
CREATE OR REPLACE FUNCTION update_shady_broker_engagements_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_shady_broker_engagements_updated_at
  BEFORE UPDATE ON shady_broker_engagements
  FOR EACH ROW
  EXECUTE FUNCTION update_shady_broker_engagements_updated_at();

-- Table comment
COMMENT ON TABLE shady_broker_engagements IS 'Tracks Shady Broker Report engagements from payment through delivery';