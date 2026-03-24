-- Drop existing policies on contract_uploads that might be blocking
DROP POLICY IF EXISTS "Users can insert their own contract uploads" ON contract_uploads;
DROP POLICY IF EXISTS "Users can view their own contract uploads" ON contract_uploads;
DROP POLICY IF EXISTS "Users can update their own contract uploads" ON contract_uploads;
DROP POLICY IF EXISTS "Users can delete their own contract uploads" ON contract_uploads;

-- Create new policies that allow public access for demo organization
CREATE POLICY "Allow public insert for demo org" 
ON contract_uploads 
FOR INSERT 
TO public
WITH CHECK (
  organization_id = '11111111-1111-1111-1111-111111111111'::uuid
);

CREATE POLICY "Allow public select for demo org" 
ON contract_uploads 
FOR SELECT 
TO public
USING (
  organization_id = '11111111-1111-1111-1111-111111111111'::uuid
);

CREATE POLICY "Allow public update for demo org" 
ON contract_uploads 
FOR UPDATE 
TO public
USING (
  organization_id = '11111111-1111-1111-1111-111111111111'::uuid
);

-- Also ensure contract_analysis_results allows public access for demo org
DROP POLICY IF EXISTS "Users can insert their own analysis results" ON contract_analysis_results;
DROP POLICY IF EXISTS "Users can view their own analysis results" ON contract_analysis_results;

CREATE POLICY "Allow public insert for demo org analysis" 
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

CREATE POLICY "Allow public select for demo org analysis" 
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