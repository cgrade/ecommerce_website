"use client";

import { useState } from "react";
import { Product } from "../types/product";
import CustomAddToCart from "./CustomAddToCart";

interface ProductDetailActionsProps {
  product: Product;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeError, setSizeError] = useState<boolean>(false);

  return (
    <div className="space-y-4 my-6">
      {/* Sizes */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-base font-semibold mb-3 text-gray-800">Select Size</h3>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`inline-block bg-white border ${
                  selectedSize === size 
                    ? 'border-gray-800 bg-gray-100' 
                    : 'border-gray-300 hover:border-gray-400'
                } text-gray-800 w-12 h-12 rounded-md text-sm font-medium transition-all`}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeError(false);
                }}
              >
                {size}
              </button>
            ))}
          </div>
          {sizeError && (
            <p className="mt-2 text-sm text-red-500">Please select a size</p>
          )}
        </div>
      )}

      {/* Quantity selector */}
      <div className="mb-4 flex items-center">
        <label className="font-medium text-sm mr-4 text-gray-700">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded-md bg-white">
          <button 
            className="px-3 py-2 text-gray-500 hover:text-gray-800 border-r border-gray-300"
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <span className="px-3 py-2 min-w-[40px] text-center text-gray-800">{quantity}</span>
          <button 
            className="px-3 py-2 text-gray-500 hover:text-gray-800 border-l border-gray-300"
            onClick={() => setQuantity(prev => prev + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to cart button */}
      {product.sizes && product.sizes.length > 0 ? (
        selectedSize ? (
          <CustomAddToCart 
            product={product} 
            selectedSize={selectedSize}
            quantity={quantity}
          />
        ) : (
          <button 
            className="bg-[#0c1d2a] hover:bg-[#0e2436] text-white py-3 px-4 w-full flex items-center justify-center transition-all duration-200 text-sm font-medium"
            onClick={() => {
              setSizeError(true);
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span>Add to Cart</span>
            </span>
          </button>
        )
      ) : (
        <CustomAddToCart 
          product={product} 
          quantity={quantity}
        />
      )}
    </div>
  );
}
