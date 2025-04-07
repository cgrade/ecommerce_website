# Setting Up Supabase Storage for Product Images

This guide explains how to set up Supabase Storage for product image uploads in your ecommerce website.

## Step 1: Create a Storage Bucket

1. Go to your Supabase project dashboard: https://app.supabase.com/
2. Click on "Storage" in the left sidebar
3. Click the "New Bucket" button
4. Enter "product-images" as the bucket name
5. Check the "Public bucket" option to make files publicly accessible
6. Click "Create bucket"

## Step 2: Configure Row Level Security (RLS) Policies

After creating the bucket, you need to set up proper permissions:

1. In the Storage section, click on the "product-images" bucket
2. Click on the "Policies" tab
3. Click "Add Policy" button

### For Public Read Access:

1. Select "GET" (download files) from the dropdown
2. Choose "Custom policy"
3. Enter a name like "Public Read Access"
4. In the policy definition, enter:
   ```sql
   true
   ```
5. Click "Save policy"

### For Authenticated Upload Access:

1. Click "Add Policy" again
2. Select "INSERT" (upload files) from the dropdown
3. Choose "Custom policy"
4. Enter a name like "Authenticated Upload Access"
5. In the policy definition, enter:
   ```sql
   auth.role() = 'authenticated'
   ```
6. Click "Save policy"

### For Admin Update/Delete Access:

1. Click "Add Policy" again
2. Select "UPDATE" from the dropdown
3. Choose "Custom policy"
4. Enter a name like "Admin Update Access"
5. In the policy definition, enter:
   ```sql
   auth.uid() IN (SELECT id FROM auth.users WHERE is_admin = true)
   ```
6. Click "Save policy"

7. Repeat for "DELETE" with similar settings

## Step 3: Test Your Setup

After configuring the bucket and policies, you should be able to upload images from your admin dashboard. The system will store the images in Supabase and return public URLs that can be used to display the products on your website.

## Troubleshooting

If you encounter permission errors:

1. Make sure you're properly authenticated when uploading files
2. Verify that all the RLS policies are correctly set up
3. Check that the bucket name in your code matches exactly with the one in Supabase (case-sensitive)
4. Ensure your Supabase API keys in the environment variables are correct
