-- Add missing columns to the existing orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS items JSONB;

-- Add email_sent column if it doesn't exist
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS email_sent BOOLEAN DEFAULT false;

-- Add payment columns if they don't exist
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_id TEXT,
ADD COLUMN IF NOT EXISTS payment_reference TEXT,
ADD COLUMN IF NOT EXISTS payment_provider TEXT;
