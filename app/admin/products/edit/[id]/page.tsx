import ProductForm from "../../../../components/ProductForm";
import { fetchProductById } from "../../../../lib/api";

/**
 * @param {{ params: { id: string } }} props - The product ID from the URL.
 * @returns {Promise<JSX.Element>} The edit product page component.
 * @description Allows admins to edit an existing product.
 */
export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  // Properly await the params object before accessing its properties
  const id = await Promise.resolve(params.id);
  const product = await fetchProductById(id);

  return (
    <div className="container mx-auto px-4 py-12 bg-background-light">
      <h1 className="text-3xl font-bold mb-8 text-text-primary">Edit Product</h1>
      <ProductForm initialProduct={product} />
    </div>
  );
}
