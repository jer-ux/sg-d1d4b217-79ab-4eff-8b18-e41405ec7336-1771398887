-- Drop existing policies on contract_analysis_results
DROP POLICY IF EXISTS "Users can view analyses for their uploads" ON contract_analysis_results;
DROP POLICY IF EXISTS "Users can insert analyses for their uploads" ON contract_analysis_results;
DROP POLICY IF EXISTS "Users can update analyses for their uploads" ON contract_analysis_results;

-- Create new policies that allow public access for demo org uploads
CREATE POLICY "Allow public view of demo org analyses"
ON contract_analysis_results
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 FROM contract_uploads
    WHERE contract_uploads.id = contract_analysis_results.upload_id
    AND contract_uploads.organization_id = '11111111-1111-1111-1111-111111111111'::uuid
  )
);

CREATE POLICY "Allow public insert of demo org analyses"
ON contract_analysis_results
FOR INSERT
TO public
WITH CHECK (
  EXISTS (
    SELECT 1 FROM contract_uploads
    WHERE contract_uploads.id = contract_analysis_results.upload_id
    AND contract_uploads.organization_id = '11111111-1111-1111-1111-111111111111'::uuid
  )
);

CREATE POLICY "Allow public update of demo org analyses"
ON contract_analysis_results
FOR UPDATE
TO public
USING (
  EXISTS (
    SELECT 1 FROM contract_uploads
    WHERE contract_uploads.id = contract_analysis_results.upload_id
    AND contract_uploads.organization_id = '11111111-1111-1111-1111-111111111111'::uuid
  )
);