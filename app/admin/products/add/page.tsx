import ProductForm from "../../../components/ProductForm";

/**
 * @returns {JSX.Element} The add product page component.
 * @description Allows admins to add a new product.
 */
export default function AddProductPage() {
  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-black">Add New Product</h1>
      <ProductForm />
    </div>
  );
}
