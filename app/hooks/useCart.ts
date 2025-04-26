import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';

interface CartState {
  cart: CartItem[];
  items: CartItem[];
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

// Helper function to calculate total from cart items
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

/**
 * @description Custom hook for managing cart state.
 */
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      // Core cart state
      cart: [],
      items: [],
      total: 0,
      
      // Initialize items and total when store is rehydrated
      onRehydrateStorage: (state: unknown) => {
        // This runs when the store is rehydrated from localStorage
        return (rehydratedState: CartState | null, error: Error | null) => {
          if (error) {
            console.error('Error rehydrating cart:', error);
            return;
          }
          
          if (rehydratedState?.cart?.length) {
            // Update items and total based on rehydrated cart
            set({
              ...rehydratedState,
              items: rehydratedState.cart,
              total: calculateTotal(rehydratedState.cart)
            });
            console.log('Cart rehydrated successfully:', rehydratedState.cart.length, 'items');
          }
        };
      },
      
      // Add to cart method
      addToCart: (product) =>
        set((state) => {
          // If the product has a selectedSize, we need to check for the specific size
          // This way users can add multiple sizes of the same product
          const existingItemIndex = state.cart.findIndex((item) => 
            item.id === product.id && 
            (product.selectedSize ? item.selectedSize === product.selectedSize : true)
          );
          
          let newCart;
          
          if (existingItemIndex !== -1) {
            // Update quantity of existing item with same size
            newCart = state.cart.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            // Add as a new item
            newCart = [...state.cart, { ...product, quantity: 1 }];
          }
          
          return {
            cart: newCart,
            items: newCart,
            total: calculateTotal(newCart)
          };
        }),
      
      // Remove from cart method
      removeFromCart: (id) =>
        set((state) => {
          const newCart = state.cart.filter((item) => item.id !== id);
          return {
            cart: newCart,
            items: newCart,
            total: calculateTotal(newCart)
          };
        }),
      
      // Update quantity method
      updateQuantity: (id, quantity) =>
        set((state) => {
          const newCart = state.cart.map((item) =>
            item.id === id ? { ...item, quantity } : item
          );
          return {
            cart: newCart,
            items: newCart,
            total: calculateTotal(newCart)
          };
        }),
      
      // Clear cart method
      clearCart: () => set({
        cart: [],
        items: [],
        total: 0
      }),
    }),
    { name: 'cart-storage' }
  )
);