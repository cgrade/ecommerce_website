-- Query to check the structure of the existing orders table
SELECT 
  column_name, 
  data_type, 
  column_default,
  is_nullable
FROM 
  information_schema.columns 
WHERE 
  table_name = 'orders';

-- Check if the table has the necessary fields for our email notifications
SELECT EXISTS (
  SELECT 1 
  FROM information_schema.columns 
  WHERE table_name = 'orders' AND column_name = 'email_sent'
) AS has_email_sent_column;

-- Check existing RLS policies
SELECT * FROM pg_policies WHERE tablename = 'orders';
