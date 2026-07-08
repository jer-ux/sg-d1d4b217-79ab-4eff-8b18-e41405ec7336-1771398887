-- Add new portal roles to profiles table
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('owner', 'admin', 'manager', 'analyst', 'viewer', 'auditor', 'internal_team', 'investor', 'partner'));

-- Create portal_access table for granular permissions
CREATE TABLE IF NOT EXISTS portal_access (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  portal_type text NOT NULL CHECK (portal_type IN ('tools', 'investor', 'admin')),
  permissions jsonb DEFAULT '{"read": true, "write": false, "export": false}'::jsonb,
  granted_by uuid REFERENCES profiles(id),
  granted_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_portal_access_user ON portal_access(user_id, portal_type);
CREATE INDEX IF NOT EXISTS idx_portal_access_active ON portal_access(is_active);

-- Enable RLS on portal_access
ALTER TABLE portal_access ENABLE ROW LEVEL SECURITY;

-- Portal access policies
CREATE POLICY "Users can view their own portal access"
  ON portal_access FOR SELECT
  TO public
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage portal access"
  ON portal_access FOR ALL
  TO public
  USING (
    auth.uid() IN (
      SELECT id FROM profiles 
      WHERE role IN ('admin', 'owner', 'internal_team')
    )
  );