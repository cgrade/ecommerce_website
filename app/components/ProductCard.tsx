"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/product";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "../utils/formatPrice";
import ProductModal from "./ProductModal";

/**
 * @param {Product} product - The product data to display.
 * @returns {JSX.Element} The product card component.
 * @description Renders a card for a single product.
 */
export default function ProductCard({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <div className="flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="block mb-2">
        <div className="relative aspect-square w-full overflow-hidden bg-white">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400';
              }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-white">
              <svg
                className="h-12 w-12 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}
        </div>
      </Link>
      
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-medium text-gray-800 truncate mb-1">{product.name}</h3>
        <p className="text-gray-800 text-base font-bold mb-4">{formatPrice(product.price)}</p>
        
        <div className="mt-auto">
          <button 
            onClick={openModal}
            className="w-full py-2.5 bg-[#0c1d2a] text-white text-sm font-medium hover:bg-[#0e2436] transition-colors"
          >
            Select options
          </button>
          
          {/* Product Modal */}
          <ProductModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            product={product} 
          />
        </div>
      </div>
    </div>
  );
}
