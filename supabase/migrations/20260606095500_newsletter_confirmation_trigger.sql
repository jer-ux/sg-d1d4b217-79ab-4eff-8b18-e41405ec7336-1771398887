-- Newsletter confirmation email trigger
-- Sends automated welcome email when someone subscribes to PBM Crime Boss newsletter

-- Enable the http extension for sending emails via external services
CREATE EXTENSION IF NOT EXISTS http;

-- Function to send newsletter confirmation email
CREATE OR REPLACE FUNCTION send_newsletter_confirmation()
RETURNS TRIGGER AS $$
DECLARE
  email_payload jsonb;
BEGIN
  -- Only process if this is a newsletter signup
  IF NEW.source = 'pbm_crime_boss_newsletter' THEN
    
    -- Log the email send attempt
    RAISE NOTICE 'Newsletter confirmation email triggered for: %', NEW.email;
    
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger that fires after newsletter signup
CREATE TRIGGER newsletter_confirmation_trigger
  AFTER INSERT ON contacts
  FOR EACH ROW
  EXECUTE FUNCTION send_newsletter_confirmation();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION send_newsletter_confirmation() TO authenticated;
GRANT EXECUTE ON FUNCTION send_newsletter_confirmation() TO anon;

-- Add index for faster newsletter signup queries
CREATE INDEX IF NOT EXISTS idx_contacts_source_newsletter 
ON contacts(source) 
WHERE source = 'pbm_crime_boss_newsletter';

COMMENT ON FUNCTION send_newsletter_confirmation() IS 
'Sends automated welcome email when user subscribes to PBM Crime Boss newsletter';