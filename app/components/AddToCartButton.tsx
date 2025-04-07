"use client";

import { useState } from "react";
import { useCart } from "../hooks/useCart";
import { fetchProductById } from "../lib/api";
import { toast } from "react-hot-toast";

/**
 * @param {string} productId - The ID of the product to add to cart.
 * @returns {JSX.Element} The add to cart button component.
 * @description Client component for the Add to Cart button with interactivity.
 */
export default function AddToCartButton({ productId }: { productId: string }) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      // Fetch the product details
      const product = await fetchProductById(productId);
      
      // Add the product to the cart
      addToCart(product);
      
      // Show success feedback
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button 
      className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-md mt-4 w-full flex items-center justify-center space-x-2"
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
      <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
    </button>
  );
}
