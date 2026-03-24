-- Allow public view of demo org recommendations
CREATE POLICY "Allow public view of demo org recommendations"
ON contract_recommendations
FOR SELECT
USING (
  upload_id IN (
    SELECT id FROM contract_uploads 
    WHERE organization_id = '11111111-1111-1111-1111-111111111111'
  )
);