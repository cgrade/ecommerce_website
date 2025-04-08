"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutFailedPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Payment Failed</h1>
        <p className="text-gray-600 mb-8">
          We're sorry, but there was an issue processing your payment.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">What might have happened?</h2>
        <div className="text-left">
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-gray-700 mr-2">•</span>
              <span>Your card might have insufficient funds.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-700 mr-2">•</span>
              <span>The payment was declined by your bank for security reasons.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-700 mr-2">•</span>
              <span>The payment details provided might be incorrect.</span>
            </li>
            <li className="flex items-start">
              <span className="text-gray-700 mr-2">•</span>
              <span>There might be a temporary issue with our payment processor.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <Link
          href="/checkout"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
        >
          Try Again
        </Link>
        <Link
          href="/contact"
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
