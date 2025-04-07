"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * @returns {JSX.Element} The profile page component.
 * @description Displays user profile information and order history.
 */
export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/profile");
    } else if (status === "authenticated") {
      setIsLoading(false);
    }
  }, [status, router]);

  if (isLoading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{session?.user?.name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{session?.user?.email || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium capitalize">
                    {(session?.user as any)?.role || "Customer"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">My Orders</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600 text-center py-6">
                  You haven't placed any orders yet.
                </p>
                <div className="text-center">
                  <Link
                    href="/products"
                    className="inline-block bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
              <div className="space-y-3">
                <button
                  className="block w-full md:w-auto bg-gray-200 text-gray-800 py-2 px-6 rounded-md hover:bg-gray-300 transition-colors text-left"
                >
                  Change Password
                </button>
                <button
                  className="block w-full md:w-auto bg-red-100 text-red-600 py-2 px-6 rounded-md hover:bg-red-200 transition-colors text-left"
                  onClick={() => router.push("/api/auth/signout")}
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
