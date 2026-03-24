-- Create simple, non-circular policies for contract_analysis_results (demo org only)
-- Fix: use correct column name 'upload_id'
DROP POLICY IF EXISTS "Public can insert analysis for demo org" ON contract_analysis_results;
DROP POLICY IF EXISTS "Public can view analysis for demo org" ON contract_analysis_results;

CREATE POLICY "Public can insert analysis for demo org"
ON contract_analysis_results
FOR INSERT
TO public
WITH CHECK (
  upload_id IN (
    SELECT id 
    FROM contract_uploads 
    WHERE organization_id = '11111111-1111-1111-1111-111111111111'::uuid
  )
);

CREATE POLICY "Public can view analysis for demo org"
ON contract_analysis_results
FOR SELECT
TO public
USING (
  upload_id IN (
    SELECT id 
    FROM contract_uploads 
    WHERE organization_id = '11111111-1111-1111-1111-111111111111'::uuid
  )
);