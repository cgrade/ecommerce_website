"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { createPaymentIntent } from "@/lib/api";

/**
 * @returns {JSX.Element} The checkout form component.
 * @description Handles payment processing with Stripe.
 */
export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setProcessing(false);
      return;
    }

    try {
      const { clientSecret } = await createPaymentIntent();
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(error.message || "An error occurred");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        router.push("/success"); // Redirect to a success page (not implemented)
      }
    } catch (err) {
      setError("An error occurred during payment");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary mt-4"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
