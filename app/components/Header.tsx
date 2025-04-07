"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // Close mobile menu when clicking outside or on navigation links
  useEffect(() => {
    const handleOutsideClick = () => setMobileMenuOpen(false);
    if (mobileMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-10">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        {/* Logo - Replace text with an actual logo image */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-white text-xl font-bold">E</span>
          </div>
          <span className="text-2xl font-extrabold text-green-600">Elegent</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          {mobileMenuOpen ? 
            <XMarkIcon className="h-6 w-6" /> : 
            <Bars3Icon className="h-6 w-6" />
          }
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-green-600 font-semibold px-2 py-1 rounded-md transition-colors hover:bg-green-50">
            HOME
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-green-600 font-semibold px-2 py-1 rounded-md transition-colors hover:bg-green-50">
            PRODUCTS
          </Link>
          <Link
            href="/categories"
            className="text-gray-700 hover:text-green-600 font-semibold px-2 py-1 rounded-md transition-colors hover:bg-green-50"
          >
            CATEGORIES
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
                className="px-4 py-1.5 text-white font-medium bg-green-500 rounded-md hover:bg-green-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            <Link 
              href="/" 
              className="block py-2 px-3 text-gray-600 font-medium hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block py-2 px-3 text-gray-600 font-medium hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/categories" 
              className="block py-2 px-3 text-gray-600 font-medium hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              href="/contact" 
              className="block py-2 px-3 text-gray-600 font-medium hover:bg-gray-50 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {session?.data?.user?.role === "admin" && (
              <Link 
                href="/admin/dashboard" 
                className="block py-2 px-3 text-gray-600 font-medium hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
          </div>
          
          {/* Mobile Search */}
          <div className="px-4 py-2">
            <SearchBar />
          </div>
          
          {/* Mobile Auth Links */}
          <div className="border-t border-gray-200 pt-4 pb-3">
            {session?.status === "authenticated" ? (
              <div className="px-4 space-y-3">
                <div className="flex items-center px-3">
                  <div className="avatar placeholder mr-3">
                    <div className="bg-green-100 text-green-600 rounded-full w-10">
                      <span>{session.data.user.name?.charAt(0) || "U"}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-medium text-gray-800">
                      {session.data.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {session.data.user.email}
                    </div>
                  </div>
                </div>
                <Link 
                  href="/profile" 
                  className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  href="/cart" 
                  className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart {cartItemCount > 0 && `(${cartItemCount})`}
                </Link>
                <button 
                  onClick={() => signOut()} 
                  className="w-full text-left py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-4 space-y-3">
                <Link 
                  href="/login" 
                  className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
                <Link 
                  href="/cart" 
                  className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart {cartItemCount > 0 && `(${cartItemCount})`}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
