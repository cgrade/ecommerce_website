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
  const product = await fetchProductById(params.id);

  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-black">Edit Product</h1>
      <ProductForm initialProduct={product} />
    </div>
  );
}
