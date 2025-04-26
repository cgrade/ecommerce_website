import { createClient } from '@supabase/supabase-js';
import { Product } from '../types/product';
import { User } from '../types/user';

// Define types for connection status monitoring
type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error';
type ConnectionStatusListener = (status: ConnectionStatus) => void;

// Connection status listeners
const statusListeners: ConnectionStatusListener[] = [];

// Initialize Supabase client with proper error handling
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Max retry count for Supabase operations
const MAX_RETRIES = 3;

// Create a function that initializes the client with custom settings
const getSupabaseClient = () => {
  if (!supabaseUrl) throw new Error('supabaseUrl is required');
  if (!supabaseAnonKey) throw new Error('supabaseAnonKey is required');
  
  // Create client with additional options for better performance and reliability
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    global: {
      headers: {
        'x-application-name': 'ecommerce-website'
      },
    },
  });
};

// Client-side only initialization with connection state management
let supabaseClient: ReturnType<typeof createClient> | null = null;
let connectionStatus: ConnectionStatus = 'disconnected';

// Update connection status and notify listeners
const updateConnectionStatus = (status: ConnectionStatus) => {
  if (connectionStatus !== status) {
    connectionStatus = status;
    statusListeners.forEach(listener => listener(status));
  }
};

// Function to subscribe to connection status changes
export const onConnectionStatusChange = (listener: ConnectionStatusListener) => {
  statusListeners.push(listener);
  listener(connectionStatus); // Immediately call with current status
  
  // Return function to unsubscribe
  return () => {
    const index = statusListeners.indexOf(listener);
    if (index !== -1) statusListeners.splice(index, 1);
  };
};

// Gets the client or initializes it if it doesn't exist
export const supabase = (() => {
  try {
    // Only initialize in browser environment
    if (typeof window !== 'undefined' && !supabaseClient) {
      updateConnectionStatus('connecting');
      console.log('Initializing Supabase client...');
      supabaseClient = getSupabaseClient();
      
      // Ping Supabase to verify connection
      if (supabaseClient) {
        const pingConnection = async () => {
          try {
            await supabaseClient.from('products').select('count').limit(1).single();
            updateConnectionStatus('connected');
          } catch (error: any) {
            console.error('Connection verification failed:', error.message || error);
            updateConnectionStatus('error');
          }
        };
        pingConnection();
      }
    }
    // Return existing client or create a new one, ensuring we never return null
    return supabaseClient ?? getSupabaseClient();
  } catch (error) {
    updateConnectionStatus('error');
    console.error('Failed to initialize Supabase client:', error);
    throw error;
  }
})();

/**
 * Fetches all products from Supabase with retry mechanism and performance optimizations
 * @param {any} [params] - Optional query parameters for filtering
 * @returns {Promise<Product[]>} List of products
 */
export const fetchProductsFromSupabase = async (params?: any): Promise<Product[]> => {
  let retryCount = 0;
  
  const executeQuery = async (): Promise<Product[]> => {
    try {
      updateConnectionStatus('connecting');
      
      // Await params to fix the "searchParams should be awaited" error
      const resolvedParams = params ? await Promise.resolve(params) : null;
      
      let query = supabase.from('products').select('*');

      // Apply filters if params are provided
      if (resolvedParams?.category) {
        query = query.eq('category', resolvedParams.category);
      }

      if (resolvedParams?.is_best_seller) {
        query = query.eq('is_best_seller', resolvedParams.is_best_seller);
      }
      
      // Add appropriate columns to select based on the view context
      // This helps performance by reducing data transfer
      if (resolvedParams?.view === 'list') {
        query = supabase.from('products').select('id, name, price, image, is_best_seller');
      } else if (resolvedParams?.view === 'detail') {
        query = supabase.from('products').select('*');
      }

      const { data, error } = await query.order('updated_at', { ascending: false });

      if (error) throw error;
      updateConnectionStatus('connected');
      return data as Product[];
    } catch (error: any) {
      // Implement retry logic for retriable errors
      if (retryCount < MAX_RETRIES && (error.code === 'PGRST116' || error.status === 408 || error.status === 500 || error.status === 503)) {
        retryCount++;
        console.log(`Retrying fetchProducts (${retryCount}/${MAX_RETRIES})...`);
        const backoffTime = Math.min(1000 * (2 ** retryCount), 10000); // Exponential backoff with max of 10s
        await new Promise(resolve => setTimeout(resolve, backoffTime));
        return executeQuery();
      }
      
      updateConnectionStatus('error');
      console.error('Error fetching products:', error);
      throw error;
    }
  };
  
  return executeQuery();
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
        image: product.image, // deprecated, for backward compatibility
        image_urls: product.image_urls || [],
        stock: product.stock,
        is_best_seller: product.is_best_seller,
        sizes: product.sizes || []
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
    if (product.image_urls !== undefined) updateData.image_urls = product.image_urls;
    if (product.sizes !== undefined) updateData.sizes = product.sizes;
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