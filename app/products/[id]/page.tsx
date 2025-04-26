import Image from "next/image";
import { fetchProductById } from "../../lib/api";
import { Suspense } from "react";
import { formatPrice } from "../../utils/formatPrice";
import ImageSlider from "../../components/ImageSlider";
import ActionButtons from "../../components/ActionButtons";
import ProductDetailActions from "../../components/ProductDetailActions";

/**
 * @param {{ params: { id: string } }} props - The product ID from the URL.
 * @returns {Promise<JSX.Element>} The product detail page component.
 * @description Displays detailed information about a single product.
 */
// This special type hints Next.js to treat this as a server component
type Props = {
  params: { id: string }
};

export default async function ProductDetailPage({ params }: Props) {
  // Await params to fix the "params should be awaited" error
  const resolvedParams = await Promise.resolve(params);
  // Make sure we have a string ID
  const id = String(resolvedParams.id);
  const product = await fetchProductById(id);

  return (
    <div className="bg-[#f9f9f9] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Breadcrumb navigation */}
      <div className="flex items-center text-sm mb-6 text-gray-500">
        <a href="/" className="hover:text-gray-800">Home</a>
        <span className="mx-2">›</span>
        <a href="/shop" className="hover:text-gray-800">Shop</a>
        <span className="mx-2">›</span>
        <span className="text-gray-800">{product.name}</span>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Left side - Image Gallery */}
        <div className="w-full md:w-1/2">
          <div className="overflow-hidden">
            <ImageSlider 
              images={product.image_urls && product.image_urls.length > 0 
                ? product.image_urls 
                : [product.image || "/images/placeholder.png"]} 
              productName={product.name}
            />
          </div>
        </div>
        
        {/* Right side - Product details */}
        <div className="w-full md:w-1/2">
          <div className="h-full text-gray-800">
            {/* Product Name */}
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">{product.name}</h1>
            
            {/* Price */}
            <p className="text-2xl font-bold my-4 text-gray-800">{formatPrice(product.price)}</p>
            
            {/* Availability */}
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900 text-green-300">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Available
              </span>
            </div>
            
            {/* Product Actions (Add to Cart, Size Selection, Quantity) */}
            <ProductDetailActions product={product} />
            
            {/* Action buttons (wishlist, share, etc) */}
            <div className="my-6">
              <ActionButtons />
            </div>
            
            {/* Product Description */}
            <div className="mt-8">
              <div className="border-t border-gray-200 pt-6">
                <details className="group" open>
                  <summary className="flex cursor-pointer items-center justify-between py-4 text-base font-medium text-gray-800">
                    <span>Product Description</span>
                    <span className="transition group-open:rotate-180">
                      <svg width="10" height="6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </summary>
                  <div className="prose max-w-none text-gray-600 text-sm leading-relaxed pb-4" 
                    dangerouslySetInnerHTML={{ __html: product.description }} 
                  />
                </details>
              </div>
            </div>
            
            {/* Reviews section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4">
                  <h2 className="font-medium text-text-primary">Reviews</h2>
                  <svg
                    className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>

                <div className="mt-4 px-4 pb-4">
                  <p className="text-sm text-text-muted">
                    No reviews yet. Be the first to review this product.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
