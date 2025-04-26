import HeroSlider from "./components/HeroSlider";
import BestSellersSection from "./components/BestSellersSection";
import ProductCard from "./components/ProductCard";
import { fetchProducts } from "./lib/api";

/**
 * @returns {Promise<JSX.Element>} The homepage component.
 * @description Displays the homepage with a hero slider and best-selling products.
 */
export default async function Home() {
  const products = await fetchProducts();

  return (
    <div className="bg-[#f9f9f9]">
      <HeroSlider />
      
      {/* Best Sellers horizontal scrollable section */}
      <BestSellersSection products={products} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
