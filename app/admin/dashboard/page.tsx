"use client";

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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (status === "unauthenticated" || session?.user?.role !== "admin") {
      router.push("/login");
    } else {
      // Fetch products
      fetchProductsFromSupabase().then((data) => setProducts(data));
    }
  }, [status, session, router]);

  if (status === "loading") {
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
