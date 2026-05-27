-- Create shady_broker_engagements table
CREATE TABLE IF NOT EXISTS shady_broker_engagements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  
  -- Company information
  company_legal_name TEXT NOT NULL,
  ein TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  plan_years TEXT[] NOT NULL,
  lives_covered INTEGER NOT NULL,
  funding_type TEXT NOT NULL CHECK (funding_type IN ('self-funded', 'fully-insured')),
  
  -- Current providers
  current_broker TEXT NOT NULL,
  current_pbm TEXT NOT NULL,
  
  -- Contact information
  contact_name TEXT NOT NULL,
  contact_title TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_mobile TEXT NOT NULL,
  
  -- Document URLs
  form_5500_urls TEXT[],
  schedule_a_urls TEXT[],
  broker_disclosure_url TEXT,
  pbm_contract_url TEXT,
  
  -- Engagement tracking
  engagement_state TEXT NOT NULL DEFAULT 'intake' CHECK (engagement_state IN ('intake', 'in_progress', 'delivered', 'archived')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  
  -- Delivery tracking
  kickoff_call_scheduled_at TIMESTAMPTZ,
  progress_update_3_sent_at TIMESTAMPTZ,
  progress_update_6_sent_at TIMESTAMPTZ,
  progress_update_9_sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  delivery_url TEXT,
  
  -- Metadata
  internal_notes TEXT,
  assigned_to TEXT
);

-- Create index on email for lookups
CREATE INDEX idx_shady_broker_engagements_email ON shady_broker_engagements(contact_email);

-- Create index on EIN for lookups
CREATE INDEX idx_shady_broker_engagements_ein ON shady_broker_engagements(ein);

-- Create index on engagement state
CREATE INDEX idx_shady_broker_engagements_state ON shady_broker_engagements(engagement_state);

-- Create index on created_at for sorting
CREATE INDEX idx_shady_broker_engagements_created_at ON shady_broker_engagements(created_at DESC);

-- Enable RLS
ALTER TABLE shady_broker_engagements ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated admin users can read/write
CREATE POLICY "Admin access only" ON shady_broker_engagements
  FOR ALL
  USING (auth.uid() IS NOT NULL);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_shady_broker_engagements_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_shady_broker_engagements_timestamp
  BEFORE UPDATE ON shady_broker_engagements
  FOR EACH ROW
  EXECUTE FUNCTION update_shady_broker_engagements_updated_at();

-- Add comment on table
COMMENT ON TABLE shady_broker_engagements IS 'Tracks Shady Broker Report engagements from payment through delivery';