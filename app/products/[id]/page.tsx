import Image from "next/image";
import { fetchProductById } from "../../lib/api";

/**
 * @param {{ params: { id: string } }} props - The product ID from the URL.
 * @returns {Promise<JSX.Element>} The product detail page component.
 * @description Displays detailed information about a single product.
 */
export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductById(params.id);

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
          <p className="text-2xl font-semibold mb-4">${product.price}</p>
          {/* Add to Cart button can be added here */}
        </div>
      </div>
    </div>
  );
}
