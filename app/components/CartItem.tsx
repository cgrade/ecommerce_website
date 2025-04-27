"use client";

import { useState } from "react";
import { CartItem as CartItemType } from "../types/cart";
import { formatPrice } from "../utils/formatPrice";

/**
 * @param {CartItemType} item - The cart item data.
 * @param {(id: string) => void} onRemove - Function to remove the item.
 * @param {(id: string, quantity: number) => void} onUpdateQuantity - Function to update quantity.
 * @returns {JSX.Element} The cart item component.
 * @description Renders a single item in the cart.
 */
export default function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}) {
  const [imageError, setImageError] = useState(false);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 px-4 border-b border-gray-200 bg-white rounded-lg shadow-sm mb-4">
      <div className="flex items-center w-full md:w-auto">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          {imageError ? (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover object-center"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
          <p className="mt-1 text-sm text-gray-600">Unit Price: {formatPrice(item.price)}</p>
          <p className="mt-1 text-sm font-semibold text-green-600">Subtotal: {formatPrice(item.price * item.quantity)}</p>
        </div>
      </div>
      
      <div className="flex items-center mt-4 md:mt-0">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            type="button"
            onClick={decrementQuantity}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-md"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-12 text-center py-1 border-x border-gray-300 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button 
            type="button"
            onClick={incrementQuantity}
            className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-md"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="ml-4 px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Remove item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
