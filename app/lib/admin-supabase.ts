import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client with service role key
// This client bypasses RLS policies and should ONLY be used in server-side code
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

// Create a Supabase client with the service role key
export const adminSupabase = createClient(supabaseUrl, supabaseServiceKey);
