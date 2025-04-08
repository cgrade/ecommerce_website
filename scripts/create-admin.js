// Script to create an admin user or update an existing user to admin role
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL and service role key are required.');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Get command line arguments
const args = process.argv.slice(2);
const email = args[0];
const password = args[1];
const name = args[2] || 'Admin User';

if (!email || !password) {
  console.error('Usage: node create-admin.js <email> <password> [name]');
  console.error('Example: node create-admin.js admin@example.com securePassword "Admin User"');
  process.exit(1);
}

async function createOrUpdateAdminUser() {
  try {
    // Check if user already exists
    const { data: existingUser, error: searchError } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('email', email)
      .single();

    if (searchError && searchError.code !== 'PGRST116') {
      throw searchError;
    }

    if (existingUser) {
      // Update existing user to admin role
      const { data, error } = await supabase
        .from('users')
        .update({ role: 'admin' })
        .eq('id', existingUser.id)
        .select();

      if (error) throw error;
      
      console.log('✅ User updated to admin role:');
      console.log(`Email: ${existingUser.email}`);
      console.log(`ID: ${existingUser.id}`);
      console.log(`Role: admin (updated from ${existingUser.role})`);
    } else {
      // Create new admin user
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            email,
            password, // Note: In production, this should be hashed
            name,
            role: 'admin'
          }
        ])
        .select();

      if (error) throw error;
      
      console.log('✅ Admin user created successfully:');
      console.log(`Email: ${email}`);
      console.log(`ID: ${data[0].id}`);
      console.log(`Role: admin`);
    }
  } catch (error) {
    console.error('❌ Error creating/updating admin user:', error.message);
    process.exit(1);
  }
}

createOrUpdateAdminUser();
