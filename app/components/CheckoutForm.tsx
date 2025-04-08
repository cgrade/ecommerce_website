"use client";

import { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { createPaymentIntent } from "../lib/api";
import { useCart } from "../hooks/useCart";
import Link from "next/link";
import { formatPrice } from "../utils/formatPrice";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

/**
 * @returns {JSX.Element} The checkout form component.
 * @description Handles payment processing with Stripe.
 */
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { cart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  interface BillingDetails {
    name: string;
    email: string;
    address: {
      line1: string;
      city: string;
      state: string;
      postal_code: string;
    };
    [key: string]: any;
  }

  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    name: "",
    email: "",
    address: {
      line1: "",
      city: "",
      state: "",
      postal_code: "",
    },
  });

  // Calculate total amount
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Check if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setProcessing(false);
      setError("Card element not found");
      return;
    }

    // Validate form
    if (!billingDetails.name) {
      setError("Please enter your name");
      setProcessing(false);
      return;
    }

    if (!billingDetails.email) {
      setError("Please enter your email");
      setProcessing(false);
      return;
    }

    try {
      // Create payment intent with the cart total
      const { clientSecret } = await createPaymentIntent(total);
      
      if (!clientSecret) {
        throw new Error('Failed to create payment intent. No client secret returned.');
      }
      
      // Confirm payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: billingDetails.name,
              email: billingDetails.email,
              address: billingDetails.address,
            },
          },
        }
      );

      if (confirmError) {
        setError(confirmError.message || "An error occurred during payment processing");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        // Payment successful
        router.push("/success");
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      setError(err.message || "An error occurred during payment");
    } finally {
      setProcessing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setBillingDetails(prev => {
        // Create a new object with the updated nested property
        const updatedParent = { 
          ...prev[parent as keyof BillingDetails] as Record<string, any>,
          [child]: value 
        };
        
        return {
          ...prev,
          [parent]: updatedParent
        };
      });
    } else {
      setBillingDetails(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (cart.length === 0) {
    return <div className="text-center py-8">Redirecting to cart...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Order Summary</h3>
          <div className="space-y-2">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-3">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.name} <span className="text-gray-500">x {item.quantity}</span></p>
                  </div>
                </div>
                <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-green-600">{formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Billing Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={billingDetails.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={billingDetails.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Payment Information</h3>
          <div className="p-4 border border-gray-300 rounded-md bg-gray-50">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="flex flex-col space-y-3">
          <button
            type="submit"
            disabled={!stripe || processing}
            className={`w-full py-3 px-4 rounded-md font-medium text-white ${processing || !stripe ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} transition-colors flex items-center justify-center`}
          >
            {processing ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing Payment...
              </>
            ) : (
              `Pay ${formatPrice(total)}`
            )}
          </button>
          
          <Link 
            href="/cart" 
            className="text-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            Return to cart
          </Link>
        </div>
      </form>
    </div>
  );
}
