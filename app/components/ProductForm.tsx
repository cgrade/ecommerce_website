"use client";

import { useState } from "react";
import { Product } from "../types/product";
import { addProduct, updateProduct } from "../lib/api";
import { useRouter } from "next/navigation";
import ImageUploader from "./ImageUploader";

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
  const [description, setDescription] = useState<string>(initialProduct?.description || "");
  const [imageUrls, setImageUrls] = useState<string[]>(initialProduct?.image_urls || []);
  const [stock, setStock] = useState<number>(initialProduct?.stock || 0);
  const [isBestSeller, setIsBestSeller] = useState<boolean>(initialProduct?.is_best_seller || false);
  const [sizes, setSizes] = useState<string[]>(initialProduct?.sizes || []);
  const router = useRouter();

  const allSizes = ["S", "M", "L", "XL", "XXL"];

  const handleSizeChange = (size: string) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      name,
      price,
      description,
      image_urls: imageUrls,
      stock,
      is_best_seller: isBestSeller,
      sizes,
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
      className="w-full max-w-lg mx-auto p-4 sm:p-6 bg-background-light shadow-md rounded-lg border border-accent"
    >
      <div className="mb-6">
        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full bg-background-light text-text-primary border-accent p-3 rounded-md text-sm sm:text-base focus:ring-1 focus:ring-primary focus:border-primary"
          required
          placeholder="Enter product name"
        />
      </div>
      <div className="mb-6">
        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base">Price</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-text-muted sm:text-sm">$</span>
          </div>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="input input-bordered w-full bg-background-light text-text-primary border-accent pl-7 p-3 rounded-md text-sm sm:text-base focus:ring-1 focus:ring-primary focus:border-primary"
            required
            min="0"
            step="0.01"
            placeholder="0.00"
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full min-h-[150px] sm:min-h-[200px] p-3 border border-accent rounded-md bg-background-light text-text-primary focus:outline-none focus:ring-1 focus:ring-primary text-sm sm:text-base resize-y"
          placeholder="Enter product description..."
        />
      </div>
      <div className="mb-6">
        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base">Product Images</label>
        <ImageUploader 
          onImagesUploaded={setImageUrls}
          initialImages={imageUrls}
        />
        {imageUrls.length > 0 && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {imageUrls.map((url, i) => (
              <div key={i} className="flex items-center p-2 bg-background-light border border-accent rounded-md">
                <div className="w-8 h-8 mr-2 bg-gray-200 rounded-sm overflow-hidden flex-shrink-0">
                  <img src={url} alt="Preview" className="w-full h-full object-cover" onError={(e) => {(e.target as HTMLImageElement).src = '/images/placeholder.png'}} />
                </div>
                <span className="text-xs text-text-muted truncate">{url.split('/').pop()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mb-6">
        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base">Available Sizes</label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {allSizes.map((size) => (
            <label 
              key={size} 
              className={`flex items-center justify-center py-2 px-3 rounded-md border cursor-pointer transition-colors ${sizes.includes(size) ? 'bg-primary text-secondary border-primary' : 'bg-background-light text-text-primary border-accent hover:border-primary'}`}
            >
              <input
                type="checkbox"
                checked={sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="sr-only"
              />
              <span className="font-medium">{size}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-text-primary font-semibold mb-2 text-sm sm:text-base">Stock Quantity</label>
        <div className="flex rounded-md">
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(parseInt(e.target.value))}
            className="input input-bordered w-full bg-background-light text-text-primary border-accent p-3 rounded-md text-sm sm:text-base focus:ring-1 focus:ring-primary focus:border-primary"
            required
            min="0"
            placeholder="Enter available quantity"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center border border-accent rounded-md p-3 cursor-pointer" onClick={() => setIsBestSeller(!isBestSeller)}>
          <div className={`w-5 h-5 flex-shrink-0 rounded border ${isBestSeller ? 'bg-primary border-primary' : 'border-accent'} mr-3 flex items-center justify-center`}>
            {isBestSeller && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <span className="text-text-primary text-sm sm:text-base">
            Mark as best seller (featured on homepage)
          </span>
          <input
            type="checkbox"
            checked={isBestSeller}
            onChange={(e) => setIsBestSeller(e.target.checked)}
            className="sr-only"
          />
        </div>
      </div>
      <div className="pt-2">
        <button
          type="submit"
          className="bg-primary text-secondary px-6 py-3.5 rounded-md hover:bg-accent w-full transition-colors font-semibold text-sm sm:text-base shadow-sm hover:shadow-md flex items-center justify-center"
        >
          {initialProduct ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Update Product
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Product
            </>
          )}
        </button>
      </div>
    </form>
  );
}
