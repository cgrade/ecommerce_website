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

  if (params?.q) {
    query = query.ilike('name', `%${params.q}%`);
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
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
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
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
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
 * @returns {Promise<User>} The created user.
 * @description Registers a new user in Supabase.
 */
export const createUserInSupabase = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ email, password, name }]) // In production, hash the password
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};