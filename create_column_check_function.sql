-- Create a function to check if columns exist in a table
CREATE OR REPLACE FUNCTION check_columns_exist(
  p_table_name TEXT,
  p_columns TEXT[]
) 
RETURNS JSONB
LANGUAGE plpgsql
AS $$
DECLARE
  result JSONB := '{}'::JSONB;
  col TEXT;
BEGIN
  -- Loop through each column name
  FOREACH col IN ARRAY p_columns
  LOOP
    -- Check if column exists in the specified table
    result := result || jsonb_build_object(
      col, 
      EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = p_table_name AND column_name = col
      )
    );
  END LOOP;
  
  RETURN result;
END;
$$;
