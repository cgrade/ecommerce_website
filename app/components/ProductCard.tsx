import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/product";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "../utils/formatPrice";

/**
 * @param {Product} product - The product data to display.
 * @returns {JSX.Element} The product card component.
 * @description Renders a card for a single product.
 */
export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-black">{product.name}</h3>
        <p className="text-gray-600">{formatPrice(product.price)}</p>
        {product.is_best_seller && (
          <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded mt-2">
            Best Seller
          </span>
        )}
        <div className="mt-4 space-y-3">
          <Link
            href={`/products/${product.id}`}
            className="text-green-500 hover:underline block mb-2"
          >
            View Details
          </Link>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
