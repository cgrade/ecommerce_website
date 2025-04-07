"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useCart } from "../hooks/useCart";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

/**
 * @returns {JSX.Element} The checkout page component.
 * @description Provides a Stripe payment interface.
 */
export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Checkout</h1>
        <p className="text-gray-600">Complete your purchase securely</p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This is a demo store. No real payments will be processed.</p>
        <p className="mt-2">You can use the test card number: 4242 4242 4242 4242</p>
        <p>Any future date for expiry and any 3 digits for CVC.</p>
      </div>
    </div>
  );
}
