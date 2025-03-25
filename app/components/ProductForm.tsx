"use client";

import { useState, useEffect } from "react";
import { Product } from "../types/product";
import { addProduct, updateProduct } from "../lib/api";
import { useRouter } from "next/navigation";

/**
 * @param {Product} [initialProduct] - The initial product data for editing (optional).
 * @returns {JSX.Element} The product form component.
 * @description Renders a form for adding or editing a product.
 */
export default function ProductForm({
  initialProduct,
}: {
  initialProduct?: Product;
}) {
  const [name, setName] = useState<string>(initialProduct?.name || "");
  const [price, setPrice] = useState<number>(initialProduct?.price || 0);
  const [description, setDescription] = useState<string>(
    initialProduct?.description || ""
  );
  const [image, setImage] = useState<string>(initialProduct?.image || "");
  const [category, setCategory] = useState<string>(
    initialProduct?.category || ""
  );
  const [isBestSeller, setIsBestSeller] = useState<boolean>(
    initialProduct?.is_best_seller || false
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      price,
      description,
      image,
      category,
      is_best_seller: isBestSeller,
    };

    try {
      if (initialProduct) {
        // Update existing product
        await updateProduct(initialProduct.id, productData);
      } else {
        // Add new product
        await addProduct(productData);
      }
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full bg-gray-100 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">Price</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="input input-bordered w-full bg-gray-100 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full bg-gray-100 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input input-bordered w-full bg-gray-100 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-black font-semibold mb-2">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input input-bordered w-full bg-gray-100 text-black"
          required
        />
      </div>
      <div className="mb-4">
        <label className="flex items-center cursor-pointer">
          <span className="text-black font-semibold mr-2">Best Seller</span>
          <input
            type="checkbox"
            checked={isBestSeller}
            onChange={(e) => setIsBestSeller(e.target.checked)}
            className="checkbox"
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 w-full"
      >
        {initialProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}
