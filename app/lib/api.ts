import {
    fetchProductsFromSupabase,
    fetchProductByIdFromSupabase,
    addProductToSupabase,
    updateProductInSupabase,
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
   * @returns {Promise<{ clientSecret: string }>} The payment intent client secret.
   * @description Creates a Stripe payment intent.
   */
  export const createPaymentIntent = async (): Promise<{ clientSecret: string }> => {
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1000 }), // Example amount in cents
    });
    const data = await response.json();
    return data;
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