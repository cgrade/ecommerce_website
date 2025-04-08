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
   * @param {number} amount - The payment amount in Naira.
   * @param {Object} customer - Customer information.
   * @returns {Promise<{ success: boolean, txRef: string, amount: number }>} The payment initialization details.
   * @description Initializes a Flutterwave payment with the specified amount.
   */
  export const initializePayment = async (amount: number, customer?: { email?: string, name?: string, phone?: string }): Promise<{ success: boolean, txRef: string, amount: number }> => {
    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, customer }), // Amount in Naira
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment initialization failed');
      }
      
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error initializing payment:', error);
      throw error;
    }
  };
  
  /**
   * @param {string} transactionId - The Flutterwave transaction ID.
   * @param {string} txRef - The transaction reference.
   * @returns {Promise<{ status: string, message: string, data?: any }>} The verification result.
   * @description Verifies a Flutterwave payment transaction.
   */
  export const verifyPayment = async (transactionId: string, txRef: string): Promise<{ status: string, message: string, data?: any }> => {
    try {
      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transaction_id: transactionId, tx_ref: txRef }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment verification failed');
      }
      
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error verifying payment:', error);
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