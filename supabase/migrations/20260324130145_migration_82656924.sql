-- Drop the circular policies on organization_members
DROP POLICY IF EXISTS "Members can view org members" ON organization_members;
DROP POLICY IF EXISTS "Admins can manage members" ON organization_members;

-- Create new non-circular policies for organization_members
-- Allow viewing members of demo org publicly
CREATE POLICY "Public can view demo org members"
ON organization_members
FOR SELECT
TO public
USING (organization_id = '11111111-1111-1111-1111-111111111111');

-- Allow viewing members if you're authenticated and part of the org
CREATE POLICY "Members can view their org members"
ON organization_members
FOR SELECT
TO public
USING (
  auth.uid() IS NOT NULL 
  AND organization_id IN (
    SELECT om.organization_id 
    FROM organization_members om 
    WHERE om.user_id = auth.uid() 
    AND om.organization_id != '11111111-1111-1111-1111-111111111111'
  )
);

-- Allow admins to manage non-demo org members
CREATE POLICY "Admins can manage org members"
ON organization_members
FOR ALL
TO public
USING (
  auth.uid() IS NOT NULL
  AND organization_id IN (
    SELECT om.organization_id
    FROM organization_members om
    WHERE om.user_id = auth.uid()
    AND om.role IN ('owner', 'admin')
    AND om.organization_id != '11111111-1111-1111-1111-111111111111'
  )
);