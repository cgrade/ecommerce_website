"use client";

import { useState } from "react";
import Link from "next/link";
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
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold mb-3 text-gray-800">Select Size</h3>
            <Link 
              href="/size-guide"
              target="_blank"
              className="text-sm text-gray-500 hover:text-gray-800 underline mb-3"
            >
              Size Guide
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                className={`inline-block bg-white border ${
                  selectedSize === size 
                    ? 'border-gray-800 bg-gray-100' 
                    : 'border-gray-300 hover:border-gray-400'
                } text-gray-800 w-12 h-12 sm:w-14 sm:h-14 rounded-md text-sm font-medium transition-all transform hover:scale-105 active:scale-95`}
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
            <p className="mt-2 text-sm text-red-500 font-medium">Please select a size</p>
          )}
        </div>
      )}

      {/* Quantity selector */}
      <div className="mb-6">
        <label className="block text-base font-semibold mb-3 text-gray-800">Quantity</label>
        <div className="flex items-center">
          <div className="flex items-center border border-gray-300 rounded-md bg-white overflow-hidden">
            <button 
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 border-r border-gray-300 transition-colors"
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              aria-label="Decrease quantity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="w-12 h-10 sm:w-14 sm:h-12 flex items-center justify-center text-gray-800 font-medium">{quantity}</span>
            <button 
              className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 border-l border-gray-300 transition-colors"
              onClick={() => setQuantity(prev => prev + 1)}
              aria-label="Increase quantity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          <div className="ml-4 text-sm text-gray-500">
            {product.in_stock ? (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                In Stock
              </span>
            ) : (
              <span className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Out of Stock
              </span>
            )}
          </div>
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
