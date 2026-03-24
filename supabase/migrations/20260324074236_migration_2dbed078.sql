-- Allow public view of demo org benchmarks
CREATE POLICY "Allow public view of demo org benchmarks"
ON contract_benchmarks
FOR SELECT
USING (
  upload_id IN (
    SELECT id FROM contract_uploads 
    WHERE organization_id = '11111111-1111-1111-1111-111111111111'
  )
);