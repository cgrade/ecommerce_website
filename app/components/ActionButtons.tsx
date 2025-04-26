"use client";

import Link from "next/link";

/**
 * @returns {JSX.Element} The action buttons component.
 * @description Client component for the Continue Shopping and Checkout buttons.
 */
export default function ActionButtons() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-2">
      <Link
        href="/"
        className="flex items-center justify-center py-3 px-4 bg-white text-gray-800 hover:bg-gray-100 border border-gray-300 font-medium text-sm transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Continue Shopping
      </Link>
      
      <Link
        href="/checkout" 
        className="flex items-center justify-center py-3 px-4 bg-[#0c1d2a] text-white hover:bg-[#0e2436] font-medium text-sm transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        Checkout
      </Link>
    </div>
  );
}
