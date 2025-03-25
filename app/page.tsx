import ProductCard from "./components/ProductCard";
import HeroSlider from "./components/HeroSlider";
import { fetchProducts } from "./lib/api";

/**
 * @returns {Promise<JSX.Element>} The homepage component.
 * @description Displays the homepage with a hero slider and best-selling products.
 */
export default async function Home() {
  const products = await fetchProducts();

  return (
    <div>
      <HeroSlider />
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-black">
            Best Sellers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products
              .filter((product) => product.is_best_seller)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
