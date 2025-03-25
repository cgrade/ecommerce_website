import Image from "next/image";
import Link from "next/link";

/**
 * @param {{ id: string; name: string; image: string }} category - The category data.
 * @returns {JSX.Element} The category card component.
 * @description Renders a card for a category.
 */
export default function CategoryCard({
  category,
}: {
  category: { id: string; name: string; image: string };
}) {
  return (
    <Link
      href={`/categories/${category.id}`}
      className="card w-full bg-base-100 shadow-xl"
    >
      <figure>
        <Image
          src={category.image}
          alt={category.name}
          width={300}
          height={200}
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{category.name}</h2>
      </div>
    </Link>
  );
}
