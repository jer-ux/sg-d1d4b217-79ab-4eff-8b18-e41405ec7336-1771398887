-- Allow public inserts to contract benchmarks for demo org
CREATE POLICY "Allow public inserts to demo org benchmarks"
ON contract_benchmarks
FOR INSERT
WITH CHECK (
  upload_id IN (
    SELECT id FROM contract_uploads 
    WHERE organization_id = '11111111-1111-1111-1111-111111111111'
  )
);