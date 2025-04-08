import Image from "next/image";
import { fetchProductById } from "../../lib/api";
import AddToCartButton from "../../components/AddToCartButton";
import { Suspense } from "react";
import { formatPrice } from "../../utils/formatPrice";

/**
 * @param {{ params: { id: string } }} props - The product ID from the URL.
 * @returns {Promise<JSX.Element>} The product detail page component.
 * @description Displays detailed information about a single product.
 */
// This special type hints Next.js to treat this as a server component
type Props = {
  params: { id: string }
};

export default async function ProductDetailPage({ params }: Props) {
  // In Next.js App Router, params is already resolved and doesn't need to be awaited
  // But we need to ensure the id is a string before passing it to fetchProductById
  const id = params?.id || '';
  const product = await fetchProductById(id);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">{formatPrice(product.price)}</p>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}
