"use client";

// Force dynamic rendering to prevent prerendering issues with useSession
export const dynamic = "force-dynamic";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NotFound() {
  // Don't destructure immediately to avoid errors during static generation
  const session = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-6">
        The page you are looking for doesn't exist.
      </p>

      <div className="flex flex-col items-center space-y-4">
        <Link href="/" className="text-green-600 hover:underline">
          Return to Home
        </Link>

        {/* Only show user info when session is available */}
        {session?.status === "authenticated" && (
          <p className="text-sm text-gray-600">
            Logged in as: {session.data.user?.name || session.data.user?.email}
          </p>
        )}
      </div>
    </div>
  );
}
