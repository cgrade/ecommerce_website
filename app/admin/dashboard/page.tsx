"use client";

// Force dynamic rendering to prevent prerendering issues with useSession
export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductsFromSupabase } from "../../lib/supabase";
import { deleteProduct } from "../../lib/api";
import { Product } from "../../types/product";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { formatPrice } from "../../utils/formatPrice";

/**
 * @returns {JSX.Element} The admin dashboard component.
 * @description Displays a list of products for admin management.
 */
export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const session = useSession();

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProductsFromSupabase();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Check session status and role safely
      if (session.status === "unauthenticated") {
        router.push("/login");
      } else if (
        session.status === "authenticated" &&
        session.data?.user?.role === "admin"
      ) {
        // Fetch products only when authenticated as admin
        fetchProducts();
      } else if (session.status === "authenticated") {
        // Authenticated but not admin
        router.push("/");
      }
    }
  }, [session.status, session.data, router]);
  
  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      setIsDeleting(id);
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product");
        console.error("Error deleting product:", error);
      } finally {
        setIsDeleting(null);
      }
    }
  };
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Safe render during SSR and loading
  if (typeof window === "undefined" || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background-light">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-accent opacity-20 rounded mb-4"></div>
          <div className="h-6 w-32 bg-accent opacity-20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-background-light">
      <div className="flex flex-col justify-between items-start mb-8 space-y-4 sm:space-y-0 sm:flex-row sm:items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Admin Dashboard</h1>
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Link
            href="/admin/users"
            className="bg-primary text-secondary sm:px-6 sm:py-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors inline-flex items-center border border-primary text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            Manage Users
          </Link>
          <Link
            href="/admin/products/add"
            className="bg-primary text-secondary sm:px-6 sm:py-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors inline-flex items-center border border-primary ml-2 text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Product
          </Link>
        </div>
      </div>
      
      <div className="bg-background-light rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8 border border-accent">
        <div className="mb-6">
          <label htmlFor="search" className="block text-sm font-medium text-text-primary mb-2">Search Products</label>
          <input
            type="text"
            id="search"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-accent rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-background-light text-text-primary"
          />
        </div>
        
        <div className="text-sm text-text-muted mb-4">
          Showing {filteredProducts.length} of {products.length} products
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-accent">
            <thead>
              <tr className="bg-background-light border-b border-accent">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">Product</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">Price</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-text-primary uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-text-primary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-background-light divide-y divide-accent">
              {filteredProducts.length > 0 ? filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-accent hover:bg-opacity-10">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="h-10 w-10 rounded-md object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-md bg-accent bg-opacity-20 flex items-center justify-center text-text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-text-primary">{product.name}</div>
                        <div className="text-sm text-text-muted truncate max-w-xs">{product.description?.substring(0, 50)}{product.description?.length > 50 ? '...' : ''}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">{formatPrice(product.price)}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.is_best_seller ? 'bg-primary text-secondary' : 'bg-accent bg-opacity-20 text-text-primary'}`}>
                      {product.is_best_seller ? 'Best Seller' : 'Regular'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="text-primary hover:text-accent mr-4 underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      disabled={isDeleting === product.id}
                      className="text-primary hover:text-accent disabled:opacity-50 disabled:cursor-not-allowed underline"
                    >
                      {isDeleting === product.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-text-muted">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-3 sm:hidden">
          {filteredProducts.length > 0 ? filteredProducts.map((product) => (
            <div key={product.id} className="bg-background-light border border-accent rounded-lg shadow-sm p-3">
              <div className="flex items-start space-x-3">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-12 w-12 sm:h-16 sm:w-16 rounded-md object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 sm:h-16 sm:w-16 bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-xs sm:text-sm text-gray-500">No image</span>
                    </div>
                  )}
                </div>
                
                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-text-primary truncate">{product.name}</h3>
                  <p className="mt-1 text-sm text-text-muted truncate">
                    {product.description?.substring(0, 50)}{product.description?.length > 50 ? '...' : ''}
                  </p>
                    
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-text-primary">{formatPrice(product.price)}</span>
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.is_best_seller ? 'bg-primary text-secondary' : 'bg-accent bg-opacity-20 text-text-primary'}`}>
                        {product.is_best_seller ? 'Best Seller' : 'Regular'}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/products/edit/${product.id}`}
                        className="inline-flex items-center px-2 py-1 border border-primary text-xs font-medium rounded text-primary hover:bg-primary hover:text-secondary focus:outline-none transition-colors"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        disabled={isDeleting === product.id}
                        className="inline-flex items-center px-2 py-1 border border-primary text-xs font-medium rounded text-primary hover:bg-primary hover:text-secondary focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isDeleting === product.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="text-center py-8 text-text-muted">
              No products found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
