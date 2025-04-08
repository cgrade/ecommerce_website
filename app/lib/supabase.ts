import { createClient } from '@supabase/supabase-js';
import { Product } from '../types/product';
import { User } from '../types/user';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * @param {any} [params] - Optional query parameters for filtering.
 * @returns {Promise<Product[]>} List of products.
 * @description Fetches all products from Supabase.
 */
export const fetchProductsFromSupabase = async (params?: any): Promise<Product[]> => {
  let query = supabase.from('products').select('*');

  // Ensure params is properly awaited if it's a promise
  const resolvedParams = params instanceof Promise ? await params : params;

  if (resolvedParams?.q) {
    query = query.ilike('name', `%${resolvedParams.q}%`);
  }

  const { data, error } = await query;
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * @param {string} id - The product ID.
 * @returns {Promise<Product>} The product data.
 * @description Fetches a single product by ID from Supabase.
 */
export const fetchProductByIdFromSupabase = async (id: string): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * @param {Omit<Product, 'id' | 'created_at'>} product - The product data to add.
 * @returns {Promise<Product>} The added product.
 * @description Adds a new product to Supabase.
 */
export const addProductToSupabase = async (
  product: Omit<Product, 'id' | 'created_at'>
): Promise<Product> => {
  try {
    // Explicitly specify the columns we want to insert
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        stock: product.stock,
        is_best_seller: product.is_best_seller
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }
    return data;
  } catch (error: any) {
    console.error('Error adding product:', error);
    throw error;
  }
};

/**
 * @param {string} id - The product ID.
 * @param {Partial<Product>} product - The updated product data.
 * @returns {Promise<Product>} The updated product.
 * @description Updates an existing product in Supabase.
 */
export const updateProductInSupabase = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  try {
    // Create an update object with only the fields that are provided
    const updateData: any = {};
    if (product.name !== undefined) updateData.name = product.name;
    if (product.price !== undefined) updateData.price = product.price;
    if (product.description !== undefined) updateData.description = product.description;
    if (product.image !== undefined) updateData.image = product.image;
    if (product.stock !== undefined) updateData.stock = product.stock;
    if (product.is_best_seller !== undefined) updateData.is_best_seller = product.is_best_seller;
    
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      throw new Error(error.message);
    }
    return data;
  } catch (error: any) {
    console.error('Error updating product:', error);
    throw error;
  }
};

/**
 * @param {string} id - The product ID.
 * @returns {Promise<void>} Promise that resolves when the product is deleted.
 * @description Deletes a product from Supabase.
 */
export const deleteProductFromSupabase = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};

/**
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<User | null>} The user data if found.
 * @description Fetches a user by email and password for authentication.
 */
export const fetchUserByCredentials = async (
  email: string,
  password: string
): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .eq('password', password) // In production, use hashed passwords
    .single();

  if (error) {
    return null;
  }
  return data;
};

/**
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} name - The user's name.
 * @param {string} role - The user's role (default: 'user').
 * @param {string} verificationToken - Token for email verification.
 * @returns {Promise<User>} The created user.
 * @description Registers a new user in Supabase with email verification.
 */
export const createUserInSupabase = async (
  email: string,
  password: string,
  name: string,
  role: string = 'user'
): Promise<User> => {
  // In a real application, you would first check if the database has the necessary columns
  // and create a migration if needed
  
  const { data, error } = await supabase
    .from('users')
    .insert([{ 
      email, 
      password, // In production, hash the password
      name, 
      role
    }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * @param {string} email - The user's email.
 * @returns {Promise<void>}
 * @description Simulates sending a verification email to the user.
 */
export const sendVerificationEmail = async (
  email: string
): Promise<void> => {
  // In a real application, you would use a service like SendGrid, Mailgun, etc.
  // For this simulation, we'll just log that an email would be sent
  
  console.log(`[SIMULATION] Verification email would be sent to ${email}`);
  console.log(`[SIMULATION] In a real implementation, this would contain a verification link`);
  
  // In a real implementation with proper database schema, you would:
  // 1. Generate a verification token
  // 2. Store it in the database
  // 3. Send an email with a verification link
};