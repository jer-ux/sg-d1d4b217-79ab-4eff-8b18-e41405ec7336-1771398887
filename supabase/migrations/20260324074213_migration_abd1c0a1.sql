-- Allow public inserts to contract insights for demo org
CREATE POLICY "Allow public inserts to demo org insights"
ON contract_insights
FOR INSERT
WITH CHECK (
  upload_id IN (
    SELECT id FROM contract_uploads 
    WHERE organization_id = '11111111-1111-1111-1111-111111111111'
  )
);