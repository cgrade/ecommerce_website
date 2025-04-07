import { NextResponse } from 'next/server';
import { adminSupabase } from '../../lib/admin-supabase';

// Bucket name for product images - this bucket must be created manually in the Supabase dashboard
const BUCKET_NAME = 'product-images';

/**
 * @param {Request} request - The incoming request with the image file.
 * @returns {Promise<NextResponse>} The response with the uploaded image URL.
 * @description Handles POST requests to upload an image to Supabase storage.
 */
export async function POST(request: Request) {
  try {
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const fileBuffer = await file.arrayBuffer();
    const fileData = new Uint8Array(fileBuffer);
    
    // Generate a unique filename
    const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    
    // Upload to Supabase storage using admin client to bypass RLS
    const { data, error } = await adminSupabase
      .storage
      .from(BUCKET_NAME)
      .upload(fileName, fileData, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true // Set to true to overwrite existing files with the same name
      });
    
    if (error) {
      console.error('Supabase storage error:', error);
      
      // Provide more detailed error information
      if (error.message.includes('security policy')) {
        return NextResponse.json({ 
          error: 'Permission denied. Please make sure the bucket exists and has proper permissions.', 
          details: 'You need to create a bucket named "product-images" in the Supabase dashboard and configure its RLS policies.',
          originalError: error.message 
        }, { status: 403 });
      }
      
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Get the public URL for the uploaded file
    const { data: { publicUrl } } = adminSupabase
      .storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);
    
    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
