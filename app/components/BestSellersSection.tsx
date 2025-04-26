"use client";

import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Product } from '../types/product';
import ProductCard from './ProductCard';

interface BestSellersSectionProps {
  products: Product[];
}

export default function BestSellersSection({ products }: BestSellersSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-10 relative">
      <div className="mb-6 flex justify-between items-center px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-gray-800">Best Sellers</h2>
        <div className="flex gap-2">
          <button 
            onClick={scrollLeft}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
          </button>
          <button 
            onClick={scrollRight}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-800" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide pb-6 px-4 sm:px-6 gap-4 scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.filter(product => product.is_best_seller).map((product) => (
          <div key={product.id} className="flex-shrink-0 w-[280px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
