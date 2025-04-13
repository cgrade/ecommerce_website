"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { 
  ShoppingCartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  ShoppingBagIcon
} from "@heroicons/react/24/outline";

/**
 * @returns {JSX.Element} The header component.
 * @description Renders the site header with navigation, search, and user options.
 */
export default function Header() {
  // Don't destructure immediately to avoid errors
  const session = useSession();
  const { cart } = useCart();
  
  // Calculate cart item count from the cart state
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white bg-opacity-95 backdrop-blur-sm shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center backdrop-filter">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src="/images/logo.png" 
            alt="Elegent Logo" 
            className="md:h-16 h-8 w-auto object-contain transition-all"
            style={{ filter: 'brightness(0) saturate(100%)', WebkitFilter: 'brightness(0) saturate(100%)' }}
          />
        </Link>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Search Icon for Mobile - Links to Products */}
          <Link 
            href="/products"
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Link>
          
          {/* User Icon for Mobile */}
          <Link href={session?.status === "authenticated" ? "/profile" : "/login"} className="p-2 rounded-md text-gray-600 hover:bg-gray-100">
            <UserIcon className="h-5 w-5" />
          </Link>
          
          {/* Cart Icon with badge for Mobile */}
          <Link href="/cart" className="p-2 rounded-md text-gray-600 hover:bg-gray-100 relative">
            <ShoppingBagIcon className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-green-600 font-semibold px-2 py-1 rounded-md transition-colors hover:bg-green-50">
            HOME
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-green-600 font-semibold px-2 py-1 rounded-md transition-colors hover:bg-green-50">
            PRODUCTS
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-600 font-semibold px-2 py-1 rounded-md transition-colors hover:bg-green-50">
            CONTACT
          </Link>
          {session?.data?.user?.role === "admin" && (
            <Link
              href="/admin/dashboard"
              className="text-gray-700 hover:text-green-600 font-semibold px-2 py-1 rounded-md transition-colors hover:bg-green-50"
            >
              ADMIN
            </Link>
          )}
        </nav>

        {/* Search and Icons - Desktop */}
        <div className="hidden md:flex items-center space-x-5">
          <SearchBar />
          
          {/* Cart Icon with badge */}
          <div className="relative group">
            <Link href="/cart" className="flex items-center">
              <ShoppingBagIcon className="h-6 w-6 text-gray-600 group-hover:text-green-500 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          
          {/* Auth Section */}
          {session?.status === "authenticated" ? (
            <div className="relative group">
              <div className="flex items-center space-x-1 cursor-pointer hover:bg-gray-50 rounded-full px-3 py-1.5 transition-colors">
                <div className="avatar placeholder">
                  <div className="bg-green-100 text-green-600 rounded-full w-8">
                    <span className="text-sm">{session.data.user.name?.charAt(0) || "U"}</span>
                  </div>
                </div>
                <span className="text-gray-700 hidden sm:inline font-medium">
                  {session.data.user.name?.split(' ')[0] || "Account"}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-1 w-64 bg-white shadow-lg rounded-lg border border-gray-200 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                <div className="p-3 border-b border-gray-100">
                  <p className="text-sm text-gray-500">Signed in as</p>
                  <p className="font-semibold text-gray-800 truncate">{session.data.user.email}</p>
                </div>
                
                <div className="p-2 space-y-1">
                  <Link 
                    href="/profile" 
                    className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <UserIcon className="h-5 w-5 mr-2" /> 
                    My Profile
                  </Link>
                  
                  <Link 
                    href="/orders" 
                    className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-green-50 hover:text-green-600 transition-colors"
                  >
                    <ShoppingBagIcon className="h-5 w-5 mr-2" /> 
                    My Orders
                  </Link>
                </div>
                
                <div className="p-2 border-t border-gray-100">
                  <button 
                    onClick={() => signOut()} 
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg> 
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                href="/login" 
                className="px-4 py-1.5 text-gray-700 font-medium border border-gray-200 rounded-md hover:bg-gray-50 hidden sm:block transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup" 
                className="px-4 py-1.5 text-white font-small bg-green-500 rounded-md hover:bg-green-600 transition-colors"
              >
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* No longer using mobile dropdown menu */}
    </header>
  );
}
