import {
    fetchProductsFromSupabase,
    fetchProductByIdFromSupabase,
    addProductToSupabase,
    updateProductInSupabase,
    deleteProductFromSupabase,
  } from './supabase';
  import { Product } from '../types/product';
  
  /**
   * @param {any} [params] - Optional query parameters for filtering.
   * @returns {Promise<Product[]>} List of products.
   * @description Fetches all products from Supabase.
   */
  export const fetchProducts = async (params?: any): Promise<Product[]> => {
    return await fetchProductsFromSupabase(params);
  };
  
  /**
   * @param {string} id - The product ID.
   * @returns {Promise<Product>} The product data.
   * @description Fetches a single product by ID from Supabase.
   */
  export const fetchProductById = async (id: string): Promise<Product> => {
    return await fetchProductByIdFromSupabase(id);
  };
  
  /**
   * @param {number} amount - The payment amount in dollars.
   * @returns {Promise<{ clientSecret: string, paymentIntentId?: string }>} The payment intent details.
   * @description Creates a Stripe payment intent with the specified amount.
   */
  export const createPaymentIntent = async (amount: number): Promise<{ clientSecret: string, paymentIntentId?: string }> => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }), // Amount in dollars (will be converted to cents in the API)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment intent creation failed');
      }
      
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  };
  
  /**
   * @param {Omit<Product, 'id' | 'created_at'>} product - The product data to add.
   * @returns {Promise<Product>} The added product.
   * @description Adds a new product via Supabase.
   */
  export const addProduct = async (product: Omit<Product, 'id' | 'created_at'>): Promise<Product> => {
    return await addProductToSupabase(product);
  };
  
  /**
   * @param {string} id - The product ID.
   * @param {Partial<Product>} product - The updated product data.
   * @returns {Promise<Product>} The updated product.
   * @description Updates an existing product via Supabase.
   */
  export const updateProduct = async (id: string, product: Partial<Product>): Promise<Product> => {
    return await updateProductInSupabase(id, product);
  };
  
  /**
   * @param {string} id - The product ID.
   * @returns {Promise<void>} Promise that resolves when the product is deleted.
   * @description Deletes a product via Supabase.
   */
  export const deleteProduct = async (id: string): Promise<void> => {
    return await deleteProductFromSupabase(id);
  };