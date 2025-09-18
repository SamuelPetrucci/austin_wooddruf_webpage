-- Austin Woodruff Insurance - Database Setup
-- Run this SQL in your Supabase SQL editor to create the table for Austin Woodruff's form submissions

CREATE TABLE IF NOT EXISTS austin_woodruff_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  zip_code VARCHAR(10) NOT NULL,
  date_of_birth DATE NOT NULL,
  annual_income VARCHAR(50) NOT NULL,
  health_status VARCHAR(100) NOT NULL,
  medications TEXT,
  dependents TEXT,
  monthly_budget VARCHAR(50) NOT NULL,
  coverage_type VARCHAR(100) NOT NULL,
  additional_info TEXT,
  referred_by BOOLEAN DEFAULT FALSE,
  referral_name VARCHAR(255),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'quoted', 'closed')),
  source VARCHAR(100) DEFAULT 'Austin Woodruff Insurance Website',
  agent_name VARCHAR(100) DEFAULT 'Austin Woodruff',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_austin_woodruff_submissions_email ON austin_woodruff_submissions(email);

-- Create an index on status for filtering
CREATE INDEX IF NOT EXISTS idx_austin_woodruff_submissions_status ON austin_woodruff_submissions(status);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_austin_woodruff_submissions_created_at ON austin_woodruff_submissions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE austin_woodruff_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows service role to insert and select
CREATE POLICY "Service role can manage austin_woodruff_submissions" ON austin_woodruff_submissions
  FOR ALL USING (auth.role() = 'service_role');

-- Create a policy for authenticated users to read their own submissions (if needed)
CREATE POLICY "Users can view their own submissions" ON austin_woodruff_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_austin_woodruff_submissions_updated_at 
  BEFORE UPDATE ON austin_woodruff_submissions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert a sample record to test the table (optional - remove this in production)
-- INSERT INTO austin_woodruff_submissions (
--   first_name, last_name, email, phone, zip_code, date_of_birth, 
--   annual_income, health_status, monthly_budget, coverage_type
-- ) VALUES (
--   'John', 'Doe', 'john.doe@example.com', '555-1234', '12345', '1990-01-01',
--   '$50,000-$75,000', 'Excellent', '$200-$300', 'Health Insurance'
-- );
