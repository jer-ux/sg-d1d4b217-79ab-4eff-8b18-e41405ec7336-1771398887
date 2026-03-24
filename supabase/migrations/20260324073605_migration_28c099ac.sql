-- Create policy to allow public uploads to demo organization
CREATE POLICY "Allow public uploads to demo org"
ON contract_uploads
FOR INSERT
WITH CHECK (
  organization_id = '11111111-1111-1111-1111-111111111111'
);

-- Create policy to allow anyone to view demo org contracts
CREATE POLICY "Allow public view of demo org contracts"
ON contract_uploads
FOR SELECT
USING (
  organization_id = '11111111-1111-1111-1111-111111111111'
);