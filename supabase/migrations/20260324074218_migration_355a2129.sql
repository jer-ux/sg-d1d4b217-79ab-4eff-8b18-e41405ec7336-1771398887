-- Allow public view of demo org insights
CREATE POLICY "Allow public view of demo org insights"
ON contract_insights
FOR SELECT
USING (
  upload_id IN (
    SELECT id FROM contract_uploads 
    WHERE organization_id = '11111111-1111-1111-1111-111111111111'
  )
);