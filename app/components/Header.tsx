"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import SearchBar from "./SearchBar";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";

/**
 * @returns {JSX.Element} The header component.
 * @description Renders the site header with navigation, search, and user options.
 */
export default function Header() {
  // Don't destructure immediately to avoid errors
  const session = useSession();

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-500">
          Elegent
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-600 hover:text-green-500">
            Home
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-green-500">
            Products
          </Link>
          <Link
            href="/categories"
            className="text-gray-600 hover:text-green-500"
          >
            Categories
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-green-500">
            Contact
          </Link>
          {session?.data?.user?.role === "admin" && (
            <Link
              href="/admin/dashboard"
              className="text-gray-600 hover:text-green-500"
            >
              Admin Dashboard
            </Link>
          )}
        </nav>

        {/* Search and Icons */}
        <div className="flex items-center space-x-4">
          <SearchBar />
          <ShoppingCartIcon className="h-6 w-6 text-gray-600 cursor-pointer" />
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <UserIcon className="h-6 w-6 text-gray-600" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {session?.status === "authenticated" ? (
                <>
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={() => signOut()}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/signup">Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
