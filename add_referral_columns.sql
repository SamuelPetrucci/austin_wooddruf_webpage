-- Add referral columns to existing austin_woodruff_submissions table
-- Run these commands in your Supabase SQL editor

-- Add the referred_by column
ALTER TABLE austin_woodruff_submissions 
ADD COLUMN IF NOT EXISTS referred_by BOOLEAN DEFAULT FALSE;

-- Add the referral_name column
ALTER TABLE austin_woodruff_submissions 
ADD COLUMN IF NOT EXISTS referral_name VARCHAR(255);

-- Verify the columns were added
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'austin_woodruff_submissions' 
AND column_name IN ('referred_by', 'referral_name');


