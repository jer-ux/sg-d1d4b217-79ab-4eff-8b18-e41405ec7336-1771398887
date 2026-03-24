-- Allow public inserts to provision analysis for demo org
CREATE POLICY "Allow public inserts to demo org provision analysis"
ON contract_provision_analysis
FOR INSERT
WITH CHECK (
  analysis_id IN (
    SELECT car.id 
    FROM contract_analysis_results car
    JOIN contract_uploads cu ON car.upload_id = cu.id
    WHERE cu.organization_id = '11111111-1111-1111-1111-111111111111'
  )
);