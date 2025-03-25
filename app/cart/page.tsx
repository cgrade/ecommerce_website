"use client";

import CartItem from "../components/CartItem";
import { useCart } from "../hooks/useCart";
import Link from "next/link";

/**
 * @returns {JSX.Element} The cart page component.
 * @description Displays the user's cart with items and total.
 */
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
            />
          ))}
          <div className="mt-8">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <Link href="/checkout" className="btn btn-primary mt-4">
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
