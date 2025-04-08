"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../../hooks/useCart";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { clearCart } = useCart();
  
  // Clear cart on successful checkout
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your payment has been processed successfully.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
        <div className="text-left">
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>You will receive an email confirmation shortly.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Your order details can be viewed in your account dashboard.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>For digital products, you'll receive download instructions by email.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>For physical products, we'll notify you when your order ships.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link
          href="/products"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Continue Shopping
        </Link>
        <Link
          href="/profile"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors"
        >
          View Your Orders
        </Link>
      </div>
    </div>
  );
}
