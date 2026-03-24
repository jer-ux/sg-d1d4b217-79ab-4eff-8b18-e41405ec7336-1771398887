-- Allow public view of demo org provision analysis
CREATE POLICY "Allow public view of demo org provision analysis"
ON contract_provision_analysis
FOR SELECT
USING (
  analysis_id IN (
    SELECT car.id 
    FROM contract_analysis_results car
    JOIN contract_uploads cu ON car.upload_id = cu.id
    WHERE cu.organization_id = '11111111-1111-1111-1111-111111111111'
  )
);