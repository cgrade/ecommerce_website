import { createClient } from '@supabase/supabase-js';

// Initialize Supabase admin client with service role key for server components only
// This client bypasses RLS policies and should ONLY be used in server-side code

const getAdminSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';
  
  if (!supabaseUrl) throw new Error('supabaseUrl is required');
  if (!supabaseServiceKey) throw new Error('supabaseServiceKey is required');
  
  return createClient(supabaseUrl, supabaseServiceKey);
};

// Only initialize the client when it's actually needed
// This helps with build-time vs runtime environment variables
export const adminSupabase = {
  get client() {
    // This ensures we only create the client when actually used
    return getAdminSupabaseClient();
  }
};
