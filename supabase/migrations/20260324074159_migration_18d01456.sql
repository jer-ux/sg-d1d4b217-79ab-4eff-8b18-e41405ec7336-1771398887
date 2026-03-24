-- Allow public updates to demo org contracts (for status updates during processing)
CREATE POLICY "Allow public updates to demo org contracts"
ON contract_uploads
FOR UPDATE
USING (organization_id = '11111111-1111-1111-1111-111111111111')
WITH CHECK (organization_id = '11111111-1111-1111-1111-111111111111');