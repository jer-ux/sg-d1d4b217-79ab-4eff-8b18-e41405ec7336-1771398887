-- Create policy to allow anyone to upload to the contract-uploads bucket
CREATE POLICY "Allow public uploads to contract-uploads"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'contract-uploads');

-- Create policy to allow anyone to read from the contract-uploads bucket
CREATE POLICY "Allow public reads from contract-uploads"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'contract-uploads');