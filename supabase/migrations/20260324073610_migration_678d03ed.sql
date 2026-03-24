-- Also allow public access to analysis results for demo org contracts
CREATE POLICY "Allow public view of demo org analysis results"
ON contract_analysis_results
FOR SELECT
USING (
  upload_id IN (
    SELECT id FROM contract_uploads 
    WHERE organization_id = '11111111-1111-1111-1111-111111111111'
  )
);

-- Allow public inserts to analysis results for demo org contracts
CREATE POLICY "Allow public inserts to demo org analysis results"
ON contract_analysis_results
FOR INSERT
WITH CHECK (
  upload_id IN (
    SELECT id FROM contract_uploads 
    WHERE organization_id = '11111111-1111-1111-1111-111111111111'
  )
);