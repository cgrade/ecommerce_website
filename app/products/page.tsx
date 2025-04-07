import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import { fetchProducts } from "../lib/api";

/**
 * @param {{ searchParams: { [key: string]: string | string[] | undefined } }} props - Search parameters from the URL.
 * @returns {Promise<JSX.Element>} The products page component.
 * @description Displays all products with a search bar.
 */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const products = await fetchProducts(searchParams);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center mb-8">
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
