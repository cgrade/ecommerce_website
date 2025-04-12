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
        height={150}
        className="w-full h-36 object-cover"
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold text-black line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm">{formatPrice(product.price)}</p>
        {product.is_best_seller && (
          <span className="inline-block bg-green-500 text-white text-xs px-1.5 py-0.5 rounded mt-1">
            Best Seller
          </span>
        )}
        <div className="mt-2 space-y-2">
          <Link
            href={`/products/${product.id}`}
            className="text-green-500 hover:underline block mb-1 text-xs"
          >
            View Details
          </Link>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
