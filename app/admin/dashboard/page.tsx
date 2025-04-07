"use client";

// Force dynamic rendering to prevent prerendering issues with useSession
export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductsFromSupabase } from "../../lib/supabase";
import { Product } from "../../types/product";
import Link from "next/link";

/**
 * @returns {JSX.Element} The admin dashboard component.
 * @description Displays a list of products for admin management.
 */
export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();

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
        setIsLoading(true);
        fetchProductsFromSupabase()
          .then((data) => setProducts(data))
          .finally(() => setIsLoading(false));
      } else if (session.status === "authenticated") {
        // Authenticated but not admin
        router.push("/");
      }
    }
  }, [session.status, session.data, router]);

  // Safe render during SSR and loading
  if (typeof window === "undefined" || isLoading) {
    return <div className="text-center py-12 text-black">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <h1 className="text-3xl font-bold mb-8 text-black">Admin Dashboard</h1>
      <Link
        href="/admin/products/add"
        className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 mb-4 inline-block"
      >
        Add New Product
      </Link>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="text-black">{product.name}</td>
                <td className="text-black">${product.price.toFixed(2)}</td>
                <td className="text-black">{product.category}</td>
                <td>
                  <Link
                    href={`/admin/products/edit/${product.id}`}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mr-2"
                  >
                    Edit
                  </Link>
                  {/* Delete functionality can be added here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
