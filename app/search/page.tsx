import ProductCard from "@/components/ProductCard";
import { fetchProducts } from "@/lib/api";

/**
 * @param {{ searchParams: { [key: string]: string | string[] | undefined } }} props - Search parameters from the URL.
 * @returns {Promise<JSX.Element>} The search page component.
 * @description Displays products matching the search query.
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await fetchProducts(searchParams);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
