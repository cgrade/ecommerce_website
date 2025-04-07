import Link from "next/link";

const categories = [
  {
    name: "Athletic Shoes",
    image: "/placeholder-slider1.jpg",
    slug: "athletic-shoes",
  },
  {
    name: "Running Gear",
    image: "/placeholder-slider2.jpg",
    slug: "running-gear",
  },
  {
    name: "Fitness Equipment",
    image: "/placeholder-slider1.jpg",
    slug: "fitness-equipment",
  },
  { name: "Sportswear", image: "/placeholder-slider2.jpg", slug: "sportswear" },
  {
    name: "Accessories",
    image: "/placeholder-slider1.jpg",
    slug: "accessories",
  },
  { name: "Nutrition", image: "/placeholder-slider2.jpg", slug: "nutrition" },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            className="block group"
          >
            <div className="relative h-64 mb-3 overflow-hidden rounded-lg shadow-md">
              <div className="absolute inset-0 bg-gray-900 opacity-40 group-hover:opacity-30 transition-opacity"></div>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${category.image})` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
