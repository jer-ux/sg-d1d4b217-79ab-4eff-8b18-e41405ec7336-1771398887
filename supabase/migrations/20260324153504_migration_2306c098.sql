-- Make user_id nullable in contract_uploads (allow anonymous uploads)
ALTER TABLE contract_uploads
ALTER COLUMN user_id DROP NOT NULL;

-- Drop the foreign key constraint on user_id if it exists
ALTER TABLE contract_uploads
DROP CONSTRAINT IF EXISTS contract_uploads_user_id_fkey;