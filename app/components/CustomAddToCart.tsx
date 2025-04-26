"use client";

import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { fetchProductById } from "../lib/api";
import { toast } from "react-hot-toast";
import { Product } from "../types/product";

interface CustomAddToCartProps {
  product: Product;
  selectedSize?: string;
  quantity: number;
}

/**
 * Custom Add to Cart component that handles quantity and size selection
 * @param product - The product to add to cart
 * @param selectedSize - The selected size (optional)
 * @param quantity - The quantity to add
 */
export default function CustomAddToCart({ product, selectedSize, quantity }: CustomAddToCartProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // Add a small delay to allow the loading animation to be visible
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Add single product with quantity property instead of multiple adds
      addToCart({
        ...product,
        selectedSize: selectedSize || null,
        quantity: quantity // Pass the quantity directly to the cart
      });
      
      // Show success feedback
      toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`, {
        style: {
          border: '1px solid #e5e5e5',
          padding: '16px',
          color: '#333333',
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
        },
        iconTheme: {
          primary: '#000000',
          secondary: '#FFFFFF',
        },
        duration: 3000,
      });
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Couldn't add to cart. Please try again.", {
        style: {
          border: '1px solid #e5e5e5',
          padding: '16px',
          color: '#333333',
          backgroundColor: '#FFFFFF',
          borderRadius: '4px',
        },
        duration: 3000,
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button 
      className="bg-[#0c1d2a] hover:bg-[#0e2436] text-white py-3 px-4 w-full flex items-center justify-center transition-all duration-200 text-sm font-medium relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <span className={`flex items-center justify-center gap-2 transition-opacity ${isAdding ? 'opacity-0' : 'opacity-100'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
        <span>Add to Cart {quantity > 1 ? `(${quantity})` : ''}</span>
      </span>
      <span className={`absolute inset-0 flex items-center justify-center transition-opacity ${isAdding ? 'opacity-100' : 'opacity-0'}`}>
        <svg className="animate-spin h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="ml-2 font-medium">Adding to Cart...</span>
      </span>
    </button>
  );
}
