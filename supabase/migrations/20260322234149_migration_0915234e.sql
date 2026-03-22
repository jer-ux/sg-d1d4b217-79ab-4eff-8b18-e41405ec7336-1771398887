-- Add missing enterprise columns to profiles table
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'viewer';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mfa_enabled BOOLEAN DEFAULT false;

-- Add constraint for role
DO $$ BEGIN
  ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
    CHECK (role IN ('owner', 'admin', 'manager', 'analyst', 'viewer', 'auditor'));
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_organization_id ON profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_last_login ON profiles(last_login_at DESC);

-- Update RLS policies for profiles to include organization context
DROP POLICY IF EXISTS "Users can view organization members" ON profiles;
CREATE POLICY "Users can view organization members" ON profiles
  FOR SELECT
  USING (
    id = auth.uid() OR
    organization_id IN (
      SELECT organization_id FROM organization_members WHERE user_id = auth.uid()
    )
  );